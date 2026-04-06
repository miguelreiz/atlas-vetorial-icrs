const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-005_VT_Vetor_Tangencial');
const outPath = path.join(outDir, 'Figura_5_Efeito_Acoplamento.svg');

// Let's make it taller and wider to have absolute spacing
const w = 1500;
const h = 850;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
// Solid dark background
svg += `<rect width="${w}" height="${h}" fill="#0A0E17"/>`;

svg += `
<defs>
    <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <marker id="arrowB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e5ff" />
    </marker>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff9100" />
    </marker>
</defs>
`;

svg += `<text x="750" y="60" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">O Efeito de Acoplamento (Paradoxo de Poisson)</text>`;
svg += `<text x="750" y="100" fill="#B0BEC5" font-family="Arial" font-size="20" text-anchor="middle">A compressão forçada em um meridiano provoca a expansão biológica no meridiano ortogonal.</text>`;

// Y position for the main shapes
const y = 470;
const cx1 = 250;
const cx2 = 750;
const cx3 = 1250;

// ==========================================
// P1: ASTIGMATISMO
// ==========================================
svg += `<rect x="50" y="150" width="400" height="550" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx1}" y="200" fill="#cfd8dc" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">1. Pré-Operatório (Oval)</text>`;
svg += `<text x="${cx1}" y="230" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Alta diferença entre os Eixos</text>`;

// Ovals
svg += `<ellipse cx="${cx1}" cy="${y}" rx="100" ry="160" fill="none" stroke="#78909c" stroke-width="4" stroke-dasharray="10,5"/>`;
// Axes
svg += `<line x1="${cx1}" y1="${y-200}" x2="${cx1}" y2="${y+200}" stroke="#455a64" stroke-width="2"/>`;
svg += `<line x1="${cx1-130}" y1="${y}" x2="${cx1+130}" y2="${y}" stroke="#455a64" stroke-width="2"/>`;
// Clean labels avoiding lines
svg += `<rect x="${cx1-85}" y="${y-195}" width="170" height="30" fill="#111B24"/>`;
svg += `<text x="${cx1}" y="${y-175}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Eixo Mais Curvo</text>`;

svg += `<rect x="${cx1-140}" y="${y-35}" width="95" height="30" fill="#111B24"/>`;
svg += `<text x="${cx1-95}" y="${y-15}" fill="#ff9100" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Eixo Plano</text>`;


// ==========================================
// P2: THE SQUEEZE (Aplainamento)
// ==========================================
svg += `<rect x="550" y="150" width="400" height="550" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx2}" y="200" fill="#00e5ff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">2. Compressão Focal</text>`;
svg += `<text x="${cx2}" y="230" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">O ICRS achata o Meridiano Curvo</text>`;

// Squeezed Oval (tighter vertically)
svg += `<ellipse cx="${cx2}" cy="${y}" rx="100" ry="120" fill="none" stroke="#00e5ff" stroke-width="6" filter="url(#glowBlue)"/>`;
svg += `<ellipse cx="${cx2}" cy="${y}" rx="100" ry="160" fill="none" stroke="#78909c" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>`;

// External forces pressing INwards! (Blue arrows top and bottom)
svg += `<line x1="${cx2}" y1="${y-220}" x2="${cx2}" y2="${y-135}" stroke="#00e5ff" stroke-width="12" marker-end="url(#arrowB)" filter="url(#glowBlue)"/>`;
svg += `<line x1="${cx2}" y1="${y+220}" x2="${cx2}" y2="${y+135}" stroke="#00e5ff" stroke-width="12" marker-end="url(#arrowB)" filter="url(#glowBlue)"/>`;

// Separate label box above
svg += `<rect x="${cx2-160}" y="${y-120}" width="320" height="40" fill="#0A0E17" rx="5" opacity="0.9"/>`;
svg += `<text x="${cx2}" y="${y-95}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ΔK Negativo (Aplainamento)</text>`;


// ==========================================
// P3: THE EXPANSION (Encurvamento de Acoplamento)
// ==========================================
svg += `<rect x="1050" y="150" width="400" height="550" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx3}" y="200" fill="#ff9100" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">3. Reação de Acoplamento</text>`;
svg += `<text x="${cx3}" y="230" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">O Meridiano Plano é fisicamente estufado</text>`;

// The Round result (Expands sideways!)
svg += `<ellipse cx="${cx3}" cy="${y}" rx="140" ry="120" fill="none" stroke="#ff9100" stroke-width="6" filter="url(#glowOrange)"/>`;
svg += `<ellipse cx="${cx3}" cy="${y}" rx="100" ry="120" fill="none" stroke="#00e5ff" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>`;

// Expansion forces pushing OUTwards horizontally! (Orange arrows)
svg += `<line x1="${cx3-60}" y1="${y}" x2="${cx3-155}" y2="${y}" stroke="#ff9100" stroke-width="12" marker-end="url(#arrowR)" filter="url(#glowOrange)"/>`;
svg += `<line x1="${cx3+60}" y1="${y}" x2="${cx3+155}" y2="${y}" stroke="#ff9100" stroke-width="12" marker-end="url(#arrowR)" filter="url(#glowOrange)"/>`;

// Clean label box
svg += `<rect x="${cx3-160}" y="${y+60}" width="320" height="40" fill="#0A0E17" rx="5" opacity="0.9"/>`;
svg += `<text x="${cx3}" y="${y+86}" fill="#ff9100" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ΔK Positivo (Encurvamento)</text>`;


// ==========================================
// FOOTER / DIDACTIC RULE
// ==========================================
svg += `<rect x="50" y="730" width="1400" height="80" rx="15" fill="#1e2d3d"/>`;
svg += `<text x="750" y="765" fill="#ffffff" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Causalidade Física: O VT não atua diretamente nos dois eixos.</text>`;
svg += `<text x="750" y="795" fill="#00e5ff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Ele esmaga o Curvo <tspan fill="#ffffff">e a lei de conservação de tensão encarrega-se de</tspan> <tspan fill="#ff9100">estufar o Plano</tspan>.</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V5 Coupling Effect (Elite) saved successfully to:', outPath);
