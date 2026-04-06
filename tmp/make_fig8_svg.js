const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-008_LDM');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 8.1: A Leitura Mecânica do Plácido
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 8.1: Do Topógrafo à Mecânica de Estruturas</text>`;
svg1 += `<text x="600" y="80" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">Metade 1: O mapa visual de curvatura (K-max). Metade 2: O mapa oculto de campos vetoriais e ENM.</text>`;

// Esquerda (Cor Convencional)
const cx1=300, cy1=350;
svg1 += `<rect x="50" y="120" width="500" height="430" rx="20" fill="#111B24" stroke="#ff1744" stroke-width="2"/>`;
svg1 += `<text x="${cx1}" y="160" fill="#ff1744" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Leitura Convencional (Curvatura)</text>`;

for (let r=20; r<=150; r+=20) {
    let ovalR = r + (r/150)*40; 
    svg1 += `<ellipse cx="${cx1}" cy="${cy1}" rx="${r}" ry="${r}" fill="none" stroke="#b0bec5" stroke-width="2" transform="rotate(-30 ${cx1} ${cy1})"/>`;
}
// Kmax heatmap
svg1 += `<ellipse cx="${cx1-30}" cy="${cy1-50}" rx="60" ry="40" fill="#ff1744" opacity="0.6" filter="blur(8px)" transform="rotate(-30 ${cx1-30} ${cy1-50})"/>`;
svg1 += `<circle cx="${cx1-30}" cy="${cy1-50}" r="5" fill="#fff"/>`;
svg1 += `<text x="${cx1-60}" y="${cy1-70}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold">K-max (A consequência)</text>`;


// Direita (Vetor/LDM)
const cx2=900, cy2=350;
svg1 += `<rect x="650" y="120" width="500" height="430" rx="20" fill="#112435" stroke="#00e5ff" stroke-width="2"/>`;
svg1 += `<text x="${cx2}" y="160" fill="#00e5ff" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Leitura LDM (Geometria de Forças)</text>`;

for (let r=20; r<=150; r+=20) {
    let ovalR = r + (r/150)*40; 
    svg1 += `<ellipse cx="${cx2}" cy="${cy2}" rx="${r}" ry="${ovalR}" fill="none" stroke="#00e5ff" stroke-width="2" transform="rotate(-30 ${cx2} ${cy2})"/>`;
}
// VResultante arrow
svg1 += `<line x1="${cx2}" y1="${cy2}" x2="${cx2-60}" y2="${cy2-100}" stroke="#00e5ff" stroke-width="4" marker-end="url(#arrowB)"/>`;
svg1 += `<text x="${cx2-90}" y="${cy2-110}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold">VResultante (A Causa)</text>`;

// ENM
svg1 += `<line x1="${cx2-120}" y1="${cy2-90}" x2="${cx2+120}" y2="${cy2+90}" stroke="#ffffff" stroke-width="3" stroke-dasharray="5,5"/>`;
svg1 += `<text x="${cx2+80}" y="${cy2+110}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold">Linha ENM</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.1_Placido_Mapa_Forcas.svg'), svg1);


// ==========================================
// FIGURA 8.2: Os Três Campos Vetoriais (Fr, Ft, Ftau)
// ==========================================
let svg2 = `<svg viewBox="0 0 1400 500" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1400" height="500" fill="#0A0E17"/>`;

svg2 += `<defs>
    <filter id="glowF" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
</defs>`;
svg2 += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 8.2: O Campo Vetorial Decomposto</text>`;

// F_r
const x1=250, y1=280;
svg2 += `<text x="${x1}" y="120" fill="#0288d1" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Fr (Força Radial)</text>`;
svg2 += `<text x="${x1}" y="150" fill="#8b9ba3" font-family="Arial" font-size="14" text-anchor="middle">Aplainamento/Densidade</text>`;
for(let r=30; r<=120; r+=20) {
    svg2 += `<circle cx="${x1}" cy="${y1}" r="${r}" fill="none" stroke="#0288d1" stroke-width="2"/>`;
}
// Setas radiais
svg2 += `<line x1="${x1+30}" y1="${y1}" x2="${x1+130}" y2="${y1}" stroke="#0288d1" stroke-width="3" marker-end="url(#arrowB)"/>`;
svg2 += `<line x1="${x1-30}" y1="${y1}" x2="${x1-130}" y2="${y1}" stroke="#0288d1" stroke-width="3" marker-end="url(#arrowB)"/>`;

// F_t
const x2=700, y2=280;
svg2 += `<text x="${x2}" y="120" fill="#ff1744" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Ft (Força Tangencial)</text>`;
svg2 += `<text x="${x2}" y="150" fill="#8b9ba3" font-family="Arial" font-size="14" text-anchor="middle">Elipticidade/Cisalhamento</text>`;
for(let r=30; r<=120; r+=20) {
    svg2 += `<ellipse cx="${x2}" cy="${y2}" rx="${r}" ry="${r*1.5}" fill="none" stroke="#ff1744" stroke-width="2"/>`;
}
// Setas cima-baixo elipse
svg2 += `<line x1="${x2}" y1="${y2+30}" x2="${x2}" y2="${y2+180}" stroke="#ff1744" stroke-width="3" marker-end="url(#arrowR)"/>`;
svg2 += `<line x1="${x2}" y1="${y2-30}" x2="${x2}" y2="${y2-180}" stroke="#ff1744" stroke-width="3" marker-end="url(#arrowR)"/>`;

// F_tau
const x3=1150, y3=280;
svg2 += `<text x="${x3}" y="120" fill="#ffb74d" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Fτ (Força Torsional)</text>`;
svg2 += `<text x="${x3}" y="150" fill="#8b9ba3" font-family="Arial" font-size="14" text-anchor="middle">Rotação Angular/Helix</text>`;
for(let i=0; i<=5; i++) {
    let r = 30 + i*18;
    let oval = r*1.3;
    let ang = i*8; // twist
    svg2 += `<ellipse cx="${x3}" cy="${y3}" rx="${r}" ry="${oval}" fill="none" stroke="#ffb74d" stroke-width="2" transform="rotate(${ang} ${x3} ${y3})"/>`;
}
// Setas rodando em loop
svg2 += `<path d="M ${x3+50} ${y3-50} Q ${x3+100} ${y3-20} ${x3+60} ${y3+80}" fill="none" stroke="#ffb74d" stroke-width="3" marker-end="url(#arrowO)"/>`;
svg2 += `<path d="M ${x3-50} ${y3+50} Q ${x3-100} ${y3+20} ${x3-60} ${y3-80}" fill="none" stroke="#ffb74d" stroke-width="3" marker-end="url(#arrowO)"/>`;

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.2_Placido_Vector_Fields.svg'), svg2);


// ==========================================
// FIGURA 8.3: ENM vs K-Max no Duck
// ==========================================
let svg3 = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="800" height="600" fill="#0A0E17"/>`;

