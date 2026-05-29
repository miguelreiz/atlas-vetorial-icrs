<!-- GPT revision applied -->
# Chapter 8 — The Alpins Method: A Model for Surgical Planning Languages

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part II — Theoretical Foundations*

---

> **Key Points**
> - The Alpins Method established the **planned-versus-induced** paradigm for astigmatism surgery.
> - AVBC inherits from Alpins: universality, objectivity, comparability, and feedback loop closure.
> - Fundamental difference: Alpins operates in 2D (astigmatism); AVBC operates in **3D** (VR + VT + Vτ).
> - The Alpins Correction Index (CI) directly inspires the AVBC indices CI_R, VT-ratio, and Vτ-ratio.
> - AVBC advances from retrospective analysis to **prospective planning** based on FEM.

## 8.1 Introduction

Surgical correction of astigmatism has long represented a quantitative challenge distinct from that of spherical refractive error. While the magnitude of a spherical correction can be described by a single scalar — diopters of myopia or hyperopia — astigmatism introduces directionality: both the magnitude and meridional orientation of the cylinder must be specified, planned, and evaluated postoperatively. Before the early 1990s, analysis of astigmatism surgery outcomes was largely empirical. Surgeons reported pre- and postoperative cylinder values, occasionally computing simple arithmetic differences, but no standardized framework existed for decomposing what had been *planned*, what had been *achieved*, and what remained as *residual error*. Different investigators used incompatible metrics, rendering cross-study comparisons unreliable and meta-analytic synthesis nearly impossible (Alpins, 1993; Koch, 1997).

> [!NOTE]
> **For the Clinician: Why Study Alpins if I'm an ICRS Surgeon?**
> The Alpins method is not a historical footnote of astigmatism surgery. It is a *mental model* for structuring surgical reasoning. AVBC applies exactly the same logic — comparing what we planned (predicted VR, VT, Vτ) with what we obtained (postoperative measurements) — to close the learning loop. Before reading about AVBC, understanding Alpins is essential.

In 1993, Noel Alpins published a landmark paper in the *Journal of Cataract and Refractive Surgery* that fundamentally restructured the field. His contribution was not a new surgical technique, but rather a new *language* — a rigorous vector-based framework that decomposed astigmatic outcomes into three fundamental vectors: the Target Induced Astigmatism vector (TIA), the Surgically Induced Astigmatism vector (SIA), and the Difference Vector (DV). From these primitives, Alpins derived a family of dimensionless indices — the Correction Index (CI), the Index of Success (IOS), the Flattening Index (FI), and the Torque Error (TE) — that provided surgeons with immediate, objective, and universally comparable feedback on their surgical performance (Alpins, 1993; Alpins, 2001).

The impact of the Alpins method was transformative. Within a decade of its introduction, the framework became the *de facto* standard for reporting astigmatism surgery outcomes in peer-reviewed journals and was endorsed by the *Journal of Refractive Surgery* as a recommended analysis protocol (Reinstein et al., 2014). The method succeeded not because of its mathematical complexity — the underlying algebra is elementary vector subtraction in double-angle space — but because it provided a *complete, closed, and reproducible* descriptive system: every operation could be fully characterized by a small set of standardized quantities, and each surgeon's results could be compared on equal terms.

The field of intrastromal corneal ring segment (ICRS) planning finds itself today in a position strikingly analogous to that of astigmatism surgery in 1990. ICRS implantation is guided by nomograms, empirical rules, and accumulated clinical experience, but no standardized biomechanical language exists for planning the intervention, predicting its corneal effects, or evaluating its outcomes against a quantitative benchmark. This chapter reviews the Alpins method in detail, extracts the structural principles that explain its success, identifies its limitations when extended to the multidimensional biomechanics of ICRS, and establishes the conceptual foundation upon which the Corneal Biomechanical Vector Analysis (AVBC) is built.

---

## 8.2 The Alpins Vector Analysis

### 8.2.1 The Double-Angle Representation

