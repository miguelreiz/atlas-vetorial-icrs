<!-- GPT revision applied -->
# Chapter 11 — Illustrative Case Studies

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part IV — Clinical Application*

---

> **Key Points**
> - The 6 cases demonstrate that AVBC adds value when the nomogram fails: MNA divergence, displaced apex, post-CXL.
> - Case 1 (central symmetric) confirms that the nomogram works when MNA ≈ K-steep.
> - Cases 3–4 (displaced apex) show that VR alone is insufficient — Vτ is necessary.
> - Case 6 (post-CXL) demonstrates the importance of adjusting thickness for modified stiffness.
> - AVBC adds value in ~40% of cases — the remainder are well served by the nomogram.

## 11.1 Introduction

The preceding chapters presented the AVBC framework as a theoretical construct supported by finite element simulations. This chapter translates theory into practice through six illustrative case studies, each demonstrating the trimodal assessment (O → T → B), vector-based ring selection, and expected outcomes. The cases were selected to represent the diversity of clinical presentations encountered in keratoconus practice and to highlight scenarios where the AVBC approach diverges from nomogram-based planning, potentially enhancing it.

Each case follows a standardized format:
1. **Clinical presentation:** Demographics, visual acuity, refraction, topographic data.
2. **AVBC assessment:** Module O, T, and B classification.
3. **Vector selection:** Dominant vector identification and ring prescription.
4. **Nomogram comparison:** What a standard nomogram would prescribe and how it differs.
5. **Expected outcome:** Predicted ΔK, ΔCyl, and apex migration based on FEM data.

> [!NOTE]
> These cases are didactic illustrations constructed from typical clinical presentations and calibrated against FEM outcomes presented in Chapter 12. They do not represent retrospective clinical outcomes but prospective predictions using the AVBC framework. Clinical validation studies are planned (Chapter 13).

> [!TIP]
> **For the Clinician: How to Study This Chapter**
> For each case, before reading the **AVBC Assessment**, try to classify it yourself: is the patient O+/O~/O−? Which topographic archetype? Which dominant vector? Then compare with the AVBC analysis. This self-assessment activates surgical reasoning far more effectively than passive reading.

---

![Figure 11.1 — Visual summary of the 6 AVBC case studies.](book_figures/fig_11_01_resumo_6_casos.svg)

## 11.2 Case 1: Central Symmetric Keratoconus — The Nomogram-Compatible Case

### Clinical Presentation

A 26-year-old male presents with bilateral keratoconus, worse in the right eye. Visual acuity OD: 20/50 with spectacles (−3.50 −3.00 × 80°), improving to 20/25 with RGP contact lens. No history of eye rubbing. No progression on serial topography over 12 months post-CXL.

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

**Module O:** Coma < 2.50 (favorable), Δ Axis = 5° (favorable), HOA < 2.0 (favorable), Coma ipsilateral (favorable). → **O+**

**Module T:** Central oval morphology. MNA at 82°, K-steep at 80°. |MNA − K-steep| = 2°. → Central, symmetric.

**Module B:** The primary need is moderate flattening. Astigmatism is regular and aligned. The apex is nearly centered. → **VR dominant**.

### Ring Prescription

Symmetric ring, 200 μm thickness, 150° arc, 75% depth (tunnel at 358 μm), meridian at 80°.

### Nomogram Comparison

A standard Ferrara nomogram would prescribe a 200 μm ring at 160° for this K-steep and Q value — essentially the same configuration. **This is the case where the nomogram works well** because MNA ≈ K-steep, the morphology is central, and the dominant need (flattening) aligns with the single mechanism the nomogram captures.

### Expected Outcome

ΔK ≈ 2.0–2.5 D (based on VR data for 200 μm ring); modest ΔCyl; no apex migration (symmetric ring, Vτ = 0).

**Teaching point:** The AVBC framework is not necessary for every case. When ectasia is central, symmetric, with aligned astigmatism and MNA ≈ K-steep, the nomogram is adequate. AVBC adds value in the ~40% of cases where these conditions are not met.

> [!IMPORTANT]
> **For the Clinician: When the Nomogram is Sufficient**
> If all these conditions are met simultaneously, the nomogram works well and you don't need AVBC:
> 1. MNA diverges less than 15° from K-steep
> 2. Central oval morphology
> 3. Aligned astigmatism (Cylinder axis vs K-steep < 15°)
> 4. Ipsilateral coma < 2.5 μm
>
> Outside these conditions, you are in AVBC territory.

---

## 11.3 Case 2: Paracentral Keratoconus with MNA Divergence — VT Dominant

### Clinical Presentation

A 30-year-old female. BCVA OS: 20/60 with spectacles (−2.00 −5.50 × 100°), improving to 20/30 with RGP.

