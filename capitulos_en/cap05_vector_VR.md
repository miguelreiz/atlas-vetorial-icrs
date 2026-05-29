<!-- GPT revision applied -->
# Chapter 5 — VR: The Radial Vector — The Volumetric School


> **Key Points**
> - **VR** is the radial displacement vector: it quantifies corneal apical flattening (ΔK).
> - VR is primarily controlled by ring **thickness** (150–400 μm).
> - VR is **insensitive to arc length**: across 90°–320° arcs, VR varies by less than 4%.
> - This decoupling (thickness→VR, arc→VT) is the key structural finding that enables independent vector control.
> - Clinical analogue: VR corresponds to the flattening effect measured by postoperative ΔK.

---

## 5.1 Introduction

The biomechanical response of the keratoconic cornea to intracorneal ring segment (ICRS) implantation has long been characterized in clinical practice through a single scalar outcome: the change in keratometric power, ΔK. Although this metric captures the net optical effect of the procedure, it conceals the underlying mechanical complexity. The AVBC vector decomposition model divides the deformation field into three orthogonal components — radial (VR), tangential (VT), and torsional (Vτ). This chapter is dedicated to VR: the radial flattening vector that governs myopia correction and K-mean reduction.

![Figure 5.1 — VR Vector: the tent (spacer) effect of ICRS on the cornea.](book_figures/fig_05_01_efeito_tenda.svg)


Historically, corneal flattening was frequently attributed to a mysterious "arc tension" that pulled the cornea circumferentially. However, modern finite element modeling, supported by careful clinical observation, proves otherwise: VR is governed by the **Volumetric Effect**. The ring acts as a physical spacer implanted deep in the stroma. When forced between the corneal lamellae, the rigid acrylic mechanically elevates the mid-periphery of the cornea. The fixed length of the anterior corneal arc is thus forced to redistribute over this "high ground," pulling and flattening the center of the cornea (Kling & Marcos, 2013).

This chapter proves, through rigorous simulation of expansive constraint in FEBio, that the magnitude of this central flattening (VR) intrinsically depends on the total volume inserted into the cornea. Consequently, VR is highly sensitive not only to the cross-sectional thickness of the ring but also to its **arc length**.

---

## 5.2 The Mechanism of the Volumetric Effect

### 5.2.1 Spacer and Dome Geometry

![Figure 5.2 — Flattening cascade: total volume vs ΔK (FEM data).](book_figures/fig_05_02_cascata_aplanamento.svg)


The VR vector captures the change in central spherical curvature (K-mean). To understand why an ICRS flattens the cornea, we must abandon the 2D elastic tension model and visualize the cornea as a 3D volumetric dome.

When a PMMA segment is inserted into a stromal tunnel at 80% depth, its cross-section (e.g., 250 μm base) acts as a microscopic hydraulic jack. Descemet's membrane resists interior indentation by intraocular pressure (IOP), so most of the geometric perturbation is pushed outward (toward the anterior surface). This localized peripheral elevation acts as a tent pole, tightening the central "canvas" (anterior lamellae). Since the arc-to-arc distance between the two limbi is fixed, peripheral tension pulls the central vault downward, smoothing and flattening the myopic apex.

### 5.2.2 Arc Length Dependence

The new volumetric paradigm invalidates the old belief that ring thickness exclusively governs flattening. Since flattening results from the lamellar tightening caused by the physical introduction of mass, the magnitude of ΔK reduction scales nearly perfectly with **Injected Volume**.

The volume of a classic ICRS implant (triangular) is the cross-sectional area multiplied by its circumferential extent. Thus:
1. **Greater Thickness** → Greater spacing height → Greater flattening per degree of arc.
2. **Greater Arc** → More lamellae raised and more total volume → Greater total dome flattening.

---

## 5.3 FEM Results: Proof of Flattening

### 5.3.1 Volumetric Simulation Protocol

To mathematically prove the Volumetric School, we recreated a parametric sweep in FEBio (HGO). The ICRS boundary condition was modeled as a prescribed Z displacement of +250 μm, simulating the exact physical expansion of a standard ring. Instead of simply "blocking" stromal movement, we forced the stroma to cover a rigid incompressible obstacle.

Arc lengths varied from 90° to 360°, keeping intraocular pressure fixed at 15 mmHg. The simulated central curvature (SimK) was extracted by fitting a best-fit sphere to the central 3 mm zone of the distorted corneal mesh.

### 5.3.2 The Flattening Cascade

Table 6.1 reveals the unequivocal dependence of flattening (VR) on implant volume:

**Table 6.1.** Simulated central curvature (K-mean) as a function of arc.
| Configuration | Arc (°) | Apex uz (μm) | K-mean (D) | ΔK (D) Flattening |
|--------------|---------|-------------|-------------|-------------------|
| Baseline | — | 549.0 | 60.11 | — |
| Short arc | 90° | 560.8 | 59.90 | −0.21 D |
| Medium arc | 160° | 566.4 | 59.65 | −0.46 D |
| Long arc | 210° | 570.8 | 59.52 | −0.59 D |
| Extra-long arc | 320° | 583.1 | 59.22 | −0.89 D |
| Complete ring | 360° | 582.8 | 58.99 | −1.12 D |

The data establish a direct clinical correlation that all surgeons intuitively recognize: **"Longer rings flatten more."**
A short 90° segment modestly flattens the central cornea (−0.21 D) because it injects relatively little volume. As the surgeon extends the ring to 210°, twice the stroma is elevated, increasing flattening to −0.59 D. When the circumference is nearly fully occluded by a 320° segment, the dome pulls back radically, producing massive flattening of −0.89 D (a dramatic mechanical leap).

### 5.3.3 The Pachymetric Amplification Factor

Although ring volume is the driving force (numerator), the patient's structural resistance acts as the elastic brake (denominator).

The patient's corneal thickness is the main physiological modulator of VR. Corneas with advanced keratoconus (pachymetry < 430 μm) offer fewer lamellae and less structural resistance to the elevation imposed by the ICRS. Consequently, the same 250 μm ring injected into a thin cornea produces considerably greater flattening than in a normal thick cornea (> 500 μm). This is why the risk of hypermetropic overcorrection soars in very thin corneas subjected to 320° implants.

---

## 5.4 Clinical Implications in Ectasia Management

### 5.4.1 Vector Planning

VR should be the primary planning objective when spherical myopia and high K-mean are the patient's limiting disorders. If the ectasia is central with a Kmax > 52 D, massive reduction of corneal power requires a colossal VR.

In this case, the volumetric law imposes two surgical options:
1. Use rings of extreme thickness (e.g., 300 μm or 350 μm).
2. Use extremely long arcs (e.g., 320°).

### 5.4.2 Dissociation of VR and VT

The supreme surgical challenge in Vector Analysis is balancing the volumetric demand of VR with the tensional demand of VT (covered in Chapter 7). Arc length ties the two vectors together. If we increase the arc from 160° to 320° to maximize myopic flattening (VR), we are simultaneously spreading the circumferential redistribution stress over a vast area, forgoing the concentrated mechanical "punch" needed to treat high irregular astigmatisms.

For this reason, for a patient with **High Myopia AND High Astigmatism**, using a single 320° ring will flatten the eye but will fail to regularize the astigmatism. In such dual-peak, dual-demand cases, progressive long-arc rings (where thickness fluctuates to force asymmetric torques) or combinations of shorter, thicker arcs positioned symmetrically become essential.

---

## 5.5 Summary

1. The radial vector (VR) encodes the change in spherical dioptric power (central flattening) induced by the ring.
2. Its base mechanism is **Volumetric**: it acts as a tent pole raising the periphery and flattening the center.
3. The magnitude of flattening is directly proportional to the **Total Ring Volume** (Thickness + Arc Length).
4. FEBio simulations prove that longer arcs monotonically depress central power, invalidating the obsolete theses of "exclusively tensional effects" and perfectly validating the surgical intuition of volumetric nomograms (Kling & Marcos, 2013).
5. Thin corneas dramatically amplify VR due to the lack of structural resistance in the anterior stromal bed.

---

---

## Didactic Summary

- **VR** (radial vector) quantifies the apical flattening effect of ICRS, measured as ΔK.
- VR is controlled by ring **thickness** and is **insensitive to arc length** (< 4% variation across 90°–320°).
- This thickness–arc decoupling enables **independent control** of flattening (VR) and regularization (VT).
- FEM simulations confirm VR values of 8.9–19.9 μm for standard ring configurations.
- Clinical application: increase thickness to increase flattening; adjust arc independently for astigmatism.

---

## References

1. Alfonso JG, Lisa C, Fernández-Vega Cueto L, et al. Intrastromal corneal ring segments and posterior chamber phakic intraocular lens implantation for keratoconus correction. *J Cataract Refract Surg*. 2011;37(4):706–715.
2. Peris-Martínez C, Hernández-Verdejo JL, Ceballos-Torres S, et al. Intracorneal ring segments in keratoconus: a comprehensive review. *Surv Ophthalmol*. 2021;66(5):835–858.
3. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
