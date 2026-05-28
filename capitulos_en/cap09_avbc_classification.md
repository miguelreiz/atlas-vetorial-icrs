# Chapter 9 — The Integrated AVBC Classification

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**

---

## 9.1 Introduction: Why Classification Matters

The AVBC classification system decomposes clinical assessment into three explicit, sequential modules:

- **O Module (Optical Coherence Assessment):** Output: O+, O~, or O−.
- **T Module (Topographic Morphology):** Output: morphological archetype and MNA azimuth.
- **B Module (Biomechanical Mechanism Selection):** Output: ring prescription.

> [!IMPORTANT]
> **For the Clinician: The Difference Between a Nomogram and AVBC**
> A nomogram is a black box: K-max goes in, "ring 250 µm" comes out. You don't know *why*.
> The AVBC is transparent: it assesses optical candidacy (O), maps ectasia spatially (T), then prescribes biomechanics (B).

---

## 9.2 O Module — Optical Coherence Assessment

The **Axial Coherence Index (ACE)**: ACEmin = |θ_topo − θ_coma|

Validated in N = 1,139 eyes (including N = 300 ICRS implants).

| Criterion | Favorable (O+) | Intermediate (O~) | Unfavorable (O−) |
|---|:---:|:---:|:---:|
| **ACEmin** | < 15° | 15°–45° | > 45° |
| Coma RMS | < 2.50 μm | 2.50–3.50 μm | > 3.50 μm |
| Δ Axis | < 15° | 15°–30° | > 30° |
| Total HOA RMS | < 2.0 μm | 2.0–4.0 μm | > 4.0 μm |
| Coma vs apex | Ipsilateral | Ambiguous | Contralateral |

---

## 9.3 T Module — Topographic Morphology and the MNA

### Morphological Archetypes

| Morphology | Typical Cone Location | Ring Positioning Strategy |
|---|:---:|---|
| **Central oval** | Central | Symmetric ring, any meridian |
| **Inferior nipple** | Inferior (5-7 o'clock) | Single inferior segment or asymmetric pair |
| **Paracentral crescent** | Paracentrally displaced | Targeted to cone |
| **Peripheral D-shape** | Peripheral (> 2 mm) | Wide arc or two segments |
| **Globus (KMax > 60 D)** | Global | Structural stabilization / CL tolerance |

### The MNA — Mechanical Neutral Axis

MNA diverges from K-steep in ~40% of cases.

| MNA–K-steep Relationship | Frequency | Clinical Significance |
|:---:|:---:|:---:|
| Concordant (< 15°) | ~60% | Nomograms adequate |
| Moderately divergent (15°–45°) | ~30% | AVBC recommended |
| Severely divergent (> 45°) | ~10% | AVBC essential |

---

## 9.4 B Module — Biomechanical Vector Selection

| Vector | Physical Quantity | Clinical Correlate | Primary Controller |
|:---:|:---:|:---:|:---:|
| **VR** | Radial displacement | ΔK (flattening) | Ring **thickness** |
| **VT** | Tangential stress | ΔCyl (regularization) | **Arc length** |
| **Vτ** | Torque proxy | Apex repositioning | **Asymmetry** |

Key findings: VR is insensitive to arc length. VT is monotonically dependent on arc (R² = 0.94). Vτ = 0 for all symmetric configurations.

---

## 9.5 Biomechanical Phenotypic Classification (HGO/FEBio)

### 9.5.1 Matrix Degradation (c-Dominant)
Primary reduction in matrix shear modulus. Clinical signature: Forme fruste ectasia, TBI > 0.35 with normal anterior topography.

### 9.5.2 Fibrillar Insufficiency (k₁-Dominant)
Severe drop in collagen fibril elastic stiffness. Clinical: Established moderate-advanced keratoconus.

### 9.5.3 Microstructural Disorganization (κ-Dominant)
Increased collagen dispersion parameter. Clinical: Eccentric cones, |MNA − K-steep| > 30°.

### 9.5.4 Exponential Instability (k₂-Dominant)
Loss of exponential stiffening capacity. Clinical: Chronic eye rubbing + rapid progression.

### Falsification Criteria

| Phenotype | Testable Prediction | Falsification Criterion |
|---|---|---|
| c-dominant | TBI stabilizes with CXL at 12 mo | If not in > 80% of cases |
| k₁-dominant | Strong VR with thick ICRS | If CI_R < 0.70 systematically |
| κ-dominant | Superior outcome with MNA positioning | If VT-ratio < 0.85 in > 75% |
| k₂-dominant | Stabilization with CXL + friction cessation | If progression continues in > 50% |

---

## 9.6 The Biomechanical Decision Matrix

| O Module | T Module | B Module | Ring Configuration |
|:---:|:---:|:---:|:---:|
| O+ | Central oval | VR dominant | Symmetric, 250–350 μm, 150° arc |
| O+ | Inferior nipple | VR + VT | Symmetric, 200–300 μm, 160° arc |
| O+ | Paracentral crescent | Vτ + VR | Asymmetric (300→200 μm), 160° arc |
| O~ | Any nipple/crescent | VT dominant | Symmetric, 200 μm, 210° arc |
| O− | Central oval | Conservative VR | Symmetric, 200 μm, 120° arc |
| Any | Globus (K > 60 D) | Structural VT/B | Symmetric, 250–350 μm, 160°–210° arc |

---

## 9.7 The AVBC Correction Index

**CI_R** = ΔK_observed / ΔK_predicted
**VT-ratio** = ΔCyl_observed / ΔCyl_expected
**Vτ-ratio** = Apex_migration_observed / Apex_migration_expected

> [!TIP]
> **For the Clinician: Your "Personal Factor"**
> Just as in the IOL formula there is each surgeon's "A constant," in AVBC there is your mean CI_R. If after 20 cases your mean CI_R is 0.80, correct by multiplying planned thickness by 1/0.80 = 1.25.

---

## 9.8 AVBC Versus Existing Nomograms

| Feature | Ferrara | Keraring | **AVBC** |
|---|:---:|:---:|:---:|
| Planning basis | Empirical | Phenotype | **Biomechanical vectors** |
| Optical assessment | None | None | **O Module** |
| MNA integration | No | No | **Yes** |
| Post-op feedback | None | None | **CI_R, VT-ratio, Vτ-ratio** |
| Transparency | Opaque | Semi | **Fully traceable to FEM** |

---

## 9.9 Summary

The AVBC adds clinical value primarily in the ~40% of cases where MNA diverges from K-steep, the apex is displaced, or the biomechanical context is unusual. For standard keratoconus with aligned astigmatism, existing nomograms remain adequate.

---

## References

1. Alió JL, Shabayek MH. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. *J Cataract Refract Surg*. 2001;27(1):31–49.
3. Dupps WJ Jr, Roberts CJ. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Kling S, Marcos S. *IOVS*. 2013;54(1):881–889.
5. Rabinowitz YS. *J Cataract Refract Surg*. 1999;25(10):1327–1335.
