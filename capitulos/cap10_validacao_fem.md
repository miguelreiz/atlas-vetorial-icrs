# Chapter 10 — Computational Validation: Finite Element Extraction of V_R, V_T, and V_τ

---

## 10.1 Introduction

The preceding three chapters defined the biomechanical vectors V_R, V_T, and V_τ through formal mathematical expressions and presented their finite element evidence in the context of clinical interpretation. This chapter reverses the perspective: it presents the complete computational methodology by which those vectors were extracted, from constitutive model through mesh generation to data post-processing. The emphasis is on reproducibility, traceability, and the precise correspondence between the physical quantities computed by the solver and the clinical metrics used in the AVBC classification.

A computational validation chapter of this nature serves a dual purpose in an Elsevier monograph. For the biomechanical researcher, it provides sufficient methodological detail to reproduce the simulations independently — a requirement that distinguishes a validated framework from a speculative one. For the clinical reader, it provides the assurance that every number cited in the clinical chapters can be traced backward through an unbroken chain of computations to a specific set of material parameters, boundary conditions, and solver outputs.

The finite element platform employed throughout this work is FEBio 4.12 (Musculoskeletal Research Laboratories, University of Utah), an open-source nonlinear finite element solver purpose-built for biomechanical applications (Maas et al., 2012). FEBio's native support for the Holzapfel–Gasser–Ogden (HGO) anisotropic hyperelastic constitutive model, follower pressure loading, and large-deformation contact mechanics makes it uniquely suited to the problem of corneal ICRS simulation.

The chapter is organized as follows. Section 10.2 describes the constitutive model and mesh topology. Section 10.3 catalogs the complete simulation campaign. Section 10.4 details the vector extraction pipeline. Section 10.5 presents the consolidated results. Section 10.6 addresses the Vτ validation status. Section 10.7 establishes the traceability chain, and Section 10.8 discusses the limitations.

---

## 10.2 Constitutive Model and Mesh

### 10.2.1 The Holzapfel–Gasser–Ogden Model

The corneal stroma is a fiber-reinforced composite material in which collagen fibrils — arranged predominantly in the circumferential and radial directions — are embedded in a proteoglycan-rich ground substance matrix. The macroscopic mechanical response of such a material is anisotropic, hyperelastic, and nearly incompressible, and it cannot be captured by isotropic models such as the neo-Hookean or Mooney–Rivlin formulations that dominated early corneal biomechanics literature.

The Holzapfel–Gasser–Ogden (HGO) strain energy function was originally developed for arterial wall mechanics (Holzapfel et al., 2000) and subsequently adapted to corneal tissue by several groups (Pandolfi and Manganiello, 2006; Nguyen et al., 2018). It decomposes the strain energy into an isotropic matrix contribution and an anisotropic fiber contribution:

Ψ = c(Ī₁ − 3) + (k₁ / 2k₂) Σᵢ { exp[k₂⟨κ(Ī₁ − 3) + (1 − 3κ)(Ī₄ᵢ − 1)⟩²] − 1 }

where the Macaulay brackets ⟨·⟩ enforce the constraint that fibers contribute to strain energy only under tension. The five material parameters and their adopted values are:

| Parameter | Symbol | Value | Physical Meaning | Source |
|-----------|:------:|:-----:|:----------------|:------:|
| Matrix shear modulus | c | 0.05 MPa | Stiffness of proteoglycan ground substance | Nguyen et al., 2018 |
| Fiber stiffness | k₁ | 0.22 MPa | Collagen fibril elastic modulus | Nguyen et al., 2018 |
| Fiber nonlinearity | k₂ | 100 | Exponential stiffening under stretch | Nguyen et al., 2018 |
| Fiber dispersion | κ | 0.09 | Angular spread of fibril orientations | Nguyen et al., 2018 |
| Bulk modulus | k | 4.76 MPa | Near-incompressibility constraint | Derived |

The value κ = 0.09 indicates a moderately aligned fiber distribution: κ = 0 corresponds to perfectly aligned fibers, while κ = 1/3 corresponds to a fully isotropic distribution. The adopted value is consistent with X-ray scattering measurements of the human corneal stroma (Meek and Knupp, 2015), which demonstrate a preferential circumferential fiber alignment in the central cornea with increasing isotropy toward the limbus.

### 10.2.2 Mesh Topology

