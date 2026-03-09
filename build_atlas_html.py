"""
Atlas Vetorial ICRS - HTML Book Compiler v2
Reads all chapters, resolves ALL image paths (relative + absolute),
embeds images as base64, outputs a single styled HTML file.
"""
import os, re, base64, glob
from pathlib import Path

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
CHAPTERS_DIR = os.path.join(PROJECT_ROOT, "chapters", "pt")
OUTPUT_FILE = os.path.join(PROJECT_ROOT, "Atlas_Vetorial_ICRS_Completo.html")

CHAPTER_ORDER = [
    "CH-000_Prefacio.md",
    "CH-001_Anatomia_Corneana.md",
    "CH-002_Biomecanica_Aneis.md",
    "CH-003_Classificacao_Ceratocone.md",
    "CH-004_VR_Vetor_Radial.md",
    "CH-005_VT_Vetor_Tangencial.md",
    "CH-006_Vt_Vetor_Torque.md",
    "CH-007_VComa_Deslocamento_Optico.md",
    "CH-008_LDM_A_Lei_do_Disco_Mecanico.md",
    "CH-009_VEsferico_Soma_Vetorial.md",
    "CH-010_ICE_Indice_Coerencia_Eixos.md",
    "CH-011_Nomogramas_Vetoriais.md",
    "CH-012_Casos_Clinicos.md",
    "CH-013_Complicacoes_Manejo.md",
    "CH-014_Futuro_Aneis.md",
    "CH-015_Biomecanica_Profunda_CXL.md",
    "CH-016_Malha_Estromal_Superfície.md",
    "GLOSSARIO_TERMOS_TECNICOS.md",
    "ENCARTE_Referencia_Rapida.md",
    "REFERENCIAS_BIBLIOGRAFICAS.md",
]

def resolve_image_path(path, chapter_dir):
    """Resolve image path - try multiple locations."""
    path = path.strip().replace('/', '\\')
    
    # 1. Absolute path - try as-is
    if os.path.isabs(path) and os.path.exists(path):
        return path
    
    # 2. Relative to chapter dir
    rel = os.path.join(chapter_dir, path)
    if os.path.exists(rel):
        return rel
    
    # 3. Relative to project root 
    rel2 = os.path.join(PROJECT_ROOT, path)
    if os.path.exists(rel2):
        return rel2
    
    # 4. Check in images/generated/ by filename
    filename = os.path.basename(path)
    gen = os.path.join(PROJECT_ROOT, "images", "generated", filename)
    if os.path.exists(gen):
        return gen
    
    # 5. Try to extract filename from absolute path and find in generated
    if '\\' in path:
        fname = path.split('\\')[-1]
        gen2 = os.path.join(PROJECT_ROOT, "images", "generated", fname)
        if os.path.exists(gen2):
            return gen2
    
    return None

def image_to_base64(resolved_path):
    """Convert resolved image file to base64 data URI."""
    if not resolved_path or not os.path.exists(resolved_path):
        return None
    ext = Path(resolved_path).suffix.lower().lstrip('.')
    mime = {"png":"image/png","jpg":"image/jpeg","jpeg":"image/jpeg","gif":"image/gif","webp":"image/webp"}.get(ext,"image/png")
    with open(resolved_path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return f"data:{mime};base64,{data}"

def apply_inline(text, chapter_dir):
    """Apply inline markdown formatting."""
    # Inline images
    def replace_img(m):
        alt, path = m.group(1), m.group(2)
        resolved = resolve_image_path(path, chapter_dir)
        if resolved:
            b64 = image_to_base64(resolved)
            return f'<img src="{b64}" alt="{alt}" style="max-width:100%;border-radius:8px">'
        return f'<span class="missing-img">[IMG: {alt}]</span>'
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_img, text)
    # Bold
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    # Italic (not already bold)
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', text)
    # Code
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    # Links
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    return text

