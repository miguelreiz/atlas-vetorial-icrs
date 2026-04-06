const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 500;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

svg += `<text x="${w/2}" y="40" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Progressão Morfológica da Ectasia (Corte Transversal)</text>`;

// Three phases
const px = [200, 600, 1000];
const titles = ["1. Córnea Normal", "2. Ectasia Leve/Moderada", "3. Ectasia Severa (Afinamento)"];
const colors = ["#00e676", "#ffb300", "#ff1744"];

for(let i=0; i<3; i++) {
    let cx = px[i];
    let cy = 250;
    
    // Header
    svg += `<rect x="${cx - 150}" y="80" width="300" height="30" rx="5" fill="${colors[i]}" opacity="0.2"/>`;
    svg += `<text x="${cx}" y="100" fill="${colors[i]}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">${titles[i]}</text>`;
    
    // Base shape values
    let thickness = 60;
    let bulge = 0;
    let innerRadius = 150;
    
    if(i === 1) { 
        bulge = 40; 
        thickness = 45; 
        innerRadius = 120;
    }
    if(i === 2) { 
        bulge = 80; 
        thickness = 20; 
        innerRadius = 80;
    }
    
    // Outer and Inner Arcs
    let outCurve = `M ${cx-150} ${cy} Q ${cx} ${cy - innerRadius - bulge} ${cx+150} ${cy}`;
    let inCurve = `M ${cx-150} ${cy+thickness} Q ${cx} ${cy - innerRadius - bulge + thickness} ${cx+150} ${cy+thickness}`;
    
    // Fill cornea
    svg += `<path d="${outCurve} L ${cx+150} ${cy+thickness} Q ${cx} ${cy - innerRadius - bulge + thickness} ${cx-150} ${cy+thickness} Z" fill="#111B24" stroke="${colors[i]}" stroke-width="3"/>`;
    
    // Fibers inside
    for(let f=1; f<=4; f++) {
        let fThick = thickness * (f/5);
        svg += `<path d="M ${cx-150} ${cy+fThick} Q ${cx} ${cy - innerRadius - bulge + fThick} ${cx+150} ${cy+fThick}" fill="none" stroke="#2196f3" stroke-width="2" opacity="0.5"/>`;
    }
    
    // Arrows / Forces
    if(i > 0) {
        svg += `<path d="M ${cx-40} ${cy+thickness+60} L ${cx-10} ${cy+thickness+20}" fill="none" stroke="#ff1744" stroke-width="3"/>`;
        svg += `<path d="M ${cx+40} ${cy+thickness+60} L ${cx+10} ${cy+thickness+20}" fill="none" stroke="#ff1744" stroke-width="3"/>`;
        svg += `<text x="${cx}" y="${cy+thickness+80}" fill="#ff1744" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">PIO focal superando resistência</text>`;
    }
}

// Legends
svg += `<rect x="100" y="420" width="1000" height="40" fill="#111B24" rx="8"/>`;
svg += `<text x="600" y="445" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">A progressão ectásica envolve o afinamento progressivo e protusão (bulging) do estroma na zona de fraqueza.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'ectasia_progression.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Ectasia Progressão Gerado em:', outFile);
