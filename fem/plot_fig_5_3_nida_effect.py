"""
Figura 5.3 - Efeito de Acoplamento em Incisao Errada (SIA Conflitante / Efeito Nida)
Atlas Vetorial ICRS - cornea_specialist_claude Skill
Vista top-down ilustrando o desastre biomecanico de implantar fora do K-steep
"""
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import os

fig, ax = plt.subplots(figsize=(10, 10), facecolor='#0a0e17')
ax.set_facecolor('#0a0e17')
ax.set_aspect('equal')

# Cores
C_STEEP_ORIG = '#EF4444'     # Vermelho (K-steep original)
C_FLAT_ORIG = '#60A5FA'      # Azul claro (K-flat original)
C_INCISION = '#FCD34D'       # Amarelo (Incisão)
C_ICRS = '#C0C0C0'           # Cinza (Anel)
C_VT = '#00B4DC'             # Ciano (Vetor Tangencial)
C_NEW_ASTIG = '#9333EA'      # Roxo (Novo asgtimatismo induzido)
C_BG = '#0a0e17'

# Cornea
theta = np.linspace(0, 2*np.pi, 200)
r_cornea = 6.0
ax.plot(r_cornea*np.cos(theta), r_cornea*np.sin(theta),
        color='#334155', lw=2, ls='--', label='Limbo')

# Eixos originais do paciente
# K-steep original a 0 graus (horizontal)
ax.plot([-5.5, 5.5], [0, 0], color=C_STEEP_ORIG, lw=2, ls='--', alpha=0.5)
ax.text(5.6, 0.2, 'K-steep\nOriginal', color=C_STEEP_ORIG, fontsize=9,
        fontweight='bold', va='bottom', ha='center', fontfamily='sans-serif')

# K-flat original a 90 graus (vertical)
ax.plot([0, 0], [-5.5, 5.5], color=C_FLAT_ORIG, lw=2, ls='--', alpha=0.5)
ax.text(0.2, 5.6, 'K-flat\nOriginal', color=C_FLAT_ORIG, fontsize=9,
        fontweight='bold', ha='left', va='center', fontfamily='sans-serif')

# O ERRO: Incisao feita a 45 graus (fora do eixo K-steep)
angle_err = 45 * np.pi/180
r_icrs = 2.75

# Eixo cirurgico errado
ax.plot([-5.5*np.cos(angle_err), 5.5*np.cos(angle_err)],
        [-5.5*np.sin(angle_err), 5.5*np.sin(angle_err)],
        color=C_INCISION, lw=1.5, ls=':')
ax.annotate('Eixo do ERRO\n(Incisão 45° off-axis)',
            xy=(5.0*np.cos(angle_err), 5.0*np.sin(angle_err)),
            xytext=(6.5*np.cos(angle_err), 6.5*np.sin(angle_err)),
            arrowprops=dict(arrowstyle='->', color=C_INCISION, lw=1.5),
            color=C_INCISION, fontsize=9, fontweight='bold', ha='center',
            fontfamily='sans-serif')

# Desenhar 2 segmentos ICRS (160 graus cada) baseados no eixo errado
arc_half = 75 * np.pi/180  # 150 graus de arco para deixar gap para incisao

# Anel Superior-Direito
t_anel1 = np.linspace(angle_err + 10*np.pi/180, angle_err + 10*np.pi/180 + 2*arc_half, 50)
ax.plot(r_icrs*np.cos(t_anel1), r_icrs*np.sin(t_anel1),
        color=C_ICRS, lw=8, solid_capstyle='round', zorder=5)

# Anel Inferior-Esquerdo
t_anel2 = np.linspace(angle_err + np.pi + 10*np.pi/180, angle_err + np.pi + 10*np.pi/180 + 2*arc_half, 50)
ax.plot(r_icrs*np.cos(t_anel2), r_icrs*np.sin(t_anel2),
        color=C_ICRS, lw=8, solid_capstyle='round', zorder=5)

# O Efeito VT (Vetores Tangenciais saindo das pontas)
# Anel 1
pt_a1_start = t_anel1[0]
pt_a1_end = t_anel1[-1]
# Anel 2
pt_a2_start = t_anel2[0]
pt_a2_end = t_anel2[-1]