def md_to_html(md_text, chapter_dir):
    """Convert markdown to HTML."""
    lines = md_text.split('\n')
    html = []
    in_code = False
    in_yaml = False
    in_table = False
    in_list = False
    in_bq = False
    img_count = 0
    img_found = 0
    
    for line in lines:
        s = line.strip()
        
        # YAML frontmatter
        if s == '---':
            if in_yaml:
                in_yaml = False
                continue
            elif not html or all(not x.strip() for x in html):
                in_yaml = True
                continue
            html.append('<hr>')
            continue
        if in_yaml:
            continue
        
        # Code blocks
        if s.startswith('```'):
            if in_code:
                html.append('</code></pre>')
                in_code = False
            else:
                lang = s[3:].strip()
                html.append(f'<pre class="code-block"><code class="lang-{lang}">')
                in_code = True
            continue
        if in_code:
            html.append(line.replace('<','&lt;').replace('>','&gt;'))
            continue
        
        # Empty line
        if not s:
            if in_list: html.append('</ul>'); in_list = False
            if in_bq: html.append('</blockquote>'); in_bq = False
            if in_table: html.append('</tbody></table>'); in_table = False
            continue
        
        # Images (full line)
        img_m = re.match(r'\s*!\[([^\]]*)\]\(([^)]+)\)\s*$', line)
        if img_m:
            alt, path = img_m.group(1), img_m.group(2)
            img_count += 1
            resolved = resolve_image_path(path, chapter_dir)
            if resolved:
                b64 = image_to_base64(resolved)
                img_found += 1
                html.append(f'<figure><img src="{b64}" alt="{alt}" loading="lazy"><figcaption>{alt}</figcaption></figure>')
            else:
                html.append(f'<div class="missing-img"><p>[Imagem nao encontrada: {os.path.basename(path)}]</p><p class="caption">{alt}</p></div>')
            continue
        
        # Headers
        hm = re.match(r'^(#{1,6})\s+(.*)', s)
        if hm:
            level = len(hm.group(1))
            text = apply_inline(hm.group(2), chapter_dir)
            html.append(f'<h{level}>{text}</h{level}>')
            continue
        
        # Tables
        if '|' in s and s.startswith('|'):
            cells = [c.strip() for c in s.split('|')[1:-1]]
            if all(re.match(r'^[-:]+$', c) for c in cells):
                continue
            if not in_table:
                html.append('<table><thead><tr>')
                for c in cells: html.append(f'<th>{apply_inline(c, chapter_dir)}</th>')
                html.append('</tr></thead><tbody>')
                in_table = True
            else:
                html.append('<tr>')
                for c in cells: html.append(f'<td>{apply_inline(c, chapter_dir)}</td>')
                html.append('</tr>')
            continue
        
        # Blockquotes
        if s.startswith('>'):
            text = s[1:].strip()
            if not in_bq: html.append('<blockquote>'); in_bq = True
            html.append(f'<p>{apply_inline(text, chapter_dir)}</p>')
            continue
        
        # Lists
        lm = re.match(r'^(\s*)[-*]\s+(.*)', line)
        if lm or re.match(r'^\s*\d+\.\s+', line):
            if not in_list: html.append('<ul>'); in_list = True
            text = re.sub(r'^\s*[-*]\s+|\s*\d+\.\s+', '', line)
            html.append(f'<li>{apply_inline(text, chapter_dir)}</li>')
            continue
        
        # Paragraph
        html.append(f'<p>{apply_inline(s, chapter_dir)}</p>')
    
    if in_table: html.append('</tbody></table>')
    if in_list: html.append('</ul>')
    if in_bq: html.append('</blockquote>')
    
    return '\n'.join(html), img_count, img_found

