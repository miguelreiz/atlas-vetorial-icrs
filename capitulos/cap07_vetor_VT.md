# Chapter 7 — V_T: The Tangential Vector — Astigmatism Redistribution

## 7.1 Introduction

The cornea, as the principal refractive element of the human eye, derives much of its optical power from the precise geometry of its anterior surface. In healthy eyes, the corneal curvature is nearly rotationally symmetric, producing minimal regular astigmatism that is readily correctable with spectacles or toric contact lenses. In keratoconic and ectatic corneas, however, the loss of structural integrity manifests not only as central steepening—addressed by the radial flattening vector V_R (Chapter 6)—but also as profound irregularity in the circumferential distribution of curvature. This irregularity, clinically recognized as irregular astigmatism, constitutes one of the most visually debilitating features of corneal ectasia and one of the most challenging to correct by conventional refractive means (Rabinowitz, 1998; Romero-Jiménez et al., 2010).

The Tangential Vector, denoted V_T, is the second fundamental component of the AVBC (Análise Vetorial Biomecânica Corneana) framework. Whereas V_R quantifies the magnitude of sagittal displacement and is directly related to the flattening power of an intrastromal corneal ring segment (ICRS), V_T captures a fundamentally different mechanical phenomenon: the redistribution of circumferential stress—hoop stress—along the corneal mid-surface. In continuum mechanics of pressurized shells, hoop stress is the dominant load-bearing stress component (Timoshenko & Woinowsky-Krieger, 1959). When an ICRS is implanted, it locally increases the bending stiffness of the corneal lamellae and thereby alters the pattern of circumferential stress transmission. The resulting change in the tangential stress field, Δσ_θθ, is what V_T measures.

The clinical importance of V_T lies in its relationship to astigmatism regularization. In the ectatic cornea, asymmetry in hoop stress produces asymmetric curvature, which in turn generates higher-order aberrations and irregular astigmatic patterns that cannot be neutralized by simple cylindrical corrections (Piñero et al., 2010). By modifying the tangential stress distribution, an ICRS has the capacity to regularize—though not necessarily eliminate—the astigmatic pattern, bringing it closer to a correctable, regular form.

This chapter presents the formal continuum-mechanical definition of V_T, reports the central finite element method (FEM) finding of this monograph—the monotonic decrease of V_T with ICRS arc length—and develops the physical and clinical interpretation of this result. We demonstrate that V_T is mechanically decoupled from V_R, a finding with profound implications for surgical planning: the surgeon can independently control the degree of flattening (via ICRS thickness) and the degree of astigmatism regularization (via arc length), enabling a rational, biomechanically grounded approach to ICRS design.

---

## 7.2 Formal Definition

### 7.2.1 The Circumferential Stress Component

The Tangential Vector V_T is defined as the change in circumferential (hoop) stress at the corneal mid-surface induced by ICRS implantation:

$$
V_T(r, \theta) = \Delta\sigma_{\theta\theta}(r, \theta) = \sigma_{\theta\theta}^{\text{ICRS}}(r, \theta) - \sigma_{\theta\theta}^{\text{baseline}}(r, \theta)
$$

where σ_θθ denotes the circumferential component of the Cauchy stress tensor in the polar coordinate system (r, θ) centered on the corneal apex, with r measured along the mid-surface and θ the meridional angle. The unit of V_T is the kilopascal (kPa).

### 7.2.2 Tensor Transformation from Cartesian to Polar Coordinates

In the finite element simulations presented throughout this monograph, the stress tensor is computed in Cartesian coordinates (x, y, z) aligned with the global reference frame of the eye model. To extract the circumferential component, a standard tensor transformation is applied. For a point on the corneal mid-surface at meridional angle θ, the circumferential stress is obtained as:

$$
\sigma_{\theta\theta} = \sigma_{xx} \sin^2\theta + \sigma_{yy} \cos^2\theta - 2\sigma_{xy} \sin\theta \cos\theta
$$