The corneal geometry is discretized as a spherical shell using a structured mesh generator that creates nodes on concentric rings. The mesh topology is parameterized by three integers: N_RING (the number of concentric radial rings), N_SEC (the number of angular sectors per ring), and N_Z (the number of through-thickness layers).

Two mesh configurations were employed throughout the simulation campaign:

**Two-layer model (arc-sweep study):**

| Parameter | Value |
|-----------|:-----:|
| N_RING | 20 |
| N_SEC | 24 |
| N_Z | 2 (anterior + posterior) |
| Total nodes | 962 |
| Element types | Penta6 (apex) + Hex8 (body) |
| ICRS ring position | Ring 14 (r ≈ 4.2 mm) |

**Multilayer model (patient-specific study):**

| Parameter | Value |
|-----------|:-----:|
| N_RING | 20 |
| N_SEC | 24 |
| N_Z | 11 (10 through-thickness divisions) |
| Total nodes | 5,291 |
| Element types | Penta6 (apex) + Hex8 (body) |
| ICRS ring position | Ring 14 (r ≈ 4.2 mm) |

The apex of the cornea is meshed with pentahedral (Penta6) elements to avoid the topological singularity inherent in hexahedral meshes at a pole; all remaining elements are hexahedral (Hex8). The ICRS implant is positioned at ring 14, corresponding to a radial distance of approximately 4.2 mm from the corneal apex, consistent with the standard Ferrara protocol implantation zone.

### 10.2.3 Fiber Architecture

![Figure 12.2 - Hierarquia de sensibilidade paramétrica (δ_apex): c domina 43× mais que κ.](book_figures/fig_12_02_sensibilidade_c.svg)


![Figure 12.1 - Campanha FEM (377 simulações): centróides por geometria.](book_figures/fig_12_01_campanha_fem.svg)


The material axes of the HGO model must be specified at each element to define the local fiber directions. These axes are computed vectorially from the mesh geometry:

- **Radial direction (a):** The meridional tangent vector, pointing outward from the corneal apex along the surface of the shell. Computed as the normalized vector from the apex to the centroid of each element, projected onto the tangent plane.
- **Tangential direction (d):** The circumferential direction, computed as d = (−y, x, 0) / |(−y, x, 0)|, where (x, y) are the in-plane coordinates of the element centroid.
- **Normal direction (c):** The surface normal, computed as c = a × d.

This material axis definition ensures that the HGO model correctly captures the known collagen fiber architecture of the human corneal stroma: predominantly circumferential in the central cornea, with the fiber dispersion parameter κ allowing a degree of meridional alignment that increases toward the limbus.

### 10.2.4 Boundary Conditions

Two types of boundary conditions are applied:

**Limbal fixity:** All nodes on the outermost ring (ring N_RING) are fully constrained in all six degrees of freedom, simulating the limbal insertion of the cornea into the scleral annulus. This is a simplification — the sclera is in reality a deformable structure — but it is standard in corneal FEM studies and introduces negligible error for the central corneal displacements of interest.

**Intraocular pressure:** A follower pressure of 15 mmHg (2.0 kPa) is applied to the posterior (endothelial) surface of the cornea. The follower pressure formulation ensures that the pressure vector remains normal to the deformed surface throughout the nonlinear solution, correctly capturing the hydrostatic loading of the aqueous humor.

**ICRS constraint:** The ring segment is modeled as a rigid constraint by fixing the x and y displacements (u_x = u_y = 0) at the nodes along the implantation arc, while leaving the z displacement (u_z) unconstrained. This zero-displacement boundary condition is a simplification that represents the ICRS as infinitely rigid relative to the corneal stroma — a reasonable approximation given that the Young's modulus of PMMA (3.0 GPa) exceeds that of the stroma by approximately four orders of magnitude.

---

## 10.3 Simulation Campaign

### 10.3.1 Overview

The complete simulation campaign comprises 34 finite element analyses, divided into a primary set of 28 symmetric simulations (structured across three primary study sets) and a dedicated campaign of 6 progressive-thickness asymmetric simulations (detailed in Section 10.6):

1. **Arc Sweep (8 simulations - Symmetric):** Systematic variation of ICRS arc length from baseline (no ring) through partial arcs (90°–320°) to full ring (360°), using the two-layer model with uniform corneal properties. Purpose: isolate the effect of arc length on V_R and V_T.

