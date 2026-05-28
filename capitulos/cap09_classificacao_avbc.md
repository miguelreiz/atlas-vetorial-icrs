# Chapter 9 — The Integrated AVBC Classification

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part IV — Classification and Clinical Application*

---

## 9.1 Introduction: Why Classification Matters

When an experienced keratoconic surgeon is presented with a set of topographic, tomographic, and aberrometric data, the decision-making process unfolds implicitly: pattern recognition, weighted by years of clinical experience, converges on a ring configuration that "feels right." This intuitive process, while often effective, is neither reproducible nor transferable. Two equally experienced surgeons examining the same dataset may arrive at different configurations — not because one is wrong and the other right, but because each surgeon applies different internal weightings to the available data, and neither can articulate the precise algorithm by which the decision was made.

The AVBC classification system addresses this opacity by decomposing the clinical evaluation into three explicit, sequential modules, each with defined inputs, quantitative criteria, and categorical outputs. The modules are:

- **Module O (Optical Coherence Assessment):** Determines whether the wavefront aberration profile is amenable to the type of correction that an ICRS can provide. Output: O+, O~, or O−.
- **Module T (Topographic Morphology):** Localizes the ectasia spatially and identifies the Eixo Neutro Mecânico (ENM). Output: morphological archetype and ENM azimuth.
- **Module B (Biomechanical Mechanism Selection):** Identifies the dominant biomechanical vector based on the clinical need and maps it to specific ring parameters. Output: ring prescription (thickness, arc length, depth, meridian, symmetry profile).

The classification is designed to be transparent: every step can be audited, every criterion is quantitative, and every recommendation can be traced to a specific biomechanical rationale supported by the finite element evidence presented in Chapters 6, 7, and 8. This transparency is what distinguishes a *classification system* from a *nomogram*: the classification system explains why it recommends what it recommends.

---

## 9.2 Module O — Optical Coherence Assessment

### Rationale

Before any biomechanical analysis is undertaken, the clinician must answer a fundamental question: will this patient's vision improve if the corneal topography improves? This question may seem trivially obvious, but it is not. A substantial proportion of keratoconic patients present with optical aberrations that are beyond the corrective reach of curvature modification alone. The ICRS reshapes the anterior corneal surface — it flattens steep meridians, redistributes hoop stress, and can migrate the cone apex. What it cannot do is eliminate posterior corneal irregularity, compensate for lenticular aberrations, correct irregular trefoil or quadrafoil, or repair stromal scarring. When these non-addressable factors dominate the optical degradation, the ICRS will improve the topographic map without improving the patient's functional vision — the well-documented "map improves but vision doesn't" dissociation.

To address this critical clinical gap, Module O functions as a gatekeeper. By implementing the **Index of Axial Coherence (ICE)** as the primary optical candidacy gating parameter, we unify the angular alignment of the steep topographic meridian (θ_topo) and the comatic axis (θ_coma) into a single functional biomarker:

ICE_min = |θ_topo - θ_coma|

This parameter has been validated across a multi-domain cohort of N = 1,139 eyes (including N = 300 ICRS implants) as a highly superior predictor of visual outcomes, compared to traditional raw tomographic indices such as K_{max} and local pachymetry.

Patients classified as O+ proceed with high confidence that the ICRS will yield both topographic and functional improvement. Patients classified as O~ proceed with cautious expectations. Patients classified as O− are counseled that the primary value of the ICRS may be topographic management (facilitating contact lens fitting, halting progression when combined with CXL) rather than visual rehabilitation.

### Assessment Criteria

![Figure 9.2 - Curvas ROC: ICE_min vs K_max vs paquimetria como discriminadores.](book_figures/fig_09_02_ice_roc.svg)


Five wavefront and coherence parameters measured over a 6 mm pupil provide the Module O input:

