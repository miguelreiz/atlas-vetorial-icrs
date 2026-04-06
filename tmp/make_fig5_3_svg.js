const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-005_VT');
if (!fs.existsSync(outDir)) {fs.mkdirSync(outDir, {recursive: true});}

function arrow(id, color) {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker>`;
}

let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;
svg1 += `<defs>${arrow('aB','#0B3D91')}${arrow('aG','#00e676')}${arrow('aR','#ff1744')}</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 5.3: A Regra da Incisão Certa vs Errada (VT)</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Como a força tangencial atua nos pólos do astigmatismo</text>`;

// Left Panel: Errado
svg1 += `<rect x="50" y="120" width="500" height="420" rx="15" fill="#111B24" stroke="#ff1744" stroke-width="2"/>`;
svg1 += `<rect x="50" y="120" width="500" height="40" rx="15" fill="#ff1744" opacity="0.1"/>`;
svg1 += `<text x="300" y="146" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Incisão Errada (Eixo Plano)</text>`;

let cx1 = 300, cy1 = 300;
// Oval (vertical astigmatism)
svg1 += `<ellipse cx="${cx1}" cy="${cy1}" rx="80" ry="140" fill="none" stroke="#cfd8dc" stroke-width="3" stroke-dasharray="4,4"/>`;
svg1 += `<text x="${cx1}" y="${cy1-150}" fill="#cfd8dc" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Meridiano Curvo</text>`;
svg1 += `<text x="${cx1+110}" y="${cy1}" fill="#cfd8dc" font-family="Arial" font-size="14" font-weight="bold" text-anchor="start">Plano</text>`;

// Incision at the flat axis (right side)
svg1 += `<line x1="${cx1+70}" y1="${cy1}" x2="${cx1+100}" y2="${cy1}" stroke="#ff1744" stroke-width="4"/>`; // Incision mark
// Rings placed horizontally
svg1 += `<path d="M ${cx1+90} ${cy1-10} Q ${cx1+10} ${cy1-140} ${cx1-70} ${cy1-10}" fill="none" stroke="#00B4DC" stroke-width="12" opacity="0.7"/>`;
svg1 += `<path d="M ${cx1+90} ${cy1+10} Q ${cx1+10} ${cy1+140} ${cx1-70} ${cy1+10}" fill="none" stroke="#00B4DC" stroke-width="12" opacity="0.7"/>`;

// Forces (tangential pushing along the ring)
svg1 += `<path d="M ${cx1+80} ${cy1-20} A 80 140 0 0 0 ${cx1} ${cy1-140}" fill="none" stroke="#00B4DC" stroke-width="4" marker-end="url(#aB)"/>`;
svg1 += `<path d="M ${cx1+80} ${cy1+20} A 80 140 0 0 1 ${cx1} ${cy1+140}" fill="none" stroke="#00B4DC" stroke-width="4" marker-end="url(#aB)"/>`;
svg1 += `<text x="${cx1}" y="${cy1}" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">ATRASO / BORBOLETA</text>`;
svg1 += `<text x="300" y="480" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Criou novo astigmatismo a 90º.</text>`;

// Right Panel: Certo
svg1 += `<rect x="650" y="120" width="500" height="420" rx="15" fill="#111B24" stroke="#00e676" stroke-width="2"/>`;
svg1 += `<rect x="650" y="120" width="500" height="40" rx="15" fill="#00e676" opacity="0.1"/>`;
svg1 += `<text x="900" y="146" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Incisão Certa (Eixo Curvo)</text>`;

let cx2 = 900, cy2 = 300;
svg1 += `<ellipse cx="${cx2}" cy="${cy2}" rx="80" ry="140" fill="none" stroke="#cfd8dc" stroke-width="3" stroke-dasharray="4,4"/>`;

// Incision at the steep axis (top)
svg1 += `<line x1="${cx2}" y1="${cy2-130}" x2="${cx2}" y2="${cy2-160}" stroke="#00e676" stroke-width="4"/>`;
// Rings placed vertically
svg1 += `<path d="M ${cx2-10} ${cy2-140} Q ${cx2-90} ${cy2} ${cx2-10} ${cy2+140}" fill="none" stroke="#00B4DC" stroke-width="12" opacity="0.8"/>`;
svg1 += `<path d="M ${cx2+10} ${cy2-140} Q ${cx2+90} ${cy2} ${cx2+10} ${cy2+140}" fill="none" stroke="#00B4DC" stroke-width="12" opacity="0.8"/>`;

// Forces squeezing the sides OUTWARD ? No, tangential pushes away from incision, stretching the meridian. 
// Actually, tangential forces expand the flat meridian and shorten the steep one.
svg1 += `<path d="M ${cx2-20} ${cy2-130} A 80 140 0 0 0 ${cx2-80} ${cy2}" fill="none" stroke="#00B4DC" stroke-width="4" marker-end="url(#aB)"/>`;
svg1 += `<path d="M ${cx2+20} ${cy2-130} A 80 140 0 0 1 ${cx2+80} ${cy2}" fill="none" stroke="#00B4DC" stroke-width="4" marker-end="url(#aB)"/>`;

// The result is circularization
svg1 += `<circle cx="${cx2}" cy="${cy2}" r="110" fill="none" stroke="#00e676" stroke-width="3"/>`;
svg1 += `<text x="${cx2}" y="${cy2}" fill="#00e676" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">ARREDONDAMENTO</text>`;
svg1 += `<text x="900" y="480" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">A elipse é forçada a virar um círculo perfeito.</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_Incision_Axis.svg'), svg1);
console.log("Figura Incision Axis do Chapter 5 gerada!");
