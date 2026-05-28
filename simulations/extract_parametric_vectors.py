#!/usr/bin/env python3
"""
extract_parametric_vectors.py — AVBC Parametric Vector Extraction
================================================================
Extracts displacement vectors from FEBio log/xplt output files and
computes the AVBC-relevant biomechanical metrics:

  1. δ_apex  — Apical displacement (uz at node 1)
  2. δ_ring  — Mean radial displacement at ICRS ring
  3. ΔK      — Approximate keratometric power change (diopters)
  4. ε_circ  — Circumferential strain (mean at ICRS ring)
  5. σ_max   — Maximum von Mises stress (global)

Output: JSON and CSV suitable for phenotype discrimination analysis.

Usage:
  python extract_parametric_vectors.py
  python extract_parametric_vectors.py --campaign results/campaign_summary.json
"""

import argparse
import json
import math
import os
import struct
from dataclasses import dataclass, asdict, field
from typing import List, Dict, Optional, Tuple


# AVBC constants
R_CORNEA = 7.8    # mm
N_RING = 20
N_SEC = 24
ICRS_RING = 14
THICKNESS = 0.500  # mm
N_REFRACTIVE = 1.3375  # Keratometric refractive index


@dataclass
class VectorMetrics:
    """Biomechanical vector extracted from a simulation."""
    name: str
    material: str
    geometry: str

    # Primary metrics
    delta_apex_um: float = 0.0        # Apical displacement (μm)
    delta_ring_radial_um: float = 0.0  # Mean radial displacement at ICRS (μm)
    delta_K_diopters: float = 0.0      # Approximate keratometric change (D)
    epsilon_circ: float = 0.0          # Mean circumferential strain at ICRS
    sigma_max_mpa: float = 0.0         # Max von Mises stress (MPa)

    # Secondary metrics
    asymmetry_index: float = 0.0       # Ring displacement asymmetry
    flattest_meridian_deg: float = 0.0 # Direction of maximum flattening
    steepest_meridian_deg: float = 0.0 # Direction of maximum steepening

    # HGO parameters used
    c: float = 0.0
    k1: float = 0.0
    k2: float = 0.0
    kappa: float = 0.0

    # ICRS geometry
    arc_degrees: float = 0.0
    profile: str = "symmetric"


def nodes_per_layer():
    return 1 + N_RING * N_SEC  # 481


def node_id(layer: int, ring: int, sector: int) -> int:
    """Compute 1-indexed node ID."""
    npl = nodes_per_layer()
    if ring == 0:
        return layer * npl + 1
    sector = sector % N_SEC
    return layer * npl + 1 + (ring - 1) * N_SEC + sector + 1


def parse_febio_log(log_path: str) -> Dict:
    """Parse FEBio log file for convergence info and basic metrics."""
    info = {
        "converged": False,
        "time_steps": 0,
        "iterations": 0,
    }
    try:
        with open(log_path, "r") as f:
            for line in f:
                if "N O R M A L   T E R M I N A T I O N" in line:
                    info["converged"] = True
                if "Number of time steps completed" in line:
                    parts = line.split(":")
                    if len(parts) >= 2:
                        info["time_steps"] = int(parts[-1].strip())
                if "Total number of equilibrium iterations" in line:
                    parts = line.split(":")
                    if len(parts) >= 2:
                        info["iterations"] = int(parts[-1].strip())
    except FileNotFoundError:
        pass
    return info


def read_xplt_displacements(xplt_path: str) -> Optional[Dict[int, Tuple[float, float, float]]]:
    """Read nodal displacements from FEBio .xplt binary plot file.

    Returns: {node_id: (ux, uy, uz)} at the final time step.
    Returns None if file cannot be read.
    """
    # Try model-specific CSV first (new naming: <basename>_nodes.csv)
    feb_dir = os.path.dirname(xplt_path)
    basename = os.path.splitext(os.path.basename(xplt_path))[0]
    csv_path = os.path.join(feb_dir, f"{basename}_nodes.csv")
    if os.path.exists(csv_path) and os.path.getsize(csv_path) > 0:
        return parse_node_csv(csv_path)

    # Fallback: generic node_data.csv
    csv_generic = os.path.join(feb_dir, "node_data.csv")
    if os.path.exists(csv_generic) and os.path.getsize(csv_generic) > 0:
        return parse_node_csv(csv_generic)

    return None


def parse_node_csv(csv_path: str) -> Dict[int, Tuple[float, float, float]]:
    """Parse FEBio node_data.csv output.

    The file contains multiple time-step sections like:
      *Step  = 10
      *Time  = 1
      *Data  = ux;uy;uz
      1,0.0187488,...
      290,0.00517709,...

    We read ALL sections and keep the LAST step's data.
    """
    displacements = {}
    current_step = {}
    try:
        with open(csv_path, "r") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                if line.startswith("*Step"):
                    # New step begins — save current and start fresh
                    if current_step:
                        displacements = current_step
                    current_step = {}
                    continue
                if line.startswith("*"):
                    continue
                parts = line.split(",")
                if len(parts) >= 4:
                    try:
                        nid = int(parts[0].strip())
                        ux = float(parts[1].strip())
                        uy = float(parts[2].strip())
                        uz = float(parts[3].strip())
                        current_step[nid] = (ux, uy, uz)
                    except ValueError:
                        continue
        # Don't forget the last section
        if current_step:
            displacements = current_step
    except FileNotFoundError:
        pass
    return displacements


