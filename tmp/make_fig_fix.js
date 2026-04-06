const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-008_VEsferico');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 8.1/9.2: A Soma Vetorial Visual (Equação Matemática Real)
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg1 += `<defs>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0288d1" />
    </marker>
    <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff1744" />
    </marker>
    <marker id="arrowO" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffb74d" />
    </marker>
    <marker id="arrowP" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#b388ff" />
    </marker>
    <marker id="arrowG" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e676" />
    </marker>
</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 8.1 / 9.1: A Equação Mestra (A Soma Vetorial)</text>`;
svg1 += `<text x="600" y="80" fill="#b0bec5" font-family="Arial" font-size="16" text-anchor="middle">Os 4 eixos de ação biomecânica se fundem para criar o Resultado Clínico (ROI).</text>`;

// O Box da Soma (Esquerda)
svg1 += `<rect x="50" y="120" width="400" height="380" rx="20" fill="#111B24" stroke="#263238" stroke-width="2"/>`;
svg1 += `<text x="250" y="160" fill="#cfd8dc" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Os Vetores Componentes (Ferramentas)</text>`;

svg1 += `<line x1="100" y1="220" x2="250" y2="220" stroke="#0288d1" stroke-width="8" marker-end="url(#arrowB)"/>`;
svg1 += `<text x="280" y="225" fill="#0288d1" font-family="Arial" font-size="18" font-weight="bold">VR (Aplainamento)</text>`;

svg1 += `<line x1="100" y1="290" x2="210" y2="290" stroke="#ff1744" stroke-width="8" marker-end="url(#arrowR)"/>`;
svg1 += `<text x="280" y="295" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold">VT (Redistribuição)</text>`;

svg1 += `<line x1="100" y1="360" x2="280" y2="360" stroke="#ffb74d" stroke-width="8" marker-end="url(#arrowO)"/>`;
svg1 += `<text x="310" y="365" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold">Vτ (Torque/Cunha)</text>`;

svg1 += `<line x1="100" y1="430" x2="180" y2="430" stroke="#b388ff" stroke-width="8" marker-end="url(#arrowP)"/>`;
svg1 += `<text x="280" y="435" fill="#b388ff" font-family="Arial" font-size="18" font-weight="bold">VComa (Óptico)</text>`;


// Sinal de SOMA
svg1 += `<text x="500" y="330" fill="#ffffff" font-family="Arial" font-size="60" font-weight="bold" text-anchor="middle">+</text>`;


// O Box do Resultado (Direita)
svg1 += `<rect x="550" y="120" width="550" height="380" rx="20" fill="#111B24" stroke="#00e676" stroke-width="3"/>`;
svg1 += `<text x="825" y="160" fill="#00e676" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">O VEsférico (Foco e BCVA Resultante)</text>`;

// A Super Seta Verde Giga
svg1 += `<line x1="600" y1="320" x2="1050" y2="320" stroke="#00e676" stroke-width="20" marker-end="url(#arrowG)" filter="url(#glowGreen)"/>`;


// Conclusão Matemática Correta
svg1 += `<rect x="50" y="520" width="1050" height="60" rx="10" fill="#0e171f"/>`;
svg1 += `<text x="575" y="555" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">VEsférico = VR + VT + Vτ + VComa</text>`;


svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.1_Soma_Vetorial.svg'), svg1);

console.log('SVG da Equacao Mestra atualizado! Legenda do Time de Futebol removida, focando 100% na equacao fisica.');
