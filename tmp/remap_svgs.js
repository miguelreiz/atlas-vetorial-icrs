const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const map = {
  // CH-001
  "Figura_Fibrilas_WAXS.png": "../../images/CH-001_Anatomia/Figura_WAXS_Mapa.svg",
  "stromal_proportion_depth_1772301574639.png": "../../images/CH-001_Anatomia/cornea_cross_section_pt.svg",
  "collagen_fiber_pattern_1772276571709.png": "../../images/CH-001_Anatomia/astigmatism_fiber_mesh.svg",
  
  // CH-003
  "Figura_3.1_5_Padroes_Placido.png": "../../images/CH-003_Classificacao_Ceratocone/Figura_3.1_Padroes_Topograficos.svg", 
  
  // CH-004
  "arc_shortening_viscoelastic_pt_1771775836446.png": "../../images/CH-004_VR_Vetor_Radial/Figura_4.1_Arc_Shortening_Biomecanico.svg",
  "arc_shortening_lamellar_v2_pt_1771777672694.png": "../../images/CH-004_VR_Vetor_Radial/Figura_4.4_Mecanismo_VR_Didatico.svg",
  "Figura_4.4_VR_Corte_Transversal.png": "../../images/CH-004_VR_Vetor_Radial/Figura_4.4_Mecanismo_VR_Didatico.svg",
  "top_down_tension_pt_1771774458719.png": "../../images/CH-004_VR_Vetor_Radial/Figura_4.5_Mapa_Tensao_TopDown.svg",
  "barraquer_law_biomechanics_pt_1771774491898.png": "../../images/CH-004_VR_Vetor_Radial/Figura_4.3_Barraquer_Law.svg",
  
  // CH-005
  "Figura_Efeito_Acoplamento.png": "../../images/CH-005_VT_Vetor_Tangencial/Figura_5_Efeito_Acoplamento.svg",
  "Figura_Tangential_Traction.png": "../../images/CH-005_VT_Vetor_Tangencial/Figura_5_Incision_Axis_ENM.svg",
  
  // CH-007
  "Figura_Coma_Headlight.png": "../../images/CH-007_VComa/Figura_7.1_Analogia_Coma.svg",
  "Figura_VComa_Heatmap.png": "../../images/CH-007_VComa/Figura_7.2_VComa_Heatmap.svg",
  "Figura_VComa_Hierarchy.png": "../../images/CH-007_VComa/Figura_7.3_Hierarquia_Cone.svg",
  "Figura_Coma_Hemicorneas.png": "../../images/CH-007_VComa/Figura_7.4_Coma_Hemicorneas.svg",
  
  // CH-011
  "nomogram_flowchart_pt_1771791398451.png": "../../images/CH-011_Nomogramas/Figura_11.1_Fluxograma_Nomograma.svg",
  "perfil_fenotipo_matriz_1772316336266.png": "../../images/CH-011_Nomogramas/Figura_11.2_Matriz_Nomograma.svg"
};

let totalReplacements = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Matches any markdown image link with .png
    const regex = /\]\(([^)]+\.png)\)/g;
    
    content = content.replace(regex, (match, imagePath) => {
        const baseNameWithExt = path.basename(imagePath);
        
        if (map[baseNameWithExt]) {
            console.log(`[+] Substituindo em ${file}: ${baseNameWithExt} -> ${map[baseNameWithExt]}`);
            modified = true;
            totalReplacements++;
            return `](${map[baseNameWithExt]})`;
        }
        
        return match;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

console.log(`\nRevisão Concluída! Total de imagens corrigidas para referências do GitHub: ${totalReplacements}`);
