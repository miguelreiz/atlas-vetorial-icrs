# Chapter 11 — Clinical Workflow: From Map to Ring

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
> *Part IV — Clinical Application*

---

## 11.1 Introduction

The preceding chapters have established the theoretical framework: the three biomechanical vectors (VR, VT, Vτ), their extraction from finite element models, their dependence on ring parameters, and the integrated AVBC classification system. The challenge now is translation — converting this framework into a reproducible clinical workflow that a corneal surgeon can apply in the consultation room.

This chapter presents the AVBC clinical protocol as a sequential decision tree. The workflow distills the trimodal assessment (O, T, B) into a series of practical steps, each supported by quantitative criteria and tied to specific examination instruments. Two worked clinical examples illustrate the protocol from initial evaluation through ring selection and expected outcome estimation.

The protocol is designed to be additive, not disruptive: it layers biomechanical reasoning onto the existing clinical examination rather than replacing it. A surgeon already performing Pentacam tomography, wavefront aberrometry, and manifest refraction has all the data required for the AVBC assessment. The framework reorganizes and reinterprets these data within a mechanistic context.

---

## 11.2 Pre-Operative Assessment: The AVBC Examination Sequence

### Step 1 — Standard Ophthalmic Examination

Before any biomechanical assessment, the standard clinical evaluation must be completed:

- **Best-corrected visual acuity (BCVA):** Snellen or logMAR, with spectacle correction and with rigid contact lens trial. The difference between spectacle and contact lens BCVA is a rough indicator of irregular astigmatism burden.
- **Manifest and cycloplegic refraction:** Sphere, cylinder, axis. These data feed the Optical module.
- **Slit-lamp biomicroscopy:** Assess corneal clarity, Vogt striae, Fleischer ring, scarring. Significant central scarring may contraindicate ICRS or necessitate lamellar keratoplasty.
- **Pachymetry at the tunnel site:** The minimum stromal thickness at the planned implantation radius (typically 5.0–6.0 mm from the visual axis) must exceed 400 μm to accommodate the ring safely at 70–80% depth. The local corneal thickness ($CT$) at the exact meridian of planned implantation must be recorded to calculate the maximum safe ring thickness ($RT_{max}$) under the **Lei das Espessuras**.
- **Intraocular pressure:** Goldmann or dynamic contour tonometry. IOP values inform the FEM loading condition (15 mmHg is the standard modeling assumption; significant deviations require model adjustment).

### Step 2 — Corneal Tomography (Module T Input)

Scheimpflug tomography (Pentacam, Galilei, or equivalent) provides the spatial map of ectasia:

- **Sagittal curvature map:** Identify the topographic pattern — central oval, inferior nipple, paracentral crescent, peripheral D-shape, or globus.
- **Posterior elevation map:** Compute the ENM (Eixo Neutro Mecânico) — the meridian of maximum posterior elevation relative to the best-fit sphere. Record the ENM angle (°) and compare with the K-steep axis.
- **Thinnest point location and value:** The thinnest pachymetry point often correlates with the cone apex. Record its distance from the visual axis (mm) and the meridian.
- **KMax and K-steep values:** Record for nomogram comparison and VR estimation.

**ENM determination protocol:**

1. Open the posterior elevation map (4-map refractive display).
2. Select the best-fit sphere (BFS) with a diameter of 8.0 mm.
3. Identify the meridian passing through the point of maximum posterior elevation.
4. Record this meridian as the ENM.
5. Compare with the K-steep axis: if |ENM − K-steep| > 15°, the AVBC assessment is indicated; if > 45°, nomogram planning is unreliable.

### Step 3 — Wavefront Aberrometry (Module O Input)

Wavefront analysis provides the optical context:

- **Coma RMS (6 mm pupil):** The primary higher-order aberration in keratoconus. Values < 2.50 μm are favorable; > 3.50 μm are unfavorable for functional improvement from ICRS alone.
- **Total HOA RMS (6 mm pupil):** Values < 2.0 μm are favorable; > 4.0 μm suggest that geometric correction alone may not restore useful optics.
- **Axis alignment:** Compare the refractive cylinder axis with the topographic steep axis. Divergence > 30° suggests that the aberration profile is complex and may not respond to standard ring placement.
- **Coma vector versus cone apex:** Determine whether the coma vector is ipsilateral (favorable) or contralateral (unfavorable) to the cone apex.

### Step 4 — Biomechanical Assessment (Module B Input)

If available, direct biomechanical measurements refine the assessment:

