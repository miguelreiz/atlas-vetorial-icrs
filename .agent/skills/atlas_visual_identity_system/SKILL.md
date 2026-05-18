---
name: Atlas Visual Identity System — Identidade Visual Unificada do Atlas Vetorial ICRS
description: Sistema único e autoritativo de identidade visual, produção de figuras e padrões de publicação do Atlas Vetorial ICRS. Consolida paleta de cores canônica (dark mode único), orientação anatômica, workflows (matplotlib/BioRender/Fiverr), catálogo de figuras por capítulo, quality gates e briefing templates. Esta skill é a ÚNICA fonte de verdade para questões visuais — todas as outras skills de ilustração devem referenciar esta. Perfil Ferrara canônico = HM (fusiforme/biconvexo).
---

# Atlas Visual Identity System — Antigravity

> **Autoridade:** Esta skill é a **ÚNICA fonte de verdade** para cores, tipografia, orientação e padrões visuais do Atlas Vetorial ICRS.
> **Qualidade:** Nível Netter/Krachmer — precisão científica + clareza didática + estética premium.
> **Idioma:** Português (primário) — inglês entre parênteses quando necessário.

---

## 1. PALETA DE CORES CANÔNICA

> ⚠️ **REGRA INVIOLÁVEL:** Usar APENAS estes hex codes. Qualquer outra skill que defina cores diferentes está DESATUALIZADA — esta skill prevalece.

### 1.1 Vetores Biomecânicos (Imutáveis)

| Vetor | Nome | Cor | Hex | Uso |
|-------|------|-----|-----|-----|
| **VR** | Vetor Radial | 🔴 Vermelho | `#CC2200` | Aplainamento, fibras radiais, setas centrífugas |
| **VT** | Vetor Tangencial | 🔵 Ciano | `#00B4DC` | Redistribuição, fibras tangenciais, coupling |
| **Vτ** | Vetor Travamento | 🟢 Verde | `#00CC44` | Rotação/travamento, fibras oblíquas, bloqueio lamelar |
| **VComa** | Vetor Coma | 🟠 Laranja | `#FF6600` | Deslocamento óptico do ápice |
| **V_End** | Vetor Endotelial | 🟩 Verde-água | `#00FF88` | Aplainamento endotelial, seta descendente |
| **VEsférico** | Resultante | 💜 Roxo | `#8E44AD` | Soma vetorial integrada |
| **PIO** | Pressão Intraocular | ⬜ Branco | `#FFFFFF` | Setas de pressão, sempre +Z (para cima) |

### 1.2 Camadas Anatômicas (Córnea em Corte)

| Camada | Cor | Hex | Proporção |
|--------|-----|-----|-----------|
| Epitélio | Rosa claro | `#FFCDD2` | ~9% (~50 µm) |
| Bowman | Marrom escuro | `#8D6E63` | ~2% (~12 µm) — LINHA, não banda |
| Estroma anterior (feltro) | Bege quente | `#F5E6C8` | ~25% (~135 µm) |
| Estroma posterior (paralelo) | Bege claro | `#EDD9A3` | ~60% (~330 µm) |
| Descemet | Cinza | `#9E9E9E` | ~2% (~10 µm) — LINHA, não banda |
| Endotélio | Azul claro | `#B3E5FC` | ~2% (~5 µm) |
| ICRS (anel) | Cinza-azul | `#90A4AE` | Variável (150–400 µm) |

### 1.3 Fibras de Colágeno

| Fibra | Cor | Hex |
|-------|-----|-----|
| 🔴 Radiais | Vermelho fibra | `#CC2200` |
| 🔵 Tangenciais/Circunferenciais | Ciano fibra | `#00B4DC` |
| 🟢 Oblíquas/Interlamelares | Verde fibra | `#00CC44` |

### 1.4 Sistema Problema vs. Solução

