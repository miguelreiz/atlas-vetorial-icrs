const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-006_Vetor_Torque');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_6.3_Reposicionamento_Cone.svg');

const w = 1200;
const h = 750;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="#0A0E17"/>`;

svg += `
<defs>
    <filter id="glowCenter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e676" />
    </marker>
</defs>
`;

svg += `<text x="600" y="60" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">Figura 6.3: A Cura do Cone "Sagging" (Descido)</text>`;
svg += `<text x="600" y="100" fill="#B0BEC5" font-family="Arial" font-size="20" text-anchor="middle">O Torque rotaciona massivamente o ápice da ectasia em direção ao Eixo Visual (Pupila).</text>`;

const cx = 600;
const cy = 430;

// Grid (Target Cornea)
svg += `<circle cx="${cx}" cy="${cy}" r="250" fill="none" stroke="#263238" stroke-width="2"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#263238" stroke-width="2" stroke-dasharray="8,4"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="#37474f" stroke-width="1" stroke-dasharray="2,2"/>`;
svg += `<line x1="${cx-270}" y1="${cy}" x2="${cx+270}" y2="${cy}" stroke="#263238" stroke-width="2"/>`;
svg += `<line x1="${cx}" y1="${cy-270}" x2="${cx}" y2="${cy+270}" stroke="#263238" stroke-width="2"/>`;

// Eixo Visual / Centro Pupilar / Target!
svg += `<path d="M ${cx-20} ${cy} L ${cx+20} ${cy} M ${cx} ${cy-20} L ${cx} ${cy+20}" fill="none" stroke="#00e5ff" stroke-width="4"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="6" fill="#00e5ff" filter="url(#glowCenter)"/>`;
svg += `<text x="${cx+30}" y="${cy-20}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold">Centro Visual Ideal</text>`;


// Posição ORIGINAL do Cone Sagging (Deslocado inferior-temporalmente)
const coneX = cx + 80;
const coneY = cy + 120;
// Forma oval vermelha (Heatmap)
svg += `<ellipse cx="${coneX}" cy="${coneY}" rx="90" ry="70" fill="none" stroke="#ff1744" stroke-width="4" stroke-dasharray="6,4" opacity="0.4"/>`;
svg += `<ellipse cx="${coneX}" cy="${coneY}" rx="40" ry="30" fill="#ff1744" opacity="0.3"/>`;
svg += `<circle cx="${coneX}" cy="${coneY}" r="5" fill="#ff1744"/>`;
svg += `<text x="${coneX+50}" y="${coneY+20}" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold" opacity="0.6">Cone Sagging Antigo</text>`;


// The Asymmetric Ring Fragment (e.g. Keraring/AJL) implanted inferiorly.
// Thick base goes exactly beneath the Cone's apex (coneX, coneY... well roughly South East)
const rRing = 200;
// Implante de 160 graus, na parte inferior. (0 graus eh Leste, 90 eh Sul)
// Base grossa no cone (quadrante infero-nasal ou temporal dependendo do olho. Let's assume bottom right).
// The ring thickens from angle 30 to angle 150.
const arcPts = [];
const thMin = 4; // Visual thickness of thin ring
const thMax = 32; // Visual thickness of thick ring
for(let i=150; i>=30; i--){
    const rad = i * Math.PI/180;
    // Calculate progressive thickness
    const prop = (150-i) / 120; // 0 at 150, 1 at 30
    const th = thMin + (thMax - thMin) * prop;
    
    // inner point
    const rIn = rRing - th/2;
    // outer point
    const rOut = rRing + th/2;
    
    const xIn = cx + Math.cos(rad)*rIn;
    const yIn = cy + Math.sin(rad)*rIn;
    const xOut = cx + Math.cos(rad)*rOut;
    const yOut = cy + Math.sin(rad)*rOut;
    
    // Save inner and outer paths
    arcPts.push({xIn, yIn, xOut, yOut, th});
}

