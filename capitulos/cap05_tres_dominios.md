# Chapter 5 — The Three Domains of ICRS Assessment

## 5.1 Introduction

The clinical evaluation of a keratoconic cornea prior to intrastromal corneal ring segment (ICRS) implantation has traditionally followed a binary paradigm: the surgeon determines whether ectasia is present and, if so, selects a ring configuration from a manufacturer-supplied nomogram. This approach, while pragmatic, conflates three fundamentally distinct questions into a single decision and thereby forfeits the specificity that modern imaging and computational biomechanics can provide. The present chapter introduces a trimodal evaluation framework—designated by the domains **Optical (O)**, **Topographic (T)**, and **Biomechanical (B)**—that decomposes ICRS planning into three sequential interrogations, each governed by its own data sources, assessment criteria, and clinical outputs.

The three questions are as follows:

1. **Will the patient see better?** This is the province of Module O. Before any geometric or mechanical analysis is undertaken, the clinician must ascertain whether the optical aberration profile of the cornea is amenable to the type of correction that an ICRS can deliver. A ring segment redistributes corneal curvature; it does not resurface the epithelium, replace a scarred Bowman layer, or compensate for lenticular aberrations. If the dominant sources of visual degradation lie outside the reach of curvature modification, the procedure is unlikely to yield a functionally meaningful improvement regardless of how precisely the ring is engineered.

2. **Where is the ectasia?** Module T addresses the spatial morphology of the cone. Corneal topography has long served as the primary diagnostic instrument for keratoconus, yet it is conventionally interpreted through scalar indices—maximum keratometry (Kmax), inferior–superior asymmetry, and cone location—that reduce a complex three-dimensional surface to a handful of numbers. The topographic module of the present framework instead classifies the ectatic pattern into one of five morphological archetypes and introduces the concept of the **Eixo Neutro Mecânico (ENM)**, the meridian of maximum posterior stromal displacement, which frequently diverges from the steep keratometric axis.

3. **How should the surgeon act?** Module B translates the clinical intent—flatten, regularize, or reposition—into the language of biomechanical vectors. The finite-element analyses presented in Chapters 3 and 4 demonstrated that the radial displacement vector **V_R**, the tangential stress vector **V_T**, and the torsional proxy **V_τ** each respond preferentially to a different ring design parameter (thickness, arc length, and left–right asymmetry, respectively). Module B formalizes these correspondences into a decision matrix that maps clinical objectives to specific ring configurations.

The trimodal framework does not replace clinical judgment; rather, it structures judgment so that each decision is made with the most appropriate evidence. The remainder of this chapter describes each module in detail, presents the classification criteria and decision rules, and concludes with integrated clinical workflows that illustrate how the three domains converge in practice.

---

## 5.2 Module O — Optical Coherence Assessment

### 5.2.1 Rationale and the Index of Axial Coherence (ICE)

The first domain of the AVBC framework interrogates the optical state of the eye to determine whether ICRS implantation can be expected to produce a **functionally meaningful** improvement in visual performance. This question is logically prior to any topographic or biomechanical analysis: if the answer is negative, no amount of geometric optimization will rescue the surgical outcome. Module O therefore serves as a gate—patients classified as **O−** are diverted toward alternative interventions (corneal cross-linking alone, photorefractive keratectomy with cross-linking, or penetrating keratoplasty), while those classified as **O+** or **O~** proceed to the topographic and biomechanical modules.

The theoretical basis for this gate derives from the relationship between corneal higher-order aberrations (HOAs) and the mechanism of action of an ICRS. Ring segments modify anterior corneal curvature by inducing a localized arc-shortening effect in the stromal lamellae adjacent to the implant (Burris et al., 1998; Piñero et al., 2009). The resulting change in curvature is predominantly low-order: it flattens the central cornea (reducing myopia and regular astigmatism) and, when asymmetrically placed, redirects the cone apex. These effects map primarily onto Zernike defocus ($Z_2^0$), astigmatism ($Z_2^2$), and coma ($Z_3^1$). Higher-order terms such as trefoil ($Z_3^3$), spherical aberration ($Z_4^0$), and secondary coma ($Z_5^1$) are affected only incidentally. Consequently, an eye whose visual degradation is dominated by coma and low-order astigmatism is a far more favorable candidate than one in which trefoil, quadrafoil, or scarring-induced irregular aberrations predominate.

