#!/usr/bin/env python3
"""
analyze_phenotype_discrimination.py — AVBC Phenotype Discrimination Analysis
============================================================================
Analyzes the parametric campaign vectors to assess whether the AVBC
classification scheme provides meaningful biomechanical discrimination.

Generates:
  1. Sensitivity analysis (which parameters dominate which metrics)
  2. Phenotype discrimination plots (can we distinguish phenotypes?)
  3. Summary tables for book chapters
"""

import csv
import json
import math
import os
import statistics
from collections import defaultdict
from dataclasses import dataclass
from typing import List, Dict, Tuple

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ANALYSIS_DIR = os.path.join(BASE_DIR, "analysis")
VECTORS_CSV = os.path.join(ANALYSIS_DIR, "parametric_vectors.csv")
VECTORS_JSON = os.path.join(ANALYSIS_DIR, "parametric_vectors.json")


def load_vectors() -> List[Dict]:
    """Load extracted vectors from JSON."""
    with open(VECTORS_JSON) as f:
        return json.load(f)


def sensitivity_analysis(vectors: List[Dict]) -> Dict:
    """Compute one-at-a-time sensitivity indices.

    Groups simulations by which parameter was varied and measures
    the range/std of each output metric across that parameter sweep.

    Returns a dict: {param: {metric: {range, std, cv, min, max}}}
    """
    metrics = ["delta_apex_um", "delta_ring_radial_um", "delta_K_diopters",
               "epsilon_circ", "asymmetry_index"]

    # Identify parameter sweeps from material names
    param_sweeps = {
        "c": "c_",
        "k1": "k1_",
        "k2": "k2_",
        "kappa": "kappa_",
    }

    # Also identify geometry sweeps
    geom_sweeps = {
        "arc": "arc_",
        "asymmetry": "asym_",
        "pachymetry": "pachy_",
    }

    results = {}

    # Material parameter sensitivity (fix geometry, vary material)
    for param, prefix in param_sweeps.items():
        # Get all vectors for this parameter sweep with a fixed geometry
        sweep_vectors = [v for v in vectors if v["material"].startswith(prefix)
                         and v["geometry"] == "arc_160"]

        if len(sweep_vectors) < 2:
            # Try baseline
            sweep_vectors = [v for v in vectors if v["material"].startswith(prefix)
                             and v["geometry"] == "baseline"]

        if len(sweep_vectors) < 2:
            continue

        param_results = {}
        for metric in metrics:
            values = [v[metric] for v in sweep_vectors]
            if all(v == 0 for v in values):
                continue

            val_range = max(values) - min(values)
            val_std = statistics.stdev(values) if len(values) > 1 else 0
            val_mean = statistics.mean(values)
            val_cv = abs(val_std / val_mean) if val_mean != 0 else 0

            param_results[metric] = {
                "range": val_range,
                "std": val_std,
                "cv": val_cv,
                "min": min(values),
                "max": max(values),
                "n": len(values),
                "values": sorted(values),
            }

        results[param] = param_results

    # Geometry parameter sensitivity (using canonical material)
    canonical_mats = [v for v in vectors if v["material"] == "canonical"]
    if not canonical_mats:
        # Use default material
        canonical_mats = [v for v in vectors
                          if v.get("c", 0) == 0.05 and v.get("k1", 0) == 0.22]

    for geom_type, prefix in geom_sweeps.items():
        sweep_vectors = [v for v in canonical_mats if v["geometry"].startswith(prefix)]

        if len(sweep_vectors) < 2:
            # Try with any material if canonical doesn't have geometry variants
            for mat_prefix in param_sweeps.values():
                sweep_vectors = [v for v in vectors
                                 if v["material"].startswith(mat_prefix.rstrip("_") + "_3_")
                                 and v["geometry"].startswith(prefix)]
                if len(sweep_vectors) >= 2:
                    break

        if len(sweep_vectors) < 2:
            continue

        param_results = {}
        for metric in metrics:
            values = [v[metric] for v in sweep_vectors]
            if all(v == 0 for v in values):
                continue

            val_range = max(values) - min(values)
            val_std = statistics.stdev(values) if len(values) > 1 else 0
            val_mean = statistics.mean(values)
            val_cv = abs(val_std / val_mean) if val_mean != 0 else 0

            param_results[metric] = {
                "range": val_range,
                "std": val_std,
                "cv": val_cv,
                "min": min(values),
                "max": max(values),
                "n": len(values),
            }

        results[geom_type] = param_results

    return results


