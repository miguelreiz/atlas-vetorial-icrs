const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'images');
const d1 = path.join(baseDir, 'P1-01_Framework');
const d2 = path.join(baseDir, 'P1-02_Padroes');
const d3 = path.join(baseDir, 'P1-03_Matriz');

if (!fs.existsSync(d1)) fs.mkdirSync(d1, {recursive: true});
if (!fs.existsSync(d2)) fs.mkdirSync(d2, {recursive: true});
if (!fs.existsSync(d3)) fs.mkdirSync(d3, {recursive: true});

// Utils
function arrowMarker(id, color) {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker>`;
}


// ===============================================
// FIG P1.1: Cadeia Causal (P1-01_Framework)
// ===============================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;
svg1 += `<defs>${arrowMarker('aW', '#ffffff')}${arrowMarker('aR', '#ff1744')}</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura P1.1: A Cadeia Causal Biomecânica</text>`;
svg1 += `<text x="600" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">PIO → Malha de Colágeno → Falência → Plácido</text>`;

const boxes1 = [
    {x: 50,  w: 200, title: "1. PIO", desc: "A pressão interna constante empurra", c: "#ffb74d"},
    {x: 330, w: 220, title: "2. MALHA", desc: "Lamelas resistem, criando", desc2: "o Escudo de Colágeno", c: "#00e676"},
    {x: 630, w: 220, title: "3. FALÊNCIA", desc: "Fibras esgarçam e deslizam", desc2: "(Ectasia Local)", c: "#ff1744"},
    {x: 930, w: 220, title: "4. PLÁCIDO", desc: "Superfície cede;", desc2: "Anéis comprimem", c: "#00e5ff"}
];

boxes1.forEach((b, i) => {
    svg1 += `<rect x="${b.x}" y="250" width="${b.w}" height="100" rx="10" fill="#111B24" stroke="${b.c}" stroke-width="3"/>`;
    svg1 += `<text x="${b.x+b.w/2}" y="290" fill="${b.c}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">${b.title}</text>`;
    svg1 += `<text x="${b.x+b.w/2}" y="320" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${b.desc}</text>`;
    if(b.desc2) svg1 += `<text x="${b.x+b.w/2}" y="340" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${b.desc2}</text>`;
    
    // Setas
    if (i < boxes1.length-1) {
        svg1 += `<line x1="${b.x+b.w+10}" y1="300" x2="${boxes1[i+1].x-15}" y2="300" stroke="#ffffff" stroke-width="4" marker-end="url(#aW)"/>`;
    }
});

svg1 += `<text x="600" y="470" fill="#ff1744" font-family="Arial" font-size="18" font-style="italic" font-weight="bold" text-anchor="middle">"Cada anel de Plácido comprimido é uma fibra de colágeno que cedeu."</text>`;
svg1 += `</svg>`;
fs.writeFileSync(path.join(d1, 'Figura_Cadeia_Causal.svg'), svg1);


// ===============================================
// FIG P1.2: Nascimento Vetores (P1-01_Framework)
// ===============================================
let svg2 = `<svg viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1200" height="500" fill="#0A0E17"/>`;

svg2 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura P1.2: Nascimento dos Vetores</text>`;

const vecs = [
    {x: 100, t: "Alargamento Central", desc: "Frouxidão Simétrica", v: "VR (Radial)", vc: "#0B3D91"},
    {x: 500, t: "Deslizamento Inferior", desc: "Ápice Caiu", v: "Vτ (Torque)", vc: "#FFD700"},
    {x: 900, t: "Distorção Meridional", desc: "Compressão Simétrica", v: "VT (Tangencial)", vc: "#00B4DC"}
];

svg2 += `<defs>${arrowMarker('av1', '#0B3D91')}${arrowMarker('av2', '#FFD700')}${arrowMarker('av3', '#00B4DC')}</defs>`;

vecs.forEach((v, i) => {
    svg2 += `<rect x="${v.x}" y="150" width="250" height="250" rx="15" fill="#111B24"/>`;
    svg2 += `<text x="${v.x+125}" y="190" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">${v.t}</text>`;
    svg2 += `<text x="${v.x+125}" y="215" fill="#cfd8dc" font-family="Arial" font-size="14" text-anchor="middle">${v.desc}</text>`;
    
    // Abstract representation
    let cx = v.x+125, cy = 290;
    if (i===0) { 
        svg2 += `<circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
        svg2 += `<line x1="${cx}" y1="${cy}" x2="${cx+40}" y2="${cy}" stroke="${v.vc}" stroke-width="5" marker-end="url(#av1)"/>`;
    }
    else if (i===1) {
        svg2 += `<path d="M ${cx-30} ${cy} Q ${cx} ${cy+40} ${cx+30} ${cy}" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
        svg2 += `<line x1="${cx}" y1="${cy+20}" x2="${cx}" y2="${cy-30}" stroke="${v.vc}" stroke-width="5" marker-end="url(#av2)"/>`;
    }
    else {
        svg2 += `<ellipse cx="${cx}" cy="${cy}" rx="40" ry="20" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-dasharray="4,4"/>`;
        svg2 += `<line x1="${cx-40}" y1="${cy}" x2="${cx-60}" y2="${cy}" stroke="${v.vc}" stroke-width="5" marker-end="url(#av3)"/>`;
        svg2 += `<line x1="${cx+40}" y1="${cy}" x2="${cx+60}" y2="${cy}" stroke="${v.vc}" stroke-width="5" marker-end="url(#av3)"/>`;
    }
    
    svg2 += `<rect x="${v.x+50}" y="420" width="150" height="30" rx="15" fill="${v.vc}" opacity="0.8"/>`;
    svg2 += `<text x="${v.x+125}" y="440" fill="#ffffff" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">${v.v}</text>`;
});

