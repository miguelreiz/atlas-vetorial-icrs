const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {fs.mkdirSync(outDir, {recursive: true});}

function arrowMarker(id, color) {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker>`;
}

// ===============================================
// FIG 2.6: Triangular vs Flat (Interação Fibras)
// ===============================================
let svg1 = `<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1000" height="500" fill="#0A0E17"/>`;
svg1 += `<defs>${arrowMarker('aR','#ff1744')}${arrowMarker('aG','#00e676')}</defs>`;
svg1 += `<text x="500" y="40" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 2.6: Triangular vs Flat (Interação com a Malha)</text>`;

// Painéis
svg1 += `<rect x="50" y="80" width="400" height="380" rx="10" fill="#111B24" stroke="#ff1744" stroke-width="2"/>`;
svg1 += `<text x="250" y="115" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PERFIL TRIANGULAR (Cunha)</text>`;
svg1 += `<text x="250" y="135" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Tenting Focal → Risco de Haze</text>`;

let c1x = 250, c1y = 280;
// Lamelas
for(let i=-2; i<=2; i++) {
    let dy = i * 15;
    if(i < 0) svg1 += `<path d="M ${c1x-150} ${c1y+dy} Q ${c1x} ${c1y-80+dy} ${c1x+150} ${c1y+dy}" fill="none" stroke="#0288d1" stroke-width="3"/>`;
    if(i > 0) svg1 += `<path d="M ${c1x-150} ${c1y+dy} Q ${c1x} ${c1y+20+dy} ${c1x+150} ${c1y+dy}" fill="none" stroke="#0288d1" stroke-width="3"/>`;
}
// Anel Triangular
svg1 += `<polygon points="${c1x-30},${c1y+30} ${c1x+30},${c1y+30} ${c1x},${c1y-60}" fill="#ff1744" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<line x1="${c1x}" y1="${c1y-60}" x2="${c1x}" y2="${c1y-100}" stroke="#ff1744" stroke-width="4" marker-end="url(#aR)"/>`;
svg1 += `<text x="${c1x}" y="${c1y-110}" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Pico de Tensão (170 kPa)</text>`;

svg1 += `<rect x="550" y="80" width="400" height="380" rx="10" fill="#111B24" stroke="#00B4DC" stroke-width="2"/>`;
svg1 += `<text x="750" y="115" fill="#00B4DC" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PERFIL FLAT / ARREDONDADO</text>`;
svg1 += `<text x="750" y="135" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Modulação Difusa → Menos Haze</text>`;

let c2x = 750, c2y = 280;
for(let i=-2; i<=2; i++) {
    let dy = i * 15;
    if(i < 0) svg1 += `<path d="M ${c2x-150} ${c2y+dy} Q ${c2x} ${c2y-50+dy} ${c2x+150} ${c2y+dy}" fill="none" stroke="#0288d1" stroke-width="3"/>`;
    if(i > 0) svg1 += `<path d="M ${c2x-150} ${c2y+dy} Q ${c2x} ${c2y+20+dy} ${c2x+150} ${c2y+dy}" fill="none" stroke="#0288d1" stroke-width="3"/>`;
}
// Anel Arredondado
svg1 += `<path d="M ${c2x-40} ${c2y+30} L ${c2x+40} ${c2y+30} Q ${c2x+50} ${c2y} ${c2x} ${c2y-20} Q ${c2x-50} ${c2y} ${c2x-40} ${c2y+30}" fill="#00B4DC" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<line x1="${c2x-20}" y1="${c2y-20}" x2="${c2x-30}" y2="${c2y-60}" stroke="#00B4DC" stroke-width="3" marker-end="url(#aC)"/>`;
svg1 += `<line x1="${c2x+20}" y1="${c2y-20}" x2="${c2x+30}" y2="${c2y-60}" stroke="#00B4DC" stroke-width="3" marker-end="url(#aC)"/>`;
svg1 += `<text x="${c2x}" y="${c2y-80}" fill="#00B4DC" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Tensão Distribuída (81 kPa)</text>`;
svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_2.6_Triangular_vs_Flat.svg'), svg1);


// ===============================================
// FIG 2.7: Poisson Arc Shortening
// ===============================================
let svg2 = `<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1000" height="500" fill="#0A0E17"/>`;
svg2 += `<defs>${arrowMarker('aB','#0B3D91')}${arrowMarker('aY','#FFD700')}</defs>`;
svg2 += `<text x="500" y="40" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 2.7: Arc-Shortening e Efeito de Poisson</text>`;

svg2 += `<circle cx="500" cy="280" r="180" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
svg2 += `<path d="M 500 100 Q 560 280 500 460" fill="none" stroke="#0B3D91" stroke-width="6"/>`; // VR inward
svg2 += `<line x1="560" y1="280" x2="520" y2="280" stroke="#0B3D91" stroke-width="5" marker-end="url(#aB)"/>`;
svg2 += `<text x="700" y="285" fill="#0B3D91" font-family="Arial" font-size="16" font-weight="bold">VR (Encurtamento Radial)</text>`;

svg2 += `<path d="M 320 280 Q 500 180 680 280" fill="none" stroke="#FFD700" stroke-width="6"/>`; // VT outward
svg2 += `<line x1="500" y1="180" x2="500" y2="140" stroke="#FFD700" stroke-width="5" marker-end="url(#aY)"/>`;
svg2 += `<text x="500" y="120" fill="#FFD700" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">VT (Efeito Poisson: Abaulamento Cruzado)</text>`;
svg2 += `<text x="500" y="480" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Compressão no eixo do anel gera expansão no eixo perpendicular</text>`;
svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_2.7_Poisson_ArcShortening.svg'), svg2);


// ===============================================
// FIG 2.8: Tenting Simetrico vs Assimetrico
// ===============================================
let svg3 = `<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="1000" height="500" fill="#0A0E17"/>`;
svg3 += `<text x="500" y="40" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 2.8: Tenting Simétrico vs Assimétrico</text>`;

svg3 += `<rect x="50" y="80" width="400" height="380" rx="10" fill="#111B24"/>`;
svg3 += `<text x="250" y="115" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ANEL SIMÉTRICO (VR PURO)</text>`;
let cx3 = 250, cy3 = 300;
svg3 += `<rect x="${cx3-80}" y="${cy3}" width="40" height="60" rx="5" fill="#00e676"/>`;
svg3 += `<rect x="${cx3+40}" y="${cy3}" width="40" height="60" rx="5" fill="#00e676"/>`;
svg3 += `<line x1="${cx3-60}" y1="${cy3}" x2="${cx3-60}" y2="${cy3-40}" stroke="#00e676" stroke-width="4" marker-end="url(#aG)"/>`;
svg3 += `<line x1="${cx3+60}" y1="${cy3}" x2="${cx3+60}" y2="${cy3-40}" stroke="#00e676" stroke-width="4" marker-end="url(#aG)"/>`;
svg3 += `<path d="M 50 ${cy3} Q ${cx3} ${cy3-80} 450 ${cy3}" fill="none" stroke="#cfd8dc" stroke-width="4"/>`;

svg3 += `<rect x="550" y="80" width="400" height="380" rx="10" fill="#111B24"/>`;
svg3 += `<text x="750" y="115" fill="#FFD700" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ANEL ASSIMÉTRICO (VT + Vτ)</text>`;
let cx4 = 750, cy4 = 300;
// Grossa vs Fina
svg3 += `<rect x="${cx4-80}" y="${cy4}" width="40" height="80" rx="5" fill="#FFD700"/>`; // Grossa
svg3 += `<rect x="${cx4+40}" y="${cy4}" width="40" height="30" rx="5" fill="#FFD700"/>`; // Fina
svg3 += `<path d="M 550 ${cy4} Q ${cx4} ${cy4-120} 950 ${cy4+20}" fill="none" stroke="#cfd8dc" stroke-width="4"/>`;
svg3 += `<line x1="${cx4-60}" y1="${cy4}" x2="${cx4-60}" y2="${cy4-60}" stroke="#FFD700" stroke-width="5" marker-end="url(#aY)"/>`;
svg3 += `<line x1="${cx4+60}" y1="${cy4}" x2="${cx4+60}" y2="${cy4-20}" stroke="#FFD700" stroke-width="2" marker-end="url(#aY)"/>`;
svg3 += `<path d="M ${cx4-60} ${cy4-80} Q ${cx4} ${cy4-100} ${cx4+60} ${cy4-40}" fill="none" stroke="#ff1744" stroke-width="4" marker-end="url(#aR)"/>`; // Torque
svg3 += `<text x="750" y="180" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Torque Rotacional (Vτ)</text>`;

svg3 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_2.8_Tenting_Simetrico_Assimetrico.svg'), svg3);

console.log("Arquivos do Chapter 2 gerados!");
