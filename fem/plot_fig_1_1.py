"""
Figure 1.1 — Corte Transversal da Córnea com 6 Camadas
Atlas Vetorial ICRS
"""
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, Polygon
from matplotlib.collections import PatchCollection

# ── Palette ───────────────────────────────────────────────────────────────────
BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VTau = "#00CC44"
COL_VCOMA= "#FF6600"
COL_VEND = "#00FF88"
COL_ICRS = "#90A4AE"
COL_ORIG = "#FFEB3B"
COL_NEW  = "#FFFFFF"
COL_EPI  = "#FFCDD2"
COL_BOW  = "#8D6E63"
COL_ANT  = "#F5E6C8"
COL_POST = "#EDD9A3"
COL_DESC = "#9E9E9E"
COL_ENDO = "#B3E5FC"
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"
BASE = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"

OUT = os.path.join(BASE, "images", "CH-001_Anatomia", "fig_1_1_camadas_corte.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ── Figure setup ──────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(12, 8), dpi=200, facecolor=BG)
ax.set_facecolor(BG)

# ── Layer definitions (bottom = 0.0, top = 1.0) ───────────────────────────────
# From TOP to BOTTOM:
# Epithelium   y: 0.91 → 1.00  (9%)
# Bowman       y: 0.89 → 0.91  (2%)
# Ant Stroma   y: 0.64 → 0.89  (25%)
# Post Stroma  y: 0.04 → 0.64  (60%)
# Descemet     y: 0.02 → 0.04  (2%)
# Endothelium  y: 0.00 → 0.02  (2%)

layers = [
    # (y_bottom, height, color, name_pt, thickness_label)
    (0.91, 0.09, COL_EPI,  "Epitélio",               "~50 µm"),
    (0.89, 0.02, COL_BOW,  "Membrana de Bowman",      "~10 µm"),
    (0.64, 0.25, COL_ANT,  "Estroma Anterior",        "~135 µm"),
    (0.04, 0.60, COL_POST, "Estroma Posterior",       "~330 µm"),
    (0.02, 0.02, COL_DESC, "Membrana de Descemet",    "~10 µm"),
    (0.00, 0.02, COL_ENDO, "Endotélio",               "~10 µm"),
]

x_left  = 0.05
x_right = 0.75
width   = x_right - x_left

for (yb, h, color, name, thick) in layers:
    rect = mpatches.FancyBboxPatch(
        (x_left, yb), width, h,
        boxstyle="square,pad=0",
        facecolor=color, edgecolor="#333333", linewidth=0.5, alpha=0.85
    )
    ax.add_patch(rect)

# ── Dashed boundary Anterior/Posterior stroma ─────────────────────────────────
ax.plot([x_left, x_right], [0.64, 0.64],
        color=COL_TEXT, lw=0.8, linestyle='--', alpha=0.5)

# ── ICRS triangular ring ───────────────────────────────────────────────────────
# 78% depth → y_apex = 1.0 - 0.78 = 0.22 (apex UP, toward epithelium)
# base at y_base = 0.22 - 0.20 = 0.02
# base width = 0.15, centered at x=0.40 (center of cornea band)
cx = (x_left + x_right) / 2.0   # 0.40
ring_apex_y  = 0.22
ring_base_y  = ring_apex_y - 0.20  # 0.02
ring_hw      = 0.075  # half-width of base

ring_verts = np.array([
    [cx,             ring_apex_y],   # apex UP
    [cx - ring_hw,   ring_base_y],   # base left
    [cx + ring_hw,   ring_base_y],   # base right
])
ring_poly = Polygon(ring_verts, closed=True,
                    facecolor=COL_ICRS, edgecolor="#ECEFF1", lw=1.0, alpha=0.90)
ax.add_patch(ring_poly)

# ── VR arrows (centrifugal, outward from sides of ring) ───────────────────────
vr_y = ring_base_y + (ring_apex_y - ring_base_y) * 0.4  # midpoint ~0.10
# Left arrow
ax.annotate("", xy=(0.27, vr_y), xytext=(cx - ring_hw, vr_y),
            arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.0))
