---
name: Studio Ilustração Atlas — Identidade Visual, Produção de Figuras e Padrões de Publicação
description: Sistema completo de produção visual do Atlas Vetorial ICRS. Cobre a identidade visual oficial (cores, tipografia, orientação), workflows de geração (matplotlib, BioRender, Fiverr), catálogo de figuras por capítulo e os 10 portões de qualidade para publicação.
---

# Studio Ilustração Atlas — Antigravity
> **Padrão de qualidade:** Atlas médico nível Netter/Krachmer — precisão científica + clareza didática
> **Idioma:** Português (primário) — inglês entre parênteses quando necessário
> **Background:** `#0D1117` (preto-azul escuro) em todas as figuras

---

## 1. Identidade Visual Oficial

### 1.1 Paleta de Cores — Sistema Completo

#### Vetores (Imutáveis)
| Vetor | Cor | Hex | Uso |
|-------|-----|-----|-----|
| VR — Radial | Vermelho | `#CC2200` | Fibras radiais, setas VR |
| VT — Tangencial | Ciano | `#00B4DC` | Fibras tangenciais, setas VT |
| Vτ — Travamento | Verde | `#00CC44` | Fibras oblíquas, símbolo bloqueio |
| VComa | Laranja | `#FF6600` | Vetor deslocamento ápice |
| V_End — Endotelial | Verde-água | `#00FF88` | Aplainamento, seta descendente |
| PIO | Branco | `#FFFFFF` | Setas de pressão intraocular |

#### Anatômicas (Córnea em Corte)
| Camada | Cor | Hex |
|--------|-----|-----|
| Epitélio | Rosa claro | `#FFCDD2` |
| Bowman | Marrom escuro | `#8D6E63` |
| Estroma anterior | Bege quente | `#F5E6C8` |
| Estroma posterior | Bege claro | `#EDD9A3` |
| Descemet | Cinza | `#9E9E9E` |
| Endotélio | Azul claro | `#B3E5FC` |
| ICRS (anel) | Cinza-azul | `#90A4AE` |

#### Sistema Problema vs. Solução
| Contexto | Cor | Hex |
|----------|-----|-----|
| Vetor de patologia (V_cone) | Vermelho intenso | `#FF1744` |
| Vetor de correção (V_anel) | Azul correção | `#0091EA` |
| Resultante neutralizado | Verde | `#00C853` |
| Resultante parcial | Amarelo | `#FFD600` |
| Aviso / Erro biomecânico | Laranja-vermelho | `#FF5722` |

#### Interface e Background
| Elemento | Cor | Hex |
|----------|-----|-----|
| Background principal | Preto-azul | `#0D1117` |
| Background card/box | Preto-azul médio | `#161B22` |
| Bordas/divisores | Cinza escuro | `#37474F` |
| Texto principal | Branco | `#FFFFFF` |
| Texto secundário/dimensões | Cinza | `#78909C` |
| Superfície original (pre-ICRS) | Amarelo tracejado | `#FFEB3B` |
| Superfície pós-ICRS | Branco sólido | `#FFFFFF` |

### 1.2 Tipografia
- **Título principal:** Sans-serif, bold, 14–16pt, branco
- **Subtítulo/legenda:** Sans-serif, regular, 10–11pt, branco
- **Labels anatômicos:** 8–9pt, branco
- **Dimensões/escalas:** 7–8pt, cinza `#78909C`
- **Fonte preferida (matplotlib):** DejaVu Sans (default) ou Liberation Sans

### 1.3 Orientação Padrão da Córnea
- **Corte transversal:** Epitélio no TOPO, endotélio na BASE — eixo +Z aponta para CIMA (para o epitélio)
- **Vista superior (en face):** Superior (S) no topo, Temporal (T) à direita (perspectiva do cirurgião)
- **ICRS:** Sempre no estroma POSTERIOR (70–80% de profundidade)
- **Setas PIO:** Sempre de BAIXO para CIMA (+Z)

### 1.4 Elementos Obrigatórios em Toda Figura
1. Barra de escala OU medidas rotuladas
2. Labels das estruturas em português
3. Legenda de cores/vetores (caixa de legenda)
4. Título descritivo incluindo o conceito biomecânico
5. Número da figura com capítulo (ex: "Figura 4.4 —")
6. Background `#0D1117` uniforme

