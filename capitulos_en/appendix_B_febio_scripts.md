# Appendix B — FEBio Scripts and Extraction Pipeline Documentation

---

## B.1 Computational Pipeline Overview

The AVBC computational pipeline consists of four interlinked Python scripts that automate generation, execution, extraction, and analysis of finite element simulations. All scripts are located in the `simulations/` directory.

```
simulations/
├── generate_febio_model.py         # .feb model generator
├── run_parametric_campaign.py      # Parametric campaign orchestrator
├── extract_parametric_vectors.py   # Vector metric extraction
├── analyze_phenotype_discrimination.py  # Phenotypic discrimination analysis
├── calc_curvature.py               # Curvature calculation from displacements
├── models/                         # Generated .feb files
├── results/                        # Simulation outputs
└── analysis/                       # Discrimination reports
```

Sequential workflow:
1. **Generate** → `generate_febio_model.py` creates `.feb` files with configurable HGO parameters and ICRS geometry
2. **Execute** → `run_parametric_campaign.py` orchestrates parallel execution on FEBio 4.12
3. **Extract** → `extract_parametric_vectors.py` reads output files and calculates VR, VT, Vτ
4. **Analyze** → `analyze_phenotype_discrimination.py` performs sensitivity and discrimination analysis

---

## B.2 Model Generator: `generate_febio_model.py`

### Mesh Specification

| Parameter | Value | Description |
|:---|:---:|:---|
| Radius of curvature (R) | 7.8 mm | Mean corneal radius |
| Angular extent (θ_max) | 46.5° | Apex to limbus |
| Radial rings | 20 | Apex (ring 0) to limbus (ring 20) |
| Circumferential sectors | 24 | 15° each |
| Node layers | 2 | Posterior (z=0) and anterior (z=1) |
| Total nodes | 962 | 20 × 24 × 2 + 2 (apical nodes) |
| Pentahedral elements (apex) | 24 | Penta6 to avoid singularity |
| Hexahedral elements (body) | 456 | Linear Hex8 |
| **Total elements** | **480** | |
| Stromal thickness (t₀) | 500 μm | Uniform (canonical model) |

### ICRS Positioning
Ring 14 (r ≈ 4.2 mm from apex), corresponding to the 5–6 mm optical zone.

### Boundary Conditions
1. **Follower pressure:** 15 mmHg (0.002 MPa) on posterior face.
2. **Limbal fixation:** All DOFs fixed at ring 20.
3. **ICRS prescribed displacement:** +250 μm anteriorly (z), free in x and y.

### Usage

```bash
python generate_febio_model.py \
  --c 0.05 --k1 0.22 --k2 100 --kappa 0.09 \
  --arc 160 --thickness 250 \
  --output model_arc160_t250.feb
```

| Flag | Parameter | Default | Unit |
|:---|:---|:---:|:---|
| `--c` | Matrix stiffness | 0.05 | MPa |
| `--k1` | Fibrillar stiffness | 0.22 | MPa |
| `--k2` | Nonlinearity | 100 | — |
| `--kappa` | Dispersion | 0.09 | — |
| `--arc` | Arc length | 160 | degrees |
| `--thickness` | ICRS thickness | 250 | μm |
| `--progressive` | Progressive profile | — | linear/parabolic |
| `--output` | Output file | model.feb | — |

---

## B.3 Parametric Campaign: `run_parametric_campaign.py`

### Experimental Design (OAT Factorial)

**Material variations (20 configurations):**
- c: 0.01 / 0.02 / 0.03 / 0.05 / 0.07 / 0.10 MPa (6 values)
- k₁: 0.05 / 0.10 / 0.22 / 0.30 / 0.50 MPa (5 values)
- k₂: 10 / 50 / 100 / 200 / 500 (5 values)
- κ: 0.00 / 0.05 / 0.09 / 0.15 / 0.333 (5 values, including isotropic)

**Geometric variations (34 configurations):**
- Arcs: 90° / 120° / 160° / 210° / 255° / 290° / 320° / 360°
- Asymmetric: 150→300 / 200→300 / 300→150 / 300→200 μm, linear and parabolic
- Pachymetry: 400 / 500 / 600 μm

**Total: 377 simulations converged** from 680 attempted (convergence rate: 55.4%).

```bash
python run_parametric_campaign.py --jobs 4        # Full campaign
python run_parametric_campaign.py --subset geometry --jobs 2  # Geometry only
python run_parametric_campaign.py --dry-run        # Generate .feb without executing
```

---

## B.4 Vector Extraction: `extract_parametric_vectors.py`

### Extracted Metrics

| Metric | Symbol | Description | AVBC Vector |
|:---|:---:|:---|:---:|
| Apical displacement | δ_apex | uz displacement at node 1 (apex) | VR |
| Radial displacement | δ_ring | Mean radial displacement at ICRS ring | VT |
| Keratometric change | ΔK | Refractive power change (D) | VR |
| Circumferential strain | ε_circ | Mean tangential strain at ring | VT |
| Maximum stress | σ_max | Maximum von Mises stress (MPa) | — |
| Asymmetry index | AI | Displacement field asymmetry | Vτ |
| Flattest meridian | θ_flat | Direction of maximum flattening (°) | — |
| Steepest meridian | θ_steep | Direction of maximum curvature (°) | — |

### Curvature Calculation (ΔK)

$$\Delta K = \frac{n_{ref} - 1}{R_{post}} - \frac{n_{ref} - 1}{R_{pre}}$$

where $n_{ref} = 1.3375$ and $R$ is fitted to a local sphere over the central 3 mm.

---

## B.5 Discrimination Analysis: `analyze_phenotype_discrimination.py`

### Canonical Results

| Parameter | CV of δ_apex | Variance Explained |
|:---:|:---:|:---:|
| c (matrix) | **0.671** | **98.9%** |
| κ (dispersion) | 0.011 | 1.1% |
| k₁ (fibers) | 0.000 | < 0.02% |
| k₂ (stiffening) | 0.000 | 0.0% |

---

## B.6 Software Requirements

| Component | Version | Source |
|:---|:---:|:---|
| FEBio | 4.12 | [febio.org](https://febio.org) |
| Python | ≥ 3.8 | — |
| NumPy | ≥ 1.20 | `pip install numpy` |
| Pandas | ≥ 1.3 | `pip install pandas` |
| SciPy | ≥ 1.7 | `pip install scipy` |

### Full Pipeline Execution

```bash
python run_parametric_campaign.py --dry-run --jobs 4  # Generate models
python run_parametric_campaign.py --jobs 4             # Execute campaign
python extract_parametric_vectors.py --campaign results/campaign_summary.json
python analyze_phenotype_discrimination.py
```

---

## B.7 Reproducibility

All input files (`.feb`), binary outputs (`.xplt`), solver logs, and data extractions are versioned. Scripts are deterministic: given identical input parameters, the same `.feb` file is generated byte-for-byte. Random seed is fixed at `seed=42`.
