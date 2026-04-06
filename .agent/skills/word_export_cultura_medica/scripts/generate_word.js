#!/usr/bin/env node
/**
 * generate_word.js — Gerador Word para Atlas Vetorial ICRS
 * Padrão Editorial: Editora Cultura Médica Brasil
 *
 * Uso:
 *   node generate_word.js --chapter CH-001_Anatomia_Corneana
 *   node generate_word.js --all
 *   node generate_word.js --volume-completo
 *
 * Saída: chapters/word_output/*.docx
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────
const path = require('path');
const fs = require('fs');

// Resolve node_modules relative to this script
const nodeModules = path.join(__dirname, 'node_modules');

let docx, marked;
try {
  // Use CJS entrypoint explicitly (docx v8 is ESM-first, CJS is at build/index.cjs)
  docx = require(path.join(nodeModules, 'docx', 'build', 'index.cjs'));
  marked = require(path.join(nodeModules, 'marked', 'src', 'marked.cjs'));
} catch (e) {
  try {
    docx = require(path.join(nodeModules, 'docx', 'build', 'index.cjs'));
    marked = require(path.join(nodeModules, 'marked'));
  } catch (e2) {
    console.error('\n❌ Dependências não encontradas. Execute primeiro:\n   node setup.js\n');
    console.error('   Detalhe:', e2.message);
    process.exit(1);
  }
}

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, ImageRun, Table, TableRow, TableCell,
  BorderStyle, WidthType, TableLayoutType, ShadingType,
  PageOrientation, PageSize, PageBreak, PageNumber,
  NumberFormat, convertInchesToTwip, convertMillimetersToTwip,
  Header, Footer, HorizontalPositionAlign, VerticalPositionAlign,
  TabStopPosition, TabStopType, SectionType, UnderlineType,
  ExternalHyperlink, InternalHyperlink
} = docx;

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO DE PATHS
// ─────────────────────────────────────────────────────────────────────────────
const ROOT = path.join(__dirname, '..', '..', '..', '..'); // projeto raiz
const CHAPTERS = path.join(ROOT, 'chapters', 'pt_br');
const IMAGES_DIR = path.join(ROOT, 'images');
const OUTPUT_DIR = path.join(ROOT, 'chapters', 'word_output');

// Garantir diretório de saída
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────────────────────
// PALETA CULTURA MÉDICA BRASIL
// ─────────────────────────────────────────────────────────────────────────────
const COR = {
  AZUL_ESCURO: '1B365D',
  AZUL_MEDIO: '2E5FAB',
  AZUL_CLARO: '4A7FC1',
  CINZA_CORPO: '1A1A1A',
  CINZA_CITA: '4A4A4A',
  CINZA_CODIGO: 'F5F5F5',
  BORDA_TAB: 'B0C4DE',
  TABELA_ALT: 'EEF2F7',
  TABELA_HEAD: '1B365D',
  CITA_FUNDO: 'EEF4FF',
  BRANCO: 'FFFFFF',
};

// ─────────────────────────────────────────────────────────────────────────────
// ESTILOS TIPOGRÁFICOS — CULTURA MÉDICA BRASIL
// ─────────────────────────────────────────────────────────────────────────────
const FONTE = 'Times New Roman';
const FONTE_CODE = 'Courier New';

// Tamanhos em half-points (docx usa half-points)
const SZ = {
  TITULO: 36,  // 18pt
  H2: 28,  // 14pt
  H3: 24,  // 12pt
  H4: 22,  // 11pt
  CORPO: 22,  // 11pt
  CITACAO: 21,  // 10.5pt
  LEGENDA: 18,  // 9pt
  CODIGO: 18,  // 9pt
  TABELA_H: 20,  // 10pt
  TABELA_C: 19,  // 9.5pt
};

// Margens em mm → twip
const MARGEM = {
  TOP: convertMillimetersToTwip(25),
  BOTTOM: convertMillimetersToTwip(25),
  LEFT: convertMillimetersToTwip(30),  // margem interna (espelho)
  RIGHT: convertMillimetersToTwip(20),  // margem externa
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS DE PARÁGRAFO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cria um parágrafo de título de capítulo (H1)
 */
function criarTituloCapitulo(texto) {
  return new Paragraph({
    children: [
      new TextRun({
        text: texto,
        bold: true,
        color: COR.AZUL_ESCURO,
        font: FONTE,
        size: SZ.TITULO,
      }),
    ],
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
    spacing: { before: convertMillimetersToTwip(12), after: convertMillimetersToTwip(6) },
    border: {
      bottom: { color: COR.AZUL_ESCURO, size: 12, style: BorderStyle.SINGLE, space: 3 },
    },
  });
}

/**
 * Cria um parágrafo H2
 */
