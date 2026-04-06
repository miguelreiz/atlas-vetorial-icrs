const fs = require('fs');

const p = 'chapters/pt_br/GLOSSARIO_TERMOS_TECNICOS.md';
let content = fs.readFileSync(p, 'utf8');

// Fix typographic errors
content = content.replace('mais largue no meio', 'mais largo no meio');
content = content.replace('(~450-500 µm de espessura total)', '(~550 µm de espessura central)');
content = content.replace('direcionada centricamente (*centrifugal* em relação ao implante)', 'direcionada centrifugamente (para fora, afastando-se do centro em relação ao implante)');

// Restructure Alphabetical Order
// Remove X block and W block to re-insert them correctly and parse CXL
const wBlock = `## WAXS — Wide-Angle X-Ray Scattering

### WAXS (Difração de Raios-X de Grande Ângulo)
- **Em palavras simples:** Uma técnica de raios-X que revela a orientação de cada fibra de colágeno na córnea — como um GPS das fibras, mostrando onde cada uma aponta.
- **Técnico:** Técnica de cristalografia de raios-X que mede a periodicidade de fibrilas de colágeno tipo I. Permite mapear a orientação preferencial das fibras em seções corneanas planas. Resolução espacial: ~1-2 mm². Aplicado à córnea por Meek KM, Boote C (2004, 2009): demonstrou o padrão "+" de fibras radiais no centro e o annulus limbal de fibras tangenciais.
- **Referência canônica:** ✅ Meek KM, Boote C. *Progress in Retinal and Eye Research*. 2004; 2009.
- **Capítulo principal:** CH-001`;

const cxlBlock = `### CXL — Crosslinking Corneano (Riboflavina + UVA)
- **Em palavras simples:** Um procedimento que "solda quimicamente" as fibras de colágeno da córnea para freiar a progressão do ceratocone. A riboflavina absorve a luz ultravioleta e cria ligações químicas novas entre as fibras.
- **Técnico:** Aplicação de riboflavina (vitamina B2) como fotossensibilizador + luz UVA (365 nm, 3-9 mW/cm²) para criar ligações covalentes (crosslinks) interfibrilares e interlamelares no estroma corneano. Efeito: aumento do módulo de Young em 2-3× nos primeiros 300 µm. Zona de demarcação: ~300-400 µm de profundidade (limitada pelo consumo de oxigênio pelo tecido).
- **Impacto no ICRS:** Criar uma barreira rígida nos 300 µm anteriores que reduz a eficácia do arc-shortening.
- **Referência canônica:** ✅ Wollensak G et al. Am J Ophthalmol. 2003. doi:10.1016/S0002-9394(02)02220-1
- **Capítulo principal:** CH-015`;

// Add new verbs
const newVBlock = `### VComa — Vetor de Coma (Deslocamento Óptico)
- **Em palavras simples:** A força que arrasta todo o bloco central da córnea em bloco para baixo ou para cima, geralmente acompanhando e consertando o deslocamento natural do cone (que "caiu" ladeira abaixo).
- **Técnico:** Vetor resultante da assimetria global de implantação inferior vs superior. Corrige aberrações de alta ordem esféricas (Coma vertical).
- **Capítulo principal:** CH-007`;

const newCEBlock = `## C — Termos C
${cxlBlock}

### COF — Centro Óptico Fisiológico
- **Em palavras simples:** O verdadeiro centro da visão do paciente (Eixo Visual), que muitas vezes não coincide com o centro pupilar ou com o centro do topógrafo. Anéis devem ser centralizados aqui para evitar brilhos noturnos e halos.
- **Técnico:** Ponto de interseção do eixo visual com a superfície corneana (geralmente coincidente com reflexo de Purkinje I).
- **Capítulo principal:** CH-010

## E — Termos E
### ENM — Eixo de Não-Magnitude (Zona Neutra)
- **Em palavras simples:** O meridiano plano da topografia. Se colocar a incisão ou um anel fino aqui, ele não vai adicionar miopia e protegerá o eixo contra distorções residuais indesejadas.
- **Técnico:** Meridiano mais plano ortogonal ao eixo da ectasia, local onde a refração e o astigmatismo são teoricamente zero antes e depois do vetor tangencial atuar.
- **Capítulo principal:** CH-005

## I — Termos I e Índices
### ICE — Índice de Coerência de Eixos (Axis Coherence Index)
- **Em palavras simples:** Uma nota matemática de 0 a 1 que mede o quanto a topografia e a refração do paciente concordam. Se o ICE for baixo (< 0.7), colocar o anel na topografia vai deixar o paciente enxergando mal de óculos.
- **Técnico:** Raio de correlação entre o Cyl Topográfico e o Cyl Refracional em magnitude e eixo vetorial, indicando acoplamento estrutural vs óptico.
- **Capítulo principal:** CH-010

### IDT — Índice de Deslocamento Topográfico
- **Em palavras simples:** Distância entre o pico mais quente do cone e a pupila. Cones muito descentrados exigem anéis assimétricos gigantes apenas de um lado.
- **Técnico:** Vetor 2D marcando as coordenadas (X,Y) do ápice de máxima elevação posterior relativo ao COF. Determina a necessidade de VComa.
- **Capítulo principal:** CH-007`;

// First, clean up the original file by removing W and X completely
let cleanContent = content.split('## X — Crosslinking')[0];

// Insert the new chunks perfectly alphabetically
cleanContent = cleanContent.replace('## F — Método dos Elementos Finitos', newCEBlock + '\n\n## F — Método dos Elementos Finitos');
cleanContent = cleanContent.replace('## K — Termos de Ceratocone', '## ICRS — Intracorneal Ring Segment\n\n' + newVBlock + '\n\n## K'); // wait, I just need to append ICE/IDT to 'I'

// Let's do it cleaner: build the file structurally.
let finalFile = cleanContent;
// Put WAXS at the end, before the footer
finalFile += '\n' + wBlock + '\n\n*Glossário versão 1.1 — Abril 2026 | Expansão contínua a cada novo capítulo*\n';

fs.writeFileSync('tmp/build_glossary.js', content);
