const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-016_Malha_Estromal');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 16.1: Anatomia da Fibra em Mola (Rica)
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">`;
// Grid de fundo e glow
svg1 += `<rect width="1200" height="800" fill="#0A0E17"/>`;
svg1 += `<defs>
    <filter id="glowF" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Arrow heads -->
    <marker id="arrowB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#0288d1"/></marker>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744"/></marker>
</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 16.1: Anatomia da Fibra em Mola ("Bow Spring")</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Descoberta por Winkler (2011) | Mapeamento Estrutural 3D de Alta Resolução</text>`;

const startX = 200, endX = 1000;
const epy = 200, bowmy = 240, antBase = 420, posBase = 680;

// Layers background
svg1 += `<rect x="${startX-50}" y="${epy}" width="900" height="40" fill="#b388ff" opacity="0.3"/>`; // Epi
svg1 += `<rect x="${startX-50}" y="${bowmy}" width="900" height="15" fill="#cfd8dc" opacity="0.5"/>`; // Bowman
svg1 += `<rect x="${startX-50}" y="${bowmy+15}" width="900" height="${antBase-bowmy-15}" fill="#00e676" opacity="0.1"/>`; // Anterior
svg1 += `<rect x="${startX-50}" y="${antBase}" width="900" height="${posBase-antBase}" fill="#0288d1" opacity="0.1"/>`; // Posterior

// Labels laterais (Profundidade)
svg1 += `<line x1="120" y1="${epy}" x2="140" y2="${epy}" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<text x="110" y="${epy+5}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="end">0 µm</text>`;
svg1 += `<line x1="120" y1="${bowmy}" x2="140" y2="${bowmy}" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<text x="110" y="${bowmy+5}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="end">50 µm</text>`;
svg1 += `<line x1="120" y1="${antBase}" x2="140" y2="${antBase}" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<text x="110" y="${antBase+5}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="end">~165 µm (33%)</text>`;
svg1 += `<line x1="120" y1="${posBase-100}" x2="140" y2="${posBase-100}" stroke="#cfd8dc" stroke-width="2"/>`;
svg1 += `<text x="110" y="${posBase-95}" fill="#00e5ff" font-family="Arial" font-size="14" text-anchor="end">~400 µm (75%)</text>`;

// Layer Text
svg1 += `<text x="${startX-40}" y="${epy+25}" fill="#b388ff" font-family="Arial" font-size="16" font-weight="bold">EPITÉLIO (Tensão de Cisalhamento Célular)</text>`;
svg1 += `<text x="${startX-40}" y="${bowmy+12}" fill="#ffffff" font-family="Arial" font-size="12" font-weight="bold">CAMADA DE BOWMAN (Zona de Fusão Estromal)</text>`;

// Anterior Stroma: Feltro (Cross lines)
for(let x=startX; x<=endX; x+=30) {
    for(let y=bowmy+20; y<antBase; y+=20) {
        if(Math.random()>0.3) {
            svg1 += `<line x1="${x}" y1="${y}" x2="${x+20}" y2="${y+15}" stroke="#00e676" stroke-width="1" opacity="0.4"/>`;
            svg1 += `<line x1="${x+20}" y1="${y}" x2="${x}" y2="${y+15}" stroke="#00e676" stroke-width="1" opacity="0.4"/>`;
        }
    }
}
// Posterior Stroma: Parallel Lines
for(let y=antBase+30; y<posBase-40; y+=25) {
    let thickness = 2;
    if(y>500 && y<600) thickness = 1; // leave space for ring
    svg1 += `<line x1="${startX-40}" y1="${y}" x2="${endX+40}" y2="${y}" stroke="#0288d1" stroke-width="${thickness}" stroke-dasharray="20,5"/>`;
}