function criarH2(texto) {
  return new Paragraph({
    children: [
      new TextRun({
        text: texto,
        bold: true,
        color: COR.AZUL_MEDIO,
        font: FONTE,
        size: SZ.H2,
      }),
    ],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: convertMillimetersToTwip(9), after: convertMillimetersToTwip(3) },
  });
}

/**
 * Cria um parágrafo H3
 */
function criarH3(texto) {
  return new Paragraph({
    children: [
      new TextRun({
        text: texto,
        bold: true,
        italics: true,
        color: COR.AZUL_CLARO,
        font: FONTE,
        size: SZ.H3,
      }),
    ],
    heading: HeadingLevel.HEADING_3,
    spacing: { before: convertMillimetersToTwip(6), after: convertMillimetersToTwip(2) },
  });
}

/**
 * Cria um parágrafo H4
 */
function criarH4(texto) {
  return new Paragraph({
    children: [
      new TextRun({
        text: texto,
        bold: true,
        color: COR.AZUL_ESCURO,
        font: FONTE,
        size: SZ.H4,
      }),
    ],
    heading: HeadingLevel.HEADING_4,
    spacing: { before: convertMillimetersToTwip(4), after: convertMillimetersToTwip(1) },
  });
}

/**
 * Cria um parágrafo de texto corpo com suporte a inline formatting
 */
function criarCorpo(runs, indent = 0) {
  return new Paragraph({
    children: runs,
    spacing: {
      line: 276, // ~1.15 entrelinha (240 = simples, 360 = 1.5)
      before: 0,
      after: convertMillimetersToTwip(3),
    },
    indent: indent > 0 ? { left: convertMillimetersToTwip(indent) } : undefined,
    alignment: AlignmentType.JUSTIFIED,
  });
}

/**
 * Cria um parágrafo de blockquote (call-out box)
 */
function criarBlockquote(runs) {
  return new Paragraph({
    children: runs.map(r => new TextRun({
      ...r,
      italics: true,
      color: COR.CINZA_CITA,
      size: SZ.CITACAO,
    })),
    indent: {
      left: convertMillimetersToTwip(10),
      right: convertMillimetersToTwip(10),
    },
    spacing: {
      line: 260,
      before: convertMillimetersToTwip(3),
      after: convertMillimetersToTwip(3),
    },
    border: {
      left: { color: COR.AZUL_MEDIO, size: 16, style: BorderStyle.SINGLE, space: 4 },
    },
    shading: { type: ShadingType.CLEAR, fill: COR.CITA_FUNDO },
  });
}

/**
 * Cria um parágrafo de código
 */
function criarCodigo(texto) {
  const linhas = texto.split('\n');
  return linhas.map(linha => new Paragraph({
    children: [
      new TextRun({
        text: linha,
        font: FONTE_CODE,
        size: SZ.CODIGO,
        color: COR.CINZA_CORPO,
      }),
    ],
    spacing: { before: 0, after: 0, line: 240 },
    indent: { left: convertMillimetersToTwip(5), right: convertMillimetersToTwip(5) },
    shading: { type: ShadingType.CLEAR, fill: COR.CINZA_CODIGO },
    border: {
      top: { color: 'CCCCCC', size: 4, style: BorderStyle.SINGLE },
      bottom: { color: 'CCCCCC', size: 4, style: BorderStyle.SINGLE },
      left: { color: 'CCCCCC', size: 4, style: BorderStyle.SINGLE },
      right: { color: 'CCCCCC', size: 4, style: BorderStyle.SINGLE },
    },
  }));
}

/**
 * Cria a legenda de uma figura
 */
function criarLegenda(texto) {
  // Extrair bold prefix "Figura X.Y —"
  const match = texto.match(/^(\*\*[^*]+\*\*)(.*)/);
  const runs = [];
  if (match) {
    runs.push(new TextRun({ text: match[1].replace(/\*\*/g, ''), bold: true, font: FONTE, size: SZ.LEGENDA, italics: true }));
    runs.push(new TextRun({ text: match[2], font: FONTE, size: SZ.LEGENDA, italics: true }));
  } else {
    runs.push(new TextRun({ text: texto, font: FONTE, size: SZ.LEGENDA, italics: true }));
  }
  return new Paragraph({
    children: runs,
    alignment: AlignmentType.CENTER,
    spacing: { before: convertMillimetersToTwip(2), after: convertMillimetersToTwip(6) },
    border: {
      top: { color: COR.BORDA_TAB, size: 4, style: BorderStyle.SINGLE, space: 2 },
    },
  });
}

/**
 * Linha separadora horizontal
 */
function criarSeparador() {
  return new Paragraph({
    children: [],
    border: {
      bottom: { color: COR.AZUL_ESCURO, size: 6, style: BorderStyle.SINGLE },
    },
    spacing: { before: convertMillimetersToTwip(4), after: convertMillimetersToTwip(4) },
  });
}