| Contexto | Cor | Hex |
|----------|-----|-----|
| Vetor de patologia (V_cone) | Vermelho intenso | `#FF1744` |
| Vetor de correção (V_anel) | Azul correção | `#0091EA` |
| Resultante neutralizado | Verde | `#00C853` |
| Resultante parcial | Amarelo | `#FFD600` |
| Aviso / Erro biomecânico | Laranja-vermelho | `#FF5722` |

### 1.5 Interface e Background

| Elemento | Cor | Hex |
|----------|-----|-----|
| Background principal | Preto-azul | `#0D1117` |
| Background card/box | Preto-azul médio | `#161B22` |
| Bordas/divisores | Cinza escuro | `#37474F` |
| Texto principal | Branco | `#FFFFFF` |
| Texto secundário/dimensões | Cinza | `#78909C` |
| Superfície original (pré-ICRS) | Amarelo tracejado | `#FFEB3B` |
| Superfície pós-ICRS | Branco sólido | `#FFFFFF` |

---

## 2. ORIENTAÇÃO PADRÃO DA CÓRNEA

> ⚠️ **REGRA INVIOLÁVEL:** Toda ilustração de corte transversal DEVE seguir esta orientação:

```
        SUPERIOR (ar/filme lacrimal)
        ========================
        ║ Epitélio (~50 μm)    ║ ← Rosa claro #FFCDD2
        ║ Bowman (~12 μm)      ║ ← Linha fina #8D6E63
        ║                      ║
        ║ ESTROMA (~450 μm)    ║
        ║   Anterior (1/3)     ║ ← Feltro #F5E6C8
        ║   ─ ─ ─ ─ ─ ─ ─ ─  ║
        ║   Posterior (2/3)    ║ ← Paralelo #EDD9A3
        ║   ┌──────────┐       ║
        ║   │  ICRS ▲  │       ║ ← A 70-80% profundidade, ápice ↑
        ║   └──────────┘       ║
        ║ Descemet (~10 μm)    ║ ← Linha fina #9E9E9E
        ║ Endotélio (~5 μm)    ║ ← Azul claro #B3E5FC
        ========================
        INFERIOR (câmara anterior)
              ↑ ↑ ↑
            PIO (pressão)
```

**Regras de orientação:**
1. **Epitélio SEMPRE em cima** — superfície anterior
2. **Endotélio SEMPRE embaixo** — superfície posterior
3. **PIO (setas) SEMPRE vindo de baixo** — posterior → anterior (+Z)
4. **ICRS no estroma POSTERIOR** — a 70-80% de profundidade
5. **Ápice do triângulo para CIMA** — direção do VR = direção do epitélio
6. **Curvatura convexa para cima** em vista frontal
7. **Proporção estromal obrigatória:** anterior:posterior = **1:3**

### Vista Superior (En Face)
- **Superior (S)** no topo, **Temporal (T)** à direita (perspectiva do cirurgião OD)
- ICRS como arco na média-periferia (r ≈ 2,5–4,0 mm)
- VR: setas para FORA (centrífugo), VT: setas tangenciais nas extremidades
- Centro: símbolo ∇ (aplainamento como CONSEQUÊNCIA, nunca seta de força)

---

## 3. PERFIS DE ANÉIS — FORMAS PADRÃO

```
Fusiforme/Biconvexo (Ferrara HM)    Triangular (Ferrara Original/Keraring)
    ╱‾‾╲                                ▲
   ╱    ╲                              ╱ ╲
   ╲    ╱                             ╱   ╲
    ╲__╱                             ╱_____╲
  ↑ CANÔNICO (usar por padrão)

Hexagonal (Intacs)               Arredondado (Cornealring 355)
  ╱▔▔╲                              .---.
 ╱    ╲                             /     \
╱______╲                           |       |
                                    \     /
                                     '---'

MyoRing (Anel Completo 360°)
  ╔══════════╗
  ║          ║  ← Cilindro contínuo 360°
  ╚══════════╝

> ⚠️ O perfil **Ferrara HM (fusiforme/biconvexo)** é o canônico do Atlas.
> O perfil triangular original é referenciado apenas para comparação histórica.
```

