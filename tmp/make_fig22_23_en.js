const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'Jordana imagens', 'English_SVGs');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

// Common styles
const bg = '#FFFFFF';
const textColor = '#112233';
const font = 'Arial, sans-serif';

function saveSvg(filename, content) {
    fs.writeFileSync(path.join(outDir, filename), content);
    console.log(`Generated ${filename}`);
}

// Helper to draw accurate corneal layers
function drawLayers(xStart, xEnd, yTopCenter, yTopEdge, thicknessCenter, thicknessEdge) {
    // ...
}
function genLayersStr(xStart, xEnd, yTopCenter, yTopEdge, thicknessCenter, thicknessEdge) {
    const cx = (xStart + xEnd) / 2;
    const qyTop = yTopCenter - (yTopEdge - yTopCenter);
    const yBotCenter = yTopCenter + thicknessCenter;
    const yBotEdge = yTopEdge + thicknessEdge;
    const qyBot = yBotCenter - (yBotEdge - yBotCenter);
    
    const depths = [0, 0.09, 0.11, 0.36, 0.96, 1.0];
    const colors = ['#FFCDD2', '#8D6E63', '#F5E6C8', '#EDD9A3', '#9E9E9E', '#B3E5FC']; 
    let svg = '';
    for (let i = 0; i < depths.length - 1; i++) {
        const d1 = depths[i]; const d2 = depths[i+1];
        const yTopCenterLayer = yTopCenter + d1 * thicknessCenter;
        const yTopEdgeLayer = yTopEdge + d1 * thicknessEdge;
        const qyTopLayer = yTopCenterLayer - (yTopEdgeLayer - yTopCenterLayer);
        const yBotCenterLayer = yTopCenter + d2 * thicknessCenter;
        const yBotEdgeLayer = yTopEdge + d2 * thicknessEdge;
        const qyBotLayer = yBotCenterLayer - (yBotEdgeLayer - yBotCenterLayer);
        svg += `<path d="M ${xStart} ${yTopEdgeLayer} Q ${cx} ${qyTopLayer} ${xEnd} ${yTopEdgeLayer} L ${xEnd} ${yBotEdgeLayer} Q ${cx} ${qyBotLayer} ${xStart} ${yBotEdgeLayer} Z" fill="${colors[i]}" opacity="0.8"/>`;
    }
    return svg;
}
function getLocalY(xStart, xEnd, yTopCenter, yTopEdge, thicknessCenter, thicknessEdge, x, depthFraction) {
    const cx = (xStart + xEnd) / 2;
    const qyTop = yTopCenter - (yTopEdge - yTopCenter);
    const yBotCenter = yTopCenter + thicknessCenter;
    const yBotEdge = yTopEdge + thicknessEdge;
    const qyBot = yBotCenter - (yBotEdge - yBotCenter);
    const t = (x - xStart) / (xEnd - xStart);
    const yTopLocal = (1-t)*(1-t)*yTopEdge + 2*(1-t)*t*qyTop + t*t*yTopEdge;
    const yBotLocal = (1-t)*(1-t)*yBotEdge + 2*(1-t)*t*qyBot + t*t*yBotEdge;
    return yTopLocal + depthFraction * (yBotLocal - yTopLocal);
}

function drawTriangularRing(cx, yBase, width, height, color, strokeColor) {
    const apexY = yBase - height;
    const leftX = cx - width/2;
    const rightX = cx + width/2;
    return `<polygon points="${cx},${apexY} ${rightX},${yBase} ${leftX},${yBase}" fill="${color}" stroke="${strokeColor}" stroke-width="2"/>`;
}

function drawFusiformRing(cx, yBase, width, height, color, strokeColor) {
    const yMid = yBase - height/2;
    return `<ellipse cx="${cx}" cy="${yMid}" rx="${width/2}" ry="${height/2}" fill="${color}" stroke="${strokeColor}" stroke-width="2"/>`;
}


// -----------------------------------------------------
// Figure 22.1: Radial Vector Amplification
// -----------------------------------------------------
let svg22_1 = `<svg viewBox="0 0 1600 700" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="700" fill="${bg}"/>
    <defs>
        <marker id="arrowB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0055AA" />
        </marker>
        <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#CC2200" />
        </marker>
        <marker id="dimArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#667788" />
        </marker>
    </defs>
    <text x="800" y="50" fill="${textColor}" font-family="${font}" font-size="28" font-weight="bold" text-anchor="middle">Figure 22.1 — Radial Vector Amplification by Narrow Optical Zone</text>
`;

let leftGraph = `<g transform="translate(50, 200)">
    <rect x="0" y="0" width="700" height="300" rx="10" fill="#FFFFFF" stroke="#CCCCCC"/>`;
    
leftGraph += genLayersStr(50, 650, 100, 230, 80, 100);

