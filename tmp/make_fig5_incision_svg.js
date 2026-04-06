const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-005_VT_Vetor_Tangencial');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_5_Incision_Axis_ENM.svg');

const w = 1200;
const h = 750;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="#0A0E17"/>`;

svg += `
<defs>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Títulos
svg += `<text x="600" y="60" fill="#ffffff" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle">A Incisão como Eixo de Referência (ENM - Eixo de Não-Magnitude)</text>`;
svg += `<text x="600" y="95" fill="#B0BEC5" font-family="Arial" font-size="20" text-anchor="middle">Posicionando a entrada do túnel no meridiano plano para proteger a refração de torções residuais.</text>`;

const cx = 600;
const cy = 420;

// Panel Backgrounds (Didactic overlay)
svg += `<rect x="50" y="150" width="1100" height="550" rx="20" fill="#111B24"/>`;

// Coordenadas
svg += `<circle cx="${cx}" cy="${cy}" r="250" fill="none" stroke="#263238" stroke-width="4"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#263238" stroke-width="2" stroke-dasharray="5,5"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="#263238" stroke-width="1" stroke-dasharray="2,2"/>`;

// Eixos
const steepStroke = "#ff1744"; // Curvo (Apertado) = Vermelho/Quente
const flatStroke = "#00e5ff"; // Plano = Azul/Frio

// Eixo Curvo (Meridiano mais curvo - K2)
// Vamos desenhar ele na horizontal (0-180 graus) para dar um exemplo, ou melhor, diagonal para ficar realista.
// Eixo Curvo = 120 graus (Astigmatismo oblíquo)
const ag1 = 120 * Math.PI / 180;
svg += `<line x1="${cx - Math.cos(ag1)*300}" y1="${cy - Math.sin(ag1)*300}" x2="${cx + Math.cos(ag1)*300}" y2="${cy + Math.sin(ag1)*300}" stroke="${steepStroke}" stroke-width="4" stroke-dasharray="10,5"/>`;
svg += `<text x="${cx - Math.cos(ag1)*320}" y="${cy - Math.sin(ag1)*320}" fill="${steepStroke}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Eixo Curvo (K-max): 120°</text>`;

// Eixo Plano = 30 graus (Ortogonal)
const ag2 = 30 * Math.PI / 180;
svg += `<line x1="${cx - Math.cos(ag2)*300}" y1="${cy - Math.sin(ag2)*300}" x2="${cx + Math.cos(ag2)*300}" y2="${cy + Math.sin(ag2)*300}" stroke="${flatStroke}" stroke-width="4" stroke-dasharray="10,5"/>`;
svg += `<text x="${cx + Math.cos(ag2)*150}" y="${cy + Math.sin(ag2)*150 - 20}" fill="${flatStroke}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Eixo Plano: 30°</text>`;

// A INCISÃO (No Eixo Plano a 30 graus, digamos na periferia r=200)
// The incision is made ON the flat axis point (ENM)
const incX = cx + Math.cos(ag2)*200;
const incY = cy + Math.sin(ag2)*200;
svg += `<circle cx="${incX}" cy="${incY}" r="12" fill="#00e5ff" filter="url(#glowGreen)"/>`;
svg += `<line x1="${incX}" y1="${incY}" x2="${incX+120}" y2="${incY+40}" stroke="#00e5ff" stroke-width="2"/>`;
svg += `<rect x="${incX+120}" y="${incY+25}" width="250" height="30" rx="5" fill="#1e2d3d"/>`;
svg += `<text x="${incX+245}" y="${incY+45}" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">INCISÃO (ENM / Ponto Neutro)</text>`;

// O Implante Partindo da Incisao e abraçando o cone
// Um anel de 160 graus que começa onde está a incisão. No Eixo Plano (30 graus) e vai até 190 graus. 
// O centro do implante recai sobre o eixo curvo (110 graus).
// Note que de 30 ate 190, o meio exato é (30+190)/2 = 110. (Bem perto de 120)
// Vamos desenhar o anel PMMA!
const rRing = 200;
const startRad = 30 * Math.PI / 180;
const endRad = 210 * Math.PI / 180; // 180 graus de anel
const p1x = cx + Math.cos(startRad)*rRing;
const p1y = cy + Math.sin(startRad)*rRing;
const p2x = cx + Math.cos(endRad)*rRing;
const p2y = cy + Math.sin(endRad)*rRing;

// SVG Arc command
const ringPath = `M ${p1x} ${p1y} A ${rRing} ${rRing} 0 0 1 ${p2x} ${p2y}`;
svg += `<path d="${ringPath}" fill="none" stroke="#cfd8dc" stroke-width="20" stroke-linecap="round"/>`;

// Explicação Didática
svg += `<rect x="100" y="180" width="380" height="150" rx="10" fill="#0A0E17" opacity="0.8"/>`;
svg += `<text x="120" y="210" fill="#ffffff" font-family="Arial" font-size="18" font-weight="bold">1. A Regra do Eixo Plano</text>`;
svg += `<text x="120" y="240" fill="#B0BEC5" font-family="Arial" font-size="16">A incisão SEMPRE é posicionada no</text>`;
svg += `<text x="120" y="260" fill="#B0BEC5" font-family="Arial" font-size="16">meridiano mais plano (ENM).</text>`;
svg += `<text x="120" y="290" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold">→ Ele é o ponto zero do astigmatismo.</text>`;
svg += `<text x="120" y="310" fill="#00e5ff" font-family="Arial" font-size="16" font-weight="bold">→ Entrada não causa aberrações indesejadas.</text>`;

svg += `<rect x="720" y="520" width="380" height="150" rx="10" fill="#0A0E17" opacity="0.8"/>`;
svg += `<text x="740" y="550" fill="#ffffff" font-family="Arial" font-size="18" font-weight="bold">2. Envolvimento do Cone</text>`;
svg += `<text x="740" y="580" fill="#B0BEC5" font-family="Arial" font-size="16">Ao entrar pelo meridiano plano,</text>`;
svg += `<text x="740" y="600" fill="#B0BEC5" font-family="Arial" font-size="16">o corpo volumoso do anel viaja até repousar</text>`;
svg += `<text x="740" y="630" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold">→ EXATAMENTE SOBRE O EIXO CURVO.</text>`;
svg += `<text x="740" y="650" fill="#ff1744" font-family="Arial" font-size="16" font-weight="bold">→ Máxima força aplainadora no alvo certo.</text>`;


svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V5 Incision Axis saved successfully to:', outPath);