The mathematical basis of the Alpins method rests on a critical insight: astigmatism is a *diametrically symmetric* optical quantity. A cylinder oriented at 90° produces the same optical effect as one oriented at 270°; meridians separated by 180° are physically identical. Standard Cartesian coordinates cannot accommodate this symmetry without ambiguity. Alpins adopted the well-established technique of representing each astigmatism value in *double-angle space* (2θ), where the cylinder axis α is mapped to 2α before vector decomposition. In this space, orthogonal astigmatisms (e.g., with-the-rule at 90° and against-the-rule at 180°) appear as diametrically opposed vectors, and vector arithmetic proceeds without discontinuity at the 0°/180° boundary (Alpins, 1993; Thibos et al., 1997).

Formally, a cylinder of magnitude *C* at axis α is represented as a vector in double-angle space:

**A** = *C* (cos 2α, sin 2α)

Addition and subtraction of astigmatism vectors are performed in this 2θ representation, and the resultant is converted back to standard clinical notation by halving the resultant vector's angle.

### 8.2.2 The Three Fundamental Vectors

The entire Alpins framework is built on three vectors:

1. **Target Induced Astigmatism (TIA):** The astigmatic change the surgeon *intends* to produce. TIA is calculated as the vector difference (in double-angle space) between the preoperative astigmatism and the planned (target) postoperative astigmatism. When the surgical goal is complete correction, the TIA vector equals the preoperative astigmatism vector. When partial correction is planned (as is common with toric IOLs or arcuate keratotomies), the TIA reflects only the intended change.

2. **Surgically Induced Astigmatism (SIA):** The astigmatic change the surgery *actually produced*. SIA is calculated as the vector difference between the preoperative astigmatism and the measured postoperative astigmatism. The SIA captures the net effect of the intervention on corneal or refractive cylinder, regardless of the surgical plan.

3. **Difference Vector (DV):** The vector that would be required to move from the achieved postoperative state to the planned (target) state. The DV is defined as:

 **DV** = **TIA** − **SIA**

 A perfect surgical result yields DV = **0**. A nonzero DV quantifies the magnitude and direction of the residual error.

> [!TIP]
> **For the Clinician: The GPS Analogy**
> Think of TIA as the destination you entered in the GPS, SIA as where the car actually arrived, and DV as the recalculation distance. The Correction Index (CI) is simply: how much of the trip was completed (SIA/TIA)? A CI of 0.85 means you arrived 85% of the way. You need 15% more treatment next time.

These three vectors form a closed triangle in double-angle space: TIA = SIA + DV. This closure property is fundamental; it ensures that the analysis is internally consistent and that no component of the surgical outcome is left unaccounted for.

![Figure 3.1 — Alpins vector triangle: TIA, SIA, and DV in double-angle space.](book_figures/fig_03_01_alpins_triangulo.svg)

### 8.2.3 The Derived Indices

From the three fundamental vectors, Alpins derived a family of scalar indices providing dimensionless, immediately interpretable measures of surgical performance (Alpins, 2001; Alpins & Goggin, 2004):

| Index | Definition | Interpretation | Ideal Value |
|---|---|---|---|
| **Correction Index (CI)** | CI = │SIA│ / │TIA│ | Ratio of achieved to intended magnitude | 1.0 |
| **Index of Success (IOS)** | IOS = │DV│ / │TIA│ | Relative residual error | 0.0 |
| **Magnitude of Error (ME)** | ME = │SIA│ − │TIA│ | Absolute over- or undercorrection (diopters) | 0.0 |
| **Angle of Error (AE)** | AE = (SIA axis) − (TIA axis) | Rotational misalignment (degrees) | 0° |
| **Flattening Index (FI)** | FI = SIA cos(AE) / │TIA│ | Proportion of SIA along planned meridian | 1.0 |
| **Torque Error (TE)** | TE = │SIA│ sin(AE) | Component of SIA perpendicular to TIA | 0.0 |