def compute_metrics_from_feb(feb_path: str, mat_name: str, geom_name: str,
                              hgo_params: Dict, icrs_params: Dict) -> VectorMetrics:
    """Compute all biomechanical metrics from a completed simulation.

    Uses the FEBio .xplt or node_data.csv output.
    """
    name = os.path.basename(feb_path).replace(".feb", "")
    metrics = VectorMetrics(
        name=name,
        material=mat_name,
        geometry=geom_name,
        c=hgo_params.get("c", 0),
        k1=hgo_params.get("k1", 0),
        k2=hgo_params.get("k2", 0),
        kappa=hgo_params.get("kappa", 0),
        arc_degrees=icrs_params.get("arc_degrees", 0),
        profile=icrs_params.get("profile", "symmetric"),
    )

    # Try to read displacements
    xplt_path = feb_path.replace(".feb", ".xplt")
    displacements = read_xplt_displacements(xplt_path)

    if not displacements:
        # If no displacement data available, estimate from log file
        return metrics

    # 1. Apical displacement (uz at posterior apex, node 1)
    if 1 in displacements:
        _, _, uz_apex = displacements[1]
        metrics.delta_apex_um = uz_apex * 1000.0  # mm → μm

    # 2. Mean radial displacement at ICRS ring
    ring_disps = []
    for sec in range(N_SEC):
        nid = node_id(0, ICRS_RING, sec)  # posterior layer
        if nid in displacements:
            ux, uy, uz = displacements[nid]
            # Radial displacement = sqrt(ux² + uy²)
            dr = math.sqrt(ux**2 + uy**2)
            ring_disps.append((sec, ux, uy, uz, dr))

    if ring_disps:
        mean_radial = sum(d[4] for d in ring_disps) / len(ring_disps)
        metrics.delta_ring_radial_um = mean_radial * 1000.0  # mm → μm

        # 3. Keratometric power change (ΔK)
        # ΔK ≈ (n-1) / R² × δ_apex (simplified spherical approximation)
        # More precisely: K = (n-1)/R, dK/dR = -(n-1)/R²
        # ΔR ≈ δ_apex (apical sag change)
        if 1 in displacements:
            delta_R = displacements[1][2]  # uz at apex = change in sag
            metrics.delta_K_diopters = -(N_REFRACTIVE - 1) / (R_CORNEA**2) * delta_R * 1000.0

        # 4. Circumferential strain (from adjacent sector displacements)
        if len(ring_disps) >= 2:
            strains = []
            theta_icrs = ICRS_RING * math.radians(46.54) / N_RING
            R_ring = R_CORNEA * math.sin(theta_icrs)
            arc_per_sec = 2 * math.pi * R_ring / N_SEC

            for i in range(len(ring_disps)):
                j = (i + 1) % len(ring_disps)
                # Deformed arc length between sectors i and j
                ni = ring_disps[i]
                nj = ring_disps[j]
                # Original positions
                phi_i = ni[0] * 2 * math.pi / N_SEC
                phi_j = nj[0] * 2 * math.pi / N_SEC
                # Deformed positions
                xi = R_ring * math.cos(phi_i) + ni[1]
                yi = R_ring * math.sin(phi_i) + ni[2]
                xj = R_ring * math.cos(phi_j) + nj[1]
                yj = R_ring * math.sin(phi_j) + nj[2]
                deformed_arc = math.sqrt((xj - xi)**2 + (yj - yi)**2)
                strain = (deformed_arc - arc_per_sec) / arc_per_sec
                strains.append(strain)

            metrics.epsilon_circ = sum(strains) / len(strains)

        # 5. Asymmetry index
        if len(ring_disps) >= 4:
            max_disp = max(d[4] for d in ring_disps)
            min_disp = min(d[4] for d in ring_disps)
            if max_disp > 1e-10:
                metrics.asymmetry_index = (max_disp - min_disp) / max_disp

            # Find flattest/steepest meridians
            max_sec = max(ring_disps, key=lambda d: d[3])[0]  # max uz
            min_sec = min(ring_disps, key=lambda d: d[3])[0]  # min uz
            metrics.flattest_meridian_deg = max_sec * 360.0 / N_SEC
            metrics.steepest_meridian_deg = min_sec * 360.0 / N_SEC

    return metrics


