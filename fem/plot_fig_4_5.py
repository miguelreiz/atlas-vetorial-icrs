"""
Figure 4.5 — Vetor Radial: Vista Superior com ICRS
Atlas Vetorial ICRS
"""
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Arc, FancyArrowPatch, Wedge
import matplotlib.lines as mlines
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

OUT = os.path.join(BASE, "images", "CH-004_Vetor_Radial",
                   "fig_4_5_vetor_radial_superior_pt.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

# ── Figure setup ──────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(12, 8), dpi=200, facecolor=BG)
ax.set_facecolor(BG)
ax.set_aspect('equal')
ax.set_xlim(-6, 6)
ax.set_ylim(-6, 6)
ax.axis('off')

# ── Background cornea ─────────────────────────────────────────────────────────
bg = mpatches.Circle((0, 0), 5.5, facecolor='#0E1620', edgecolor='none', zorder=0)
ax.add_patch(bg)

# ── 1. Background fiber texture ───────────────────────────────────────────────
# Faint radial lines
angles_bg = np.deg2rad(np.arange(0, 360, 20))
for ang in angles_bg:
    x0, y0 = 0.3 * np.cos(ang), 0.3 * np.sin(ang)
    x1, y1 = 5.5 * np.cos(ang), 5.5 * np.sin(ang)
    ax.plot([x0, x1], [y0, y1], color=COL_VR, lw=0.5, alpha=0.13, zorder=1)

# Faint tangential arcs
for r in [1.0, 2.0, 3.0, 4.0, 5.0]:
    circ = mpatches.Circle((0, 0), r, facecolor='none', edgecolor=COL_VT,
                            lw=0.5, alpha=0.10, zorder=1)
    ax.add_patch(circ)

# ── Limbus ────────────────────────────────────────────────────────────────────
limbus = mpatches.Circle((0, 0), 5.5, facecolor='none', edgecolor=COL_TEXT,
                          linestyle='--', lw=1.0, alpha=0.60, zorder=5)
ax.add_patch(limbus)

# ── 2. K-steep meridian (vertical) ───────────────────────────────────────────
ax.plot([0, 0], [-5.5, 5.5], color=COL_VR, lw=1.0, linestyle='--', alpha=0.50, zorder=4)
ax.text(0.15, 5.3, "K-steep\n(córnea mais curva)", color=COL_VR, fontsize=8.0,
        ha='left', va='top', fontweight='bold')

# ── 3. K-flat meridian (horizontal) ──────────────────────────────────────────
ax.plot([-5.5, 5.5], [0, 0], color=COL_DIM, lw=1.0, linestyle='--', alpha=0.50, zorder=4)
ax.text(5.4, 0.18, "K-flat", color=COL_DIM, fontsize=8.0,
        ha='right', va='bottom', fontweight='bold')

# ── 4. ICRS arc (160°, on K-steep side = left half, centered vertically) ──────
# 160° arc centered at (0,0), radius=3.5
# Placed on the LEFT side of the K-steep meridian (actually spanning ±80° from vertical)
# That means from angle 90°-80°=10° to 90°+80°=170° in standard math convention
# But we want it symmetric around the vertical (90°) axis
# So: theta1 = 90 - 80 = 10°, theta2 = 90 + 80 = 170°

icrs_r  = 3.5
theta1  = 10.0   # degrees
theta2  = 170.0  # degrees  (170-10 = 160° arc)

# Draw as thick arc
theta_arr = np.deg2rad(np.linspace(theta1, theta2, 300))
icrs_x = icrs_r * np.cos(theta_arr)
icrs_y = icrs_r * np.sin(theta_arr)
ax.plot(icrs_x, icrs_y, color=COL_ICRS, lw=9, solid_capstyle='round',
        alpha=0.90, zorder=8)
ax.plot(icrs_x, icrs_y, color='#ECEFF1', lw=0.8, solid_capstyle='round',
        alpha=0.60, zorder=9)

# ICRS label
mid_theta = np.deg2rad(90)
ax.text(icrs_r * np.cos(mid_theta) - 0.35,
        icrs_r * np.sin(mid_theta) + 0.45,
        "ICRS (160°)", color=COL_ICRS, fontsize=8.5, ha='center', va='bottom',
        fontweight='bold', zorder=15)

# ── 5. VR arrows (centrifugal, pointing AWAY from center) ─────────────────────
# Along the arc: angles from 20° to 160° in steps
vr_angles_deg = [-60, -30, 0, 30, 60, 90]
# In our coordinate: arc spans 10° to 170°, so we pick points within
# Remap: symmetric around 90°
vr_angles_deg_mapped = [90 - a for a in vr_angles_deg]  # 150,120,90,60,30,0 → clip to 10-170

r_inner = 2.8
r_outer = 4.4

labeled = False
for ang_deg in vr_angles_deg_mapped:
    # Only draw if within arc span
    if theta1 <= ang_deg <= theta2:
        ang = np.deg2rad(ang_deg)
        xi = r_inner * np.cos(ang)
        yi = r_inner * np.sin(ang)
        xo = r_outer * np.cos(ang)
        yo = r_outer * np.sin(ang)
        ax.annotate("", xy=(xo, yo), xytext=(xi, yi),
                    arrowprops=dict(arrowstyle='->', color=COL_VR,
                                    lw=2.0, mutation_scale=14),
                    zorder=12)
        if not labeled:
            ax.text(xo * 1.08, yo * 1.08, "VR\n(centrífugo)",
                    color=COL_VR, fontsize=8.0, ha='center', va='center',
                    fontweight='bold', zorder=15)
            labeled = True

# ── 6. Flattening symbol at center ────────────────────────────────────────────
# Downward triangle (inverted)
tri_size = 0.40
tri_verts = np.array([
    [-tri_size, tri_size * 0.6],
    [tri_size,  tri_size * 0.6],
    [0,        -tri_size * 0.8],
])
tri_poly = mpatches.Polygon(tri_verts, closed=True,
                             facecolor=COL_TEXT, edgecolor=COL_DIM, lw=0.8,
                             alpha=0.85, zorder=18)
ax.add_patch(tri_poly)
ax.text(0, -tri_size * 1.0 - 0.25, "Aplainamento\nK-steep",
        color=COL_TEXT, fontsize=8.0, ha='center', va='top', fontweight='bold')

# ── 7. Curvature lines (K-steep = tighter arcs, K-flat = wider) ───────────────
# K-steep: tight concentric arcs on vertical axis
for r in [1.0, 2.0]:
    arc_angles = np.deg2rad(np.linspace(60, 120, 60))
    ax.plot(r * np.cos(arc_angles), r * np.sin(arc_angles),
            color=COL_VR, lw=1.0, alpha=0.35, zorder=3)
    arc_angles2 = np.deg2rad(np.linspace(240, 300, 60))
    ax.plot(r * np.cos(arc_angles2), r * np.sin(arc_angles2),
            color=COL_VR, lw=1.0, alpha=0.35, zorder=3)

# K-flat: flatter larger arcs on horizontal axis
for r in [1.2, 2.2]:
    arc_angles = np.deg2rad(np.linspace(-20, 20, 40))
    ax.plot(r * np.cos(arc_angles), r * np.sin(arc_angles),
            color=COL_DIM, lw=0.8, alpha=0.30, zorder=3)
    arc_angles2 = np.deg2rad(np.linspace(160, 200, 40))
    ax.plot(r * np.cos(arc_angles2), r * np.sin(arc_angles2),
            color=COL_DIM, lw=0.8, alpha=0.30, zorder=3)

# ── Legend ────────────────────────────────────────────────────────────────────
legend_elements = [
    mlines.Line2D([0], [0], color=COL_ICRS, lw=5,
                  label="ICRS (anel intracorneano 160°)"),
    mlines.Line2D([0], [0], color=COL_VR, lw=2,
                  marker='>', markersize=6, label="VR - Vetor Radial (centrifugo)"),
    mlines.Line2D([0], [0], color=COL_VR, lw=1, linestyle='--', alpha=0.6,
                  label="Meridiano K-steep"),
    mlines.Line2D([0], [0], color=COL_DIM, lw=1, linestyle='--', alpha=0.6,
                  label="Meridiano K-flat"),
]
leg = ax.legend(handles=legend_elements, loc='lower right',
                facecolor='#1A2030', edgecolor=COL_DIM,
                labelcolor=COL_TEXT, fontsize=8.5, framealpha=0.85,
                bbox_to_anchor=(5.7, -5.7), bbox_transform=ax.transData)

# ── Title ─────────────────────────────────────────────────────────────────────
ax.set_title(
    "Figura 4.5 — Vetor Radial (VR): Vista Superior\n"
    "ICRS no meridiano K-steep → VR centrífugo → aplainamento",
    color=COL_TEXT, fontsize=11, fontweight='bold', pad=14
)

fig.subplots_adjust(left=0.02, right=0.98, top=0.90, bottom=0.02)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
