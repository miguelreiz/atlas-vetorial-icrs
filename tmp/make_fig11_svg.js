const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-011_Nomogramas');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 11.1: Fluxograma (Pipeline de 5 Passos)
// ==========================================
let svg1 = `<svg viewBox="0 0 1400 300" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1400" height="300" fill="#0A0E17"/>`;

svg1 += `<defs>
    <filter id="glowPipeline" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowFlow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#455a64" />
    </marker>
</defs>`;

svg1 += `<text x="700" y="40" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 11.1: Pipeline de Planejamento Vetorial Universal</text>`;

const cw = 220, ch = 120, gap = 40;
const startX = 50, startY = 100;

const steps = [
    {n: 1, c: '#0288d1', t: "P1: Identificar Fenótipo", d: "Classificar o tipo base"},
    {n: 2, c: '#ffb74d', t: "P2: Avaliar Simetria", d: "Assimetria Topo vs Tomo"},
    {n: 3, c: '#b388ff', t: "P3: Decompor ICE", d: "Coerência dos Eixos"},
    {n: 4, c: '#ff1744', t: "P4: Selecionar Vetores", d: "Definir VR, VT e Vτ"},
    {n: 5, c: '#00e676', t: "P5: Eleição do Anel", d: "Matching do Fabricante"}
];

for(let i=0; i<steps.length; i++){
    let x = startX + i*(cw+gap);
    svg1 += `<rect x="${x}" y="${startY}" width="${cw}" height="${ch}" rx="15" fill="#111B24" stroke="${steps[i].c}" stroke-width="3" filter="${i===4?'url(#glowPipeline)':'none'}"/>`;
    
    // Titulo
    svg1 += `<rect x="${x}" y="${startY}" width="${cw}" height="40" rx="15" fill="${steps[i].c}" opacity="0.2"/>`;
    svg1 += `<text x="${x+cw/2}" y="${startY+25}" fill="${steps[i].c}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">${steps[i].t}</text>`;
    // Descricao
    svg1 += `<text x="${x+cw/2}" y="${startY+70}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${steps[i].d}</text>`;
    
    if(i < steps.length - 1){
        svg1 += `<line x1="${x+cw}" y1="${startY+ch/2}" x2="${x+cw+gap-5}" y2="${startY+ch/2}" stroke="#455a64" stroke-width="4" marker-end="url(#arrowFlow)"/>`;
    }
}

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_11.1_Fluxograma_Nomograma.svg'), svg1);


// ==========================================
// FIGURA 11.2: Matriz de Decisão Base
// ==========================================
let svg2 = `<svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1000" height="600" fill="#0A0E17"/>`;

svg2 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 11.2: O Motor do Nomograma Mestre</text>`;
svg2 += `<text x="500" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Matching Perfil (Geometria do Plástico) vs Ectasia (Problema Mecânico)</text>`;

// Grid de matriz
const mx = 200, my = 150, mhw = 400, mhh = 120;

// Header das Colunas (Ação de Vetor)
svg2 += `<rect x="${mx}" y="${my-60}" width="${mhw}" height="50" fill="#0288d1" opacity="0.2"/>`;
svg2 += `<text x="${mx+mhw/2}" y="${my-30}" fill="#0288d1" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Aplainamento Puro (VR)</text>`;

svg2 += `<rect x="${mx+mhw}" y="${my-60}" width="${mhw}" height="50" fill="#ffb74d" opacity="0.2"/>`;
svg2 += `<text x="${mx+mhw+mhw/2}" y="${my-30}" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Aplainamento + Torque (VR + VComa)</text>`;

// Linha 1: Cone Central
svg2 += `<rect x="${mx-150}" y="${my}" width="140" height="${mhh}" fill="#111B24"/>`;
svg2 += `<text x="${mx-80}" y="${my+60}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Cone Central</text>`;

svg2 += `<rect x="${mx}" y="${my}" width="${mhw}" height="${mhh}" fill="#112A22" stroke="#00e676" stroke-width="2"/>`; // Match ideal
svg2 += `<text x="${mx+mhw/2}" y="${my+40}" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">✅ Segmento Simétrico</text>`;
svg2 += `<text x="${mx+mhw/2}" y="${my+70}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">210° a 320° graus. Espessura Uniforme.</text>`;

svg2 += `<rect x="${mx+mhw}" y="${my}" width="${mhw}" height="${mhh}" fill="#2A1115" stroke="#ff1744" stroke-width="2"/>`; // Ruim
svg2 += `<text x="${mx+mhw+mhw/2}" y="${my+40}" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">❌ Contraindicado</text>`;
svg2 += `<text x="${mx+mhw+mhw/2}" y="${my+70}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">O Torque iria descentrar a córnea normal.</text>`;

// Linha 2: Cone Sagging
svg2 += `<rect x="${mx-150}" y="${my+mhh}" width="140" height="${mhh}" fill="#111B24"/>`;
svg2 += `<text x="${mx-80}" y="${my+mhh+60}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Cone Sagging</text>`;

svg2 += `<rect x="${mx}" y="${my+mhh}" width="${mhw}" height="${mhh}" fill="#281A11" stroke="#ffb74d" stroke-width="2"/>`; // Ruim/limitado
svg2 += `<text x="${mx+mhw/2}" y="${my+mhh+40}" fill="#ffb74d" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">⚠️ Subótimo (Parcial)</text>`;
svg2 += `<text x="${mx+mhw/2}" y="${my+mhh+70}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">Muda a dioptria mas o paciente segue vendo mal.</text>`;

svg2 += `<rect x="${mx+mhw}" y="${my+mhh}" width="${mhw}" height="${mhh}" fill="#112A22" stroke="#00e676" stroke-width="2"/>`; // Match ideal
svg2 += `<text x="${mx+mhw+mhw/2}" y="${my+mhh+40}" fill="#00e676" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">✅ Segmento Progressivo</text>`;
svg2 += `<text x="${mx+mhw+mhw/2}" y="${my+mhh+70}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">160° a 210°. Espessura em Cunha (Torque).</text>`;

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_11.2_Matriz_Nomograma.svg'), svg2);

console.log('Todos SVGs do CH-011 (Nomograma) gerados!');
