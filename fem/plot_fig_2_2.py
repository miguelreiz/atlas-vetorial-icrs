"""
Figure 2.2 — Mecanismo de Arc-Shortening e Vetor Endotelial
Atlas Vetorial ICRS
"""
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Polygon, FancyArrowPatch
from matplotlib.path import Path
import matplotlib.patheffects as pe

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

OUT = os.path.join(BASE, "images", "CH-002_Biomecanica", "fig_2_2_arc_shortening.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ── Helper: draw cornea layers ────────────────────────────────────────────────
def draw_layers(ax, x_left=0.05, x_right=0.95):
    """Draw the 6 cornea layers as horizontal bands."""
    width = x_right - x_left
    layers = [
        (0.91, 0.09, COL_EPI,  "Epitélio"),
        (0.89, 0.02, COL_BOW,  "Bowman"),
        (0.64, 0.25, COL_ANT,  "Est. Anterior"),
        (0.04, 0.60, COL_POST, "Est. Posterior"),
        (0.02, 0.02, COL_DESC, "Descemet"),
        (0.00, 0.02, COL_ENDO, "Endotélio"),
    ]
    for (yb, h, color, name) in layers:
        rect = mpatches.FancyBboxPatch(
            (x_left, yb), width, h,
            boxstyle="square,pad=0",
            facecolor=color, edgecolor="#2A2A2A", linewidth=0.4, alpha=0.80
        )
        ax.add_patch(rect)
    return layers

# ── Helper: draw horizontal fibers ───────────────────────────────────────────
def draw_flat_fibers(ax, x_left, x_right, y_positions, color, lw=0.7, alpha=0.7):
    for y in y_positions:
        ax.plot([x_left, x_right], [y, y], color=color, lw=lw, alpha=alpha)

# ── Figure setup ──────────────────────────────────────────────────────────────
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 8), dpi=200, facecolor=BG,
                                gridspec_kw={'wspace': 0.10})
for ax in (ax1, ax2):
    ax.set_facecolor(BG)
    ax.set_xlim(0, 1)
    ax.set_ylim(-0.15, 1.15)
    ax.axis('off')

# ════════════════════════════════════════════════════════════════════════════════
# LEFT PANEL — Sem ICRS (córnea normal)
# ════════════════════════════════════════════════════════════════════════════════
draw_layers(ax1)

# Panel label
ax1.text(0.5, 1.10, "Sem ICRS — Córnea Normal",
         color=COL_TEXT, fontsize=10, fontweight='bold', ha='center', va='top')

# Horizontal collagen fibers (even distribution in stroma)
fiber_ys = np.linspace(0.10, 0.86, 18)
draw_flat_fibers(ax1, 0.07, 0.93, fiber_ys, COL_VR, lw=0.7, alpha=0.55)

# Flat surface at top
ax1.plot([0.05, 0.95], [1.00, 1.00], color=COL_TEXT, lw=2.0)

# PIO arrow from bottom pointing UP
ax1.annotate("", xy=(0.5, 0.12), xytext=(0.5, -0.08),
             arrowprops=dict(arrowstyle='->', color=COL_VEND, lw=2.2))
ax1.text(0.5, -0.12, "PIO (+Z)", color=COL_VEND, fontsize=8.5,
         ha='center', va='top', fontweight='bold')

# No-ring annotation
ax1.text(0.5, 0.50, "Sem anel\nFibras relaxadas",
         color=COL_DIM, fontsize=8, ha='center', va='center',
         style='italic', alpha=0.7)

# ════════════════════════════════════════════════════════════════════════════════
# RIGHT PANEL — Com ICRS (arc-shortening ativo)
# ════════════════════════════════════════════════════════════════════════════════
draw_layers(ax2)

# Panel label
ax2.text(0.5, 1.10, "Com ICRS — Arc-Shortening Ativo",
         color=COL_TEXT, fontsize=10, fontweight='bold', ha='center', va='top')

# ── ICRS triangular ring ───────────────────────────────────────────────────────
cx = 0.50
ring_apex_y = 0.22
ring_base_y = 0.02
ring_hw     = 0.075

ring_verts = np.array([
    [cx,             ring_apex_y],
    [cx - ring_hw,   ring_base_y],
    [cx + ring_hw,   ring_base_y],
])
ring_poly = Polygon(ring_verts, closed=True,
                    facecolor=COL_ICRS, edgecolor="#ECEFF1", lw=1.2, alpha=0.92, zorder=10)
ax2.add_patch(ring_poly)

# ── Fibers BELOW ring (normal horizontal) ─────────────────────────────────────
fiber_below_ys = np.linspace(0.05, ring_base_y - 0.01, 3)
draw_flat_fibers(ax2, 0.07, 0.93, fiber_below_ys, COL_VR, lw=0.7, alpha=0.45)