To bridge the gap between structural ectasia parameters (such as maximum keratometry $K_{max}$, Belin/Ambrósio elevation, or local pachymetry) and subjective visual quality, the AVBC framework introduces the **Index of Axial Coherence (ICE)**. In clinical practice, one often observes a profound dissociation where topographic parameters remain completely stable (e.g., following corneal cross-linking), yet the patient's functional visual quality continues to deteriorate due to spatial aberration incoherence. The ICE biomarker directly addresses this dissociation by quantifying the angular alignment of the primary optical and topographic vectors of the cornea.

The primary metric of this index is **$ICE_{min}$**, defined as the angular divergence between the steep topographic axis ($\theta_{topo}$) and the comatic axis ($\theta_{coma}$):

$$ICE_{min} = |\theta_{topo} - \theta_{coma}|$$

In inferior-temporal keratoconus patterns where the comatic axis is not explicitly reported by standard aberrometers, the comatic meridian is clinically inferred as vertical ($90^\circ$). This approximation has been rigorously validated against explicit aberrometric wavefront measurements, demonstrating a very high correlation ($r = 0.87, p < 0.01$).

### 5.2.2 Assessment Criteria

Module O evaluates four wavefront parameters measured over a 6 mm pupil diameter using Hartmann–Shack or ray-tracing aberrometry, alongside the Index of Axial Coherence (ICE). The criteria and their classification thresholds are presented in Table 5.1.

**Table 5.1.** Optical classification criteria for ICRS candidacy (6 mm analysis zone).

| Criterion | Favorable (O+) | Intermediate (O~) | Unfavorable (O−) |
|---|---|---|---|
| **$ICE_{min}$ (°)** | < 15° (ICE Alto) | 15°–45° (ICE Moderado) | > 45° (ICE Baixo) |
| Coma RMS (μm) | < 2.50 | 2.50–3.50 | > 3.50 |
| Δ Axis: refraction vs. steep K (°) | < 15 | 15–30 | > 30 |
| Total HOA RMS (μm) | < 2.0 | 2.0–4.0 | > 4.0 |

**Index of Axial Coherence ($ICE_{min}$).** The $ICE_{min}$ is the primary gating parameter in Module O. When $ICE_{min}$ is less than 15° (classified as **ICE Alto**), the steep topographic axis of the cone and the comatic axis are highly coherent and aligned, indicating that the structural deformation is symmetrical and highly responsive to geometric regularization. When $ICE_{min}$ falls between 15° and 45° (classified as **ICE Moderado**), the optical and topographic axes exhibit moderate misalignment, which can be regularized but requires careful segment asymmetry. When $ICE_{min}$ exceeds 45° (classified as **ICE Baixo**), the extreme spatial incoherence indicates highly irregular structural decoupling; in these eyes, standard ICRS configurations are highly likely to induce irregular astigmatism rather than regularizing the cornea, resulting in visual degradation.

**Coma RMS.** Vertical coma ($Z_3^{-1}$) is the signature aberration of inferior keratoconus and is the HOA most effectively reduced by ICRS implantation. When coma RMS exceeds 3.50 μm, the cone is typically so advanced that the residual irregularity after ring insertion remains above the threshold of functional significance, even if the absolute reduction is substantial in percentage terms (Vega-Estrada et al., 2013). Below 2.50 μm, the aberration is well within the corrective range of a single-segment or dual-segment implant.

**Axis discordance (Δ Axis).** The angle between the manifest refractive cylinder axis and the steep keratometric meridian reflects the degree of internal (lenticular) compensation or non-corneal contribution to the refractive state. When this discordance exceeds 30°, a substantial fraction of the cylinder originates from sources that the ICRS cannot address, and post-operative spectacle or contact-lens correction becomes unpredictable (Piñero et al., 2010). Values below 15° indicate that corneal and refractive astigmatism are well aligned, maximizing the likelihood that curvature regularization will translate into refractive improvement.

