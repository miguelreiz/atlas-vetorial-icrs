const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// Read PT versions
const ptA = fs.readFileSync(path.join(BASE, 'folder_variacao_A.html'), 'utf8');
const ptB = fs.readFileSync(path.join(BASE, 'folder_variacao_B.html'), 'utf8');
const ptC = fs.readFileSync(path.join(BASE, 'folder_variacao_C.html'), 'utf8');

// Translation map PT -> EN
const translations = [
  // Titles & headers
  ['lang="pt-BR"', 'lang="en"'],
  ['Anel de Ferrara® HM', 'Ferrara® HM Ring'],
  ['Remodelamento Corneano<br>Progressivo', 'Progressive Corneal<br>Remodeling'],
  ['Remodelamento Corneano Progressivo até 9 Meses', 'Progressive Corneal Remodeling Up to 9 Months'],
  ['Remodelamento Corneano<br>Progressivo <em>até 9 Meses</em>', 'Progressive Corneal<br>Remodeling <em>Up to 9 Months</em>'],
  ['Avaliação das alterações ceratométricas induzidas pelo anel Ferrara® HM fabricado pela Freedom — evidência de aplanamento contínuo além do 3º mês pós-operatório.', 'Evaluation of keratometric changes induced by the Ferrara® HM ring manufactured by Freedom — evidence of continuous flattening beyond 3 months postoperatively.'],
  ['Avaliação das alterações induzidas pelo anel Ferrara® HM: evidência de aplanamento contínuo e remodelamento estromal ativo muito além do 3º mês pós-operatório.', 'Evaluation of changes induced by the Ferrara® HM ring: evidence of continuous flattening and active stromal remodeling well beyond 3 months postoperatively.'],
  ['evidência de aplanamento contínuo além do período convencional de estabilização.', 'evidence of continuous flattening beyond the conventional stabilization period.'],
  // Badges
  ['Coorte Brasileira', 'Brazilian Cohort'],
  ['Coorte BR', 'Brazilian Cohort'],
  ['Follow-up até 24 meses', 'Follow-up up to 24 months'],
  ['Follow-up 24m', 'Follow-up 24m'],
  ['Freedom Biotech', 'Freedom Biotech'],
  // Congress
  ['Congresso Brasileiro de Cirurgia Refrativa e Catarata', 'Brazilian Congress of Refractive and Cataract Surgery'],
  ['Belo Horizonte, MG', 'Belo Horizonte, Brazil'],
  ['BH, MG', 'Belo Horizonte, Brazil'],
  // Data page headers
  ['Dados Clínicos — Progressão Temporal', 'Clinical Data — Temporal Progression'],
  ['📊 Dados Clínicos — Progressão Temporal', '📊 Clinical Data — Temporal Progression'],
  ['Redução do Kmax ao Longo do Tempo', 'Kmax Reduction Over Time'],
  ['Tabela Resumo — Coorte Freedom (todos os modelos HM)', 'Summary Table — Freedom Cohort (all HM models)'],
  ['Resumo — Coorte Freedom (todos HM)', 'Summary — Freedom Cohort (all HM)'],
  ['Resumo Freedom (todos HM)', 'Summary Freedom (all HM)'],
  ['Desempenho por Modelo (Coorte BR, 3 meses PO)', 'Performance by Model (BR Cohort, 3 months PO)'],
  ['Desempenho por Modelo (3m PO)', 'Performance by Model (3m PO)'],
  ['Por Modelo (3m PO)', 'By Model (3m PO)'],
  ['Linha do Tempo — ΔKmax Progressivo', 'Timeline — Progressive ΔKmax'],
  ['Progressão do Aplanamento (ΔKmax)', 'Flattening Progression (ΔKmax)'],
  // Table headers
  ['Parâmetro', 'Parameter'],
  ['Pré-op', 'Pre-op'],
  ['Modelo', 'Model'],
  ['Paquimetria', 'Pachymetry'],
  // Highlight
  ['93% da redução do Kmax ocorre APÓS o 3º mês', '93% of Kmax reduction occurs AFTER the 3rd month'],
  ['93% da redução total do Kmax ocorre APÓS o 3º mês', '93% of total Kmax reduction occurs AFTER the 3rd month'],
  ['remodelamento estromal progressivo ativo', 'active progressive stromal remodeling'],
  ['remodelamento estromal progressivo', 'progressive stromal remodeling'],
  ['progressão', 'progression'],
  ['contínua', 'continuous'],
  // Cases
  ['🔬 Casos Ilustrativos', '🔬 Clinical Cases'],
  ['Casos Ilustrativos', 'Clinical Cases'],
  ['Ceratocone', 'Keratoconus'],
  ['Pentacam Compare 2 Exams', 'Pentacam Compare 2 Exams'],
  ['Pentacam Compare', 'Pentacam Compare'],
  ['Curvatura axial anterior: Exame A (pré-operatório) vs Exame B (pós-operatório). Mapa diferencial mostrando aplanamento de +3.9 a +6.7 D na zona do cone.', 'Anterior axial curvature: Exam A (preoperative) vs Exam B (postoperative). Differential map showing +3.9 to +6.7 D flattening in the cone zone.'],
  ['Curvatura axial anterior: pré-op vs pós-op. Mapa diferencial mostrando aplanamento de +3.9 a +6.7 D na zona do cone.', 'Anterior axial curvature: pre-op vs post-op. Differential map showing +3.9 to +6.7 D flattening in the cone zone.'],
  ['Curvatura axial anterior pré vs pós. Aplanamento de +3.9 a +6.7 D na zona do cone.', 'Anterior axial curvature pre vs post. Flattening of +3.9 to +6.7 D in the cone zone.'],
  ['Anel Ferrara® HM — Imagem Scheimpflug', 'Ferrara® HM Ring — Scheimpflug Image'],
  ['Scheimpflug — Anel HM In Situ', 'Scheimpflug — HM Ring In Situ'],
  ['Corte Scheimpflug demonstrando anel HM posicionado no estroma médio com perfil triangular preservado.', 'Scheimpflug cross-section showing HM ring positioned in the mid-stroma with preserved triangular profile.'],
  ['Corte Scheimpflug demonstrando anel HM no estroma médio com perfil triangular preservado.', 'Scheimpflug cross-section showing HM ring in the mid-stroma with preserved triangular profile.'],
  ['Anel HM no estroma médio. Perfil triangular preservado.', 'HM ring in mid-stroma. Triangular profile preserved.'],
  ['Anel HM In Situ — Biomicroscopia', 'HM Ring In Situ — Slit-lamp'],
  ['Biomicroscopia — Anel HM Implantado', 'Slit-lamp — Implanted HM Ring'],
  ['Aspecto biomicroscópico de dois olhos com anel Ferrara® HM implantado. Transparência corneana preservada, centralização adequada.', 'Slit-lamp appearance of two eyes with implanted Ferrara® HM ring. Corneal transparency preserved, adequate centration.'],
  ['Transparência corneana preservada. Centralização adequada. Ausência de depósitos ou neovascularização.', 'Corneal transparency preserved. Adequate centration. No deposits or neovascularization.'],
  ['Transparência preservada. Centralização adequada. Sem depósitos/neovascularização.', 'Transparency preserved. Adequate centration. No deposits/neovascularization.'],
  // Advantages
  ['🏆 Vantagens Competitivas do Ferrara® HM', '🏆 Competitive Advantages of Ferrara® HM'],
  ['Vantagens Competitivas do Ferrara® HM', 'Competitive Advantages of Ferrara® HM'],
  ['Vantagens do Ferrara® HM', 'Advantages of Ferrara® HM'],
  ['Perfil Triangular Exclusivo', 'Exclusive Triangular Profile'],
  ['Perfil Triangular', 'Triangular Profile'],
  ['Efeito de tenting superior com redistribuição de tensões estromais otimizada. Maior vetor radial (VR) por unidade de espessura.', 'Superior tenting effect with optimized stromal stress redistribution. Greater radial vector (RV) per thickness unit.'],
  ['Efeito de tenting superior. Maior vetor radial por espessura de anel.', 'Superior tenting effect. Greater radial vector per ring thickness.'],
  ['Tenting superior. Maior VR por espessura.', 'Superior tenting. Greater RV per thickness.'],
  ['Remodelamento Progressivo', 'Progressive Remodeling'],
  ['Progressivo', 'Progressive'],
  ['Diferentemente de outros ICRS, 93% do aplanamento do Kmax ocorre após o 3º mês — efeito biomecânico sustentado até 9+ meses.', 'Unlike other ICRS, 93% of Kmax flattening occurs after the 3rd month — sustained biomechanical effect up to 9+ months.'],
  ['93% do aplanamento após 3m. Efeito biomecânico sustentado até 9+ meses.', '93% of flattening after 3m. Sustained biomechanical effect up to 9+ months.'],
  ['93% do efeito após 3m. Até 9+ meses.', '93% effect after 3m. Up to 9+ months.'],
  ['Combinações Concêntricas', 'Concentric Combinations'],
  ['Concêntrico', 'Concentric'],
  ['Possibilidade de implante concêntrico (double-ring) para ceratocones avançados, potencializando o efeito de aplanamento centralizado.', 'Concentric implant (double-ring) possibility for advanced keratoconus, enhancing the centralized flattening effect.'],
  ['Double-ring para KC avançados com aplanamento centralizado potencializado.', 'Double-ring for advanced KC with enhanced centralized flattening.'],
  ['Double-ring para KC avançado.', 'Double-ring for advanced KC.'],
  ['Sinergia com Cirurgia Refrativa', 'Synergy with Refractive Surgery'],
  ['Sinergia com Refrativa', 'Refractive Synergy'],
  ['+ Refrativa', '+ Refractive'],
  ['Em casos selecionados, combinação com PRK ou LASIK para refinamento refrativo final, ampliando a reabilitação visual completa.', 'In selected cases, combination with PRK or LASIK for final refractive refinement, expanding complete visual rehabilitation.'],
  ['Combinação com PRK/LASIK em casos selecionados para refinamento visual.', 'PRK/LASIK combination in selected cases for visual refinement.'],
  ['PRK/LASIK em casos selecionados.', 'PRK/LASIK in selected cases.'],
  ['Gama Completa de Modelos', 'Complete Model Range'],
  ['Gama Completa (200-450)', 'Complete Range (200-450)'],
  ['HM 200-450', 'HM 200-450'],
  ['Cobertura de todo espectro de ceratocone, de leve a avançado, incluindo indicações em miopia alta.', 'Coverage of the full keratoconus spectrum, from mild to advanced, including high myopia indications.'],
  ['Cobertura de KC leve a avançado + miopia alta.', 'Coverage from mild to advanced KC + high myopia.'],
  ['KC leve a avançado + miopia.', 'Mild to advanced KC + myopia.'],
  ['Tecnologia 100% Brasileira', '100% Brazilian Technology'],
  ['100% Brasileiro', '100% Brazilian'],
  ['100% BR', '100% Brazilian'],
  ['Pioneiro mundial em ICRS desde 1986. Fabricação nacional pela Freedom com controle de qualidade e rastreabilidade completa.', 'World pioneer in ICRS since 1986. National manufacturing by Freedom with complete quality control and traceability.'],
  ['Pioneiro mundial desde 1986. Fabricação Freedom.', 'World pioneer since 1986. Freedom manufacturing.'],
  ['Pioneiro 1986. Freedom.', 'Pioneer 1986. Freedom.'],
  // Conclusions
  ['✅ Conclusões', '✅ Conclusions'],
  ['Conclusões', 'Conclusions'],
  ['<strong>Remodelamento progressivo:</strong> O anel Ferrara® HM induz aplanamento contínuo que se intensifica após o 3º mês, com ΔKmax total de 5.05 D aos 9 meses.', '<strong>Progressive remodeling:</strong> The Ferrara® HM ring induces continuous flattening that intensifies after the 3rd month, with a total ΔKmax of 5.05 D at 9 months.'],
  ['<strong>Remodelamento progressivo:</strong> ΔKmax 5.05 D aos 9 meses com intensificação após 3m.', '<strong>Progressive remodeling:</strong> ΔKmax 5.05 D at 9 months with intensification after 3m.'],
  ['<strong>Remodelamento progressivo:</strong> ΔKmax 5.05 D aos 9m, 93% após 3m.', '<strong>Progressive remodeling:</strong> ΔKmax 5.05 D at 9m, 93% after 3m.'],
  ['<strong>Remodelamento tecidual:</strong> Aumento paquimétrico de +42.77 µm confirma remodelamento estromal ativo, não apenas deslocamento mecânico.', '<strong>Tissue remodeling:</strong> Pachymetric increase of +42.77 µm confirms active stromal remodeling, not just mechanical displacement.'],
  ['<strong>Remodelamento tecidual:</strong> +42.77 µm confirma remodelamento estromal ativo.', '<strong>Tissue remodeling:</strong> +42.77 µm confirms active stromal remodeling.'],
  ['<strong>Remodelamento tecidual:</strong> +42.77 µm = estroma ativo, não só mecânico.', '<strong>Tissue remodeling:</strong> +42.77 µm = active stroma, not just mechanical.'],
  ['<strong>HM 300 como destaque:</strong> ΔKmax de 6.92 D aos 3 meses (n=23) — resultado acima da média da literatura (2-4 D).', '<strong>HM 300 highlight:</strong> ΔKmax of 6.92 D at 3 months (n=23) — result above the literature average (2-4 D).'],
  ['<strong>HM 300 — destaque:</strong> ΔKmax 6.92 D (n=23), acima da literatura (2-4 D).', '<strong>HM 300 highlight:</strong> ΔKmax 6.92 D (n=23), above literature (2-4 D).'],
  ['<strong>HM 300 destaque:</strong> ΔKmax 6.92 D (n=23) — acima da literatura.', '<strong>HM 300 highlight:</strong> ΔKmax 6.92 D (n=23) — above literature.'],
  ['<strong>Versatilidade:</strong> Possibilidade de combinações concêntricas e sinergia com cirurgia refrativa ampliam indicações.', '<strong>Versatility:</strong> Concentric combinations and refractive surgery synergy expand indications.'],
  ['<strong>Versatilidade:</strong> Combinações concêntricas e sinergia refrativa ampliam indicações.', '<strong>Versatility:</strong> Concentric combinations and refractive synergy expand indications.'],
  ['<strong>Versatilidade:</strong> Concêntricos + sinergia refrativa ampliam indicações.', '<strong>Versatility:</strong> Concentrics + refractive synergy expand indications.'],
  // Footer
  ['Dados clínicos apresentados para fins científicos e educacionais. Resultados individuais podem variar.', 'Clinical data presented for scientific and educational purposes. Individual results may vary.'],
  ['Dados para fins científicos e educacionais. Resultados individuais podem variar.', 'Data for scientific and educational purposes. Individual results may vary.'],
  ['Referências:', 'References:'],
  ['Biotechnology • Pioneiros desde 1986', 'Biotechnology • Pioneers since 1986'],
  // Misc
  ['Caso 1 —', 'Case 1 —'],
  ['Baseline', 'Baseline'],
  ['30 dias', '30 days'],
  ['3 meses', '3 months'],
  ['9 meses', '9 months'],
  ['12+ meses', '12+ months'],
  ['Total 9m', 'Total 9m'],
];

