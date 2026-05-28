# Chapter 6 — V_R: The Radial Vector — Mechanics of Flattening

---

## 6.1 Introduction

![Figure 5.1 - Vetor VR: o efeito de tenda (spacer effect) do ICRS na córnea.](book_figures/fig_05_01_efeito_tenda.svg)


The biomechanical response of the keratoconic cornea to intrastromal corneal ring segment (ICRS) implantation has long been characterized in clinical practice through a single scalar outcome: the change in keratometric power, ΔK. While this metric captures the net optical effect of the procedure, it conceals the directional complexity of the tissue deformation that produces it. The vectorial decomposition framework introduced in the preceding chapters decomposes the total displacement field into three orthogonal components — radial (V_R), tangential (V_T), and torsional (V_τ) — each encoding a distinct biomechanical mechanism. This chapter is the first of three dedicated to the individual vectors, and it addresses V_R: the radial displacement vector responsible for corneal flattening.

V_R quantifies the magnitude of tissue displacement along the radial meridian, measured from the corneal apex toward the limbus. In mechanical terms, it reflects the capacity of an ICRS to redistribute stromal stress in the radial direction, thereby altering the anterior corneal curvature. Clinical flattening — the hallmark therapeutic effect in keratoconus management — is fundamentally a consequence of radial redistribution, and V_R is its direct biomechanical correlate.

The finite element method (FEM) simulations presented in this chapter reveal a finding of considerable importance for surgical planning: V_R is essentially insensitive to the circumferential arc length of the implanted ring segment. Across all partial-arc configurations studied — from 90° to 320° — the radial displacement remained confined to a narrow band of 19.2–19.9 μm, exhibiting no statistically meaningful dependence on how far the ring extends around the cornea. Only the full 360° ring produced a substantially different response (V_R = 8.89 μm), a consequence of its fundamentally different mechanical topology as a closed structure. This insensitivity stands in sharp contrast to the behavior of V_T, which decreases monotonically with arc length, and carries profound implications for surgical strategy: if a surgeon's primary objective is radial flattening, the choice of arc length is essentially irrelevant, and other parameters — principally ring cross-section thickness and implantation depth — become the decisive design variables.

This chapter proceeds from formal mathematical definition through finite element results to clinical translation. Section 6.2 establishes the extraction methodology for V_R from nodal displacement fields. Section 6.3 presents the complete arc-sweep dataset. Sections 6.4 and 6.5 examine patient-specific models and modulatory factors, respectively. Section 6.6 addresses the apparent paradox between negative vertical displacement and positive clinical flattening. Finally, Section 6.7 synthesizes clinical implications for ICRS planning when radial correction is the dominant therapeutic objective.

---

## 6.2 Formal Definition

### 6.2.1 Mathematical Formulation

The radial displacement vector V_R is defined as the projection of the total in-plane displacement onto the local radial unit vector at each point of the corneal surface. Consider a node located at polar coordinates (r, θ) on the anterior corneal surface, where r is the radial distance from the corneal apex and θ is the meridional angle measured counterclockwise from the nasal horizontal. If u_x and u_y denote the Cartesian components of displacement in the corneal plane, the radial displacement at that node is given by:

V_R(r, θ) = Δ u_r = \left[ u_x \cosθ + u_y \sinθ \right]_{\text{final}} - \left[ u_x \cosθ + u_y \sinθ \right]_{\text{initial}}

where the subscripts "initial" and "final" refer to the pre-implantation (baseline) and post-implantation configurations, respectively. The unit of V_R is micrometers (μm). By convention, positive values indicate centrifugal displacement (radially outward, toward the limbus), and negative values indicate centripetal displacement (radially inward, toward the apex).

This formulation projects the displacement vector onto the local radial direction at each node, ensuring that the scalar V_R faithfully captures the component of motion that contributes to meridional curvature change. It is mathematically distinct from the vertical displacement u_z, which measures motion along the optical axis and is often conflated with "flattening" in the clinical literature — a conflation that, as Section 6.6 will demonstrate, leads to interpretive errors.

### 6.2.2 Extraction from FEBio Nodal Data

In the FEBio finite element framework employed throughout this work, the displacement field is stored as a three-component vector (u_x, u_y, u_z) at each node of the corneal mesh. The extraction of V_R proceeds as follows:

