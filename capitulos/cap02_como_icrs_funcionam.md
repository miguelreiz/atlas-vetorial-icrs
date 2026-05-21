# Chapter 2 — How ICRS Work: From Volume Displacement to Vector Decomposition

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part I — Foundations*

---

## 2.1 Introduction

Intracorneal ring segments have been implanted for more than twenty-five years, with an estimated half-million procedures performed worldwide since the first Intacs implantation in 1999 (Burris et al., 1998; Colin et al., 2000). Despite this extensive clinical experience, the mechanism of action of ICRS remains a subject of ongoing debate. How, precisely, does a small arc of polymethylmethacrylate (PMMA) embedded in the corneal stroma produce changes in corneal curvature, astigmatism, and higher-order aberrations?

Three conceptual frameworks have been proposed: the **geometric school** (Barraquer, 1964), which attributes the effect to arc-shortening; the **volumetric school** (Kling & Marcos, 2013), which emphasizes volume displacement; and the **biomechanical school** (Dupps & Roberts, 2014), which focuses on stress redistribution. Each framework captures part of the truth, but none provides a complete account of the observed clinical effects.

This chapter critically reviews these three perspectives and synthesizes them into a unified framework — the **three-vector decomposition** — in which the ICRS effect is resolved into three independent biomechanical mechanisms: radial displacement (VR), tangential stress redistribution (VT), and asymmetric torque (Vτ). This decomposition, validated by 34 finite element simulations presented in Chapter 10, forms the mechanistic foundation for the AVBC planning framework.

---

## 2.2 The Barraquer Arc-Shortening Principle

### The Original Concept

The intellectual foundation for ICRS traces to José I. Barraquer, who proposed in 1964 that inserting material into the corneal stroma could modify its curvature through the **arc-shortening principle** (Barraquer, 1964). The concept is geometric: for a circular arc of fixed chord length, shortening the arc increases the radius of curvature. Conversely, lengthening the arc (by inserting material) should steepen the curve — but if the material is placed in the *peripheral* cornea, the resulting geometric redistribution flattens the *central* cornea.

Barraquer formulated his law of thickness: *"If material is added to the periphery of the cornea or removed from the center, the cornea flattens. If material is removed from the periphery or added to the center, the cornea steepens."* This principle guided the design of both additive procedures (ICRS) and subtractive procedures (LASIK) and remains the most widely cited explanation for ICRS action.

### Mathematical Basis

The mathematical underpinning is straightforward. Consider a circular arc of radius R and arc length s, subtending an angle 2α at the center of curvature. The chord length is L = 2R sin(α). If the arc length is shortened (s → s − Δs), then for constant chord length L, the radius must increase (R → R + ΔR), and the surface curvature κ = 1/R decreases — the surface flattens. For the cornea, this translates to a reduction in keratometric power: ΔK ≈ −(n−1)/R² × ΔR, where n = 1.3375.

### Limitations

The arc-shortening model is appealing in its simplicity but incomplete in several respects:

1. **It explains flattening but not astigmatism regularization.** Many patients experience significant reduction in cylinder and higher-order aberrations after ICRS — effects that cannot be explained by a simple arc-length change.

2. **It does not account for apex repositioning.** In keratoconus, the cone apex is often displaced from the visual axis, and asymmetric ICRS configurations can migrate the apex — a mechanism outside the scope of arc-shortening.

3. **The "artificial limbus" concept has been refuted.** An extension of the arc-shortening model proposed that the ICRS creates a functional limbus — a circumferential stiffening barrier that mimics the natural limbal annulus. However, FEM analyses have demonstrated that partial-arc ICRS do not create global stiffening; they create local constraints with paradoxical effects on apical displacement (see Section 2.4).

---

## 2.3 Volume Displacement and Stress Redistribution

### The Kling and Marcos FEM Study

A more rigorous mechanistic account emerged from the finite element work of Kling and Marcos (2013), who modeled ICRS implantation in a hyperelastic cornea and analyzed the resulting displacement and stress fields. Their key conclusion was that the dominant mechanism is **volume displacement** — the physical space occupied by the ring segment displaces the surrounding stroma radially, changing the local curvature. The arc-shortening contribution was present but secondary.

