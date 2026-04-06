const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 700;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 1.4: A Catástrofe Lamelar (4 Passos)</text>`;

const px = [200, 700, 200, 700];
const py = [150, 150, 450, 450];
const titles = [
    "1. Malha Intacta (Normal)", 
    "2. Degradação Enzimática", 
    "3. Deslizamento (Slippage)", 
    "4. Protrusão (Ectasia)"
];
const colors = ["#00e676", "#ffb300", "#ff7043", "#ff1744"];

for(let i=0; i<4; i++) {
    let cx = px[i];
    let cy = py[i];
    
    // Panel Header
    svg += `<rect x="${cx - 180}" y="${cy - 70}" width="360" height="40" rx="8" fill="${colors[i]}" opacity="0.15"/>`;
    svg += `<text x="${cx}" y="${cy - 45}" fill="${colors[i]}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">${titles[i]}</text>`;
    
    // Core visualization representing collagen sliding
    svg += `<rect x="${cx - 200}" y="${cy}" width="400" height="120" fill="#111B24" rx="10" stroke="#333" stroke-width="2"/>`;
    
    if(i === 0) {
        // Intact: Tightly packed horizontals with strong vertical crosslinks
        for(let fy=cy+20; fy<=cy+100; fy+=20) {
            svg += `<line x1="${cx-180}" y1="${fy}" x2="${cx+180}" y2="${fy}" stroke="#cfd8dc" stroke-width="6"/>`;
            // Crosslinks
            for(let fx=cx-140; fx<=cx+140; fx+=40) {
                if(fy < cy+100) {
                    svg += `<line x1="${fx}" y1="${fy}" x2="${fx+20}" y2="${fy+20}" stroke="${colors[i]}" stroke-width="4"/>`;
                }
            }
        }
    }
    else if(i === 1) {
        // Degradation: Crosslinks breaking
        for(let fy=cy+20; fy<=cy+100; fy+=20) {
            svg += `<line x1="${cx-180}" y1="${fy}" x2="${cx+180}" y2="${fy}" stroke="#cfd8dc" stroke-width="6"/>`;
            // Broken Crosslinks
            for(let fx=cx-140; fx<=cx+140; fx+=40) {
                if(fy < cy+100) {
                    svg += `<line x1="${fx}" y1="${fy}" x2="${fx+10}" y2="${fy+10}" stroke="${colors[i]}" stroke-width="4" stroke-dasharray="2,2"/>`;
                    svg += `<circle cx="${fx+5}" cy="${fy+5}" r="4" fill="${colors[i]}"/>`; // Enzyme attack
                }
            }
        }
    }
    else if(i === 2) {
        // Slippage: Lamellae sliding horizontally
        for(let fy=cy+20; fy<=cy+100; fy+=20) {
            let offset = (fy === cy+40) ? 30 : (fy === cy+80) ? -30 : 0;
            svg += `<line x1="${cx-180 + offset}" y1="${fy}" x2="${cx+180 + offset}" y2="${fy}" stroke="#cfd8dc" stroke-width="6"/>`;
            if(offset !== 0) {
                // Direction of slide
                svg += `<path d="M ${cx+190+offset} ${fy} L ${cx+170+offset} ${fy-10} L ${cx+170+offset} ${fy+10} Z" fill="${colors[i]}"/>`; 
            }
        }
    }
    else if(i === 3) {
        // Ectasia: Lamellae buckled outward
        for(let fy=cy+20; fy<=cy+100; fy+=20) {
            let bulge = (fy === cy+60) ? 60 : (fy === cy+40 || fy === cy+80) ? 40 : 20;
            svg += `<path d="M ${cx-180} ${fy} Q ${cx} ${fy-bulge} ${cx+180} ${fy}" fill="none" stroke="#cfd8dc" stroke-width="6"/>`;
        }
        // Force pushing
        svg += `<line x1="${cx}" y1="${cy+150}" x2="${cx}" y2="${cy+100}" stroke="${colors[i]}" stroke-width="6" marker-end="url(#arrowEctasia)"/>`;
        svg += `<text x="${cx}" y="${cy+170}" fill="${colors[i]}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Força Ectásica (PIO focal)</text>`;
    }
}

// Arrow Red
svg += `
<defs>
    <marker id="arrowEctasia" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744"/>
    </marker>
</defs>
`;

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_Catastrofe_Lamelar.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Catastrofe Gerado em:', outFile);
