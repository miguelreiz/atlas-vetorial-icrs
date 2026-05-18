const fs = require('fs');
const path = require('path');
const sharp = require(path.join(process.cwd(), '.agent', 'skills', 'word_export_cultura_medica', 'scripts', 'node_modules', 'sharp'));

function getFiles(dir){ 
    let results=[]; 
    if(!fs.existsSync(dir)) return results;
    fs.readdirSync(dir).forEach(f=>{ 
        let file=path.join(dir,f); 
        if(fs.statSync(file).isDirectory()){
            results = results.concat(getFiles(file));
        }else{
            results.push(file);
        } 
    }); 
    return results; 
}; 

const svgFiles = getFiles(path.join(process.cwd(), 'images')).filter(f=>f.endsWith('.svg'));

(async () => {
    console.log(`Convertendo ${svgFiles.length} arquivos SVG para PNG...`);
    for (let file of svgFiles) {
        let pngFile = file.replace(/\.svg$/, '.png');
        try {
            await sharp(file)
                .png()
                .toFile(pngFile);
            console.log(" Convertido:", path.basename(pngFile));
        } catch (e) {
            console.error(" [ERRO] Falha ao converter:", file, e.message);
        }
    }
    console.log("Conversão concluída!");
})();