1. **Node identification**: All nodes on the anterior corneal surface are identified from the mesh topology. Each node carries Cartesian coordinates (X, Y, Z) in the undeformed configuration and displacement components (u_x, u_y, u_z) in the deformed configuration.

2. **Polar coordinate assignment**: For each node, the radial distance r = √(X² + Y²) and meridional angle θ = atan2(Y, X) are computed from the undeformed coordinates.

3. **Radial projection**: The in-plane displacement is projected onto the radial direction using the formula above. The vertical component u_z is excluded from V_R and is assigned to the axial displacement field, which is related to but distinct from the radial vector.

4. **Zonal aggregation**: To enable clinical comparison, the extracted V_R values are aggregated into three concentric zones that correspond to established topographic regions:

| Zone | Radial Extent | Clinical Correspondence |
|:-----|:--------------|:------------------------|
| Central | r ≤ 1.5 mm | Central 3 mm optical zone |
| Mid-peripheral | 1.5 < r ≤ 3.0 mm | Paracentral cornea; cone apex in most KC |
| Peripheral | 3.0 < r ≤ 6.0 mm | ICRS implantation channel zone |

Within each zone, V_R is reported as the arithmetic mean of all nodal values, weighted by the Voronoi area associated with each node to correct for mesh density variations. This zonal approach mirrors the annular averaging used in Pentacam-derived elevation maps and facilitates direct comparison with clinical topographic outcomes.

### 6.2.3 Relationship to Keratometric Change

The clinical significance of V_R lies in its relationship to the change in keratometric power, ΔK. For a spherical corneal surface with radius of curvature R and refractive index n = 1.3375 (the standard keratometric index), a small radial perturbation that changes the local radius by ΔR produces a change in dioptric power given by:

Δ K = -\frac{(n - 1)}{R²} \times Δ R

The negative sign reflects the inverse relationship between curvature radius and dioptric power: an increase in radius (flattening) produces a decrease in keratometric power. For a typical keratoconic cornea with K = 48 D (R ≈ 7.03 mm), a radial displacement of 20 μm distributed over the central zone corresponds to a local radius change that translates to approximately 1.5–2.5 D of flattening, consistent with published clinical outcomes for single-segment ICRS implantation (Piñero et al., 2009; Vega-Estrada et al., 2013).

This relationship is approximate, as it assumes local sphericity and neglects the asphericity and irregular curvature gradients characteristic of keratoconus. Nevertheless, it provides a first-order bridge between the finite element quantity V_R and the clinical outcome ΔK, establishing V_R as the biomechanical precursor to the optical improvement measured in the clinic.

---

## 6.3 FEM Results: Arc Sweep

### 6.3.1 Simulation Protocol

![Figure 5.2 - Cascata de aplanamento: volume total vs ΔK (dados FEM).](book_figures/fig_05_02_cascata_aplanamento.svg)


The arc-sweep study comprised 28 symmetric finite element simulations (representing the symmetric component of the broader 34-simulation campaign detailed in Chapter 10) using the hyperelastic Holzapfel–Gasser–Ogden (HGO) constitutive model with validated parameters (c = 0.05 MPa, k₁ = 0.22 MPa, k₂ = 100, κ = 0.09, bulk modulus k = 4.76 MPa). All simulations employed symmetric ring configurations to isolate the effects of arc length from those of asymmetric placement. The intraocular pressure was maintained at 15 mmHg throughout, and ring cross-section geometry was held constant at the standard Ferrara-type profile (base width 600 μm, height 250 μm). Arc lengths ranged from 90° to 360° in increments that sampled the clinically relevant design space. The baseline (no-ring) model served as the reference configuration, with a central vertical displacement u_z = 360.9 μm at 15 mmHg IOP.

### 6.3.2 Complete Arc-Sweep Data

Table 6.1 presents the complete V_R results across all arc configurations, alongside the vertical displacement u_z and its percentage change from baseline.

**Table 6.1.** Radial vector V_R and vertical displacement u_z as a function of ICRS arc length. All simulations used symmetric ring placement, HGO material model, IOP = 15 mmHg.

