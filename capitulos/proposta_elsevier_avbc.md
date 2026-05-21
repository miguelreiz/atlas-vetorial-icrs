# BOOK PROPOSAL — Elsevier

---

## Title

**Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
*From Empirical Nomograms to Mechanistic Decision Frameworks*

### Alternative (bilingual edition)

**Análise Vetorial Biomecânica Corneana Aplicada aos Anéis Intracorneanos**
*Dos Nomogramas Empíricos ao Planejamento Vetorial*

---

## 1. Scope and Rationale

### The Clinical Problem

Intracorneal ring segments (ICRS) are the most widely used surgical intervention for keratoconus worldwide, with over 500,000 implantations performed since 1999. Despite three decades of clinical use, ICRS planning remains fundamentally empirical: surgeons select ring parameters (thickness, arc length, depth, meridian) using nomograms — lookup tables derived from retrospective series — that do not decompose the ICRS effect into its constituent biomechanical mechanisms.

The consequences are measurable:
- When presented with identical patient data, **different ICRS experts recommend different ring configurations** — inter-surgeon agreement is poor
- Nomogram-based outcomes show **wide variance** (ΔK range 0.1–6.0 D for the same ring thickness)
- The field has produced **no unified framework** analogous to what Alpins created for astigmatism surgery in 1993

### The Solution: AVBC

This book introduces the **AVBC (Análise Vetorial Biomecânica Corneana)** — a mechanistic framework that decomposes the ICRS effect into three biomechanical vectors:

| Vector | Physical Quantity | What it Controls | Ring Parameter |
|--------|------------------|-----------------|----------------|
| **VR** | Radial displacement (μm) | Corneal flattening (ΔK) | Thickness |
| **VT** | Tangential stress redistribution (kPa) | Astigmatism regularization (ΔCyl) | Arc length |
| **Vτ** | Asymmetric torque (μN·m) | Apex repositioning | Ring asymmetry |

These vectors are **not metaphors** — they are extracted from finite element simulations (FEBio 4.12, HGO anisotropic model) with full traceability from constitutive equations to clinical decision tables.

### Why This Book Is Needed Now

1. **Gap confirmed by literature search:** No book or framework integrates biomechanical vector analysis with prospective ICRS planning
2. **The Alpins precedent:** In 1993, Alpins transformed astigmatism surgery by creating a standardized vector language (TIA/SIA/DV). ICRS planning needs the same transformation
3. **FEM validation available:** Recent work (Kling & Marcos 2013, García de Oteyza 2021-2023) provides computational validation of ICRS mechanisms — but no one has translated these into a clinical framework

### Target Audience

| Audience | How they use the book |
|----------|----------------------|
| **Cornea surgeons** (primary) | Decision framework for daily ICRS planning |
| **Ophthalmology residents** | Textbook on corneal biomechanics and ICRS |
| **Researchers** (FEM/biomechanics) | Methodology for vector extraction from FEM |
| **Industry (ring manufacturers)** | Design rationale for new ring geometries |

### Estimated Market

- ~2,000 surgeons performing ICRS worldwide (conservative)
- ~15,000 ophthalmology residents in training annually
- Growing keratoconus prevalence (1:375 → 1:84 with modern screening)

---

## 2. Table of Contents

### Part I — Foundations (Chapters 1–4)

#### Chapter 1: The Keratoconic Cornea as a Mechanical Structure
*Synopsis (80 words):* Introduces the cornea as an anisotropic, hyperelastic shell. Covers fibrillar anatomy, collagen fiber orientation (X-ray scattering data from Meek & Knupp), the Holzapfel-Gasser-Ogden constitutive model, and the Dupps decompensation cycle. Establishes that keratoconus is a biomechanical disease — not just a geometric one — and that any effective intervention must address the underlying stress distribution, not just the surface shape.

#### Chapter 2: How ICRS Work — From Volume Displacement to Vector Decomposition
*Synopsis (80 words):* Critical review of ICRS mechanisms: arc-shortening (Barraquer), volume displacement (Kling & Marcos), stress redistribution (Dupps & Roberts). Refutes the "artificial limbus" concept using FEM evidence. Introduces the three-vector decomposition (VR/VT/Vτ) as a unifying language. Shows that the clinical effect depends on which mechanism dominates — and that this depends on ring parameters, not the disease stage.