**Table 3.1.** Summary of Alpins vector analysis indices. CI > 1.0 indicates overcorrection; CI < 1.0 indicates undercorrection. IOS = 0 represents perfect correction. The Flattening Index and Torque Error decompose SIA into components parallel and perpendicular to the planned treatment meridian, respectively.

The Correction Index serves as the primary measure of surgical accuracy. A CI of 1.0 indicates that the magnitude of the achieved correction exactly matched the planned correction; values below 1.0 indicate undercorrection and values above 1.0 indicate overcorrection. The Index of Success normalizes the residual error by the magnitude of the intended treatment, allowing comparison across patients with different degrees of preoperative astigmatism.

The Flattening Index and Torque Error provide a particularly elegant decomposition. The Flattening Index captures the *useful* component of the surgically induced change — the portion acting along the planned treatment meridian — while the Torque Error captures the *parasitic* component that rotates the cylinder axis without reducing its magnitude. A high Torque Error is clinically undesirable: it represents wasted surgical effect that changes the astigmatic orientation instead of reducing it.

### 8.2.4 Graphical Representations

Alpins also introduced standardized graphical representations that have become ubiquitous in the refractive surgery literature. The *single-angle polar plot* displays the TIA and SIA as vectors originating from the origin, with the DV connecting the tip of the SIA to the tip of the TIA. The *double-angle vector diagram* displays the same information in the 2θ space in which the arithmetic is performed. Scatter plots of SIA endpoints can be superimposed on concentric target rings to provide a visual overview of surgical accuracy and precision across a cohort (Alpins & Goggin, 2004; Reinstein et al., 2014).

---

## 8.3 Why the Alpins Method Works

The success of the Alpins method is not attributable to mathematical novelty — double-angle vector representations of astigmatism were described by Naeser (1990) and Thibos et al. (1997), among others. Instead, the method succeeded because it satisfied four structural requirements that any effective surgical planning language must meet.

**Universality.** The Alpins framework applies identically to all forms of astigmatism surgery: limbal relaxing incisions, arcuate keratotomy, toric IOLs, corneal crosslinking, and excimer laser ablation. Because the analysis operates on pre- and postoperative refraction data — quantities measured at every ophthalmologic examination — it requires no specialized instrumentation beyond standard clinical care. This universality enabled immediate and widespread adoption.

**Objectivity.** Alpins indices are derived from measured data through explicit mathematical definitions. Two independent analysts examining the same pre- and postoperative refractions will calculate identical TIA, SIA, DV, and CI values. There is no subjective element, grading scale, or threshold requiring calibration according to the analyst's judgment. This objectivity eliminated the "apples versus oranges" problem that plagued previous astigmatism outcome reports, where different authors used different and often incompatible metrics.

**Comparability.** Because the indices are dimensionless ratios (CI, IOS, FI) or carry standard physical units (ME in diopters, AE in degrees), results can be compared directly across surgeons, techniques, patient populations, and time periods. The Correction Index from a femtosecond laser arcuate keratotomy series in São Paulo can be compared, without conversion or rescaling, to the Correction Index from a manual limbal relaxing incision series in Melbourne. This comparability was the engine of evidence-based refinement: surgeons could identify systematic undercorrection (CI < 1.0) or overcorrection (CI > 1.0) in their own practice and adjust their nomograms accordingly.

**Feedback loop closure.** Perhaps the most underappreciated aspect of the Alpins method is that it closes the surgical feedback loop. The Correction Index tells the surgeon not just whether the outcome was good or bad, but by *how much* and in *which direction* the surgical effect deviated from plan. A CI of 0.85 indicates that the surgeon should increase treatment by approximately 15%; an Angle of Error of +5° indicates that the surgeon should rotate the treatment axis 5° counterclockwise. This quantitative, directional feedback is the essential ingredient for iterative nomogram refinement — a process that has driven continuous improvement in astigmatism surgery outcomes over three decades (Alpins, 2001; Piñero, 2014).

The broader lesson for any surgical planning language is clear: *nomenclature* plus *quantitative metrics* equals *reproducible science*. The Alpins method did not make astigmatism surgery easier; it made astigmatism surgery *measurable*, and measurability is the precondition for systematic improvement.