/**
 * Parágrafo vazio (espaçamento)
 */
function espacamento(mm = 3) {
  return new Paragraph({
    children: [],
    spacing: { before: 0, after: convertMillimetersToTwip(mm) },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSER DE INLINE MARKDOWN → TextRun[]
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converte texto com marcações inline em array de TextRun
 * Suporta: **bold**, *italic*, `code`, ***bold+italic***
 */
function parseInline(texto, baseProps = {}) {
  const runs = [];
  // Remove emojis de evidência mas mantém como texto
  let t = texto
    .replace(/\r/g, '')
    .replace(/\n/g, ' ');

  // Regex para parsing inline
  const regex = /(\*\*\*([^*]+?)\*\*\*|\*\*([^*]+?)\*\*|\*([^*]+?)\*|`([^`]+?)`|([^*`]+))/g;
  let match;

  while ((match = regex.exec(t)) !== null) {
    const [full, , boldItalic, bold, italic, code, plain] = match;

    const props = {
      font: FONTE,
      size: baseProps.size || SZ.CORPO,
      color: baseProps.color || COR.CINZA_CORPO,
      ...baseProps,
    };

    if (boldItalic) {
      runs.push(new TextRun({ ...props, text: boldItalic, bold: true, italics: true }));
    } else if (bold) {
      runs.push(new TextRun({ ...props, text: bold, bold: true }));
    } else if (italic) {
      runs.push(new TextRun({ ...props, text: italic, italics: true }));
    } else if (code) {
      runs.push(new TextRun({
        text: code,
        font: FONTE_CODE,
        size: SZ.CODIGO,
        color: COR.CINZA_CORPO,
        shading: { type: ShadingType.CLEAR, fill: COR.CINZA_CODIGO },
      }));
    } else if (plain) {
      runs.push(new TextRun({ ...props, text: plain }));
    }
  }

  if (runs.length === 0) {
    runs.push(new TextRun({ ...baseProps, text: t, font: FONTE, size: baseProps.size || SZ.CORPO }));
  }

  return runs;
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGEM: carregar e criar ImageRun
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lê dimensões de um PNG a partir do header IHDR (offset 16-23)
 * Retorna { width, height } em pixels ou null se não for PNG válido
 */
function lerDimensoesPNG(buffer) {
  try {
    // PNG signature: 8 bytes, then IHDR chunk starts at offset 8
    // IHDR: 4 bytes length + 4 bytes type ('IHDR') + 4 bytes width + 4 bytes height
    if (buffer.length >= 24 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      if (width > 0 && height > 0 && width < 20000 && height < 20000) {
        return { width, height };
      }
    }
  } catch (e) { /* ignore */ }
  return null;
}

/**
 * Busca recursivamente um arquivo pelo nome em IMAGES_DIR
 */
function buscarImagemRecursiva(nomeArquivo) {
  const dirQueue = [IMAGES_DIR];
  const lowerName = nomeArquivo.toLowerCase();

  while (dirQueue.length > 0) {
    const dir = dirQueue.shift();
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== 'en') {
          dirQueue.push(fullPath);
        } else if (entry.isFile() && entry.name.toLowerCase() === lowerName) {
          return fullPath;
        }
      }
    } catch (e) { /* skip inaccessible dirs */ }
  }
  return null;
}

/**
 * Detecta o tipo real de imagem pelos magic bytes do header
 * Extensão de arquivo NÃO é confiável (muitas imagens .png são na verdade JPEG)
 */
function detectarTipoImagem(data) {
  if (data.length < 4) return 'png'; // fallback

  // JPEG: FF D8 FF
  if (data[0] === 0xFF && data[1] === 0xD8 && data[2] === 0xFF) return 'jpg';

  // PNG: 89 50 4E 47
  if (data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47) return 'png';

  // WebP: RIFF....WEBP
  if (data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46 &&
    data.length >= 12 && data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50) return 'png'; // docx doesn't support webp natively, treat as png

  // GIF: 47 49 46
  if (data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46) return 'gif';

  // BMP: 42 4D
  if (data[0] === 0x42 && data[1] === 0x4D) return 'bmp';

  // Fallback to extension-based detection
  return 'png';
}

/**
 * Tenta carregar uma imagem do caminho no Markdown
 * Suporta: caminhos absolutos, relativos ../../images/..., e busca por nome
 */
