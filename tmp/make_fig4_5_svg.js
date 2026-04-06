const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-004_VR_Vetor_Radial');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_4.5_Mapa_Tensao_TopDown.svg');

const w = 1000;
const h = 1000;

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;

// Fundo muito escuro
svg += `<rect width="${w}" height="${h}" fill="#050a10"/>`;

svg += `
<defs>
    <radialGradient id="corneaGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0a192f"/>
        <stop offset="100%" stop-color="#020508"/>
    </radialGradient>
    <filter id="glowForce" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <filter id="hyperGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

const cx = 500;
const cy = 500;
const rCornea = 400;

// Cornea base
svg += `<circle cx="${cx}" cy="${cy}" r="${rCornea}" fill="url(#corneaGrad)"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="${rCornea}" fill="none" stroke="#37474f" stroke-width="3"/>`;

// Grid estromal (teia) repuxada pelo anel
const ptCount = 36;
for(let i=0; i<360; i += 360/ptCount){
    const rad = i * Math.PI / 180;
    // se estiver na zona do implante (esquerda e direita), a linha eh mais esticada (reta)
    // senao, ela eh levemente encurvada
    const xEnd = cx + Math.cos(rad) * rCornea;
    const yEnd = cy + Math.sin(rad) * rCornea;
    svg += `<line x1="${cx}" y1="${cy}" x2="${xEnd}" y2="${yEnd}" stroke="#1e3a5f" stroke-width="1" opacity="0.4"/>`;
}

// Circulos topograficos (Grid background)
for(let i=1; i<=8; i++){
    svg += `<circle cx="${cx}" cy="${cy}" r="${i*45}" fill="none" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>`;
}

// O Implante: 2 arcos de 150 graus, diametro 5.0mm (raio representativo: 200px)
const rRing = 200;

// Arco Esquerdo (105 a 255 graus)
// Desenhando path de arco:
const dLeft = `M ${cx + rRing*Math.cos(255*Math.PI/180)} ${cy + rRing*Math.sin(255*Math.PI/180)} 
               A ${rRing} ${rRing} 0 0 0 ${cx + rRing*Math.cos(105*Math.PI/180)} ${cy + rRing*Math.sin(105*Math.PI/180)}`;
svg += `<path d="${dLeft}" fill="none" stroke="#cfd8dc" stroke-width="25" stroke-linecap="round"/>`;

// Arco Direito (285 a 75 graus, passando pelo leste)
// 285 a 360 e 0 a 75 = total 150
const dRight = `M ${cx + rRing*Math.cos(75*Math.PI/180)} ${cy + rRing*Math.sin(75*Math.PI/180)} 
                A ${rRing} ${rRing} 0 0 0 ${cx + rRing*Math.cos(285*Math.PI/180)} ${cy + rRing*Math.sin(285*Math.PI/180)}`;
svg += `<path d="${dRight}" fill="none" stroke="#cfd8dc" stroke-width="25" stroke-linecap="round"/>`;

// Vetores Radiais (VR) (Setas vermelhas saindo dos anéis centrifugamente)
const renderVR = (angle) => {
    const rStart = rRing + 15;
    const rEnd = rStart + 60;
    const rad = angle * Math.PI / 180;
    const x1 = cx + Math.cos(rad) * rStart;
    const y1 = cy + Math.sin(rad) * rStart;
    const x2 = cx + Math.cos(rad) * rEnd;
    const y2 = cy + Math.sin(rad) * rEnd;
    
    // Head of arrow
    const radH1 = (angle + 160) * Math.PI / 180;
    const radH2 = (angle - 160) * Math.PI / 180;
    const xH1 = x2 + Math.cos(radH1) * 15;
    const yH1 = y2 + Math.sin(radH1) * 15;
    const xH2 = x2 + Math.cos(radH2) * 15;
    const yH2 = y2 + Math.sin(radH2) * 15;

    let a = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ff1744" stroke-width="6" filter="url(#glowForce)"/>`;
    a += `<polygon points="${x2},${y2} ${xH1},${yH1} ${xH2},${yH2}" fill="#ff1744" filter="url(#glowForce)"/>`;
    return a;
};

// Várias setas VR ao longo da borda externa dos arcos para evidenciar que puxam para for:
[120, 150, 180, 210, 240, 300, 330, 0, 30, 60].forEach(deg => {
    svg += renderVR(deg);
});


// Zona Central Aplainada e Retina Estromal de Tensão
// "Âncoras periféricas garantindo uma zona óptica rígida"
// Desenho de uma teia tensa amarela ligando o centro aos aneis
for(let i=0; i<60; i++){
    const rad = i*6 * Math.PI/180;
    const endX = cx + Math.cos(rad) * (rRing-20);
    const endY = cy + Math.sin(rad) * (rRing-20);
    svg += `<line x1="${cx}" y1="${cy}" x2="${endX}" y2="${endY}" stroke="#ffb74d" stroke-width="${(i%5===0)? 3 : 1}" opacity="0.6" filter="url(#glowGold)"/>`;
}
// Circulos de tensão na zona óptica
svg += `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#ffb74d" stroke-width="2" stroke-dasharray="8,4" filter="url(#glowGold)"/>`;
svg += `<circle cx="${cx}" cy="${cy}" r="75" fill="none" stroke="#ffb74d" stroke-width="2" stroke-dasharray="8,4" opacity="0.8"/>`;

// Label Centro
svg += `<circle cx="${cx}" cy="${cy}" r="10" fill="#00e5ff" filter="url(#hyperGlow)"/>`;
svg += `<text x="${cx}" y="${cy-165}" fill="#ffb74d" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" filter="url(#glowGold)">Zona Óptica Uniformemente Tencionada e Plana</text>`;

// Titulos
svg += `<text x="500" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 4.5: Mapa Top-Down de Tensão (Vetores VR Múltiplos)</text>`;
svg += `<text x="500" y="80" fill="#B0BEC5" font-family="Arial" font-size="18" text-anchor="middle">Os segmentos de PMMA atuam como âncoras focais na periferia; o VR puxa as fibras centrífugamente em +360 graus, achatando o centro.</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V4.5 Tension Map saved successfully to:', outPath);
