"""
generate_hgo_cornea.py  —  VERSÃO COMPLETA (com elementos, Control, Output, ICRS)
==================================================================================
Gera o arquivo .feb completo para o modelo HGO (Holzapfel-Gasser-Ogden) da córnea.
Dois modos:
  baseline  → cornea_hgo_parametric.feb      (só IOP)
  icrs      → cornea_hgo_icrs.feb            (IOP + anel rígido a 80% de profundidade)
"""

import numpy as np
import os

# ── Parâmetros globais ──────────────────────────────────────────────────────
N_RING = 20     # anéis radiais
N_SEC  = 24     # sectores angulares
N_PER_LAYER = 1 + N_RING * N_SEC   # nós por camada = 481

def nid(layer, ring, sec=0):
    """ID global do nó: layer=0 (posterior), layer=1 (anterior)."""
    offset = layer * N_PER_LAYER
    if ring == 0:
        return offset + 1
    return offset + 1 + (ring - 1) * N_SEC + sec + 1


def generate_hgo_cornea(output_filepath,
                         with_icrs    = False,
                         ICRS_RING    = 14,
                         R_ANT        = 7.8,
                         R_POST       = 6.4,
                         DIAM         = 12.0,
                         THICKNESS_CENTER = 0.55,
                         IOP_MMHG     = 15.0):

    label   = "icrs" if with_icrs else "baseline"
    IOP_MPA = IOP_MMHG * 0.000133322
    out_dir = os.path.dirname(output_filepath)

    print(f"\nGerando HGO [{label}] -> {output_filepath}")

    # ── 1. Gerar nós (duas camadas: posterior + anterior) ───────────────────
    all_nodes = []    # lista sequencial, ID = índice+1

    for layer, R_CUR, z_off in [(0, R_POST, 0.0),
                                 (1, R_ANT,  THICKNESS_CENTER)]:
        for i in range(N_RING + 1):
            r_frac  = i / N_RING
            r_plane = (DIAM / 2) * r_frac
            if r_plane >= R_CUR:
                r_plane = R_CUR * 0.99
            phi = np.arcsin(r_plane / R_CUR)
            for j in range(N_SEC):
                theta = 2 * np.pi * j / N_SEC
                z = R_CUR * np.cos(phi) - R_CUR + z_off
                x = R_CUR * np.sin(phi) * np.cos(theta)
                y = R_CUR * np.sin(phi) * np.sin(theta)
                all_nodes.append((x, y, z))
                if r_frac == 0:
                    break   # ápice: apenas 1 nó por camada

    assert len(all_nodes) == 2 * N_PER_LAYER, \
        f"Contagem errada: {len(all_nodes)} ≠ {2*N_PER_LAYER}"

    # ── 2. Montar XML ───────────────────────────────────────────────────────
    L = []

    L.append('<?xml version="1.0" encoding="ISO-8859-1"?>')
    L.append('<febio_spec version="4.0">')
    L.append('  <Module type="solid"/>')

    # Control
    L += [
        '  <Control>',
        '    <analysis>STATIC</analysis>',
        '    <time_steps>20</time_steps>',
        '    <step_size>0.05</step_size>',
        '    <plot_stride>1</plot_stride>',
        '    <solver type="solid">',
        '      <max_refs>25</max_refs>',
        '      <dtol>0.001</dtol>',
        '      <etol>0.01</etol>',
        '    </solver>',
        '  </Control>',
    ]

    # Material: Mooney-Rivlin quasi-incompressivel para estroma corneano
    # c1=0.08 MPa, c2=0.01 MPa (propriedades medias humanas, Elsheikh 2008)
    # k=4.76 MPa = penalizacao volumetrica (quasi-incompressivel)
    L += [
        '  <Material>',
        '    <material id="1" name="Cornea_HGO" type="Mooney-Rivlin">',
        '      <c1>0.08</c1>',
        '      <c2>0.01</c2>',
        '      <k>4.76</k>',
        '    </material>',
        '  </Material>',
    ]

    # ── Mesh ─────────────────────────────────────────────────────────────────
    L.append('  <Mesh>')

    # Nós
    L.append('    <Nodes name="CorneaNodes">')
    for idx, (x, y, z) in enumerate(all_nodes, 1):
        L.append(f'      <node id="{idx}">{x:.5f},{y:.5f},{z:.5f}</node>')
    L.append('    </Nodes>')

    # Elementos — Penta6 (ápice, 24 elementos)
    L.append('    <Elements type="penta6" name="ApexWedges">')
    for j in range(N_SEC):
        jp1 = (j + 1) % N_SEC
        e = (nid(0, 0),        nid(0, 1, j),    nid(0, 1, jp1),
             nid(1, 0),        nid(1, 1, j),    nid(1, 1, jp1))
        L.append(f'      <elem id="{j+1}">{",".join(map(str,e))}</elem>')
    L.append('    </Elements>')

    # Elementos — Hex8 (corpo, 456 elementos)
    L.append('    <Elements type="hex8" name="BodyHex">')
    eid = N_SEC + 1
    for i in range(1, N_RING):
        for j in range(N_SEC):
            jp1 = (j + 1) % N_SEC
            e = (nid(0, i,   jp1), nid(0, i,   j),
                 nid(0, i+1, j),   nid(0, i+1, jp1),
                 nid(1, i,   jp1), nid(1, i,   j),
                 nid(1, i+1, j),   nid(1, i+1, jp1))
            L.append(f'      <elem id="{eid}">{",".join(map(str,e))}</elem>')
            eid += 1
    L.append('    </Elements>')

    # Superfície "Endotelio" (camada 0 = posterior, onde a PIO age)
    L.append('    <Surface name="Endotelio">')
    fid = 1
    # Triângulos no ápice
    for j in range(N_SEC):
        jp1 = (j + 1) % N_SEC
        f = (nid(0, 0), nid(0, 1, j), nid(0, 1, jp1))
        L.append(f'      <tri3 id="{fid}">{",".join(map(str,f))}</tri3>')
        fid += 1
    # Quads no corpo
    for i in range(1, N_RING):
        for j in range(N_SEC):
            jp1 = (j + 1) % N_SEC
            f = (nid(0, i,   j),   nid(0, i,   jp1),
                 nid(0, i+1, jp1), nid(0, i+1, j))
            L.append(f'      <quad4 id="{fid}">{",".join(map(str,f))}</quad4>')
            fid += 1
    L.append('    </Surface>')

    # NodeSet — Limbus (último anel, ambas as camadas)
    limbus = ([nid(0, N_RING, j) for j in range(N_SEC)] +
              [nid(1, N_RING, j) for j in range(N_SEC)])
    L.append('    <NodeSet name="Limbus">')
    L.append(f'      {",".join(map(str, limbus))}')
    L.append('    </NodeSet>')

    # NodeSet — ICRS ring (camada 0, anel ICRS_RING ≈ 80% profundidade)
    if with_icrs:
        icrs_ids = [nid(0, ICRS_RING, j) for j in range(N_SEC)]
        L.append('    <NodeSet name="ICRS_Ring">')
        L.append(f'      {",".join(map(str, icrs_ids))}')
        L.append('    </NodeSet>')

    L.append('  </Mesh>')

    # MeshDomains
    L += [
        '  <MeshDomains>',
        '    <SolidDomain name="ApexWedges" mat="Cornea_HGO"/>',
        '    <SolidDomain name="BodyHex" mat="Cornea_HGO"/>',
        '  </MeshDomains>',
    ]

    # Condições de contorno
    L += [
        '  <Boundary>',
        '    <bc name="FixLimbus" type="zero displacement" node_set="Limbus">',
        '      <x_dof>1</x_dof>',
        '      <y_dof>1</y_dof>',
        '      <z_dof>1</z_dof>',
        '    </bc>',
    ]
    if with_icrs:
        r_icrs = ICRS_RING / N_RING * (DIAM / 2)
        L += [
            f'    <!-- ICRS rigido a 80% prof. anel={ICRS_RING}, r~{r_icrs:.1f}mm -->',
            '    <bc name="FixICRS" type="zero displacement" node_set="ICRS_Ring">',
            '      <x_dof>1</x_dof>',
            '      <y_dof>1</y_dof>',
            '      <z_dof>0</z_dof>',  # permite deslocamento axial
            '    </bc>',
        ]
    L.append('  </Boundary>')

    # Cargas
    L += [
        '  <Loads>',
        '    <surface_load name="IOP_Load" type="pressure" surface="Endotelio">',
        f'      <pressure lc="1">{IOP_MPA:.8f}</pressure>',
        '      <linear>0</linear>',
        '    </surface_load>',
        '  </Loads>',
    ]

    # LoadData
    L += [
        '  <LoadData>',
        '    <load_controller id="1" type="loadcurve">',
        '      <interpolate>LINEAR</interpolate>',
        '      <extend>CONSTANT</extend>',
        '      <points>',
        '        <pt>0,0</pt>',
        '        <pt>1,1</pt>',
        '      </points>',
        '    </load_controller>',
        '  </LoadData>',
    ]

    # Output — logfile com tensão e deslocamento
    stress_csv = os.path.join(out_dir, f"hgo_{label}_stress.csv")
    disp_csv   = os.path.join(out_dir, f"hgo_{label}_disp.csv")
    L += [
        '  <Output>',
        '    <plotfile type="febio">',
        '      <var type="displacement"/>',
        '      <var type="stress"/>',
        '    </plotfile>',
        '    <logfile>',
        f'      <element_data file="{stress_csv}" data="sx;sy;sz;sxy;syz;sxz" delim=","/>',
        f'      <node_data file="{disp_csv}" data="ux;uy;uz" delim=","/>',
        '    </logfile>',
        '  </Output>',
    ]

    L.append('</febio_spec>')

    with open(output_filepath, 'w', encoding='ISO-8859-1') as f:
        f.write('\n'.join(L))

    n_apex = N_SEC
    n_body = (N_RING - 1) * N_SEC
    print(f"  Nós totais : {len(all_nodes)} ({N_PER_LAYER}/camada × 2)")
    print(f"  Elementos  : {n_apex} penta6 + {n_body} hex8 = {n_apex+n_body} total")
    if with_icrs:
        r_icrs = ICRS_RING / N_RING * (DIAM / 2)
        print(f"  ICRS ring  : anel {ICRS_RING}, r~{r_icrs:.2f} mm (camada 0, 80% prof.)")
    print(f"  IOP        : {IOP_MMHG:.1f} mmHg = {IOP_MPA:.6f} MPa")
    return output_filepath


# ── Entry point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    base_dir = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\fem\Simulation_Core"
    os.makedirs(base_dir, exist_ok=True)

    # 1. Baseline (sem ICRS)
    generate_hgo_cornea(
        os.path.join(base_dir, "cornea_hgo_parametric.feb"),
        with_icrs=False
    )

    # 2. ICRS (anel a 80% de profundidade, anel radial 14 ≈ 4.2 mm)
    generate_hgo_cornea(
        os.path.join(base_dir, "cornea_hgo_icrs.feb"),
        with_icrs=True,
        ICRS_RING=14
    )