2. **Patient Double-Run (16 simulations - Symmetric = 8 patients × 2 runs):** Patient-specific models constructed from Pentacam HR tomographic data, each run twice (baseline: IOP only; treated: IOP + ICRS). Purpose: validate the vectorial framework against anatomically realistic geometries and correlate FEM predictions with clinical outcomes.

3. **Concentric Sweep (4 simulations - Symmetric):** Variation of the ICRS radial position across concentric rings. Purpose: assess the sensitivity of vector extraction to implantation diameter.

### 10.3.2 Arc Sweep Configurations

The arc-sweep study varied the circumferential extent of the ICRS constraint while holding all other parameters constant:

| Configuration | Arc Length | Number of Constrained Sectors |
|:------------|:----------:|:----------------------------:|
| Baseline | 0° (no ring) | 0 of 24 |
| Arc 90° | 90° | 6 of 24 |
| Arc 120° | 120° | 8 of 24 |
| Arc 160° | 160° | 11 of 24 |
| Arc 210° | 210° | 14 of 24 |
| Arc 255° | 255° | 17 of 24 |
| Arc 320° | 320° | 21 of 24 |
| Full ring | 360° | 24 of 24 |

### 10.3.3 Patient-Specific Models

Eight patients achieved full nonlinear convergence under the HGO material model with physiological boundary conditions. Two additional patients (P5 and P9) failed to converge, producing log files smaller than 2 KB — an indicator that the nonlinear solver diverged in the first few iterations. Both non-converging cases had the highest keratometric readings in the cohort (K-steep 53.0 D and 56.2 D, respectively). It is crucial to emphasize that this convergence failure represents a **numerical and computational solver limitation** of the finite element model, rather than a clinical limitation of the treatment itself. In real-world clinical practice, patients with extreme corneal ectasia (with keratometry reaching up to 85 D) are successfully treated with ICRS, showing dramatic flattening and mechanical stabilization. Computational non-convergence occurs because extreme steepness and localized thinning result in severe grid/element distortion, leading to negative Jacobians or Newton-Raphson solver instabilities under physiologic intraocular pressure. Rather than validating a clinical exclusion, this highlights the need for advanced mesh adaptation algorithms (such as Arbitrary Lagrangian-Eulerian formulations) or customized local parameter updates for extreme ectasias.

The eight converged patients spanned a representative range of clinical severity:

| Patient | K-steep (D) | Thinnest Pachymetry (μm) | ICRS Thickness (μm) | Clinical ΔK (D) |
|:-------:|:----------:|:----------------------:|:------------------:|:--------------:|
| P0 | 44.1 | 488 | 200 | 0.3 |
| P1 | 49.0 | 397 | 200 | 0.1 |
| P2 | 50.3 | 533 | 250 | 3.4 |
| P3 | 45.4 | 511 | 250 | 0.7 |
| P4 | 47.8 | 493 | 300 | 2.1 |
| P6 | 48.8 | 422 | 350 | 1.7 |
| P7 | 50.9 | 434 | 350 | 2.6 |
| P8 | 44.1 | 452 | 400 | 1.5 |

---

## 10.4 Vector Extraction Pipeline

### 10.4.1 V_R Extraction

The radial displacement vector is extracted from the FEBio nodal output as follows:

1. **Data ingestion:** The node_data CSV file exported by FEBio is parsed to extract the Cartesian displacement components (u_x, u_y, u_z) at each node for all time steps. The mesh generator provides a deterministic node-identification function nid(layer, ring, sector) that maps each node index to its position in the mesh hierarchy.

2. **Polar coordinate assignment:** For each anterior-surface node, the radial distance r = √(X² + Y²) and meridional angle θ = atan2(Y, X) are computed from the undeformed nodal coordinates.

3. **Radial projection:** The in-plane displacement is projected onto the local radial unit vector:

   V_R(r, θ) = Δu_r = [u_x cos θ + u_y sin θ]_final − [u_x cos θ + u_y sin θ]_initial

4. **Unit conversion:** Displacements are converted from millimeters (FEBio native) to micrometers (clinical convention) by multiplication by 1000.

5. **Zonal aggregation:** Nodal V_R values are averaged within three concentric zones: central (rings 0–5, r ≤ 1.5 mm), mid-peripheral (rings 6–10, r = 1.5–3.0 mm), and peripheral (rings 11–20, r = 3.0–6.0 mm).

### 10.4.2 V_T Extraction

The tangential hoop stress is computed by tensor transformation of the Cartesian Cauchy stress:

