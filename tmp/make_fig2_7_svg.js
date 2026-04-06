const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_2.7_Poisson_ArcShortening.svg');

const w = 800;
const h = 800;
const cx = 400;
const cy = 400;
const r_limbus = 350;
const r_ring = 200;

// Colors
const BG = "#0D1117";
const COL_FIBER_RADIAL = "#CC2200"; // Red
const COL_FIBER_TANGEN = "#00B4DC"; // Blue
const COL_RING = "#90A4AE";
const COL_TEXT = "#FFFFFF";
const COL_DIM = "#78909C";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Limbal Border
svg += `<circle cx="${cx}" cy="${cy}" r="${r_limbus}" fill="none" stroke="${COL_DIM}" stroke-width="2" stroke-dasharray="8,8"/>`;
svg += `<text x="${cx}" y="${cy - r_limbus - 10}" fill="${COL_DIM}" font-family="Arial" font-size="14" text-anchor="middle">Limbo</text>`;

// Center marker
svg += `<circle cx="${cx}" cy="${cy}" r="4" fill="${COL_TEXT}"/>`;

// PMMA Rings (Two symmetrical segments left/right)
// Rings placed at r=200, arcs between angles -45 to 45 (Right) and 135 to 225 (Left)
function drawRingBlock(cx, cy, r, startAngle, endAngle, thickness) {
    const start_x1 = cx + (r - thickness/2) * Math.cos(startAngle * Math.PI / 180);
    const start_y1 = cy + (r - thickness/2) * Math.sin(startAngle * Math.PI / 180);
    const end_x1 = cx + (r - thickness/2) * Math.cos(endAngle * Math.PI / 180);
    const end_y1 = cy + (r - thickness/2) * Math.sin(endAngle * Math.PI / 180);
    
    const start_x2 = cx + (r + thickness/2) * Math.cos(startAngle * Math.PI / 180);
    const start_y2 = cy + (r + thickness/2) * Math.sin(startAngle * Math.PI / 180);
    const end_x2 = cx + (r + thickness/2) * Math.cos(endAngle * Math.PI / 180);
    const end_y2 = cy + (r + thickness/2) * Math.sin(endAngle * Math.PI / 180);

    const path = `M ${start_x1} ${start_y1} 
                  A ${r - thickness/2} ${r - thickness/2} 0 0 1 ${end_x1} ${end_y1}
                  L ${end_x2} ${end_y2} 
                  A ${r + thickness/2} ${r + thickness/2} 0 0 0 ${start_x2} ${start_y2} Z`;
                  
    return `<path d="${path}" fill="${COL_RING}" stroke="#FFFFFF" stroke-width="2" opacity="0.9"/>`;
}

svg += drawRingBlock(cx, cy, r_ring, -50, 50, 40);
svg += drawRingBlock(cx, cy, r_ring, 130, 230, 40);

// Draw Radial Fibers
for (let angle = 0; angle < 360; angle += 15) {
    const rad = angle * Math.PI / 180;
    const isRingZone = ((angle >= 310 || angle <= 50) || (angle >= 130 && angle <= 230));
    
    if (isRingZone) {
        // Red Radial fibers hit the ring and detour (Arc-Shortening concept)
        // Fiber goes out to r=180, then bulges, then resumes at r=220
        const in_x = cx + Math.cos(rad)*180;
        const in_y = cy + Math.sin(rad)*180;
        const out_x = cx + Math.cos(rad)*220;
        const out_y = cy + Math.sin(rad)*220;
        const final_x = cx + Math.cos(rad)*(r_limbus - 10);
        const final_y = cy + Math.sin(rad)*(r_limbus - 10);
        
        svg += `<line x1="${cx}" y1="${cy}" x2="${in_x}" y2="${in_y}" stroke="${COL_FIBER_RADIAL}" stroke-width="2"/>`;
        svg += `<path d="M ${in_x} ${in_y} Q ${cx + Math.cos(rad)*200 + Math.sin(rad)*40} ${cy + Math.sin(rad)*200 - Math.cos(rad)*40} ${out_x} ${out_y}" fill="none" stroke="${COL_FIBER_RADIAL}" stroke-width="2"/>`;
        svg += `<line x1="${out_x}" y1="${out_y}" x2="${final_x}" y2="${final_y}" stroke="${COL_FIBER_RADIAL}" stroke-width="2"/>`;
    } else {
        // Fibers in the perpendicular axes (Poisson effect) are blue, meaning they loosened due to the pull on the X axis
        const end_x = cx + Math.cos(rad)*(r_limbus - 10);
        const end_y = cy + Math.sin(rad)*(r_limbus - 10);
        svg += `<line x1="${cx}" y1="${cy}" x2="${end_x}" y2="${end_y}" stroke="${COL_FIBER_TANGEN}" stroke-width="2" stroke-dasharray="4,4"/>`;
    }
}

// Annotation arrows VR
svg += `<line x1="${cx+r_ring+30}" y1="${cy}" x2="${cx+r_ring+100}" y2="${cy}" stroke="${COL_FIBER_RADIAL}" stroke-width="4"/>`;
svg += `<polygon points="${cx+r_ring+90},${cy-10} ${cx+r_ring+100},${cy} ${cx+r_ring+90},${cy+10}" fill="${COL_FIBER_RADIAL}"/>`;
svg += `<text x="${cx+r_ring+65}" y="${cy-15}" fill="${COL_FIBER_RADIAL}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">VR (Arc-Shortening)</text>`;

svg += `<line x1="${cx-(r_ring+30)}" y1="${cy}" x2="${cx-(r_ring+100)}" y2="${cy}" stroke="${COL_FIBER_RADIAL}" stroke-width="4"/>`;
svg += `<polygon points="${cx-(r_ring+90)},${cy-10} ${cx-(r_ring+100)},${cy} ${cx-(r_ring+90)},${cy+10}" fill="${COL_FIBER_RADIAL}"/>`;
svg += `<text x="${cx-(r_ring+65)}" y="${cy-15}" fill="${COL_FIBER_RADIAL}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">VR (Arc-Shortening)</text>`;

// Annotation arrows VT (Poisson Equivalent)
svg += `<line x1="${cx}" y1="${cy-100}" x2="${cx}" y2="${cy-170}" stroke="${COL_FIBER_TANGEN}" stroke-width="4"/>`;
svg += `<polygon points="${cx-10},${cy-160} ${cx},${cy-170} ${cx+10},${cy-160}" fill="${COL_FIBER_TANGEN}"/>`;
svg += `<text x="${cx+15}" y="${cy-140}" fill="${COL_FIBER_TANGEN}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="start">VT (Efeito de Poisson / Relaxamento Ortogonal)</text>`;

svg += `<text x="${cx}" y="${h - 40}" fill="${COL_TEXT}" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Figura 2.7: Arc-Shortening e o Paradoxo de Poisson</text>`;
svg += `<text x="${cx}" y="${h - 15}" fill="#B0BEC5" font-family="Arial" font-size="14" text-anchor="middle">Fibras radiais estiradas pelo anel (VR Vermelho) causam afrouxamento passivo no meridiano a 90° (VT Azul)</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V2.7 saved successfully to:', outPath);