// Build SVG paths for the asymmetric ring
let dInner = `M ${arcPts[0].xIn} ${arcPts[0].yIn}`;
let dOuter = `M ${arcPts[arcPts.length-1].xOut} ${arcPts[arcPts.length-1].yOut}`;
for(let i=1; i<arcPts.length; i++) dInner += ` L ${arcPts[i].xIn} ${arcPts[i].yIn}`;
for(let i=arcPts.length-2; i>=0; i--) dOuter += ` L ${arcPts[i].xOut} ${arcPts[i].yOut}`;

const ringPath = `${dInner} L ${arcPts[arcPts.length-1].xOut} ${arcPts[arcPts.length-1].yOut} ${dOuter} Z`;
svg += `<path d="${ringPath}" fill="#cfd8dc" stroke="#ffffff" stroke-width="2"/>`;


// Labels for Ring
// Thin edge is at 150 deg (bottom left)
const thinX = cx + Math.cos(150*Math.PI/180)*230;
const thinY = cy + Math.sin(150*Math.PI/180)*230;
svg += `<text x="${thinX-10}" y="${thinY}" fill="#cfd8dc" font-family="Arial" font-size="18" font-weight="bold" text-anchor="end">Fino (150µm)</text>`;

// Thick edge is at 30 deg (bottom right, near the red cone)
const thickX = cx + Math.cos(30*Math.PI/180)*240;
const thickY = cy + Math.sin(30*Math.PI/180)*240;
svg += `<text x="${thickX+10}" y="${thickY}" fill="#cfd8dc" font-family="Arial" font-size="18" font-weight="bold" text-anchor="start">Espesso (350µm)</text>`;


// === V_TORQUE THE MIGHTY DRAG ===
// Massive green curved arrow dragging the Cone from the original spot to the center pupil!
const dragPath = `M ${coneX} ${coneY-10} Q ${cx+80} ${cy+40} ${cx+15} ${cy+15}`;
svg += `<path d="${dragPath}" fill="none" stroke="#00e676" stroke-width="12" marker-end="url(#arrowG)"/>`;
svg += `<text x="${(coneX+cx)/2 + 20}" y="${(coneY+cy)/2 - 10}" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold">Vetor de Torque (Vτ)</text>`;

// Some auxiliary mini rotational arrows indicating the whole tissue is twisting
svg += `<path d="M ${cx+200} ${cy-50} A 200 200 0 0 0 ${cx+150} ${cy-150}" fill="none" stroke="#00e676" stroke-width="4" stroke-dasharray="6,4" marker-end="url(#arrowG)"/>`;
svg += `<path d="M ${cx-200} ${cy+50} A 200 200 0 0 0 ${cx-150} ${cy+150}" fill="none" stroke="#00e676" stroke-width="4" stroke-dasharray="6,4" marker-end="url(#arrowG)"/>`;


// NEW CONE STATE (Centered!)
svg += `<ellipse cx="${cx}" cy="${cy}" rx="60" ry="60" fill="none" stroke="#ff1744" stroke-width="4"/>`;
svg += `<ellipse cx="${cx}" cy="${cy}" rx="20" ry="20" fill="#ff1744" filter="url(#glowCenter)"/>`;

// Didactic Legend
svg += `<rect x="50" y="550" width="400" height="150" rx="10" fill="#111B24" stroke="#00e676"/>`;
svg += `<text x="70" y="580" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold">Terapia Assimétrica Otimizada:</text>`;
svg += `<text x="70" y="610" fill="#ffffff" font-family="Arial" font-size="16">1. A Base Grossa é disparada ALVEJANDO</text>`;
svg += `<text x="70" y="630" fill="#ffffff" font-family="Arial" font-size="16">o ápice doente (Cone Inferior).</text>`;
svg += `<text x="70" y="660" fill="#ffffff" font-family="Arial" font-size="16">2. O Torque expulsa passivamente o</text>`;
svg += `<text x="70" y="680" fill="#ffffff" font-family="Arial" font-size="16">cone de volta ao eixo central pupilar!</text>`;


svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V6.3 Cone Repositioning saved successfully to:', outPath);