---

## 8.4 Limitations of the Alpins Method for ICRS Planning

Despite its elegance and clinical utility, the Alpins vector analysis was designed for a specific problem — the characterization of astigmatic change — and its mathematical structure reflects the constraints of that problem. Several fundamental features of ICRS biomechanics place the Alpins framework outside its domain of applicability.

### 8.4.1 Dimensionality

The Alpins method operates in ℝ², the two-dimensional space of double-angle astigmatism vectors. Each vector has two degrees of freedom: magnitude and axis (or, equivalently, the Cartesian components *C* cos 2α and *C* sin 2α). The biomechanical state of a cornea after ICRS implantation, however, is inherently multidimensional. As developed in Chapter 2, AVBC decomposes the corneal response into three orthogonal vector components — the radial displacement vector **V**_R, the tangential stress vector **V**_T, and the asymmetric torque vector **V**_τ — each of which can vary independently as a function of arc sweep, ring depth, and patient-specific pachymetry. The Alpins framework provides no mechanism for representing or analyzing this multidimensional biomechanical state space.

### 8.4.2 The Double-Angle Assumption

The double-angle representation is essential for astigmatism because the physical quantity being analyzed (cylindrical power and axis) has a 180° periodicity. ICRS segments do not, in general, possess this symmetry. A 120° arc implanted superiorly produces a biomechanically distinct corneal state from the same arc implanted inferiorly, even though the arc subtends the same angle. The relevant coordinate system for ICRS is the full 360° circumferential space of the cornea, not the 180° double-angle space of astigmatism. Any attempt to force ICRS biomechanical data into a 2θ representation would introduce artificial periodicities with no physical basis.

### 8.4.3 Linear Subtraction

The Alpins DV is calculated by straightforward vector subtraction: DV = TIA − SIA. This linearity is valid for astigmatism because the relationship between surgical incisions and induced cylinder change is approximately linear in the clinically relevant range. The biomechanical response of the cornea to ICRS implantation, by contrast, involves geometric nonlinearity (finite deformation), material nonlinearity (the exponential fiber stiffening captured by the Holzapfel-Gasser-Ogden model with k₂ = 100), and contact nonlinearity (ring-stroma interaction). As demonstrated in Chapter 2, the tangential stress response VT follows a monotonically decreasing linear trend with arc sweep (VT(arc°) = −0.0018 × arc° + 7.79, R² = 0.94), but this linearity in a derived scalar does not imply linearity in the underlying tensor fields. The "difference" between a planned and achieved biomechanical state cannot, in general, be calculated by subtraction; it requires comparison within the nonlinear constitutive framework (Dupps & Roberts, 2014; Lago et al., 2015).

### 8.4.4 What Can Be Borrowed

Despite these limitations, several structural elements of the Alpins method transfer directly to the ICRS context:

- **The planned-versus-induced paradigm.** The distinction between what was *intended* (TIA) and what was *achieved* (SIA) is universally applicable. In AVBC, the finite element model prediction serves as the "planned" biomechanical state, and postoperative tomographic and biomechanical measurements serve as the "induced" state.
- **The Correction Index.** The ratio of achieved to planned effect (CI = |SIA|/|TIA|) can be computed for each AVBC vector component independently, yielding component-specific correction indices: CI_R, CI_T, and CI_τ.
- **Standardized nomenclature.** The discipline of assigning standard names and symbols to every quantity in the analysis — so that all investigators use the same terms — is a methodological lesson of enduring value.
- **Feedback loop closure.** The principle that each index should contain actionable information — not just whether the outcome was acceptable, but how the surgical plan should be adjusted — is the design criterion that distinguishes a planning *language* from a reporting *checklist*.

---