const yRing1L = getLocalY(50, 650, 100, 230, 80, 100, 200, 0.78);
const yRing2L = getLocalY(50, 650, 100, 230, 80, 100, 500, 0.78);
leftGraph += drawTriangularRing(200, yRing1L, 20, 25, '#FF8800', '#CC4400');
leftGraph += drawTriangularRing(500, yRing2L, 20, 25, '#FF8800', '#CC4400');

leftGraph += `<line x1="200" y1="${yRing1L - 25}" x2="100" y2="${yRing1L - 50}" stroke="#0055AA" stroke-width="4" marker-end="url(#arrowB)"/>`;
leftGraph += `<line x1="500" y1="${yRing2L - 25}" x2="600" y2="${yRing2L - 50}" stroke="#0055AA" stroke-width="4" marker-end="url(#arrowB)"/>`;
leftGraph += `<text x="100" y="${yRing1L - 60}" fill="#0055AA" font-family="${font}" font-size="20" font-weight="bold">VR</text>`;
leftGraph += `<text x="600" y="${yRing2L - 60}" fill="#0055AA" font-family="${font}" font-size="20" font-weight="bold">VR</text>`;

leftGraph += `<line x1="200" y1="280" x2="500" y2="280" stroke="#667788" stroke-width="2" marker-start="url(#dimArrow)" marker-end="url(#dimArrow)"/>`;
leftGraph += `<text x="350" y="295" fill="#667788" font-family="${font}" font-size="16" font-weight="bold" text-anchor="middle">Ø 5.0 mm</text>`;

leftGraph += `
    <text x="350" y="40" fill="#0055AA" font-family="${font}" font-size="22" font-weight="bold" text-anchor="middle">Ferrara Standard 5.0 mm</text>
    <rect x="250" y="50" width="200" height="40" rx="8" fill="#E3F2FD" stroke="#0055AA" stroke-width="3"/>
    <text x="350" y="80" fill="#0055AA" font-family="${font}" font-size="24" font-weight="bold" text-anchor="middle">| VR | = 1x</text>
    <text x="350" y="110" fill="#0055AA" font-family="${font}" font-size="14" font-weight="bold" text-anchor="middle">▼ Kmax</text>
</g>`;

let layerLegend = `
    <text x="60" y="520" fill="#FFAA00" font-family="${font}" font-size="14" font-style="italic">Epithelium</text>
    <text x="60" y="535" fill="#8D6E63" font-family="${font}" font-size="14" font-style="italic">Bowman</text>
    <text x="60" y="550" fill="#EDD9A3" font-family="${font}" font-size="14" font-style="italic">Stroma</text>
    <text x="60" y="565" fill="#00B4DC" font-family="${font}" font-size="14" font-style="italic">Endothelium</text>
`;

let rightGraph = `<g transform="translate(800, 200)">
    <rect x="0" y="0" width="700" height="300" rx="10" fill="#FFFFFF" stroke="#CCCCCC"/>`;
    
rightGraph += genLayersStr(50, 650, 100, 230, 80, 100);

const yRing1R = getLocalY(50, 650, 100, 230, 80, 100, 260, 0.78);
const yRing2R = getLocalY(50, 650, 100, 230, 80, 100, 440, 0.78);
rightGraph += drawTriangularRing(260, yRing1R, 20, 25, '#FF8800', '#CC4400');
rightGraph += drawTriangularRing(440, yRing2R, 20, 25, '#FF8800', '#CC4400');

rightGraph += `<line x1="260" y1="${yRing1R - 25}" x2="120" y2="${yRing1R - 70}" stroke="#CC2200" stroke-width="6" marker-end="url(#arrowR)"/>`;
rightGraph += `<line x1="440" y1="${yRing2R - 25}" x2="580" y2="${yRing2R - 70}" stroke="#CC2200" stroke-width="6" marker-end="url(#arrowR)"/>`;
rightGraph += `<text x="110" y="${yRing1R - 80}" fill="#CC2200" font-family="${font}" font-size="24" font-weight="bold">VR</text>`;
rightGraph += `<text x="590" y="${yRing2R - 80}" fill="#CC2200" font-family="${font}" font-size="24" font-weight="bold">VR</text>`;

rightGraph += `<line x1="260" y1="280" x2="440" y2="280" stroke="#667788" stroke-width="2" marker-start="url(#dimArrow)" marker-end="url(#dimArrow)"/>`;
rightGraph += `<text x="350" y="295" fill="#667788" font-family="${font}" font-size="16" font-weight="bold" text-anchor="middle">Ø 3.5 mm</text>`;

rightGraph += `
    <text x="350" y="40" fill="#CC2200" font-family="${font}" font-size="22" font-weight="bold" text-anchor="middle">Ferrara 3.5 mm</text>
    <rect x="250" y="50" width="200" height="40" rx="8" fill="#FFEBEE" stroke="#CC2200" stroke-width="3"/>
    <text x="350" y="80" fill="#CC2200" font-family="${font}" font-size="24" font-weight="bold" text-anchor="middle">| VR | = 2x</text>
    <text x="350" y="110" fill="#CC2200" font-family="${font}" font-size="14" font-weight="bold" text-anchor="middle">▼ Kmax</text>
</g>`;