---

## 4. TIPOGRAFIA

| Uso | Fonte | Tamanho | Peso | Cor |
|-----|-------|---------|------|-----|
| Título principal | Inter / DejaVu Sans | 14–16pt | Bold | `#FFFFFF` |
| Subtítulo/legenda | Inter / DejaVu Sans | 10–11pt | Regular | `#E2E8F0` |
| Labels anatômicos | Inter / DejaVu Sans | 8–9pt | Regular | `#FFFFFF` |
| Labels de vetores | Inter / DejaVu Sans | 12pt | Bold | Cor do vetor |
| Dimensões/escalas | Inter / DejaVu Sans | 7–8pt | Regular | `#78909C` |
| Legendas científicas | Crimson Pro Italic | 10pt | Italic | `#94A3B8` |
| Código (mono) | JetBrains Mono / var(--font-mono) | 9pt | Regular | — |

---

## 5. CONVENÇÕES DE SETAS E VETORES

| Seta | Direção | Cor | Significado |
|------|---------|-----|-------------|
| **PIO** | ↑ (para cima, +Z) | Branco `#FFFFFF` | Pressão empurrando córnea anteriormente |
| **VR** | centro → periferia (centrífuga) | Vermelho `#CC2200` | Fibra radial tracionada → arc-shortening → aplainamento |
| **VT** | ↕ (tangencial ao arco) | Ciano `#00B4DC` | Encurvamento tangencial (coupling) |
| **Vτ** | ↻ (rotacional/gradiente) | Verde `#00CC44` | Torque de travamento das oblíquas |
| **V_End** | ↓ (descendente) | Verde-água `#00FF88` | Aplainamento endotelial |
| **VComa** | oposto ao deslocamento | Laranja `#FF6600` | Reposicionamento do ápice |
| **Cone (deformação)** | ↑↗ (protrusão) | Amarelo `#FBBF24` | Direção da ectasia |
| **ICRS (força)** | ↓ (contra a PIO) | Cinza `#94A3B8` | Separação lamelar |

---

## 6. ELEMENTOS OBRIGATÓRIOS EM TODA FIGURA

1. ✅ Barra de escala OU medidas rotuladas
2. ✅ Labels das estruturas em português
3. ✅ Legenda de cores/vetores (caixa de legenda)
4. ✅ Título descritivo com conceito biomecânico
5. ✅ Número da figura com capítulo (ex: "Figura 4.4 —")
6. ✅ Background `#0D1117` — sem exceção
7. ✅ Todos os rótulos em PORTUGUÊS (inglês entre parênteses se necessário)
8. ✅ Referências bibliográficas na legenda quando aplicável

---

## 7. CHECKLIST DE QUALIDADE — AUDITORIA POR IMAGEM (12 critérios)

### A. Precisão Científica (eliminatória — reprovar se qualquer falha)

- [ ] **A1. Direção das forças correta** — VR centrífugo, VT tangencial, Vτ torsional
- [ ] **A2. Anatomia fiel** — camadas na proporção 1:3 (anterior:posterior), Bowman como LINHA
- [ ] **A3. Fibras com orientação correta** — radiais=raios, tangenciais=arcos, oblíquas=cruzando
- [ ] **A4. Proporcionalidade** — anel < córnea < globo; profundidade 70-80%

### B. Qualidade Visual (0-3 cada)

- [ ] **B1. Resolução** — ≥200 DPI digital, ≥300 DPI impressão, mín. 2000×1500px
- [ ] **B2. Paleta** — segue §1 desta skill (cores canônicas exatas)
- [ ] **B3. Legibilidade** — rótulos ≥8pt, sem sobreposição, contraste adequado
- [ ] **B4. Profissionalismo** — sem artefatos de IA (texto ilegível, distorções, simetria impossível)

### C. Didática (0-3 cada)

