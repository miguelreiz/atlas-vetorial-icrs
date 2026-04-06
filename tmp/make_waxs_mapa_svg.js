const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1000;
const h = 600;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Figura 1.13b: Como o WAXS mapeia a Córnea</text>`;

const cx = 500;
const cy = 300;

// X-Ray Emitter
svg += `<rect x="50" y="${cy-40}" width="60" height="80" fill="#37474f" rx="10"/>`;
svg += `<rect x="110" y="${cy-20}" width="20" height="40" fill="#cfd8dc"/>`;
svg += `<text x="80" y="${cy+60}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Feixe de Raios-X</text>`;

// X-Ray Beam to Cornea
svg += `<path d="M 130 ${cy} L 410 ${cy-30} L 410 ${cy+30} Z" fill="#00e5ff" opacity="0.2"/>`;
svg += `<line x1="130" y1="${cy}" x2="410" y2="${cy}" stroke="#00e5ff" stroke-width="2" stroke-dasharray="5,5"/>`;

// Cornea layers (Cross-section profile)
// Anterior (30%) - Weaker signal
svg += `<rect x="410" y="150" width="40" height="300" fill="#111B24" stroke="#ffeb3b" stroke-width="2"/>`;
svg += `<text x="430" y="120" fill="#ffeb3b" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Anterior (30%)</text>`;
svg += `<text x="430" y="140" fill="#cfd8dc" font-family="Arial" font-size="12" text-anchor="middle">Isotrópico / Oblíquas</text>`;

// Posterior (70%) - Stronger dominant signal
svg += `<rect x="450" y="150" width="100" height="300" fill="#0A1118" stroke="#ff5252" stroke-width="3"/>`;
svg += `<text x="500" y="90" fill="#ff5252" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Posterior (70%)</text>`;
svg += `<text x="500" y="110" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Lamelas Ortotrópicas (Sinal Dominante)</text>`;
for(let sy=160; sy<450; sy+=20) {
    svg += `<line x1="455" y1="${sy}" x2="545" y2="${sy}" stroke="#ff5252" stroke-width="4"/>`;
}

// X-Ray Beam leaving and scattering
// Wide scatter from isotropic anterior (weak)
svg += `<path d="M 450 ${cy} L 750 ${cy-180} L 750 ${cy+180} Z" fill="#ffeb3b" opacity="0.1"/>`;

// Focused cross scatter from orthotropic posterior (strong)
svg += `<path d="M 550 ${cy} L 800 ${cy-60} L 800 ${cy+60} Z" fill="#ff5252" opacity="0.4"/>`;
svg += `<line x1="550" y1="${cy}" x2="800" y2="${cy}" stroke="#ff5252" stroke-width="4" stroke-dasharray="10,5"/>`;

// Detector Plate
svg += `<rect x="800" y="100" width="80" height="400" fill="#263238" stroke="#cfd8dc" stroke-width="4" rx="5"/>`;
// Diffractogram pattern on detector
svg += `<ellipse cx="840" cy="${cy}" rx="30" ry="80" fill="none" stroke="#ff5252" stroke-width="4"/>`;
svg += `<ellipse cx="840" cy="${cy}" rx="80" ry="30" fill="none" stroke="#ffeb3b" stroke-width="2" opacity="0.5"/>`;

svg += `<text x="840" y="530" fill="#ffffff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Padrão de Difração (WAXS)</text>`;

// Note
svg += `<text x="${cx}" y="570" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">O sinal final lido pelo WAXS representa predominantemente (80% do sinal) a organização das lamelas do estroma posterior.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_WAXS_Mapa.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG WAXS Gerado em:', outFile);
