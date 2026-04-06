const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-004_VR_Vetor_Radial');
const outPath = path.join(outDir, 'Figura_4.1_Arc_Shortening_Biomecanico.svg');

const w = 1400;
const h = 750;

const BG = "#0a1118"; 

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Filters and Gradients
svg += `
<defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#78909c"/>
    </linearGradient>
    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Título
svg += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 4.1: O Efeito de Encurtamento de Arco (Arc-Shortening)</text>`;
svg += `<text x="700" y="80" fill="#B0BEC5" font-family="Arial" font-size="18" text-anchor="middle">A inserção do corpo rígido consome comprimento da malha, forçando o aplainamento lamelar centripetamente.</text>`;

const cx = 700;
const baseY = 550;

// Curva Base Ectasia (Stroma) - Very thick, loose
svg += `<path d="M 100 ${baseY+50} Q 700 0 1300 ${baseY+50}" fill="none" stroke="#263238" stroke-width="150" stroke-linecap="round"/>`;
svg += `<path d="M 100 ${baseY+50} Q 700 0 1300 ${baseY+50}" fill="none" stroke="#37474f" stroke-width="140" stroke-linecap="round"/>`;

// Dotted line before (slack)
svg += `<path d="M 100 ${baseY} Q 700 -50 1300 ${baseY}" fill="none" stroke="#ffb74d" stroke-width="4" stroke-dasharray="10,10" opacity="0.6"/>`;
svg += `<text x="700" y="100" fill="#ffb74d" font-family="Arial" font-size="16" font-style="italic" text-anchor="middle">Trajeto Antigo: Frouxo e Elevado (Ectasia)</text>`;

// O IMPLANTE
const rx1 = 400;
const rx2 = 1000;
const ptH = 150;
const ptW = 60;

svg += `<polygon points="${rx1-ptW},${baseY} ${rx1},${baseY-ptH} ${rx1+ptW},${baseY}" fill="url(#ringGrad)" stroke="#fff" stroke-width="3"/>`;
svg += `<polygon points="${rx2-ptW},${baseY} ${rx2},${baseY-ptH} ${rx2+ptW},${baseY}" fill="url(#ringGrad)" stroke="#fff" stroke-width="3"/>`;

// A Fibra Biologica Tencionada (Arc Shortening)
// Vai do canto, sobe o implante 1, afunda firme e reto no centro, sobe implante 2
const pathTenso = `M 100 ${baseY} Q ${rx1-150} ${baseY-30} ${rx1} ${baseY-ptH-10} Q 700 ${baseY-50} ${rx2} ${baseY-ptH-10} Q ${rx2+150} ${baseY-30} 1300 ${baseY}`;
svg += `<path d="${pathTenso}" fill="none" stroke="#ffb74d" stroke-width="8" filter="url(#glowGold)"/>`;

// Setas de Tração (As dobras sobre o PMMA)
// Sentido do deslizamento da fibra para suprir a tenda (Fibra desliza de fora para dentro)
svg += `<line x1="${rx1+20}" y1="${baseY-ptH}" x2="${rx1+120}" y2="${baseY-ptH+60}" stroke="#ff1744" stroke-width="6"/>`;
svg += `<polygon points="${rx1+130},${baseY-ptH+70} ${rx1+120},${baseY-ptH+40} ${rx1+100},${baseY-ptH+60}" fill="#ff1744"/>`;

svg += `<line x1="${rx2-20}" y1="${baseY-ptH}" x2="${rx2-120}" y2="${baseY-ptH+60}" stroke="#ff1744" stroke-width="6"/>`;
svg += `<polygon points="${rx2-130},${baseY-ptH+70} ${rx2-120},${baseY-ptH+40} ${rx2-100},${baseY-ptH+60}" fill="#ff1744"/>`;

// Labels
svg += `<text x="${rx1}" y="${baseY+40}" fill="#cfd8dc" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Segmento ICRS (Cunha)</text>`;
svg += `<text x="${rx2}" y="${baseY+40}" fill="#cfd8dc" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Segmento ICRS (Cunha)</text>`;

svg += `<rect x="550" y="${baseY-40}" width="300" height="40" rx="5" fill="#1e2d3d" stroke="#4dd0e1"/>`;
svg += `<text x="700" y="${baseY-15}" fill="#4dd0e1" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Aplainamento Central Ativo</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V4.1 Arc Shortening Elite V2 saved successfully.');
