#!/usr/bin/env python3
"""
generate_febio_model.py — AVBC FEBio 4.0 Model Generator
=========================================================
Generates FEBio input files (.feb) for corneal ICRS simulation using the
Holzapfel-Gasser-Ogden (HGO) constitutive model.

Mesh specification (Chapter 10):
  - Spherical shell: R = 7.8 mm, θ_max ≈ 46.5°
  - 20 concentric rings × 24 sectors × 2 node layers = 962 nodes
  - Penta6 at apex (24 elements) + Hex8 body (456 elements) = 480 elements
  - ICRS at ring 14 (r ≈ 4.2 mm from apex)
  - Follower pressure: 15 mmHg (0.002 MPa)
  - Limbal fixation: ring 20 fully fixed

Usage:
  python generate_febio_model.py --output model.feb
  python generate_febio_model.py --c 0.03 --k1 0.10 --arc 160 --output test.feb
"""

import argparse
import math
import os
import xml.etree.ElementTree as ET
from xml.dom import minidom
from dataclasses import dataclass, field
from typing import List, Tuple, Optional


# ─── Constants ────────────────────────────────────────────────────────────────
N_RING = 20       # Number of radial rings (0=apex, 20=limbus)
N_SEC  = 24       # Sectors per ring (15° each)
N_Z    = 2        # Node layers (posterior=0, anterior=1)
R_CORNEA = 7.8    # Corneal radius of curvature (mm)
THETA_MAX = math.radians(46.54)  # Angular extent apex→limbus
THICKNESS = 0.500  # Stromal thickness (mm), uniform
IOP_PRESSURE = -0.002  # 15 mmHg in MPa (negativo para empurrar para fora na face posterior)
ICRS_RING = 14    # Ring index for ICRS placement

# Canonical HGO parameters (Nguyen et al., 2018)
DEFAULT_C     = 0.05   # Ground substance shear modulus (MPa)
DEFAULT_K1    = 0.22   # Fiber stiffness (MPa)
DEFAULT_K2    = 100.0  # Fiber nonlinearity (dimensionless)
DEFAULT_KAPPA = 0.09   # Fiber dispersion (0=aligned, 1/3=isotropic)
DEFAULT_K     = 4.76   # Bulk modulus (MPa)


@dataclass
class HGOParams:
    """Holzapfel-Gasser-Ogden material parameters."""
    c: float = DEFAULT_C
    k1: float = DEFAULT_K1
    k2: float = DEFAULT_K2
    kappa: float = DEFAULT_KAPPA
    k: float = DEFAULT_K


@dataclass
class ICRSConfig:
    """ICRS ring segment configuration."""
    arc_degrees: float = 160.0     # Arc length in degrees (0 = no ring)
    symmetric: bool = True         # True=uniform thickness, False=progressive
    profile: str = "symmetric"     # symmetric, linear, reverse, step, parabolic, long_arc
    start_sector: int = 0          # Starting sector index
    pachymetry: float = 0.500      # Stromal thickness in mm


@dataclass
class MeshNode:
    """A node in the finite element mesh."""
    id: int
    x: float
    y: float
    z: float
    layer: int   # 0=posterior, 1=anterior
    ring: int    # 0=apex, 1..N_RING
    sector: int  # 0..N_SEC-1


def nodes_per_layer():
    return 1 + N_RING * N_SEC  # 481


def node_id(layer: int, ring: int, sector: int) -> int:
    """Compute 1-indexed node ID from (layer, ring, sector)."""
    npl = nodes_per_layer()
    if ring == 0:
        return layer * npl + 1
    sector = sector % N_SEC
    return layer * npl + 1 + (ring - 1) * N_SEC + sector + 1


