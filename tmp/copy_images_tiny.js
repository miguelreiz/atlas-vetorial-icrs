const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\Miguel Reis\\.gemini\\antigravity\\brain\\446e9a33-bf62-4e9a-934f-c22e6c2baf65\\artifacts';
const chaptersDir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md')).sort();

let md = '# Galeria de Imagens do Atlas Vetorial ICRS\n\nRevise as imagens extraídas dos capítulos (Total: 76 imagens representadas).\n\n';
let counter = 0;

for (const file of files) {
    const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
    const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    const imgs = [];
    
    while ((match = regex.exec(content)) !== null) {
        let absPath = path.resolve(chaptersDir, match[2].trim());
        absPath = absPath.replace(/file:\/\/\//g, '').replace(/file:\/\//g, '');
        try { absPath = decodeURI(absPath) } catch(e) {}
        
        if (fs.existsSync(absPath)) {
            const ext = path.extname(absPath);
            const outName = 'galeria_img_' + (++counter) + ext;
            const outPath = path.join(artifactsDir, outName);
            // Notice: file was already copied in previous step, but we will re-copy just in case
            fs.copyFileSync(absPath, outPath);
            imgs.push({caption: match[1], path: outPath, orig: match[2]});
        }
    }
    
    if (imgs.length > 0) {
        md += `## ${file}\n\n`;
        md += `\`\`\`carousel\n`;
        imgs.forEach((img, index) => {
            if(index > 0) md += `<!-- slide -->\n`;
            const clean = img.caption.replace(/(\r\n|\n|\r)/gm, ' ').trim();
            md += `![${clean}](file:///${img.path.replace(/\\/g, '/')})\n`;
        });
        md += `\`\`\`\n\n`;
    }
}

fs.writeFileSync('tmp/galeria_tiny.md', md);
console.log('Saved tiny gallery, size: ' + md.length);