# Setas VT (Ciano) alongando o tecido PARALELAMENTE aos aneis (rotacionando o astigmatismo)
mag_vt = 1.5
for pt, direc in [(pt_a1_start, -1), (pt_a1_end, 1), (pt_a2_start, -1), (pt_a2_end, 1)]:
    ex, ey = r_icrs*np.cos(pt), r_icrs*np.sin(pt)
    tx, ty = -np.sin(pt)*direc, np.cos(pt)*direc
    ax.annotate('', xy=(ex+tx*mag_vt, ey+ty*mag_vt), xytext=(ex, ey),
                arrowprops=dict(arrowstyle='->', color=C_VT, lw=3, mutation_scale=20), zorder=6)

# O Resultado Desastroso: O Acoplamento Ortogonal Errado
# Onde estica (eixo do erro 45 graus), afrouxa a 90 graus (135 graus)
# Criando elevação/encurvamento no eixo 135 graus ==> CILINDRO INDUZIDO
angle_coupling = angle_err + np.pi/2  # 135 graus

# Eixo do novo cilindro induzido (SIA)
ax.plot([-4.5*np.cos(angle_coupling), 4.5*np.cos(angle_coupling)],
        [-4.5*np.sin(angle_coupling), 4.5*np.sin(angle_coupling)],
        color=C_NEW_ASTIG, lw=4, zorder=4)

ax.annotate('NOVO ASTIGMATISMO\n(SIA Conflitante)',
            xy=(3.5*np.cos(angle_coupling), 3.5*np.sin(angle_coupling)),
            xytext=(5.5*np.cos(angle_coupling) + 1, 5.5*np.sin(angle_coupling) + 1),
            arrowprops=dict(arrowstyle='->', color=C_NEW_ASTIG, lw=2),
            color=C_NEW_ASTIG, fontsize=10, fontweight='bold', ha='center',
            fontfamily='sans-serif', bbox=dict(facecolor=C_BG, edgecolor=C_NEW_ASTIG, alpha=0.8, pad=5))

# Seta indicando forca de acoplamento para fora no eixo ortogonal (encurvamento)
for s in [-1, 1]:
    ex = s * 2.5 * np.cos(angle_coupling)
    ey = s * 2.5 * np.sin(angle_coupling)
    ax.annotate('', xy=(s * 4.0 * np.cos(angle_coupling), s * 4.0 * np.sin(angle_coupling)),
                xytext=(ex, ey),
                arrowprops=dict(arrowstyle='->', color=C_NEW_ASTIG, lw=2.5, mutation_scale=25, ls='dashed'))

# Bolhas de aviso central
ax.text(0, 1.2, '"EFEITO NIDA"', fontsize=14, fontweight='bold', color='white',
        ha='center', fontfamily='sans-serif')
ax.text(0, -0.2, 'O astigmatismo original é fatiado.\nO Acoplamento age no eixo cruzado\nerrado, criando dupla borboleta.',
        fontsize=9, color='#F87171', ha='center', va='top', fontfamily='sans-serif',
        bbox=dict(facecolor='#1e1b4b', edgecolor='#EF4444', alpha=0.8, boxstyle='round,pad=1.0'))

# Legenda
handles = [
    plt.Line2D([0], [0], color=C_STEEP_ORIG, lw=2, ls='--', label='K-steep Original'),
    plt.Line2D([0], [0], color=C_INCISION, lw=2, ls=':', label='Incisão Errada (Off-axis)'),
    mpatches.Patch(color=C_ICRS, label='Anel (Posição Errada)'),
    plt.Line2D([0], [0], color=C_VT, lw=3, label='Vetor Tangencial Esticando'),
    plt.Line2D([0], [0], color=C_NEW_ASTIG, lw=4, label='Novo Cilindro Induzido (Acoplamento a 90°)'),
]
ax.legend(handles=handles, loc='upper right', fontsize=8, facecolor='#111827',
          edgecolor='#1E293B', labelcolor='#E2E8F0')

ax.set_title('Figura 5.3 - O Desastre da Incisão no Eixo Errado\n'
             'Os Vetores Tangenciais impõem o efeito de acoplamento no meridiano errado, rasgando o astigmatismo.',
             fontsize=12, fontweight='bold', color='white', fontfamily='sans-serif', pad=15)

ax.set_xlim(-7, 7); ax.set_ylim(-7, 7)
ax.axis('off')

plt.tight_layout()
out = r'c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-005_VT\Figura_Efeito_Acoplamento.png'
os.makedirs(os.path.dirname(out), exist_ok=True)
plt.savefig(out, dpi=300, bbox_inches='tight', facecolor=C_BG)
plt.close()
print(f"[OK] Figura 5.3 salva em: {out}")