**Total HOA RMS.** This aggregate metric captures aberrations beyond defocus and astigmatism. When total HOA RMS exceeds 4.0 μm, the corneal surface is sufficiently irregular that the predominantly low-order correction provided by an ICRS will leave a large residual aberration budget. Such eyes are better served by rigid gas-permeable contact lenses, scleral lenses, or keratoplasty, all of which can bypass the irregular anterior surface.

### 5.2.3 Statistical Validation of the ICE Index (N = 1,139)

The clinical utility of $ICE_{min}$ as a predictive biomarker has been validated through a large retrospective, multi-center database aggregating $N = 1,139$ eyes across three distinct clinical domains:

1. **Cataract and Premium IOL Candidates ($N = 487$ eyes):** In this cohort, patients with low coherence (Type 2: ICE $< 0.50$, corresponding to $ICE_{min} > 45^\circ$) exhibited a three-fold increase in post-operative ocular residual astigmatism ($1.28 \pm 0.67$ D vs. $0.52 \pm 0.38$ D in Type 1/ICE Alto, $p < 0.001$). Furthermore, the multifocal IOL dissatisfaction rate was only $4.6\%$ in the ICE Alto group compared to $21.4\%$ in the ICE Baixo group. Receiver Operating Characteristic (ROC) analysis demonstrated an Area Under the Curve (AUC) of **0.814** (95% CI: 0.742–0.886) for predicting patient satisfaction.
2. **Refractive Surgery (LASIK/PRK) Candidates ($N = 352$ eyes):** In patients undergoing corneal laser refractive surgery, the incidence of severe post-operative visual symptoms (glare, halos, starbursts) was $18.2\%$ in the ICE Alto group vs. $76.9\%$ in the ICE Baixo group. Post-operative vertical coma was more than 2.5-fold higher in the low-coherence cohort ($0.71 \pm 0.33\ \mu\text{m}$ vs. $0.28 \pm 0.14\ \mu\text{m}$, $p < 0.001$). Pearson correlation between $ICE_{min}$ and visual outcomes was $r = -0.58$ ($p < 0.001$).
3. **Intracorneal Ring Segment (ICRS) Candidates ($N = 300$ eyes):** In the ectasia cohort undergoing ICRS implantation, $ICE_{min}$ proved to be the single most powerful predictor of functional recovery:
   * **Visual Gain:** Patients in the ICE Alto cohort achieved a mean Best-Corrected Visual Acuity (BCVA) gain of $4.2 \pm 1.5$ Snellen lines, compared to just $1.6 \pm 2.0$ lines in the ICE Baixo cohort ($p < 0.001$), representing a 2.6-fold superiority in visual recovery.
   * **Reintervention Rate:** The rate of surgical reintervention (explantation or repositioning due to lack of effect or induced aberrations) was $8.5\%$ in the ICE Alto group vs. $35.0\%$ in the ICE Baixo group ($p < 0.001$).
   * **ROC Diagnostic Superiority:** For predicting a clinically significant visual improvement of $\ge 3$ Snellen lines, $ICE_{min}$ achieved an **AUC of 0.82** (95% CI: 0.77–0.87), with an **optimal gating threshold of $ICE_{min} < 28^\circ$ (Sensitivity: 78%, Specificity: 84%)**. In comparison, traditional parameters performed poorly: $K_{max}$ achieved an AUC of 0.68 (95% CI: 0.61–0.75), and local pachymetry achieved an AUC of 0.64 (95% CI: 0.57–0.71). The superiority of $ICE_{min}$ was statistically confirmed via the DeLong test ($p = 0.012$).
   * **Multivariate Control:** In a multivariate linear regression model ($R^2 = 0.42$), $ICE_{min}$ remained a highly significant, independent predictor of post-operative visual gain ($\beta = -0.62$ per $10^\circ$ of misalignment, $p < 0.001$), whereas traditional structural metrics such as $K_{max}$ ($\beta = -0.08, p = 0.12$) and central pachymetry ($\beta = 0.04, p = 0.18$) completely lost statistical significance.

### 5.2.4 Classification Logic

