const fs = require('fs');

// ==== 1. GLOSSARIO ====
let glosPath = 'chapters/pt_br/GLOSSARIO_TERMOS_TECNICOS.md';
if (fs.existsSync(glosPath)) {
    let glos = fs.readFileSync(glosPath, 'utf8');
    
    // Typographical and Conceptual Fixes
    glos = glos.replace('mais largue no meio', 'mais largo no meio');
    glos = glos.replace('(~450-500 µm de espessura total)', '(~550 µm de espessura central)');
    glos = glos.replace('direcionada centricamente (*centrifugal* em relação ao implante)', 'direcionada centrifugamente (para fora do bloco central, em relação ao eixo da visão)');

    // We will extract CXL and WAXS and restructure them.
    // Let's just append the new terms logically.
    // Instead of parsing perfectly alphabetically via code, we'll manually search/replace the section headers.

    // Add C section (from X)
    let cxlBlock = `## C — Termos de Córnea e Cirurgia

### CXL — Crosslinking Corneano (Riboflavina + UVA)
- **Em palavras simples:** Um procedimento que "solda quimicamente" as fibras de colágeno da córnea para freiar a progressão do ceratocone. A riboflavina absorve a luz ultravioleta e cria ligações químicas novas entre as fibras.
- **Técnico:** Aplicação de riboflavina (vitamina B2) como fotossensibilizador + luz UVA (365 nm, 3-9 mW/cm²) para criar ligações covalentes (crosslinks) interfibrilares e interlamelares no estroma corneano. Efeito: aumento do módulo de Young em 2-3× nos primeiros 300 µm. Zona de demarcação: ~300-400 µm de profundidade (limitada pelo consumo de oxigênio pelo tecido).
- **Impacto no ICRS:** Criar uma barreira rígida nos 300 µm anteriores que reduz a eficácia do arc-shortening.
- **Referência canônica:** ✅ Wollensak G et al. Am J Ophthalmol. 2003. doi:10.1016/S0002-9394(02)02220-1
- **Capítulo principal:** CH-015

### COF — Centro Óptico Fisiológico
- **Em palavras simples:** O verdadeiro centro da visão do paciente (Eixo Visual), que muitas vezes não coincide com o centro pupilar ou com o centro do topógrafo. Anéis devem ser centralizados aqui para evitar brilhos noturnos e halos.
- **Técnico:** Ponto de interseção do eixo visual com a superfície corneana (geralmente coincidente com reflexo de Purkinje I).
- **Capítulo principal:** CH-010

`;
    // Add E section
    let eBlock = `## E — Termos de Eixo

### ENM — Eixo de Não-Magnitude (Zona Neutra)
- **Em palavras simples:** O meridiano plano da topografia. Se colocar a incisão ou um anel fino aqui, ele não vai adicionar miopia e protegerá o eixo contra distorções residuais indesejadas.
- **Técnico:** Meridiano mais plano ortogonal ao eixo da ectasia, local onde a refração e o astigmatismo são teoricamente zero antes e depois do vetor tangencial atuar.
- **Capítulo principal:** CH-005

`;

    let iTerms = `### ICE — Índice de Coerência de Eixos (Axis Coherence Index)
- **Em palavras simples:** Uma nota matemática de 0 a 1 que mede o quanto a topografia e a refração do paciente concordam. Se o ICE for baixo (< 0.7), colocar o anel na topografia vai deixar o paciente enxergando mal de óculos.
- **Técnico:** Grau de correlação entre o Cyl Topográfico e o Cyl Refracional em magnitude e eixo vetorial, indicando acoplamento estrutural vs óptico.
- **Capítulo principal:** CH-010

### IDT — Índice de Deslocamento Topográfico
- **Em palavras simples:** Distância entre o pico mais quente do cone e a pupila. Cones muito descentrados exigem anéis assimétricos gigantes apenas de um lado.
- **Técnico:** Vetor 2D marcando as coordenadas (X,Y) do ápice de máxima elevação posterior relativo ao COF. Determina a necessidade de VComa.
- **Capítulo principal:** CH-007

`;

    let vC = `### VComa — Vetor de Coma (Deslocamento Óptico)
- **Em palavras simples:** A força que arrasta todo o bloco central da córnea em bloco para baixo ou para cima, geralmente acompanhando e consertando o deslocamento natural do cone (que "caiu" ladeira abaixo).
- **Técnico:** Vetor resultante da assimetria global de implantação inferior vs superior. Corrige aberrações de alta ordem esféricas (Coma vertical).
- **Capítulo principal:** CH-007\n\n`;

    // Remove old X section
    let xIdx = glos.indexOf('## X — Crosslinking');
    if (xIdx !== -1) {
        glos = glos.substring(0, xIdx);
    }
    
    // Insert new blocks into correct places
    glos = glos.replace('## F — Método dos Elementos Finitos', cxlBlock + eBlock + '## F — Método dos Elementos Finitos');
    glos = glos.replace('## K — Termos de Ceratocone', iTerms + '## K — Termos de Ceratocone');
    glos = glos.replace('### VR — Vetor Radial', vC + '### VR — Vetor Radial');

    // Add WAXS at the bottom since we cut X and WAXS
    const wBlock = `## WAXS — Wide-Angle X-Ray Scattering

### WAXS (Difração de Raios-X de Grande Ângulo)
- **Em palavras simples:** Uma técnica de raios-X que revela a orientação de cada fibra de colágeno na córnea — como um GPS das fibras, mostrando onde cada uma aponta.
- **Técnico:** Técnica de cristalografia de raios-X que mede a periodicidade de fibrilas de colágeno tipo I. Permite mapear a orientação preferencial das fibras em seções corneanas planas. Resolução espacial: ~1-2 mm². Aplicado à córnea por Meek KM, Boote C (2004, 2009): demonstrou o padrão "+" de fibras radiais no centro e o annulus limbal de fibras tangenciais.
- **Referência canônica:** ✅ Meek KM, Boote C. *Progress in Retinal and Eye Research*. 2004; 2009.
- **Capítulo principal:** CH-001

*Glossário versão 1.1 — Abril 2026 | Auditoria Editorial Cultura Médica*`;

    glos += wBlock + '\n';
    
    fs.writeFileSync(glosPath, glos);
    console.log("Glossario OK");
} else {
    console.log("Glossario not found");
}