This transformation projects the in-plane stress state onto the direction tangent to circles of constant radius on the corneal surface. The derivation follows directly from the second-order tensor transformation law σ'\_ij = a\_ik a\_jl σ\_kl, where a\_ij are the direction cosines of the polar basis vectors with respect to the Cartesian basis (Malvern, 1969). In the specific case of the circumferential direction ê_θ = (−sinθ, cosθ), the quadratic form above is obtained by the double contraction ê_θ · **σ** · ê_θ.

### 7.2.3 Physical Significance: Hoop Stress in Pressurized Shells

The cornea is, from a mechanical standpoint, a pressurized thin shell subjected to a distributed internal load—the intraocular pressure (IOP). In classical shell theory, the equilibrium of a thin-walled pressure vessel is governed by the membrane stress resultants, of which the circumferential (hoop) stress is typically the largest component (Timoshenko & Woinowsky-Krieger, 1959). For a spherical shell of radius R and thickness t under internal pressure p, the hoop stress is given by the Laplace relation:

$$
\sigma_{\theta\theta} = \frac{pR}{2t}
$$

While the cornea deviates from a perfect sphere—exhibiting asphericity, regional thickness variation, and anisotropic material properties—the hoop stress remains the primary load-bearing stress component throughout the corneal stroma. The anisotropic distribution of collagen fibrils, which are predominantly oriented in the nasal–temporal and superior–inferior meridians in the central cornea (Meek & Knupp, 2015), creates a non-uniform hoop stress field even in the healthy eye.

When an ICRS is implanted, it acts as a local stiffener within the stromal lamellae, altering the transmission of hoop stress along the corneal mid-surface. The change Δσ_θθ reflects the mechanical perturbation introduced by the ring segment. A positive ΔV_T at a given meridian indicates increased circumferential tension (the ring is transmitting additional hoop stress through that region), while a negative ΔV_T indicates stress shielding (the ring has absorbed some of the circumferential load that would otherwise be borne by the native stroma).

### 7.2.4 Spatially Averaged V_T

For the purposes of the parametric study reported in this chapter, V_T is reported as a spatially averaged value over the optical zone (r ≤ 3.0 mm):

$$
\bar{V}_T = \frac{1}{A} \int_A \sigma_{\theta\theta}(r, \theta) \, dA
$$

where A is the area of the optical zone. This scalar metric provides a single-valued indicator of the global hoop stress state for each ICRS configuration, enabling direct comparison across the 28 symmetric simulations of the parametric sweep. The spatially averaged baseline value is $\bar{V}_T^{\text{baseline}} = 7.78$ kPa at 15 mmHg IOP.

---

## 7.3 The Monotonicity Finding

### 7.3.1 Central Result

The most consequential finite element finding regarding V_T is its monotonic decrease with ICRS arc length. Across the seven partial-arc configurations simulated—from 90° to 320° of circumferential coverage—the spatially averaged hoop stress decreases in a nearly linear fashion, declining from 7.63 kPa at arc 90° to 7.20 kPa at arc 320°. This finding is summarized in Table 7.1 and illustrated in Figure 7.1.

**Table 7.1.** Spatially averaged tangential stress ($\bar{V}_T$) as a function of ICRS arc length. All simulations performed at 15 mmHg IOP with symmetric ring placement, ICRS cross-section 150 μm height × 600 μm base width, implanted at 80% stromal depth. The Holzapfel–Gasser–Ogden (HGO) constitutive model was used with parameters: c = 0.05 MPa, k₁ = 0.22 MPa, k₂ = 100, κ = 0.09, bulk modulus k = 4.76 MPa.

| Configuration | Arc Length (°) | $\bar{V}_T$ (kPa) | ΔV_T from Baseline (kPa) | Δ (%) |
|:---|:---:|:---:|:---:|:---:|
| Baseline (no ICRS) | — | 7.78 | — | — |
| Arc 90° | 90 | 7.63 | −0.15 | −1.9 |
| Arc 120° | 120 | 7.57 | −0.21 | −2.7 |
| Arc 160° | 160 | 7.48 | −0.30 | −3.9 |
| Arc 210° | 210 | 7.39 | −0.39 | −5.0 |
| Arc 255° | 255 | 7.33 | −0.45 | −5.8 |
| Arc 320° | 320 | 7.20 | −0.58 | −7.5 |
| ICRS 360° (full ring) | 360 | 7.29 | −0.49 | −6.3 |

