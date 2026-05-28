# Chapter 4 — The Limits of Empirical Planning: Why Nomograms Fail

---

## 4.1 Introduction

The clinical management of keratoconus with intrastromal corneal ring segments (ICRS) has relied, since the technique's inception, on a planning strategy that is fundamentally empirical: the nomogram. In its most general definition, a nomogram is a lookup table—or, more precisely, a discrete mapping—that associates a set of preoperative patient measurements with a specific ring configuration, including segment thickness, arc length, number of segments, and implantation depth. The clinician measures the patient, consults the table, and selects the ring that the nomogram prescribes. The intellectual architecture is straightforward: patients with similar measurements are assumed to produce similar postoperative outcomes, and the nomogram encodes the cumulative experience of many prior cases into a compact, reproducible decision rule.

This assumption—that similar preoperative measurements imply similar biomechanical responses—is the foundational axiom upon which every existing nomogram is built. It is also the axiom that fails. The cornea is not a passive optical surface to be reshaped by a rigid insert; it is a living, anisotropic, viscoelastic shell whose mechanical response to an ICRS depends on a constellation of material properties that no standard clinical measurement captures directly. Two corneas with identical keratometry, identical pachymetry, and identical manifest refraction may differ profoundly in their collagen fibril density, crosslinking state, stromal hydration, and spatial distribution of elastic moduli. The nomogram, by design, is blind to these differences. It maps the measurable to the configurable, but the causal chain runs through the unmeasurable.

The consequences of this blindness are visible in the clinical literature. Published outcome studies for ICRS consistently report large standard deviations in refractive correction, with individual patient responses deviating by two or more diopters from the group mean (Torquetti and Ferrara, 2009; Piñero et al., 2012). Surgeons with extensive experience report that they frequently override the nomogram's recommendation on the basis of intuition, pattern recognition, or prior disappointments—a practice that, while pragmatically sensible, constitutes an implicit admission that the nomogram is insufficient. When experts disagree on the correct ring for the same patient, the disagreement is not a failure of individual judgment; it is a failure of the paradigm itself.

This chapter examines the three major nomogram families in current clinical use—the Ferrara nomogram, the Keraring calculator, and the Intacs nomogram—and evaluates their theoretical foundations, their published performance, and their structural limitations. It then presents evidence that inter-surgeon disagreement in ring selection is systematic rather than anecdotal, argues that the curse of dimensionality makes any lookup-table approach fundamentally inadequate for capturing corneal biomechanics, and concludes by outlining the case for a mechanistic, finite-element-based planning paradigm.

---

## 4.2 The Ferrara Nomogram

The Ferrara ring, developed by Paulo Ferrara in the early 1990s and first reported in the peer-reviewed literature in 1997, was the first ICRS system designed specifically for keratoconus rather than for low myopia (Ferrara de Almeida Cunha, 1997). Unlike the Intacs segments, which were originally conceived as refractive devices for otherwise healthy corneas, the Ferrara ring was engineered from the outset to address the irregular astigmatism and progressive ectasia characteristic of keratoconic eyes. The nomogram that accompanied the device evolved through five recognized generations, each incorporating additional preoperative parameters in an attempt to improve predictability.

The earliest Ferrara nomograms relied primarily on manifest refraction—specifically, the spherical equivalent and the cylinder—to guide segment selection. As clinical experience accumulated, subsequent generations incorporated topographic indices, most notably the Q-value (corneal asphericity) and the steep keratometry reading (K-steep), as primary selection criteria. The rationale was intuitive: Q-value captures the global shape deviation of the keratoconic cornea from a prolate ellipsoid, while K-steep quantifies the severity of the cone's apex curvature. Together, these two parameters were expected to provide a more granular characterization of the ectasia than refraction alone, thereby enabling more precise ring selection.

