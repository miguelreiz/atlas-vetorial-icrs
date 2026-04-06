const path = require('path');
const fs = require('fs');
const docx = require(path.join(__dirname, 'node_modules', 'docx', 'build', 'index.cjs'));
const { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType } = docx;

const ROOT = path.join(__dirname, '..', '..', '..', '..');
const imgPath = path.join(ROOT, 'images', 'generated', 'cornea_cross_section_pt_1771790895116.png');

console.log('Image path:', imgPath);
console.log('Exists:', fs.existsSync(imgPath));

const data = fs.readFileSync(imgPath);
console.log('Size:', data.length, 'bytes');
console.log('Header hex:', data.slice(0, 8).toString('hex'));
console.log('Is PNG:', data[0] === 0x89 && data[1] === 0x50);

// Test with Uint8Array (some versions need this)
const uint8 = new Uint8Array(data);

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ children: [new TextRun({ text: 'TEST - Imagem abaixo:', bold: true, size: 28 })] }),
      new Paragraph({
        children: [
          new ImageRun({ data: uint8, transformation: { width: 400, height: 300 }, type: 'png' })
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ children: [new TextRun({ text: 'FIM DO TESTE', bold: true, size: 28 })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  const outPath = path.join(ROOT, 'chapters', 'word_output', 'TEST_IMAGE.docx');
  fs.writeFileSync(outPath, buf);
  console.log('✅ Test doc saved:', (buf.length / 1024).toFixed(1), 'KB at', outPath);
}).catch(e => {
  console.error('❌ Error:', e.message);
  console.error(e.stack);
});