> [!IMPORTANT]
> **For the Clinician: What AVBC Inherits from Alpins**
> AVBC does not reinvent the wheel. It directly inherits from Alpins:
> 1. The idea of *Planned vs. Induced* → FEM predicts what should happen; postop topography confirms what happened.
> 2. The *Correction Index* → if FEM predicted ΔK = −3 D and we obtained −2.5 D, CI_R = 0.83.
> 3. *Standardized Nomenclature* → VR, VT, Vτ are biomechanical equivalents of TIA, SIA, and DV.
>
> What changes: instead of double-angle (a 2D problem), AVBC operates in three independent physical vectors within a nonlinear constitutive space. The mathematics is heavier, but the logic is the same.

## 8.5 AVBC as a Biomechanical Alpins

The Corneal Biomechanical Vector Analysis is built as a *structural homologue* of the Alpins method: it preserves the workflow, nomenclature conventions, and feedback architecture of the Alpins framework while replacing its two-dimensional astigmatic algebra with a multidimensional biomechanical formalism appropriate for ICRS planning.

### 8.5.1 The Structural Parallel

The parallel between the two systems can be stated concisely:

| Alpins Step | Alpins Quantity | AVBC Analogue | AVBC Quantity |
|---|---|---|---|
| Preoperative state | Preoperative astigmatism | Preoperative biomechanical state | Baseline FEM (u_z = 360.9 μm, V_T = 7.78 kPa) |
| Surgical plan | TIA | Planned biomechanical change | ΔV_R, ΔV_T, ΔV_τ predicted by FEM |
| Surgery | Incision / ablation / toric IOL | Surgery | ICRS implantation |
| Postoperative state | Postoperative astigmatism | Postoperative biomechanical state | Measured tomographic + biomechanical data |
| Achieved change | SIA | Induced biomechanical change | ΔV_R, ΔV_T, ΔV_τ measured |
| Residual error | DV = TIA − SIA | Biomechanical residual | δV_R, δV_T, δV_τ |
| Correction ratio | CI = │SIA│/│TIA│ | Component correction indices | CI_R, CI_T, CI_τ |

**Table 3.2.** Structural correspondence between the Alpins vector analysis and AVBC.

![Figure 3.2 — Structural parallel Alpins ↔ AVBC: same logic (Predicted → Measured → CI), different domain.](book_figures/fig_03_02_alpins_vs_avbc.svg)

### 8.5.2 Component-Specific Correction Indices

In the Alpins method, a single CI characterizes the entire surgical outcome because the outcome is a single vector in ℝ². In AVBC, the biomechanical outcome is a trio (V_R, V_T, V_τ), and each component receives its own correction index:

- **CI_R = |ΔV_R_measured| / |ΔV_R_predicted|:** The ratio of the measured radial displacement change to the FEM-predicted radial displacement change. A CI_R of 1.0 indicates that the corneal apical displacement matched the model prediction exactly. Values below 1.0 suggest the cornea was stiffer than modeled (or the ring effect was smaller than predicted); values above 1.0 suggest greater compliance or ring effect.

- **CI_T = |ΔV_T_measured| / |ΔV_T_predicted|:** The ratio of the measured tangential stress change to the predicted change. Given the monotonicity relationship VT(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94), deviations in CI_T provide direct feedback on whether the arc sweep was biomechanically appropriate.

- **CI_τ = |ΔV_τ_measured| / |ΔV_τ_predicted|:** The asymmetric torque correction index. For symmetric ring configurations, the predicted V_τ is zero, and CI_τ is replaced by the absolute residual |V_τ_measured|, which serves as a quality metric: any nonzero value indicates asymmetric biomechanical loading not accounted for by the symmetric ring model.

### 8.5.3 The Honest Caveat

It is essential to state clearly what this parallel is and what it is not. The correspondence between the Alpins method and AVBC is *structural*, not *algebraic*. The Alpins DV is calculated by literal vector subtraction in a linear space; the AVBC residuals δV_R, δV_T, and δV_τ are calculated by comparing predicted and measured fields arising from a nonlinear constitutive model (HGO parameters: c = 0.05 MPa, k₁ = 0.22 MPa, k₂ = 100, κ = 0.09). The Alpins CI is a ratio of magnitudes in a homogeneous vector space; the AVBC component correction indices are ratios of scalars extracted from mechanically distinct tensor quantities. The structural parallel provides *organizational* coherence — it ensures that the AVBC workflow is familiar, intuitive, and complete — but it does not authorize algebraic operations (such as computing a "total DV" by summing δV_R, δV_T, and δV_τ) that would be dimensionally inconsistent and physically meaningless.