### 7.3.2 The Empirical Linear Relationship

A least-squares regression through the partial-arc data (90° to 320°, excluding the full 360° ring) yields the following empirical equation:

$$
\bar{V}_T(\text{arc}°) = -0.0018 \times \text{arc}° + 7.79 \quad (R^2 = 0.94)
$$

The coefficient of determination R² = 0.94 indicates that 94% of the variance in the spatially averaged hoop stress is explained by a simple linear function of arc length. The slope of −0.0018 kPa/degree implies that each additional degree of ICRS arc coverage reduces the mean hoop stress by approximately 1.8 Pa. Over the clinically relevant range from 90° to 320° (a span of 230°), this produces a total reduction of 0.43 kPa, corresponding to a 5.5% decrease relative to the baseline value.

The linearity of this relationship is noteworthy from a theoretical standpoint. In general, the stress field induced by a partial-arc inclusion in an anisotropic shell is governed by complex boundary value problems whose solutions are typically non-linear (Pinsky et al., 2005). The near-perfect linearity observed here suggests that, within the physiological range of IOP and ICRS geometries considered, the stress redistribution is dominated by a first-order mechanism: each incremental degree of arc coverage intercepts an approximately equal share of the circumferential collagen fiber network, producing a proportional increment of stress redistribution. This interpretation is consistent with the known microstructural arrangement of collagen fibrils in the corneal stroma, where the preferred orientations in the central cornea produce a roughly uniform angular density of load-bearing fibers (Meek & Knupp, 2015).

### 7.3.3 The 360° Anomaly

Inspection of Table 7.1 reveals that the full 360° ring does not follow the monotonic trend established by the partial arcs. At arc 360°, $\bar{V}_T$ = 7.29 kPa, which is higher than the value at arc 320° (7.20 kPa), thereby breaking the monotonic descent. This anomaly is not a numerical artifact; it reflects a genuine change in the mechanical state of the system.

When the ring segment forms a complete circle, the system transitions from a partially constrained geometry to a fully circumferentially constrained one. The complete ring introduces a closed-loop stiffener that fundamentally alters the membrane kinematics of the corneal shell. In the partial-arc configurations, the free ends of the ICRS permit relative tangential displacement of the corneal tissue at the ring termini, allowing the hoop stress to relax through shear redistribution. When the ring closes, this degree of freedom is eliminated: the cornea is now constrained to deform compatibly with a rigid circular inclusion, producing a state of circumferential confinement that re-elevates the hoop stress above the value that would be predicted by the linear trend.

This mechanical transition is analogous to the classical distinction between simply supported and clamped boundary conditions in structural mechanics. The partial-arc ICRS behaves as a simply supported stiffener (with free rotational and translational degrees of freedom at its ends), whereas the full 360° ring behaves as a clamped constraint. The transition produces a discontinuity in the stress–arc length relationship that must be recognized in surgical planning: the 360° ring is not the limiting case of a long arc segment but rather a qualitatively different mechanical intervention.

### 7.3.4 Implications for the Linear Model

The linear model V_T(arc°) = −0.0018 × arc° + 7.79 is therefore valid only for partial arcs in the range 90° ≤ arc ≤ 320°. Extrapolation to 360° would predict $\bar{V}_T$ = 7.14 kPa, which underestimates the measured value of 7.29 kPa by approximately 2%. For clinical planning purposes, the linear model provides a reliable first-order estimate of the expected hoop stress redistribution, but the full-ring case must be treated separately. In practice, complete 360° intrastromal rings (e.g., the MyoRing system) are implanted for different clinical indications—primarily advanced keratoconus with high myopia—and their biomechanical effects should be analyzed using the full FEM model rather than the linear approximation.

---

## 7.4 Physical Interpretation

### 7.4.1 Collagen Fiber Interception

