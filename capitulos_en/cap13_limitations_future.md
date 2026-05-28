# Chapter 13 — Limitations, Validation Timeline, and Future Directions

> *Part V — Horizons*

---

## 13.1 Introduction

Scientific integrity requires that a framework's limitations be stated as clearly as its claims. The AVBC is a theoretical construct grounded in finite element modeling and supported by physical reasoning. It has not yet been validated in a prospective clinical trial.

> [!NOTE]
> **For the Clinician:** A scientific framework that does not declare its limitations is not science — it is marketing. The AVBC is designed to be **falsifiable**.

---

## 13.2 Current Limitations

### 13.2.1 Geometric Simplifications
FEM models use spherical corneal geometry with uniform thickness. Real keratoconic corneas are non-spherical, non-uniformly thick, and asymmetric. However, the qualitative findings (VR insensitivity to arc, VT monotonicity) are robust to geometric assumptions because they arise from fundamental physical mechanisms.

### 13.2.2 Material Property Assumptions
The HGO model uses a single parameter set (c = 0.05, k₁ = 0.22, k₂ = 100, κ = 0.09) uniformly. In reality, properties vary regionally and between patients. Sensitivity analysis (±30% variation) shows VT monotonicity is preserved.

### 13.2.3 Successful Vτ Validation
6 asymmetric progressive-thickness simulations confirmed active torque values from 9.31 to 18.34 μN·m, compared to a symmetric baseline of 2.47 μN·m.

### 13.2.4 Computational Limitations in Extreme Ectasia
FEBio solver fails to converge for KMax > 53 D due to mesh distortion. This is a numerical, not biological, limitation.

---

## 13.3 Clinical Validation Timeline

### Phase 1: Retrospective Concordance (Months 1–12)
Retrospective analysis of N = 60–80 existing ICRS cases. Calculate AVBC-CI retrospectively and compare AVBC predictions with actual outcomes.

### Phase 2: Prospective Non-Inferiority (Months 12–36)
Prospective, non-randomized trial (N = 100–150 eyes). Primary endpoint: CI_R within 0.85–1.15. Secondary endpoints: VT-ratio, Vτ-ratio, BCVA improvement.

### Phase 3: Randomized Controlled Trial (Months 36–60)
AVBC-guided vs. nomogram-guided ring selection. Superiority endpoint for complex cases (MNA divergence > 15°).

---

## 13.4 Future Directions

### 13.4.1 Patient-Specific FEM
Pentacam-derived geometry + Brillouin/Corvis-derived material properties → personalized simulation.

### 13.4.2 Reduced-Order Models
Surrogate models (neural networks trained on FEM data) for real-time clinical use.

### 13.4.3 Multi-Segment Planning
Extension from single to dual-segment configurations.

### 13.4.4 Integration with CXL Planning
Combined ICRS + CXL biomechanical optimization.

### 13.4.5 Digital Twin
Real-time corneal digital twin updated with each clinical measurement.

### 13.4.6 Histomechanical Validation
Direct correlation of HGO parameters with tissue-level measurements.

---

## 13.5 Summary

The AVBC framework requires clinical validation to transition from theoretical construct to clinical tool. The validation timeline proceeds from retrospective concordance through prospective non-inferiority to randomized controlled comparison. The research program is ambitious but technically feasible.

---

## References
1. Dupps WJ Jr, Roberts CJ. *J Cataract Refract Surg*. 2014;40(3):333–339.
2. Kling S, Marcos S. *IOVS*. 2013;54(1):881–889.
3. Scarcelli G, et al. Brillouin microscopy of collagen crosslinking. *IOVS*. 2012;53(1):185–190.