function carregarImagem(imgPath, chapterDir) {
  // Lista de candidatos em ordem de prioridade
  const basename = path.basename(imgPath);
  const candidates = [];

  // 1. Caminho absoluto direto (se existir)
  if (path.isAbsolute(imgPath)) {
    candidates.push(imgPath);
  }

  // 2. Relativo ao diretório do capítulo
  candidates.push(path.join(chapterDir, imgPath));
  candidates.push(path.join(chapterDir, '..', imgPath));

  // 3. Resolver ../../images/CHAPTER/FILE para IMAGES_DIR/CHAPTER/FILE
  const relMatch = imgPath.match(/(?:\.\.\/)*images\/(.+)/);
  if (relMatch) {
    candidates.push(path.join(IMAGES_DIR, relMatch[1]));
  }

  // 4. Direto no IMAGES_DIR pelo basename
  candidates.push(path.join(IMAGES_DIR, basename));

  // 5. Imagens na subpasta pt_br/images do capítulo
  candidates.push(path.join(chapterDir, 'images', basename));

  for (const candidate of candidates) {
    const normalized = path.normalize(candidate);
    if (fs.existsSync(normalized)) {
      try {
        const data = fs.readFileSync(normalized);
        const type = detectarTipoImagem(data);
        return { data, type, path: normalized };
      } catch (e) { /* skip */ }
    }
  }

  // 6. FALLBACK: busca recursiva pelo basename em todo IMAGES_DIR
  const found = buscarImagemRecursiva(basename);
  if (found) {
    try {
      const data = fs.readFileSync(found);
      const ext = path.extname(found).toLowerCase().replace('.', '');
      const type = ext === 'jpg' ? 'jpeg' : ext === 'png' ? 'png' : ext;
      return { data, type, path: found };
    } catch (e) { /* skip */ }
  }

  return null;
}

/**
 * Cria um bloco de imagem + legenda nos elementos docx
 * Usa dimensões reais do PNG para manter aspect ratio
 */
function criarImagem(imgPath, legendaTexto, chapterDir) {
  const resultado = [];
  const img = carregarImagem(imgPath, chapterDir);

  if (img) {
    // Calcular dimensões mantendo aspect ratio
    const MAX_WIDTH_MM = 140; // 14cm máximo
    const MAX_HEIGHT_MM = 100; // 10cm máximo

    let widthMM = MAX_WIDTH_MM;
    let heightMM = MAX_HEIGHT_MM;

    // Tentar ler dimensões reais para PNG
    const dims = lerDimensoesPNG(img.data);
    if (dims) {
      const aspectRatio = dims.width / dims.height;
      // Ajustar por aspect ratio mantendo dentro dos limites
      if (aspectRatio >= 1) {
        // Paisagem ou quadrado: largura máxima, altura proporcional
        widthMM = MAX_WIDTH_MM;
        heightMM = MAX_WIDTH_MM / aspectRatio;
        if (heightMM > MAX_HEIGHT_MM) {
          heightMM = MAX_HEIGHT_MM;
          widthMM = MAX_HEIGHT_MM * aspectRatio;
        }
      } else {
        // Retrato: altura máxima, largura proporcional
        heightMM = MAX_HEIGHT_MM;
        widthMM = MAX_HEIGHT_MM * aspectRatio;
        if (widthMM > MAX_WIDTH_MM) {
          widthMM = MAX_WIDTH_MM;
          heightMM = MAX_WIDTH_MM / aspectRatio;
        }
      }
    }

    resultado.push(
      new Paragraph({
        children: [
          new ImageRun({
            data: img.data,
            transformation: {
              width: Math.round(widthMM * 3.779527559), // mm para pixels (96 DPI)
              height: Math.round(heightMM * 3.779527559),
            },
            type: img.type,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: convertMillimetersToTwip(4), after: convertMillimetersToTwip(2) },
      })
    );
    console.log(`     📷 Imagem inserida: ${path.basename(img.path)} (${dims ? dims.width + '×' + dims.height + 'px' : 'dims estimadas'} → ${widthMM.toFixed(0)}×${heightMM.toFixed(0)}mm)`);
  } else {
    // Placeholder se imagem não encontrada
    console.log(`     ⚠️  Imagem NÃO encontrada: ${path.basename(imgPath)}`);
    resultado.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `[IMAGEM NÃO ENCONTRADA: ${path.basename(imgPath)}]`,
            italics: true,
            color: 'AA0000',
            size: SZ.LEGENDA,
            font: FONTE,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: convertMillimetersToTwip(4), after: convertMillimetersToTwip(2) },
        shading: { type: ShadingType.CLEAR, fill: 'FFF0F0' },
        border: {
          top: { color: 'FFAAAA', size: 4, style: BorderStyle.DASHED },
          bottom: { color: 'FFAAAA', size: 4, style: BorderStyle.DASHED },
          left: { color: 'FFAAAA', size: 4, style: BorderStyle.DASHED },
          right: { color: 'FFAAAA', size: 4, style: BorderStyle.DASHED },
        },
      })
    );
  }

  if (legendaTexto) {
    resultado.push(criarLegenda(legendaTexto));
  }

  return resultado;
}

// ─────────────────────────────────────────────────────────────────────────────
// TABELAS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cria uma TableCell com estilo
 */
