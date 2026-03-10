"""
Figura 5.2 - Dinamica da Tracao Tangencial no Estroma
Atlas Vetorial ICRS - cornea_specialist_claude Skill
Top-down: pontas do anel geram VT, corpo central eh ancoragem passiva
"""
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import os

fig, ax = plt.subplots(figsize=(12, 12), facecolor='#0a0e17')
ax.set_facecolor('#0a0e17')
ax.set_aspect('equal')

# Cores
C_VT = '#00B4DC'; C_RING = '#C0C0C0'; C_FIB = '#8B5E3C'
C_EDGE = '#FF6B6B'; C_CENTER = '#6B7280'; C_LIMBO = '#334155'

# Cornea + limbo
theta = np.linspace(0, 2*np.pi, 200)
r_cornea = 6.0
ax.plot(r_cornea*np.cos(theta), r_cornea*np.sin(theta),
        color=C_LIMBO, lw=2, ls='--', label='Limbo (12mm)')

# Zona optica
r_oz = 3.0
ax.plot(r_oz*np.cos(theta), r_oz*np.sin(theta),
        color='#1E293B', lw=1, ls=':', alpha=0.5)
ax.text(0, 0, 'Zona\nOptica', fontsize=8, color='#475569',
        ha='center', fontfamily='sans-serif')

# Malha de fibras (background)
for i in range(-12, 13):
    off = i * 0.5
    xf = np.linspace(-5.8, 5.8, 100)
    ax.plot(xf, np.ones_like(xf)*off, color=C_FIB, lw=0.3, alpha=0.15)
    ax.plot(np.ones_like(xf)*off, xf, color=C_FIB, lw=0.3, alpha=0.15)

# ICRS arco inferior (160 graus, posicao 6h)
r_icrs = 2.75
arc_center = -np.pi/2  # 6 horas
arc_half = 80 * np.pi / 180
t_arc = np.linspace(arc_center - arc_half, arc_center + arc_half, 80)

# Corpo do anel (cinza = ancoragem passiva)
ax.plot(r_icrs*np.cos(t_arc), r_icrs*np.sin(t_arc),
        color=C_CENTER, lw=10, solid_capstyle='butt', zorder=5, alpha=0.6)

# Pontas do anel (vermelho = foco de tensao VT)
n_edge = 8
# Ponta esquerda
t_left = np.linspace(arc_center - arc_half, arc_center - arc_half + arc_half*0.15, n_edge)
ax.plot(r_icrs*np.cos(t_left), r_icrs*np.sin(t_left),
        color=C_EDGE, lw=12, solid_capstyle='round', zorder=6)

# Ponta direita
t_right = np.linspace(arc_center + arc_half - arc_half*0.15, arc_center + arc_half, n_edge)
ax.plot(r_icrs*np.cos(t_right), r_icrs*np.sin(t_right),
        color=C_EDGE, lw=12, solid_capstyle='round', zorder=6)

# Labels das pontas
for t_edge, label_off in [(t_left[-1], (-0.8, 0.4)), (t_right[-1], (0.8, 0.4))]:
    ex, ey = r_icrs*np.cos(t_edge), r_icrs*np.sin(t_edge)
    ax.annotate('Ponta\n(stress\nmaximo)', xy=(ex, ey),
                xytext=(ex + label_off[0]*2, ey + label_off[1]*2),
                fontsize=7, color=C_EDGE, fontweight='bold', fontfamily='sans-serif',
                ha='center',
                arrowprops=dict(arrowstyle='->', color=C_EDGE, lw=1.5))

# Label do corpo
ax.text(0, -r_icrs - 0.4, 'Corpo (ancoragem passiva)', fontsize=8,
        color=C_CENTER, ha='center', fontfamily='sans-serif', fontweight='bold')

# Setas VT (ciano) - saindo das pontas tangencialmente
for t_edge, direction in [(arc_center - arc_half, -1), (arc_center + arc_half, 1)]:
    ex, ey = r_icrs*np.cos(t_edge), r_icrs*np.sin(t_edge)
    # Tangente ao arco
    tx = -np.sin(t_edge) * direction
    ty = np.cos(t_edge) * direction
    mag = 2.0
    
    # Seta VT principal
    ax.annotate('', xy=(ex + tx*mag, ey + ty*mag), xytext=(ex, ey),
                arrowprops=dict(arrowstyle='->', color=C_VT, lw=3.5, mutation_scale=28),
                zorder=8)
    
    # Setas VT secundarias (fibras sendo puxadas)
    for frac in [0.4, 0.7]:
        fx = ex + tx*mag*frac
        fy = ey + ty*mag*frac
        ax.annotate('', xy=(fx + tx*0.6, fy + ty*0.6), xytext=(fx, fy),
                    arrowprops=dict(arrowstyle='->', color=C_VT, lw=1.5,
                                    mutation_scale=15, alpha=0.5))

# Label VT
ax.text(-4.5, -4.5, 'VT', fontsize=24, fontweight='bold', color=C_VT,
        fontfamily='sans-serif', alpha=0.8)
ax.text(-4.5, -5.2, 'Vetor Tangencial', fontsize=10, color=C_VT,
        fontfamily='sans-serif')

# Legenda visual
handles = [
    mpatches.Patch(color=C_EDGE, label='Pontas (Foco do VT)'),
    mpatches.Patch(color=C_CENTER, label='Corpo (Ancoragem Passiva)'),
    plt.Line2D([0], [0], color=C_VT, lw=3, label='Vetor Tangencial (VT)'),
    plt.Line2D([0], [0], color=C_FIB, lw=1, label='Malha de Colageno'),
]
ax.legend(handles=handles, loc='upper right', fontsize=8, facecolor='#111827',
          edgecolor='#1E293B', labelcolor='#E2E8F0')

ax.set_xlim(-7, 7); ax.set_ylim(-7, 7)
ax.set_title('Figura 5.2 - Dinamica da Tracao Tangencial\n'
             'As pontas do anel geram o stress direcional (VT), o corpo atua como ancora',
             fontsize=13, fontweight='bold', color='white', fontfamily='sans-serif', pad=15)
ax.axis('off')

plt.tight_layout()
out = r'c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-005_VT\Figura_Tangential_Traction.png'
os.makedirs(os.path.dirname(out), exist_ok=True)
plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#0a0e17')
plt.close()
print(f"[OK] Figura 5.2 salva em: {out}")