This distinction is not a weakness but a strength. The Alpins method works precisely because astigmatism admits a simple, complete algebraic description. AVBC is designed for a problem that does not admit such a description, and its architecture reflects this complexity honestly rather than concealing it beneath a false algebraic simplicity.

---

## 8.6 From Retrospective to Prospective

The Alpins vector analysis has been applied to ICRS outcomes in a handful of retrospective studies. Alió and Shabayek (2006) used the Alpins method to evaluate astigmatic changes after Intacs implantation for keratoconus, computing SIA and CI for the cylindrical component of the refractive outcome. Piñero et al. (2009) extended this approach to Ferrara ring segments, reporting SIA magnitudes and error angles for corneal and refractive astigmatism. Peña-García et al. (2014) applied the Alpins analysis to assess the astigmatic effect of ICRS combined with corneal crosslinking. In each case, the Alpins method was used *retrospectively*: the analysis was performed after surgery to evaluate what had happened, not before surgery to plan what should happen.

This retrospective limitation is not an inherent deficiency of the Alpins method; it reflects the fact that astigmatism surgery planning already has well-established prospective tools (nomograms, ray-tracing, toric IOL calculators) that incorporate the Alpins framework implicitly. For ICRS, by contrast, no prospective biomechanical planning tool exists. The surgeon selects ring type, arc sweep, and implantation depth based on empirical nomograms (e.g., the Ferrara nomogram, Keraring guidelines) that map topographic parameters to ring specifications without an explicit biomechanical model of the corneal response.

AVBC is designed to fill this gap. By coupling finite element simulation with the planned-versus-induced paradigm inherited from Alpins, AVBC enables *prospective* biomechanical planning: the FEM generates a predicted corneal state for a given ring configuration, the surgery is performed, the postoperative state is measured, and the component correction indices quantify the prediction accuracy. Over time, systematic patterns in the correction indices — e.g., consistent underprediction of radial displacement in thin corneas (|Δu_z| = 34.1 μm for pachymetry < 430 μm vs. 28.5 μm for pachymetry > 500 μm) — can be fed back into the model to calibrate patient-specific material parameters. This iterative calibration cycle — predict, measure, compare, update model — is the biomechanical analogue of the nomogram refinement cycle that the Alpins method enabled for astigmatism surgery, and it represents the transition from empirical to model-based ICRS planning.

The critical enabler of this transition is the FEM simulation database. The 28 symmetric ring simulations described in Chapter 2, spanning arc sweeps from 90° to 360° and yielding VR values of 19.2–19.9 μm for partial arcs and 125.9 μm for full-ring ICRS, tangential stress values of 7.20 to 7.78 kPa, and validated torsional symmetry (V_τ = 0 for all symmetric configurations), provide the initial "nomogram" against which postoperative outcomes can be compared. As the clinical database grows, the correction indices will converge toward 1.0 — not because the surgeon's technique improves (as in astigmatism surgery), but because the model fidelity improves through patient-specific calibration.

---

> [!NOTE]
> **For the Clinician: Chapter 8 Operational Summary**
> - Alpins gave us the language: Planned (TIA), Achieved (SIA), Difference (DV).
> - AVBC applies this language to 3D ring biomechanics: VR (flattening), VT (hooping), Vτ (torque).
> - Each vector has its own Correction Index: CI_R, CI_T, CI_τ.
> - The AVBC feedback loop closes: FEM → Surgery → Postop Measurement → Recalibrate model → Improve next prediction.

## 8.7 Summary

