"""
Atlas Vetorial ICRS — HTML Book Generator with IP Protection
Generates SHA-256 fingerprints per chapter as proof-of-existence,
adds visible copyright/registration notices, and produces a premium HTML book.
"""
import os
import re
import hashlib
import json
from datetime import datetime, timezone
import markdown

CHAPTERS_DIR = r"c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\chapters\pt"
IMAGES_DIR = r"c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\images"
OUTPUT_HTML = r"c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\atlas_book.html"
OUTPUT_REG = r"c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\REGISTRO_AUTORAL.json"

AUTHOR = "Dr. Miguel Reis"
AUTHOR_EMAIL = "miguelreiz"  # partial for privacy
EDITION = "1.0.0-draft"
TIMESTAMP = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

CHAPTER_ORDER = [
    "CH-000_Prefacio.md",
    "P1-01_Placido_Revelam.md",
    "P1-02_Padroes_Deformacao.md",
    "P1-03_Padrao_ao_Vetor.md",
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
    "CH-016_Malha_Estromal_Superf\u00edcie.md",
    "APENDICE_A_Modelagem_Numerica.md",
    "GLOSSARIO_TERMOS_TECNICOS.md",
    "REFERENCIAS_BIBLIOGRAFICAS.md",
    "ENCARTE_Referencia_Rapida.md",
]

