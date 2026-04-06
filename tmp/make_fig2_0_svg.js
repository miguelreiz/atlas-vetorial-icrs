const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 2.0: Paradoxo Elevação vs Curvatura
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
// Grid de fundo e glow
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg1 += `<defs>
    <filter id="glowBFS" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744"/></marker>
    <marker id="arrowB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#00e5ff"/></marker>
</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 2.0: O Paradoxo da Elevação (Pentacam) vs Tenting Físico</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">A Best-Fit Sphere (BFS) mascara o verdadeiro Tenting anatômico do ICRS na elevação posterior/anterior.</text>`;

// Escala de cores do Pentacam
svg1 += `<defs>
    <linearGradient id="pentacamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0000ff" />
        <stop offset="25%" stop-color="#00aaff" />
        <stop offset="50%" stop-color="#00ff00" />
        <stop offset="75%" stop-color="#ffff00" />
        <stop offset="100%" stop-color="#ff0000" />
    </linearGradient>
</defs>`;

svg1 += `<rect x="400" y="110" width="400" height="15" rx="5" fill="url(#pentacamGrad)"/>`;
svg1 += `<text x="380" y="122" fill="#00aaff" font-family="Arial" font-size="14" font-weight="bold" text-anchor="end">ABAIXO da BFS (Azul)</text>`;
svg1 += `<text x="820" y="122" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold" text-anchor="start">ACIMA da BFS (Vermelho)</text>`;

// --- PAINEL A: PRÉ-OP (Ceratocone) ---
svg1 += `<rect x="50" y="160" width="500" height="400" rx="10" fill="#111B24" stroke="#ffb74d" stroke-width="2"/>`;
svg1 += `<text x="300" y="195" fill="#ffb74d" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">A. PRÉ-OPERATÓRIO (Cone)</text>`;

// Base coordinates
const cx1 = 300, cy1 = 450;
// BFS Curve (Sphere)
// R=200
svg1 += `<path d="M 120 400 Q 300 250 480 400" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="8,8" filter="url(#glowBFS)"/>`;
svg1 += `<text x="300" y="270" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Best Fit Sphere (BFS)</text>`;

// Real Cornea Profile (Cone)
svg1 += `<path d="M 120 400 Q 200 370 270 210 Q 330 210 400 370 Q 480 400 480 400" fill="none" stroke="#ff1744" stroke-width="6"/>`;

// Elevation highlights
svg1 += `<line x1="300" y1="215" x2="300" y2="295" stroke="#ff1744" stroke-width="3" marker-start="url(#arrowR)"/>`;
svg1 += `<text x="320" y="240" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold">Elevação Positiva (+)</text>`;
svg1 += `<text x="320" y="260" fill="#ffb74d" font-family="Arial" font-size="12">Renderizado como VERMELHO</text>`;

// Explicativo A
svg1 += `<rect x="80" y="470" width="440" height="70" rx="5" fill="#0A0E17"/>`;
svg1 += `<text x="300" y="495" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">A Best-Fit Sphere "corta" o cone.</text>`;
svg1 += `<text x="300" y="520" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">A porção anatômica acima da referência se acende em vermelho.</text>`;

// --- PAINEL B: PÓS-OP (ICRS) ---
svg1 += `<rect x="650" y="160" width="500" height="400" rx="10" fill="#111B24" stroke="#00e676" stroke-width="2"/>`;
svg1 += `<text x="900" y="195" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">B. PÓS-OPERATÓRIO (Com ICRS)</text>`;

const cx2 = 900, cy2 = 450;
// NEW BFS Curve (Flatter Surface because cone is gone)
// R=250 -> higher curve
svg1 += `<path d="M 720 400 Q 900 200 1080 400" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="8,8" filter="url(#glowBFS)"/>`;
svg1 += `<text x="900" y="250" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">BFS (Novo Cálculo + Plano)</text>`;

// Real Cornea Profile (Flatter center, tenting sides)
svg1 += `<path d="M 720 400 Q 770 380 800 300 Q 900 270 1000 300 Q 1030 380 1080 400" fill="none" stroke="#0288d1" stroke-width="6"/>`;

// Anéis (Red Triangles)
svg1 += `<polygon points="785,350 815,350 800,320" fill="#ff1744" stroke="#ffffff" stroke-width="1"/>`;
svg1 += `<text x="750" y="320" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold">ICRS</text>`;

svg1 += `<polygon points="985,350 1015,350 1000,320" fill="#ff1744" stroke="#ffffff" stroke-width="1"/>`;
svg1 += `<text x="1050" y="320" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold">ICRS</text>`;

// Tenting Physical vs BFS negative
svg1 += `<line x1="800" y1="300" x2="800" y2="280" stroke="#00e5ff" stroke-width="3" marker-end="url(#arrowB)"/>`;
svg1 += `<text x="760" y="270" fill="#00e5ff" font-family="Arial" font-size="12" font-weight="bold">Elevação Negativa (-)</text>`;
svg1 += `<text x="760" y="250" fill="#00e5ff" font-family="Arial" font-size="12" font-weight="bold">FÍSICO = Tenting real</text>`;

svg1 += `<line x1="900" y1="270" x2="900" y2="245" stroke="#00e5ff" stroke-width="3" marker-end="url(#arrowB)"/>`;
svg1 += `<text x="900" y="235" fill="#0288d1" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Renderizado tudo como AZUL</text>`;

// Explicativo B
svg1 += `<rect x="680" y="470" width="440" height="70" rx="5" fill="#0A0E17"/>`;
svg1 += `<text x="900" y="495" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Como o centro abaulou a nova BFS (achatou), a córnea real,</text>`;
svg1 += `<text x="900" y="520" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">mesmo no bump do anel, fica abaixo do plano teórico.</text>`;


svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_2.0_Elevacao_vs_Curvatura.svg'), svg1);

console.log("Figura 2.0 (Paradoxo do Pentacam) gerada perfeitamente!");
