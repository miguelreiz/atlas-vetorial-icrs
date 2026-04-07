const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-013_Complicacoes');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 800;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Título
svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle">Figura 13.1: Os 4 Cinetipos do Fracasso Cirúrgico</text>`;
svg += `<text x="${w/2}" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Desconstrução visual de como os vetores agem destrutivamente quando mal planejados</text>`;

// Função auxiliar para desenhar setas sem <marker>
function drawArrow(x1, y1, x2, y2, color, thickness) {
    let s = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${thickness}"/>`;
    
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLen = 15;
    const arrowAngle = Math.PI / 6; // 30 degrees
    
    const x3 = x2 - arrowLen * Math.cos(angle - arrowAngle);
    const y3 = y2 - arrowLen * Math.sin(angle - arrowAngle);
    
    const x4 = x2 - arrowLen * Math.cos(angle + arrowAngle);
    const y4 = y2 - arrowLen * Math.sin(angle + arrowAngle);
    
    s += `<polygon points="${x2},${y2} ${x3},${y3} ${x4},${y4}" fill="${color}"/>`;
    return s;
}

// 1. COMA VERTICAL
svg += `<rect x="80" y="150" width="500" height="280" rx="10" fill="#111B24" stroke="#FFD700" stroke-width="2"/>`;
svg += `<rect x="80" y="150" width="500" height="40" rx="10" fill="#FFD700" opacity="0.1"/>`;
svg += `<text x="100" y="176" fill="#FFD700" font-family="Arial" font-size="18" font-weight="bold">1. COMA VERTICAL (Piora)</text>`;
svg += `<text x="560" y="176" fill="#FFD700" font-family="Arial" font-size="16" font-weight="bold" text-anchor="end">Vτ Invertido</text>`;
svg += `<text x="330" y="390" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Incisão no K-Max (desalinhado do ENM)</text>`;
svg += `<text x="330" y="410" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Gira o ápice ainda mais para baixo</text>`;

// Corneal shapes using cubic beziers instead of ellipses with transforms, or simple ellipses if flat
svg += `<ellipse cx="330" cy="280" rx="60" ry="60" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
svg += `<ellipse cx="330" cy="310" rx="60" ry="70" fill="none" stroke="#FFD700" stroke-width="4"/>`;
// Explicit Arrow 
svg += drawArrow(330, 290, 330, 330, "#FFD700", 4);
svg += `<text x="410" y="280" fill="#FFD700" font-family="Arial" font-size="12">Rotação Inferior</text>`;

// 2. APLAINAMENTO EXCESSIVO
svg += `<rect x="620" y="150" width="500" height="280" rx="10" fill="#111B24" stroke="#00e5ff" stroke-width="2"/>`;
svg += `<rect x="620" y="150" width="500" height="40" rx="10" fill="#00e5ff" opacity="0.1"/>`;
svg += `<text x="640" y="176" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold">2. APLAINAMENTO EXCESSIVO</text>`;
svg += `<text x="1100" y="176" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="end">VR Tóxico</text>`;
svg += `<text x="870" y="390" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Anel muito espesso em córnea fina</text>`;
svg += `<text x="870" y="410" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Cria hipermetropia e abaulamento periférico</text>`;

svg += `<path d="M 770 320 Q 870 200 970 320" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
svg += `<path d="M 770 320 Q 810 280 830 270 L 910 270 Q 930 280 970 320" fill="none" stroke="#00e5ff" stroke-width="4"/>`;
svg += drawArrow(870, 210, 870, 260, "#00e5ff", 5);
svg += `<text x="910" y="230" fill="#00e5ff" font-family="Arial" font-size="12">Hyper-Flattening</text>`;


// 3. ASTIGMATISMO IRREGULAR
svg += `<rect x="80" y="480" width="500" height="280" rx="10" fill="#111B24" stroke="#ffb74d" stroke-width="2"/>`;
svg += `<rect x="80" y="480" width="500" height="40" rx="10" fill="#ffb74d" opacity="0.1"/>`;
svg += `<text x="100" y="506" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold">3. ASTIGMATISMO IRREGULAR</text>`;
svg += `<text x="560" y="506" fill="#ffb74d" font-family="Arial" font-size="16" font-weight="bold" text-anchor="end">VT Conflitante</text>`;
svg += `<text x="330" y="720" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Assimetria de arco não correspondente</text>`;
svg += `<text x="330" y="740" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Incisão fora do eixo fatia o astigmatismo</text>`;

// Draw manually an angled ellipse without using 'transform' which breaks Word!
// M 280 580 Q 380 550 380 640 Q 280 670 280 580
svg += `<path d="M 270 580 C 330 540, 400 590, 390 640 C 330 680, 260 630, 270 580 Z" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
svg += `<line x1="240" y1="610" x2="420" y2="610" stroke="#ffb74d" stroke-width="3" stroke-dasharray="6,4"/>`;
svg += `<text x="330" y="670" fill="#ffb74d" font-family="Arial" font-size="12" text-anchor="middle">Eixo Induzido vs Eixo Nativo</text>`;

// 4. EXTRUSÃO / MELTING
svg += `<rect x="620" y="480" width="500" height="280" rx="10" fill="#111B24" stroke="#ff1744" stroke-width="2"/>`;
svg += `<rect x="620" y="480" width="500" height="40" rx="10" fill="#ff1744" opacity="0.1"/>`;
svg += `<text x="640" y="506" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold">4. EXTRUSÃO / MELTING</text>`;
svg += `<text x="1100" y="506" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold" text-anchor="end">Vetor Endotelial ↑</text>`;
svg += `<text x="870" y="720" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Implante superficial profundo (<70%)</text>`;
svg += `<text x="870" y="740" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Necrose estromal anterior isquêmica</text>`;

svg += `<path d="M 790 610 Q 870 560 950 610" fill="none" stroke="#cfd8dc" stroke-width="8"/>`;
svg += `<rect x="830" y="580" width="20" height="15" fill="#ff1744"/>`;
svg += drawArrow(840, 595, 840, 560, "#ff1744", 4);
svg += `<text x="900" y="590" fill="#ff1744" font-family="Arial" font-size="14">Ruptura Epitelial</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_13.1_Complicacoes_Por_Vetor.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Seguro gerado:', outFile);
