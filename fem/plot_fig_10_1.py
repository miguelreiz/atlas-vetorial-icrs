"""
Figura 10.1 — ICE: Indice de Coerencia dos Eixos
Atlas Vetorial ICRS — Capitulo 10 (ICE)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Ellipse, FancyArrowPatch
from matplotlib.gridspec import GridSpec
import os

BASE     = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT      = os.path.join(BASE, "images", "CH-010_ICE", "fig_10_1_ice_formula.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VTau = "#00CC44"
COL_VCOMA= "#FF6600"
COL_ICRS = "#90A4AE"
COL_ORIG = "#FFEB3B"
COL_NEW  = "#FFFFFF"
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"
COL_WARN = "#FFC107"

fig = plt.figure(figsize=(12, 8), facecolor=BG)
gs  = GridSpec(1, 2, figure=fig,
               left=0.04, right=0.97, top=0.86, bottom=0.06,
               wspace=0.14)

# ═══════════════════════════════════════════════════════════════════════════
# LEFT PANEL — Formula + ICE scale
# ═══════════════════════════════════════════════════════════════════════════
ax_left = fig.add_subplot(gs[0, 0])
ax_left.set_facecolor(BG)
ax_left.set_xlim(0, 10)
ax_left.set_ylim(0, 10)
ax_left.axis('off')

# Formula box
formula_box = FancyBboxPatch((0.5, 7.3), 9.0, 2.2,
                              boxstyle='round,pad=0.3',
                              facecolor='#141B2A', edgecolor=COL_DIM,
                              linewidth=1.5)
ax_left.add_patch(formula_box)
ax_left.text(5.0, 8.85, 'ICE  =  Kmax_plano / Kmax_mapa',
             color=COL_TEXT, fontsize=14, ha='center', va='center',
             fontweight='bold', fontfamily='monospace')
ax_left.text(5.0, 7.75,
             'Razão entre o eixo máximo refratométrico e topográfico',
             color=COL_DIM, fontsize=8.5, ha='center', va='center')

# ICE interpretation lines
interp = [
    (1.0, 'ICE = 1.0  →  Eixos coerentes (ideal)',  COL_VTau),
    (0.8, 'ICE = 0.8  →  Leve discordância',         COL_WARN),
    (0.6, 'ICE < 0.6  →  Discordância significativa', COL_VR),
]

y_pos = [6.35, 5.40, 4.45]
dot_colors = [COL_VTau, COL_WARN, COL_VR]

for (val, label, col), yp in zip(interp, y_pos):
    dot = plt.Circle((1.1, yp), 0.22, color=col, zorder=4)
    ax_left.add_patch(dot)
    ax_left.text(1.55, yp, label, color=col, fontsize=9.5,
                 va='center', fontweight='bold')

# ── ICE scale bar ──────────────────────────────────────────────────────
bar_x   = 1.8
bar_top = 3.60
bar_bot = 0.60
bar_w   = 0.70
total_h = bar_top - bar_bot

# segments
segments = [
    (0.0, 0.5, COL_VR,    'Incoerente'),
    (0.5, 0.8, COL_WARN,  'Atenção'),
    (0.8, 1.0, COL_VTau,  'Coerente'),
]

for val_lo, val_hi, col, lbl in segments:
    y0 = bar_bot + val_lo * total_h
    h  = (val_hi - val_lo) * total_h
    rect = FancyBboxPatch((bar_x, y0), bar_w, h,
                           boxstyle='square,pad=0',
                           facecolor=col, edgecolor='none', alpha=0.80)
    ax_left.add_patch(rect)
    ax_left.text(bar_x + bar_w + 0.18, y0 + h / 2, lbl,
                 color=col, fontsize=8.5, va='center', fontweight='bold')

# scale tick marks
for tick_val in [0.0, 0.5, 0.8, 1.0]:
    y_tick = bar_bot + tick_val * total_h
    ax_left.plot([bar_x - 0.12, bar_x], [y_tick, y_tick],
                 color=COL_TEXT, linewidth=1.0)
    ax_left.text(bar_x - 0.18, y_tick, f'{tick_val:.1f}',
                 color=COL_TEXT, fontsize=8, ha='right', va='center')

# scale label
ax_left.text(bar_x + bar_w / 2, bar_top + 0.22, 'Escala ICE',
             color=COL_DIM, fontsize=8, ha='center')

ax_left.set_title('Fórmula e Interpretação do ICE',
                  color=COL_TEXT, fontsize=11, fontweight='bold', pad=6)

# ═══════════════════════════════════════════════════════════════════════════
# RIGHT PANEL — Visual examples: aligned vs misaligned axes
# ═══════════════════════════════════════════════════════════════════════════
ax_right = fig.add_subplot(gs[0, 1])
ax_right.set_facecolor(BG)
ax_right.set_xlim(0, 10)
ax_right.set_ylim(0, 10)
ax_right.axis('off')
ax_right.set_title('Exemplos Visuais — Concordância dos Eixos',
                   color=COL_TEXT, fontsize=11, fontweight='bold', pad=6)

def draw_topo_with_axis(ax, cx, cy, r, axis_deg, color, label):
    """Draw a small topography ellipse with its steep-axis line."""
    # Base rings
    for ri in [r, r*0.65, r*0.35]:
        ellipse = Ellipse((cx, cy), ri * 2.0, ri * 1.3, angle=0,
                          fill=False, color=color, linewidth=1.0, alpha=0.7)
        ax.add_patch(ellipse)
    # Axis line
    rad = np.radians(axis_deg)
    dx  = r * 1.1 * np.cos(rad)
    dy  = r * 1.1 * np.sin(rad)
    ax.plot([cx - dx, cx + dx], [cy - dy, cy + dy],
            color=color, linewidth=2.0, linestyle='--', alpha=0.9)
    ax.text(cx + dx + 0.12, cy + dy, f'{axis_deg}°',
            color=color, fontsize=8, va='center', fontweight='bold')
    ax.text(cx, cy - r * 0.72 - 0.25, label,
            color=color, fontsize=8, ha='center', fontweight='bold')

# ── Example 1: aligned axes → ICE = 1.0 ──────────────────────────────
ax_right.text(4.9, 9.55, 'Exemplo 1 — Eixos Concordantes (ICE = 1.0)',
              color=COL_VTau, fontsize=9, ha='center', fontweight='bold')

# Refractometric map
draw_topo_with_axis(ax_right, cx=2.2, cy=7.8, r=1.3,
                    axis_deg=45, color=COL_VT, label='Plano\nRefratométrico')
# Topographic map
draw_topo_with_axis(ax_right, cx=7.5, cy=7.8, r=1.3,
                    axis_deg=45, color=COL_VTau, label='Mapa\nTopográfico')

# Equal sign + ICE value
ax_right.text(4.9, 7.8, '=', color=COL_TEXT, fontsize=22,
              ha='center', va='center', fontweight='bold')
ax_right.text(4.9, 7.1, 'ICE = 1.0', color=COL_VTau, fontsize=11,
              ha='center', fontweight='bold')
ax_right.text(4.9, 6.65, 'Eixos alinhados a 45°', color=COL_DIM,
              fontsize=8, ha='center')

# Divider
ax_right.plot([0.3, 9.6], [5.9, 5.9], color=COL_DIM,
              linewidth=0.8, linestyle='-', alpha=0.5)

# ── Example 2: misaligned axes → ICE = 0.6 ──────────────────────────
ax_right.text(4.9, 5.55, 'Exemplo 2 — Eixos Discordantes (ICE = 0.6)',
              color=COL_VR, fontsize=9, ha='center', fontweight='bold')

# Refractometric map at 30°
draw_topo_with_axis(ax_right, cx=2.2, cy=3.8, r=1.3,
                    axis_deg=30, color=COL_VT, label='Plano\nRefratométrico')
# Topographic map at 70°
draw_topo_with_axis(ax_right, cx=7.5, cy=3.8, r=1.3,
                    axis_deg=70, color=COL_WARN, label='Mapa\nTopográfico')

# Not-equal + ICE value
ax_right.text(4.9, 3.8, '\u2260', color=COL_VR, fontsize=22,
              ha='center', va='center', fontweight='bold')
ax_right.text(4.9, 3.1, 'ICE = 0.6', color=COL_VR, fontsize=11,
              ha='center', fontweight='bold')
ax_right.text(4.9, 2.65, 'Discordância de 40° entre os eixos', color=COL_DIM,
              fontsize=8, ha='center')

# Axis labels
ax_right.text(2.2, 9.35, '45°', color=COL_VT, fontsize=8.5,
              ha='center', fontweight='bold')
ax_right.text(7.5, 9.35, '45°', color=COL_VTau, fontsize=8.5,
              ha='center', fontweight='bold')
ax_right.text(2.2, 5.35, '30°', color=COL_VT, fontsize=8.5,
              ha='center', fontweight='bold')
ax_right.text(7.5, 5.35, '70°', color=COL_WARN, fontsize=8.5,
              ha='center', fontweight='bold')

# ── Main title ───────────────────────────────────────────────────────────
fig.suptitle(
    'Figura 10.1 — ICE: Índice de Coerência dos Eixos\n'
    'Razão Kmax_plano/Kmax_mapa — preditor de resultado vetorial',
    color=COL_TEXT, fontsize=13, fontweight='bold', y=0.97
)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
