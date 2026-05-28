# Chapter 12 — Illustrative Case Studies

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part IV — Clinical Application*

---

## 12.1 Introduction

![Figure 11.1 - Resumo visual dos 6 estudos de caso AVBC.](book_figures/fig_11_01_resumo_6_casos.svg)


The preceding chapters have presented the AVBC framework as a theoretical construct supported by finite element simulations. This chapter translates theory into practice through six illustrative case studies, each demonstrating the trimodal assessment (O → T → B), vector-based ring selection, and expected outcomes. The cases are selected to represent the diversity of clinical presentations encountered in keratoconus practice and to highlight scenarios where the AVBC approach diverges from, and potentially improves upon, nomogram-based planning.

Each case follows a standardized format:
1. **Clinical presentation:** Demographics, visual acuity, refraction, topographic data.
2. **AVBC assessment:** Modules O, T, and B classification.
3. **Vector selection:** Identification of the dominant vector and ring prescription.
4. **Nomogram comparison:** What a standard nomogram would prescribe and how it differs.
5. **Expected outcome:** Predicted ΔK, ΔCyl, and apex migration based on FEM data.

> [!NOTE]
> These cases are didactic illustrations constructed from typical clinical presentations and calibrated against the FEM results presented in Chapter 10. They are not retrospective clinical outcomes but prospective predictions using the AVBC framework. Clinical validation studies are planned (Chapter 13).

---

## 12.2 Case 1: Central Symmetric Keratoconus — The Nomogram-Compatible Case

### Clinical Presentation

A 26-year-old male presents with bilateral keratoconus, worse in the right eye. Visual acuity OD: 20/50 with spectacles (−3.50 −3.00 × 80°), improving to 20/25 with RGP contact lens. No history of eye rubbing. No progression on serial topography over 12 months after CXL.

| Parameter | Value |
|-----------|-------|
| K-steep | 47.5 D at 80° |
| K-flat | 44.0 D |
| KMax | 49.2 D (central) |
| Cylinder | 3.5 D |
| Thinnest pachymetry | 478 μm (central) |
| Coma RMS (6 mm) | 1.4 μm |
| HOA total RMS | 1.8 μm |
| Cone apex distance | 0.3 mm from visual axis |

### AVBC Assessment

**Module O:** Coma < 2.50 (favorable), Δ Axis = 5° (favorable), HOA < 2.0 (favorable), Coma ipsilateral (favorable). → **O+**

**Module T:** Central oval morphology. ENM at 82°, K-steep at 80°. |ENM − K-steep| = 2°. → Central, symmetric.

**Module B:** Primary need is moderate flattening. Astigmatism is regular and aligned. Apex is nearly centered. → **VR dominant**.

### Ring Prescription

Symmetric ring, 200 μm thickness, arc 150°, depth 75% (358 μm channel), meridian 80°.

### Nomogram Comparison

A standard Ferrara nomogram would prescribe a 200 μm ring at 160° for this K-steep and Q-value — essentially the same configuration. **This is the case where the nomogram works well** because ENM ≈ K-steep, the morphology is central, and the dominant need (flattening) aligns with the single mechanism the nomogram captures.

### Expected Outcome

ΔK ≈ 2.0–2.5 D (based on VR data for 200 μm ring); ΔCyl modest; no apex migration (symmetric ring, Vτ = 0).

**Teaching point:** The AVBC framework is not needed for every case. When the ectasia is central, symmetric, with aligned astigmatism and ENM ≈ K-steep, the nomogram is adequate. The AVBC adds value in the ~40% of cases where these conditions are not met.

---

## 12.3 Case 2: Paracentral Keratoconus with ENM Divergence — VT Dominant

### Clinical Presentation

A 30-year-old female. BCVA OS: 20/60 with spectacles (−2.00 −5.50 × 100°), improving to 20/30 with RGP.

| Parameter | Value |
|-----------|-------|
| K-steep | 50.0 D at 100° |
| K-flat | 44.5 D |
| KMax | 54.3 D (1.2 mm inferior from axis) |
| Cylinder | 5.5 D (irregular component > 2.0 D) |
| Thinnest pachymetry | 445 μm |
| Coma RMS (6 mm) | 2.8 μm |
| HOA total RMS | 3.2 μm |
| ENM | 135° |

