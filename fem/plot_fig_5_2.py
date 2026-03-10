"""
Fig 5.2 — Dinamica da Tracao Tangencial no Estroma (VT)
Atlas Vetorial ICRS — Capitulo 5 (VT)

Top-down view of semicircular ICRS implanted in stromal tunnel:
- Cyan (#00B4DC) arrows at the two EDGE extremities of the ring — VT traction
- Central body = passive anchor
- Stress gradient visible along the arc
- Portuguese labels
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Arc, FancyArrowPatch
import os

BASE = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT  = os.path.join(BASE, "images", "CH-005_VT", "Figura_Tangential_Traction.png")

BG       = "#0D1117"
COL_VT   = "#00B4DC"   # VT traction - cyan
COL_VR   = "#FF3333"   # radial fibers - red (secondary)
COL_RING = "#90A4AE"   # ring body
COL_EDGE = "#FFEB3B"   # ring edges - yellow highlight
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"
COL_ANC  = "#4CAF50"   # passive anchor green
COL_TISS = "#1A2332"   # tissue background

fig, ax = plt.subplots(figsize=(13, 11), facecolor=BG)
ax.set_facecolor(BG)
ax.set_aspect('equal')

# --- Geometry ---
R_LIMBUS  = 6.0    # limbal radius (mm)
R_RING    = 3.2    # ring radius (mm)
R_TUNNEL  = 0.25   # ring cross-section radius (mm, annular tunnel ~500um dia)

# ICRS is a 160-degree arc (typical partial ring: 120-160 deg segment)
ARC_ANGLE = 160    # degrees of arc
THETA_START = (180 - ARC_ANGLE) / 2  # symmetric about top
THETA_END   = 180 - THETA_START

# Cornea background (translucent stromal tissue)
theta_full = np.linspace(0, 2 * np.pi, 360)
tissue_x = R_LIMBUS * np.cos(theta_full)
tissue_y = R_LIMBUS * np.sin(theta_full)
ax.fill(tissue_x, tissue_y, color=COL_TISS, alpha=0.7, zorder=1)
ax.plot(tissue_x, tissue_y, color='#37474F', lw=1.5, zorder=2)

# --- Stromal fiber mesh (radial lines in background) ---
n_rad = 24
for i in range(n_rad):
    angle = i * 2 * np.pi / n_rad
    r_start = 0.5
    x0, y0 = r_start * np.cos(angle), r_start * np.sin(angle)
    x1, y1 = R_LIMBUS * np.cos(angle), R_LIMBUS * np.sin(angle)
    ax.plot([x0, x1], [y0, y1], color=COL_VR, lw=0.4, alpha=0.25, zorder=2)

# Circumferential fibers at limbus
for r in [R_LIMBUS * 0.85, R_LIMBUS * 0.92]:
    th = np.linspace(0, 2 * np.pi, 200)
    ax.plot(r * np.cos(th), r * np.sin(th), color=COL_VT, lw=0.4, alpha=0.2, zorder=2)

# --- Draw the stromal tunnel (circular channel for ICRS) ---
# Draw as thick arc
theta_arr = np.linspace(np.radians(THETA_START), np.radians(THETA_END), 200)
# Outer and inner edges of tunnel
for dr, style, alpha in [(R_TUNNEL, '-', 0.3), (-R_TUNNEL, '-', 0.3)]:
    r = R_RING + dr
    ax.plot(r * np.cos(theta_arr), r * np.sin(theta_arr),
            color='#546E7A', lw=1, alpha=alpha, linestyle='--', zorder=3)

# --- Draw ICRS ring body (thick arc) ---
# Main ring fill (simulate circular cross-section with a band)
for dr in np.linspace(-R_TUNNEL * 0.85, R_TUNNEL * 0.85, 8):
    alpha = 0.4 * (1 - (dr / R_TUNNEL) ** 2)
    r = R_RING + dr
    ax.plot(r * np.cos(theta_arr), r * np.sin(theta_arr),
            color=COL_RING, lw=2.5, alpha=alpha, zorder=5)

# Ring outline
ax.plot((R_RING + R_TUNNEL) * np.cos(theta_arr),
        (R_RING + R_TUNNEL) * np.sin(theta_arr),
        color='white', lw=1.0, alpha=0.6, zorder=6)
ax.plot((R_RING - R_TUNNEL) * np.cos(theta_arr),
        (R_RING - R_TUNNEL) * np.sin(theta_arr),
        color='white', lw=1.0, alpha=0.6, zorder=6)

# --- Ring edges (endpoints) — highlighted in yellow ---
theta_s = np.radians(THETA_START)
theta_e = np.radians(THETA_END)

edge_pts = [
    (R_RING * np.cos(theta_s), R_RING * np.sin(theta_s), theta_s),
    (R_RING * np.cos(theta_e), R_RING * np.sin(theta_e), theta_e),
]

for ex, ey, eth in edge_pts:
    # Edge cap circle
    ec = plt.Circle((ex, ey), R_TUNNEL * 1.1, color=COL_EDGE, alpha=0.9, zorder=7)
    ax.add_patch(ec)
    # Edge glow
    eg = plt.Circle((ex, ey), R_TUNNEL * 1.8, color=COL_EDGE, alpha=0.2, zorder=6)
    ax.add_patch(eg)

# --- VT Traction arrows at the two edges (cyan, tangential direction) ---
# At the start edge: tangential direction is along the ring arc (perpendicular to radial)
for ex, ey, eth in edge_pts:
    # Tangential direction at this point (perpendicular to radial, along arc)
    # For a point at angle eth on a ring, tangential is (-sin(eth), cos(eth)) or (sin(eth), -cos(eth))
    tan_x = -np.sin(eth)
    tan_y =  np.cos(eth)

    # Determine if this is the start or end edge
    if eth < np.pi:  # start edge (lower left of arc)
        # Arrow pointing in negative tangential (away from arc body, along meridian)
        dx, dy = -tan_x, -tan_y
    else:  # end edge (upper left of arc)
        dx, dy = tan_x, tan_y

    # Scale arrow
    alen = 1.4
    ax.annotate('', xy=(ex + dx * alen, ey + dy * alen),
                xytext=(ex, ey),
                arrowprops=dict(arrowstyle='->', color=COL_VT, lw=3.0,
                                mutation_scale=25), zorder=11)

    # Second arrow at larger scale
    ax.annotate('', xy=(ex + dx * 2.2, ey + dy * 2.2),
                xytext=(ex + dx * 1.5, ey + dy * 1.5),
                arrowprops=dict(arrowstyle='->', color=COL_VT, lw=2.0,
                                mutation_scale=18, alpha=0.5), zorder=11)

# --- Stress gradient along arc (color-coded glow) ---
# Show stress decreasing from edge to center of arc
n_seg = 60
theta_mid = (THETA_START + THETA_END) / 2
for i, th_deg in enumerate(np.linspace(THETA_START, THETA_END, n_seg)):
    th = np.radians(th_deg)
    # Stress is highest at edges, lowest at center
    dist_from_edge = min(abs(th_deg - THETA_START), abs(th_deg - THETA_END))
    dist_norm = dist_from_edge / (ARC_ANGLE / 2)  # 0 at edge, 1 at center
    stress_norm = 1 - dist_norm  # high at edges
    alpha = 0.15 + 0.45 * stress_norm

    x0 = (R_RING - R_TUNNEL * 1.5) * np.cos(th)
    y0 = (R_RING - R_TUNNEL * 1.5) * np.sin(th)
    x1 = (R_RING + R_TUNNEL * 1.5) * np.cos(th)
    y1 = (R_RING + R_TUNNEL * 1.5) * np.sin(th)
    ax.plot([x0, x1], [y0, y1], color=COL_VT, lw=3, alpha=alpha, zorder=4)

# --- Passive anchor annotation (center of arc) ---
th_center = np.radians((THETA_START + THETA_END) / 2)
cx = R_RING * np.cos(th_center)
cy = R_RING * np.sin(th_center)

# Anchor symbol (bracket-like)
ax.plot([cx - 0.3, cx + 0.3], [cy + R_TUNNEL * 1.5, cy + R_TUNNEL * 1.5],
        color=COL_ANC, lw=2.5, zorder=10)
ax.plot([cx - 0.3, cx - 0.3], [cy, cy + R_TUNNEL * 1.5], color=COL_ANC, lw=2.5, zorder=10)
ax.plot([cx + 0.3, cx + 0.3], [cy, cy + R_TUNNEL * 1.5], color=COL_ANC, lw=2.5, zorder=10)

ax.text(cx, cy + R_TUNNEL * 2.2,
        'Corpo Central\n(Âncora Passiva)', color=COL_ANC, fontsize=8.5,
        ha='center', va='bottom',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, edgecolor=COL_ANC, lw=0.8, alpha=0.9),
        zorder=12)

# --- Edge labels ---
ex0, ey0, _ = edge_pts[0]
ex1, ey1, _ = edge_pts[1]

ax.text(ex0 - 0.2, ey0 - 1.2,
        'Extremidade A\n(VT Máximo ↑)',
        color=COL_EDGE, fontsize=9, ha='center',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, edgecolor=COL_EDGE, lw=0.8, alpha=0.9),
        zorder=12)

ax.text(ex1 - 0.2, ey1 + 1.2,
        'Extremidade B\n(VT Máximo ↑)',
        color=COL_EDGE, fontsize=9, ha='center',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, edgecolor=COL_EDGE, lw=0.8, alpha=0.9),
        zorder=12)

# --- VT explanation text ---
ax.text(-R_LIMBUS + 0.3, -R_LIMBUS + 1.0,
        'Vetor Tangencial (VT)\n'
        'As extremidades do anel tracionam\n'
        'o estroma ao longo do meridiano\n'
        'circunferencial → stress direcional\n'
        'máximo nos pontos de incisão',
        color=COL_VT, fontsize=8.5, va='bottom',
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#0A1520', edgecolor=COL_VT, lw=1, alpha=0.95),
        zorder=12)

# --- Radial fibers disrupted at edges (arrows showing tissue traction) ---
for ex, ey, eth in edge_pts:
    # Show radial fibers being pulled toward edge
    for dr in [-0.4, 0, 0.4]:
        r_perp_x = np.cos(eth + np.pi / 2) * dr
        r_perp_y = np.sin(eth + np.pi / 2) * dr
        fx0 = ex + r_perp_x + np.cos(eth) * 0.3
        fy0 = ey + r_perp_y + np.sin(eth) * 0.3
        fx1 = ex + r_perp_x + np.cos(eth) * 1.5
        fy1 = ey + r_perp_y + np.sin(eth) * 1.5
        ax.plot([fx0, fx1], [fy0, fy1], color=COL_VR, lw=0.8, alpha=0.4, zorder=4)

# --- Ring dimension annotation ---
ax.annotate('', xy=(R_RING, 0), xytext=(0, 0),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.2, mutation_scale=10),
            zorder=8)
ax.text(R_RING / 2, 0.2, f'r = {R_RING} mm\n(OAZ ≈ {R_RING*2:.1f} mm)',
        color=COL_DIM, fontsize=7.5, ha='center')

# --- Limbus label ---
ax.text(0, R_LIMBUS + 0.3, 'Limbo (Ø12 mm)', color='#546E7A', fontsize=8, ha='center')

# Incision line markers (where the ring ends)
for ex, ey, eth in edge_pts:
    # Line from center through edge
    ax.plot([0, ex * 1.2], [0, ey * 1.2], color='#37474F', lw=0.8, linestyle=':', alpha=0.6, zorder=3)

# --- Legend ---
from matplotlib.lines import Line2D
legend_elements = [
    Line2D([0], [0], color=COL_VT, lw=3, label='Vetor Tangencial (VT) — tração nas extremidades'),
    mpatches.Patch(facecolor=COL_RING, edgecolor='white', label='Corpo do Anel ICRS (160°)'),
    mpatches.Patch(facecolor=COL_EDGE, edgecolor='black', label='Extremidades do Anel (incisão)'),
    Line2D([0], [0], color=COL_ANC, lw=2.5, label='Âncora Passiva (centro do arco)'),
    Line2D([0], [0], color=COL_VR, lw=1, label='Fibras Radiais Estromais'),
]
ax.legend(handles=legend_elements, loc='lower right',
          facecolor='#161B22', edgecolor='#37474F', labelcolor='white',
          fontsize=8.5, framealpha=0.95)

ax.set_title('Figura 5.2 — Dinâmica da Tração Tangencial no Estroma (VT)\n'
             'As EXTREMIDADES do anel geram o VT máximo; o corpo central é âncora passiva',
             color='white', fontsize=11, pad=14, fontweight='bold')

ax.set_xlim(-R_LIMBUS * 1.35, R_LIMBUS * 1.35)
ax.set_ylim(-R_LIMBUS * 1.35, R_LIMBUS * 1.35)
ax.axis('off')

plt.tight_layout()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