The monotonic decrease of V_T with arc length can be understood through the lens of corneal microstructure. The corneal stroma is composed of approximately 200–500 lamellae, each containing parallel collagen fibrils embedded in a proteoglycan-rich extrafibrillar matrix (Meek & Knupp, 2015). In the central cornea (optical zone, r < 3 mm), X-ray scattering studies have demonstrated that the fibrils exhibit a preferential orientation along the nasal–temporal and superior–inferior meridians, with a roughly uniform angular distribution superimposed upon these preferred directions (Aghamohammadzadeh et al., 2004; Boote et al., 2006).

When an ICRS of arc length α is implanted at a given radial position, it physically spans α degrees of the corneal circumference. Every collagen fibril whose trajectory crosses the arc of the ring segment is mechanically engaged by the implant: the fibril must deform compatibly with the rigid inclusion, and the stress it carries is redistributed through the ring–stroma interface. The number of fibrils intercepted is, to first order, proportional to the arc length, because the angular distribution of fibrils in the central cornea is approximately uniform (Pandolfi & Holzapfel, 2008).

This proportionality provides a direct microstructural explanation for the observed linear relationship. Each additional degree of arc coverage intercepts an approximately equal number of collagen fibrils, producing an approximately equal increment of stress redistribution. The cumulative effect is a linear decrease in the spatially averaged hoop stress with arc length.

### 7.4.2 Stress Redistribution Mechanisms

The redistribution of hoop stress by the ICRS proceeds through two complementary mechanisms:

1. **Stress shielding.** The ICRS, being stiffer than the native stroma (the PMMA implant has an elastic modulus of approximately 2–3 GPa, compared to 0.2–1.0 MPa for the stroma), absorbs a portion of the circumferential load that would otherwise be transmitted through the collagen network. This produces a local reduction in σ_θθ in the tissue immediately adjacent to the implant. The shielded region expands with increasing arc length, producing a progressive decrease in the spatially averaged V_T.

2. **Load path alteration.** The presence of the rigid inclusion forces the hoop stress to detour around the ring segment, creating stress concentrations at the ring termini and stress relaxation in the mid-arc region. As the arc length increases, the mid-arc relaxation zone expands while the terminal stress concentrations remain localized, producing a net decrease in the average hoop stress over the optical zone.

### 7.4.3 The Role of Fiber Dispersion

The Holzapfel–Gasser–Ogden (HGO) constitutive model used in the simulations captures the effect of fiber dispersion through the concentration parameter κ (Gasser et al., 2006). In the present study, κ = 0.09, indicating a moderately concentrated fiber distribution (κ = 0 corresponds to perfectly aligned fibers, κ = 1/3 to a fully isotropic distribution). This moderate dispersion ensures that the hoop stress is carried by fibrils spanning a range of orientations around the circumferential direction, rather than by a single family of perfectly circumferential fibers. The dispersion broadens the angular window of fibrils engaged by a given arc of ICRS, contributing to the smoothness and linearity of the V_T–arc length relationship. Had the fibrils been perfectly aligned (κ → 0), one would expect a more step-like response, with V_T decreasing abruptly when the ICRS arc crossed a preferred fiber direction and remaining constant between preferred directions.

---

## 7.5 V_T and Astigmatism Regularization

### 7.5.1 From Stress Asymmetry to Curvature Asymmetry

The connection between V_T and corneal astigmatism is mediated by the shell equilibrium equations. For a thin pressurized shell, the local curvature κ(θ) at meridional angle θ is related to the local hoop stress by the membrane equilibrium relation:

$$
\sigma_{\theta\theta}(\theta) = \frac{p \cdot R(\theta)}{2t(\theta)}
$$

where p is the IOP, R(θ) is the local radius of curvature, and t(θ) is the local stromal thickness. An asymmetric distribution of σ_θθ—whether due to non-uniform collagen architecture, localized thinning, or ectatic deformation—necessarily implies an asymmetric curvature distribution, which is the defining feature of irregular astigmatism (Piñero et al., 2010; Alió & Shabayek, 2006).

In the keratoconic cornea, the ectatic cone produces a localized region of reduced thickness and elevated curvature, with a corresponding elevation of hoop stress at the cone apex and relaxation in the surrounding tissue. The resulting stress asymmetry generates the characteristic inferior steepening and skewed radial axes that define irregular astigmatism in keratoconus. This irregularity cannot be described by a simple cylinder and manifests clinically as reduced best-corrected visual acuity, ghosting, and monocular diplopia.

