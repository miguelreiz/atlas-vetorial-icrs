const fs = require('fs');
const path = require('path');

const chDir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(chDir).filter(f => f.endsWith('.md'));

let changesCount = 0;

files.forEach(file => {
    let filePath = path.join(chDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Pattern: matches markdown images ending with .png
    // e.g. ![Caption](../../images/CH-X/fig.png)
    const imgRegex = /!\[([^\]]*)\]\(([^)]+\.png)\)/g;
    
    let modified = content.replace(imgRegex, (match, caption, imgPath) => {
        // imgPath is something like ../../images/CH-006_VT/Figure_6.1.png
        let absoluteImgPath = path.resolve(chDir, imgPath);
        let svgPath = absoluteImgPath.replace(/\.png$/, '.svg');
        
        if (fs.existsSync(svgPath)) {
            changesCount++;
            return `![${caption}](${imgPath.replace(/\.png$/, '.svg')})`;
        }
        return match;
    });

    if (content !== modified) {
        fs.writeFileSync(filePath, modified, 'utf-8');
        console.log(`Atualizou PNG para SVG em: ${file}`);
    }
});

console.log(`Total de referências PNG atualizadas para SVG que existiam no disco: ${changesCount}`);
