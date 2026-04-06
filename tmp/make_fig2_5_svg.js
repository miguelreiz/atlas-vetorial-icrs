const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1000;
const h = 800;

// Colors matching project style
const BG = "#0a1118";
const C_RAD = "#ff1744"; // Red for VR / Radial
const C_TAN = "#00e5ff"; // Cyan for VT / Tangential
const C_OBL = "#00e676"; // Green for Vτ / Oblique
const C_STROMA = "#1e1711";
const C_RING = "#ffcc00";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Filters and Markers
svg += `
<defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C_RAD}"/>
    </marker>
    <marker id="arrowT" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C_TAN}"/>
    </marker>
    <marker id="arrowO" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${C_OBL}"/>
    </marker>
</defs>
`;

// Title
svg += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 2.5: Correção na Escala das Fibras</text>`;

const cx = 500, cy = 450;
const r_limbus = 350;
const r_cone = 120;
const ring_r = 160;

// Cornea base (Limbus)
svg += `<circle cx="${cx}" cy="${cy}" r="${r_limbus}" fill="${C_STROMA}" stroke="#333" stroke-width="2"/>`;

// Ectasia Zone (Cone pre-op context loosely shown)
svg += `<circle cx="${cx-20}" cy="${cy+30}" r="${r_cone}" fill="none" stroke="#222" stroke-width="3" stroke-dasharray="8,8"/>`;
svg += `<text x="${cx-20}" y="${cy+30}" fill="#555" font-family="Arial" font-size="16" font-style="italic" text-anchor="middle">Zona Ectásica</text>`;


// DRAW FIBERS
// 1. OBLIQUE (Green) - Stabilizing cone region
for(let a = 120; a < 240; a += 15) {
    const rad = a * Math.PI / 180;
    const x1 = cx + (ring_r+20) * Math.cos(rad);
    const y1 = cy + (ring_r+20) * Math.sin(rad);
    const x2 = cx + r_limbus * Math.cos(rad + 0.3);
    const y2 = cy + r_limbus * Math.sin(rad + 0.3);
    
    // Draw them crossing
    const x3 = cx + (ring_r+20) * Math.cos(rad);
    const y3 = cy + (ring_r+20) * Math.sin(rad);
    const x4 = cx + r_limbus * Math.cos(rad - 0.3);
    const y4 = cy + r_limbus * Math.sin(rad - 0.3);
    
    svg += `<path d="M ${x1} ${y1} Q ${cx-150} ${cy+100} ${x2} ${y2}" fill="none" stroke="${C_OBL}" stroke-width="2" opacity="0.6"/>`;
    svg += `<path d="M ${x3} ${y3} Q ${cx-150} ${cy+100} ${x4} ${y4}" fill="none" stroke="${C_OBL}" stroke-width="2" opacity="0.6"/>`;
}

// 2. RADIAL (Red) - Pre and post ring
for (let a = 0; a < 360; a += 10) {
    const rad = a * Math.PI / 180;
    // Inside ring (flaccid before, now tense)
    const x_in = cx + (ring_r-5) * Math.cos(rad);
    const y_in = cy + (ring_r-5) * Math.sin(rad);
    svg += `<line x1="${cx}" y1="${cy}" x2="${x_in}" y2="${y_in}" stroke="${C_RAD}" stroke-width="2" opacity="0.8"/>`;

    // Outside ring (tense)
    const x_out = cx + (ring_r+5) * Math.cos(rad);
    const y_out = cy + (ring_r+5) * Math.sin(rad);
    const x_edge = cx + r_limbus * Math.cos(rad);
    const y_edge = cy + r_limbus * Math.sin(rad);
    svg += `<line x1="${x_out}" y1="${y_out}" x2="${x_edge}" y2="${y_edge}" stroke="${C_RAD}" stroke-width="3" opacity="0.5"/>`;
}


// ICRS Ring segments
// Segment 1 (Top / right)
const r1_start = -45 * Math.PI/180;
const r1_end = 80 * Math.PI/180;
svg += `<path d="M ${cx+ring_r*Math.cos(r1_start)} ${cy+ring_r*Math.sin(r1_start)} A ${ring_r} ${ring_r} 0 0 1 ${cx+ring_r*Math.cos(r1_end)} ${cy+ring_r*Math.sin(r1_end)}" fill="none" stroke="${C_RING}" stroke-width="15" stroke-linecap="round" filter="url(#glow)"/>`;

// Segment 2 (Bottom / Left)
const r2_start = 120 * Math.PI/180;
const r2_end = 260 * Math.PI/180;
svg += `<path d="M ${cx+ring_r*Math.cos(r2_start)} ${cy+ring_r*Math.sin(r2_start)} A ${ring_r} ${ring_r} 0 0 1 ${cx+ring_r*Math.cos(r2_end)} ${cy+ring_r*Math.sin(r2_end)}" fill="none" stroke="${C_RING}" stroke-width="22" stroke-linecap="round" filter="url(#glow)"/>`;


// 3. TANGENTIAL (Cyan) - New artificial bounding
svg += `<path d="M ${cx+ring_r*Math.cos(r1_start)} ${cy+ring_r*Math.sin(r1_start)} A ${ring_r} ${ring_r} 0 0 1 ${cx+ring_r*Math.cos(r1_end)} ${cy+ring_r*Math.sin(r1_end)}" fill="none" stroke="${C_TAN}" stroke-width="4" stroke-dasharray="5,5" opacity="0.9"/>`;
svg += `<path d="M ${cx+ring_r*Math.cos(r2_start)} ${cy+ring_r*Math.sin(r2_start)} A ${ring_r} ${ring_r} 0 0 1 ${cx+ring_r*Math.cos(r2_end)} ${cy+ring_r*Math.sin(r2_end)}" fill="none" stroke="${C_TAN}" stroke-width="5" stroke-dasharray="5,5" opacity="0.9"/>`;

// Vectors overlaid
// VR Arrows
svg += `<line x1="${cx+40}" y1="${cy}" x2="${cx+ring_r-15}" y2="${cy}" stroke="${C_RAD}" stroke-width="4" marker-end="url(#arrowR)" filter="url(#glow)"/>`;
svg += `<line x1="${cx-40}" y1="${cy}" x2="${cx-ring_r+15}" y2="${cy}" stroke="${C_RAD}" stroke-width="4" marker-end="url(#arrowR)" filter="url(#glow)"/>`;

// VT Arrows
svg += `<path d="M ${cx+(ring_r-20)*Math.cos(180*Math.PI/180)} ${cy+(ring_r-20)*Math.sin(180*Math.PI/180)} A ${ring_r-20} ${ring_r-20} 0 0 1 ${cx+(ring_r-20)*Math.cos(150*Math.PI/180)} ${cy+(ring_r-20)*Math.sin(150*Math.PI/180)}" fill="none" stroke="${C_TAN}" stroke-width="4" marker-end="url(#arrowT)" filter="url(#glow)"/>`;

// VTau Arrows
svg += `<path d="M ${cx-40} ${cy+120} Q ${cx-80} ${cy+160} ${cx-120} ${cy+140}" fill="none" stroke="${C_OBL}" stroke-width="3" marker-end="url(#arrowO)" filter="url(#glow)"/>`;


// LEGEND BOX
svg += `<rect x="50" y="80" width="360" height="150" fill="#111B24" rx="8" stroke="#333"/>`;
svg += `<text x="70" y="110" fill="${C_RAD}" font-family="Arial" font-size="18" font-weight="bold">🔴 Radiais (VR) → Retesamento</text>`;
svg += `<text x="70" y="145" fill="${C_TAN}" font-family="Arial" font-size="18" font-weight="bold">🔵 Tangenciais (VT) → Linha Fixa</text>`;
svg += `<text x="70" y="180" fill="${C_OBL}" font-family="Arial" font-size="18" font-weight="bold">🟢 Oblíquas (Vτ) → Estabilizador</text>`;
svg += `<text x="70" y="210" fill="#ffffff" font-family="Arial" font-size="14">Implante gera nova estabilidade bio-tensegrida</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_2.5_Diametro_Fibra_Vetor.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG V2.5 Gerado em:', outFile);