def generate_nodes(thickness: float = 0.500) -> List[MeshNode]:
    """Generate all mesh nodes on a spherical shell.

    Posterior surface: sphere of radius R_CORNEA, centered at (0, 0, -R_CORNEA).
    Anterior surface:  sphere of radius R_CORNEA + thickness, same center.
    Apex is at (0, 0, 0) for both (posterior = apex).
    """
    nodes = []
    for layer in range(N_Z):
        R = R_CORNEA + layer * thickness  # posterior: R, anterior: R+t

        # Apex node
        nid = node_id(layer, 0, 0)
        # Apex z = -(-R) + R*cos(0) = R - R = 0... wait.
        # Center at (0,0,-R_CORNEA) for posterior; for concentric, same center.
        # z_apex = center_z + R = -R_CORNEA + R
        # For posterior: z = -R_CORNEA + R_CORNEA = 0  ✓
        # For anterior:  z = -R_CORNEA + (R_CORNEA + t) = t  ✓
        z_apex = -R_CORNEA + R
        nodes.append(MeshNode(nid, 0.0, 0.0, z_apex, layer, 0, 0))

        # Ring nodes
        for ring in range(1, N_RING + 1):
            theta = ring * THETA_MAX / N_RING

            for sec in range(N_SEC):
                phi = sec * 2.0 * math.pi / N_SEC
                nid = node_id(layer, ring, sec)

                # Point on sphere of radius R, center at (0, 0, -R_CORNEA)
                x = R * math.sin(theta) * math.cos(phi)
                y = R * math.sin(theta) * math.sin(phi)
                z = -R_CORNEA + R * math.cos(theta)

                nodes.append(MeshNode(nid, x, y, z, layer, ring, sec))

    return nodes


def generate_elements():
    """Generate Penta6 (apex) and Hex8 (body) elements.

    Returns:
        penta6_elems: list of (elem_id, [n1..n6])
        hex8_elems:   list of (elem_id, [n1..n8])

    Node ordering follows FEBio convention:
      Penta6: [bot1,bot2,bot3, top1,top2,top3] with bot face CCW from outside
      Hex8:   [bot1..bot4, top1..top4] with bot face CCW from outside
    For our mesh: bottom = posterior (inner), top = anterior (outer)
    """
    penta6 = []
    hex8 = []
    eid = 1

    # Penta6: apex → ring 1
    # Bottom face: (n2-n1)×(n3-n1) must point toward top face (n4)
    for sec in range(N_SEC):
        sec_next = (sec + 1) % N_SEC
        # Bottom (posterior): apex, ring1_sec, ring1_sec_next
        bot = [node_id(0, 0, 0), node_id(0, 1, sec), node_id(0, 1, sec_next)]
        # Top (anterior): same order
        top = [node_id(1, 0, 0), node_id(1, 1, sec), node_id(1, 1, sec_next)]
        penta6.append((eid, bot + top))
        eid += 1

    # Hex8: ring i → ring i+1, for i in [1, N_RING-1]
    # Node ordering: bottom face CCW from top (anterior) view
    # Maps ring→x, sector→y: (r,s) → (r+1,s) → (r+1,s+1) → (r,s+1)
    for ring in range(1, N_RING):
        for sec in range(N_SEC):
            sec_next = (sec + 1) % N_SEC
            bot = [
                node_id(0, ring, sec),
                node_id(0, ring + 1, sec),
                node_id(0, ring + 1, sec_next),
                node_id(0, ring, sec_next),
            ]
            top = [
                node_id(1, ring, sec),
                node_id(1, ring + 1, sec),
                node_id(1, ring + 1, sec_next),
                node_id(1, ring, sec_next),
            ]
            hex8.append((eid, bot + top))
            eid += 1

    return penta6, hex8