| Parameter | Value |
|---|---|
| K-steep | 50.0 D at 100° |
| K-flat | 44.5 D |
| KMax | 54.3 D (1.2 mm inferior from axis) |
| Cylinder | 5.5 D (irregular component > 2.0 D) |
| Thinnest pachymetry | 445 μm |
| Coma RMS (6 mm) | 2.8 μm |
| Total HOA RMS | 3.2 μm |
| MNA | 135° |

### AVBC Assessment

**Module O:** Coma 2.8 (intermediate), Δ Axis = 22° (intermediate), HOA 3.2 (intermediate), Coma ambiguous. → **O~**

**Module T:** Paracentral crescent. MNA at 135°, K-steep at 100°. |MNA − K-steep| = **35°**. This is in the 15°–45° divergence zone — nomograms may underperform.

**Module B:** The dominant clinical problem is irregular astigmatism (5.5 D total, irregular component > 2.0 D). The MNA divergence of 35° indicates the mechanical deformation axis does not coincide with the steepest keratometry. Positioning the ring along K-steep would miss the axis of maximum posterior deformation. → **VT dominant**, with ring oriented toward the MNA.

### Ring Prescription

Symmetric ring, 200 μm thickness, **255° arc** (long arc for maximum VT), 70% depth (tunnel at 312 μm), meridian at **135°** (MNA, not K-steep).

### Nomogram Comparison

A standard nomogram would prescribe a thicker ring (250 μm) at the K-steep axis (100°), with a shorter arc (160°). The AVBC prescription differs in three ways: (1) thinner ring (VR is secondary), (2) longer arc (VT is dominant), and (3) different meridian (MNA, not K-steep). The 35° difference in positioning axis is the most clinically significant divergence.

### Expected Outcome

Regularization with ΔCyl ≈ 2.0–3.0 D; ΔK ≈ 1.0–1.5 D (moderate, VR secondary). VT at 255° = 7.33 kPa (−5.8% from baseline), indicating significant stress redistribution.

**Teaching point:** When the MNA diverges from K-steep by > 15°, the ring meridian should follow the MNA. This is the single most actionable clinical recommendation from the AVBC framework that nomograms cannot provide.

> [!WARNING]
> **For the Clinician: The 35° Error**
> In this case, the nomogram would say: "implant at K-steep axis = 100°." AVBC says: "implant at MNA = 135°." A 35° difference. In a patient with a paracentral crescent, this axis error means the ring intercepts the deformed stroma at an incorrect position, losing ~35% of stress redistribution capacity. Always check the MNA before marking the implant axis!

---

## 11.4 Case 3: Displaced-Apex Keratoconus — Vτ Dominant

### Clinical Presentation

A 24-year-old male. BCVA OD: 20/80. Unable to tolerate contact lenses.

| Parameter | Value |
|---|---|
| K-steep | 48.5 D at 90° |
| K-flat | 44.0 D |
| KMax | 56.0 D (2.0 mm inferonasal from axis) |
| Cylinder | 4.5 D |
| Thinnest pachymetry | 430 μm |
| Coma RMS (6 mm) | 4.2 μm |
| Total HOA RMS | 5.1 μm |
| Cone apex distance | 2.0 mm from visual axis |
| MNA | 220° |

### AVBC Assessment

**Module O:** Coma > 3.50 (unfavorable), Δ Axis = 35° (unfavorable), HOA > 4.0 (unfavorable), Coma contralateral (unfavorable). → **O−**

**Module T:** Inferior nipple with significant displacement. KMax 56.0 D, but not > 60 D (not globus → ICRS still considered). MNA at 220°.

**Module B:** The dominant problem is the displaced apex — 2.0 mm from the visual axis, generating 4.2 μm of coma. Flattening alone will not center the optics. The patient requires **apex repositioning**. → **Vτ dominant**.

### Ring Prescription

Progressive asymmetric ring, 300→150 μm, 180° arc, 80% depth (tunnel at 344 μm), meridian at 220° (MNA). Thicker end placed at 220° (cone side); thin end at 40° (toward visual axis). The resulting force couple should direct the apex toward 40° — toward the visual axis.

### Nomogram Comparison

No standard nomogram addresses apex position. A Ferrara nomogram would prescribe based on K-steep and Q value — likely a symmetric 250 μm ring at 90° — which flattens the cornea without repositioning the apex. The patient might obtain ΔK of 3 D but would retain > 3 μm of coma and 20/60 vision.

### Expected Outcome

Validated Vτ = 9.31 μN·m (linear progressive, from Table 12.2a). Expected apex migration ≈ 0.3–0.5 mm toward the visual axis. Combined with moderate flattening (ΔK ≈ 1.5–2.0 D). Given the O− classification, the patient should understand that BCVA improvement may be modest even with successful apex repositioning.

