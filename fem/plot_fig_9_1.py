"""
Figura 9.1 — VEsferico: Componente Esferica da Correcao ICRS
Atlas Vetorial ICRS — Capitulo 9 (VEsferico)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Ellipse
from matplotlib.gridspec import GridSpec
import os

BASE     = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT      = os.path.join(BASE, "images", "CH-009_VEsferico", "fig_9_1_vesferico.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VTau = "#00CC44"
COL_VCOMA= "#FF6600"
COL_VEND = "#00FF88"
COL_ICRS = "#90A4AE"
COL_ORIG = "#FFEB3B"
COL_NEW  = "#FFFFFF"
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"

fig = plt.figure(figsize=(12, 8), facecolor=BG)
gs  = GridSpec(2, 3, figure=fig, height_ratios=[1.6, 1.0],
               left=0.05, right=0.97, top=0.85, bottom=0.08,
               hspace=0.38, wspace=0.30)

# ═══════════════════════════════════════════════════════════════════════════
# TOP ROW — Vector composition diagram (spans all 3 columns)
# ═══════════════════════════════════════════════════════════════════════════
ax_top = fig.add_subplot(gs[0, :])
ax_top.set_facecolor(BG)
ax_top.set_xlim(0, 14)
ax_top.set_ylim(0, 6)
ax_top.axis('off')
ax_top.set_title('Composição Vetorial → VEsférico', color=COL_TEXT,
                 fontsize=11, fontweight='bold', pad=6)

# Vector definitions: (name, color, bar_length, y_center, contribution_label)
vectors = [
    ('VR',      COL_VR,    3.20, 5.2, '+3.2 D  (principal)'),
    ('VT',      COL_VT,    1.40, 4.1, '+1.4 D  (acoplamento)'),
    ('Vτ',      COL_VTau,  0.80, 3.0, '+0.8 D  (assimetria → esfera)'),
    ('VComa',   COL_VCOMA, 0.30, 1.9, '-0.3 D  (deslocamento)'),
    ('V-End',   COL_VEND,  0.60, 0.8, '+0.6 D  (endurecimento)'),
]

x_start = 1.0
plus_x  = 6.5
out_x   = 7.2

for name, col, bar_len, yc, contrib in vectors:
    # arrow bar
    ax_top.annotate('', xy=(x_start + bar_len, yc),
                    xytext=(x_start, yc),
                    arrowprops=dict(arrowstyle='->', color=col, lw=2.8,
                                    mutation_scale=16))
    ax_top.text(x_start - 0.12, yc, name, color=col, fontsize=10,
                ha='right', va='center', fontweight='bold')
    ax_top.text(x_start + bar_len + 0.18, yc, contrib,
                color=col, fontsize=8.5, va='center')

    # dashed line to plus circle
    ax_top.plot([x_start + bar_len, plus_x - 0.35], [yc, 3.0],
                color=col, linestyle=':', linewidth=0.8, alpha=0.45)

# Plus circle
plus_circle = plt.Circle((plus_x, 3.0), 0.35, color='#1C2333',
                          edgecolor=COL_DIM, linewidth=2, zorder=4)
ax_top.add_patch(plus_circle)
ax_top.text(plus_x, 3.0, '+', color=COL_TEXT, fontsize=18,
            ha='center', va='center', fontweight='bold', zorder=5)

# Output arrow — VEsferico
ax_top.annotate('', xy=(12.2, 3.0), xytext=(out_x, 3.0),
                arrowprops=dict(arrowstyle='->', color=COL_NEW, lw=4.0,
                                mutation_scale=22))
ax_top.text(12.3, 3.0, 'VEsférico\n(ΔK-esfera)',
            color=COL_NEW, fontsize=11, va='center', fontweight='bold')

# ═══════════════════════════════════════════════════════════════════════════
# BOTTOM LEFT — Pre-ICRS topography schematic
# ═══════════════════════════════════════════════════════════════════════════
ax_pre = fig.add_subplot(gs[1, 0])
ax_pre.set_facecolor(BG)
ax_pre.set_xlim(-3, 3)
ax_pre.set_ylim(-3, 3)
ax_pre.set_aspect('equal')
ax_pre.axis('off')
ax_pre.set_title('Pré-ICRS', color=COL_VR, fontsize=10, fontweight='bold', pad=4)

# Tightly packed rings = high curvature
radii_pre = [0.35, 0.70, 1.00, 1.28, 1.55, 1.80, 2.05]
for i, r in enumerate(radii_pre):
    alpha = 0.9 - i * 0.08
    lw    = 1.8 - i * 0.12
    circle = plt.Circle((0, 0), r, fill=False, color=COL_VR,
                         linewidth=max(lw, 0.6), alpha=max(alpha, 0.3))
    ax_pre.add_patch(circle)

ax_pre.text(0, 0, 'K~52D', color=COL_VR, fontsize=8.5,
            ha='center', va='center', fontweight='bold')
ax_pre.text(0, -2.65, 'Curvatura alta — anéis comprimidos',
            color=COL_DIM, fontsize=7, ha='center')

# ═══════════════════════════════════════════════════════════════════════════
# BOTTOM MIDDLE — Delta arrow
# ═══════════════════════════════════════════════════════════════════════════
ax_mid = fig.add_subplot(gs[1, 1])
ax_mid.set_facecolor(BG)
ax_mid.set_xlim(0, 4)
ax_mid.set_ylim(0, 4)
ax_mid.axis('off')

ax_mid.annotate('', xy=(3.2, 2.0), xytext=(0.8, 2.0),
                arrowprops=dict(arrowstyle='->', color=COL_ORIG, lw=3.0,
                                mutation_scale=20))
ax_mid.text(2.0, 2.45, 'ICRS', color=COL_ICRS, fontsize=10,
            ha='center', fontweight='bold')
ax_mid.text(2.0, 1.35, 'ΔK = -6 D', color=COL_ORIG, fontsize=10,
            ha='center', fontweight='bold')
ax_mid.text(2.0, 0.75,
            'VEsférico\n= soma dos\nvetores',
            color=COL_TEXT, fontsize=8, ha='center', va='top',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#1A2233',
                      edgecolor=COL_DIM, linewidth=0.8))

# ═══════════════════════════════════════════════════════════════════════════
# BOTTOM RIGHT — Post-ICRS topography schematic
# ═══════════════════════════════════════════════════════════════════════════
ax_pos = fig.add_subplot(gs[1, 2])
ax_pos.set_facecolor(BG)
ax_pos.set_xlim(-3, 3)
ax_pos.set_ylim(-3, 3)
ax_pos.set_aspect('equal')
ax_pos.axis('off')
ax_pos.set_title('Pós-ICRS', color=COL_VTau, fontsize=10, fontweight='bold', pad=4)

# More spaced rings = lower curvature
radii_pos = [0.45, 0.90, 1.30, 1.68, 2.02, 2.32, 2.60]
for i, r in enumerate(radii_pos):
    alpha = 0.9 - i * 0.08
    lw    = 1.8 - i * 0.12
    circle = plt.Circle((0, 0), r, fill=False, color=COL_VTau,
                         linewidth=max(lw, 0.6), alpha=max(alpha, 0.3))
    ax_pos.add_patch(circle)

ax_pos.text(0, 0, 'K~46D', color=COL_VTau, fontsize=8.5,
            ha='center', va='center', fontweight='bold')
ax_pos.text(0, -2.65, 'Curvatura reduzida — anéis espaçados',
            color=COL_DIM, fontsize=7, ha='center')

# ═══════════════════════════════════════════════════════════════════════════
# Formula box
# ═══════════════════════════════════════════════════════════════════════════
formula_ax = fig.add_axes([0.05, 0.01, 0.90, 0.065])
formula_ax.set_facecolor('#141B2A')
formula_ax.axis('off')
formula_ax.set_xlim(0, 1)
formula_ax.set_ylim(0, 1)
for spine in formula_ax.spines.values():
    spine.set_edgecolor(COL_DIM)
formula_ax.text(
    0.5, 0.5,
    'VEsférico  =  VR  +  VT·cos(θ)  +  Vτ·f(assimetria)  +  V_End',
    color=COL_TEXT, fontsize=11, ha='center', va='center',
    fontweight='bold', fontfamily='monospace'
)

# ── Main title ───────────────────────────────────────────────────────────
fig.suptitle(
    'Figura 9.1 — VEsférico: Componente Esférica do ICRS\n'
    'Soma vetorial dos 5 componentes → aplainamento total',
    color=COL_TEXT, fontsize=13, fontweight='bold', y=0.98
)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
