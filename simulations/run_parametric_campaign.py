#!/usr/bin/env python3
"""
run_parametric_campaign.py — AVBC Parametric Simulation Campaign
================================================================
Generates and runs the full 20 × 34 = 680 simulation matrix:
  - 20 material variations (c, k1, k2, κ)
  - 34 geometry configurations (8 arc + 6 asymmetric + 3 pachymetry + 17 extra)

Each simulation:
  1. Generates a .feb file via generate_febio_model.py
  2. Runs FEBio solver
  3. Records pass/fail + timing

Usage:
  python run_parametric_campaign.py --jobs 4
  python run_parametric_campaign.py --jobs 1 --dry-run
  python run_parametric_campaign.py --subset geometry  # Only geometry sweep
"""

import argparse
import json
import os
import subprocess
import time
from datetime import datetime
from dataclasses import dataclass, asdict
from typing import List, Tuple, Optional
from concurrent.futures import ProcessPoolExecutor, as_completed

from generate_febio_model import (
    HGOParams, ICRSConfig, generate_model,
    get_material_variations, get_all_geometry_configs,
    THICKNESS, DEFAULT_C, DEFAULT_K1, DEFAULT_K2, DEFAULT_KAPPA, DEFAULT_K,
)

# ─── Configuration ────────────────────────────────────────────────────────────

FEBIO_BIN = "/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
RESULTS_DIR = os.path.join(BASE_DIR, "results")
TIMEOUT_SEC = 120  # Max time per simulation (seconds)


@dataclass
class SimResult:
    """Result of a single simulation."""
    name: str
    material: str
    geometry: str
    status: str  # "PASS", "FAIL", "TIMEOUT", "ERROR"
    elapsed_sec: float
    feb_path: str
    log_path: str
    error_msg: str = ""


def run_single_simulation(name: str, hgo: HGOParams, icrs: ICRSConfig,
                          mat_name: str, geom_name: str) -> SimResult:
    """Generate and run a single FEBio simulation."""
    feb_path = os.path.join(MODELS_DIR, f"{name}.feb")
    log_path = os.path.join(RESULTS_DIR, f"{name}.log")

    # Generate model
    try:
        generate_model(hgo, icrs, feb_path)
    except Exception as e:
        return SimResult(name, mat_name, geom_name, "ERROR", 0.0,
                         feb_path, log_path, f"Generation: {e}")

    # Run FEBio
    t0 = time.time()
    try:
        result = subprocess.run(
            [FEBIO_BIN, "-i", feb_path],
            capture_output=True, text=True,
            timeout=TIMEOUT_SEC,
            cwd=os.path.dirname(feb_path),
        )
        elapsed = time.time() - t0

        # Check output for normal termination
        output = result.stdout + result.stderr
        if "N O R M A L   T E R M I N A T I O N" in output:
            status = "PASS"
            error_msg = ""
        elif "Negative jacobian" in output:
            status = "FAIL"
            error_msg = "Negative Jacobian"
        elif "ERROR" in output:
            # Extract error message
            lines = output.split("\n")
            error_lines = [l for l in lines if "ERROR" in l or "error" in l.lower()]
            status = "FAIL"
            error_msg = "; ".join(error_lines[:3])
        else:
            status = "FAIL"
            error_msg = f"Exit code {result.returncode}"

        # Save log
        os.makedirs(os.path.dirname(log_path), exist_ok=True)
        with open(log_path, "w") as f:
            f.write(output)

    except subprocess.TimeoutExpired:
        elapsed = time.time() - t0
        status = "TIMEOUT"
        error_msg = f"Exceeded {TIMEOUT_SEC}s"

    except Exception as e:
        elapsed = time.time() - t0
        status = "ERROR"
        error_msg = str(e)

    return SimResult(name, mat_name, geom_name, status, elapsed,
                     feb_path, log_path, error_msg)


