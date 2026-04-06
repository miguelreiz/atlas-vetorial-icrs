"""
Fig 13.1 — O Futuro: FEM Personalizado
Atlas Vetorial ICRS — Capítulo 14
Diagrama de fluxo do mecanismo de simulação personalizada de ICRS.
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

# Paths
BASE = r"C:\Users\Miguel Reis\Documents\Vetores corneanos"
OUT  = os.path.join(BASE, "images", "CH-014_Futuro", "Figura_13.1_FEM_Personalizado_Pipeline.png")

# Sistema de cores oficial
BG       = "#0D1117"
COL_BOX1 = "#161B22"
COL_BOX2 = "#21262D"
COL_ACCENT = "#58A6FF"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_TEXT = "#FFFFFF"

fig, ax = plt.subplots(figsize=(12, 6), facecolor=BG)
ax.set_facecolor(BG)

def draw_box(ax, x, y, w, h, text, color=COL_BOX2, edgecolor=COL_ACCENT):
    box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.1,rounding_size=0.1", 
                                 linewidth=1.5, edgecolor=edgecolor, facecolor=color)
    ax.add_patch(box)
    ax.text(x+w/2, y+h/2, text, color=COL_TEXT, ha='center', va='center', 
            fontsize=11, fontweight='bold', wrap=True)

def draw_arrow(ax, x1, y1, x2, y2):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='-|>', color=COL_TEXT, lw=2, mutation_scale=15))

# Boxes definition
boxes = {
    'topo': (0.5, 4.5, 2.5, 1, "Topografia\nCurvatura Anterior"),
    'tomo': (0.5, 3.0, 2.5, 1, "Tomografia\nPaquimetria e\nElevação Posterior"),
    'brill': (0.5, 1.5, 2.5, 1, "Microscopia de\nBrillouin\n(Rigidez Local)"),
    
    'model': (4.5, 2.5, 3.0, 2, "Motor de Simulação FEM\n\nModelo HGO Anisotrópico\n(Malha de Colágeno 3D)"),
    
    'sim': (9.0, 3.5, 2.5, 1, "Predição Cirúrgica\n(Plácido Simulado)"),
    'vec': (9.0, 1.5, 2.5, 1, "VEsférico Previsto\n& ICE Estimado")
}

for k, b in boxes.items():
    bdc = COL_ACCENT if k == 'model' else "#30363D"
    draw_box(ax, b[0], b[1], b[2], b[3], b[4], edgecolor=bdc)

# Arrows
draw_arrow(ax, 3.0, 5.0, 4.5, 3.5)
draw_arrow(ax, 3.0, 3.5, 4.5, 3.5)
draw_arrow(ax, 3.0, 2.0, 4.5, 3.5)

draw_arrow(ax, 7.5, 3.5, 9.0, 4.0)
draw_arrow(ax, 7.5, 3.5, 9.0, 2.0)

ax.set_title('Figura 13.1 — Pipeline de Planejamento de ICRS via Elementos Finitos (FEM)\nIntegração de dados anatômicos e biomecânicos para predição vetorial',
             color='white', fontsize=12, pad=15, fontweight='bold')

ax.set_xlim(0, 12)
ax.set_ylim(0, 6)
ax.axis('off')

plt.tight_layout()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
