const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 900;
const h = 900;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Filters for glow
svg += `
<defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Figura 1.11: Ceratocone na Escala das Fibras</text>`;

const cx = 450;
const cy = 450;
const rLimbus = 350;

// Base Cornea
svg += `<circle cx="${cx}" cy="${cy}" r="${rLimbus}" fill="#111B24" stroke="#333" stroke-width="2"/>`;

// Ectasia Zone (Inferior Paracentral)
const ex = cx;
const ey = cy + 120;
const er = 100;
svg += `<circle cx="${ex}" cy="${ey}" r="${er}" fill="#ff1744" opacity="0.15" stroke="#ff1744" stroke-width="3" stroke-dasharray="8,4"/>`;
svg += `<text x="${ex}" y="${ey}" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" opacity="0.8" paint-order="stroke" stroke="${bg}" stroke-width="4">Zona do Cone</text>`;

// Fibers
// 1. Limbal Tangential (Blue) - Intact
for(let r=rLimbus-50; r<=rLimbus; r+=15) {
    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2196f3" stroke-width="3" opacity="0.8" filter="url(#glow)"/>`;
}

// 2. Oblique (Green) - Missing/Degrading inside the Cone
for(let a=0; a<360; a+=15) {
    const rad = a * Math.PI/180;
    // We draw random crosshatches
    let startR = 50;
    let endR = rLimbus-50;
    
    let x1 = cx + startR * Math.cos(rad);
    let y1 = cy + startR * Math.sin(rad);
    let x2 = cx + endR * Math.cos(rad+0.5);
    let y2 = cy + endR * Math.sin(rad+0.5);
    
    // Check if path intersects cone
    let inCone = false;
    let midX = (x1+x2)/2;
    let midY = (y1+y2)/2;
    let dCone = Math.sqrt((midX-ex)**2 + (midY-ey)**2);
    
    if(dCone < er + 20) {
        // Missing! don't draw or draw dashed faintly
        svg += `<path d="M ${x1} ${y1} Q ${cx-100} ${cy+100} ${x2} ${y2}" fill="none" stroke="#00e676" stroke-width="1" stroke-dasharray="2,5" opacity="0.3"/>`;
    } else {
        svg += `<path d="M ${x1} ${y1} Q ${cx-100} ${cy+100} ${x2} ${y2}" fill="none" stroke="#00e676" stroke-width="2" opacity="0.6"/>`;
    }
}

// 3. Radial (Red) - Loose and fragmented inside the Cone
for(let a=0; a<360; a+=10) {
    const rad = a * Math.PI/180;
    let x1 = cx;
    let y1 = cy;
    let x2 = cx + (rLimbus-50) * Math.cos(rad);
    let y2 = cy + (rLimbus-50) * Math.sin(rad);
    
    // Check if passes through cone (inferior)
    if(a > 45 && a < 135) { // Roughly inferior
        // Draw wiggly/flaccid line
        let pathD = `M ${x1} ${y1}`;
        for(let t=0.1; t<=1; t+=0.1) {
            let pX = cx + (rLimbus-50)*Math.cos(rad)*t;
            let pY = cy + (rLimbus-50)*Math.sin(rad)*t;
            let wiggle = (Math.random() * 20 - 10);
            pathD += ` L ${pX + wiggle} ${pY + wiggle}`;
        }
        svg += `<path d="${pathD}" fill="none" stroke="#ff1744" stroke-width="3" opacity="0.8"/>`;
        // Draw some fragments
        svg += `<circle cx="${cx + 150*Math.cos(rad)}" cy="${cy + 150*Math.sin(rad)}" r="2" fill="#ff1744"/>`;
    } else {
        // Tense, intact (upper/nasal/temp)
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ff1744" stroke-width="3"/>`;
    }
}

// Legends
svg += `<rect x="50" y="800" width="800" height="60" fill="#111B24" rx="8" stroke="#333"/>`;
svg += `<text x="70" y="825" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold">🔴 Radiais: Frouxas no Cone</text>`;
svg += `<text x="320" y="825" fill="#00e676" font-family="Arial" font-size="16" font-weight="bold">🟢 Oblíquas: Ausentes/Degradadas</text>`;
svg += `<text x="600" y="825" fill="#2196f3" font-family="Arial" font-size="16" font-weight="bold">🔵 Tangenciais: Preservadas</text>`;
svg += `<text x="450" y="850" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Isso explica por que o ceratocone central/paracentral NUNCA se estende ao limbo tangencial forte.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'keratoconus_fiber_damage.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Keratoconus Damage Gerado em:', outFile);