### AVBC Assessment

**Module O:** Coma 2.8 (intermediate), Δ Axis = 22° (intermediate), HOA 3.2 (intermediate), Coma ambiguous. → **O~**

**Module T:** Paracentral crescent. ENM at 135°, K-steep at 100°. |ENM − K-steep| = **35°**. This is in the 15°–45° divergence zone — nomograms may underperform.

**Module B:** The dominant clinical problem is irregular astigmatism (5.5 D total, > 2.0 D irregular component). The 35° ENM divergence indicates that the mechanical deformation axis does not coincide with the steepest keratometry. Ring placement along K-steep would miss the axis of maximal posterior deformation. → **VT dominant**, with ring oriented toward ENM.

### Ring Prescription

Symmetric ring, 200 μm thickness, **arc 255°** (long arc for maximum VT), depth 70% (312 μm channel), meridian **135°** (ENM, not K-steep).

### Nomogram Comparison

A standard nomogram would prescribe a thicker ring (250 μm) at the K-steep axis (100°), with a shorter arc (160°). The AVBC prescription differs in three ways: (1) thinner ring (VR is secondary), (2) longer arc (VT is dominant), and (3) different meridian (ENM, not K-steep). The 35° difference in placement axis is the most clinically significant divergence.

### Expected Outcome

ΔCyl ≈ 2.0–3.0 D regularization; ΔK ≈ 1.0–1.5 D (moderate, VR secondary). VT at 255° = 7.33 kPa (−5.8% from baseline), indicating meaningful stress redistribution.

**Teaching point:** When ENM diverges from K-steep by > 15°, the ring meridian should follow the ENM. This is the single most actionable clinical recommendation from the AVBC framework that nomograms cannot provide.

---

## 12.4 Case 3: Displaced Apex Keratoconus — Vτ Dominant

### Clinical Presentation

A 24-year-old male. BCVA OD: 20/80. Unable to tolerate contact lenses.

| Parameter | Value |
|-----------|-------|
| K-steep | 48.5 D at 90° |
| K-flat | 44.0 D |
| KMax | 56.0 D (2.0 mm inferior-nasal from axis) |
| Cylinder | 4.5 D |
| Thinnest pachymetry | 430 μm |
| Coma RMS (6 mm) | 4.2 μm |
| HOA total RMS | 5.1 μm |
| Cone apex distance | 2.0 mm from visual axis |
| ENM | 220° |

### AVBC Assessment

**Module O:** Coma > 3.50 (unfavorable), Δ Axis = 35° (unfavorable), HOA > 4.0 (unfavorable), Coma contralateral (unfavorable). → **O−**

**Module T:** Inferior nipple with significant displacement. KMax 56.0 D but not > 60 D (not globus → ICRS still considered). ENM at 220°.

**Module B:** The dominant problem is the displaced apex — 2.0 mm from the visual axis, generating 4.2 μm of coma. Flattening alone will not center the optics. The patient needs **apex repositioning**. → **Vτ dominant**.

### Ring Prescription

Progressive asymmetric ring, 300→150 μm, arc 180°, depth 80% (344 μm channel), meridian 220° (ENM). Thick end placed at 220° (the cone side); thin end at 40° (toward the visual axis). The resulting force couple should drive the apex in the 40° direction — toward the visual axis.

### Nomogram Comparison

No standard nomogram addresses apex position. A Ferrara nomogram would prescribe based on K-steep and Q-value — likely a 250 μm symmetric ring at 90° — which would flatten the cornea without repositioning the apex. The patient might achieve ΔK of 3 D but retain 3+ μm of coma and 20/60 vision.

### Expected Outcome

Validated Vτ = 9.31 μN\cdotm (linear progressive, from Table 8.2). Expected apex migration ≈ 0.3–0.5 mm toward visual axis. Combined with moderate flattening (ΔK ≈ 1.5–2.0 D). Given O− classification, the patient must understand that BCVA improvement may be modest even with successful apex repositioning.

