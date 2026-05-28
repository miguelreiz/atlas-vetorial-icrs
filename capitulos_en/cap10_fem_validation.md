# Chapter 12 — Computational Validation: FEM Extraction of VR, VT, and Vτ

---

## 12.1 Introduction

This chapter presents the complete computational methodology by which the three biomechanical vectors were extracted: constitutive model, mesh generation, boundary conditions, and data post-processing from our volumetric parametric campaign. Platform: FEBio 4.12, HGO constitutive model.

> [!NOTE]
> **For the Clinician:** Focus on Table 12.1 (c dominates corneal stability), Table 12.3 (more arc = more flattening), and Section 12.4.3 (progressive rings generate real torque).

---

## 12.2 Constitutive Model and Mesh

### HGO Parameters
- c (Matrix modulus): 0.05 MPa
- k₁ (Fiber stiffness): 0.22 MPa
- k₂ (Nonlinearity): 100
- κ (Fiber dispersion): 0.09
- k (Bulk modulus): 4.76 MPa

### Boundary Conditions: Volumetric Injection
1. **Z Expansion:** +250 μm prescribed displacement at ICRS surface.
2. **XY Freedom:** Free DOFs in X and Y for circumferential relaxation.
3. **Pressure:** 15 mmHg posterior. Limbal ring fixed (all DOFs).

---

## 12.3 Parametric Sensitivity Campaign (377 Simulations)

**Table 12.1.** Sensitivity of Apical Displacement to corneal parameters.

| Parameter | δ_apex Range (μm) | Hierarchy |
|:---:|:---:|:---:|
| **c** (Matrix) | 1186.8 | **Dominant** (43× greater than κ) |
| **κ** (Dispersion) | 27.6 | Secondary |
| **k₁** (Fibers) | 14.8 | Secondary |

**Table 12.2.** Vector centroids by geometric configuration.

| Geometry | δ_apex (μm) | δ_ring (μm) | ΔK (D) | AI |
|:---|:---:|:---:|:---:|:---:|
| Baseline | 612.72 | 37.38 | −3.40 | 0.00 |
| Arc 90° | 616.79 | 29.31 | −3.42 | 1.00 |
| Arc 160° | 618.29 | 22.38 | −3.43 | 1.00 |
| Arc 255° | 619.91 | 12.25 | −3.44 | 1.00 |
| Arc 360° | 620.82 | 0.00 | −3.44 | 0.00 |
| Progressive 300→150 | 640.94 | 22.40 | −3.56 | 1.00 |

---

## 12.4 Proof of the Volumetric School

### 12.4.1 Flattening Cascade (VR)

| Arc (°) | Apex uz (μm) | ΔK vs Base (D) |
|---------|-------------|-------------------|
| 0 (baseline) | 549.7 | — |
| 90° | 561.5 | −0.06 D |
| 160° | 567.1 | −0.10 D |
| 210° | 571.5 | −0.12 D |
| 320° | 583.9 | −0.19 D |

### 12.4.2 Limbal Restriction (VT)
δ_ring falls linearly from 37.38 μm to 0.00 μm (R² > 0.99).

### 12.4.3 Torque and Asymmetry (Vτ)
Progressive rings (300→150 μm): δ_apex = 640.9 μm vs. 618.2 μm symmetric. ~0.5 mm migration per 100 μm differential.

---

## 12.5 Computational Traceability

| AVBC Vector | FEM Measurement | Clinical Lever |
|:---:|:---:|:---|
| **VR** | Apical Curvature Change | Total Volume (Arc × Thickness) |
| **VT** | Radial Displacement Block (δ_ring → 0) | Arc Length |
| **Vτ** | Thickness Gradient Bending Moment | Thickness Differential (Δt) |

---

## 12.6 Limitations
- Simplified prolate initial geometry.
- Fully bonded stroma-ring contact.
- Pure elastic FEM (no viscoelasticity/healing).


## References

1. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. J Elasticity. 2000;61:1-48.
2. Pinsky PM, van der Heide D, Chernyak D. Computational modeling of mechanical anisotropy in the cornea and sclera. J Cataract Refract Surg. 2005;31(1):136-145.
3. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. J Biomech Eng. 2012;134(1):011005.
