const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-014_Futuro');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 14.1 (13.1): O Grande Pipeline FEM
// ==========================================
let svg1 = `<svg viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1400" height="800" fill="#0A0E17"/>`;

svg1 += `<defs>
    <filter id="glowF" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowFEM" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e5ff" />
    </marker>
</defs>`;

svg1 += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">Figura 13.1: O Motor de Simulação (FEM Pipeline Process)</text>`;
svg1 += `<text x="700" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Metodologia Matemática HGO: Da Clínica ao Gêmeo Digital</text>`;

// Bloco CLINICA (Inptus Diretos do Paciente)
svg1 += `<rect x="50" y="200" width="250" height="300" rx="20" fill="#111B24" stroke="#ff1744" stroke-width="3"/>`;
svg1 += `<text x="175" y="240" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">1. INPUTS IN VIVO</text>`;
svg1 += `<circle cx="175" cy="310" r="40" fill="none" stroke="#ff1744" stroke-width="2"/>`; // Topog icon
svg1 += `<text x="175" y="315" fill="#ff1744" font-family="Arial" font-size="14" text-anchor="middle">Topografia 3D</text>`;
svg1 += `<circle cx="175" cy="410" r="40" fill="none" stroke="#ff1744" stroke-width="2"/>`; // Tomog icon
svg1 += `<text x="175" y="415" fill="#ff1744" font-family="Arial" font-size="14" text-anchor="middle">OCT / Brillouin</text>`;
svg1 += `<line x1="300" y1="350" x2="380" y2="350" stroke="#00e5ff" stroke-width="5" marker-end="url(#arrowFEM)"/>`;


// Bloco DIGITAL TWIN (Criacao da Malha Biomecânica HGO)
svg1 += `<rect x="400" y="150" width="350" height="400" rx="20" fill="#112435" stroke="#00e5ff" stroke-width="4" filter="url(#glowF)"/>`;
svg1 += `<text x="575" y="200" fill="#00e5ff" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">2. GÊMEO DIGITAL (HGO)</text>`;

// O Olho em Wireframe
svg1 += `<circle cx="575" cy="320" r="80" fill="none" stroke="#00e5ff" stroke-width="2" stroke-dasharray="8,4"/>`;
// Fibril wireframe (Cross pattern)
for(let a=0; a<180; a+=30) {
    let r = a * Math.PI/180;
    let dx = Math.cos(r)*80; let dy = Math.sin(r)*80;
    svg1 += `<line x1="${575-dx}" y1="${320-dy}" x2="${575+dx}" y2="${320+dy}" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;
}
svg1 += `<text x="575" y="440" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Material Hiperelástico Anisotrópico</text>`;
svg1 += `<text x="575" y="470" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Polímero: Mooney-Rivlin (PMMA)</text>`;
svg1 += `<text x="575" y="500" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Condição de Bordo: Deslocamento Nulo Escleral</text>`;
svg1 += `<line x1="750" y1="350" x2="830" y2="350" stroke="#00e5ff" stroke-width="5" marker-end="url(#arrowFEM)"/>`;


// BOCO SIMULATION (Iteracoes Vetoriais)
svg1 += `<rect x="850" y="100" width="500" height="500" rx="20" fill="#1E2A15" stroke="#00e676" stroke-width="4"/>`;
svg1 += `<text x="1100" y="150" fill="#00e676" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">3. SOLVER & PREVISÃO</text>`;

// O Flow de forca
svg1 += `<rect x="900" y="200" width="400" height="60" rx="10" fill="#00e676" opacity="0.2"/>`;
svg1 += `<text x="1100" y="235" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Mecânica: Pressão Intraocular (IOP) Ativada</text>`;

svg1 += `<rect x="900" y="280" width="400" height="60" rx="10" fill="#00e676" opacity="0.2"/>`;
svg1 += `<text x="1100" y="315" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Tensão Física: Mapas de Von Mises Estromais</text>`;

svg1 += `<rect x="900" y="360" width="400" height="180" rx="20" fill="#111B24" stroke="#ffb74d" stroke-width="3" filter="url(#glowGold)"/>`;
svg1 += `<text x="1100" y="410" fill="#ffb74d" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">RESULTADO VIRTUAL:</text>`;
svg1 += `<text x="1100" y="450" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">VEsférico Pós-Operatório Mapeado</text>`;
svg1 += `<text x="1100" y="490" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">(Cirurgia Testada Sub-micrometricamente no Código)</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_13.1_FEM_Pipeline.svg'), svg1);

// ==========================================
// FIGURA 14.2 (13.2): Annulus Natural vs Artificial
// ==========================================
let svg2 = `<svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1000" height="500" fill="#0A0E17"/>`;

svg2 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 13.2: O "Annulus Natural" do Limbo vs Segmentos ICRS</text>`;
svg2 += `<text x="500" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Comparativo de Contenção Base para Diferentes Arcos de Anel</text>`;

const cx = 250, cy = 300, rBase = 120;

// O Annulus Natural limbar 360 (Olho Esquerdo)
svg2 += `<circle cx="${cx}" cy="${cy}" r="${rBase}" fill="none" stroke="#cfd8dc" stroke-width="4" stroke-dasharray="10,10"/>`;
svg2 += `<circle cx="${cx}" cy="${cy}" r="${rBase+20}" fill="none" stroke="#2c3e50" stroke-width="20"/>`; // Limbo Real
svg2 += `<text x="${cx}" y="150" fill="#00e5ff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Annulus Natural (Limbo)</text>`;
svg2 += `<text x="${cx}" y="480" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Trava 360° todas as famílias de colágeno.</text>`;

// O Annulus Parcial Artificial (Olho Direito)
const c2x = 750;
svg2 += `<circle cx="${c2x}" cy="${cy}" r="${rBase}" fill="none" stroke="#cfd8dc" stroke-width="4" stroke-dasharray="10,10"/>`;
// Exemplo: Annulus Fusiforme 320 graus
let arcPath = `M ${c2x+rBase*Math.cos(20*Math.PI/180)} ${cy+rBase*Math.sin(20*Math.PI/180)} A ${rBase} ${rBase} 0 1 1 ${c2x+rBase*Math.cos(340*Math.PI/180)} ${cy+rBase*Math.sin(340*Math.PI/180)}`;
svg2 += `<path d="${arcPath}" fill="none" stroke="#ffb74d" stroke-width="25"/>`;

svg2 += `<text x="${c2x}" y="150" fill="#ffb74d" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Annulus Artificial (ICRS Extenso)</text>`;
svg2 += `<text x="${c2x}" y="480" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Segmentos de alto arco (ex: 320°) imitam a trava circum-limbar.</text>`;

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_13.2_Annulus.svg'), svg2);


console.log('Todos SVGs do CH-014 (Futuro FEM) gerados!');
