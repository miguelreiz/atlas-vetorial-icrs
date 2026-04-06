const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-016_Malha_Estromal');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 16.3: Córnea Normal vs Ceratocone
// ==========================================
let svg3 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg3 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 16.3: O Que o Ceratocone Faz com a Malha Estromal</text>`;

// ESQUERDA: Normal
svg3 += `<rect x="50" y="100" width="500" height="400" rx="20" fill="#111B24"/>`;
svg3 += `<text x="300" y="140" fill="#00e676" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">CÓRNEA NORMAL</text>`;

// Epitelio normal
svg3 += `<path d="M 100 240 Q 300 180 500 240 L 500 260 Q 300 200 100 260 Z" fill="#b388ff"/>`; // uniform thickness
svg3 += `<text x="130" y="235" fill="#b388ff" font-family="Arial" font-size="14" font-weight="bold">Epitélio Uniforme</text>`;
// Bowman
svg3 += `<path d="M 100 260 Q 300 200 500 260" fill="none" stroke="#cfd8dc" stroke-width="4"/>`;
// Bow springs originais (suporte)
for(let i=0; i<=6; i++) {
    let px = 150 + i*50;
    let py = 227 + Math.abs(i-3)*13; // curve approx
    svg3 += `<path d="M ${px-20} ${py+60} Q ${px} ${py} ${px+20} ${py+60}" fill="none" stroke="#00e676" stroke-width="3"/>`;
}
// Malha profunda
svg3 += `<path d="M 100 370 Q 300 310 500 370" fill="none" stroke="#263238" stroke-width="2"/>`;
svg3 += `<path d="M 100 400 Q 300 340 500 400" fill="none" stroke="#263238" stroke-width="2"/>`;
svg3 += `<text x="300" y="470" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Fibras em mola suportam a superfície (Ancoragem)</text>`;

// DIREITA: Ceratocone
svg3 += `<rect x="650" y="100" width="500" height="400" rx="20" fill="#1a1114"/>`;
svg3 += `<text x="900" y="140" fill="#ff1744" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">CERATOCONE (Com Ectasia)</text>`;

// Epitelio compensador (fino no centro, grosso perif)
svg3 += `<path d="M 700 240 Q 900 120 1100 240 L 1100 270 Q 900 150 700 270 Z" fill="#b388ff"/>`; // Base
svg3 += `<path d="M 700 240 Q 900 120 1100 240 L 1100 240 Q 900 145 700 240 Z" fill="#1a1114"/>`; // Afina centro
svg3 += `<text x="1050" y="225" fill="#b388ff" font-family="Arial" font-size="14" font-weight="bold">Epitélio Donut</text>`;
// Bowman ectásica
svg3 += `<path d="M 700 270 Q 900 150 1100 270" fill="none" stroke="#cfd8dc" stroke-width="4"/>`;
// Bow springs ROMPIDAS no centro
for(let i=0; i<=6; i++) {
    let px = 750 + i*50;
    let py = 205 + Math.abs(i-3)*14; // curve approx
    if(i===3 || i===4) {
        // Rompida
        svg3 += `<path d="M ${px-20} ${py+60} Q ${px} ${py+20} ${px+5} ${py+10}" fill="none" stroke="#ff1744" stroke-width="2" stroke-dasharray="4,2"/>`;
        svg3 += `<circle cx="${px+5}" cy="${py+10}" r="4" fill="#ff1744"/>`; // ruptura
    } else {
        svg3 += `<path d="M ${px-20} ${py+60} Q ${px} ${py} ${px+20} ${py+60}" fill="none" stroke="#00e676" stroke-width="3"/>`;
    }
}
// Malha profunda ectasica
svg3 += `<path d="M 700 370 Q 900 250 1100 370" fill="none" stroke="#263238" stroke-width="2"/>`;
svg3 += `<path d="M 700 400 Q 900 280 1100 400" fill="none" stroke="#263238" stroke-width="2"/>`;
svg3 += `<text x="900" y="470" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Fibras degradadas (Degeneração) e Epitélio Afinado</text>`;

