const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-015_CXL_Profundidade');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 15.3: O Fulcro Ótimo (70%)
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">Figura 15.3: O Fulcro Ótimo — A Engenharia da Profundidade</text>`;

// Constants for 3 panels
const panels = [
    {x: 0, title: "Raso Demais (50%)", subtitle: "Risco de Extrusão", color: "#ff1744", yOffset: -30, textY: 530, desc: "Pouco tecido acima. O tenting pode romper a Bowman." },
    {x: 400, title: "Ponto Ótimo (70-75%)", subtitle: "Equilíbrio FEM", color: "#00e676", yOffset: 20, textY: 530, desc: "Máximo arc-shortening (encurtamento do arco). Âncora sólida abaixo." },
    {x: 800, title: "Profundo (85%)", subtitle: "Deflexão Posterior", color: "#ffb74d", yOffset: 80, textY: 530, desc: "Falta de âncora. O anel afunda e dissipa efeito para trás." }
];

panels.forEach((p, index) => {
    // Background separation
    if (index > 0) svg1 += `<line x1="${p.x}" y1="100" x2="${p.x}" y2="550" stroke="#263238" stroke-width="2" stroke-dasharray="8,4"/>`;
    
    // Title
    svg1 += `<text x="${p.x + 200}" y="120" fill="${p.color}" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">${p.title}</text>`;
    svg1 += `<text x="${p.x + 200}" y="150" fill="#b0bec5" font-family="Arial" font-size="16" text-anchor="middle">${p.subtitle}</text>`;

    let cx = p.x + 200;
    let cy = 350;
    
    // Cornea arc - Anterior and Posterior
    svg1 += `<path d="M ${cx - 150} ${cy - 120} Q ${cx} ${cy - 160} ${cx + 150} ${cy - 120}" fill="none" stroke="#cfd8dc" stroke-width="6"/>`; // Epi/Bowman
    svg1 += `<path d="M ${cx - 150} ${cy + 100} Q ${cx} ${cy + 120} ${cx + 150} ${cy + 100}" fill="none" stroke="#546e7a" stroke-width="4"/>`; // Descemet
    
    // Draw stroma lines to represent depth
    for(let i=1; i<=9; i++) {
        let lY = -120 + i*22 + (i/9)*20; // curve approximation
        let col = "#263238";
        if(i < 3) col = "#112A22"; // anterior
        svg1 += `<path d="M ${cx - 140} ${cy + lY} Q ${cx} ${cy + lY - 40} ${cx + 140} ${cy + lY}" fill="none" stroke="${col}" stroke-width="2"/>`;
    }

    // The Ring insertion
    let ringY = cy + p.yOffset;
    svg1 += `<polygon points="${cx-15},${ringY} ${cx+15},${ringY} ${cx},${ringY-30}" fill="${p.color}" stroke="#ffffff" stroke-width="2"/>`; // Triangular ring

    // Tenting force lines (Up)
    let upForce = p.color === "#ff1744" ? 60 : (p.color === "#00e676" ? 40 : 20);
    svg1 += `<line x1="${cx}" y1="${ringY-35}" x2="${cx}" y2="${ringY-35-upForce}" stroke="${p.color}" stroke-width="4" marker-end="url(#arrowGeneric)"/>`;
    
    // Push down lines (Down/loss)
    if(p.color === "#ffb74d") {
        svg1 += `<line x1="${cx}" y1="${ringY+5}" x2="${cx}" y2="${ringY+40}" stroke="${p.color}" stroke-width="5" marker-end="url(#arrowGeneric)"/>`;
    }

    // Text Description Box
    svg1 += `<rect x="${p.x+20}" y="${p.textY}" width="360" height="50" rx="10" fill="#111B24"/>`;
    svg1 += `<text x="${cx}" y="${p.textY + 30}" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${p.desc}</text>`;
});

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_15.3_Optimal_Fulcrum_Depth.svg'), svg1);


// ==========================================
// FIGURA 15.5: Perfil do Anel vs Escudo CXL
// ==========================================
let svg2 = `<svg viewBox="0 0 1400 700" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1400" height="700" fill="#0A0E17"/>`;

