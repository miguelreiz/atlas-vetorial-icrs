<!-- GPT revision applied -->
# Chapter 10 — Clinical Workflow: From Map to Ring

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part III — From Theory to Clinical Practice*

> **Key Points**
> - The AVBC clinical workflow follows a **5-step protocol**: Data → Module O → Module T → Module B → Prescription.
> - Step 1: Obtain Pentacam, aberrometry, and refraction data.
> - Step 2: Classify optical coherence (O+, O~, O−) using the ACE index.
> - Step 3: Identify topographic archetype and measure MNA divergence.
> - Step 4: Select dominant vector(s) and compute ring parameters.
> - Step 5: Generate prescription with expected VR, VT, Vτ values.


---

## 10.1 Introduction

The previous chapters established the theoretical framework: the three biomechanical vectors (VR, VT, Vτ), their extraction from finite element models, their dependence on ring parameters, and the integrated AVBC classification system. The challenge now is translation — converting this framework into a reproducible clinical workflow that a corneal surgeon can apply in their office.

This chapter presents the AVBC clinical protocol as a sequential decision tree. The workflow distills the trimodal assessment (O, T, B) into a series of practical steps, each supported by quantitative criteria and linked to specific examination instruments. Two practical clinical examples illustrate the protocol from initial assessment through ring selection to expected outcome estimation.

The protocol is designed to be additive, not disruptive: it adds biomechanical reasoning to the existing clinical examination rather than replacing it. The surgeon who already performs Pentacam tomography, wavefront aberrometry, and clinical refraction under cycloplegia has all the data needed for AVBC assessment. The framework reorganizes and reinterprets these data within a mechanical context.

> [!NOTE]
> **For the Clinician: AVBC Pre-Operative Checklist**
> Before proceeding to the operating room, confirm you have all necessary data:
> - `[ ]` Manifest and cycloplegic refraction (Sphere, Cyl, Axis)
> - `[ ]` Scheimpflug tomography (Pentacam/Galilei) with anterior and posterior maps
> - `[ ]` MNA calculated (Posterior Elevation BFS 8 mm → peak meridian)
> - `[ ]` Wavefront aberrometry (Coma, Total HOA — 6 mm pupil)
> - `[ ]` Local pachymetry at the planned implant meridian (for RT_max)
> - `[ ]` O classification (O+, O~, O−) documented
> - `[ ]` Topographic Archetype (T Module) documented
> - `[ ]` Dominant Vector selected (VR / VT / Vτ)
> - `[ ]` Final ring prescription (thickness, arc, meridian, depth) verified against RT_max

---

![Figure 10.1 — AVBC clinical workflow: from the topographic map to the ring.](book_figures/fig_10_01_fluxo_clinico_completo.svg)

## 10.2 Pre-Operative Assessment: The AVBC Examination Sequence

### Step 1 — Standard Ophthalmic Examination

Before any biomechanical assessment, the standard clinical evaluation must be completed:

- **Best-corrected visual acuity (BCVA):** Snellen or logMAR, with spectacle correction and rigid contact lens trial. The difference between spectacle and contact lens BCVA is a rough indicator of irregular astigmatism burden.
- **Manifest and cycloplegic refraction:** Sphere, cylinder, axis. These data feed into the Optical module.
- **Slit-lamp biomicroscopy:** Evaluate corneal clarity, Vogt striae, Fleischer ring, scarring. Significant central scarring may contraindicate ICRS or require lamellar keratoplasty.
- **Pachymetry at the tunnel site:** The minimum stromal thickness at the planned implantation radius (typically 5.0–6.0 mm from the visual axis) must exceed 400 μm to safely accommodate the ring at a depth of 70–80%. The local corneal thickness (CT) at the exact planned implantation meridian must be recorded to calculate the maximum safe ring thickness (RT_max) under the **Thickness Law**.
- **Intraocular pressure:** Goldmann or dynamic contour tonometry. IOP values inform the FEM loading condition (15 mmHg is the standard modeling assumption; significant deviations require model adjustment).

### Step 2 — Corneal Tomography (T Module Input)

Scheimpflug tomography (Pentacam, Galilei, or equivalent) provides the spatial map of ectasia:

- **Sagittal curvature map:** Identify the topographic pattern — central oval, inferior nipple, paracentral crescent, peripheral D-shape, or globus.
- **Posterior elevation map:** Calculate the MNA (Mechanical Neutral Axis) — the meridian of maximum posterior elevation relative to the best-fit sphere. Record the MNA angle (°) and compare with the K-steep axis.
- **Thinnest point location and value:** The thinnest pachymetric point often correlates with the cone apex. Record its distance from the visual axis (mm) and meridian.
- **KMax and K-steep values:** Record for nomogram comparison and VR estimation.

**MNA Determination Protocol:**

1. Open the posterior elevation map (4-map refractive display).
2. Select the best-fit sphere (BFS) with a diameter of 8.0 mm.
3. Identify the meridian passing through the maximum posterior elevation point.
4. Record this meridian as the MNA.
5. Compare with the K-steep axis: if |MNA − K-steep| > 15°, AVBC assessment is indicated; if > 45°, nomogram planning is unreliable.

### Step 3 — Wavefront Aberrometry (O Module Input)

Wavefront analysis provides the optical context:

- **Coma RMS (6 mm pupil):** The primary high-order aberration in keratoconus. Values < 2.50 μm are favorable; > 3.50 μm are unfavorable for functional improvement with ICRS alone.
- **Total HOA RMS (6 mm pupil):** Values < 2.0 μm are favorable; > 4.0 μm suggest that geometric correction alone may not restore useful optics.
- **Axis alignment:** Compare refractive cylinder axis with steep topographic axis. Divergence > 30° suggests the aberration profile is complex and may not respond to standard ring positioning.
- **Coma vector vs cone apex:** Determine whether the coma vector is ipsilateral (favorable) or contralateral (unfavorable) to the cone apex.

### Step 4 — Biomechanical Assessment (B Module Input)

If available, direct biomechanical measurements refine the assessment:

- **Corvis ST:** Deformation amplitude, stiffness parameter (SP-A1), CBI. These provide qualitative confirmation of biomechanical compromise.
- **ORA:** CH and CRF. Reduced values support the biomechanical disease model.
- **Brillouin microscopy (if available):** Regional stiffness mapping provides the most direct assessment of material property variation.

In the absence of direct biomechanical measurements — which remains the clinical reality at most centers — the AVBC framework uses topographic and tomographic surrogates: the pachymetric distribution, posterior elevation pattern, and MNA divergence serve as indirect indicators of the biomechanical state.

---

## 10.3 O Module Classification

Apply the optical criteria from Chapter 4:

| Criterion | Favorable | Intermediate | Unfavorable |
|---|---|---|---|
| Coma RMS (6 mm) | < 2.50 μm | 2.50–3.50 μm | > 3.50 μm |
| Δ Axis (refraction vs K) | < 15° | 15°–30° | > 30° |
| Total HOA RMS | < 2.0 μm | 2.0–4.0 μm | > 4.0 μm |
| Coma vs apex | Ipsilateral | Ambiguous | Contralateral |

**Classification rule:**
- **O+** (≥ 3 favorable): Proceed with ICRS; expect both topographic and functional improvement.
- **O~** (mixed): Proceed, but counsel the patient that functional improvement may be partial; consider adjunctive correction.
- **O−** (≥ 3 unfavorable): ICRS may still be implanted for topographic management, but align expectations accordingly. Consider that the primary goal may be facilitating contact lens fitting rather than spectacle independence.

---

## 10.4 T Module Classification

Determine the topographic morphology and MNA:

| Morphology | Typical MNA | Ring Positioning Strategy |
|---|---|---|
| Central oval | Near the visual axis | Symmetric ring, centered |
| Inferior nipple | 6 o'clock | Inferior segment, thicker inferiorly |
| Paracentral crescent | Variable, decentered | Single segment or asymmetric pair, targeted to cone |
| Peripheral D-shape | Peripheral, > 2 mm from axis | Wide arc or two segments |
| Globus (KMax > 60 D) | — | **Structural stabilization / CL tolerance (up to 85 D)** |

Record MNA divergence: |MNA − K-steep|.

---

## 10.5 B Module: Vector Selection

Based on the clinical need identified through Modules O and T, determine the dominant vector:

**Decision tree:**