def compute_material_axes(nodes: List[MeshNode]):
    """Compute local material axes (tangential, radial) for each element.

    For HGO model: primary fiber direction = circumferential (tangential).

    Returns:
        penta_axes: list of (a_vec, d_vec) for each Penta6
        hex_axes:   list of (a_vec, d_vec) for each Hex8
    """
    # Build node lookup by ID
    node_map = {n.id: n for n in nodes}

    def elem_centroid(nids):
        cx = sum(node_map[n].x for n in nids) / len(nids)
        cy = sum(node_map[n].y for n in nids) / len(nids)
        cz = sum(node_map[n].z for n in nids) / len(nids)
        return cx, cy, cz

    def tangential_dir(cx, cy):
        """Circumferential direction: (-y, x, 0) normalized."""
        r = math.sqrt(cx * cx + cy * cy)
        if r < 1e-10:
            return (1.0, 0.0, 0.0)  # Arbitrary at apex
        return (-cy / r, cx / r, 0.0)

    def radial_dir(cx, cy, cz):
        """Meridional tangent direction (from apex outward on surface)."""
        r = math.sqrt(cx * cx + cy * cy)
        if r < 1e-10:
            return (0.0, 1.0, 0.0)  # Arbitrary at apex
        # Compute coordinates relative to sphere center (0, 0, -R_CORNEA)
        dx = cx
        dy = cy
        dz = cz + R_CORNEA
        R = math.sqrt(dx * dx + dy * dy + dz * dz)
        # Radial tangent along spherical surface
        return ((cx / r) * (dz / R), (cy / r) * (dz / R), -r / R)

    penta_axes = []
    hex_axes = []

    # Penta6 elements
    for sec in range(N_SEC):
        sec_next = (sec + 1) % N_SEC
        nids = [node_id(0, 0, 0), node_id(0, 1, sec), node_id(0, 1, sec_next),
                node_id(1, 0, 0), node_id(1, 1, sec), node_id(1, 1, sec_next)]
        cx, cy, cz = elem_centroid(nids)
        a = tangential_dir(cx, cy)  # Primary fiber direction = circumferential
        d = radial_dir(cx, cy, cz)  # Secondary direction = radial
        penta_axes.append((a, d))

    # Hex8 elements
    for ring in range(1, N_RING):
        for sec in range(N_SEC):
            sec_next = (sec + 1) % N_SEC
            nids = [
                node_id(0, ring, sec), node_id(0, ring, sec_next),
                node_id(0, ring + 1, sec_next), node_id(0, ring + 1, sec),
                node_id(1, ring, sec), node_id(1, ring, sec_next),
                node_id(1, ring + 1, sec_next), node_id(1, ring + 1, sec),
            ]
            cx, cy, cz = elem_centroid(nids)
            a = tangential_dir(cx, cy)
            d = radial_dir(cx, cy, cz)
            hex_axes.append((a, d))

    return penta_axes, hex_axes


def get_limbal_nodes() -> List[int]:
    """Return node IDs for limbal fixation (ring N_RING, both layers)."""
    nids = []
    for layer in range(N_Z):
        for sec in range(N_SEC):
            nids.append(node_id(layer, N_RING, sec))
    return nids


def get_icrs_nodes(config: ICRSConfig) -> Tuple[List[int], List[int]]:
    """Return (xy_fixed_nodes, z_fixed_nodes) for the ICRS constraint.

    For symmetric rings: all ICRS nodes have ux=uy=0, uz free.
    For asymmetric: thick-end nodes also have uz=0.
    """
    if config.arc_degrees <= 0:
        return [], []

    n_sectors = round(config.arc_degrees / (360.0 / N_SEC))
    n_sectors = max(1, min(n_sectors, N_SEC))

    xy_fixed = []
    z_fixed = []

    for i in range(n_sectors):
        sec = (config.start_sector + i) % N_SEC
        for layer in range(N_Z):
            nid = node_id(layer, ICRS_RING, sec)
            xy_fixed.append(nid)

    # Asymmetric profiles: fix uz on thick-end sectors
    if not config.symmetric:
        if config.profile in ("linear", "step"):
            # First half = thick end (uz fixed)
            n_thick = n_sectors // 2
            for i in range(n_thick):
                sec = (config.start_sector + i) % N_SEC
                for layer in range(N_Z):
                    z_fixed.append(node_id(layer, ICRS_RING, sec))
        elif config.profile == "reverse":
            # Second half = thick end
            n_thick = n_sectors // 2
            for i in range(n_sectors - n_thick, n_sectors):
                sec = (config.start_sector + i) % N_SEC
                for layer in range(N_Z):
                    z_fixed.append(node_id(layer, ICRS_RING, sec))
        elif config.profile == "parabolic":
            # Center = thick, both ends free
            n_thick = n_sectors // 3
            start = n_sectors // 3
            for i in range(start, start + n_thick):
                sec = (config.start_sector + i) % N_SEC
                for layer in range(N_Z):
                    z_fixed.append(node_id(layer, ICRS_RING, sec))

    return xy_fixed, z_fixed