let footer1 = `<text x="800" y="650" fill="#667788" font-family="${font}" font-size="16" font-style="italic" text-anchor="middle">Arc-Shortening ∝ 1/r · Smaller radius = Larger centrifugal Radial Vector (VR) · (Kling &amp; Marcos, IOVS 2013)</text>`;

svg22_1 += leftGraph + rightGraph + layerLegend + footer1 + `</svg>`;
saveSvg('Figura_22.1_Radial_Amplification.svg', svg22_1);

// -----------------------------------------------------
// Figure 22.2: Compensatory Epithelial Masking
// -----------------------------------------------------
let svg22_2 = `<svg viewBox="0 0 1600 700" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="700" fill="${bg}"/>
    <defs>
        <marker id="arrowR2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C00" />
        </marker>
        <marker id="arrowDark" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#001F3F" />
        </marker>
        <marker id="arrowIOP" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFC107" />
        </marker>
    </defs>
    <text x="800" y="50" fill="${textColor}" font-family="${font}" font-size="28" font-weight="bold" text-anchor="middle">Figure 22.2 — Compensatory Epithelial Masking (Reinstein Law)</text>
    
    <g transform="translate(150, 150)">
        <rect x="0" y="0" width="1300" height="450" fill="#F4F7FB" stroke="#DDE5F0"/>
        
        <!-- Base curves -->
        <!-- True stroma (Bowman). Rings at 380 and 920. 
             Over the rings: TENTING (elevation). y=130
             Between the rings (center): TRENCH (flattening). y=200
             Edges: y=180 -->
        <path d="M 0 180 Q 200 170 300 160 Q 340 145 380 130 Q 515 200 650 200 Q 785 200 920 130 Q 960 145 1000 160 Q 1100 170 1300 180 L 1300 400 L 0 400 Z" fill="#E8F1FA"/>
        
        <!-- Epithelium with smoothing. 
             Thins over ring: Placido surface is y=110 at x=380 (Thickness 20).
             Thickens over trench: Placido surface is y=120 at x=650 (Thickness 80).
             Edges: Placido y=140 (Thickness 40). -->
        <path d="M 0 140 Q 200 135 300 125 Q 340 115 380 110 Q 515 120 650 120 Q 785 120 920 110 Q 960 115 1000 125 Q 1100 135 1300 140 L 1300 180 Q 1100 170 1000 160 Q 960 145 920 130 Q 785 200 650 200 Q 515 200 380 130 Q 340 145 300 160 Q 200 170 0 180 Z" fill="#FFF9C4"/>
        
        <!-- Anterior Surface (Placido) -->
        <path d="M 0 140 Q 200 135 300 125 Q 340 115 380 110 Q 515 120 650 120 Q 785 120 920 110 Q 960 115 1000 125 Q 1100 135 1300 140" fill="none" stroke="#C00" stroke-width="4"/>
        
        <!-- Bowman/Stroma Interface -->
        <path d="M 0 180 Q 200 170 300 160 Q 340 145 380 130 Q 515 200 650 200 Q 785 200 920 130 Q 960 145 1000 160 Q 1100 170 1300 180" fill="none" stroke="#001F3F" stroke-width="3"/>
        
        <!-- Endothelium -->
        <path d="M 0 400 Q 200 390 300 380 Q 360 360 380 390 Q 515 420 650 420 Q 785 420 920 390 Q 940 360 1000 380 Q 1100 390 1300 400" fill="none" stroke="#80CBC4" stroke-width="2"/>

        <!-- PMMA Rings (TRIANGULAR) at depth! -->
        ${drawTriangularRing(380, 260, 40, 50, '#FF8C00', '#E65100')}
        ${drawTriangularRing(920, 260, 40, 50, '#FF8C00', '#E65100')}
        
        <text x="380" y="280" fill="#E65100" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">Ferrara 3.5</text>
        <text x="920" y="280" fill="#E65100" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">Ferrara 3.5</text>

        <!-- IOP Arrows (pointing UP) -->
        <line x1="200" y1="380" x2="200" y2="330" stroke="#FFC107" stroke-width="3" marker-end="url(#arrowIOP)"/>
        <line x1="550" y1="410" x2="550" y2="360" stroke="#FFC107" stroke-width="3" marker-end="url(#arrowIOP)"/>
        <line x1="750" y1="410" x2="750" y2="360" stroke="#FFC107" stroke-width="3" marker-end="url(#arrowIOP)"/>
        <line x1="1100" y1="380" x2="1100" y2="330" stroke="#FFC107" stroke-width="3" marker-end="url(#arrowIOP)"/>
        <text x="650" y="440" fill="#D49A00" font-family="${font}" font-size="16" font-weight="bold" text-anchor="middle">IOP (+Z)</text>

        <!-- Legends & Callouts -->
        <g transform="translate(20, -50)">
            <rect x="0" y="0" width="300" height="110" fill="#FFFFFF" stroke="#CCCCCC" opacity="0.9"/>
            <rect x="10" y="10" width="20" height="10" fill="#FFF9C4"/>
            <text x="40" y="20" fill="${textColor}" font-family="${font}" font-size="12">Epithelium (thickens to mask)</text>
            <rect x="10" y="30" width="20" height="10" fill="#E8F1FA"/>
            <text x="40" y="40" fill="${textColor}" font-family="${font}" font-size="12">Stroma</text>
            <line x1="10" y1="55" x2="30" y2="55" stroke="#C00" stroke-width="4"/>
            <text x="40" y="60" fill="${textColor}" font-family="${font}" font-size="12">Anterior surface (Placido reads here)</text>
            <line x1="10" y1="75" x2="30" y2="75" stroke="#001F3F" stroke-width="3"/>
            <text x="40" y="80" fill="${textColor}" font-family="${font}" font-size="12">Bowman's Interface / True Stroma</text>
            <line x1="10" y1="95" x2="30" y2="95" stroke="#80CBC4" stroke-width="2"/>
            <text x="40" y="100" fill="${textColor}" font-family="${font}" font-size="12">Endothelium</text>
        </g>

        <!-- Right Callouts (Central Trench) -->
        <rect x="650" y="-30" width="160" height="50" rx="8" fill="#FFEBEE" stroke="#C00" stroke-width="2"/>
        <text x="730" y="-5" fill="#C00" font-family="${font}" font-size="14" font-weight="bold" text-anchor="middle">Epithelial hyperplasia</text>
        <text x="730" y="10" fill="#C00" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">(up to +80 μm)</text>
        <path d="M 730 20 Q 680 70 650 140" fill="none" stroke="#C00" stroke-width="3" marker-end="url(#arrowR2)"/>

        <rect x="800" y="220" width="180" height="40" rx="8" fill="#E3F2FD" stroke="#001F3F" stroke-width="2"/>
        <text x="890" y="235" fill="#001F3F" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">Stromal trench</text>
        <text x="890" y="250" fill="#001F3F" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">(Central flattening)</text>
        <path d="M 800 240 Q 750 220 700 200" fill="none" stroke="#001F3F" stroke-width="3" marker-end="url(#arrowDark)"/>
        
        <!-- Left Callouts (Ring Peak) -->
        <rect x="250" y="40" width="120" height="40" rx="8" fill="#FFF3E0" stroke="#FF8C00" stroke-width="2"/>
        <text x="310" y="55" fill="#E65100" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">Stromal Peak</text>
        <text x="310" y="70" fill="#E65100" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">(Tenting)</text>
        <path d="M 310 80 Q 330 100 350 120" fill="none" stroke="#FF8C00" stroke-width="3" marker-end="url(#arrowDark)"/>

        <!-- Axes -->
        <line x1="-20" y1="450" x2="1320" y2="450" stroke="#B0BEC5" stroke-width="2"/>
        <text x="650" y="480" fill="#78909C" font-family="${font}" font-size="14" text-anchor="middle">Radial distance (mm)</text>
    </g>

    <text x="800" y="660" fill="#667788" font-family="${font}" font-size="14" font-style="italic" text-anchor="middle">The ring causes tenting (stromal peak). The central stroma flattens (trench). The epithelium selectively thickens centrally to smooth the surface. (Reinstein 2008)</text>
</svg>`;
saveSvg('Figura_22.2_Epithelial_Masking.svg', svg22_2);

