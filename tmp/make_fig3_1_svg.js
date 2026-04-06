const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-003_Classificacao_Ceratocone');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_3.1_Padroes_Topograficos.svg');

const w = 1500;
const h = 750;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="#0A0E17"/>`;

svg += `
<defs>
    <filter id="glowCenter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    
    <filter id="glowOval" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="20" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>

    <radialGradient id="heatNipple" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff1744" stop-opacity="1"/>
      <stop offset="40%" stop-color="#ffb74d" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="#4caf50" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0288d1" stop-opacity="0.2"/>
    </radialGradient>
    
    <radialGradient id="heatOval" cx="50%" cy="65%" r="60%">
      <stop offset="0%" stop-color="#ff1744" stop-opacity="1"/>
      <stop offset="35%" stop-color="#ffb74d" stop-opacity="0.8"/>
      <stop offset="65%" stop-color="#4caf50" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0288d1" stop-opacity="0.2"/>
    </radialGradient>
    
    <radialGradient id="heatPMD" cx="50%" cy="90%" r="70%">
      <stop offset="0%" stop-color="#ff1744" stop-opacity="1"/>
      <stop offset="25%" stop-color="#ffb74d" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#4caf50" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0288d1" stop-opacity="0.2"/>
    </radialGradient>
</defs>
`;

// Titulo
svg += `<text x="750" y="60" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">Figura 3.1: Evolução da Temperatura Estromal (Topografia Vetorial)</text>`;
svg += `<text x="750" y="100" fill="#B0BEC5" font-family="Arial" font-size="20" text-anchor="middle">A localização anatômica da fraqueza define a classificação primária do ceratocone.</text>`;

const yBase = 400;

// ==========================================
// P1: Nipple (Cone Central)
// ==========================================
const cx1 = 250;
svg += `<rect x="50" y="150" width="400" height="550" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx1}" y="200" fill="#cfd8dc" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">1. Cone Nipple (Central)</text>`;
svg += `<text x="${cx1}" y="230" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Ápice 100% sobre a linha do Eixo Visual</text>`;

// O Heatmap (Cornea base)
svg += `<circle cx="${cx1}" cy="${yBase}" r="150" fill="#0288d1" opacity="0.3"/>`;
svg += `<circle cx="${cx1}" cy="${yBase}" r="100" fill="url(#heatNipple)" filter="url(#glowCenter)"/>`;
// Pupila Mark (Centro exato)
svg += `<path d="M ${cx1-15} ${yBase} L ${cx1+15} ${yBase} M ${cx1} ${yBase-15} L ${cx1} ${yBase+15}" stroke="#ffffff" stroke-width="2"/>`;

svg += `<rect x="${cx1-130}" y="${yBase+190}" width="260" height="90" fill="#0e171f" rx="10"/>`;
svg += `<text x="${cx1}" y="${yBase+220}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Necessário: VR (Puro)</text>`;
svg += `<text x="${cx1}" y="${yBase+250}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Anel Simétrico e Aplainante</text>`;


// ==========================================
// P2: Oval (Sagging / Descentrado)
// ==========================================
const cx2 = 750;
svg += `<rect x="550" y="150" width="400" height="550" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx2}" y="200" fill="#cfd8dc" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">2. Cone Oval (Sagging)</text>`;
svg += `<text x="${cx2}" y="230" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">O peso estromal cedeu para o Setor Inferior</text>`;

svg += `<circle cx="${cx2}" cy="${yBase}" r="150" fill="#0288d1" opacity="0.3"/>`;
// O cone deslocado
svg += `<ellipse cx="${cx2}" cy="${yBase+40}" rx="90" ry="110" fill="url(#heatOval)" filter="url(#glowOval)"/>`;
// Pupila Mark (Centro exato)
svg += `<path d="M ${cx2-15} ${yBase} L ${cx2+15} ${yBase} M ${cx2} ${yBase-15} L ${cx2} ${yBase+15}" stroke="#ffffff" stroke-width="2"/>`;
// Cone Apex Mark
svg += `<circle cx="${cx2}" cy="${yBase+70}" r="4" fill="#000000"/>`;

svg += `<rect x="${cx2-130}" y="${yBase+190}" width="260" height="90" fill="#0e171f" rx="10"/>`;
svg += `<text x="${cx2}" y="${yBase+220}" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Necessário: Vτ + VComa</text>`;
svg += `<text x="${cx2}" y="${yBase+250}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Anel Assimétrico Progressivo</text>`;


// ==========================================
// P3: PMD / Global (Marginal Pelúcida)
// ==========================================
const cx3 = 1250;
svg += `<rect x="1050" y="150" width="400" height="550" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx3}" y="200" fill="#cfd8dc" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">3. Global / Pelúcida</text>`;
svg += `<text x="${cx3}" y="230" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">As lamelas deslizaram nas bordas inferiores</text>`;

svg += `<circle cx="${cx3}" cy="${yBase}" r="150" fill="#0288d1" opacity="0.3"/>`;
// O cone de pelucida (forma de croissant na base)
svg += `<path d="M ${cx3-140} ${yBase+60} Q ${cx3} ${yBase-40} ${cx3+140} ${yBase+60} Q ${cx3} ${yBase+180} ${cx3-140} ${yBase+60} Z" fill="url(#heatPMD)" filter="url(#glowOval)"/>`;
// Pupila Mark (Centro exato)
svg += `<path d="M ${cx3-15} ${yBase} L ${cx3+15} ${yBase} M ${cx3} ${yBase-15} L ${cx3} ${yBase+15}" stroke="#ffffff" stroke-width="2"/>`;

svg += `<rect x="${cx3-130}" y="${yBase+190}" width="260" height="90" fill="#0e171f" rx="10"/>`;
svg += `<text x="${cx3}" y="${yBase+220}" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Necessário: Base Ampla</text>`;
svg += `<text x="${cx3}" y="${yBase+250}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Anel Longo e Calibroso Inferior</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V3.1 Topography Padroes saved successfully to:', outPath);
