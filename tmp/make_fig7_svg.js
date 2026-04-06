const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-007_VComa');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 7.1: A Analogia do Farol
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;
svg1 += `<defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="beam1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#00e5ff" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="beam2" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#ff1744" stop-opacity="0.1"/>
    </linearGradient>
</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 7.1: O Que é Coma? A Analogia do Farol</text>`;
svg1 += `<text x="600" y="80" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">O VComa mede a distorção luminosa gerada pelo desvio do centro óptico da córnea.</text>`;

// Cima: Farol Limpo
svg1 += `<rect x="50" y="120" width="1100" height="200" rx="10" fill="#111B24"/>`;
svg1 += `<text x="70" y="150" fill="#00e5ff" font-family="Arial" font-size="20" font-weight="bold">Visão Sem Coma (Ápice Centralizado)</text>`;
svg1 += `<ellipse cx="150" cy="220" rx="20" ry="40" fill="#cfd8dc" stroke="#fff" stroke-width="2"/>`; // Olho/Lente
// Clean beam
svg1 += `<polygon points="170,200 900,160 900,280 170,240" fill="url(#beam1)"/>`;
svg1 += `<circle cx="900" cy="220" r="30" fill="#00e5ff" filter="url(#glow)"/>`;
svg1 += `<text x="960" y="225" fill="#ffffff" font-family="Arial" font-size="18">Ponto Focal Limpo (Sem distorção)</text>`;

// Baixo: Farol Torto
svg1 += `<rect x="50" y="350" width="1100" height="200" rx="10" fill="#111B24"/>`;
svg1 += `<text x="70" y="380" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold">Visão Com Coma (Ápice Descentrado)</text>`;
// Lente Inclinada
svg1 += `<ellipse cx="150" cy="450" rx="20" ry="40" fill="#cfd8dc" stroke="#ff1744" stroke-width="4" transform="rotate(-15 150 450)"/>`; 
// Distorted Coma Beam (Rabo de Cometa)
svg1 += `<polygon points="170,430 900,380 900,520 170,470" fill="url(#beam2)"/>`;
svg1 += `<circle cx="900" cy="420" r="20" fill="#ffb74d" filter="url(#glow)"/>`;
svg1 += `<ellipse cx="900" cy="470" rx="15" ry="40" fill="#ff1744" filter="url(#glow)" opacity="0.6"/>`;
svg1 += `<text x="960" y="455" fill="#ffffff" font-family="Arial" font-size="18">"Cauda de Cometa" (Borrão Visual)</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_7.1_Analogia_Coma.svg'), svg1);


// ==========================================
// FIGURA 7.2: O Mapa de VComa (Top-Down)
// ==========================================
let svg2 = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="800" height="600" fill="#0A0E17"/>`;
svg2 += `<defs>
    <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowP" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#b388ff" />
    </marker>
</defs>`;
svg2 += `<text x="400" y="50" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Figura 7.2: O Mapa de Deslocamento do Ápice (VComa)</text>`;
const c2x = 400, c2y = 300;

// Grids
svg2 += `<circle cx="${c2x}" cy="${c2y}" r="200" fill="#0288d1" opacity="0.2"/>`;
svg2 += `<circle cx="${c2x}" cy="${c2y}" r="200" fill="none" stroke="#37474f" stroke-width="2"/>`;
svg2 += `<circle cx="${c2x}" cy="${c2y}" r="100" fill="none" stroke="#263238" stroke-dasharray="5,5"/>`;
// Pupila Mark (0,0)
svg2 += `<path d="M ${c2x-15} ${c2y} L ${c2x+15} ${c2y} M ${c2x} ${c2y-15} L ${c2x} ${c2y+15}" stroke="#00e5ff" stroke-width="3"/>`;
svg2 += `<text x="${c2x-20}" y="${c2y-20}" fill="#00e5ff" font-family="Arial" font-size="14" font-weight="bold">Eixo Visual (+)</text>`;

