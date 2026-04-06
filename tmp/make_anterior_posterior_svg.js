const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1000;
const h = 700;
const cx = 500;

// Colors
const BG = "#0a1118";
const C_ANT = "#ff1744";   // Anterior tense
const C_POST = "#00e5ff";  // Posterior loose
const C_THICK = "#e0e0e0";
const C_PIO = "#ffd600";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Filters
svg += `
<defs>
    <marker id="arrowPio" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C_PIO}"/>
    </marker>
    <filter id="glowF" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

svg += `<text x="${cx}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 1.6: Por Que Anterior e Posterior Não Concordam</text>`;

// Constants for thickness
const ant_y_top = 220;
const ant_y_bot = 320; // 100px thickness ~ 120um
const post_y_bot = 520; // 200px thickness ~ 330um
const viewW = 600;
const ox = cx - viewW/2;

// Draw Anterior Stroma (Dense, Woven) - 1/3
svg += `<rect x="${ox}" y="${ant_y_top}" width="${viewW}" height="${ant_y_bot - ant_y_top}" fill="#111B24" stroke="#ff5252" stroke-width="2"/>`;
svg += `<text x="${ox - 20}" y="${ant_y_top + 50}" fill="${C_ANT}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="end">Anterior (~120µm)</text>`;
svg += `<text x="${ox - 20}" y="${ant_y_top + 70}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="end">Alta Rigidez, Trama Densa</text>`;

for (let y = ant_y_top + 10; y < ant_y_bot; y += 15) {
    let pathD = `M ${ox} ${y}`;
    for (let x = ox; x <= ox + viewW; x += 15) {
        pathD += ` L ${x} ${y + (Math.random()*8 - 4)}`; // Very jagged/woven
    }
    svg += `<path d="${pathD}" fill="none" stroke="${C_ANT}" stroke-width="2" opacity="0.8"/>`;
}
// Add cross weaves in anterior
for (let x = ox + 20; x < ox + viewW; x += 25) {
    let pathD = `M ${x} ${ant_y_top}`;
    for (let y = ant_y_top; y <= ant_y_bot; y += 15) {
        pathD += ` L ${x + (Math.random()*10 - 5)} ${y}`;
    }
    svg += `<path d="${pathD}" fill="none" stroke="${C_ANT}" stroke-width="2" opacity="0.5"/>`;
}


// Draw Posterior Stroma (Loose, Lamellar) - 2/3
svg += `<rect x="${ox}" y="${ant_y_bot}" width="${viewW}" height="${post_y_bot - ant_y_bot}" fill="#0A1118" stroke="#00e5ff" stroke-width="2"/>`;
svg += `<text x="${ox - 20}" y="${ant_y_bot + 100}" fill="${C_POST}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="end">Posterior (~330µm)</text>`;
svg += `<text x="${ox - 20}" y="${ant_y_bot + 120}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="end">Baixa Rigidez, Lamelas Frouxas</text>`;

for (let y = ant_y_bot + 20; y < post_y_bot; y += 25) { // Wider gap
    let pathD = `M ${ox} ${y} Q ${ox + viewW/4} ${y + 10} ${ox + viewW/2} ${y}`;
    pathD += ` T ${ox + viewW} ${y+5}`; // Smooth curves
    svg += `<path d="${pathD}" fill="none" stroke="${C_POST}" stroke-width="3" opacity="0.6"/>`;
}


// Differences in Astigmatic Axis mapping
// Anterior axis rotates slightly
svg += `<line x1="${ox + 150}" y1="${ant_y_bot + 30}" x2="${ox + 200}" y2="${ant_y_top - 50}" stroke="#ffffff" stroke-width="3" stroke-dasharray="5,5"/>`;
svg += `<text x="${ox + 200}" y="${ant_y_top - 60}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Eixo Ant. (Ex: 95°)</text>`;

// Posterior axis shifted
svg += `<line x1="${ox + 400}" y1="${post_y_bot - 10}" x2="${ox + 500}" y2="${ant_y_top - 50}" stroke="#ffffff" stroke-width="3" stroke-dasharray="5,5"/>`;
svg += `<text x="${ox + 500}" y="${ant_y_top - 60}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Eixo Post. (Ex: 135°)</text>`;

svg += `<path d="M ${ox+200} ${ant_y_top-40} Q ${ox+350} ${ant_y_top+20} ${ox+500} ${ant_y_top-40}" fill="none" stroke="#ffeb3b" stroke-width="2" />`;
svg += `<text x="${ox + 350}" y="${ant_y_top+10}" fill="#ffeb3b" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Rotacionado 15-40°</text>`;


// PIO Force pushing from below
for (let x = ox + 50; x < ox + viewW; x += 100) {
    svg += `<line x1="${x}" y1="${post_y_bot + 60}" x2="${x}" y2="${post_y_bot + 10}" stroke="${C_PIO}" stroke-width="4" marker-end="url(#arrowPio)"/>`;
}
svg += `<text x="${cx}" y="${post_y_bot + 90}" fill="${C_PIO}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Pressão Intraocular (PIO)</text>`;

// Note below PIO
svg += `<text x="${cx}" y="${post_y_bot + 130}" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Redes independentes reagem diferentemente à mesma força vetorial, gerando eixos de astigmatismo desalinhados.</text>`;

svg += `</svg>`;

const outFile2 = path.join(outDir, 'anterior_posterior_v2.svg');
fs.writeFileSync(outFile2, svg);
console.log('SVG Anterior/Posterior Gerado em:', outFile2);
