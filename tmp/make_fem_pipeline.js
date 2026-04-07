const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-014_Futuro');
if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

const w = 1400;
const h = 800;
const bg = "#0a1118";

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

svg += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="34" font-weight="bold" text-anchor="middle">Figura 13.1: O Motor de Simulação (FEM Pipeline Process)</text>`;
svg += `<text x="700" y="80" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Metodologia Matemática HGO: Da Clínica ao Gêmeo Digital</text>`;

function drawArrow(x1, y1, x2, y2, color, thickness) {
    let s = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${thickness}"/>`;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLen = 15;
    const arrowAngle = Math.PI / 6;
    const x3 = x2 - arrowLen * Math.cos(angle - arrowAngle);
    const y3 = y2 - arrowLen * Math.sin(angle - arrowAngle);
    const x4 = x2 - arrowLen * Math.cos(angle + arrowAngle);
    const y4 = y2 - arrowLen * Math.sin(angle + arrowAngle);
    s += `<polygon points="${x2},${y2} ${x3},${y3} ${x4},${y4}" fill="${color}"/>`;
    return s;
}

// 1. INPUTS IN VIVO
svg += `<rect x="50" y="200" width="250" height="300" rx="20" fill="#111B24" stroke="#ff1744" stroke-width="3"/>`;
svg += `<text x="175" y="240" fill="#ff1744" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">1. INPUTS IN VIVO</text>`;
svg += `<circle cx="175" cy="310" r="40" fill="none" stroke="#ff1744" stroke-width="2"/>`;
svg += `<text x="175" y="315" fill="#ff1744" font-family="Arial" font-size="14" text-anchor="middle">Topografia 3D</text>`;
svg += `<circle cx="175" cy="410" r="40" fill="none" stroke="#ff1744" stroke-width="2"/>`;
svg += `<text x="175" y="415" fill="#ff1744" font-family="Arial" font-size="14" text-anchor="middle">OCT / Brillouin</text>`;

svg += drawArrow(300, 350, 380, 350, "#00e5ff", 5);

// 2. GÊMEO DIGITAL (HGO)
svg += `<rect x="400" y="150" width="350" height="400" rx="20" fill="#112435" stroke="#00e5ff" stroke-width="4"/>`;
svg += `<text x="575" y="200" fill="#00e5ff" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">2. GÊMEO DIGITAL (HGO)</text>`;
svg += `<circle cx="575" cy="320" r="80" fill="none" stroke="#00e5ff" stroke-width="2" stroke-dasharray="8,4"/>`;
svg += `<line x1="495" y1="320" x2="655" y2="320" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;
svg += `<line x1="505.7" y1="280" x2="644.2" y2="360" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;
svg += `<line x1="535" y1="250.7" x2="615" y2="389.2" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;
svg += `<line x1="575" y1="240" x2="575" y2="400" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;
svg += `<line x1="615" y1="250.7" x2="535" y2="389.2" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;
svg += `<line x1="644.2" y1="280" x2="505.7" y2="360" stroke="#00e5ff" stroke-width="1" opacity="0.5"/>`;

svg += `<text x="575" y="440" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Material Hiperelástico Anisotrópico</text>`;
svg += `<text x="575" y="470" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Polímero: Mooney-Rivlin (PMMA)</text>`;
svg += `<text x="575" y="500" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">Deslocamento Nulo Escleral</text>`;

svg += drawArrow(750, 350, 830, 350, "#00e676", 5);

// 3. SOLVER E PREVISÃO
svg += `<rect x="850" y="100" width="500" height="500" rx="20" fill="#1E2A15" stroke="#00e676" stroke-width="4"/>`;
svg += `<text x="1100" y="150" fill="#00e676" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">3. SOLVER & PREVISÃO</text>`;

svg += `<rect x="900" y="200" width="400" height="60" rx="10" fill="#00e676" opacity="0.2"/>`;
svg += `<text x="1100" y="235" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Mecânica: Pressão Intraocular (IOP) Ativada</text>`;

svg += `<rect x="900" y="280" width="400" height="60" rx="10" fill="#00e676" opacity="0.2"/>`;
svg += `<text x="1100" y="315" fill="#00e676" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Tensão Física: Mapas de Von Mises</text>`;

svg += `<rect x="900" y="360" width="400" height="180" rx="20" fill="#111B24" stroke="#ffb74d" stroke-width="3"/>`;
svg += `<text x="1100" y="410" fill="#ffb74d" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">RESULTADO VIRTUAL:</text>`;
svg += `<text x="1100" y="450" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">VEsférico Pós-Operatório Mapeado</text>`;
svg += `<text x="1100" y="490" fill="#cfd8dc" font-family="Arial" font-size="16" text-anchor="middle">(Cirurgia Testada 100% no Código)</text>`;

svg += `</svg>`;

const outFile = path.join(outDir, 'Figura_13.1_FEM_Pipeline.svg');
fs.writeFileSync(outFile, svg);
console.log('SVG Seguro gerado:', outFile);