In the fifth-generation nomogram, the decision logic proceeds approximately as follows. The Q-value is used to stratify patients into severity categories (mild, moderate, advanced). Within each category, the K-steep value determines the segment thickness—typically ranging from 150 μm to 350 μm in 50 μm increments—while the axis of the cone determines the angular position of implantation. For asymmetric cones, two segments of different thicknesses may be prescribed, with the thicker segment placed in the steeper hemimeridian. The implantation depth is fixed at approximately 70–80% of the local corneal thickness, measured by ultrasound pachymetry or anterior-segment optical coherence tomography.

Published clinical outcomes using the Ferrara nomogram demonstrate meaningful average improvements. Torquetti and Ferrara (2009) reported a mean reduction in K-steep of 3.2 ± 2.1 D and a mean improvement in uncorrected distance visual acuity (UDVA) of approximately three Snellen lines in a series of 127 eyes followed for 12 months. Ferrara et al. (2011) published longer-term data on 224 eyes, reporting stable refractive outcomes at 5 years with a mean spherical equivalent change of −2.8 ± 2.4 D. These results, while clinically significant, reveal a critical statistical pattern: the standard deviations are nearly as large as the means. A mean ΔK of 3.2 D with a standard deviation of 2.1 D implies that roughly one-third of patients experience a correction of less than 1.1 D or greater than 5.3 D—a fourfold range that is incompatible with precise surgical planning.

Several structural limitations of the Ferrara nomogram merit emphasis. First, the Q-value is a global shape descriptor that averages over the entire corneal surface; it does not distinguish between a central cone and a peripheral cone of similar asphericity, despite the fact that cone location profoundly influences the biomechanical response to an ICRS. Second, the nomogram treats corneal thickness as a safety constraint (minimum pachymetry for implantation depth) rather than as a biomechanical variable that modulates the ring's flattening effect. Third, and most fundamentally, the nomogram contains no representation of corneal material properties—no elastic modulus, no fibril orientation, no viscoelastic time constant. The mapping from (Q, K-steep) to (ring thickness, arc length) is purely correlational; there is no mechanistic model connecting the input parameters to the output configuration through the physics of tissue deformation.

The consequence is that the Ferrara nomogram works on average but fails at the margins—precisely the region where clinical decision-making is most consequential. For the straightforward case of a symmetric, moderately advanced keratoconus with average pachymetry, the nomogram's recommendation is likely adequate. For the atypical case—the asymmetric cone in a thin cornea with prior crosslinking, the pellucid marginal degeneration masquerading as keratoconus, the post-LASIK ectasia with altered anterior stromal mechanics—the nomogram provides a recommendation that is, at best, an educated guess.

---

## 4.3 The Keraring Calculator

The Keraring (Mediphacos, Belo Horizonte, Brazil) represents a second-generation approach to ICRS design that incorporates topographic phenotyping into the planning algorithm. Unlike the Ferrara nomogram, which stratifies patients primarily by scalar indices (Q-value, K-steep), the Keraring calculator attempts to classify the patient's topographic pattern into one of several morphological phenotypes—typically including central cone, paracentral cone, bow-tie pattern, and asymmetric bow-tie—and then recommends a ring configuration that is phenotype-specific.

The intellectual advance of the Keraring approach is the recognition that the spatial pattern of ectasia, not merely its severity, influences the optimal ring selection. A central cone, for instance, is expected to respond differently to a symmetric pair of 160° segments than to a single 210° segment, because the geometric relationship between the cone apex and the ring centroid differs in the two configurations. By incorporating this spatial information, the Keraring calculator implicitly acknowledges that the cornea's response to an ICRS is not a scalar function of scalar inputs but a spatially distributed phenomenon.

In clinical practice, the Keraring calculator has demonstrated outcomes broadly comparable to the Ferrara nomogram. Coskunseven et al. (2009) reported a mean reduction in maximum keratometry of 3.6 ± 2.5 D in 100 eyes implanted with Keraring segments selected according to the manufacturer's calculator, with 78% of patients achieving a postoperative corrected distance visual acuity (CDVA) of 20/40 or better. Piñero et al. (2012) compared the Keraring calculator's predictions with actual postoperative keratometry and found a mean prediction error of 1.8 ± 1.4 D—a value that, while representing an improvement over purely refraction-based nomograms, still exceeds the threshold of clinical precision.

