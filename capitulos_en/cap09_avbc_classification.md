<!-- GPT revision applied -->
# Chapter 9 — The Integrated AVBC Classification

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part IV — Classification and Clinical Application*

---

> **Key Points**
> - The AVBC classification integrates O/T/B into a **biomechanical decision matrix** with traceable prescriptions.
> - The ACE (Axial Coherence Index) is the screening parameter: ACE_min < 28° predicts ≥ 3 lines of visual gain.
> - The indices CI_R, VT-ratio, and Vτ-ratio close the surgeon's **feedback loop**.
> - AVBC adds value in ~40% of cases — those with MNA divergence, displaced apex, or unusual biomechanics.
> - For central symmetric keratoconus, nomograms remain adequate.

## 9.1 Introduction: Why Classification Matters

When an experienced keratoconus surgeon encounters a set of topographic, tomographic, and aberrometric data, the decision-making process occurs implicitly: pattern recognition, weighted by years of clinical experience, converges on a ring configuration that "feels right." This intuitive process, while often effective, is neither reproducible nor transferable. Two equally experienced surgeons examining the same dataset may arrive at different configurations — not because one is wrong and the other right, but because each surgeon applies different internal weightings to the available data, and neither can articulate the precise algorithm by which the decision was reached.

The AVBC classification system addresses this opacity by decomposing the clinical assessment into three explicit, sequential modules, each with defined inputs, quantitative criteria, and categorical outputs. The modules are:

- **Module O (Optical Coherence Assessment):** Determines whether the wavefront aberration profile is amenable to the type of correction an ICRS can provide. Output: O+, O~, or O−.
- **Module T (Topographic Morphology):** Locates the ectasia spatially and identifies the Mechanical Neutral Axis (MNA). Output: morphological archetype and MNA azimuth.
- **Module B (Biomechanical Mechanism Selection):** Identifies the dominant biomechanical vector based on clinical need and maps it to specific ring parameters. Output: ring prescription (thickness, arc length, depth, meridian, symmetry profile).

The classification is designed to be transparent: each step can be audited, each criterion is quantitative, and each recommendation can be traced to a specific biomechanical rationale supported by the finite element evidence presented in Chapters 6, 7, and 8. This transparency is what distinguishes a *classification system* from a *nomogram*: the classification system explains *why* it recommends what it recommends.

> [!IMPORTANT]
> **For the Clinician: The Difference Between a Nomogram and AVBC**
> A nomogram is a black box: KMax goes in, "250 μm ring" comes out. You don't know *why*.
> AVBC is transparent: it first evaluates whether the patient is an optical candidate (Module O), then maps the ectasia in space (Module T), and only then prescribes the biomechanics (Module B). At each step, there is a measurable rationale that you can debate and improve with experience.

---

## 9.2 Module O — Optical Coherence Assessment

### Rationale

Before any biomechanical analysis is performed, the clinician must answer a fundamental question: will this patient's vision improve if the corneal topography improves? This question may seem trivially obvious, but it is not. A substantial proportion of keratoconus patients present with optical aberrations that are beyond the corrective reach of curvature modification alone. ICRS reshapes the anterior corneal surface — it flattens steep meridians, redistributes tangential (hoop) stress, and can migrate the cone apex. What it cannot do is eliminate posterior corneal irregularity, compensate for lenticular aberrations, correct irregular trefoil or quadrafoil, or repair stromal scarring. When these untreatable factors dominate the optical degradation, ICRS will improve the topographic map without improving the patient's functional vision — the well-documented "the map improves but the vision doesn't" dissociation.

To bridge this critical clinical gap, Module O functions as a gatekeeper. By implementing the **Axial Coherence Index (ACE)** as the primary selection parameter for optical eligibility, we unify the angular alignment of the steep topographic meridian (θ_topo) and the comatic axis (θ_coma) into a single functional biomarker:

ACE_min = Measure of the angular difference (in degrees) between the steepest corneal meridian and the coma axis.

This parameter was validated in a multidomain cohort of N = 1,139 eyes (including N = 300 ICRS implants; Reis & Sandes, 2026, present volume) as a highly superior predictor of visual outcomes compared to traditional raw tomographic indices such as KMax and local pachymetry.

Patients classified as O+ proceed with high confidence that ICRS will deliver both topographic and functional improvements. Patients classified as O~ proceed with cautious expectations. Patients classified as O− are counseled that the primary value of ICRS may be topographic management (facilitating contact lens fitting, halting progression when combined with CXL) rather than visual rehabilitation.

