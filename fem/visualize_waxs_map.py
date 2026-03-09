import numpy as np
import matplotlib.pyplot as plt

def generate_waxs_map():
    print("Gerando Mapa WAXS Quantitativo...")
    
    # Setores (8 quadrantes)
    sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    angles = np.linspace(0, 2*np.pi, 8, endpoint=False)
    angles = np.append(angles, angles[0]) # Fechar o circulo
    
    # Densidade Fibrilar Relativa (WAXS - Meek/Boote)
    # 1.0 = Densidade base (Média central)
    # Eixos N-T e S-I sao mais densos (1.1 - 1.2)
    # IT (SW/S) e o vao (-44%)
    
    # Mapeamento de ângulos:
    # 0 (E), 45 (NE), 90 (N), 135 (NW), 180 (W), 225 (SW), 270 (S), 315 (SE)
    
    # Valores de densidade (normalizados)
    # Nasal (0-180), Temporal (180-360) 
    # IT e centrado em 240 (entre SW e S)
    
    densities = [
        1.15, # E (0)
        1.05, # NE (45)
        1.20, # N (90)
        1.00, # NW (135)
        1.10, # W (180)
        0.65, # SW (225) - Inicio do deficit IT
        0.56, # S (270)  - Pico do deficit (-44%)
        1.05  # SE (315)
    ]
    densities = np.append(densities, densities[0]) # Fechar o circulo

    # Criar Plot Polar
    plt.figure(figsize=(10, 10), facecolor='#0D1117')
    ax = plt.subplot(111, projection='polar')
    ax.set_facecolor('#0D1117')
    
    # Plotar densidade
    ax.plot(angles, densities, color='#00D4AA', linewidth=4, label='Densidade Fibrilar (Vão IT)')
    ax.fill(angles, densities, color='#00D4AA', alpha=0.3)
    
    # Adicionar isolinhas de referencia
    ax.plot(angles, np.ones_like(densities), color='white', linestyle='--', alpha=0.5, label='Média Normal')

    # Configurar labels
    ax.set_theta_zero_location('E') # 0 e Leste/Nasal (para OD)
    ax.set_thetagrids(np.degrees(angles[:-1]), sectors)
    
    # Cores dos labels
    ax.tick_params(axis='x', colors='white', labelsize=12)
    ax.tick_params(axis='y', colors='white', labelsize=10)
    ax.grid(color='#30363D', linestyle='-', linewidth=0.5)
    
    plt.title('Mapa WAXS Quantitativo: Distribuição Fibrilar Estromal\n(Déficit Focal de -44% no Setor Inferotemporal)', 
              color='white', size=16, pad=30)
    
    # Legenda
    leg = plt.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1))
    leg.get_frame().set_facecolor('#161B22')
    leg.get_frame().set_edgecolor('white')
    for text in leg.get_texts():
        text.set_color('white')

    # Salvar
    out_path = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-003_Classificacao\Figura_3.3_WAXS_Quantitativo.png'
    plt.savefig(out_path, dpi=200, bbox_inches='tight', facecolor='#0D1117')
    print(f"Mapa WAXS salvo em: {out_path}")

if __name__ == "__main__":
    generate_waxs_map()
