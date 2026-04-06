const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-015_CXL_Profundidade');
if (!fs.existsSync(outDir)) {fs.mkdirSync(outDir, {recursive: true});}

function arrow(id, color) {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker>`;
}

let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;
svg1 += `<defs>${arrow('aW','#ffffff')}${arrow('aG','#00e676')}${arrow('aR','#ff1744')}</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 15.1: Dinâmica ICRS em Córnea Virgem vs Pós-CXL</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">A trava covalente impede a distribuição circunferencial da tensão do anel</text>`;

// Left Panel: Virgem
svg1 += `<rect x="50" y="120" width="500" height="420" rx="15" fill="#111B24" stroke="#00e676" stroke-width="2"/>`;
svg1 += `<rect x="50" y="120" width="500" height="40" rx="15" fill="#00e676" opacity="0.1"/>`;
svg1 += `<text x="300" y="146" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">CÓRNEA KC VIRGEM</text>`;

let cx1 = 300, cy1 = 250;
svg1 += `<path d="M 80 ${cy1} Q ${cx1} ${cy1-100} 520 ${cy1}" fill="none" stroke="#263238" stroke-width="80"/>`; // Fundo estroma
// Lamelas
for(let i=-2; i<=2; i++){
    svg1 += `<path d="M 80 ${cy1+i*20} Q ${cx1} ${cy1-100+i*20} 520 ${cy1+i*20}" fill="none" stroke="#0288d1" stroke-width="2"/>`;
}
// Anéis
svg1 += `<polygon points="${cx1-130},${cy1} ${cx1-100},${cy1} ${cx1-115},${cy1-40}" fill="#ff1744" stroke="#ffffff" stroke-width="1"/>`;
svg1 += `<polygon points="${cx1+100},${cy1} ${cx1+130},${cy1} ${cx1+115},${cy1-40}" fill="#ff1744" stroke="#ffffff" stroke-width="1"/>`;
// Forças Radiais livres
svg1 += `<line x1="${cx1-115}" y1="${cy1-50}" x2="${cx1-50}" y2="${cy1-60}" stroke="#00e676" stroke-width="4" marker-end="url(#aG)"/>`;
svg1 += `<line x1="${cx1+115}" y1="${cy1-50}" x2="${cx1+50}" y2="${cy1-60}" stroke="#00e676" stroke-width="4" marker-end="url(#aG)"/>`;
svg1 += `<text x="${cx1}" y="${cy1-70}" fill="#00e676" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">VR Pleno: Deslizamento Livre</text>`;

svg1 += `<text x="300" y="440" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Fibras relaxadas e sem travas cruzadas.</text>`;
svg1 += `<text x="300" y="460" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">O Tenting gera arco de encurtamento</text>`;
svg1 += `<text x="300" y="480" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">que avança até o cone central perfeitamente.</text>`;

// Right Panel: Pós-CXL
svg1 += `<rect x="650" y="120" width="500" height="420" rx="15" fill="#111B24" stroke="#ffb74d" stroke-width="2"/>`;
svg1 += `<rect x="650" y="120" width="500" height="40" rx="15" fill="#ffb74d" opacity="0.1"/>`;
svg1 += `<text x="900" y="146" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">CÓRNEA PÓS-CXL (Escudo Covalente)</text>`;

let cx2 = 900, cy2 = 250;
svg1 += `<path d="M 680 ${cy2} Q ${cx2} ${cy2-100} 1120 ${cy2}" fill="none" stroke="#263238" stroke-width="80"/>`; // Fundo
// CXL Shield
svg1 += `<path d="M 680 ${cy2-30} Q ${cx2} ${cy2-130} 1120 ${cy2-30}" fill="none" stroke="#ffb74d" stroke-width="20" opacity="0.4"/>`;
svg1 += `<text x="${cx2}" y="${cy2-140}" fill="#ffb74d" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Placa Rígida 300μm CXL</text>`;
// Lamelas
for(let i=-2; i<=2; i++){
    svg1 += `<path d="M 680 ${cy2+i*20} Q ${cx2} ${cy2-100+i*20} 1120 ${cy2+i*20}" fill="none" stroke="${i < 0 ? '#b388ff' : '#0288d1'}" stroke-width="2"/>`; // purple if in CXL shield
}
// Anéis
svg1 += `<polygon points="${cx2-130},${cy2} ${cx2-100},${cy2} ${cx2-115},${cy2-40}" fill="#ff1744" stroke="#ffffff" stroke-width="1"/>`;
svg1 += `<polygon points="${cx2+100},${cy2} ${cx2+130},${cy2} ${cx2+115},${cy2-40}" fill="#ff1744" stroke="#ffffff" stroke-width="1"/>`;
// Forças Defletidas
svg1 += `<line x1="${cx2-115}" y1="${cy2-40}" x2="${cx2-80}" y2="${cy2-50}" stroke="#ff1744" stroke-width="4" marker-end="url(#aR)"/>`; // Hit shield
svg1 += `<line x1="${cx2+115}" y1="${cy2-40}" x2="${cx2+80}" y2="${cy2-50}" stroke="#ff1744" stroke-width="4" marker-end="url(#aR)"/>`;
// Força pra baixo (Afundamento)
svg1 += `<line x1="${cx2-115}" y1="${cy2}" x2="${cx2-115}" y2="${cy2+30}" stroke="#ff1744" stroke-width="4" stroke-dasharray="4,2" marker-end="url(#aR)"/>`;
svg1 += `<line x1="${cx2+115}" y1="${cy2}" x2="${cx2+115}" y2="${cy2+30}" stroke="#ff1744" stroke-width="4" stroke-dasharray="4,2" marker-end="url(#aR)"/>`;

svg1 += `<text x="${cx2}" y="${cy2-60}" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">VR Atenuado: Força bate na Barreira</text>`;

svg1 += `<text x="900" y="440" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">A trama anterior esclerosada repele a cunha do PMMA.</text>`;
svg1 += `<text x="900" y="460" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">A energia mecânica não percorre as lamelas,</text>`;
svg1 += `<text x="900" y="480" fill="#ffb74d" font-family="Arial" font-size="14" text-anchor="middle">sendo defletida para o estroma profundo (Mole).</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_15.1_CXL_vs_Virgin.svg'), svg1);
console.log("Figura 15.1 gerada em formato SVG sem sobreposição textual");
