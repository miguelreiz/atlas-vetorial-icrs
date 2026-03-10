"""
Fig 5.3 — Efeito do VT na Incisao Errada (Astigmatismo Induzido)
Atlas Vetorial ICRS — Capitulo 5 (VT)

Shows the biomechanical disaster of wrong incision axis:
- K-steep axis (dashed)
- ICRS ring implanted at 45 degrees wrong angle
- VT vectors (cyan) creating cross-cylinder stress
- New induced astigmatic axis — different from original
- SIA conflicting effect
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Arc, FancyArrowPatch
import os

BASE = r"C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel"
OUT  = os.path.join(BASE, "images", "CH-005_VT", "Figura_Efeito_Acoplamento.png")

BG       = "#0D1117"
COL_VT   = "#00B4DC"   # VT traction - cyan
COL_VR   = "#FF3333"   # VR vectors - red
COL_RING = "#90A4AE"   # ring body
COL_KSTEEP = "#FFEB3B" # K-steep axis - yellow
COL_KNEW   = "#FF6B35" # new (wrong) axis - orange
COL_INC    = "#F44336" # incision wrong - red
COL_TEXT = "#FFFFFF"
COL_DIM  = "#78909C"
COL_TISS = "#1A2332"
COL_WARN = "#FF5722"   # warning orange-red

fig, axes = plt.subplots(1, 2, figsize=(16, 10), facecolor=BG)

def draw_scenario(ax, ring_angle_offset, title, subtitle):
    """Draw the cornea top-down with ICRS at ring_angle_offset from K-steep."""
    ax.set_facecolor(BG)
    ax.set_aspect('equal')

    R_LIMBUS = 6.0
    R_RING   = 3.2
    ARC_ANGLE = 160

    # Background tissue
    th = np.linspace(0, 2 * np.pi, 360)
    ax.fill(R_LIMBUS * np.cos(th), R_LIMBUS * np.sin(th), color=COL_TISS, alpha=0.8, zorder=1)
    ax.plot(R_LIMBUS * np.cos(th), R_LIMBUS * np.sin(th), color='#37474F', lw=1.5, zorder=2)

    # Stromal fiber mesh — K-steep = HORIZONTAL (0 degrees)
    K_steep_angle = 0  # reference axis

    # Radial fibers (background mesh)
    for i in range(24):
        angle = i * np.pi / 12
        ax.plot([0, R_LIMBUS * 0.9 * np.cos(angle)],
                [0, R_LIMBUS * 0.9 * np.sin(angle)],
                color=COL_VR, lw=0.35, alpha=0.2, zorder=2)

    # --- K-steep axis (horizontal, the CORRECT axis the ring should address) ---
    ax.annotate('', xy=(R_LIMBUS * 1.05, 0), xytext=(-R_LIMBUS * 1.05, 0),
                arrowprops=dict(arrowstyle='<->', color=COL_KSTEEP, lw=2, mutation_scale=12,
                                linestyle='dashed'), zorder=5)
    ax.text(R_LIMBUS * 1.1, 0.2, 'K-steep\n(Eixo Correto)', color=COL_KSTEEP,
            fontsize=8.5, ha='left', va='center')

    # --- K-flat axis (vertical, 90 degrees) ---
    for sign, lbl in [(+1, 'K-flat'), (-1, '')]:
        ax.annotate('', xy=(0, sign * R_LIMBUS * 0.85), xytext=(0, -sign * 0.3),
                    arrowprops=dict(arrowstyle='->', color=COL_DIM, lw=1.2,
                                    mutation_scale=10, linestyle='dotted'), zorder=4)
    ax.text(0.2, R_LIMBUS * 0.9, 'K-flat', color=COL_DIM, fontsize=8, va='center')

    # --- ICRS ring arc at wrong angle ---
    # Ring is implanted at ring_angle_offset from K-steep
    ring_angle_rad = np.radians(ring_angle_offset)  # rotation of ring from K-steep

    # Arc spans ARC_ANGLE degrees, symmetric about ring_angle
    half_arc = ARC_ANGLE / 2
    theta_start_deg = ring_angle_offset - half_arc
    theta_end_deg   = ring_angle_offset + half_arc

    theta_arr = np.linspace(np.radians(theta_start_deg), np.radians(theta_end_deg), 200)

    # Ring tunnel outline
    R_TUN = 0.22
    ax.plot((R_RING + R_TUN) * np.cos(theta_arr), (R_RING + R_TUN) * np.sin(theta_arr),
            color='white', lw=0.8, alpha=0.5, zorder=6)
    ax.plot((R_RING - R_TUN) * np.cos(theta_arr), (R_RING - R_TUN) * np.sin(theta_arr),
            color='white', lw=0.8, alpha=0.5, zorder=6)

    # Ring body (filled band)
    for dr in np.linspace(-R_TUN * 0.8, R_TUN * 0.8, 6):
        alpha = 0.35 * (1 - (dr / R_TUN) ** 2)
        r = R_RING + dr
        ax.plot(r * np.cos(theta_arr), r * np.sin(theta_arr),
                color=COL_RING, lw=3, alpha=alpha, zorder=5)

    # --- Ring endpoints ---
    ts = np.radians(theta_start_deg)
    te = np.radians(theta_end_deg)
    edges = [(np.cos(ts), np.sin(ts), ts), (np.cos(te), np.sin(te), te)]

    for ex_n, ey_n, eth in edges:
        ex, ey = R_RING * ex_n, R_RING * ey_n
        # Edge marker
        ec = plt.Circle((ex, ey), R_TUN * 1.2, color='#FFEB3B', alpha=0.9, zorder=8)
        ax.add_patch(ec)

        # VT arrows (tangential at edge = perpendicular to radial)
        tan_x = -np.sin(eth)
        tan_y =  np.cos(eth)

        # Determine direction: away from center of arc
        # Center of arc is at ring_angle_rad
        if eth < ring_angle_rad:
            dx, dy = -tan_x, -tan_y
        else:
            dx, dy = tan_x, tan_y

        for scale, alpha_vt in [(1.2, 0.9), (2.0, 0.5)]:
            ax.annotate('', xy=(ex + dx * scale, ey + dy * scale),
                        xytext=(ex, ey),
                        arrowprops=dict(arrowstyle='->', color=COL_VT, lw=2.5,
                                        mutation_scale=20, alpha=alpha_vt), zorder=10)

    # --- Resulting stress axis from the VT arrows ---
    # The VT arrows project onto a new axis that is NOT K-steep
    # This new axis = perpendicular to the ring arc = at 90° to ring_angle
    new_axis_angle = ring_angle_offset + 90  # the "wrong" axis created

    if ring_angle_offset != 0:
        # Draw the NEW induced astigmatic axis
        new_angle_rad = np.radians(new_axis_angle)
        nax_len = R_LIMBUS * 0.85

        ax.plot([-nax_len * np.cos(new_angle_rad), nax_len * np.cos(new_angle_rad)],
                [-nax_len * np.sin(new_angle_rad), nax_len * np.sin(new_angle_rad)],
                color=COL_KNEW, lw=2.0, linestyle='--', alpha=0.8, zorder=7)

        # Angle annotation (arc showing the error)
        arc_patch = Arc((0, 0), R_RING * 0.6, R_RING * 0.6,
                        angle=0, theta1=min(0, ring_angle_offset + 90),
                        theta2=max(0, ring_angle_offset + 90),
                        color=COL_WARN, lw=2, zorder=9)
        ax.add_patch(arc_patch)

        # Angle label
        mid_err_angle = (ring_angle_offset + 90) / 2
        r_label = R_RING * 0.35
        ax.text(r_label * np.cos(np.radians(mid_err_angle)),
                r_label * np.sin(np.radians(mid_err_angle)),
                f'{abs(ring_angle_offset + 90)}°\nEfeito\nSIA', color=COL_WARN,
                fontsize=8, ha='center', fontweight='bold')

        # Wrong axis label
        ax.text(nax_len * 1.15 * np.cos(new_angle_rad),
                nax_len * 1.15 * np.sin(new_angle_rad),
                f'Eixo Induzido\n(SIA {ring_angle_offset}° errado)',
                color=COL_KNEW, fontsize=8, ha='center',
                bbox=dict(boxstyle='round,pad=0.3', facecolor=BG,
                          edgecolor=COL_KNEW, lw=0.8, alpha=0.9))

        # WRONG marker on ring
        ax.text(0, -R_LIMBUS * 0.5,
                f'INCISAO {ring_angle_offset}° FORA DO EIXO K-steep!\n'
                f'VT cria Cross-Cylinder no eixo {new_axis_angle}°\n'
                f'→ Astigmatismo INDUZIDO (SIA conflitante)',
                color=COL_WARN, fontsize=8.5, ha='center',
                bbox=dict(boxstyle='round,pad=0.4', facecolor='#1A0A00',
                          edgecolor=COL_WARN, lw=1.5, alpha=0.95), zorder=12)

        # Warning icon
        ax.text(-R_LIMBUS * 0.5, R_LIMBUS * 0.7, '⚠ ERRO', color=COL_WARN,
                fontsize=14, fontweight='bold', ha='center', zorder=12)

    else:
        # Correct alignment: VT and K-steep agree
        # Resulting axis = K-steep (correct)
        ax.text(0, -R_LIMBUS * 0.55,
                'ICRS alinhado com K-steep:\n'
                'VT age no meridiano correto\n'
                '→ Efeito máximo, zero SIA conflitante',
                color='#4CAF50', fontsize=9, ha='center',
                bbox=dict(boxstyle='round,pad=0.4', facecolor='#001A0A',
                          edgecolor='#4CAF50', lw=1.5, alpha=0.95), zorder=12)
        ax.text(-R_LIMBUS * 0.5, R_LIMBUS * 0.7, 'CORRETO', color='#4CAF50',
                fontsize=14, fontweight='bold', ha='center', zorder=12)

    # Ring angle indicator
    if ring_angle_offset != 0:
        # Show the ring orientation angle
        ax.plot([0, R_RING * 1.2 * np.cos(ring_angle_rad)],
                [0, R_RING * 1.2 * np.sin(ring_angle_rad)],
                color=COL_RING, lw=1.2, linestyle=':', alpha=0.7, zorder=6)
        ax.text(R_RING * 0.65 * np.cos(ring_angle_rad),
                R_RING * 0.65 * np.sin(ring_angle_rad),
                f'Anel\n{ring_angle_offset}°', color=COL_RING, fontsize=7.5, ha='center',
                bbox=dict(boxstyle='round,pad=0.2', facecolor=BG, alpha=0.7, edgecolor='none'))

    ax.set_xlim(-R_LIMBUS * 1.45, R_LIMBUS * 1.45)
    ax.set_ylim(-R_LIMBUS * 1.45, R_LIMBUS * 1.45)
    ax.axis('off')
    ax.set_title(title + '\n' + subtitle, color='white', fontsize=10, fontweight='bold', pad=10)

# Left panel: correct alignment (0 degrees)
draw_scenario(axes[0], ring_angle_offset=0,
              title='CENARIO A — Alinhamento Correto',
              subtitle='ICRS alinhado com K-steep → VT no eixo certo')

# Right panel: wrong alignment (45 degrees off)
draw_scenario(axes[1], ring_angle_offset=45,
              title='CENARIO B — Incisão Errada (45° fora do eixo)',
              subtitle='ICRS girado 45° → VT cria Cross-Cylinder → SIA conflitante')

# Add vertical divider
fig.text(0.505, 0.5, 'vs', color='white', fontsize=20, fontweight='bold',
         ha='center', va='center', transform=fig.transFigure)

# --- Common legend ---
from matplotlib.lines import Line2D
legend_elements = [
    Line2D([0], [0], color=COL_VT, lw=2.5, label='Vetor Tangencial (VT) — tração nas extremidades'),
    Line2D([0], [0], color=COL_KSTEEP, lw=2, linestyle='--', label='Eixo K-steep correto (a tratar)'),
    Line2D([0], [0], color=COL_KNEW, lw=2, linestyle='--', label='Eixo astigmático induzido (SIA errado)'),
    mpatches.Patch(facecolor=COL_RING, edgecolor='white', label='Anel ICRS (160°)'),
    mpatches.Patch(facecolor='#FFEB3B', edgecolor='black', label='Extremidades do anel (VT máximo)'),
]
fig.legend(handles=legend_elements, loc='lower center', ncol=3,
           facecolor='#161B22', edgecolor='#37474F', labelcolor='white',
           fontsize=8.5, framealpha=0.95, bbox_to_anchor=(0.5, 0.01))

fig.suptitle('Figura 5.3 — Efeito do VT na Incisão Errada: Astigmatismo Induzido (Efeito Nida)\n'
             'A direção da incisão de entrada determina o eixo de ação do Vetor Tangencial',
             color='white', fontsize=12, fontweight='bold', y=0.99)

plt.tight_layout(rect=[0, 0.08, 1, 0.97])
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