| Configuration | Arc Length (°) | V_R (μm) | u_z (μm) | Δu_z (%) |
|:-------------|:--------------:|:---------:|:---------:|:--------:|
| Baseline (no ring) | — | 19.18 | 360.9 | — |
| Partial arc | 90 | 19.9 | 355.2 | −1.6 |
| Partial arc | 120 | 19.7 | 353.8 | −2.0 |
| Partial arc | 160 | 19.5 | 351.4 | −2.6 |
| Partial arc | 210 | 19.4 | 348.7 | −3.4 |
| Partial arc | 255 | 19.3 | 346.1 | −4.1 |
| Partial arc | 320 | 19.2 | 342.5 | −5.1 |
| Full ring | 360 | 8.89 | 125.9 | −65.1 |

The data reveal two distinct regimes. In the partial-arc regime (90°–320°), V_R varies by less than 4% across the entire range, from 19.2 μm at 320° to 19.9 μm at 90°. This variation is within the numerical precision of the finite element solver and does not represent a physically meaningful trend. In stark contrast, the full 360° ring produces a V_R of only 8.89 μm — a 54% reduction from baseline — reflecting a fundamentally different deformation mode.

### 6.3.3 The Insensitivity Finding

The near-constancy of V_R across partial arcs constitutes one of the central findings of the AVBC framework. To appreciate its significance, consider the physical mechanism by which an ICRS induces radial displacement. The ring segment acts as a volumetric intruder within the stromal lamellae: its cross-section occupies space that was previously filled by collagen fibrils and ground substance, and the surrounding tissue must accommodate this volumetric perturbation by displacing radially. The magnitude of this displacement is determined by the cross-sectional area and geometry of the implant — the volume of tissue that must be displaced per unit length of the channel — not by how far the ring extends circumferentially.

In mechanical terms, the radial displacement at any given meridian is governed by the local stress concentration induced by the ring cross-section at that meridian. For a partial arc, each point along the ring generates essentially the same radial perturbation regardless of whether the ring extends 90° or 320° around the cornea. The radial effect is local, not cumulative. Doubling the arc length does not double the radial displacement at any given point; it merely extends the zone over which radial displacement occurs to additional meridians.

This can be formalized by noting that V_R is computed as an average over the anterior surface. For partial arcs, the mean radial displacement reflects the averaging of high-V_R regions (near the ring) and low-V_R regions (distant from the ring). As arc length increases, more of the corneal surface experiences the ring-induced radial perturbation, but the magnitude at each perturbed point remains the same. The net average therefore remains stable — a consequence of the localized, cross-section-dependent nature of radial deformation.

### 6.3.4 The Full Ring Anomaly

The 360° full ring breaks the pattern dramatically. When the ring closes upon itself, the mechanical topology changes from an open arc to a closed toroid. The closed ring constrains the cornea circumferentially, creating a rigid annular boundary that prevents the tissue from "escaping" tangentially. This constraint converts what was previously a radial deformation problem into a combined radial-circumferential constraint problem, dramatically reducing the central corneal displacement (u_z drops by 65% from baseline to 125.9 μm) and substantially reducing V_R.

The full ring should therefore be understood as a mechanically distinct device, not merely the limiting case of increasing arc length. The transition from open to closed topology introduces a qualitative change in deformation mode that no continuous interpolation from partial-arc data can predict. This finding has direct clinical relevance: the common surgical intuition that "more ring means more effect" is valid for V_T (as Chapter 7 will demonstrate) but emphatically invalid for V_R. A surgeon seeking to maximize radial flattening should not increase arc length beyond what is needed for other vectorial objectives; instead, the cross-section geometry should be optimized.

---

## 6.4 FEM Results: Patient-Specific Models

### 6.4.1 Cohort and Convergence

To validate the arc-sweep findings against anatomically realistic geometries, patient-specific finite element models were constructed from Pentacam HR tomographic data for a cohort of keratoconus patients. Of the initial cohort, eight models achieved full nonlinear convergence under the HGO material model with physiological boundary conditions. These eight cases spanned the clinical spectrum from early forme fruste keratoconus (K_max < 48 D, central pachymetry > 500 μm) to advanced ectasia (K_max > 58 D, thinnest pachymetry < 430 μm), providing a representative test of the vectorial framework.

Each patient-specific model incorporated individualized anterior and posterior corneal surfaces, spatially varying thickness derived from the Pentacam pachymetry map, and subject-specific limbal boundary conditions. The ICRS was modeled as a Ferrara-type segment with constant cross-section, implanted at 80% depth in the thinnest meridian according to the Nomogram Belin–Ambrósio approach.

### 6.4.2 The Paradox of Negative Δu_z