// Hot spot (Kmax) descentrado inferiormente
const kX = c2x + 60, kY = c2y + 110;
svg2 += `<ellipse cx="${kX}" cy="${kY}" rx="80" ry="60" fill="#ff1744" opacity="0.8" filter="url(#glow2)"/>`;
svg2 += `<circle cx="${kX}" cy="${kY}" r="5" fill="#fff"/>`;
svg2 += `<text x="${kX+15}" y="${kY+5}" fill="#fff" font-family="Arial" font-size="14" font-weight="bold">Ápice (K-max)</text>`;

// O Vetor Roxo (VComa Magnitude)
svg2 += `<line x1="${c2x}" y1="${c2y}" x2="${kX}" y2="${kY}" stroke="#b388ff" stroke-width="8" marker-end="url(#arrowP)"/>`;

// Caixa explicativa
svg2 += `<rect x="50" y="500" width="700" height="80" rx="10" fill="#111B24"/>`;
svg2 += `<text x="400" y="530" fill="#b388ff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">| VComa | = √( x² + y² )</text>`;
svg2 += `<text x="400" y="560" fill="#ffffff" font-family="Arial" font-size="16" text-anchor="middle">A distância Vetorial entre a Pupila e o Cume Térmico do Ectasia.</text>`;
svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_7.2_VComa_Heatmap.svg'), svg2);


// ==========================================
// FIGURA 7.3: Hierarquia (Cone Central vs Sagging)
// ==========================================
let svg3 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="1200" height="600" fill="#0A0E17"/>`;
svg3 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 7.3: Hierarquia de Vetores Cirúrgicos por Fenótipo</text>`;

svg3 += `<rect x="50" y="100" width="530" height="450" rx="15" fill="#11151A" stroke="#00e5ff" stroke-width="2"/>`;
svg3 += `<rect x="620" y="100" width="530" height="450" rx="15" fill="#11151A" stroke="#ffb74d" stroke-width="2"/>`;

// Col 1
svg3 += `<text x="315" y="150" fill="#00e5ff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Cone Central (Nipple)</text>`;
svg3 += `<circle cx="315" cy="260" r="70" fill="none" stroke="#263238" stroke-width="2"/>`;
svg3 += `<circle cx="315" cy="260" r="30" fill="#ff1744" opacity="0.8"/>`; // apicé centrado
svg3 += `<text x="315" y="380" fill="#00e5ff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">PRIORIDADE: VR</text>`;
svg3 += `<text x="315" y="420" fill="#90a4ae" font-family="Arial" font-size="18" text-anchor="middle">Aplainamento central puro.</text>`;
svg3 += `<text x="315" y="450" fill="#90a4ae" font-family="Arial" font-size="18" text-anchor="middle">Coma já é baixo por natureza.</text>`;
svg3 += `<rect x="180" y="480" width="270" height="40" rx="5" fill="#00e5ff" opacity="0.2"/>`;
svg3 += `<text x="315" y="506" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Ferramenta: Anel Simétrico</text>`;

// Col 2
svg3 += `<text x="885" y="150" fill="#ffb74d" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Cone Descentrado (Sagging)</text>`;
svg3 += `<circle cx="885" cy="260" r="70" fill="none" stroke="#263238" stroke-width="2"/>`;
svg3 += `<ellipse cx="885" cy="300" rx="40" ry="25" fill="#ff1744" opacity="0.8"/>`; // apicé caido
svg3 += `<text x="885" y="380" fill="#ffb74d" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">PRIORIDADE: VComa</text>`;
svg3 += `<text x="885" y="420" fill="#90a4ae" font-family="Arial" font-size="18" text-anchor="middle">Trazer o ápice para a pupila.</text>`;
svg3 += `<text x="885" y="450" fill="#90a4ae" font-family="Arial" font-size="18" text-anchor="middle">Deslocar é mais vital que aplainar.</text>`;
svg3 += `<rect x="750" y="480" width="270" height="40" rx="5" fill="#ffb74d" opacity="0.2"/>`;
svg3 += `<text x="885" y="506" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Ferramenta: Anel Assimétrico/Torque</text>`;

