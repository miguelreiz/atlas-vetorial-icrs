const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-006_Vetor_Torque');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_6.2_Bulking_Effect.svg');

const w = 1500;
const h = 750;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="#0A0E17"/>`;

svg += `
<defs>
    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

svg += `<text x="750" y="60" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">Figura 6.2: O "Efeito de Volume Diferencial" (Bulking Effect)</text>`;
svg += `<text x="750" y="100" fill="#B0BEC5" font-family="Arial" font-size="20" text-anchor="middle">Corte longitudinal do estroma sendo forçado contra um segmento curvo progressivo.</text>`;

const baseY = 550;

// Panel background
svg += `<rect x="50" y="150" width="1400" height="550" rx="15" fill="#111B24"/>`;

// The Ring (Unrolled ramp)
// To represent progression: A wedge shape acting as a ramp
// Starts thin on the left, thick on the right
const rL = 200;
const rR = 1100;
const thThin = 30; // 150 um scale
const thThick = 150; // 350 um scale

const rampPath = `M ${rL} ${baseY} L ${rR} ${baseY} L ${rR} ${baseY-thThick} L ${rL} ${baseY-thThin} Z`;
svg += `<path d="${rampPath}" fill="#cfd8dc" stroke="#fff" stroke-width="3"/>`;

// Ramp labels
svg += `<text x="${rL-20}" y="${baseY-thThin-15}" fill="#cfd8dc" font-family="Arial" font-size="18" font-weight="bold" text-anchor="end">Ponta Fina (150 µm)</text>`;
svg += `<text x="${rR+20}" y="${baseY-thThick-15}" fill="#cfd8dc" font-family="Arial" font-size="24" font-weight="bold" text-anchor="start">Ponta Grossa (350 µm)</text>`;
svg += `<text x="${(rL+rR)/2}" y="${baseY-thThick/2}" fill="#455a64" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">A N E L  P R O G R E S S I V O</text>`;

// The Stroma above it (Biological lamina)
// Left side: very minor tenting. Right side: massive tenting.
// We draw a line mapping the top of the ramp but lifted slightly because of stromal tissue
const pad = 20;
const stStart = 100;
const stEnd = 1300;

// Base lamella line
const stPath = `M ${stStart} ${baseY-pad} 
                Q ${rL-50} ${baseY-pad-5} ${rL} ${baseY-thThin-pad} 
                L ${rR} ${baseY-thThick-pad} 
                Q ${rR+100} ${baseY-thThick-pad-20} ${stEnd} ${baseY-pad}`;
// Thick tissue band
svg += `<path d="${stPath}" fill="none" stroke="#78909c" stroke-width="60" stroke-linecap="round" opacity="0.6"/>`;
svg += `<path d="${stPath}" fill="none" stroke="#ffb74d" stroke-width="8" stroke-dasharray="15,5" filter="url(#glowOrange)"/>`;

// Force vectors indicating elevation magnitude (Tenting Effect)
// Thin side (small blue arrows up)
svg += `<line x1="${rL+50}" y1="${baseY-30}" x2="${rL+50}" y2="${baseY-thThin-60}" stroke="#00e5ff" stroke-width="4"/>`;
svg += `<polygon points="${rL+50},${baseY-thThin-70} ${rL+45},${baseY-thThin-60} ${rL+55},${baseY-thThin-60}" fill="#00e5ff"/>`;

// Middle side (medium arrows up)
const midX = (rL+rR)/2;
const midH = (thThin+thThick)/2;
svg += `<line x1="${midX}" y1="${baseY-40}" x2="${midX}" y2="${baseY-midH-90}" stroke="#00e5ff" stroke-width="8"/>`;
svg += `<polygon points="${midX},${baseY-midH-105} ${midX-8},${baseY-midH-90} ${midX+8},${baseY-midH-90}" fill="#00e5ff"/>`;

// Thick side (huge arrows up)
svg += `<line x1="${rR-50}" y1="${baseY-50}" x2="${rR-50}" y2="${baseY-thThick-120}" stroke="#ff1744" stroke-width="15"/>`;
svg += `<polygon points="${rR-50},${baseY-thThick-145} ${rR-65},${baseY-thThick-120} ${rR-35},${baseY-thThick-120}" fill="#ff1744"/>`;

// Explanatory Labels
svg += `<text x="${rL+50}" y="${baseY-thThin-90}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Base do Cone</text>`;
svg += `<text x="${rL+50}" y="${baseY-thThin-110}" fill="#B0BEC5" font-family="Arial" font-size="14" font-style="italic" text-anchor="middle">Elevação Suave</text>`;

svg += `<text x="${rR-50}" y="${baseY-thThick-160}" fill="#ff1744" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">ÁPICE DO CONE</text>`;
svg += `<text x="${rR-50}" y="${baseY-thThick-190}" fill="#ffffff" font-family="Arial" font-size="20" font-style="italic" text-anchor="middle">Elevação Massiva e Direcional</text>`;

// Big Horizontal "ROTATION" arrow representing the torque derived from this gradient
// Points from right to left (as the cone is 'pushed' backwards by the thick wedge)
const forceY = baseY - 400;
svg += `<line x1="${rR-100}" y1="${forceY}" x2="${rL+100}" y2="${forceY}" stroke="#ffb74d" stroke-width="12" filter="url(#glowOrange)"/>`;
svg += `<polygon points="${rL+70},${forceY} ${rL+100},${forceY-15} ${rL+100},${forceY+15}" fill="#ffb74d" filter="url(#glowOrange)"/>`;

svg += `<text x="${midX}" y="${forceY - 20}" fill="#ffb74d" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">V_TORQUE (Momento Rotacional Resultante)</text>`;
svg += `<text x="${midX}" y="${forceY + 40}" fill="#ff9100" font-family="Arial" font-size="18" font-style="italic" text-anchor="middle">O Diferencial Geométrico empurra fisicamente a estrutura do paciente</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V6.2 Bulking Effect saved successfully to:', outPath);
