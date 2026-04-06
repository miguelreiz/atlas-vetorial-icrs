const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-004_VR_Vetor_Radial');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_4.4_Mecanismo_VR_Didatico.svg');

const w = 1400;
const h = 750;

const BG = "#0a1118"; 
const PRE_EPITHELIUM = "#37474f";
const POST_EPITHELIUM = "#546e7a";
const C_PMMA = "#cfd8dc";
const C_FORCE = "#ff1744"; // Red for VR

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Glows
svg += `
<defs>
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
    <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Titulo
svg += `<text x="700" y="50" fill="#ffffff" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">Figura 4.4: O Mecanismo Biomecânico do Vetor Radial (VR)</text>`;
svg += `<text x="700" y="80" fill="#B0BEC5" font-family="Arial" font-size="18" text-anchor="middle">Como a tração local das lamelas periféricas transmite tensão e achata a zona central doentia.</text>`;

// Divide in two panels Left (Pre) and Right (Post)
const cy = 450;
const cx1 = 350;
const cx2 = 1050;

svg += `<rect x="50" y="120" width="600" height="600" rx="20" fill="#111B24"/>`;
svg += `<rect x="750" y="120" width="600" height="600" rx="20" fill="#111B24"/>`;
svg += `<text x="${cx1}" y="160" fill="#ffb74d" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">ANTES: Córnea Ectásica (Lamelas Frouxas)</text>`;
svg += `<text x="${cx2}" y="160" fill="#4dd0e1" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">DEPOIS: VR em Ação (Tracionamento Centrífugo)</text>`;

// PANEL 1: PRE-OP
// The stroma is floppy in the middle.
svg += `<path d="M ${cx1-250} ${cy+100} Q ${cx1} ${cy-250} ${cx1+250} ${cy+100}" fill="none" stroke="${PRE_EPITHELIUM}" stroke-width="20" stroke-linecap="round"/>`;
// The specific lamella
svg += `<path d="M ${cx1-250} ${cy+100} Q ${cx1} ${cy-250} ${cx1+250} ${cy+100}" fill="none" stroke="#ffb74d" stroke-width="4" stroke-dasharray="10,10"/>`;
svg += `<text x="${cx1}" y="${cy-270}" fill="#ffb74d" font-family="Arial" font-size="16" font-style="italic" text-anchor="middle">Fibras Deslizada / Protrusão Central (K-max ALTO)</text>`;


// PANEL 2: POST-OP (With Wedges)
// Rings (Wedges) positioned at 75% depth = lower in the stroma chunk
const r1x = cx2-150;
const r2x = cx2+150;
const ptW = 30;
const ptH = 40;

// Path flattened in the middle, elevated at rings
// M left -> up over wedge 1 -> flat across center -> up over wedge 2 -> right
const pathStroma = `M ${cx2-250} ${cy+100} Q ${r1x-50} ${cy+20} ${r1x} ${cy-ptH-30} L ${r2x} ${cy-ptH-30} Q ${r2x+50} ${cy+20} ${cx2+250} ${cy+100}`;
svg += `<path d="${pathStroma}" fill="none" stroke="${POST_EPITHELIUM}" stroke-width="20" stroke-linecap="round"/>`;

// The specific lamella (pulled taut)
svg += `<path d="${pathStroma}" fill="none" stroke="#fff" stroke-width="4" filter="url(#glowGold)"/>`;

// Rings
svg += `<polygon points="${r1x-ptW},${cy} ${r1x},${cy-ptH} ${r1x+ptW},${cy}" fill="${C_PMMA}" stroke="#fff" stroke-width="2"/>`;
svg += `<polygon points="${r2x-ptW},${cy} ${r2x},${cy-ptH} ${r2x+ptW},${cy}" fill="${C_PMMA}" stroke="#fff" stroke-width="2"/>`;

svg += `<text x="${r1x}" y="${cy+25}" fill="${C_PMMA}" font-family="Arial" font-size="14" text-anchor="middle">Implante</text>`;
svg += `<text x="${r2x}" y="${cy+25}" fill="${C_PMMA}" font-family="Arial" font-size="14" text-anchor="middle">Implante</text>`;

// VR Vectors (Centrifugal forces on the lamella, pushing it OUTWARDS towards the limbus)
// From the top of the wedge, the red arrow points OUT.
svg += `<line x1="${r1x-10}" y1="${cy-ptH-30}" x2="${r1x-80}" y2="${cy-ptH-30}" stroke="${C_FORCE}" stroke-width="8" filter="url(#glowRed)"/>`;
svg += `<polygon points="${r1x-80},${cy-ptH-40} ${r1x-100},${cy-ptH-30} ${r1x-80},${cy-ptH-20}" fill="${C_FORCE}"/>`;
svg += `<text x="${r1x-50}" y="${cy-ptH-50}" fill="${C_FORCE}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Radial</text>`;

svg += `<line x1="${r2x+10}" y1="${cy-ptH-30}" x2="${r2x+80}" y2="${cy-ptH-30}" stroke="${C_FORCE}" stroke-width="8" filter="url(#glowRed)"/>`;
svg += `<polygon points="${r2x+80},${cy-ptH-40} ${r2x+100},${cy-ptH-30} ${r2x+80},${cy-ptH-20}" fill="${C_FORCE}"/>`;
svg += `<text x="${r2x+50}" y="${cy-ptH-50}" fill="${C_FORCE}" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Vetor Radial</text>`;

// Central Taut Zone indicator
svg += `<text x="${cx2}" y="${cy-100}" fill="#ffffff" font-family="Arial" font-size="16" font-style="italic" text-anchor="middle">O Estiramento (Arc-Shortening) traciona as fibras do centro:</text>`;
svg += `<text x="${cx2}" y="${cy-75}" fill="#4dd0e1" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">Curvatura reduzida (Aplainamento) + Rede Tensa</text>`;

// Before/After dotted comparison overlay on panel 2
svg += `<path d="M ${cx2-250} ${cy+100} Q ${cx2} ${cy-250} ${cx2+250} ${cy+100}" fill="none" stroke="#ffb74d" stroke-width="2" stroke-dasharray="5,5" opacity="0.4"/>`;


svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V4.4 Didactic Mech saved successfully to:', outPath);
