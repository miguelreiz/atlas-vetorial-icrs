# Chapter 2 — How ICRS Work: From Volume Displacement to Vector Decomposition

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part I — Fundamentals*

---

## 2.1 Introduction

Intracorneal ring segments have been implanted for over twenty-five years, with an estimated half-million procedures performed worldwide since the first Intacs implant in 1999 (Burris et al., 1998; Colin et al., 2000). Despite this extensive clinical experience, the ICRS mechanism of action remains a subject of ongoing debate. How, precisely, does a small arc of polymethylmethacrylate (PMMA) inserted into the corneal stroma produce changes in corneal curvature, astigmatism, and higher-order aberrations?

Three conceptual frameworks have been proposed: the **geometric school** (Barraquer, 1964), which attributes the effect to arc shortening; the **volumetric school** (Kling & Marcos, 2013), which emphasizes volume displacement; and the **biomechanical school** (Dupps & Roberts, 2014), which focuses on stress redistribution. Each approach captures part of the truth, but none provides a complete explanation of the observed clinical effects.

This chapter critically reviews these three perspectives and synthesizes them into a unified framework — the **three-vector decomposition** — in which the ICRS effect is resolved into three independent biomechanical mechanisms: radial displacement (VR), tangential stress redistribution (VT), and asymmetric torque (Vτ). This decomposition, validated by 34 finite element simulations presented in Chapter 12, forms the mechanistic basis for the AVBC planning framework.

---

## 2.2 The Geometric School: Barraquer's Principle (1960s)

### The Evolution of the Concept

The intellectual foundation for ICRS dates back to the pioneering work of José I. Barraquer in the 1960s. In his seminal publications on *Keratomileusis* and *Keratophakia* (Barraquer, 1966; Barraquer, 1967), he proposed that modification of stromal thickness could induce predictable changes in anterior curvature. The initially postulated mechanism was purely geometric: the **arc-shortening principle**.

For a circular arc with a fixed chord length, shortening the arc increases the radius of curvature. If material is placed in the *peripheral* cornea, the geometric redistribution and stromal expansion force the anterior layers to accommodate the volume, resulting in an effective arc shortening and, consequently, flattening of the *central* cornea.

This postulate culminated in the classic **"Law of Thickness"** (Barraquer, 1967): *"If material is added to the corneal periphery or removed from the center, the cornea flattens. If material is removed from the periphery or added to the center, the cornea steepens."* Historically, this elegant principle laid the foundation for subtractive procedures (LASIK, PRK) and for the design of the first intrastromal ring models for myopia correction in the 1990s (Burris et al., 1991).

### Limitations of the Geometric School

The arc-shortening model dominated the refractive literature for decades due to its intuitive simplicity, but proved scientifically incomplete, particularly when applied to pathological corneas (ectasias):

1. **The Assumption of Symmetry and Sphericity:** The model assumes that the cornea responds as a uniform spherical cap. It can explain global myopic flattening (K-mean reduction in healthy eyes), but **cannot explain astigmatism regularization** or the asymmetric topographic changes clinically observed in keratoconus.
2. **It Ignores Apex Repositioning:** In keratoconus, the cone apex is frequently displaced from the visual axis. Asymmetric ICRS configurations can migrate this apex (reducing coma) — a kinematic effect that uniform mechanical radial arc shortening cannot encompass.
3. **The "Artificial Limbus" Fallacy for Partial Arcs:** A later extension of the arc model attempted to explain atypical results with partial implants (less than 360°) by postulating that the rigid ICRS always created a "functional limbus" or "sphincter" — a tightening barrier that mimicked natural limbal support. It is true that a **complete 360° ring** can indeed create a continuous stress ring (an effective "artificial limbus" that contains expansion). However, the historical error was to assume that this effect applied to partial arcs. Finite element simulations demonstrated that partial arcs *do not* close the stress ring, creating biomechanical discontinuities that redirect stress and lead to diametrically opposite deformations (see Section 2.4).

---

## 2.3 Volume Displacement and Stress Redistribution

### The Volumetric School: The FEM Study of Kling and Marcos (2013)

The formal transition from two-dimensional geometry to three-dimensional solid mechanics occurred when Kling and Marcos (2013) applied the finite element method (FEM) to the hyperelastic cornea model. By studying in detail the displacement fields generated around the implant, they revealed that flattening did not result from mere shortening of the superior curvature, but rather from an intense **volume displacement** (the so-called *spacer effect*).