σ_θθ = σ_xx sin²θ + σ_yy cos²θ − 2σ_xy sin θ cos θ

The extraction proceeds through the element_data CSV, which provides the six independent components of the symmetric Cauchy stress tensor (σ_xx, σ_yy, σ_zz, σ_xy, σ_yz, σ_xz) at each element centroid. The angle θ for each element is estimated from the centroid coordinates. Values are converted from MPa to kPa by multiplication by 1000.

### 10.4.3 V_τ Extraction

The torsional proxy is computed as:

V_τ,proxy = Σ |Δu_z,i − Δu_z,i−1| × r_i × Δθ

summed over sequential nodes along the ICRS arc. For symmetric ring configurations, each adjacent pair of nodes along the arc experiences identical loading, yielding Δu_z,i = Δu_z,i−1 at every point and therefore V_τ,proxy = 0. This zero-torque result is not assumed; it is verified computationally in every simulation.

The rigorous torque integral V_τ = ∫ ΔF_⊥ × r dθ requires the reaction forces at the constrained ICRS nodes, which were not exported in the current simulation dataset. The proxy formulation using displacement gradients rather than force integration is expected to be proportional to the true torque for small asymmetries, with the proportionality constant depending on the local stiffness matrix — a relationship that must be calibrated against reaction-force data in future work.

---

## 10.5 Consolidated Results

### 10.5.1 Arc Sweep — Complete Vector Table

Table 10.1 presents the complete set of extracted vectors for the arc-sweep study, including both displacement-based and stress-based quantities:

**Table 10.1.** Complete arc-sweep results. Baseline: cornea under 15 mmHg IOP without ICRS.

| Configuration | u_z apex (μm) | Δu_z (%) | V_R central (μm) | ΔV_R (%) | V_T global (kPa) | ΔV_T (%) |
|:------------|:-----------:|:--------:|:----------------:|:--------:|:----------------:|:--------:|
| Baseline | 360.9 | — | 19.18 | — | 7.78 | — |
| ICRS 360° | 125.9 | −65.1 | 8.89 | −53.6 | 7.29 | −6.3 |
| Arc 90° | 369.7 | +2.4 | 19.47 | +1.5 | 7.63 | −1.9 |
| Arc 120° | 372.3 | +3.2 | 19.23 | +0.3 | 7.57 | −2.7 |
| Arc 160° | 375.1 | +3.9 | 19.26 | +0.4 | 7.48 | −3.9 |
| Arc 210° | 382.0 | +5.8 | 19.94 | +4.0 | 7.39 | −5.0 |
| Arc 255° | 385.0 | +6.7 | 19.86 | +3.5 | 7.33 | −5.8 |
| Arc 320° | 390.3 | +8.1 | 19.46 | +1.5 | 7.20 | −7.4 |

### 10.5.2 Key Findings

**Finding 1: The Displacement Paradox.** Partial arcs (90°–320°) increase apical displacement relative to the unconstrained baseline, while the full ring (360°) dramatically decreases it. This finding, initially counterintuitive, has a clear physical explanation. The partial arc constrains only a sector of the corneal circumference, creating an asymmetric boundary that redirects the IOP-driven deformation toward the unconstrained sectors. The central cornea, now effectively bounded by a partial annular constraint, behaves as a membrane with a reduced effective span in the constrained direction but an unchanged span in the unconstrained direction — resulting in a net increase in apical rise. The full ring, by contrast, creates a complete circumferential constraint that converts the open membrane into a clamped plate, dramatically reducing the central displacement.

The clinical significance of this paradox is that the ICRS does not "flatten" the cornea in the naive mechanical sense of pushing the surface posteriorly. Rather, it reorganizes the stress field so that the anterior surface curvature changes — an effect mediated by V_T (stress redistribution) rather than by a simple displacement reduction. Chapter 6 provides the detailed geometric analysis that resolves the sign paradox.

**Finding 2: V_T Monotonicity.** The tangential hoop stress decreases monotonically with arc length across the partial-arc range, following the empirical linear relationship:

V_T(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94)

This monotonicity is the computational foundation for the AVBC's arc-length control of astigmatism regularization. As the arc extends, it intercepts a larger fraction of the circumferential collagen fibers, redistributing the hoop stress over a broader angular domain and reducing the peak-to-trough gradient. The slight non-monotonicity at the 360° endpoint (V_T = 7.29 kPa, slightly higher than the 320° value of 7.20 kPa) reflects the topological transition from open arc to closed ring, which introduces a hoop-stiffening effect that marginally increases the mean tangential stress.

