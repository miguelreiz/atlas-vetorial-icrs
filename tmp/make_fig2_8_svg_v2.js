const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_2.8_Tenting_Simetrico_Assimetrico.svg');

const w = 1400;
const h = 600;

// Colors
const BG = "#0a1118"; 
const COL_EPI = "#3e2723";
const COL_STROMA = "#1e1711";
const COL_FIBRA = "#ffb74d";
const COL_RING = "#cfd8dc";
const COL_VR = "#ff1744";      // Red for Radial
const COL_VTORQUE = "#00e5ff"; // Cyan / Green for Torque
const COL_TEXT = "#ffffff";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Add Gradients
svg += `
<defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#78909c"/>
    </linearGradient>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Helper for drawing fibers accurately over a plateau or ramp
function drawFiber(ox, baseY, yLayer, ringX, ringW, H_L, H_R, isAbove) {
    if (!isAbove) {
        // Fibers below just go straight
        return `<line x1="${ox+50}" y1="${baseY + yLayer}" x2="${ox+550}" y2="${baseY + yLayer}" stroke="${COL_FIBRA}" stroke-width="2.5" opacity="0.6"/>`;
    }

    // Is pushed up?
    // Max pushing happens depending on thickness.
    // If yLayer is 10, it's pushed by H_L and H_R exactly, if higher, slightly less push
    const ringY_L = baseY - H_L;
    const ringY_R = baseY - H_R;
    
    // We want the fiber to have a smooth transition
    // p1 = start, p2 = ramp start, p3 = ramp end, p4 = end
    const p1x = ox+50;
    const p4x = ox+550;
    
    const p2x = ringX - 50; 
    const p3x = ringX + ringW + 50;

    const liftL = Math.max(0, H_L - yLayer);
    const liftR = Math.max(0, H_R - yLayer);
    
    const peakL_y = (baseY - Math.max(H_L, H_R)) + yLayer - liftL;
    const peakR_y = (baseY - Math.max(H_L, H_R)) + yLayer - liftR;
    
    // Smooth spline
    return `<path d="M ${p1x} ${baseY - Math.max(H_L, H_R) + yLayer} C ${p2x} ${baseY - Math.max(H_L, H_R) + yLayer}, ${ringX-20} ${peakL_y}, ${ringX} ${peakL_y} L ${ringX+ringW} ${peakR_y} C ${ringX+ringW+20} ${peakR_y}, ${p3x} ${baseY - Math.max(H_L, H_R) + yLayer}, ${p4x} ${baseY - Math.max(H_L, H_R) + yLayer}" fill="none" stroke="${COL_FIBRA}" stroke-width="2.5" opacity="0.8"/>`;
}

function drawPanel(ox, title, type) {
    let panel = '';
    const cx = ox + 300;
    const baseY = 400; // Ring base
    const ringW = 200;
    const ringStartX = cx - ringW/2;
    
    // Stroma Box
    panel += `<rect x="${ox+50}" y="200" width="500" height="280" fill="${COL_STROMA}" rx="10" opacity="0.9"/>`;
    panel += `<rect x="${ox+50}" y="150" width="500" height="50" fill="${COL_EPI}" rx="10" opacity="0.9"/>`;

    let H_L = 100;
    let H_R = 100;
    
    if (type === 'progressivo') {
        H_L = 40;  // Thin end
        H_R = 140; // Thick end
    }

    // Fibers ABOVE
    for (let y = -20; y >= -150; y -= 15) {
        panel += drawFiber(ox, baseY, y, ringStartX, ringW, H_L, H_R, true);
    }
    // Fibers BELOW
    for (let y = +20; y <= 60; y += 15) {
        panel += drawFiber(ox, baseY, y, ringStartX, ringW, H_L, H_R, false);
    }

    // Draw the Ring
    panel += `<polygon points="${ringStartX},${baseY} ${ringStartX},${baseY-H_L} ${ringStartX+ringW},${baseY-H_R} ${ringStartX+ringW},${baseY}" fill="url(#ringGrad)" stroke="#FFFFFF" stroke-width="2"/>`;

    // Visual Mechanics
    if (type === 'simetrico') {
        const topY = baseY - H_L;
        // Central plateau -> Pure vertical lift (VR)
        for (let vx = ringStartX + 40; vx <= ringStartX + ringW - 40; vx += 60) {
            panel += `<line x1="${vx}" y1="${topY - 10}" x2="${vx}" y2="${topY - 60}" stroke="${COL_VR}" stroke-width="4"/>`;
            panel += `<polygon points="${vx-5},${topY-55} ${vx+5},${topY-55} ${vx},${topY-65}" fill="${COL_VR}"/>`;
        }
        panel += `<text x="${cx}" y="${topY - 80}" fill="${COL_VR}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">VR PURO (Elevação Uniforme)</text>`;
        
        panel += `<rect x="${cx-100}" y="500" width="200" height="40" fill="#2d1d1d" rx="5"/>`;
        panel += `<text x="${cx}" y="525" fill="#ff5252" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Platô Estromal Simétrico</text>`;
    } else {
        const topY_L = baseY - H_L;
        const topY_R = baseY - H_R;
        // Inclined Ramp -> Generates torque
        
        // Minor VR at left
        panel += `<line x1="${ringStartX + 20}" y1="${topY_L - 10}" x2="${ringStartX + 20}" y2="${topY_L - 40}" stroke="${COL_VR}" stroke-width="2"/>`;
        panel += `<polygon points="${ringStartX + 15},${topY_L-35} ${ringStartX + 25},${topY_L-35} ${ringStartX + 20},${topY_L-45}" fill="${COL_VR}"/>`;

        // Major VR at right
        panel += `<line x1="${ringStartX + ringW - 20}" y1="${topY_R - 10}" x2="${ringStartX + ringW - 20}" y2="${topY_R - 80}" stroke="${COL_VR}" stroke-width="6"/>`;
        panel += `<polygon points="${ringStartX + ringW - 28},${topY_R-70} ${ringStartX + ringW - 12},${topY_R-70} ${ringStartX + ringW - 20},${topY_R-85}" fill="${COL_VR}"/>`;
        
        // Massive Torque arrow following the slope
        const tPath = `M ${ringStartX + 30} ${topY_L - 60} Q ${cx} ${topY_R - 100} ${ringStartX + ringW + 40} ${topY_R - 120}`;
        panel += `<path d="${tPath}" fill="none" stroke="${COL_VTORQUE}" stroke-width="5" filter="url(#glowGreen)"/>`;
        // Arrowhead
        panel += `<polygon points="${ringStartX + ringW + 20},${topY_R - 105} ${ringStartX + ringW + 35},${topY_R - 130} ${ringStartX + ringW + 50},${topY_R - 120}" fill="${COL_VTORQUE}" filter="url(#glowGreen)"/>`;
        
        panel += `<text x="${cx}" y="${topY_R - 150}" fill="${COL_VTORQUE}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Vτ TORQUE (Rotação pelo Gradiente)</text>`;

        panel += `<rect x="${cx-130}" y="500" width="260" height="40" fill="#003333" rx="5"/>`;
        panel += `<text x="${cx}" y="525" fill="#00e5ff" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Plano Inclinado (Diferença Volumétrica)</text>`;
    }
    
    panel += `<text x="${cx}" y="80" fill="${COL_TEXT}" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">${title}</text>`;
    return panel;
}

svg += drawPanel(0, 'Anel de Espessura Única (Simétrico)', 'simetrico');
svg += drawPanel(700, 'Segmento de Espessura Progressiva (Assimétrico)', 'progressivo');

svg += `<line x1="700" y1="30" x2="700" y2="570" stroke="#455a64" stroke-width="2" stroke-dasharray="8,8"/>`;

svg += `<text x="${w/2}" y="580" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">A diferença de implantação de volume entre as pontas cria um Rampa de Tensão (Plano inclinado) que empurra a córnea rotacionalmente.</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V2.8 Advanced saved successfully to:', outPath);