The Alpins vector analysis transformed astigmatism surgery from an empirical art into a measurable science by providing a universal, objective, and actionable framework for characterizing surgical outcomes. Its success rested on four pillars: universality of application, objectivity of computation, comparability across studies, and closure of the surgical feedback loop. AVBC inherits this structural architecture — the planned-versus-induced paradigm, the correction index concept, the standardized nomenclature, and the feedback loop design — while replacing its two-dimensional astigmatic algebra with a multidimensional biomechanical formalism appropriate for ICRS planning. The correspondence between the two systems is structural, not algebraic: AVBC respects the nonlinear, heterogeneous, and tensorial nature of corneal biomechanics rather than reducing it to a scalar or a planar vector quantity. The critical advance of AVBC over retrospective Alpins analyses of ICRS outcomes is the introduction of *prospective* biomechanical planning, enabled by finite element simulation and closed-loop model calibration through component-specific correction indices. This chapter has established the conceptual genealogy of AVBC; subsequent chapters will develop its mathematical formalism and validate it against clinical data.

---

## Didactic Summary

- The Alpins Method established the **planned-versus-induced** paradigm for astigmatism surgery, enabling objective outcome analysis.
- AVBC inherits four pillars from Alpins: **universality, objectivity, comparability, and feedback loop closure**.
- The fundamental difference: Alpins operates in a **two-dimensional** space (astigmatism), while AVBC operates in a **three-dimensional** space (VR + VT + Vτ).
- The Alpins Correction Index (CI) directly inspires the AVBC indices CI_R, VT-ratio, and Vτ-ratio.
- AVBC's advance is the transition from Alpins' *retrospective* analysis to **prospective** planning based on finite element simulation.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. A new method of analyzing vectors of astigmatism to compare the effects of refractive surgery. *J Cataract Refract Surg*. 1993;19(4):524–533.
3. Alpins NA. Astigmatism analysis by the Alpins method. *J Cataract Refract Surg*. 2001;27(1):31–49.
4. Alpins NA, Goggin M. Practical astigmatism analysis for refractive outcomes in cataract and refractive surgery. *Surv Ophthalmol*. 2004;49(1):109–122.
5. Dupps WJ Jr, Roberts CJ. Corneal biomechanics: a decade of progress. *J Cataract Refract Surg*. 2014;40(3):333–338.
6. Koch DD. Reporting astigmatism data. *J Cataract Refract Surg*. 1997;23(10):1441–1442.
7. Lago MA, Rupérez MJ, Monserrat C, et al. Patient-specific simulation of the intrastromal ring segment implantation in corneas with keratoconus. *J Mech Behav Biomed Mater*. 2015;51:260–268.
8. Naeser K. Conversion of keratometer readings to polar values. *J Cataract Refract Surg*. 1990;16(6):741–745.
9. Peña-García P, Alió JL, Vega-Estrada A, Barraquer RI. Internal, corneal, and refractive astigmatism as prognostic factors for intrastromal corneal ring segment implantation in mild to moderate keratoconus. *J Cataract Refract Surg*. 2014;40(10):1633–1644.
10. Piñero DP, Alió JL, Teus MA, et al. Modification and refinement of the corneal asphericity after intrastromal corneal ring segment implantation in keratoconus. *Cornea*. 2009;28(7):747–752.
11. Piñero DP. Technologies for anatomical and geometric characterization of the corneal structure and anterior segment: a review. *Clin Exp Optom*. 2014;97(1):5–18.
12. Reinstein DZ, Archer TJ, Randleman JB. JRS standard for reporting astigmatism outcomes of refractive surgery. *J Refract Surg*. 2014;30(11):734–736.
13. Thibos LN, Wheeler W, Horner D. Power vectors: an application of Fourier analysis to the description and statistical analysis of refractive error. *Optom Vis Sci*. 1997;74(6):367–375.
14. Vega-Estrada A, Alió JL, Brenner LF, Burguera N. Outcomes of intrastromal corneal ring segments for treatment of keratoconus: five-year follow-up analysis. *J Cataract Refract Surg*. 2013;39(8):1234–1240.