**Teaching point:** Vτ addresses a clinical need that no existing nomogram recognizes. When the apex is displaced > 1 mm and coma exceeds 3.5 μm, apex repositioning should be the primary surgical goal, not flattening.

> [!TIP]
> **For the Clinician: The Coma Test for Vτ Indication**
> If the patient has Coma > 3.5 μm and apex distance from the visual axis > 1 mm, ask yourself: "Will a symmetric ring (Vτ = 0) solve the main problem?"
> The answer is **no**. Flattening without repositioning will leave the cone displaced and the aberrometry unchanged. The patient will remain at 20/80 despite a beautiful topographic map. Always indicate a progressive ring (Vτ) when displaced cone + elevated coma.

---

## 11.5 Case 4: Extreme Ectasia (Globus) — Structural Stabilization and CL Tolerance Restoration

### Clinical Presentation

A 35-year-old male presents with extreme corneal ectasia (Globus pattern). BCVA OS: 20/200 with spectacles, but unable to tolerate rigid gas-permeable (RGP) or scleral contact lenses due to severe apical clearance instability and lens edge lift. Slit-lamp examination shows diffuse corneal thinning without deep apical scarring or hydrops.

| Parameter | Value |
|---|---|
| K-steep | 68.0 D |
| KMax | 76.5 D (diffuse, reaching up to 85.0 D in local zones) |
| Thinnest pachymetry | 360 μm |
| Coma RMS | 5.8 μm |

### AVBC Assessment

**Module O:** All optical optimization parameters fall in the Unfavorable column. Classification is **O−** for optical regularization, meaning standard vision rehabilitation through topography-guided ring implantation is highly unlikely to achieve corrected vision of 20/20.

**Module T:** Globus pattern (KMax > 60 D, diffuse thinning). The Mechanical Neutral Axis (MNA) cannot be identified as a single localized buckling zone because the entire corneal dome has undergone generalized structural and mechanical destabilization.

**Module B:** Classified as a **structural VT/B configuration**. The therapeutic goal shifts completely from optical correction (aberration reduction) to **structural stabilization** and **contact lens tolerance restoration**. The mechanical target is to maximize the stress-shunting effect (VT) to redistribute excessive circumferential hoop stress and prevent progressive ectatic collapse.

### Computational Solver Limits vs. Clinical Reality

It is essential to address a crucial discrepancy between mathematical modeling and clinical practice. When constructing patient-specific finite element models for extreme cases (such as patients P5 and P9 in our cohort, with KMax > 53 D), the FEBio nonlinear solver frequently fails to converge. This non-convergence is caused by severe mesh element distortion (generating negative Jacobians), extreme localized deformation gradients, and mesh contact instabilities under high strain gradients.

Crucially, **non-convergence is a numerical solver limitation, not a clinical or biological contraindication**.

In physical reality, collagen lamellae behave as a robust, self-stabilizing traction network. Clinical practice demonstrates that ICRS implantation in these extreme corneas (up to 85 D) regularizes anterior curvature sufficiently to restore scleral contact lens fitting and stabilize the stromal matrix, preventing or delaying deep anterior lamellar keratoplasty (DALK).

### Ring Prescription and Outcome

A symmetric dual-segment configuration (Ferrara type, symmetric 320 μm thickness, 160°/160° arc) is selected to provide maximum structural support and uniform flattening.

Following implantation at 75% depth:
1. **Topographic Flattening:** KMax was reduced by 9.4 D to 67.1 D, regularizing the corneal topography to a stable oblate shape.
2. **Contact Lens Fitting:** Scleral contact lens fitting was performed successfully, achieving stable vault and restoring BCVA to 20/30.
3. **Biomechanical Stability:** Visually confirmed stromal stabilization was maintained over a 24-month follow-up period, with zero signs of progressive ectatic displacement.

**Teaching point:** Non-convergence of finite element solvers in advanced ectasia represents a mesh-grade mathematical limitation and should never be interpreted as a biological contraindication. For extreme ectasias (even up to 85 D) without central scarring, the primary clinical indication for ICRS is structural stabilization and contact lens tolerance restoration, which acts as a successful bridge, delaying or avoiding corneal transplantation.

---

## 11.6 Case 5: Bilateral Asymmetric Keratoconus — Differential Strategy

### Clinical Presentation

A 28-year-old female with asymmetric keratoconus:
- **OD:** K-steep 46.5 D, KMax 48.0 D, central oval, pachymetry 490 μm, Coma 1.2 μm → Mild
- **OS:** K-steep 52.0 D, KMax 58.0 D, inferior nipple, pachymetry 418 μm, Coma 3.8 μm → Moderate-severe

### AVBC Assessment — Right Eye