#### Chapter 3: The Alpins Method — A Template for Surgical Planning Languages
*Synopsis (80 words):* Reviews the Alpins vector analysis for astigmatism surgery (TIA/SIA/DV/CI). Distills the methodological lessons: (1) every surgical effect has a planned and an induced component, (2) the difference is the error, (3) standardized nomenclature enables comparison across surgeons. Argues that the same structure applies to ICRS planning, but the algebra is more complex (3D biomechanics vs 2D polar astigmatism).

#### Chapter 4: The Limits of Empirical Planning — Why Nomograms Fail
*Synopsis (80 words):* Reviews five generations of Ferrara nomograms, the Keraring calculator, and the Intacs nomogram. Presents evidence of inter-surgeon disagreement and nomogram variance. Identifies the root cause: nomograms are correlative (ring thickness ↔ ΔK) but not causal (they don't explain WHY a thicker ring flattens more). Motivates the mechanistic approach: to prescribe correctly, we must understand the mechanism.

---

### Part II — The AVBC Framework (Chapters 5–9) — Original Contribution

#### Chapter 5: The Three Domains of ICRS Assessment
*Synopsis (80 words):* Introduces the trimodal evaluation: Optical coherence (can the patient see better?), Topographic morphology (where is the cone?), and Biomechanical mechanism (how should we act?). Each domain has quantitative criteria. The intersection of all three determines the ring prescription. This chapter provides the overview; subsequent chapters detail each vector.

#### Chapter 6: VR — The Radial Vector: Mechanics of Flattening
*Synopsis (80 words):* Formal definition of VR as the radial displacement field Δuᵣ. Extraction from FEBio: ux·cos(θ) + uy·sin(θ). Clinical correlation: VR → ΔK via κ = (n-1)/R. FEM data: VR = 8.9–19.9 μm (central mean). Key finding: VR is insensitive to arc length (19.2 μm across arcs 90°-320°) — it is modulated by ring THICKNESS only. This decouples flattening from redistribution.

#### Chapter 7: VT — The Tangential Vector: Astigmatism Redistribution
*Synopsis (80 words):* Formal definition of VT as Δσ_θθ (Cauchy stress tensor transformation). FEM data: VT decreases monotonically from 7.78 → 7.20 kPa as arc length increases from 90° to 320° (R² = 0.94). Physical interpretation: longer arcs intercept more collagen fibers, redistributing tangential stress over a larger area. Key clinical implication: arc length controls astigmatism regularization, not flattening.

#### Chapter 8: Vτ — The Torque Vector: Apex Repositioning
*Synopsis (80 words):* The most original contribution. Formal definition of Vτ as the torque generated by asymmetric ring geometry. Diagram of free body: unequal forces at ring ends create a couple → apex migration. Supported by García de Oteyza FEM (2021-2023): asymmetric rings reduce coma by 40% vs symmetric. Introduces the ENM (Eixo Neutro Mecânico) as a novel concept for localizing the mechanical axis of ectasia.

#### Chapter 9: The Integrated AVBC Classification — Decision Matrix
*Synopsis (80 words):* The complete framework: Module O (optical) × Module T (topographic) × Module B (biomechanical) → ring prescription. Presents the Biomechanical Decision Matrix with quantitative criteria and clinical rules. Introduces depth as a universal amplifier. Provides step-by-step clinical workflow with flowcharts. Differentiates AVBC from existing nomograms on seven criteria. *(Sample chapter provided with this proposal.)*

---

### Part III — Validation and Cases (Chapters 10–13)

#### Chapter 10: Computational Validation — FEM Extraction of V_R, V_T, and V_τ
*Synopsis (80 words):* Complete pipeline: FEBio 4.12 + HGO model → vector extraction across 34 simulations. Arc sweep (8 configs), patient-specific models (8 patients, double-run), concentric sweep (4 configs), and progressive-thickness asymmetric simulations (6 configs). Key findings: (1) VT monotonicity, (2) VR arc-insensitivity, (3) active corrective torque validation ($V\tau = 9.31\text{--}18.34\ \mu\text{N}\cdot\text{m}$), (4) the ICRS paradox (Δuz < 0). Full traceability chain from clinical parameters to final figures. *(Sample chapter provided with this proposal.)*

#### Chapter 11: From Framework to Clinical Workflow
*Synopsis (80 words):* Step-by-step translation of the theoretical framework into an actionable clinical workflow. Deconstructs how a surgeon identifies the dominant vector need and chooses the matching ring configuration. Weaves together a diagnostic flowchart and detailed step-by-step algorithms. Includes full clinical decision trees.

#### Chapter 12: Illustrative Cases: AVBC-Guided ICRS Planning
*Synopsis (80 words):* Presents three highly detailed, illustrative case studies representing different biomechanical challenges (symmetric central cone, asymmetric peripheral cone, advanced ectasia). For each case, details tomographic data, optical aberrations, vector selection, planned ring, and post-operative outcomes, demonstrating the clinically validated torque $V\tau = 9.31\ \mu\text{N}\cdot\text{m}$.

#### Chapter 13: Limitations, Open Questions, and Future Directions
*Synopsis (80 words):* Honest, critical assessment of the framework's limitations, including geometric simplifications, uniform material parameters, and ICRS-stroma interface assumptions. Presents a rigorous validation roadmap, detailing a prospective observational cohort study (N=100) and specific falsification criteria to test the clinical efficacy of the AVBC.

---

### Part IV — The Platform and Conclusion (Chapters 14–15)

#### Chapter 14: The AVBC Software Platform: Architecture and Implementation
*Synopsis (80 words):* Outlines the architecture of a dedicated clinical decision support software. Details the input layer (tomography, aberrometry, manifest refraction), processing layer (Module O/T classifiers, Module B vector engine), and output layer (ranked ring recommendations). Incorporates the 34-simulation database as a parameterized lookup table and plans future extensions (real-time GPU FEM and ML calibration).

#### Chapter 15: Conclusion: Toward a Biomechanical Language for Corneal Surgery
*Synopsis (80 words):* Synthesizes the core contributions of the book: establishing the AVBC as a clinical language, a structured decision framework, and a computationally validated foundation. Acknowledges the clinical validation roadmap and outlines the future vision of patient-specific modeling and automated, vector-based planning to match the stroma's mechanical elegance.

---

## 3. Competing Titles and Differentiation

| Existing Title | Scope | AVBC Differentiator |
|---------------|-------|---------------------|
| **Keratoconus and Keratoectasia** (Ferrara, Springer 2017) | Clinical guide, nomogram-based | No vector framework; no FEM validation |
| **Keratoconus: Diagnosis and Management** (Alió, Springer 2017) | Clinical management | Classification-focused; no mechanistic planning |
| **Corneal Biomechanics** (Dupps, in progress) | Basic science | No clinical decision framework |
| **Intacs and Ferrara Ring Segments** (Torquetti, book chapters) | Surgical technique | Empirical; no vector decomposition |

> **Unique positioning:** "The first book to translate corneal biomechanics into a vector language for prospective ICRS planning, validated by finite element analysis."

---

## 4. Multimedia and Supplementary Material

- **High-resolution FEM figures** (300 dpi, publication-ready)
- **Surgical videos** with AVBC overlay (planned)
- **Interactive decision matrix** (web companion)
- **Python scripts** for vector extraction (GitHub repository, open-source)
- **FEBio model files** (.feb) for reproducibility

---

## 5. Timeline

| Phase | Duration | Content |
|-------|----------|---------|
| **Proposal submission** | Month 0 | This document + 2 sample chapters (9, 10) |
| **Contract and planning** | Months 1–2 | Editorial agreement, co-author finalization |
| **Part I (Foundations)** | Months 3–6 | Chapters 1–4 |
| **Part II (AVBC Framework)** | Months 7–10 | Chapters 5–9 |
| **Part III (Validation)** | Months 11–14 | Chapters 10–13, clinical cases |
| **Part IV (Frontiers)** | Months 15–16 | Chapters 14–16 |
| **Review and revision** | Months 17–18 | Peer review, copy editing |
| **Publication** | Month 20 | |

---

## 6. Sample Chapters

Two complete draft chapters accompany this proposal:

1. **Chapter 9: The Integrated AVBC Classification** — The core original contribution. Contains the Biomechanical Decision Matrix, clinical workflow, and differentiation from nomograms.

2. **Chapter 10: Computational Validation** — Complete FEM methodology and results from 34 simulations. Demonstrates traceability and quantitative rigor.

---

## 7. Author Statement

> This book is the first to propose a standardized vector language for prospective planning of intracorneal ring segments, integrating optical, topographic, and biomechanical assessment into a unified decision framework validated by finite element analysis.

---

*Submission to: AuthorQuery@elsevier.com*
*Format: Elsevier Health Sciences Book Proposal*
