const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  // Get HTML
  const html = (await download('https://ferrararing.com.br')).toString();
  
  // Find all image URLs
  const re = /src=["']([^"']+\.(png|svg|webp|jpg|jpeg))/gi;
  let m;
  const imgs = [];
  while ((m = re.exec(html)) !== null) {
    imgs.push(m[1]);
  }
  console.log('All images found:');
  imgs.forEach(i => console.log('  ', i));
  
  // Find logo specifically
  const logoImgs = imgs.filter(i => i.toLowerCase().includes('logo') || i.toLowerCase().includes('ferrara'));
  console.log('\nPotential logos:');
  logoImgs.forEach(i => console.log('  ', i));
  
  // Download first logo candidate
  if (logoImgs.length > 0) {
    let logoUrl = logoImgs[0];
    if (!logoUrl.startsWith('http')) logoUrl = 'https://ferrararing.com.br' + (logoUrl.startsWith('/') ? '' : '/') + logoUrl;
    console.log('\nDownloading:', logoUrl);
    try {
      const buf = await download(logoUrl);
      const ext = path.extname(logoUrl).split('?')[0] || '.png';
      const outPath = path.join(__dirname, 'assets', 'ferrara_logo' + ext);
      fs.writeFileSync(outPath, buf);
      console.log('Saved to:', outPath, '(' + buf.length + ' bytes)');
    } catch(e) {
      console.log('Download failed:', e.message);
    }
  }
}

main().catch(console.error);
