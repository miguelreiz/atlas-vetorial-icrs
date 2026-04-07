const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  try {
    fs.readdirSync(dir).forEach(f => {
      let dirPath = path.join(dir, f);
      try {
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
      } catch (e) {}
    });
  } catch (e) {}
}

let count = 0;
walkDir(path.join(process.cwd(), 'images'), function(filePath) {
  if (filePath.endsWith('.svg')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove 'filter="..."' attribute from anywhere
    content = content.replace(/\s?filter="url\([^)]+\)"/g, '');
    content = content.replace(/\s?filter="[^"]*"/g, '');
    
    // Remove multi-line <filter> to </filter> blocks
    content = content.replace(/<filter[\s\S]*?<\/filter>/g, '');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
      console.log('Stripped filters from:', filePath);
    }
  }
});

console.log('Total de SVGs corrigidos para compatibilidade com o Word:', count);