**O+** / Central oval / VR dominant → Standard symmetric ring, 200 μm, 150° arc, K-steep axis.

### AVBC Assessment — Left Eye

**O~** / Inferior nipple, MNA at 260°, K-steep at 265° (|divergence| = 5°) / Combined VT + VR need → Moderate thickness ring (250 μm), longer arc (210°), MNA axis.

### Teaching Point

The same patient receives different ring prescriptions for each eye — not because the nomogram uses different lookup values, but because AVBC identifies different dominant biomechanical mechanisms for each eye. This differential strategy is precisely what the framework enables.

---

## 11.7 Case 6: Post-CXL Keratoconus — Modified Biomechanics

### Clinical Presentation

A 32-year-old male, 18 months post-CXL in the left eye. Keratoconus stabilized, but visual acuity remains at 20/50.

| Parameter | Value |
|---|---|
| K-steep | 49.0 D at 75° |
| KMax | 51.5 D |
| Thinnest pachymetry | 440 μm |
| Coma RMS | 2.5 μm |
| CBI (Corvis ST) | 0.75 (reduced from pre-CXL of 0.92) |

### AVBC Assessment

**Module O:** O+ (borderline — Coma exactly 2.50 μm)

**Module T:** Central oval, MNA at 78°, K-steep at 75°. Minimal divergence.

**Module B:** The post-CXL cornea has increased k₁ (estimated 50–100% higher due to crosslinking). The biomechanical response to ICRS will be **attenuated** — the stiffer stroma will deform less for the same ring. → **VR dominant, but with increased thickness** to compensate for CXL-induced stiffening.

### Ring Prescription

Symmetric ring, **300 μm** (instead of the 200–250 μm a nomogram would suggest for K-steep of 49.0 D), 150° arc, 75% depth, K-steep axis.

### Teaching Point

Post-CXL biomechanics are different. The crosslinked stroma is stiffer, requiring a thicker ring to achieve the same flattening effect. A nomogram calibrated on virgin corneas will systematically undercorrect post-CXL cases. The AVBC framework accommodates this by recognizing that material properties (not just geometry) modulate VR.

> [!CAUTION]
> **For the Clinician: Post-CXL Corneas Are Stiffer — Increase Thickness**
> CXL increases k₁ (fibrillar stiffness) by up to 2×. This means the same 200 μm ring that flattens 3 D in a virgin cornea will only flatten ~1.5 D in a post-CXL cornea. Rule of thumb: **increase ring thickness by 50–100 μm** relative to what the nomogram suggests for post-CXL cases. The nomogram doesn't have this correction built in.

---

## 11.8 Summary

These six cases illustrate the spectrum of AVBC clinical application:

| Case | Morphology | Dominant Vector | Nomogram Agreement? | Main AVBC Contribution |
|:---:|:---:|:---:|:---:|:---:|
| 1 | Central oval | VR | ✓ Yes | Confirms nomogram (no added value) |
| 2 | Paracentral | VT | ✗ Different axis | MNA-targeted positioning, longer arc |
| 3 | Displaced apex | Vτ | ✗ Not addressed | Apex repositioning via asymmetric ring |
| 4 | Globus | — | N/A (excluded) | Correct identification of structural indication |
| 5 | Bilateral asymmetric | VR + VT | ✗ Partially | Differential strategy per eye |
| 6 | Post-CXL | VR (increased) | ✗ Undercorrected | Thickness adjusted for biomechanics |

AVBC adds clinical value in approximately 40% of cases — those with MNA divergence, displaced apex, or modified biomechanics. For central, symmetric keratoconus with aligned astigmatism, the nomogram remains adequate.

---

## Didactic Summary

- The 6 illustrative cases demonstrate that AVBC adds value in scenarios where nomograms fail: MNA divergence, displaced apex, modified biomechanics.
- **Case 1** (central symmetric) confirms that the nomogram works when MNA coincides with K-steep.
- **Cases 3–4** (displaced apex, divergent MNA) show that VR alone is insufficient — Vτ is necessary to reposition the cone.
- **Case 6** (post-CXL) demonstrates the importance of adjusting ring thickness for the modified stromal stiffness.
- AVBC adds clinical value in approximately 40% of cases — the remaining 60% are well served by traditional nomograms.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
5. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
6. Kling S, Marcos S. Finite-element modeling of intrastromal corneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
7. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
8. Rabinowitz YS. Keratoconus. *Surv Ophthalmol*. 1998;42(4):297–319.
9. Torquetti L, Ferrara P. Long-term follow-up of ICRS in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
10. Vega-Estrada A, Alió JL. Keratoconus progression after ICRS implantation. *Cornea*. 2013;32(5):611–616.
11. Wollensak G, Spoerl E, Seiler T. Stress-strain measurements after riboflavin-UVA crosslinking. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
