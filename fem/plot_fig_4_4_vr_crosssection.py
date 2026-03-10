"""
Figura 4.4 — Vetor Radial em Corte Transversal
Atlas Vetorial ICRS — cornea_specialist_claude Skill
"""
import numpy as np
import matplotlib.pyplot as plt
import os

# ─── Parâmetros ──────────────────────────────────────────────────────
CT = 580       # espessura cornea (µm)
W  = 12000     # largura 12mm  
ICRS_D = 0.80  # 80% profundidade
ICRS_B = 200   # base anel µm
ICRS_H = 250   # altura perfil triangular µm
ICRS_X = 2800  # posição radial µm (raio ~5.6mm zona)

# Cores (cornea_specialist_claude palette)
C_EPI = '#B3D9FF';  C_BOW = '#E8E0D0';  C_STR_A = '#F5ECD7'
C_STR_P = '#EDD9B0'; C_DES = '#F0C070'; C_END = '#FFB3B3'
C_ICRS = '#C0C0C0'; C_VR = '#EF4444'; C_IOP = '#F97316'
C_VE = '#7C3AED'; C_FIB = '#8B5E3C'

# ─── Coordenadas ─────────────────────────────────────────────────────
hw = W / 2
N = 500
x = np.linspace(-hw, hw, N)

# Posterior: y=0 no vértice
R_p = 6400.0
y_post = R_p - np.sqrt(np.maximum(R_p**2 - x**2, 0))

# Anterior: elevada por CT
R_a = 7800.0
y_ant = CT + R_a - np.sqrt(np.maximum(R_a**2 - x**2, 0))

# Anterior PÓS-ICRS: leve depressão sobre o anel
y_ant2 = y_ant.copy()
for s in [-1, 1]:
    dep = 15 * np.exp(-((x - s*ICRS_X) / 350)**2)
    y_ant2 -= dep

# Profundidade do anel (escalar)
yd = float(CT * ICRS_D)  # 464 µm

# ─── Figura ──────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(14, 7), facecolor='#0a0e17')
ax.set_facecolor('#0a0e17')

# Camadas
ax.fill_between(x, y_post-5, y_post+5, color=C_END, alpha=0.8)
ax.plot(x, y_post, color='#D94040', lw=1.5, label='Endotélio')
ax.fill_between(x, y_post+5, y_post+17, color=C_DES, alpha=0.6)
ax.fill_between(x, y_post+17, y_post+CT*0.33, color=C_STR_P, alpha=0.5)
ax.fill_between(x, y_post+CT*0.33, y_ant2-60, color=C_STR_A, alpha=0.5)
ax.fill_between(x, y_ant2-60, y_ant2-48, color=C_BOW, alpha=0.8)
ax.fill_between(x, y_ant2-48, y_ant2, color=C_EPI, alpha=0.7)

# Superfícies
ax.plot(x, y_ant, '--', color='#9CA3AF', lw=1.2, alpha=0.6, label='Pré-ICRS')
ax.plot(x, y_ant2, '-', color='white', lw=2.0, label='Pós-ICRS (aplainada)')

# ICRS triangulares
for s in [-1, 1]:
    cx = float(s * ICRS_X)
    verts = np.array([[cx-ICRS_B/2, yd], [cx+ICRS_B/2, yd], [cx, yd+ICRS_H]])
    tri = plt.Polygon(verts, closed=True, fc=C_ICRS, ec='#808080', lw=2, zorder=10)
    ax.add_patch(tri)
    ax.text(cx, yd-35, f'80%\n({int(CT*0.8)}µm)', fontsize=7, color='#CBD5E1',
            ha='center', va='top', fontfamily='sans-serif')

# Fibras estromais
for i in range(18):
    fx = np.linspace(-hw*0.85, hw*0.85, N)
    df = 0.15 + 0.7*(i/17)
    fy = np.interp(fx, x, y_post) + CT * df
    fy += 8*np.sin(fx/300 + i*0.5)
    for s in [-1, 1]:
        m = np.abs(fx - s*ICRS_X) < ICRS_B*1.5
        if df > 0.75:
            fy[m] += ICRS_H*0.5*np.exp(-((fx[m]-s*ICRS_X)/(ICRS_B*0.8))**2)
    ax.plot(fx, fy, color=C_FIB, lw=0.5, alpha=0.2+0.15*(1-df))

# Setas VR (centrífugas: centro → anel)
for s in [-1, 1]:
    cx = float(s * ICRS_X)
    ay = float(np.interp(0, x, y_post) + CT*0.55)
    ax.annotate('', xy=(cx-s*200, ay), xytext=(cx-s*1000, ay),
                arrowprops=dict(arrowstyle='->', color=C_VR, lw=3, mutation_scale=25))
    ax.text(cx-s*600, ay+50, 'VR', fontsize=14, fontweight='bold',
            color=C_VR, ha='center', fontfamily='sans-serif')

# Vetor Endotelial (roxo, para baixo)
for s in [-1, 1]:
    cx = float(s * ICRS_X)
    for off in [-150, 150]:
        ax.annotate('', xy=(cx+off, yd+ICRS_H+10), xytext=(cx+off, yd+ICRS_H+130),
                    arrowprops=dict(arrowstyle='->', color=C_VE, lw=2.5, mutation_scale=20))

# PIO (laranja, para cima)
y0 = float(np.interp(0, x, y_post))
for xp in [-2000, 0, 2000]:
    ax.annotate('', xy=(xp, y0+80), xytext=(xp, y0-80),
                arrowprops=dict(arrowstyle='->', color=C_IOP, lw=2, mutation_scale=18))
ax.text(0, y0-120, 'PIO (+Z)', fontsize=10, fontweight='bold', color=C_IOP,
        ha='center', va='top', fontfamily='sans-serif')

# Anotação aplainamento
idx_icrs = np.argmin(np.abs(x - ICRS_X))
ax.annotate('APLAINAMENTO\n(Vetor Endotelial ↓ vs PIO ↑)',
            xy=(ICRS_X, float(y_ant2[idx_icrs])),
            xytext=(ICRS_X+1500, float(y_ant2.max())+80),
            fontsize=9, color=C_VE, fontweight='bold', fontfamily='sans-serif',
            arrowprops=dict(arrowstyle='->', color=C_VE, lw=1.5))

# Escala
sx = -hw+500; sy = y0-200
ax.plot([sx, sx+1000], [sy, sy], color='white', lw=2)
ax.text(sx+500, sy-30, '1 mm', fontsize=8, color='white', ha='center', fontfamily='sans-serif')

# Título e legenda
ax.set_title('Figura 4.4 — Vetor Radial (VR) em Corte Transversal\n'
             'ICRS a 80% de profundidade · Proporção real 200/580 µm · Aplainamento sobre o anel',
             fontsize=13, fontweight='bold', color='white', fontfamily='sans-serif', pad=15)
ax.legend(loc='upper left', fontsize=8, facecolor='#111827', edgecolor='#1e293b',
          labelcolor='#e2e8f0', framealpha=0.9)
ax.set_xlim(-hw-500, hw+500)
ax.set_aspect('equal')
ax.axis('off')

plt.tight_layout()
out = r'c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-004_Vetor_Radial\fig_4_4_vetor_radial_corte_pt.png'
os.makedirs(os.path.dirname(out), exist_ok=True)
plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#0a0e17')
plt.close()
print(f"[OK] Figura 4.4 salva em: {out}")
