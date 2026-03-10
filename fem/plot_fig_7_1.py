"""
Figura 7.1 — VComa: Assimetria do Vtau e Reposicionamento do Apice
Atlas Vetorial ICRS — Capitulo 7 (VComa)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, Arc, Circle, FancyBboxPatch
import os

BASE     = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT      = os.path.join(BASE, "images", "CH-007_VComa", "fig_7_1_vcoma_assimetria.png")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

BG       = "#0D1117"
COL_VR   = "#CC2200"
COL_VT   = "#00B4DC"
COL_VTau = "#00CC44"
COL_VCOMA= "#FF6600"
COL_VEND = "#00FF88"
COL_ICRS = "#90A4AE"
COL_ORIG = "#FFEB3B"
COL_NEW  = "#FFFFFF"
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"

fig, axes = plt.subplots(1, 2, figsize=(12, 8), facecolor=BG)
fig.subplots_adjust(left=0.04, right=0.96, top=0.84, bottom=0.06, wspace=0.12)

# ── helper: draw limbus circle ──────────────────────────────────────────────
def draw_limbus(ax):
    limbus = plt.Circle((0, 0), 4.5, fill=False, color='white',
                         linestyle='--', linewidth=1.2, alpha=0.5)
    ax.add_patch(limbus)

# ═══════════════════════════════════════════════════════════════════════════
# LEFT PANEL — Vtau Simétrico
# ═══════════════════════════════════════════════════════════════════════════
ax = axes[0]
ax.set_facecolor(BG)
ax.set_xlim(-5, 5)
ax.set_ylim(-5, 5)
ax.set_aspect('equal')
ax.axis('off')

draw_limbus(ax)

# K-steep vertical dashed line
ax.axvline(0, color=COL_ORIG, linestyle='--', linewidth=1.0, alpha=0.5, label='_')
ax.text(0.15, 4.2, 'K-steep', color=COL_ORIG, fontsize=7, ha='left', alpha=0.7)

# Superior ICRS arc (90 to 270 counterclockwise = top half)
theta_sup = np.linspace(np.radians(10), np.radians(170), 120)
r_arc = 3.0
ax.plot(r_arc * np.cos(theta_sup), r_arc * np.sin(theta_sup),
        color=COL_ICRS, linewidth=6, solid_capstyle='round', alpha=0.9)

# Inferior ICRS arc (bottom half, 190 to 350)
theta_inf = np.linspace(np.radians(190), np.radians(350), 120)
ax.plot(r_arc * np.cos(theta_inf), r_arc * np.sin(theta_inf),
        color=COL_ICRS, linewidth=6, solid_capstyle='round', alpha=0.9)

# Symmetric Vtau arrows — 4 pairs (2 up, 2 down from each arc)
arrow_kw = dict(color=COL_VTau, linewidth=1.5)
arrowprops = dict(arrowstyle='->', color=COL_VTau, lw=1.5)

# Superior arc arrows pointing downward (pushing cone down)
for xpos in [-1.5, -0.5, 0.5, 1.5]:
    ybase = np.sqrt(max(0, r_arc**2 - xpos**2))
    ax.annotate('', xy=(xpos, ybase - 0.9), xytext=(xpos, ybase - 0.1),
                arrowprops=dict(arrowstyle='->', color=COL_VTau, lw=1.6))

# Inferior arc arrows pointing upward (pushing cone up)
for xpos in [-1.5, -0.5, 0.5, 1.5]:
    ybase = -np.sqrt(max(0, r_arc**2 - xpos**2))
    ax.annotate('', xy=(xpos, ybase + 0.9), xytext=(xpos, ybase + 0.1),
                arrowprops=dict(arrowstyle='->', color=COL_VTau, lw=1.6))

# Cone apex — white dot
apex = plt.Circle((0, -0.5), 0.18, color=COL_NEW, zorder=5)
ax.add_patch(apex)
ax.text(0.35, -0.5, 'Ápice KC', color=COL_NEW, fontsize=8,
        va='center', fontweight='bold')

ax.set_title('Vτ Simétrico\nCone estável, sem deslocamento',
             color=COL_TEXT, fontsize=10, pad=8, fontweight='bold')

# legend proxy
sup_patch = mpatches.Patch(color=COL_ICRS, label='Segmento ICRS')
tau_patch = mpatches.Patch(color=COL_VTau, label='Vetor Vτ')
apex_patch = mpatches.Patch(color=COL_NEW, label='Ápice KC')
ax.legend(handles=[sup_patch, tau_patch, apex_patch],
          loc='lower right', fontsize=7, facecolor='#1C2333',
          edgecolor=COL_DIM, labelcolor=COL_TEXT, framealpha=0.85)

# ═══════════════════════════════════════════════════════════════════════════
# RIGHT PANEL — Vtau Assimétrico / VComa Ativo
# ═══════════════════════════════════════════════════════════════════════════
ax = axes[1]
ax.set_facecolor(BG)
ax.set_xlim(-5, 5)
ax.set_ylim(-5, 5)
ax.set_aspect('equal')
ax.axis('off')

draw_limbus(ax)

# K-steep dashed line
ax.axvline(0, color=COL_ORIG, linestyle='--', linewidth=1.0, alpha=0.5)
ax.text(0.15, 4.2, 'K-steep', color=COL_ORIG, fontsize=7, ha='left', alpha=0.7)

# Superior arc — longer / dominant (120° centered at top)
theta_sup2 = np.linspace(np.radians(30), np.radians(150), 120)
ax.plot(r_arc * np.cos(theta_sup2), r_arc * np.sin(theta_sup2),
        color=COL_ICRS, linewidth=9, solid_capstyle='round', alpha=0.95)

# Inferior arc — smaller (60° centered at bottom)
theta_inf2 = np.linspace(np.radians(210), np.radians(330), 80)
ax.plot(r_arc * np.cos(theta_inf2), r_arc * np.sin(theta_inf2),
        color=COL_ICRS, linewidth=5, solid_capstyle='round', alpha=0.7)

# Superior arc arrows — 4 stronger downward arrows
for xpos in [-1.5, -0.5, 0.5, 1.5]:
    ybase = np.sqrt(max(0, r_arc**2 - xpos**2))
    ax.annotate('', xy=(xpos, ybase - 1.1), xytext=(xpos, ybase - 0.05),
                arrowprops=dict(arrowstyle='->', color=COL_VTau, lw=2.0))

# Inferior arc arrows — 2 weaker upward arrows
for xpos in [-0.6, 0.6]:
    ybase = -np.sqrt(max(0, r_arc**2 - xpos**2))
    ax.annotate('', xy=(xpos, ybase + 0.6), xytext=(xpos, ybase + 0.05),
                arrowprops=dict(arrowstyle='->', color=COL_VTau, lw=1.2, alpha=0.7))

# Original apex — dashed circle
orig_circle = plt.Circle((0, -0.5), 0.2, fill=False, color=COL_DIM,
                          linestyle='--', linewidth=1.5, zorder=4)
ax.add_patch(orig_circle)
ax.text(0.35, -0.5, 'Ápice original', color=COL_DIM, fontsize=7.5,
        va='center', style='italic')

# New apex — filled orange dot
new_apex = plt.Circle((0, 0.6), 0.22, color=COL_VCOMA, zorder=6)
ax.add_patch(new_apex)
ax.text(0.38, 0.6, 'Ápice deslocado', color=COL_VCOMA, fontsize=8,
        va='center', fontweight='bold')

# VComa arrow — large orange, from original to new apex
ax.annotate('', xy=(0, 0.38), xytext=(0, -0.3),
            arrowprops=dict(arrowstyle='->', color=COL_VCOMA, lw=3.0,
                            mutation_scale=22))
ax.text(-0.25, 0.05, 'VComa (superior)', color=COL_VCOMA, fontsize=8.5,
        ha='right', fontweight='bold', rotation=90, va='center')

ax.set_title('Vτ Assimétrico\nVComa desloca o ápice superiormente',
             color=COL_TEXT, fontsize=10, pad=8, fontweight='bold')

# legend
sup_patch2 = mpatches.Patch(color=COL_ICRS, label='Segmento ICRS (dominante)')
tau_patch2 = mpatches.Patch(color=COL_VTau, label='Vetor Vτ')
vcoma_patch = mpatches.Patch(color=COL_VCOMA, label='VComa (deslocamento)')
ax.legend(handles=[sup_patch2, tau_patch2, vcoma_patch],
          loc='lower right', fontsize=7, facecolor='#1C2333',
          edgecolor=COL_DIM, labelcolor=COL_TEXT, framealpha=0.85)

# ── Main title ───────────────────────────────────────────────────────────
fig.suptitle(
    'Figura 7.1 — Vetor de Coma (VComa): Reposicionamento do Ápice\n'
    'Vτ assimétrico entre segmentos superior e inferior',
    color=COL_TEXT, fontsize=13, fontweight='bold', y=0.97
)

plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
plt.close()
print(f"Saved: {OUT}")
