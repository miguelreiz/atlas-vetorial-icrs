const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = path.resolve(__dirname);
const PDF_DIR = path.join(BASE, 'pdf_output');
if (!fs.existsSync(PDF_DIR)) fs.mkdirSync(PDF_DIR, { recursive: true });

const files = [
  'folder_variacao_A.html',
  'folder_variacao_B.html',
  'folder_variacao_C.html',
  'folder_variacao_A_EN.html',
  'folder_variacao_B_EN.html',
  'folder_variacao_C_EN.html',
];

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  for (const file of files) {
    const filePath = path.join(BASE, file);
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP: ${file} not found`);
      continue;
    }
    
    const pdfName = file.replace('.html', '.pdf');
    console.log(`\nGenerating: ${pdfName}...`);
    
    const page = await browser.newPage();
    await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for images
    await new Promise(r => setTimeout(r, 2000));
    
    await page.pdf({
      path: path.join(PDF_DIR, pdfName),
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });
    
    const size = fs.statSync(path.join(PDF_DIR, pdfName)).size;
    console.log(`  ✓ ${pdfName} (${Math.round(size / 1024)} KB)`);
    
    await page.close();
  }
  
  await browser.close();
  console.log(`\n✓ All ${files.length} PDFs saved to: ${PDF_DIR}`);
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
