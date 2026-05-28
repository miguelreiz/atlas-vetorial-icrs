# Chapter 11 — Illustrative Case Studies

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part IV — Clinical Application*

---

## 11.1 Introduction

The preceding chapters presented the AVBC framework as a theoretical construct supported by finite element simulations. This chapter translates theory into practice through six illustrative case studies, each demonstrating the trimodal assessment (O → T → B), vector-based ring selection, and expected outcomes.

Each case follows a standardized format:
1. **Clinical presentation:** Demographics, visual acuity, refraction, topographic data.
2. **AVBC assessment:** O, T, and B Module classification.
3. **Vector selection:** Dominant vector identification and ring prescription.
4. **Nomogram comparison:** What a standard nomogram would prescribe and how it differs.
5. **Expected outcome:** Predicted ΔK, ΔCyl, and apex migration based on FEM data.

> [!TIP]
> **For the Clinician: How to Study This Chapter**
> For each case, before reading the **AVBC Assessment**, try to classify yourself: is the patient O+/O~/O−? Which topographic archetype? Which dominant vector? Then compare with the AVBC analysis.

---

## 11.2 Case 1: Central Symmetric Keratoconus — The Nomogram-Compatible Case

### Clinical Presentation

A 26-year-old male presents with bilateral keratoconus, worse in the right eye. OD BCVA: 20/50 with spectacles (−3.50 −3.00 × 80°), improving to 20/25 with RGP contact lens.

| Parameter | Value |
|---|---|
| K-steep | 47.5 D at 80° |
| K-flat | 44.0 D |
| KMax | 49.2 D (central) |
| Cylinder | 3.5 D |
| Thinnest pachymetry | 478 μm (central) |
| Coma RMS (6 mm) | 1.4 μm |
| Total HOA RMS | 1.8 μm |
| Cone apex distance | 0.3 mm from visual axis |

### AVBC Assessment

**O Module:** All favorable. → **O+**
**T Module:** Central oval. MNA at 82°, K-steep at 80°. |MNA − K-steep| = 2°.
**B Module:** Primary need is moderate flattening. → **VR dominant**.

### Ring Prescription
Symmetric ring, 200 μm thickness, 150° arc, 75% depth (tunnel at 358 μm), meridian at 80°.

### Nomogram Comparison
A standard Ferrara nomogram would prescribe essentially the same configuration. **This is the case where the nomogram works well.**

### Expected Outcome
ΔK ≈ 2.0–2.5 D; modest ΔCyl; no apex migration (symmetric ring, Vτ = 0).

> [!IMPORTANT]
> **For the Clinician: When the Nomogram Is Sufficient**
> If all of these conditions are met simultaneously, the nomogram works well:
> 1. MNA diverges less than 15° from K-steep
> 2. Central oval morphology
> 3. Aligned astigmatism (Cylinder axis vs K-steep < 15°)
> 4. Ipsilateral coma < 2.5 µm
>
> Outside these conditions, you are in the territory where AVBC makes a difference.

---

## 11.3 Case 2: Paracentral Keratoconus with MNA Divergence — VT Dominant

### Clinical Presentation
A 30-year-old female. OS BCVA: 20/60 with spectacles (−2.00 −5.50 × 100°).

| Parameter | Value |
|---|---|
| K-steep | 50.0 D at 100° |
| KMax | 54.3 D (1.2 mm inferior from axis) |
| Cylinder | 5.5 D (irregular component > 2.0 D) |
| Thinnest pachymetry | 445 μm |
| Coma RMS (6 mm) | 2.8 μm |
| MNA | 135° |

### AVBC Assessment
**O Module:** O~. **T Module:** Paracentral crescent. |MNA − K-steep| = **35°**.
**B Module:** → **VT dominant**, ring oriented toward MNA.

### Ring Prescription
Symmetric ring, 200 μm thickness, **255° arc** (long arc for maximum VT), 70% depth, meridian at **135°** (MNA, not K-steep).

### Nomogram Comparison
A standard nomogram would prescribe a thicker ring (250 μm) at K-steep axis (100°), with a shorter arc (160°). The AVBC prescription differs in three ways: (1) thinner ring, (2) longer arc, (3) different meridian.

> [!WARNING]
> **For the Clinician: The 35° Error**
> The nomogram says: "implant at K-steep = 100°". AVBC says: "implant at MNA = 135°". A 35° difference. Always check the MNA before marking the implant axis!

---

## 11.4 Case 3: Displaced Apex Keratoconus — Vτ Dominant

### Clinical Presentation
A 24-year-old male. OD BCVA: 20/80. Unable to tolerate contact lenses.

| Parameter | Value |
|---|---|
| KMax | 56.0 D (2.0 mm inferonasal from axis) |
| Coma RMS (6 mm) | 4.2 μm |
| Cone apex distance | 2.0 mm from visual axis |
| MNA | 220° |