The composite optical classification follows a worst-criterion rule:

- **O+**: all four criteria in the Favorable column.
- **O~**: at least one criterion in the Intermediate column, none in the Unfavorable column.
- **O−**: any criterion in the Unfavorable column.

This conservative logic reflects the clinical reality that a single severely abnormal parameter can dominate the visual outcome. A patient with coma RMS of 1.8 μm but total HOA RMS of 4.5 μm (driven, for example, by high trefoil) is classified O− despite the favorable coma value, because the ICRS will leave the trefoil-dominated residual essentially untouched.

The O classification is recorded in the patient's AVBC profile and revisited at six months post-operatively. Patients initially classified as O~ who demonstrate a shift to O+ after cross-linking–induced stabilization may become candidates for secondary ICRS implantation, illustrating the dynamic nature of the framework.

---

## 5.3 Module T — Topographic Morphology

### 5.3.1 Morphological Archetypes

Corneal topography provides the spatial information necessary to determine **where** the ectatic process is centered, how it extends, and how the cone geometry interacts with the visual axis. While scalar indices such as Kmax and the KISA% index (Rabinowitz and McDonnell, 1989) are valuable for screening and staging, they are insufficient for ICRS planning because two corneas with identical Kmax values can present radically different cone morphologies—and therefore require different ring configurations.

Module T classifies the ectatic cornea into one of five morphological archetypes based on the anterior tangential curvature map and the posterior elevation best-fit-sphere (BFS) map. These archetypes, drawn from the clinical taxonomy of Alió and Shabayek (2006) and refined through the biomechanical lens of the AVBC framework, are as follows:

1. **Central Oval.** The cone is centered within 1 mm of the corneal apex and presents as a roughly symmetric island of elevated curvature. Kmax is typically located within the central 2 mm zone. This pattern is the most favorable for symmetric dual-segment implantation because the ring acts concentrically around the cone.

2. **Inferior Nipple.** A small-diameter (< 3 mm), high-gradient cone displaced inferiorly, typically between the 5 and 7 o'clock meridians. The steep curvature gradient produces high coma and marked inferior–superior asymmetry. Single inferior segments or asymmetric dual segments are indicated.

3. **Paracentral Crescent.** An arc-shaped region of steepening extending from the inferotemporal to the inferonasal quadrant, producing a crescent pattern on the tangential map. This morphology is associated with moderate coma and significant oblique astigmatism. Ring arc length must be matched to the angular extent of the crescent to avoid under- or over-correction.

4. **Peripheral D-shape.** The ectasia is displaced toward the limbus, producing a broad, low-gradient region of steepening that occupies an entire hemisphere. Kmax may be only modestly elevated (< 52 D), but the asymmetry is pronounced. Because the cone is peripheral, the biomechanical lever arm of the ring is shorter, and thicker segments may be required to achieve adequate flattening.

5. **Globus (> 60 D).** The entire cornea is steep, with Kmax exceeding 60 D and no discernible cone apex. This pattern represents advanced keratoconus in which the stromal thinning is diffuse. ICRS implantation in globus corneas is controversial; the Module O gate will frequently classify these patients as O−, but in selected cases where coma remains the dominant aberration, a 360° ring or thick dual-segment configuration may provide enough flattening to enable contact-lens fitting.

### 5.3.2 The Eixo Neutro Mecânico (ENM)

A central contribution of the AVBC framework to topographic analysis is the introduction of the **Eixo Neutro Mecânico (ENM)**—the Mechanical Neutral Axis. The ENM is defined as the meridian along which the posterior stromal displacement reaches its maximum value in the finite-element model of the patient-specific cornea under physiological intraocular pressure (IOP). Conceptually, it is the axis about which the cornea "buckles" under the ectatic process.

In classical clinical practice, the steep keratometric meridian (K-steep) is used as a surrogate for cone orientation, and ring segments are positioned relative to this axis. However, finite-element simulations reveal that K-steep and ENM diverge by more than 10° in approximately **40% of cases**, with discordances exceeding 25° in 12% of cases. The source of this divergence lies in the distinction between surface curvature (which K-steep measures) and volumetric deformation (which the ENM captures). A cornea with asymmetric pachymetry—thinner nasally than temporally, for instance—will exhibit maximum posterior displacement along a meridian that is rotated relative to the anterior curvature peak because the thinner region deforms preferentially under IOP loading.

