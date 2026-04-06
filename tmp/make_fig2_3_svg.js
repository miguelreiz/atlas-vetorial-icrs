const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

let svg1 = `<svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="700" fill="#0A0E17"/>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 2.3: A Cascata Causal do ICRS</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Um único fenômeno físico atuando em 3 escalas dimensionais diferentes</text>`;

svg1 += `<defs>
    <filter id="glowF" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowW" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff"/></marker>
    <marker id="arrowC" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#00e5ff"/></marker>
</defs>`;

const paineis = [
    {x: 50, title: "1. ESCALA MICRO", sub: "Efeito Físico: TENTING", color: "#00e676"},
    {x: 420, title: "2. ESCALA MESO", sub: "Efeito Anatômico: ARC-SHORTENING", color: "#FFD700"},
    {x: 790, title: "3. ESCALA MACRO", sub: "Efeito Óptico: BARRACA (BARRAQUER)", color: "#0B3D91"}
];

// Painéis de Fundo
paineis.forEach((p, i) => {
    svg1 += `<rect x="${p.x}" y="120" width="360" height="500" rx="15" fill="#111B24" stroke="${p.color}" stroke-width="2"/>`;
    svg1 += `<rect x="${p.x}" y="120" width="360" height="60" rx="15" fill="${p.color}" opacity="0.1"/>`;
    svg1 += `<text x="${p.x+180}" y="150" fill="${p.color}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">${p.title}</text>`;
    svg1 += `<text x="${p.x+180}" y="170" fill="#ffffff" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">${p.sub}</text>`;
    
    // Setas entre paineis
    if (i < 2) {
        svg1 += `<line x1="${p.x+370}" y1="370" x2="${p.x+410}" y2="370" stroke="#ffffff" stroke-width="4" marker-end="url(#arrowW)"/>`;
    }
});

// ==========================================
// PAINEL 1: TENTING (MICRO)
// ==========================================
let p1x = 50, p1y = 200;
svg1 += `<text x="${p1x+180}" y="${p1y+30}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">A inserção do volume de PMMA separa</text>`;
svg1 += `<text x="${p1x+180}" y="${p1y+50}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">fisicamente as lamelas de colágeno.</text>`;

let b1 = p1y + 180;
// Lamelas normais
svg1 += `<path d="M ${p1x+50} ${b1-20} L ${p1x+310} ${b1-20}" fill="none" stroke="#0288d1" stroke-width="4" stroke-dasharray="10,5"/>`;
svg1 += `<path d="M ${p1x+50} ${b1+20} L ${p1x+310} ${b1+20}" fill="none" stroke="#0288d1" stroke-width="4" stroke-dasharray="10,5"/>`;
// ICRS no meio separando
svg1 += `<polygon points="${p1x+160},${b1+10} ${p1x+200},${b1+10} ${p1x+180},${b1-30}" fill="#ff1744" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<path d="M ${p1x+50} ${b1} Q ${p1x+120} ${b1} ${p1x+180} ${b1-50} Q ${p1x+240} ${b1} ${p1x+310} ${b1}" fill="none" stroke="#00e676" stroke-width="5"/>`;

svg1 += `<text x="${p1x+180}" y="${b1-70}" fill="#00e676" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Vetor de Tenting (Elevação Local)</text>`;
svg1 += `<line x1="${p1x+180}" y1="${b1-60}" x2="${p1x+180}" y2="${b1-35}" stroke="#00e676" stroke-width="3" marker-end="url(#arrowW)"/>`;

// ==========================================
// PAINEL 2: ARC-SHORTENING (MESO)
// ==========================================
let p2x = 420, p2y = 200;
svg1 += `<text x="${p2x+180}" y="${p2y+30}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">A elevação local (Tenting) consome</text>`;
svg1 += `<text x="${p2x+180}" y="${p2y+50}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">uma extensão de arco, tensionando o centro.</text>`;

