const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-010_ICE');

// ==========================================
// FIGURA 10.3: ICE x VEsférico MATRIZ 2x2 FIC FIX
// ==========================================
let svg3 = `<svg viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">`;
svg3 += `<rect width="1000" height="800" fill="#0A0E17"/>`;

svg3 += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 10.3: Matriz de Risco (A Equação Pós-Operatória)</text>`;
svg3 += `<text x="500" y="80" fill="#cfd8dc" font-family="Arial" font-size="18" text-anchor="middle">Resultado Cirúrgico = VEsférico (Sucesso Mecânico)  ×  ICE-min (Sucesso Sensorial)</text>`;

const mw = 400, mh = 250;
const mX = 150, mY = 150;

// Eixos Textuais (Corrigindo escapes XML)
svg3 += `<text x="${mX + mw}" y="${mY - 30}" fill="#B0BEC5" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">Coerência Funcional (ICE)</text>`;
svg3 += `<text x="${mX+mw/2}" y="${mY - 5}" fill="#00e5ff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">ALTO (&gt;0.8)</text>`;
svg3 += `<text x="${mX+mw*1.5}" y="${mY - 5}" fill="#ff1744" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">BAIXO (&lt;0.5)</text>`;

svg3 += `<text x="${mX - 60}" y="${mY + mh}" fill="#B0BEC5" font-family="Arial" font-size="22" font-weight="bold" transform="rotate(-90 ${mX-60} ${mY+mh})" text-anchor="middle">Soma Mecânica (VEsférico)</text>`;
svg3 += `<text x="${mX - 10}" y="${mY + mh/2}" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" transform="rotate(-90 ${mX-10} ${mY+mh/2})" text-anchor="middle">ÓTIMO (&gt; 3D)</text>`;
svg3 += `<text x="${mX - 10}" y="${mY + mh*1.5}" fill="#ffb74d" font-family="Arial" font-size="18" font-weight="bold" transform="rotate(-90 ${mX-10} ${mY+mh*1.5})" text-anchor="middle">RUIM (&lt; 1D)</text>`;

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

console.log('Figura 10.3 consertada (Escapes XML corrigidos)!');
