const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-006_Vetor_Torque');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_6.1_Analogia_Torque.svg');

const w = 1500;
const h = 750;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="#050a10"/>`;

// Defs and glowing effects
svg += `
<defs>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Títulos
svg += `<text x="750" y="60" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">Figura 6.1: A Analogia do Torque e a Força Direcional</text>`;
svg += `<text x="750" y="100" fill="#B0BEC5" font-family="Arial" font-size="20" text-anchor="middle">O que cria rotação na estrutura estromal é a assimetria (Forças Desiguais), não a pressão estática.</text>`;

// Constants
const cy = 400;
const cx1 = 350;
const cx2 = 1150;

svg += `<rect x="50" y="150" width="650" height="550" rx="15" fill="#111B24"/>`;
svg += `<rect x="800" y="150" width="650" height="550" rx="15" fill="#111B24"/>`;

// Pane 1: FORCA IGUAL (Simetrico)
svg += `<text x="${cx1}" y="200" fill="#cfd8dc" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Anel Simétrico (Mesma Espessura)</text>`;
svg += `<text x="${cx1}" y="235" fill="#78909c" font-family="Arial" font-size="18" text-anchor="middle">Força Equilibrada = Apenas Empurrão (Sem Torção)</text>`;

// Base object (A wrench or a circular block acting as the pupil/centre)
svg += `<circle cx="${cx1}" cy="${cy}" r="100" fill="none" stroke="#37474f" stroke-width="8"/>`;
svg += `<circle cx="${cx1}" cy="${cy}" r="8" fill="#546e7a"/>`;

// Symmetric Ring Segments (Left and Right)
// Visualized as massive blocks pressing on the center circle
svg += `<rect x="${cx1-160}" y="${cy-60}" width="40" height="120" rx="10" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`;
svg += `<rect x="${cx1+120}" y="${cy-60}" width="40" height="120" rx="10" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`;

svg += `<text x="${cx1-140}" y="${cy-80}" fill="#cfd8dc" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">250 µm</text>`;
svg += `<text x="${cx1+140}" y="${cy-80}" fill="#cfd8dc" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">250 µm</text>`;

// Symmetric forces pushing perfectly equally (Red arrows)
svg += `<line x1="${cx1-100}" y1="${cy}" x2="${cx1-60}" y2="${cy}" stroke="#ff1744" stroke-width="12"/>`;
svg += `<polygon points="${cx1-60},${cy-10} ${cx1-40},${cy} ${cx1-60},${cy+10}" fill="#ff1744"/>`;

svg += `<line x1="${cx1+100}" y1="${cy}" x2="${cx1+60}" y2="${cy}" stroke="#ff1744" stroke-width="12"/>`;
svg += `<polygon points="${cx1+60},${cy-10} ${cx1+40},${cy} ${cx1+60},${cy+10}" fill="#ff1744"/>`;

// Math label below
svg += `<rect x="${cx1-150}" y="${cy+150}" width="300" height="40" rx="5" fill="#1e2d3d"/>`;
svg += `<text x="${cx1}" y="${cy+177}" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">V_Torque ≈ 0</text>`;


// Pane 2: FORCA DESIGUAL (Assimetrico / Torque)
svg += `<text x="${cx2}" y="200" fill="#00e5ff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Anel Assimétrico (Espessura Alargada)</text>`;
svg += `<text x="${cx2}" y="235" fill="#78909c" font-family="Arial" font-size="18" text-anchor="middle">Força Desequilibrada = Gera Rotação Biomecânica</text>`;

// Target circular block (Rotating!)
// Add multiple curved arrows around the circle representing the spin!
svg += `<circle cx="${cx2}" cy="${cy}" r="100" fill="none" stroke="#2196f3" stroke-width="8" stroke-dasharray="20,10"/>`;
svg += `<circle cx="${cx2}" cy="${cy}" r="8" fill="#00e5ff"/>`;

// Rotation indicator arrow
const rotPath = `M ${cx2-20} ${cy-120} A 130 130 0 0 1 ${cx2+110} ${cy+40}`;
svg += `<path d="${rotPath}" fill="none" stroke="#00e5ff" stroke-width="8" marker-end="url(#arrowB)" filter="url(#glowGreen)"/>`;
svg += `<path d="M ${cx2+115} ${cy+30} L ${cx2+120} ${cy+50} L ${cx2+100} ${cy+45} Z" fill="#00e5ff"/>`;


// Asymmetric segments
// Left: thin
svg += `<rect x="${cx2-160}" y="${cy-40}" width="30" height="80" rx="8" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`;
// Right: FAT
svg += `<rect x="${cx2+120}" y="${cy-100}" width="60" height="200" rx="15" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`;

svg += `<text x="${cx2-145}" y="${cy-60}" fill="#cfd8dc" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">150 µm</text>`;
svg += `<text x="${cx2+150}" y="${cy-120}" fill="#cfd8dc" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">350 µm</text>`;

// Asymmetric forces
// Left arrow: weak
svg += `<line x1="${cx2-110}" y1="${cy}" x2="${cx2-80}" y2="${cy}" stroke="#ff1744" stroke-width="6"/>`;
svg += `<polygon points="${cx2-80},${cy-7} ${cx2-65},${cy} ${cx2-80},${cy+7}" fill="#ff1744"/>`;
svg += `<text x="${cx2-100}" y="${cy-15}" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Fraca</text>`;

// Right arrow: MASSIVE
svg += `<line x1="${cx2+100}" y1="${cy}" x2="${cx2+50}" y2="${cy}" stroke="#ff1744" stroke-width="20" filter="url(#glowRed)"/>`;
svg += `<polygon points="${cx2+50},${cy-20} ${cx2+20},${cy} ${cx2+50},${cy+20}" fill="#ff1744" filter="url(#glowRed)"/>`;
svg += `<text x="${cx2+80}" y="${cy-25}" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">FORTE</text>`;

// Math label below
svg += `<rect x="${cx2-150}" y="${cy+150}" width="300" height="40" rx="5" fill="#1e2d3d"/>`;
svg += `<text x="${cx2}" y="${cy+177}" fill="#00e5ff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">V_Torque Altíssimo</text>`;


svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V6.1 Torque Analogy saved successfully to:', outPath);