def sha256_file(filepath):
    with open(filepath, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def sha256_string(s):
    return hashlib.sha256(s.encode("utf-8")).hexdigest()

def extract_title(md_content):
    match = re.search(r'^#\s+(.+)$', md_content, re.MULTILINE)
    return match.group(1).strip() if match else "Sem titulo"

def fix_image_paths(html, chapters_dir):
    def replace_path(match):
        src = match.group(1)
        if src.startswith("../../images/"):
            abs_path = os.path.normpath(os.path.join(chapters_dir, src))
            return f'src="file:///{abs_path.replace(chr(92), "/")}"'
        elif os.path.isabs(src):
            return f'src="file:///{src.replace(chr(92), "/")}"'
        return match.group(0)
    return re.sub(r'src="([^"]+)"', replace_path, html)

def build():
    print("=" * 60)
    print("  ATLAS VETORIAL ICRS - HTML BOOK + IP REGISTRATION")
    print("=" * 60)

    chapters_html = []
    toc_items = []
    registry = {
        "title": "Atlas Vetorial ICRS: Engenharia Biomecanica Corneana",
        "author": AUTHOR,
        "edition": EDITION,
        "registration_timestamp": TIMESTAMP,
        "registration_method": "SHA-256 content fingerprint per chapter",
        "total_chapters": 0,
        "master_hash": "",
        "chapters": []
    }

    md_ext = ['tables', 'fenced_code', 'codehilite', 'toc', 'sane_lists']
    all_hashes = []

    for i, filename in enumerate(CHAPTER_ORDER):
        filepath = os.path.join(CHAPTERS_DIR, filename)
        if not os.path.exists(filepath):
            print(f"  SKIP: {filename}")
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        title = extract_title(content)
        file_hash = sha256_file(filepath)
        all_hashes.append(file_hash)

        html = markdown.markdown(content, extensions=md_ext)
        html = fix_image_paths(html, CHAPTERS_DIR)

        chapter_id = filename.replace(".md", "").replace(" ", "_")

        # TOC label
        if filename.startswith("CH-"):
            num = filename.split("_")[0].replace("CH-", "")
            toc_label = f"Cap. {int(num)}"
        elif filename.startswith("P1-"):
            num = filename.split("_")[0].replace("P1-", "")
            toc_label = f"P1.{int(num)}"
        elif "GLOSSARIO" in filename:
            toc_label = "Glossario"
        elif "REFERENCIAS" in filename:
            toc_label = "Referencias"
        elif "ENCARTE" in filename:
            toc_label = "Encarte"
        else:
            toc_label = filename[:15]

        toc_items.append((chapter_id, toc_label, title))

        # Add registration watermark per chapter
        reg_badge = f"""<div class="chapter-reg">
            <span class="reg-icon">&#x1F512;</span>
            SHA-256: <code>{file_hash[:16]}...{file_hash[-8:]}</code>
            &nbsp;|&nbsp; Registrado: {TIMESTAMP[:10]}
        </div>"""

        # Inject inline vector legend at strategic chapters
        legend_chapters = {
            "CH-001": "Anatomia",
            "CH-004": "VR",
            "CH-007": "VComa",
            "CH-009": "Integra",
            "CH-011": "Clinica",
            "CH-015": "CXL",
        }
        ch_prefix = filename.split("_")[0] if "_" in filename else ""
        if ch_prefix in legend_chapters:
            inline_legend = """<div class="vector-legend-inline">
  <div class="vli-title">&#x1F9ED; Chave Vetorial &mdash; Lembrete</div>
  <div class="vli-grid">
    <div class="vli-item"><span style="color:#ef4444">&#x25CF;</span> <strong style="color:#ef4444">VR</strong> Vetor Radial</div>
    <div class="vli-item"><span style="color:#3b82f6">&#x25CF;</span> <strong style="color:#3b82f6">VT</strong> Vetor Tangencial</div>
    <div class="vli-item"><span style="color:#22c55e">&#x25CF;</span> <strong style="color:#22c55e">V&tau;</strong> Vetor Torque</div>
    <div class="vli-item"><span style="color:#a855f7">&#x25CF;</span> <strong style="color:#a855f7">VComa</strong> Desloc. &Oacute;ptico</div>
    <div class="vli-item"><span style="color:#f97316">&#x25CF;</span> <strong style="color:#f97316">PIO</strong> Press&atilde;o Intraocular</div>
    <div class="vli-item"><span style="color:#06b6d4">&#x25CF;</span> <strong style="color:#06b6d4">ICE</strong> Coer&ecirc;ncia Axial</div>
  </div>
</div>"""
            # Insert after first </h1>
            h1_end = html.find("</h1>")
            if h1_end > 0:
                insert_pos = h1_end + len("</h1>")
                html = html[:insert_pos] + "\n" + inline_legend + "\n" + html[insert_pos:]

        chapters_html.append(f'<section id="{chapter_id}" class="chapter">\n{html}\n{reg_badge}\n</section>')

        registry["chapters"].append({
            "index": i + 1,
            "filename": filename,
            "title": title,
            "sha256": file_hash,
            "size_bytes": len(content.encode("utf-8")),
            "timestamp": TIMESTAMP
        })

        print(f"  [{i+1:2d}] {filename:<50s} {file_hash[:24]}...")

    # Master hash = hash of all hashes concatenated
    master_hash = sha256_string("".join(all_hashes))
    registry["total_chapters"] = len(registry["chapters"])
    registry["master_hash"] = master_hash

    # Save registration JSON
    with open(OUTPUT_REG, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)
    print(f"\n  Registro salvo: {OUTPUT_REG}")
    print(f"  Master Hash: {master_hash}")

    # Build TOC
    toc_html = ""
    for cid, label, title in toc_items:
        safe_title = title[:50].replace('"', '&quot;')
        toc_html += f'<a href="#{cid}" class="toc-item" title="{safe_title}"><span class="toc-num">{label}</span><span class="toc-title">{safe_title}</span></a>\n'

    # Build HTML document
    html_doc = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Atlas Vetorial ICRS | {AUTHOR}</title>
<meta name="author" content="{AUTHOR}">
<meta name="description" content="Atlas Vetorial ICRS: Engenharia Biomecanica Corneana - Obra registrada com fingerprinting SHA-256">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
:root {{
  --bg: #0a0e17;
  --bg-chapter: #111827;
  --bg-sidebar: #0d1117;
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --accent: #3b82f6;
  --accent-glow: rgba(59, 130, 246, 0.15);
  --border: #1e293b;
  --code-bg: #1e293b;
  --table-header: #1e3a5f;
  --table-stripe: #0f172a;
  --gold: #ffd700;
  --cyan: #00b4dc;
  --sidebar-w: 280px;
  --reg-color: #f59e0b;
}}

* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
  font-family: 'Crimson Pro', Georgia, serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.75;
  font-size: 17px;
  display: flex;
  min-height: 100vh;
}}

/* === SIDEBAR === */
.sidebar {{
  position: fixed;
  top: 0; left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}}

