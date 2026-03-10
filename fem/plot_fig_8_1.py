"""
Figura 8.1 — Lei do Disco Mecanico (LDM): Espessura x Efeito
Atlas Vetorial ICRS — Capitulo 8 (LDM)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Arc
import os

BASE     = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT      = os.path.join(BASE, "images", "CH-008_LDM", "fig_8_1_ldm_espessura.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VTau = "#00CC44"
COL_VCOMA= "#FF6600"
COL_ICRS = "#90A4AE"
COL_ORIG = "#FFEB3B"
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"
COL_EPI  = "#FFCDD2"
COL_BOW  = "#8D6E63"
COL_ANT  = "#F5E6C8"
COL_POST = "#EDD9A3"
COL_ENDO = "#B3E5FC"

fig, axes = plt.subplots(1, 2, figsize=(12, 8), facecolor=BG)
fig.subplots_adjust(left=0.08, right=0.97, top=0.84, bottom=0.10,
                    wspace=0.22)

# ═══════════════════════════════════════════════════════════════════════════
# LEFT PANEL — Espessura x VR graph
# ═══════════════════════════════════════════════════════════════════════════
ax = axes[0]
ax.set_facecolor(BG)
for spine in ax.spines.values():
    spine.set_edgecolor(COL_DIM)

# Slightly curved relationship
x_vals = np.array([150, 175, 200, 225, 250, 275, 300], dtype=float)
y_vals = np.array([1.00, 1.35, 1.80, 2.15, 2.42, 2.63, 2.80])

ax.plot(x_vals, y_vals, color=COL_VR, linewidth=2.5, zorder=3)

# Operating points
points = [
    (150, 1.00, 14, 'Fino\n(KC leve)',   COL_DIM),
    (200, 1.80, 18, 'Padrão\n(KC mod.)', COL_ORIG),
    (300, 2.80, 22, 'Espesso\n(KC grave)', COL_VR),
]

for xp, yp, sz, lbl, col in points:
    ax.scatter(xp, yp, s=sz**2, color=col, zorder=5, edgecolors='white', linewidths=0.8)
    # dashed lines
    ax.plot([xp, xp], [0, yp], color=col, linestyle='--', linewidth=0.9, alpha=0.6, zorder=2)
    ax.plot([150, xp], [yp, yp], color=col, linestyle='--', linewidth=0.9, alpha=0.6, zorder=2)
    # label offset
    x_off = 6 if xp < 280 else -78
    y_off = 0.06
    ax.text(xp + x_off, yp + y_off, lbl, color=col, fontsize=8,
            va='bottom', fontweight='bold')

ax.set_xlim(140, 315)
ax.set_ylim(0, 3.3)
ax.set_xticks([150, 200, 250, 300])
ax.set_xticklabels(['150', '200', '250', '300'], color=COL_TEXT, fontsize=9)
ax.set_yticks([0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0])
ax.set_yticklabels(['0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
                   color=COL_TEXT, fontsize=9)
ax.tick_params(colors=COL_DIM)
ax.set_xlabel('Espessura do Anel (µm)', color=COL_TEXT, fontsize=10, labelpad=6)
ax.set_ylabel('Efeito VR (ΔK aplainamento, D)', color=COL_TEXT, fontsize=10, labelpad=6)
ax.set_title('Espessura × Vetor Radial (VR)', color=COL_TEXT, fontsize=11,
             fontweight='bold', pad=8)

# Grid
ax.grid(color=COL_DIM, linestyle=':', linewidth=0.5, alpha=0.35)

# ═══════════════════════════════════════════════════════════════════════════
# RIGHT PANEL — Cross-section comparison 150µm vs 300µm
# ═══════════════════════════════════════════════════════════════════════════
ax2 = axes[1]
ax2.set_facecolor(BG)
ax2.set_xlim(0, 10)
ax2.set_ylim(0, 10)
ax2.axis('off')
ax2.set_title('Comparação de Perfil: 150 µm vs 300 µm', color=COL_TEXT,
              fontsize=11, fontweight='bold', pad=8)

def draw_mini_cornea(ax, cx, cy, ring_h, ring_w, label_top, label_bot,
                     arrow_len, ring_color=COL_ICRS):
    """Draw a simplified cornea cross-section with ICRS ring."""
    # cornea width
    cw = 2.0
    ch = 4.0

    # Epithelium band
    epi = FancyBboxPatch((cx - cw/2, cy + ch*0.70), cw, ch*0.10,
                         boxstyle='round,pad=0.02',
                         facecolor=COL_EPI, edgecolor='none', alpha=0.75)
    ax.add_patch(epi)
    ax.text(cx + cw/2 + 0.12, cy + ch*0.74, 'Epitélio', color=COL_EPI,
            fontsize=6.5, va='center')

    # Stroma
    stroma = FancyBboxPatch((cx - cw/2, cy + ch*0.10), cw, ch*0.60,
                            boxstyle='round,pad=0.02',
                            facecolor=COL_ANT, edgecolor='none', alpha=0.45)
    ax.add_patch(stroma)
    ax.text(cx + cw/2 + 0.12, cy + ch*0.40, 'Estroma', color=COL_ANT,
            fontsize=6.5, va='center')

    # Endothelium
    endo = FancyBboxPatch((cx - cw/2, cy), cw, ch*0.10,
                          boxstyle='round,pad=0.02',
                          facecolor=COL_ENDO, edgecolor='none', alpha=0.6)
    ax.add_patch(endo)
    ax.text(cx + cw/2 + 0.12, cy + ch*0.04, 'Endotélio', color=COL_ENDO,
            fontsize=6.5, va='center')

    # ICRS ring at 78% depth (from top = 22% from top of stroma band)
    ring_y = cy + ch*(0.70 - 0.22) - ring_h/2   # center of ring
    ring_rect = FancyBboxPatch(
        (cx - ring_w/2, ring_y), ring_w, ring_h,
        boxstyle='round,pad=0.04',
        facecolor=ring_color, edgecolor='white', linewidth=1.0, alpha=0.92
    )
    ax.add_patch(ring_rect)

    # VR arrow upward from ring center
    arrow_y0 = ring_y + ring_h
    ax.annotate('', xy=(cx, arrow_y0 + arrow_len),
                xytext=(cx, arrow_y0 + 0.05),
                arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.2,
                                mutation_scale=14))

    # VR label
    ax.text(cx, arrow_y0 + arrow_len + 0.18, 'VR',
            color=COL_VR, fontsize=8, ha='center', fontweight='bold')

    # top label
    ax.text(cx, cy + ch + 0.25, label_top, color=COL_TEXT,
            fontsize=9, ha='center', fontweight='bold')
    # bottom label
    ax.text(cx, cy - 0.35, label_bot, color=COL_ORIG,
            fontsize=8.5, ha='center', fontweight='bold')

    # dimension bracket
    ax.annotate('', xy=(cx + cw/2 + 0.08, ring_y + ring_h),
                xytext=(cx + cw/2 + 0.08, ring_y),
                arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.1))
    ax.text(cx + cw/2 + 0.55, ring_y + ring_h/2,
            f'{int(ring_h*1000)} µm', color=COL_DIM, fontsize=7, va='center')


# Left mini: 150µm ring, smaller VR arrow
draw_mini_cornea(ax2, cx=2.0, cy=1.0,
                 ring_h=0.40, ring_w=0.60,
                 label_top='150 µm',
                 label_bot='ΔK ~ 1.0 D',
                 arrow_len=0.55)

# Right mini: 300µm ring, larger VR arrow
draw_mini_cornea(ax2, cx=7.0, cy=1.0,
                 ring_h=0.80, ring_w=0.65,
                 label_top='300 µm',
                 label_bot='ΔK ~ 2.8 D',
                 arrow_len=1.10)

# VS label between panels
ax2.text(4.9, 4.2, 'vs', color=COL_DIM, fontsize=18,
         ha='center', va='center', fontweight='bold', alpha=0.7)

# LDM annotation box
bbox_props = dict(boxstyle='round,pad=0.5', facecolor='#1C2333',
                  edgecolor=COL_VR, linewidth=1.5)
ax2.text(4.9, 0.35,
         'LDM: Anel mais espesso → maior VR → maior aplainamento',
         color=COL_TEXT, fontsize=8.5, ha='center', va='center',
         bbox=bbox_props)

# ── Main title ───────────────────────────────────────────────────────────
fig.suptitle(
    'Figura 8.1 — Lei do Disco Mecânico (LDM)\n'
    'Espessura do ICRS determina a magnitude do Vetor Radial',
    color=COL_TEXT, fontsize=13, fontweight='bold', y=0.97
)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