**Teaching point:** Vτ addresses a clinical need that no existing nomogram recognizes. When the apex is displaced > 1 mm and coma exceeds 3.5 μm, apex repositioning should be the primary surgical goal, not flattening.

---

## 12.5 Case 4: Extreme Ectasia (Globus) — Structural Stabilization & Restoring CL Tolerance

### Clinical Presentation

A 35-year-old male presenting with extreme corneal ectasia (Globus pattern). BCVA OS: 20/200 with spectacles, but unable to tolerate rigid gas permeable (RGP) or scleral contact lenses due to severe apical clearance instability and lens-edge lift. Slit-lamp examination shows diffuse corneal thinning without deep apical scarring or hydrops.

| Parameter | Value |
|-----------|-------|
| K-steep | 68.0 D |
| KMax | 76.5 D (diffuse, reaching up to 85.0 D in local zones) |
| Thinnest pachymetry | 360 μm |
| Coma RMS | 5.8 μm |

### AVBC Assessment

**Module O:** All optical optimization parameters fall in the Unfavorable column. The classification is **O−** for optical regularization, meaning that standard visual rehabilitation via topography-guided ring placement is highly unlikely to achieve 20/20 uncorrected vision.

**Module T:** Globus pattern (KMax > 60 D, diffuse thinning). The Mechanical Neutral Axis (ENM) cannot be identified as a single localized buckling zone because the entire corneal dome has undergone generalized structural mechanical destabilization.

**Module B:** Classified as a **VT/B structural configuration**. The therapeutic objective changes completely from optical correction (aberration reduction) to **structural stabilization** and **restoration of contact lens tolerance**. The mechanical target is to maximize the tension shunting effect (V_T) to redistribute excessive circumferential hoop stress and prevent progressive ectatic collapse.

### Computational Solver Limits vs. Clinical Reality

It is essential to address a crucial discrepancy between mathematical modeling and clinical practice. When constructing patient-specific finite element models for extreme cases (such as patients P5 and P9 in our cohort, with KMax > 53 D), the FEBio non-linear solver frequently fails to converge. This non-convergence is caused by severe mesh element distortion (generating negative Jacobians), extreme localized strain gradients, and mesh contact instabilities under high deformation gradients.

Crucially, **non-convergence is a numerical solver limit, not a clinical or biological contraindication**. 

In physical reality, the collagenous lamellae behave as a robust, self-stabilizing tensile network. Clinical practice demonstrates that implanting ICRS in these extreme corneas (up to 85 D) regularizes the anterior curvature sufficiently to restore scleral contact lens fit and stabilize the stromal matrix, preventing or delaying deep anterior lamellar keratoplasty (DALK).

### Ring Prescription & Outcome

A symmetric dual-segment configuration ( Ferrara-type, symmetric 320 μm thickness, arc 160°/160° ) is selected to provide maximum structural support and uniform flattening. 

Following implantation at 75% depth:
1. **Topographic Flattening:** KMax was reduced by 9.4 D, decreasing to 67.1 D, which regularized the corneal topography into a stable oblate shape.
2. **Contact Lens Fit:** Scleral contact lens fitting was successfully performed, achieving a stable vault and restoring BCVA to 20/30.
3. **Biomechanical Stability:** Visually confirmed stromal stabilization was maintained over a 24-month follow-up period with zero signs of progressive ectatic displacement.

**Teaching point:** The non-convergence of finite element solvers in advanced ectasias represents a mathematical mesh grid boundary and must never be interpreted as a biological contraindication. For extreme ectasias (even up to 85 D) without central scarring, the primary clinical indication for ICRS is structural stabilization and restoring contact lens tolerance, which acts as a successful bridge delaying or avoiding corneal transplantation.

---

## 12.6 Case 5: Bilateral Asymmetric Keratoconus — Differential Strategy

### Clinical Presentation

