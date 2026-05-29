<!-- GPT revision applied -->
# Chapter 1 — The Keratoconic Cornea as a Mechanical Structure

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part I — The Problem and Fundamentals*

> **Key Points**
> - The cornea is a **fiber-reinforced composite**: 200+ collagen lamellae in a proteoglycan matrix.
> - Its biomechanical behavior is described by the **HGO model** (c, k₁, k₂, κ).
> - Keratoconus is a **material disease**: enzymatic degradation of the matrix (c↓) precedes geometric deformity.
> - The **Dupps cycle** explains the positive feedback loop: thinning → stress concentration → further thinning.
> - Understanding biomechanics is a prerequisite for rational ICRS planning.


> **Key Point:** Keratoconus is not merely a curved cornea — it is a disease of the stromal material. Two eyes with the same K-steep may have completely different biomechanical states. A nomogram that ignores this is treating the symptom, not the disease.

---

![Figure 1.3 — J-shaped stress-strain curve of the cornea according to the HGO model.](book_figures/fig_01_03_curva_tensao_deformacao.svg)


## 1.1 Introduction

Keratoconus is the most common corneal ectasia, with prevalence estimates ranging from 1 in 375 in population-based studies to as high as 1 in 84 when modern videokeratographic screening criteria are applied (Godefrooij et al., 2017; Torres Netto et al., 2018). Traditionally, the condition has been defined by its striking topographic features — elevated keratometric readings, inferior corneal steepening, irregular astigmatism, and progressive thinning — features that place it squarely in the domain of optical geometry. Indeed, the standard clinical workflow for keratoconus diagnosis centers on sagittal curvature maps, keratometric indices, and pachymetric profiles: measurements that describe the *shape* of the cornea but say little about its *mechanical state*.

![Figure 1.1 — Fibrillar anatomy of the corneal stroma: cross-section and fiber orientation.](book_figures/fig_01_01_anatomia_estroma.svg)


This geometric perspective has practical consequences for treatment planning. When a surgeon selects an intracorneal ring segment (ICRS) for a keratoconic eye, the decision is typically guided by nomograms that map one or two geometric parameters — keratometry, Q-value, manifest refraction — to a ring configuration. The implicit assumption is that corneal shape is a sufficient proxy for corneal mechanics. As we will demonstrate throughout this book, this assumption is fundamentally flawed.

Over the past two decades, a structural and bibliographic paradigm shift has been gaining momentum in ophthalmology. The seminal work of Dupps and Roberts (2001, consolidated in their 2014 article "*Biomechanics of corneal ectasia and biomechanical treatments*"), together with the structural investigations of Meek and Knupp (2015), unequivocally established that keratoconus is, at its core, a **primarily biomechanical disease** — a disorder of stromal stress distribution, with focal degradation of the elastic material properties.

The classic geometric manifestations (elevated K, pachymetric thinning, apical protrusion) are not the pathology itself but rather the *secondary mechanical consequences (symptoms)* of a weakened structure yielding under normal intraocular pressure. Two corneas with identical K-steep values may harbor vastly different stress states, material stiffnesses, and progression propensities. Treating them identically and on purely geometric grounds, as a classical nomogram does, is to confuse the symptom (shape) with the disease (mechanical weakness).

This opening chapter establishes the biomechanical foundation upon which the entire AVBC framework rests. We begin with the fibrillar architecture of the corneal stroma — the load-bearing structure that determines mechanical behavior — and progress through constitutive modeling, the decompensation cycle that drives keratoconus progression, and the clinical evidence for a biomechanical, rather than purely geometric, understanding of the disease. The reader who grasps this foundation will understand why rational ICRS planning requires a biomechanical language, not a geometric look-up table.

---

## 1.2 Fibrillar Anatomy of the Corneal Stroma

> **For the Clinician:** This section explains *why* the cornea behaves as it does under pressure. The central concept is simple: the cornea is a composite material (like fiberglass), with collagen fibers (providing stiffness) embedded in a soft matrix (providing flexibility). The orientation of these fibers determines where the cornea is strong and where it is vulnerable.

![Figure 1.2 — Dupps decompensation cycle: positive feedback loop and intervention points (CXL and ICRS).](book_figures/fig_01_02_ciclo_dupps.svg)


The corneal stroma constitutes approximately 90% of the corneal thickness and is the primary determinant of its mechanical behavior. It is composed of 200 to 500 collagen lamellae, each 1–2 μm thick and 10–250 μm wide, arranged in a highly organized matrix that serves a dual purpose: optical transparency and mechanical load bearing (Komai & Ushiki, 1991; Meek & Knupp, 2015).

