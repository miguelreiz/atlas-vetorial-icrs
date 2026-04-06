const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 500;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Title
svg += `<text x="${w/2}" y="40" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 1.10: Cascata Patogênica do Ceratocone</text>`;

const panelW = 260;
const gap = 30;
const initX = 40;
const yBox = 80;
const hBox = 300;

const stages = [
    { num: 1, name: "Normal", desc: "Fibras intactas e tensionadas", color: "#00e676" },
    { num: 2, name: "Degradação", desc: "MMPs degradam proteoglicanos", color: "#ffb300" },
    { num: 3, name: "Deslizamento", desc: "Lamelas deslizam / radiais frouxas", color: "#ff7043" },
    { num: 4, name: "Ectasia", desc: "PIO vence focalmente / protrusão", color: "#ff1744" }
];

for(let i=0; i<4; i++) {
    const st = stages[i];
    const xBox = initX + i * (panelW + gap);
    
    // Panel Box
    svg += `<rect x="${xBox}" y="${yBox}" width="${panelW}" height="${hBox}" rx="10" fill="#111B24" stroke="${st.color}" stroke-width="2"/>`;
    
    // Header
    svg += `<rect x="${xBox}" y="${yBox}" width="${panelW}" height="40" rx="10" fill="${st.color}" opacity="0.2"/>`;
    svg += `<text x="${xBox + panelW/2}" y="${yBox + 28}" fill="${st.color}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">${st.num}. ${st.name}</text>`;
    svg += `<text x="${xBox + panelW/2}" y="${yBox + hBox + 30}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${st.desc}</text>`;

    // Diagram Center
    const cx = xBox + panelW/2;
    const cy = yBox + 170;

    // Drawing the fibers based on stage
    if(i === 0) {
        // Normal - tight lamellae, strong bonds
        for(let fy=-40; fy<=40; fy+=20) {
            svg += `<line x1="${cx - 80}" y1="${cy + fy}" x2="${cx + 80}" y2="${cy + fy}" stroke="#cfd8dc" stroke-width="4"/>`;
            // Bonds
            svg += `<line x1="${cx - 40}" y1="${cy + fy}" x2="${cx - 20}" y2="${cy + fy + 20}" stroke="#00e676" stroke-width="3"/>`;
            svg += `<line x1="${cx + 40}" y1="${cy + fy}" x2="${cx + 20}" y2="${cy + fy + 20}" stroke="#00e676" stroke-width="3"/>`;
        }
    } 
    else if(i === 1) {
        // Degradation - dissolving bonds (orange bits)
        for(let fy=-40; fy<=40; fy+=20) {
            svg += `<line x1="${cx - 80}" y1="${cy + fy}" x2="${cx + 80}" y2="${cy + fy}" stroke="#cfd8dc" stroke-width="4"/>`;
            // Broken bonds
            svg += `<circle cx="${cx - 30}" cy="${cy + fy + 10}" r="3" fill="#ffb300"/>`;
            svg += `<circle cx="${cx + 30}" cy="${cy + fy + 10}" r="3" fill="#ffb300"/>`;
        }
        svg += `<text x="${cx}" y="${cy - 80}" fill="#ffb300" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Ataque de MMPs</text>`;
    }
    else if(i === 2) {
        // Slippage - lamellae sliding, causing bulging/spacing
        for(let fy=-40; fy<=40; fy+=20) {
            let offset = (fy === 0) ? 20 : (fy === 20) ? 40 : 0;
            svg += `<line x1="${cx - 80 + offset}" y1="${cy + fy + (fy/2)}" x2="${cx + 80 + offset}" y2="${cy + fy + (fy/2)}" stroke="#ff7043" stroke-width="4"/>`;
        }
        svg += `<line x1="${cx - 50}" y1="${cy}" x2="${cx + 50}" y2="${cy}" stroke="#ff7043" stroke-width="3" stroke-dasharray="4,4"/>`; // Flaccid indication
        // Arrow indicating slippage
        svg += `<path d="M ${cx - 70} ${cy+20} L ${cx - 100} ${cy+20} L ${cx - 90} ${cy+10}" fill="none" stroke="#ff7043" stroke-width="3"/>`;
    }
    else if(i === 3) {
        // Ectasia - massive bulging, PIO from below
        const bulgeCy = cy;
        svg += `<path d="M ${cx-100} ${bulgeCy-20} Q ${cx} ${bulgeCy-120} ${cx+100} ${bulgeCy-20}" fill="none" stroke="#ff1744" stroke-width="4"/>`;
        svg += `<path d="M ${cx-100} ${bulgeCy} Q ${cx} ${bulgeCy-100} ${cx+100} ${bulgeCy}" fill="none" stroke="#ff1744" stroke-width="4"/>`;
        svg += `<path d="M ${cx-100} ${bulgeCy+20} Q ${cx} ${bulgeCy-80} ${cx+100} ${bulgeCy+20}" fill="none" stroke="#ff1744" stroke-width="4"/>`;
        
        // PIO
        for(let px = cx - 40; px <= cx + 40; px += 40) {
            svg += `<line x1="${px}" y1="${cy + 80}" x2="${px}" y2="${cy + 20}" stroke="#ffd600" stroke-width="4" marker-end="url(#arrowPio)"/>`;
        }
        svg += `<text x="${cx}" y="${cy + 100}" fill="#ffd600" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">PIO Focal</text>`;
    }
    
    // Arrows between panels
    if(i < 3) {
        svg += `<line x1="${xBox + panelW + 5}" y1="${cy}" x2="${xBox + panelW + gap - 5}" y2="${cy}" stroke="#455a64" stroke-width="4"/>`;
        svg += `<polygon points="${xBox + panelW + gap - 5},${cy} ${xBox + panelW + gap - 15},${cy-5} ${xBox + panelW + gap - 15},${cy+5}" fill="#455a64"/>`;
    }
}

// Arrow definition for PIO
svg += `
<defs>
    <marker id="arrowPio" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffd600"/>
    </marker>
</defs>
`;

// Footer note
svg += `<text x="${w/2}" y="${h - 20}" fill="#cfd8dc" font-family="Arial" font-size="14" font-style="italic" text-anchor="middle">Em todos os estágios, o anel límbico de fibras tangenciais permanece amplamente preservado, contendo a ectasia na região central/paracentral.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'cascata_patogenica_fibras.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Cascata Gerado em:', outFile);
