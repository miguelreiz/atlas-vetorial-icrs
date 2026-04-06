const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-006_Vetor_Torque');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_6.4_Torque_Gradiente.svg');

const w = 1200;
const h = 750;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="#0A0E17"/>`;

svg += `
<defs>
    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffb74d" />
    </marker>
</defs>
`;

svg += `<text x="600" y="60" fill="#ffffff" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle">Figura 6.4: O Cisalhamento de Lamelas (Micro-Escala)</text>`;
svg += `<text x="600" y="95" fill="#B0BEC5" font-family="Arial" font-size="18" text-anchor="middle">O gradiente de espessura do anel rotaciona à força a malha estromal natural.</text>`;

// Two Columns: Thin Tip vs Thick Tip, and the Gradient between them
const l1 = 250;
const l2 = 950;
const bY = 500;

// Separators
svg += `<line x1="600" y1="150" x2="600" y2="700" stroke="#455a64" stroke-width="2" stroke-dasharray="10,10"/>`;

svg += `<text x="${l1}" y="200" fill="#cfd8dc" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">A) Fibras na Ponta Fina</text>`;
svg += `<text x="${l2}" y="200" fill="#cfd8dc" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">B) Fibras na Ponta Grossa</text>`;

// Wedges
svg += `<polygon points="${l1-30},${bY} ${l1},${bY-40} ${l1+30},${bY}" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`;
svg += `<polygon points="${l2-60},${bY} ${l2},${bY-180} ${l2+60},${bY}" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`;

svg += `<text x="${l1}" y="${bY+40}" fill="#cfd8dc" font-family="Arial" font-size="18" text-anchor="middle">150 µm (Desvio Mínimo)</text>`;
svg += `<text x="${l2}" y="${bY+40}" fill="#cfd8dc" font-family="Arial" font-size="18" text-anchor="middle">350 µm (Desvio Massivo)</text>`;

// Lamellas taking the path over the wedge
for(let i=0; i<5; i++){
    let hOffset = i*10;
    
    let p1 = `M ${l1-150} ${bY-20-hOffset} Q ${l1} ${bY-60-hOffset} ${l1+150} ${bY-20-hOffset}`;
    svg += `<path d="${p1}" fill="none" stroke="#ffb74d" stroke-width="3" opacity="0.8"/>`;
    
    let p2 = `M ${l2-150} ${bY-20-hOffset} L ${l2-40} ${bY-20-hOffset} Q ${l2} ${bY-240-hOffset} ${l2+40} ${bY-20-hOffset} L ${l2+150} ${bY-20-hOffset}`;
    // FIX: ADDED QUOTES AROUND stroke-width
    svg += `<path d="${p2}" fill="none" stroke="#ff1744" stroke-width="${4 - i*0.5}" opacity="1"/>`;
}

// Visual tension markers
for(let i=-20; i<=20; i+=20){
    svg += `<line x1="${l1+i}" y1="${bY-50}" x2="${l1+i}" y2="${bY-80}" stroke="#00e5ff" stroke-width="2"/>`;
    svg += `<line x1="${l2+i}" y1="${bY-180}" x2="${l2+i}" y2="${bY-300}" stroke="#ff1744" stroke-width="6"/>`;
}
svg += `<text x="${l1}" y="${bY-90}" fill="#00e5ff" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Tensão Baixa</text>`;
svg += `<text x="${l2}" y="${bY-320}" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Tensão Altíssima</text>`;

// The Torque Arrow
const eqY = 650;
svg += `<line x1="${l1+150}" y1="${eqY}" x2="${l2-150}" y2="${eqY}" stroke="#ffb74d" stroke-width="15" marker-end="url(#arrowR)" filter="url(#glowGold)"/>`;
svg += `<text x="600" y="${eqY-20}" fill="#ffb74d" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">← GRADIENTE ESTRUTURAL GERANDO TORQUE →</text>`;
svg += `<text x="600" y="${eqY+35}" fill="#ffffff" font-family="Arial" font-size="16" text-anchor="middle">As fibras na transição física entre a ponta A e a ponta B são violentamente rotacionadas pelo diferencial de força.</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V6.4 Fiber Twist Scale FIXED saved successfully to:', outPath);
