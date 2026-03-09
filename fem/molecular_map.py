import numpy as np
import matplotlib.pyplot as plt

def generate_molecular_maps():
    print("Gerando Mapas Moleculares e Celulares (FASE 4)...")
    
    # Grid
    res = 100
    x = np.linspace(-6, 6, res)
    y = np.linspace(-6, 6, res)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    Mask = R <= 6.0
    
    fig, axes = plt.subplots(2, 2, figsize=(12, 12), facecolor='#0D1117')
    fig.suptitle('Marcadores Moleculares e Celulares no KC\nVulnerabilidade Biológica Convergente no Setor IT', 
                 color='white', size=16, y=0.95)
    
    # Centro da lesão IT
    cx, cy = 2.0, -2.5
    
    # 1. MMP-9 Expression (High in IT due to chronic shear/rubbing)
    mmp9 = np.ones_like(X) * 0.2
    mmp9 += np.exp(-((X-cx)**2 + (Y-cy)**2) / 4.0) * 0.8
    mmp9 = mmp9 * Mask
    ax1 = axes[0, 0]
    im1 = ax1.pcolormesh(X, Y, mmp9, cmap='magma', shading='auto')
    ax1.set_title('Expressão de MMP-9 (Enzima Degradativa)', color='white')
    ax1.axis('equal'); ax1.axis('off')
    
    # 2. Densidade de Ceratócitos (Sparse in IT due to apoptosis)
    keratocytes = np.ones_like(X) * 1.0
    keratocytes -= np.exp(-((X-cx)**2 + (Y-cy)**2) / 3.0) * 0.6
    keratocytes = keratocytes * Mask
    ax2 = axes[0, 1]
    im2 = ax2.pcolormesh(X, Y, keratocytes, cmap='viridis', shading='auto')
    ax2.set_title('Densidade de Ceratócitos (Apoptose Focal)', color='white')
    ax2.axis('equal'); ax2.axis('off')
    
    # 3. Crosslinks de Colágeno (Low in IT)
    crosslinks = np.ones_like(X) * 1.0
    crosslinks -= np.exp(-((X-cx)**2 + (Y-cy)**2) / 5.0) * 0.5
    crosslinks = crosslinks * Mask
    ax3 = axes[1, 0]
    im3 = ax3.pcolormesh(X, Y, crosslinks, cmap='plasma', shading='auto')
    ax3.set_title('Densidade de Crosslinks (Piridinolina)', color='white')
    ax3.axis('equal'); ax3.axis('off')
    
    # 4. Padrão Epitelial "Donut"
    epithelium = np.ones_like(X) * 50.0 # 50 um normal
    # Afinamento sobre o cone
    epithelium -= np.exp(-((X-cx)**2 + (Y-cy)**2) / 2.0) * 15.0 
    # Espessamento ao redor (anel)
    donut_ring = np.exp(-((R - np.sqrt(cx**2 + cy**2))**2) / 2.0)
    epithelium += donut_ring * 8.0
    epithelium = epithelium * Mask
    
    ax4 = axes[1, 1]
    im4 = ax4.pcolormesh(X, Y, epithelium, cmap='coolwarm', shading='auto')
    ax4.set_title('Espessura Epitelial (Padrão Donut)', color='white')
    ax4.axis('equal'); ax4.axis('off')
    
    # Colorbars
    cbs = []
    for ax, im in zip(axes.flatten(), [im1, im2, im3, im4]):
        # Marcar centro IT
        ax.plot(cx, cy, 'w+', markersize=10, alpha=0.5)
        # Limites
        ax.set_xlim(-6, 6); ax.set_ylim(-6, 6)
        
    plt.tight_layout(rect=[0, 0.03, 1, 0.90])
    
    out_path = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-003_Classificacao\Figura_3.5_Molecular_IT.png'
    plt.savefig(out_path, dpi=200, bbox_inches='tight', facecolor='#0D1117')
    print(f"Mapas Moleculares salvos em: {out_path}")

if __name__ == "__main__":
    generate_molecular_maps()
