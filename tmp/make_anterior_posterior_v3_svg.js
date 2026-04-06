const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 700;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Glows
svg += `
<defs>
    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
</defs>
`;

svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Figura 1.6: Por Que Anterior e Posterior Não Concordam nos Eixos</text>`;

const cx = 600;
const cy = 350;

// Metaphor: Two Trampolines
svg += `<rect x="50" y="90" width="1100" height="40" fill="#111B24" rx="8"/>`;
svg += `<text x="${cx}" y="115" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Visão Superior: Uma "cama elástica" dupla. A pressão intraocular deforma ambas, mas a flexibilidade difere.</text>`;

// Draw Anterior Surface (Ellipse tilted at 95 deg)
// Cyan, representing the rigid anterior stroma
const antAxis = 95;
svg += `<g transform="translate(${cx}, ${cy}) rotate(${antAxis - 90})">`; // SVG rotate is clockwise from X axis.
svg += `<ellipse cx="0" cy="0" rx="180" ry="240" fill="#00e5ff" fill-opacity="0.2" stroke="#00e5ff" stroke-width="6" stroke-dasharray="15,5" filter="url(#glowCyan)"/>`;
svg += `<line x1="0" y1="-280" x2="0" y2="280" stroke="#00e5ff" stroke-width="4" filter="url(#glowCyan)"/>`; // The steep meridian
svg += `</g>`;

// Draw Posterior Surface (Ellipse tilted at 135 deg)
// Orange, representing the flexible lamellar posterior stroma
const postAxis = 135;
svg += `<g transform="translate(${cx}, ${cy}) rotate(${postAxis - 90})">`;
svg += `<ellipse cx="0" cy="0" rx="160" ry="260" fill="#ff9100" fill-opacity="0.3" stroke="#ff9100" stroke-width="6" filter="url(#glowOrange)"/>`;
svg += `<line x1="0" y1="-300" x2="0" y2="300" stroke="#ff9100" stroke-width="4" filter="url(#glowOrange)"/>`; // The steep meridian
svg += `</g>`;

// Labels
svg += `<text x="${cx + 100}" y="${cy - 260}" fill="#00e5ff" font-family="Arial" font-size="22" font-weight="bold" paint-order="stroke" stroke="${bg}" stroke-width="6">Eixo Anterior (Ex: 95°)</text>`;
svg += `<text x="${cx + 100}" y="${cy - 235}" fill="#00e5ff" font-family="Arial" font-size="14" paint-order="stroke" stroke="${bg}" stroke-width="4">Superfície Rígida (Trama Densa)</text>`;

svg += `<text x="${cx + 260}" y="${cy - 120}" fill="#ff9100" font-family="Arial" font-size="22" font-weight="bold" paint-order="stroke" stroke="${bg}" stroke-width="6">Eixo Posterior (Ex: 135°)</text>`;
svg += `<text x="${cx + 260}" y="${cy - 95}" fill="#ff9100" font-family="Arial" font-size="14" paint-order="stroke" stroke="${bg}" stroke-width="4">Superfície Flexível (Lamelas Frouxas)</text>`;

// Angle representation arc
svg += `<path d="M ${cx + 180 * Math.cos((antAxis-90)*Math.PI/180)} ${cy + 180 * Math.sin((antAxis-90)*Math.PI/180)} A 180 180 0 0 1 ${cx + 180 * Math.cos((postAxis-90)*Math.PI/180)} ${cy + 180 * Math.sin((postAxis-90)*Math.PI/180)}" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="4,4"/>`;
svg += `<text x="${cx + 230}" y="${cy - 180}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" paint-order="stroke" stroke="${bg}" stroke-width="6">Desalinhamento: 40°</text>`;

// Explanation Block
svg += `<rect x="50" y="${h - 100}" width="1100" height="80" fill="#111B24" rx="8" stroke="#333"/>`;
svg += `<text x="${cx}" y="${h - 70}" fill="#ffeb3b" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Decodificando a Tomografia (Pentacam / Galilei)</text>`;
svg += `<text x="${cx}" y="${h - 45}" fill="#cfd8dc" font-family="Arial" font-size="15" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">A superfície posterior cede e distorce mais livremente. A superfície anterior, travada pelas oblíquas, resiste e assume um eixo cruzado compensatório.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'anterior_posterior_v3.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Anterior Posterior V3 Gerado em:', outFile);