function translate(html) {
  let result = html;
  for (const [pt, en] of translations) {
    result = result.split(pt).join(en);
  }
  return result;
}

// Also update logo in all files
function addLogo(html) {
  // Replace the circular F logo with the real logo image
  return html
    .replace(/<div class="logo-icon">F<\/div>/g, '<img src="assets/ferrara_logo.png" alt="Ferrara" style="height:40px">')
    .replace(/<div class="logo-circle">F<\/div>/g, '<img src="assets/ferrara_logo.png" alt="Ferrara" style="height:36px">')
    .replace(/<div class="dot">F<\/div>/g, '<img src="assets/ferrara_logo.png" alt="Ferrara" style="height:36px">');
}

// Generate EN versions
fs.writeFileSync(path.join(BASE, 'folder_variacao_A_EN.html'), addLogo(translate(ptA)));
fs.writeFileSync(path.join(BASE, 'folder_variacao_B_EN.html'), addLogo(translate(ptB)));
fs.writeFileSync(path.join(BASE, 'folder_variacao_C_EN.html'), addLogo(translate(ptC)));

// Update PT versions with real logo
fs.writeFileSync(path.join(BASE, 'folder_variacao_A.html'), addLogo(ptA));
fs.writeFileSync(path.join(BASE, 'folder_variacao_B.html'), addLogo(ptB));
fs.writeFileSync(path.join(BASE, 'folder_variacao_C.html'), addLogo(ptC));

console.log('✓ 3 EN versions generated');
console.log('✓ 3 PT versions updated with real logo');
console.log('Total: 6 HTML files ready');
