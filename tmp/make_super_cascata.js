const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1200;
const h = 750;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

// Título
svg += `<text x="${w/2}" y="50" fill="#ffffff" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle">Figura 1.10: A Cascata Patogênica do Ceratocone (4 Estágios)</text>`;
svg += `<text x="${w/2}" y="80" fill="#b0bec5" font-family="Arial" font-size="18" text-anchor="middle">Metáfora da Ponte Pênsil: Da integridade estrutural à falência mecânica e deformação.</text>`;

const startX = 50;
const boxW = 520;
const gapX = 40;
const boxH = 260;
const gapY = 40;
const startY = 120;

const stages = [
    {
        num: "1", title: "Córnea Normal (Malha Intacta)",
        color: "#00e676",
        x: startX, y: startY,
        desc: ["Fibras radiais firmemente esticadas como cabos.", "Proteoglicanos agem como 'cimento e amarras'.", "A pressão ocular é contida perfeitamente."]
    },
    {
        num: "2", title: "Ataque Enzimático (Agressão)",
        color: "#ffca28",
        x: startX + boxW + gapX, y: startY,
        desc: ["Enzimas MMP-9 dilaceram os proteoglicanos.", "As 'amarras' interlamelares são dissolvidas.", "O atrito diminui, a estrutura fica vulnerável."]
    },
    {
        num: "3", title: "Deslizamento (Perda de Tração)",
        color: "#ff7043",
        x: startX, y: startY + boxH + gapY,
        desc: ["As lamelas começam a escorregar umas sobre as outras.", "Fibras radiais perdem a tensão (ficam frouxas).", "O 'tecido' afinou mecanicamente sem perder massa."]
    },
    {
        num: "4", title: "Ectasia (Formação do Cone)",
        color: "#ff1744",
        x: startX + boxW + gapX, y: startY + boxH + gapY,
        desc: ["O tecido frouxo não resiste mais à PIO.", "A pressão intraocular empurra a zona fraca para fora.", "Forma-se a protrusão em formato de cone."]
    }
];

