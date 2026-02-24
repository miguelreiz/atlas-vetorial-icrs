# 🎨 ATLAS DESIGN SYSTEM - Tokens & Rules

## 1. COLOR TOKENS (Functional)
Used to identify specific vector forces across all chapters.

| Token | Hex Code | Usage |
|-------|----------|-------|
| `VR` | `#0B3D91` | **Vetor Radial**: Flattening/Traction. |
| `VT` | `#C62828` | **Vetor Tangencial**: Circular support. |
| `Vτ` | `#F57C00` | **Vetor Torque**: Torsional forces. |
| `VComa` | `#6A1B9A` | **VComa**: Apex displacement. |
| `BG_PRIMARY` | `#FFFFFF` | Main background. |
| `STROMA` | `#D7CCC8` | Corneal stroma layer. |
| `EPITHELIUM` | `#ECEFF1` | Corneal epithelium layer. |

## 2. TYPOGRAPHY & LAYOUT
- **Font**: Inter or Roboto (Modern, Sans-serif).
- **Contrast**: Minimum 4.5:1 for all text and symbols.
- **Hierarchy**:
  - H1: Chapter Title.
  - H2: Skill Output Headers.
  - Captions: Small, italicized technical brief.

## 3. VISUAL RULES (The "Laws")
1. **The Law of Simplicity**: Never more than 3 primary vectors in a single illustration.
2. **The Law of Legend**: Every diagram MUST have a bottom-right legend specifying color tokens.
3. **The Law of Orientation**: Top-down views must align the 0-180 axis horizontally.
4. **The Law of Anatomy**: Vectors must NOT penetrate anatomical structures unless representing "trans-stromal tension".

---

## 4. FRAMEWORK VISUAL MULTI-ESCALA — Linguagem Própria do Atlas

> **Conceito fundacional:** Este Atlas apresenta cada fenômeno em **3 escalas simultâneas**. Esta é a diferença editorial que nenhum atlas de anel publicado até hoje possui.

### As 3 Escalas

| Escala | O que mostra | Técnica visual |
|--------|-------------|----------------|
| **MACRO** | Disco de Plácido deformado + mapa topográfico | Top-down, anéis concêntricos com vetores sobrepostos |
| **MESO** | Corte transversal da córnea com anel implantado | Cross-section meridional, epitélio + estroma + Bowman |
| **MICRO** | Malha de fibras de colágeno estromal sob tensão | Lattice/rede de lamelas, deformação visível nas fibras |

### Regra de Composição das Pranchas

Cada prancha principal do Atlas deve mostrar:

```
┌─────────────────────────────────────────────────┐
│  MACRO — Plácido deformado (top-down)           │
│  [anéis + vetores sobrepostos]                  │
├──────────────┬──────────────────────────────────┤
│  MESO        │  MICRO                           │
│  [cross-sec] │  [malha de colágeno]             │
│  + anel      │  + vetores nas fibras            │
└──────────────┴──────────────────────────────────┘
    ←── O PROBLEMA ──→      ←── A SOLUÇÃO ──→
```

### Convenção de Cores por Escala

| Elemento | Cor | Nota |
|----------|-----|------|
| Fibras de colágeno — normal | `#D7CCC8` (bege) | Lamelas organizadas, linhas horizontais paralelas |
| Fibras de colágeno — ectasia | `#FFCCBC` (salmão claro) | Lamelas espalhadas, gaps visíveis, rede distorcida |
| Fibras de colágeno — corrigidas | `#C8E6C9` (verde claro) | Lamelas se reorganizando pós-implante |
| Anel intracorneano (ICRS) | `#455A64` (cinza-azulado) | Corte transversal hexagonal/triangular |
| Zona ectásica (meso) | contorno `#C62828` | Circunda a área de protrusão |
| Vetor — Problema | `#FF4444` resultante vermelho | Força causadora da deformidade |
| Vetor — Solução | `#00CC66` resultante verde | Força compensatória do anel |

### O Que Mostrar em Cada Nível

**MACRO (Plácido):**
- Anéis deformados revelando o fenótipo
- K-max localizado (problema)
- Vetores Fr, Ft, Fτ sobrepostos (campo de forças)
- ENM como linha branca tracejada (alvo cirúrgico)

**MESO (Corte transversal):**
- Epitélio + estroma + Bowman + Descemet
- Protrusão do cone visível
- Anel implantado a 75% de profundidade
- Vetores saindo do anel na direção de compensação

**MICRO (Malha de colágeno):**
- Lattice de lamelas estromais em vista ampliada
- **Problema:** fibras afastadas, rede distorcida, pontos de tensão máxima indicados
- **Solução:** anel como objeto sólido entre as lamelas; fibras ao redor sendo redistribuídas; a rede normalizando progressivamente
- Setas vetoriais **nas próprias fibras** (não no espaço vazio) — o vetor emerge da biomecânica das lamelas, não de fora

### Por que Esta Linguagem é Nova

Livros de anel existentes mostram:
- ✓ Mapas topográficos (macro)
- ✓ Nomogramas de seleção
- ✗ Nunca: a interação microscópica do anel com as fibras de colágeno
- ✗ Nunca: as três escalas integradas numa única narrativa visual
- ✗ Nunca: o vetor emergindo da deformação das lamelas — como causa física real

Este Atlas mostra que **o vetor não é uma seta desenhada sobre o mapa**.
O vetor **É a manifestação geométrica da tensão nas lamelas de colágeno**.
A seta é apenas a linguagem matemática do que as fibras já estão fazendo.