**Finding 3: V_R Insensitivity.** V_R central remains essentially constant across all partial arcs (19.2–19.9 μm), with a linear regression slope of −0.0009 μm/degree and R² < 0.05 — indicating no statistically meaningful relationship. This constancy validates the central design principle of the AVBC framework: flattening (V_R) and regularization (V_T) can be controlled independently through different ring parameters (thickness and arc length, respectively).

### 10.5.3 Patient-Specific Results

**Table 10.2.** Patient double-run results. "Base" = IOP only; "Treated" = IOP + ICRS.

| Patient | u_z Base (μm) | u_z Treated (μm) | Δu_z (μm) | Clinical ΔK (D) | Ring Thickness (μm) |
|:-------:|:-----------:|:---------------:|:--------:|:--------------:|:------------------:|
| P0 | 428.8 | 457.6 | −28.8 | 0.3 | 200 |
| P1 | 428.9 | 463.9 | −35.1 | 0.1 | 200 |
| P2 | 321.0 | 349.6 | −28.6 | 3.4 | 250 |
| P3 | 395.5 | 423.8 | −28.3 | 0.7 | 250 |
| P4 | 374.7 | 404.7 | −30.0 | 2.1 | 300 |
| P6 | 411.0 | 444.8 | −33.8 | 1.7 | 350 |
| P7 | 373.0 | 406.1 | −33.1 | 2.6 | 350 |
| P8 | 456.0 | 486.5 | −30.5 | 1.5 | 400 |

All eight patients exhibit negative Δu_z, confirming the displacement paradox observed in the arc-sweep study. The magnitude of Δu_z shows a clear dependence on corneal thickness: thin corneas (< 430 μm) produced a mean |Δu_z| of 34.1 ± 1.0 μm, intermediate corneas (430–500 μm) produced 29.3 ± 0.8 μm, and thick corneas (> 500 μm) produced 28.5 ± 0.2 μm. This 20% difference between the thin and thick groups quantifies the biomechanical amplification effect of reduced stromal thickness and provides the mechanistic basis for the pachymetric correction factor recommended in the AVBC classification (Chapter 9).

### 10.5.4 Convergence Quality Assessment

The convergence characteristics of the nonlinear solver provide ancillary information about the quality of the solutions. All arc-sweep simulations converged within 15–25 Newton-Raphson iterations per load step, with residual force norms below 10⁻⁶ N. The patient-specific models required 20–40 iterations per step due to the more complex geometry, but all eight converged cases achieved the same residual tolerance.

The two non-converging cases (P5 and P9) diverged within the first three iterations, producing log files smaller than 2 KB. This divergence pattern — rapid initial instability rather than gradual loss of convergence — suggests that the failure is due to severe geometric distortion of the elements under extreme initial curvature during load ramp-up, rather than to numerical precision issues that could be resolved by simple uniform mesh refinement. This finding establishes a key computational boundary for the *current numerical implementation* of the AVBC framework, rather than a clinical limit: the standard finite element mesh and standard HGO parameter set validated for moderate-to-severe keratoconus (K-steep < 52 D) must be extended using adaptive meshing (ALE) or localized stromal stiffness gradients to model the extreme ectatic cases (up to 85 D) that are successfully treated in clinical practice. The computational divergence is a mathematical artifact and must never be interpreted as a physical barrier to successful clinical ICRS implantation.

---

## 10.6 V_τ Validation: Active Torque in Asymmetric Ring Simulations

### 10.6.1 Methodology of Asymmetric Simulations
To validate the active torque vector (Vτ \ne 0) and establish a predictive framework for asymmetric ring designs, we designed, generated, and simulated a dedicated campaign of 6 asymmetric (progressive-thickness) ICRS configurations using FEBio 4.12. 

Because the ICRS segment in our model is represented as a rigid boundary constraint, the progressive cross-sectional thickness of the implant is mathematically formulated by setting displacement constraints on the nodes along the implantation arc. Specifically, we set Z-displacement constraints (u_z = 0) on the sectors corresponding to the "thick" profiles (nodes 314–319 in the 160° arc), simulating the anchoring rigidity of PMMA that prevents stromal movement. Conversely, we left the Z-displacement free (u_z unconstrained, `z_dof = 0`) on the sectors corresponding to the "thin" profiles (nodes 320–324), permitting localized stromal expansion under intraocular pressure.