The mechanism operates as follows: the ICRS occupies a physical and inflexible volume within the tissue (typically 0.5 to 1.5 mm³, depending on its profile). Since the stroma is water-rich (78% hydration) and therefore a nearly perfectly incompressible tissue fluid, it cannot absorb or compress its own lamellae. Consequently, the adjacent tissue must accommodate the intrusion by displacing radially and anteriorly. This peripheral centrifugal pressure expands the intrastromal channel laterally, pulling the thin fibrillar network of the central bed. Under this divergent radial traction, the central corneal roof descends, flattening conservatively to compensate for the peripheral stromal expansion.

### The Biomechanical School: The Perspective of Dupps and Roberts (2014)

Although the volumetric school predicted mass displacement well, it did not entirely capture the primary mechanical degradation of the keratoconus patient. The following year, Dupps and Roberts (2014) consolidated a vital paradigm for ophthalmology: changes in curvature, elevation, and pachymetry are strictly *secondary* manifestations of an underlying structural anomaly. The primary disease of keratoconus is, intrinsically, a focal biomechanical deficit.

In this modern perspective, ICRS act through complex **stress redistribution**. By introducing into the stroma a solid whose mechanical properties are thousands of times greater than those of the weakened matrix (Young's modulus of PMMA is approximately 3 GPa versus the scant ~0.2 MPa of the ectatic cornea), the ring acts as an inflexible buttress. In the spherical shell of the cornea, which is permanently inflated by intraocular pressure (IOP), radial and tangential forces (*hoop stress*) seek the path of least resistance.

The Dupps perspective emphasizes that the segment does not physically "mold" the cornea by force (unlike an orthodontic ring on a tooth). Rather, it acts as a peripheral shield: the ring intercepts the expansive stress cascade, anchoring circular and radial forces away from the weakened central cone. The new *K-steep* and the new topography are merely the resting posture ("stability equilibrium") that the cornea adopts under the new modified force scenario induced by the implant.

Our data gather overwhelming evidence in this regard. A simulated baseline cornea with a classic HGO modulus (see Appendix A) demonstrates, under 15 mmHg of pulsed IOP, a physiological apical displacement of **360.9 μm**. When subjected to a complete ring (360°), this value is severely constrained to **125.9 μm** (a remarkable structural gain of 65%). This massive suppression of bulging far exceeds the purely volumetric effect of the ring; it represents a real mutation in the apparent elastic laws of the collagen skeleton under posterior compressive loading.

### Synthesis: The Historical Evolution of ICRS Paradigms

For the modern ophthalmologist, understanding the historical limitations and explanatory triumphs of these various schools is essential for reasoning abstractly when faced with atypical tomographies or challenging surgical decisions.

**Table 2.1** chronologically summarizes the journey of our scientific understanding of intracorneal rings. It is upon the shoulders of this century-long heritage of geometry, volumetric hydrodynamics, and fracture mechanics that the fourth and current stage of planned systematization is born: the **Biomechanical Vector Decomposition (AVBC)** explored in this book.

**Table 2.1.** Historical Comparison of Scientific Schools of Thought on ICRS Mechanisms.

| School / Paradigm | Period (Base Author) | Dominant Mechanism of Action Postulate | Explanatory Strength | Main Clinical Gap |
| :--- | :--- | :--- | :--- | :--- |
| **Geometric** | 1960s (Barraquer) | Chord surface shortening by peripheral stromal insertion. | Justifies proportional myopic flattening in biomechanically healthy tissues. | Cannot explain the effect on irregular astigmatism or asymmetric deformations of partial arcs. |
| **Volumetric** | 2013 (Kling & Marcos) | Stromal incompressibility and the *spacer effect* displace tissue radially. | Establishes the mechanistic link between ring volume (thickness) and the exact degree of K flattening. | Does not fully clarify the remodeling power of different arc lengths if thickness is maintained. |
| **Biomechanical** | 2014 (Dupps & Roberts) | Stress cascade redistribution in the presence of an artificially ultra-rigid material. | Unveils the mystery of long-term structural stabilization of the degenerative cornea (primary ectasia). | Being a complex 3D vector dynamics, it proved clinically cumbersome and impractical for trivial nomograms. |
| **Vector Decomposition** | Present (AVBC) | Pragmatic decomposition of hybrid mechanics into three forces: Displacement (VR), Traction (VT), and Torque (Vτ). | Maps the surgeon's clinical desire (Flatten, Regularize, Rotate) to ring selection in a one-to-one manner. | Requires mental transition from fixed empirical nomograms (old school) to computational planning based on actual shape. |

### 2.3.3 The Perspective of Volume vs. Direct Action on Fibers

The finite element modeling (FEM) literature enshrines a fundamental biomechanical debate: does the ICRS alter corneal shape through **volume addition/displacement** (a purely geometric and space-occupying mechanism) or through **direct mechanical action on the structural properties of collagen fibers**?

Numerical studies and consolidated AVBC data provide an unequivocal answer: **the ring acts predominantly through physical volume displacement (spacer effect), and not by actively altering or recruiting central stromal fibers.**

This dominance of the volumetric effect rests on three mechanical pillars:

1. **Stromal Incompressibility:** The corneal stroma is composed of approximately 78% water, behaving as a nearly perfectly incompressible medium. By introducing the ICRS volume (0.5 to 1.5 mm³) into a stromal channel, the surrounding tissue is forced to displace radially to accommodate this physical intrusion. This "wedge effect" pulls the adjacent central cornea, shortening its free span and forcing flattening.
2. **Absence of Global Fibrillar Reinforcement:** The PMMA implant does not increase the intrinsic stiffness (k₁) of the central corneal collagen fibers (the fibers retain their unaltered biology and properties). The ring functions as a purely geometric peripheral constraint. The central cornea flattens passively to reach a new geometric equilibrium under the same IOP, but its material properties and intrinsic stress in its stromal fibers remain unchanged.
3. **Sensitivity Mapping:** This perspective perfectly explains why varying ring thickness (which linearly increases its volume) produces a proportional and direct flattening effect (VR), whereas isolated variation of central HGO fiber elastic parameters (k₁ and k₂) under healthy matrix does not alter flattening. The ICRS is, by definition, a **volumetric geometric modifier of the shell** and not a structural reinforcement of its longitudinal fibers.

---

## 2.4 The ICRS Paradox: Why Partial Arcs Do Not Flatten

### The Counterintuitive Discovery

Perhaps the most revealing discovery from our pure Finite Element (FEM) simulations is what we call the **ICRS Paradox**: when we apply the ring *only as a mechanical constraint* (a kinematic block that prevents stromal expansion, ignoring the volume added by the implant), partial and full arc segments actually **increase** apical displacement (protrusion) and **steepen** the cornea, compared to the unconstrained baseline.

**Table 2.2.** Apical displacement (uz) and Simulated Curvature (K-mean) as a function of arc mechanical constraint (pure kinematic constraint simulation under 15 mmHg IOP, without Volumetric Effect).

| Configuration | Arc (°) | Apex Displacement (μm) | K-mean (D) | Change vs. baseline (D) |
|--------------|---------|-------------|-------------|-------------------| 
| Baseline (Ectasia) | — | 549.0 | 60.11 | — |
| Arc 160° | 160 | 555.4 | 60.36 | +0.25 |
| Arc 210° | 210 | 557.6 | 60.44 | +0.34 |
| Arc 320° | 320 | 563.6 | 60.68 | +0.57 |
| Arc 360° | 360 | 565.6 | 60.75 | +0.64 |

This result appears to directly contradict daily clinical experience — ophthalmic surgeons observe massive flattening (frequently exceeding 4 Diopters) after implantation of a 320° ring, not steepening. But it is precisely this paradox that reveals the ingenuity and true mechanical nature of ICRS.

### Proof of the Volumetric School

The ICRS, in strictly constrictive models (such as Colin's tensor), restricts radial expansion at a given circumference. Since continuous IOP pushes the endothelium uniformly from inside out, fixing an inextensible "rigid boundary" forces all that stress and displacement to concentrate in the free central area.

The result of pure mechanical constraint is that the cornea is funneled. The central area, unable to dilate its lateral bases, protrudes further forward (displacement rises from 549 to 565 μm at 360°) and becomes more pointed and steeper (steepening from 60.1 to 60.7 D).

If mechanical constraint *steepens* the cornea, how do we explain clinical flattening? **Through Barraquer's Volumetric School, mathematically proven by Kling and Marcos.**

The drastic flattening we see in myopic clinical practice with 320° rings is due *almost exclusively* to the massive volumetric spacer effect of the PMMA implant (and not merely to elastic restriction). When we insert the plastic, the physical volume of the ring separates the lamellae and pushes the mid-periphery upward. By elevating the slopes of the cornea, the center of the tent is "stretched," forcing a flattening of the relative central curvature.

### Clinical Implication: The Separation of Effects

This biomechanical finding has a transformative clinical implication: **ICRS do not flatten the cornea by blocking apical displacement (since isolated constraint increases that bulging). They flatten the cornea through peripheral volume addition, while redistributing stress through their rigid arc.** The clinical ΔK that the refractive surgeon observes comes from the local volume relationship and surface modeling (Vertical Vector).

This is why traditional simulations and nomograms focused solely on pure stress laws fail in ectasia. Understanding that myopic correction depends intimately on volumetric capacity (Thickness) and irregular astigmatism correction depends on asymmetric stress redistribution (Arc) is the genesis of Vector Decomposition.

---

## 2.5 The Three-Vector Decomposition: VR, VT, Vτ

### The Need for a Decomposition

The preceding analysis reveals that the ICRS effect is not a single phenomenon but rather a composite of multiple mechanisms, each with different sensitivities to ring parameters. To make this complexity tractable for clinical decision-making, we propose decomposing the ICRS effect into three independent **biomechanical vectors**:

### VR — The Radial Vector

**Definition:** VR is the radial component of the displacement field induced by the ICRS.

```
VR(r, θ) = Δuᵣ = [ux·cos(θ) + uy·sin(θ)]_final − [ux·cos(θ) + uy·sin(θ)]_initial
```

**Clinical correlation:** VR controls corneal flattening (ΔK) derived from the volumetric spacer effect. A larger VR corresponds to greater central flattening.

**Ring parameter:** VR is fundamentally modulated by the **total volume of the implanted ring**. This volume depends critically on two factors: **ring thickness** (which dictates the transverse elevation) and **arc length** (which dictates the extent of volumetric support along the circumference). Clinically, a 320° arc with 300 μm thickness injects much more volume into the stroma than a 90° arc with the same thickness, therefore producing significantly greater flattening (VR). This is the mathematical essence of the Volumetric School: myopic reduction scales with volume.

### VT — The Tangential Vector

**Definition:** VT is the change in tangential stress (hoop stress) induced by the ICRS.

```
VT(r, θ) = Δσ_θθ = [σ_θθ]_final − [σ_θθ]_initial
```

where σ_θθ is obtained by tensorial transformation of the Cartesian Cauchy stress.

**Clinical correlation:** VT controls astigmatism regularization (ΔCyl). A more uniform σ_θθ distribution corresponds to more regular astigmatism.

**Ring parameter:** VT is primarily modulated by **arc length**. Our FEM data show a monotonic decrease: VT falls from 7.78 kPa (baseline) to 7.20 kPa (320° arc), following the empirical relationship:

```
VT(arc°) = −0.0018 × arc° + 7.79    (R² = 0.94)
```

Each additional degree of arc reduces global tangential stress by 0.0018 kPa. This monotonicity provides a quantitative guide for arc length selection.

### Vτ — The Torque Vector

**Definition:** Vτ is the torque (moment) generated by the asymmetric geometry of the ring.

```
Vτ = ∫_arc (ΔF⊥ × r) dθ
```

**Clinical correlation:** Vτ controls apex repositioning. An asymmetric ring (progressive thickness) generates unequal forces at its ends, producing a force couple that directs the cone apex in a preferential direction.

**Ring parameter:** Vτ is modulated by the **ring asymmetry** — the thickness difference between the two ends of the segment. For symmetric rings, Vτ = 0 (confirmed in all 28 symmetric simulations, with non-zero Vτ verified in the 6 asymmetric progressive simulations).

### Why Three Vectors?

The choice of three vectors is not arbitrary. It reflects the three independent *clinical* outcomes that surgeons seek with ICRS:

1. **Flattening** (reduce K-steep) → VR
2. **Regularization** (reduce irregular astigmatism) → VT
3. **Apex repositioning** (reduce coma, centralize optics) → Vτ

Each outcome is controlled by a different ring parameter: thickness, arc length, and asymmetry, respectively. This one-to-one mapping — clinical objective to ring parameter, mediated by a biomechanical vector — is what makes the AVBC framework clinically applicable.

### The Analogy with Alpins

The structural parallel with Alpins' astigmatism analysis is deliberate. Alpins decomposed the astigmatic effect of refractive surgery into three vectors: TIA (target), SIA (induced), and DV (difference vector). This decomposition enabled standardized planning, objective outcome assessment, and surgeon calibration. AVBC does the same for ICRS, but the underlying algebra is more complex because the biomechanical domain is three-dimensional and involves displacement and stress fields, not merely a two-dimensional polar representation of astigmatism.

The parallel is **structural**, not algebraic: both frameworks decompose a surgical effect into independently controllable components, each with a planned and an induced value, enabling quantitative comparison and feedback.

---

## 2.6 Which Mechanism Dominates?

The critical clinical question is: **for a given patient, which of the three mechanisms should be prioritized?**

FEM data provide clear guidance:

| Clinical Need | Dominant Vector | Ring Parameter | FEM Evidence |
|--------------|----------------|---------------|--------------|
| Flatten (reduce K) | **VR** | Thickness ↑ | VR insensitive to arc (19.2–19.9 μm for 90°–320°); thickness is the modulator |
| Regularize (reduce Cyl) | **VT** | Arc length ↑ | VT decreases monotonically: −0.0018 kPa/degree (R² = 0.94) |
| Reposition apex | **Vτ** | Asymmetry ↑ | Vτ = 0 for symmetric; >0 for asymmetric (García de Oteyza, 2021) |
| Stabilize (halt ectasia) | VR + VT | Combined | CXL first, then ICRS |

The fundamental insight is that **the surgeon controls which mechanism dominates** by selecting ring parameters. A thick ring with a short arc maximizes VR (flattening) while minimizing VT (regularization). A thin ring with a long arc does the opposite. An asymmetric ring activates Vτ. This decoupling of the three mechanisms is what makes mechanistic planning possible — and what nomograms, by their very nature, cannot capture.

---

## 2.7 The Role of Depth

Implantation depth — typically specified as a percentage of local pachymetry (60–80%) — functions as a **universal amplifier** of all three vectors. Deeper positioning places the ring closer to the endothelial surface, where the lever arm relative to the corneal mid-surface is greater, amplifying the mechanical effect.

Our patient-specific FEM models provide quantitative support for the amplifying role of the cornea's structural context. Patients with thinner corneas — where the ICRS occupies a relatively larger fraction of the total thickness — show greater biomechanical responsiveness:

| Pachymetry Range | Mean |Δuz| (μm) | N |
|-----------------|------|---|
| < 430 μm (thin) | **34.1 ± 1.0** | 2 |
| 430–500 μm (medium) | **29.3 ± 0.8** | 4 |
| > 500 μm (thick) | **28.5 ± 0.2** | 2 |

Thinner corneas show approximately 20% greater displacement difference than thicker corneas for the same ring specification. This is consistent with clinical experience — thinner corneas are more responsive to ICRS — and supports the role of depth (and the relative ring proportion) as a critical planning variable.

The clinical guidance is: depth is not merely a safety parameter (avoiding perforation); it is a **dose modulator** for all three biomechanical vectors.

---

## 2.8 Summary

- The ICRS mechanism of action is not a single phenomenon but rather a **composite of three mechanisms**: radial displacement (VR), tangential stress redistribution (VT), and asymmetric torque (Vτ).
- **Barraquer's arc-shortening principle** explains part of the flattening effect but cannot explain regularization or apex repositioning.
- The **volume displacement** mechanism (Kling & Marcos) and the **stress redistribution** perspective (Dupps & Roberts) provide more complete explanations consistent with FEM data.
- The **ICRS paradox** — partial arcs increase apical displacement while only the complete ring decreases it — reveals that partial arcs work by redistributing stress, not by directly flattening.
- The **three-vector decomposition** (VR/VT/Vτ) provides a language for understanding which mechanism dominates for a given ring configuration and clinical need.
- Each vector is modulated by a different ring parameter: **thickness** (VR), **arc length** (VT), **asymmetry** (Vτ).
- **Depth** acts as a universal amplifier of all three vectors.
- This mechanistic understanding forms the basis for the AVBC planning framework — a system that prescribes ring parameters based on *which mechanism the cornea needs*, not on empirical correlation.

---

## References

1. Barraquer JI. Modification of refraction by means of intracorneal inclusions. *Int Ophthalmol Clin*. 1966;6(1):53–78.
2. Barraquer JI. Basis of refractive keratoplasty - 1967. *Revue Med (Bogota)*. 1967;33(1). [PMID: 2488804]
3. Burris TE, Ayer CT, Evensen DA, et al. Effects of intrastromal corneal ring size and thickness on corneal flattening in human eyes. *Refract Corneal Surg*. 1991;7(1):46–50.
4. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
5. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998. [PMID: 24774009]
6. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
7. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61:1–48.
8. Kling S, Marcos S. Finite-element modeling of intrastromal corneal-ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889. [PMID: 23299471]
9. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
10. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff. *Front Bioeng Biotechnol*. 2018;6:210.
11. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
12. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
13. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