.sidebar-header {{
  padding: 24px 20px 16px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, #0B3D91 0%, #1a1a2e 100%);
}}

.sidebar-header h1 {{
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}}

.sidebar-header .subtitle {{
  font-size: 11px;
  color: var(--cyan);
  font-family: 'Inter', sans-serif;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}}

.sidebar-footer {{
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: var(--text-muted);
  background: rgba(245, 158, 11, 0.05);
}}

.sidebar-footer .reg-label {{
  color: var(--reg-color);
  font-weight: 600;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
}}

.sidebar-footer code {{
  font-size: 9px;
  color: var(--reg-color);
  background: rgba(245, 158, 11, 0.1);
  padding: 1px 4px;
  border-radius: 3px;
}}

.toc {{
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}}

.toc-item {{
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 8px 20px;
  color: var(--text-muted);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}}

.toc-item:hover {{
  color: var(--text);
  background: var(--accent-glow);
  border-left-color: var(--accent);
}}

.toc-item.active {{
  color: var(--accent);
  background: var(--accent-glow);
  border-left-color: var(--accent);
  font-weight: 600;
}}

.toc-num {{
  font-weight: 600;
  min-width: 55px;
  color: var(--accent);
  font-size: 11px;
}}

.toc-title {{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}}

/* === MAIN CONTENT === */
.main {{
  margin-left: var(--sidebar-w);
  flex: 1;
}}

.chapter {{
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 48px 80px;
  border-bottom: 1px solid var(--border);
  position: relative;
}}

.chapter::before {{
  content: '';
  position: absolute;
  top: 0;
  left: 48px; right: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}}

.chapter:first-child::before {{ display: none; }}

/* === REGISTRATION BADGE === */
.chapter-reg {{
  margin-top: 40px;
  padding: 10px 16px;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: var(--reg-color);
  display: flex;
  align-items: center;
  gap: 6px;
}}

.chapter-reg .reg-icon {{
  font-size: 14px;
}}

.chapter-reg code {{
  font-size: 10px;
  background: rgba(245, 158, 11, 0.1);
  color: var(--reg-color);
  padding: 1px 5px;
  border-radius: 3px;
}}

/* === COPYRIGHT BANNER === */
.copyright-banner {{
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 48px;
  text-align: center;
  font-family: 'Inter', sans-serif;
}}

.copyright-banner .shield {{
  font-size: 48px;
  margin-bottom: 16px;
}}

.copyright-banner h2 {{
  font-size: 18px;
  color: var(--reg-color);
  margin-bottom: 8px;
  border: none;
}}

.copyright-banner p {{
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 8px;
}}

.copyright-banner .master-hash {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--reg-color);
  background: rgba(245, 158, 11, 0.08);
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid rgba(245, 158, 11, 0.2);
  margin: 16px auto;
  max-width: 520px;
  word-break: break-all;
}}

.copyright-banner .legal {{
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 16px;
  line-height: 1.5;
}}

/* === TYPOGRAPHY === */
h1 {{
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 32px;
  line-height: 1.2;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--accent);
}}

h2 {{
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--cyan);
  margin: 48px 0 16px;
}}

h3 {{
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--gold);
  margin: 32px 0 12px;
}}

h4 {{
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  margin: 24px 0 8px;
}}

p {{ margin: 0 0 16px; }}
strong {{ color: #fff; font-weight: 600; }}
em {{ font-style: italic; color: #cbd5e1; }}
a {{ color: var(--accent); text-decoration: none; }}
a:hover {{ text-decoration: underline; }}

blockquote {{
  margin: 20px 0;
  padding: 16px 20px;
  border-left: 4px solid var(--accent);
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}}

blockquote strong {{ color: var(--accent); }}

code {{
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--cyan);
}}

pre {{
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 20px;
  overflow-x: auto;
  margin: 16px 0;
  font-size: 13px;
  line-height: 1.6;
}}

pre code {{ background: none; padding: 0; color: var(--text); }}

table {{
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
}}

thead th {{
  background: var(--table-header);
  color: #fff;
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid var(--accent);
}}

tbody td {{
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}}

tbody tr:nth-child(even) {{ background: var(--table-stripe); }}
tbody tr:hover {{ background: rgba(59, 130, 246, 0.08); }}

img {{
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid var(--border);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}}

ul, ol {{ margin: 12px 0; padding-left: 28px; }}
li {{ margin: 6px 0; }}
li input[type=checkbox] {{ margin-right: 8px; accent-color: var(--accent); }}

hr {{
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  margin: 40px 0;
}}

.progress-bar {{
  position: fixed;
  top: 0;
  left: var(--sidebar-w);
  right: 0;
  height: 3px;
  background: var(--border);
  z-index: 200;
}}

.progress-fill {{
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--cyan));
  width: 0%;
  transition: width 0.1s;
}}

.back-to-top {{
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59,130,246,0.4);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 20px;
  z-index: 200;
  text-decoration: none;
}}