function criarCelula(texto, isHeader = false, altRow = false) {
  const fill = isHeader ? COR.TABELA_HEAD : (altRow ? COR.TABELA_ALT : COR.BRANCO);
  const textColor = isHeader ? COR.BRANCO : COR.CINZA_CORPO;
  const fontSize = isHeader ? SZ.TABELA_H : SZ.TABELA_C;

  const runs = parseInline(texto, { size: fontSize, color: textColor });
  if (isHeader) runs.forEach(r => { r.options = r.options || {}; r.options.bold = true; });

  return new TableCell({
    children: [
      new Paragraph({
        children: runs.map(r => {
          if (isHeader) {
            // Forçar negrito nos headers
            return new TextRun({
              text: typeof r.options?.text === 'string' ? r.options.text : (r.root?.children?.[0]?.text || texto),
              bold: true,
              color: COR.BRANCO,
              font: FONTE,
              size: fontSize,
            });
          }
          return r;
        }),
        alignment: AlignmentType.LEFT,
        spacing: { before: convertMillimetersToTwip(1.5), after: convertMillimetersToTwip(1.5) },
      }),
    ],
    shading: { type: ShadingType.CLEAR, fill: fill },
    margins: {
      top: convertMillimetersToTwip(1.5),
      bottom: convertMillimetersToTwip(1.5),
      left: convertMillimetersToTwip(2),
      right: convertMillimetersToTwip(2),
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COR.BORDA_TAB },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COR.BORDA_TAB },
      left: { style: BorderStyle.SINGLE, size: 4, color: COR.BORDA_TAB },
      right: { style: BorderStyle.SINGLE, size: 4, color: COR.BORDA_TAB },
    },
  });
}

/**
 * Converte uma tabela Markdown em Table docx
 */
function criarTabela(linhas) {
  // Filtrar linhas de separação (---|---|---)
  const rows = linhas.filter(l => !l.match(/^[\s|:-]+$/));
  if (rows.length === 0) return [];

  const tableRows = rows.map((linha, rowIdx) => {
    const cells = linha
      .split('|')
      .filter((_, i, arr) => i > 0 && i < arr.length - 1) // remover bordas empty
      .map(cell => cell.trim());

    const isHeader = rowIdx === 0;
    const altRow = !isHeader && rowIdx % 2 === 0;

    return new TableRow({
      children: cells.map(cell => criarCelula(cell, isHeader, altRow)),
      tableHeader: isHeader,
    });
  });

  return [
    new Table({
      rows: tableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: TableLayoutType.FIXED,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 8, color: COR.AZUL_ESCURO },
        bottom: { style: BorderStyle.SINGLE, size: 8, color: COR.AZUL_ESCURO },
        left: { style: BorderStyle.SINGLE, size: 8, color: COR.AZUL_ESCURO },
        right: { style: BorderStyle.SINGLE, size: 8, color: COR.AZUL_ESCURO },
        insideH: { style: BorderStyle.SINGLE, size: 4, color: COR.BORDA_TAB },
        insideV: { style: BorderStyle.SINGLE, size: 4, color: COR.BORDA_TAB },
      },
    }),
    espacamento(4),
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSER PRINCIPAL MARKDOWN → DOCX ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converte conteúdo Markdown em array de elementos docx
 */
