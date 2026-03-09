import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def generate_clinical_correlations():
    print("Gerando Mapa de Sinais Clínicos (FASE 5)...")
    
    fig, axes = plt.subplots(1, 3, figsize=(15, 6), facecolor='#0D1117')
    fig.suptitle('Correlações Clínicas do Eixo Inferotemporal (IT)\nSinais Clássicos como Função da Biomecânica', 
                 color='white', size=16, y=0.98)
    
    # Comum background configuration
    for ax in axes:
        ax.set_facecolor('#0D1117')
        ax.set_xlim(-6, 6)
        ax.set_ylim(-6, 6)
        ax.axis('equal'); ax.axis('off')
        
    # 1. Sinal de Munson (Deflexão em V)
    ax1 = axes[0]
    ax1.set_title('Sinal de Munson\n(Deflexão Palpebral pelo Ectasia IT)', color='white')
    
    # Córnea
    cornea1 = patches.Circle((0, 0), 5.5, facecolor='#161B22', edgecolor='white', alpha=0.5, linestyle='--')
    ax1.add_patch(cornea1)
    
    # Pálpebra inferior deformada
    x_palp = np.linspace(-6, 6, 100)
    # curva base
    y_palp = -4.5 + 0.05 * x_palp**2
    # adicionar V no IT (x=2.0)
    v_deflexion = -1.5 * np.exp(-((x_palp - 2.0)**2) / 1.5)
    ax1.plot(x_palp, y_palp + v_deflexion, color='#FF4500', linewidth=4)
    # Linha normal para comparar
    ax1.plot(x_palp, y_palp, color='gray', linewidth=2, linestyle=':')
    ax1.text(2.0, -2.5, 'Zona do Cone IT', color='cyan', ha='center')
    ax1.plot(2.0, -3.0, 'co', markersize=8)
    
    # 2. Estrias de Vogt (Linhas de Força)
    ax2 = axes[1]
    ax2.set_title('Estrias de Vogt\n(Stress Fibrilar Verticalizado no IT)', color='white')
    
    cornea2 = patches.Circle((0, 0), 5.5, facecolor='#161B22', edgecolor='white', alpha=0.5, linestyle='--')
    ax2.add_patch(cornea2)
    
    # Centro do cone IT
    cx, cy = 2.0, -2.5
    cone_area = patches.Circle((cx, cy), 2.5, facecolor='#00D4AA', alpha=0.2)
    ax2.add_patch(cone_area)
    ax2.plot(cx, cy, 'w+', markersize=10)
    
    # Estrias (perpendiculares à curvatura principal que escorre do cone)
    # Geralmente verticais mas seguindo a linha de stress IT
    for dx in np.linspace(-0.8, 0.8, 5):
        y_stria = np.linspace(-1.5, 1.5, 20)
        x_stria = np.zeros_like(y_stria) + dx + cx
        # leve curvatura
        x_stria += 0.1 * y_stria**2 
        ax2.plot(x_stria, y_stria + cy, color='white', alpha=0.8, linewidth=1.5)
    ax2.text(2.0, -0.2, 'Compressão Medial\ndas Lamelas', color='yellow', ha='center', fontsize=9)
    
    # 3. Anel de Fleischer (Depósito de Hemosiderina)
    ax3 = axes[2]
    ax3.set_title('Anel de Fleischer\n(Acúmulo na Base da Ectasia IT)', color='white')
    
    cornea3 = patches.Circle((0, 0), 5.5, facecolor='#161B22', edgecolor='white', alpha=0.5, linestyle='--')
    ax3.add_patch(cornea3)
    
    # Anel (parcialmente fechado ao redor da base IT)
    theta = np.linspace(np.pi*0.2, np.pi*1.8, 100) # Deixa aberto em cima
    R = 2.0 # Raio da base do cone
    x_anel = cx + R * np.cos(theta)
    y_anel = cy + R * np.sin(theta)
    
    ax3.plot(x_anel, y_anel, color='#CD7F32', linewidth=5, alpha=0.8) # Cor de ferro/hemosiderina
    # Sombra do cone
    cone_grad = patches.Circle((cx, cy), R, facecolor='#161B22', edgecolor='none', alpha=0.3)
    ax3.add_patch(cone_grad)
    ax3.text(2.0, -0.2, 'Lágrima acumula na base\ndevido curvatura', color='cyan', ha='center', fontsize=9)
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.90])
    
    out_path = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images\CH-003_Classificacao\Figura_3.6_Sinais_Clinicos.png'
    plt.savefig(out_path, dpi=200, bbox_inches='tight', facecolor='#0D1117')
    print(f"Mapa de Sinais Clínicos salvo em: {out_path}")

if __name__ == "__main__":
    generate_clinical_correlations()