### Assessment Criteria

Five wavefront and coherence parameters measured at a 6 mm pupil provide Module O input:

| Criterion | Favorable (O+) | Intermediate (O~) | Unfavorable (O−) | Source |
|---|:---:|:---:|:---:|---|
| **ACE_min** | < 15° (High ACE) | 15°–45° (Moderate ACE) | > 45° (Low ACE) | Reis & Sandes, 2026 |
| Coma RMS | < 2.50 μm | 2.50–3.50 μm | > 3.50 μm | Alió & Shabayek, 2006 |
| Δ Axis (refraction vs K-steep) | < 15° | 15°–30° | > 30° | Rabinowitz, 1999 |
| Total HOA RMS | < 2.0 μm | 2.0–4.0 μm | > 4.0 μm | Maeda et al., 2002 |
| Coma vs cone apex | Ipsilateral | Ambiguous | Contralateral | Piñero, 2014 |

**Axial Coherence Index (ACE_min).** ACE_min evaluates the angular alignment of the cornea's primary structural and optical asymmetry axes. An ACE_min < 15° (High ACE) means highly aligned structural and optical axes, allowing the ICRS-induced curvature regularization to translate directly into substantial visual recovery. Conversely, an ACE_min > 45° (Low ACE) indicates a decoupling of structural and optical parameters, suggesting that any stromal geometric redistribution will likely induce secondary irregular aberrations rather than restore functional vision. As described in Chapter 4, the ACE_min < 28° threshold represents the optimal screening cutoff for predicting ≥ 3 Snellen lines of improvement (ROC AUC: 0.82, Sensitivity: 78%, Specificity: 84%, statistically superior to KMax [AUC 0.68] and pachymetry [AUC 0.64], DeLong test p = 0.012).

![Figure 9.2 — ROC curves: ACE_min vs KMax vs pachymetry as discriminators.](book_figures/fig_09_02_ice_roc.svg)

**Coma RMS** is the single most informative classical optical parameter for ICRS eligibility. Vertical coma (Z₃⁻¹) is the signature high-order aberration of inferior keratoconus and the aberration most effectively reduced by ICRS-induced curvature redistribution. Values below 2.50 μm indicate that the aberration burden is within the corrective range of a standard ICRS configuration; values above 3.50 μm suggest the cone is so advanced that residual irregularity after ring insertion will remain above the threshold of functional significance.

**Axis discordance** captures the degree of internal (non-corneal) astigmatic contribution. When the manifest refractive cylinder axis diverges from the steep keratometric meridian by more than 30°, a substantial fraction of the cylinder arises from lenticular or other intraocular sources that ICRS cannot treat. The postoperative refractive outcome becomes unpredictable because the ring corrects only the corneal component of an astigmatism that has significant non-corneal contributions.

**Total HOA RMS** serves as a global aberration metric. When total high-order aberrations exceed 4.0 μm, the corneal surface is so irregular that the predominantly low-order correction provided by ICRS leaves a large aberrometric residual. Such eyes may be better served by rigid gas-permeable or scleral contact lenses, which bypass the irregular anterior surface entirely.

### Classification Logic

The composite classification follows a conservative worst-criterion rule:

- **O+ (Favorable):** All five criteria in the Favorable column, or ≥ 4 of 5 favorable with none unfavorable. Proceed with high confidence.
- **O~ (Intermediate):** Mixed results — at least one criterion in the Intermediate range, none in the Unfavorable column. Proceed with cautious expectations; counsel the patient about the possible need for adjunctive correction.
- **O− (Unfavorable):** Any criterion in the Unfavorable column, or ≥ 3 of 5 unfavorable. ICRS may still be implanted for topographic management, but functional expectations should be adjusted accordingly. The primary goal may be facilitating contact lens fitting rather than spectacle independence.

An important clinical clarification: **O− does not mean "do not operate."** It means the surgeon's mental model of success should shift from "the patient will see better" to "the corneal shape will improve, which may enable other corrective strategies." This subtle distinction is precisely the kind of structured expectation alignment that a classification system can provide but a nomogram cannot.

> [!WARNING]
> **For the Clinician: When to Stop Before Surgery**
> If the patient has Low ACE (ACE_min > 45°) AND Total HOA RMS > 4.0 μm: **do not proceed without an in-depth conversation**. Data from N=300 implants (Reis & Sandes, 2026, present volume) show that these patients gain only 1.6 Snellen lines on average (vs. 4.2 in the O+ group). The ring may be indicated for contact lens tolerance, but never as a promise of functional vision.

