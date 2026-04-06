const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-010_ICE');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// ==========================================
// FIGURA 10.1: Analogia Faróis (Coerência Axial)
// ==========================================
let svg1 = `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">`;
svg1 += `<rect width="1200" height="600" fill="#0A0E17"/>`;

svg1 += `<defs>
    <filter id="glowB" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowR" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
</defs>`;

svg1 += `<text x="600" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 10.1: O Índice de Coerência (Analogia de Faróis)</text>`;
svg1 += `<text x="600" y="80" fill="#B0BEC5" font-family="Arial" font-size="16" text-anchor="middle">Como o córtex lida com Eixos Concorrentes no pós-operatório cirúrgico?</text>`;

// ESQUERDA: Córnea Coerente (ICE < 15)
svg1 += `<rect x="50" y="120" width="500" height="420" rx="15" fill="#111B24" stroke="#00e5ff" stroke-width="2"/>`;
svg1 += `<text x="300" y="160" fill="#00e5ff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">ICE Alto: Eixos Coerentes</text>`;
svg1 += `<text x="300" y="190" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Topo, Coma e Astigmatismo apontam juntos</text>`;

// Farois apontando na mesma direcao (Feixe unico brilhante)
svg1 += `<polygon points="200,300 450,220 450,380 200,300" fill="#00e5ff" opacity="0.3"/>`;
svg1 += `<path d="M 120 270 Q 180 300 120 330" fill="none" stroke="#cfd8dc" stroke-width="4"/>`; // Lente 1
svg1 += `<path d="M 140 250 Q 200 300 140 350" fill="none" stroke="#cfd8dc" stroke-width="4"/>`; // Lente 2
svg1 += `<path d="M 160 230 Q 220 300 160 370" fill="none" stroke="#cfd8dc" stroke-width="4"/>`; // Lente 3

svg1 += `<circle cx="450" cy="300" r="30" fill="#00e5ff" filter="url(#glowB)"/>`;
svg1 += `<text x="300" y="450" fill="#00e5ff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Neuroadaptação Imediata</text>`;
svg1 += `<text x="300" y="480" fill="#ffffff" font-family="Arial" font-size="16" text-anchor="middle">Média: +4.2 Linhas Acuidade (Vencedor)</text>`;


// DIREITA: Córnea Discordante (ICE > 45)
svg1 += `<rect x="650" y="120" width="500" height="420" rx="15" fill="#111B24" stroke="#ff1744" stroke-width="2"/>`;
svg1 += `<text x="900" y="160" fill="#ff1744" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">ICE Baixo: Eixos Discordantes</text>`;
svg1 += `<text x="900" y="190" fill="#8b9ba3" font-family="Arial" font-size="16" text-anchor="middle">Vetores independentes apontando para direções aleatórias</text>`;

// Farois em caos
svg1 += `<polygon points="800,270 1050,200 1050,300" fill="#ffb74d" opacity="0.3"/>`;
svg1 += `<circle cx="1050" cy="250" r="20" fill="#ffb74d" filter="url(#glowR)"/>`;

svg1 += `<polygon points="800,290 1050,300 1050,420" fill="#ff1744" opacity="0.3"/>`;
svg1 += `<circle cx="1050" cy="360" r="20" fill="#ff1744" filter="url(#glowR)"/>`;

svg1 += `<polygon points="780,280 880,180 950,220" fill="#b388ff" opacity="0.3"/>`;
svg1 += `<circle cx="920" cy="200" r="15" fill="#b388ff" filter="url(#glowR)"/>`;

svg1 += `<path d="M 720 270 Q 750 250 780 270" fill="none" stroke="#cfd8dc" stroke-width="4"/>`; 
svg1 += `<path d="M 700 290 Q 720 330 750 350" fill="none" stroke="#cfd8dc" stroke-width="4"/>`; 

svg1 += `<text x="900" y="450" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Confusão Neurobiológica</text>`;
svg1 += `<text x="900" y="480" fill="#ffffff" font-family="Arial" font-size="16" text-anchor="middle">Média: +1.6 Linhas Acuidade / 35% Explante</text>`;

svg1 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_10.1_ICE_Analogia_Farois.svg'), svg1);


