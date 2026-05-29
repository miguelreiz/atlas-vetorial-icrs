<!-- GPT revision applied -->
# Chapter 14 — The AVBC Software Platform: From Framework to Tool

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part V — Horizons*

---

> **Key Points**
> - The AVBC platform translates the theoretical framework into a **clinical decision support tool**.
> - Input: standardized clinical data (tomography, aberrometry, refraction).
> - Output: ranked ring recommendations with expected biomechanical outcomes.
> - A pre-computed FEM lookup table (N=377) enables rapid predictions without real-time simulation.
> - The interactive simulator allows the surgeon to explore the parameter space and understand the rationale.

## 14.1 Introduction

A biomechanical framework, however elegant in theory, becomes clinically impactful only when it is accessible to the surgeon in practice. The AVBC classification — trimodal assessment, vector selection, ring prescription — involves quantitative criteria, FEM-derived predictions, and a structured decision tree that, while perfectly understandable, benefit from computational support. This chapter describes the architecture and workflow of an envisioned AVBC software platform that would automate the trimodal assessment and provide vector-based ring recommendations from standardized clinical data.

The platform is conceived not as a substitute for clinical judgment, but as a **decision support tool** — analogous to the Barrett Universal II formula for IOL calculation or the Alpins ASSORT software for astigmatism analysis. The surgeon provides the input data, the software performs the biomechanical analysis, and the output is a ranked list of ring configurations with expected VR, VT, and Vτ values for each.

> [!NOTE]
> **For the Clinician: The Software Does Not Replace the Surgeon**
> The AVBC platform functions like Barrett or ASSORT: you enter the data, the software calculates, and you decide. The platform generates a *recommendation*, not a *prescription*. The surgeon always has the final word.

---

## 14.2 System Architecture

![Figure 14.1 — AVBC software platform architecture: input, processing, and output layers.](book_figures/fig_14_01_arquitetura_software.svg)

### 14.2.1 Input Layer

The AVBC platform accepts standardized clinical data from three sources:

1. **Corneal tomography (Pentacam/Galilei export in DICOM or CSV format):**
 - Sagittal curvature map → topographic classification (Module T)
 - Posterior elevation map → MNA calculation
 - Pachymetric map → depth constraints, ring safety margins
 - K-steep, K-flat, KMax values

2. **Wavefront aberrometry (Zywave, iTrace, or OPD-Scan export):**
 - Zernike coefficients → Coma RMS, Total HOA RMS (Module O)
 - Coma vector direction and magnitude

3. **Clinical refraction and clinical data (manual entry):**
 - Sphere, cylinder, axis
 - BCVA (Best-Corrected Visual Acuity)
 - Age, CXL history, prior surgery

### 14.2.2 Processing Layer

The processing layer implements three modules:

**Module O Classifier:**
- Applies the five optical criteria (ICE_min, Coma RMS, Δ Axis, Total HOA, Coma vs apex) from wavefront and refraction data.
- Outputs: O+, O~, or O− classification with justification.

**Module T Classifier:**
- Analyzes the sagittal curvature map using pattern recognition (template matching against five canonical morphologies: central oval, inferior nipple, paracentral crescent, peripheral D-shape, globus).
- Computes the MNA from the posterior elevation map: identifies the meridian of maximum posterior elevation relative to the best-fit sphere (BFS).
- Computes MNA divergence: |MNA − K-steep|.
- Outputs: morphological classification and MNA angle with divergence flag.

**Module B Vector Engine:**
- Based on the clinical need (determined by Modules O and T), identifies the dominant vector(s).
- Applies FEM-derived lookup tables:
 - VR as a function of ring thickness (from the concentric simulation series)
 - VT as a function of arc length (from the VT monotonicity equation)
 - Vτ as a function of asymmetry ratio (from the validated progressive-thickness asymmetric simulation data)
- Generates a ranked list of ring configurations (thickness × arc × depth × meridian × profile) ordered by expected biomechanical benefit.

### 14.2.3 Output Layer

The output presents:

1. **AVBC Classification Summary:** O grade, T classification, B vector dominance, MNA divergence.
2. **Recommended Ring Configuration:** Top 3 configurations ranked by vector match, with expected VR, VT, Vτ values for each.
3. **Nomogram Comparison:** Shows what the Ferrara/Keraring/Intacs nomogram would prescribe and highlights differences.
4. **Visualization:** Interactive corneal map showing the expected displacement field (VR), stress redistribution (VT), and apex migration direction (Vτ) for the recommended configuration.