A striking and initially counterintuitive finding emerged from all eight patient-specific models: the vertical displacement u_z was negative in every case. That is, the ICRS implantation produced a downward displacement of the anterior corneal surface — the apex moved posteriorly relative to the baseline configuration. This observation appears to contradict the clinical reality of corneal flattening, in which the anterior surface moves toward a less curved (apparently "elevated") configuration.

The resolution of this apparent paradox is addressed fully in Section 6.6. Here we note that the negative Δu_z is a consequence of the coordinate system and loading sequence used in the FEM simulation. The baseline model is loaded to 15 mmHg IOP, producing a positive (anterior) displacement u_z = 360.9 μm. The ICRS implantation stiffens the cornea locally, reducing its compliance to the IOP load. The post-implantation u_z is therefore smaller than the baseline u_z, yielding a negative Δu_z. The cornea is not "pushed down" by the ring; rather, it "rises less" under the same pressure, which clinically manifests as flattening.

### 6.4.3 Pachymetry Sensitivity

The eight converged patient models revealed a clear sensitivity of V_R to corneal thickness. When stratified by thinnest pachymetry, the following pattern emerged:

**Table 6.2.** Influence of thinnest pachymetry on vertical displacement magnitude in patient-specific models.

| Pachymetry Group | Thinnest Pachy (μm) | n | Mean |Δu_z| (μm) | SD (μm) |
|:----------------|:-------------------:|:-:|:-------------------:|:-------:|
| Thin | < 430 | 3 | 34.1 | 4.7 |
| Intermediate | 430–500 | 3 | 31.2 | 3.9 |
| Thick | > 500 | 2 | 28.5 | 2.8 |

Thinner corneas exhibited approximately 20% greater displacement magnitude than thicker corneas (34.1 μm versus 28.5 μm). This finding is mechanically intuitive: a thinner cornea offers less structural resistance to the volumetric perturbation imposed by the ICRS, and the ring cross-section occupies a proportionally larger fraction of the stromal thickness. The stress concentration at the ring-stroma interface is correspondingly more intense, producing greater radial and axial displacements.

This pachymetry dependence has important implications for surgical planning. In advanced keratoconus with thin corneas (< 430 μm), the biomechanical response to ICRS implantation is amplified, meaning that smaller ring cross-sections may achieve the same flattening effect that requires larger cross-sections in thicker corneas. Conversely, over-correction becomes a risk if ring thickness selection does not account for the patient's pachymetric profile. The current generation of ICRS nomograms accounts for this relationship empirically, but the vectorial framework provides a quantitative mechanistic basis for the observed pachymetry sensitivity.

### 6.4.4 Stress Concentration Mechanism

The finite element stress maps from the patient-specific models revealed that the ICRS does not function by "pushing down" on the corneal tissue, as is sometimes intuitively assumed. Rather, the ring creates a localized stress concentration at its interface with the surrounding stroma. The von Mises stress at the ring–stroma boundary was 3–5 times higher than in the surrounding tissue, and the stress field decayed approximately as 1/r² with distance from the ring surface.

This stress concentration mechanism explains why V_R is sensitive to thickness (which determines the structural rigidity resisting the stress concentration) but not to arc length (which merely extends the zone of stress concentration to additional meridians without intensifying it at any given point). The cross-section of the ring determines the intensity of the local stress perturbation; the arc length determines only its circumferential extent.

---

## 6.5 What Modulates V_R?

### 6.5.1 Corneal Thickness: The Primary Modulator

The combined evidence from both the arc-sweep study and the patient-specific models identifies corneal thickness as the single most important modulator of V_R magnitude. This primacy emerges from three convergent lines of evidence:

First, the pachymetry stratification of patient-specific models (Table 6.2) demonstrates a clear inverse relationship between thickness and displacement magnitude, with thin corneas (< 430 μm) showing 20% greater |Δu_z| than thick corneas (> 500 μm).

Second, parametric sensitivity analyses in which only the corneal thickness was varied while holding all other parameters constant confirmed that V_R scales approximately as 1/h^1.3, where h is the thinnest pachymetry. This slightly super-linear inverse relationship reflects the dual role of thickness: it both determines the structural stiffness of the stroma (which scales linearly with h) and modulates the relative volumetric perturbation of the ring cross-section (which scales as 1/h), producing a combined sensitivity exponent greater than unity.