svg2 += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 15.5: Perfil do Anel × Escudo CXL</text>`;
svg2 += `<text x="700" y="80" fill="#b0bec5" font-family="Arial" font-size="16" text-anchor="middle">Da maior para a menor penetração mecânica na barreira reticulada covalente</text>`;

// CXL Shield Background (Top 300 um)
svg2 += `<rect x="50" y="150" width="1300" height="200" fill="#112A22" opacity="0.6"/>`;
svg2 += `<line x1="50" y1="350" x2="1350" y2="350" stroke="#00e676" stroke-width="4" stroke-dasharray="10,5"/>`;
svg2 += `<text x="700" y="375" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Linha de Demarcação CXL (Trava Covalente - 300 µm)</text>`;
svg2 += `<text x="700" y="140" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ESPAÇO CXL (RÍGIDO)</text>`;

const profiles = [
    {name: "Triangular", t: "Ferrara/Keraring", rank: "~75% Eficaz", risk: "Haze: ALTO", c: "#ff1744", px: 150, py: 420},
    {name: "Fusiforme", t: "Ferrara HM", rank: "~60% Eficaz", risk: "Haze: MODERADO", c: "#ffb74d", px: 370, py: 420},
    {name: "Prismático", t: "AJL PRO", rank: "~55% Eficaz", risk: "Haze: MODERADO", c: "#ffd54f", px: 590, py: 420},
    {name: "Hexagonal", t: "Intacs", rank: "~50% Eficaz", risk: "Haze: MÉDIO", c: "#4dd0e1", px: 810, py: 420},
    {name: "Arredondado", t: "CornealRing", rank: "~42% Eficaz", risk: "Haze: BAIXO", c: "#64b5f6", px: 1030, py: 420},
    {name: "MyoRing", t: "Pocket 360°", rank: "~37% Eficaz", risk: "Haze: MÍNIMO", c: "#b388ff", px: 1250, py: 420}
];

// Profile drawing logic inside loop
profiles.forEach((pr, i) => {
    let cx = pr.px;
    let cy = pr.py;
    
    // The Ring shape
    let shape = "";
    if (i === 0) { // Triangle
        shape = `<polygon points="${cx-25},${cy+30} ${cx+25},${cy+30} ${cx},${cy-30}" fill="${pr.c}"/>`;
        // High penetration line
        svg2 += `<line x1="${cx}" y1="${cy-30}" x2="${cx}" y2="200" stroke="${pr.c}" stroke-width="8" marker-end="url(#arrowGeneric)"/>`;
    } else if (i === 1) { // Fusiform
        shape = `<path d="M ${cx-30} ${cy} Q ${cx} ${cy-35} ${cx+30} ${cy} Q ${cx} ${cy+35} ${cx-30} ${cy}" fill="${pr.c}"/>`;
        svg2 += `<line x1="${cx}" y1="${cy-17}" x2="${cx}" y2="240" stroke="${pr.c}" stroke-width="6" marker-end="url(#arrowGeneric)"/>`;
    } else if (i === 2) { // Prismatic trap
        shape = `<polygon points="${cx-30},${cy+30} ${cx+30},${cy+30} ${cx+10},${cy-20} ${cx-15},${cy-20}" fill="${pr.c}"/>`;
        svg2 += `<line x1="${cx}" y1="${cy-20}" x2="${cx}" y2="260" stroke="${pr.c}" stroke-width="5" marker-end="url(#arrowGeneric)"/>`;
    } else if (i === 3) { // Hexagonal
        shape = `<polygon points="${cx-20},${cy+30} ${cx+20},${cy+30} ${cx+30},${cy} ${cx+20},${cy-30} ${cx-20},${cy-30} ${cx-30},${cy}" fill="${pr.c}"/>`;
        svg2 += `<line x1="${cx}" y1="${cy-30}" x2="${cx}" y2="280" stroke="${pr.c}" stroke-width="5" opacity="0.8" marker-end="url(#arrowGeneric)"/>`;
    } else if (i === 4) { // Rounded
        shape = `<rect x="${cx-25}" y="${cy-20}" width="50" height="40" rx="20" fill="${pr.c}"/>`;
        svg2 += `<line x1="${cx}" y1="${cy-20}" x2="${cx}" y2="330" stroke="${pr.c}" stroke-width="4" opacity="0.6" marker-end="url(#arrowGeneric)"/>`;
    } else if (i === 5) { // Myoring (flat long)
        shape = `<rect x="${cx-40}" y="${cy-10}" width="80" height="20" rx="5" fill="${pr.c}"/>`;
        svg2 += `<line x1="${cx}" y1="${cy+10}" x2="${cx}" y2="${cy+70}" stroke="${pr.c}" stroke-width="8" marker-end="url(#arrowGeneric)"/>`; // deflete pra baixo
    }

    svg2 += shape;
    
    // Labels Below
    svg2 += `<text x="${cx}" y="520" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">${pr.name}</text>`;
    svg2 += `<text x="${cx}" y="550" fill="#b0bec5" font-family="Arial" font-size="14" text-anchor="middle">${pr.t}</text>`;
    
    svg2 += `<rect x="${cx-60}" y="570" width="120" height="30" rx="15" fill="#112435" stroke="${pr.c}"/>`;
    svg2 += `<text x="${cx}" y="590" fill="${pr.c}" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">${pr.rank}</text>`;
    
    svg2 += `<text x="${cx}" y="630" fill="#cfd8dc" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">${pr.risk}</text>`;
});

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_15.5_Profile_vs_CXL_Shield.svg'), svg2);

console.log('Todos SVGs do CH-015 gerados!');