stages.forEach((st, idx) => {
    // Background do painel principal
    svg += `<rect x="${st.x}" y="${st.y}" width="${boxW}" height="${boxH}" rx="12" fill="#111B24" stroke="${st.color}" stroke-width="2"/>`;
    
    // Título do quadro
    svg += `<rect x="${st.x}" y="${st.y}" width="${boxW}" height="45" rx="12" fill="${st.color}" opacity="0.2"/>`;
    svg += `<text x="${st.x + 20}" y="${st.y + 30}" fill="${st.color}" font-family="Arial" font-size="24" font-weight="bold">Estágio ${st.num}: ${st.title}</text>`;
    
    // Área gráfica e textual
    // Esquerda: Desenho | Direita: Texto
    const drawX = st.x + 20;
    const drawY = st.y + 70;
    const textX = st.x + 200;
    const textY = st.y + 110;
    
    // Lista de descrição
    st.desc.forEach((d, i) => {
        svg += `<circle cx="${textX}" cy="${textY + i*40 - 5}" r="5" fill="${st.color}"/>`;
        svg += `<text x="${textX + 15}" y="${textY + i*40}" fill="#cfd8dc" font-family="Arial" font-size="16">${d}</text>`;
    });

    // Gráficos Individuais
    if(idx === 0) {
        // Normal - Linhas retas e firmes
        for(let l=0; l<4; l++) {
            svg += `<line x1="${drawX}" y1="${drawY + 40 + l*30}" x2="${drawX + 160}" y2="${drawY + 40 + l*30}" stroke="#b0bec5" stroke-width="6"/>`;
            if(l < 3) {
                // Amarras
                svg += `<line x1="${drawX + 40}" y1="${drawY + 40 + l*30}" x2="${drawX + 80}" y2="${drawY + 70 + l*30}" stroke="${st.color}" stroke-width="3"/>`;
                svg += `<line x1="${drawX + 120}" y1="${drawY + 40 + l*30}" x2="${drawX + 80}" y2="${drawY + 70 + l*30}" stroke="${st.color}" stroke-width="3"/>`;
            }
        }
        svg += `<text x="${drawX+80}" y="${drawY+170}" fill="#ffffff" font-family="Arial" font-size="14" text-anchor="middle">Lamelas Ancoradas</text>`;
    }
    else if(idx === 1) {
        // Ataque MMP-9
        for(let l=0; l<4; l++) {
            svg += `<line x1="${drawX}" y1="${drawY + 40 + l*30}" x2="${drawX + 160}" y2="${drawY + 40 + l*30}" stroke="#b0bec5" stroke-width="6"/>`;
            if(l < 3) {
                // Amarras quebrando (circulos)
                svg += `<line x1="${drawX + 40}" y1="${drawY + 40 + l*30}" x2="${drawX + 60}" y2="${drawY + 55 + l*30}" stroke="#ffca28" stroke-width="3"/>`;
                svg += `<circle cx="${drawX + 70}" cy="${drawY + 60 + l*30}" r="4" fill="#ff1744"/>`; // ruptura
            }
        }
        svg += `<text x="${drawX+80}" y="${drawY+170}" fill="#ffca28" font-family="Arial" font-size="14" text-anchor="middle">Ruptura Proteoglicanos</text>`;
    }
    else if(idx === 2) {
        // Deslizamento e frouxidao
        svg += `<path d="M ${drawX} ${drawY+40} Q ${drawX+80} ${drawY+60} ${drawX+160} ${drawY+40}" fill="none" stroke="#ff7043" stroke-width="6"/>`;
        svg += `<path d="M ${drawX+20} ${drawY+70} Q ${drawX+100} ${drawY+80} ${drawX+180} ${drawY+70}" fill="none" stroke="#ff7043" stroke-width="6"/>`;
        svg += `<path d="M ${drawX} ${drawY+100} Q ${drawX+80} ${drawY+120} ${drawX+160} ${drawY+100}" fill="none" stroke="#ff7043" stroke-width="6"/>`;
        svg += `<path d="M ${drawX+30} ${drawY+130} Q ${drawX+110} ${drawY+150} ${drawX+190} ${drawY+130}" fill="none" stroke="#ff7043" stroke-width="6"/>`;
        
        svg += `<text x="${drawX+80}" y="${drawY+170}" fill="#ff7043" font-family="Arial" font-size="14" text-anchor="middle">Lamelas soltas e onduladas</text>`;
    }
    else if(idx === 3) {
        // Ectasia Formada
        svg += `<path d="M ${drawX} ${drawY+40} Q ${drawX+80} ${drawY-20} ${drawX+160} ${drawY+40}" fill="none" stroke="#ff1744" stroke-width="6"/>`;
        svg += `<path d="M ${drawX} ${drawY+70} Q ${drawX+80} ${drawY+10} ${drawX+160} ${drawY+70}" fill="none" stroke="#ff1744" stroke-width="6"/>`;
        svg += `<path d="M ${drawX} ${drawY+100} Q ${drawX+80} ${drawY+40} ${drawX+160} ${drawY+100}" fill="none" stroke="#ff1744" stroke-width="6"/>`;
        
        // PIO
        for(let l=0; l<3; l++) {
            svg += `<line x1="${drawX + 50 + l*30}" y1="${drawY + 160}" x2="${drawX + 50 + l*30}" y2="${drawY + 110 - (l===1?30:0)}" stroke="#ffd600" stroke-width="4" marker-end="url(#arrowPio)"/>`;
        }
        svg += `<text x="${drawX+80}" y="${drawY+180}" fill="#ffd600" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">PIO empurrando o Cono</text>`;
    }
});

// Arrow definition for PIO
svg += `
<defs>
    <marker id="arrowPio" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffd600"/>
    </marker>
</defs>
`;

svg += `<text x="${w/2}" y="${h-30}" fill="#ffffff" font-family="Arial" font-size="14" font-style="italic" text-anchor="middle">Conclusão: O Ceratocone não é apenas um "prolapso" natural; é uma falência estrutural onde o deslizamento afina a córnea e a PIO a deforma.</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'cascata_patogenica_fibras.svg');
fs.writeFileSync(outFile, svg);
console.log('NOVA SUPER CASCATA PATOGÊNICA GERADA EM:', outFile);
