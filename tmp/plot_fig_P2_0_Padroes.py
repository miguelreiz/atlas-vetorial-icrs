"""
Fig P2.0 — Atlas dos 5 Padrões de Deformação
Atlas Vetorial ICRS — P1
Mapas realistas de topografia Plácido.
"""

import numpy as np
import matplotlib.pyplot as plt
import os

# Paths
BASE = r"C:\Users\Miguel Reis\Documents\Vetores corneanos"
OUT  = os.path.join(BASE, "images", "P1-02_Padroes", "Figura_Atlas_5_Padroes.png")

BG = "#0D1117"

fig, axes = plt.subplots(1, 5, figsize=(18, 4), facecolor=BG)
for ax in axes:
    ax.set_facecolor("black")
    ax.set_aspect('equal')
    ax.axis('off')

# Grid
x = np.linspace(-6, 6, 200)
y = np.linspace(-6, 6, 200)
X, Y = np.meshgrid(x, y)

def apply_placido(ax, Z, title, Kmax, vector_text):
    # Contour colors (Topography map)
    topomap = ax.contourf(X, Y, Z, levels=np.linspace(35, 75, 40), cmap='turbo', extend='both', alpha=0.95)
    
    # Black concentric lines to simulate Placido
    # Placido rings are contours of constant curvature, but in real eyes they are reflection of rings.
    # We can just draw radial elevation contours.
    ax.contour(X, Y, np.sqrt(X**2 + Y**2 + Z*0.2), levels=15, colors='black', linewidths=0.8, alpha=0.5)
    
    # Limbal boundary
    circle = plt.Circle((0, 0), 5.5, color='white', fill=False, lw=1.5, ls='--')
    ax.add_patch(circle)
    
    ax.set_title(title, color='white', fontsize=12, fontweight='bold', pad=10)
    ax.text(0, -6.5, f"Kmax: {Kmax} D\n{vector_text}", color='white', ha='center', va='top', fontsize=10)

# P1 - Nipple (Central Circular)
Z1 = 43 + 28 * np.exp(-((X)**2 + (Y)**2) / 3.0)
apply_placido(axes[0], Z1, "P1: Circular (Nipple)", "71.0", "Domina o Vetor Radial\nProlapso simétrico")

# P2 - Oval (Inferior Sagging)
Z2 = 42 + 25 * np.exp(-((X)**2 / 4.0 + (Y+1.5)**2 / 6.0))
apply_placido(axes[1], Z2, "P2: Oval (Sagging)", "67.0", "Domina Vetor Tangencial\nAcoplamento e Redução")

# P3 - Duck (Assimétrico, 2 Lóbulos)
Z3 = 41 + 22 * np.exp(-((X-1)**2 / 5.0 + (Y+2)**2 / 3.0)) + 15 * np.exp(-((X+2)**2 / 3.0 + (Y-1)**2 / 4.0))
apply_placido(axes[2], Z3, "P3: Pato (Duck)", "63.0", "Assimetria Máxima\nDomina: VComa e Torque")

# P4 - Snowman (Duplo Cone Vertical)
Z4 = 42 + 20 * np.exp(-((X)**2 / 6.0 + (Y+3)**2 / 2.0)) + 18 * np.exp(-((X)**2 / 6.0 + (Y-2)**2 / 2.0))
apply_placido(axes[3], Z4, "P4: Boneco (Snowman)", "62.0", "Tração no meridiano X\nDomina: VR bipolar")

# P5 - Complexo (Fragmentado)
Z5 = 44 + 20 * np.exp(-((X+1)**2 / 4.0 + (Y+1)**2 / 4.0)) + 10 * np.exp(-((X-2)**2 / 2.0 + (Y-2)**2 / 2.0)) + 12 * np.exp(-((X+1.5)**2 / 1.5 + (Y-2.5)**2 / 1.5))
apply_placido(axes[4], Z5, "P5: Complexo", "64.0", "Matriz caótica\nICRS frequentemente ineficaz")

fig.suptitle('Figura P2.0 — Atlas Vetorial dos 5 Padrões Ectásicos no Topógrafo de Plácido',
             color='white', fontsize=16, fontweight='bold', y=1.05)

plt.tight_layout()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
plt.savefig(OUT, dpi=200, bbox_inches='tight', facecolor=BG)
print(f"Salvo: {OUT}")
plt.close()