### AVBC Assessment
**O Module:** O−. **T Module:** Inferior nipple with significant displacement.
**B Module:** → **Vτ dominant**. Apex repositioning is the primary goal.

### Ring Prescription
Asymmetric progressive ring, 300→150 μm, 180° arc, 80% depth, meridian at 220° (MNA).

### Nomogram Comparison
No standard nomogram addresses apex position.

> [!TIP]
> **For the Clinician: The Coma Test for Vτ Indication**
> If Coma > 3.5 µm and apex distance > 1 mm: a symmetric ring (Vτ = 0) will not solve the primary problem. Always indicate a progressive ring (Vτ) when displaced cone + high coma.

---

## 11.5 Case 4: Extreme Ectasia (Globus) — Structural Stabilization and CL Tolerance Restoration

### Clinical Presentation
A 35-year-old male with extreme corneal ectasia (Globus pattern). OS BCVA: 20/200.

| Parameter | Value |
|---|---|
| K-steep | 68.0 D |
| KMax | 76.5 D (diffuse, reaching up to 85.0 D locally) |
| Thinnest pachymetry | 360 μm |
| Coma RMS | 5.8 μm |

### AVBC Assessment
**O Module:** O−. **T Module:** Globus (KMax > 60 D).
**B Module:** **Structural VT/B configuration**. The therapeutic objective shifts entirely from optical correction to **structural stabilization** and **contact lens tolerance restoration**.

### Computational Solver Limits vs. Clinical Reality
FEBio nonlinear solver frequently fails to converge for extreme cases (KMax > 53 D). This non-convergence is caused by severe mesh element distortion. Crucially, **non-convergence is a numerical solver limitation, not a clinical or biological contraindication.**

### Ring Prescription and Outcome
Dual symmetric segment configuration (Ferrara-type, 320 μm symmetric thickness, 160°/160° arc).

After implantation at 75% depth:
1. **Topographic Flattening:** KMax reduced by 9.4 D to 67.1 D.
2. **Contact Lens Fitting:** Successful scleral CL fitting, restoring BCVA to 20/30.
3. **Biomechanical Stability:** Maintained over 24-month follow-up.

---

## 11.6 Case 5: Asymmetric Bilateral Keratoconus — Differential Strategy

- **OD:** K-steep 46.5 D, central oval → VR dominant → Standard symmetric ring
- **OS:** K-steep 52.0 D, inferior nipple, Coma 3.8 μm → VT + VR → Thicker ring, longer arc

**Learning point:** Same patient, different prescriptions for each eye.

---

## 11.7 Case 6: Post-CXL Keratoconus — Modified Biomechanics

### Clinical Presentation
A 32-year-old male, 18 months post-CXL. Stabilized keratoconus, BCVA remains 20/50.

### AVBC Assessment
Post-CXL cornea has increased k₁ (estimated 50–100% higher due to cross-linking). The biomechanical response to ICRS will be **attenuated**. → **VR dominant, but with greater thickness** to compensate for CXL-induced stiffening.

### Ring Prescription
Symmetric ring, **300 μm** (instead of 200–250 μm that the nomogram would suggest), 150° arc.

> [!CAUTION]
> **For the Clinician: Post-CXL Corneas Are Stiffer — Increase Thickness**
> CXL increases k₁ (fibrillar stiffness) by up to 2×. Rule of thumb: **increase ring thickness by 50–100 μm** relative to what the nomogram suggests for post-CXL cases.

---

## 11.8 Summary

| Case | Morphology | Dominant Vector | Nomogram Agreement? | Main AVBC Contribution |
|:---:|:---:|:---:|:---:|:---:|
| 1 | Central oval | VR | ✓ Yes | Confirms nomogram (no added value) |
| 2 | Paracentral | VT | ✗ Different axis | MNA-directed positioning, longer arc |
| 3 | Displaced apex | Vτ | ✗ Not addressed | Apex repositioning via asymmetric ring |
| 4 | Globus | — | N/A (excluded) | Correct identification of structural indication |
| 5 | Asymmetric bilateral | VR + VT | ✗ Partially | Differential strategy per eye |
| 6 | Post-CXL | VR (augmented) | ✗ Undercorrected | Thickness adjusted for biomechanics |

AVBC adds clinical value in approximately 40% of cases.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations. *J Refract Surg*. 2006;22(6):539–545.
2. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
5. García de Oteyza G, et al. Refractive changes of asymmetric ICRS. *PLoS One*. 2021;16(1):e0245063.
6. Kling S, Marcos S. FEM of ICRS in a hyperelastic cornea. *IOVS*. 2013;54(1):881–889.
7. Wollensak G, Spoerl E, Seiler T. Stress-strain measurements after CXL. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