The volume displacement mechanism operates as follows: The ICRS occupies a finite volume within the stroma (typically 0.5–1.5 mm³ depending on dimensions). This volume cannot be compressed into the surrounding tissue (the stroma is nearly incompressible); instead, the tissue must accommodate the implant by displacing radially. The displacement is greatest adjacent to the ring and attenuates with distance, producing a characteristic curvature change — flattening centrally and steepening at the ring position.

### Stress Redistribution: The Dupps Perspective

Dupps and Roberts (2014) emphasized a complementary mechanism: **stress redistribution**. The ICRS, being far stiffer than the surrounding stroma (PMMA modulus ~3 GPa vs stroma ~0.2 MPa), acts as a rigid constraint within a deformable shell under pressure. This constraint forces the IOP-driven stress field to redistribute — stress that would normally be distributed relatively uniformly along the collagen network is now concentrated at and near the ring.

The key insight from this perspective is that the ICRS does not "push" the cornea into a new shape; rather, it **reorganizes the stress distribution**, and the new shape is the equilibrium configuration of the cornea under the modified stress field. This distinction is not merely semantic — it has direct implications for understanding why the clinical effect depends on ring parameters, patient-specific biomechanics, and implantation depth.

Our FEM data confirm this: a baseline cornea under 15 mmHg IOP shows an apical displacement of **360.9 μm**. With a complete circumferential ICRS (360°), this drops to **125.9 μm** — a 65% reduction. The full ring creates a circumferential barrier that resists radial expansion and profoundly alters the stress field. This is not arc-shortening; it is stress redistribution on a global scale.

---

## 2.4 The ICRS Paradox: Why Partial Arcs Do Not Flatten

### The Counterintuitive Finding

Perhaps the most revealing finding from our FEM simulations is what we term the **ICRS paradox**: partial-arc ring segments (90°–320°) actually **increase** apical displacement compared to the unconstrained baseline, while only the full ring (360°) produces the expected reduction.

**Table 2.1.** Apical displacement (uz) as a function of ICRS arc length.

| Configuration | Arc (°) | uz apex (μm) | Change vs baseline |
|--------------|---------|-------------|-------------------|
| Baseline (no ICRS) | — | 360.9 | — |
| ICRS 360° | 360 | 125.9 | **−65%** |
| Arc 90° | 90 | 369.7 | +2% |
| Arc 120° | 120 | 372.3 | +3% |
| Arc 160° | 160 | 375.1 | +4% |
| Arc 210° | 210 | 382.0 | +6% |
| Arc 255° | 255 | 385.0 | +7% |
| Arc 320° | 320 | 390.3 | +8% |

This result seems to contradict clinical experience — surgeons observe flattening after ICRS implantation, not steepening. But the paradox resolves when one recognizes the distinction between **displacement** and **curvature**.

### Physical Explanation

The partial-arc ICRS constrains displacement in only one sector of the corneal circumference. In the constrained sector, the stroma cannot deform radially. The IOP, however, continues to load the entire endothelial surface uniformly. The stress that would normally be distributed across the full circumference is now concentrated in the *unconstrained* sectors, producing increased displacement in those regions — including the apex.

The result is analogous to squeezing a partially inflated balloon at one point: the constrained region stays flat, but the unconstrained region bulges more. The net apical displacement increases because the partial constraint creates an asymmetric stress distribution that drives more deformation centrally.

The full ring (360°) behaves differently because it constrains the entire circumference, creating a complete barrier. There is no unconstrained sector to absorb the redistributed stress. Instead, the ring acts as a rigid annulus, effectively reducing the unsupported span of the cornea from the full diameter to the diameter inside the ring, thereby reducing the effective curvature and apical displacement.

### Clinical Implication

This finding has a profound clinical implication: **partial-arc ICRS do not flatten the cornea by reducing apical displacement. They modify the cornea by redistributing tangential stress.** The clinical ΔK observed after ICRS implantation is a surface curvature effect — a change in the *relationship* between local curvature and the reference best-fit sphere — not a simple displacement reduction.

This is why VT (tangential stress redistribution) is the primary mechanism for partial-arc ICRS, while VR (radial displacement reduction) is relevant only for the full ring. Understanding this distinction is essential for rational ICRS planning.