svg3 += `<text x="400" y="50" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 8.3: Cuidado Clássico: ENM e K-max não são a mesma coisa.</text>`;

const x=400, y=320;
// Rotated ellipses
for(let i=0; i<10; i++){
    let ang = i*5; 
    let rw = 20 + i*15;
    let rh = rw*1.5;
    svg3 += `<ellipse cx="${x}" cy="${y}" rx="${rw}" ry="${rh}" fill="none" stroke="#b0bec5" stroke-width="2" transform="rotate(${ang} ${x} ${y})"/>`;
}
// K-max spot
svg3 += `<ellipse cx="${x-60}" cy="${y+90}" rx="30" ry="20" fill="#ff1744" filter="url(#glowF)"/>`;
svg3 += `<text x="${x-130}" y="${y+95}" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold">K-max</text>`;

// O Meridiano convencional do K-max (Linha Vermelha)
svg3 += `<line x1="${x+150}" y1="${y-225}" x2="${x-150}" y2="${y+225}" stroke="#ff1744" stroke-width="2" stroke-dasharray="5,5"/>`;

// O ENM real (biseção do twist)
svg3 += `<line x1="${x+200}" y1="${y-50}" x2="${x-200}" y2="${y+50}" stroke="#ffffff" stroke-width="4"/>`;
svg3 += `<text x="${x-250}" y="${y+40}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold">Eixo ENM</text>`;

svg3 += `<rect x="50" y="520" width="700" height="60" rx="10" fill="#111B24"/>`;
svg3 += `<text x="400" y="545" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Implantar no K-max (como ditam nomogramas clássicos) significa atuar dezenas de graus fora da torção real,</text>`;
svg3 += `<text x="400" y="565" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Aumentando o coma e borrando a visão. O anel ideal atua sobre a Reta Branca.</text>`;
svg3 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.3_ENM_vs_Kmax_Duck.svg'), svg3);


// ==========================================
// FIGURA 8.4: Compensation Equation
// ==========================================
let svg4 = `<svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">`;
svg4 += `<rect width="1000" height="600" fill="#0A0E17"/>`;

svg4 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 8.4: A Equação de Compensação</text>`;
svg4 += `<text x="500" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">V_anel (verde) DEVE neutralizar diretamente o V_cone (vermelho).</text>`;

const bx1=250, bx2=750, byy=300;
svg4 += `<circle cx="${bx1}" cy="${byy}" r="150" fill="none" stroke="#263238" stroke-width="4"/>`;
svg4 += `<circle cx="${bx2}" cy="${byy}" r="150" fill="none" stroke="#263238" stroke-width="4"/>`;

// Cone pulling left
svg4 += `<line x1="${bx1}" y1="${byy}" x2="${bx1-150}" y2="${byy}" stroke="#ff1744" stroke-width="12" marker-end="url(#arrowR)" filter="url(#glowF)"/>`;
svg4 += `<text x="${bx1-150}" y="${byy-20}" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold">V_cone (Problema)</text>`;

// Solucao pulling right identically
svg4 += `<line x1="${bx2}" y1="${byy}" x2="${bx2-150}" y2="${byy}" stroke="#ff1744" stroke-width="6" opacity="0.3"/>`; // fantasma do problema
svg4 += `<line x1="${bx2}" y1="${byy}" x2="${bx2+150}" y2="${byy}" stroke="#00e676" stroke-width="12" marker-end="url(#arrowG)" filter="url(#glowF)"/>`;
svg4 += `<text x="${bx2+20}" y="${byy-20}" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold">V_anel (Solução ICRS)</text>`;

// Math result box
svg4 += `<rect x="250" y="500" width="500" height="70" rx="15" fill="#111B24" stroke="#ffffff" stroke-width="2"/>`;
svg4 += `<text x="500" y="540" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">| V_anel | = | - V_cone |  = Zero Distorção</text>`;

svg4 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.4_Compensation_Equation.svg'), svg4);

console.log('Todos SVGs do CH-008 gerados!');
