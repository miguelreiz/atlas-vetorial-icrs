---
name: Vector Visual Language — Directional Standards & Didactic Rules
description: Standardizes how vectors are represented visually and textually across the entire Atlas Vetorial ICRS. Covers direction conventions, x/y/z plane rules, abbreviation policy, and per-chapter didactic approach for VR, VT, and Vτ.
---

# Vector Visual Language — Standards for the Atlas Vetorial ICRS

> **Purpose:** Every vector arrow, abbreviation, and explanation in the Atlas must follow these rules. This skill ensures that a surgeon can look at ANY figure in ANY chapter and immediately understand: (1) what force is being represented, (2) which direction it acts, and (3) whether it's a problem or a correction.

---

## 1. Directional Convention — "Red Attacks, Blue Defends"

### The Problem Vector (V_cone)

| Rule | Standard |
|------|----------|
| **Color** | 🔴 RED (or warm tones: vermelho, laranja) |
| **Direction** | Points in the direction the pathology PUSHES the cornea |
| **Label** | Always labeled with the force type + full name on first use |
| **Visual cue** | Solid arrow, aggressive style |

Examples:
- **Fr (Força Radial):** Red arrow pointing from periphery toward cone apex (centripetal compression)
- **Ft (Força Tangencial):** Red arrow tangent to the steep meridian showing asymmetric pull
- **Fτ (Força Torsional):** Red curved arrow showing rotational twist between inner and outer rings

### The Correction Vector (V_anel)

| Rule | Standard |
|------|----------|
| **Color** | 🔵 BLUE (or cool tones: azul, ciano) |
| **Direction** | Points OPPOSITE to the problem vector (180° reversal) |
| **Label** | Always labeled with VR, VT, or Vτ + full name on first use |
| **Visual cue** | Solid arrow with flat tip (stabilizing, not aggressive) |

Examples:
- **VR (Vetor Radial):** Blue arrow pointing outward from center (centrifugal flattening)
- **VT (Vetor Tangencial):** Blue arrow perpendicular to the ring, redistributing tension
- **Vτ (Vetor Torsional):** Blue curved arrow showing counter-rotation

### The Resultant

| Rule | Standard |
|------|----------|
| **Color** | 🟢 GREEN when neutralized (V_resultante ≈ 0) |
| **Color** | 🟡 YELLOW when partial neutralization |
| **Style** | Dashed arrow (to distinguish from components) |

### Cardinal Rule

> **V_anel = −V_cone**
> 
> In every figure: red and blue arrows on the same axis MUST point in opposite directions.
> If they don't, the surgery is suboptimal — and the figure should show this explicitly.

---

## 2. The Three Planes — x, y, z for Surgeons

Most surgeons think in 2D (the topographic map). The Atlas introduces 3D vector thinking gradually:

### Plane Definitions

```
PLANO VISUAL DO ATLAS

                    Y (Superior-Inferior)
                    ↑
                    |
                    |
                    |
  X ←──────────────●──────────────→ X (Nasal-Temporal)
                    |
                    |
                    |
                    ↓
                    Y

  Z = PROFUNDIDADE (Anterior → Posterior)
      Z=0 na superfície anterior
      Z=1.0 no endotélio
      ICRS implantado em Z ≈ 0.70–0.75
```

### How Each Vector Maps to Planes

| Vector | Primary Plane | What it does | Surgeon analogy |
|--------|--------------|--------------|-----------------|
| **VR (Vetor Radial)** | X-Y (surface) | Flattens centrally | "Pressing down on a ball" |
| **VT (Vetor Tangencial)** | X-Y (surface) | Redistributes between meridians | "Squeezing a waterbed" |
| **Vτ (Vetor Torsional)** | X-Y with Z rotation | Rotates the axis | "Unscrewing a lid" |
| **VComa** | X-Y (displacement) | Recenters the apex | "Nudging the peak back to pupil" |
| **Desacoplamento** | Z axis | Anterior vs posterior divergence | "Two floors responding differently" |

### Visual Rule for Z-Axis

When showing depth (Z-axis), use **side-view cross-section** next to the top-view map. Never try to show all 3 axes in a single perspective — it confuses. Use paired views:

```
  ┌──────────────────┐    ┌──────────────────┐
  │   TOP VIEW (X-Y) │    │  SIDE VIEW (X-Z)  │
  │   Shows: VR, VT  │    │  Shows: depth,     │
  │   Vτ rotation    │    │  ICRS position,    │
  │   ENM axis       │    │  anterior/posterior│
  └──────────────────┘    └──────────────────┘
```

---

## 3. Abbreviation Policy

### Rule: First Mention Per Chapter = Full Name + Abbreviation

```
FIRST MENTION:
  "O Vetor Radial (VR) é o componente que aplaina a córnea centralmente."

SUBSEQUENT MENTIONS (same chapter):
  "O VR domina nos fenótipos Nipple..."
  "Quando o VR atua concentricamente..."
```

### Rule: Force Components Use Different Prefix

| Context | Format | Example |
|---------|--------|---------|
| **Force of the cone** | F + subscript | Fr (Força Radial), Ft (Força Tangencial), Fτ (Força Torsional) |
| **Vector of the ring** | V + subscript | VR (Vetor Radial), VT (Vetor Tangencial), Vτ (Vetor Torsional) |