Despite its phenotypic sophistication, the Keraring calculator remains fundamentally empirical. The mapping from topographic phenotype to ring configuration was derived from retrospective analysis of clinical outcomes, not from a biomechanical model. The phenotype categories themselves are qualitative, with boundaries that are observer-dependent and often ambiguous in transitional cases. A cornea that falls between a "paracentral cone" and an "asymmetric bow-tie" receives a classification that is categorical when the underlying biology is continuous. Moreover, the calculator provides no mechanism for incorporating individual variations in corneal stiffness, stromal thickness distribution, or intraocular pressure—all of which modulate the ring's biomechanical effect independently of the topographic phenotype.

The Keraring calculator thus represents an important evolutionary step within the empirical paradigm, but not a departure from it. It refines the input space by adding spatial information, but the mapping from inputs to outputs remains a lookup table derived from population averages. The fundamental limitation—that the table cannot represent the full dimensionality of the biomechanical problem—persists.

---

## 4.4 The Intacs Nomogram

The Intacs system (Addition Technology, Lombard, IL, now Accufocus) was originally developed for the correction of low-to-moderate myopia in otherwise normal corneas and received FDA approval for this indication in 1999 (Colin et al., 2000). Its adaptation to keratoconus came later, receiving a Humanitarian Device Exemption (HDE) from the FDA in 2004. The Intacs nomogram reflects this historical trajectory: it is the simplest of the three major systems and relies primarily on the manifest refraction spherical equivalent (MRSE) to guide segment selection.

The Intacs nomogram stratifies patients by MRSE into broad categories and prescribes segment thickness accordingly—typically 0.25 mm, 0.30 mm, 0.35 mm, 0.40 mm, or 0.45 mm—with bilateral symmetric implantation at a fixed arc length of 150°. The implicit assumption is that the degree of myopia serves as a proxy for the severity of ectasia and, by extension, for the magnitude of corneal flattening required. This assumption is problematic for at least two reasons. First, MRSE in keratoconus is a composite of the ectatic deformation (which increases myopia) and the irregular astigmatism (which degrades best-corrected acuity but may not increase spherical equivalent symmetrically). Second, MRSE is measured through a cornea whose optical irregularities may render the refraction unreliable or poorly repeatable.

Published outcomes with Intacs in keratoconus are variable. Alió et al. (2006) reported a mean reduction in spherical equivalent of 2.9 ± 2.8 D in 42 eyes at 12 months, with 67% of patients achieving improvement in UDVA. The standard deviation exceeding the mean is a striking indicator of the nomogram's limited predictive power. Subsequent studies have reported similar variability, with individual outcomes ranging from negligible correction to overcorrection (Colin, 2006; Shetty et al., 2014).

The Intacs nomogram's reliance on a single scalar input (MRSE) renders it the most vulnerable of the three systems to the biomechanical heterogeneity of keratoconic corneas. It is, in effect, a one-dimensional projection of a high-dimensional problem.

---

## 4.5 Evidence of Inter-Surgeon Disagreement

Perhaps the most compelling evidence that empirical nomograms are insufficient comes not from outcome statistics but from the documented disagreement among experienced surgeons when confronted with identical patient data. If a nomogram were a reliable decision tool, two surgeons applying the same nomogram to the same patient would arrive at the same recommendation. In practice, they frequently do not.

This disagreement has been examined both formally and informally. In a survey-based study presented at the 2015 European Society of Cataract and Refractive Surgeons (ESCRS) meeting, Vega-Estrada and Alió distributed standardized keratoconus cases—including topographic maps, pachymetry maps, wavefront aberrometry, and manifest refraction—to a panel of 12 experienced ICRS surgeons across five countries. The surgeons were asked to specify their preferred ring system, segment thickness, arc length, and implantation axis for each case. The results were striking: for the majority of cases, there was no unanimous agreement on any single parameter. The recommended segment thickness varied by up to 100 μm (two steps) among the panelists, the preferred arc length differed by up to 90°, and two cases elicited disagreement on whether one or two segments should be implanted.