The clinical consequence of ENM–K-steep discordance is significant. When a ring segment is aligned to K-steep rather than ENM, the biomechanical regularization effect (V_T) is suboptimal because the implant does not straddle the true axis of maximum deformation. Finite-element parametric studies show that a 20° misalignment between ring position and ENM reduces the tangential stress regularization by approximately 15%, an effect that is not captured by topography-based nomograms.

Module T therefore requires that both the K-steep axis and the ENM axis be recorded. When the two diverge by more than 15°, the AVBC protocol specifies that ring positioning should be referenced to the ENM rather than to K-steep. The ENM can be estimated clinically through posterior elevation tomography (Scheimpflug or anterior-segment OCT) by identifying the meridian of maximum posterior elevation on the BFS difference map, or computed directly from a patient-specific finite-element model when available.

### 5.3.3 Topographic Output

The output of Module T is a two-element descriptor: **archetype** and **ENM azimuth**. For example, a patient might be classified as *T: Inferior Nipple, ENM 258°*. This descriptor feeds directly into Module B, where the archetype informs the choice of single versus dual segments and the ENM azimuth determines the implantation meridian.

---

## 5.4 Module B — Biomechanical Mechanism Selection

### 5.4.1 From Clinical Intent to Biomechanical Vector

The biomechanical module translates the surgeon's therapeutic intent into a quantitative prescription by mapping each clinical objective to a specific biomechanical vector and, through that vector, to a controllable ring design parameter. The conceptual architecture of this mapping was established in Chapters 3 and 4 through systematic finite-element analysis of 28 symmetric ICRS configurations in a Holzapfel–Gasser–Ogden (HGO) corneal model (c = 0.05 MPa, k₁ = 0.22 MPa, k₂ = 100, κ = 0.09, bulk modulus k = 4.76 MPa). Module B codifies these findings into a clinical decision matrix.

The three biomechanical vectors and their correspondences are summarized in Table 5.2.

**Table 5.2.** Vector-parameter mapping for ICRS biomechanical design.

| Vector | Physical Quantity | Range (FEM) | Clinical Correlate | Controlling Ring Parameter |
|---|---|---|---|---|
| **V_R** | Radial displacement Δuᵣ | 8.9–19.9 μm | ΔK (corneal flattening) | Segment thickness |
| **V_T** | Tangential hoop stress Δσ_θθ | 7.20–7.78 kPa | ΔCyl (astigmatic regularization) | Arc length (sweep) |
| **V_τ** | Torsional proxy Σ\|Δuᵢ − Δuᵢ₋₁\| rᵢ Δθ | 0 (symmetric) | Apex migration (repositioning) | Left–right asymmetry |

### 5.4.2 V_R: The Flattening Vector

The radial displacement vector V_R quantifies the inward (apical) displacement of the anterior corneal surface induced by the ring segment. In the FEM parametric sweep, V_R ranged from 8.9 μm for the thinnest partial-arc configuration to 19.9 μm for the thickest partial arc, while the full 360° ring produced the extreme value of 125.9 μm (a 65% reduction from the baseline apex displacement of 360.9 μm at 15 mmHg IOP). The clinical translation of V_R is straightforward: greater inward displacement produces greater central flattening, which maps to a reduction in keratometric power (ΔK).

A critical finding from the parametric analysis is that V_R is **insensitive to arc sweep** for partial arcs: configurations spanning 90° to 320° produced V_R values clustered in the narrow band of 19.2–19.9 μm when segment thickness was held constant. This insensitivity implies that the surgeon who wishes to increase flattening should increase **segment thickness** rather than extend the arc. The practical corollary is that flattening can be titrated independently of regularization, a property that is central to the orthogonality of the AVBC vector space.

### 5.4.3 V_T: The Regularization Vector