---

## 2.5 The Three-Vector Decomposition: VR, VT, Vτ

### The Need for a Decomposition

The foregoing analysis reveals that the ICRS effect is not a single phenomenon but a composite of multiple mechanisms, each with different sensitivities to ring parameters. To make this complexity tractable for clinical decision-making, we propose decomposing the ICRS effect into three independent **biomechanical vectors**:

### VR — The Radial Vector

**Definition:** VR is the radial component of the displacement field induced by the ICRS.

```
VR(r, θ) = Δuᵣ = [ux·cos(θ) + uy·sin(θ)]_final − [ux·cos(θ) + uy·sin(θ)]_initial
```

**Clinical correlate:** VR controls corneal flattening (ΔK). A larger VR at the central zone corresponds to more flattening.

**Ring parameter:** VR is modulated primarily by **ring thickness** (volume displacement mechanism). Our FEM data demonstrate that VR central is insensitive to arc length: it remains at 19.2–19.9 μm across all partial arcs (90°–320°), varying by less than 4%. Only the full ring (360°) reduces VR to 8.89 μm. This decoupling — VR from arc length — is a key finding.

### VT — The Tangential Vector

**Definition:** VT is the change in tangential (hoop) stress induced by the ICRS.

```
VT(r, θ) = Δσ_θθ = [σ_θθ]_final − [σ_θθ]_initial
```

where σ_θθ is obtained by tensor transformation of the Cartesian Cauchy stress.

**Clinical correlate:** VT controls astigmatism regularization (ΔCyl). A more uniform σ_θθ distribution corresponds to more regular astigmatism.

**Ring parameter:** VT is modulated primarily by **arc length**. Our FEM data show a monotonic decrease: VT drops from 7.78 kPa (baseline) to 7.20 kPa (arc 320°), following the empirical relationship:

```
VT(arc°) = −0.0018 × arc° + 7.79    (R² = 0.94)
```

Each additional degree of arc reduces the global tangential stress by 0.0018 kPa. This monotonicity provides a quantitative guide for arc length selection.

### Vτ — The Torque Vector

**Definition:** Vτ is the torque (moment) generated by asymmetric ring geometry.

```
Vτ = ∫_arc (ΔF⊥ × r) dθ
```

**Clinical correlate:** Vτ controls apex repositioning. An asymmetric ring (progressive thickness) generates unequal forces at its ends, producing a couple that drives the cone apex in a preferential direction.

**Ring parameter:** Vτ is modulated by **ring asymmetry** — the difference in thickness between the two ends of the segment. For symmetric rings, Vτ = 0 (confirmed in all 28 symmetric simulations, with non-zero Vτ verified across 6 asymmetric progressive simulations).

### Why Three Vectors?

The choice of three vectors is not arbitrary. It reflects the three independent *clinical* outcomes that surgeons seek from ICRS:

1. **Flattening** (reduce K-steep) → VR
2. **Regularization** (reduce irregular astigmatism) → VT
3. **Apex repositioning** (reduce coma, center optics) → Vτ

Each outcome is controlled by a different ring parameter: thickness, arc length, and asymmetry, respectively. This one-to-one mapping — clinical goal to ring parameter, mediated by a biomechanical vector — is what makes the AVBC framework clinically actionable.

### The Analogy to Alpins

The structural parallel to the Alpins astigmatism analysis is deliberate. Alpins decomposed the astigmatic effect of refractive surgery into three vectors: TIA (target), SIA (induced), and DV (error). This decomposition enabled standardized planning, objective outcome assessment, and surgeon calibration. The AVBC does the same for ICRS, but the underlying algebra is more complex because the biomechanical domain is three-dimensional and involves both displacement and stress fields, not just a two-dimensional polar representation of astigmatism.

The parallel is **structural**, not algebraic: both frameworks decompose a surgical effect into independently controllable components, each with a planned and an induced value, enabling quantitative comparison and feedback.

---

## 2.6 Which Mechanism Dominates?

The critical clinical question is: **for a given patient, which of the three mechanisms should be prioritized?**

The FEM data provide clear guidance:

| Clinical Need | Dominant Vector | Ring Parameter | FEM Evidence |
|--------------|----------------|---------------|--------------|
| Flatten (reduce K) | **VR** | Thickness ↑ | VR insensitive to arc (19.2–19.9 μm for 90°–320°); thickness is the modulator |
| Regularize (reduce Cyl) | **VT** | Arc length ↑ | VT decreases monotonically: −0.0018 kPa/degree (R² = 0.94) |
| Reposition apex | **Vτ** | Asymmetry ↑ | Vτ = 0 for symmetric; >0 for asymmetric (García de Oteyza, 2021) |
| Stabilize (halt ectasia) | VR + VT | Combined | CXL first, then ICRS |

The fundamental insight is that **the surgeon controls which mechanism dominates** by selecting ring parameters. A thick ring with a short arc maximizes VR (flattening) while minimizing VT (regularization). A thin ring with a long arc does the opposite. An asymmetric ring activates Vτ. This decoupling of the three mechanisms is what makes mechanistic planning possible — and what nomograms, by their nature, cannot capture.

---

## 2.7 The Role of Depth

Implantation depth — typically specified as a percentage of local pachymetry (60–80%) — functions as a **universal amplifier** of all three vectors. Deeper placement positions the ring closer to the endothelial surface, where the lever arm relative to the corneal mid-surface is greater, amplifying the mechanical effect.

Our patient-specific FEM models provide quantitative support for the amplifying role of the cornea's structural context. Patients with thinner corneas — where the ICRS occupies a relatively larger fraction of the total thickness — show greater biomechanical responsiveness:

| Pachymetry Range | Mean |Δuz| (μm) | N |
|-----------------|------|---|
| < 430 μm (thin) | **34.1 ± 1.0** | 2 |
| 430–500 μm (medium) | **29.3 ± 0.8** | 4 |
| > 500 μm (thick) | **28.5 ± 0.2** | 2 |

Thinner corneas show approximately 20% greater displacement differential than thicker corneas for the same ring specification. This is consistent with clinical experience — thinner corneas are more responsive to ICRS — and supports the role of depth (and relative ring proportion) as a critical planning variable.

The clinical guidance is: depth is not just a safety parameter (avoiding perforation); it is a **dose modulator** for all three biomechanical vectors.

---

## 2.8 Summary

- The ICRS mechanism of action is not a single phenomenon but a **composite of three mechanisms**: radial displacement (VR), tangential stress redistribution (VT), and asymmetric torque (Vτ).
- The Barraquer **arc-shortening principle** explains part of the flattening effect but cannot account for regularization or apex repositioning.
- The **volume displacement** mechanism (Kling & Marcos) and **stress redistribution** perspective (Dupps & Roberts) provide more complete explanations that are consistent with FEM data.
- The **ICRS paradox** — partial arcs increase apical displacement while only the full ring decreases it — reveals that partial arcs work by redistributing stress, not by flattening directly.
- The **three-vector decomposition** (VR/VT/Vτ) provides a language for understanding which mechanism dominates for a given ring configuration and clinical need.
- Each vector is modulated by a different ring parameter: **thickness** (VR), **arc length** (VT), **asymmetry** (Vτ).
- **Depth** acts as a universal amplifier of all three vectors.
- This mechanistic understanding forms the foundation for the AVBC planning framework — a system that prescribes ring parameters based on *which mechanism the cornea needs*, not on empirical correlation.

---

## References

1. Barraquer JI. Modification of refraction by means of intracorneal inclusions. *Int Ophthalmol Clin*. 1966;6(1):53–78.
2. Burris TE, Ayer CT, Evensen DA, et al. Effects of intrastromal corneal ring size and thickness on corneal flattening in human eyes. *Refract Corneal Surg*. 1991;7(1):46–50.
3. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
4. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
5. García de Oteyza G, Álvarez de Toledo J, Barraquer RI, et al. Finite element analysis of the biomechanical effects of progressive thickness intracorneal ring segments. *J Cataract Refract Surg*. 2021;47(2):258–265.
6. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61:1–48.
7. Kling S, Marcos S. Finite-element modeling of intracorneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
8. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
9. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff. *Front Bioeng Biotechnol*. 2018;6:210.
10. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
11. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
12. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
