"""
Fig 5.1 — Mecanismo de Acoplamento na Malha de Colágeno
Atlas Vetorial ICRS — Capitulo 5 (VT)

Top-down view showing Poisson coupling effect:
- K-steep meridian (ring axis): red radial fibers being stretched OUTWARD
- K-flat meridian (90° away): blue tangential fibers relaxing/bowing INWARD
- Outward arrows at K-steep (ring), relaxing arrows at K-flat
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, Arc, Circle
import os

BASE = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT  = os.path.join(BASE, "images", "CH-005_VT", "Figura_Coupling_Collagen.png")

BG       = "#0D1117"
COL_VR   = "#FF3333"   # radial fibers / VR
COL_VT   = "#00B4DC"   # tangential fibers / VT
COL_RING = "#90A4AE"   # ICRS ring
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"
COL_CONE = "#FF9800"   # cone / apex
COL_AXIS = "#FFEB3B"   # axis lines

fig, ax = plt.subplots(figsize=(12, 12), facecolor=BG)
ax.set_facecolor(BG)
ax.set_aspect('equal')

# Geometry
R_LIMBUS = 6.0   # limbal radius (mm)
R_RING   = 3.2   # ICRS ring radius (mm) — OAZ ~6.4mm
R_OZ     = 2.0   # optical zone (central)
R_CONE   = 1.2   # approximate cone apex location

# Draw limbus boundary
limbus = Circle((0, 0), R_LIMBUS, fill=False, edgecolor='#546E7A', lw=1.5, linestyle='--', zorder=2)
ax.add_patch(limbus)
ax.text(0, R_LIMBUS + 0.2, 'Limbo Corneal', color='#546E7A', fontsize=8, ha='center')

# Draw optical zone
oz = Circle((0, 0), R_OZ, fill=False, edgecolor='#37474F', lw=0.8, linestyle=':', zorder=2)
ax.add_patch(oz)

# Draw ICRS ring arc (superior/inferior semicircle — typical single ICRS)
# Full ring for clarity of coupling
ring_theta = np.linspace(0, 2 * np.pi, 200)
ring_x = R_RING * np.cos(ring_theta)
ring_y = R_RING * np.sin(ring_theta)
ax.plot(ring_x, ring_y, color=COL_RING, lw=5, alpha=0.6, zorder=4, solid_capstyle='round')
ax.plot(ring_x, ring_y, color='white',  lw=1.2, alpha=0.4, zorder=5, linestyle='-')

# --- K-steep axis: horizontal (0° — 180°) ---
# This is where the ring flattens the cornea
ax.annotate('', xy=(R_LIMBUS * 1.05, 0), xytext=(-R_LIMBUS * 1.05, 0),
            arrowprops=dict(arrowstyle='<->', color=COL_AXIS, lw=1.5, mutation_scale=12), zorder=3)
ax.text(R_LIMBUS * 1.1, 0.15, 'K-steep\n(Meridiano do Anel)', color=COL_AXIS,
        fontsize=8.5, va='center', ha='left')
ax.text(-R_LIMBUS * 1.1, 0.15, 'K-steep', color=COL_AXIS, fontsize=8.5, va='center', ha='right')

# --- K-flat axis: vertical (90° — 270°) ---
ax.annotate('', xy=(0, R_LIMBUS * 1.05), xytext=(0, -R_LIMBUS * 1.05),
            arrowprops=dict(arrowstyle='<->', color=COL_VT, lw=1.5, mutation_scale=12,
                            connectionstyle='arc3,rad=0'), zorder=3)
ax.text(0.25, R_LIMBUS * 1.1, 'K-flat\n(Meridiano Acoplado)', color=COL_VT,
        fontsize=8.5, va='bottom', ha='left')

# --- Radial fibers along K-steep (HORIZONTAL) — red, being stretched OUTWARD ---
# Draw fibers from center to limbus along horizontal axis
n_fibers_vert = 6  # fibers near horizontal axis
for i in range(-n_fibers_vert, n_fibers_vert + 1):
    y_off = i * 0.20  # slight vertical spread
    x_start = -R_LIMBUS * 0.92
    x_end   = R_LIMBUS * 0.92
    # Fiber line (red)
    alpha = 0.7 - 0.09 * abs(i)
    lw = 1.5 - 0.1 * abs(i)
    if abs(y_off) < R_LIMBUS * 0.9:
        ax.plot([x_start, x_end], [y_off, y_off],
                color=COL_VR, lw=lw, alpha=max(alpha, 0.2), zorder=3)

# Tension arrows: radial fibers pulled outward at the ring
for sign in [+1, -1]:
    # Arrow at ring position, pointing further outward
    ax.annotate('', xy=(sign * (R_RING + 1.3), 0),
                xytext=(sign * R_RING, 0),
                arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.5, mutation_scale=20),
                zorder=10)
    # Another inside ring: fiber compression toward anel
    ax.annotate('', xy=(sign * (R_RING - 0.05), 0),
                xytext=(sign * (R_RING - 1.2), 0),
                arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.0, mutation_scale=18,
                                linestyle='dashed'),
                zorder=10)

# --- Tangential/coupling fibers along K-flat (VERTICAL) — blue, relaxing ---
# These fibers run perpendicular to the ring axis
n_fibers_hor = 5
for i in range(-n_fibers_hor, n_fibers_hor + 1):
    x_off = i * 0.30
    y_start = -R_LIMBUS * 0.92
    y_end   =  R_LIMBUS * 0.92
    alpha = 0.7 - 0.08 * abs(i)
    lw = 1.5 - 0.12 * abs(i)
    if abs(x_off) < R_LIMBUS * 0.9:
        ax.plot([x_off, x_off], [y_start, y_end],
                color=COL_VT, lw=lw, alpha=max(alpha, 0.2), zorder=3)

# Relaxing arrows: tangential fibers bowing OUTWARD (Poisson) — at 90° meridian
for sign in [+1, -1]:
    # At the ring intersection on the 90° axis
    y_ring = sign * R_RING
    # Arrow showing outward bow (relaxation means slight outward bulge at the coupling meridian)
    ax.annotate('', xy=(0, sign * (R_RING + 1.0)),
                xytext=(0, sign * (R_RING - 0.1)),
                arrowprops=dict(arrowstyle='->', color=COL_VT, lw=2.2,
                                mutation_scale=18), zorder=10)

# --- Oblique crossing fibers (gray, showing mesh interweaving) ---
for angle_deg in range(30, 180, 30):
    if angle_deg in [90]:
        continue
    angle = np.radians(angle_deg)
    dx = np.cos(angle) * R_LIMBUS * 0.85
    dy = np.sin(angle) * R_LIMBUS * 0.85
    ax.plot([-dx, dx], [-dy, dy], color='#546E7A', lw=0.6, alpha=0.3, zorder=2)

# --- Cone apex marker ---
apex = Circle((0, 0), R_CONE, fill=False, edgecolor=COL_CONE, lw=1.5,
              linestyle='--', zorder=6, alpha=0.7)
ax.add_patch(apex)
ax.plot(0, 0, 'o', color=COL_CONE, markersize=8, zorder=7)
ax.text(0, -R_CONE - 0.3, 'Ápice do Cone\n(Aplainamento Central)', color=COL_CONE,
        fontsize=8, ha='center')

# --- Labels for coupling effect ---
# K-steep label with arrow annotation
ax.text(R_RING + 0.2, -0.6,
        'Fibras Radiais Tensionadas\n→ Arc-Shortening\n→ Aplainamento K-steep',
        color=COL_VR, fontsize=8, ha='left',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, edgecolor=COL_VR, lw=0.8, alpha=0.9),
        zorder=12)

ax.text(0.3, R_RING + 0.3,
        'Fibras Tangenciais\nDesenergizadas → Efeito Poisson\n→ Encurvamento K-flat',
        color=COL_VT, fontsize=8, ha='left',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, edgecolor=COL_VT, lw=0.8, alpha=0.9),
        zorder=12)

# --- ICRS ring label ---
ax.text(R_RING * np.cos(np.radians(45)) + 0.2,
        R_RING * np.sin(np.radians(45)) + 0.2,
        'ICRS\n(r = 3.2 mm)', color='white', fontsize=8,
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#263238',
                  edgecolor=COL_RING, lw=1, alpha=0.9), zorder=12)

# --- Coupling effect dashed box annotation ---
ax.annotate('', xy=(0.5, R_RING * 0.6), xytext=(0.5, R_OZ + 0.1),
            arrowprops=dict(arrowstyle='<->', color=COL_VT, lw=1.2,
                            mutation_scale=10, linestyle='dashed'), zorder=8)
ax.text(0.65, (R_RING * 0.6 + R_OZ) / 2,
        'Zona de\nAcoplamento', color=COL_VT, fontsize=7.5, va='center', ha='left')

# --- Legend ---
from matplotlib.lines import Line2D
legend_elements = [
    Line2D([0], [0], color=COL_VR, lw=2.5, label='Fibras Radiais (🔴) — tensionadas pelo VR'),
    Line2D([0], [0], color=COL_VT, lw=2.5, label='Fibras Tangenciais (🔵) — acoplamento Poisson'),
    mpatches.Patch(facecolor=COL_RING, edgecolor='white', label='Anel ICRS (r = 3.2 mm)'),
    Line2D([0], [0], color=COL_CONE, lw=1.5, linestyle='--', label='Zona do Cone (KC)'),
    Line2D([0], [0], color=COL_AXIS, lw=1.5, label='Meridiano K-steep (aplainado)'),
]
ax.legend(handles=legend_elements, loc='lower right',
          facecolor='#161B22', edgecolor='#37474F', labelcolor='white',
          fontsize=8.5, framealpha=0.95)

ax.set_title('Figura 5.1 — Mecanismo de Acoplamento na Malha de Colágeno\n'
             'O ICRS tensiona fibras radiais no K-steep → Efeito Poisson → Encurvamento K-flat',
             color='white', fontsize=11, pad=14, fontweight='bold')

ax.set_xlim(-R_LIMBUS * 1.4, R_LIMBUS * 1.4)
ax.set_ylim(-R_LIMBUS * 1.4, R_LIMBUS * 1.4)
ax.axis('off')

plt.tight_layout()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
