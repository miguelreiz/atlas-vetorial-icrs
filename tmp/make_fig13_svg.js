const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-013_Complicacoes');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 13.1: Mapa Vetorial do Fracasso Cirúrgico (REMASTERIZADA v3 - Painéis Separados)
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="800" fill="#0A0E17"/>`;
svg1 += `<defs>
    <filter id="glowR"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="arrowB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#0B3D91"/></marker>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744"/></marker>
    <marker id="arrowO" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#FFD700"/></marker>
    <marker id="arrowC" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#00B4DC"/></marker>
</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle">Figura 13.1: Os 4 Cinetipos do Fracasso Cirúrgico</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Desconstrução visual de como os vetores agem destrutivamente quando mal planejados</text>`;

const blocos = [
    {x: 80, y: 150, title: "1. COMA VERTICAL (Piora)", vetor: "Vτ Invertido", desc: "Incisão no K-Max (desalinhado do ENM)", desc2: "Gira o ápice ainda mais para baixo", cor: "#FFD700"},
    {x: 620, y: 150, title: "2. APLAINAMENTO EXCESSIVO", vetor: "VR Tóxico", desc: "Anel muito espesso em córnea fina", desc2: "Cria hipermetropia e abaulamento periférico", cor: "#0B3D91"},
    {x: 80, y: 480, title: "3. ASTIGMATISMO IRREGULAR", vetor: "VT Conflitante", desc: "Assimetria de arco não correspondente", desc2: "Incisão fora do eixo fátia o astigmatismo", cor: "#00B4DC"},
    {x: 620, y: 480, title: "4. EXTRUSÃO / MELTING", vetor: "Vetor Endotelial ↑", desc: "Implante muito superficial (<70%)", desc2: "Necrose estromal anterior isquêmica", cor: "#ff1744"}
];

blocos.forEach((b, i) => {
    // Caixa Principal
    svg1 += `<rect x="${b.x}" y="${b.y}" width="500" height="280" rx="10" fill="#111B24" stroke="${b.cor}" stroke-width="2"/>`;
    // Caixa Título
    svg1 += `<rect x="${b.x}" y="${b.y}" width="500" height="40" rx="10" fill="${b.cor}" opacity="0.1"/>`;
    svg1 += `<text x="${b.x+20}" y="${b.y+26}" fill="${b.cor}" font-family="Arial" font-size="18" font-weight="bold">${b.title}</text>`;
    svg1 += `<text x="${b.x+480}" y="${b.y+26}" fill="#111B24" font-family="Arial" font-size="16" font-weight="bold" text-anchor="end" stroke="${b.cor}" stroke-width="0.5">${b.vetor}</text>`;
    
    // Descrições (Safe zones at the bottom of the box)
    svg1 += `<text x="${b.x+250}" y="${b.y+240}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">${b.desc}</text>`;
    svg1 += `<text x="${b.x+250}" y="${b.y+260}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${b.desc2}</text>`;
    
    // Abstract Illustration (Center of each box: x+250, y+130)
    let cx = b.x + 250;
    let cy = b.y + 130;
    
    if (i === 0) {
        // Vτ Errado: Cornea drifting down
        svg1 += `<ellipse cx="${cx}" cy="${cy}" rx="60" ry="60" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`; // Original
        svg1 += `<ellipse cx="${cx}" cy="${cy+30}" rx="60" ry="70" fill="none" stroke="#FFD700" stroke-width="4"/>`; // Deformed
        svg1 += `<line x1="${cx}" y1="${cy+10}" x2="${cx}" y2="${cy+50}" stroke="#FFD700" stroke-width="4" marker-end="url(#arrowO)"/>`;
        svg1 += `<text x="${cx+80}" y="${cy}" fill="#FFD700" font-family="Arial" font-size="12">Rotação Inferior</text>`;
    } else if (i === 1) {
        // VR Excesso: Very flat center, bulging sides
        svg1 += `<path d="M ${cx-100} ${cy+40} Q ${cx} ${cy-80} ${cx+100} ${cy+40}" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
        svg1 += `<path d="M ${cx-100} ${cy+40} Q ${cx-60} ${cy} ${cx-40} ${cy-10} L ${cx+40} ${cy-10} Q ${cx+60} ${cy} ${cx+100} ${cy+40}" fill="none" stroke="#0B3D91" stroke-width="4"/>`;
        svg1 += `<line x1="${cx}" y1="${cy-70}" x2="${cx}" y2="${cy-20}" stroke="#0B3D91" stroke-width="5" marker-end="url(#arrowB)"/>`;
        svg1 += `<text x="${cx+40}" y="${cy-50}" fill="#0B3D91" font-family="Arial" font-size="12">Hyper-Flattening</text>`;
    } else if (i === 2) {
        // VT Conflitante: Slicing the astigmatism
        svg1 += `<ellipse cx="${cx}" cy="${cy}" rx="80" ry="40" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4" transform="rotate(-30 ${cx} ${cy})"/>`;
        // Rings placed terribly
        svg1 += `<line x1="${cx-90}" y1="${cy}" x2="${cx+90}" y2="${cy}" stroke="#00B4DC" stroke-width="3" stroke-dasharray="6,4"/>`;
        svg1 += `<text x="${cx}" y="${cy+60}" fill="#00B4DC" font-family="Arial" font-size="12" text-anchor="middle">Eixo Induzido vs Eixo Nativo</text>`;
    } else if (i === 3) {
        // Extrusão
        svg1 += `<path d="M ${cx-80} ${cy} Q ${cx} ${cy-50} ${cx+80} ${cy}" fill="none" stroke="#cfd8dc" stroke-width="8"/>`; // Cornea
        svg1 += `<rect x="${cx-40}" y="${cy-30}" width="20" height="15" fill="#ff1744" filter="url(#glowR)"/>`; // Implant too high
        svg1 += `<line x1="${cx-30}" y1="${cy-15}" x2="${cx-30}" y2="${cy-50}" stroke="#ff1744" stroke-width="4" marker-end="url(#arrowR)"/>`;
        svg1 += `<text x="${cx+30}" y="${cy-20}" fill="#ff1744" font-family="Arial" font-size="12">Ruptura Epitelial</text>`;
    }
});

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_13.1_Complicacoes_Por_Vetor.svg'), svg1);
console.log("Figura 13.1 redesenhada em painéis, sem sobreposição de textos!");