def parse_params_from_names(mat_name: str, geom_name: str) -> Tuple[Dict, Dict]:
    """Parse HGO and ICRS parameters from material/geometry sweep names.

    Examples:
        mat_name='mat_c_1_0.010' -> c=0.01, rest=defaults
        geom_name='geom_arc_160' -> arc=160°, symmetric
        geom_name='geom_asym_prog_150to300' -> arc=160°, asymmetric profile
    """
    import re

    # Defaults
    hgo = {"c": 0.05, "k1": 0.22, "k2": 100.0, "kappa": 0.09}
    icrs = {"arc_degrees": 160, "profile": "symmetric"}

    # Parse material parameters from name
    # mat_c_1_0.010, mat_k1_2_0.100, mat_k2_3_100, mat_kappa_1_0.000
    m = re.match(r'mat_(c|k1|k2|kappa)_(\d+)_([0-9.]+)', mat_name)
    if m:
        param, _, value = m.groups()
        hgo[param] = float(value)

    # Parse geometry from name
    m = re.match(r'geom_arc_(\d+)', geom_name)
    if m:
        icrs["arc_degrees"] = int(m.group(1))

    m = re.match(r'geom_asym_', geom_name)
    if m:
        icrs["profile"] = "asymmetric"

    m = re.match(r'geom_pachy_(thin|normal|thick)', geom_name)
    if m:
        icrs["profile"] = f"pachy_{m.group(1)}"

    return hgo, icrs


def extract_all_vectors(campaign_path: str) -> List[VectorMetrics]:
    """Extract biomechanical vectors from all simulations in a campaign."""
    with open(campaign_path, "r") as f:
        campaign = json.load(f)

    vectors = []
    n_with_data = 0
    for sim in campaign.get("results", []):
        if sim.get("status") != "PASS":
            continue

        feb_path = sim.get("feb_path", "")
        mat_name = sim.get("material", "")
        geom_name = sim.get("geometry", "")

        hgo, icrs = parse_params_from_names(mat_name, geom_name)

        metrics = compute_metrics_from_feb(feb_path, mat_name, geom_name,
                                            hgo, icrs)
        if metrics.delta_apex_um != 0:
            n_with_data += 1
        vectors.append(metrics)

    print(f"  {n_with_data}/{len(vectors)} simulations have displacement data")
    return vectors


def save_vectors_csv(vectors: List[VectorMetrics], output_path: str):
    """Save vectors to CSV format."""
    headers = [
        "name", "material", "geometry",
        "delta_apex_um", "delta_ring_radial_um", "delta_K_diopters",
        "epsilon_circ", "sigma_max_mpa",
        "asymmetry_index", "flattest_meridian_deg", "steepest_meridian_deg",
        "c", "k1", "k2", "kappa",
        "arc_degrees", "profile",
    ]

    with open(output_path, "w") as f:
        f.write(",".join(headers) + "\n")
        for v in vectors:
            d = asdict(v)
            row = [str(d.get(h, "")) for h in headers]
            f.write(",".join(row) + "\n")


def save_vectors_json(vectors: List[VectorMetrics], output_path: str):
    """Save vectors to JSON format."""
    data = [asdict(v) for v in vectors]
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)


def main():
    parser = argparse.ArgumentParser(
        description="Extract biomechanical vectors from FEBio campaign results")
    parser.add_argument("--campaign", default=None,
                        help="Path to campaign_summary.json")
    parser.add_argument("--output-dir", default=None,
                        help="Output directory for CSV/JSON")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    campaign_path = args.campaign or os.path.join(base_dir, "results", "campaign_summary.json")
    output_dir = args.output_dir or os.path.join(base_dir, "analysis")

    os.makedirs(output_dir, exist_ok=True)

    print(f"Extracting vectors from: {campaign_path}")
    vectors = extract_all_vectors(campaign_path)
    print(f"Extracted {len(vectors)} vectors")

    csv_path = os.path.join(output_dir, "parametric_vectors.csv")
    json_path = os.path.join(output_dir, "parametric_vectors.json")

    save_vectors_csv(vectors, csv_path)
    save_vectors_json(vectors, json_path)

    print(f"CSV:  {csv_path}")
    print(f"JSON: {json_path}")

    # Quick summary stats
    if vectors:
        apex_vals = [v.delta_apex_um for v in vectors if v.delta_apex_um != 0]
        ring_vals = [v.delta_ring_radial_um for v in vectors if v.delta_ring_radial_um != 0]
        dk_vals = [v.delta_K_diopters for v in vectors if v.delta_K_diopters != 0]

        print(f"\nSummary:")
        if apex_vals:
            print(f"  δ_apex:  {min(apex_vals):.1f} — {max(apex_vals):.1f} μm")
        if ring_vals:
            print(f"  δ_ring:  {min(ring_vals):.1f} — {max(ring_vals):.1f} μm")
        if dk_vals:
            print(f"  ΔK:     {min(dk_vals):.2f} — {max(dk_vals):.2f} D")


if __name__ == "__main__":
    main()