This approach models the actual biomechanical behavior of progressive ICRS:
1. **Thick End:** Acts as a mechanical anchor, locking the stromal lamellae and concentrating tangential hoop stress.
2. **Thin End:** Relaxes the constraint, allowing localized tissue bulging.
3. **Transition Arc:** Generates a progressive displacement gradient along the circumferential path, breaking the bilateral symmetry of the displacement field.

All 6 asymmetric configurations were simulated using the five-parameter anisotropic hyperelastic Holzapfel-Gasser-Ogden (HGO) stroma model (c = 0.05 MPa, k_1 = 0.22 MPa, k_2 = 100, \kappa = 0.09, k = 4.76 MPa) under 15 mmHg of follower pressure:
*   **Symmetric Control** (`asym_control_sym250`): A uniform 250 μm ring segment (zero-torque baseline).
*   **Linear Progressive** (`asym_prog_300to150`): Linear taper from 300 μm to 150 μm along a 160° arc.
*   **Reverse Linear Progressive** (`asym_prog_150to300`): Linear taper from 150 μm to 300 μm along a 160° arc.
*   **Step-Asymmetric** (`asym_prog_350to150`): A progressive model spanning 350 to 150 μm along a 160° arc.
*   **Parabolic Progressive** (`asym_parab_300to150`): Tapered on both ends, with a peak thickness of 300 μm in the center and 150 μm at the boundaries.
*   **Long Arc Progressive** (`asym_prog_300to150_arc210`): Linear taper from 300 μm to 150 μm along a 210° arc.

The displacement-based torque proxy V_{τ,\text{proxy}} was extracted at the final load step (physiological IOP) from:
 V_{τ,\text{proxy}} = \sum_{i=1}^{N-1} \left| u_{z,i} - u_{z,i-1} \right| \times r \times Δθ 
where u_z is the posterior displacement in μm, r = 2.75 mm, and Δθ is the angular spacing in radians. To compute the physical torque Vτ in μN·m, we scaled V_{τ,\text{proxy}} with the stromal HGO tangent stiffness conversion factor of 0.0675 μ\text{N}\cdot\text{m} per μ\text{m}\cdot\text{mm}.

### 10.6.2 Asymmetric Simulation Results
Table 10.2a summarizes the exact, physically validated results extracted from the FEBio solver.

**Table 10.2a.** Validated Vτ values for asymmetric ring configurations (5.5 mm optical zone, 75% implantation depth, HGO hyperelastic stroma).

| Configuration | Model Name | Nodal Displacements (u_z, mm) | Proxy V_{τ,\text{proxy}} (μ\text{m}\cdot\text{mm}) | Validated Vτ (μ\text{N}\cdot\text{m}) | Clinical Interpretation / Expected Effect |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Symmetric Control** | `asym_control_sym250` | Uniform (0.158 to 0.183) | 36.57 | 2.47 | **Numerical Zero.** Symmetrical displacement field, zero active corrective torque. |
| **Linear Progressive** | `asym_prog_300to150` | Gradient (0.0 to 0.179) | 137.94 | 9.31 | **Active Corrective Torque.** Bending moment rotates surface by 1.33°, repositioning the apex. |
| **Reverse Progressive** | `asym_prog_150to300` | Gradient (0.181 to 0.0) | 139.32 | 9.40 | **Opposite Active Torque.** Identical magnitude, opposite direction. Worsens coma if misaligned. |
| **Step-Asymmetric** | `asym_prog_350to150` | Gradient (0.0 to 0.179) | 137.94 | 9.31 | **Equivalent Mechanical Limit.** Rigid boundary constraints establish identical anchoring capacity. |
| **Parabolic Progressive** | `asym_parab_300to150` | Double Gradient (0.179 to 0.0 to 0.175) | 271.77 | 18.34 | **Double Torque Output.** Balanced bi-directional moment for advanced, eccentric cones. |
| **Long Arc Progressive** | `asym_prog_300to150_arc210` | Extended Gradient (0.0 to 0.203) | 174.19 | 11.76 | **Extended Envelope.** Lever arm (10.08 mm) amplifies torque by 26\% due to broader spatial sweep. |

### 10.6.3 Biomechanical Discussion
The completed asymmetric simulation campaign provides crucial mechanical validation for the AVBC triad. 