1. **Is the primary need flattening (high K-steep, aligned astigmatism)?**
 → **VR dominant** → Increase ring **thickness** (300–400 μm). Arc length secondary.

2. **Is the primary need astigmatism regularization (high irregular Cyl, MNA ≠ K-steep)?**
 → **VT dominant** → Increase **arc length** (160°–320°). Thickness secondary.

3. **Is the primary need apex repositioning (apex > 1 mm from visual axis, high coma)?**
 → **Vτ dominant** → Use **asymmetric ring** (progressive thickness profile), oriented along MNA.

4. **Is the primary need stabilization (progressive ectasia)?**
 → **VR + VT combined** → Perform **CXL first** (3–6 month interval), then ICRS.

5. **Multiple needs?**
 → Prioritize by clinical urgency. Typically: stabilize first, then regularize, then flatten.

> [!TIP]
> **For the Clinician: The 3-Vector Rule in 3 Questions**
> Before opening the ring catalog, answer these 3 questions in sequence:
> 1. **"Does my patient primarily need to reduce myopia?"** → VR → Thickness.
> 2. **"Does my patient primarily need to eliminate irregular astigmatism?"** → VT → Long Arc.
> 3. **"Does my patient primarily need to center a displaced cone?"** → Vτ → Progressive Ring.
>
> Most patients have more than one need. Prioritize the dominant vector and adjust the others as secondary modulators.

---

## 10.6 Ring Prescription

With the dominant vector identified, translate to ring parameters:

### VR-Dominant Prescription

| Parameter | Value | Rationale |
|---|---|---|
| Thickness | 250–400 μm (proportional to desired ΔK) | VR scales with volume; **strictly subject to RT_max ≤ CT × 0.60** |
| Arc length | 120°–160° (standard) | Arc length does not modulate VR |
| Profile | Symmetric | No torque needed |
| Depth | 70–80% of pachymetry | Amplifies VR |
| Meridian | K-steep axis | When MNA ≈ K-steep |

**Expected VR effect:** Our FEM models show a central VR of 19.2–19.9 μm for partial arcs with standard geometry. Clinical translation: ΔK ≈ 2–4 D, depending on thickness and patient-specific biomechanics.

### VT-Dominant Prescription

| Parameter | Value | Rationale |
|---|---|---|
| Thickness | 150–250 μm (moderate) | VR is secondary; **strictly subject to RT_max ≤ CT × 0.60** |
| Arc length | 210°–320° (long arc) | VT equation: each degree reduces σ_θθ by 0.0018 kPa |
| Profile | Symmetric | Unless Vτ is also needed |
| Depth | 70–75% of pachymetry | Moderate depth sufficient |
| Meridian | MNA axis | Targeted to the zone of maximum biomechanical deformation |

**Expected VT effect:** VT(210°) = 7.39 kPa; VT(320°) = 7.20 kPa. Longer arcs produce more regularization, following the linear relationship VT(arc°) = −0.0018 × arc° + 7.79.

### Vτ-Dominant Prescription

| Parameter | Value | Rationale |
|---|---|---|
| Thickness profile | Progressive (e.g., 300→150 μm) | Generates asymmetric force couple; **maximum thickness strictly subject to RT_max ≤ CT × 0.60** |
| Arc length | 160°–210° | Sufficient for torque generation |
| Profile | Asymmetric (progressive) | Essential for Vτ |
| Depth | 70–80% of pachymetry | Amplifies torque |
| Meridian | MNA axis | Vτ direction should steer apex toward visual axis |

**Orientation rule:** The thicker end of the progressive ring is placed *on the same side as the cone* — the apex migrates *away* from the thickest segment because the force couple generated by asymmetric thickness creates a bending moment that directs displacement toward the region of lesser restriction.

> [!CAUTION]
> **For the Clinician: Don't Invert the Progressive Ring!**
> In a progressive-thickness ring (e.g., 300→150 µm), the thick end must be placed on the **same side as the cone** (not the opposite side!). The volume gradient pushes the cone **away from the thickest segment**. Therefore:
> - Inferior cone → thick end inferiorly → cone migrates upward (centralizes).
> - If you accidentally invert the ring, the cone will be displaced further downward! Always verify orientation under the microscope before closing the tunnel.

### 10.6.4 The Relative Thickness Law (Thickness Law)

