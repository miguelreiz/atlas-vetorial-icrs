import numpy as np
import os

def generate_hgo_cornea(output_filepath, R_ANT=7.8, R_POST=6.4, DIAM=12.0, THICKNESS_CENTER=0.55, IOP_MMHG=15.0):
    print(f"Gerando motor HGO para cornea com DIAM={DIAM}mm e Espessura={THICKNESS_CENTER}mm...")
    
    # Parametros genericos da malha
    N_RING = 20
    N_SEC = 24
    
    # Conversao pressao
    IOP_MPA = IOP_MMHG * 0.000133322
    
    # 1. Gerar Nos (Malha estruturada)
    # Z = 0 e a superficie posterior (endotelio), Z = THICKNESS e a superficie anterior
    nodes = []
    # Camada Posterior (Endotelio)
    for i in range(N_RING + 1):
        r_frac = i / N_RING
        r_plane = (DIAM / 2) * r_frac
        if r_plane >= R_POST: r_plane = R_POST * 0.99
        phi = np.arcsin(r_plane / R_POST)
        for j in range(N_SEC):
            theta = 2 * np.pi * j / N_SEC
            z = R_POST * np.cos(phi) - R_POST # normaliza z=0 no vertice
            x = R_POST * np.sin(phi) * np.cos(theta)
            y = R_POST * np.sin(phi) * np.sin(theta)
            nodes.append((x, y, z))
            if r_frac == 0: break # apenas um vertice central
            
    num_nodes_per_layer = len(nodes)
    
    # Camada Anterior (Epitelio)
    for i in range(N_RING + 1):
        r_frac = i / N_RING
        r_plane = (DIAM / 2) * r_frac
        if r_plane >= R_ANT: r_plane = R_ANT * 0.99
        phi = np.arcsin(r_plane / R_ANT)
        for j in range(N_SEC):
            theta = 2 * np.pi * j / N_SEC
            z = R_ANT * np.cos(phi) - R_ANT + THICKNESS_CENTER
            x = R_ANT * np.sin(phi) * np.cos(theta)
            y = R_ANT * np.sin(phi) * np.sin(theta)
            nodes.append((x, y, z))
            if r_frac == 0: break

    # 2. Escrever XML
    lines = []
    lines.append('<?xml version="1.0" encoding="ISO-8859-1"?>')
    lines.append('<febio_spec version="4.0">')
    lines.append('  <Module type="solid"/>')
    
    # Modulo HGO (Solid Mixture com Fibras)
    lines.append('  <Material>')
    lines.append('    <material id="1" name="Cornea_HGO" type="solid mixture">')
    lines.append('      <mat_axis type="local">')
    lines.append('        <a>1,0,0</a>')
    lines.append('        <d>0,1,0</d>')
    lines.append('      </mat_axis>')
    lines.append('      <!-- Matriz Isotrópica (Ground Substance) -->')
    lines.append('      <solid type="neo-Hookean">')
    lines.append('        <E>0.5</E>')
    lines.append('        <v>0.49</v>')
    lines.append('      </solid>')
    lines.append('      <!-- Lamelas Radiais (Fibras) -->')
    lines.append('      <solid type="continuous fiber distribution">')
    lines.append('        <fibers type="2D Von Mises">')
    lines.append('           <b active="0">1.0</b>')
    lines.append('        </fibers>')
    lines.append('        <distribution type="radial"/>')
    lines.append('      </solid>')
    lines.append('      <!-- Lamelas Tangenciais (Annulus Limbal) -->')
    lines.append('      <solid type="continuous fiber distribution">')
    lines.append('        <fibers type="2D Von Mises">')
    lines.append('           <b active="0">1.0</b>')
    lines.append('        </fibers>')
    lines.append('        <distribution type="tangential"/>')
    lines.append('      </solid>')
    lines.append('    </material>')
    lines.append('  </Material>')

    # 3. Mesh Placeholder
    lines.append('  <Mesh>')
    lines.append('    <Nodes name="CorneaNodes">')
    for idx, (x,y,z) in enumerate(nodes, 1):
        lines.append(f'      <node id="{idx}">{x:.5f},{y:.5f},{z:.5f}</node>')
    lines.append('    </Nodes>')
    
    # Limbus nodes
    lines.append('    <NodeSet name="Limbus">')
    limbus_nodes = []
    nid = 1
    for i in range(N_RING + 1):
        for j in range(N_SEC):
            if i == N_RING: limbus_nodes.append(nid)
            nid += 1
            if i == 0: break
    for i in range(N_RING + 1):
        for j in range(N_SEC):
            if i == N_RING: limbus_nodes.append(nid)
            nid += 1
            if i == 0: break
    nodes_str = ','.join(str(n) for n in limbus_nodes)
    lines.append(f'      {nodes_str}')
    lines.append('    </NodeSet>')
    lines.append('  </Mesh>')

    # Dominios de Casca (Shell) ou Solido? FEBio precisa de solid para HGO
    lines.append('  <MeshDomains>')
    lines.append('    <SolidDomain name="Estroma" mat="Cornea_HGO"/>')
    lines.append('  </MeshDomains>')

    # Fronteira Limbus Fixa
    lines.append('  <Boundary>')
    lines.append('    <bc name="FixLimbus" type="zero displacement" node_set="Limbus">')
    lines.append('      <x_dof>1</x_dof>')
    lines.append('      <y_dof>1</y_dof>')
    lines.append('      <z_dof>1</z_dof>')
    lines.append('    </bc>')
    lines.append('  </Boundary>')

    # Cargas (IOP)
    lines.append('  <Loads>')
    lines.append('    <surface_load name="IOP_Load" type="pressure" surface="Endotelio">')
    lines.append(f'      <pressure lc="1">{IOP_MPA:.8f}</pressure>')
    lines.append('      <linear>0</linear>')
    lines.append('    </surface_load>')
    lines.append('  </Loads>')

    # Step Data
    lines.append('  <LoadData>')
    lines.append('    <load_controller id="1" type="loadcurve">')
    lines.append('      <points>')
    lines.append('        <pt>0,0</pt>')
    lines.append('        <pt>1,1</pt>')
    lines.append('      </points>')
    lines.append('    </load_controller>')
    lines.append('  </LoadData>')
    
    lines.append('</febio_spec>')

    with open(output_filepath, 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"Malha parametrizada salva em {output_filepath}")

if __name__ == "__main__":
    out_file = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\fem\Simulation_Core\cornea_hgo_parametric.feb"
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    generate_hgo_cornea(out_file)