.back-to-top.visible {{ opacity: 1; }}

.menu-toggle {{
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 300;
  width: 40px;
  height: 40px;
  background: var(--accent);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}}

@media (max-width: 900px) {{
  .sidebar {{ transform: translateX(-100%); }}
  .sidebar.open {{ transform: translateX(0); }}
  .main {{ margin-left: 0; }}
  .progress-bar {{ left: 0; }}
  .menu-toggle {{ display: flex; align-items: center; justify-content: center; }}
  .chapter {{ padding: 40px 20px 60px; }}
  h1 {{ font-size: 24px; }}
}}

@media print {{
  .sidebar, .progress-bar, .back-to-top, .menu-toggle {{ display: none !important; }}
  .main {{ margin-left: 0; }}
  .chapter {{ page-break-after: always; max-width: none; padding: 20px; }}
  body {{ background: #fff; color: #000; font-size: 12pt; }}
  h1, h2, h3, h4 {{ color: #000; }}
  .chapter-reg {{ border-color: #999; color: #666; }}
  .copyright-banner {{ page-break-before: always; }}
}}

/* Anti-copy watermark */
.chapter::after {{
  content: '{AUTHOR} | Obra Registrada';
  position: fixed;
  bottom: 8px;
  right: var(--sidebar-w);
  left: var(--sidebar-w);
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(245, 158, 11, 0.15);
  letter-spacing: 2px;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 50;
}}

/* === FLOATING VECTOR KEY === */
.vector-key {{
  position: fixed;
  bottom: 80px;
  right: 24px;
  z-index: 150;
  font-family: 'Inter', sans-serif;
}}

.vector-key-toggle {{
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a5f, #0B3D91);
  border: 2px solid var(--accent);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(59,130,246,0.4);
  transition: all 0.3s;
  position: relative;
}}

.vector-key-toggle:hover {{
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(59,130,246,0.6);
}}

.vector-key-toggle .badge {{
  position: absolute;
  top: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: var(--gold);
  border-radius: 50%;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
}}

.vector-key-panel {{
  position: absolute;
  bottom: 56px;
  right: 0;
  width: 300px;
  background: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  display: none;
  overflow: hidden;
}}

.vector-key-panel.open {{
  display: block;
  animation: slideUp 0.3s ease;
}}

@keyframes slideUp {{
  from {{ opacity: 0; transform: translateY(10px); }}
  to {{ opacity: 1; transform: translateY(0); }}
}}

.vector-key-panel .vk-header {{
  padding: 12px 16px;
  background: linear-gradient(135deg, #0B3D91, #1a1a2e);
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}}

.vector-key-panel .vk-section {{
  padding: 8px 16px;
  border-bottom: 1px solid var(--border);
}}

.vector-key-panel .vk-section:last-child {{
  border-bottom: none;
}}

.vector-key-panel .vk-label {{
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 6px;
  font-weight: 600;
}}

.vk-item {{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  font-size: 12px;
  color: var(--text);
}}

.vk-dot {{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}}

.vk-code {{
  font-weight: 700;
  min-width: 70px;
  font-size: 13px;
}}

.vk-desc {{
  color: var(--text-muted);
  font-size: 11px;
}}

/* === INLINE VECTOR LEGEND === */
.vector-legend-inline {{
  margin: 32px 0;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(11, 61, 145, 0.08), rgba(0, 180, 220, 0.05));
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
}}

.vector-legend-inline .vli-title {{
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 10px;
}}

.vector-legend-inline .vli-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
}}

.vector-legend-inline .vli-item {{
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}}

.vector-legend-inline .vli-item strong {{
  font-size: 13px;
}}

@media (max-width: 900px) {{
  .vector-key {{ bottom: 70px; right: 12px; }}
  .vector-key-panel {{ width: 260px; }}
  .vector-legend-inline .vli-grid {{ grid-template-columns: 1fr; }}
}}

@media print {{
  .vector-key {{ display: none !important; }}
}}
</style>
</head>
<body>

<button class="menu-toggle" onclick="document.querySelector('.sidebar').classList.toggle('open')">&#9776;</button>

<!-- FLOATING VECTOR KEY -->
<div class="vector-key">
  <div class="vector-key-panel" id="vkPanel">
    <div class="vk-header">&#x1F9ED; Chave Vetorial do Atlas</div>
    <div class="vk-section">
      <div class="vk-label">Vetores Mecanicos</div>
      <div class="vk-item"><div class="vk-dot" style="background:#ef4444"></div><span class="vk-code" style="color:#ef4444">VR</span><span class="vk-desc">Vetor Radial &mdash; aplainamento</span></div>
      <div class="vk-item"><div class="vk-dot" style="background:#3b82f6"></div><span class="vk-code" style="color:#3b82f6">VT</span><span class="vk-desc">Vetor Tangencial &mdash; redistribuicao</span></div>
      <div class="vk-item"><div class="vk-dot" style="background:#22c55e"></div><span class="vk-code" style="color:#22c55e">V&tau;</span><span class="vk-desc">Vetor Torque &mdash; rotacao/travamento</span></div>
    </div>
    <div class="vk-section">
      <div class="vk-label">Vetores Resultantes</div>
      <div class="vk-item"><div class="vk-dot" style="background:#a855f7"></div><span class="vk-code" style="color:#a855f7">VComa</span><span class="vk-desc">Deslocamento optico do apice</span></div>
      <div class="vk-item"><div class="vk-dot" style="background:linear-gradient(90deg,#ef4444,#3b82f6,#22c55e);border-radius:50%"></div><span class="vk-code" style="background:linear-gradient(90deg,#ef4444,#3b82f6,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent">VEsferico</span><span class="vk-desc">Soma vetorial integrada</span></div>
    </div>
    <div class="vk-section">
      <div class="vk-label">Forcas do Cone</div>
      <div class="vk-item"><div class="vk-dot" style="background:#f97316"></div><span class="vk-code" style="color:#f97316">PIO</span><span class="vk-desc">Pressao intraocular (posterior&rarr;anterior)</span></div>
      <div class="vk-item"><div class="vk-dot" style="background:#fbbf24"></div><span class="vk-code" style="color:#fbbf24">Fr Ft F&tau;</span><span class="vk-desc">Forcas radial, tangencial, torque do cone</span></div>
    </div>
    <div class="vk-section">
      <div class="vk-label">Indices</div>
      <div class="vk-item"><div class="vk-dot" style="background:#06b6d4"></div><span class="vk-code" style="color:#06b6d4">ICE</span><span class="vk-desc">Index of Axial Coherence</span></div>
      <div class="vk-item"><div class="vk-dot" style="background:#06b6d4"></div><span class="vk-code" style="color:#06b6d4">LDM</span><span class="vk-desc">Lei do Disco Mecanico</span></div>
      <div class="vk-item"><div class="vk-dot" style="background:#06b6d4"></div><span class="vk-code" style="color:#06b6d4">ENM</span><span class="vk-desc">Eixo de Neutralizacao Mecanica</span></div>
    </div>
  </div>
  <button class="vector-key-toggle" onclick="document.getElementById('vkPanel').classList.toggle('open')" title="Chave Vetorial">
    V&#x20D7;
    <span class="badge">5</span>
  </button>
</div>

<nav class="sidebar">
  <div class="sidebar-header">
    <h1>Atlas Vetorial ICRS</h1>
    <div class="subtitle">Engenharia Biomecanica Corneana</div>
  </div>
  <div class="toc">
    {toc_html}
  </div>
  <div class="sidebar-footer">
    <div class="reg-label">&#x1F512; OBRA REGISTRADA</div>
    <div style="margin-top:4px">{AUTHOR} &copy; {datetime.now().year}</div>
    <div style="margin-top:2px">Master: <code>{master_hash[:20]}...</code></div>
    <div style="margin-top:2px">Registro: {TIMESTAMP[:10]}</div>
  </div>
</nav>

<div class="progress-bar"><div class="progress-fill" id="progress"></div></div>

<main class="main">
  <!-- COPYRIGHT HEADER -->
  <div class="copyright-banner">
    <div class="shield">&#x1F6E1;&#xFE0F;</div>
    <h2>Obra Protegida por Registro Digital</h2>
    <p>
      Este documento constitui obra intelectual original de <strong>{AUTHOR}</strong>,
      protegida pela Lei de Direitos Autorais (Lei 9.610/1998).
      Cada capitulo possui fingerprint SHA-256 unico, gerado em <strong>{TIMESTAMP[:10]}</strong>,
      que comprova a autoria e a integridade do conteudo.
    </p>
    <div class="master-hash">
      Master Hash: {master_hash}
    </div>
    <p class="legal">
      Distribuicao deste documento para revisao nao constitui cessao de direitos.
      Reproducao, adaptacao ou publicacao, total ou parcial, requer autorizacao expressa do autor.<br>
      O registro completo (SHA-256 por capitulo) esta disponivel em <code>REGISTRO_AUTORAL.json</code>.
    </p>
  </div>

  {''.join(chapters_html)}

  <!-- COPYRIGHT FOOTER -->
  <div class="copyright-banner" style="border-top: 1px solid var(--border); margin-top: 40px;">
    <div class="shield">&#x1F512;</div>
    <h2>Fim do Atlas Vetorial ICRS</h2>
    <p>
      <strong>{AUTHOR}</strong> &copy; {datetime.now().year} | Todos os direitos reservados<br>
      {registry["total_chapters"]} capitulos | Master SHA-256: <code>{master_hash[:32]}...</code><br>
      Versao {EDITION} | Registro: {TIMESTAMP}
    </p>
    <p class="legal">
      Os conceitos originais deste Atlas incluem: Teoria Vetorial ICRS (VR, VT, Vτ, VComa, VEsferico),
      Lei do Disco Mecanico (LDM), Indice ICE (Index of Axial Coherence),
      Modelo 4-Camadas de Estabilidade Superficial, e o Nomograma Vetorial de 5 Passos.<br>
      Qualquer uso academico deve citar: <em>Reis M. Atlas Vetorial ICRS. {datetime.now().year}.</em>
    </p>
  </div>
</main>

<a href="#" class="back-to-top" id="btt">&uarr;</a>

<script>
window.addEventListener('scroll', () => {{
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('progress').style.width = pct + '%';
  document.getElementById('btt').classList.toggle('visible', h.scrollTop > 500);
}});

const sections = document.querySelectorAll('.chapter');
const tocLinks = document.querySelectorAll('.toc-item');
const observer = new IntersectionObserver(entries => {{
  entries.forEach(entry => {{
    if (entry.isIntersecting) {{
      tocLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.toc-item[href="#${{entry.target.id}}"]`);
      if (link) {{
        link.classList.add('active');
        link.scrollIntoView({{ block: 'nearest' }});
      }}
    }}
  }});
}}, {{ threshold: 0.1, rootMargin: '-20% 0px -70% 0px' }});
sections.forEach(s => observer.observe(s));

document.querySelectorAll('.toc-item').forEach(link => {{
  link.addEventListener('click', e => {{
    e.preventDefault();
    document.getElementById(link.getAttribute('href').slice(1)).scrollIntoView({{ behavior: 'smooth' }});
    document.querySelector('.sidebar').classList.remove('open');
  }});
}});

// Anti-copy protection
document.addEventListener('contextmenu', e => {{
  if (!e.target.closest('.chapter-reg')) e.preventDefault();
}});
</script>
</body>
</html>"""

    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html_doc)

    print(f"\n  [OK] HTML: {OUTPUT_HTML}")
    print(f"  [OK] Registro: {OUTPUT_REG}")
    print(f"  [OK] Capitulos: {registry['total_chapters']}")
    print(f"  [OK] Master Hash: {master_hash}")

if __name__ == "__main__":
    build()

