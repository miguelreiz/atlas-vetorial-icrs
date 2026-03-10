---
name: Pipeline Figura Express — Da Ideia ao PNG em Um Comando
description: Motor de geração automática de figuras do Atlas Vetorial ICRS. Dado um conceito biomecânico, gera a especificação YAML, escreve o script Python matplotlib completo, executa localmente e salva o PNG no caminho correto do projeto. Resolve sistematicamente os ~80 PNGs pendentes do Atlas.
---

# Pipeline Figura Express — Antigravity
> **Comando de ativação:** *"Figura [N.X] — [descrição do conceito]"*
> **Output:** YAML + script Python + execução + PNG salvo no caminho correto

---

## 1. Fluxo de Trabalho

```
ENTRADA: "Figura 4.4 — VR em corte transversal com V_End"
    ↓
PASSO 1: Classificar o tipo de figura
    ↓
PASSO 2: Gerar especificação YAML completa
    ↓
PASSO 3: Escrever script Python (matplotlib) seguindo os padrões
    ↓
PASSO 4: Salvar script em fem/plot_fig_X_Y.py
    ↓
PASSO 5: Executar o script (python plot_fig_X_Y.py)
    ↓
PASSO 6: Verificar se PNG foi salvo no caminho correto
    ↓
SAÍDA: PNG em images/CH-00X_Nome/fig_X_Y_nome_pt.png
```

---

## 2. Tipos de Figura e Templates

### Tipo A — Corte Transversal (Cross-Section)
Para figuras mostrando camadas corneanas e ICRS em corte sagital.

**Elementos obrigatórios:**
- 6 camadas com cores oficiais e proporção 1:3 (anterior:posterior)
- ICRS a 70-80% de profundidade (estroma posterior)
- Superfície anterior: tracejado amarelo (#FFEB3B) = original, sólido branco = pós-ICRS
- Superfície sobre o anel = PLANA ou REBAIXADA (nunca elevada)
- Setas VR saindo do anel centrífugamente
- Seta V_End verde-água descendente sobre o anel
- Barra de escala (1 mm)
- Labels de todas as camadas (português)

**Caminho padrão:** `images/CH-004_Vetor_Radial/fig_4_X_nome_pt.png`

---

### Tipo B — Vista Superior Top-Down
Para figuras mostrando a córnea en face com vetores e fibras.

**Elementos obrigatórios:**
- Círculo do limbo (Ø 12mm, linha tracejada)
- Fibras radiais (linhas vermelhas), tangenciais (arcos azuis), oblíquas (linhas verdes diagonais)
- ICRS como arco cinza-azul na média-periferia (r ≈ 3-4mm)
- Setas VR = para fora (centrífugo)
- Setas VT = tangenciais nas extremidades
- Aplainamento central = símbolo ∇ (não seta de força)
- Labels dos eixos K-steep e K-flat
- Legenda com cores

**Caminho padrão:** `images/CH-00X_Nome/fig_X_Y_nome_pt.png`

---

### Tipo C — Topografia Simulada
Para figuras mostrando mapas de curvatura (Placido/axial) antes e depois do ICRS.

**Elementos obrigatórios:**
- Dois mapas lado a lado (pré vs pós-ICRS)
- Escala de cores: azul (plano) → verde → amarelo → vermelho (íngreme)
- Posição do anel marcada
- Diferença ΔK mostrada
- K-steep e K-flat anotados

**Caminho padrão:** `images/CH-003_Classificacao/` ou capítulo específico

---

### Tipo D — Comparativo (Antes/Depois ou A vs B)
Para figuras com dois painéis comparando cenários.

**Elementos obrigatórios:**
- Dois painéis lado a lado com títulos claros
- Mesmo eixo de escala em ambos
- Seta ou "vs" separando os painéis
- Background `#0D1117` em ambos
- Legenda compartilhada na parte inferior

---

### Tipo E — Diagrama de Mecanismo
Para figuras esquemáticas mostrando cascata causal (sem anatomia detalhada).

**Elementos obrigatórios:**
- Caixas com texto e setas de causa-efeito
- Código de cores por vetor
- Fluxo da esquerda para direita ou de cima para baixo
- Labels em português

---

## 3. Padrões de Código Python Obrigatórios

### Cabeçalho de Todo Script
```python
"""
Fig X.Y — [Título Completo]
Atlas Vetorial ICRS — Capítulo X
[Descrição do que a figura mostra]
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.lines import Line2D
import os

# Paths
BASE = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT  = os.path.join(BASE, "images", "CH-00X_NomePasta", "fig_X_Y_nome_pt.png")

# Sistema de cores oficial
BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VT_  = "#00CC44"   # Vτ
COL_VCOMA= "#FF6600"
COL_VEND = "#00FF88"
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
```

### Padrão de Figura e Fechamento
```python
fig, ax = plt.subplots(figsize=(12, 8), facecolor=BG)
ax.set_facecolor(BG)

# ... código da figura ...

ax.set_title('Figura X.Y — Título Biomecânico\nSubtítulo explicativo do mecanismo',
             color='white', fontsize=11, pad=14, fontweight='bold')

# Legenda padrão
legend_elements = [
    Line2D([0],[0], color=COL_VR, lw=2.5, label='Vetor Radial (VR)'),
    # adicionar outros elementos...
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

### Padrão de Setas
```python
# Seta de vetor principal (VR, VT)
ax.annotate('', xy=(x_fim, y_fim), xytext=(x_ini, y_ini),
            arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.5,
                           mutation_scale=20), zorder=10)