def get_posterior_surface(penta6, hex8):
    """Return surface elements (tri3 + quad4) for posterior pressure load."""
    tri3 = []
    quad4 = []
    sid = 1

    for eid, nids in penta6:
        tri3.append((sid, [nids[0], nids[1], nids[2]]))
        sid += 1

    for eid, nids in hex8:
        quad4.append((sid, [nids[0], nids[1], nids[2], nids[3]]))
        sid += 1

    return tri3, quad4


def build_feb_xml(nodes, penta6, hex8,
                  hgo: HGOParams, icrs: ICRSConfig, output_path: str = "model.feb"):
    """Build the complete FEBio 4.0 XML document."""

    root = ET.Element("febio_spec", version="4.0")

    # ── Module ──
    ET.SubElement(root, "Module", type="solid")

    # ── Control ──
    ctrl = ET.SubElement(root, "Control")
    _t(ctrl, "analysis", "STATIC")
    _t(ctrl, "time_steps", "10")
    _t(ctrl, "step_size", "0.1")
    _t(ctrl, "plot_zero_state", "0")
    _t(ctrl, "plot_range", "0,-1")
    _t(ctrl, "plot_level", "PLOT_MAJOR_ITRS")
    _t(ctrl, "output_level", "OUTPUT_MAJOR_ITRS")

    solver = ET.SubElement(ctrl, "solver", type="solid")
    _t(solver, "symmetric_stiffness", "non-symmetric")
    _t(solver, "equation_scheme", "staggered")
    _t(solver, "equation_order", "default")
    _t(solver, "optimize_bw", "0")
    _t(solver, "lstol", "0.9")
    _t(solver, "lsmin", "0.01")
    _t(solver, "lsiter", "5")
    _t(solver, "max_refs", "25")
    _t(solver, "check_zero_diagonal", "0")
    _t(solver, "zero_diagonal_tol", "0")
    _t(solver, "force_partition", "0")
    _t(solver, "reform_each_time_step", "1")
    _t(solver, "reform_augment", "0")
    _t(solver, "diverge_reform", "1")
    _t(solver, "min_residual", "1e-20")
    _t(solver, "max_residual", "0")
    _t(solver, "dtol", "0.001")
    _t(solver, "etol", "0.01")
    _t(solver, "rtol", "0")
    _t(solver, "rhoi", "-2")
    _t(solver, "alpha", "1")
    _t(solver, "beta", "0.25")
    _t(solver, "gamma", "0.5")
    _t(solver, "logSolve", "0")
    _t(solver, "arc_length", "0")
    _t(solver, "arc_length_scale", "0")

    qn = ET.SubElement(solver, "qn_method", type="BFGS")
    _t(qn, "max_ups", "10")
    _t(qn, "max_buffer_size", "0")
    _t(qn, "cycle_buffer", "1")
    _t(qn, "cmax", "100000")

    # ── Globals ──
    glob = ET.SubElement(root, "Globals")
    const = ET.SubElement(glob, "Constants")
    _t(const, "R", "8.314e-6")
    _t(const, "T", "294")
    _t(const, "Fc", "96485e-6")

    # ── Material ──
    mat_section = ET.SubElement(root, "Material")
    mat = ET.SubElement(mat_section, "material",
                        id="1", name="Stroma", type="HGO unconstrained")
    _t(mat, "c", f"{hgo.c}")
    _t(mat, "k1", f"{hgo.k1}")
    _t(mat, "k2", f"{hgo.k2}")
    _t(mat, "kappa", f"{hgo.kappa}")
    _t(mat, "k", f"{hgo.k}")
    ma_el = ET.SubElement(mat, "mat_axis", type="map")
    ET.SubElement(ma_el, "map", name="mat_axis_map")

    # ── Mesh ──
    mesh = ET.SubElement(root, "Mesh")

    # Nodes
    nodes_el = ET.SubElement(mesh, "Nodes", name="Object1")
    for n in sorted(nodes, key=lambda x: x.id):
        ne = ET.SubElement(nodes_el, "node", id=str(n.id))
        ne.text = f"{n.x:.8f},{n.y:.8f},{n.z:.8f}"

    # Elements - Penta6
    if penta6:
        penta_el = ET.SubElement(mesh, "Elements", type="penta6", name="ApexElements")
        for eid, nids in penta6:
            ee = ET.SubElement(penta_el, "elem", id=str(eid))
            ee.text = ",".join(str(n) for n in nids)

    # Elements - Hex8
    if hex8:
        hex_el = ET.SubElement(mesh, "Elements", type="hex8", name="BodyElements")
        for eid, nids in hex8:
            ee = ET.SubElement(hex_el, "elem", id=str(eid))
            ee.text = ",".join(str(n) for n in nids)

    # Node sets - FEBio 4.0 uses comma-separated ID list as text
    limbal = get_limbal_nodes()
    ns_limb = ET.SubElement(mesh, "NodeSet", name="LimbalNodes")
    ns_limb.text = ", ".join(str(nid) for nid in limbal)

    xy_fixed, z_fixed = get_icrs_nodes(icrs)
    if xy_fixed:
        ns_icrs = ET.SubElement(mesh, "NodeSet", name="ICRSNodes_XY")
        ns_icrs.text = ", ".join(str(nid) for nid in xy_fixed)

    if z_fixed:
        ns_icrs_z = ET.SubElement(mesh, "NodeSet", name="ICRSNodes_Z")
        ns_icrs_z.text = ", ".join(str(nid) for nid in z_fixed)

    # Posterior surface
    tri3, quad4 = get_posterior_surface(penta6, hex8)
    surf = ET.SubElement(mesh, "Surface", name="PosteriorSurface")
    for sid, nids in tri3:
        se = ET.SubElement(surf, "tri3", id=str(sid))
        se.text = ",".join(str(n) for n in nids)
    for sid, nids in quad4:
        se = ET.SubElement(surf, "quad4", id=str(sid))
        se.text = ",".join(str(n) for n in nids)

    # ── MeshDomains ──
    domains = ET.SubElement(root, "MeshDomains")
    if penta6:
        ET.SubElement(domains, "SolidDomain", name="ApexElements", mat="Stroma")
    if hex8:
        ET.SubElement(domains, "SolidDomain", name="BodyElements", mat="Stroma")

    # ── MeshData ──
    mesh_data = ET.SubElement(root, "MeshData")
    
    # Calcular os eixos locais circunferenciais e radiais
    penta_axes, hex_axes = compute_material_axes(nodes)
    
    # Gravar eixos para elementos Penta6 (ApexElements)
    if penta6 and penta_axes:
        penta_data = ET.SubElement(mesh_data, "ElementData", name="mat_axis_map", type="mat_axis", elem_set="ApexElements")
        for i, _ in enumerate(penta6):
            a_vec, d_vec = penta_axes[i]
            ee = ET.SubElement(penta_data, "elem", lid=str(i + 1))
            a_el = ET.SubElement(ee, "a")
            a_el.text = f"{a_vec[0]:.6f},{a_vec[1]:.6f},{a_vec[2]:.6f}"
            d_el = ET.SubElement(ee, "d")
            d_el.text = f"{d_vec[0]:.6f},{d_vec[1]:.6f},{d_vec[2]:.6f}"
            
    # Gravar eixos para elementos Hex8 (BodyElements)
    if hex8 and hex_axes:
        hex_data = ET.SubElement(mesh_data, "ElementData", name="mat_axis_map", type="mat_axis", elem_set="BodyElements")
        for i, _ in enumerate(hex8):
            a_vec, d_vec = hex_axes[i]
            ee = ET.SubElement(hex_data, "elem", lid=str(i + 1))
            a_el = ET.SubElement(ee, "a")
            a_el.text = f"{a_vec[0]:.6f},{a_vec[1]:.6f},{a_vec[2]:.6f}"
            d_el = ET.SubElement(ee, "d")
            d_el.text = f"{d_vec[0]:.6f},{d_vec[1]:.6f},{d_vec[2]:.6f}"



    # ── Boundary Conditions ──
    boundary = ET.SubElement(root, "Boundary")

    # Limbal fixation (all DOFs)
    bc_limb = ET.SubElement(boundary, "bc", name="FixLimbus",
                            type="zero displacement", node_set="LimbalNodes")
    _t(bc_limb, "x_dof", "1")
    _t(bc_limb, "y_dof", "1")
    _t(bc_limb, "z_dof", "1")

    # ICRS Volumetric Spacer (Escola Volumétrica)
    if xy_fixed:
        # A restrição X e Y simula a rigidez inextensível do anel de PMMA
        bc_icrs_xy = ET.SubElement(boundary, "bc", name="FixICRS_XY",
                                   type="zero displacement", node_set="ICRSNodes_XY")
        _t(bc_icrs_xy, "x_dof", "1")
        _t(bc_icrs_xy, "y_dof", "1")
        _t(bc_icrs_xy, "z_dof", "0")

        # O deslocamento Z prescrito simula a inserção física de volume (espessura)
        bc_icrs_z = ET.SubElement(boundary, "bc", name="PrescribeICRS_Volume",
                                  type="prescribed displacement", node_set="ICRSNodes_XY")
        _t(bc_icrs_z, "dof", "z")
        _t(bc_icrs_z, "value", "0.250", lc="1") # 250 microns de elevação volumétrica

    # ICRS Z constraint (asymmetric thick-end) - modificado para sobrepor volume extra se necessário
    if z_fixed:
        bc_icrs_z_asym = ET.SubElement(boundary, "bc", name="PrescribeICRS_Asym_Volume",
                                  type="prescribed displacement", node_set="ICRSNodes_Z")
        _t(bc_icrs_z_asym, "dof", "z")
        _t(bc_icrs_z_asym, "value", "0.350", lc="1") # Progressivo: extremidade mais espessa (350 um)

    # ── Loads ──
    loads = ET.SubElement(root, "Loads")
    sl = ET.SubElement(loads, "surface_load", name="IOP",
                       type="pressure", surface="PosteriorSurface")
    _t(sl, "pressure", f"{IOP_PRESSURE}", lc="1")
    _t(sl, "symmetric_stiffness", "1")
    _t(sl, "linear", "0")

    # ── LoadData ──
    ldata = ET.SubElement(root, "LoadData")
    lc = ET.SubElement(ldata, "load_controller", id="1", type="loadcurve")
    _t(lc, "interpolate", "LINEAR")
    _t(lc, "extend", "CONSTANT")
    pts = ET.SubElement(lc, "points")
    pt0 = ET.SubElement(pts, "pt")
    pt0.text = "0,0"
    pt1 = ET.SubElement(pts, "pt")
    pt1.text = "1,1"

    # ── Output ──
    output = ET.SubElement(root, "Output")
    pf = ET.SubElement(output, "plotfile", type="febio")
    ET.SubElement(pf, "var", type="displacement")
    ET.SubElement(pf, "var", type="stress")

    lf = ET.SubElement(output, "logfile")
    # CSV output with model-specific filenames
    feb_basename = os.path.splitext(os.path.basename(output_path))[0]

    # Export only key nodes: apex (both layers) + ICRS ring (both layers) + a few control rings
    key_nodes = set()
    for layer in range(N_Z):
        key_nodes.add(node_id(layer, 0, 0))  # Apex
        for sec in range(N_SEC):
            for ring in range(1, N_RING + 1):
                key_nodes.add(node_id(layer, ring, sec))
    key_node_ids = ",".join(str(n) for n in sorted(key_nodes))

    nd = ET.SubElement(lf, "node_data", data="ux;uy;uz", delim=",",
                       file=f"{feb_basename}_nodes.csv")
    nd.text = key_node_ids

    # Export stress for a subset of elements around ICRS ring
    key_elems = set()
    for eid, nids_e in penta6 + hex8:
        for nid_e in nids_e:
            # Check if any node is in ICRS ring zone
            for n in nodes:
                if n.id == nid_e and ICRS_RING - 2 <= n.ring <= ICRS_RING + 2:
                    key_elems.add(eid)
                    break
    if key_elems:
        key_elem_ids = ",".join(str(e) for e in sorted(key_elems))
        ed = ET.SubElement(lf, "element_data", data="sx;sy;sz;sxy;syz;sxz", delim=",",
                           file=f"{feb_basename}_elems.csv")
        ed.text = key_elem_ids

    return root