---

## 9.3 Module T — Topographic Morphology and the MNA

### Morphological Archetypes

Corneal tomography provides the spatial information needed to determine where the ectatic process is centered and how it extends. Module T classifies the ectatic pattern into one of five morphological archetypes:

| Morphology | Description | Typical Cone Location | Ring Positioning Strategy |
|---|---|:---:|---|
| **Central oval** | Symmetric bowtie, centered within 1 mm of the visual axis | Central | Symmetric ring, any meridian |
| **Inferior nipple** | Small, steep cone (< 3 mm diameter), inferior | Inferior (5–7 o'clock) | Single inferior segment or asymmetric pair |
| **Paracentral crescent** | Arc-shaped flattening, typically inferotemporal to inferonasal | Paracentrally displaced | Targeted to cone, arc length matched |
| **Peripheral D-shape** | Broad, low-gradient ectasia toward the limbus | Peripheral (> 2 mm from axis) | Wide arc or two segments |
| **Globus (KMax > 60 D)** | Near-total ectasia, no discernible apex | Global | **Structural stabilization / CL tolerance** |

The first four archetypes proceed to Module B. For the Globus archetype (where KMax exceeds 60 D and can reach up to 85 D in extreme ectatic corneas), the primary ICRS goal shifts from optical optimization to structural stabilization and contact lens tolerance restoration. While some of these extreme cases may eventually require deep anterior lamellar keratoplasty (DALK), clinical evidence demonstrates that ICRS can still provide significant flattening and mechanical reinforcement, preventing or delaying transplantation. Crucially, the non-convergence of our patient-specific finite element models (patients P5 and P9, with KMax > 53 D) under the standard FEBio HGO material model should be interpreted as a **numerical and computational limitation** (due to severe element distortion under extreme curvatures, localized deformation gradients, and mesh contact instabilities at extreme deformations), not as a physical or biological contraindication. In clinical practice, these extreme corneas frequently experience significant structural remodeling and flattening post-ICRS.

### The MNA — Mechanical Neutral Axis

One of the most clinically actionable concepts introduced by the AVBC framework is the Mechanical Neutral Axis (MNA). The MNA is defined as the meridian of maximum posterior stromal displacement under physiological intraocular pressure. It represents the axis along which the accumulated biomechanical deformation is greatest — the direction in which the cornea is "buckling."

In conventional practice, the steep keratometric meridian (K-steep) serves as the reference axis for ring positioning. The implicit assumption is that the steepest curvature coincides with the maximum deformation. This assumption is frequently incorrect. Analysis of patient-specific FEM models reveals that K-steep and MNA diverge in approximately 40% of cases:

| MNA–K-steep Relationship | Frequency | Clinical Significance |
|:---:|:---:|:---:|
| Concordant (< 15°) | ~60% | Standard case — nomograms adequate |
| Moderately divergent (15°–45°) | ~30% | Nomogram may underperform; AVBC recommended |
| Severely divergent (> 45°) | ~10% | Nomogram unreliable; AVBC essential |

The origin of this divergence lies in the distinction between surface curvature (which K-steep measures) and volumetric deformation (which the MNA captures). A cornea with asymmetric pachymetry — thinner nasally than temporally, for example — will exhibit maximum posterior displacement along a meridian that is rotated relative to the anterior curvature peak, because the thinner region deforms preferentially under IOP loading. The K-steep axis captures the optical consequence of deformation; the MNA captures its mechanical origin. When these two axes diverge, positioning the ring along K-steep treats the symptom instead of the cause.

**Clinical MNA measurement protocol:**
1. Obtain the posterior elevation map from Scheimpflug tomography (Pentacam, Galilei, or equivalent).
2. Display the best-fit sphere (BFS) difference map with a diameter of 8.0 mm.
3. Identify the meridian passing through the maximum posterior elevation point.
4. Record this meridian as the MNA.
5. Calculate MNA divergence: |MNA − K-steep|.
6. If divergence > 15°, the AVBC protocol recommends ring positioning referenced to the MNA, not K-steep.

> [!TIP]
> **For the Clinician: The Practical MNA Protocol in 30 Seconds**
> 1. Open Pentacam → Posterior Elevation Map → BFS 8 mm Differential.
> 2. Find the reddest point (maximum posterior elevation).
> 3. Trace the meridian through that point → that is the MNA.
> 4. Compare with the K-steep from the anterior map.
> 5. If the difference is > 15° → **implant aligned to MNA, not K-steep**.
>
> In ~40% of patients, this step will change your surgical plan.

---

![Figure 9.1 — Complete AVBC decision tree: from examination to prescription.](book_figures/fig_09_01_arvore_decisao_avbc.svg)

## 9.4 Module B — Biomechanical Vector Selection

### The Three Vectors and Their Clinical Correlates

Module B translates the clinical need identified through Modules O and T into a specific biomechanical prescription. The translation is mediated by the three AVBC vectors, each of which is modulated by a distinct ring parameter, as established by the 34 FEBio simulations (comprising 28 symmetric runs and 6 progressive-thickness asymmetric runs) described in Chapter 12:

| Vector | Physical Quantity | FEM Range | Clinical Correlate | Primary Controller |
|:---:|:---:|:---:|:---:|:---:|
| **VR** | Radial displacement Δuᵣ | 8.9–19.9 μm | ΔK (flattening) | Ring **thickness** |
| **VT** | Tangential stress Δσ_θθ | 7.20–7.78 kPa | ΔCyl (regularization) | **Arc length** |
| **Vτ** | Torque proxy | 0 (symmetric rings) | Apex repositioning | **Asymmetry** |

The key findings supporting this mapping are:

1. **VR is insensitive to arc length.** Across partial arcs from 90° to 320°, VR varied by less than 4% (19.2–19.9 μm). This means the surgeon can adjust arc length without affecting flattening.

2. **VT is monotonically dependent on arc length.** The empirical relationship VT(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94) provides a continuous and predictable control lever for astigmatism regularization.

3. **Vτ = 0 for all symmetric configurations.** This validates that symmetric rings cannot induce apex repositioning. To generate Vτ, the surgeon must use an asymmetric (progressive-thickness) ring.

### Decision Rules

Module B applies three sequential decision rules based on the dominant clinical need:

**Rule 1 — Flatten:** When the primary need is to reduce K-steep (central cone, high keratometric power, aligned astigmatism), the dominant vector is VR. The surgeon increases ring thickness (250–400 μm) while keeping arc length at the minimum needed for structural stability (120°–160°). Depth is set at 70–80% of pachymetry to amplify the radial effect.

**Rule 2 — Regularize:** When the primary need is to reduce irregular astigmatism (paracentral crescent or D-shape morphology, MNA ≠ K-steep), the dominant vector is VT. The surgeon increases arc length (210°–320°) while keeping thickness moderate (150–250 μm). The ring is positioned along the MNA to maximize biomechanical regularization.

**Rule 3 — Reposition:** When the primary need is to migrate the cone apex toward the visual axis (displaced apex > 1 mm, coma > 3.5 μm), the dominant vector is Vτ. The surgeon uses a progressive-thickness asymmetric ring (e.g., 300→150 μm) oriented along the MNA. The thicker end of the ring is positioned to leverage the cone toward directional displacement toward the visual axis.

## 9.5 Biomechanical Phenotypic Classification by Constitutive Parameters (HGO/FEBio)

The classical keratoconus classification is based on purely geometric or topographic surface parameters, such as the Amsler-Krumeich scale (based on central mean keratometry and local thickness) or the Belin ABCD classification (based on anterior and posterior radius of curvature, thinnest pachymetry, and visual acuity). While clinically useful for screening and refractive severity staging, these systems are inherently **non-biomechanical**: they evaluate the geometric consequences of stromal mechanical failure but do not capture the underlying molecular and mechanical pathophysiology of the material.

To bridge this fundamental gap and equip the surgeon with a deep causal language, the AVBC framework introduces the **Biomechanical Phenotypic Classification**. This system maps the structural failure state of the corneal stroma directly to the constitutive parameters of the anisotropic hyperelastic Holzapfel-Gasser-Ogden (HGO) model in FEBio (c, k₁, k₂, κ), correlating them with state-of-the-art clinical imaging biomarkers ("Multimodal Proxies").

**Epistemological Note.** The phenotypic classification proposed here operates in the constitutive parameter space of the HGO model — quantities that are not directly measurable *in vivo* with any currently available clinical device (Corvis ST, ORA, Brillouin). The phenotypes are therefore inferred *indirectly* through multimodal biomarkers ("Multimodal Proxies") that correlate observable clinical patterns with specific parametric dominances. We further acknowledge that the inverse problem of HGO parameter identification in the cornea is inherently ill-posed: multiple parameter sets can produce similar macroscopic behaviors, due to the phenomenon of parametric compensation (Kling & Marcos, 2013; Pandolfi et al., 2019). The classification therefore identifies **phenotypic dominances** — the failure mechanism that governs the observed clinical behavior — rather than absolute values of the constitutive parameters. Quantitative validation of this sensitivity mapping was recently performed through a comprehensive parametric campaign of 377 finite element simulations (Section 12.3), although validation by direct *in vivo* histomechanical correlation remains a future research line (Section 13.4.6).

We define four primary biomechanical phenotypes of corneal ectasia:

### 9.5.1 Matrix Degradation Phenotype (c-Dominant)
* **Physical Basis:** Primary reduction in the isotropic extracellular matrix shear modulus (c < 0.05 MPa), arising from localized enzymatic degradation of the amorphous proteoglycan-rich ground substance (decorin, lumican, and keratocan). The collagen fibrils (k₁) remain initially healthy and tensioned but lose interlamellar shear coupling support.
* **Clinical Signature (Multimodal Proxy):** Typically presents as forme fruste or subclinical keratoconus. Manifests as an isolated increase in the Tomographic Biomechanical Index (TBI > 0.35) with a normal anterior sagittal curvature map and stable pachymetry.
* **Surgical Implication:** The primary goal is containment of initial mechanical progression. Corneas at this stage exhibit high responsiveness to combined ultrafast crosslinking (CXL) and thin segment implants (VR-dominant vector) to restore baseline membrane mechanical stability.

### 9.5.2 Fibrillar Insufficiency Phenotype (k₁-Dominant)
* **Physical Basis:** Intrinsic mechanical failure with severe drop in tangential elastic stiffness of collagen fibrils (k₁ ≪ 0.22 MPa). Represents chronic stretching, physical rupture, or slippage of collagen lamellae, directly compromising the stroma's ability to withstand the tensile stress imposed by intraocular pressure.
* **Clinical Signature (Multimodal Proxy):** Established moderate to advanced keratoconus. Characterized by pronounced apical elevation, severe compensatory epithelial thickening in adjacent regions (Salomão masking effect), and dramatic increase in high-order comatic aberration (Coma RMS > 2.50 μm, Module O).
* **Surgical Implication:** The stroma requires direct molecular stiffening (CXL to re-establish k₁ stiffness by creating chemical covalent crosslinks) combined with thicker ICRS implants to invoke the radial vector VR and compensate for the increased stromal fibrillar compliance.

### 9.5.3 Microstructural Disorganization Phenotype (κ-Dominant)
* **Physical Basis:** Marked increase in the angular dispersion parameter of collagen lamellae (κ → 1/3). The cornea loses its highly organized preferential circumferential and radial orthogonal arrangement in the periphery and center, transitioning mechanically and numerically to isotropic behavior with low global shear stiffness.
* **Clinical Signature (Multimodal Proxy):** Highly eccentric, peripheral cones (paracentral crescent and peripheral D-shape archetypes) or extreme curvature "nipple" type cones. Characterized by a **marked divergence** between the posterior Mechanical Neutral Axis (MNA) and the anterior steep keratometric meridian (|MNA − K-steep| > 30°).
* **Surgical Implication:** Conventional nomogram alignment based purely on the K-steep meridian is ineffective and induces secondary aberrations. ICRS implantation must be mandatorily referenced to the posterior MNA azimuth to intercept the spatial dispersion gradient and act as an active mechanical stress shunting bridge via the tangential vector VT.

### 9.5.4 Exponential Instability Phenotype (k₂-Dominant)
* **Physical Basis:** Compromise in the nonlinear exponential stiffening parameter (k₂ ≪ 100). The cornea loses the physiological capacity to stiffen exponentially under rapid mechanical deformation, becoming susceptible to catastrophic and irreversible plastic deformation when subjected to cyclic external stresses.
* **Clinical Signature (Multimodal Proxy):** Strongly associated with chronic eye rubbing habit in patients with genetic predisposition and atopy. Characterized by rapid daily refraction fluctuations, localized pachymetric image distortion, and documented progression at short time intervals.
* **Surgical Implication:** Absolute cessation of ocular friction is the primary therapeutic prerequisite. ICRS insertion is indicated to restore linear elastic integrity but must be combined with CXL to act synergistically in stabilizing the nonlinear stiffening behavior.

### 9.5.5 Mixed Phenotypes and the Continuous Spectrum

In clinical practice, the four pure phenotypes described above represent the extremes of a continuous four-dimensional parameter space. Keratoconus pathophysiology is a progressive process with coupled cycles of enzymatic degradation (MMP-9, MMP-13), lamellar disruption, and remodeling, where multiple constitutive parameters deteriorate simultaneously. Proteoglycan degradation (c↓) weakens interlamellar coupling; the resulting lamellar slippage increases angular dispersion (κ↑); chronic tension on remaining fibrils degrades elastic stiffness (k₁↓); and loss of mature type I collagen fibers reduces exponential stiffening capacity (k₂↓). These four processes are thermodynamically coupled.

Most moderate-to-advanced keratoconus patients will therefore exhibit **mixed phenotypes** — combinations such as c-k₁ (progressive matrix degradation with concomitant fibrillar failure) or κ-k₂ (lamellar disorganization with loss of strain-hardening in atopic patients). The classification identifies the **dominant mechanism** — the one that determines the primary therapeutic strategy — without denying the coexistence of secondary degradation in other parameters.

The analogy with the hematological classification of anemias is instructive: anemia can be classified as iron-deficiency, megaloblastic, or hemolytic, but severely ill patients frequently present with multiple simultaneous deficits. The classification retains precise clinical value because it identifies the **primary therapeutic driver** that governs the first line of treatment. Analogously, the HGO phenotypic classification answers the surgically decisive question: *"Which biomechanical parameter should I prioritize in my therapeutic strategy for this specific patient?"*

### 9.5.6 Phenotypic Falsification Criteria

A scientific classification that cannot be falsified is not science — it is metaphysics (Popper, 1959). Below, we define testable predictions and rejection criteria for each biomechanical phenotype:

| Phenotype | Testable Prediction | Falsification Criterion |
|---|---|---|
| **c-dominant** | Elevated TBI + normal anterior topography → strong response to isolated CXL with TBI stabilization at 12 months | If CXL does not stabilize TBI in > 80% of cases classified as c-dominant |
| **k₁-dominant** | Elevated coma + established ectasia → strong flattening effect with thick ICRS (VR dominant) | If CI_R < 0.70 systematically in patients classified as k₁-dominant |
| **κ-dominant** | MNA–K-steep > 30° → superior improvement with MNA-referenced positioning vs K-steep | If MNA positioning does not produce VT-ratio > 0.85 in > 75% of cases |
| **k₂-dominant** | Chronic eye rubbing + refractive fluctuation → stabilization with CXL + friction cessation | If documented progression continues after CXL + cessation in > 50% of cases |

These falsification criteria will be formally tested in the prospective study described in Chapter 13. The *a priori* definition of rejection thresholds is an ethical and methodological commitment that ensures the scientific integrity of the proposed classification.

---

## 9.6 The Biomechanical Decision Matrix

### Inter-Module Integration

The power of the AVBC classification lies in the intersection of all three modules. The decision matrix below presents the complete set of clinically relevant O × T × B combinations:

> [!NOTE]
> **For the Clinician: How to Use the Matrix**
> Read the table from left to right: first classify optics (O+, O~, O−), then identify the topographic archetype (Module T), and the last column will tell you which biomechanical vector to prioritize and the suggested configuration. You can use this as a checklist in the operating room.

| Module O | Module T | Module B | Ring Configuration | Rationale |
|:---:|:---:|:---:|:---:|:---:|
| O+ | Central oval | VR dominant | Symmetric, 250–350 μm, arc 150° | Centered cone, good optics → flatten |
| O+ | Inferior nipple | VR + VT | Symmetric, 200–300 μm, arc 160° at 6 o'clock | Inferior cone → flatten + regularize |
| O+ | Paracentral crescent | Vτ + VR | Asymmetric (300→200 μm), arc 160° | Displaced apex → reposition + flatten |
| O~ | Any nipple/crescent | VT dominant | Symmetric, 200 μm, arc 210° | Uncertain optics → prioritize regularization |
| O~ | Paracentral | Vτ + VT | Asymmetric, arc 210° | Displaced + uncertain → reposition + regularize |
| O− | Central oval | Conservative VR | Symmetric, 200 μm, arc 120° | Poor optics → conservative approach |
| O− | Peripheral D-shape | Minimal VT or defer | Two thin segments or defer | Diffuse ectasia + poor optics → limited benefit |
| Any | Globus (K > 60 D) | Structural VT/B | Symmetric, 250–350 μm, arc 160°–210° | Stabilization / CL tolerance (up to 85 D) |

### The Role of Depth

Implantation depth acts as a universal amplifier across all three vectors. The AVBC protocol recommends:

| Clinical Context | Depth | Rationale |
|:---:|:---:|:---:|
| Standard keratoconus | 70–75% of pachymetry | Standard positioning, balanced effect |
| Thin cornea (< 400 μm) | 65–70% | Safety margin for ring-endothelium clearance |
| Strong flattening target | 75–80% | Deeper positioning amplifies VR |
| Post-CXL cornea | 70–75% (with thicker ring) | CXL increases k₁ → stiffer stroma → less deformation per unit ring volume |

---

## 9.7 The AVBC Correction Index: Closing the Feedback Loop

### Component-Specific Correction Indices

Perhaps the single most practically valuable element of the AVBC framework is its capacity to provide quantitative postoperative feedback. Inspired by the Alpins Correction Index (CI = |SIA|/|TIA|), AVBC defines three component-specific correction indices:

**Radial Correction Index (Flattening Efficacy):**
Calculated by dividing the actual postoperative flattening by the flattening the model had predicted.
An index of 1.0 ± 0.15 indicates the effect matched the prediction. Values below 0.85 indicate systematic undercorrection (the cornea was stiffer than modeled, or the ring effect was smaller than predicted); values above 1.15 indicate overcorrection.

**Tangential Correction Ratio (Astigmatism Efficacy):**
Calculated by dividing the actual cylinder correction by the correction expected from the chosen arc length.
This ratio evaluates whether the arc length produced the expected degree of astigmatism regularization.

**Torsional Correction Ratio (Migration Efficacy):**
Calculated by dividing the actual distance the cone migrated by the expected distance based on the ring's asymmetry.

For symmetric rings, the expected Vτ is zero, and any non-zero apex migration indicates unexpected asymmetric loading. For asymmetric rings, this ratio quantifies the effectiveness of the torque mechanism.

### The Personal Calibration Curve

Over N surgeries, each surgeon accumulates a personal database of correction indices. The mean CI_R represents the surgeon's systematic bias: if the mean CI_R is 0.85 over 30 cases, the surgeon is consistently underestimating the ring effect and should multiply future predictions by 1/0.85 = 1.18. This iterative calibration process is the biomechanical analogue of IOL A-constant adjustment and represents the mechanism by which the AVBC framework improves predictive accuracy over time without requiring changes to the underlying physical model.

> [!TIP]
> **For the Clinician: Your "Personal Factor"**
> Just as in IOL formulas there is each surgeon's "A-constant," in AVBC there is your mean CI_R. If after 20 cases your mean CI_R is 0.80, this means you systematically flatten 20% less than the FEM predicts. Correct by multiplying the planned thickness by 1/0.80 = 1.25. This is exactly what the Alpins School taught us — and AVBC applies it to the ring.

---

## 9.8 AVBC Versus Existing Nomograms

The fundamental differences between the AVBC framework and existing nomogram systems are structural, not merely parametric:

| Feature | Ferrara Nomogram | Keraring Calculator | **AVBC Framework** |
|---|:---:|:---:|:---:|
| Planning basis | Empirical (Q value, K-steep) | Phenotype-based | **Biomechanical vectors (VR/VT/Vτ)** |
| Mechanism | Implicit | Implicit | **Explicit: 3 independent mechanisms** |
| Optical assessment | None | None | **Module O (quantitative)** |
| MNA integration | No | No | **Yes (40% of cases diverge from K-steep)** |
| Asymmetric rings | No guidance | Limited | **Vτ-guided asymmetric selection** |
| Postop feedback | None | None | **CI_R, VT-ratio, Vτ-ratio** |
| Surgeon calibration | Not possible | Not possible | **Personal calibration curve** |
| Transparency | Opaque lookup table | Semi-transparent | **Fully traceable to FEM** |

AVBC does not aim to replace nomograms in every case. For the approximately 60% of patients with central, symmetric keratoconus where MNA ≈ K-steep and astigmatism is well-aligned, the nomogram and AVBC will prescribe essentially the same ring configuration. AVBC adds value for the remaining 40% — cases where the MNA diverges, the apex is displaced, the astigmatism is irregular, or the biomechanical context is unusual (post-CXL, thin cornea, atypical morphology).

---

## 9.9 Limitations and Scope

The AVBC classification, in its current form, has specific limitations that must be acknowledged:

1. **Clinical validation is pending.** The decision matrix is derived from FEM simulations and biomechanical reasoning, not from prospective clinical trials. Predicted outcomes are model-dependent.

2. **Thresholds are preliminary.** The VR/VT ranges (8.9–19.9 μm / 7.20–7.78 kPa) are specific to the HGO parameter set used in the simulations. Different material parameters may produce different absolute values while preserving relative trends.

3. **Vτ has been computationally validated.** Active torque values generated by progressive-thickness designs were validated using asymmetric FEBio simulations (Chapter 12) and range from 9.31 to 18.34 μN·m, breaking the zero-torque condition (Vτ = 0) characteristic of symmetric configurations.

4. **The MNA measurement protocol requires inter-observer agreement studies.** The reproducibility of posterior-elevation-based MNA determination across different instruments and operators has not been formally evaluated.

5. **Multi-segment planning is not addressed.** The current framework focuses on single-segment implantation. Extension to two-segment configurations requires additional modeling.

These limitations define the research program that follows from the framework. They are not weaknesses of the framework itself — they are the natural next steps in its validation.

AVBC was designed as a *language for clinical decision-making*, not as a calculator that provides a definitive answer. It offers the surgeon a way of thinking about ICRS planning that is structured and mechanistically grounded — a framework that can be debated, refined, and calibrated through clinical experience, rather than an opaque lookup table that can only be accepted or rejected.

---

## 9.10 Summary

The integrated AVBC classification decomposes ICRS planning into three sequential modules — Optical (O), Topographic (T), and Biomechanical (B) — each with defined criteria and categorical outputs. Module O gates the process by evaluating optical coherence; Module T localizes the ectasia and identifies the MNA; Module B maps the clinical need to specific biomechanical vectors and thence to ring parameters.

The biomechanical decision matrix crosses all three modules to generate ring prescriptions that are transparent, traceable, and calibratable. The AVBC correction indices (CI_R, VT-ratio, Vτ-ratio) close the surgical feedback loop, enabling surgeon-specific calibration analogous to the Alpins Correction Index for astigmatism surgery.

The AVBC framework adds clinical value primarily in the approximately 40% of cases where the MNA diverges from K-steep, the apex is displaced, or the biomechanical context is unusual. For standard central, symmetric keratoconus with aligned astigmatism, existing nomograms remain adequate. AVBC does not seek to replace the nomogram universally — it seeks to extend the surgeon's decision-making vocabulary to encompass the full dimensionality of the biomechanical problem.

---

## Didactic Summary

- The AVBC classification integrates three modules (O/T/B) into a **biomechanical decision matrix** that generates traceable ring prescriptions.
- The **ACE (Axial Coherence Index)** is the primary screening parameter: ACE_min < 28° predicts ≥ 3 lines of gain (AUC 0.82).
- The AVBC correction indices (**CI_R, VT-ratio, Vτ-ratio**) close the feedback loop, enabling surgeon-specific calibration.
- AVBC adds value in ~40% of cases — those with MNA divergence, displaced apex, or unusual biomechanics.
- For central, symmetric keratoconus with aligned astigmatism, existing nomograms remain adequate.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. Astigmatism analysis by the Alpins method. *J Cataract Refract Surg*. 2001;27(1):31–49.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara P, Torquetti L. Clinical nomograms for Intacs and Ferrara ring segments. In: *Keratoconus and Keratoectasia*. Springer; 2017.
5. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
6. Kling S, Marcos S. Finite-element modeling of intrastromal corneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
7. Maeda N, Klyce SD, Smolek MK. Comparison of methods for detecting keratoconus. *Arch Ophthalmol*. 2002;120(5):601–607.
8. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
9. Rabinowitz YS, Rasheed K. KISA% index: a quantitative videokeratography algorithm. *J Cataract Refract Surg*. 1999;25(10):1327–1335.
10. Vega-Estrada A, Alió JL. Keratoconus progression after ICRS implantation. *Cornea*. 2013;32(5):611–616.
11. Reis M, Sandes J. Corneal Biomechanical Vector Analysis (AVBC): Corneal Biomechanical Force Vectors for Intrastromal Ring Segment Implantation. Present volume; 2026.