# Seta dupla de dimensão
ax.annotate('', xy=(x1, y), xytext=(x0, y),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.2,
                           mutation_scale=10))

# Superfície original (KC) — tracejada amarela
ax.plot(x, y_orig, color=COL_ORIG, lw=1.5, linestyle='--', alpha=0.8)

# Superfície pós-ICRS — sólida branca (plana ou rebaixada sobre anel)
ax.plot(x, y_new, color=COL_NEW, lw=2.2, linestyle='-')
```

---

## 4. Inventário de Figuras Pendentes

### Prioridade Alta (Tier 1 — faltam no Atlas)
| Figura | Capítulo | Tipo | Status |
|--------|----------|------|--------|
| fig_1_1_camadas_corte.png | CH-001 | Tipo A | ❌ Pendente |
| fig_1_2_fibras_topdown.png | CH-001 | Tipo B | ❌ Pendente |
| fig_2_1_icrs_tipos.png | CH-002 | Tipo A | ❌ Pendente |
| fig_2_2_arc_shortening.png | CH-002 | Tipo A | ❌ Pendente |
| fig_4_5_vetor_radial_superior_pt.png | CH-004 | Tipo B | ❌ Pendente |
| fig_7_1_vcoma_assimetria.png | CH-007 | Tipo B | ❌ Pendente |
| fig_8_1_ldm_espessura.png | CH-008 | Tipo E | ❌ Pendente |
| fig_9_1_vesférico.png | CH-009 | Tipo E | ❌ Pendente |
| fig_10_1_ice_formula.png | CH-010 | Tipo E | ❌ Pendente |

### Já Gerados (✅)
| Figura | Capítulo | Data |
|--------|----------|------|
| fig_4_4_vetor_radial_corte_pt.png | CH-004 | 2026-03-10 |
| Figura_Coupling_Collagen.png | CH-005 | 2026-03-10 |
| Figura_Tangential_Traction.png | CH-005 | 2026-03-10 |
| Figura_Efeito_Acoplamento.png | CH-005 | 2026-03-10 |
| Figura_3.8_VonMises_Stress.png | CH-003 | anterior |

---

## 4b. Regras de Posicionamento Obrigatório do Anel em Toda Figura

> **Ver:** skill `icrs_geometria_precisa` para código completo de cada perfil.

### Localização (onde na córnea)
- **Zona:** média-periferia — r = **2,5 a 4,0 mm** do centro óptico
- **NUNCA** próximo ao limbo (r > 5mm) — efeito mínimo, visualmente errado
- **NUNCA** na zona central (r < 2mm) — invasão da zona óptica

### Profundidade (onde na espessura)
- **70–80% da espessura total** medida do epitélio
- Estroma acima do anel: visível (~20-25% da espessura = estroma anterior + parte do posterior)
- Estroma residual abaixo do anel: visível (≥ 150 µm = ~27% em córnea de 550µm)
- **O anel fica no estroma POSTERIOR** — nunca no anterior

### Proporção do Anel (tamanho)
- Espessura 200 µm em córnea de 550 µm = **36% da espessura total**
- **NÃO desenhar anel maior que 40% da espessura total**
- Perfil triangular: ápice para **CIMA** (▲ → direção do epitélio = direção do VR)
- Base do triangulo: para baixo (assentada no estroma posterior)

### Diagrama de Referência Visual
```
  Epitélio (~50µm)     ──────────────────────────── TOPO
  Bowman (~10µm)       ────────────────────────────
  Estroma Anterior     ──────────────────────────── 25% ↑
  (~135µm = 25%)       ────────────────────────────
  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ (limite ant/post) ─ ─ ─ ─ ─
  Estroma Posterior    ────────────────────────────
  (~330µm = 60%)           ▲ ANEL (ápice ↑)        ← 70-80% prof.
                          ─── (200µm = 36%)
  Estroma residual     ──────── ≥150µm ─────────── ↓
  Descemet + Endotélio ──────────────────────────── BASE
```

### Regra de Decisão: IA vs. Python
```
IA generativa falha ~30% das vezes em:
  - orientação do triângulo (ápice para baixo em vez de cima)
  - profundidade do anel (coloca no anterior)
  - proporção (anel gigante)

SOLUÇÃO: usar Python/matplotlib sempre que houver anel na figura.
Referência: fem/plot_fig_4_4.py (template aprovado com geometria correta)
```

---

## 5. Checklist de Qualidade do PNG

Antes de confirmar uma figura como entregue:

**Anatomia:**
- [ ] ICRS a 70-80% profundidade (estroma posterior)
- [ ] Proporção anterior:posterior = 1:3
- [ ] Superfície sobre o anel = PLANA ou REBAIXADA

**Vetores:**
- [ ] VR aponta para FORA (centrífugo)
- [ ] PIO aponta para CIMA (+Z)
- [ ] VT nas extremidades do anel
- [ ] V_End com seta descendente verde-água

**Visual:**
- [ ] Background = #0D1117
- [ ] Cores do sistema oficial
- [ ] Labels em português
- [ ] Barra de escala presente
- [ ] Legenda completa e legível
- [ ] DPI ≥ 200
- [ ] PNG salvo no caminho correto (`images/CH-XXX/`)