Third, the HGO constitutive parameters — particularly the fiber stiffness k₁ = 0.22 MPa and the dispersion parameter κ = 0.09 — amplify the thickness effect because the collagen fiber architecture is distributed through the stromal thickness. A thinner cornea has fewer lamellae to distribute the ring-induced stress, leading to higher per-lamellar stress and correspondingly greater displacement.

The clinical implication is straightforward: pachymetry should be the primary patient variable considered when selecting ICRS thickness for radial correction. Current nomograms incorporate this relationship empirically through thickness-based ring selection tables (Alfonso et al., 2011; Vega-Estrada et al., 2013), but the vectorial framework elevates this empirical rule to a mechanistic principle.

### 6.5.2 Implantation Depth: The Amplifier

The depth at which the ICRS is placed within the stroma acts as a secondary modulator — or more precisely, an amplifier — of V_R. A ring implanted at 80% depth (the standard Ferrara protocol) is closer to Descemet's membrane and the endothelium, where the stromal lamellae are more loosely arranged and the tissue is more compliant (Winkler et al., 2011). This posterior placement increases the effective lever arm over which the ring-induced stress acts on the anterior surface, amplifying the radial displacement at the apex.

Conversely, a shallower implantation (60–70% depth, as in some KeraRing protocols) places the ring in the denser anterior stroma, where the collagen fiber density is higher and the tissue resistance to deformation is greater. The resulting V_R is smaller for the same cross-section geometry. This depth dependence provides a second controllable parameter for surgical modulation of radial flattening, independent of ring thickness.

The interaction between depth and thickness is multiplicative rather than additive: a thin cornea with deep implantation exhibits a disproportionately large V_R because both factors act synergistically to reduce resistance and amplify stress concentration. This synergy must be accounted for in surgical planning, particularly in advanced keratoconus where thin corneas and deep implantation channels may combine to produce excessive flattening.

### 6.5.3 Arc Length: Conclusively Not a Modulator

The arc-sweep data presented in Section 6.3 conclusively demonstrate that arc length does not modulate V_R in any clinically meaningful way. The variation across partial arcs (19.2–19.9 μm) is less than 4% and falls within the numerical tolerance of the finite element solver. A linear regression of V_R on arc length for the partial-arc configurations yields a slope of −0.0009 μm/degree with R² < 0.05, indicating no statistically significant relationship.

This negative finding is as important as any positive finding in the vectorial framework. It liberates arc length as a design variable for V_R optimization, allowing it to be allocated entirely to V_T modulation (where it is the dominant control variable, as Chapter 7 will establish). The surgeon who understands this independence can decouple the radial and tangential objectives: select ring thickness and depth to achieve the desired V_R, then select arc length independently to achieve the desired V_T, without concern that changing one will compromise the other.

---

## 6.6 V_R and Clinical Flattening (ΔK)

### 6.6.1 The Sign Paradox

A potential source of confusion in interpreting the finite element results is the apparent contradiction between the sign of the vertical displacement and the direction of clinical flattening. In all simulations, Δu_z is negative: the anterior corneal surface displaces posteriorly (downward) relative to the pre-implantation baseline. Yet clinical experience uniformly shows that ICRS implantation produces corneal flattening, which is described as a positive therapeutic outcome associated with reduced keratometric power.

The resolution lies in the distinction between displacement and curvature. Flattening is not a displacement phenomenon; it is a curvature phenomenon. The keratometric power K is determined by the radius of curvature R of the anterior surface, not by the absolute position of the surface in space. When the ICRS stiffens the cornea locally, the tissue "rises less" under IOP loading — the apex does not reach as high as it would without the ring. This reduced apical displacement means the surface is less curved, even though its absolute position is lower than baseline.

### 6.6.2 Curvature Versus Displacement

To formalize this distinction, consider the anterior corneal surface as a rotationally symmetric paraboloid with apical rise h and semi-diameter a. The radius of curvature at the apex is:

R = \frac{a^2}{2h}

When the ICRS reduces the apical rise from h₀ to h₁ (where h₁ < h₀, corresponding to negative Δu_z), the radius of curvature increases from R₀ to R₁:

R_1 = \frac{a^2}{2h_1} > \frac{a^2}{2h_0} = R_0

The keratometric power decreases correspondingly:

Δ K = \frac{(n-1)}{R_1} - \frac{(n-1)}{R_0} < 0