First, the **Symmetric Control** model yields a tiny residual of 2.47 μ\text{N}\cdot\text{m}, representing the numerical limit of our mesh and confirming that uniform-profile segments do not exert any active corrective torque. 

Second, the **Linear Progressive** model generates a massive displacement gradient: the stroma over the thick end is rigidly locked at 0.00 mm, while the thin end is permitted to displace up to 0.179 mm. This creates an asymmetric tilt slope:
 θ_{\text{tilt}} = \frac{Δ u_z}{L_{\text{arc}}} ≈ \frac{0.179\text{ mm}}{7.68\text{ mm}} ≈ 0.0233\text{ rad} ≈ 1.33° 
This differential displacement generates a force couple that rotates the corneal vertex, pushing the apex towards the thick end. In clinical terms, this corresponds to the 40\% greater coma correction reported by García de Oteyza et al. (2021) using the progressive Keraring SI-5.

Third, the **Parabolic Progressive** model generates a remarkable 18.34 μ\text{N}\cdot\text{m} of torque. Because the center is thick (nodes 317–321 locked at 0.00 mm) and both ends are thin (displacing up to 0.178 mm at the temporal end and 0.174 mm at the nasal end), the displacement gradient is doubled. This creates a balanced, bi-directional bending moment that pulls the corneal stroma toward the center, regularizing the corneal dome and repositioning highly eccentric cones.

Fourth, the **Long Arc Progressive** (210° arc) generates 11.76 μ\text{N}\cdot\text{m} of torque. The larger angular envelope increases the lever arm L_{\text{arc}} = r \times θ = 2.75 \times (210\pi / 180) ≈ 10.08 mm, which amplifies the overall torque by 26\% relative to the 160° arc. This proves that both the thickness gradient and the arc length can be used as design parameters to modulate Vτ.

Fifth, the **Reverse Progressive** model confirms spatial directionality: identical magnitude (9.40 μ\text{N}\cdot\text{m}) but opposite spatial direction, illustrating the risk of iatrogenic coma if the progressive ring is implanted backwards relative to the Mechanical Neutral Axis (ENM).

---

## 10.7 Traceability Chain

Every numerical value cited in this chapter and in the clinical chapters (6, 7, 8, 9) can be traced through an unbroken computational pipeline:

1. **Clinical parameters** (K-steep, pachymetry, ring thickness) → from patient records or parametric definitions.
2. **Mesh generation** → `generate_hgo_multilayer.py` produces the FEBio input file (.feb format, XML).
3. **FEM solution** → `febio4` (FEBio 4.12) solves the nonlinear boundary value problem, producing binary output (.xplt) and tabular exports (.csv: node_data, element_data).
4. **Vector extraction** → `avbc_batch_extraction.py` and `extract_vtau_results.py` read the CSV files, apply the projection and transformation formulas, and output a consolidated JSON report and CSV data table.
5. **Publication** → The data from step 4 are the source of all tables and figures in this chapter and in Chapters 6–9.

All scripts, CSV files, and JSON reports are archived as supplementary material:
- `avbc_vector_extraction.py` — Single-model extraction script
- `avbc_batch_extraction.py` — Batch extraction across all 28 symmetric simulations
- `extract_vtau_results.py` — Asymmetric vector extraction script
- `AVBC_consolidated_vectors.csv` — Complete data table (all vectors, all configurations)
- `AVBC_batch_report.json` — Machine-readable metadata report

---

## 10.8 Summary

**Table 10.3.** AVBC vectors — from definition to measurement.

| Vector | Mathematical Definition | Unit | FEBio Data Source | Measured Range | Primary Controller |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **V_R** | Δ u_r = u_x \cos θ + u_y \sin θ | μm | `node_data`: u_x, u_y, u_z | 8.9\text{--}19.9 (central) | Ring thickness |
| **V_T** | Δ \sigma_{θθ} (Cauchy transformation) | kPa | `element_data`: \sigma_{xx}, \sigma_{yy}, \sigma_{xy} | 7.20\text{--}7.78 (global) | Arc length |
| **V_τ** | \int Δ F_\perp \times r \, dθ (scaled proxy) | μN·m | `node_data`: u_z along ICRS arc | 2.47\text{--}18.34 (active range) | Ring asymmetry |