| Criterion | Favorable (O+) | Intermediate (O~) | Unfavorable (O−) | Source |
|-----------|:-----------:|:---------------:|:--------------:|--------|
| **ICE_min** | < 15° (ICE Alto) | 15°–45° (ICE Moderado) | > 45° (ICE Baixo) | Reis, 2026 |
| Coma RMS | < 2.50 μm | 2.50–3.50 μm | > 3.50 μm | Alió & Shabayek, 2006 |
| Δ Axis (refraction vs K-steep) | < 15° | 15°–30° | > 30° | Rabinowitz, 1999 |
| Total HOA RMS | < 2.0 μm | 2.0–4.0 μm | > 4.0 μm | Maeda et al., 2002 |
| Coma vs cone apex | Ipsilateral | Ambiguous | Contralateral | Piñero, 2014 |

**Index of Axial Coherence (ICE_min).** The ICE_min evaluates the angular alignment of the cornea's primary structural and optical asymmetry axes. An ICE_min < 15° (ICE Alto) signifies highly aligned structural and optical axes, allowing ICRS-induced curvature regularization to translate directly into substantial visual recovery. Conversely, ICE_min > 45° (ICE Baixo) indicates a decoupling of structural and optical parameters, suggesting that any geometric redistribution of stroma will likely induce secondary irregular aberrations rather than restoring functional vision. As described in Chapter 5, the ICE_min threshold of < 28° represents the optimal gating threshold for predicting \ge 3 Snellen lines of improvement (ROC AUC: 0.82, Sensitivity: 78%, Specificity: 84%, statistically superior to K_{max} [AUC 0.68] and pachymetry [AUC 0.64], DeLong test p = 0.012).

**Coma RMS** is the single most informative classical optical parameter for ICRS candidacy. Vertical coma (Z_3^{-1}) is the signature higher-order aberration of inferior keratoconus and the aberration most effectively reduced by ring-induced curvature redistribution. Values below 2.50 μm indicate that the aberration burden is within the corrective range of a standard ICRS configuration; values above 3.50 μm suggest that the cone is so advanced that the residual irregularity after ring insertion will remain above the threshold of functional significance.

**Axis discordance** captures the degree of internal (non-corneal) astigmatic contribution. When the manifest refractive cylinder axis diverges from the steep keratometric meridian by more than 30°, a substantial fraction of the cylinder arises from lenticular or other intraocular sources that the ICRS cannot address. The post-operative refractive outcome becomes unpredictable because the ring corrects only the corneal component of an astigmatism that has significant non-corneal contributions.

**Total HOA RMS** serves as a global aberration metric. When total higher-order aberrations exceed 4.0 μm, the corneal surface is so irregular that the predominantly low-order correction provided by an ICRS leaves a large residual aberration budget. Such eyes may be better served by rigid gas-permeable or scleral contact lenses, which bypass the irregular anterior surface entirely.

### Classification Logic

The composite classification follows a conservative worst-criterion rule:

- **O+ (Favorable):** All five criteria in the Favorable column, or \ge 4 of 5 favorable with none unfavorable. Proceed with high confidence.
- **O~ (Intermediate):** Mixed results — at least one criterion in the Intermediate range, none in the Unfavorable column. Proceed with cautious expectations; counsel patient regarding the possibility of requiring adjunctive correction.
- **O− (Unfavorable):** Any criterion in the Unfavorable column, or \ge 3 of 5 unfavorable. ICRS can still be implanted for topographic management, but set functional expectations appropriately. The primary goal may be facilitating contact lens fitting rather than spectacle independence.

An important clinical clarification: **O− does not mean "do not operate."** It means that the surgeon's mental model of success must shift from "the patient will see better" to "the corneal shape will improve, which may enable other corrective strategies." This nuanced distinction is precisely the kind of structured expectation-setting that a classification system can provide but a nomogram cannot.

---

## 9.3 Module T — Topographic Morphology and the ENM

### Morphological Archetypes

Corneal tomography provides the spatial information needed to determine where the ectatic process is centered and how it extends. Module T classifies the ectatic pattern into one of five morphological archetypes:

| Morphology | Description | Typical Cone Location | Ring Placement Strategy |
|-----------|------------|:-------------------:|----------------------|
| **Central oval** | Symmetric bowtie, centered within 1 mm of visual axis | Central | Symmetric ring, any meridian |
| **Inferior nipple** | Small, steep cone (< 3 mm diameter), inferior | Inferior (5-7 o'clock) | Single inferior segment or asymmetric pair |
| **Paracentral crescent** | Arc-shaped steepening, typically inferotemporal to inferonasal | Paracentrally displaced | Directed at cone, matched arc length |
| **Peripheral D-shape** | Broad, low-gradient ectasia toward limbus | Peripheral (> 2 mm from axis) | Wide arc or two segments |
| **Globus (KMax > 60 D)** | Near-total ectasia, no discernible apex | Global | **Structural stabilization / CL tolerance** |

The first four archetypes proceed to Module B. For the Globus archetype (where KMax exceeds 60 D and can reach up to 85 D in extreme ectatic corneas), the primary goal of ICRS shifts from optical optimization to structural stabilization and restoring contact lens tolerance. Although some of these extreme cases may eventually require deep anterior lamellar keratoplasty (DALK), clinical evidence demonstrates that ICRS can still provide substantial flattening and mechanical reinforcement, preventing or delaying transplant. Crucially, the non-convergence of our patient-specific finite element models (patients P5 and P9, with KMax > 53 D) under the standard FEBio HGO material model must be interpreted as a **numerical and computational limitation** (due to severe element distortion under extreme curvatures, localized strain gradients, and mesh contact instabilities in extreme strains) rather than a physical or biological contraindication. In clinical practice, these extreme corneas frequently experience significant structural remodeling and flattening post-ICRS.

### The ENM — Eixo Neutro Mecânico

![Figure 9.1 - Árvore de decisão completa AVBC: do exame à prescrição.](book_figures/fig_09_01_arvore_decisao_avbc.svg)


One of the most clinically actionable concepts introduced by the AVBC framework is the Eixo Neutro Mecânico (ENM) — the Mechanical Neutral Axis. The ENM is defined as the meridian of maximum posterior stromal displacement under physiological intraocular pressure. It represents the axis along which the accumulated biomechanical deformation is greatest — the direction in which the cornea is "buckling."

In conventional practice, the steep keratometric meridian (K-steep) serves as the reference axis for ring positioning. The implicit assumption is that the steepest curvature coincides with the maximum deformation. This assumption is frequently incorrect. Analysis of the patient-specific FEM models reveals that K-steep and ENM diverge in approximately 40% of cases:

| ENM–K-steep Relationship | Frequency | Clinical Significance |
|:----------------------:|:---------:|:--------------------:|
| Concordant (< 15°) | ~60% | Standard case — nomograms adequate |
| Moderately divergent (15°–45°) | ~30% | Nomogram may underperform; AVBC recommended |
| Severely divergent (> 45°) | ~10% | Nomogram unreliable; AVBC essential |

The source of this divergence lies in the distinction between surface curvature (which K-steep measures) and volumetric deformation (which the ENM captures). A cornea with asymmetric pachymetry — thinner nasally than temporally, for instance — will exhibit maximum posterior displacement along a meridian that is rotated relative to the anterior curvature peak, because the thinner region deforms preferentially under IOP loading. The K-steep axis captures the optical consequence of the deformation; the ENM captures its mechanical origin. When these two axes diverge, ring placement along K-steep addresses the symptom rather than the cause.

**Clinical measurement protocol for ENM:**
1. Obtain posterior elevation map from Scheimpflug tomography (Pentacam, Galilei, or equivalent).
2. Display the best-fit sphere (BFS) difference map with 8.0 mm diameter.
3. Identify the meridian passing through the point of maximum posterior elevation.
4. Record this meridian as the ENM.
5. Compute ENM divergence: |ENM − K-steep|.
6. If divergence > 15°, the AVBC protocol recommends ring positioning referenced to ENM rather than K-steep.

---

## 9.4 Module B — Biomechanical Vector Selection

### The Three Vectors and Their Clinical Correlates

Module B translates the clinical need identified through Modules O and T into a specific biomechanical prescription. The translation is mediated by the three AVBC vectors, each of which is modulated by a distinct ring parameter, as established by the 34 FEBio simulations (comprising 28 symmetric and 6 progressive-thickness asymmetric runs) described in Chapter 10:

| Vector | Physical Quantity | FEM Range | Clinical Correlate | Primary Controller |
|:------:|:--------------:|:---------:|:-----------------:|:-----------------:|
| **VR** | Radial displacement Δuᵣ | 8.9–19.9 μm | ΔK (flattening) | Ring **thickness** |
| **VT** | Tangential hoop stress Δσ_θθ | 7.20–7.78 kPa | ΔCyl (regularization) | **Arc length** |
| **Vτ** | Torque proxy | 0 (symmetric rings) | Apex migration | **Asymmetry** |

The key findings that support this mapping are:

1. **VR is insensitive to arc length.** Across partial arcs from 90° to 320°, VR varied by less than 4% (19.2–19.9 μm). This means the surgeon can adjust arc length without affecting flattening.

2. **VT is monotonically dependent on arc length.** The empirical relationship VT(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94) provides a predictable, continuous control lever for astigmatism regularization.

3. **Vτ = 0 for all symmetric configurations.** This validates that symmetric rings cannot induce apex repositioning. To generate Vτ, the surgeon must use an asymmetric (progressive-thickness) ring.

### Decision Rules

Module B applies three sequential decision rules based on the dominant clinical need:

**Rule 1 — Flatten:** When the primary need is to reduce K-steep (central cone, high keratometric power, aligned astigmatism), the dominant vector is VR. The surgeon increases ring thickness (250–400 μm) while keeping arc length at the minimum needed for structural stability (120°–160°). Depth is set to 70–80% of pachymetry to amplify the radial effect.

**Rule 2 — Regularize:** When the primary need is to reduce irregular astigmatism (paracentral crescent or D-shape morphology, ENM ≠ K-steep), the dominant vector is VT. The surgeon increases arc length (210°–320°) while keeping thickness moderate (150–250 μm). The ring is positioned along the ENM to maximize biomechanical regularization.

**Rule 3 — Reposition:** When the primary need is to migrate the cone apex toward the visual axis (displaced apex > 1 mm, coma > 3.5 μm), the dominant vector is Vτ. The surgeon uses a progressive-thickness asymmetric ring (e.g., 300→150 μm) oriented along the ENM. The thicker end is placed opposite to the desired direction of apex migration, creating a force couple that drives the apex toward the thinner side.

A fourth scenario — **Stabilize** — applies when the keratoconus is progressive. In this case, corneal collagen cross-linking (CXL) is performed first to halt the biomechanical decompensation cycle, and the ICRS is implanted 3–12 months later when topographic stability has been confirmed. The AVBC framework explicitly addresses this sequencing, recognizing that the post-CXL cornea has different material properties (higher k₁ due to crosslinking) and therefore requires adjusted ring selection.

---

## 9.5 The Biomechanical Decision Matrix

### Cross-Module Integration

The power of the AVBC classification lies in the intersection of all three modules. The following decision matrix presents the complete set of clinically relevant O × T × B combinations:

| Module O | Module T | Module B | Ring Configuration | Rationale |
|:--------:|:--------:|:--------:|:------------------:|:---------:|
| O+ | Central oval | VR dominant | Symmetric, 250–350 μm, arc 150° | Centered cone, good optics → flatten |
| O+ | Inferior nipple | VR + VT | Symmetric, 200–300 μm, arc 160° at 6h | Inferior cone → flatten + regularize |
| O+ | Paracentral crescent | Vτ + VR | Asymmetric (300→200 μm), arc 160° | Displaced apex → reposition + flatten |
| O~ | Any nipple/crescent | VT dominant | Symmetric, 200 μm, arc 210° | Uncertain optics → prioritize regularization |
| O~ | Paracentral | Vτ + VT | Asymmetric, arc 210° | Displaced + uncertain → reposition + regularize |
| O− | Central oval | VR conservative | Symmetric, 200 μm, arc 120° | Poor optics → conservative approach |
| O− | Peripheral D-shape | VT minimal or defer | Two thin segments or defer | Diffuse ectasia + poor optics → limited benefit |
| Any | Globus (K > 60 D) | VT/B structural | Symmetric, 250–350 μm, arc 160°-210° | Stabilization / CL tolerance (up to 85 D) |

### The Role of Depth

Implantation depth acts as a universal amplifier across all three vectors. The AVBC protocol recommends:

| Clinical Context | Depth | Rationale |
|:---------------:|:-----:|:---------:|
| Standard keratoconus | 70–75% of pachymetry | Standard placement, balanced effect |
| Thin cornea (< 400 μm) | 65–70% | Safety margin for ring-endothelium clearance |
| Strong flattening target | 75–80% | Deeper placement amplifies VR |
| Post-CXL cornea | 70–75% (with thicker ring) | CXL increases k₁ → stiffer stroma → less deformation per unit ring volume |

---

## 9.6 The AVBC Correction Index: Closing the Feedback Loop

### Component-Specific Correction Indices

Perhaps the most practically valuable element of the AVBC framework is its capacity for quantitative post-operative feedback. Inspired by the Alpins Correction Index (CI = |SIA|/|TIA|), the AVBC defines three component-specific correction indices:

**CI_R (Radial Correction Index):**
CI_R = \frac{Δ K_{observed}}{Δ K_{predicted}}

A CI_R of 1.0 ± 0.15 indicates that the flattening effect matched the prediction. Values below 0.85 indicate systematic under-correction (the cornea was stiffer than modeled, or the ring effect was less than predicted); values above 1.15 indicate over-correction.

**VT-ratio (Tangential Correction Ratio):**
VT\text{-}ratio = \frac{Δ Cyl_{observed}}{Δ Cyl_{expected}}

This ratio assesses whether the arc length produced the expected degree of astigmatism regularization.

**Vτ-ratio (Torsional Correction Ratio):**
V_τ\text{-}ratio = \frac{Apex\_migration_{observed}}{Apex\_migration_{expected}}

For symmetric rings, the expected Vτ is zero, and any nonzero apex migration indicates unexpected asymmetric loading. For asymmetric rings, this ratio quantifies the effectiveness of the torque mechanism.

### The Personal Calibration Curve

Over N surgeries, each surgeon accumulates a personal database of correction indices. The mean CI_R represents the surgeon's systematic bias: if the average CI_R is 0.85 across 30 cases, the surgeon is consistently under-predicting the ring effect and should multiply future predictions by 1/0.85 = 1.18. This iterative calibration process is the biomechanical analogue of the IOL A-constant adjustment and represents the mechanism by which the AVBC framework improves predictive accuracy over time without requiring changes to the underlying physical model.

---

## 9.7 AVBC Versus Existing Nomograms

The fundamental differences between the AVBC framework and existing nomogram systems are structural, not merely parametric:

| Feature | Ferrara Nomogram | Keraring Calculator | **AVBC Framework** |
|---------|:---------------:|:------------------:|:-----------------:|
| Planning basis | Empirical (Q-value, K-steep) | Phenotype-based | **Biomechanical vectors (VR/VT/Vτ)** |
| Mechanism | Implicit | Implicit | **Explicit: 3 independent mechanisms** |
| Optical assessment | None | None | **Module O (quantitative)** |
| ENM integration | No | No | **Yes (40% of cases diverge from K-steep)** |
| Asymmetric rings | No guidance | Limited | **Vτ-guided asymmetric selection** |
| Post-op feedback | None | None | **CI_R, VT-ratio, Vτ-ratio** |
| Surgeon calibration | Not possible | Not possible | **Personal calibration curve** |
| Transparency | Opaque lookup table | Semi-transparent | **Fully traceable to FEM** |

The AVBC does not claim to replace nomograms for all cases. For the approximately 60% of patients with central, symmetric keratoconus where ENM ≈ K-steep and astigmatism is well-aligned, the nomogram and the AVBC will prescribe essentially the same ring configuration. The AVBC adds value for the remaining 40% — the cases where the ENM diverges, the apex is displaced, the astigmatism is irregular, or the biomechanical context is unusual (post-CXL, thin cornea, atypical morphology).

---

## 9.8 Limitations and Scope

The AVBC classification, in its current form, has specific limitations that must be acknowledged:

1. **Clinical validation is pending.** The decision matrix is derived from FEM simulations and biomechanical reasoning, not from prospective clinical trials. The predicted outcomes are model-dependent.

2. **Thresholds are preliminary.** The VR/VT ranges (8.9–19.9 μm / 7.20–7.78 kPa) are specific to the HGO parameter set used in the simulations. Different material parameters may produce different absolute values while preserving the relative trends.

3. **Vτ has been computationally validated.** The active torque values generated by progressive-thickness designs have been validated using asymmetric FEBio simulations (Chapter 10) and range from 9.31 to 18.34 μN·m, breaking the zero-torque condition (Vτ = 0) characteristic of symmetric configurations.

4. **The ENM measurement protocol requires inter-observer agreement studies.** The reproducibility of the posterior elevation-based ENM determination across different instruments and operators has not been formally assessed.

5. **Multi-segment planning is not addressed.** The current framework focuses on single-segment implantation. Extension to two-segment configurations requires additional modeling.

These limitations define the research program that follows from the framework. They are not weaknesses of the framework itself — they are the natural next steps in its validation.

The AVBC is designed as a *language for clinical decision-making*, not as a calculator that outputs a definitive answer. It provides the surgeon with a structured, mechanistically grounded way of thinking about ICRS planning — a framework that can be debated, refined, and calibrated through clinical experience, rather than an opaque lookup table that can only be accepted or rejected.

---

## 9.9 Summary

The integrated AVBC classification decomposes ICRS planning into three sequential modules — Optical (O), Topographic (T), and Biomechanical (B) — each with defined criteria and categorical outputs. Module O gates the process by assessing optical coherence; Module T localizes the ectasia and identifies the ENM; Module B maps the clinical need to specific biomechanical vectors and thence to ring parameters.

The biomechanical decision matrix crosses the three modules to generate ring prescriptions that are transparent, traceable, and calibratable. The AVBC correction indices (CI_R, VT-ratio, Vτ-ratio) close the surgical feedback loop, enabling surgeon-specific calibration analogous to the Alpins Correction Index for astigmatism surgery.

The AVBC framework adds clinical value primarily in the ~40% of cases where ENM diverges from K-steep, the apex is displaced, or the biomechanical context is unusual. For standard central, symmetric keratoconus with aligned astigmatism, existing nomograms remain adequate. The AVBC does not seek to replace the nomogram universally — it seeks to extend the surgeon's decision-making vocabulary to encompass the full dimensionality of the biomechanical problem.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. Astigmatism analysis by the Alpins method. *J Cataract Refract Surg*. 2001;27(1):31–49.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara P, Torquetti L. Clinical nomograms for Intacs and Ferrara ring segments. In: *Keratoconus and Keratoectasia*. Springer; 2017.
5. García de Oteyza G, et al. Finite element analysis of the biomechanical effects of progressive thickness ICRS. *J Cataract Refract Surg*. 2021;47(2):258–265.
6. Kling S, Marcos S. Finite-element modeling of ICRS in a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
7. Maeda N, Klyce SD, Smolek MK. Comparison of methods for detecting keratoconus. *Arch Ophthalmol*. 2002;120(5):601–607.
8. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
9. Rabinowitz YS, Rasheed K. KISA% index: a quantitative videokeratography algorithm. *J Cataract Refract Surg*. 1999;25(10):1327–1335.
10. Vega-Estrada A, Alió JL. Keratoconus progression after ICRS implantation. *Cornea*. 2013;32(5):611–616.