svg2 += `</svg>`;
fs.writeFileSync(path.join(d1, 'Figura_Nascimento_Vetores.svg'), svg2);


// ===============================================
// FIG P2.0: Atlas dos 5 Padroes (P1-02_Padroes)
// ===============================================
let svg3 = `<svg viewBox="0 0 1400 650" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="1400" height="650" fill="#0A0E17"/>`;

svg3 += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura P2.0: Os 5 Padrões de Deformação (Morfologia Plácido)</text>`;

const pads = [
    {n: "P1: Curcular", s: "Simétrico", d: "VT dominante", c: "#00B4DC", px: 100},
    {n: "P2: Oval", s: "Assimétrico Inf.", d: "Vτ dominante", c: "#FFD700", px: 350},
    {n: "P3: Duck", s: "Dois polos (1/2)", d: "Fτ / Aberrometria", c: "#ff1744", px: 600},
    {n: "P4: Snowman", s: "Cascata Vertical", d: "Duplo VR", c: "#0B3D91", px: 850},
    {n: "P5: Complexo", s: "Caótico", d: "ICRS Personalizado", c: "#cfd8dc", px: 1100}
];

// Drawing them roughly
pads.forEach((p, i) => {
    let cx = p.px + 100;
    let cy = 250;
    svg3 += `<rect x="${p.px}" y="150" width="200" height="300" rx="10" fill="#111B24" stroke="${p.c}" stroke-width="2"/>`;
    
    // Mock Placido rings
    for(let r=1; r<=4; r++){
        if (i===0) svg3 += `<ellipse cx="${cx}" cy="${cy}" rx="${r*20}" ry="${r*12}" fill="none" stroke="${p.c}" stroke-width="2"/>`;
        if (i===1) svg3 += `<ellipse cx="${cx}" cy="${cy+r*10}" rx="${r*20}" ry="${r*25}" fill="none" stroke="${p.c}" stroke-width="2"/>`;
        if (i===2) {
            // Duck (Small head, large body)
            svg3 += `<ellipse cx="${cx}" cy="${cy-40+r*5}" rx="${r*10}" ry="${r*8}" fill="none" stroke="${p.c}" stroke-width="1.5"/>`;
            svg3 += `<ellipse cx="${cx}" cy="${cy+30+r*5}" rx="${r*15}" ry="${r*15}" fill="none" stroke="${p.c}" stroke-width="1.5"/>`;
        }
        if (i===3) {
            // Snowman
            svg3 += `<ellipse cx="${cx}" cy="${cy-30}" rx="${r*12}" ry="${r*12}" fill="none" stroke="${p.c}" stroke-width="1.5"/>`;
            svg3 += `<ellipse cx="${cx}" cy="${cy+30}" rx="${r*16}" ry="${r*16}" fill="none" stroke="${p.c}" stroke-width="1.5"/>`;
        }
        if (i===4) {
            // Chaos
            svg3 += `<path d="M ${cx-r*15} ${cy} Q ${cx-r*10} ${cy-r*30} ${cx+r*10} ${cy-r*10} T ${cx+r*20} ${cy+r*20}" fill="none" stroke="${p.c}" stroke-width="1.5"/>`;
        }
    }
    
    svg3 += `<text x="${cx}" y="380" fill="#ffffff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">${p.n}</text>`;
    svg3 += `<text x="${cx}" y="405" fill="#cfd8dc" font-family="Arial" font-size="13" text-anchor="middle">${p.s}</text>`;
    svg3 += `<rect x="${cx-80}" y="420" width="160" height="20" rx="5" fill="${p.c}" opacity="0.3"/>`;
    svg3 += `<text x="${cx}" y="435" fill="${p.c}" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle">${p.d}</text>`;
});