# ── Fibers ABOVE ring (tensioned, slightly curved upward) ─────────────────────
# Fibers between ring_apex_y and top of post stroma, near ring x
t = np.linspace(0, np.pi, 100)
# We draw curved fibers above the ring area
fiber_above_ys = np.linspace(ring_apex_y + 0.05, 0.60, 6)
for fy in fiber_above_ys:
    # fibers far from ring: straight
    ax2.plot([0.07, cx - ring_hw - 0.05], [fy, fy],
             color=COL_VR, lw=0.7, alpha=0.50)
    ax2.plot([cx + ring_hw + 0.05, 0.93], [fy, fy],
             color=COL_VR, lw=0.7, alpha=0.50)

# Tensioned curved fibers directly above ring (arched upward toward epithelium)
for i, fy in enumerate(np.linspace(ring_apex_y + 0.01, ring_apex_y + 0.14, 4)):
    tension = 0.012 * (1 - i * 0.2)  # decreasing tension higher up
    x_span = np.linspace(cx - ring_hw - 0.02, cx + ring_hw + 0.02, 60)
    # arc bowing slightly UPWARD (tension in fiber means it arcs toward epithelium)
    y_curve = fy + tension * np.sin(np.pi * (x_span - (cx - ring_hw - 0.02)) /
                                    (2 * ring_hw + 0.04))
    ax2.plot(x_span, y_curve, color=COL_VR, lw=1.5, alpha=0.80, zorder=8)

# Fibers in anterior stroma
fiber_ant_ys = np.linspace(0.67, 0.86, 7)
draw_flat_fibers(ax2, 0.07, 0.93, fiber_ant_ys, COL_VR, lw=0.6, alpha=0.45)

# ── Original KC surface (dashed yellow — more curved) ─────────────────────────
x_surf = np.linspace(0.05, 0.95, 200)
# KC cone bump centered over ring (x=0.5)
kc_bump = 0.03 * np.exp(-((x_surf - 0.5) ** 2) / (0.03))
kc_y = 1.00 + kc_bump
ax2.plot(x_surf, kc_y, color=COL_ORIG, lw=1.2, linestyle='--', alpha=0.70, zorder=6)
ax2.text(0.86, 1.03, "KC (orig.)", color=COL_ORIG, fontsize=7, ha='left', va='bottom', alpha=0.8)

# ── New surface after ICRS — flat or slightly depressed over ring ─────────────
depress = -0.008 * np.exp(-((x_surf - 0.5) ** 2) / (0.04))
new_y = 1.00 + depress
ax2.plot(x_surf, new_y, color=COL_TEXT, lw=2.2, zorder=7)

# ── "Aplainamento sobre o anel" annotation ────────────────────────────────────
ax2.annotate("Aplainamento\nsobre o anel",
             xy=(0.50, 0.994),
             xytext=(0.72, 1.06),
             color=COL_NEW, fontsize=8, fontweight='bold',
             arrowprops=dict(arrowstyle='->', color=COL_NEW, lw=1.2),
             ha='left', va='bottom')

# ── V_End arrow descending from ring apex ─────────────────────────────────────
ax2.annotate("", xy=(cx, ring_apex_y - 0.14), xytext=(cx, ring_apex_y),
             arrowprops=dict(arrowstyle='->', color=COL_VEND, lw=2.2))
ax2.text(cx + 0.03, ring_apex_y - 0.09, "V_End (−Z)",
         color=COL_VEND, fontsize=8.5, fontweight='bold', va='center', ha='left')

# ── PIO arrow from bottom ─────────────────────────────────────────────────────
ax2.annotate("", xy=(0.5, 0.12), xytext=(0.5, -0.08),
             arrowprops=dict(arrowstyle='->', color=COL_VEND, lw=2.2))
ax2.text(0.5, -0.12, "PIO (+Z)", color=COL_VEND, fontsize=8.5,
         ha='center', va='top', fontweight='bold')

# ── ICRS label ────────────────────────────────────────────────────────────────
ax2.annotate("ICRS", xy=(cx + ring_hw, ring_apex_y - 0.05),
             xytext=(0.72, ring_apex_y + 0.05),
             color=COL_ICRS, fontsize=9, fontweight='bold',
             arrowprops=dict(arrowstyle='->', color=COL_ICRS, lw=1.1))

# ── Vertical separator ────────────────────────────────────────────────────────
fig.add_artist(plt.Line2D([0.505, 0.505], [0.08, 0.93],
                           transform=fig.transFigure,
                           color=COL_DIM, lw=0.8, alpha=0.5))

# ── Main title ────────────────────────────────────────────────────────────────
fig.suptitle(
    "Figura 2.2 — Arc-Shortening e Vetor Endotelial (V_End)\n"
    "Fibras tensionadas acima do ICRS → força descendente → aplainamento",
    color=COL_TEXT, fontsize=11, fontweight='bold', y=0.97
)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
