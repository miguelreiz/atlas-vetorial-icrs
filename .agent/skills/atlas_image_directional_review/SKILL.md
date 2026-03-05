---
name: Atlas Image Directional Review — Biomechanical Vector & Force Conventions
description: Skill for reviewing all images in the Atlas Vetorial ICRS for correct directional representation of IOP forces, ICRS radial vectors, and post-mesh-destruction displacement vectors. Enforces scientifically validated arrow directions based on FEM literature, WAXS data, and clinical biomechanics.
---

# Atlas Image Directional Review Skill

> **Purpose:** This skill defines the mandatory directional conventions for ALL figures in the Atlas Vetorial ICRS. Any illustration containing force arrows, vector arrows, or displacement vectors MUST comply with these rules before publication.
> **Editorial Status:** Each convention is graded: ✅ Established in peer-reviewed FEM/biomechanics literature | 🔬 Inferred from converging evidence | 💡 Author's convention, consistent with physics.

---

## CONVENTION 1 — PIO (Intraocular Pressure) Arrow Direction

### THE RULE
> **PIO arrows ALWAYS point from ENDOTHELIUM → EPITHELIUM (posterior → anterior, i.e., Z+ direction)**

### Biomechanical Basis
The IOP is a hydrostatic fluid pressure acting on the INNER surface of the cornea (endothelial side). The pressure vector is outward — from the aqueous humor pushing against the endothelium, through the stroma, toward the epithelium.

In standard FEM notation (Pandolfi & Manganiello 2006; Kling & Marcos 2013):
- Boundary condition: pressure load applied at the **posterior** (endothelial) surface
- Force vector direction: **anterior (+Z)**
- This is the convention in ALL major corneal FEM papers

### Evidence
| Source | Convention | doi/reference |
|--------|-----------|---------------|
| ✅ Pandolfi A, Manganiello F (2006) | Pressure load on posterior surface, anterior displacement | *J Biomech Eng* 128:503 |
| ✅ Kling S, Marcos S (2013) | IOP as endothelial pressure → anterior surface deformation | *IOVS* 10.1167/iovs.13-12030 |
| ✅ Sinha Roy A, Dupps WJ (2011) | Boundary pressure on posterior surface = IOP | *J Biomech* 44:845-852 |
| ✅ Arntz A et al. (2017) | FEM keratoconus: IOP posterior → apex displacement Z+ | *PLoS ONE* doi:10.1371/journal.pone.0176715 |

### Common Error — WHAT TO AVOID
❌ **WRONG:** Arrow pointing from epithelium → endothelium (inward)
❌ **WRONG:** Arrow drawn at the side of the cornea pointing circumferentially
❌ **WRONG:** Bidirectional arrows (PIO is unidirectional: outward)

### Visual Standard
```
CORRECT PIO REPRESENTATION:

   Epitélio ←──── SUPERFÍCIE ANTERIOR (Z=0)
       ↑
       ↑  ← PIO (pressão interna → seta para FORA/ANTERIOR)
       ↑
   Endotélio ──── SUPERFÍCIE POSTERIOR (Z=1.0)
   [câmara anterior / humor aquoso]

Z AXIS: Positivo = Anterior (epitélio), Negativo = Posterior (endotélio)
```