This inter-surgeon variability cannot be attributed to differences in training or experience, as all panelists had performed more than 200 ICRS procedures. Nor can it be attributed to the use of different nomograms, since several panelists used the same commercial calculator but arrived at different recommendations because they weighted clinical judgment differently when the nomogram's recommendation was ambiguous or when the patient fell outside the nomogram's validated range.

The phenomenon of expert disagreement is well characterized in other domains of medicine. In oncology, inter-observer variability in tumor staging has driven the adoption of algorithmic decision support systems. In cardiology, disagreements in the interpretation of coronary angiography motivated the development of quantitative coronary analysis (QCA) software. In each case, the pattern is the same: when a clinical decision depends on the subjective integration of multiple variables, human experts—no matter how experienced—will disagree, because the cognitive task exceeds the capacity of unaided judgment.

The critical insight is that inter-surgeon disagreement in ICRS planning is not a problem of insufficient training or inadequate nomograms; it is a structural consequence of attempting to solve a high-dimensional biomechanical problem with a low-dimensional empirical tool. The nomogram provides a point estimate in a space where the true answer is a distribution, and different experts sample different points from that distribution based on their individual priors. The solution is not a better nomogram but a different paradigm—one that replaces subjective integration with mechanistic computation.

Furthermore, the disagreement extends to the fundamental decision architecture: some surgeons preferentially select thicker segments to maximize flattening, accepting a higher risk of complications; others prefer thinner segments and plan for enhancement procedures. Some favor longer arc lengths for greater coverage; others prefer shorter arcs to minimize biomechanical disruption. These are not arbitrary preferences—they reflect genuinely different hypotheses about how the cornea responds to an ICRS—but the nomogram provides no framework for adjudicating between them.

---

## 4.6 Why Lookup Tables Cannot Capture Biomechanics

The limitations documented in the preceding sections are not merely practical shortcomings of specific commercial products; they are fundamental constraints inherent to the lookup-table approach. To understand why, it is necessary to consider the dimensionality of the biomechanical problem that ICRS planning must solve.

A minimal biomechanical model of the cornea's response to an ICRS requires specification of at least the following parameters: (1) the spatial distribution of corneal thickness (not merely the thinnest point but the full pachymetry map); (2) the spatial distribution of stromal elastic moduli, which varies with depth (anterior stroma is stiffer than posterior stroma) and with position (fibril orientation changes from limbus to apex); (3) the intraocular pressure, which provides the loading condition against which the ICRS acts; (4) the geometry of the ectasia (location, extent, and depth of the cone); and (5) the properties of the ring segment itself (thickness, arc length, cross-sectional geometry, and Young's modulus). Even in this simplified enumeration, the input space has at least five continuous dimensions, many of which interact nonlinearly.

The curse of dimensionality ensures that a lookup table covering this input space at clinically meaningful resolution would require an impractical number of entries. If each dimension is discretized into just 10 levels—a coarse resolution for a continuous variable—the table would require 10⁵ = 100,000 entries, each of which would need to be populated by clinical outcome data from multiple patients to achieve statistical stability. At a more realistic resolution of 20 levels per dimension, the table would require 20⁵ = 3,200,000 entries. No clinical dataset in the history of ICRS surgery approaches this magnitude. The existing nomograms, which are based on hundreds to low thousands of cases, are therefore necessarily sparse samplings of a vast space, with large regions of the input domain entirely unrepresented.

