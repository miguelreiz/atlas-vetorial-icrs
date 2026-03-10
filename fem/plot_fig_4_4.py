"""
Fig 4.4 — Vetor Radial em Corte Transversal
Atlas Vetorial ICRS — Capitulo 4

Cross-section of cornea showing:
- Anatomical layers with correct proportions
- ICRS ring at 80% depth (posterior stroma)
- Red VR vectors pointing outward (centrifugal)
- Anterior surface: dashed (pre-ICRS, curved) vs solid (post-ICRS, flat/depressed over ring)
- ZERO tenting — surface is flat or DEPRESSED over ring (Vetor Endotelial confirmed by FEM)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
import os

# --- Output path ---
BASE = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT  = os.path.join(BASE, "images", "CH-004_Vetor_Radial", "fig_4_4_vetor_radial_corte_pt.png")

# --- Colors ---
BG        = "#0D1117"
COL_EPI   = "#FFCDD2"    # epithelio - light pink
COL_BOW   = "#8D6E63"    # bowman - dark tan
COL_ANT   = "#F5E6C8"    # anterior stroma - warm beige
COL_POST  = "#EDD9A3"    # posterior stroma - light beige
COL_DESC  = "#9E9E9E"    # descemet - gray
COL_ENDO  = "#B3E5FC"    # endotelio - light blue
COL_VR    = "#FF3333"    # VR vector - red
COL_ICRS  = "#90A4AE"    # ICRS ring - blue-gray
COL_ORIG  = "#FFEB3B"    # original surface - yellow dashed
COL_NEW   = "#FFFFFF"    # new surface - white solid
COL_TEXT  = "#FFFFFF"
COL_DIM   = "#78909C"    # dimension lines

# --- Geometry (mm) ---
# Cornea half-width in the cross-section view
W = 6.5        # half-width of cornea in mm
THICK = 0.55   # central thickness mm (580 um)
THICK_P = 0.70 # peripheral thickness

# Layer thicknesses (fractions of total, central)
EPI_F  = 0.09    # epithelium ~50 um -> 9%
BOW_F  = 0.02    # bowman ~10 um -> 2%
ANT_F  = 0.25    # anterior stroma -> 25%
POST_F = 0.60    # posterior stroma -> 60%
DESC_F = 0.02    # descemet -> 2%
ENDO_F = 0.02    # endotelio -> 2%

# ICRS position: x from 2.5 to 4.0 mm from center, at 80% depth
ICRS_X0 = 2.8    # medial edge of ICRS
ICRS_X1 = 3.6    # lateral edge of ICRS
ICRS_DEPTH = 0.80  # 80% depth
ICRS_H = 0.200   # 200 um base height
ICRS_W = ICRS_X1 - ICRS_X0  # width

# Build corneal surface profile (anterior surface with curvature)
def cornea_surface(x, R=7.8):
    """Anterior surface height as function of x (corneal spherical cap)."""
    r = np.clip(np.abs(x), 0, R * 0.99)
    return R * np.cos(np.arcsin(r / R)) - R

def posterior_surface(x, R=6.4, thick_c=THICK):
    """Posterior surface = anterior - local thickness (approx)."""
    # Posterior surface also spherical but offset
    r = np.clip(np.abs(x), 0, R * 0.99)
    ant = cornea_surface(x)
    # Local thickness increases toward periphery
    factor = 1.0 + 0.4 * (np.abs(x) / W) ** 2
    return ant - thick_c * factor

fig, ax = plt.subplots(figsize=(14, 7), facecolor=BG)
ax.set_facecolor(BG)

# X array for plotting
x_full = np.linspace(-W, W, 500)

# --- Draw corneal layers (positive x side only, then mirror) ---
# We compute the surfaces
z_ant = cornea_surface(x_full)
z_post = posterior_surface(x_full)
total_thick = z_ant - z_post  # local thickness

# Layer boundaries (from anterior to posterior as fraction of local thickness)
z_bow   = z_ant - EPI_F * total_thick
z_astrom = z_bow - BOW_F * total_thick
z_pstrom = z_astrom - ANT_F * total_thick
z_desc  = z_pstrom - POST_F * total_thick
z_endo  = z_desc - DESC_F * total_thick

# Fill each layer
ax.fill_between(x_full, z_ant,   z_bow,    color=COL_EPI,  alpha=0.9, zorder=2, label='Epitélio')
ax.fill_between(x_full, z_bow,   z_astrom, color=COL_BOW,  alpha=0.9, zorder=2, label="Bowman")
ax.fill_between(x_full, z_astrom, z_pstrom, color=COL_ANT, alpha=0.7, zorder=2, label="Estroma Anterior")
ax.fill_between(x_full, z_pstrom, z_desc,  color=COL_POST, alpha=0.7, zorder=2, label="Estroma Posterior")
ax.fill_between(x_full, z_desc,  z_endo,   color=COL_DESC, alpha=0.9, zorder=2, label="Descemet")
ax.fill_between(x_full, z_endo,  z_post,   color=COL_ENDO, alpha=0.7, zorder=2, label="Endotélio")

# Outline surfaces
ax.plot(x_full, z_ant,   color='white',   lw=0.5, zorder=3, alpha=0.5)
ax.plot(x_full, z_post,  color='#37474F', lw=0.8, zorder=3)
ax.plot(x_full, z_bow,   color=COL_BOW,   lw=0.6, zorder=3, alpha=0.8)
ax.plot(x_full, z_pstrom,color='#BCAAA4', lw=0.5, zorder=3, alpha=0.6, linestyle='--')

# --- Original (pre-ICRS) anterior surface — yellow dashed ---
x_orig = np.linspace(-W, W, 500)
z_ant_orig = cornea_surface(x_orig)
ax.plot(x_orig, z_ant_orig, color=COL_ORIG, lw=1.5, zorder=8,
        linestyle='--', alpha=0.8, label='Superfície Original (KC)')

# --- Post-ICRS anterior surface — flat/depressed over ring ---
# The surface is flat between the two ICRS rings (x: ICRS_X0 to ICRS_X1 and mirrors)
z_ant_new = z_ant_orig.copy()

# For the zone directly above and around the ICRS ring, create flattening/depression
# Mirror: positive and negative sides
for sign in [+1, -1]:
    mask_ring  = (x_orig >= sign * ICRS_X0) & (x_orig <= sign * ICRS_X1)
    mask_inner = (x_orig * sign > 0) & (x_orig * sign < ICRS_X0)
    mask_outer = (x_orig * sign > ICRS_X1) & (x_orig * sign < W)

    if mask_ring.any():
        # Over the ring: slight depression (Vetor Endotelial)
        x_ring = x_orig[mask_ring]
        x_mid = (sign * ICRS_X0 + sign * ICRS_X1) / 2
        # Gaussian depression: -0.015 mm = -15 um at center of ring
        depress = -0.015 * np.exp(-((x_ring - x_mid) ** 2) / (0.15 ** 2))
        z_ant_new[mask_ring] += depress

    if mask_inner.any():
        # Central zone: flatten (slightly less curved than original KC)
        x_inner = x_orig[mask_inner]
        flatten = 0.008 * np.exp(-((x_inner) ** 2) / (1.5 ** 2))
        z_ant_new[mask_inner] += flatten

ax.plot(x_orig, z_ant_new, color=COL_NEW, lw=2.2, zorder=9, label='Superfície Pós-ICRS (Aplainada)')

# --- Draw ICRS rings (triangular cross-section, right and left) ---
def draw_icrs_ring(ax, cx, z_ant_profile, x_arr, z_pstrom_profile, depth=0.80, hw=0.4, hh=0.2):
    """Draw a triangular ICRS cross-section."""
    # Find z at cx using interpolation
    z_a = np.interp(cx, x_arr, z_ant_profile)
    z_p = np.interp(cx, x_arr, z_pstrom_profile)
    local_thick = z_a - z_p

    # ICRS base at 80% depth from anterior
    z_base_top = z_a - depth * local_thick          # top of ICRS
    z_base_bot = z_base_top - hh * local_thick      # bottom of ICRS (200 um proportional)

    # Triangle vertices
    vx = [cx - hw/2, cx + hw/2, cx, cx - hw/2]
    vz = [z_base_top, z_base_top, z_base_bot, z_base_top]

    tri = plt.Polygon(list(zip(vx, vz)), closed=True,
                      facecolor=COL_ICRS, edgecolor='white', lw=1.2, zorder=6, alpha=0.95)
    ax.add_patch(tri)
    return cx, (z_base_top + z_base_bot) / 2

# Right ring
r_cx = (ICRS_X0 + ICRS_X1) / 2
draw_icrs_ring(ax, r_cx,  z_ant_orig, x_full, z_pstrom, hw=ICRS_W * 1.2, hh=0.18)
# Left ring (mirror)
l_cx = -r_cx
draw_icrs_ring(ax, l_cx, z_ant_orig, x_full, z_pstrom, hw=ICRS_W * 1.2, hh=0.18)

# --- VR Arrows (Red, centrífugal, from ring position) ---
# Right side: arrow pointing right (outward)
for sign, xr, xdir in [(+1, r_cx, +1), (-1, l_cx, -1)]:
    z_a = float(np.interp(xr, x_full, z_ant_orig))
    z_p = float(np.interp(xr, x_full, z_pstrom))
    lthick = z_a - z_p
    z_mid = z_a - 0.5 * lthick  # mid-stroma height

    # Multiple arrows: at 3 levels of stroma depth
    for frac, alen in [(0.25, 0.6), (0.45, 0.7), (0.65, 0.55)]:
        z_arr = z_a - frac * lthick
        ax.annotate('', xy=(xr + xdir * alen, z_arr),
                    xytext=(xr, z_arr),
                    arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.0,
                                   mutation_scale=16),
                    zorder=10)

# --- Arc-shortening fibers above ring ---
# Show radial fibers above the ring being tensioned (horizontal lines with arrows)
for sign, xr in [(+1, r_cx), (-1, l_cx)]:
    z_a = float(np.interp(xr, x_full, z_ant_orig))
    z_ps = float(np.interp(xr, x_full, z_pstrom))
    lthick = z_a - z_ps
    z_icrs_top = z_a - 0.80 * lthick
    z_ant_strom = z_a - 0.11 * lthick  # just below bowman

    # Draw 3 fiber lines above ring
    for frac in [0.20, 0.40, 0.60]:
        z_fib = z_a - frac * 0.8 * lthick  # from surface to ICRS top
        xstart = xr - sign * 0.3
        xend   = xr + sign * 0.4
        ax.plot([xstart, xend], [z_fib, z_fib],
                color=COL_VR, lw=0.9, alpha=0.5, linestyle='-', zorder=5)

# --- Vetor Endotelial annotation (downward arrow over ring) ---
for sign, xr in [(+1, r_cx), (-1, l_cx)]:
    z_a_new = float(np.interp(xr, x_orig, z_ant_new))
    z_a_old = float(np.interp(xr, x_orig, z_ant_orig))

    # Small downward arrow indicating the depression
    ax.annotate('', xy=(xr, z_a_new),
                xytext=(xr, z_a_old + 0.015),
                arrowprops=dict(arrowstyle='->', color='#00FF88', lw=1.8,
                                mutation_scale=12),
                zorder=11)

# --- Labels for anatomical layers ---
label_x = W * 0.78
mid_z = lambda f1, f2: (float(np.interp(label_x, x_full, f1)) +
                          float(np.interp(label_x, x_full, f2))) / 2

labels = [
    (mid_z(z_ant,   z_bow),    'Epitélio (~50 µm)'),
    (mid_z(z_bow,   z_astrom), 'Bowman (~10 µm)'),
    (mid_z(z_astrom, z_pstrom),'Estroma Anterior\n(~135 µm, fibras oblíquas)'),
    (mid_z(z_pstrom, z_desc),  'Estroma Posterior\n(~330 µm, lamelas paralelas)'),
    (mid_z(z_desc,  z_endo),   'Descemet (~10 µm)'),
    (mid_z(z_endo,  z_post),   'Endotélio (~5 µm)'),
]
for z_lbl, txt in labels:
    ax.text(label_x + 0.15, z_lbl, txt, color=COL_TEXT, fontsize=7.5,
            va='center', ha='left',
            bbox=dict(boxstyle='round,pad=0.2', facecolor=BG, alpha=0.7, edgecolor='none'),
            zorder=12)
    ax.plot([label_x, label_x + 0.12], [z_lbl, z_lbl],
            color=COL_DIM, lw=0.7, zorder=11, alpha=0.8)

# --- ICRS label ---
z_icrs_label = float(np.interp(r_cx, x_full, z_pstrom)) + 0.12
ax.text(r_cx, z_icrs_label - 0.18, 'ICRS\n(80% prof.)\n≈200 µm',
        color='white', fontsize=7.5, ha='center', va='top',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#263238', edgecolor=COL_ICRS, lw=1),
        zorder=12)

# --- VR label ---
ax.text(r_cx + 1.1, float(np.interp(r_cx + 0.5, x_full, z_ant_orig)) - 0.15,
        'Vetor Radial (VR)\n← ANEL →  centrífugo',
        color=COL_VR, fontsize=8, ha='left', va='center',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, alpha=0.8, edgecolor=COL_VR, lw=0.8),
        zorder=12)

# --- Vetor Endotelial annotation ---
ax.text(0.0, float(np.interp(0, x_full, z_ant_new)) + 0.025,
        'Vetor Endotelial\n(↓ Fibras → Aplainamento)',
        color='#00FF88', fontsize=8, ha='center', va='bottom',
        bbox=dict(boxstyle='round,pad=0.3', facecolor=BG, alpha=0.8, edgecolor='#00FF88', lw=0.8),
        zorder=12)

# --- Legend lines ---
from matplotlib.lines import Line2D
legend_elements = [
    Line2D([0], [0], color=COL_ORIG, lw=2, linestyle='--', label='Superfície Original KC (tracejado)'),
    Line2D([0], [0], color=COL_NEW,  lw=2, linestyle='-',  label='Superfície Pós-ICRS — Aplainada (sólido)'),
    mpatches.Patch(facecolor=COL_ICRS, edgecolor='white', label='ICRS (Ferrara triangular, 200 µm)'),
    Line2D([0], [0], color=COL_VR, lw=2, label='Vetor Radial (VR) — centrífugo'),
    Line2D([0], [0], color='#00FF88', lw=2, label='Vetor Endotelial — aplainamento'),
]
leg = ax.legend(handles=legend_elements, loc='lower left',
                facecolor='#161B22', edgecolor='#37474F', labelcolor='white',
                fontsize=8, framealpha=0.9)

# --- Axis labels / titles ---
ax.set_title('Figura 4.4 — Vetor Radial em Corte Transversal\n'
             'O ICRS a 80% de profundidade gera VR centrífugo → Vetor Endotelial → Aplainamento anterior',
             color='white', fontsize=11, pad=14, fontweight='bold')
ax.set_xlabel('Posição radial (mm)', color=COL_DIM, fontsize=9)
ax.set_ylabel('Altura (mm)', color=COL_DIM, fontsize=9)
ax.tick_params(colors=COL_DIM, labelsize=8)
for spine in ax.spines.values():
    spine.set_edgecolor('#37474F')

# Center line
ax.axvline(0, color='#37474F', lw=0.8, linestyle=':', zorder=1)
ax.text(0, float(np.interp(0, x_full, z_ant)) + 0.04, 'Ápice', color=COL_DIM,
        fontsize=7, ha='center', zorder=12)

# Scale bar (1 mm)
sb_x0, sb_y = -W + 0.3, float(np.interp(-W + 0.3, x_full, z_post)) + 0.03
ax.plot([sb_x0, sb_x0 + 1.0], [sb_y, sb_y], 'w-', lw=2, zorder=13)
ax.text(sb_x0 + 0.5, sb_y + 0.02, '1 mm', color='white', fontsize=7.5, ha='center', zorder=13)

ax.set_xlim(-W - 0.5, W + 2.8)
ax.set_aspect('equal')
ax.invert_yaxis()   # anterior at top

plt.tight_layout()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