def build_simulation_matrix(subset: str = "all"):
    """Build the full (or partial) simulation matrix.

    Returns: list of (name, HGOParams, ICRSConfig, mat_name, geom_name)
    """
    materials = get_material_variations()
    geometries = get_all_geometry_configs()

    sims = []

    if subset in ("all", "material"):
        # Material sweep: each material × canonical geometry (160° symmetric)
        canonical_geom = ICRSConfig(arc_degrees=160, symmetric=True)
        for mat_name, hgo in materials:
            name = f"mat_{mat_name}_geom_arc160"
            sims.append((name, hgo, canonical_geom, mat_name, "arc_160"))

    if subset in ("all", "geometry"):
        # Geometry sweep: canonical material × each geometry
        canonical_mat = HGOParams()
        for geom_name, icrs in geometries:
            name = f"mat_canonical_geom_{geom_name}"
            sims.append((name, canonical_mat, icrs, "canonical", geom_name))

    if subset == "all":
        # Full cross: each material × each geometry (excluding duplicates)
        done = {s[0] for s in sims}
        for mat_name, hgo in materials:
            for geom_name, icrs in geometries:
                name = f"mat_{mat_name}_geom_{geom_name}"
                if name not in done:
                    sims.append((name, hgo, icrs, mat_name, geom_name))
                    done.add(name)

    return sims


def run_campaign(jobs: int = 4, subset: str = "all", dry_run: bool = False):
    """Run the full parametric campaign."""
    sims = build_simulation_matrix(subset)
    total = len(sims)
    print(f"\n{'='*60}")
    print(f"AVBC Parametric Campaign — {total} simulations")
    print(f"Subset: {subset} | Parallel jobs: {jobs}")
    print(f"{'='*60}\n")

    if dry_run:
        for name, hgo, icrs, mat_name, geom_name in sims[:10]:
            print(f"  [DRY] {name}: c={hgo.c}, k1={hgo.k1}, arc={icrs.arc_degrees}")
        print(f"  ... and {total-10} more")
        return

    os.makedirs(MODELS_DIR, exist_ok=True)
    os.makedirs(RESULTS_DIR, exist_ok=True)

    results: List[SimResult] = []
    t_start = time.time()
    passed = 0
    failed = 0

    if jobs == 1:
        # Sequential execution
        for i, (name, hgo, icrs, mat_name, geom_name) in enumerate(sims):
            r = run_single_simulation(name, hgo, icrs, mat_name, geom_name)
            results.append(r)
            icon = "✓" if r.status == "PASS" else "✗"
            if r.status == "PASS":
                passed += 1
            else:
                failed += 1
            print(f"  [{i+1:3d}/{total}] {icon} {r.name} ({r.elapsed_sec:.1f}s) {r.error_msg}")
    else:
        # Parallel execution
        with ProcessPoolExecutor(max_workers=jobs) as executor:
            futures = {}
            for name, hgo, icrs, mat_name, geom_name in sims:
                f = executor.submit(run_single_simulation,
                                    name, hgo, icrs, mat_name, geom_name)
                futures[f] = name

            for i, future in enumerate(as_completed(futures)):
                r = future.result()
                results.append(r)
                icon = "✓" if r.status == "PASS" else "✗"
                if r.status == "PASS":
                    passed += 1
                else:
                    failed += 1
                print(f"  [{i+1:3d}/{total}] {icon} {r.name} ({r.elapsed_sec:.1f}s) "
                      f"{r.error_msg}")

    elapsed_total = time.time() - t_start

    # ── Summary ──
    print(f"\n{'='*60}")
    print(f"CAMPAIGN COMPLETE — {elapsed_total:.1f}s total")
    print(f"  PASS: {passed}/{total}  ({100*passed/total:.1f}%)")
    print(f"  FAIL: {failed}/{total}")
    print(f"{'='*60}\n")

    # Save results
    summary = {
        "timestamp": datetime.now().isoformat(),
        "total": total,
        "passed": passed,
        "failed": failed,
        "elapsed_sec": elapsed_total,
        "subset": subset,
        "results": [asdict(r) for r in results],
    }
    summary_path = os.path.join(RESULTS_DIR, "campaign_summary.json")
    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=2)
    print(f"Summary saved to: {summary_path}")

    # Print failures
    failures = [r for r in results if r.status != "PASS"]
    if failures:
        print(f"\n  Failed simulations:")
        for r in failures[:20]:
            print(f"    {r.name}: {r.status} — {r.error_msg}")

    return results


def main():
    parser = argparse.ArgumentParser(
        description="Run AVBC parametric FEBio campaign")
    parser.add_argument("--jobs", "-j", type=int, default=4,
                        help="Number of parallel FEBio jobs [default: 4]")
    parser.add_argument("--subset", choices=["all", "material", "geometry"],
                        default="all",
                        help="Which subset to run [default: all]")
    parser.add_argument("--dry-run", action="store_true",
                        help="Just print what would be run")
    args = parser.parse_args()

    run_campaign(jobs=args.jobs, subset=args.subset, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