// -----------------------------------------------------
// Figure 22.3: Cortical Neuroadaptation
// -----------------------------------------------------
let svg22_3 = `<svg viewBox="0 0 1600 700" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="700" fill="${bg}"/>
    <defs>
        <marker id="arrowGray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#78909C" />
        </marker>
    </defs>
    <text x="800" y="50" fill="${textColor}" font-family="${font}" font-size="28" font-weight="bold" text-anchor="middle">Figure 22.3 — Cortical Neuroadaptation: From Total Noise to Selective Suppression (V1)</text>

    <!-- Phase 1: Pre-op -->
    <g transform="translate(300, 350)">
        <text x="-250" y="-150" fill="#FF8A80" font-family="${font}" font-size="36" font-weight="bold">1</text>
        <circle cx="0" cy="0" r="180" fill="#FFEBEE" stroke="#FFCDD2" stroke-width="6"/>
        <circle cx="0" cy="0" r="150" fill="none" stroke="#EF9A9A" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="0" cy="0" r="130" fill="none" stroke="#455A64" stroke-width="4"/>
        ${Array.from({length: 50}).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 120;
            return `<circle cx="${r * Math.cos(angle)}" cy="${r * Math.sin(angle)}" r="2" fill="#E53935"/>`;
        }).join('')}
        
        <rect x="-80" y="-40" width="160" height="80" rx="10" fill="#FFCDD2" stroke="#B71C1C" stroke-width="3"/>
        <text x="0" y="-5" fill="#B71C1C" font-family="${font}" font-size="24" font-weight="bold" text-anchor="middle">NOISE</text>
        <text x="0" y="25" fill="#B71C1C" font-family="${font}" font-size="24" font-weight="bold" text-anchor="middle">100%</text>

        <text x="0" y="-200" fill="#B71C1C" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Preoperative</text>
        <text x="0" y="-180" fill="#78909C" font-family="${font}" font-size="14" text-anchor="middle">(VA 20/400)</text>
        <text x="0" y="170" fill="#90A4AE" font-family="${font}" font-size="12" text-anchor="middle">mesopic pupil Ø4.5 mm</text>
    </g>

    <line x1="520" y1="350" x2="560" y2="350" stroke="#78909C" stroke-width="4" marker-end="url(#arrowGray)"/>

    <!-- Phase 2: Immediate post-op -->
    <g transform="translate(800, 350)">
        <text x="-250" y="-150" fill="#FFCC80" font-family="${font}" font-size="36" font-weight="bold">2</text>
        <circle cx="0" cy="0" r="180" fill="#FFF3E0" stroke="#FFE0B2" stroke-width="6"/>
        <circle cx="0" cy="0" r="150" fill="none" stroke="#FFCC80" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="0" cy="0" r="130" fill="none" stroke="#455A64" stroke-width="4"/>
        
        <circle cx="0" cy="0" r="100" fill="#E8F5E9" stroke="#388E3C" stroke-width="6"/>
        
        <circle cx="0" cy="0" r="110" fill="none" stroke="#FF8F00" stroke-width="8" stroke-dasharray="20 15"/>
        
        ${Array.from({length: 16}).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const r = 120;
            return `<polygon points="${r*Math.cos(angle)},${r*Math.sin(angle)-4} ${r*Math.cos(angle)+2},${r*Math.sin(angle)-1} ${r*Math.cos(angle)+5},${r*Math.sin(angle)} ${r*Math.cos(angle)+2},${r*Math.sin(angle)+1} ${r*Math.cos(angle)},${r*Math.sin(angle)+4} ${r*Math.cos(angle)-2},${r*Math.sin(angle)+1} ${r*Math.cos(angle)-5},${r*Math.sin(angle)} ${r*Math.cos(angle)-2},${r*Math.sin(angle)-1}" fill="#FFD54F"/>`;
        }).join('')}

        <text x="0" y="-5" fill="#2E7D32" font-family="${font}" font-size="20" font-weight="bold" text-anchor="middle">Foveal</text>
        <text x="0" y="20" fill="#2E7D32" font-family="${font}" font-size="20" font-weight="bold" text-anchor="middle">SIGNAL</text>

        <text x="0" y="-200" fill="#E65100" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Immediate post-op</text>
        <text x="0" y="-180" fill="#78909C" font-family="${font}" font-size="14" text-anchor="middle">(VA 20/40 + Halos)</text>
        <text x="0" y="170" fill="#90A4AE" font-family="${font}" font-size="12" text-anchor="middle">mesopic pupil Ø4.5 mm</text>
        <text x="0" y="-125" fill="#E65100" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">Ferrara 3.5 mm</text>
    </g>

    <line x1="1020" y1="350" x2="1060" y2="350" stroke="#78909C" stroke-width="4" marker-end="url(#arrowGray)"/>

    <!-- Phase 3: Neuroadaptation -->
    <g transform="translate(1300, 350)">
        <text x="-250" y="-150" fill="#A5D6A7" font-family="${font}" font-size="36" font-weight="bold">3</text>
        <circle cx="0" cy="0" r="180" fill="#F1F8E9" stroke="#C8E6C9" stroke-width="6"/>
        <circle cx="0" cy="0" r="150" fill="none" stroke="#A5D6A7" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="0" cy="0" r="130" fill="none" stroke="#455A64" stroke-width="4"/>
        
        <circle cx="0" cy="0" r="100" fill="#E8F5E9" stroke="#1B5E20" stroke-width="6"/>
        
        ${Array.from({length: 16}).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const r = 120;
            return `<circle cx="${r * Math.cos(angle)}" cy="${r * Math.sin(angle)}" r="1" fill="#B0BEC5"/>`;
        }).join('')}

        <text x="0" y="-5" fill="#1B5E20" font-family="${font}" font-size="20" font-weight="bold" text-anchor="middle">Dominant</text>
        <text x="0" y="20" fill="#1B5E20" font-family="${font}" font-size="20" font-weight="bold" text-anchor="middle">SIGNAL</text>

        <text x="0" y="-220" fill="#1B5E20" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Neuroadaptation</text>
        <text x="0" y="-200" fill="#1B5E20" font-family="${font}" font-size="16" font-weight="bold" text-anchor="middle">3-6 months</text>
        
        <rect x="-60" y="-190" width="120" height="40" rx="4" fill="#E8F5E9" stroke="#2E7D32" stroke-width="1"/>
        <text x="0" y="-175" fill="#2E7D32" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">V1 suppresses halos</text>
        <text x="0" y="-160" fill="#78909C" font-family="${font}" font-size="11" text-anchor="middle">(Halos suppressed)</text>
        <line x1="0" y1="-150" x2="0" y2="-130" stroke="#2E7D32" stroke-width="3" marker-end="url(#arrowGray)"/>
        
        <text x="0" y="170" fill="#90A4AE" font-family="${font}" font-size="12" text-anchor="middle">mesopic pupil Ø4.5 mm</text>
    </g>

    <text x="800" y="660" fill="#667788" font-family="${font}" font-size="14" font-style="italic" text-anchor="middle">The primary visual cortex (V1) in keratoconus patients shows increased neural plasticity. After acquiring the foveal signal, inhibitory networks actively suppress peripheral reflexes. (Sabesan &amp; Yoon, IOVS 2010)</text>
</svg>`;
saveSvg('Figura_22.3_Neuroadaptation.svg', svg22_3);

