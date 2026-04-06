const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_2.6_Triangular_vs_Flat.svg');

const w = 1400;
const h = 600;

// Colors
const BG = "#0a1118"; 
const COL_EPI = "#3e2723";
const COL_STROMA = "#1e1711";
const COL_FIBRA = "#ffb74d";
const COL_RING = "#cfd8dc";
const COL_VR_STRONG = "#ff1744"; // Neon Red
const COL_VR_WEAK = "#ff8a80";
const COL_VT = "#00e5ff"; // Neon Cyan

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Add definitions for gradients and glows
svg += `
<defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#90a4ae"/>
    </linearGradient>
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Helper to draw biological fibers
function drawFiber(ox, y_orig, ring_cx, ring_w, ring_h, type, isAbove) {
    if (!isAbove) {
        // Fibers below the ring are straight
        return `<line x1="${ox+50}" y1="${y_orig}" x2="${ox+650}" y2="${y_orig}" stroke="${COL_FIBRA}" stroke-width="2.5" opacity="0.6"/>`;
    }
    
    // Fibers above the ring bend over it
    // Calculate how much it should bend based on proximity to the ring top
    const apex_y = 350 - ring_h; // ring base is 350
    let bend_amount = 0;
    
    if (y_orig > apex_y - 80) { // If it's close enough to be pushed up
        // The closer to the apex, the higher it goes
        bend_amount = Math.max(0, (y_orig - (apex_y-40)));
    }
    
    if (bend_amount === 0) {
        return `<line x1="${ox+50}" y1="${y_orig}" x2="${ox+650}" y2="${y_orig}" stroke="${COL_FIBRA}" stroke-width="2.5" opacity="0.6"/>`;
    }

    const peak_y = Math.min(y_orig, apex_y - 10 + (y_orig - apex_y)*0.5); // Push up
    
    if (type === 'triangular') {
        const spread = ring_w * 0.8; 
        const control_x1 = ring_cx - spread;
        const control_x2 = ring_cx + spread;
        return `<path d="M ${ox+50} ${y_orig} Q ${control_x1} ${y_orig}, ${ring_cx} ${peak_y} Q ${control_x2} ${y_orig}, ${ox+650} ${y_orig}" fill="none" stroke="${COL_FIBRA}" stroke-width="2.5" opacity="0.8"/>`;
    } else {
        const spread = ring_w * 1.5; // wider drape for flat
        const p_start = ring_cx - spread/2;
        const p_end = ring_cx + spread/2;
        return `<path d="M ${ox+50} ${y_orig} C ${p_start} ${y_orig}, ${ring_cx-ring_w/3} ${peak_y}, ${ring_cx} ${peak_y} C ${ring_cx+ring_w/3} ${peak_y}, ${p_end} ${y_orig}, ${ox+650} ${y_orig}" fill="none" stroke="${COL_FIBRA}" stroke-width="2.5" opacity="0.8"/>`;
    }
}

function drawPanel(ox, title, type) {
    let panel = '';
    const cx = ox + 350;
    const baseY = 400; // Ring base
    
    // Stroma Box
    panel += `<rect x="${ox+50}" y="150" width="600" height="350" fill="${COL_STROMA}" rx="15" opacity="0.9"/>`;
    panel += `<rect x="${ox+50}" y="100" width="600" height="50" fill="${COL_EPI}" rx="15" opacity="0.9"/>`;

    // Fibers
    const ring_w = type === 'triangular' ? 120 : 180;
    const ring_h = type === 'triangular' ? 140 : 60;
    const apex_y = baseY - ring_h;

    // Draw fibers ABOVE ring
    for (let y = 170; y <= baseY-5; y += 15) {
        panel += drawFiber(ox, y, cx, ring_w, ring_h, type, true);
    }
    // Draw fibers BELOW ring
    for (let y = baseY + 15; y <= 480; y += 15) {
        panel += drawFiber(ox, y, cx, ring_w, ring_h, type, false);
    }

    if (type === 'triangular') {
        // Triangular Ring
        panel += `<polygon points="${cx},${apex_y} ${cx-ring_w/2},${baseY} ${cx+ring_w/2},${baseY}" fill="url(#ringGrad)" stroke="#FFFFFF" stroke-width="2"/>`;
        
        // Wedging forces (VR Strong)
        // Arrows erupting horizontally from the sharp walls
        panel += `<line x1="${cx-50}" y1="${baseY-50}" x2="${cx-200}" y2="${baseY-50}" stroke="${COL_VR_STRONG}" stroke-width="6" filter="url(#glowRed)"/>`;
        panel += `<polygon points="${cx-190},${baseY-60} ${cx-190},${baseY-40} ${cx-210},${baseY-50}" fill="${COL_VR_STRONG}" filter="url(#glowRed)"/>`;

        panel += `<line x1="${cx+50}" y1="${baseY-50}" x2="${cx+200}" y2="${baseY-50}" stroke="${COL_VR_STRONG}" stroke-width="6" filter="url(#glowRed)"/>`;
        panel += `<polygon points="${cx+190},${baseY-60} ${cx+190},${baseY-40} ${cx+210},${baseY-50}" fill="${COL_VR_STRONG}" filter="url(#glowRed)"/>`;

        // Labels
        panel += `<text x="${cx-130}" y="${baseY-70}" fill="${COL_VR_STRONG}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">VR Concentrado</text>`;
        panel += `<text x="${cx+130}" y="${baseY-70}" fill="${COL_VR_STRONG}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">VR Concentrado</text>`;

        // Bottom text block
        panel += `<rect x="${cx-150}" y="520" width="300" height="40" fill="#261010" rx="8"/>`;
        panel += `<text x="${cx}" y="545" fill="#ff5252" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Efeito CUNHA: Divisão de Lamelas</text>`;

    } else {
        // Flat/Dome Ring
        panel += `<path d="M ${cx-ring_w/2} ${baseY} Q ${cx} ${apex_y-20} ${cx+ring_w/2} ${baseY} Z" fill="url(#ringGrad)" stroke="#FFFFFF" stroke-width="2"/>`;
        
        // Diffuse Forces (VR Weak)
        panel += `<line x1="${cx-80}" y1="${baseY-30}" x2="${cx-160}" y2="${baseY-30}" stroke="${COL_VR_WEAK}" stroke-width="3"/>`;
        panel += `<polygon points="${cx-150},${baseY-36} ${cx-150},${baseY-24} ${cx-165},${baseY-30}" fill="${COL_VR_WEAK}"/>`;

        panel += `<line x1="${cx+80}" y1="${baseY-30}" x2="${cx+160}" y2="${baseY-30}" stroke="${COL_VR_WEAK}" stroke-width="3"/>`;
        panel += `<polygon points="${cx+150},${baseY-36} ${cx+150},${baseY-24} ${cx+165},${baseY-30}" fill="${COL_VR_WEAK}"/>`;

        // Tangential Cushion Friction (VT)
        panel += `<line x1="${cx-100}" y1="${baseY-60}" x2="${cx-100}" y2="${baseY-140}" stroke="${COL_VT}" stroke-width="4"/>`;
        panel += `<polygon points="${cx-108},${baseY-130} ${cx-92},${baseY-130} ${cx-100},${baseY-145}" fill="${COL_VT}"/>`;

        panel += `<line x1="${cx+100}" y1="${baseY-60}" x2="${cx+100}" y2="${baseY-140}" stroke="${COL_VT}" stroke-width="4"/>`;
        panel += `<polygon points="${cx+92},${baseY-130} ${cx+108},${baseY-130} ${cx+100},${baseY-145}" fill="${COL_VT}"/>`;

        // Labels
        panel += `<text x="${cx-120}" y="${baseY-40}" fill="${COL_VR_WEAK}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">VR Difuso</text>`;
        panel += `<text x="${cx+120}" y="${baseY-40}" fill="${COL_VR_WEAK}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">VR Difuso</text>`;

        panel += `<text x="${cx}" y="${baseY-160}" fill="${COL_VT}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">+ VT (Atrito Superficial)</text>`;

        // Bottom text block
        panel += `<rect x="${cx-150}" y="520" width="300" height="40" fill="#0d2329" rx="8"/>`;
        panel += `<text x="${cx}" y="545" fill="${COL_VT}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Efeito ALMOFADA: Estiramento Ocular</text>`;
    }
    
    panel += `<text x="${cx}" y="60" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">${title}</text>`;
    return panel;
}

svg += drawPanel(0, 'Perfil Triangular (Sólido Cuneiforme)', 'triangular');
svg += drawPanel(700, 'Perfil Flat / Dome (Sólido Convexo)', 'flat');

svg += `<line x1="700" y1="20" x2="700" y2="580" stroke="#455a64" stroke-width="2" stroke-dasharray="8,8"/>`;
svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V2.6 Advanced saved successfully to:', outPath);