### In-Image Checklist
- [ ] PIO arrow starts at or near the endothelial surface
- [ ] PIO arrow points ANTERIORLY (toward epithelium)
- [ ] Arrow is labeled "PIO →" or "IOP →" in the legend
- [ ] Color: typically ⚪ white or 🟡 yellow (neutral — it's background pressure, not a pathological force)

---

## CONVENTION 2 — VR (Vetor Radial / ICRS Radial Vector) Arrow Direction

### THE RULE
> **VR arrows point IN THE DIRECTION OF THE RING — i.e., CENTRIFUGALLY from the cone apex toward the ring's position. In the cone reference frame, VR = OUTWARD (centrífugo).**

### Biomechanical Basis
The ICRS works via arc-shortening: the rigid ring forces collagen fibers to detour around it. As fibers re-accommodate, they produce traction pulling the central cone **toward the ring** (peripherally). From the apex's perspective, the traction is **outward (centrifugal)**.

The critical distinction:
- The **ring** does NOT push the cone inward
- The **fibers** are pulled outward toward the ring and in doing so, shorten the stromal arc, which passively flattens the apex
- The FORCE vector on the apex = directed AWAY from apex, toward the ring = CENTRIFUGAL

This is confirmed by:
- ✅ García de Oteyza G et al. (2021): FEM shows that ICRS creates displacement vectors that radiate OUTWARD (centrifugally) from the implant position toward the optical zone center — the net effect on the apex is equivalent to being pulled toward the ring.
- ✅ Kling & Marcos (2013): The arc-shortening effect creates centrifugal tension in radial fibers.
- ✅ The Atlas reviewer skill (regra de ouro #1): "VR é CENTRÍFUGO — setas apontam PARA FORA"

### The Direction Mapping
```
VISTA SUPERIOR (X-Y plane):

                [RING @ Ø5mm]
         ←←←←←←←←←←←←←←←←←←←
    ↑                             ↑
    |                             |
    |      APEX DO CONE           |
    |         (center)            |
    |                             |
    ↓                             ↓
         ←←←←←←←←←←←←←←←←←←←
                [RING @ Ø5mm]

ARROWS: Point FROM cone apex TO ring (outward/centrifugal)
COLOR: 🔵 Blue (correction vector)
```

### Cross-Section View (X-Z plane)
```
                     Epitélio (Z=0)
─────────────────────────────────────────
        ↑ VR (tenting)
   ← ← ←[RING]→ → →  ← arc-shortening tension
─────────────────────────────────────────
                     Endotélio (Z=1.0)

Note: The tenting shows ring pushing ANTERIORLY (+Z)
      The radial VR shows fibers being pulled laterally (centrifugal, X-Y plane)
```

### Common Error — WHAT TO AVOID
❌ **WRONG (most common error):** VR arrows pointing INWARD (centripetal) — toward the center of the cornea
❌ **WRONG:** VR arrows pointing in the same direction as the IOP (anteriorly)
❌ **WRONG:** Showing VR as if the ring is "squeezing" the cone (cone is not squeezed, it is pulled)

### In-Image Checklist
- [ ] VR arrows originate AT or NEAR the ring's position
- [ ] VR arrows point OUTWARD (centrifugally) — away from cone apex, toward periphery
- [ ] OR equivalently: arrows show the TENSION on the fibers = fiber arrows point toward the ring from the apex
- [ ] VR color: 🔵 BLUE (correction)
- [ ] Fr color (force of the disease pulling inward): 🔴 RED (opposite direction to VR)

---

## CONVENTION 3 — Forces After Mesh Destruction in Keratoconus (x, y, z System)

### THE RULE
> **Post-mesh-destruction displacement in KC follows: x ≠ 0 (temporal in OD, nasal in OS), y < 0 (inferior), z > 0 (anterior protrusion). Confirmation needed for x-sign per eye.**

### THE COORDINATE SYSTEM (Atlas Standard)
```
SISTEMA DE COORDENADAS DO ATLAS

                    +Y (Superior)
                     ↑
                     |
                     |
  ← −X ─────────────●───────────── +X →
    (Nasal OD)       |           (Temporal OD)
                     |
                     ↓
                    −Y (Inferior)

  Z: +Z = Anterior (epitélio), −Z = Posterior (endotélio)
     O plano Z=0 é a superfície anterior corneana em repouso
```

### Physics of Post-Mesh Force Vectors in KC

When the oblique interlinking fibers degrade and lamellae slip, three displacement components occur:

#### Component 1: +Z (Anterior Protrusion)
- ✅ **Established:** IOP pushes the weakened zone anteriorly
- The posterior stroma is relatively preserved → the weakened anterior zone bulges FORWARD
- **FEM confirmation:** ✅ Arntz et al. (2017) PLoS ONE; ✅ Sinha Roy & Dupps (2011) J Biomech
- **Z = +** (toward epithelium, anterior)

#### Component 2: −Y (Inferior displacement of apex)
- 🔬 **Evidence-inferred:** The cone apex in KC typically displaces INFERIORLY and temporally
- The inferior cornea has lower laminar density + lower stiffness gradient → preferential inferior displacement
- Epidemiological fact: ✅ "La mayoría de los ceratoconos: ápex infero-temporal" (Ambrosio et al., Rabinowitz)
- ✅ Topographic studies confirm inferior apex location in >70% of KC cases
- **Y = −** (inferior)

#### Component 3: X (Temporal / Site-Dependent)
- 🔬 **Evidence-inferred, requires eye specification:**
  - **OD (Right Eye):** +X = temporal axis → KC apex typically infero-TEMPORAL → **X > 0**
  - **OS (Left Eye):** −X = nasal axis → KC apex typically infero-temporal (mirror) → **X < 0**
- ⚠️ **Convention clarification needed per eye** — always specify OD vs OS in the figure

#### Component 4: Y (Rotational/Torsional — Vτ)
- The angle of the apex displacement from the geometric center encodes the rotational mismatch
- This is what drives the Fτ (torsional force) component in the LDM

### Summary Vector Table

| Force Component | Direction | Sign | Anatomy | Evidence Level |
|----------------|-----------|------|---------|----------------|
| **IOP (PIO)** | Anterior | +Z | Endo → Epi | ✅ FEM standard |
| **Apex protrusion** | Anterior | +Z | Posterior weakness → anterior bulge | ✅ FEM confirmed |
| **Apex inferior shift** | Inferior | −Y | Lower laminar density | 🔬 Epidemiological + FEM |
| **Apex temporal shift (OD)** | Temporal | +X (OD) / −X (OS) | Infero-temporal weakness | 🔬 Topographic studies |
| **ICRS VR traction** | Centrifugal (outward) | +R in polar | Fiber arc-shortening | ✅ FEM confirmed |

### Verification Required (Open Literature Questions)
> ⚠️ The following require explicit literature verification before final publication:
>
> 1. **Y negative (inferior):** Confirmed by epidemiology (>70% inferior apex) — needs FEM vector field study confirming −Y dominance at the biomechanical (not just topographic) level
> 2. **X sign (temporal/nasal):** Needs specification per eye (OD vs OS) and confirmation that temporal > nasal in both eyes
> 3. **Z positive (anterior):** ✅ Already confirmed by multiple FEM studies — no ambiguity

### Recommended Literature to Verify
| Study | What to check | Relevance |
|-------|--------------|-----------|
| Arntz A et al. PLOS ONE 2017 | Displacement field vectors in FEM KC model | Z+, Y−, X± directions |
| Sinha Roy & Dupps. J Biomech 2011 | Patient-specific FEM KC | Apex trajectory in 3D |
| Kling S, Marcos S. IOVS 2013 | ICRS FEM: fiber traction directions | VR centrifugal confirmation |
| Ambrosio R et al. JCRS 2011 | Topographic cone apex location statistics | Y−, X+ in OD epidemiology |

---

## IMAGE REVIEW CHECKLIST — Use For Every Figure

### Pre-Publication Image Audit (Run for every Atlas figure)

**Step 1 — Identify what forces are present:**
- [ ] IOP/PIO arrows? → Apply Convention 1
- [ ] ICRS vector arrows (VR, VT, Vτ)? → Apply Convention 2
- [ ] Post-KC displacement or lamellar forces? → Apply Convention 3

**Step 2 — PIO Direction Audit:**
- [ ] Arrows go FROM endothelium TO epithelium (posterior → anterior, Z+)?
- [ ] No bidirectional PIO arrows?
- [ ] White/yellow color (neutral force)?

**Step 3 — VR Direction Audit:**
- [ ] VR arrows point OUTWARD (centrifugal) — NOT inward?
- [ ] Arrows originate at ring position, point toward/past the apex (outward traction)?
- [ ] Blue color?
- [ ] NO VR arrows pointing from ring TOWARD center (that would be centripetal — WRONG)?

**Step 4 — Force/Vector Color Audit:**
- [ ] 🔴 RED = pathological FORCES (Fr, Ft, Fτ) = the PROBLEM
- [ ] 🔵 BLUE = corrective VECTORS (VR, VT, Vτ) = the SOLUTION
- [ ] 🟢 GREEN = resultante neutralizada
- [ ] ⚪/🟡 NEUTRAL = PIO, anatomical reference
- [ ] 🟢/🟡 = oblique/interlinking fibers in tissue diagrams

**Step 5 — Coordinate System Audit (when z-axis is shown):**
- [ ] Z+ = anterior (toward epithelium)?
- [ ] Z− = posterior (toward endothelium)?
- [ ] Y+ = superior, Y− = inferior?
- [ ] X+ = temporal (OD), X− = nasal (OD)? [Mirror for OS]
- [ ] Legend box include axis orientation indicator?

**Step 6 — Legend Box:**
- [ ] Every arrow is labeled in the legend?
- [ ] Legend includes eye (OD/OS) if x-axis is involved?
- [ ] Full name on first use: "VR (Vetor Radial)", not just "VR"?

---

## ERROR TAXONOMY — Priority Classification

| Error Type | Priority | How to Detect | Correction |
|-----------|---------|---------------|------------|
| PIO pointing inward (endotélio ← epitélio) | 🔴 CRITICAL | Arrow from anterior → posterior | Reverse arrow direction |
| VR centripetal (pointing toward center) | 🔴 CRITICAL | VR arrow pointing toward cone apex | Reverse to centrifugal |
| VR and Fr pointing SAME direction | 🔴 CRITICAL | Fr (red) and VR (blue) not antiparallel | One must be reversed |
| Z-axis inverted | 🔴 CRITICAL | Z+ labeled as posterior | Correct axis labeling |
| Y-axis inverted | 🟡 IMPORTANT | +Y labeled as inferior | Correct axis labeling |
| Missing legend | 🟡 IMPORTANT | No legend box in vector figure | Add legend box |
| Unlabeled arrows | 🟡 IMPORTANT | Arrows without annotations | Label all arrows |
| Color confusion (VR red / Fr blue) | 🔴 CRITICAL | Problem force is blue, correction is red | Swap colors |
| PIO wrong color (aggressive red) | 🟢 MINOR | PIO drawn in aggressive red | Change to neutral white/yellow |

---

## Quick Reference: The 5 Rules of Arrow Direction

```
╔══════════════════════════════════════════════════════════════════╗
║        ATLAS VETORIAL ICRS — DIREÇÃO DAS SETAS                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  1. PIO ────────────► SEMPRE Endotélio → Epitélio (+Z)           ║
║                       NUNCA ao contrário                         ║
║                                                                  ║
║  2. VR  ←────[RING]────→  Centrífugo = Para FORA do cone        ║
║                       O anel TRACIONA as fibras                  ║
║                       NUNCA centrípeto (não empurra p/ dentro)  ║
║                                                                  ║
║  3. Fr (doença) ──►   Para DENTRO (cone comprime centralmente)   ║
║     VR (correção) ◄── Para FORA (oposto ao Fr)                   ║
║                                                                  ║
║  4. KC displacement: +Z (protrusion), −Y (inferior), ±X (eye)   ║
║                                                                  ║
║  5. 🔴 RED = Problema (F) | 🔵 BLUE = Correção (V)              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Usage Instructions

**When generating a new image:**
1. Run Step 1-6 of the Image Review Checklist BEFORE sending to artist/AI generator
2. Include the exact directional requirements in the image prompt
3. After generation: apply the Error Taxonomy audit (check all 🔴 CRITICAL items first)

**When reviewing an existing image:**
1. Open the Error Taxonomy table
2. Look for 🔴 CRITICAL errors first
3. Flag 🟡 IMPORTANT errors for next revision cycle
4. Document findings as: `[FIGURE X.X: VR centripeto → CRITICAL ERROR → regenerate]`

**When writing image prompts for AI generation:**
Always include:
```
"MANDATORY DIRECTIONAL RULES:
- IOP/PIO arrows: point FROM posterior (endothelium) TO anterior (epithelium) only
- VR/radial ring arrows: centrifugal, pointing OUTWARD from ring toward periphery (NOT toward center)
- Red arrows = pathological forces (problem); Blue arrows = ring correction vectors
- Z+ axis = anterior (toward epithelium); Y- = inferior; X+ = temporal (right eye)"
```
