<!-- GPT revision applied -->
# Chapter 6 — VT: The Tangential Vector — Belting Mechanics and Regularization


> **Key Points**
> - **VT** is the tangential stress vector: it quantifies astigmatism regularization (ΔCyl).
> - VT follows a **monotonically decreasing linear** relationship with arc length: VT = −0.0018 × arc° + 7.79.
> - The R² of 0.94 confirms a robust and predictable relationship.
> - Longer arcs produce greater tangential stress redistribution (hoop restriction).
> - Clinical analogue: VT corresponds to cylinder reduction and surface regularization.

---

## 6.1 Introduction

While the radial vector VR (Chapter 5) governs the net reduction of spherical optical power (flattening, ΔK) through volume introduction, it does not address the spatial asymmetry that characterizes keratoconus. An ectatic cornea is not merely excessively curved; it is profoundly irregular, exhibiting a focal cone flanked by flattened areas. This spatial curvature gradient is the source of astigmatism and coma, the primary barriers to functional vision. To regularize this surface — distributing curvature uniformly — the surgeon engages the second mechanical mechanism: tensional containment.

![Figure 6.1 — VT Vector: circumferential hooping mechanism (hoop restriction).](book_figures/fig_06_01_cintagem.svg)


The biomechanical vector responsible for this containment is VT, the tangential vector. Under the new biomechanical paradigm, VT is defined as the **Belting Effect (Hoop Restriction)**. Unlike VR, which is driven by the *volume* of the implant, VT is driven exclusively by **circumferential coverage** (arc length).

The rigid acrylic acts as an inextensible splint along its arc. The longer the ring, the greater the percentage of the stromal circumference that becomes "blocked" (prevented from distending under intraocular pressure). Recalibrated simulations from our model reveal that the radial displacement along the implant channel (δ_ring) falls linearly and monotonically with increasing arc. This mechanical restriction "forces" the cornea to assume a more spherical and regular shape.

The orthogonality between VR (controlled predominantly by thickness and volume) and VT (controlled predominantly by arc length) forms the foundation of the Corneal Biomechanical Vector Analysis (AVBC).

---

## 6.2 The Belting Mechanism (Hoop Restriction)

### 6.2.1 The Cornea as a Pressurized Membrane

![Figure 6.2 — VT Vector: linear regression δ_ring vs arc length (R² > 0.99).](book_figures/fig_06_02_regressao_vt.svg)


The intact cornea resists Intraocular Pressure (IOP) by distributing stress uniformly across its circumferential collagen fibrils, particularly at the limbal ring (Meek & Knupp, 2015). In keratoconus, localized weakening disrupts this symmetry. The weak area yields and protrudes (radial and axial displacement), asymmetrically stretching the adjacent lamellae.

When an ICRS segment (rigid PMMA) is inserted, its inflexibility inhibits any distension in the immediately adjacent stroma. Since radial deformation along the PMMA arc is forced to zero, the free portion of the cornea (where there is no ring) must absorb the remaining deformation.

### 6.2.2 Extraction of the VT Vector (δ_ring)

To mathematically quantify this restriction effect, the model extracts the parameter δ_ring — the average radial displacement along the 360° ring of the implant zone (radius = 2.5 mm).
1. In a normal eye without a ring, the deformation δ_ring under IOP is maximal (baseline).
2. Where the PMMA ICRS resides, the local δ_ring is 0 (incompressible in the XY axis).
3. As the arc increases, the percentage of δ_ring = 0 increases, linearly reducing the circumferential average.

The lower the global δ_ring, the greater the restrictive belting force pushing the cornea back to a regular shape. VT is directly inversely proportional to this displacement: **More containment = Greater Tangential Vector effect.**

---

## 6.3 FEM Results: The Perfect Linear Regression

The new FEBio parametric campaign, correctly simulating volume imposition and XY-axis containment, produced strikingly linear results.

**Table 7.1.** Average circumferential displacement along the implant zone (δ_ring) as a function of arc.
| Configuration | Arc (°) | δ_ring (μm) | % Restriction vs. baseline |
|--------------|---------|-------------|----------------------------|
| No ring | 0° | 37.38 | 0.0% |
| Short arc | 90° | 29.31 | 21.6% |
| Medium arc | 160° | 22.38 | 40.1% |
| Long arc | 210° | 17.54 | 53.1% |
| Extra-long arc | 255° | 12.25 | 67.2% |
| Near-complete | 320° | 4.50 | 88.0% |
| Complete ring | 360° | 0.00 | 100.0% |

