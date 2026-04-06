const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-008_VEsferico');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 8.1: A Soma Vetorial Visual (Time de Futebol)
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

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 8.1 / 9.1: A Equação Mestra (Soma Vetorial)</text>`;

// O Box da Soma (Esquerda)
svg1 += `<rect x="50" y="100" width="400" height="400" rx="20" fill="#111B24" stroke="#263238" stroke-width="2"/>`;
svg1 += `<text x="250" y="140" fill="#cfd8dc" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Os Vetores Componentes (Ferramentas)</text>`;

svg1 += `<line x1="100" y1="200" x2="250" y2="200" stroke="#0288d1" stroke-width="8" marker-end="url(#arrowB)"/>`;
svg1 += `<text x="280" y="205" fill="#0288d1" font-family="Arial" font-size="18" font-weight="bold">VR (Aplainamento)</text>`;

svg1 += `<line x1="100" y1="270" x2="210" y2="270" stroke="#ff1744" stroke-width="8" marker-end="url(#arrowR)"/>`;
svg1 += `<text x="280" y="275" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold">VT (Redistribuição)</text>`;

svg1 += `<line x1="100" y1="340" x2="280" y2="340" stroke="#ffb74d" stroke-width="8" marker-end="url(#arrowO)"/>`;
svg1 += `<text x="310" y="345" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold">Vτ (Torque/Cunha)</text>`;

svg1 += `<line x1="100" y1="410" x2="180" y2="410" stroke="#b388ff" stroke-width="8" marker-end="url(#arrowP)"/>`;
svg1 += `<text x="280" y="415" fill="#b388ff" font-family="Arial" font-size="18" font-weight="bold">VComa (Óptico)</text>`;


// Sinal de SOMA
svg1 += `<text x="500" y="320" fill="#ffffff" font-family="Arial" font-size="60" font-weight="bold" text-anchor="middle">+</text>`;

// O Box do Resultado (Direita)
svg1 += `<rect x="550" y="100" width="550" height="400" rx="20" fill="#111B24" stroke="#00e676" stroke-width="3"/>`;
svg1 += `<text x="825" y="150" fill="#00e676" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">O VEsférico (Foco e BCVA Resultante)</text>`;

// A Super Seta Verde Giga
svg1 += `<line x1="600" y1="300" x2="1050" y2="300" stroke="#00e676" stroke-width="20" marker-end="url(#arrowG)" filter="url(#glowGreen)"/>`;

// Analogia
svg1 += `<rect x="50" y="520" width="1050" height="50" rx="10" fill="#0e171f"/>`;
svg1 += `<text x="575" y="550" fill="#ffffff" font-family="Arial" font-size="18" text-anchor="middle">Assim como 11 jogadores formam 1 Time, todas as microforças formam 1 única Esfera Resultante final que a retina "enxerga".</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.1_Soma_Vetorial.svg'), svg1);


// ==========================================
// FIGURA 8.2: Os 3 Cenários (Alinhado vs Cancelado vs Oposição)
// ==========================================
let svg2 = `<svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="1200" height="700" fill="#0A0E17"/>`;

svg2 += `<defs>
    <filter id="glowOK" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="aV1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0288d1" />
    </marker>
    <marker id="aV2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffb74d" />
    </marker>
    <marker id="aR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e676" />
    </marker>
</defs>`;

svg2 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 8.2: O Cancelamento de Forças no Planejamento Cirúrgico</text>`;

// CENARIO 1 (Alinhado)
svg2 += `<rect x="50" y="100" width="340" height="400" rx="15" fill="#111B24"/>`;
svg2 += `<text x="220" y="140" fill="#00e676" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Cenário 1: Sinergia</text>`;
svg2 += `<text x="220" y="170" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Planejamento e Eixos Corretos</text>`;

svg2 += `<line x1="80" y1="250" x2="250" y2="250" stroke="#0288d1" stroke-width="8" marker-end="url(#aV1)" />`; // Setinha AZUL 
svg2 += `<text x="165" y="240" fill="#0288d1" font-family="Arial" font-size="16" font-weight="bold">VR (100)</text>`;
svg2 += `<line x1="250" y1="250" x2="350" y2="250" stroke="#ffb74d" stroke-width="8" marker-end="url(#aV2)" />`; // Setinha LANRANJA seguindo o AZUL
svg2 += `<text x="300" y="240" fill="#ffb74d" font-family="Arial" font-size="16" font-weight="bold">Vτ (50)</text>`;