// ==========================================
// FIGURA 10.2: Curva ROC (ICE vs Kmax)
// ==========================================
let svg2 = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">`;
svg2 += `<rect width="800" height="600" fill="#0A0E17"/>`;

svg2 += `<text x="400" y="50" fill="#ffffff" font-family="Arial" font-size="26" font-weight="bold" text-anchor="middle">Figura 10.2: A Curva ROC da Predição Cirúrgica</text>`;

const gX = 120, gY = 500, gW = 600, gH = 400;
// Eixos
svg2 += `<line x1="${gX}" y1="${gY}" x2="${gX+gW}" y2="${gY}" stroke="#ffffff" stroke-width="2"/>`;
svg2 += `<line x1="${gX}" y1="${gY}" x2="${gX}" y2="${gY-gH}" stroke="#ffffff" stroke-width="2"/>`;

svg2 += `<text x="${gX+gW/2}" y="${gY+40}" fill="#cfd8dc" font-family="Arial" font-size="18" text-anchor="middle">Taxa de Falsos Positivos (1 - Especificidade)</text>`;
svg2 += `<text x="${gX-30}" y="${gY-gH/2}" fill="#cfd8dc" font-family="Arial" font-size="18" transform="rotate(-90 ${gX-30} ${gY-gH/2})" text-anchor="middle">Taxa de Verdadeiros Pos. (Sensibilidade)</text>`;

// Grid neutro (50%)
svg2 += `<line x1="${gX}" y1="${gY}" x2="${gX+gW}" y2="${gY-gH}" stroke="#455a64" stroke-dasharray="5,5" stroke-width="2"/>`;

// A curva do Paquimetria AUC 0.64 (Fraco)
svg2 += `<path d="M ${gX} ${gY} Q ${gX+200} ${gY-200} ${gX+gW} ${gY-gH}" fill="none" stroke="#78909c" stroke-width="4"/>`;
// A curva do KMAX AUC 0.68 (Tradicional Fraco)
svg2 += `<path d="M ${gX} ${gY} Q ${gX+180} ${gY-250} ${gX+gW} ${gY-gH}" fill="none" stroke="#03a9f4" stroke-width="5"/>`;
// A Curva Mestra ICE AUC 0.82 (Gold Standard)
svg2 += `<path d="M ${gX} ${gY} Q ${gX+100} ${gY-380} ${gX+gW} ${gY-gH}" fill="none" stroke="#ffb74d" stroke-width="8"/>`;

// Legenda
const legX = 550, legY = 250;
svg2 += `<rect x="${legX}" y="${legY}" width="200" height="120" rx="10" fill="#111B24" stroke="#263238" stroke-width="2"/>`;
// Item 1
svg2 += `<line x1="${legX+10}" y1="${legY+30}" x2="${legX+30}" y2="${legY+30}" stroke="#ffb74d" stroke-width="4"/>`;
svg2 += `<text x="${legX+40}" y="${legY+35}" fill="#ffffff" font-family="Arial" font-size="16">ICE-min (AUC: 0.82)</text>`;
// Item 2
svg2 += `<line x1="${legX+10}" y1="${legY+65}" x2="${legX+30}" y2="${legY+65}" stroke="#03a9f4" stroke-width="4"/>`;
svg2 += `<text x="${legX+40}" y="${legY+70}" fill="#ffffff" font-family="Arial" font-size="16">K-max (AUC: 0.68)</text>`;
// Item 3
svg2 += `<line x1="${legX+10}" y1="${legY+100}" x2="${legX+30}" y2="${legY+100}" stroke="#78909c" stroke-width="4"/>`;
svg2 += `<text x="${legX+40}" y="${legY+105}" fill="#ffffff" font-family="Arial" font-size="16">Paquímetria (0.64)</text>`;

svg2 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_10.2_ICE_ROC_AUC.svg'), svg2);


// ==========================================
// FIGURA 10.3: ICE x VEsférico MATRIZ 2x2
// ==========================================
let svg3 = `<svg viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="1000" height="800" fill="#0A0E17"/>`;