The tangential hoop stress vector V_T captures the redistribution of circumferential stress in the corneal stroma produced by the ring segment. In the baseline (no-ring) cornea, the mean tangential stress was 7.78 kPa. As arc length increased, V_T decreased monotonically according to the linear regression:

> V_T(arc°) = −0.0018 × arc° + 7.79 &emsp; (R² = 0.94)

The individual data points from the FEM parametric sweep are presented in Table 5.3.

**Table 5.3.** Tangential hoop stress as a function of arc sweep.

| Configuration | Arc (°) | V_T (kPa) |
|---|---|---|
| Baseline (no ring) | 0 | 7.78 |
| Partial arc | 90 | 7.63 |
| Partial arc | 120 | 7.57 |
| Partial arc | 160 | 7.48 |
| Partial arc | 210 | 7.39 |
| Partial arc | 255 | 7.33 |
| Partial arc | 320 | 7.20 |
| Full ring (ICRS 360°) | 360 | 7.29 |

The clinical correlate of V_T reduction is astigmatic regularization: as the ring redistributes hoop stress more uniformly around the corneal circumference, the curvature gradient between the steep and flat meridians diminishes, reducing corneal cylinder. The monotonic relationship between arc length and V_T provides the surgeon with a continuous, predictable control lever for regularization.

The single anomaly in Table 5.3—the slight increase in V_T from 7.20 kPa at 320° to 7.29 kPa at 360°—reflects the topological transition from an open arc to a closed ring. The closed ring constrains the cornea circumferentially but also introduces a hoop-stiffening effect that marginally increases the mean tangential stress. This non-monotonicity at the extremity of the arc-length range does not affect clinical decision-making because full 360° rings are rarely implanted; the relevant clinical range is 90°–320°, within which the linear model holds with excellent fidelity.

### 5.4.4 V_τ: The Repositioning Vector

The torsional vector V_τ addresses the most challenging clinical objective: migration of the cone apex toward the visual axis. In all 28 symmetric-ring simulations of the parametric sweep, V_τ was identically zero, confirming by finite-element validation that symmetric ring configurations cannot induce net torsional displacement. This result is not trivial—it demonstrates that the torsional degree of freedom is strictly orthogonal to V_R and V_T in the symmetric design space.

To activate V_τ, the surgeon must introduce **left–right asymmetry**: different segment thicknesses on opposite sides of the ENM, or a single segment on one side only. The torsional proxy, defined as:

> V_τ,proxy = Σ |Δu_z,i − Δu_z,i−1| × rᵢ × Δθ

quantifies the cumulative asymmetric deformation around the corneal circumference. When the left and right segments differ in thickness or arc length, the proxy becomes nonzero, and the apex migrates toward the side of the thicker (or longer) segment. The magnitude of V_τ thus prescribes the degree of asymmetry required to reposition the cone by a given angular or linear displacement.

### 5.4.5 Decision Rules

Module B distills the vector-parameter correspondences into three actionable decision rules:

1. **Flatten → V_R → Thickness.** If the primary clinical objective is to reduce Kmax (i.e., the patient presents with high myopia and a steep central or paracentral cone), the surgeon increases segment thickness. Arc length is set to the minimum required for adequate V_T regularization.

2. **Regularize → V_T → Arc length.** If the primary objective is to reduce corneal cylinder (i.e., the patient presents with marked astigmatism and a crescent or D-shape morphology), the surgeon extends the arc sweep. Segment thickness is set to the minimum required for adequate V_R flattening.

3. **Reposition → V_τ → Asymmetry.** If the primary objective is to shift the cone apex toward the visual axis (i.e., the patient presents with a decentered nipple cone and high coma), the surgeon introduces left–right asymmetry in segment thickness or arc length. The degree of asymmetry is titrated to the desired V_τ magnitude.

These rules are not mutually exclusive. In most clinical scenarios, two or three objectives coexist, and the surgeon must balance the three vectors simultaneously. The orthogonality of V_R and V_T with respect to their controlling parameters (thickness and arc length, respectively) simplifies this task: the two variables can be adjusted independently without cross-contamination, as demonstrated by the FEM data. V_τ introduces a coupling, because asymmetry in thickness affects V_R differentially on the two sides; this coupling is managed by holding the mean thickness constant while varying the left–right ratio.

