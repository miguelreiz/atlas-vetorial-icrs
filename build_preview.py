import os, re, html as html_mod, base64, mimetypes

chapters_dir = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\chapters\pt'
images_dir = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images'
brain_dir = r'C:\Users\3D_OCT\.gemini\antigravity\brain\424af14e-3179-4e10-90c9-984c92111487'
output = r'C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\atlas_preview.html'

# Parte I chapters (P1-*) + main chapters (CH-*)
p1_files = sorted([f for f in os.listdir(chapters_dir) if f.startswith('P1-') and f.endswith('.md')])
ch_files = sorted([f for f in os.listdir(chapters_dir) if f.startswith('CH-') and f.endswith('.md')])
files = p1_files + ch_files

display_names = {
    # Parte I
    'P1-01_Placido_Revelam.md': ('O Que os Anéis de Plácido Revelam', 'P1.1'),
    'P1-02_Padroes_Deformacao.md': ('Os 5 Padrões de Deformação', 'P1.2'),
    'P1-03_Padrao_ao_Vetor.md': ('A Matriz de Decisão Vetorial', 'P1.3'),
    # Capítulos principais
    'CH-000_Prefacio.md': ('Prefácio', '0'),
    'CH-001_Anatomia_Corneana.md': ('Anatomia Corneana Essencial', '1'),
    'CH-002_Biomecanica_Aneis.md': ('Biomecânica dos Anéis ICRS', '2'),
    'CH-003_Classificacao_Ceratocone.md': ('Classificação do Ceratocone', '3'),
    'CH-004_VR_Vetor_Radial.md': ('VR — Vetor Radial', '4'),
    'CH-005_VT_Vetor_Tangencial.md': ('VT — Vetor Tangencial', '5'),
    'CH-006_Vt_Vetor_Torque.md': ('Vτ — Vetor Torque', '6'),
    'CH-007_VComa_Deslocamento_Optico.md': ('VComa — Deslocamento Óptico', '7'),
    'CH-008_LDM_A_Lei_do_Disco_Mecanico.md': ('Lei do Disco Mecânico', '8'),
    'CH-009_VEsferico_Soma_Vetorial.md': ('VEsférico — Soma Vetorial', '9'),
    'CH-010_ICE_Indice_Coerencia_Eixos.md': ('ICE — Índice de Coerência de Eixos', '10'),
    'CH-011_Nomogramas_Vetoriais.md': ('Nomogramas Vetoriais', '11'),
    'CH-012_Casos_Clinicos.md': ('Casos Clínicos', '12'),
    'CH-013_Complicacoes_Manejo.md': ('Complicações e Manejo', '13'),
    'CH-014_Futuro_Aneis.md': ('Futuro dos Anéis', '14'),
}

def image_to_base64(path):
    """Convert image file to base64 data URI."""
    try:
        # Normalize path
        path = path.replace('/', '\\')
        
        # Try the path as-is first
        if not os.path.exists(path):
            # Try relative to images dir
            rel = os.path.join(images_dir, os.path.basename(path))
            if os.path.exists(rel):
                path = rel
            else:
                # Try brain dir
                rel = os.path.join(brain_dir, os.path.basename(path))
                if os.path.exists(rel):
                    path = rel
                else:
                    return None
        
        mime, _ = mimetypes.guess_type(path)
        if not mime:
            mime = 'image/png'
        with open(path, 'rb') as f:
            data = base64.b64encode(f.read()).decode('utf-8')
        return f'data:{mime};base64,{data}'
    except:
        return None

def resolve_image_path(src):
    """Try to resolve an image path from markdown."""
    src = src.strip()
    
    # Absolute Windows paths
    if src.startswith('C:') or src.startswith('c:'):
        return image_to_base64(src)
    
    # Relative paths
    candidates = [
        os.path.join(images_dir, src),
        os.path.join(chapters_dir, src),
        os.path.join(brain_dir, src),
        src,
    ]
    for c in candidates:
        result = image_to_base64(c)
        if result:
            return result
    return None

