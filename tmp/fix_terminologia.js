const fs = require('fs');
const path = require('path');

const chDir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(chDir).filter(f => f.endsWith('.md'));

for (let file of files) {
    const fPath = path.join(chDir, file);
    let content = fs.readFileSync(fPath, 'utf8');

    // Editorial Fibrillar Policy
    content = content.replace(/\b(rompem|rompimento|ruptura)\b/g, 'deslizamento/reorganização');
    
    // Arc Shortening Policy
    // Only replace if not already followed by (encurtamento
    // Let's use a regex that matches "arc-shortening" not followed by "(encurtamento"
    // To be safe, we just blindly replace isolated occurrences.
    // Or simpler: replace 'arc-shortening' with 'arc-shortening' and then a fixed global cleanup, but we can do:
    content = content.replace(/arc-shortening(?! \(encurtamento do arco\))/gi, 'arc-shortening (encurtamento do arco)');
    
    // First person policy -> 3rd person plural / impersonal
    if(file === 'CH-000_Prefacio.md') {
       content = content.replace(/\beu\b/gi, 'nós');
       content = content.replace(/\bme\b/gi, 'nos');
       content = content.replace(/\baprendi\b/gi, 'aprendemos');
       content = content.replace(/\bprecisei\b/gi, 'precisamos');
       content = content.replace(/\bmeu\b/gi, 'nosso');
       content = content.replace(/\bminha\b/gi, 'nossa');
    }

    fs.writeFileSync(fPath, content);
}
console.log('Terminologia e Fibrillar Policy aplicadas em todos os capítulos!');