function parseMarkdown(conteudo, chapterDir) {
  const elementos = [];
  const linhas = conteudo.split(/\r?\n/);
  let i = 0;

  while (i < linhas.length) {
    const linha = linhas[i];

    // ── H1
    if (linha.startsWith('# ') && !linha.startsWith('## ')) {
      const texto = linha.slice(2).trim()
        .replace(/^#+\s*Capítulo\s+\d+\s*[—–-]+?\s*/i, '')
        .trim();
      // Reconstituir o título original (não remover número)
      elementos.push(criarTituloCapitulo(linha.slice(2).trim()));
      i++; continue;
    }

    // ── H2
    if (linha.startsWith('## ') && !linha.startsWith('### ')) {
      // Remover emojis de seção como 📋 🔬 📖 🎨 📚
      const texto = linha.slice(3).trim().replace(/^\S{1,2}\s+/, match =>
        match.match(/[📋🔬📖🎨📚]/) ? '' : match
      );
      elementos.push(criarH2(texto));
      i++; continue;
    }

    // ── H3
    if (linha.startsWith('### ') && !linha.startsWith('#### ')) {
      elementos.push(criarH3(linha.slice(4).trim()));
      i++; continue;
    }

    // ── H4
    if (linha.startsWith('#### ')) {
      elementos.push(criarH4(linha.slice(5).trim()));
      i++; continue;
    }

    // ── H5 / H6 — tratar como H4 negrito
    if (linha.startsWith('##### ') || linha.startsWith('###### ')) {
      const nivel = linha.match(/^(#+)/)[1].length;
      elementos.push(criarH4(linha.slice(nivel + 1).trim()));
      i++; continue;
    }

    // ── Separador ---
    if (linha.match(/^-{3,}$/) || linha.match(/^\*{3,}$/)) {
      elementos.push(criarSeparador());
      i++; continue;
    }

    // ── Imagem ![legenda](path)
    const imgMatch = linha.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const legenda = imgMatch[1];
      const imgPath = imgMatch[2];
      const imgElems = criarImagem(imgPath, legenda, chapterDir);
      elementos.push(...imgElems);
      i++; continue;
    }

    // ── Bloco de código ```...```
    if (linha.startsWith('```')) {
      i++;
      const codigoLinhas = [];
      while (i < linhas.length && !linhas[i].startsWith('```')) {
        codigoLinhas.push(linhas[i]);
        i++;
      }
      i++; // consumir ```
      if (codigoLinhas.length > 0) {
        const blocosCodigo = criarCodigo(codigoLinhas.join('\n'));
        elementos.push(...blocosCodigo);
        elementos.push(espacamento(3));
      }
      continue;
    }

    // ── Tabela Markdown |---|
    if (linha.startsWith('|')) {
      const tabLinhas = [];
      while (i < linhas.length && linhas[i].startsWith('|')) {
        tabLinhas.push(linhas[i]);
        i++;
      }
      elementos.push(...criarTabela(tabLinhas));
      continue;
    }

    // ── Blockquote >
    if (linha.startsWith('>')) {
      const bqLinhas = [];
      while (i < linhas.length && linhas[i].startsWith('>')) {
        bqLinhas.push(linhas[i].replace(/^>\s?/, ''));
        i++;
      }
      const textoCompleto = bqLinhas.join(' ').trim();
      if (textoCompleto) {
        elementos.push(criarBlockquote(parseInline(textoCompleto, {
          size: SZ.CITACAO,
          color: COR.CINZA_CITA,
        })));
        elementos.push(espacamento(2));
      }
      continue;
    }

    // ── Lista com marcadores - ou *
    if (linha.match(/^(\s*)[*\-+]\s+/)) {
      const indent = (linha.match(/^(\s*)/)[1].length > 0) ? 10 : 5;
      const textoItem = linha.replace(/^\s*[*\-+]\s+/, '');
      elementos.push(new Paragraph({
        children: [
          new TextRun({ text: '• ', font: FONTE, size: SZ.CORPO, bold: true, color: COR.AZUL_MEDIO }),
          ...parseInline(textoItem),
        ],
        indent: { left: convertMillimetersToTwip(indent) },
        spacing: { before: 0, after: convertMillimetersToTwip(1.5), line: 260 },
      }));
      i++; continue;
    }

    // ── Lista numerada 1.
    if (linha.match(/^\s*\d+\.\s+/)) {
      const num = linha.match(/^\s*(\d+)\.\s+/)[1];
      const texto = linha.replace(/^\s*\d+\.\s+/, '');
      elementos.push(new Paragraph({
        children: [
          new TextRun({ text: `${num}. `, font: FONTE, size: SZ.CORPO, bold: true, color: COR.AZUL_MEDIO }),
          ...parseInline(texto),
        ],
        indent: { left: convertMillimetersToTwip(5) },
        spacing: { before: 0, after: convertMillimetersToTwip(1.5), line: 260 },
      }));
      i++; continue;
    }

    // ── Linha vazia
    if (linha.trim() === '') {
      i++; continue;
    }

    // ── Ignorar blocos YAML (metadados)
    if (linha.trim() === '---') {
      // Verificar se é front matter inicial
      i++; continue;
    }

    // ── Texto normal (parágrafo)
    const texto = linha.trim();
    if (texto.length > 0) {
      elementos.push(criarCorpo(parseInline(texto)));
    }

    i++;
  }

  return elementos;
}

// ─────────────────────────────────────────────────────────────────────────────
// CABEÇALHO E RODAPÉ
// ─────────────────────────────────────────────────────────────────────────────

function criarCabecalho(nomeCapitulo) {
  return {
    default: new Header({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Atlas Vetorial ICRS',
              font: FONTE,
              size: 16, // 8pt
              color: COR.AZUL_ESCURO,
              smallCaps: true,
            }),
            new TextRun({
              text: '\t',
            }),
            new TextRun({
              text: nomeCapitulo.substring(0, 60),
              font: FONTE,
              size: 16,
              color: COR.CINZA_CITA,
              smallCaps: true,
            }),
          ],
          border: {
            bottom: { color: COR.AZUL_ESCURO, size: 6, style: BorderStyle.SINGLE },
          },
          tabStops: [
            { type: TabStopType.RIGHT, position: convertMillimetersToTwip(160) },
          ],
        }),
      ],
    }),
  };
}

