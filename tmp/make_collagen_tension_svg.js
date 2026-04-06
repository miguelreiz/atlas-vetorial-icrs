const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 700;
const bg = "#0a1118";
const cx = w/2;
const cy = h/2;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Quality glow
svg += `
<defs>
    <filter id="pmmaGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="pmmaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="50%" stop-color="#80deea"/>
        <stop offset="100%" stop-color="#006064"/>
    </linearGradient>
</defs>
`;

svg += `<text x="${cx}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Figura 1.2: Visão Microscópica do Efeito Separador (PMMA)</text>`;

// Draw Stroma Tissue Context (Large rectangle)
svg += `<rect x="50" y="150" width="1100" height="400" fill="#111B24" rx="20"/>`;

// Side normal fibers (Relaxed, Wavy, blueish/grayish)
for(let y=180; y<=520; y+=30) {
    // Left side
    let pathL = `M 50 ${y}`;
    for(let x=50; x<=cx-150; x+=30) {
        let wr = Math.random()*15 - 7.5;
        pathL += ` L ${x} ${y + wr}`;
    }
    svg += `<path d="${pathL}" fill="none" stroke="#546e7a" stroke-width="3" opacity="0.6"/>`;
    
    // Right side
    let pathR = `M ${cx+150} ${y}`;
    for(let x=cx+150; x<=1150; x+=30) {
        let wr = Math.random()*15 - 7.5;
        pathR += ` L ${x} ${y + wr}`;
    }
    svg += `<path d="${pathR}" fill="none" stroke="#546e7a" stroke-width="3" opacity="0.6"/>`;
}

// PMMA Insert Center
const pW = 100;
const pH = 180;
svg += `<path d="M ${cx - pW/2} ${cy + pH/2} L ${cx - pW/2} ${cy} L ${cx + pW/2} ${cy - pH/2} L ${cx + pW/2} ${cy + pH/2} Z" fill="url(#pmmaGradient)" stroke="#00e5ff" stroke-width="3" filter="url(#pmmaGlow)"/>`;

// Fibers squeezed and reacting over and under PMMA
// Tensile Fibers (Red, taut, perfectly smooth curves wrapping the PMMA tightly)
for(let y=180; y<=340; y+=25) {
    let bend = 380 - y;
    svg += `<path d="M 50 ${y} Q ${cx-200} ${y} ${cx-pW/2-20} ${y - bend/3} Q ${cx} ${y - bend} ${cx+pW/2+20} ${y - bend/3} Q ${cx+200} ${y} 1150 ${y}" fill="none" stroke="#ff1744" stroke-width="4" filter="url(#pmmaGlow)"/>`;
}
for(let y=360; y<=520; y+=25) {
    let bend = y - 320;
    svg += `<path d="M 50 ${y} Q ${cx-200} ${y} ${cx-pW/2-20} ${y + bend/4} Q ${cx} ${y + bend/2} ${cx+pW/2+20} ${y + bend/4} Q ${cx+200} ${y} 1150 ${y}" fill="none" stroke="#ff1744" stroke-width="4" filter="url(#pmmaGlow)"/>`;
}

// Tension indicators (Red arrows ripping out from center)
svg += `<path d="M ${cx-400} 350 L ${cx-500} 350" stroke="#ff1744" stroke-width="6" fill="none" marker-end="url(#arrowTense)"/>`;
svg += `<path d="M ${cx+400} 350 L ${cx+500} 350" stroke="#ff1744" stroke-width="6" fill="none" marker-end="url(#arrowTense)"/>`;
svg += `<text x="${cx-450}" y="330" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Tensão Radial (VR)</text>`;
svg += `<text x="${cx+450}" y="330" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Tensão Radial (VR)</text>`;

svg += `
<defs>
    <marker id="arrowTense" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744"/>
    </marker>
</defs>
`;

svg += `<rect x="100" y="580" width="1000" height="90" fill="#111B24" rx="8" stroke="#333"/>`;
svg += `<text x="${cx}" y="615" fill="#00e5ff" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">O PMMA Atua como uma Cunha Expansora</text>`;
svg += `<text x="${cx}" y="645" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Adicionar volume entre lamelas inextensíveis gera separação vertical, que o tecido tenta compensar gerando tração horizontal massiva nas fibras radiais.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'collagen_tension_mechanism.svg');
fs.writeFileSync(outFile, outFile !== undefined ? svg : '');
console.log('SVG Collagen Reformulado Gerado em:', outFile);
