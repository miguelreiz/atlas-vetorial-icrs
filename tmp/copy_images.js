const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\Miguel Reis\\.gemini\\antigravity\\brain\\446e9a33-bf62-4e9a-934f-c22e6c2baf65\\artifacts';
fs.mkdirSync(artifactsDir, {recursive: true});

const chaptersDir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md')).sort();

let md = '# Galeria de Imagens do Atlas Vetorial ICRS\n\nNesta galeria você encontra todas as imagens compiladas direto dos arquivos Markdown!\n\n';
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
            fs.copyFileSync(absPath, outPath);
            imgs.push({caption: match[1], path: outPath, orig: match[2]});
        }
    }
    
    if (imgs.length > 0) {
        md += `## Capítulo: ${file}\n\n`;
        imgs.forEach(img => {
            const clean = img.caption.replace(/(\r\n|\n|\r)/gm, ' ').trim();
            md += `![${clean}](${img.path.replace(/\\/g, '/')})\n\n`;
            md += `> **Legenda original:** *${clean}*\n\n---\n\n`;
        });
    }
}

fs.writeFileSync('tmp/galeria_artifact.md', md);
console.log('Copied ' + counter + ' images!');