This distinction is critical: **F is the problem, V is the solution.**

### Rule: Every Figure Must Include a Legend Box

Every figure containing vectors MUST have a small legend box:

```
┌─────────────────────────────┐
│ 🔴 → Fr: Força Radial       │
│ 🔴 → Ft: Força Tangencial   │
│ 🔴 ↻ Fτ: Força Torsional    │
│ 🔵 → VR: Vetor Radial       │
│ 🔵 → VT: Vetor Tangencial   │
│ 🔵 ↺ Vτ: Vetor Torsional    │
│ 🟢 ⇢ V_res: Resultante      │
└─────────────────────────────┘
```

---

## 4. Per-Chapter Didactic Approach — "Repetir Sem Cansar"

### The Problem
If every chapter re-explains VR the same way, the reader gets bored. If no chapter re-explains it, the reader gets lost. The solution is **progressive analogies**.

### Framework: Each Chapter Gets ONE Sentence Reminder + ONE Unique Angle

| Chapter | How VR is referenced | Unique didactic angle |
|---------|---------------------|-----------------------|
| **CH-002** (Biomecânica) | Full formal definition | "The three principles in the fiber scale" |
| **CH-004** (VR canônico) | Complete explanation — 40 pages | **Canonical reference.** All other chapters point here. |
| **CH-005** (VT canônico) | "Lembre: VR aplaina. VT redistribui." | Contrast between VR (centrifugal) and VT (tangential) |
| **CH-006** (Vτ canônico) | "VR aplaina, VT redistribui, Vτ rotaciona." | The trio: flat, spread, twist |
| **CH-008** (LDM) | "Fr — a componente radial do campo de forças" | Forces, not vectors. Fr is what you READ, VR is what you DO. |
| **CH-009** (Nomograma) | "O VR — a força de aplainamento — guia a espessura" | Practical: VR = thickness decision |
| **CH-010** (Casos) | "Neste caso, VR dominou. A prova: K-max caiu 3 D." | Clinical evidence: VR measurable by ΔK |
| **CH-011** (Complicações) | "O VR excessivo causou hipermetropização" | What happens when VR is too much |

### Rule: The Reminder Sentence

Every chapter that uses a vector abbreviation MUST include a **one-sentence reminder** formatted as:

```markdown
*Recall:* **VR (Vetor Radial)** — a força que aplaina a córnea centralmente.
```

This sentence:
- Uses italics for "Recall" (signals it's a refresh, not new content)
- Bolds the abbreviation + full name
- Gives the function in ≤10 words
- NEVER repeats the same wording from chapter to chapter

### Analogies Bank (Use Differently Per Chapter)

| Vector | Analogy 1 | Analogy 2 | Analogy 3 | Analogy 4 |
|--------|-----------|-----------|-----------|-----------|
| **VR** | Pressing center of a trampoline | Weight on a drum skin | Brick under a hammock | Tent pole pushing canvas |
| **VT** | Squeezing a waterbed | Pushing one end of a seesaw | Tightening one side of a net | Cinching a belt |
| **Vτ** | Unscrewing a jar lid | Wringing a towel | Twisting a Rubik's cube layer | Torque on a steering wheel |
| **VComa** | Nudging a ball back to center | Repositioning a spotlight | Centering a tilted picture | Straightening a crooked painting |

**Rule:** Never use the same analogy twice in the entire book.

---

## 5. Quick Reference Card — "The Cheat Sheet"

This template should appear as a foldout or inside-cover reference in the printed Atlas:

```
╔══════════════════════════════════════════════════════════╗
║              ATLAS VETORIAL ICRS — REFERÊNCIA RÁPIDA    ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  PROBLEMA (🔴)          CORREÇÃO (🔵)                    ║
║  Fr  Força Radial    →  VR  Vetor Radial                ║
║  Ft  Força Tangencial→  VT  Vetor Tangencial            ║
║  Fτ  Força Torsional →  Vτ  Vetor Torsional             ║
║                                                          ║
║  V_cone + V_anel = 0  (neutralização perfeita)           ║
║                                                          ║
║  🔴 aponta para onde o problema EMPURRA                  ║
║  🔵 aponta para onde o anel CORRIGE (direção oposta)     ║
║  🟢 resultante neutralizada                              ║
║  🟡 resultante parcial (sobrou vetor residual)           ║
║                                                          ║
║  Planos:  X-Y = superfície (top view)                    ║
║           Z   = profundidade (side view)                 ║
║                                                          ║
║  IDT = Índice de Distorção Tangencial                    ║
║  COF = Centro Óptico Funcional                           ║
║  ENM = Eixo de Neutralização Mecânica                    ║
╚══════════════════════════════════════════════════════════╝
```

---

## Usage Instructions

When creating or reviewing ANY vector illustration or text in the Atlas:

1. **Check direction:** Red points where pathology pushes, blue points opposite
2. **Check abbreviations:** First mention = full name + abbreviation
3. **Check legend:** Every vector figure has a legend box
4. **Check analogy:** Is this the same analogy used in another chapter? → Change it
5. **Check planes:** X-Y for surface, add side view only when Z (depth) is relevant
6. **Check reminder:** Does the chapter include a one-sentence "Recall" for each vector used?