def phenotype_discrimination(vectors: List[Dict]) -> Dict:
    """Assess whether different geometry configurations produce
    distinguishable biomechanical signatures.

    Groups vectors by geometry type and computes inter/intra-class
    distances for discrimination analysis.
    """
    metrics = ["delta_apex_um", "delta_ring_radial_um", "delta_K_diopters",
               "epsilon_circ", "asymmetry_index"]

    # Group by geometry
    geom_groups = defaultdict(list)
    for v in vectors:
        geom_groups[v["geometry"]].append(v)

    # Compute centroids for each geometry group
    centroids = {}
    for geom, group in geom_groups.items():
        centroid = {}
        for m in metrics:
            vals = [v[m] for v in group]
            centroid[m] = statistics.mean(vals) if vals else 0
        centroids[geom] = centroid

    # Compute intra-class variance (spread within a geometry type, across materials)
    intra_variance = {}
    for geom, group in geom_groups.items():
        variances = {}
        for m in metrics:
            vals = [v[m] for v in group]
            if len(vals) > 1:
                variances[m] = statistics.variance(vals)
            else:
                variances[m] = 0
        intra_variance[geom] = variances

    # Compute inter-class distances (between geometry types)
    geom_list = sorted(centroids.keys())
    inter_distances = {}
    for i, g1 in enumerate(geom_list):
        for j, g2 in enumerate(geom_list):
            if j <= i:
                continue
            dist = 0
            for m in metrics:
                if centroids[g1][m] != 0 or centroids[g2][m] != 0:
                    # Normalized distance
                    global_range = max(abs(centroids[g1][m]), abs(centroids[g2][m]))
                    if global_range > 0:
                        dist += ((centroids[g1][m] - centroids[g2][m]) / global_range) ** 2
            dist = math.sqrt(dist)
            inter_distances[f"{g1} vs {g2}"] = dist

    # Fisher's discrimination ratio (inter/intra variance)
    fisher_ratios = {}
    for m in metrics:
        inter_var = statistics.variance([c[m] for c in centroids.values()]) if len(centroids) > 1 else 0
        mean_intra_var = statistics.mean([iv[m] for iv in intra_variance.values()]) if intra_variance else 1
        if mean_intra_var > 0:
            fisher_ratios[m] = inter_var / mean_intra_var
        else:
            fisher_ratios[m] = float('inf') if inter_var > 0 else 0

    return {
        "centroids": centroids,
        "intra_variance": intra_variance,
        "inter_distances": inter_distances,
        "fisher_ratios": fisher_ratios,
        "n_groups": len(geom_groups),
        "n_total": len(vectors),
    }


def generate_ascii_sensitivity_table(sensitivity: Dict) -> str:
    """Generate ASCII table of sensitivity results."""
    lines = []
    lines.append("=" * 90)
    lines.append("SENSITIVITY ANALYSIS — One-at-a-Time Parameter Variation")
    lines.append("=" * 90)

    metric_labels = {
        "delta_apex_um": "δ_apex (μm)",
        "delta_ring_radial_um": "δ_ring (μm)",
        "delta_K_diopters": "ΔK (D)",
        "epsilon_circ": "ε_circ",
        "asymmetry_index": "AI",
    }

    for param, metrics in sorted(sensitivity.items()):
        lines.append(f"\n--- Parameter: {param} ---")
        header = f"{'Metric':<20} {'Min':>10} {'Max':>10} {'Range':>10} {'CV':>8} {'n':>4}"
        lines.append(header)
        lines.append("-" * len(header))

        for metric, data in sorted(metrics.items()):
            label = metric_labels.get(metric, metric)
            lines.append(
                f"{label:<20} {data['min']:>10.2f} {data['max']:>10.2f} "
                f"{data['range']:>10.2f} {data['cv']:>8.3f} {data['n']:>4}"
            )

    return "\n".join(lines)