---

## 2. Catálogo de Figuras por Capítulo

### CH-000 — Prefácio
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| P1 | `CH-000_intro_atlas.png` | Visão geral do atlas | Tier 2 |

### CH-001 — Anatomia Corneana
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 1.1 | `fig_1_1_camadas_corte.png` | Corte transversal 6 camadas | **Tier 1** |
| 1.2 | `fig_1_2_fibras_topdown.png` | Mapa fibras WAXS top-down | **Tier 1** |
| 1.3 | `fig_1_3_gradiente_rigidez.png` | Gradiente anterior:posterior 3:1 | Tier 2 |

### CH-002 — Biomecânica dos Anéis
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 2.1 | `fig_2_1_icrs_tipos.png` | Perfis: triangular, hexagonal, arredondado | **Tier 1** |
| 2.2 | `fig_2_2_arc_shortening.png` | Arc-shortening + Vetor Endotelial | **Tier 1** |

### CH-003 — Classificação do Ceratocone
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 3.1–3.8 | (existentes) | Padrões Plácido, fluxograma, WAXS, FEM | **Tier 1** |

### CH-004 — VR: Vetor Radial
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 4.2 | `fig_4_2_lei_barraquer.png` | Lei de Barraquer aplicada ao ICRS | **Tier 1** |
| 4.3 | `fig_4_3_efeito_tenda.png` | Arc-shortening (sem tenting!) | **Tier 1** |
| 4.4 | `fig_4_4_vetor_radial_corte_pt.png` | VR em corte transversal + V_End | **Tier 1** ✅ |
| 4.5 | `fig_4_5_vetor_radial_superior_pt.png` | VR vista superior | **Tier 1** |

### CH-005 — VT: Vetor Tangencial
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 5.1 | `Figura_Coupling_Collagen.png` | Acoplamento Poisson na malha | **Tier 1** ✅ |
| 5.2 | `Figura_Tangential_Traction.png` | Tração tangencial nas extremidades | **Tier 1** ✅ |
| 5.3 | `Figura_Efeito_Acoplamento.png` | Incisão errada → SIA conflitante | **Tier 1** ✅ |

### CH-007 — VComa
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 7.1 | `fig_7_1_vcoma_assimetria.png` | Vτ assimétrico → VComa | Tier 2 |

### CH-008 — LDM (Lei do Disco Mecânico)
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 8.x | (a criar) | Relação espessura × efeito | Tier 2 |

### CH-011 — Nomogramas Vetoriais
| # | Arquivo | Conceito | Prioridade |
|---|---------|----------|-----------|
| 11.x | (a criar) | Nomogramas visuais | **Tier 1** |

---

## 3. Geração de Figuras com Python (matplotlib)

### Template Base (Todos os Scripts)
```python
import numpy as np
import matplotlib.pyplot as plt
import os

BG = "#0D1117"
fig, ax = plt.subplots(figsize=(12, 8), facecolor=BG)
ax.set_facecolor(BG)

# ... código da figura ...

ax.set_title('Figura X.X — Título Biomecânico\nSubtítulo explicativo',
             color='white', fontsize=11, pad=14, fontweight='bold')

plt.tight_layout()
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
```

### Convenções de Setas (matplotlib)
```python
# Seta de vetor principal
ax.annotate('', xy=(x_fim, y_fim), xytext=(x_ini, y_ini),
            arrowprops=dict(arrowstyle='->', color='#CC2200', lw=2.5,
                           mutation_scale=20), zorder=10)

# Seta de dimensão (dupla)
ax.annotate('', xy=(x1, y), xytext=(x0, y),
            arrowprops=dict(arrowstyle='<->', color='#78909C', lw=1.2,
                           mutation_scale=10), zorder=8)

# Tracejado (curva original)
ax.plot(x, y_orig, color='#FFEB3B', lw=1.5, linestyle='--', label='Original')
# Sólido (curva pós-ICRS)
ax.plot(x, y_new,  color='#FFFFFF', lw=2.2, linestyle='-',  label='Pós-ICRS')
```

