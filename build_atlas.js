/**
 * Atlas Vetorial ICRS — Build Script
 * Compila todos os capítulos .md em um único HTML estilizado
 * Uso: node build_atlas.js
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, 'chapters', 'pt');
const IMAGES_DIR = path.join(__dirname, 'images');
const OUTPUT = path.join(__dirname, 'atlas_vetorial_icrs.html');

// Ordem dos capítulos
const CHAPTER_ORDER = [
    'P1-01_Placido_Revelam.md',
    'P1-02_Padroes_Deformacao.md',
    'P1-03_Padrao_ao_Vetor.md',
    'CH-001_Anatomia_Corneana.md',
    'CH-002_Biomecanica_Aneis.md',
    'CH-003_Classificacao_Ceratocone.md',
    'CH-004_VR_Vetor_Radial.md',
    'CH-005_VT_Vetor_Tangencial.md',
    'CH-006_Vt_Vetor_Torque.md',
    'CH-007_VComa_Deslocamento_Optico.md',
    'CH-008_LDM_A_Lei_do_Disco_Mecanico.md',
    'CH-009_VEsferico_Soma_Vetorial.md',
    'CH-010_Nomogramas_Vetoriais.md',
    'CH-011_Casos_Clinicos.md',
    'CH-012_Complicacoes_Manejo.md',
    'CH-013_Futuro_Aneis.md',
];

// Converter imagem para base64
function imageToBase64(imgPath) {
    try {
        // Tentar caminho relativo ao projeto
        let fullPath = path.join(__dirname, imgPath);
        if (!fs.existsSync(fullPath)) {
            // Tentar caminho absoluto direto
            fullPath = imgPath;
        }
        if (!fs.existsSync(fullPath)) return null;
        const data = fs.readFileSync(fullPath);
        const ext = path.extname(fullPath).slice(1);
        return `data:image/${ext};base64,${data.toString('base64')}`;
    } catch { return null; }
}

// Converter Markdown simplificado para HTML
function mdToHtml(md, chapterFile) {
    let html = md;

    // Remover blocos yaml de metadados
    html = html.replace(/```yaml[\s\S]*?```/g, (match) => {
        if (match.includes('chapter_id') || match.includes('vector_type') || match.includes('references')) {
            return `<div class="meta-block"><pre>${match.replace(/```yaml\n?/, '').replace(/\n?```/, '')}</pre></div>`;
        }
        return `<pre class="code-block">${match.replace(/```yaml\n?/, '').replace(/\n?```/, '')}</pre>`;
    });

    // Blocos de código genéricos
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="code-block">$1</pre>');

    // Imagens — converter para base64 inline
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        // Normalizar caminhos
        let imgSrc = src.replace(/\\/g, '/');

        // Tentar encontrar a imagem
        let base64 = imageToBase64(src);
        if (!base64) base64 = imageToBase64(src.replace(/\\/g, '/'));
        if (!base64) {
            // Tentar caminho relativo
            const relPath = imgSrc.replace(/^.*?images\//, 'images/');
            base64 = imageToBase64(relPath);
        }

        if (base64) {
            return `<figure class="atlas-figure"><img src="${base64}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`;
        }
        return `<figure class="atlas-figure atlas-figure--missing"><figcaption>📷 ${alt}</figcaption></figure>`;
    });

    // Headers
    html = html.replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>');
    // Merge consecutive blockquotes
    html = html.replace(/<\/blockquote>\s*<blockquote>/g, '<br>');

    // Bold + Italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Tables
    html = html.replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => /^[\s:-]+$/.test(c))) return '<!--separator-->';
        return cells.map(c => `<td>${c.trim()}</td>`).join('');
    });
    // Wrap table rows
    html = html.replace(/((<td>.*?<\/td>)+)/g, '<tr>$1</tr>');
    // Group into tables
    html = html.replace(/(<tr>[\s\S]*?<\/tr>)\s*<!--separator-->\s*(<tr>[\s\S]*?)(?=<[^t]|$)/g,
        (match, header, body) => {
            const headerRow = header.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
            return `<table class="atlas-table"><thead>${headerRow}</thead><tbody>${body}</tbody></table>`;
        }
    );

    // Lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ol">$1</li>');
    html = html.replace(/^[-•]\s+(.+)$/gm, '<li class="ul">$1</li>');

    // Horizontal rules
    html = html.replace(/^---+$/gm, '<hr class="chapter-divider">');

    // Paragraphs — wrap loose text
    html = html.replace(/^(?!<[hblutfp]|<\/)(.+)$/gm, (match, text) => {
        if (text.trim() === '' || text.startsWith('<!--')) return text;
        return `<p>${text}</p>`;
    });

    // Pipeline status line
    html = html.replace(/<p>\*Pipeline Status:.*?\*<\/p>/g, '');

    return html;
}

// Gerar índice
function generateTOC(chapters) {
    let toc = '<nav class="toc"><h2>Índice do Atlas</h2><div class="toc-grid">';

    toc += '<div class="toc-part"><h3>Parte I — O Problema</h3><ul>';
    chapters.filter(c => c.file.startsWith('P1')).forEach(c => {
        toc += `<li><a href="#${c.id}">${c.title}</a></li>`;
    });
    toc += '</ul></div>';

    toc += '<div class="toc-part"><h3>Parte II — A Mecânica</h3><ul>';
    chapters.filter(c => c.file.startsWith('CH-00')).forEach(c => {
        toc += `<li><a href="#${c.id}">${c.title}</a></li>`;
    });
    toc += '</ul></div>';

    toc += '<div class="toc-part"><h3>Parte III — A Prática</h3><ul>';
    chapters.filter(c => c.file.startsWith('CH-01')).forEach(c => {
        toc += `<li><a href="#${c.id}">${c.title}</a></li>`;
    });
    toc += '</ul></div>';

    toc += '</div></nav>';
    return toc;
}

// Build principal
function build() {
    console.log('🔨 Compilando Atlas Vetorial ICRS...\n');

    const chapters = [];

    for (const file of CHAPTER_ORDER) {
        const filePath = path.join(CHAPTERS_DIR, file);
        if (!fs.existsSync(filePath)) {
            console.log(`  ⚠️  Não encontrado: ${file}`);
            continue;
        }

        const md = fs.readFileSync(filePath, 'utf-8');
        const titleMatch = md.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].replace(/\r/, '') : file;
        const id = file.replace('.md', '').toLowerCase().replace(/[^a-z0-9-]/g, '-');

        const html = mdToHtml(md, file);
        chapters.push({ file, title, id, html });
        console.log(`  ✅ ${file} → ${title}`);
    }

    const toc = generateTOC(chapters);

    const chaptersHtml = chapters.map(c =>
        `<article class="chapter" id="${c.id}">
      <a href="#top" class="back-to-top">↑ Índice</a>
      ${c.html}
    </article>`
    ).join('\n<div class="page-break"></div>\n');

    const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atlas Vetorial ICRS — Anéis Intracorneanos</title>
  <meta name="description" content="O primeiro atlas que explica os anéis intracorneanos ao nível das fibras de colágeno.">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=JetBrains+Mono:wght@400;500&display=swap');
    
    :root {
      --bg: #0f0f13;
      --surface: #1a1a22;
      --surface-2: #22222e;
      --border: #2d2d3a;
      --text: #e4e4e8;
      --text-dim: #9898a8;
      --accent: #6c8cff;
      --accent-glow: rgba(108,140,255,0.15);
      --red: #ff6b6b;
      --green: #69db7c;
      --gold: #ffd43b;
      --orange: #ff922b;
      --purple: #b197fc;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html { scroll-behavior: smooth; }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
      font-size: 16px;
    }
    
    /* ===== HERO ===== */
    .hero {
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 4rem 2rem;
      background: radial-gradient(ellipse at 50% 60%, var(--accent-glow) 0%, transparent 70%);
      border-bottom: 1px solid var(--border);
    }
    
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--accent), var(--purple), var(--gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero .subtitle {
      font-size: 1.25rem;
      color: var(--text-dim);
      font-style: italic;
      max-width: 600px;
      margin-bottom: 2rem;
    }
    
    .hero .badge {
      display: inline-block;
      padding: 0.4rem 1.2rem;
      border-radius: 999px;
      border: 1px solid var(--accent);
      color: var(--accent);
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.05em;
    }
    
    /* ===== TOC ===== */
    .toc {
      max-width: 1000px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }
    
    .toc h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      margin-bottom: 2rem;
      text-align: center;
      color: var(--accent);
    }
    
    .toc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    
    .toc-part {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
    }
    
    .toc-part h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gold);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .toc-part ul { list-style: none; }
    
    .toc-part li {
      padding: 0.35rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .toc-part li:last-child { border: none; }
    
    .toc-part a {
      color: var(--text-dim);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    
    .toc-part a:hover { color: var(--accent); }
    
    /* ===== CHAPTERS ===== */
    .chapter {
      max-width: 850px;
      margin: 0 auto;
      padding: 4rem 2rem;
      position: relative;
    }
    
    .back-to-top {
      position: sticky;
      top: 1rem;
      float: right;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.3rem 0.8rem;
      color: var(--text-dim);
      text-decoration: none;
      font-size: 0.8rem;
      z-index: 10;
      transition: all 0.2s;
    }
    
    .back-to-top:hover {
      color: var(--accent);
      border-color: var(--accent);
    }
    
    .page-break {
      height: 1px;
      background: linear-gradient(to right, transparent, var(--border), transparent);
      margin: 0 auto;
      max-width: 850px;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 700;
      margin: 2rem 0 1.5rem;
      color: var(--text);
      border-bottom: 2px solid var(--accent);
      padding-bottom: 0.5rem;
    }
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 2.5rem 0 1rem;
      color: var(--accent);
    }
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 2rem 0 0.8rem;
      color: var(--gold);
    }
    
    h4 {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 1.5rem 0 0.5rem;
      color: var(--purple);
    }
    
    p {
      margin: 0.6rem 0;
      color: var(--text);
    }
    
    strong { color: #fff; font-weight: 600; }
    em { color: var(--text-dim); }
    
    /* ===== BLOCKQUOTES ===== */
    blockquote {
      border-left: 3px solid var(--accent);
      background: var(--accent-glow);
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: var(--text-dim);
    }
    
    /* ===== CODE ===== */
    .code-block, pre {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.2rem;
      margin: 1.2rem 0;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--green);
    }
    
    .meta-block {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
    }
    
    .meta-block pre {
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    
    /* ===== TABLES ===== */
    .atlas-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.9rem;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    
    .atlas-table th {
      background: var(--surface-2);
      padding: 0.8rem 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--accent);
      border-bottom: 2px solid var(--accent);
    }
    
    .atlas-table td {
      padding: 0.6rem 1rem;
      border-bottom: 1px solid var(--border);
    }
    
    .atlas-table tr:hover td {
      background: rgba(108,140,255,0.05);
    }
    
    /* Tables not yet wrapped */
    table { 
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    
    th {
      background: var(--surface-2);
      padding: 0.8rem;
      text-align: left;
      font-weight: 600;
      color: var(--accent);
    }
    
    td {
      padding: 0.6rem 0.8rem;
      border-bottom: 1px solid var(--border);
    }
    
    /* ===== FIGURES ===== */
    .atlas-figure {
      margin: 2rem 0;
      text-align: center;
    }
    
    .atlas-figure img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      border: 1px solid var(--border);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      transition: transform 0.3s;
    }
    
    .atlas-figure img:hover {
      transform: scale(1.02);
    }
    
    .atlas-figure figcaption {
      margin-top: 0.8rem;
      font-size: 0.85rem;
      color: var(--text-dim);
      font-style: italic;
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
    
    .atlas-figure--missing {
      background: var(--surface);
      border: 2px dashed var(--border);
      border-radius: 12px;
      padding: 2rem;
    }
    
    /* ===== LISTS ===== */
    li {
      margin: 0.3rem 0 0.3rem 1.5rem;
    }
    
    li.ol { list-style-type: decimal; }
    li.ul { list-style-type: disc; }
    
    /* ===== HR ===== */
    .chapter-divider {
      border: none;
      height: 1px;
      background: linear-gradient(to right, transparent, var(--border), transparent);
      margin: 2.5rem 0;
    }
    
    hr {
      border: none;
      height: 1px;
      background: var(--border);
      margin: 2rem 0;
    }
    
    /* ===== FOOTER ===== */
    .footer {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-dim);
      border-top: 1px solid var(--border);
    }
    
    .footer blockquote {
      display: inline-block;
      max-width: 600px;
      border: none;
      background: none;
      font-size: 1.1rem;
    }
    
    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .chapter { padding: 2rem 1rem; }
      .toc-grid { grid-template-columns: 1fr; }
      h1 { font-size: 1.8rem; }
    }
    
    /* ===== PRINT ===== */
    @media print {
      body { background: white; color: black; font-size: 11pt; }
      .hero { min-height: auto; background: none; }
      .hero h1 { -webkit-text-fill-color: #333; }
      .back-to-top { display: none; }
      .atlas-figure img { box-shadow: none; border: 1px solid #ccc; }
      .page-break { page-break-before: always; }
      pre, .code-block { background: #f5f5f5; color: #333; border-color: #ddd; }
      blockquote { border-color: #999; background: #f9f9f9; }
      .toc-part { border-color: #ddd; }
    }
  </style>
</head>
<body>
  <div class="hero" id="top">
    <h1>Atlas Vetorial ICRS</h1>
    <p class="subtitle">O primeiro atlas que explica os anéis intracorneanos ao nível das fibras de colágeno</p>
    <span class="badge">v0.7.0 — Framework Multi-Escala</span>
  </div>
  
  ${toc}
  
  ${chaptersHtml}
  
  <footer class="footer">
    <blockquote>
      <em>"O vetor não é uma seta desenhada sobre o mapa.<br>
      O vetor É a manifestação geométrica da tensão nas lamelas de colágeno."</em>
    </blockquote>
    <p style="margin-top: 2rem">Atlas Vetorial ICRS © Miguel Reiz — v0.7.0</p>
  </footer>
</body>
</html>`;

    fs.writeFileSync(OUTPUT, fullHtml, 'utf-8');
    const sizeMB = (fs.statSync(OUTPUT).size / (1024 * 1024)).toFixed(1);
    console.log(`\n✅ Atlas compilado → atlas_vetorial_icrs.html (${sizeMB} MB)`);
    console.log(`   ${chapters.length} capítulos processados`);
}

build();