// -----------------------------------------------------
// Figure 23.1: Frontal View Concentric
// -----------------------------------------------------
let svg23_1 = `<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="1200" fill="${bg}"/>
    <defs>
        <marker id="arrowB2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0288D1" />
        </marker>
        <marker id="arrowY" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FDD835" />
        </marker>
    </defs>

    <text x="600" y="80" fill="${textColor}" font-family="${font}" font-size="28" font-weight="bold" text-anchor="middle">Figure 23.1 — Frontal View: Concentric Radial Barriers</text>
    <text x="600" y="120" fill="${textColor}" font-family="${font}" font-size="22" font-weight="bold" text-anchor="middle">(Corset Effect — Cascading IOP Blockade)</text>

    <g transform="translate(600, 600)">
        <circle cx="0" cy="0" r="450" fill="none" stroke="#CFD8DC" stroke-width="2" stroke-dasharray="5 5"/>
        <text x="0" y="-470" fill="#78909C" font-family="${font}" font-size="16" font-style="italic" text-anchor="middle">Sclerocorneal limbus (Ø 11-12 mm)</text>

        <circle cx="0" cy="0" r="180" fill="none" stroke="#B0BEC5" stroke-width="2" stroke-dasharray="8 4"/>
        <text x="350" y="0" fill="#78909C" font-family="${font}" font-size="16" font-style="italic">Mesopic pupil Ø4.5 mm</text>
        <line x1="280" y1="-5" x2="340" y2="-5" stroke="#78909C" stroke-width="2"/>

        <circle cx="0" cy="0" r="140" fill="none" stroke="#D32F2F" stroke-width="12"/> <!-- Ferrara 3.5 -->
        <circle cx="0" cy="0" r="200" fill="none" stroke="#F57C00" stroke-width="10"/> <!-- Ferrara 5.0 -->
        <circle cx="0" cy="0" r="260" fill="none" stroke="#7B1FA2" stroke-width="10"/> <!-- Ferrara HM 6.0 -->
        
        <text x="0" y="-160" fill="#D32F2F" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Ferrara Ø 3.5 mm</text>
        <text x="0" y="-220" fill="#F57C00" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Ferrara Standard Ø 5.0 mm</text>
        <text x="0" y="-280" fill="#7B1FA2" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Ferrara HM Ø 6.0 mm</text>

        <circle cx="0" cy="0" r="12" fill="#D32F2F"/>
        <text x="0" y="30" fill="#D32F2F" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">Apex</text>
        <text x="0" y="50" fill="#D32F2F" font-family="${font}" font-size="16" font-weight="bold" text-anchor="middle">(Kmax)</text>

        ${Array.from({length: 8}).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x1 = 40 * Math.cos(angle);
            const y1 = 40 * Math.sin(angle);
            const x2 = 100 * Math.cos(angle);
            const y2 = 100 * Math.sin(angle);
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FDD835" stroke-width="4" marker-end="url(#arrowY)"/>`;
        }).join('')}

        ${Array.from({length: 8}).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2 + (Math.PI/8);
            const r1 = 145; const r2 = 185;
            const r3 = 205; const r4 = 245;
            const r5 = 265; const r6 = 305;
            return `
            <line x1="${r1*Math.cos(angle)}" y1="${r1*Math.sin(angle)}" x2="${r2*Math.cos(angle)}" y2="${r2*Math.sin(angle)}" stroke="#0288D1" stroke-width="3" marker-end="url(#arrowB2)"/>
            <line x1="${r3*Math.cos(angle)}" y1="${r3*Math.sin(angle)}" x2="${r4*Math.cos(angle)}" y2="${r4*Math.sin(angle)}" stroke="#0288D1" stroke-width="3" marker-end="url(#arrowB2)"/>
            <line x1="${r5*Math.cos(angle)}" y1="${r5*Math.sin(angle)}" x2="${r6*Math.cos(angle)}" y2="${r6*Math.sin(angle)}" stroke="#0288D1" stroke-width="3" marker-end="url(#arrowB2)"/>
            `;
        }).join('')}
    </g>

    <g transform="translate(350, 1050)">
        <rect x="0" y="0" width="500" height="90" rx="5" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
        <rect x="20" y="15" width="30" height="10" fill="#D32F2F"/>
        <text x="60" y="25" fill="${textColor}" font-family="${font}" font-size="16">Ferrara Ø 3.5 mm</text>
        <rect x="20" y="40" width="30" height="10" fill="#F57C00"/>
        <text x="60" y="50" fill="${textColor}" font-family="${font}" font-size="16">Ferrara Standard Ø 5.0 mm</text>
        <rect x="20" y="65" width="30" height="10" fill="#7B1FA2"/>
        <text x="60" y="75" fill="${textColor}" font-family="${font}" font-size="16">Ferrara HM Ø 6.0 mm</text>

        <rect x="280" y="15" width="30" height="10" fill="#0288D1"/>
        <text x="320" y="25" fill="${textColor}" font-family="${font}" font-size="16">VR (Centrifugal Radial Vector)</text>
        <rect x="280" y="40" width="30" height="10" fill="#FDD835"/>
        <text x="320" y="50" fill="${textColor}" font-family="${font}" font-size="16">IOP (+Z, Endo→Epi)</text>
    </g>

    <text x="600" y="1170" fill="#667788" font-family="${font}" font-size="16" font-style="italic" text-anchor="middle">Three rows of PMMA intercept the radial dissipation of IOP. Each barrier blocks a distinct band of ectatic stress. (FEBio HGO 4.12, Antigravity 2026)</text>