Each additional degree of PMMA ring linearly restricts deformation, forcing the perimetral stroma to maintain a rigid circular posture. The coefficient of variation is minuscule, proving that the containment is purely geometric in the 2D plane.

The fundamental VT equation (where VT reflects the containment Δδ_ring) follows linear regression:
**Restriction** ∝ **Arc** (R² > 0.99).

---

## 6.4 VT Modulating Factors

### 6.4.1 Thickness Decoupling

The revolutionary finding of AVBC and this modeling is that VT (circumferential astigmatic restriction) is **decoupled from ring thickness**.

While thickness injection massively drives VR (vertical myopic flattening, Chapter 5), XY containment is almost indifferent to the volume inserted along the Z axis. The containment exists by the mere physical presence of the acrylic preventing the corneal canvas from sliding horizontally.
This means that a 320° segment with 150 μm (thin) will regularize the surface almost exactly the same way as a 320° segment with 300 μm (thick). However, the 300 μm segment will inflict a dramatic VR.

### 6.4.2 Asymmetries and Combined Vectors

In clinical practice, using a 360° or 320° ring restricts the cornea so strongly that, while treating diffuse astigmatism, it blocks the local flattening effect and is unable to redistribute deformation if the cone is very eccentric.
When topography demands smoothing of "only half" of the cornea (e.g., paracentral croissant phenotype), the surgeon prescribes 160° or 210° rings on the steepest meridian. These block stretching in the inferior half, forcing the superior cornea to balance the gradient.

---

## 6.5 Clinical Implications in Planning (Cylinder vs. Myopia)

With the AVBC model now firmly supported by the volumetric proof of VR and the elastic proof of VT, planning transitions from empirical to a methodical orthogonal two-step process:

1. **Step 1: Define Regularization (VT).**
 - What is the magnitude of irregular astigmatism (Cylinder / Coma)?
 - *If low (< 2.0 D)*: A short arc of 90° to 120° restricts very little of the periphery, leaving the dome symmetric.
 - *If high (> 4.0 D)*: Very long arcs (210° to 320°) apply massive ironclad restriction (δ_ring < 10 μm), crushing the comatic asymmetry.

2. **Step 2: Define Flattening (VR).**
 - What is the magnitude of the spherical error / target myopic K-mean?
 - *If high refraction is needed*: Select extreme thicknesses (300 μm, 350 μm), regardless of the arc chosen in Step 1.
 - *If K-max is low*: Select thin thicknesses (150 μm), so that the long arc sculpts the cornea without inducing hypermetropia.

This total dissociation — Arc controls regularization (VT); Thickness controls central Flattening (VR) — is the "Rosetta Stone" that demystifies centuries of nomogram confusion.

---

## 6.6 Summary

1. The tangential vector (VT) governs the reduction of irregularity (Astigmatism and Coma).
2. It operates by imposing a "Limbal Belting" (Hoop Restriction) on the stroma, physically preventing eccentric peripheral distension of the cornea under pressure.
3. Our analysis demonstrates a near-perfect, inversely linear mathematical correlation between Arc Length and the cornea's ability to deform (R² > 0.99).
4. Crucially, VT is independent of ring thickness.
5. Surgically, the surgeon "buys" astigmatic correction by extending the arc and "buys" myopia/K-max reduction by injecting greater thicknesses.

---

---

## Didactic Summary

- **VT** (tangential vector) quantifies the hoop stress redistribution that regularizes the corneal surface.
- VT follows a **linear, monotonic** relationship with arc length: VT = −0.0018 × arc° + 7.79 (R² = 0.94).
- Longer arcs produce greater regularization — the ring acts as a circumferential "belt."
- FEM-derived VT values range from 7.20 kPa (320°) to 7.78 kPa (90°).
- Clinical application: increase arc length to reduce irregular astigmatism and cylinder.

---

## References

1. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
2. Alió JL, Shabayek MH, Belda JI. Semifluorinated KeraRing segments for keratoconus. *J Refract Surg*. 2006;22(2):149–157.
3. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