CSS = """
:root { --bg:#0f1117; --surface:#1a1d27; --text:#e4e6eb; --muted:#8b8fa3; --accent:#4f8ef7; --accent2:#7c5cfc; --border:#2a2e3d; }
* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body { font-family:'Inter','Segoe UI',system-ui,sans-serif; background:var(--bg); color:var(--text); line-height:1.7; font-size:16px; }
.book { max-width:920px; margin:0 auto; padding:40px 30px; }
.cover { text-align:center; padding:80px 40px; background:linear-gradient(135deg,#1a1d27,#0f1117 50%,#1e1640); border-radius:16px; border:1px solid var(--border); margin-bottom:60px; }
.cover h1 { font-size:2.8em; background:linear-gradient(135deg,var(--accent),var(--accent2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; font-weight:800; margin-bottom:16px; }
.cover .sub { font-size:1.2em; color:var(--muted); }
.toc { background:var(--surface); border-radius:12px; padding:30px 40px; margin-bottom:60px; border:1px solid var(--border); }
.toc h2 { color:var(--accent); margin-bottom:20px; }
.toc ol { padding-left:20px; }
.toc li { margin:8px 0; }
.toc a { color:var(--text); text-decoration:none; }
.toc a:hover { color:var(--accent); }
.ch { background:var(--surface); border-radius:12px; padding:40px; margin-bottom:40px; border:1px solid var(--border); }
h1 { font-size:2em; color:var(--accent); margin:30px 0 20px; padding-bottom:10px; border-bottom:2px solid var(--border); }
h2 { font-size:1.6em; color:var(--accent2); margin:25px 0 15px; }
h3 { font-size:1.3em; color:var(--accent); margin:20px 0 12px; }
h4 { font-size:1.1em; color:var(--text); margin:15px 0 10px; }
p { margin:12px 0; }
strong { color:#fff; }
code { background:rgba(79,142,247,.1); color:var(--accent); padding:2px 6px; border-radius:4px; font-family:'Fira Code','Consolas',monospace; font-size:.9em; }
pre.code-block { background:#0d1117; border:1px solid var(--border); border-radius:8px; padding:20px; margin:16px 0; overflow-x:auto; font-size:.85em; line-height:1.5; }
pre.code-block code { background:none; color:#c9d1d9; padding:0; }
table { width:100%; border-collapse:collapse; margin:16px 0; font-size:.9em; }
th { background:rgba(79,142,247,.15); color:var(--accent); padding:10px 14px; text-align:left; font-weight:600; border-bottom:2px solid var(--border); }
td { padding:8px 14px; border-bottom:1px solid var(--border); }
tr:hover td { background:rgba(255,255,255,.03); }
blockquote { border-left:4px solid var(--accent2); background:rgba(124,92,252,.06); padding:14px 20px; margin:16px 0; border-radius:0 8px 8px 0; }
blockquote p { margin:6px 0; }
ul,ol { padding-left:24px; margin:10px 0; }
li { margin:4px 0; }
hr { border:none; border-top:1px solid var(--border); margin:30px 0; }
figure { margin:24px 0; text-align:center; }
figure img { max-width:100%; border-radius:8px; border:1px solid var(--border); box-shadow:0 4px 20px rgba(0,0,0,.3); }
figcaption { margin-top:10px; font-size:.85em; color:var(--muted); font-style:italic; max-width:700px; margin-left:auto; margin-right:auto; }
.missing-img { background:rgba(239,68,68,.1); border:1px dashed #ef4444; border-radius:8px; padding:20px; margin:16px 0; text-align:center; color:#ef4444; }
.missing-img .caption { color:var(--muted); font-size:.85em; margin-top:8px; }
a { color:var(--accent); text-decoration:none; }
a:hover { text-decoration:underline; }
.stats { background:rgba(34,197,94,.08); border:1px solid rgba(34,197,94,.3); border-radius:8px; padding:16px 20px; margin:20px 0; font-size:.9em; }
@media print { body{background:#fff;color:#000} .ch{border:none} .cover{background:#f5f5f5} .cover h1{-webkit-text-fill-color:#333} }
"""

def main():
    chapters = []
    total_imgs = 0
    total_found = 0
    
    for fn in CHAPTER_ORDER:
        fp = os.path.join(CHAPTERS_DIR, fn)
        if os.path.exists(fp):
            with open(fp, 'r', encoding='utf-8') as f:
                content = f.read()
            chapters.append((fn, content))
            print(f"  [OK] {fn} ({len(content)} chars)")
        else:
            print(f"  [--] {fn} NOT FOUND")
    
    print(f"\nBuilding HTML with {len(chapters)} chapters...")
    
    # TOC
    toc = '<nav class="toc"><h2>Indice</h2><ol>'
    for i,(fn,c) in enumerate(chapters):
        title = re.sub(r'^#+\s*','', c.split('\n')[0].strip())
        if not title: title = fn.replace('.md','').replace('_',' ')
        toc += f'<li><a href="#ch-{i+1}">{title}</a></li>'
    toc += '</ol></nav>'
    
    # Chapters
    body = ""
    for i,(fn,c) in enumerate(chapters):
        ch_html, ic, ifound = md_to_html(c, CHAPTERS_DIR)
        total_imgs += ic
        total_found += ifound
        body += f'<div class="ch" id="ch-{i+1}">\n{ch_html}\n</div>\n'
        print(f"  [{ifound}/{ic} imgs] {fn}")
    
    stats = f'<div class="stats">Imagens: {total_found}/{total_imgs} encontradas e embutidas</div>'
    
    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Atlas Vetorial ICRS</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<div class="book">
<div class="cover">
<h1>Atlas Vetorial ICRS</h1>
<p class="sub">Sistema de Classificacao e Planejamento Vetorial<br>para Aneis Intracorneanos</p>
<p class="sub" style="margin-top:20px;font-size:.9em;color:#555">DRAFT v0.2.0 | {len(chapters)} capitulos | {total_found} imagens</p>
</div>
{toc}
{stats}
{body}
</div>
</body>
</html>"""
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
    
    size_mb = os.path.getsize(OUTPUT_FILE) / (1024*1024)
    print(f"\nDONE! {OUTPUT_FILE}")
    print(f"  Size: {size_mb:.1f} MB | Chapters: {len(chapters)} | Images: {total_found}/{total_imgs}")

if __name__ == "__main__":
    main()
