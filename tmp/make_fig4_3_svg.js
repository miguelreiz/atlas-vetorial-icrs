const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-004_VR_Vetor_Radial');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_4.3_Barraquer_Law.svg');

const w = 1200;
const h = 700;

const BG = "#0a1118"; 
const PRE_CORNEA = "#78909c"; 
const POST_CORNEA = "#4dd0e1"; 
const LASER = "#00e5ff"; 
const PMMA = "#cfd8dc";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

svg += `
<defs>
    <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Title
svg += `<text x="600" y="60" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 4.3: A Lei de Barraquer e a Biomecânica Corneana</text>`;
svg += `<text x="600" y="90" fill="#B0BEC5" font-family="Arial" font-size="18" text-anchor="middle">Dois caminhos mecânicos independentes conducentes ao mesmo efeito termodinâmico: Aplainamento Central.</text>`;

const startY = 450;
const archDepth = 300;

// ==========================================
// PANEL LEFT: REMOVE CENTRAL (Excimer Laser)
// ==========================================
const cx1 = 300;

// Curva pré-op Ectasia (Ghost)
const pathPre1 = `M ${cx1-250} ${startY+50} Q ${cx1} ${startY-archDepth} ${cx1+250} ${startY+50} L ${cx1+250} ${startY+60} Q ${cx1} ${startY-archDepth+20} ${cx1-250} ${startY+60} Z`;
svg += `<path d="${pathPre1}" fill="none" stroke="${PRE_CORNEA}" stroke-width="2" stroke-dasharray="6,6" opacity="0.8"/>`;

// Volume Removido (Ablation profile)
const pathRemove = `M ${cx1-100} ${startY-archDepth+120} Q ${cx1} ${startY-archDepth+150} ${cx1+100} ${startY-archDepth+120} Q ${cx1} ${startY-archDepth-20} ${cx1-100} ${startY-archDepth+120} Z`;
svg += `<path d="${pathRemove}" fill="${LASER}" opacity="0.3" filter="url(#glowCyan)"/>`;
svg += `<text x="${cx1}" y="${startY-archDepth+30}" fill="${LASER}" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" text-anchor="middle">Tecido Removido (Ablação)</text>`;

// Excimer arrows down
for(let i=-60; i<=60; i+=30){
    svg += `<line x1="${cx1+i}" y1="${startY-archDepth-30}" x2="${cx1+i}" y2="${startY-archDepth+50}" stroke="${LASER}" stroke-width="3" stroke-dasharray="4,2"/>`;
    svg += `<polygon points="${cx1+i},${startY-archDepth+55} ${cx1+i-5},${startY-archDepth+45} ${cx1+i+5},${startY-archDepth+45}" fill="${LASER}"/>`;
}

// Curva pós-op Aplainada
const pathPost1 = `M ${cx1-250} ${startY+50} Q ${cx1-150} ${startY-150} ${cx1-100} ${startY-archDepth+120} Q ${cx1} ${startY-archDepth+150} ${cx1+100} ${startY-archDepth+120} Q ${cx1+150} ${startY-150} ${cx1+250} ${startY+50}`;
svg += `<path d="${pathPost1}" fill="none" stroke="${POST_CORNEA}" stroke-width="6"/>`;

// Aplainamento Central Label
svg += `<text x="${cx1}" y="${startY-archDepth+180}" fill="${POST_CORNEA}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">APLAINAMENTO</text>`;

// Subtitle Box
svg += `<rect x="${cx1-200}" y="${startY+120}" width="400" height="70" rx="10" fill="#1e2d3d"/>`;
svg += `<text x="${cx1}" y="${startY+150}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">PRK / LASIK (Lei Original)</text>`;
svg += `<text x="${cx1}" y="${startY+175}" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">Remover massa central = Centro mais plano</text>`;


// ==========================================
// PANEL RIGHT: ADD PERIPHERAL (Ring ICRS)
// ==========================================
const cx2 = 900;

// Curva pré-op Ectasia (Ghost)
const pathPre2 = `M ${cx2-250} ${startY+50} Q ${cx2} ${startY-archDepth} ${cx2+250} ${startY+50} L ${cx2+250} ${startY+60} Q ${cx2} ${startY-archDepth+20} ${cx2-250} ${startY+60} Z`;
svg += `<path d="${pathPre2}" fill="none" stroke="${PRE_CORNEA}" stroke-width="2" stroke-dasharray="6,6" opacity="0.8"/>`;

// Anéis PMMA (Volume Added)
svg += `<polygon points="${cx2-160},${startY-120} ${cx2-120},${startY-180} ${cx2-80},${startY-120}" fill="${PMMA}" stroke="#ffffff" stroke-width="2"/>`;
svg += `<polygon points="${cx2+80},${startY-120} ${cx2+120},${startY-180} ${cx2+160},${startY-120}" fill="${PMMA}" stroke="#ffffff" stroke-width="2"/>`;

svg += `<text x="${cx2-200}" y="${startY-150}" fill="${PMMA}" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" text-anchor="middle">Tecido Adicionado</text>`;
svg += `<text x="${cx2+200}" y="${startY-150}" fill="${PMMA}" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" text-anchor="middle">Tecido Adicionado</text>`;

// Setas vermelhas (VR)
svg += `<line x1="${cx2-140}" y1="${startY-140}" x2="${cx2-200}" y2="${startY-140}" stroke="#ff1744" stroke-width="5"/>`;
svg += `<polygon points="${cx2-205},${startY-140} ${cx2-195},${startY-130} ${cx2-195},${startY-150}" fill="#ff1744"/>`;

svg += `<line x1="${cx2+140}" y1="${startY-140}" x2="${cx2+200}" y2="${startY-140}" stroke="#ff1744" stroke-width="5"/>`;
svg += `<polygon points="${cx2+205},${startY-140} ${cx2+195},${startY-130} ${cx2+195},${startY-150}" fill="#ff1744"/>`;

// Curva pós-op Aplainada
// Notice the curve goes down in the middle due to the traction.
const pathPost2 = `M ${cx2-250} ${startY+50} Q ${cx2-180} ${startY-120} ${cx2-120} ${startY-190} Q ${cx2} ${startY-100} ${cx2+120} ${startY-190} Q ${cx2+180} ${startY-120} ${cx2+250} ${startY+50}`;
svg += `<path d="${pathPost2}" fill="none" stroke="${POST_CORNEA}" stroke-width="6"/>`;

// Aplainamento Central Label
svg += `<text x="${cx2}" y="${startY-archDepth+180}" fill="${POST_CORNEA}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">APLAINAMENTO</text>`;
svg += `<text x="${cx2}" y="${startY-archDepth+150}" fill="#ffb74d" font-family="Arial" font-size="14" font-weight="bold" font-style="italic" text-anchor="middle">Tensão Estromal Oposta</text>`;

// Subtitle Box
svg += `<rect x="${cx2-200}" y="${startY+120}" width="400" height="70" rx="10" fill="#1e2d3d"/>`;
svg += `<text x="${cx2}" y="${startY+150}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">ICRS (Biomecânica Vetorial)</text>`;
svg += `<text x="${cx2}" y="${startY+175}" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">Adicionar massa periférica = Centro mais plano</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V4.3 Barraquer Law saved successfully to:', outPath);
