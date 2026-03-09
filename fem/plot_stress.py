import numpy as np
import matplotlib.pyplot as plt
import csv
import os

print("Lendo tensões Von Mises do FEBio...")

# 1. Coordenadas originais dos nos (usando os mesmos do gerador/plot_febio)
R_ANT = 7.8
DIAM = 12.0
N_RING = 20
N_SEC = 24

nodes = {}
nid = 1
for i in range(N_RING + 1):
    r_frac = i / N_RING
    r_plane = (DIAM / 2) * r_frac
    if r_plane >= R_ANT: r_plane = R_ANT * 0.99
    phi = np.arcsin(r_plane / R_ANT)
    for j in range(N_SEC):
        theta = 2 * np.pi * j / N_SEC
        nodes[nid] = {
            'x': R_ANT * np.sin(phi) * np.cos(theta),
            'y': R_ANT * np.sin(phi) * np.sin(theta),
            'r': r_plane,
            'th': theta
        }
        nid += 1
        if r_frac == 0: break # Apex só uma vez
# Apex
# nodes[nid] = {'x': 0.0, 'y': 0.0, 'r': 0.0, 'th': 0.0} # Já inserido no loop acima (r_frac=0)

# 2. Ler tensões do CSV
sfile = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\fem\stress_out.csv'
stresses = {}
if os.path.exists(sfile):
    with open(sfile, 'r') as f:
        current_step = -1
        target_step = 1 # O passo final da simulação
        read_data = False
        for line in f:
            if line.startswith('*Step'):
                current_step = int(line.split('=')[1].strip())
                if current_step == target_step:
                    read_data = True
                else:
                    read_data = False
                continue
            
            if read_data and not line.startswith('*'):
                parts = line.strip().split(',')
                if len(parts) >= 4:
                    try:
                        nd = int(parts[0])
                        sx = float(parts[1])
                        sy = float(parts[2])
                        sxy = float(parts[3])
                        # Von Mises 2D: sqrt(sx^2 - sx*sy + sy^2 + 3*sxy^2)
                        vm = np.sqrt(sx**2 - sx*sy + sy**2 + 3*sxy**2)
                        stresses[nd] = vm
                        if nd in nodes:
                            nodes[nd]['stress'] = vm
                    except:
                        pass

print(f"Tensões lidas para o Step {target_step}: {len(stresses)}")

# 3. Preparar dados para plotagem
px = [n['x'] for n in nodes.values() if 'stress' in n]
py = [n['y'] for n in nodes.values() if 'stress' in n]
ps = [n['stress'] for n in nodes.values() if 'stress' in n]

if not ps:
    print("Nenhum dado de tensão encontrado para plotagem.")
    exit()

# 4. Plotar
plt.figure(figsize=(10, 8), facecolor='#0D1117')
ax = plt.gca()
ax.set_facecolor('#0D1117')

# Mapa de Tensão
contour = plt.tricontourf(px, py, ps, levels=50, cmap='hot')
cb = plt.colorbar(contour)
cb.set_label('Tensão Equivalente Von Mises (MPa)', color='white')
cb.ax.yaxis.set_tick_params(color='white')
plt.setp(plt.getp(cb.ax.axes, 'yticklabels'), color='white')

plt.title('Mapa de Tensão Estromal (FEBio) — Von Mises\nPico de Tensão Convergente no Quadrante IT', color='white', pad=20)
plt.axis('equal')
plt.axis('off')

# Marcar zona IT
theta_it = np.linspace(np.radians(210), np.radians(300), 50)
x_it = 5.8 * np.cos(theta_it)
y_it = 5.8 * np.sin(theta_it)
plt.plot(x_it, y_it, color='cyan', lw=2, alpha=0.5, label='Zona de Fraqueza IT')

# Plotar o pico de tensão
max_idx = np.nanargmax(ps)
plt.plot(px[max_idx], py[max_idx], 'o', color='white', markersize=8, label='Pico de Stress')

plt.legend(facecolor='#161B22', edgecolor='white', labelcolor='white')

out_path = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-003_Classificacao\Figura_3.8_VonMises_Stress.png'
plt.savefig(out_path, dpi=200, bbox_inches='tight', facecolor='#0D1117')
print(f"Mapa de Stress salvo em: {out_path}")
