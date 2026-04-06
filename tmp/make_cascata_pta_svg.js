const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 750;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Glow effects
svg += `
<defs>
    <filter id="glowSafe" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowDanger" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
</defs>
`;

svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">Figura 1.14: O Mecanismo Biomecânico do Limiar PTA (40%)</text>`;

const cx = [300, 900];
const titles = ["LASIK SEGURO (PTA < 40%)", "LASIK DE RISCO (PTA > 40%)"];
const colors = ["#00e676", "#ff1744"];

for(let i=0; i<2; i++) {
    let xCenter = cx[i];
    
    // Header
    svg += `<rect x="${xCenter - 250}" y="90" width="500" height="40" rx="8" fill="${colors[i]}" opacity="0.2"/>`;
    svg += `<text x="${xCenter}" y="118" fill="${colors[i]}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">${titles[i]}</text>`;
    
    // Cornea block
    const topY = 180;
    const botY = 480;
    const wBlock = 400;
    const feltThickness = 120; // 40% of the 300px total stroma
    
    // BG
    svg += `<rect x="${xCenter - wBlock/2}" y="${topY}" width="${wBlock}" height="${botY - topY}" fill="#111B24" rx="5" stroke="#333" stroke-width="2"/>`;
    
    // Draw Intact Tissues before Cut
    // Posterior Stroma (Red/Parallel lamellae) - The bottom 60%
    for(let sy = topY + feltThickness + 20; sy <= botY - 10; sy += 25) {
        let slide = 0;
        if(i === 1) { 
            // Risky side: they bulge because they lost anchor
            let bulgeAmt = (sy - (topY + feltThickness)) * 0.4;
            svg += `<path d="M ${xCenter - wBlock/2} ${sy} Q ${xCenter} ${sy + bulgeAmt} ${xCenter + wBlock/2} ${sy}" fill="none" stroke="#ff5252" stroke-width="4" opacity="0.8"/>`;
        } else {
            svg += `<line x1="${xCenter - wBlock/2}" y1="${sy}" x2="${xCenter + wBlock/2}" y2="${sy}" stroke="#ff5252" stroke-width="4" opacity="0.8"/>`;
        }
    }
    
    // Ablation Cut Line
    let cutDepth = i === 0 ? 80 : 160; // Safe leaves 40px of felt. Risky cuts past felt completely.
    
    // The Flap Cut
    svg += `<line x1="${xCenter - wBlock/2 - 20}" y1="${topY + cutDepth}" x2="${xCenter + wBlock/2 + 20}" y2="${topY + cutDepth}" stroke="${colors[i]}" stroke-width="4" stroke-dasharray="8,4"/>`;
    svg += `<text x="${xCenter + wBlock/2 + 30}" y="${topY + cutDepth + 5}" fill="${colors[i]}" font-family="Arial" font-size="16" font-weight="bold">Base do Flap + Ablação</text>`;

    // Draw Anterior Stroma "Felt" (Green Oblique woven structure)
    // Only draw below the cut depth (above is deleted/ablated or lifted out of mechanical consideration)
    for(let sy = topY + cutDepth + 10; sy <= topY + feltThickness; sy += 15) {
        let pathD = `M ${xCenter - wBlock/2} ${sy}`;
        for(let sx = xCenter - wBlock/2; sx <= xCenter + wBlock/2; sx += 40) {
            pathD += ` L ${sx} ${sy + (Math.random()*20 - 10)}`;
        }
        svg += `<path d="${pathD}" fill="none" stroke="#00e5ff" stroke-width="3" filter="${i===0 ? 'url(#glowSafe)' : ''}"/>`;
    }
    
    // Draw vertical anchor ties crossing into posterior
    for(let sx = xCenter - wBlock/2 + 40; sx <= xCenter + wBlock/2 - 40; sx += 60) {
        if(i === 0) {
            // Anchor intact because some green felt remains to hold it
            svg += `<line x1="${sx}" y1="${topY + cutDepth + 10}" x2="${sx+10}" y2="${topY + feltThickness + 60}" stroke="#00e5ff" stroke-width="3"/>`;
        } else {
            // Anchor completely severed by the deep cut
            svg += `<line x1="${sx}" y1="${topY + cutDepth}" x2="${sx+10}" y2="${topY + cutDepth + 30}" stroke="#ff1744" stroke-width="3"/>`;
            svg += `<circle cx="${sx+10}" cy="${topY + cutDepth + 30}" r="4" fill="#ff1744"/>`;
        }
    }
    
    // Descriptive Labels under blocks
    let descLines = [];
    if(i === 0) {
        svg += `<text x="${xCenter}" y="520" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Rede de Travamento Preservada</text>`;
        descLines = [
            "O limite de ablação não ultrapassou o",
            "1/3 anterior da córnea. Resta uma camada",
            "suficiente de fibras oblíquas cruzadas",
            "para amarrar as lamelas profundas."
        ];
    } else {
        svg += `<text x="${xCenter}" y="520" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Travamento Totalmente Seccionado</text>`;
        descLines = [
            "O corte foi profundo o suficiente para eliminar",
            "TODA a zona de pontes oblíquas anteriores.",
            "As lamelas posteriores não têm mais ancoragem",
            "vertical e começam a deslizar e protruir sob a PIO."
        ];
    }
    descLines.forEach((line, lIdx) => {
        svg += `<text x="${xCenter}" y="${550 + lIdx*20}" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">${line}</text>`;
    });
}

svg += `<rect x="100" y="650" width="1000" height="60" fill="#111B24" rx="8" stroke="#333"/>`;
svg += `<text x="${w/2}" y="685" fill="#ffeb3b" font-family="Arial" font-size="18" text-anchor="middle" paint-order="stroke" stroke="${bg}" stroke-width="4">O número mágico do PTA 40% não é arbitrário: ele representa a profundidade física exata onde a rede interlamelar termina.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_Cascata_PTA_Fibras.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Cascata PTA Melhorada Gerado em:', outFile);