def generate_ascii_discrimination_table(disc: Dict) -> str:
    """Generate ASCII table of discrimination results."""
    lines = []
    lines.append("\n" + "=" * 70)
    lines.append("PHENOTYPE DISCRIMINATION — Fisher Ratios")
    lines.append("=" * 70)
    lines.append(f"Groups: {disc['n_groups']} | Total vectors: {disc['n_total']}")
    lines.append("")

    metric_labels = {
        "delta_apex_um": "δ_apex (μm)",
        "delta_ring_radial_um": "δ_ring (μm)",
        "delta_K_diopters": "ΔK (D)",
        "epsilon_circ": "ε_circ",
        "asymmetry_index": "AI",
    }

    lines.append(f"{'Metric':<25} {'Fisher Ratio':>15} {'Interpretation':>20}")
    lines.append("-" * 60)

    for metric, ratio in sorted(disc["fisher_ratios"].items(),
                                  key=lambda x: -x[1]):
        label = metric_labels.get(metric, metric)
        if ratio > 10:
            interp = "EXCELLENT"
        elif ratio > 1:
            interp = "GOOD"
        elif ratio > 0.1:
            interp = "MARGINAL"
        else:
            interp = "POOR"

        lines.append(f"{label:<25} {ratio:>15.3f} {interp:>20}")

    # Top 5 inter-class distances
    lines.append(f"\n--- Top 10 Inter-Class Distances ---")
    sorted_dists = sorted(disc["inter_distances"].items(), key=lambda x: -x[1])
    for pair, dist in sorted_dists[:10]:
        lines.append(f"  {pair:<50} {dist:.3f}")

    # Bottom 5 (least distinguishable)
    lines.append(f"\n--- Bottom 5 Inter-Class Distances (least distinguishable) ---")
    for pair, dist in sorted_dists[-5:]:
        lines.append(f"  {pair:<50} {dist:.3f}")

    return "\n".join(lines)


def generate_centroid_table(disc: Dict) -> str:
    """Generate table of geometry centroids."""
    lines = []
    lines.append("\n" + "=" * 100)
    lines.append("GEOMETRY CENTROIDS — Mean Biomechanical Vectors by Configuration")
    lines.append("=" * 100)

    metric_labels = {
        "delta_apex_um": "δ_apex(μm)",
        "delta_ring_radial_um": "δ_ring(μm)",
        "delta_K_diopters": "ΔK(D)",
        "epsilon_circ": "ε_circ",
        "asymmetry_index": "AI",
    }

    metrics_order = ["delta_apex_um", "delta_ring_radial_um", "delta_K_diopters",
                     "epsilon_circ", "asymmetry_index"]

    header = f"{'Geometry':<35}" + "".join(f"{metric_labels[m]:>12}" for m in metrics_order)
    lines.append(header)
    lines.append("-" * len(header))

    for geom in sorted(disc["centroids"].keys()):
        c = disc["centroids"][geom]
        row = f"{geom:<35}"
        for m in metrics_order:
            row += f"{c[m]:>12.2f}"
        lines.append(row)

    return "\n".join(lines)


def main():
    """Run the complete phenotype discrimination analysis."""
    os.makedirs(ANALYSIS_DIR, exist_ok=True)

    print("Loading vectors...")
    vectors = load_vectors()
    print(f"  Loaded {len(vectors)} vectors")

    # Filter out vectors without displacement data
    valid = [v for v in vectors if v.get("delta_apex_um", 0) != 0]
    print(f"  {len(valid)} with displacement data")

    # 1. Sensitivity Analysis
    print("\n1. Sensitivity Analysis...")
    sensitivity = sensitivity_analysis(valid)
    sens_table = generate_ascii_sensitivity_table(sensitivity)
    print(sens_table)

    # 2. Phenotype Discrimination
    print("\n2. Phenotype Discrimination...")
    discrimination = phenotype_discrimination(valid)
    disc_table = generate_ascii_discrimination_table(discrimination)
    print(disc_table)

    # 3. Centroid Table
    centroid_table = generate_centroid_table(discrimination)
    print(centroid_table)

    # Save results
    report_path = os.path.join(ANALYSIS_DIR, "discrimination_report.txt")
    with open(report_path, "w") as f:
        f.write("AVBC Parametric Campaign — Phenotype Discrimination Report\n")
        f.write(f"Total simulations: {len(vectors)}\n")
        f.write(f"Valid vectors: {len(valid)}\n\n")
        f.write(sens_table + "\n")
        f.write(disc_table + "\n")
        f.write(centroid_table + "\n")

    print(f"\nReport saved: {report_path}")

    # Save sensitivity JSON
    sens_json = {k: {m: {sk: sv for sk, sv in v.items() if sk != "values"}
                      for m, v in metrics.items()}
                 for k, metrics in sensitivity.items()}
    sens_path = os.path.join(ANALYSIS_DIR, "sensitivity_analysis.json")
    with open(sens_path, "w") as f:
        json.dump(sens_json, f, indent=2)

    # Save discrimination JSON
    disc_path = os.path.join(ANALYSIS_DIR, "discrimination_analysis.json")
    disc_save = {
        "fisher_ratios": discrimination["fisher_ratios"],
        "n_groups": discrimination["n_groups"],
        "n_total": discrimination["n_total"],
        "centroids": discrimination["centroids"],
    }
    with open(disc_path, "w") as f:
        json.dump(disc_save, f, indent=2)

    print(f"Sensitivity: {sens_path}")
    print(f"Discrimination: {disc_path}")


if __name__ == "__main__":
    main()