To prevent stromal bridge collapse, melting, localized mechanical necrosis, or pressure-induced extrusion, the AVBC protocol implements a strict safety law validated by 60 high-fidelity finite element simulations. The **Relative Thickness Law (Thickness Law)** dictates that the maximum safe ring thickness (RT_max) is strictly limited by the local corneal thickness (CT) at the exact meridian of the implantation plan:

RT_max ≤ CT × 0.60

This proportionality rule ensures that a minimum of 40% of the local corneal thickness is preserved as a load-bearing stromal bridge over the implant. The safety limit varies slightly based on the specific segment geometric profile:

1. **Triangular profiles (Ferrara / Mediphacos):** Follow the standard limit of **0.60** (RT_max ≤ CT × 0.60).
2. **Ferrara High Myopia (HM) profiles:** Limited to a conservative limit of **0.55** (RT_max ≤ CT × 0.55) due to high apical vertical stress concentrations and sharp geometric edges that increase the risk of stromal erosion.
3. **Rounded profiles (Cornealring):** Follow the standard limit of **0.60** (RT_max ≤ CT × 0.60). The smoother contact mechanics and uniform stress distribution of rounded geometries provide excellent safety margins even at the upper limit of the proportionality rule.

Before finalizing any ring prescription, the surgeon must calculate RT_max using the local pachymetry at the implantation meridian. If the planned thickness exceeds RT_max, the prescription must be reduced to the immediately available segment thickness below the safety limit.

---

## 10.7 Practical Clinical Examples

### Example 1: Symmetric Central Keratoconus — VR Dominant

**Patient:** 28-year-old male. K-steep 49.5 D, K-flat 45.0 D, cylinder 4.5 D at 85°. KMax 51.0 D (central). Thinnest pachymetry 462 μm centrally. BCVA 20/40 with spectacles.

**O Module:** Coma RMS = 1.8 μm (favorable), Δ Axis = 8° (favorable), total HOA = 1.6 μm (favorable), Coma ipsilateral (favorable). → **O+**

**T Module:** Central oval morphology. MNA at 88°, K-steep at 85°. |MNA − K-steep| = 3° < 15°. → Standard positioning, MNA ≈ K-steep.

**B Module:** Primary need is flattening (K-steep 49.5 D, aligned astigmatism). → **VR dominant**

**Prescription:**
- Ring: Ferrara 250 μm, arc 160°, symmetric
- Depth: 75% of 462 μm = 347 μm → tunnel at 350 μm
- Meridian: 85° (K-steep ≈ MNA)
- Expected ΔK: 2.5–3.5 D (VR-based estimate)

### Example 2: Paracentral Keratoconus with Axis Divergence — VT + Vτ Dominant

**Patient:** 32-year-old female. K-steep 52.0 D, K-flat 46.0 D, cylinder 6.0 D at 65°. KMax 55.0 D (1.5 mm inferotemporal from visual axis). Thinnest pachymetry 435 μm. BCVA 20/60.

**O Module:** Coma RMS = 3.2 μm (intermediate), Δ Axis = 25° (intermediate), total HOA = 3.5 μm (intermediate), Coma contralateral (unfavorable). → **O~**

**T Module:** Paracentral crescent morphology. MNA at 250°, K-steep at 65°. → Targeted to inferotemporal cone.

**B Module:** Primary need is regularization (high irregular cylinder, displaced apex). Secondary need: apex repositioning (apex 1.5 mm from visual axis, coma 3.2 μm). → **VT + Vτ dominant**

**Prescription:**
- Ring: Asymmetric progressive, 250→150 μm, arc 210°
- Depth: 75% of 435 μm = 326 μm → tunnel at 325 μm
- Meridian: MNA axis (250°), thick end superiorly
- Expected effect: Astigmatism regularization (VT at 210° = 7.39 kPa, −5.0% from baseline) + moderate apex shift (Vτ validated = 11.76 μN·m)
- Counsel patient: O~ classification → uncertain functional improvement; contact lens fitting may still be necessary

---

## 10.8 Post-Operative Evaluation: The AVBC Feedback Loop

### Immediate Post-Op (Day 1 – Week 1)