svg3 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 10.3: Matriz de Risco (A Equação Pós-Operatória)</text>`;
svg3 += `<text x="500" y="80" fill="#cfd8dc" font-family="Arial" font-size="18" text-anchor="middle">Resultado Cirúrgico = VEsférico (Sucesso Mecânico)  ×  ICE-min (Sucesso Sensorial)</text>`;

const mw = 400, mh = 250;
const mX = 150, mY = 150;

// Eixos Textuais
svg3 += `<text x="${mX + mw}" y="${mY - 30}" fill="#B0BEC5" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Coerência Funcional (ICE)</text>`;
svg3 += `<text x="${mX+mw/2}" y="${mY - 5}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ALTO (>0.8)</text>`;
svg3 += `<text x="${mX+mw*1.5}" y="${mY - 5}" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">BAIXO (<0.5)</text>`;

svg3 += `<text x="${mX - 60}" y="${mY + mh}" fill="#B0BEC5" font-family="Arial" font-size="22" font-weight="bold" transform="rotate(-90 ${mX-60} ${mY+mh})" text-anchor="middle">Soma Mecânica (VEsférico)</text>`;
svg3 += `<text x="${mX - 10}" y="${mY + mh/2}" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" transform="rotate(-90 ${mX-10} ${mY+mh/2})" text-anchor="middle">ÓTIMO (> 3D)</text>`;
svg3 += `<text x="${mX - 10}" y="${mY + mh*1.5}" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" transform="rotate(-90 ${mX-10} ${mY+mh*1.5})" text-anchor="middle">RUIM (< 1D)</text>`;

// Quadrante Verde (Alto/Alto)
svg3 += `<rect x="${mX}" y="${mY}" width="${mw}" height="${mh}" fill="#112A22" stroke="#00e676" stroke-width="4"/>`;
svg3 += `<text x="${mX+200}" y="${mY+100}" fill="#00e676" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">1. EXCELENTE</text>`;
svg3 += `<text x="${mX+200}" y="${mY+140}" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">A mecânica curou e a visão decodificou</text>`;
svg3 += `<text x="${mX+200}" y="${mY+170}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">+4.2 Linhas Acuidade Visual</text>`;

// Quadrante Roxo (Alto VE, Baixo ICE)
svg3 += `<rect x="${mX+mw}" y="${mY}" width="${mw}" height="${mh}" fill="#1E1528" stroke="#b388ff" stroke-width="4"/>`;
svg3 += `<text x="${mX+mw+200}" y="${mY+100}" fill="#b388ff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">2. FRUSTRANTE</text>`;
svg3 += `<text x="${mX+mw+200}" y="${mY+140}" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Anel funcionou bem, Cérebro negou imagem</text>`;
svg3 += `<text x="${mX+mw+200}" y="${mY+170}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">+1.2 Linhas Acuidade Visual</text>`;

// Quadrante Laranja (Baixo VE, Alto ICE)
svg3 += `<rect x="${mX}" y="${mY+mh}" width="${mw}" height="${mh}" fill="#281A11" stroke="#ffb74d" stroke-width="4"/>`;
svg3 += `<text x="${mX+200}" y="${mY+mh+100}" fill="#ffb74d" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">3. SUBÓTIMO</text>`;
svg3 += `<text x="${mX+200}" y="${mY+mh+140}" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Anel limitou ganho, Cérebro queria enxergar mais</text>`;
svg3 += `<text x="${mX+200}" y="${mY+mh+170}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">+2.5 Linhas Acuidade Visual</text>`;

// Quadrante Vermelho (Baixo VE, Baixo ICE)
svg3 += `<rect x="${mX+mw}" y="${mY+mh}" width="${mw}" height="${mh}" fill="#2A1115" stroke="#ff1744" stroke-width="4"/>`;
svg3 += `<text x="${mX+mw+200}" y="${mY+mh+100}" fill="#ff1744" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">4. FRACASSO CLÍNICO</text>`;
svg3 += `<text x="${mX+mw+200}" y="${mY+mh+140}" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Erro de Posicionamento + Incoerente</text>`;
svg3 += `<text x="${mX+mw+200}" y="${mY+mh+170}" fill="#ffffff" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">+0.5 Linhas / 78% Explante</text>`;

svg3 += `</svg>`;
fs.writeFileSync(path.join(outDir, 'Figura_10.3_VEsferico_ICE_2x2.svg'), svg3);

console.log('Todos SVGs do CH-010 (ICE) gerados!');