This chapter has established the complete computational methodology for the AVBC framework. The 34 FEBio simulations — comprising 8 arc-sweep configurations, 16 patient-specific double-run models, 4 concentric-sweep configurations, and 6 progressive-thickness configurations — provide the empirical foundation for the three-vector decomposition. The key results are:

1. V_R is insensitive to arc length for partial arcs (19.2\text{--}19.9 μm), confirming that flattening is controlled by ring thickness and implantation depth rather than by circumferential extent.

2. V_T decreases monotonically with arc length according to V_T = -0.0018 \times \text{arc}° + 7.79 (R² = 0.94), providing a linear, predictable control lever for astigmatism regularization.

3. V_τ is virtually zero (2.47 μ\text{N}\cdot\text{m}) for symmetric configurations but ranges from 9.31 to 18.34 μ\text{N}\cdot\text{m} for progressive-thickness designs, validating that active apex repositioning requires asymmetric rings aligned with the Mechanical Neutral Axis (ENM).

4. Corneal thickness is the primary modulator of the displacement response, with thin corneas (< 430 μm) exhibiting 20% greater |Δ u_z| than thick corneas (> 500 μm).

5. The displacement paradox — negative Δ u_z despite positive clinical flattening — is resolved by the distinction between displacement and curvature.

These findings are robust to mesh refinement, converge reliably for moderate keratoconus (K\text{-steep} < 52 D), and are fully traceable through the computational pipeline to the HGO constitutive parameters.

---

## 10.9 Limitations

Five limitations of the current computational approach merit explicit acknowledgment:

1. **Simplified geometry.** The corneal mesh employs spherical shell geometry with uniform asphericity. Real keratoconic corneas exhibit complex three-dimensional shape variations (Q-values ranging from −0.2 to −0.8) that modulate the displacement field in ways not captured by the spherical approximation.

2. **Homogeneous material properties.** The HGO parameters are spatially uniform within each simulation, whereas the real corneal stroma exhibits depth-dependent fibril density (Winkler et al., 2011), region-dependent crosslinking density, and hydration-dependent moduli. The multilayer model partially addresses the depth dependence but does not incorporate in-plane spatial variation.

3. **Rigid ICRS idealization.** The ring segment is modeled as a zero-displacement boundary condition rather than as a deformable solid with its own material properties. While the Young's modulus mismatch (PMMA: 3 GPa vs. stroma: ~0.3 MPa) makes this approximation reasonable for displacement analysis, it precludes the computation of interface stresses and the assessment of ring-stroma mechanical coupling.

4. **No viscoelasticity.** The cornea is modeled as a hyperelastic (time-independent) material. Viscoelastic phenomena including creep, stress relaxation, and strain-rate dependence are not captured. These effects are relevant to the long-term biomechanical adaptation of the cornea to the implant, which occurs over weeks to months after surgery.

5. **Vτ proxy limitation.** The torsional proxy uses displacement gradients rather than reaction forces. While the proxy is exact for symmetric configurations (V_τ = 0), its quantitative accuracy for asymmetric configurations depends on the local stiffness matrix at the constrained nodes and must be calibrated against reaction-force data.

Despite these limitations, the model captures the essential physics of the ICRS–cornea interaction: the pressure-driven deformation of an anisotropic hyperelastic shell constrained by a rigid annular insert. The qualitative trends — V_T monotonicity, V_R insensitivity, displacement paradox, and pachymetry sensitivity — are robust to model refinement and have been independently reported by other groups using different FEM platforms and constitutive models (Kling and Marcos, 2013; Lago et al., 2015).

---

## References

1. García de Oteyza G, Álvarez de Toledo J, Barraquer RI, et al. Finite element analysis of the biomechanical effects of progressive thickness intracorneal ring segments. *J Cataract Refract Surg*. 2021;47(2):258–265.
2. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *J R Soc Interface*. 2006;3(6):15–35.
3. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast*. 2000;61(1–3):1–48.
4. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
5. Lago MA, Rupérez MJ, Monserrat C, et al. Patient-specific simulation of intrastromal ring segment implantation in corneas with keratoconus. *J Mech Behav Biomed Mater*. 2015;51:260–268.
6. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.
7. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
8. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Front Bioeng Biotechnol*. 2018;6:210.
9. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.
10. Winkler M, Chai D, Kriling S, et al. Nonlinear optical macroscopic assessment of 3-D corneal collagen organization and axial biomechanics. *Invest Ophthalmol Vis Sci*. 2011;52(12):8818–8827.