def md_to_html_basic(md):
    lines = md.split('\n')
    out = []
    in_code = False
    in_table = False
    for line in lines:
        stripped = line.rstrip()
        s = stripped.lstrip()
        
        if s.startswith('```'):
            if in_code:
                out.append('</code></pre>')
                in_code = False
            else:
                out.append('<pre class="code-block"><code>')
                in_code = True
            continue
        if in_code:
            out.append(html_mod.escape(line))
            continue
        
        # Images: ![alt](path)
        img_match = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', s)
        if img_match:
            for alt, src in img_match:
                data_uri = resolve_image_path(src)
                if data_uri:
                    out.append(f'<figure><img src="{data_uri}" alt="{html_mod.escape(alt)}" loading="lazy"><figcaption>{html_mod.escape(alt)}</figcaption></figure>')
                else:
                    out.append(f'<p class="img-missing">📷 [{html_mod.escape(alt)}] — imagem não encontrada</p>')
            continue
        
        # Tables
        if '|' in s and s.startswith('|'):
            cells = [c.strip() for c in s.split('|')[1:-1]]
            if all(set(c) <= set('-: ') for c in cells):
                continue
            if not in_table:
                out.append('<table>')
                in_table = True
                out.append('<tr>' + ''.join(f'<th>{c}</th>' for c in cells) + '</tr>')
            else:
                out.append('<tr>' + ''.join(f'<td>{c}</td>' for c in cells) + '</tr>')
            continue
        else:
            if in_table:
                out.append('</table>')
                in_table = False
        
        if s.startswith('#### '):
            out.append(f'<h4>{s[5:]}</h4>')
        elif s.startswith('### '):
            out.append(f'<h3>{s[4:]}</h3>')
        elif s.startswith('## '):
            out.append(f'<h2>{s[3:]}</h2>')
        elif s.startswith('# '):
            out.append(f'<h1>{s[2:]}</h1>')
        elif s.startswith('> '):
            out.append(f'<blockquote>{s[2:]}</blockquote>')
        elif s == '---':
            out.append('<hr>')
        elif s.startswith('- '):
            out.append(f'<li>{s[2:]}</li>')
        elif s == '':
            out.append('<br>')
        else:
            line = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', line)
            line = re.sub(r'\*(.+?)\*', r'<em>\1</em>', line)
            out.append(f'<p>{line}</p>')
    if in_table:
        out.append('</table>')
    return '\n'.join(out)

# Count images found
images_found = 0
images_missing = 0