- [ ] **C1. Antes/Depois** — quando aplicável, mostra estado patológico vs corrigido
- [ ] **C2. Legenda completa** — cada elemento visual tem explicação
- [ ] **C3. Autoexplicativa** — comunica o conceito sem precisar do texto principal
- [ ] **C4. Consistência** — mesma perspectiva e escala de imagens similares

### Classificação

| Score (B+C = máx 24) | Classificação | Ação |
|---|---|---|
| 20-24 | ✅ **Atlas-Ready** | Pronta para publicação |
| 14-19 | ⚠️ **Precisa Refinamento** | Ajustar via BioRender ou IA |
| 8-13 | 🔶 **Redesenhar** | Enviar briefing para ilustrador |
| 0-7 | ❌ **Substituir** | Criar nova imagem do zero |

---

## 8. CATÁLOGO DE FIGURAS POR CAPÍTULO

### CH-001 — Anatomia Corneana
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 1.1 | `fig_1_1_camadas_corte.png` | Corte transversal 6 camadas | ❌ Pendente |
| 1.2 | `fig_1_2_fibras_topdown.png` | Mapa fibras WAXS top-down | ❌ Pendente |
| 1.3 | `fig_1_3_gradiente_rigidez.png` | Gradiente anterior:posterior 3:1 | ❌ Pendente |

### CH-002 — Biomecânica dos Anéis
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 2.1 | `fig_2_1_icrs_tipos.png` | Perfis: triangular, fusiforme, arredondado | ❌ Pendente |
| 2.2 | `fig_2_2_arc_shortening.png` | Arc-shortening + V_End | ❌ Pendente |

### CH-003 — Classificação do Ceratocone
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 3.1–3.8 | (existentes) | Padrões Plácido, fluxograma, WAXS, FEM | ✅ Existente |

### CH-004 — VR: Vetor Radial
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 4.2 | `fig_4_2_lei_barraquer.png` | Lei de Barraquer aplicada ao ICRS | ❌ Pendente |
| 4.3 | `fig_4_3_efeito_tenda.png` | Arc-shortening (sem tenting!) | ❌ Pendente |
| 4.4 | `fig_4_4_vetor_radial_corte_pt.png` | VR em corte transversal + V_End | ✅ Gerado |
| 4.5 | `fig_4_5_vetor_radial_superior_pt.png` | VR vista superior | ❌ Pendente |

### CH-005 — VT: Vetor Tangencial
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 5.1 | `Figura_Coupling_Collagen.png` | Acoplamento Poisson na malha | ✅ Gerado |
| 5.2 | `Figura_Tangential_Traction.png` | Tração tangencial nas extremidades | ✅ Gerado |
| 5.3 | `Figura_Efeito_Acoplamento.png` | Incisão errada → SIA conflitante | ✅ Gerado |

### CH-007 — VComa
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 7.1 | `fig_7_1_vcoma_assimetria.png` | Vτ assimétrico → VComa | ❌ Pendente |

### CH-008 — LDM
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 8.x | (a criar) | Relação espessura × efeito | ❌ Pendente |

### CH-011 — Nomogramas Vetoriais
| # | Arquivo | Conceito | Status |
|---|---------|----------|--------|
| 11.x | (a criar) | Nomogramas visuais | ❌ Pendente |

---

## 9. GERAÇÃO DE FIGURAS COM PYTHON (matplotlib)

### Template Base (Copiar para Todo Script)

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.lines import Line2D
import os

# Paths
BASE = r"C:\Users\Miguel Reis\Documents\Vetores corneanos"
OUT  = os.path.join(BASE, "images", "CH-00X_NomePasta", "fig_X_Y_nome_pt.png")

# ═══ PALETA CANÔNICA (atlas_visual_identity_system) ═══
BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VT_  = "#00CC44"   # Vτ (Travamento)
COL_VCOMA= "#FF6600"
COL_VEND = "#00FF88"
COL_VESF = "#8E44AD"   # VEsférico (resultante)
COL_PIO  = "#FFFFFF"
COL_ICRS = "#90A4AE"
COL_ORIG = "#FFEB3B"   # superfície original (tracejada)
COL_NEW  = "#FFFFFF"   # superfície pós-ICRS (sólida)
COL_EPI  = "#FFCDD2"
COL_BOW  = "#8D6E63"
COL_ANT  = "#F5E6C8"
COL_POST = "#EDD9A3"
COL_DESC = "#9E9E9E"
COL_ENDO = "#B3E5FC"
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"