// B O W   S P R I N G S (Fibras em Mola)
for(let p=0; p<6; p++) {
    let px = startX + 50 + p*150;
    // Perna esquerda (subindo)
    svg1 += `<path d="M ${px-50} ${antBase-10} Q ${px-25} ${bowmy+50} ${px} ${bowmy+15}" fill="none" stroke="#00e676" stroke-width="5"/>`;
    // Fusão Bowman
    svg1 += `<rect x="${px-10}" y="${bowmy}" width="20" height="15" fill="#cfd8dc" filter="url(#glowF)"/>`;
    // Perna direita (descendo)
    svg1 += `<path d="M ${px} ${bowmy+15} Q ${px+25} ${bowmy+50} ${px+50} ${antBase-10}" fill="none" stroke="#00e676" stroke-width="5"/>`;
    
    // Angulo (45-60 deg)
    if(p===1) {
        svg1 += `<path d="M ${px-20} ${bowmy+35} A 25 25 0 0 1 ${px} ${bowmy+15}" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,3"/>`;
        svg1 += `<text x="${px-35}" y="${bowmy+28}" fill="#ffffff" font-family="Arial" font-size="12">~ 45°</text>`;
        svg1 += `<line x1="${px-35}" y1="${antBase-10}" x2="${px-35}" y2="${bowmy+15}" stroke="#ffb74d" stroke-width="2" marker-end="url(#arrowR)" marker-start="url(#arrowR)"/>`;
        svg1 += `<text x="${px-85}" y="${antBase-50}" fill="#ffb74d" font-family="Arial" font-size="12">120 µm prof.</text>`;
    }
}

// O ICRS no Terço Posterior
let ringY = posBase - 120;
let ringX = 600;
svg1 += `<polygon points="${ringX-30},${ringY+30} ${ringX+30},${ringY+30} ${ringX},${ringY-30}" fill="#ff1744" stroke="#ffffff" stroke-width="2"/>`;
svg1 += `<line x1="${ringX}" y1="${ringY-40}" x2="${ringX}" y2="${ringY-100}" stroke="#ff1744" stroke-width="4" marker-end="url(#arrowR)"/>`;
svg1 += `<text x="${ringX+10}" y="${ringY-75}" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold">ICRS Tenting</text>`;
svg1 += `<text x="${ringX}" y="${ringY+50}" fill="#cfd8dc" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Assentado em malha paralela</text>`;

// Caixas de info ricas
svg1 += `<rect x="800" y="${bowmy+30}" width="250" height="90" rx="10" fill="#112A22" stroke="#00e676" stroke-width="2"/>`;
svg1 += `<text x="810" y="${bowmy+50}" fill="#00e676" font-family="Arial" font-size="14" font-weight="bold">ESTROMA ANTERIOR (Feltro)</text>`;
svg1 += `<text x="810" y="${bowmy+70}" fill="#ffffff" font-family="Arial" font-size="12">• Densidade de Ramificação: 4x maior</text>`;
svg1 += `<text x="810" y="${bowmy+90}" fill="#ffffff" font-family="Arial" font-size="12">• Módulo Elástico: 8x MAIS RÍGIDO</text>`;
svg1 += `<text x="810" y="${bowmy+110}" fill="#ffffff" font-family="Arial" font-size="12">• Rico em Oblíquas + Bow Springs</text>`;

svg1 += `<rect x="200" y="${antBase+40}" width="250" height="90" rx="10" fill="#111B2A" stroke="#0288d1" stroke-width="2"/>`;
svg1 += `<text x="210" y="${antBase+60}" fill="#0288d1" font-family="Arial" font-size="14" font-weight="bold">ESTROMA POSTERIOR (Clivagem)</text>`;
svg1 += `<text x="210" y="${antBase+80}" fill="#ffffff" font-family="Arial" font-size="12">• Lamelas Radiais/Tangenciais Paralelas</text>`;
svg1 += `<text x="210" y="${antBase+100}" fill="#ffffff" font-family="Arial" font-size="12">• Sem fibras em arco (Bow Springs)</text>`;
svg1 += `<text x="210" y="${antBase+120}" fill="#ffffff" font-family="Arial" font-size="12">• Complacência Alta (fácil separação)</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_16.1_Bow_Spring_Anatomia.svg'), svg1);


// ==========================================
// FIGURA 16.2: Espirais Epiteliais e Shear Strain
// ==========================================
let svg2 = `<svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1000" height="700" fill="#0A0E17"/>`;

svg2 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 16.2: Os Padrões em Espiral Epitelial do FEM (Rhee Model)</text>`;
svg2 += `<text x="500" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">A Migração Celular Guiada pela Tensão de Cisalhamento da Malha Estromal Subjacente</text>`;

// O Olho (Vista de cima)
const mx = 350, my = 400;
const raioL = 200, raioP = 40;

// Limbo
svg2 += `<circle cx="${mx}" cy="${my}" r="${raioL}" fill="#111B2A" stroke="#0288d1" stroke-width="12"/>`;
svg2 += `<text x="${mx-raioL-20}" y="${my}" fill="#0288d1" font-family="Arial" font-size="16" font-weight="bold" text-anchor="end">Annulus do Limbo (Fonte de Células-Tronco)</text>`;

