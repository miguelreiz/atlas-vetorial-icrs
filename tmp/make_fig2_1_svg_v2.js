const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'images', 'CH-002_Biomecanica');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}
const outPath = path.join(outDir, 'Figura_2.1_Principios_Biomecanicos_v4.svg'); // overwriting original

const w = 1400;
const h = 600;

// Colors
const BG = "#0a1118"; 
const COL_EPI = "#3e2723";
const COL_STROMA = "#1e1711";
const COL_FIBRA_ORIG = "#4e4135"; // Ghost original fibers
const COL_FIBRA = "#ffb74d";     // Taut post-ICRS
const COL_RING = "#cfd8dc";
const COL_TENTING = "#00e5ff"; // Cyan for Tenting
const COL_VR = "#ff1744";      // Neon Red for VR traction
const COL_FLAT = "#d4e157";    // Yellow-green for Flattening

let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
svg += `<rect width="${w}" height="${h}" fill="${BG}"/>`;

// Filters and Gradients
svg += `
<defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#90a4ae"/>
    </linearGradient>
    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>
`;

// Helper: Original Ectatic Cornea (Ghosted, steep center)
// Goes from x=50 to 1350, bulging very high in center cx=700
function getOrigFibra(y_offset) {
    // Sharp curve in center
    return `M 50 ${y_offset + 300} C 300 ${y_offset + 250}, 500 ${y_offset}, 700 ${y_offset} C 900 ${y_offset}, 1100 ${y_offset + 250}, 1350 ${y_offset + 300}`;
}
for (let y = 100; y <= 350; y += 25) {
    svg += `<path d="${getOrigFibra(y)}" fill="none" stroke="${COL_FIBRA_ORIG}" stroke-width="2" stroke-dasharray="8,8" opacity="0.4"/>`;
}
svg += `<text x="700" y="80" fill="${COL_FIBRA_ORIG}" font-family="Arial" font-size="16" text-anchor="middle" font-style="italic">Perfil Original: Frouxo e Pontiagudo</text>`;


// Post-ICRS state
const rx1 = 300, rx2 = 1100;
const cx = 700;

// Rings
const ptW = 80;
const ptH = 120;
// Base of rings at y = 420
const ring1 = `M ${rx1-ptW} 420 L ${rx1+ptW} 420 L ${rx1} ${420-ptH} Z`;
const ring2 = `M ${rx2-ptW} 420 L ${rx2+ptW} 420 L ${rx2} ${420-ptH} Z`;

svg += `<path d="${ring1}" fill="url(#ringGrad)" stroke="#FFFFFF" stroke-width="2"/>`;
svg += `<path d="${ring2}" fill="url(#ringGrad)" stroke="#FFFFFF" stroke-width="2"/>`;

// Taut Fibers representing TENTING and ARC SHORTENING
// These fibers pass over the rings, get elevated severely, and then stretch tightly across the center
function getPostFibra(baseY) {
    // If baseY is deep (> 420), it just curves under the rings
    if (baseY > 410) {
        return `M 50 ${baseY+50} C ${rx1} ${baseY+20}, ${rx1+100} ${baseY}, ${cx} ${baseY} C ${rx2-100} ${baseY}, ${rx2} ${baseY+20}, 1350 ${baseY+50}`;
    }

    // If baseY runs over the ring (< 420)
    // The fibers are pushed up aggressively at Rx1 and Rx2. And pulled tight at Cx.
    // Original y at Rx1 was ~ baseY+100, now pushed to apex!
    const peakY = baseY - 80; // elevated by tenting!
    // But center is pulled down relatively (flattened)
    const flatY = baseY + 40; 
    
    // Complex bezier to show local elevation and long flat span
    // 50 -> Rx1 -> cx -> Rx2 -> 1350
    return `M 50 ${baseY+100} C 150 ${baseY+100}, ${rx1-80} ${peakY}, ${rx1} ${peakY} C ${rx1+120} ${peakY}, ${cx-150} ${flatY}, ${cx} ${flatY} C ${cx+150} ${flatY}, ${rx2-120} ${peakY}, ${rx2} ${peakY} C ${rx2+80} ${peakY}, 1250 ${baseY+100}, 1350 ${baseY+100}`;
}

