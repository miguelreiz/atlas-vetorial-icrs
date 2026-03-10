"""
Figura 5.1 - Coupling Effect na Malha de Colageno
Atlas Vetorial ICRS - cornea_specialist_claude Skill
Top-down + transversal mostrando acoplamento ortogonal
"""
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import os

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8), facecolor='#0a0e17',
                                gridspec_kw={'width_ratios': [1, 1]})

# Cores
C_VR = '#EF4444'; C_VT = '#3B82F6'; C_STEEP = '#FF6B6B'; C_FLAT = '#60A5FA'
C_RING = '#C0C0C0'; C_FIB = '#8B5E3C'; C_BG = '#0a0e17'

# ═══════════════════════════════════════════════════════════════════════
# PAINEL ESQUERDO: Vista TOP-DOWN (Superior)
# ═══════════════════════════════════════════════════════════════════════
ax1.set_facecolor(C_BG)
ax1.set_aspect('equal')

# Cornea circular
theta = np.linspace(0, 2*np.pi, 100)
r_cornea = 6.0  # mm
ax1.plot(r_cornea*np.cos(theta), r_cornea*np.sin(theta),
         color='#334155', lw=2, ls='--', label='Limbo')

# Zona optica
r_oz = 3.0
ax1.plot(r_oz*np.cos(theta), r_oz*np.sin(theta),
         color='#1E293B', lw=1, ls=':')

# ICRS arco (160 graus, no meridiano horizontal = K-steep)
arc_start = -80 * np.pi/180
arc_end = 80 * np.pi/180
t_arc = np.linspace(arc_start, arc_end, 50)
r_icrs = 2.75  # raio do canal
ax1.plot(r_icrs*np.cos(t_arc), r_icrs*np.sin(t_arc),
         color=C_RING, lw=8, solid_capstyle='round', zorder=5, label='ICRS (K-steep)')

# Malha de fibras radiais (vermelhas) no eixo do anel (horizontal)
for i in range(-5, 6):
    y_off = i * 0.4
    xf = np.linspace(-5.5, 5.5, 100)
    # Fibras horizontais (no meridiano K-steep)
    ax1.plot(xf, np.ones_like(xf)*y_off + 0.05*np.sin(xf*3),
             color=C_VR, lw=0.6, alpha=0.3)

# Fibras tangenciais/cruzadas (azuis) no eixo perpendicular (vertical)
for i in range(-5, 6):
    x_off = i * 0.4
    yf = np.linspace(-5.5, 5.5, 100)
    ax1.plot(np.ones_like(yf)*x_off + 0.05*np.sin(yf*3), yf,
             color=C_VT, lw=0.6, alpha=0.3)

# Setas: Traction no K-steep (horizontal, para fora)
for s in [-1, 1]:
    ax1.annotate('', xy=(s*4.5, 0), xytext=(s*2.5, 0),
                 arrowprops=dict(arrowstyle='->', color=C_STEEP, lw=3, mutation_scale=25))
    ax1.text(s*4.8, 0.3, 'APLAINA', fontsize=8, color=C_STEEP,
             ha='center', fontweight='bold', fontfamily='sans-serif')

# Setas: Relaxamento no K-flat (vertical, para dentro = encurva)
for s in [-1, 1]:
    ax1.annotate('', xy=(0, s*3.5), xytext=(0, s*5.0),
                 arrowprops=dict(arrowstyle='->', color=C_FLAT, lw=3, mutation_scale=25))
    ax1.text(0.4, s*4.5, 'ENCURVA\n(steepens)', fontsize=7, color=C_FLAT,
             ha='left', fontweight='bold', fontfamily='sans-serif')

# Labels dos eixos
ax1.text(5.8, -0.5, 'K-steep\n(meridiano do anel)', fontsize=8, color=C_STEEP,
         ha='center', fontfamily='sans-serif', fontweight='bold')