def _t(parent, tag, text, **attribs):
    """Helper: create a text sub-element."""
    el = ET.SubElement(parent, tag, **attribs)
    el.text = text
    return el


def prettify_xml(elem):
    """Return pretty-printed XML string."""
    rough = ET.tostring(elem, encoding="unicode")
    parsed = minidom.parseString(rough)
    lines = parsed.toprettyxml(indent="  ", encoding=None)
    # Remove extra blank lines
    clean = "\n".join(line for line in lines.split("\n")
                      if line.strip())
    return clean


def generate_model(hgo: HGOParams, icrs: ICRSConfig, output_path: str):
    """Generate a complete FEBio model file."""
    nodes = generate_nodes(thickness=icrs.pachymetry)
    penta6, hex8 = generate_elements()

    root = build_feb_xml(nodes, penta6, hex8,
                         hgo, icrs, output_path)

    xml_str = prettify_xml(root)

    # Replace XML declaration with ISO-8859-1
    xml_str = xml_str.replace(
        '<?xml version="1.0" ?>',
        '<?xml version="1.0" encoding="ISO-8859-1"?>'
    )

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(xml_str)

    return output_path


# ─── Arc Sweep Configurations (Chapter 10, Table in Section 10.3.2) ──────────

ARC_SWEEP_CONFIGS = [
    ("baseline",    0),
    ("arc_090",    90),
    ("arc_120",   120),
    ("arc_160",   160),
    ("arc_210",   210),
    ("arc_255",   255),
    ("arc_320",   320),
    ("arc_360",   360),
]

