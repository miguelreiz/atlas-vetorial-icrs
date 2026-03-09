import numpy as np
import matplotlib.pyplot as plt

def generate_external_forces_map():
    print("Gerando Mapa de Forças Externas Acumuladas...")
    
    # Grid de coordenadas (12mm de diametro)
    res = 100
    x = np.linspace(-6, 6, res)
    y = np.linspace(-6, 6, res)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    Mask = R <= 6.0
    
    # 1. Pressão Palpebral (H2)
    # Pico na regiao inferior/inferotemporal (Gatinel 2005)
    # Centro do pico: x=2.0 (temporal OD), y=-3.0 (inferior)
    eyelid = np.exp(-((X-2.0)**2 + (Y+3.0)**2) / 8.0)
    
    # 2. Eye Rubbing (H3)
    # Direção N->T (Nasal para Temporal). Pico no centro e IT.
    # Assumindo centro em x=1.5, y=-2.0
    rubbing = np.exp(-((X-1.5)**2 + (Y+2.0)**2) / 6.0) * 2.0 # Peso 2x
    
    # 3. Posição ao Dormir (H4)
    # Compressão lateral IT.
    sleep = np.exp(-((X-3.0)**2 + (Y+2.5)**2) / 10.0) * 1.5
    
    # Carga Total Acumulada
    Total_Load = (eyelid + rubbing + sleep) * Mask
    Total_Load /= np.max(Total_Load) # Normalizar
    
    # Plotar
    plt.figure(figsize=(10, 8), facecolor='#0D1117')
    plt.pcolormesh(X, Y, Total_Load, cmap='hot', shading='auto', alpha=0.9)
    cb = plt.colorbar()
    cb.set_label('Carga Mecânica Acumulada (Normalizada)', color='white')
    cb.ax.yaxis.set_tick_params(color='white')
    plt.setp(plt.getp(cb.ax.axes, 'yticklabels'), color='white')
    
    # Adicionar circulos de zonas 3, 5, 7, 9 mm
    angles = np.linspace(0, 2*np.pi, 100)
    for r in [3, 5, 7, 9]:
        plt.plot(r/2 * np.cos(angles), r/2 * np.sin(angles), 'w--', alpha=0.3)
        
    plt.title('Mapa de Carga Externa Acumulada (10 anos)\nConvergência Palpebral + Rubbing + Sono no Quadrante IT', 
              color='white', size=14, pad=20)
    
    plt.xlabel('Nasal ← (mm) → Temporal', color='white')
    plt.ylabel('Superior ← (mm) → Inferior', color='white')
    plt.axis('equal')
    plt.axis([-6, 6, -6, 6])
    
    # Marcar os componentes
    plt.text(2.5, -3.5, 'Pico IT', color='cyan', weight='bold', fontsize=12)
    
    out_path = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-003_Classificacao\Figura_3.4_Forcas_Externas.png'
    plt.savefig(out_path, dpi=200, bbox_inches='tight', facecolor='#0D1117')
    print(f"Mapa de Forças Externas salvo em: {out_path}")

if __name__ == "__main__":
    generate_external_forces_map()