svg3 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_16.3_KC_Perda_BowSprings.svg'), svg3);


// ==========================================
// FIGURA 16.4: Modelo de 4 Camadas
// ==========================================
let svg4 = `<svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">`;
svg4 += `<rect width="1000" height="700" fill="#0A0E17"/>`;

svg4 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 16.4: O Modelo de 4 Camadas</text>`;
svg4 += `<text x="500" y="80" fill="#b0bec5" font-family="Arial" font-size="16" text-anchor="middle">Como o estroma projeta sua malha para a superfície topográfica</text>`;

const cw = 700, ch = 90, gap = 20;
const startX = 250, startY = 150;

const arr = [
    {n: "CAMADA 4", t: "EPITÉLIO", v: "Reativador de Superfície", c: "#b388ff", d: "Migra em espiral. Afina onde há cume, engrossa sobre os vales (efeito donut)."},
    {n: "CAMADA 3", t: "BOWMAN + MOLAS", v: "Ancoragem Anterior", c: "#cfd8dc", d: "As Bow Springs ('cabos de suspensão') seguram a Bowman, impedindo flutuação."},
    {n: "CAMADA 2", t: "MALHA ANTERIOR (FELTRO)", v: "Oblíquas Interlamelares", c: "#00e676", d: "Rigidez estrutural 4x maior. É AQUI que a frouxidão do ceratocone começa."},
    {n: "CAMADA 1", t: "MALHA POSTERIOR (ORTOGONAL)", v: "Radiais e Tangenciais Paralelas", c: "#0288d1", d: "Fácil dissecção local. A base onde a PIO empurra de baixo para cima."}
];

arr.forEach((box, i) => {
    let bx = startX;
    let by = startY + i*(ch+gap);
    svg4 += `<rect x="${bx}" y="${by}" width="${cw}" height="${ch}" rx="15" fill="#111B24" stroke="${box.c}" stroke-width="3"/>`;
    svg4 += `<rect x="${bx}" y="${by}" width="200" height="${ch}" rx="15" fill="${box.c}" opacity="0.2"/>`;
    
    svg4 += `<text x="${bx+100}" y="${by+35}" fill="${box.c}" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">${box.n}</text>`;
    svg4 += `<text x="${bx+100}" y="${by+60}" fill="#ffffff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">${box.t}</text>`;
    
    svg4 += `<text x="${bx+220}" y="${by+35}" fill="${box.c}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="start">${box.v}</text>`;
    svg4 += `<text x="${bx+220}" y="${by+65}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="start">${box.d}</text>`;
});

// Lado esquerdo = interações
// PIO pushing UP
svg4 += `<line x1="180" y1="620" x2="180" y2="520" stroke="#ff1744" stroke-width="8" marker-end="url(#arrowR)"/>`;
svg4 += `<text x="180" y="650" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PIO empurra</text>`;

// Plácido lendo de CIMA
svg4 += `<line x1="180" y1="50" x2="180" y2="130" stroke="#ffb74d" stroke-width="8" marker-end="url(#arrowO)"/>`;
svg4 += `<text x="180" y="40" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Plácido LÊ a C4</text>`;

// ICRS age em 2 e 1
svg4 += `<rect x="50" y="${startY+2*(ch+gap)}" width="150" height="${ch*2+gap}" rx="10" fill="#00e5ff" opacity="0.1" stroke="#00e5ff" stroke-width="2" stroke-dasharray="5,5"/>`;
svg4 += `<text x="125" y="${startY+2*(ch+gap)+80}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ICRS</text>`;
svg4 += `<text x="125" y="${startY+2*(ch+gap)+105}" fill="#00e5ff" font-family="Arial" font-size="12" text-anchor="middle">Separando C1</text>`;

svg4 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_16.4_Modelo_4_Camadas.svg'), svg4);

console.log('Todos SVGs do CH-016 gerados!');