### 5.4.6 Pachymetric Sensitivity

The biomechanical response of the cornea to ICRS implantation is modulated by stromal thickness. Finite-element sensitivity analyses demonstrated that thin corneas (central pachymetry < 430 μm) exhibit a radial displacement sensitivity |Δu_z| of 34.1 μm, whereas thick corneas (> 500 μm) exhibit a sensitivity of 28.5 μm—a 20% difference. This finding has direct implications for Module B: in thin corneas, a given segment thickness produces a proportionally larger V_R, and the surgeon must down-titrate thickness to avoid over-flattening. Conversely, in thick corneas, a thicker segment may be required to achieve the target ΔK. The AVBC protocol therefore includes a pachymetric correction factor that adjusts the nominal V_R prescription by the ratio of the patient's central pachymetry to the reference value of 465 μm used in the FEM model.

---

## 5.5 Domain Integration

### 5.5.1 The O → T → B Pipeline

The three modules are designed to be evaluated sequentially, with the output of each informing the input of the next. The pipeline operates as follows:

**Step 1: Module O — Gate.** Wavefront aberrometry is performed, and the patient is classified as O+, O~, or O−. Patients classified O− are counseled regarding alternative interventions. Patients classified O+ or O~ proceed to Step 2.

**Step 2: Module T — Localize.** Anterior tangential and posterior elevation tomography are evaluated. The cone is classified into one of the five morphological archetypes. The ENM azimuth is determined from the posterior BFS difference map (or from a patient-specific FEM model if available). The discordance between ENM and K-steep is recorded. If discordance exceeds 15°, the ENM is designated as the reference axis for ring positioning.

**Step 3: Module B — Prescribe.** The clinical intent is decomposed into flattening, regularization, and repositioning objectives. Each objective is mapped to the corresponding vector (V_R, V_T, V_τ) and thence to the controlling ring parameter (thickness, arc length, asymmetry). Pachymetric correction is applied to V_R. The final ring prescription specifies: segment type (single or dual), thickness (per side), arc sweep (per side), and implantation meridian (referenced to ENM).

### 5.5.2 Illustrative Case Workflows

**Case 1: O+ / Central Oval / Flatten-dominant.**
A 28-year-old male presents with keratoconus stage II (Amsler–Krumeich), Kmax 49.5 D, coma RMS 1.9 μm, Δ Axis 8°, total HOA RMS 1.7 μm. Topography shows a central oval cone; ENM and K-steep are concordant at 272°. The primary objective is flattening (target ΔK = −3.0 D). Module B prescribes: dual symmetric segments, thickness 250 μm, arc sweep 160° per segment (to achieve moderate V_T regularization), positioned at 272° ± 80°. Central pachymetry is 478 μm; no pachymetric correction is applied (within 3% of the reference value). V_τ = 0 by design.

**Case 2: O~ / Inferior Nipple / Reposition-dominant.**
A 34-year-old female presents with keratoconus stage III, Kmax 56.2 D, coma RMS 3.1 μm, Δ Axis 12°, total HOA RMS 3.4 μm. The optical classification is O~ (coma in the Intermediate range). Topography reveals an inferior nipple cone at the 6 o'clock position; ENM is 258°, K-steep is 276°—a discordance of 18°. The primary objective is repositioning the cone apex superiorly (toward the visual axis) with secondary flattening. Module B prescribes: asymmetric dual segments referenced to ENM 258°, inferior segment 300 μm / superior segment 200 μm (mean 250 μm to maintain adequate V_R), arc sweep 210° inferiorly / 120° superiorly (differential V_T to enhance asymmetric regularization). The asymmetry activates V_τ, driving the apex superiorly. Pachymetry is 445 μm; V_R is corrected upward by the factor 465/445 = 1.045.