- **Corvis ST:** Deformation amplitude, stiffness parameter (SP-A1), CBI. These provide qualitative confirmation of biomechanical compromise.
- **ORA:** CH and CRF. Reduced values support the biomechanical disease model.
- **Brillouin microscopy (if available):** Regional stiffness mapping provides the most direct assessment of material property variation.

In the absence of direct biomechanical measurements — which remains the clinical reality in most settings — the AVBC framework uses topographic and tomographic surrogates: pachymetry distribution, posterior elevation pattern, and the ENM divergence serve as indirect indicators of biomechanical state.

---

## 11.3 Module O Classification

Apply the optical criteria from Chapter 5:

| Criterion | Favorable | Intermediate | Unfavorable |
|-----------|-----------|-------------|-------------|
| Coma RMS (6 mm) | < 2.50 μm | 2.50–3.50 μm | > 3.50 μm |
| Δ Axis (refraction vs K) | < 15° | 15°–30° | > 30° |
| HOA total RMS | < 2.0 μm | 2.0–4.0 μm | > 4.0 μm |
| Coma vs apex | Ipsilateral | Ambiguous | Contralateral |

**Classification rule:**
- **O+** (≥ 3 favorable): Proceed with ICRS; expect both topographic and functional improvement.
- **O~** (mixed): Proceed, but counsel patient that functional improvement may be partial; consider adjunctive correction.
- **O−** (≥ 3 unfavorable): ICRS can still be implanted for topographic management, but set expectations appropriately. Consider that the primary goal may be facilitating contact lens fitting rather than spectacle independence.

---

## 11.4 Module T Classification

Determine the topographic morphology and the ENM:

| Morphology | Typical ENM | Ring Placement Strategy |
|------------|------------|----------------------|
| Central oval | Close to visual axis | Symmetric ring, centered |
| Inferior nipple | 6 o'clock | Inferior segment, thicker inferiorly |
| Paracentral crescent | Variable, offset | Single segment or asymmetric pair, directed at cone |
| Peripheral D-shape | Peripheral, > 2 mm from axis | Wide arc or two segments |
| Globus (KMax > 60 D) | — | **Structural stabilization / CL tolerance (up to 85 D)** |

Record the ENM divergence: |ENM − K-steep|.

---

## 11.5 Module B: Vector Selection

Based on the clinical need identified through Modules O and T, determine the dominant vector:

**Decision tree:**

1. **Primary need is flattening (high K-steep, aligned astigmatism)?**
   → **VR dominant** → Increase ring **thickness** (300–400 μm). Arc length secondary.

2. **Primary need is astigmatism regularization (high irregular Cyl, ENM ≠ K-steep)?**
   → **VT dominant** → Increase **arc length** (160°–320°). Thickness secondary.

3. **Primary need is apex repositioning (apex > 1 mm from visual axis, high coma)?**
   → **Vτ dominant** → Use **asymmetric ring** (progressive thickness profile), oriented along ENM.

4. **Primary need is stabilization (progressive ectasia)?**
   → **VR + VT combined** → Perform **CXL first** (3–6 months interval), then ICRS.

5. **Multiple needs?**
   → Prioritize by clinical urgency. Typically: stabilize first, then regularize, then flatten.

---

## 11.6 Ring Prescription

With the dominant vector identified, translate to ring parameters:

### VR-Dominant Prescription

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Thickness | 250–400 μm (proportional to desired ΔK) | VR scales with volume; **strictly subject to $RT_{max} \le CT \times 0.60$** |
| Arc length | 120°–160° (standard) | Arc length does not modulate VR |
| Profile | Symmetric | No torque needed |
| Depth | 70–80% pachymetry | Amplifies VR |
| Meridian | K-steep axis | When ENM ≈ K-steep |

**Expected VR effect:** Our FEM models show VR central of 19.2–19.9 μm for partial arcs with standard geometry. Clinical translation: ΔK ≈ 2–4 D, depending on thickness and patient-specific biomechanics.

### VT-Dominant Prescription

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Thickness | 150–250 μm (moderate) | VR is secondary; **strictly subject to $RT_{max} \le CT \times 0.60$** |
| Arc length | 210°–320° (long arc) | VT equation: each degree reduces σ_θθ by 0.0018 kPa |
| Profile | Symmetric | Unless Vτ also needed |
| Depth | 70–75% pachymetry | Moderate depth sufficient |
| Meridian | ENM axis | Directed at the zone of maximum biomechanical deformation |