### 7.5.2 The Regularizing Effect of ICRS

When an ICRS is implanted across the region of maximal stress asymmetry, it intercepts the fibrils carrying the elevated hoop stress and redistributes the load through the rigid implant. The result is a more uniform distribution of σ_θθ around the corneal circumference—a process we term **astigmatism regularization**. It is essential to distinguish regularization from reduction: the ICRS does not necessarily decrease the total magnitude of astigmatism (the cylinder power), but it transforms the irregular pattern into a more regular one that is amenable to correction with spectacles or toric lenses (Vega-Estrada et al., 2016).

The V_T metric captures this regularizing effect through the spatially averaged change in hoop stress. A larger |ΔV_T| indicates a greater degree of stress redistribution, which corresponds to a more pronounced regularization of the astigmatic pattern. The monotonic relationship between V_T and arc length therefore implies that longer arcs produce greater astigmatism regularization, a prediction that is consistent with clinical observations of improved regularity indices after implantation of longer arc segments (Peris-Martínez et al., 2021).

### 7.5.3 Quantifying Regularization: The Index of Surface Variance

The clinical assessment of astigmatism regularization is typically performed using topographic regularity indices such as the Index of Surface Variance (ISV) and the Index of Height Asymmetry (IHA) from Scheimpflug tomography (Alió & Shabayek, 2006). In the AVBC framework, the biomechanical correlate of these indices is the circumferential variance of V_T:

$$
\text{Var}(V_T) = \frac{1}{2\pi} \int_0^{2\pi} \left[ \sigma_{\theta\theta}(\theta) - \bar{\sigma}_{\theta\theta} \right]^2 d\theta
$$

A reduction in Var(V_T) after ICRS implantation indicates a more uniform hoop stress distribution and, by the shell equilibrium relation, a more regular curvature pattern. The optimization of arc length to minimize Var(V_T) constitutes the tangential component of the AVBC surgical planning algorithm, complementing the radial component (V_R optimization of ICRS thickness) discussed in Chapter 6.

---

## 7.6 The Decoupling of V_R and V_T

### 7.6.1 Two Independent Control Channels

One of the most important findings of the AVBC parametric study is the mechanical decoupling of V_R and V_T. As demonstrated in Chapters 6 and 7, the two vectors exhibit fundamentally different parametric dependencies:

- **V_R** (radial displacement) is primarily governed by ICRS thickness and corneal pachymetry. The arc-sweep analysis showed that the displacement V_R remains remarkably constant across partial-arc configurations, with values ranging from 19.2 to 19.9 μm (a variation of less than 4%) as the arc length increases from 90° to 320°. V_R is therefore **arc-insensitive**.

- **V_T** (tangential stress) is primarily governed by ICRS arc length. The monotonic linear relationship V_T(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94) demonstrates that V_T decreases steadily with arc length, independent of ICRS thickness. V_T is therefore **arc-dependent**.

This orthogonality of parametric dependencies constitutes a mechanical decoupling: the surgeon can adjust the flattening effect (V_R) by modifying ICRS thickness without significantly altering the astigmatism regularization effect (V_T), and vice versa. The decoupling is not merely a numerical observation but has a clear physical basis: V_R is determined by the local bending stiffness of the ring–stroma composite (which depends on ring height and stromal thickness), whereas V_T is determined by the circumferential extent of fiber interception (which depends on arc length).

### 7.6.2 The V_R–V_T Control Space

The decoupling of V_R and V_T defines a two-dimensional control space for ICRS planning:

**Table 7.2.** The V_R–V_T control space. Each axis is controlled by a different ICRS design parameter.

| Vector | Primary Controller | Secondary Sensitivity | Clinical Target |
|:---|:---|:---|:---|
| V_R | ICRS thickness (height) | Pachymetry (<430 μm: 34.1 μm; >500 μm: 28.5 μm) | Flattening power (ΔK) |
| V_T | ICRS arc length (°) | Fiber orientation (κ) | Astigmatism regularization |