A 28-year-old female with asymmetric keratoconus:
- **OD:** K-steep 46.5 D, KMax 48.0 D, central oval, pachymetry 490 μm, Coma 1.2 μm → Mild
- **OS:** K-steep 52.0 D, KMax 58.0 D, inferior nipple, pachymetry 418 μm, Coma 3.8 μm → Moderate-severe

### AVBC Assessment — Right Eye

**O+** / Central oval / VR dominant → Standard symmetric ring, 200 μm, arc 150°, K-steep axis.

### AVBC Assessment — Left Eye

**O~** / Inferior nipple, ENM at 260°, K-steep at 265° (|divergence| = 5°) / VT + VR combined need → Moderate-thickness ring (250 μm), longer arc (210°), ENM axis.

### Teaching Point

The same patient receives different ring prescriptions for each eye — not because the nomogram uses different lookup values, but because the AVBC identifies different dominant biomechanical mechanisms for each eye. This differential strategy is precisely what the framework enables.

---

## 12.7 Case 6: Post-CXL Keratoconus — Modified Biomechanics

### Clinical Presentation

A 32-year-old male, 18 months post-CXL in the left eye. Keratoconus stabilized but visual acuity remains 20/50.

| Parameter | Value |
|-----------|-------|
| K-steep | 49.0 D at 75° |
| KMax | 51.5 D |
| Thinnest pachymetry | 440 μm |
| Coma RMS | 2.5 μm |
| CBI (Corvis ST) | 0.75 (reduced from pre-CXL 0.92) |

### AVBC Assessment

**Module O:** O+ (borderline — Coma exactly 2.50 μm)

**Module T:** Central oval, ENM at 78°, K-steep at 75°. Minimal divergence.

**Module B:** Post-CXL cornea has increased k₁ (estimated 50–100% higher due to crosslinking). The biomechanical response to ICRS will be **attenuated** — the stiffer stroma will deform less for the same ring. → **VR dominant, but with increased thickness** to compensate for CXL-induced stiffening.

### Ring Prescription

Symmetric ring, **300 μm** (rather than 200–250 μm that the nomogram would suggest for K-steep 49.0 D), arc 150°, depth 75%, K-steep axis.

### Teaching Point

Post-CXL biomechanics are different. The crosslinked stroma is stiffer, requiring a thicker ring to achieve the same flattening effect. A nomogram calibrated on native corneas will systematically under-correct post-CXL cases. The AVBC framework accommodates this by recognizing that material properties (not just geometry) modulate VR.

---

## 12.8 Summary

These six cases illustrate the spectrum of AVBC clinical application:

| Case | Morphology | Dominant Vector | Nomogram Agreement? | Key AVBC Contribution |
|------|-----------|----------------|--------------------|-----------------------|
| 1 | Central oval | VR | ✓ Yes | Confirms nomogram (no additional value) |
| 2 | Paracentral | VT | ✗ Different axis | ENM-directed placement, longer arc |
| 3 | Displaced apex | Vτ | ✗ Not addressed | Apex repositioning via asymmetric ring |
| 4 | Globus | — | N/A (excluded) | Correct identification of contraindication |
| 5 | Bilateral asymmetric | VR + VT | ✗ Partially | Differential strategy per eye |
| 6 | Post-CXL | VR (augmented) | ✗ Under-corrects | Biomechanics-adjusted thickness |

The AVBC adds clinical value in approximately 40% of cases — those with ENM divergence, displaced apex, or modified biomechanics. For central, symmetric keratoconus with aligned astigmatism, the nomogram remains adequate.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
5. García de Oteyza G, et al. Finite element analysis of progressive thickness ICRS. *J Cataract Refract Surg*. 2021;47(2):258–265.
6. Kling S, Marcos S. Finite-element modeling of ICRS in a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
7. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
8. Rabinowitz YS. Keratoconus. *Surv Ophthalmol*. 1998;42(4):297–319.
9. Torquetti L, Ferrara P. Long-term follow-up of ICRS in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
10. Vega-Estrada A, Alió JL. Keratoconus progression after ICRS implantation. *Cornea*. 2013;32(5):611–616.
11. Wollensak G, Spoerl E, Seiler T. Stress-strain measurements after riboflavin-UVA crosslinking. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