fig, ax = plt.subplots(figsize=(12, 8), facecolor=BG)
ax.set_facecolor(BG)

# ... código da figura ...

ax.set_title('Figura X.Y — Título Biomecânico\nSubtítulo explicativo',
             color='white', fontsize=11, pad=14, fontweight='bold')

# Legenda padrão
legend_elements = [
    Line2D([0],[0], color=COL_VR, lw=2.5, label='Vetor Radial (VR)'),
    Line2D([0],[0], color=COL_VT, lw=2.5, label='Vetor Tangencial (VT)'),
    mpatches.Patch(facecolor=COL_ICRS, edgecolor='white', label='ICRS'),
]
ax.legend(handles=legend_elements, loc='lower right',
          facecolor='#161B22', edgecolor='#37474F', labelcolor='white',
          fontsize=8.5, framealpha=0.95)

plt.tight_layout()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
```

### Regras de Decisão: IA vs. Python

```
Use IA generativa APENAS para:
  ✅ Imagens histológicas/microscópicas (textura biológica)
  ✅ Backgrounds 3D para renderização híbrida
  ✅ Ilustrações decorativas sem precisão biomecânica

Use Python/matplotlib para TUDO que envolve:
  ✅ Perfis do anel (triângulo, fusiforme, oval)
  ✅ Posição e profundidade do anel na córnea
  ✅ Direção das setas (VR, VT, PIO, V_End)
  ✅ Proporção das camadas corneanas
  ✅ Topografias e mapas de curvatura
  ✅ Nomogramas e gráficos clínicos
  ✅ Qualquer figura com escala ou medidas
```

---

## 10. WORKFLOWS DE PRODUÇÃO

### 10.1 BioRender (Self-Service)

**Quando usar:** Diagramas esquemáticos, figuras celulares/moleculares, protótipos rápidos.
**Quando NÃO usar:** Cortes transversais detalhados, fotografias clínicas, representações 3D complexas.

**Passo a Passo:**
1. Criar canvas 1920×1080px (16:9) ou 2400×1600px (3:2)
2. Buscar: "cornea", "collagen fiber", "eye cross section"
3. Aplicar cores do sistema: `#CC2200`, `#00B4DC`, `#00CC44`
4. Exportar PNG 300 DPI ou SVG
5. Pós-processar: ajustar fundo para `#0D1117`

### 10.2 Fiverr/Upwork (Comissionamento Profissional)

**Quando usar:** Figuras finais de publicação, ilustrações complexas, figuras compostas multi-panel.

#### Template de Brief (EN — para ilustradores internacionais)

```markdown
# ILLUSTRATION BRIEF — Atlas Vetorial ICRS

## Project Overview
- **Publication:** Medical textbook / surgical atlas
- **Target audience:** Ophthalmologists, corneal surgeons, fellows
- **Style:** Clean, semi-realistic, similar to Krachmer/Presbycor atlases
- **Background:** Dark #0D1117 (mandatory, no white variant)

## Figure [X]: [TITLE]
- **Description:** [DETAILED DESCRIPTION]
- **View:** Cross-section / Top view / Sagittal / 3D perspective
- **Orientation:** Epithelium at TOP, endothelium at BOTTOM
- **Must include:**
  - [ ] All 5 corneal layers labeled
  - [ ] ICRS ring at 70-80% stromal depth
  - [ ] Vector arrows with specified colors
  - [ ] IOP arrows from below (white)
  - [ ] Scale bar
- **Must NOT include:**
  - [ ] Unnecessary decorative elements
  - [ ] Ring in anterior stroma

## Color Palette (MANDATORY — CANONICAL)
| Element | Hex Color |
|---------|-----------|
| VR arrows | #CC2200 (red) |
| VT arrows | #00B4DC (cyan) |
| Vτ arrows | #00CC44 (green) |
| VComa | #FF6600 (orange) |
| IOP arrows | #FFFFFF (white) |
| Epithelium | #FFCDD2 (light pink) |
| Stroma anterior | #F5E6C8 (warm beige) |
| Stroma posterior | #EDD9A3 (light beige) |
| Endothelium | #B3E5FC (light blue) |
| ICRS ring | #90A4AE (blue-gray) |
| Background | #0D1117 (dark, mandatory) |

## Technical Specifications
- **Format:** SVG (primary) + PNG 300dpi (secondary)
- **Dimensions:** 2400 × 1600 px minimum
- **Font:** Inter (sans-serif) for all labels
- **Language:** Portuguese (PT-BR) for final version
- **Revisions:** 2 rounds included
```