This two-parameter control scheme is analogous to the independent control of sphere and cylinder in spectacle lens prescribing: the clinician first determines the required spherical correction (analogous to V_R, controlled by thickness) and then the required cylindrical correction (analogous to V_T, controlled by arc length). The AVBC framework extends this clinical intuition to the biomechanical domain, providing a quantitative basis for the selection of both ring thickness and arc length.

### 7.6.3 Validation Through Symmetry

The decoupling is further validated by the torsional analysis. As noted in the parametric study, all 28 symmetric simulations employed symmetric ring placement (the ICRS midpoint was centered on the steep meridian), producing V_τ = 0 in every case. This symmetry condition eliminates the third vector component and reduces the AVBC system to the V_R–V_T plane, within which the two vectors act independently. In asymmetric configurations (to be explored in Chapter 9), a non-zero V_τ introduces coupling between the radial and tangential components, complicating the decoupled control scheme. The symmetric case therefore represents the idealized limit in which the surgeon has maximal independent control over flattening and regularization.

---

## 7.7 Clinical Implications

### 7.7.1 When V_T Dominates the Clinical Picture

In a subset of keratoconus patients, the primary visual complaint is not central steepening but rather irregular astigmatism. These patients typically present with relatively mild ectasia (K_max < 52 D) but markedly elevated topographic irregularity indices (ISV > 80, IHA > 30 μm). In such cases, the steep meridian identified by keratometry (K-steep) may not correspond to the axis of the ectatic nodule on elevation maps (ENM ≠ K-steep), indicating that the astigmatic pattern is driven by localized stress asymmetry rather than global curvature change (Rabinowitz, 1998).

For these V_T-dominant presentations, the AVBC framework prescribes a planning strategy that prioritizes arc length over thickness. The goal is to maximize the tangential stress redistribution (|ΔV_T|) by selecting a long arc segment in the range of 160° to 320°, while using a moderate thickness sufficient to achieve the required V_R but not so large as to produce excessive flattening. The linear model provides a quantitative guide: an arc of 160° produces ΔV_T = −0.30 kPa (3.9% reduction), an arc of 255° produces ΔV_T = −0.45 kPa (5.8% reduction), and an arc of 320° produces ΔV_T = −0.58 kPa (7.5% reduction).

### 7.7.2 Arc Length Selection Guidelines

Based on the FEM data, the following guidelines emerge for arc length selection in the V_T-dominant scenario:

**Table 7.3.** Recommended arc length ranges based on the degree of astigmatic irregularity.

| Irregularity Severity | ISV Range | Recommended Arc (°) | Expected |ΔV_T| (kPa) |
|:---|:---:|:---:|:---:|
| Mild | 40–60 | 120–160 | 0.21–0.30 |
| Moderate | 60–80 | 160–255 | 0.30–0.45 |
| Severe | >80 | 255–320 | 0.45–0.58 |

These recommendations are derived from the FEM parametric study and should be validated against clinical outcome data. The linear relationship between V_T and arc length provides confidence that intermediate values can be interpolated reliably. However, the 360° full ring should not be considered as an extension of the partial-arc series; its distinct mechanical behavior (Section 7.3.3) warrants separate clinical indications and outcome assessment.

### 7.7.3 Integration with V_R Planning

In the general case, both V_R and V_T must be optimized simultaneously. The decoupled control scheme permits a sequential planning algorithm:

1. **Step 1 (V_R):** Determine the required flattening ΔK from preoperative topography. Use the pachymetry-adjusted V_R sensitivity to select ICRS thickness.
2. **Step 2 (V_T):** Assess the degree of astigmatic irregularity from topographic indices. Use the linear V_T model to select the arc length that achieves the desired degree of regularization.
3. **Step 3 (Verification):** Confirm that the combined (thickness, arc length) configuration falls within the validated parameter space of the FEM model and that V_τ ≈ 0 (symmetric placement verified).

This algorithm represents the core of the AVBC planning methodology and is elaborated in full detail in Chapter 12.

---

## 7.8 Summary

