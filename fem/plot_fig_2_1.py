"""
Figura 2.1 — Tipos de Perfil ICRS: Triangular, Arredondado e Hexagonal
Atlas Vetorial ICRS — Capitulo 2 (Biomecanica)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Polygon, Ellipse
from matplotlib.gridspec import GridSpec
import os

BASE     = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT      = os.path.join(BASE, "images", "CH-002_Biomecanica", "fig_2_1_icrs_tipos.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VTau = "#00CC44"
COL_VCOMA= "#FF6600"
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

fig, axes = plt.subplots(1, 3, figsize=(12, 8), facecolor=BG)
fig.subplots_adjust(left=0.04, right=0.97, top=0.84, bottom=0.04,
                    wspace=0.18)

# ── Shared cornea cross-section drawing ────────────────────────────────────
def draw_cornea_layers(ax, cx, y_bot, total_h=6.0):
    """
    Draw simplified horizontal cornea layers.
    Returns dict with y-coordinates of layer boundaries.
    """
    cw = 3.8  # half-width of cornea
    # epithelium  ~10 % of total height
    h_epi  = total_h * 0.10
    h_bow  = total_h * 0.04
    h_stro = total_h * 0.74
    h_desc = total_h * 0.04
    h_endo = total_h * 0.08

    y_epi_bot  = y_bot + h_endo + h_desc + h_stro + h_bow
    y_bow_bot  = y_bot + h_endo + h_desc + h_stro
    y_stro_bot = y_bot + h_endo + h_desc
    y_desc_bot = y_bot + h_endo
    y_endo_bot = y_bot

    layers = [
        (y_epi_bot,  h_epi,  COL_EPI,  0.70, 'Epitélio'),
        (y_bow_bot,  h_bow,  COL_BOW,  0.60, "Bowman"),
        (y_stro_bot, h_stro, COL_ANT,  0.35, 'Estroma'),
        (y_desc_bot, h_desc, COL_POST, 0.55, "Descemet"),
        (y_endo_bot, h_endo, COL_ENDO, 0.65, 'Endotélio'),
    ]

    for yb, h, col, alpha, name in layers:
        rect = plt.Rectangle((cx - cw, yb), cw * 2, h,
                              facecolor=col, edgecolor='none', alpha=alpha)
        ax.add_patch(rect)
        # layer label on the right
        if h > 0.15:
            ax.text(cx + cw + 0.12, yb + h / 2, name,
                    color=col, fontsize=6.5, va='center')

    # Cornea border outline
    outline = plt.Rectangle((cx - cw, y_bot), cw * 2, total_h,
                              fill=False, edgecolor=COL_DIM,
                              linewidth=0.8, linestyle='--', alpha=0.5)
    ax.add_patch(outline)

    return {
        'stro_bot': y_stro_bot,
        'stro_top': y_bow_bot,
        'stro_h':   h_stro,
        'total_top': y_bot + total_h,
        'y_bot':     y_bot,
    }


def add_force_distribution(ax, cx, ring_y, ring_h, ring_w, profile='triangle'):
    """Draw force arrows below ring representing stress distribution."""
    y_base = ring_y - 0.45
    arrow_len = 0.28

    if profile == 'triangle':
        # Concentrated at apex (center), diminishing toward edges
        xs = [-ring_w * 0.2, 0.0, ring_w * 0.2]
        lengths = [0.15, 0.28, 0.15]
    elif profile == 'round':
        # Distributed more evenly
        xs = [-ring_w * 0.3, -ring_w * 0.1, ring_w * 0.1, ring_w * 0.3]
        lengths = [0.18, 0.22, 0.22, 0.18]
    else:  # hexagonal
        # Wide, more uniform
        xs = [-ring_w * 0.4, -ring_w * 0.2, 0.0, ring_w * 0.2, ring_w * 0.4]
        lengths = [0.14, 0.18, 0.20, 0.18, 0.14]

    for x_off, l in zip(xs, lengths):
        ax.annotate('', xy=(cx + x_off, y_base - l),
                    xytext=(cx + x_off, y_base),
                    arrowprops=dict(arrowstyle='->', color=COL_VT,
                                    lw=1.0, mutation_scale=8, alpha=0.7))


# ═══════════════════════════════════════════════════════════════════════════
# PANEL 1 — Ferrara: Triangular
# ═══════════════════════════════════════════════════════════════════════════
ax = axes[0]
ax.set_facecolor(BG)
ax.set_xlim(-3.5, 5.5)
ax.set_ylim(-0.5, 9.5)
ax.set_aspect('equal')
ax.axis('off')

cx = 0.0
layers = draw_cornea_layers(ax, cx, y_bot=1.0, total_h=6.0)

# Ring at 78% of stroma depth
stro_h  = layers['stro_h']
ring_cy = layers['stro_bot'] + stro_h * 0.78   # 78% from bottom of stroma
ring_w  = 0.60
ring_h  = 0.30   # ~200µm represented

# Triangle: base at bottom, apex pointing UP
tri_base_y = ring_cy - ring_h / 2
tri_top_y  = ring_cy + ring_h / 2
tri_pts = np.array([
    [cx - ring_w / 2, tri_base_y],
    [cx + ring_w / 2, tri_base_y],
    [cx,              tri_top_y ],
])
triangle = Polygon(tri_pts, closed=True, facecolor=COL_ICRS,
                   edgecolor='white', linewidth=1.2, alpha=0.95, zorder=4)
ax.add_patch(triangle)

# VR arrow: upward-outward from apex
ax.annotate('', xy=(cx, tri_top_y + 0.65),
            xytext=(cx, tri_top_y + 0.05),
            arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.5,
                            mutation_scale=16, zorder=5))
ax.text(cx + 0.15, tri_top_y + 0.40, 'VR', color=COL_VR,
        fontsize=9, fontweight='bold', va='center')

# Force distribution
add_force_distribution(ax, cx, ring_cy, ring_h, ring_w, 'triangle')

# Dimension annotations
ax.annotate('', xy=(cx + ring_w / 2 + 0.12, tri_base_y),
            xytext=(cx + ring_w / 2 + 0.12, tri_top_y),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(cx + ring_w / 2 + 0.35, (tri_base_y + tri_top_y) / 2,
        '200 µm', color=COL_DIM, fontsize=7, va='center')

ax.annotate('', xy=(cx - ring_w / 2, tri_base_y - 0.22),
            xytext=(cx + ring_w / 2, tri_base_y - 0.22),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(cx, tri_base_y - 0.42, '0.6 mm', color=COL_DIM,
        fontsize=7, ha='center')

# Title + label
ax.set_title('Ferrara — Perfil Triangular',
             color=COL_TEXT, fontsize=10, fontweight='bold', pad=8)
ax.text(cx, 0.45, 'Perfil Triangular\nApex -> epitélio\nFerrara Ring',
        color=COL_ICRS, fontsize=8, ha='center', va='top',
        linespacing=1.4,
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#1A2233',
                  edgecolor=COL_ICRS, linewidth=0.8))

# ═══════════════════════════════════════════════════════════════════════════
# PANEL 2 — Keraring: Arredondado
# ═══════════════════════════════════════════════════════════════════════════
ax = axes[1]
ax.set_facecolor(BG)
ax.set_xlim(-3.5, 5.5)
ax.set_ylim(-0.5, 9.5)
ax.set_aspect('equal')
ax.axis('off')

cx = 0.0
layers = draw_cornea_layers(ax, cx, y_bot=1.0, total_h=6.0)

stro_h  = layers['stro_h']
ring_cy = layers['stro_bot'] + stro_h * 0.78
ring_ew = 0.35   # ellipse semi-width
ring_eh = 0.22   # ellipse semi-height (~200µm height)

ellipse = Ellipse((cx, ring_cy), ring_ew * 2, ring_eh * 2,
                  facecolor=COL_ICRS, edgecolor='white',
                  linewidth=1.2, alpha=0.95, zorder=4)
ax.add_patch(ellipse)

# VR arrow outward
ax.annotate('', xy=(cx, ring_cy + ring_eh + 0.65),
            xytext=(cx, ring_cy + ring_eh + 0.05),
            arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.5,
                            mutation_scale=16, zorder=5))
ax.text(cx + 0.15, ring_cy + ring_eh + 0.40, 'VR', color=COL_VR,
        fontsize=9, fontweight='bold', va='center')

add_force_distribution(ax, cx, ring_cy, ring_eh * 2, ring_ew * 2, 'round')

# Dimension annotation
ax.annotate('', xy=(cx + ring_ew + 0.12, ring_cy - ring_eh),
            xytext=(cx + ring_ew + 0.12, ring_cy + ring_eh),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(cx + ring_ew + 0.35, ring_cy,
        '200 µm', color=COL_DIM, fontsize=7, va='center')

ax.annotate('', xy=(cx - ring_ew, ring_cy - ring_eh - 0.22),
            xytext=(cx + ring_ew, ring_cy - ring_eh - 0.22),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(cx, ring_cy - ring_eh - 0.42, '0.35 mm', color=COL_DIM,
        fontsize=7, ha='center')

ax.set_title('Keraring — Perfil Arredondado',
             color=COL_TEXT, fontsize=10, fontweight='bold', pad=8)
ax.text(cx, 0.45, 'Perfil Arredondado\nDistribuicao uniforme\nKeraring',
        color=COL_ICRS, fontsize=8, ha='center', va='top',
        linespacing=1.4,
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#1A2233',
                  edgecolor=COL_ICRS, linewidth=0.8))

# ═══════════════════════════════════════════════════════════════════════════
# PANEL 3 — Intacs: Hexagonal
# ═══════════════════════════════════════════════════════════════════════════
ax = axes[2]
ax.set_facecolor(BG)
ax.set_xlim(-3.5, 5.5)
ax.set_ylim(-0.5, 9.5)
ax.set_aspect('equal')
ax.axis('off')

cx = 0.0
layers = draw_cornea_layers(ax, cx, y_bot=1.0, total_h=6.0)

stro_h  = layers['stro_h']
ring_cy = layers['stro_bot'] + stro_h * 0.78
ring_hw = 0.45   # half-width = 0.9mm / 2
ring_hh = 0.115  # half-height = 0.15mm / 2 (slightly thinner)

# Hexagon with chamfered corners
# Create 6 points: wide horizontal hex
chamfer = 0.07
hex_pts = np.array([
    [cx - ring_hw,               ring_cy              ],   # left
    [cx - ring_hw + chamfer,     ring_cy + ring_hh    ],   # top-left
    [cx + ring_hw - chamfer,     ring_cy + ring_hh    ],   # top-right
    [cx + ring_hw,               ring_cy              ],   # right
    [cx + ring_hw - chamfer,     ring_cy - ring_hh    ],   # bottom-right
    [cx - ring_hw + chamfer,     ring_cy - ring_hh    ],   # bottom-left
])
hexagon = Polygon(hex_pts, closed=True, facecolor=COL_ICRS,
                  edgecolor='white', linewidth=1.2, alpha=0.95, zorder=4)
ax.add_patch(hexagon)

# VR arrow
ax.annotate('', xy=(cx, ring_cy + ring_hh + 0.65),
            xytext=(cx, ring_cy + ring_hh + 0.05),
            arrowprops=dict(arrowstyle='->', color=COL_VR, lw=2.5,
                            mutation_scale=16, zorder=5))
ax.text(cx + 0.15, ring_cy + ring_hh + 0.40, 'VR', color=COL_VR,
        fontsize=9, fontweight='bold', va='center')

add_force_distribution(ax, cx, ring_cy, ring_hh * 2, ring_hw * 2, 'hexagonal')

# Dimension annotation
ax.annotate('', xy=(cx + ring_hw + 0.12, ring_cy - ring_hh),
            xytext=(cx + ring_hw + 0.12, ring_cy + ring_hh),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(cx + ring_hw + 0.35, ring_cy,
        '150 µm', color=COL_DIM, fontsize=7, va='center')

ax.annotate('', xy=(cx - ring_hw, ring_cy - ring_hh - 0.22),
            xytext=(cx + ring_hw, ring_cy - ring_hh - 0.22),
            arrowprops=dict(arrowstyle='<->', color=COL_DIM, lw=1.0))
ax.text(cx, ring_cy - ring_hh - 0.42, '0.9 mm', color=COL_DIM,
        fontsize=7, ha='center')

ax.set_title('Intacs — Perfil Hexagonal',
             color=COL_TEXT, fontsize=10, fontweight='bold', pad=8)
ax.text(cx, 0.45, 'Perfil Hexagonal\nBase larga — menor stress\nIntacs',
        color=COL_ICRS, fontsize=8, ha='center', va='top',
        linespacing=1.4,
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#1A2233',
                  edgecolor=COL_ICRS, linewidth=0.8))

# ── Legend (shared) ──────────────────────────────────────────────────────
vr_patch   = mpatches.Patch(color=COL_VR,   label='Vetor Radial (VR)')
icrs_patch = mpatches.Patch(color=COL_ICRS, label='Perfil ICRS')
vt_patch   = mpatches.Patch(color=COL_VT,   label='Distribuicao de forcas')
fig.legend(handles=[vr_patch, icrs_patch, vt_patch],
           loc='lower center', ncol=3, fontsize=8.5,
           facecolor='#1C2333', edgecolor=COL_DIM,
           labelcolor=COL_TEXT, framealpha=0.90,
           bbox_to_anchor=(0.5, 0.00))

# ── Main title ───────────────────────────────────────────────────────────
fig.suptitle(
    'Figura 2.1 — Perfis do ICRS: Impacto na Distribuição de Forças\n'
    'Triangular (Ferrara) · Arredondado (Keraring) · Hexagonal (Intacs)',
    color=COL_TEXT, fontsize=13, fontweight='bold', y=0.97
)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
