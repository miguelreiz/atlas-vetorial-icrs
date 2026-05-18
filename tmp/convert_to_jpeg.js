const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inDir = path.join('c:', 'Users', 'Miguel Reis', 'Documents', 'Vetores corneanos', 'Jordana imagens', 'English_SVGs');
const outDir = path.join('c:', 'Users', 'Miguel Reis', 'Documents', 'Vetores corneanos', 'Jordana imagens', 'English_JPEGs');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
}

const files = fs.readdirSync(inDir).filter(f => f.endsWith('.svg'));

async function convertAll() {
    for (const file of files) {
        const inFile = path.join(inDir, file);
        const outFile = path.join(outDir, file.replace('.svg', '.jpeg'));
        
        try {
            await sharp(inFile)
                .flatten({ background: '#FFFFFF' }) // Set white background
                .jpeg({ quality: 95 })
                .toFile(outFile);
            console.log(`Converted ${file} to JPEG`);
        } catch (e) {
            console.error(`Error converting ${file}:`, e.message);
        }
    }
    console.log('Conversion complete!');
}

convertAll();