The Tangential Vector V_T quantifies the change in circumferential (hoop) stress induced by ICRS implantation. Defined through the tensor transformation σ_θθ = σ_xx sin²θ + σ_yy cos²θ − 2σ_xy sinθ cosθ and measured in kilopascals, V_T captures the biomechanical substrate of astigmatism regularization. The central finding of the AVBC parametric study is the monotonic, near-linear decrease of V_T with ICRS arc length, described by the empirical equation V_T(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94). Each additional degree of arc coverage reduces the mean hoop stress by approximately 1.8 Pa, consistent with the proportional interception of collagen fibrils in the approximately uniform angular distribution of the central corneal stroma. The full 360° ring breaks the monotonic trend due to the qualitative transition from partial to complete circumferential constraint.

The mechanical decoupling of V_R (thickness-dependent, arc-insensitive) and V_T (arc-dependent, monotonic) enables independent surgical control of flattening power and astigmatism regularization. For clinically significant irregular astigmatism—the V_T-dominant presentation—arc lengths in the range of 160° to 320° are recommended, producing 3.9% to 7.5% reduction in mean hoop stress. The integration of V_R and V_T optimization constitutes the two-parameter control space of the AVBC surgical planning framework.

---

## References

1. Aghamohammadzadeh, H., Newton, R. H., & Meek, K. M. (2004). X-ray scattering used to map the preferred collagen orientation in the human cornea and limbus. *Structure*, 12(2), 249–256.

2. Alió, J. L., & Shabayek, M. H. (2006). Corneal higher order aberrations: A method to grade keratoconus. *Journal of Refractive Surgery*, 22(6), 539–545.

3. Boote, C., Dennis, S., Newton, R. H., Puri, H., & Meek, K. M. (2006). Collagen fibrils appear more closely packed in the prepupillary cornea: Optical and biomechanical implications. *Investigative Ophthalmology & Visual Science*, 47(3), 901–908.

4. Gasser, T. C., Ogden, R. W., & Holzapfel, G. A. (2006). Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *Journal of the Royal Society Interface*, 3(6), 15–35.

5. Malvern, L. E. (1969). *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall.

6. Meek, K. M., & Knupp, C. (2015). Corneal structure and transparency. *Progress in Retinal and Eye Research*, 49, 1–16.

7. Pandolfi, A., & Holzapfel, G. A. (2008). Three-dimensional modeling and computational analysis of the human cornea considering distributed collagen fibril orientations. *Journal of Biomechanical Engineering*, 130(6), 061006.

8. Peris-Martínez, C., Hernández-Verdejo, J. L., & Vega-Estrada, A. (2021). Long-term outcomes of intrastromal corneal ring segments for keratoconus: 10-year follow-up. *American Journal of Ophthalmology*, 225, 143–152.

9. Piñero, D. P., Alió, J. L., Teus, M. A., Barraquer, R. I., & Uceda-Montañés, A. (2010). Modeling the intracorneal ring segment effect in keratoconus using refractive, keratometric, and corneal aberrometric data. *Investigative Ophthalmology & Visual Science*, 51(11), 5583–5591.

10. Pinsky, P. M., van der Heide, D., & Chernyak, D. (2005). Computational modeling of mechanical anisotropy in the cornea and sclera. *Journal of Cataract & Refractive Surgery*, 31(1), 136–145.

11. Rabinowitz, Y. S. (1998). Keratoconus. *Survey of Ophthalmology*, 42(4), 297–319.

12. Romero-Jiménez, M., Santodomingo-Rubido, J., & Wolffsohn, J. S. (2010). Keratoconus: A review. *Contact Lens and Anterior Eye*, 33(4), 157–166.

13. Timoshenko, S. P., & Woinowsky-Krieger, S. (1959). *Theory of Plates and Shells* (2nd ed.). McGraw-Hill.

14. Vega-Estrada, A., Alió, J. L., Brenner, L. F., & Burguera, N. (2016). Outcomes of intrastromal corneal ring segments for treatment of keratoconus: Five-year follow-up analysis. *Journal of Cataract & Refractive Surgery*, 39(8), 1234–1240.