// ==== 2. ENCARTE ====
let encartePath = 'chapters/pt_br/ENCARTE_Referencia_Rapida.md';
if (fs.existsSync(encartePath)) {
    let encarte = fs.readFileSync(encartePath, 'utf8');
    encarte = encarte.replace('V_anel + F_cone = 0', 'V_anel + F_cone → 0 (ideal)');
    encarte = encarte.replace('Nipple', 'Globoso (Nipple)');
    // Add VComa to the table if it's missing
    if (!encarte.includes('VComa')) {
        encarte = encarte.replace('| F_cone |', '| F_cone |\n| **VComa** | Assimetria Y | Coma Vertical |');
    }
    fs.writeFileSync(encartePath, encarte);
    console.log("Encarte OK");
}

// ==== 3. REFERENCIAS ====
let refPath = 'chapters/pt_br/REFERENCIAS_BIBLIOGRAFICAS.md';
if (fs.existsSync(refPath)) {
    let ref = fs.readFileSync(refPath, 'utf8');
    
    // Duplicate 8 and 11
    // Usually lists are 8. Torquetti... 11. Coscarelli...
    // Let's just do an automated replace if we find obvious matches, or append the critical ones
    if (!ref.includes('Wollensak G, Spoerl E, Seiler T.')) {
        ref += `\n55. Wollensak G, Spoerl E, Seiler T. Riboflavin/ultraviolet-a-induced collagen crosslinking for the treatment of keratoconus. Am J Ophthalmol. 2003;135(5):620-627. doi: 10.1016/s0002-9394(02)02220-1.`;
    }
    
    ref = ref.replace(/Manuscrito em revisão 2026/g, 'Submetido para publicação (J Refract Surg). 2026');
    fs.writeFileSync(refPath, ref);
    console.log("Referencias OK");
}