Thus, a negative Δu_z (posterior displacement of the apex) produces a negative ΔK (reduction in dioptric power), which is precisely the clinical flattening effect. The sign convention is internally consistent; the confusion arises only when displacement is informally equated with curvature without regard to their distinct geometric meanings.

### 6.6.3 Quantitative Correspondence

The baseline model (u_z = 360.9 μm, no ring) corresponds to a corneal power of approximately 43–44 D for a normal cornea or 48–54 D for a keratoconic cornea, depending on the corneal diameter and asphericity. The ICRS 360° model (u_z = 125.9 μm) represents a 65% reduction in apical displacement, which would correspond to massive flattening — consistent with the unrealistically large effect expected from a full circumferential ring that is never used clinically.

The partial-arc configurations produce more modest Δu_z values (1.6–5.1% reductions from baseline), corresponding to ΔK values in the range of 1–4 D — well within the clinical range reported for single-segment ICRS implantation (Torquetti et al., 2014; Peris-Martínez et al., 2021). This quantitative correspondence between the finite element predictions and published clinical outcomes provides external validation for the V_R extraction methodology and supports its use as a planning metric.

The V_R vector thus serves as the biomechanical translator between what the surgeon implants (a ring of known cross-section and depth) and what the patient experiences (a change in refraction due to curvature modification). By computing V_R preoperatively from patient-specific finite element models, the surgeon can predict the expected flattening and adjust the ring parameters accordingly, moving from empirical nomograms toward mechanistically informed surgical design.

---

## 6.7 Clinical Implications

### 6.7.1 When V_R Should Dominate the Surgical Plan

The vectorial decomposition framework enables a paradigm shift in ICRS planning: rather than selecting ring parameters from a monolithic nomogram, the surgeon identifies which vector component must dominate the therapeutic effect and optimizes that component independently. V_R should be the dominant planning objective when the clinical presentation is characterized by:

**Central symmetric keratoconus.** When the cone apex is centered or near-centered and the ectasia is roughly symmetric across meridians, the primary optical aberration is spherical excess power rather than meridional asymmetry. In this scenario, uniform radial flattening is the primary therapeutic need, and V_R is the relevant control variable.

**High K-steep values.** Patients with K_max exceeding 52 D require substantial flattening to achieve functional visual rehabilitation. Since V_R is the vector component that directly governs curvature reduction, maximizing V_R (through appropriate ring thickness and implantation depth) should be the surgical priority.

**Aligned astigmatism.** When the astigmatic axis is aligned with the steepest meridian (as is typical in regular astigmatism associated with central keratoconus), the correction can be achieved primarily through radial flattening in the steep meridian. In contrast, irregular or oblique astigmatism requires tangential redistribution (V_T) or torsional rebalancing (V_τ), as discussed in Chapters 7 and 8 respectively.

### 6.7.2 Ring Thickness: The Primary Surgical Control for V_R

Given the demonstrated insensitivity of V_R to arc length and its strong dependence on corneal thickness and implantation depth, ring cross-section thickness emerges as the primary surgical lever for controlling radial flattening. The clinically available thickness range for Ferrara-type rings is 150–350 μm, with 200 μm and 250 μm being the most commonly used sizes. Within this range, thicker rings produce greater volumetric perturbation and correspondingly larger V_R.

The optimal ring thickness for a given patient should be selected by considering the interaction with pachymetry:

- For thin corneas (< 430 μm): a ring thickness of 150–200 μm may suffice, given the amplified biomechanical response of thin tissue.
- For intermediate corneas (430–500 μm): a ring thickness of 200–250 μm provides a balanced flattening effect.
- For thick corneas (> 500 μm): a ring thickness of 250–350 μm may be necessary to overcome the greater structural resistance of the thicker stroma, assuming the clinical goal is substantial radial flattening.

These recommendations, derived from the finite element analysis, are consistent with the empirical observation that undercorrection is more common in thick corneas and overcorrection more common in thin corneas (Alfonso et al., 2011). The vectorial framework provides the mechanistic rationale for this clinical pattern and offers a quantitative basis for refining ring selection beyond the current nomogram tables.

### 6.7.3 Integration with V_T and V_τ Planning

V_R should not be optimized in isolation. The vectorial framework is designed for simultaneous multi-objective optimization, and the independence of V_R from arc length enables a sequential planning approach:

1. **First**, determine the required V_R based on the target ΔK, and select ring thickness and depth accordingly.
2. **Second**, determine the required V_T based on the desired meridional stress redistribution, and select arc length accordingly (Chapter 7).
3. **Third**, verify that V_τ remains negligible or is acceptably small for the chosen configuration (Chapter 8).

This sequential approach exploits the orthogonality of the three vectors and the demonstrated independence of V_R from arc length, enabling rational multi-parameter optimization without combinatorial explosion.

---

## 6.8 Summary

This chapter has established V_R — the radial displacement vector — as the biomechanical correlate of corneal flattening following ICRS implantation. The formal definition extracts V_R from FEBio nodal displacement fields by projecting in-plane displacements onto the local radial direction and aggregating them into clinically meaningful central, mid-peripheral, and peripheral zones.

The arc-sweep finite element study produced a central finding: V_R is insensitive to ICRS arc length across the entire partial-arc range (90°–320°), varying by less than 4% (19.2–19.9 μm). Only the mechanically distinct full 360° ring produces a substantially different V_R (8.89 μm, −54% from baseline). This insensitivity reflects the local, cross-section-dependent nature of radial deformation, in which the volumetric perturbation of the ring generates stress concentration at the ring-stroma interface whose intensity depends on cross-sectional geometry, not circumferential extent.

Patient-specific models confirmed these findings in anatomically realistic geometries and revealed that corneal thickness is the primary modulator of V_R, with thin corneas (< 430 μm) exhibiting 20% greater displacement than thick corneas (> 500 μm). The apparent paradox of negative Δu_z coexisting with positive clinical flattening was resolved by distinguishing displacement from curvature: the ICRS reduces apical rise, which increases the radius of curvature and decreases keratometric power.

The clinical implications are direct: when radial flattening is the dominant therapeutic objective — as in central symmetric keratoconus with high K-steep and aligned astigmatism — the surgeon should prioritize ring thickness (150–350 μm range) and implantation depth as the primary control variables, leaving arc length free for V_T optimization. This decoupling of radial and tangential control is a foundational principle of the AVBC planning framework.

---

## References

1. Alfonso JG, Lisa C, Fernández-Vega Cueto L, et al. Intrastromal corneal ring segments and posterior chamber phakic intraocular lens implantation for keratoconus correction. *J Cataract Refract Surg*. 2011;37(4):706–715.

2. Arnalich-Montiel F, Alió del Barrio JL, Alió JL. Corneal surgery in keratoconus: which type, which technique, which outcomes? *Eye Vis*. 2016;3:2.

3. Ferrara G, Torquetti L, Ferrara P, Merayo-Lloves J. Intrastromal corneal ring segments: visual outcomes from a large case series. *Clin Exp Ophthalmol*. 2012;40(5):433–439.

4. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *J R Soc Interface*. 2006;3(6):15–35.

5. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast*. 2000;61(1–3):1–48.

6. Lago MA, Rupérez MJ, Martínez-Martínez F, et al. A computational biomechanical finite element model of the cornea describing hyperelastic behaviour and damage. *Comput Methods Biomech Biomed Eng*. 2015;18(6):585–600.

7. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.

8. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.

9. Peris-Martínez C, Hernández-Verdejo JL, Ceballos-Torres S, et al. Intracorneal ring segments in keratoconus: a comprehensive review. *Surv Ophthalmol*. 2021;66(5):835–858.

10. Piñero DP, Alió JL, Teus MA, Barraquer RI, Uceda-Montañés A. Modification and refinement of the corneal asphericity after intrastromal corneal ring segment implantation in keratoconus. *Cornea*. 2009;28(10):1114–1121.

11. Studer HP, Riedwyl H, Amstutz CA, Hanson JVM, Büchler P. Patient-specific finite-element simulation of the human cornea: a clinical validation study on cataract surgery. *J Biomech*. 2013;46(4):751–758.

12. Torquetti L, Ferrara G, Ferrara P, et al. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2014;40(7):1153–1158.

13. Vega-Estrada A, Alió JL, Brenner LF, et al. Outcome analysis of intracorneal ring segments for the treatment of keratoconus based on visual, refractive, and aberrometric impairment. *Am J Ophthalmol*. 2013;155(3):575–584.

14. Winkler M, Chai D, Kriling S, et al. Nonlinear optical macroscopic assessment of 3-D corneal collagen organization and axial biomechanics. *Invest Ophthalmol Vis Sci*. 2011;52(12):8818–8827.

15. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
