const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-001_Anatomia');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'ectasia_progression_v2_1772192394453.svg');

const w = 1200;
const h = 400;

// Colors matching standard
const BG = "#0D1117";
const COL_EPI = "#FFCDD2";
const COL_ANT = "#F5E6C8";
const COL_POST = "#EDD9A3";
const COL_TEXT = "#FFFFFF";

function drawPanel(ox, oy, state) {
    let svg = '';
    // Base dome coordinates for a normal cornea
    const w_cornea = 250;
    const center_x = ox + w_cornea/2;
    
    // Y values of layers at center vs edge
    // Base normal state
    let y_epi_top_c = 100, y_epi_top_e = 150;
    let y_bow_bot_c = 110, y_bow_bot_e = 160;
    let y_ant_bot_c = 140, y_ant_bot_e = 190;
    let y_post_bot_c = 250, y_post_bot_e = 270;
    
    if (state === 2) {
        // Estágio 2: Posterior bulging INTO anterior
        y_post_bot_c = 210; // Bulges UP
        y_ant_bot_c = 130;  // Pushed up slightly
    } else if (state === 3) {
        // Estágio 3: Anterior thinning
        y_post_bot_c = 190;
        y_ant_bot_c = 120;
        y_bow_bot_c = 105; // Bowman starts to give way
        y_epi_top_c = 95;  // Slight protrusion
    } else if (state === 4) {
        // Estágio 4: Epitélio mascara (Epithelial remodeling)
        y_post_bot_c = 180;
        y_ant_bot_c = 110;
        y_bow_bot_c = 100;
        y_epi_top_c = 100; // Epithelium thins centrally to mask the bulge!
    }

    // Generator for curved paths
    const mPath = (y_c, y_e) => {
        return `M ${ox} ${oy + y_e} Q ${center_x} ${oy + y_c*0.8} ${ox+w_cornea} ${oy + y_e}`;
    };

    const epi_top = mPath(y_epi_top_c, y_epi_top_e);
    const bow_bot = mPath(y_bow_bot_c, y_bow_bot_e);
    const ant_bot = mPath(y_ant_bot_c, y_ant_bot_e);
    const post_bot = mPath(y_post_bot_c, y_post_bot_e);
    
    const layerEpi = `<path d="${epi_top} L ${ox+w_cornea} ${oy+y_bow_bot_e} Q ${center_x} ${oy+y_bow_bot_c*0.8} ${ox} ${oy+y_bow_bot_e} Z" fill="${COL_EPI}" stroke="none"/>`;
    const layerAnt = `<path d="${bow_bot} L ${ox+w_cornea} ${oy+y_ant_bot_e} Q ${center_x} ${oy+y_ant_bot_c*0.8} ${ox} ${oy+y_ant_bot_e} Z" fill="${COL_ANT}" stroke="none"/>`;
    const layerPost = `<path d="${ant_bot} L ${ox+w_cornea} ${oy+y_post_bot_e} Q ${center_x} ${oy+y_post_bot_c*0.8} ${ox} ${oy+y_post_bot_e} Z" fill="${COL_POST}" stroke="none"/>`;
    
    // Outlines
    const outlines = `
        <path d="${epi_top}" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        <path d="${post_bot}" fill="none" stroke="#FFF" stroke-width="2" stroke-dasharray="4,4"/>
    `;
    
    // Labels
    const titles = ["1. Malha Intacta", "2. Deslizamento Posterior", "3. Redistribuição Anterior", "4. Mascaramento Epitelial"];
    const title = `<text x="${center_x}" y="${oy + 320}" fill="${COL_TEXT}" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">${titles[state-1]}</text>`;
    
    // Vector Arrow for Force
    let arrow = '';
    if (state > 1) {
        arrow = `<g stroke="#CC2200" fill="#CC2200">
                    <line x1="${center_x}" y1="${oy + y_post_bot_c + 50}" x2="${center_x}" y2="${oy + y_post_bot_c + 15}" stroke-width="3"/>
                    <polygon points="${center_x-5},${oy + y_post_bot_c+15} ${center_x+5},${oy + y_post_bot_c+15} ${center_x},${oy + y_post_bot_c+5}"/>
                 </g>`;
    }

    return svg + layerEpi + layerAnt + layerPost + outlines + arrow + title;
}

let svgContent = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svgContent += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Add 4 panels
svgContent += drawPanel(50, 20, 1);
svgContent += drawPanel(330, 20, 2);
svgContent += drawPanel(610, 20, 3);
svgContent += drawPanel(890, 20, 4);

svgContent += `<text x="${w/2}" y="30" fill="${COL_TEXT}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">A Ectasia como Falência em Camadas: O Abaulamento Posterior</text>`;
svgContent += `</svg>`;

fs.writeFileSync(outPath, svgContent);
console.log('SVG V2 saved successfully to:', outPath);
