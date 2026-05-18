const fs = require('fs');
const path = require('path');

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
console.log(svgFiles.length);
