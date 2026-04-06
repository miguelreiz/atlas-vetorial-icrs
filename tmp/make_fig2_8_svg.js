const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_2.8_Tenting_Simetrico_Assimetrico.svg');

const w = 1200;
const h = 500;

// System Colors
const BG = "#0D1117";
const COL_STROMA = "#EDD9A3";
const COL_RING = "#90A4AE";
const COL_VR = "#CC2200"; // Red
const COL_VTORQUE = "#00CC44"; // Green for Vτ
const COL_TEXT = "#FFFFFF";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

function drawPanel(ox, title, type) {
    let panel = '';
    const cx = ox + 300;
    
    // Unrolled stroma representation
    const baseStromaY = 350;
    panel += `<rect x="${ox+50}" y="${baseStromaY}" width="500" height="100" fill="${COL_STROMA}" opacity="0.8"/>`;
    panel += `<line x1="${ox+50}" y1="${baseStromaY+50}" x2="${ox+550}" y2="${baseStromaY+50}" stroke="#8D6E63" stroke-width="2" opacity="0.5"/>`;

    if (type === 'simetrico') {
        // Uniform Ring Block (Height = 80)
        panel += `<rect x="${ox+150}" y="${baseStromaY - 80}" width="300" height="80" fill="${COL_RING}" stroke="#FFF" stroke-width="2"/>`;
        
        // Tenting above
        panel += `<polygon points="${ox+50},${baseStromaY} ${ox+150},${baseStromaY-80} ${ox+450},${baseStromaY-80} ${ox+550},${baseStromaY}" fill="${COL_STROMA}" opacity="0.6"/>`;
        
        // Vectors
        panel += `<path d="M ${ox+300} ${baseStromaY-90} L ${ox+300} ${baseStromaY-160}" stroke="${COL_VR}" stroke-width="4" fill="none"/>`;
        panel += `<polygon points="${ox+290},${baseStromaY-150} ${ox+310},${baseStromaY-150} ${ox+300},${baseStromaY-170}" fill="${COL_VR}"/>`;
        panel += `<text x="${ox+300}" y="${baseStromaY-185}" fill="${COL_VR}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">VR Puro (Tenting Uniforme)</text>`;

    } else {
        // Progressive Ring Block (Height left = 40, Height right = 140)
        panel += `<polygon points="${ox+150},${baseStromaY} ${ox+150},${baseStromaY-40} ${ox+450},${baseStromaY-140} ${ox+450},${baseStromaY}" fill="${COL_RING}" stroke="#FFF" stroke-width="2"/>`;
        
        // Tenting above (Inclined plane)
        panel += `<polygon points="${ox+50},${baseStromaY} ${ox+150},${baseStromaY-40} ${ox+450},${baseStromaY-140} ${ox+550},${baseStromaY}" fill="${COL_STROMA}" opacity="0.6"/>`;
        
        // Vector VR (Perpendicular to surface)
        panel += `<path d="M ${ox+300} ${baseStromaY-100} L ${ox+280} ${baseStromaY-170}" stroke="${COL_VR}" stroke-width="4" fill="none"/>`;
        panel += `<polygon points="${ox+270},${baseStromaY-160} ${ox+288},${baseStromaY-155} ${ox+277},${baseStromaY-180}" fill="${COL_VR}"/>`;
        
        // Torque Vector Vτ (Rotational arrow because of the gradient)
        panel += `<path d="M ${ox+230} ${baseStromaY-160} Q ${ox+300} ${baseStromaY-230} ${ox+400} ${baseStromaY-160}" stroke="${COL_VTORQUE}" stroke-width="4" fill="none"/>`;
        // Arrow head for torque
        panel += `<polygon points="${ox+390},${baseStromaY-170} ${ox+410},${baseStromaY-160} ${ox+405},${baseStromaY-150}" fill="${COL_VTORQUE}"/>`;
        
        panel += `<text x="${ox+300}" y="${baseStromaY-215}" fill="${COL_VTORQUE}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Vτ (Torque Rotacional)</text>`;
        panel += `<text x="${ox+320}" y="${baseStromaY-40}" fill="${BG}" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Gradiente</text>`;
    }

    panel += `<text x="${cx}" y="100" fill="${COL_TEXT}" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">${title}</text>`;
    return panel;
}

svg += drawPanel(0, 'Espessura Simétrica', 'simetrico');
svg += drawPanel(600, 'Segmento Progressivo (Assimétrico)', 'assimetrico');

// Splitting line
svg += `<line x1="600" y1="50" x2="600" y2="450" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>`;

svg += `<text x="${w/2}" y="40" fill="${COL_TEXT}" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 2.8: Tenting nas Fibras — Simétrico vs Assimétrico</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V2.8 saved successfully to:', outPath);