### Padrão de Legenda
```python
from matplotlib.lines import Line2D
import matplotlib.patches as mpatches

legend_elements = [
    Line2D([0],[0], color='#CC2200', lw=2.5, label='Vetor Radial (VR)'),
    Line2D([0],[0], color='#00B4DC', lw=2.5, label='Vetor Tangencial (VT)'),
    mpatches.Patch(facecolor='#90A4AE', edgecolor='white', label='ICRS'),
]
ax.legend(handles=legend_elements, loc='lower right',
          facecolor='#161B22', edgecolor='#37474F', labelcolor='white',
          fontsize=8.5, framealpha=0.95)
```

---

## 4. Workflow BioRender

### Quando Usar BioRender
- Ilustrações de células/tecidos com realismo histológico
- Figuras 3D de fibras de colágeno
- Imagens para publicação em revistas internacionais (quando requerido)

### Passo a Passo
1. Acessar app.biorender.com → New Figure
2. Buscar: "cornea", "collagen fiber", "eye cross section"
3. Aplicar cores do sistema: `#CC2200`, `#00B4DC`, `#00CC44`
4. Exportar em PNG 300 DPI ou SVG
5. Pós-processar no Photoshop/GIMP para ajustar fundo para `#0D1117`

---

## 5. Brief para Fiverr/Upwork (Template)

```
PROJETO: Ilustração Médica — Atlas Vetorial ICRS
FIGURA: [nome e número da figura]

CONTEÚDO:
[descrever o que a figura deve mostrar]

ESTILO: Atlas médico (referência: Netter, Krachmer) — fundo escuro #0D1117

ELEMENTOS OBRIGATÓRIOS:
1. [elemento 1]
2. [elemento 2]
...

CORES EXATAS (usar estes hex codes):
- VR (vermelho): #CC2200
- VT (ciano): #00B4DC
- ICRS: #90A4AE
- Background: #0D1117

ANATOMIA (regras invioláveis):
- Epitélio no TOPO, endotélio na BASE
- ICRS a 70-80% de profundidade (estroma POSTERIOR)
- Superfície sobre o anel = PLANA ou REBAIXADA (nunca elevada)
- Estroma posterior 3x mais espesso que anterior

ENTREGA: PNG 2400×2000px (300 DPI mínimo) + arquivo editável

REVISÕES: 2 rodadas incluídas
```

---

## 6. Portões de Qualidade (Quality Gates)

### Gate 1 — Draft (gerado/encomendado)
- [ ] Conteúdo biomecânico correto (revisar com `revisor_guardian_atlas`)
- [ ] Proporções anatômicas corretas (revisar com `anatomia_corneana_unificada`)
- [ ] Direções dos vetores corretas (revisar com `sistema_vetorial_icrs`)

### Gate 2 — Review (revisão editorial)
- [ ] Background `#0D1117`
- [ ] Cores do sistema oficial (sem desvios)
- [ ] Labels em português
- [ ] Barra de escala presente
- [ ] Legenda com todos os elementos
- [ ] Título completo com número da figura

### Gate 3 — Final (pronto para publicação)
- [ ] Resolução ≥ 200 DPI (300 DPI para impressão)
- [ ] Arquivo salvo no caminho correto `images/CH-XXX/`
- [ ] Nome do arquivo seguindo convenção `fig_X_Y_nome_pt.png`
- [ ] Referenciado no arquivo `.md` do capítulo correspondente
- [ ] Versão aprovada pelo autor (cirurgião)

---

## 7. Os 10 Mandamentos Visuais do Atlas

1. **Background sempre `#0D1117`** — sem exceção
2. **VR é vermelho, VT é ciano** — nunca inverter
3. **ICRS a 70–80% no estroma posterior** — nunca no anterior
4. **Superfície sobre o anel = PLANA ou REBAIXADA** — nunca "tenting"
5. **Setas VR apontam PARA FORA** — centrífugo, nunca para o centro
6. **PIO aponta para CIMA** — de endotélio para epitélio (+Z)
7. **Estroma posterior 3× mais espesso** — proporções reais
8. **Aplainamento central = ∇ (consequência)** — sem seta de força
9. **Português primeiro** — inglês entre parênteses se necessário
10. **Legenda sempre visível** — nenhuma cor sem rótulo
