const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1100;
const h = 600;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
// Fundo
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Título Simples
svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 1.14: Por que o PTA 40% causa Ectasia</text>`;

const cx = [300, 800];
const titles = ["PTA Seguro (< 40%)", "PTA de Risco (> 40%)"];
const colors = ["#00e676", "#ff1744"];

for(let i=0; i<2; i++) {
    let xCenter = cx[i];
    
    // Título da Coluna
    svg += `<rect x="${xCenter - 200}" y="90" width="400" height="40" rx="8" fill="${colors[i]}" opacity="0.2"/>`;
    svg += `<text x="${xCenter}" y="118" fill="${colors[i]}" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">${titles[i]}</text>`;
    
    // Dimensões do Estroma
    const topY = 200;
    const botY = 450;
    const wBlock = 300;
    const anteriorLimit = topY + 100; // 40% of 250px depth is 100px
    
    // Fundo do Bloco
    svg += `<rect x="${xCenter - wBlock/2}" y="${topY}" width="${wBlock}" height="${botY - topY}" fill="#111B24" rx="5" stroke="#333" stroke-width="2"/>`;
    
    // Zona Anterior (Verde) - Rede Cruzada Rígida
    svg += `<rect x="${xCenter - wBlock/2}" y="${topY}" width="${wBlock}" height="100" fill="#00e5ff" opacity="0.15"/>`;
    svg += `<text x="${xCenter - 60}" y="${topY + 55}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Estroma Anterior</text>`;
    svg += `<text x="${xCenter - 60}" y="${topY + 75}" fill="#00e5ff" font-family="Arial" font-size="14" text-anchor="middle">(40% da espessura)</text>`;
    
    // Zona Posterior (Vermelha) - Lamelas Frouxas
    svg += `<rect x="${xCenter - wBlock/2}" y="${anteriorLimit}" width="${wBlock}" height="150" fill="#ff5252" opacity="0.1"/>`;
    svg += `<text x="${xCenter - 60}" y="${anteriorLimit + 70}" fill="#ff5252" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Estroma Posterior</text>`;
    svg += `<text x="${xCenter - 60}" y="${anteriorLimit + 90}" fill="#ff5252" font-family="Arial" font-size="14" text-anchor="middle">(60% da espessura)</text>`;
    
    // Corte Flap+Ablação (Cunha Dourada)
    let cutDepth = i === 0 ? 65 : 130; 
    
    // Desenhar a cunha
    svg += `<path d="M ${xCenter + 20} ${topY} L ${xCenter + wBlock/2} ${topY} L ${xCenter + wBlock/2} ${topY + cutDepth} L ${xCenter + 20} ${topY + cutDepth} Z" fill="#ffeb3b" opacity="0.8" stroke="#f57f17" stroke-width="2"/>`;
    svg += `<text x="${xCenter + wBlock/4 + 10}" y="${topY + cutDepth/2 + 5}" fill="#0a1118" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Flap + Laser</text>`;
    
    // Marca do limite de segurança
    svg += `<line x1="${xCenter - wBlock/2 - 20}" y1="${anteriorLimit}" x2="${xCenter + wBlock/2 + 20}" y2="${anteriorLimit}" stroke="#ffffff" stroke-width="3" stroke-dasharray="10,5"/>`;
    svg += `<text x="${xCenter + wBlock/2 + 30}" y="${anteriorLimit + 5}" fill="#ffffff" font-family="Arial" font-size="14" font-weight="bold">Limite de 40%</text>`;

    // Explicações Textuais Simples no Rodapé
    let desc = "";
    if(i === 0) {
        svg += `<text x="${xCenter}" y="500" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Restou Estroma Anterior!</text>`;
        svg += `<text x="${xCenter}" y="530" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">A córnea mantém amarras fortes,</text>`;
        svg += `<text x="${xCenter}" y="550" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">impedindo que o fundo deforme.</text>`;
    } else {
        svg += `<text x="${xCenter}" y="500" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Corte Profundo (Destrutivo)</text>`;
        svg += `<text x="${xCenter}" y="530" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Toda a camada rígida frontal foi seccionada.</text>`;
        svg += `<text x="${xCenter}" y="550" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">O fundo solto vai entortar (Ectasia).</text>`;
    }
}

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_Cascata_PTA_Fibras.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Cascata PTA SUPER SIMPLIFICADA E LEGÍVEL Gerado em:', outFile);