// Pupila (reference)
svg2 += `<circle cx="${mx}" cy="${my}" r="${raioP}" fill="#0A0E17"/>`;

// Espirais epiteliais (Shear strain currents - τ_max)
function drawSpiral(cx, cy, maxR, rotations, steps, cor) {
    let d = `M ${cx+maxR} ${cy} `;
    for(let i=0; i<steps; i++) {
        let frac = i/steps;
        let r = maxR * (1 - frac); 
        // Evitando o centro pupilar exato
        if(r < raioP) r = raioP;
        let ang = frac * (Math.PI*2 * rotations);
        let px = cx + Math.cos(ang) * r;
        let py = cy + Math.sin(ang) * r;
        d += `L ${px} ${py} `;
    }
    return d;
}

// Linhas guia de cisalhamento
for(let a=0; a<12; a++) {
    let startAng = (a/12) * Math.PI*2;
    let t_mx = mx + Math.cos(startAng)*raioL;
    let t_my = my + Math.sin(startAng)*raioL;
    
    let pathStr = `M ${t_mx} ${t_my} `;
    for(let i=1; i<=20; i++) {
        let frac = i/20;
        let r = raioL * (1-frac) + raioP*frac; // interpola raio
        let curAng = startAng + frac * (Math.PI*1.5); // 1.5 rotacoes
        let px = mx + Math.cos(curAng)*r;
        let py = my + Math.sin(curAng)*r;
        pathStr += `L ${px} ${py} `;
    }
    svg2 += `<path d="${pathStr}" fill="none" stroke="#b388ff" stroke-width="3" opacity="0.6"/>`;
    
    // Seta nas beiradas (indicando fluxo)
    if(a%4 === 0) {
        svg2 += `<circle cx="${t_mx}" cy="${t_my}" r="6" fill="#b388ff"/>`; // Origem limbo
    }
}

// Equacao Math Box
svg2 += `<rect x="650" y="150" width="300" height="150" rx="10" fill="#1A1525" stroke="#b388ff" stroke-width="3"/>`;
svg2 += `<text x="800" y="180" fill="#ffffff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Equação de Cisalhamento</text>`;
svg2 += `<text x="800" y="220" fill="#00e5ff" font-family="Courier New" font-size="22" font-weight="bold" text-anchor="middle">τ_max = (σ1 − σ3) / 2</text>`;
svg2 += `<text x="800" y="260" fill="#cfd8dc" font-family="Arial" font-size="12" text-anchor="middle">O Estroma torcido (τ_max) obriga</text>`;
svg2 += `<text x="800" y="280" fill="#cfd8dc" font-family="Arial" font-size="12" text-anchor="middle">o epitélio a migrar sob rotação centrípeta.</text>`;


// Bullet points
svg2 += `<rect x="650" y="320" width="320" height="250" rx="10" fill="#111B24"/>`;
svg2 += `<text x="670" y="350" fill="#00e676" font-family="Arial" font-size="16" font-weight="bold">• A Orquestra Biomecânica</text>`;
svg2 += `<text x="690" y="380" fill="#b0bec5" font-family="Arial" font-size="14">O colágeno (fibras) orienta-se</text>`;
svg2 += `<text x="690" y="400" fill="#b0bec5" font-family="Arial" font-size="14">pela pressão (PIO).</text>`;

svg2 += `<text x="670" y="440" fill="#ffb74d" font-family="Arial" font-size="16" font-weight="bold">• O Rastro Epitelial</text>`;
svg2 += `<text x="690" y="470" fill="#b0bec5" font-family="Arial" font-size="14">As células (Roxo) recém-nascidas no</text>`;
svg2 += `<text x="690" y="490" fill="#b0bec5" font-family="Arial" font-size="14">limbo deslizam obrigatoriamente</text>`;
svg2 += `<text x="690" y="510" fill="#b0bec5" font-family="Arial" font-size="14">sobre as linhas geradas pelo τ_max.</text>`;

svg2 += `<circle cx="670" cy="550" r="10" fill="#b388ff"/>`;
svg2 += `<text x="690" y="555" fill="#ffffff" font-family="Arial" font-size="14" font-weight="bold">Migração Celular (Vórtex)</text>`;

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_16.2_Espiral_Epitelial_Shear.svg'), svg2);

console.log('Espirais e Fibras do CH-016 renderizadas com luxo de detalhes!');
