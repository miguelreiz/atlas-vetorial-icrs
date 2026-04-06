const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1000;
const h = 700;
const cx = 500;
const cy = 350;
const r = 250;

// Colors
const BG = "#0a1118";
const C_STEEP = "#ff1744"; // Dense/Tense
const C_FLAT = "#0288d1";  // Loose/Spaced
const C_LINE = "#cfd8dc";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Glows
svg += `
<defs>
    <filter id="glowS" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Title
svg += `<text x="${cx}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 1.5: Astigmatismo na Linguagem das Fibras</text>`;

// Cornea base
svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#111B24" stroke="#333" stroke-width="2"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="${r+10}" fill="none" stroke="#222" stroke-width="1" stroke-dasharray="4,4"/>`;

// Draw Flat Axis Fibers (Horizontal - Loose - Blue)
// Widely spaced, wavy
for(let y = cy - r + 30; y < cy + r - 30; y += 40) {
    let dx = Math.sqrt(r*r - Math.pow(y-cy, 2)) * 0.95;
    
    // Wave pattern for loose fibers
    let pathD = `M ${cx - dx} ${y}`;
    for(let x = cx - dx; x <= cx + dx; x += 30) {
        let waveY = y + (Math.random() * 8 - 4); // Wiggle
        pathD += ` L ${x} ${waveY}`;
    }
    
    svg += `<path d="${pathD}" fill="none" stroke="${C_FLAT}" stroke-width="3" opacity="0.6"/>`;
}

// Draw Steep Axis Fibers (Vertical - Dense/Tense - Red)
// Tightly spaced, perfectly straight
for(let x = cx - r + 80; x < cx + r - 80; x += 12) {
    let dy = Math.sqrt(r*r - Math.pow(x-cx, 2)) * 0.95;
    
    svg += `<line x1="${x}" y1="${cy - dy}" x2="${x}" y2="${cy + dy}" stroke="${C_STEEP}" stroke-width="3" opacity="0.85" filter="url(#glowS)"/>`;
}


// Axis annotations overlay
// Horizontal Line
svg += `<line x1="${cx - r - 40}" y1="${cy}" x2="${cx + r + 40}" y2="${cy}" stroke="${C_FLAT}" stroke-width="4" stroke-dasharray="8,4"/>`;
svg += `<text x="${cx - r - 50}" y="${cy+5}" fill="${C_FLAT}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="end">K-flat (180°)</text>`;
svg += `<text x="${cx - r - 50}" y="${cy+25}" fill="${C_FLAT}" font-family="Arial" font-size="14" text-anchor="end">Fibras Frouxas / Espaçadas</text>`;

// Vertical Line
svg += `<line x1="${cx}" y1="${cy - r - 40}" x2="${cx}" y2="${cy + r + 40}" stroke="${C_STEEP}" stroke-width="4" stroke-dasharray="8,4"/>`;
svg += `<text x="${cx}" y="${cy - r - 60}" fill="${C_STEEP}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">K-steep (90°)</text>`;
svg += `<text x="${cx}" y="${cy - r - 45}" fill="${C_STEEP}" font-family="Arial" font-size="14" text-anchor="middle">Fibras Densas / Tensas</text>`;


// Central Pupil Context
svg += `<circle cx="${cx}" cy="${cy}" r="40" fill="#000" opacity="0.5" stroke="#444"/>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'astigmatism_fiber_mesh.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Astigmatism Gerado em:', outFile);
