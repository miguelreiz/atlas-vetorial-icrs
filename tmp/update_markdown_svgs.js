const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let totalReplacements = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Matches: ](../../images/<path>/<name>.png)
    const regex = /\]\(([^)]+\.png)\)/g;
    
    content = content.replace(regex, (match, imagePath) => {
        // Resolve real path of the PNG
        const dirRel = path.dirname(imagePath); // e.g. ../../images/CH-001...
        const baseName = path.basename(imagePath, '.png'); // e.g. Figura_3.1
        const svgRelPath = path.join(dirRel, baseName + '.svg');
        
        // Resolve absolute absolute to check existence
        // imagePath is relative to the markdown file folder (`chapters/pt_br/`)
        const absoluteSvgPath = path.resolve(dir, svgRelPath);
        
        if (fs.existsSync(absoluteSvgPath)) {
            console.log(`[+] Substituindo em ${file}: ${baseName}.png -> .svg`);
            modified = true;
            totalReplacements++;
            return `](${svgRelPath})`;
        } else {
            // Check if there is an SVG without the timestamp suffix (e.g. cascata_1772.png -> cascata.svg)
            // Some names have _177... suffix
            const cleanBaseName = baseName.replace(/_\d{13}$/, '');
            const cleanSvgRelPath = path.join(dirRel, cleanBaseName + '.svg');
            const cleanSvgAbsPath = path.resolve(dir, cleanSvgRelPath);
            if (fs.existsSync(cleanSvgAbsPath)) {
                console.log(`[+] Substituindo sufixo em ${file}: ${baseName}.png -> ${cleanBaseName}.svg`);
                modified = true;
                totalReplacements++;
                return `](${cleanSvgRelPath})`;
            }
        }
        return match; // keep original
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

console.log(`\nRevisão Concluída! Total de imagens atualizadas de PNG para SVG: ${totalReplacements}`);