# Asymmetric configurations (Section 10.6)
ASYMMETRIC_CONFIGS = [
    ("asym_control_sym250", 160, True,  "symmetric"),
    ("asym_prog_300to150",  160, False, "linear"),
    ("asym_prog_150to300",  160, False, "reverse"),
    ("asym_prog_350to150",  160, False, "step"),
    ("asym_parab_300to150", 160, False, "parabolic"),
    ("asym_prog_arc210",    210, False, "linear"),
]

# Pachymetry variations (thin, normal, thick)
PACHY_VARIATIONS = [
    ("pachy_thin",   400),  # μm
    ("pachy_normal", 500),
    ("pachy_thick",  600),
]


def get_all_geometry_configs():
    """Return list of (name, ICRSConfig) for all 17 geometry configurations."""
    configs = []

    # 8 arc sweeps (symmetric)
    for name, arc in ARC_SWEEP_CONFIGS:
        configs.append((name, ICRSConfig(arc_degrees=arc, symmetric=True)))

    # 6 asymmetric
    for name, arc, sym, profile in ASYMMETRIC_CONFIGS:
        configs.append((name, ICRSConfig(arc_degrees=arc, symmetric=sym,
                                         profile=profile)))

    # 3 pachymetry variations (with standard 160° arc)
    for name, pachy in PACHY_VARIATIONS:
        configs.append((name, ICRSConfig(arc_degrees=160, symmetric=True, pachymetry=pachy/1000.0)))

    return configs