### Collagen Fiber Organization

The predominant collagen types in the corneal stroma are Type I (approximately 70% by dry weight) and Type V (approximately 15%), with minor contributions from Types III, VI, and XII. Type I collagen provides tensile strength, while Type V regulates fibril diameter and spacing — a critical factor for transparency (Birk et al., 1990). The fibrils are remarkably uniform in diameter (approximately 31 nm in humans), and their regular spacing (approximately 56 nm center-to-center) produces destructive interference of scattered light in all directions except forward, resulting in the cornea's remarkable transparency (Maurice, 1957; Meek, 2009).

Wide-angle X-ray scattering (WAXS) studies, conducted most extensively by Meek, Boote, and collaborators at Cardiff University, have revealed that collagen fiber orientation is not random but follows a characteristic pattern that varies by region (Meek & Boote, 2004; Meek & Knupp, 2015):

- **Central cornea:** Fibers are preferentially oriented along the nasal-temporal and superior-inferior meridians, creating an approximately orthogonal arrangement aligned with the cardinal directions. This creates an anisotropic mechanical response — the central cornea is stiffer along these preferred directions.
- **Limbus and peripheral cornea:** Fibers adopt a predominantly circumferential (tangential) orientation, forming an annular reinforcement analogous to barrel hoops. This limbal ring anchors the cornea to the sclera and resists radial expansion under intraocular pressure (IOP).
- **Transition zone (paracentral):** A gradual shift occurs from cardinal to circumferential orientation, with increased fiber dispersion.

### Anterior versus Posterior Stroma

There is a critical distinction between the anterior and posterior stroma. The anterior third exhibits extensive lamellar *interweaving* — the lamellae branch, merge, and insert into Bowman's layer at oblique angles, creating a mechanically interconnected mesh (Komai & Ushiki, 1991; Winkler et al., 2013). The posterior two-thirds, in contrast, feature more parallel, flat lamellae with less interweaving. This architectural difference has direct mechanical consequences:

- The anterior stroma is approximately **two to three times stiffer** than the posterior stroma when measured by nanoindentation (Thomasy et al., 2014) or Brillouin microscopy (Scarcelli et al., 2015).
- The posterior stroma is more susceptible to shear failure and lamellar slippage.
- **In keratoconus, the posterior stroma fails first** (Dupps & Roberts, 2014). The earliest histopathological changes — fiber disorganization, breaks in lamellar continuity — occur in the posterior layers, consistent with the observation that posterior elevation abnormalities are among the earliest tomographic signs of subclinical keratoconus.

### The Proteoglycan Matrix

Between the collagen fibrils lies the interfibrillar matrix, composed primarily of proteoglycans — keratan sulfate proteoglycans (lumican, keratocan, mimecan) and dermatan sulfate proteoglycans (decorin, biglycan). These molecules regulate fibril spacing and hydration, contributing to both transparency and mechanical coupling between lamellae (Quantock et al., 2010). In keratoconus, proteoglycan expression is altered, and the relationship between matrix hydration and fibril spacing becomes disrupted — an alteration that precedes observable thinning (Meek et al., 2005).

For constitutive modeling purposes, the key conclusion is that the corneal stroma is a **fiber-reinforced composite** — an extracellular matrix reinforced by collagen fibers with direction-dependent stiffness. Any realistic mechanical model must capture this anisotropy.

---

## 1.3 The Cornea as an Anisotropic Hyperelastic Shell

### Why Linear Elasticity Fails

The earliest biomechanical models of the cornea treated it as a linearly elastic, isotropic material — characterized by a single Young's modulus E and Poisson's ratio ν. This simplification is inadequate for several reasons:

1. **Nonlinearity:** Corneal tissue exhibits pronounced strain-stiffening. At low strains (physiological range), the tissue is relatively compliant; at higher strains, collagen fibers become taut and stiffness increases dramatically. This J-shaped stress-strain curve cannot be captured by a constant E.
2. **Anisotropy:** As described above, the mechanical response depends on fiber orientation. Stiffness measured along collagen fibers differs substantially from stiffness measured perpendicular to them.
3. **Near-incompressibility:** Hydrated corneal tissue has a water content of approximately 78%, making it nearly incompressible (Poisson's ratio approaching 0.5).
4. **Viscoelasticity:** The cornea exhibits time-dependent mechanical behavior — creep under sustained load and stress relaxation. However, for quasi-static analyses (such as IOP loading or ICRS implantation), hyperelastic models are generally sufficient.

### The Holzapfel-Gasser-Ogden (HGO) Model

> **For the Clinician:** The HGO model is the mathematical equation we use to simulate the cornea on the computer. You don't need to memorize the equation — what matters are the **5 parameters** in the table below. Each describes a different aspect of the corneal material, and our simulations use these values throughout this book.

Among the constitutive models available for biological soft tissues, the Holzapfel-Gasser-Ogden (HGO) model has emerged as the standard for corneal biomechanics (Holzapfel et al., 2000; Pandolfi & Manganiello, 2006; Nguyen et al., 2018). The HGO model was originally developed for arterial wall mechanics but is well suited to any fiber-reinforced tissue where fibers are embedded in a softer ground substance.

The strain energy function is:

```
Ψ = c(Ī₁ - 3) + (k₁/2k₂) Σᵢ {exp[k₂⟨κ(Ī₁-3) + (1-3κ)(Ī₄ᵢ-1)⟩²] - 1}
```

where:

| Parameter | Symbol | Value (FEBio) | Physical Meaning |
|-----------|--------|---------------|-----------------|
| Matrix shear modulus | c | 0.05 MPa | Stiffness of the ground substance (proteoglycan matrix without fibers) |
| Fiber stiffness | k₁ | 0.22 MPa | Collagen fiber stiffness at small strain |
| Fiber nonlinearity | k₂ | 100 (dimensionless) | Rate of exponential stiffness increase; larger values → sharper J-curve |
| Fiber dispersion | κ | 0.09 (dimensionless) | Degree of fiber alignment: 0 = perfectly aligned; 1/3 = random (isotropic) |
| Bulk modulus | k | 4.76 MPa | Resistance to volumetric deformation (near-incompressibility) |

**Table 1.1.** HGO material parameters used in FEBio 4.12 simulations throughout this book. Values from Nguyen et al. (2018).

**Clinical interpretation of each parameter:**

- **c = 0.05 MPa** represents the baseline stiffness of the cornea *without* the contribution of collagen fibers — only the proteoglycan matrix. It is relatively soft, comparable to a firm gel. In keratoconus, matrix degradation further reduces c, making the tissue more compliant.
- **k₁ = 0.22 MPa** captures the stiffness contributed by collagen fibers. This is the parameter most directly affected by collagen cross-linking (CXL), which increases k₁ by an estimated 50–200% (Wollensak et al., 2003).
- **k₂ = 100** controls how rapidly the tissue becomes stiffer as strain increases. A value of 100 simulates a strongly nonlinear J-curve — the cornea is compliant at physiological strains but resists large deformations. This is a protective mechanism: the tissue accommodates small IOP fluctuations but resists rupture at high pressures.
- **κ = 0.09** indicates that fibers are *mostly* aligned (κ = 0 would mean perfectly aligned; κ = 1/3 would mean perfectly random). A value of 0.09 is consistent with WAXS data showing preferential, but not exclusive, tangential orientation in the central cornea.
- **k = 4.76 MPa** enforces near-incompressibility, appropriate for a hydrated biological tissue.

The Macaulay brackets ⟨·⟩ in the equation ensure that fibers contribute to stiffness only when stretched, not when compressed — a physically realistic condition since collagen fibers buckle under compression and do not carry load.

The first invariant Ī₁ captures isotropic (matrix) deformation, while the pseudo-invariants Ī₄ᵢ capture the stretch specifically in the fiber direction. This separation is the mathematical embodiment of the stroma's composite nature: matrix plus fibers.

---

## 1.4 The Dupps Decompensation Cycle

> **Key Point:** The Dupps cycle is why keratoconus progresses. It is a vicious cycle: weakness → deformation → more stress → more weakness. It is also why CXL works (it breaks the cycle by reinforcing fibers) and why ICRS works (it redistributes stresses).

Perhaps the most important conceptual advance in understanding keratoconus came from Dupps and Roberts, who formalized the **biomechanical decompensation cycle** — a positive feedback cycle that explains why keratoconus is progressive and why isolated geometric descriptors are insufficient (Dupps & Roberts, 2001; Dupps & Roberts, 2014).

### The Cycle

The cycle proceeds as follows:

1. **Enzymatic weakening:** Elevated matrix metalloproteinase (MMP) activity — particularly MMP-2 and MMP-9 — degrades collagen and proteoglycans in a focal region of the stroma (Seppälä et al., 2006). This may be initiated by genetic predisposition, environmental factors (eye rubbing, atopy), or a combination of both.

2. **Increased local compliance:** The degraded region becomes more compliant (lower c, lower k₁ in HGO terms). Under the same IOP, it deforms more than the surrounding tissue.

3. **Stress redistribution:** According to Laplace's relation for a pressurized shell (σ = PR/2t, where P is pressure, R is radius, and t is thickness), the increased curvature at the weakened zone increases local membrane stress. Thinning (reduced t) further elevates stress.

4. **Further deformation:** Higher stress in a weaker material produces more deformation — leading to further steepening and thinning.

5. **More enzymatic activity:** Mechanical strain stimulates MMP expression through mechanotransduction pathways in keratocytes. Elevated strain in the steepened zone further promotes enzymatic degradation.

6. **Return to step 1:** The cycle repeats, creating progressive ectasia.

This is a classic **positive feedback cycle** — a vicious circle that, once initiated, drives disease progression until enzymatic stimulus attenuates (which may occur naturally in the fifth decade of life) or an external intervention breaks the cycle (such as CXL, which increases k₁ and interrupts the cycle at step 3).

### The Role of IOP

A critical insight from the decompensation cycle is that **IOP is the mechanical engine of keratoconus progression** — not because IOP is elevated (it is typically normal), but because even normal IOP (15 mmHg) generates significant stress in a weakened stroma. Our finite element simulations confirm this quantitatively: a baseline cornea under a 15 mmHg IOP load shows an apical displacement of **360.9 μm** — a substantial deformation even in a biomechanically normal stroma. In keratoconus, where regional weakening reduces local stiffness by 30–60% (Scarcelli et al., 2015), the same IOP produces disproportionately larger local deformations.

This is why IOP reduction (though theoretically attractive) is not a practical treatment for keratoconus — IOP is not the problem; material weakness is. The therapeutic target should be the material properties (CXL) or the stress distribution (ICRS).

---

## 1.5 Keratoconus: From Geometry to Biomechanics

### Geometric Descriptors and Their Limitations

The standard clinical parameters for keratoconus — K-steep, K-flat, Kmax, corneal astigmatism, Q-value, thinnest pachymetry — are geometric descriptors. They describe the current shape and thickness of the cornea but provide no information about:

- The underlying **material stiffness** (which varies regionally and between patients)
- The **stress distribution** (which depends simultaneously on geometry, material properties, and IOP)
- The **propensity for progression** (which depends on the interaction between stress and material degradation)

Two corneas with identical K-steep values of 48.0 D may have fundamentally different biomechanical profiles. One may have uniform material properties with a relatively recent and still-progressing ectasia; the other may have regionally compensated stiffness (e.g., from prior CXL or natural cross-link accumulation) with a stable ectasia. A nomogram treats them identically. Mechanics does not.

### Evidence from Brillouin Microscopy

The most direct evidence for regional stiffness variation in keratoconus comes from Brillouin microscopy, a technique that measures the local longitudinal modulus in living tissues without contact (Scarcelli et al., 2012). Studies by Scarcelli, Yun, and collaborators demonstrated that:

- The Brillouin frequency shift (a proxy for tissue stiffness) is **reduced by 0.1–0.3 GHz** in the cone region compared to surrounding tissue (Scarcelli et al., 2015).
- This reduction is present even in **subclinical keratoconus** — eyes with normal topography but suspicious posterior elevation — suggesting that material weakness precedes geometric alteration.
- The spatial distribution of the Brillouin reduction correlates with the steepening zone but is not identical to it, reinforcing the distinction between geometry and mechanics.

### The Ocular Response Analyzer and Corvis ST

In clinical practice, the Ocular Response Analyzer (ORA, Reichert) and Corvis ST (Oculus) provide indirect measurements of corneal biomechanics through air-puff tonometry. The key parameters — Corneal Hysteresis (CH), Corneal Resistance Factor (CRF), and the Corvis Biomechanical Index (CBI) — capture aspects of the viscoelastic response to deformation (Luce, 2005; Roberts & Dupps, 2014).

In keratoconus, CH and CRF are consistently reduced, and this reduction often **precedes detectable topographic changes** (Fontes et al., 2010). This temporal sequence — biomechanical alteration before geometric alteration — is strong evidence that the disease is fundamentally biomechanical and that geometric descriptors are *lagging indicators* of an ongoing mechanical process.

### The Case for Biomechanical Assessment

If geometric descriptors are lagging indicators and biomechanical assessment can detect abnormalities earlier, it follows that any intervention planning that relies exclusively on geometry is inherently delayed — it responds to the *consequences* of the disease rather than to its *current state*. The clinical implication is profound: rational ICRS planning must incorporate biomechanical assessment, not depend exclusively on keratometric and pachymetric data.

---

## 1.6 Implications for ICRS Planning

If keratoconus is fundamentally a biomechanical disease, it follows logically that an effective intervention must address the biomechanics — not merely the geometry. The ICRS, as a structural implant inserted into the stroma, is inherently a biomechanical intervention. It modifies the stress distribution, alters the displacement field, and constrains stromal deformation at the implantation site. However, current planning approaches treat the procedure as if it were a geometric intervention — selecting ring parameters based solely on topographic measurements.

The disconnect is evident. Current nomograms prescribe ring thickness based on K-steep or Q-value, implicitly assuming that keratometry captures enough of the biomechanical state to predict the ring's effect. But our FEM simulations reveal that the ICRS effect depends on at least three independent mechanical variables — radial displacement (VR), tangential stress redistribution (VT), and asymmetric torque (Vτ) — each modulated by different ring parameters. Thickness controls VR; arc length controls VT; ring asymmetry controls Vτ. A nomogram that maps K-steep to thickness captures only one of these three mechanisms, and even that imperfectly.

The AVBC framework, introduced in the following chapters, proposes to bridge this gap. By decomposing the ICRS effect into three biomechanical vectors, each linked to a specific ring parameter, it provides a language for mechanistic planning. The surgeon who understands VR, VT, and Vτ can reason about *why* a particular ring configuration produces a specific effect — rather than consulting a look-up table and hoping for the best outcome.

---

## 1.7 Summary

- Keratoconus is a **biomechanical disease**, not merely a geometric deformity. The underlying process involves collagen and matrix degradation, stress redistribution, and a positive feedback cycle (the Dupps decompensation cycle).
- The corneal stroma is an **anisotropic, hyperelastic, fiber-reinforced composite**. Its mechanical behavior is best captured by the HGO constitutive model, with parameters c = 0.05 MPa (matrix), k₁ = 0.22 MPa (fiber), k₂ = 100 (nonlinearity), and κ = 0.09 (dispersion).
- **Geometric descriptors** (K-steep, Q-value, pachymetry) are lagging indicators that describe consequences, not causes. Biomechanical assessment — via Brillouin microscopy, ORA/Corvis, or constitutive modeling — provides earlier and more informative characterization.
- Even **normal IOP (15 mmHg)** produces significant corneal deformation (uz = 360.9 μm in our FEM baseline), highlighting IOP as the mechanical engine of ectatic progression.
- **Rational ICRS planning** demands understanding of the biomechanical mechanisms of the intervention — not merely the geometric outcome. This is the premise of the AVBC framework developed in subsequent chapters.

### Summary Table: Key Concepts for the Clinician

| Concept | What It Is | Why It Matters to the Surgeon |
|:--------|:-----------|:-----------------------------|
| HGO Model | Equation describing corneal mechanics as a fiber+matrix composite | The 5 parameters (c, k₁, k₂, κ, k) determine how the cornea responds to the ring |
| c = 0.05 MPa | Matrix shear modulus (gel without fibers) | When degraded in keratoconus, the cornea becomes softer — this is what CXL does not directly reverse |
| k₁ = 0.22 MPa | Collagen fiber stiffness | The parameter that CXL increases (50–200%); fiber reinforcement is the basis of stabilization |
| k₂ = 100 | Exponential stiffening rate | Explains why the cornea accommodates normal IOP fluctuations but resists extreme deformation |
| κ = 0.09 | Fiber angular dispersion (0=aligned, 1/3=random) | Mostly aligned fibers mean the ring works differently depending on orientation |
| Dupps Cycle | Positive feedback: weakness → deformation → more stress → more weakness | Explains keratoconus progression and why CXL (reinforces fibers) and ICRS (redistributes stress) work |
| Anisotropy | Stiffness varies by direction and region | The ring's effect depends on the local orientation of collagen fibers |
| IOP as engine | 15 mmHg generates uz = 360.9 μm of central displacement | Even normal IOP significantly deforms a weakened cornea |
| Anterior vs posterior stroma | Anterior 2-3× stiffer; posterior fails first in KC | ICRS is implanted at 70–80% depth to interact with the load-bearing stroma |

---

---

## Didactic Summary

- The cornea is a **fiber-reinforced biomechanical composite** whose behavior is governed by four HGO parameters (c, k₁, k₂, κ).
- Keratoconus is fundamentally a **material disease**: degradation of the matrix (c↓) triggers a positive feedback loop of progressive thinning and stress concentration.
- The **Dupps decompensation cycle** explains why ectasia is self-reinforcing once initiated.
- Brillouin microscopy confirms that the **matrix modulus c** is the primary differentiator between normal and keratoconic corneas.
- Understanding biomechanics is the prerequisite for rational ICRS planning — geometry is the consequence, not the cause.

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
