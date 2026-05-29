#!/usr/bin/env python3
"""
Generate professional PDFs from AVBC markdown chapters.
Uses fpdf2 for PDF generation with proper typography, headers, and SVG embedding.
"""
import re
import sys
from pathlib import Path
from fpdf import FPDF

BASE_DIR = Path("/Users/miguelreis/Library/Mobile Documents/com~apple~CloudDocs/GitHub/atlas-vetorial-icrs")
OUTPUT_DIR = BASE_DIR / "output"

# ─── Configuration ──────────────────────────────────────────────────
PT_CONFIG = {
    "title": "Análise Vetorial Biomecânica Corneana",
    "subtitle": "Para Planejamento de Segmento de Anel Intraestromal",
    "author": "Dr. Miguel Reis & Dra. Jordana Sandes",
    "dir": BASE_DIR / "capitulos_pt",
    "output": OUTPUT_DIR / "Biomecanica_Vetorial_PT.pdf",
    "files": [
        "indice_geral.md",
        "cap01_cornea_biomecanica.md", "cap02_como_icrs_funcionam.md",
        "cap04_limites_nomogramas.md", "cap05_tres_dominios.md",
        "cap06_vetor_VR.md", "cap07_vetor_VT.md", "cap08_vetor_Vtau.md",
        "cap03_metodo_alpins.md", "cap09_classificacao_avbc.md",
        "cap11_fluxo_clinico.md", "cap12_casos_ilustrativos.md",
        "cap10_validacao_fem.md", "cap13_limitacoes_futuro.md",
        "cap14_plataforma_software.md", "cap15_conclusao.md",
        "apendice_A_modelagem_HGO.md", "apendice_B_scripts_febio.md",
        "apendice_C_glossario.md",
    ],
}

EN_CONFIG = {
    "title": "Corneal Biomechanical Vector Analysis",
    "subtitle": "For Intracorneal Ring Segment Planning",
    "author": "Dr. Miguel Reis & Dr. Jordana Sandes",
    "dir": BASE_DIR / "capitulos_en",
    "output": OUTPUT_DIR / "Corneal_Biomechanical_Vector_Analysis_EN.pdf",
    "files": [
        "table_of_contents.md",
        "cap01_cornea_biomechanics.md", "cap02_how_icrs_work.md",
        "cap03_nomogram_limits.md", "cap04_three_domains.md",
        "cap05_vector_VR.md", "cap06_vector_VT.md", "cap07_vector_Vtau.md",
        "cap08_alpins_method.md", "cap09_avbc_classification.md",
        "cap11_clinical_workflow.md", "cap10_fem_validation.md",
        "cap12_case_studies.md", "cap13_limitations_future.md",
        "cap14_software_platform.md", "cap15_conclusion.md",
        "appendix_A_HGO_model.md", "appendix_B_febio_scripts.md",
        "appendix_C_glossary.md",
    ],
}


