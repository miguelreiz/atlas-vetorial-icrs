const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname);
const OUT = path.join(BASE, 'assets');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

async function anonymizeAndCrop(inputPath, outputName, cropTop = 60) {
  const meta = await sharp(inputPath).metadata();
  const cropped = await sharp(inputPath)
    .extract({ left: 0, top: cropTop, width: meta.width, height: meta.height - cropTop })
    .jpeg({ quality: 85 })
    .toFile(path.join(OUT, outputName));
  console.log(`  ✓ ${outputName} (${cropped.width}x${cropped.height})`);
  return path.join(OUT, outputName);
}

async function toBase64(filePath) {
  const buf = fs.readFileSync(filePath);
  return 'data:image/jpeg;base64,' + buf.toString('base64');
}

async function main() {
  console.log('=== Anonimizando imagens ===\n');

  // 1. Slit-lamp photos (crop top-left text "01 L routine" / "01 R routine")
  console.log('Fotos slit-lamp:');
  const slitFolder = path.join(BASE, 'Folder Biotechnology BRASCRS 2026');
  await anonymizeAndCrop(
    path.join(slitFolder, 'EDUARDO DE SOUZA SILVA DORNELA 0101L.jpg'),
    'slit_lamp_1_anon.jpg', 40
  );
  await anonymizeAndCrop(
    path.join(slitFolder, 'ELAINE CRISTINA CORDEIRO 0101R.jpg'),
    'slit_lamp_2_anon.jpg', 40
  );

  // 2. Pentacam Compare 2 Exams — Noelma (most impactful keratoconus case)
  console.log('\nPentacam Compare (Ceratocone):');
  const noelmaFolder = path.join(slitFolder, 'Ceratocone', 'Noelma');
  await anonymizeAndCrop(
    path.join(noelmaFolder, 'Bandeira Rocha_Noelma_OD_Compare 2 Exams.JPG'),
    'pentacam_compare_ceratocone_anon.jpg', 60
  );

  // 3. Pentacam Compare — Isabella (miopia case with dramatic flattening)
  console.log('\nPentacam Compare (Miopia):');
  const isabellaFolder = path.join(slitFolder, 'Miopia', 'Isabella');
  await anonymizeAndCrop(
    path.join(isabellaFolder, 'Bernardes Carvalho_Isabella_OS_Compare 2 Exams.JPG'),
    'pentacam_compare_miopia_anon.jpg', 60
  );

  // 4. Scheimpflug with ring
  console.log('\nScheimpflug:');
  const alineFolder = path.join(slitFolder, 'Miopia', 'Aline');
  await anonymizeAndCrop(
    path.join(alineFolder, 'Do Carmo Peixoto Neves_Aline_OS_06052026_103048_Scheimpf Images.JPG'),
    'scheimpflug_ring_anon.jpg', 80
  );

  // 5. Noelma 4-Maps pre and post
  console.log('\n4-Maps:');
  await anonymizeAndCrop(
    path.join(noelmaFolder, 'Bandeira Rocha_Noelma_OD_01082011_164102_4 Maps Refr.JPG'),
    'noelma_pre_4maps_anon.jpg', 60
  );
  await anonymizeAndCrop(
    path.join(noelmaFolder, 'Bandeira Rocha_Noelma_OD_18102023_135024_4 Maps Refr.JPG'),
    'noelma_post_4maps_anon.jpg', 60
  );

  // Generate base64 JSON for embedding in HTML
  console.log('\n=== Gerando base64 para embed ===');
  const images = {};
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.jpg'));
  for (const f of files) {
    images[f.replace('.jpg', '')] = await toBase64(path.join(OUT, f));
    console.log(`  ✓ ${f} → base64 (${Math.round(fs.statSync(path.join(OUT, f)).size / 1024)}KB)`);
  }
  fs.writeFileSync(path.join(OUT, 'images_base64.json'), JSON.stringify(images));
  console.log(`\n✓ images_base64.json salvo (${Object.keys(images).length} imagens)`);
}

main().catch(console.error);