toc_html = ''
chapters_html = ''
for f in files:
    name, num = display_names.get(f, (f, '?'))
    ch_id = f.replace('.md','').replace(' ','_')
    toc_html += f'<li><a href="#{ch_id}"><span class="ch-num">{num}</span> {name}</a></li>\n'
    with open(os.path.join(chapters_dir, f), 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Count images in content
    imgs = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', content)
    for alt, src in imgs:
        if resolve_image_path(src):
            images_found += 1
        else:
            images_missing += 1
    
    content_html = md_to_html_basic(content)
    chapters_html += f'''
    <section id="{ch_id}" class="chapter">
        <div class="chapter-header">
            <span class="chapter-number">Capítulo {num}</span>
            <span class="chapter-title">{name}</span>
        </div>
        <div class="chapter-content">
            {content_html}
        </div>
    </section>
    '''

# References
ref_path = os.path.join(chapters_dir, 'REFERENCIAS_BIBLIOGRAFICAS.md')
if os.path.exists(ref_path):
    with open(ref_path, 'r', encoding='utf-8') as fh:
        ref_content = fh.read()
    ref_html = md_to_html_basic(ref_content)
    toc_html += '<li><a href="#referencias"><span class="ch-num">R</span> Referências Bibliográficas</a></li>\n'
    chapters_html += f'''
    <section id="referencias" class="chapter">
        <div class="chapter-header">
            <span class="chapter-number">Referências</span>
            <span class="chapter-title">Bibliografia</span>
        </div>
        <div class="chapter-content">{ref_html}</div>
    </section>
    '''

fonts_url = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"

page = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Atlas Vetorial ICRS — Miguel Reis</title>
<link href="{fonts_url}" rel="stylesheet">
<style>
:root {{
    --bg: #0f1117; --surface: #1a1d27; --surface2: #242836;
    --border: #2e3347; --text: #e4e6ef; --text-dim: #8b8fa3;
    --accent: #6c8aff; --accent2: #00d68f; --warm: #ff9f43; --red: #ff6b6b;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'Inter', system-ui, sans-serif;
    --mono: 'JetBrains Mono', monospace;
}}
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ font-family: var(--sans); background: var(--bg); color: var(--text); line-height:1.7; font-size:15px; }}
.cover {{
    min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; background:linear-gradient(135deg,#0f1117 0%,#1a1d3a 50%,#0f1117 100%);
    padding:60px 20px; border-bottom:1px solid var(--border);
}}
.cover h1 {{
    font-family:var(--serif); font-size:clamp(2.5rem,5vw,4.5rem); font-weight:900;
    background:linear-gradient(135deg,#6c8aff,#00d68f); -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; margin-bottom:16px; letter-spacing:-1px;
}}
.cover .subtitle {{ font-size:1.2rem; color:var(--text-dim); max-width:600px; margin-bottom:40px; }}
.cover .author {{ font-size:1.1rem; color:var(--accent); font-weight:600; margin-bottom:8px; }}
.cover .edition {{ font-size:0.85rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:3px; }}
.cover .stats {{ display:flex; gap:40px; margin-top:50px; flex-wrap:wrap; justify-content:center; }}
.cover .stat {{ text-align:center; }}
.cover .stat-num {{ font-family:var(--mono); font-size:2rem; font-weight:700; color:var(--accent2); }}
.cover .stat-label {{ font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:2px; }}
nav.toc {{ max-width:700px; margin:0 auto; padding:60px 20px; }}
nav.toc h2 {{ font-family:var(--serif); font-size:1.8rem; margin-bottom:30px; color:var(--accent); }}
nav.toc ul {{ list-style:none; }}
nav.toc li {{ border-bottom:1px solid var(--border); }}
nav.toc a {{ display:flex; align-items:center; padding:14px 0; color:var(--text); text-decoration:none; transition:all 0.2s; gap:16px; }}
nav.toc a:hover {{ color:var(--accent); padding-left:8px; }}
.ch-num {{ font-family:var(--mono); font-size:0.85rem; color:var(--accent); background:var(--surface2); padding:4px 10px; border-radius:6px; min-width:36px; text-align:center; }}
.chapter {{ max-width:800px; margin:0 auto; padding:60px 20px 100px; border-top:1px solid var(--border); }}
.chapter-header {{ margin-bottom:40px; padding-bottom:20px; border-bottom:2px solid var(--accent); }}
.chapter-number {{ font-family:var(--mono); font-size:0.8rem; color:var(--accent); text-transform:uppercase; letter-spacing:3px; display:block; margin-bottom:8px; }}
.chapter-title {{ font-family:var(--serif); font-size:2rem; font-weight:700; display:block; }}
.chapter-content h1 {{ font-family:var(--serif); font-size:1.8rem; margin:30px 0 15px; color:var(--accent); }}
.chapter-content h2 {{ font-family:var(--serif); font-size:1.4rem; margin:25px 0 10px; color:var(--text); }}
.chapter-content h3 {{ font-size:1.15rem; margin:20px 0 8px; color:var(--accent2); font-weight:600; }}
.chapter-content h4 {{ font-size:1rem; margin:15px 0 5px; color:var(--warm); font-weight:600; }}
.chapter-content p {{ margin:4px 0; }}
.chapter-content li {{ margin-left:24px; margin-bottom:4px; }}
.chapter-content strong {{ color:#fff; }}
.chapter-content blockquote {{ border-left:3px solid var(--accent); padding:12px 20px; margin:15px 0; background:var(--surface); border-radius:0 8px 8px 0; color:var(--text-dim); font-style:italic; }}
.code-block {{ background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:16px 20px; margin:15px 0; font-family:var(--mono); font-size:0.85rem; overflow-x:auto; line-height:1.5; color:#c9d1d9; white-space:pre; }}
table {{ width:100%; border-collapse:collapse; margin:15px 0; font-size:0.9rem; }}
th {{ background:var(--surface2); color:var(--accent); font-weight:600; text-align:left; padding:10px 12px; border-bottom:2px solid var(--accent); }}
td {{ padding:8px 12px; border-bottom:1px solid var(--border); color:var(--text-dim); }}
tr:hover td {{ background:var(--surface); color:var(--text); }}
hr {{ border:none; border-top:1px solid var(--border); margin:30px 0; }}
figure {{ margin:20px 0; text-align:center; }}
figure img {{ max-width:100%; border-radius:10px; border:1px solid var(--border); box-shadow:0 4px 20px rgba(0,0,0,0.4); }}
figcaption {{ font-size:0.85rem; color:var(--text-dim); margin-top:8px; font-style:italic; max-width:600px; margin-left:auto; margin-right:auto; }}
.img-missing {{ color:var(--warm); font-style:italic; padding:10px; background:var(--surface); border-radius:6px; border-left:3px solid var(--warm); margin:10px 0; }}
.back-top {{ position:fixed; bottom:30px; right:30px; background:var(--accent); color:#fff; border:none; padding:12px 16px; border-radius:50%; cursor:pointer; font-size:1.2rem; opacity:0.7; z-index:100; text-decoration:none; }}
.back-top:hover {{ opacity:1; }}
footer {{ text-align:center; padding:40px 20px; color:var(--text-dim); font-size:0.8rem; border-top:1px solid var(--border); }}
</style>
</head>
<body>
<div class="cover">
    <p class="edition">Preview — Março 2026</p>
    <h1>Atlas Vetorial ICRS</h1>
    <p class="subtitle">A Geometria Escondida dos Anéis Intracorneanos:<br>Da Fibra ao Vetor, Do Plácido ao Prognóstico</p>
    <p class="author">Miguel Reis, MD</p>
    <div class="stats">
        <div class="stat"><div class="stat-num">15</div><div class="stat-label">Capítulos</div></div>
        <div class="stat"><div class="stat-num">5</div><div class="stat-label">Contribuições Originais</div></div>
        <div class="stat"><div class="stat-num">1.139</div><div class="stat-label">Olhos Validados</div></div>
        <div class="stat"><div class="stat-num">47</div><div class="stat-label">Referências</div></div>
    </div>
</div>
<nav class="toc"><h2>Sumário</h2><ul>{toc_html}</ul></nav>
{chapters_html}
<footer>
    Atlas Vetorial ICRS — Miguel Reis — Preview Março 2026<br>
    {images_found} imagens embutidas | {images_missing} não encontradas
</footer>
<a class="back-top" href="#" title="Voltar ao topo">↑</a>
</body></html>'''

with open(output, 'w', encoding='utf-8') as f:
    f.write(page)

print(f'OK - HTML gerado: {output}')
print(f'Capítulos: {len(files)}')
print(f'Imagens embutidas: {images_found}')
print(f'Imagens não encontradas: {images_missing}')
sz = os.path.getsize(output)
print(f'Tamanho do arquivo: {sz/1024/1024:.1f} MB')