**Expected VT effect:** VT(210°) = 7.39 kPa; VT(320°) = 7.20 kPa. Longer arcs produce more regularization, following the linear relationship VT(arc°) = −0.0018 × arc° + 7.79.

### Vτ-Dominant Prescription

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Thickness profile | Progressive (e.g., 300→150 μm) | Generates asymmetric force couple; **peak thickness strictly subject to $RT_{max} \le CT \times 0.60$** |
| Arc length | 160°–210° | Sufficient for torque generation |
| Profile | Asymmetric (progressive) | Essential for Vτ |
| Depth | 70–80% pachymetry | Amplifies torque |
| Meridian | ENM axis | Vτ direction must drive apex toward visual axis |

**Orientation rule:** The thicker end of the progressive ring is placed *opposite* to the desired direction of apex migration. The apex migrates toward the thinner end because the force couple generated by the asymmetric thickness creates a bending moment that drives displacement toward the region of lesser constraint.

### 11.6.4 The Law of Relative Thicknesses ("Lei das Espessuras")

To prevent stromal bridge collapse, melting, localized mechanical necrosis, or pressure-induced extrusion, the AVBC protocol implements a strict safety law validated by 60 high-fidelity finite-element simulations. The **Law of Relative Thicknesses (Lei das Espessuras)** dictates that the maximum safe ring thickness ($RT_{max}$) is strictly limited by the local corneal thickness ($CT$) at the exact meridian of planned implantation:

$$RT_{max} \le CT \times 0.60$$

This proportionality rule ensures that a minimum of 40% of the local corneal thickness is preserved as a load-bearing stromal bridge over the implant. The safety threshold varies slightly based on the specific geometric profile of the segment:

1. **Triangular Profiles (Ferrara / Mediphacos):** Follow the standard **0.60** boundary strictly ($RT_{max} \le CT \times 0.60$).
2. **High-Myopia (HM) Ferrara Profiles:** Capped at a conservative **0.55** boundary ($RT_{max} \le CT \times 0.55$) due to high vertical apical stress concentrations and sharp geometric edges that pose an increased risk of stromal erosion.
3. **Rounded Profiles (Cornealring):** Follow the standard **0.60** boundary ($RT_{max} \le CT \times 0.60$). The smoother contact mechanics and uniform stress distribution of rounded geometries provide excellent safety margins even at the upper limit of the proportionality rule.

Before finalizing any ring prescription, the surgeon must calculate $RT_{max}$ using the local pachymetry at the implantation meridian. If the planned thickness exceeds $RT_{max}$, the prescription must be down-titrated to the nearest available segment thickness below the safety limit.

---

## 11.7 Worked Clinical Examples

### Example 1: Central Symmetric Keratoconus — VR Dominant

**Patient:** 28-year-old male. K-steep 49.5 D, K-flat 45.0 D, cylinder 4.5 D at 85°. KMax 51.0 D (central). Thinnest pachymetry 462 μm centrally. BCVA 20/40 with spectacles.

**Module O:** Coma RMS = 1.8 μm (favorable), Δ Axis = 8° (favorable), HOA total = 1.6 μm (favorable), Coma ipsilateral (favorable). → **O+**

**Module T:** Central oval morphology. ENM at 88°, K-steep at 85°. |ENM − K-steep| = 3° < 15°. → Standard placement, ENM ≈ K-steep.

**Module B:** Primary need is flattening (K-steep 49.5 D, aligned astigmatism). → **VR dominant**

**Prescription:**
- Ring: Ferrara 250 μm, arc 160°, symmetric
- Depth: 75% of 462 μm = 347 μm → channel at 350 μm
- Meridian: 85° (K-steep ≈ ENM)
- Expected ΔK: 2.5–3.5 D (VR-based estimate)

### Example 2: Paracentral Keratoconus with Axis Divergence — VT + Vτ Dominant

**Patient:** 32-year-old female. K-steep 52.0 D, K-flat 46.0 D, cylinder 6.0 D at 65°. KMax 55.0 D (1.5 mm inferior-temporal from visual axis). Thinnest pachymetry 435 μm. BCVA 20/60.

**Module O:** Coma RMS = 3.2 μm (intermediate), Δ Axis = 25° (intermediate), HOA total = 3.5 μm (intermediate), Coma contralateral (unfavorable). → **O~**