svg3 += `</svg>`;
fs.writeFileSync(path.join(d2, 'Figura_Atlas_5_Padroes.svg'), svg3);


// ===============================================
// FIG P3.1: Matriz de Decisao (P1-03_Matriz)
// ===============================================
let svg4 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg4 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg4 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">Figura P3.1: Matriz de Decisão Vetorial (3 Passos)</text>`;

svg4 += `<defs>
    <marker id="arG" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#00e676"/></marker>
    <marker id="arR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744"/></marker>
</defs>`;

// Passo 1
svg4 += `<rect x="100" y="100" width="250" height="400" rx="10" fill="#111B24" stroke="#ffb74d" stroke-width="2"/>`;
svg4 += `<text x="225" y="140" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PASSO 1: O Fenótipo</text>`;
svg4 += `<text x="225" y="200" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Identificar P1, P2, P3, P4, P5</text>`;

// Passo 2
svg4 += `<rect x="450" y="200" width="300" height="200" rx="10" fill="#111B24" stroke="#b388ff" stroke-width="2"/>`;
svg4 += `<text x="600" y="240" fill="#b388ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PASSO 2: Coincidência Axial?</text>`;
svg4 += `<text x="600" y="280" fill="#ffffff" font-family="Arial" font-size="16" text-anchor="middle">K-Max = Eixo do Coma?</text>`;

// Liga P1 -> P2
svg4 += `<line x1="350" y1="300" x2="430" y2="300" stroke="#ffffff" stroke-width="3" marker-end="url(#aW)"/>`;

// Passo 3 SIM
svg4 += `<rect x="850" y="120" width="250" height="150" rx="10" fill="#112A22" stroke="#00e676" stroke-width="2"/>`;
svg4 += `<text x="975" y="160" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PASSO 3: SIM</text>`;
svg4 += `<text x="975" y="200" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Incisão baseada no Topo</text>`;
svg4 += `<text x="975" y="225" fill="#cfd8dc" font-family="Arial" font-size="12" text-anchor="middle">(Vτ p/ P2, VT p/ P1)</text>`;
svg4 += `<line x1="750" y1="280" x2="840" y2="200" stroke="#00e676" stroke-width="3" marker-end="url(#arG)"/>`;
svg4 += `<circle cx="795" cy="240" r="15" fill="#0A0E17"/>`;
svg4 += `<text x="795" y="245" fill="#00e676" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">S</text>`;