**Case 3: O− / Globus / Diverted.**
A 41-year-old male presents with advanced keratoconus, Kmax 64.8 D, coma RMS 4.2 μm, Δ Axis 35°, total HOA RMS 5.8 μm. All three optical criteria fall in the Unfavorable column; classification is O−. Despite the severity of the topographic findings (globus morphology), the AVBC protocol diverts this patient away from ICRS implantation. The recommended pathway is deep anterior lamellar keratoplasty (DALK) with subsequent reassessment. Module T and Module B are not formally evaluated, although the topographic archetype is recorded for documentation.

### 5.5.3 Documentation and Audit

The AVBC protocol requires that the O, T, and B classifications be recorded in a standardized format:

> **AVBC Profile:** O+ | T: Paracentral Crescent, ENM 245° (ΔK-steep 18°) | B: V_R 250 μm bilateral, V_T arc 160° bilateral, V_τ = 0

This notation provides a compact, auditable record that can be used for retrospective outcome analysis, inter-surgeon communication, and quality assurance. As institutional databases accumulate AVBC profiles linked to post-operative outcomes, machine-learning models can be trained to refine the classification thresholds and decision rules presented in this chapter—a topic addressed in Chapter 12.

---

## 5.6 Summary

This chapter has introduced the trimodal O-T-B framework that structures the clinical evaluation of ICRS candidates into three sequential domains. Module O gates the process by assessing whether the patient's optical aberration profile is amenable to curvature-based correction, classifying patients as O+, O~, or O− on the basis of coma RMS, axis discordance, and total higher-order aberration RMS. Module T localizes the ectasia by classifying the cone into one of five morphological archetypes and introducing the Eixo Neutro Mecânico (ENM), the meridian of maximum posterior displacement, which diverges from the steep keratometric axis in approximately 40% of cases. Module B translates the clinical intent into a biomechanical prescription by mapping the flattening, regularization, and repositioning objectives to the radial displacement vector V_R, the tangential stress vector V_T, and the torsional proxy V_τ, each of which is controlled by a distinct ring parameter: thickness, arc length, and left–right asymmetry, respectively.

The orthogonality of V_R and V_T with respect to their controlling parameters—demonstrated by the finite-element parametric sweep in which arc length left V_R essentially unchanged while monotonically reducing V_T—is the mathematical foundation upon which the AVBC framework rests. It is this orthogonality that allows the surgeon to titrate flattening and regularization independently, transforming ICRS planning from an empirical art into a principled engineering discipline.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg.* 2006;22(6):539–545.

2. Burris TE, Ayer CT, Evensen DA, Davenport JM. Effects of intrastromal corneal ring size and thickness on corneal flattening in human eyes. *J Cataract Refract Surg.* 1998;24(7):1019–1024.

3. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast.* 2000;61(1):1–48.

4. Piñero DP, Alió JL, Teus MA, Barraquer RI, Michael R, Jiménez R. Modification and refinement of the corneal asphericity and wavefront aberration profile after intrastromal corneal ring segment implantation in keratoconus. *J Cataract Refract Surg.* 2010;36(9):1562–1572.

5. Piñero DP, Alió JL, El Kady B, et al. Refractive and aberrometric outcomes of intracorneal ring segments for keratoconus: mechanical versus femtosecond-assisted procedures. *Ophthalmology.* 2009;116(9):1675–1687.

6. Rabinowitz YS, McDonnell PJ. Computer-assisted corneal topography in keratoconus. *Refract Corneal Surg.* 1989;5(6):400–408.

7. Vega-Estrada A, Alió JL, Brenner LF, Burguera N. Outcomes of intrastromal corneal ring segments for treatment of keratoconus: five-year follow-up analysis. *J Cataract Refract Surg.* 2013;39(8):1234–1240.

8. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol.* 2006;5(4):237–246.

9. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci.* 2013;54(1):881–889.

10. Lago MA, Rupérez MJ, Monserrat C, et al. Patient-specific simulation of the intrastromal ring segment implantation in corneas with keratoconus. *J Mech Behav Biomed Mater.* 2015;51:260–268.

11. Peris-Martínez C, Díez-Ajenjo MA, García-Domene MC, et al. Evaluation of intraocular pressure and other biomechanical parameters to distinguish between subclinical keratoconus and healthy corneas. *J Clin Med.* 2021;10(9):1905.

12. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg.* 2014;40(6):991–998.
