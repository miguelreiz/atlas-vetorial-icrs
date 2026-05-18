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
  const assets = path.join(__dirname, 'assets');
  const urls = [
    ['https://ferrararing.com.br/wp-content/uploads/2021/01/aneldeferrara-icone-amareloduplo.png', 'ferrara_icon_gold.png'],
    ['https://ferrararing.com.br/wp-content/uploads/2021/02/ferrararing-rodape-250x75-1-200x60.png', 'ferrararing_logo.png'],
    ['https://ferrararing.com.br/wp-content/uploads/2021/07/ANELDEFERRARA-caixa-4.png', 'ferrara_ring_box.png'],
  ];
  for (const [url, name] of urls) {
    try {
      const buf = await download(url);
      fs.writeFileSync(path.join(assets, name), buf);
      console.log('OK:', name, buf.length, 'bytes');
    } catch(e) { console.log('FAIL:', name, e.message); }
  }
}
main().catch(console.error);