# Right arrow
ax.annotate("", xy=(0.58, vr_y), xytext=(cx + ring_hw, vr_y),
            arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.0))

# VR label
ax.text(0.23, vr_y + 0.018, "VR", color=COL_VR, fontsize=9, fontweight='bold',
        ha='center', va='bottom')
ax.text(0.61, vr_y + 0.018, "VR", color=COL_VR, fontsize=9, fontweight='bold',
        ha='center', va='bottom')

# ── V_End arrow (descending ↓ from ring apex) ─────────────────────────────────
ax.annotate("", xy=(cx, ring_apex_y - 0.12), xytext=(cx, ring_apex_y),
            arrowprops=dict(arrowstyle='->', color=COL_VEND, lw=2.0))
ax.text(cx + 0.025, ring_apex_y - 0.07, "V_End", color=COL_VEND,
        fontsize=9, fontweight='bold', va='center', ha='left')

# ── ICRS annotation ───────────────────────────────────────────────────────────
ax.annotate("ICRS", xy=(cx + ring_hw, ring_apex_y - 0.05),
            xytext=(0.60, ring_apex_y + 0.08),
            color=COL_ICRS, fontsize=9, fontweight='bold',
            arrowprops=dict(arrowstyle='->', color=COL_ICRS, lw=1.2))

# ── Layer labels on the right ─────────────────────────────────────────────────
label_x = 0.78
for (yb, h, color, name, thick) in layers:
    yc = yb + h / 2.0
    ax.text(label_x, yc, f"{name}\n({thick})",
            color=COL_TEXT, fontsize=7.5, va='center', ha='left',
            linespacing=1.3)
    # connector line
    ax.plot([x_right + 0.005, label_x - 0.005], [yc, yc],
            color=color, lw=0.6, alpha=0.6)

# ── Scale bar ─────────────────────────────────────────────────────────────────
# 100 µm / 550 µm ≈ 0.182 in normalized units
scale_frac = 100 / 550
bar_x0 = 0.07
bar_y  = -0.06
ax.annotate("", xy=(bar_x0 + scale_frac, bar_y),
            xytext=(bar_x0, bar_y),
            arrowprops=dict(arrowstyle='|-|', color=COL_TEXT, lw=1.2))
ax.text(bar_x0 + scale_frac / 2, bar_y - 0.025,
        "100 µm", color=COL_TEXT, fontsize=7.5, ha='center', va='top')

# ── Depth annotation (78%) ────────────────────────────────────────────────────
ax.annotate("78% profundidade", xy=(x_left - 0.01, ring_apex_y),
            xytext=(x_left - 0.01, ring_apex_y),
            color=COL_DIM, fontsize=7, ha='right', va='center')
ax.plot([x_left - 0.003, x_left], [ring_apex_y, ring_apex_y],
        color=COL_DIM, lw=0.6)

# ── Depth arrow on left side ──────────────────────────────────────────────────
ax.annotate("", xy=(0.02, 0.0), xytext=(0.02, 1.0),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(0.005, 0.5, "550 µm", color=COL_DIM, fontsize=8,
        va='center', ha='center', rotation=90)

# ── Top surface label ─────────────────────────────────────────────────────────
ax.text(cx, 1.04, "Superfície Anterior", color=COL_TEXT, fontsize=8.5,
        ha='center', va='bottom', fontstyle='italic')
ax.text(cx, -0.04, "Superfície Posterior", color=COL_TEXT, fontsize=8.5,
        ha='center', va='top', fontstyle='italic')

# ── Title ─────────────────────────────────────────────────────────────────────
ax.set_title(
    "Figura 1.1 — Anatomia Corneana: Corte Transversal\n"
    "Proporções reais das 6 camadas e posicionamento do ICRS",
    color=COL_TEXT, fontsize=11, fontweight='bold', pad=14
)

# ── Axes cosmetics ────────────────────────────────────────────────────────────
ax.set_xlim(0.0, 1.0)
ax.set_ylim(-0.12, 1.10)
ax.axis('off')
fig.subplots_adjust(left=0.02, right=0.98, top=0.90, bottom=0.05)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
