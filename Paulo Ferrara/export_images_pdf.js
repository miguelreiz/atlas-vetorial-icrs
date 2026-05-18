const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets');
const OUT = path.join(__dirname, 'pdf_output');

const images = [
  { file: 'slit_lamp_1_anon.jpg', title: 'Biomicroscopia - Anel Ferrara HM (OE)' },
  { file: 'slit_lamp_2_anon.jpg', title: 'Biomicroscopia - Anel Ferrara HM (OD)' },
  { file: 'pentacam_compare_ceratocone_anon.jpg', title: 'Pentacam Compare - Ceratocone (OD)' },
  { file: 'pentacam_compare_miopia_anon.jpg', title: 'Pentacam Compare - Miopia (OS)' },
  { file: 'scheimpflug_ring_anon.jpg', title: 'Scheimpflug - Anel HM In Situ' },
  { file: 'noelma_pre_4maps_anon.jpg', title: '4 Maps Refrativo - Pre-operatorio' },
  { file: 'noelma_post_4maps_anon.jpg', title: '4 Maps Refrativo - Pos-operatorio' },
];

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const img of images) {
    const imgPath = path.join(ASSETS, img.file);
    if (!fs.existsSync(imgPath)) { console.log('SKIP:', img.file); continue; }

    const pdfName = img.file.replace('.jpg', '.pdf');
    const html = `<!DOCTYPE html><html><head><style>
      *{margin:0;padding:0}
      body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#fff;font-family:Arial,sans-serif}
      img{max-width:95%;max-height:85vh;object-fit:contain}
      .title{font-size:14px;color:#333;margin:12px 0 8px;font-weight:600}
      .footer{font-size:9px;color:#999;margin-top:8px}
    </style></head><body>
      <div class="title">${img.title}</div>
      <img src="file:///${imgPath.replace(/\\/g, '/')}">
      <div class="footer">Dr. Paulo Ferrara — Ferrara Ophthalmics — BRASCRS 2026</div>
    </body></html>`;

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.pdf({
      path: path.join(OUT, pdfName),
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });
    const sz = Math.round(fs.statSync(path.join(OUT, pdfName)).size / 1024);
    console.log(`✓ ${pdfName} (${sz} KB)`);
    await page.close();
  }

  await browser.close();
  console.log('\n✓ Todas as imagens salvas como PDF em:', OUT);
}

main().catch(console.error);
