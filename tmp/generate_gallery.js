const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, '..', 'chapters', 'pt_br');
const files = fs.readdirSync(chaptersDir).filter(f => f.toLowerCase().endsWith('.md')).sort();

let md = '# Galeria de Imagens do Atlas Vetorial ICRS\n\nNesta galeria você encontra todas as imagens referenciadas nos capítulos do Atlas. Se houver alguma imagem faltante, um aviso em destaque aparecerá em seu lugar.\n\n';

for (const file of files) {
    const p = path.join(chaptersDir, file);
    const content = fs.readFileSync(p, 'utf8');
    const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    const imgs = [];
    
    // Check if there are any images in this file
    while ((match = regex.exec(content)) !== null) {
        let rawPath = match[2].trim();
        // Decode URI if it has spaces
        try { rawPath = decodeURI(rawPath); } catch (e) {}
        
        let absPath = path.resolve(chaptersDir, rawPath);
        
        // Let's ensure no # appended stuff or file:///
        absPath = absPath.replace(/file:\/\/\//g, '').replace(/file:\/\//g, '');
        // On Windows, resolve already gets the C:\...
        let exists = fs.existsSync(absPath);
        
        imgs.push({ 
            caption: match[1], 
            path: absPath, 
            exists: exists, 
            orig: match[2] 
        });
    }
    
    if (imgs.length > 0) {
        md += `## Capítulo: ${file.replace('.md', '')}\n\n`;
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            const cleanCaption = img.caption.replace(/(\r\n|\n|\r)/gm, ' ').trim();
            // Important: Replace all backslashes with forward slashes for markdown compatibility.
            const formattedPath = img.path.replace(/\\/g, '/');
            
            if (img.exists) {
                // Ensure absolute path directly in the markdown
                md += `![${cleanCaption}](${formattedPath})\n`;
                md += `\n> **Legenda original:** *${cleanCaption}*\n> **Localização:** \`${img.orig}\`\n\n---\n\n`;
            } else {
                md += `> [!WARNING]\n> **IMAGEM INCORRETA OU INEXISTENTE**\n> Não foi possível encontrar a imagem no disco.\n> **Original:** \`${img.orig}\`\n> **Tentou buscar em:** \`${formattedPath}\`\n\n---\n\n`;
            }
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'gallery_output.md'), md);
console.log('Galeria gerada em tmp/gallery_output.md com ' + md.length + ' caracteres.');