# ─── HGO Parameter Variations (Section 13.4.6) ──────────────────────────────

def get_material_variations():
    """Return list of (name, HGOParams) for all 20 material variations.

    Each parameter is varied in 5 levels while others remain canonical.
    Level 3 = canonical values (control/reproducibility check).
    """
    variations = []

    # c variation (ground substance)
    c_levels = [0.01, 0.025, 0.05, 0.075, 0.10]
    for i, c_val in enumerate(c_levels):
        name = f"c_{i+1}_{c_val:.3f}"
        variations.append((name, HGOParams(c=c_val)))

    # k1 variation (fiber stiffness)
    k1_levels = [0.05, 0.10, 0.22, 0.35, 0.50]
    for i, k1_val in enumerate(k1_levels):
        name = f"k1_{i+1}_{k1_val:.2f}"
        variations.append((name, HGOParams(k1=k1_val)))

    # k2 variation (fiber nonlinearity)
    k2_levels = [10.0, 30.0, 100.0, 300.0, 1000.0]
    for i, k2_val in enumerate(k2_levels):
        name = f"k2_{i+1}_{k2_val:.0f}"
        variations.append((name, HGOParams(k2=k2_val)))

    # kappa variation (fiber dispersion)
    kappa_levels = [0.00, 0.05, 0.09, 0.18, 0.333]
    for i, kappa_val in enumerate(kappa_levels):
        name = f"kappa_{i+1}_{kappa_val:.3f}"
        variations.append((name, HGOParams(kappa=kappa_val)))

    return variations


