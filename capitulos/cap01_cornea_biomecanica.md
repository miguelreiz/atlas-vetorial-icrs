# Chapter 1 — The Keratoconic Cornea as a Mechanical Structure

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part I — Foundations*

---

## 1.1 Introduction

Keratoconus is the most common corneal ectasia, with prevalence estimates ranging from 1 in 375 in population-based studies to as high as 1 in 84 when modern videokeratographic screening criteria are applied (Godefrooij et al., 2017; Torres Netto et al., 2018). Traditionally, the condition has been defined by its topographic hallmarks — steep keratometry readings, inferior corneal steepening, irregular astigmatism, and progressive thinning — features that place it squarely within the domain of optical geometry. Indeed, the standard clinical workflow for keratoconus diagnosis centers on sagittal curvature maps, keratometric indices, and pachymetric profiles: measurements that describe the *shape* of the cornea but say little about its *mechanical state*.

This geometric perspective has practical consequences for treatment planning. When a surgeon selects an intracorneal ring segment (ICRS) for a keratoconic eye, the decision is typically guided by nomograms that map one or two geometric parameters — keratometry, Q-value, manifest refraction — to a ring configuration. The implicit assumption is that corneal shape is a sufficient proxy for corneal mechanics. As we shall demonstrate throughout this book, that assumption is fundamentally flawed.

Over the past two decades, a paradigm shift has been gathering momentum. The work of Dupps and Roberts (2001, 2014), Meek and Knupp (2015), and others has established that keratoconus is, at its core, a **biomechanical disease** — a disorder of stromal stress distribution, collagen fiber integrity, and material property degradation. The geometric manifestations (steep K, thinning, protrusion) are *consequences* of an underlying mechanical process, not the process itself. Two corneas with identical K-steep values may harbor vastly different stress states, material stiffnesses, and propensities for progression. Treating them identically, as a nomogram does, is to confuse the symptom with the disease.

This opening chapter establishes the biomechanical foundation upon which the entire AVBC framework rests. We begin with the fibrillar architecture of the corneal stroma — the load-bearing structure that determines mechanical behavior — and progress through constitutive modeling, the decompensation cycle that drives keratoconus progression, and the clinical evidence for a biomechanical rather than purely geometric understanding of the disease. The reader who grasps this foundation will understand why rational ICRS planning requires a biomechanical language, not a geometric lookup table.

---

## 1.2 Fibrillar Anatomy of the Corneal Stroma

The corneal stroma constitutes approximately 90% of the corneal thickness and is the primary determinant of its mechanical behavior. It is composed of 200 to 500 collagen lamellae, each 1–2 μm thick and 10–250 μm wide, arranged in a highly organized lattice that serves a dual purpose: optical transparency and mechanical load-bearing (Komai & Ushiki, 1991; Meek & Knupp, 2015).

### Collagen Fiber Organization

The predominant collagen types in the corneal stroma are Type I (approximately 70% by dry weight) and Type V (approximately 15%), with smaller contributions from Types III, VI, and XII. Type I collagen provides tensile strength, while Type V regulates fibril diameter and spacing — a critical factor for transparency (Birk et al., 1990). The fibrils are remarkably uniform in diameter (approximately 31 nm in humans), and their regular spacing (approximately 56 nm center-to-center) produces destructive interference of scattered light in all directions except forward, yielding the cornea's remarkable transparency (Maurice, 1957; Meek, 2009).

Wide-angle X-ray scattering (WAXS) studies, performed most extensively by Meek, Boote, and colleagues at Cardiff University, have revealed that collagen fiber orientation is not random but follows a characteristic pattern that varies by region (Meek & Boote, 2004; Meek & Knupp, 2015):

- **Central cornea:** Fibers are preferentially oriented along the nasal–temporal and superior–inferior meridians, producing an approximately orthogonal arrangement aligned with the cardinal directions. This creates an anisotropic mechanical response — the central cornea is stiffer along these preferred directions.
- **Limbus and peripheral cornea:** Fibers adopt a predominantly circumferential (tangential) orientation, forming an annular reinforcement analogous to the hoops of a barrel. This limbal annulus anchors the cornea to the sclera and resists radial expansion under intraocular pressure (IOP).
- **Transition zone (paracentrally):** A gradual shift from cardinal to circumferential orientation occurs, with increasing fiber dispersion.

### Anterior versus Posterior Stroma