**Module T:** Paracentral crescent morphology. ENM at 250°, K-steep at 65° (axis difference 5° from 245°, but the ENM is at 250° — divergence with K-steep = |250° − 245°| = 5°, but the ENM is measured as the meridian of maximum posterior elevation which in this case is at 250° while the steep K-axis is at 65°/245°). |ENM − K-steep| = 5°. → Directed at inferior-temporal cone.

**Module B:** Primary need is regularization (high irregular cylinder, displaced apex). Secondary need: apex repositioning (apex 1.5 mm from visual axis, coma 3.2 μm). → **VT + Vτ dominant**

**Prescription:**
- Ring: Progressive asymmetric, 250→150 μm, arc 210°
- Depth: 75% of 435 μm = 326 μm → channel at 325 μm
- Meridian: ENM axis (250°), thick end superiorly
- Expected effect: Astigmatism regularization (VT at 210° = 7.39 kPa, −5.0% from baseline) + moderate apex shift (validated $V\tau = 11.76\ \mu\text{N}\cdot\text{m}$)
- Counsel patient: O~ classification → functional improvement uncertain; contact lens fitting may still be required

---

## 11.8 Post-Operative Assessment: The AVBC Feedback Loop

### Immediate Post-Operative (Day 1 – Week 1)

- Confirm ring position and depth (slit-lamp, AS-OCT)
- Check for adverse events (extrusion, infection, perforation)
- No topographic assessment (cornea edematous, unreliable)

### Early Assessment (Month 1)

- Uncorrected and best-corrected visual acuity
- Topography: assess flattening (ΔK = K-steep_pre − K-steep_post)
- Initial comparison: ΔK_observed vs ΔK_expected (from VR estimate)

### Definitive Assessment (Month 3–6)

Full AVBC feedback analysis:

1. **VR assessment:** ΔK_induced = K-steep_pre − K-steep_post. Compare with VR_predicted.
   - **AVBC-CI (flattening)** = ΔK_induced / ΔK_predicted
   - CI = 1.0 ± 0.1 → ideal
   - CI < 0.8 → under-correction (consider additional thickness next time)
   - CI > 1.2 → over-correction (reduce thickness next time)

2. **VT assessment:** ΔCyl_induced = Cyl_pre − Cyl_post (regularization component).
   - **VT-ratio** = ΔCyl_induced / ΔCyl_expected
   - Assess HOA improvement, particularly coma and trefoil

3. **Vτ assessment (if asymmetric ring used):** Measure apex migration on posterior elevation map.
   - **Vτ-ratio** = Apex_migration_observed / Apex_migration_expected
   - Positive migration toward visual axis → effective torque

### Building the Personal Calibration Curve

Over N surgeries, the surgeon accumulates personal AVBC-CI values. The mean CI represents the surgeon's personal calibration factor, analogous to the A-constant in IOL calculations. If the mean CI is consistently 0.85 (systematic under-correction), the surgeon can adjust future predictions by dividing by 0.85 — a systematic improvement in accuracy with each additional case.

This surgeon-specific feedback loop is a direct structural parallel to the Alpins method and represents one of the most practically valuable aspects of the AVBC framework.

---

## 11.9 Summary

- The AVBC clinical workflow is a **sequential three-module assessment** (O → T → B) that translates biomechanical understanding into ring selection.
- The protocol is **additive**: it uses existing clinical data (topography, aberrometry, refraction) reorganized within a mechanistic framework.
- The **ENM** (Eixo Neutro Mecânico) is a critical parameter that should be assessed for every keratoconus patient — when ENM diverges from K-steep by > 15°, nomogram accuracy degrades.
- Ring parameters map to specific vectors: **thickness → VR**, **arc length → VT**, **asymmetry → Vτ**, **depth → universal amplifier**.
- Post-operative assessment using the **AVBC feedback loop** (AVBC-CI, VT-ratio, Vτ-ratio) enables surgeon-specific calibration analogous to the Alpins correction index.
- Over time, each surgeon builds a **personal calibration curve** that systematically improves predictive accuracy.

---

## References

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. A new method of analyzing vectors for changes in astigmatism. *J Cataract Refract Surg*. 1993;19(4):524–533.
3. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
4. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
5. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
6. García de Oteyza G, Álvarez de Toledo J, Barraquer RI, et al. Finite element analysis of the biomechanical effects of progressive thickness intracorneal ring segments. *J Cataract Refract Surg*. 2021;47(2):258–265.
7. Kling S, Marcos S. Finite-element modeling of intracorneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
8. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
9. Rabinowitz YS. Keratoconus. *Surv Ophthalmol*. 1998;42(4):297–319.
10. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
11. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
