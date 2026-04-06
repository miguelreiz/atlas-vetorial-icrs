const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 800;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

svg += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 1.1: Anatomia Estrutural da Córnea (6 Camadas)</text>`;

const xLeft = 100;
const xRight = 900;
const wBox = xRight - xLeft;

// Heights proportional (roughly) to real scale, expanded for visibility of thin layers
// Epitelio: 50um -> 80px
// Bowman: 15um -> 30px
// Stroma: ~450um -> 400px
// Dua: 15um -> 30px
// Descemet: 10um -> 20px
// Endotelio: 5um -> 15px

let currentY = 100;

// 1. Epithelium
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="80" fill="#291b2c" stroke="#e040fb" stroke-width="2"/>`;
for(let e=0; e<5; e++) {
    svg += `<line x1="${xLeft}" y1="${currentY + 16*e}" x2="${xRight}" y2="${currentY + 16*e}" stroke="#e040fb" stroke-width="1" opacity="0.3"/>`;
}
svg += `<text x="${xRight + 20}" y="${currentY + 45}" fill="#e040fb" font-family="Arial" font-size="22" font-weight="bold">1. Epitélio (50µm)</text>`;
svg += `<text x="${xRight + 20}" y="${currentY + 65}" fill="#cfd8dc" font-family="Arial" font-size="14">5-7 camadas de células descamativas</text>`;
currentY += 80;

// 2. Bowman
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="30" fill="#3e2723" stroke="#ff5252" stroke-width="2"/>`;
svg += `<text x="${xRight + 20}" y="${currentY + 20}" fill="#ff5252" font-family="Arial" font-size="22" font-weight="bold">2. MB de Bowman (15µm)</text>`;
currentY += 30;

// 3. Stroma (Anterior + Posterior split)
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="400" fill="#111B24" stroke="#00e5ff" stroke-width="2"/>`;
// Anterior Stroma (~120um, 100px)
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="100" fill="#00e5ff" opacity="0.1"/>`;
svg += `<text x="${xLeft + 20}" y="${currentY + 50}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold">Estroma Anterior (Trama densa, oblíquas)</text>`;
for(let sy=currentY+10; sy<currentY+100; sy+=15) {
    let p = `M ${xLeft} ${sy}`;
    for(let sx=xLeft; sx<=xRight; sx+=30) p += ` L ${sx} ${sy + (Math.random()*10 - 5)}`;
    svg += `<path d="${p}" fill="none" stroke="#00e5ff" stroke-width="2" opacity="0.6"/>`;
}
// Posterior Stroma (~330um, 300px)
svg += `<text x="${xLeft + 20}" y="${currentY + 250}" fill="#0091ea" font-family="Arial" font-size="18" font-weight="bold">Estroma Posterior (Lamelas frouxas organizadas)</text>`;
for(let sy=currentY+110; sy<currentY+400; sy+=25) {
    let p = `M ${xLeft} ${sy}`;
    for(let sx=xLeft; sx<=xRight; sx+=60) p += ` Q ${sx+30} ${sy+10} ${sx+60} ${sy}`;
    svg += `<path d="${p}" fill="none" stroke="#0091ea" stroke-width="3" opacity="0.4"/>`;
}
svg += `<text x="${xRight + 20}" y="${currentY + 200}" fill="#00e5ff" font-family="Arial" font-size="24" font-weight="bold">3. Estroma (~450µm)</text>`;
svg += `<text x="${xRight + 20}" y="${currentY + 225}" fill="#cfd8dc" font-family="Arial" font-size="14">90% da espessura. Colágeno I.</text>`;
currentY += 400;

// 4. Dua's Layer
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="30" fill="#33691e" stroke="#76ff03" stroke-width="2"/>`;
svg += `<text x="${xRight + 20}" y="${currentY + 20}" fill="#76ff03" font-family="Arial" font-size="22" font-weight="bold">4. Camada de Dua (15µm)</text>`;
currentY += 30;

// 5. Descemet
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="20" fill="#263238" stroke="#ffeb3b" stroke-width="2"/>`;
svg += `<text x="${xRight + 20}" y="${currentY + 15}" fill="#ffeb3b" font-family="Arial" font-size="22" font-weight="bold">5. MB de Descemet (10µm)</text>`;
currentY += 20;

// 6. Endothelium
svg += `<rect x="${xLeft}" y="${currentY}" width="${wBox}" height="15" fill="#1b0000" stroke="#ff3d00" stroke-width="2"/>`;
for(let cx=xLeft+10; cx<xRight; cx+=25) {
    svg += `<circle cx="${cx}" cy="${currentY+7}" r="4" fill="#ff3d00"/>`;
}
svg += `<text x="${xRight + 20}" y="${currentY + 15}" fill="#ff3d00" font-family="Arial" font-size="22" font-weight="bold">6. Endotélio (5µm)</text>`;
svg += `<text x="${xRight + 20}" y="${currentY + 35}" fill="#cfd8dc" font-family="Arial" font-size="14">Monocamada bomba atp-dependente</text>`;
currentY += 15;

svg += `</svg>`;

const outFile = path.join(outDir, 'cornea_cross_section_pt.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Cornea Cross Section Gerado em:', outFile);