A critical distinction exists between the anterior and posterior stroma. The anterior third exhibits extensive lamellar *interweaving* — lamellae branch, fuse, and insert into Bowman's layer at oblique angles, creating a mechanically interconnected mesh (Komai & Ushiki, 1991; Winkler et al., 2011). The posterior two-thirds, by contrast, have more parallel, planar lamellae with less interweaving. This architectural difference has direct mechanical consequences:

- The anterior stroma is approximately **two to three times stiffer** than the posterior stroma when measured by nanoindentation (Thomasy et al., 2014) or Brillouin microscopy (Scarcelli et al., 2015).
- The posterior stroma is more susceptible to shear failure and lamellar sliding.
- **In keratoconus, the posterior stroma fails first** (Dupps & Roberts, 2014). The earliest histopathological changes — fiber disorganization, breaks in lamellar continuity — occur in the posterior layers, consistent with the observation that posterior elevation abnormalities are among the earliest tomographic signs of subclinical keratoconus.

### The Proteoglycan Matrix

Between collagen fibrils lies the interfibrillar matrix, composed primarily of proteoglycans — keratan sulfate proteoglycans (lumican, keratocan, mimecan) and dermatan sulfate proteoglycans (decorin, biglycan). These molecules regulate fibril spacing and hydration, contributing to both transparency and mechanical coupling between lamellae (Quantock et al., 2015). In keratoconus, proteoglycan expression is altered, and the relationship between matrix hydration and fibril spacing becomes disrupted — a change that precedes observable thinning (Meek et al., 2005).

For the purposes of constitutive modeling, the key takeaway is that the corneal stroma is a **fiber-reinforced composite** — an extracellular matrix reinforced by collagen fibers with direction-dependent stiffness. Any realistic mechanical model must capture this anisotropy.

---

## 1.3 The Cornea as an Anisotropic Hyperelastic Shell

### Why Linear Elasticity Fails

Early biomechanical models of the cornea treated it as a linearly elastic, isotropic material — characterized by a single Young's modulus E and Poisson's ratio ν. This simplification is inadequate for several reasons:

1. **Nonlinearity:** Corneal tissue exhibits pronounced strain-stiffening. At low strains (physiological range), the tissue is relatively compliant; at higher strains, the collagen fibers become taut and the stiffness increases dramatically. This J-shaped stress–strain curve cannot be captured by a constant E.
2. **Anisotropy:** As described above, the mechanical response depends on fiber orientation. The stiffness measured along collagen fibers differs substantially from the stiffness measured perpendicular to them.
3. **Near-incompressibility:** Hydrated corneal tissue has a water content of approximately 78%, making it nearly incompressible (Poisson's ratio approaching 0.5).
4. **Viscoelasticity:** The cornea exhibits time-dependent mechanical behavior — creep under sustained load and stress relaxation. However, for quasi-static analyses (such as IOP loading or ICRS implantation), hyperelastic models are generally sufficient.

### The Holzapfel-Gasser-Ogden (HGO) Model

Among the constitutive models available for biological soft tissues, the Holzapfel-Gasser-Ogden (HGO) model has emerged as the standard for corneal biomechanics (Holzapfel et al., 2000; Pandolfi & Manganiello, 2006; Nguyen et al., 2018). The HGO model was originally developed for arterial wall mechanics but is well suited to any fiber-reinforced tissue where the fibers are embedded in a softer ground substance.

The strain energy function is:

```
Ψ = c(Ī₁ - 3) + (k₁/2k₂) Σᵢ {exp[k₂⟨κ(Ī₁-3) + (1-3κ)(Ī₄ᵢ-1)⟩²] - 1}
```

where:

| Parameter | Symbol | Value (FEBio) | Physical Meaning |
|-----------|--------|---------------|------------------|
| Matrix shear modulus | c | 0.05 MPa | Stiffness of the ground substance (proteoglycan matrix without fibers) |
| Fiber stiffness | k₁ | 0.22 MPa | Stiffness of the collagen fibers at small strain |
| Fiber nonlinearity | k₂ | 100 (dimensionless) | Rate of exponential strain-stiffening; higher values → sharper J-curve |
| Fiber dispersion | κ | 0.09 (dimensionless) | Degree of fiber alignment: 0 = perfectly aligned; 1/3 = random (isotropic) |
| Bulk modulus | k | 4.76 MPa | Resistance to volumetric deformation (near-incompressibility) |

**Table 1.1.** HGO material parameters used in FEBio 4.12 simulations throughout this book. Values from Nguyen et al. (2018).

**Clinical interpretation of each parameter:**

- **c = 0.05 MPa** represents the baseline stiffness of the cornea *without* collagen fiber contribution — the proteoglycan matrix alone. This is relatively soft, comparable to a firm gel. In keratoconus, matrix degradation reduces c further, making the tissue more compliant.
- **k₁ = 0.22 MPa** captures the stiffness contributed by the collagen fibers. This is the parameter most directly affected by collagen crosslinking (CXL), which increases k₁ by an estimated 50–200% (Wollensak et al., 2003).
- **k₂ = 100** controls how rapidly the tissue stiffens as strain increases. A value of 100 produces a strongly nonlinear J-curve — the cornea is compliant at physiological strains but resists large deformations. This is a protective mechanism: the tissue accommodates small fluctuations in IOP but resists blowout at high pressures.
- **κ = 0.09** indicates that the fibers are *mostly* aligned (κ = 0 would mean perfectly aligned; κ = 1/3 would mean perfectly random). A value of 0.09 is consistent with the WAXS data showing preferential but not exclusive tangential orientation in the central cornea.
- **k = 4.76 MPa** enforces near-incompressibility, appropriate for a hydrated biological tissue.

The Macaulay brackets ⟨·⟩ in the equation ensure that fibers contribute to stiffness only when stretched, not when compressed — a physically realistic condition, as collagen fibers buckle under compression and contribute no load.

The first invariant Ī₁ captures the isotropic (matrix) deformation, while the pseudo-invariants Ī₄ᵢ capture the fiber-direction-specific stretch. This separation is the mathematical embodiment of the composite nature of the stroma: matrix plus fibers.

---

## 1.4 The Dupps Decompensation Cycle

Perhaps the most important conceptual advance in understanding keratoconus came from Dupps and Roberts, who formalized the **biomechanical decompensation cycle** — a positive feedback loop that explains why keratoconus is progressive and why geometric descriptors alone are insufficient (Dupps & Roberts, 2001; Dupps & Roberts, 2014).

### The Cycle

The cycle proceeds as follows:

1. **Enzymatic weakening:** Elevated matrix metalloproteinase (MMP) activity — particularly MMP-2 and MMP-9 — degrades collagen and proteoglycans in a focal region of the stroma (Seppälä et al., 2006). This may be initiated by genetic predisposition, environmental factors (eye rubbing, atopy), or a combination.

2. **Local compliance increase:** The degraded region becomes more compliant (lower c, lower k₁ in HGO terms). Under the same IOP, it deforms more than the surrounding tissue.

3. **Stress redistribution:** According to the Laplace relationship for a pressurized shell (σ = PR/2t, where P is pressure, R is radius, and t is thickness), increased curvature in the weakened zone increases the local membrane stress. Thinning (reduced t) further elevates stress.

4. **More deformation:** Higher stress in a weaker material produces more deformation — further steepening and thinning.

5. **More enzymatic activity:** Mechanical strain upregulates MMP expression via mechanotransduction pathways in keratocytes. The elevated strain in the steepened zone stimulates further enzymatic degradation.

6. **Return to step 1:** The cycle repeats, producing progressive ectasia.

This is a classic **positive feedback loop** — a vicious cycle that, once initiated, drives progressive disease until either the enzymatic drive attenuates (which may happen naturally in the fifth decade) or an external intervention breaks the cycle (such as CXL, which increases k₁ and arrests the cycle at step 3).

### The Role of IOP

A critical insight from the decompensation cycle is that **IOP is the mechanical driver of keratoconus progression** — not because IOP is elevated (it is typically normal), but because even normal IOP (15 mmHg) generates significant stress in a weakened stroma. Our finite element simulations confirm this quantitatively: a baseline cornea under 15 mmHg IOP loading shows an apical displacement of **360.9 μm** — a substantial deformation even in a biomechanically normal stroma. In keratoconus, where regional weakening reduces local stiffness by 30–60% (Scarcelli et al., 2015), the same IOP produces disproportionately larger local deformations.

This is why IOP reduction (while theoretically attractive) is not a practical treatment for keratoconus — the IOP is not the problem; the material weakness is. The therapeutic target must be the material properties (CXL) or the stress distribution (ICRS).

---

## 1.5 Keratoconus: From Geometry to Mechanics

### The Geometric Descriptors and Their Limitations

The standard clinical parameters for keratoconus — K-steep, K-flat, Kmax, corneal astigmatism, Q-value, thinnest pachymetry — are geometric descriptors. They describe the current shape and thickness of the cornea but provide no information about:

- The underlying **material stiffness** (which varies regionally and between patients)
- The **stress distribution** (which depends on geometry, material properties, and IOP simultaneously)
- The **propensity for progression** (which depends on the interaction between stress and material degradation)

Two corneas with identical K-steep values of 48.0 D may have fundamentally different biomechanical profiles. One may have uniform material properties with a relatively recent and still-progressing ectasia; the other may have regionally compensated stiffness (e.g., from prior CXL or natural crosslink accumulation) with a stable ectasia. A nomogram treats them identically. Mechanics would not.

### Brillouin Microscopy Evidence

The most direct evidence for regional stiffness variation in keratoconus comes from Brillouin microscopy, a technique that measures local longitudinal modulus in living tissue without contact (Scarcelli et al., 2012). Studies by Scarcelli, Yun, and colleagues have demonstrated that:

- The Brillouin frequency shift (a proxy for tissue stiffness) is **reduced by 0.1–0.3 GHz** in the cone region compared to surrounding tissue (Scarcelli et al., 2015).
- This reduction is present even in **subclinical keratoconus** — eyes with normal topography but suspicious posterior elevation — suggesting that material weakness precedes geometric change.
- The spatial distribution of Brillouin reduction correlates with the zone of steepening but is not identical to it, reinforcing the distinction between geometry and mechanics.

### The Ocular Response Analyzer and Corvis ST

In clinical practice, the Ocular Response Analyzer (ORA, Reichert) and Corvis ST (Oculus) provide surrogate measures of corneal biomechanics through air-puff tonometry. The key parameters — Corneal Hysteresis (CH), Corneal Resistance Factor (CRF), and the Corvis Biomechanical Index (CBI) — capture aspects of the viscoelastic response to deformation (Luce, 2005; Roberts & Dupps, 2014).

In keratoconus, CH and CRF are consistently reduced, and this reduction often **precedes detectable topographic changes** (Fontes et al., 2010). This temporal sequence — biomechanical change before geometric change — is strong evidence that the disease is fundamentally biomechanical and that geometric descriptors are *lagging indicators* of an ongoing mechanical process.

### The Argument for Biomechanical Assessment

If geometric descriptors are lagging indicators and biomechanical assessment can detect abnormalities earlier, then it follows that any intervention planning that relies solely on geometry is inherently delayed — it responds to the *consequences* of the disease rather than its *current state*. The clinical implication is profound: rational ICRS planning should incorporate biomechanical assessment, not rely exclusively on keratometric and pachymetric data.

---

## 1.6 Implications for ICRS Planning

If keratoconus is fundamentally a biomechanical disease, then it follows logically that an effective intervention must address the biomechanics — not merely the geometry. ICRS, as a structural implant embedded within the stroma, is inherently a biomechanical intervention. It modifies the stress distribution, alters the displacement field, and constrains stromal deformation at the implantation site. Yet current planning approaches treat it as if it were a geometric intervention — selecting ring parameters based on topographic measurements alone.

The disconnect is evident. Current nomograms prescribe ring thickness based on K-steep or Q-value, implicitly assuming that keratometry captures enough of the biomechanical state to predict the ring's effect. But our FEM simulations reveal that the ICRS effect depends on at least three independent mechanical variables — radial displacement (VR), tangential stress redistribution (VT), and asymmetric torque (Vτ) — each modulated by different ring parameters. Thickness controls VR; arc length controls VT; ring asymmetry controls Vτ. A nomogram that maps K-steep to thickness captures only one of these three mechanisms, and even that one imperfectly.

The AVBC framework, introduced in the chapters that follow, proposes to bridge this gap. By decomposing the ICRS effect into three biomechanical vectors, each linked to a specific ring parameter, it provides a language for mechanistic planning. The surgeon who understands VR, VT, and Vτ can reason about *why* a particular ring configuration should produce a particular effect — rather than consulting a lookup table and hoping for the best.

---

## 1.7 Summary

- Keratoconus is a **biomechanical disease**, not merely a geometric deformity. The underlying process involves collagen and matrix degradation, stress redistribution, and a positive feedback loop (the Dupps decompensation cycle).
- The corneal stroma is an **anisotropic, hyperelastic, fiber-reinforced composite**. Its mechanical behavior is best captured by the HGO constitutive model, with parameters c = 0.05 MPa (matrix), k₁ = 0.22 MPa (fiber), k₂ = 100 (nonlinearity), and κ = 0.09 (dispersion).
- **Geometric descriptors** (K-steep, Q-value, pachymetry) are lagging indicators that describe consequences, not causes. Biomechanical assessment — via Brillouin microscopy, ORA/Corvis, or constitutive modeling — provides earlier and more informative characterization.
- Even **normal IOP (15 mmHg)** produces significant corneal deformation (uz = 360.9 μm in our FEM baseline), underscoring IOP as the mechanical driver of ectatic progression.
- **Rational ICRS planning** requires understanding the biomechanical mechanisms of the intervention — not just the geometric outcome. This is the premise of the AVBC framework developed in subsequent chapters.

---

## References

1. Birk DE, Fitch JM, Babiarz JP, et al. Collagen fibrillogenesis in vitro: interaction of types I and V collagen regulates fibril diameter. *J Cell Sci*. 1990;95(Pt 4):649–657.
2. Dupps WJ Jr, Roberts CJ. Effect of acute biomechanical changes on corneal curvature after photokeratectomy. *J Refract Surg*. 2001;17(6):658–669.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Fontes BM, Ambrósio R Jr, Jardim D, et al. Corneal biomechanical metrics and anterior segment parameters in mild keratoconus. *Ophthalmology*. 2010;117(4):673–679.
5. Godefrooij DA, de Wit GA, Uiterwaal CS, et al. Age-specific incidence and prevalence of keratoconus: a nationwide registration study. *Am J Ophthalmol*. 2017;175:169–172.
6. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61:1–48.
7. Komai Y, Ushiki T. The three-dimensional organization of collagen fibrils in the human cornea and sclera. *Invest Ophthalmol Vis Sci*. 1991;32(8):2244–2258.
8. Luce DA. Determining in vivo biomechanical properties of the cornea with an ocular response analyzer. *J Cataract Refract Surg*. 2005;31(1):156–162.
9. Maurice DM. The structure and transparency of the cornea. *J Physiol*. 1957;136(2):263–286.
10. Meek KM. Corneal collagen — its role in maintaining corneal shape and transparency. *Biophys Rev*. 2009;1(2):83–93.
11. Meek KM, Boote C. The organization of collagen in the corneal stroma. *Exp Eye Res*. 2004;78(3):503–512.
12. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
13. Meek KM, Tuft SJ, Huang Y, et al. Changes in collagen orientation and distribution in keratoconus corneas. *Invest Ophthalmol Vis Sci*. 2005;46(6):1948–1956.
14. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Front Bioeng Biotechnol*. 2018;6:210.
15. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.
16. Quantock AJ, Young RD, Akama TO. Structural and biochemical aspects of keratan sulphate in the cornea. *Cell Mol Life Sci*. 2010;67(6):891–906.
17. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
18. Scarcelli G, Besber R, Pineda R, et al. In vivo biomechanical mapping of normal and keratoconus corneas. *JAMA Ophthalmol*. 2015;133(4):480–482.
19. Scarcelli G, Pineda R, Yun SH. Brillouin optical microscopy for corneal biomechanics. *Invest Ophthalmol Vis Sci*. 2012;53(1):185–190.
20. Seppälä HP, Määttä M, Rautia M, et al. EMMPRIN and MMP-1 in keratoconus. *Cornea*. 2006;25(3):325–330.
21. Thomasy SM, Raghunathan VK, Winkler M, et al. Elastic modulus and collagen organization of the rabbit cornea: epithelium to endothelium. *Acta Biomater*. 2014;10(2):785–791.
22. Torres Netto EA, Al-Otaibi WM, Hafezi NL, et al. Prevalence of keratoconus in paediatric patients in Riyadh, Saudi Arabia. *Br J Ophthalmol*. 2018;102(10):1436–1441.
23. Winkler M, Shoa G, Xie Y, et al. Three-dimensional distribution of transverse collagen fibers in the anterior human corneal stroma. *Invest Ophthalmol Vis Sci*. 2013;54(12):7293–7301.
24. Wollensak G, Spoerl E, Seiler T. Stress-strain measurements of human and porcine corneas after riboflavin-ultraviolet-A-induced cross-linking. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