### 10.3 Pipeline Express (Python → PNG)

**Ver skill:** `pipeline_figura_express` para o motor automatizado.

---

## 11. QUALITY GATES (3 Portões)

### Gate 1 — Draft (gerado/encomendado)
- [ ] Conteúdo biomecânico correto
- [ ] Proporções anatômicas corretas (1:3)
- [ ] Direções dos vetores corretas

### Gate 2 — Review (revisão editorial)
- [ ] Background `#0D1117` (sem exceção)
- [ ] Cores canônicas da §1 (sem desvios)
- [ ] Labels em português
- [ ] Barra de escala presente
- [ ] Legenda completa
- [ ] Título com número da figura

### Gate 3 — Final (pronto para publicação)
- [ ] Resolução ≥ 200 DPI (300 DPI impressão)
- [ ] Arquivo no caminho correto `images/CH-XXX/`
- [ ] Nome seguindo `fig_X_Y_nome_pt.png`
- [ ] Referenciado no `.md` do capítulo
- [ ] Versão aprovada pelo autor

---

## 12. OS 10 MANDAMENTOS VISUAIS DO ATLAS

1. **Background sempre `#0D1117`** — sem exceção, sem variante branca
2. **VR é vermelho `#CC2200`, VT é ciano `#00B4DC`** — nunca inverter
3. **ICRS a 70-80% no estroma posterior** — nunca no anterior
4. **Superfície sobre o anel = PLANA ou REBAIXADA** — nunca "tenting" elevado
5. **Setas VR apontam PARA FORA** — centrífugo, nunca para o centro
6. **PIO aponta para CIMA** — de endotélio para epitélio (+Z)
7. **Estroma posterior 3× mais espesso que anterior** — proporções reais
8. **Aplainamento central = ∇ (consequência)** — sem seta de força apontando ao centro
9. **Português primeiro** — inglês entre parênteses se necessário
10. **Legenda sempre visível** — nenhuma cor sem rótulo

---

## 13. SKILLS RELACIONADAS (Cross-References)

| Skill | Relação |
|-------|---------|
| `icrs_desenho_histologico` | Prompts para IA generativa — deve usar paleta da §1 |
| `medical_studio_hybrid_rendering` | Arquitetura do motor híbrido (3D + SVG overlay) |
| `icrs_vector_illustration` | Regras de direção de forças e mapeamento fibra→vetor |
| `pipeline_figura_express` | Motor de execução Python (YAML → script → PNG) |
| `icrs_geometria_precisa` | Templates de código matplotlib para perfis de anel |
| `svg_vector_aesthetic_engine` | Padrões estéticos premium para SVG/React |
| `icrs_anatomy_histology` | Referência histológica dos perfis e fases de remodelação |
| `collagen_fiber_architecture` | Modelo 3-fibras e cascata patogênica |

---

*Consolidação realizada em Maio 2026 — Motor Editorial Antigravity DeepMind*
*Substitui: elite_medical_illustration, professional_medical_illustration, studio_ilustracao_atlas*