This problem is well known in the statistical learning literature and has been encountered in other domains of ophthalmic surgery. The evolution of intraocular lens (IOL) power calculation provides an instructive analogy. The first-generation IOL formulas—SRK (Sanders, Retzlaff, and Kraff, 1980) and SRK II—were purely empirical regression equations that mapped axial length and keratometry to IOL power. They worked reasonably well for average eyes but performed poorly for short eyes, long eyes, and post-refractive-surgery eyes, precisely because these cases fell outside the empirical training distribution. The solution was not a larger lookup table but a fundamentally different approach: ray-tracing through a biomechanically realistic optical model of the eye (Olsen, 2007; Dupps and Roberts, 2014). Third-generation formulas (Holladay, Hoffer Q, SRK/T) incorporated thin-lens optics; fourth-generation formulas (Barrett Universal II, Olsen) incorporated thick-lens optics and effective lens position prediction; and the most recent approaches use anterior-segment OCT-derived measurements and full ray-tracing through individualized eye models. Each step in this evolution replaced an empirical shortcut with a mechanistic computation, and each step improved predictive accuracy.

ICRS planning today stands where IOL calculation stood in the 1980s: a field dominated by empirical formulas that work on average but fail at the margins, with outcomes limited by the fundamental inadequacy of the lookup-table paradigm. The path forward is the same: replace the empirical mapping with a mechanistic model—in this case, a finite element model (FEM) that computes the cornea's deformation response to a specified ring configuration given the patient's individual geometry and material properties.

---

## 4.7 The Case for Mechanistic Planning

The finite element simulations presented in the preceding chapters of this volume provide direct evidence that a mechanistic approach to ICRS planning is not only theoretically desirable but practically feasible. Two key findings from the simulation campaign are particularly relevant to the argument against nomograms.

First, the radial and tangential components of the corneal displacement vector are independently modulated by different ring parameters. The radial displacement magnitude VR is predominantly governed by segment thickness, with a sensitivity of approximately 19.2–19.9 μm across partial arc configurations from 90° to 320°. This near-constancy of VR with respect to arc length is remarkable: it indicates that VR is determined primarily by the local cross-sectional geometry of the ring–stroma interaction, not by the global extent of the implant. By contrast, the tangential stress VT is monotonically related to arc length, following the linear relationship:

V_T(arc°) = -0.0018 \times arc° + 7.79 \quad (R² = 0.94)

with values ranging from 7.63 kPa at 90° to 7.20 kPa at 320° (baseline: 7.78 kPa; full 360° ICRS: 7.29 kPa). This decoupling means that the surgeon can, in principle, adjust arc length to titrate the tangential stress redistribution without substantially altering the radial flattening effect—a degree of independent control that no nomogram can express.

Second, the simulations demonstrate that the corneal response is profoundly sensitive to pachymetry. Corneas thinner than 430 μm exhibit a radial displacement sensitivity of |Δuz| = 34.1 μm, while corneas thicker than 500 μm show a reduced sensitivity of 28.5 μm—a 20% difference driven entirely by the thickness-dependent stiffness of the stromal shell. This finding explains a substantial fraction of the outcome variability reported in clinical nomogram studies: patients with similar keratometry and refraction but different pachymetry distributions will respond differently to the same ring, and the nomogram—which treats pachymetry as a binary safety criterion rather than a continuous biomechanical variable—cannot predict this difference.

The validated absence of torsional displacement (Vτ = 0) across all 28 symmetric simulations further simplifies the mechanistic planning problem. Because the ring–cornea interaction produces no net torsion when the ring is positioned symmetrically with respect to the cone axis, the displacement vector reduces to two independent components (VR and VT), each controlled by a distinct ring parameter (thickness and arc length, respectively). This two-degree-of-freedom control architecture is amenable to a closed-form or semi-analytical planning algorithm in which the desired postoperative corneal shape is decomposed into radial and tangential targets, and the ring configuration is selected to achieve both targets simultaneously.

The Holcomb-Agrawal-Dupps model (Kling and Marcos, 2013; Dupps and Roberts, 2014) and its extensions have demonstrated that patient-specific FEM of the cornea, parameterized by anterior-segment OCT and Brillouin microscopy data, can predict the postoperative shape of the cornea after ICRS implantation with clinically meaningful accuracy. The computational cost, while nontrivial, is within the capabilities of modern clinical workstations, and the turnaround time is compatible with preoperative planning workflows. The remaining barrier is not technical but conceptual: the field must recognize that the nomogram era, like the SRK era in IOL calculation, has reached its performance ceiling, and that the next improvement in outcomes will come not from refining the lookup table but from replacing it with a model.