svg3 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_7.3_Hierarquia_Cone.svg'), svg3);


// ==========================================
// FIGURA 7.4: Hemicórneas Coma
// ==========================================
let svg4 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg4 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg4 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">Figura 7.4: O Berço Biológico da Distorção de Alta Ordem (Escala Lamelar)</text>`;
svg4 += `<text x="600" y="80" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">Assimetria de Tensão: Hemicórnea superior intacta (foco ok) contra hemicórnea inferior flácida e abaulada (foco errado).</text>`;

// Desenho de secção da córnea
const mid = 300;
svg4 += `<rect x="50" y="120" width="1100" height="430" rx="10" fill="#111B24"/>`;

// Linha de Visao Central
svg4 += `<line x1="100" y1="335" x2="1100" y2="335" stroke="#ffffff" stroke-width="2" stroke-dasharray="10,10"/>`;

// Curvatura Corneana (Lado esquerdo)
svg4 += `<path d="M 300 150 Q 150 250 150 335" fill="none" stroke="#00e5ff" stroke-width="8"/>`; // Boa
svg4 += `<path d="M 150 335 Q 120 450 300 500" fill="none" stroke="#ff1744" stroke-width="6"/>`; // Ruim e curva

// Lamelas detalhadas
for(let i=0; i<4; i++){
    svg4 += `<path d="M 320 ${160+i*10} Q 170 ${260+i*5} 170 ${335}" fill="none" stroke="#4caf50" stroke-width="2"/>`; // Tensas e juntas
    svg4 += `<path d="M 170 335 Q 120 ${450+i*15} 320 ${500+i*5}" fill="none" stroke="#b0bec5" stroke-width="2" stroke-dasharray="4,2"/>`; // Frouxas, separadas
}

svg4 += `<text x="350" y="200" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold">Lamelas Intactas</text>`;
svg4 += `<text x="350" y="500" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold">Lamelas Esgarçadas</text>`;

// Raios de luz 
// Bons (convergem lindamente)
svg4 += `<line x1="50" y1="200" x2="148" y2="200" stroke="#fff" stroke-width="3"/>`;
svg4 += `<line x1="150" y1="200" x2="800" y2="335" stroke="#00e5ff" stroke-width="3"/>`;

svg4 += `<line x1="50" y1="280" x2="148" y2="280" stroke="#fff" stroke-width="3"/>`;
svg4 += `<line x1="150" y1="280" x2="800" y2="335" stroke="#00e5ff" stroke-width="3"/>`;

// Foco Retina Master
svg4 += `<circle cx="800" cy="335" r="10" fill="#00e5ff"/>`;
svg4 += `<text x="830" y="325" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold">Foco 1 (Imagem Nítida)</text>`;

// Ruins (Covergem cedo e borram a imagem)
svg4 += `<line x1="50" y1="400" x2="140" y2="400" stroke="#fff" stroke-width="3"/>`;
svg4 += `<line x1="140" y1="400" x2="600" y2="450" stroke="#ff1744" stroke-width="3"/>`;

svg4 += `<line x1="50" y1="480" x2="200" y2="480" stroke="#fff" stroke-width="3"/>`;
svg4 += `<line x1="200" y1="480" x2="600" y2="450" stroke="#ff1744" stroke-width="3"/>`;

// Foco Espurio
svg4 += `<circle cx="600" cy="450" r="10" fill="#ff1744"/>`;
svg4 += `<text x="630" y="470" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold">Foco 2 (Distorção / VComa)</text>`;

svg4 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_7.4_Coma_Hemicorneas.svg'), svg4);

console.log('Todos SVGs do CH-007 gerados!');