- Confirm ring position and depth (slit lamp, anterior segment OCT)
- Evaluate adverse events (extrusion, infection, perforation)
- No topographic assessment (edematous cornea, unreliable)

### Early Assessment (1 Month)

- Uncorrected and best-corrected visual acuity
- Topography: assess flattening (ΔK = K-steep_pre − K-steep_post)
- Initial comparison: ΔK_observed vs ΔK_expected (from VR estimate)

### Definitive Assessment (3–6 Months)

Complete AVBC feedback analysis:

1. **VR assessment:** ΔK_induced = K-steep_pre − K-steep_post. Compare with VR_predicted.
 - **AVBC-CI (flattening)** = ΔK_induced / ΔK_predicted
 - CI = 1.0 ± 0.1 → ideal
 - CI < 0.8 → undercorrection (consider higher thickness next time)
 - CI > 1.2 → overcorrection (reduce thickness next time)

2. **VT assessment:** ΔCyl_induced = Cyl_pre − Cyl_post (regularization component).
 - **VT-ratio** = ΔCyl_induced / ΔCyl_expected
 - Evaluate HOA improvement, particularly coma and trefoil

3. **Vτ assessment (if asymmetric ring used):** Measure apex migration on posterior elevation map.
 - **Vτ-ratio** = Observed_apex_migration / Expected_apex_migration
 - Positive migration toward visual axis → effective torque

### Building the Personal Calibration Curve

Over N surgeries, the surgeon accumulates personal AVBC-CI values. The mean CI represents the surgeon's personal calibration factor, analogous to the A-constant in IOL calculation. If the mean CI is consistently 0.85 (systematic undercorrection), the surgeon can adjust future predictions by dividing by 0.85 — a systematic improvement in accuracy with each additional case.

This surgeon-specific feedback loop is a direct structural parallel to the Alpins method and represents one of the highest practical-value aspects of the AVBC framework.

> [!NOTE]
> **For the Clinician: The AVBC Diary — 5 Minutes per Case**
> After each surgery, record in a simple spreadsheet:
> | Date | Case | Thickness | Arc | VR Predicted | VR Actual (ΔK post) | CI_R |
> |------|------|-----------|------|-------------|------------------|------|
>
> After 20 cases, calculate your mean CI_R. That is your personal "AVBC factor." If it is 0.85, always multiply recommended thicknesses by 1.18. Simple, but powerful.

---

## 10.9 Summary

- The AVBC clinical workflow is a **sequential three-module assessment** (O → T → B) that translates biomechanical understanding into ring selection.
- The protocol is **additive**: it uses existing clinical data (topography, aberrometry, refraction) reorganized within a mechanical framework.
- The **MNA** (Mechanical Neutral Axis) is a critical parameter that must be assessed for every keratoconus patient — when MNA diverges from K-steep by > 15°, nomogram accuracy degrades.
- Ring parameters map to specific vectors: **thickness → VR**, **arc length → VT**, **asymmetry → Vτ**, **depth → universal amplifier**.
- Post-operative evaluation using the **AVBC feedback loop** (AVBC-CI, VT-ratio, Vτ-ratio) enables surgeon-specific calibration analogous to the Alpins Correction Index.
- Over time, each surgeon builds a **personal calibration curve** that systematically improves predictive accuracy.

---

## Didactic Summary

- The AVBC clinical flow follows 5 steps: **Data Collection → O Module → T Module → B Module → Prescription**.
- The **MNA** diverges from K-steep in up to 40% of cases — when divergence > 15°, nomogram accuracy degrades significantly.
- Ring parameters map directly to vectors: **thickness → VR**, **arc → VT**, **asymmetry → Vτ**, **depth → universal amplifier**.
- The AVBC feedback loop (AVBC-CI, VT-ratio, Vτ-ratio) enables surgeon-specific calibration, analogous to the Alpins CI.
- Over time, each surgeon builds a **personal calibration curve** that systematically improves predictive accuracy.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. A new method of analyzing vectors for changes in astigmatism. *J Cataract Refract Surg*. 1993;19(4):524–533.
3. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
4. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
5. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
6. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
7. Kling S, Marcos S. Finite-element modeling of intrastromal corneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
8. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
9. Rabinowitz YS. Keratoconus. *Surv Ophthalmol*. 1998;42(4):297–319.
10. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
11. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
