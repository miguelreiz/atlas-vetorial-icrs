const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const files = [
  'folder_variacao_A.html',
  'folder_variacao_B.html', 
  'folder_variacao_C.html',
  'folder_variacao_A_EN.html',
  'folder_variacao_B_EN.html',
  'folder_variacao_C_EN.html',
];

// PT replacements
const ptReplacements = [
  ['perfil triangular preservado', 'perfil fusiforme preservado'],
  ['Perfil Triangular Exclusivo', 'Perfil Fusiforme Exclusivo'],
  ['Perfil Triangular', 'Perfil Fusiforme'],
  ['com perfil triangular preservado', 'com perfil fusiforme preservado'],
  ['Efeito de tenting superior com redistribuição de tensões estromais otimizada. Maior vetor radial (VR) por unidade de espessura.',
   'Design fusiforme (spindle-shaped) exclusivo com distribuição de pressão otimizada. Arco de 320° e diâmetro de 5.7 mm para máxima cobertura.'],
  ['Efeito de tenting superior. Maior vetor radial por espessura de anel.',
   'Design fusiforme exclusivo com distribuição de pressão otimizada. Arco 320° e diâmetro 5.7 mm.'],
  ['Tenting superior. Maior VR por espessura.',
   'Fusiforme exclusivo. Arco 320°, Ø 5.7 mm.'],
];

// EN replacements
const enReplacements = [
  ['Triangular profile preserved', 'Fusiform profile preserved'],
  ['triangular profile', 'fusiform profile'],
  ['Exclusive Triangular Profile', 'Exclusive Fusiform Profile'],
  ['Triangular Profile', 'Fusiform Profile'],
  ['with preserved triangular profile', 'with preserved fusiform profile'],
  ['Superior tenting effect with optimized stromal stress redistribution. Greater radial vector (RV) per thickness unit.',
   'Exclusive fusiform (spindle-shaped) design with optimized pressure distribution. 320° arc length and 5.7 mm diameter for maximum coverage.'],
  ['Superior tenting effect. Greater radial vector per ring thickness.',
   'Exclusive fusiform design with optimized pressure distribution. 320° arc, 5.7 mm diameter.'],
  ['Superior tenting. Greater RV per thickness.',
   'Exclusive fusiform. 320° arc, Ø 5.7 mm.'],
];

// Also change emoji from triangle to ring
const emojiReplace = ['🔺', '💎'];

let totalChanges = 0;

files.forEach(file => {
  const fp = path.join(BASE, file);
  if (!fs.existsSync(fp)) return;
  
  let html = fs.readFileSync(fp, 'utf8');
  let changes = 0;
  
  const isEN = file.includes('_EN');
  const reps = isEN ? enReplacements : ptReplacements;
  
  for (const [from, to] of reps) {
    if (html.includes(from)) {
      html = html.split(from).join(to);
      changes++;
    }
  }
  
  // Fix emoji for the profile card only (first occurrence near Perfil)
  if (html.includes(emojiReplace[0])) {
    html = html.replace(emojiReplace[0], emojiReplace[1]);
    changes++;
  }
  
  fs.writeFileSync(fp, html);
  console.log(`${file}: ${changes} corrections`);
  totalChanges += changes;
});

console.log(`\nTotal: ${totalChanges} corrections across ${files.length} files`);
