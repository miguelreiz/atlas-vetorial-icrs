const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_2.1_Principios_Biomecanicos_v4.svg');

const w = 1000;
const h = 500;

// Colors matching standard
const BG = "#0D1117";
const COL_EPI = "#FFCDD2";
const COL_STROMA = "#EDD9A3";
const COL_RING = "#90A4AE";
const COL_VR = "#00B4DC"; // Blue for correction vector
const COL_TEXT = "#FFFFFF";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

const cx = w/2;

// Original Corneal Profile (Dotted)
// Center (x=500), edges at x=100, 900
const orig_path = `M 100 350 Q 500 50 900 350`;
svg += `<path d="${orig_path}" fill="none" stroke="#FFEB3B" stroke-width="2" stroke-dasharray="6,6" opacity="0.6"/>`;
svg += `<text x="500" y="45" fill="#FFEB3B" font-family="Arial" font-size="14" text-anchor="middle" font-style="italic">Perfil Ectásico Original</text>`;

// New Profile (Post-ICRS)
// Flattened centrally, elevated over the rings!
const rx1 = 250, rx2 = 750; // Ring positions
// Path: Starts at edge(100,350), bulges at rx1(250, 150), flattens at cx(500, 180), bulges at rx2(750, 150), ends at edge(900,350)
const post_epi_top = `M 100 350 C 180 250, 240 140, 250 140 C 260 140, 400 170, 500 170 C 600 170, 740 140, 750 140 C 760 140, 820 250, 900 350`;
const post_stroma_bot = `M 100 450 C 180 350, 240 260, 250 260 C 260 260, 400 290, 500 290 C 600 290, 740 240, 750 260 C 760 260, 820 350, 900 450`;

svg += `<path d="${post_epi_top} L 900 380 C 820 280, 760 170, 750 170 C 740 170, 600 200, 500 200 C 400 200, 260 170, 250 170 C 240 170, 180 280, 100 380 Z" fill="${COL_EPI}" opacity="0.9"/>`;
svg += `<path d="M 100 380 C 180 280, 240 170, 250 170 C 260 170, 400 200, 500 200 C 600 200, 740 170, 750 170 C 760 170, 820 280, 900 380 L 900 450 C 820 350, 760 260, 750 260 C 740 260, 600 290, 500 290 C 400 290, 260 260, 250 260 C 240 260, 180 350, 100 450 Z" fill="${COL_STROMA}" opacity="0.9"/>`;

// Draw Rings (Triangular sections at 75% depth in stroma)
// Left ring
svg += `<polygon points="${rx1},220 ${rx1-20},260 ${rx1+20},260" fill="${COL_RING}" stroke="#FFFFFF" stroke-width="1.5"/>`;
// Right ring
svg += `<polygon points="${rx2},220 ${rx2-20},260 ${rx2+20},260" fill="${COL_RING}" stroke="#FFFFFF" stroke-width="1.5"/>`;

// Draw Tenting Elevation Lines
svg += `<line x1="${rx1}" y1="210" x2="${rx1}" y2="130" stroke="#00FF88" stroke-width="3" opacity="0.8"/>`;
svg += `<polygon points="${rx1-5},140 ${rx1+5},140 ${rx1},130" fill="#00FF88"/>`;
svg += `<text x="${rx1}" y="115" fill="#00FF88" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Tenting (Elevação)</text>`;

svg += `<line x1="${rx2}" y1="210" x2="${rx2}" y2="130" stroke="#00FF88" stroke-width="3" opacity="0.8"/>`;
svg += `<polygon points="${rx2-5},140 ${rx2+5},140 ${rx2},130" fill="#00FF88"/>`;

// Draw Arc-Shortening Vectors (VR) Pulling AWAY from center
// Left Vector pulling to left
svg += `<line x1="400" y1="230" x2="300" y2="230" stroke="${COL_VR}" stroke-width="4"/>`;
svg += `<polygon points="310,225 310,235 300,230" fill="${COL_VR}"/>`;
svg += `<text x="350" y="220" fill="${COL_VR}" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">VR (Radial)</text>`;

// Right Vector pulling to right
svg += `<line x1="600" y1="230" x2="700" y2="230" stroke="${COL_VR}" stroke-width="4"/>`;
svg += `<polygon points="690,225 690,235 700,230" fill="${COL_VR}"/>`;
svg += `<text x="650" y="220" fill="${COL_VR}" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">VR (Radial)</text>`;

// Draw Flattening (Aplainamento)
svg += `<text x="500" y="150" fill="${COL_VR}" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">∇ Aplainamento Central</text>`;

// Title
svg += `<text x="${cx}" y="480" fill="${COL_TEXT}" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Figura 2.1: Biomecânica do ICRS — Arc-Shortening e Tenting Effect</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svgContent=svg);
console.log('SVG V2 saved successfully to:', outPath);