def main():
    parser = argparse.ArgumentParser(
        description="Generate FEBio 4.0 model for AVBC corneal ICRS simulation")
    parser.add_argument("--output", "-o", required=True,
                        help="Output .feb file path")
    parser.add_argument("--c", type=float, default=DEFAULT_C,
                        help=f"Ground substance modulus (MPa) [default: {DEFAULT_C}]")
    parser.add_argument("--k1", type=float, default=DEFAULT_K1,
                        help=f"Fiber stiffness (MPa) [default: {DEFAULT_K1}]")
    parser.add_argument("--k2", type=float, default=DEFAULT_K2,
                        help=f"Fiber nonlinearity [default: {DEFAULT_K2}]")
    parser.add_argument("--kappa", type=float, default=DEFAULT_KAPPA,
                        help=f"Fiber dispersion [default: {DEFAULT_KAPPA}]")
    parser.add_argument("--arc", type=float, default=160.0,
                        help="ICRS arc length in degrees [default: 160]")
    parser.add_argument("--asymmetric", action="store_true",
                        help="Use asymmetric (progressive) ring profile")
    parser.add_argument("--profile", default="symmetric",
                        choices=["symmetric", "linear", "reverse",
                                 "step", "parabolic"],
                        help="Ring thickness profile [default: symmetric]")

    args = parser.parse_args()

    hgo = HGOParams(c=args.c, k1=args.k1, k2=args.k2, kappa=args.kappa)
    icrs = ICRSConfig(arc_degrees=args.arc, symmetric=not args.asymmetric,
                      profile=args.profile)

    path = generate_model(hgo, icrs, args.output)
    print(f"Generated: {path}")
    print(f"  HGO: c={hgo.c}, k1={hgo.k1}, k2={hgo.k2}, κ={hgo.kappa}, k={hgo.k}")
    print(f"  ICRS: arc={icrs.arc_degrees}°, profile={icrs.profile}")
    print(f"  Mesh: {nodes_per_layer() * N_Z} nodes, "
          f"{N_SEC + (N_RING - 1) * N_SEC} elements")


if __name__ == "__main__":
    main()
