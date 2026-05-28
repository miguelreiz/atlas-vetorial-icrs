# Appendix C — AVBC Terminology Glossary

---

## Biomechanical Terms

**Flattening** (*Aplanamento*)
Reduction of central corneal curvature, measured as decrease in K-steep or K-mean. In the AVBC framework, flattening is mediated by the VR vector and controlled by total implant volume (thickness × arc).

**Anisotropy**
Material property where mechanical behavior varies with direction. The corneal stroma is anisotropic: stiffer along nasal-temporal and superior-inferior meridians (cardinal fibers) than in oblique directions.

**AVBC** — Corneal Biomechanical Vector Analysis
Surgical planning framework for ICRS that decomposes the biomechanical ring effect into three independent vectors (VR, VT, Vτ), replacing empirical nomogram-based selection.

**Hoop restriction** (*Cintagem*)
Circumferential restriction effect exerted by the ICRS on the peripheral stroma. Analogous to a barrel hoop: prevents radial expansion under IOP. Governs the VT vector and is controlled by arc length.

**CXL** — Corneal Collagen Crosslinking
Procedure that reinforces interfibrillar collagen cross-links using riboflavin and UVA radiation. Increases the HGO model parameter k₁ (fibrillar stiffness).

**Apical displacement** (δ_apex)
Vertical displacement of the corneal apex under intraocular pressure. Primary deformation metric in FEM simulations. Canonical baseline value: 360.9 μm (without ring).

**Mechanical Neutral Axis (MNA)** (*Eixo Neutro Mecânico, ENM*)
Axis dividing the cornea into two halves with approximately equal biomechanical properties, determined by posterior elevation and minimum thickness. Diverges from the steepest curvature axis (K-steep) in up to 40% of cases. ICRS should be positioned relative to the MNA, not K-steep.

**Volumetric School** (*Escola Volumétrica*)
Paradigm explaining the ICRS effect through volume displacement: the ring occupies physical volume in the incompressible stroma, forcing adjacent tissue to displace radially and anteriorly. Foundation: Kling & Marcos (IOVS, 2013).

**FEM** — Finite Element Method
Computational technique for solving partial differential equations in complex geometries. In the AVBC context, used to simulate corneal response to ICRS insertion.

**FEBio**
Open-source finite element software (University of Utah) specialized in biomechanics. Version used: FEBio 4.12. Natively supports HGO constitutive model.

**HGO** — Holzapfel–Gasser–Ogden Model
Anisotropic hyperelastic constitutive model for fiber-reinforced materials. Decomposes strain energy into isotropic matrix contribution (c) and anisotropic fiber contributions (k₁, k₂, κ). Reference: Holzapfel, Gasser & Ogden (*J Elasticity*, 2000).

**Hoop stress** — Tangential stress
Circumferential stress in a pressurized shell (like the cornea under IOP). Governs the tendency for radial expansion. ICRS interrupts this stress by creating a mechanical barrier (see Hoop restriction).

**ICRS** — Intrastromal Corneal Ring Segment
PMMA implant inserted into the corneal stroma to modify curvature, astigmatism, and aberrations. Commercial types: Intacs, Ferrara Ring, Keraring.

**Incompressibility**
Material property of resistance to volume change. The corneal stroma (78% water) is nearly incompressible: when the ICRS occupies volume, adjacent tissue must displace, not compress.

---

## HGO Constitutive Parameters

| Parameter | Symbol | Canonical Value | Clinical Meaning |
|:---|:---:|:---:|:---|
| Matrix stiffness | c | 0.05 MPa | Proteoglycan degradation → keratoconus. **Dominant parameter.** |
| Fibrillar stiffness | k₁ | 0.22 MPa | Collagen weakening; CXL increases k₁. |
| Exponential stiffening | k₂ | 100 | Nonlinear fiber response to large deformations. |
| Fiber dispersion | κ | 0.09 | Lamellar disorganization; κ → 1/3 = total isotropy. |
| Bulk modulus | k | 4.76 MPa | Enforces near-incompressibility. |

---

## AVBC Vectors

**VR** — Radial Displacement Vector
Quantifies the flattening effect. Controlled by ring thickness (injected volume). Insensitive to arc length in partial arcs. FEM range: 19.2–19.9 μm (partial arcs), 125.9 μm (full 360° ring).

**VT** — Tangential Stress Vector
Quantifies astigmatism redistribution through circumferential belting. Controlled by arc length. Empirical equation: VT = −0.0018 × arc° + 7.79 (R² = 0.94). FEM range: 7.20–7.78 kPa.

**Vτ** — Asymmetric Torque Vector
Quantifies apex repositioning. Controlled by thickness differential in progressive rings. Numerical zero for symmetric rings. FEM range: 9.31 μN·m (linear progressive) to 18.34 μN·m (parabolic progressive).

---

## Trimodal Classification (O/T/B Modules)

**O Module** — Optical Coherence Assessment
Classifies visual recovery potential: O+ (BCVA ≥ 20/60, coma < 2.5 μm) or O− (BCVA < 20/60 or coma > 3.5 μm).

**T Module** — Topographic Morphology
Classifies the spatial cone configuration: Central, Crescent (paracentral), Peripheral (decentered), or Global (diffuse).

**B Module** — Biomechanical Selection
Translates O+T classification into ring prescription using the three vectors. Determines the dominant vector and corresponding parameters.

---

## AVBC Correction Indices

**CI_R** — Radial Correction Index
CI_R = ΔK_observed / ΔK_predicted. Target: 1.0 ± 0.15.

**CI_T** — Tangential Correction Index
CI_T = ΔCyl_observed / ΔCyl_predicted. Target: 1.0 ± 0.15.

**ACE** — Axial Coherence Index
ACEmin = minimum angle between steepest curvature axis and MNA. Screening threshold: ACEmin < 28° predicts ≥ 3 lines of gain (AUC 0.82).

---

## Acronyms

| Acronym | Meaning |
|:---|:---|
| AVBC | Corneal Biomechanical Vector Analysis |
| AE | Angle of Error (Alpins) |
| BCVA | Best Corrected Visual Acuity |
| CI | Correction Index |
| CXL | Corneal Collagen Crosslinking |
| DV | Difference Vector (Alpins) |
| FEM | Finite Element Method |
| HGO | Holzapfel–Gasser–Ogden |
| HOA | Higher-Order Aberrations |
| ICRS | Intrastromal Corneal Ring Segment |
| IOP | Intraocular Pressure |
| MAE | Mean Absolute Error |
| MNA | Mechanical Neutral Axis |
| ORA | Ocular Response Analyzer |
| PMMA | Polymethylmethacrylate |
| SIA | Surgically Induced Astigmatism (Alpins) |
| TIA | Target Induced Astigmatism (Alpins) |
| UCVA | Uncorrected Visual Acuity |
| VR | Radial Displacement Vector |
| VT | Tangential Stress Vector |
| Vτ | Asymmetric Torque Vector |
| WAXS | Wide-Angle X-ray Scattering |