class AVBCPdf(FPDF):
    """Custom PDF class with headers, footers, and markdown rendering."""
    
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.chapter_title = ""
        self.set_auto_page_break(auto=True, margin=20)
        
    @property
    def usable_w(self):
        return self.w - self.l_margin - self.r_margin

    def header(self):
        if self.page_no() > 1:
            self.set_font('Helvetica', 'I', 8)
            self.set_text_color(120, 120, 120)
            title_clean = self.chapter_title.encode('latin-1', 'replace').decode('latin-1')
            config_clean = self.config['title'].encode('latin-1', 'replace').decode('latin-1')
            self.cell(95, 8, title_clean)
            self.cell(95, 8, config_clean, align='R')
            self.ln(4)
            self.set_draw_color(200, 200, 200)
            self.line(10, 14, 200, 14)
            self.ln(6)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(140, 140, 140)
        self.cell(0, 10, f'{self.page_no()}', align='C')
    
    def add_cover_page(self):
        self.add_page()
        self.ln(60)
        self.set_font('Helvetica', 'B', 28)
        self.set_text_color(20, 60, 120)
        self.multi_cell(self.usable_w, 14, self._clean(self.config["title"]), align='C')
        self.ln(8)
        self.set_font('Helvetica', '', 16)
        self.set_text_color(80, 80, 80)
        self.multi_cell(self.usable_w, 10, self._clean(self.config["subtitle"]), align='C')
        self.ln(20)
        self.set_font('Helvetica', 'I', 14)
        self.set_text_color(60, 60, 60)
        self.multi_cell(self.usable_w, 10, self._clean(self.config["author"]), align='C')
        self.ln(30)
        self.set_font('Helvetica', '', 11)
        self.set_text_color(100, 100, 100)
        self.multi_cell(self.usable_w, 8, "Elsevier Health Sciences", align='C')
        self.ln(5)
        self.multi_cell(self.usable_w, 8, "2025", align='C')
    
    def render_markdown(self, text):
        """Parse and render markdown text to PDF."""
        lines = text.split('\n')
        in_table = False
        in_blockquote = False
        table_rows = []
        bq_lines = []
        
        i = 0
        while i < len(lines):
            line = lines[i]
            stripped = line.strip()
            
            # Skip empty lines
            if not stripped:
                if in_blockquote and bq_lines:
                    self._render_blockquote(bq_lines)
                    bq_lines = []
                    in_blockquote = False
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                self.ln(3)
                i += 1
                continue
            
            # Headings
            if stripped.startswith('# ') and not stripped.startswith('## '):
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                self.add_page()
                title = stripped[2:].strip()
                self.chapter_title = title[:60]
                self.set_font('Helvetica', 'B', 20)
                self.set_text_color(20, 60, 120)
                self.set_x(self.l_margin)
                self.multi_cell(self.usable_w, 12, self._clean(title))
                self.ln(6)
                self.set_draw_color(20, 60, 120)
                self.line(10, self.get_y(), 200, self.get_y())
                self.ln(6)
                i += 1
                continue
            
            if stripped.startswith('## '):
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                title = stripped[3:].strip()
                self.ln(6)
                self.set_font('Helvetica', 'B', 14)
                self.set_text_color(30, 80, 140)
                self.set_x(self.l_margin)
                self.multi_cell(self.usable_w, 9, self._clean(title))
                self.ln(3)
                i += 1
                continue
            
            if stripped.startswith('### '):
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                title = stripped[4:].strip()
                self.ln(4)
                self.set_font('Helvetica', 'B', 12)
                self.set_text_color(50, 100, 150)
                self.set_x(self.l_margin)
                self.multi_cell(self.usable_w, 8, self._clean(title))
                self.ln(2)
                i += 1
                continue
            
            # Horizontal rule
            if stripped == '---':
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                self.ln(4)
                self.set_draw_color(200, 200, 200)
                self.line(10, self.get_y(), 200, self.get_y())
                self.ln(4)
                i += 1
                continue
            
            # Figure reference (skip SVG path, just show caption)
            if stripped.startswith('!['):
                match = re.match(r'!\[(.+?)\]\((.+?)\)', stripped)
                if match:
                    caption = match.group(1)
                    self.ln(3)
                    self.set_font('Helvetica', 'I', 9)
                    self.set_text_color(80, 80, 80)
                    self.set_x(self.l_margin)
                    self.multi_cell(self.usable_w, 6, f"[{self._clean(caption)}]")
                    self.ln(3)
                i += 1
                continue
            
            # Table
            if '|' in stripped and stripped.startswith('|'):
                # Skip separator lines
                if re.match(r'\|[\s\-:]+\|', stripped):
                    i += 1
                    continue
                cells = [c.strip() for c in stripped.split('|')[1:-1]]
                table_rows.append(cells)
                in_table = True
                i += 1
                continue
            
            # Blockquote
            if stripped.startswith('>'):
                bq_text = stripped[1:].strip()
                # Skip alert markers
                if bq_text.startswith('[!'):
                    i += 1
                    continue
                bq_lines.append(bq_text)
                in_blockquote = True
                i += 1
                continue
            
            # Bullet list
            if stripped.startswith('- ') or stripped.startswith('* '):
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                text = stripped[2:]
                self.set_font('Helvetica', '', 10)
                self.set_text_color(40, 40, 40)
                indent = 12
                self.set_x(self.l_margin + indent)
                self.cell(6, 6, chr(8226).encode('latin-1', 'replace').decode('latin-1'))
                self.multi_cell(self.w - self.l_margin - self.r_margin - indent - 6, 6, self._clean(text))
                i += 1
                continue
            
            # Numbered list
            num_match = re.match(r'^(\d+)\.\s+(.+)', stripped)
            if num_match:
                if in_table and table_rows:
                    self._render_table(table_rows)
                    table_rows = []
                    in_table = False
                num = num_match.group(1)
                text = num_match.group(2)
                self.set_font('Helvetica', '', 10)
                self.set_text_color(40, 40, 40)
                indent = 12
                self.set_x(self.l_margin + indent)
                self.cell(8, 6, f'{num}.')
                self.multi_cell(self.usable_w - indent - 8, 6, self._clean(text))
                i += 1
                continue
            
            # Regular paragraph
            if in_table and table_rows:
                self._render_table(table_rows)
                table_rows = []
                in_table = False
            self.set_font('Helvetica', '', 10)
            self.set_text_color(40, 40, 40)
            self.set_x(self.l_margin)
            self.multi_cell(self.usable_w, 6, self._clean(stripped))
            i += 1
        
        # Flush remaining
        if table_rows:
            self._render_table(table_rows)
        if bq_lines:
            self._render_blockquote(bq_lines)
    
    def _render_blockquote(self, lines):
        """Render a blockquote block."""
        self.ln(2)
        self.set_fill_color(240, 245, 255)
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(60, 70, 90)
        text = ' '.join(lines)
        indent = 5
        self.set_x(self.l_margin + indent)
        # Draw left border
        y_start = self.get_y()
        self.multi_cell(self.usable_w - indent, 6, self._clean(text), fill=True)
        y_end = self.get_y()
        self.set_draw_color(20, 60, 120)
        self.line(14, y_start, 14, y_end)
        self.ln(2)
    
    def _render_table(self, rows):
        """Render a table."""
        if not rows:
            return
        
        self.ln(3)
        num_cols = max(len(r) for r in rows)
        col_w = min(180 / num_cols, 60)
        
        for ri, row in enumerate(rows):
            if ri == 0:
                self.set_font('Helvetica', 'B', 8)
                self.set_fill_color(230, 238, 250)
            else:
                self.set_font('Helvetica', '', 8)
                self.set_fill_color(255, 255, 255) if ri % 2 == 0 else self.set_fill_color(248, 248, 252)
            
            self.set_text_color(40, 40, 40)
            max_h = 5
            for ci in range(num_cols):
                cell_text = self._clean(row[ci]) if ci < len(row) else ""
                self.cell(col_w, max_h, cell_text[:30], border=1, fill=True)
            self.ln()
        
        self.ln(3)
    
    def _clean(self, text):
        """Remove markdown formatting for PDF rendering."""
        # Remove bold/italic markers
        text = re.sub(r'\*\*\*(.+?)\*\*\*', r'\1', text)
        text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
        text = re.sub(r'\*(.+?)\*', r'\1', text)
        # Remove links
        text = re.sub(r'\[(.+?)\]\(.+?\)', r'\1', text)
        # Remove inline code
        text = re.sub(r'`(.+?)`', r'\1', text)
        # Remove LaTeX
        text = re.sub(r'\$(.+?)\$', r'\1', text)
        # Clean special chars that fpdf2 can't handle
        text = text.replace('→', '->')
        text = text.replace('←', '<-')
        text = text.replace('≈', '~')
        text = text.replace('≥', '>=')
        text = text.replace('≤', '<=')
        text = text.replace('×', 'x')
        text = text.replace('μ', 'u')
        text = text.replace('τ', 'tau')
        text = text.replace('κ', 'kappa')
        text = text.replace('δ', 'delta')
        text = text.replace('Δ', 'Delta')
        text = text.replace('σ', 'sigma')
        text = text.replace('ν', 'nu')
        text = text.replace('²', '2')
        text = text.replace('³', '3')
        text = text.replace('°', 'deg')
        text = text.replace('±', '+/-')
        text = text.replace('·', '.')
        text = text.replace('"', '"')
        text = text.replace('"', '"')
        text = text.replace(''', "'")
        text = text.replace(''', "'")
        text = text.replace('—', '--')
        text = text.replace('–', '-')
        text = text.replace('…', '...')
        text = text.replace('\\_', '_')
        return text.encode('latin-1', 'replace').decode('latin-1')


def generate_pdf(config):
    """Generate a PDF from the given configuration."""
    pdf = AVBCPdf(config)
    pdf.add_cover_page()
    
    for fname in config["files"]:
        fpath = config["dir"] / fname
        if not fpath.exists():
            print(f"  ⚠️  {fname} not found, skipping")
            continue
        
        print(f"  📄 Processando: {fname}")
        text = fpath.read_text(encoding='utf-8')
        pdf.render_markdown(text)
    
    pdf.output(str(config["output"]))
    size_kb = config["output"].stat().st_size / 1024
    print(f"\n✅ PDF salvo em: {config['output']}")
    print(f"   Tamanho: {size_kb:.1f} KB\n")


if __name__ == "__main__":
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    target = sys.argv[1] if len(sys.argv) > 1 else "both"
    
    if target in ("pt", "both"):
        print("\n🇧🇷 Gerando PDF PT...")
        generate_pdf(PT_CONFIG)
    
    if target in ("en", "both"):
        print("\n🇬🇧 Gerando PDF EN...")
        generate_pdf(EN_CONFIG)
    
    print("🎉 PDFs gerados com sucesso!")