for (let y = 200; y <= 450; y += 20) {
    svg += `<path d="${getPostFibra(y)}" fill="none" stroke="${COL_FIBRA}" stroke-width="${3}" opacity="0.9"/>`;
    // Add small node highlights on fibers over the rings to show traction
    if (y < 410) {
        svg += `<circle cx="${rx1}" cy="${y-80}" r="3" fill="${COL_VR}"/>`;
        svg += `<circle cx="${rx2}" cy="${y-80}" r="3" fill="${COL_VR}"/>`;
    }
}

// Visual Mechanics Arrows
// 1. Tenting (UP arrow over rings)
svg += `<line x1="${rx1}" y1="450" x2="${rx1}" y2="300" stroke="${COL_TENTING}" stroke-width="6"/>`;
svg += `<polygon points="${rx1-15},310 ${rx1+15},310 ${rx1},285" fill="${COL_TENTING}"/>`;
svg += `<text x="${rx1}" y="470" fill="${COL_TENTING}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">1. TENTING</text>`;

svg += `<line x1="${rx2}" y1="450" x2="${rx2}" y2="300" stroke="${COL_TENTING}" stroke-width="6"/>`;
svg += `<polygon points="${rx2-15},310 ${rx2+15},310 ${rx2},285" fill="${COL_TENTING}"/>`;
svg += `<text x="${rx2}" y="470" fill="${COL_TENTING}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">1. TENTING</text>`;


// 2. Arc Shortening Vector (VR) pulling CENTRIFUGALLY (away from center)
// Fibers on the slopes are fighting to stretch
svg += `<line x1="${cx-100}" y1="240" x2="${rx1+100}" y2="210" stroke="${COL_VR}" stroke-width="8" filter="url(#glowRed)"/>`;
svg += `<polygon points="${rx1+120},215 ${rx1+110},225 ${rx1+85},207" fill="${COL_VR}" filter="url(#glowRed)"/>`;

svg += `<line x1="${cx+100}" y1="240" x2="${rx2-100}" y2="210" stroke="${COL_VR}" stroke-width="8" filter="url(#glowRed)"/>`;
svg += `<polygon points="${rx2-120},215 ${rx2-110},225 ${rx2-85},207" fill="${COL_VR}" filter="url(#glowRed)"/>`;

// Labels for VR
svg += `<text x="${cx-200}" y="200" fill="${COL_VR}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">2. ARC-SHORTENING</text>`;
svg += `<text x="${cx+200}" y="200" fill="${COL_VR}" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle">2. ARC-SHORTENING</text>`;


// 3. Central Flattening (K-decrease)
svg += `<text x="${cx}" y="200" fill="${COL_FLAT}" font-family="Arial" font-size="22" font-weight="bold" text-anchor="middle">3. APLAINAMENTO CENTRAL</text>`;
svg += `<line x1="${cx-150}" y1="220" x2="${cx+150}" y2="220" stroke="${COL_FLAT}" stroke-width="4" stroke-dasharray="10,5"/>`;
svg += `<path d="M ${cx} 160 L ${cx} 180" stroke="${COL_FLAT}" stroke-width="4" fill="none"/>`;
svg += `<polygon points="${cx-10},175 ${cx+10},175 ${cx},190" fill="${COL_FLAT}"/>`; // pushing down arrow


// Titles
svg += `<text x="${cx}" y="50" fill="#ffffff" font-family="Arial" font-size="32" font-weight="bold" text-anchor="middle">Figura 2.1: Efeito Físico das Fibras Tracionadas</text>`;
svg += `<text x="${cx}" y="550" fill="#B0BEC5" font-family="Arial" font-size="18" text-anchor="middle">O Tenting elava o tecido focalmente, resultando no Encurtamento do Arco tracionando as fibras e achatando clinicamente a zona óptica.</text>`;

svg += `</svg>`;

fs.writeFileSync(outPath, svg);
console.log('SVG V2.1 Tracionado saved successfully to:', outPath);
