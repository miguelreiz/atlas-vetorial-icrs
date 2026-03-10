"""
Figure 1.2 — Vista Superior: 3 Famílias de Fibras de Colágeno
Atlas Vetorial ICRS
"""
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Circle, FancyArrowPatch
import matplotlib.lines as mlines

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

OUT = os.path.join(BASE, "images", "CH-001_Anatomia", "fig_1_2_fibras_topdown.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ── Figure setup ──────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(12, 8), dpi=200, facecolor=BG)
ax.set_facecolor(BG)
ax.set_aspect('equal')
ax.set_xlim(-6, 6)
ax.set_ylim(-6, 6)
ax.axis('off')

# ── Background cornea fill ────────────────────────────────────────────────────
bg_circle = Circle((0, 0), 5.5, facecolor='#111820', edgecolor='none', zorder=0)
ax.add_patch(bg_circle)

# ── 1. Limbus circle ──────────────────────────────────────────────────────────
limbus = Circle((0, 0), 5.5, facecolor='none', edgecolor=COL_TEXT,
                linestyle='--', linewidth=1.2, alpha=0.8, zorder=10)
ax.add_patch(limbus)
ax.text(0, 5.75, "Limbo", color=COL_TEXT, fontsize=8.5, ha='center', va='bottom', alpha=0.8)

# ── 2. Optical zone ───────────────────────────────────────────────────────────
oz = Circle((0, 0), 3.0, facecolor='none', edgecolor=COL_DIM,
            linestyle='--', linewidth=0.8, alpha=0.7, zorder=10)
ax.add_patch(oz)
ax.text(2.15, 2.15, "Zona Óptica\n(3 mm)", color=COL_DIM, fontsize=7.5,
        ha='left', va='bottom', alpha=0.9)

# ── 3. Radial fibers ─────────────────────────────────────────────────────────
angles_rad = np.deg2rad(np.arange(0, 360, 30))
for i, ang in enumerate(angles_rad):
    x0 = 0.5 * np.cos(ang)
    y0 = 0.5 * np.sin(ang)
    x1 = 5.5 * np.cos(ang)
    y1 = 5.5 * np.sin(ang)
    ax.plot([x0, x1], [y0, y1], color=COL_VR, lw=1.0, alpha=0.55, zorder=3)

# Label one radial fiber
ang_lbl = np.deg2rad(45)
ax.text(4.2 * np.cos(ang_lbl) + 0.15, 4.2 * np.sin(ang_lbl) + 0.15,
        "Fibras Radiais", color=COL_VR, fontsize=8.0, ha='left', va='bottom',
        fontweight='bold', zorder=15)

# ── 4. Tangential (circumferential) fibers ────────────────────────────────────
for r in [1.5, 2.5, 3.5, 4.5]:
    circ = Circle((0, 0), r, facecolor='none', edgecolor=COL_VT,
                  linewidth=0.9, alpha=0.55, zorder=4)
    ax.add_patch(circ)

# Label tangential
ax.text(-4.6, 0.2, "Fibras\nTangenciais", color=COL_VT, fontsize=8.0,
        ha='right', va='center', fontweight='bold', zorder=15)
# small connector to r=4.5 circle
ax.annotate("", xy=(-4.5, 0), xytext=(-4.62, 0),
            arrowprops=dict(arrowstyle='->', color=COL_VT, lw=0.8))

# ── 5. Oblique fibers (±45°) ─────────────────────────────────────────────────
# Generate lines crossing the cornea region diagonally
offsets = np.linspace(-4.5, 4.5, 8)
for off in offsets:
    # +45° lines: y = x + off  →  points at x=-5.5 and x=5.5
    y_start = -5.5 + off
    y_end   =  5.5 + off
    # clip to limbus radius
    ax.plot([-5.5, 5.5], [y_start, y_end],
            color=COL_VTau, lw=0.7, alpha=0.45, linestyle='--', zorder=3)
    # -45° lines: y = -x + off
    ax.plot([-5.5, 5.5], [5.5 + off, -5.5 + off],
            color=COL_VTau, lw=0.7, alpha=0.45, linestyle='--', zorder=3)

ax.text(3.5, -4.8, "Fibras Oblíquas", color=COL_VTau, fontsize=8.0,
        ha='center', va='top', fontweight='bold', zorder=15)

# ── 6. Center dot ─────────────────────────────────────────────────────────────
ax.plot(0, 0, 'o', color=COL_TEXT, markersize=5, zorder=20)
ax.text(0.15, 0.25, "Ápice", color=COL_TEXT, fontsize=8, ha='left', va='bottom', zorder=20)

# ── 7. K-steep (vertical) and K-flat (horizontal) axes ────────────────────────
# K-steep vertical arrows
ax.annotate("", xy=(0, 5.7), xytext=(0, 0.3),
            arrowprops=dict(arrowstyle='->', color=COL_TEXT,
                            lw=1.3, linestyle='dashed'), zorder=12)
ax.annotate("", xy=(0, -5.7), xytext=(0, -0.3),
            arrowprops=dict(arrowstyle='->', color=COL_TEXT,
                            lw=1.3, linestyle='dashed'), zorder=12)
ax.text(0.22, 5.5, "K-steep", color=COL_TEXT, fontsize=8.5, ha='left', va='top', fontweight='bold')

# K-flat horizontal arrows
ax.annotate("", xy=(5.7, 0), xytext=(0.3, 0),
            arrowprops=dict(arrowstyle='->', color=COL_DIM,
                            lw=1.3, linestyle='dashed'), zorder=12)
ax.annotate("", xy=(-5.7, 0), xytext=(-0.3, 0),
            arrowprops=dict(arrowstyle='->', color=COL_DIM,
                            lw=1.3, linestyle='dashed'), zorder=12)
ax.text(5.5, 0.22, "K-flat", color=COL_DIM, fontsize=8.5, ha='right', va='bottom', fontweight='bold')

# ── Legend ────────────────────────────────────────────────────────────────────
legend_elements = [
    mlines.Line2D([0], [0], color=COL_VR,   lw=1.5, label="Fibras Radiais (VR)"),
    mlines.Line2D([0], [0], color=COL_VT,   lw=1.5, label="Fibras Tangenciais (VT)"),
    mlines.Line2D([0], [0], color=COL_VTau, lw=1.5, linestyle='--',
                  label="Fibras Obliquas (Vtau)"),
]
leg = ax.legend(handles=legend_elements, loc='lower right',
                facecolor='#1A2030', edgecolor=COL_DIM,
                labelcolor=COL_TEXT, fontsize=8.5, framealpha=0.85)

# ── Title ─────────────────────────────────────────────────────────────────────
ax.set_title(
    "Figura 1.2 — Vista Superior: 3 Famílias de Fibras de Colágeno\n"
    "Arquitetura lamellar — base da ação dos vetores ICRS",
    color=COL_TEXT, fontsize=11, fontweight='bold', pad=14
)

fig.subplots_adjust(left=0.02, right=0.98, top=0.90, bottom=0.02)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