ax1.text(-0.5, 5.8, 'K-flat\n(90 graus)', fontsize=8, color=C_FLAT,
         ha='center', fontfamily='sans-serif', fontweight='bold')

ax1.set_xlim(-7, 7); ax1.set_ylim(-7, 7)
ax1.set_title('Vista Superior (Top-Down)\nAcoplamento na Malha de Colageno',
              fontsize=12, fontweight='bold', color='white', fontfamily='sans-serif')
ax1.axis('off')

# ═══════════════════════════════════════════════════════════════════════
# PAINEL DIREITO: Esquema conceitual Antes/Depois
# ═══════════════════════════════════════════════════════════════════════
ax2.set_facecolor(C_BG)

# ANTES (metade superior)
ax2.text(0.5, 0.97, 'ANTES (Astigmatismo)', fontsize=12, fontweight='bold',
         color='white', ha='center', va='top', transform=ax2.transAxes,
         fontfamily='sans-serif')

# Elipse (cornea astigmatica)
ell_before = mpatches.Ellipse((0.25, 0.75), 0.35, 0.2, angle=0,
                               fill=False, ec='#EF4444', lw=2, ls='--',
                               transform=ax2.transAxes)
ax2.add_patch(ell_before)
ax2.text(0.25, 0.62, 'K-steep: 48D\nK-flat: 42D\nCil = 6D', fontsize=8,
         color='#94A3B8', ha='center', transform=ax2.transAxes, fontfamily='sans-serif')

# DEPOIS (metade inferior)
ax2.text(0.5, 0.48, 'DEPOIS (Anel no K-steep)', fontsize=12, fontweight='bold',
         color='white', ha='center', va='top', transform=ax2.transAxes,
         fontfamily='sans-serif')

# Circulo (mais regular)
circ_after = mpatches.Ellipse((0.25, 0.28), 0.28, 0.25, angle=0,
                               fill=False, ec='#22C55E', lw=2,
                               transform=ax2.transAxes)
ax2.add_patch(circ_after)
ax2.text(0.25, 0.12, 'K-steep: 45D (-3D)\nK-flat: 44D (+2D)\nCil = 1D', fontsize=8,
         color='#22C55E', ha='center', transform=ax2.transAxes, fontfamily='sans-serif')

# Seta de transicao
ax2.annotate('', xy=(0.6, 0.35), xytext=(0.6, 0.6),
             arrowprops=dict(arrowstyle='->', color='#F59E0B', lw=2.5, mutation_scale=20),
             transform=ax2.transAxes)
ax2.text(0.72, 0.48, 'Efeito\nAcoplamento\n(Poisson)', fontsize=8, color='#F59E0B',
         ha='center', va='center', transform=ax2.transAxes, fontfamily='sans-serif',
         fontweight='bold')

# Legenda
handles = [
    mpatches.Patch(color=C_VR, label='Fibras radiais (K-steep)'),
    mpatches.Patch(color=C_VT, label='Fibras tangenciais (K-flat)'),
    mpatches.Patch(color=C_RING, label='ICRS (anel)'),
]
ax2.legend(handles=handles, loc='lower right', fontsize=7, facecolor='#111827',
           edgecolor='#1E293B', labelcolor='#E2E8F0')

ax2.set_title('Redistribuicao Tensional\nPoisson + Conservacao de Volume',
              fontsize=12, fontweight='bold', color='white', fontfamily='sans-serif')
ax2.axis('off')

plt.suptitle('Figura 5.1 - O Mecanismo de Acoplamento na Malha de Colageno',
             fontsize=14, fontweight='bold', color='white', fontfamily='sans-serif', y=0.02)
plt.tight_layout(rect=[0, 0.04, 1, 1])

out = r'c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-005_VT\Figura_Coupling_Collagen.png'
os.makedirs(os.path.dirname(out), exist_ok=True)
plt.savefig(out, dpi=300, bbox_inches='tight', facecolor=C_BG)
plt.close()
print(f"[OK] Figura 5.1 salva em: {out}")