function criarRodape() {
  return {
    default: new Footer({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              children: ['— ', PageNumber.CURRENT, ' —'],
              font: FONTE,
              size: 18, // 9pt
              color: COR.CINZA_CITA,
            }),
          ],
          alignment: AlignmentType.CENTER,
          border: {
            top: { color: COR.AZUL_ESCURO, size: 6, style: BorderStyle.SINGLE },
          },
        }),
      ],
    }),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// GERAÇÃO DO DOCUMENTO WORD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converte um arquivo .md em um .docx
 */
async function gerarDocx(mdFilePath, outputPath) {
  const conteudo = fs.readFileSync(mdFilePath, 'utf8');
  const chapterDir = path.dirname(mdFilePath);
  const nomeArquivo = path.basename(mdFilePath, '.md');

  // Extrair título do capítulo (primeira linha H1)
  const h1Match = conteudo.match(/^#\s+(.+)$/m);
  const titulo = h1Match ? h1Match[1].trim() : nomeArquivo;

  console.log(`\n  📄 Gerando: ${nomeArquivo}.docx`);
  console.log(`     Título: ${titulo}`);

  // Parsear conteúdo
  const elementos = parseMarkdown(conteudo, chapterDir);

  // Montar documento
  const doc = new Document({
    creator: 'Atlas Vetorial ICRS — Dr. Miguel Reis',
    title: titulo,
    description: 'Atlas Vetorial ICRS — Editora Cultura Médica Brasil',
    styles: {
      default: {
        document: {
          run: { font: FONTE, size: SZ.CORPO, color: COR.CINZA_CORPO },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertMillimetersToTwip(210), // A4
              height: convertMillimetersToTwip(297),
            },
            margin: {
              top: MARGEM.TOP,
              bottom: MARGEM.BOTTOM,
              left: MARGEM.LEFT,
              right: MARGEM.RIGHT,
              header: convertMillimetersToTwip(12),
              footer: convertMillimetersToTwip(10),
            },
          },
        },
        headers: criarCabecalho(titulo),
        footers: criarRodape(),
        children: elementos,
      },
    ],
  });

  // Salvar
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  const sizeKB = (buffer.length / 1024).toFixed(1);
  console.log(`     ✅ Salvo em: ${path.basename(outputPath)} (${sizeKB} KB)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTA DE CAPÍTULOS EM ORDEM
// ─────────────────────────────────────────────────────────────────────────────

const ORDEM_CAPITULOS = [
  'CH-000_Prefacio',
  'CH-001_Anatomia_Corneana',
  'CH-002_Biomecanica_Aneis',
  'CH-003_Classificacao_Ceratocone',
  'CH-004_VR_Vetor_Radial',
  'CH-005_VT_Vetor_Tangencial',
  'CH-006_Vt_Vetor_Torque',
  'CH-007_VComa_Deslocamento_Optico',
  'CH-008_LDM_A_Lei_do_Disco_Mecanico',
  'CH-009_VEsferico_Soma_Vetorial',
  'CH-010_ICE_Indice_Coerencia_Eixos',
  'CH-011_Nomogramas_Vetoriais',
  'CH-012_Casos_Clinicos',
  'CH-013_Complicacoes_Manejo',
  'CH-014_Futuro_Aneis',
  'CH-015_Biomecanica_Profunda_CXL',
  'CH-016_Malha_Estromal_Superfície',
  'P1-01_Placido_Revelam',
  'P1-02_Padroes_Deformacao',
  'P1-03_Padrao_ao_Vetor',
  'GLOSSARIO_TERMOS_TECNICOS',
  'ENCARTE_Referencia_Rapida',
  'REFERENCIAS_BIBLIOGRAFICAS',
];

// ─────────────────────────────────────────────────────────────────────────────
// VOLUME COMPLETO (todos os capítulos em um único .docx)
// ─────────────────────────────────────────────────────────────────────────────

async function gerarVolumeCompleto() {
  console.log('\n📚 Gerando VOLUME COMPLETO...');

  const todasAsSecoes = [];

  for (const nome of ORDEM_CAPITULOS) {
    const mdPath = path.join(CHAPTERS, nome + '.md');
    if (!fs.existsSync(mdPath)) {
      console.log(`  ⚠️  Não encontrado: ${nome}.md`);
      continue;
    }

    const conteudo = fs.readFileSync(mdPath, 'utf8');
    const chapterDir = path.dirname(mdPath);
    const h1Match = conteudo.match(/^#\s+(.+)$/m);
    const titulo = h1Match ? h1Match[1].trim() : nome;

    console.log(`  📄 Processando: ${nome}`);

    const elementos = parseMarkdown(conteudo, chapterDir);

    // Cada capítulo é uma nova seção com quebra de página
    todasAsSecoes.push({
      properties: {
        type: todasAsSecoes.length === 0 ? undefined : SectionType.NEXT_PAGE,
        page: {
          size: {
            width: convertMillimetersToTwip(210),
            height: convertMillimetersToTwip(297),
          },
          margin: {
            top: MARGEM.TOP,
            bottom: MARGEM.BOTTOM,
            left: MARGEM.LEFT,
            right: MARGEM.RIGHT,
            header: convertMillimetersToTwip(12),
            footer: convertMillimetersToTwip(10),
          },
        },
      },
      headers: criarCabecalho(titulo),
      footers: criarRodape(),
      children: elementos,
    });
  }

  const doc = new Document({
    creator: 'Atlas Vetorial ICRS — Dr. Miguel Reis',
    title: 'Atlas Vetorial ICRS — Volume Completo',
    description: 'Atlas Vetorial ICRS — Editora Cultura Médica Brasil',
    styles: {
      default: {
        document: {
          run: { font: FONTE, size: SZ.CORPO, color: COR.CINZA_CORPO },
        },
      },
    },
    sections: todasAsSecoes,
  });

  const outPath = path.join(OUTPUT_DIR, 'Atlas_Vetorial_ICRS_COMPLETO.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  const sizeMB = (buffer.length / 1024 / 1024).toFixed(2);
  console.log(`\n✅ VOLUME COMPLETO gerado: Atlas_Vetorial_ICRS_COMPLETO.docx (${sizeMB} MB)`);
  console.log(`   Localização: ${outPath}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI — PONTO DE ENTRADA
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║  Atlas Vetorial ICRS — Exportador Word                       ║');
  console.log('║  Padrão Editorial: Editora Cultura Médica Brasil             ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Uso:
  node generate_word.js --chapter <nome>     Gerar um capítulo
  node generate_word.js --all                Gerar todos os capítulos
  node generate_word.js --volume-completo    Gerar volume único completo
  node generate_word.js --listar             Listar capítulos disponíveis

Exemplos:
  node generate_word.js --chapter CH-001_Anatomia_Corneana
  node generate_word.js --all
  node generate_word.js --volume-completo

Saída: ${OUTPUT_DIR}
`);
    return;
  }

  // --listar
  if (args.includes('--listar')) {
    console.log('\n📋 Capítulos disponíveis:');
    ORDEM_CAPITULOS.forEach((cap, i) => {
      const existe = fs.existsSync(path.join(CHAPTERS, cap + '.md'));
      console.log(`  ${i + 1}. ${cap} ${existe ? '✅' : '❌ (não encontrado)'}`);
    });
    return;
  }

  // --volume-completo
  if (args.includes('--volume-completo')) {
    await gerarVolumeCompleto();
    return;
  }

  // --all
  if (args.includes('--all')) {
    console.log(`\n📚 Gerando todos os capítulos em: ${OUTPUT_DIR}\n`);
    let count = 0;
    for (const nome of ORDEM_CAPITULOS) {
      const mdPath = path.join(CHAPTERS, nome + '.md');
      if (!fs.existsSync(mdPath)) {
        console.log(`  ⚠️  Não encontrado: ${nome}.md`);
        continue;
      }
      const outPath = path.join(OUTPUT_DIR, nome + '.docx');
      try {
        await gerarDocx(mdPath, outPath);
        count++;
      } catch (e) {
        console.error(`  ❌ Erro em ${nome}: ${e.message}`);
      }
    }
    console.log(`\n✅ ${count} capítulos gerados em: ${OUTPUT_DIR}`);
    return;
  }

  // --chapter <nome>
  const chIdx = args.indexOf('--chapter');
  if (chIdx !== -1) {
    const nome = args[chIdx + 1];
    if (!nome) {
      console.error('❌ Forneça o nome do capítulo: --chapter CH-001_Anatomia_Corneana');
      process.exit(1);
    }

    // Aceitar com ou sem .md
    const baseName = nome.replace(/\.md$/, '');
    const mdPath = path.join(CHAPTERS, baseName + '.md');

    if (!fs.existsSync(mdPath)) {
      // Busca parcial
      const found = ORDEM_CAPITULOS.find(c => c.toLowerCase().includes(baseName.toLowerCase()));
      if (found) {
        const mdPathFound = path.join(CHAPTERS, found + '.md');
        const outPath = path.join(OUTPUT_DIR, found + '.docx');
        await gerarDocx(mdPathFound, outPath);
      } else {
        console.error(`❌ Arquivo não encontrado: ${mdPath}`);
        console.log('   Use --listar para ver os capítulos disponíveis.');
        process.exit(1);
      }
    } else {
      const outPath = path.join(OUTPUT_DIR, baseName + '.docx');
      await gerarDocx(mdPath, outPath);
    }
    return;
  }

  console.error('❌ Argumento inválido. Use --help para ver as opções.');
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err.message);
  if (err.message.includes("Cannot find module")) {
    console.log('\n💡 Execute primeiro: node setup.js');
  }
  process.exit(1);
});