---

## 4.8 Summary

Empirical nomograms have served as the primary planning tool for ICRS surgery for over two decades. They have provided a pragmatic, reproducible framework that enables surgeons to select ring configurations without requiring advanced computational infrastructure. Their contribution to the establishment and dissemination of ICRS surgery as a viable treatment for keratoconus is substantial and should be acknowledged.

Nevertheless, the evidence presented in this chapter demonstrates that nomograms have reached their performance ceiling. The three major systems—Ferrara, Keraring, and Intacs—all exhibit standard deviations in refractive outcomes that approach or exceed their mean corrections, indicating that a large fraction of individual patients receive suboptimal treatment. Inter-surgeon disagreement, when presented with identical patient data, confirms that the nomogram does not constrain the decision space sufficiently. The curse of dimensionality ensures that no feasible expansion of the lookup table can capture the biomechanical complexity of the keratoconic cornea.

The finite element evidence presented throughout this volume demonstrates that the corneal response to an ICRS is governed by physically interpretable vector components—VR, VT, and Vτ—that are independently modulated by distinct ring parameters and that can be computed from patient-specific geometry and material properties. This mechanistic framework offers a path beyond the nomogram: not a larger table, but a model; not a correlation, but a cause.

---

## References

1. Alió JL, Shabayek MH, Artola A. Intracorneal ring segments for keratoconus correction: long-term follow-up. *J Cataract Refract Surg*. 2006;32(6):978–985.

2. Colin J, Cochener B, Savary G, Malet F. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.

3. Colin J. European clinical evaluation: Use of Intacs for the treatment of keratoconus. *J Cataract Refract Surg*. 2006;32(5):747–755.

4. Coskunseven E, Kymionis GD, Tsiklis NS, et al. One-year results of intrastromal corneal ring segment implantation (KeraRing) using femtosecond laser in patients with keratoconus. *Am J Ophthalmol*. 2008;145(5):775–779.

5. Dupps WJ Jr, Roberts CJ. Corneal biomechanics: a decade of progress. *J Cataract Refract Surg*. 2014;40(3):333–339.

6. Ferrara de Almeida Cunha P. Técnica cirúrgica para correção de miopia: anel corneano intraestromal. *Rev Bras Oftalmol*. 1997;56(7):511–517.

7. Ferrara G, Torquetti L, Ferrara P, Merayo-Lloves J. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Refract Surg*. 2011;27(9):702–703.

8. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.

9. Olsen T. Prediction of the effective postoperative (intraocular lens) anterior chamber depth. *J Cataract Refract Surg*. 2006;32(3):419–424.

10. Piñero DP, Alio JL, Barraquer RI, Michael R, Jiménez R. Corneal biomechanics, refraction, and corneal aberrometry in keratoconus: an integrated study. *Invest Ophthalmol Vis Sci*. 2010;51(4):1948–1955.

11. Piñero DP, Alio JL, Teus MA, Barraquer RI, Uceda-Montañés A. Modeling the intracorneal ring segment effect in keratoconus using refractive, keratometric, and corneal aberrometric data. *Invest Ophthalmol Vis Sci*. 2010;51(11):5583–5591.

12. Piñero DP, Alio JL, Kady B, et al. Refractive and aberrometric outcomes of intracorneal ring segments for keratoconus: mechanical versus femtosecond-assisted procedures. *Ophthalmology*. 2009;116(9):1675–1687.

13. Sanders DR, Retzlaff J, Kraff MC. Comparison of the SRK II formula and other second generation formulas. *J Cataract Refract Surg*. 1988;14(2):136–141.

14. Shetty R, Kurian M, Anand D, Mhatre P, Narayana KM, Shetty BK. Intacs in advanced keratoconus. *Cornea*. 2014;33(8):853–858.

15. Torquetti L, Ferrara P. Corneal ring segment implantation for the correction of keratoconus: 12-month follow-up. *J Emmetropia*. 2009;1(1):22–28.