---

![Figure 14.2 — AVBC clinical dashboard concept (dark mode).](book_figures/fig_14_02_dashboard_mockup.svg)

## 14.3 The FEM Lookup Table

At the core of the Module B engine is a **parameterized lookup table** derived from FEM simulations. Rather than running a full finite element analysis for each patient (which would require minutes to hours), the platform interpolates from a pre-computed database.

### 14.3.1 Current Table (34 Simulations)

The existing simulation set provides:

| Parameter Range | Values | N Simulations |
|---|---|---|
| Arc length | 90°, 120°, 160°, 210°, 255°, 320°, 360° | 7 (arc sweep) |
| Ring thickness | 250 μm (standard) | 1 level |
| Corneal geometry | Spherical, uniform, R=7.8 mm | 1 geometry |
| IOP | 15 mmHg | 1 level |
| Material | Standard HGO parameters | 1 set |
| Patient-specific | 8 converged Pentacam-derived | 8 |
| Concentric loading | 13 configurations | 13 |
| Progressive asymmetric | 6 progressive-thickness profiles | 6 |

This provides sufficient coverage for arc length sensitivity (VT equation) and basic active torque vector Vτ validation, but limited coverage for thickness sensitivity sweep. Expanding the database to include multiple thickness values (150, 200, 250, 300, 350, 400 μm) and multiple geometries (sphere, prolate ellipsoid, keratoconic cone) would require approximately 200 additional simulations.

### 14.3.2 Interpolation Strategy

For configurations not directly simulated, the platform uses bilinear interpolation between the nearest computed points:

- **VR(thickness):** Linear interpolation from thickness series data (to be generated).
- **VT(arc):** Direct application of the empirical equation: VT = −0.0018 × arc° + 7.79.
- **Vτ(asymmetry):** Derived from the validated progressive-thickness asymmetric simulations, using thickness differential and arc length as fundamental parameters.
- **Depth correction:** Applied as a multiplicative factor based on the depth/pachymetry ratio.

### 14.3.3 Future: Real-Time FEM

With advances in GPU-accelerated FEM solvers (e.g., FEBio with OpenCL) and reduced-order models, real-time patient-specific simulation may become feasible. A reduced-order model trained on 500+ full FEM solutions could provide VR, VT, Vτ estimates in seconds rather than hours, enabling intraoperative use.

---

## 14.4 User Interface Concept

### 14.4.1 Clinical Dashboard

The main screen presents a **four-panel layout:**

| Panel | Content |
|---|---|
| Upper left | Tomographic map with MNA overlay (Module T view) |
| Upper right | Wavefront chart with O classification (Module O view) |
| Lower left | Vector selection screen: VR, VT, Vτ bars showing predicted values for the selected ring |
| Lower right | Ring prescription panel: configuration parameters, expected outcomes, nomogram comparison |

### 14.4.2 Interactive Ring Simulator

A slider-based interface allows the surgeon to adjust ring parameters and observe the predicted effect in real time:

- **Thickness slider:** 150–400 μm → updates VR prediction
- **Arc length slider:** 90°–360° → updates VT prediction (with VT equation display)
- **Asymmetry toggle:** Symmetric / Progressive → enables Vτ prediction
- **Depth slider:** 60–80% → updates all vectors (amplification factor)
- **Meridian selector:** 0°–360° → rotates ring placement, shows MNA alignment

Each adjustment updates the predicted ΔK, ΔCyl, and apex migration values in real time.

> [!TIP]
> **For the Clinician: Imagine This in Practice**
> Before surgery, open the software, enter the Pentacam and aberrometry data. The system automatically classifies (O+, Paracentral crescent, VT dominant). Drag the arc slider from 160° to 210° and watch VT increase. Drag the thickness and watch VR increase. Compare with what the nomogram would suggest. In 2 minutes, you have a biomechanically justified prescription.

### 14.4.3 Postoperative Analysis Module

After surgery, the platform accepts postoperative data and computes:
- AVBC-CI = ΔK_observed / ΔK_predicted
- VT-ratio = ΔCyl_observed / ΔCyl_predicted
- Vτ-ratio = Apex_migration_observed / Apex_migration_predicted