let cx = p2x + 180, cy = p2y + 250;
// Córnea Flácida (cinza tracado)
svg1 += `<path d="M ${cx-120} ${cy} A 130 130 0 0 1 ${cx+120} ${cy}" fill="none" stroke="#546e7a" stroke-width="3" stroke-dasharray="5,5"/>`;
// Córnea Tensionada (amarelo) com "bump" do anel
svg1 += `<path d="M ${cx-120} ${cy} 
           Q ${cx-90} ${cy-10} ${cx-70} ${cy-40}
           A 180 180 0 0 1 ${cx+70} ${cy-40}
           Q ${cx+90} ${cy-10} ${cx+120} ${cy}" 
      fill="none" stroke="#FFD700" stroke-width="5" filter="url(#glowF)"/>`;

// Os anéis físicos (pontinhos vermelhos)
svg1 += `<circle cx="${cx-75}" cy="${cy-25}" r="8" fill="#ff1744"/>`;
svg1 += `<circle cx="${cx+75}" cy="${cy-25}" r="8" fill="#ff1744"/>`;

// Setas de encurtamento (Tração para os anéis)
svg1 += `<line x1="${cx-40}" y1="${cy-60}" x2="${cx-70}" y2="${cy-40}" stroke="#00e5ff" stroke-width="3" marker-end="url(#arrowC)"/>`;
svg1 += `<line x1="${cx+40}" y1="${cy-60}" x2="${cx+70}" y2="${cy-40}" stroke="#00e5ff" stroke-width="3" marker-end="url(#arrowC)"/>`;
svg1 += `<text x="${cx}" y="${cy-100}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Encurtamento (Tração Lateral)</text>`;

// ==========================================
// PAINEL 3: BARRACA / BARRAQUER (MACRO)
// ==========================================
let p3x = 790, p3y = 200;
svg1 += `<text x="${p3x+180}" y="${p3y+30}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">O encurtamento enrijece a tenda.</text>`;
svg1 += `<text x="${p3x+180}" y="${p3y+50}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">A Córnea perde curvatura K (Aplainamento).</text>`;

let b3 = p3y + 250;
let mx = p3x + 180;
// Córnea inicial com Cone
svg1 += `<path d="M ${mx-120} ${b3} Q ${mx} ${b3-150} ${mx+120} ${b3}" fill="none" stroke="#ff1744" stroke-width="3" stroke-dasharray="5,5"/>`;
// Córnea Final achatada (Azul Escuro / VR)
svg1 += `<path d="M ${mx-120} ${b3} Q ${mx} ${b3-80} ${mx+120} ${b3}" fill="none" stroke="#0B3D91" stroke-width="6" filter="url(#glowF)"/>`;

// Setas de aplainamento central (VR)
svg1 += `<line x1="${mx}" y1="${b3-140}" x2="${mx}" y2="${b3-90}" stroke="#0B3D91" stroke-width="5" marker-end="url(#arrowW)"/>`;
svg1 += `<line x1="${mx-30}" y1="${b3-130}" x2="${mx-30}" y2="${b3-80}" stroke="#0B3D91" stroke-width="4" marker-end="url(#arrowW)"/>`;
svg1 += `<line x1="${mx+30}" y1="${b3-130}" x2="${mx+30}" y2="${b3-80}" stroke="#0B3D91" stroke-width="4" marker-end="url(#arrowW)"/>`;
svg1 += `<text x="${mx}" y="${b3-170}" fill="#0B3D91" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Radial (VR) Dominante</text>`;

// Formula Barraquer
svg1 += `<rect x="${p3x+50}" y="${b3+30}" width="260" height="70" rx="10" fill="#0A0E17" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<text x="${mx}" y="${b3+60}" fill="#00e676" font-family="Courier New" font-size="16" font-weight="bold" text-anchor="middle">LEI DE BARRAQUER</text>`;
svg1 += `<text x="${mx}" y="${b3+80}" fill="#ffffff" font-family="Courier New" font-size="13" text-anchor="middle">Adicionar na preferia = Achatamento central</text>`;

svg1 += `</svg>`;

fs.writeFileSync(path.join(outDir, 'Figura_2.3_Cascata_Causal_v1.svg'), svg1);
console.log("Figura 2.3 em altíssima resolução SVG finalizada!");
