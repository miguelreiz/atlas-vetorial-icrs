const fs = require('fs');
const path = require('path');

const chDir = path.join(process.cwd(), 'chapters', 'pt_br');
const files = fs.readdirSync(chDir).filter(f => f.endsWith('.md'));

const searchFiles = ['CH-008', 'CH-009', 'CH-010', 'CH-011', 'CH-014'];

for (let file of files) {
    if (searchFiles.some(prefix => file.startsWith(prefix))) {
        const content = fs.readFileSync(path.join(chDir, file), 'utf8');
        const lines = content.split('\n');
        console.log(`\n=== Imagens em ${file} ===`);
        for (let line of lines) {
            if (line.includes('![') || line.toLowerCase().includes('figura')) {
                console.log(line.trim());
            }
        }
    }
}
