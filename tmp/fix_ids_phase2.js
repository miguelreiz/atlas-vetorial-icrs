const fs = require('fs');
const path = require('path');

const idsToFix = [
    { file: 'CH-011_Nomogramas_Vetoriais.md', correctId: 'CH-011' },
    { file: 'CH-012_Casos_Clinicos.md', correctId: 'CH-012' },
    { file: 'CH-013_Complicacoes_Manejo.md', correctId: 'CH-013' },
    { file: 'CH-014_Futuro_Aneis.md', correctId: 'CH-014' },
    { file: 'CH-016_Malha_Estromal_Superfície.md', correctId: 'CH-016' }
];

const chDir = path.join(process.cwd(), 'chapters', 'pt_br');

idsToFix.forEach(rule => {
    const fPath = path.join(chDir, rule.file);
    if (fs.existsSync(fPath)) {
        let content = fs.readFileSync(fPath, 'utf8');
        // Fix the yaml chapter_id
        content = content.replace(/chapter_id:\s+CH-\d{3}/, `chapter_id: ${rule.correctId}`);
        // Fix the H1 title - ensuring it aligns with the file ID
        // Because H1 usually looks like "# Capítulo 12 — Casos..." we can just regex the "# Capítulo \d+"
        const numMatch = rule.correctId.match(/\d+$/);
        if (numMatch) {
            const chapNum = parseInt(numMatch[0]);
            content = content.replace(/# Capítulo \d+/, `# Capítulo ${chapNum}`);
        }
        fs.writeFileSync(fPath, content);
        console.log(`Fixed IDs in ${rule.file}`);
    }
});