svg2 += `<line x1="80" y1="350" x2="350" y2="350" stroke="#00e676" stroke-width="12" marker-end="url(#aR)" filter="url(#glowOK)"/>`;
svg2 += `<text x="215" y="325" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold">VEsférico = 150 (MÁXIMO)</text>`;


// CENARIO 2 (Subótimo)
svg2 += `<rect x="430" y="100" width="340" height="400" rx="15" fill="#111B24"/>`;
svg2 += `<text x="600" y="140" fill="#ffb74d" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Cenário 2: Subótimo</text>`;
svg2 += `<text x="600" y="170" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Posicionamento Desalinhado</text>`;

// O AZUL pra um lado e LAranja com angulo
svg2 += `<line x1="480" y1="280" x2="650" y2="280" stroke="#0288d1" stroke-width="8" marker-end="url(#aV1)" />`;
svg2 += `<text x="565" y="270" fill="#0288d1" font-family="Arial" font-size="16" font-weight="bold">VR (100)</text>`;
// Laranja num angulo
svg2 += `<line x1="650" y1="280" x2="650" y2="200" stroke="#ffb74d" stroke-width="8" marker-end="url(#aV2)" />`;
svg2 += `<text x="680" y="240" fill="#ffb74d" font-family="Arial" font-size="16" font-weight="bold">Vτ (50)</text>`;

// Resultado cortado
svg2 += `<line x1="480" y1="380" x2="650" y2="380" stroke="#00e676" stroke-width="12" marker-end="url(#aR)" />`;
svg2 += `<text x="565" y="360" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold">VEsférico = 111</text>`;
svg2 += `<text x="600" y="420" fill="#8b9ba3" font-family="Arial" font-size="14" text-anchor="middle">Cria astigmatismo irregular (coma)</text>`;


// CENARIO 3 (Pesadelo/Oposição)
svg2 += `<rect x="810" y="100" width="340" height="400" rx="15" fill="#111B24"/>`;
svg2 += `<text x="980" y="140" fill="#ff1744" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">Cenário 3: Oposição</text>`;
svg2 += `<text x="980" y="170" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Anel Invertido / Erro Eixo Crasso</text>`;

svg2 += `<line x1="900" y1="260" x2="1070" y2="260" stroke="#0288d1" stroke-width="8" marker-end="url(#aV1)" />`;
svg2 += `<text x="985" y="250" fill="#0288d1" font-family="Arial" font-size="16" font-weight="bold">VR (100)</text>`;
// Laranja apontando para TRAS (180 graus de oposição)
svg2 += `<line x1="1070" y1="280" x2="970" y2="280" stroke="#ff1744" stroke-width="8" marker-end="url(#aV2)" />`; 
svg2 += `<text x="1000" y="300" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold">Vτ Reverte (-50)</text>`;

svg2 += `<line x1="900" y1="380" x2="970" y2="380" stroke="#ff1744" stroke-width="12" marker-end="url(#aR)" />`;
svg2 += `<text x="935" y="360" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold">VEsférico = 50</text>`;
svg2 += `<text x="980" y="420" fill="#8b9ba3" font-family="Arial" font-size="14" text-anchor="middle">Efeito mínimo, altíssima aberração!</text>`;

// Resumão
svg2 += `<rect x="50" y="550" width="1100" height="80" rx="10" fill="#0e171f"/>`;
svg2 += `<text x="600" y="585" fill="#ffffff" font-family="Arial" font-size="18" text-anchor="middle">O Sucesso Clínico de um anel NÃO está apenas em colocar o segmento mais grosso possível,</text>`;
svg2 += `<text x="600" y="615" fill="#ffffff" font-family="Arial" font-size="18" text-anchor="middle">mas sim em garantir que a direção vetorial do plano cirúrgico faça Forças Coerentes trabalharem juntas.</text>`;

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_8.2_Tres_Cenarios.svg'), svg2);

console.log('Todos SVGs do CH-008/009 (VEsferico) gerados!');
