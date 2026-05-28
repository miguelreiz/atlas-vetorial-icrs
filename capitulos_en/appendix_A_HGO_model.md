# Appendix A — HGO Constitutive Model: Derivation and Parameters

> **Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**

---

## A.1 Physical Basis and Corneal Anisotropy

The mechanical response of the corneal stroma cannot be adequately described by classical linear elasticity or isotropic hyperelastic models (e.g., neo-Hookean or Mooney-Rivlin). From a microstructural perspective, the stroma is a highly ordered, fiber-reinforced composite material composed of approximately 200–250 stacked lamellae containing uniformly diameter (~30 nm) collagen fibrils embedded in a hydrated matrix of proteoglycans and glycosaminoglycans (the ground substance).

Mechanically, this results in:
1. **Nonlinear hyperelasticity:** Exponential strain-stiffening from progressive stretching of initially crimped collagen fibrils.
2. **Marked anisotropy:** Tensile resistance along fibril directions is 2–3 orders of magnitude greater than matrix or interlamellar shear resistance. SAXS measurements demonstrate preferential orientations along orthogonal meridians centrally, with circumferential annular distribution at the limbus.
3. **Near-incompressibility:** High water content (~78%) yields effective Poisson's ratio near 0.5.

The **Holzapfel–Gasser–Ogden (HGO)** constitutive formulation was employed, originally proposed for arterial walls (Holzapfel et al., 2000) and adapted for the cornea by Pandolfi & Manganiello (2006) and Nguyen et al. (2018).

---

## A.2 Large-Deformation Kinematics

### A.2.1 Deformation Gradient and Volumetric Decomposition

$$\mathbf{F} = \frac{\partial \mathbf{x}}{\partial \mathbf{X}}$$

Multiplicative decomposition into volumetric and isochoric components:

$$\mathbf{F} = \left( J^{1/3} \mathbf{I} \right) \bar{\mathbf{F}} \quad \Rightarrow \quad \bar{\mathbf{F}} = J^{-1/3} \mathbf{F}$$

where $J = \det(\mathbf{F}) > 0$ is the volume ratio.

### A.2.2 Strain Tensors and Invariants

Right Cauchy-Green tensor: $\mathbf{C} = \mathbf{F}^T \mathbf{F}$

Isochoric modification: $\bar{\mathbf{C}} = J^{-2/3} \mathbf{C}$

First isochoric invariant: $\bar{I}_1 = \mathrm{tr}(\bar{\mathbf{C}})$

Structural invariants for two fiber families with reference directions $\mathbf{a}_{01}$, $\mathbf{a}_{02}$:

$$\bar{I}_{4i} = \mathbf{a}_{0i} \cdot \left( \bar{\mathbf{C}} \mathbf{a}_{0i} \right)$$

---

## A.3 Strain Energy Density Function (Ψ)

$$\Psi = \Psi_{\mathrm{vol}}(J) + \Psi_{\mathrm{iso}}\left(\bar{I}_1, \bar{I}_{41}, \bar{I}_{42}\right)$$

### A.3.1 Volumetric Component

$$\Psi_{\mathrm{vol}}(J) = \frac{1}{2} k (J - 1)^2$$

### A.3.2 Isochoric Component with Fiber Dispersion

$$\Psi_{\mathrm{matrix}} = c \left(\bar{I}_1 - 3\right)$$

$$\Psi_{\mathrm{fibers}} = \frac{k_1}{2k_2} \sum_{i=1}^2 \left\{ \exp\left[ k_2 \left\langle \bar{E}_i \right\rangle^2 \right] - 1 \right\}$$

Modified equivalent strain term incorporating fiber dispersion (Gasser, Ogden & Holzapfel, 2006):

$$\bar{E}_i = \kappa \left(\bar{I}_1 - 3\right) + (1 - 3\kappa)\left(\bar{I}_{4i} - 1\right)$$

Dispersion parameter $\kappa \in [0, 1/3]$:
- $\kappa = 0$: Perfectly aligned fibers (pure transverse anisotropy).
- $\kappa = 1/3$: Fully isotropic dispersion.
- $\kappa = 0.09$ (adopted): Strong preferential alignment with significant physical dispersion.

---

## A.4 Associated Stress Tensors

### A.4.1 Second Piola-Kirchhoff Stress (S)

$$\mathbf{S} = 2 \frac{\partial \Psi}{\partial \mathbf{C}} = \mathbf{S}_{\mathrm{vol}} + \mathbf{S}_{\mathrm{iso}}$$

Volumetric: $\mathbf{S}_{\mathrm{vol}} = k J (J - 1) \mathbf{C}^{-1}$

Isochoric:
$$\mathbf{S}_{\mathrm{iso}} = J^{-2/3} \left[ \bar{\mathbf{S}} - \frac{1}{3} \left( \bar{\mathbf{S}} : \mathbf{C} \right) \mathbf{C}^{-1} \right]$$

where:
$$\frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_1} = c + k_1 \sum_{i=1}^2 \kappa \left\langle \bar{E}_i \right\rangle \exp\left[ k_2 \left\langle \bar{E}_i \right\rangle^2 \right]$$

$$\frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_{4i}} = k_1 (1 - 3\kappa) \left\langle \bar{E}_i \right\rangle \exp\left[ k_2 \left\langle \bar{E}_i \right\rangle^2 \right]$$

### A.4.2 Cauchy Stress Tensor (σ)

$$\boldsymbol{\sigma} = J^{-1} \mathbf{F} \mathbf{S} \mathbf{F}^T$$

Volumetric: $\boldsymbol{\sigma}_{\mathrm{vol}} = k (J - 1) \mathbf{I} = -p \mathbf{I}$

Isochoric: $\boldsymbol{\sigma}_{\mathrm{iso}} = J^{-1} \mathrm{dev}\left( \bar{\boldsymbol{\sigma}} \right)$

---

## A.5 Physical Meaning and Parameter Calibration

| Parameter | Symbol | Canonical Value | Physical Meaning | Clinical Role |
|:---|:---:|:---:|:---|:---|
| Matrix shear modulus | $c$ | 0.05 MPa | Ground substance (GAGs, proteoglycans) elasticity | **Dominant** parameter; degradation initiates ectasia |
| Collagen fibril stiffness | $k_1$ | 0.22 MPa | Intrinsic elastic stiffness of collagen fibrils | Primary load-bearing barrier; CXL increases 3–5× |
| Fiber nonlinearity | $k_2$ | 100 | Rate of exponential stiffening | Prevents catastrophic deformation under IOP spikes |
| Fiber dispersion | $\kappa$ | 0.09 | Angular dispersion around preferred direction | $\kappa → 1/3$ in advanced cones → loss of anisotropy |
| Bulk modulus | $k$ | 4.76 MPa | Resistance to volumetric compression | Enforces near-incompressibility ($\nu ≈ 0.49$) |

---

## References

1. Gasser TC, Ogden RW, Holzapfel GA. *J Royal Soc Interface*. 2006;3(6):15–35.
2. Holzapfel GA, Gasser TC, Ogden RW. *J Elasticity*. 2000;61(1–3):1–48.
3. Nguyen BA, Roberts CJ, Reilly MA. *Front Bioeng Biotechnol*. 2018;6:210.
4. Pandolfi A, Manganiello F. *Biomech Model Mechanobiol*. 2006;5(4):237–246.
5. Meek KM, Knupp C. *Prog Retin Eye Res*. 2015;49:1–16.