</svg>`;
saveSvg('Figura_23.1_Frontal_View.svg', svg23_1);

// -----------------------------------------------------
// Figure 23.2: PMMA Corset Cross-Section
// -----------------------------------------------------
let svg23_2 = `<svg viewBox="0 0 1600 750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="750" fill="${bg}"/>
    <defs>
        <marker id="arrowB3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0288D1" />
        </marker>
        <marker id="arrowY2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FDD835" />
        </marker>
    </defs>
    
    <text x="800" y="50" fill="${textColor}" font-family="${font}" font-size="28" font-weight="bold" text-anchor="middle">Figure 23.2 — Cross-Section: The PMMA Corset with Containment Vectors</text>

    <!-- Legend Box -->
    <g transform="translate(50, 150)">
        <rect x="0" y="0" width="280" height="130" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
        
        <rect x="10" y="10" width="20" height="10" fill="#FFF9C4" stroke="#FFAA00"/>
        <text x="40" y="20" fill="${textColor}" font-family="${font}" font-size="14">Epithelium / Bowman</text>
        <rect x="10" y="30" width="20" height="10" fill="#E8F1FA" stroke="#00B4DC"/>
        <text x="40" y="40" fill="${textColor}" font-family="${font}" font-size="14">Stroma (70-75%)</text>
        <rect x="10" y="50" width="20" height="10" fill="#FF8C00" stroke="#E65100"/>
        <text x="40" y="60" fill="${textColor}" font-family="${font}" font-size="14">ICRS / PMMA</text>
        <rect x="10" y="70" width="20" height="10" fill="#0288D1"/>
        <text x="40" y="80" fill="${textColor}" font-family="${font}" font-size="14">Centrifugal VR (→)</text>

        <rect x="170" y="10" width="20" height="10" fill="#FDD835"/>
        <text x="200" y="20" fill="${textColor}" font-family="${font}" font-size="14">IOP (+Z, ↑)</text>
        ${drawTriangularRing(180, 40, 20, 10, '#FF8C00', '#D32F2F')}
        <text x="200" y="40" fill="${textColor}" font-family="${font}" font-size="14">Ferrara Ø3.5</text>
        ${drawTriangularRing(180, 60, 20, 10, '#FF8C00', '#F57C00')}
        <text x="200" y="60" fill="${textColor}" font-family="${font}" font-size="14">Ferrara Ø5.0</text>
        ${drawFusiformRing(180, 80, 20, 14, '#FF8C00', '#7B1FA2')}
        <text x="200" y="80" fill="${textColor}" font-family="${font}" font-size="14">Ferrara HM Ø6.0</text>
    </g>

    <g transform="translate(150, 300)">`;

svg23_2 += genLayersStr(0, 1300, 100, 250, 150, 150);

const yDinaR = getLocalY(0, 1300, 100, 250, 150, 150, 850, 0.78);
const yKeraR = getLocalY(0, 1300, 100, 250, 150, 150, 980, 0.78);
const yCornR = getLocalY(0, 1300, 100, 250, 150, 150, 1100, 0.78);

const yDinaL = getLocalY(0, 1300, 100, 250, 150, 150, 450, 0.78);
const yKeraL = getLocalY(0, 1300, 100, 250, 150, 150, 320, 0.78);
const yCornL = getLocalY(0, 1300, 100, 250, 150, 150, 200, 0.78);

svg23_2 += `
        <!-- Right side -->
        ${drawTriangularRing(850, yDinaR, 45, 20, '#FF8C00', '#D32F2F')}
        <text x="850" y="${yDinaR - 35}" fill="#D32F2F" font-family="${font}" font-size="14" font-weight="bold" text-anchor="middle">Ferrara 3.5</text>
        <line x1="875" y1="${yDinaR - 10}" x2="930" y2="${yDinaR - 10}" stroke="#0288D1" stroke-width="4" marker-end="url(#arrowB3)"/>

        ${drawTriangularRing(980, yKeraR, 45, 20, '#FF8C00', '#F57C00')}
        <text x="980" y="${yKeraR - 35}" fill="#F57C00" font-family="${font}" font-size="14" font-weight="bold" text-anchor="middle">Ferrara 5.0</text>
        <line x1="1000" y1="${yKeraR - 10}" x2="1050" y2="${yKeraR - 10}" stroke="#0288D1" stroke-width="4" marker-end="url(#arrowB3)"/>

        ${drawFusiformRing(1100, yCornR, 45, 30, '#FF8C00', '#7B1FA2')}
        <text x="1100" y="${yCornR - 40}" fill="#7B1FA2" font-family="${font}" font-size="12" font-weight="bold" text-anchor="middle">Ferrara HM 6.0</text>
        <line x1="1125" y1="${yCornR - 15}" x2="1165" y2="${yCornR - 15}" stroke="#0288D1" stroke-width="4" marker-end="url(#arrowB3)"/>

        <!-- Left side -->
        ${drawTriangularRing(450, yDinaL, 45, 20, '#FF8C00', '#D32F2F')}
        <line x1="425" y1="${yDinaL - 10}" x2="370" y2="${yDinaL - 10}" stroke="#0288D1" stroke-width="4" marker-end="url(#arrowB3)"/>

        ${drawTriangularRing(320, yKeraL, 45, 20, '#FF8C00', '#F57C00')}
        <line x1="300" y1="${yKeraL - 10}" x2="250" y2="${yKeraL - 10}" stroke="#0288D1" stroke-width="4" marker-end="url(#arrowB3)"/>

        ${drawFusiformRing(200, yCornL, 45, 30, '#FF8C00', '#7B1FA2')}
        <line x1="175" y1="${yCornL - 15}" x2="135" y2="${yCornL - 15}" stroke="#0288D1" stroke-width="4" marker-end="url(#arrowB3)"/>

        <!-- IOP Arrows pushing up against endo -->
        <line x1="650" y1="${getLocalY(0, 1300, 100, 250, 150, 150, 650, 1) + 60}" x2="650" y2="${getLocalY(0, 1300, 100, 250, 150, 150, 650, 1) + 10}" stroke="#FDD835" stroke-width="4" marker-end="url(#arrowY2)"/>
        <line x1="500" y1="${getLocalY(0, 1300, 100, 250, 150, 150, 500, 1) + 60}" x2="500" y2="${getLocalY(0, 1300, 100, 250, 150, 150, 500, 1) + 10}" stroke="#FDD835" stroke-width="4" marker-end="url(#arrowY2)"/>
        <line x1="800" y1="${getLocalY(0, 1300, 100, 250, 150, 150, 800, 1) + 60}" x2="800" y2="${getLocalY(0, 1300, 100, 250, 150, 150, 800, 1) + 10}" stroke="#FDD835" stroke-width="4" marker-end="url(#arrowY2)"/>
        
        <text x="650" y="340" fill="#F9A825" font-family="${font}" font-size="18" font-weight="bold" text-anchor="middle">IOP (+Z)</text>

        <!-- Blocked Zone Label -->
        <rect x="450" y="-10" width="400" height="40" rx="5" fill="#E8F5E9" stroke="#2E7D32" stroke-width="3"/>
        <text x="650" y="17" fill="#2E7D32" font-family="${font}" font-size="20" font-weight="bold" text-anchor="middle">BLOCKED ZONE | Progression = 0</text>
    </g>

    <g transform="translate(1480, 420)">
        <text x="0" y="0" fill="#FFAA00" font-family="${font}" font-size="14" font-style="italic">Epithelium</text>
        <text x="0" y="20" fill="#8D6E63" font-family="${font}" font-size="14" font-style="italic">Bowman</text>
        <text x="0" y="60" fill="#EDD9A3" font-family="${font}" font-size="14" font-style="italic">Stroma</text>
        <text x="0" y="80" fill="#EDD9A3" font-family="${font}" font-size="12" font-style="italic">75%</text>
        <text x="0" y="120" fill="#9E9E9E" font-family="${font}" font-size="14" font-style="italic">Endothelium</text>
    </g>

    <text x="800" y="720" fill="#667788" font-family="${font}" font-size="16" font-style="italic" text-anchor="middle">Three concentric rows of PMMA create a structural corset. VR (blue) = centrifugal. IOP (yellow) intercepted before reaching the apex. Sweet Spot: 70-75%.</text>
</svg>`;
saveSvg('Figura_23.2_PMMA_Corset.svg', svg23_2);

console.log('All 5 SVGs generated successfully with deep geometrical precision (Revised Fig 22.2 + Ferrara brand only)!');