// Passo 3 NAO
svg4 += `<rect x="850" y="320" width="250" height="150" rx="10" fill="#2A1114" stroke="#ff1744" stroke-width="2"/>`;
svg4 += `<text x="975" y="360" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">PASSO 3: NÃO (Discordância)</text>`;
svg4 += `<text x="975" y="400" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Incisão baseada no ENM</text>`;
svg4 += `<text x="975" y="425" fill="#cfd8dc" font-family="Arial" font-size="12" text-anchor="middle">(Guiado pela Aberrometria)</text>`;
svg4 += `<line x1="750" y1="320" x2="840" y2="400" stroke="#ff1744" stroke-width="3" marker-end="url(#arR)"/>`;
svg4 += `<circle cx="795" cy="360" r="15" fill="#0A0E17"/>`;
svg4 += `<text x="795" y="365" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">N</text>`;

svg4 += `</svg>`;
fs.writeFileSync(path.join(d3, 'Figura_Matriz_Decisao.svg'), svg4);


// ===============================================
// FIG P3.2: Cheat Sheet Clinica (P1-03_Matriz)
// ===============================================
let svg5 = `<svg viewBox="0 0 1200 650" xmlns="http://www.w3.org/2000/svg">`;
svg5 += `<rect width="1200" height="650" fill="#0A0E17"/>`;

svg5 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura P3.2: Cheat Sheet — Do Fenótipo à Prescrição</text>`;

// Table Header
svg5 += `<rect x="50" y="100" width="1100" height="50" fill="#111B24" stroke="#cfd8dc" stroke-width="1"/>`;
svg5 += `<text x="150" y="132" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Fenótipo (Plácido)</text>`;
svg5 += `<text x="450" y="132" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Assinatura de Coma</text>`;
svg5 += `<text x="750" y="132" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Dominante</text>`;
svg5 += `<text x="1000" y="132" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Caixa Cirúrgica</text>`;

const rows = [
    {p: "P1 Circular", c: "Z2 dominante", v: "VT (Tangencial)", i: "Simétrico Curto/Longo"},
    {p: "P2 Oval", c: "Z(3,-1) Vertical Alto", v: "Vτ dominante + VR local", i: "Assimétrico Único Inf."},
    {p: "P3 Duck", c: "Eixo Coma = Eixo Topo?", v: "Vτ (T1) ou Fτ/ENM (T2)", i: "160-210° Ponta Grossa Polo"},
    {p: "P4 Snowman", c: "Múltiplos Polos (Alto Z3-1)", v: "Duplo VR + Vτ Coaxial", i: "Base Flexível (Ex: AJL Pro+)"},
    {p: "P5 Complexo", c: "HOA Caótico Elevadíssimo", v: "Irreconhecível", i: "Planejamento Personalizado CXL"}
];

rows.forEach((r, idx) => {
    let y = 150 + idx * 80;
    svg5 += `<rect x="50" y="${y}" width="1100" height="80" fill="${idx%2===0 ? '#0B1220' : '#0A0E17'}" stroke="#263238" stroke-width="1"/>`;
    
    // Fenotipo
    svg5 += `<text x="150" y="${y+45}" fill="#ffffff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">${r.p}</text>`;
    // Coma
    svg5 += `<text x="450" y="${y+45}" fill="#b388ff" font-family="Arial" font-size="16" text-anchor="middle">${r.c}</text>`;
    // Vetor
    svg5 += `<rect x="650" y="${y+25}" width="200" height="30" rx="5" fill="#FFD700" opacity="0.2"/>`;
    svg5 += `<text x="750" y="${y+45}" fill="#FFD700" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">${r.v}</text>`;
    // Caixa
    svg5 += `<text x="1000" y="${y+45}" fill="#00e676" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">${r.i}</text>`;
});

svg5 += `<text x="600" y="600" fill="#cfd8dc" font-family="Arial" font-size="16" font-style="italic" text-anchor="middle">Regra de Ouro: Uma discrepância axial entre o K-Max e o Coma > 20° desabona qualquer topografia — você deve guiar pelo ENM.</text>`;

svg5 += `</svg>`;
fs.writeFileSync(path.join(d3, 'Figura_Cheat_Sheet.svg'), svg5);

console.log('5 SVGs do P1 foram gerados completamente!');