These values are stored in the surgeon's personal database, building the calibration curve over time.

---

## 14.5 Technical Implementation

### 14.5.1 Recommended Technology Stack

| Component | Technology | Justification |
|---|---|---|
| Backend | Python 3.10+ | FEBio integration, scientific computing |
| FEM Solver | FEBio 4.x (C++ with Python bindings) | Open source, validated for biomechanics |
| Data Processing | NumPy, SciPy, pandas | Standard scientific Python |
| Visualization | Matplotlib (publication), Plotly (interactive) | Dual output modes |
| Frontend | Web-based (React + Plotly.js) or Desktop (PyQt6) | Cross-platform |
| Database | SQLite (local) or PostgreSQL (multi-site) | Patient data and calibration curves |
| Export | PDF report generation (LaTeX or ReportLab) | Clinical documentation |

### 14.5.2 Data Security

Patient data handling must comply with HIPAA (USA), GDPR (EU), and LGPD (Brazil) regulations. The platform must:
- Process data locally (no cloud transmission of patient data)
- Use anonymized identifiers for the calibration database
- Provide audit trails for clinical decisions

### 14.5.3 Regulatory Pathway

As a clinical decision support tool, the AVBC platform would likely require:
- **CE marking (EU):** Class IIa medical device under MDR 2017/745
- **FDA clearance (USA):** 510(k) pathway, predicate: existing ICRS planning software (e.g., Keraring Planning System)
- **ANVISA registration (Brazil):** Class II medical device

The regulatory pathway is complex but feasible, particularly if the platform is positioned as a decision support tool (output = recommendation, not prescription) rather than an autonomous planning system.

---

## 14.6 Comparison with Existing Planning Tools

| Feature | Keraring Calculator | Ferrara Nomogram App | **AVBC Platform** |
|---|---|---|---|
| Input | Topographic classification | K-steep, Q value | Full trimodal (O+T+B) |
| Mechanism | Empirical pattern matching | Empirical lookup | Mechanistic (VR/VT/Vτ) |
| Ring parameters | Configuration recommendation | Thickness + arc | All 5 parameters |
| MNA integration | No | No | **Yes** |
| Asymmetric rings | No | No | **Yes (Vτ)** |
| Postop feedback | No | No | **Yes (AVBC-CI)** |
| Surgeon calibration | No | No | **Yes** |
| Biomechanical rationale | No | No | **Yes** |

---

## 14.7 Summary

- The AVBC platform translates the theoretical framework into a **clinical decision support tool** accessible to the surgeon in practice.
- The system uses **standardized clinical data** (tomography, aberrometry, refraction) as input and provides **ranked ring recommendations** with expected biomechanical outcomes.
- A **pre-computed FEM lookup table** enables rapid predictions without real-time simulation.
- The **interactive ring simulator** allows surgeons to explore the parameter space and understand the biomechanical rationale for each recommendation.
- The **postoperative feedback module** builds a surgeon-specific calibration curve that improves accuracy over time.
- **Patient-specific FEM modeling** and **machine learning calibration** are planned extensions that will enhance predictive accuracy.

---

## Didactic Summary

- The AVBC platform translates the theoretical framework into a **clinical decision support tool** accessible to the surgeon.
- The system uses standardized clinical data (tomography, aberrometry, refraction) as input and provides **ranked recommendations** of ring configurations.
- A **pre-computed FEM lookup table** (N=377 simulations) enables rapid predictions without real-time simulation.
- The **interactive simulator** allows the surgeon to explore the parameter space and understand the biomechanical rationale.
- The modular architecture allows future evolution: Brillouin integration, biomechanical OCT, and machine learning.

---

## References

1. Alpins NA. ASSORT (Alpins Statistical System for Ophthalmic Refractive surgery Techniques). User Manual, Version 7.0, 2015.
2. Barrett GD. An improved universal theoretical formula for intraocular lens power prediction. *J Cataract Refract Surg*. 2015;41(3):589–599.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
5. Kling S, Marcos S. Finite-element modeling of intrastromal corneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
6. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.
7. Piñero DP. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
8. Simonini I, Pandolfi A. Customized finite element modelling of the human cornea. *PLoS One*. 2015;10(6):e0130426.
