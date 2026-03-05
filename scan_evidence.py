#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scan_evidence.py — Atlas Vetorial ICRS
Varredura automática de afirmações biomecânicas sem marcação de nível de evidência.

Procura por linhas que:
  - Contêm dados numéricos (%, kPa, D, µm, mm, nm) ou afirmações factuais
  - NÃO contêm os marcadores: ✅ 🔬 💡 ⚠️
  - NÃO estão em blocos de código (```), YAML, tabelas de especificação, ou legendas de figura

Saída: relatório Markdown por capítulo com linha, contexto e prioridade sugerida.
"""

import os
import re
from pathlib import Path

CHAPTERS_DIR = Path(r"c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\chapters\pt")
OUTPUT_FILE  = Path(r"c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\RELATORIO_EVIDENCIAS.md")

EVIDENCE_MARKERS = ["✅", "🔬", "💡", "⚠️"]

# Padrões que indicam afirmação factual quantitativa
FACTUAL_PATTERNS = [
    r"\d+[\.,]\d*\s*(kPa|MPa|GPa)",       # pressão
    r"\d+[\.,]\d*\s*(µm|mm|nm|%)",        # medidas
    r"~?\d+[\.,]?\d*\s*[Dd]iopter",       # dioptrias
    r"\d+\s*×\s*\d+",                     # multiplicadores
    r"[Mm]ódulo\s+de\s+[Yy]oung",         # módulo
    r"[Ee]feito\s+de\s+(Arc|Poisson|Von|Acoplamento|Tenda|Tenting)",
    r"\d+[\.,]\d*\s*[Kk][Pp][Aa]",
    r"(aumenta?|reduz?|diminui?|cresce?)\s+\d+",
    r"\d+\s*(vezes|×)\s+mai(or|s)",
    r"(84|13|2|3|70|80|50|30|300|400)\s*%",  # percentuais específicos do Atlas
    r"(Hashemi|Wollensak|Kohlhaas|Kling|Marcos|Meek|Boote|Winkler|Radner|García)",
    r"(Lei de Barraquer|Arc-Shortening|efeito tenda|Efeito de Acoplamento)",
]

# Linhas a ignorar (não são afirmações factuais)
IGNORE_PATTERNS = [
    r"^#",           # títulos
    r"^\s*\|",       # linhas de tabela (cabeçalho ou dados)
    r"^\s*>",        # blockquotes (já são notas)
    r"^\s*-\s*\*\*", # negrito em listas (definições)
    r"^\s*!\[",      # legendas de imagem
    r"^\s*\*Pipeline", # status pipeline
    r"^\s*\*Total",
    r"version:",
    r"chapter_id:",
    r"doi:",
    r"journal:",
    r"title:",
    r"relevance:",
]

# Blocos a pular completamente
BLOCK_SKIP_START = ["```", "```yaml", "```python"]
BLOCK_SKIP_END   = "```"


def has_evidence(line):
    return any(m in line for m in EVIDENCE_MARKERS)


def is_factual_claim(line):
    return any(re.search(p, line, re.IGNORECASE) for p in FACTUAL_PATTERNS)


def should_ignore(line):
    return any(re.match(p, line) for p in IGNORE_PATTERNS)


def priority(line):
    """Retorna ALTA, MÉDIA ou BAIXA baseado no conteúdo da linha."""
    if any(m in line for m in ["doi", "IOVS", "Ophthalmol", "JCRS", "PLOS", "Cornea"]):
        return "🟡 MÉDIA"
    if any(p in line.lower() for p in ["%", "kpa", "µm", "mpa", "vezes", "módulo"]):
        return "🔴 ALTA"
    return "🟢 BAIXA"


def scan_file(fpath):
    results = []
    in_block = False
    
    with open(fpath, encoding="utf-8") as f:
        lines = f.readlines()
    
    for i, raw_line in enumerate(lines, 1):
        line = raw_line.rstrip()
        
        # Detectar blocos de código
        if line.strip().startswith("```"):
            in_block = not in_block
            continue
        if in_block:
            continue
        
        # Ignorar linhas triviais
        if not line.strip():
            continue
        if should_ignore(line):
            continue
        
        # Afirmação factual sem marcação
        if is_factual_claim(line) and not has_evidence(line):
            results.append({
                "line": i,
                "text": line.strip()[:150],
                "priority": priority(line),
            })
    
    return results


def format_report(chapter_reports):
    lines = [
        "# Relatório de Varredura de Evidências — Atlas Vetorial ICRS",
        "",
        "> Gerado por `scan_evidence.py` — identifica afirmações factuais sem marcação ✅/🔬/💡/⚠️",
        "> **Para cada ocorrência:** avaliar se deve receber ✅ (com DOI), 🔬 (síntese), 💡 (hipótese) ou ⚠️ (estimativa).",
        "",
        "## Resumo por Capítulo",
        "",
        "| Capítulo | Ocorrências Alta | Média | Baixa |",
        "|----------|-----------------|-------|-------|",
    ]
    
    summary_rows = []
    details = []
    
    for chap, items in chapter_reports:
        alta  = sum(1 for x in items if "ALTA"  in x["priority"])
        media = sum(1 for x in items if "MÉDIA" in x["priority"])
        baixa = sum(1 for x in items if "BAIXA" in x["priority"])
        
        summary_rows.append(f"| **{chap}** | {alta} | {media} | {baixa} |")
        
        if items:
            details.append(f"\n---\n\n### {chap}\n")
            details.append(f"**{len(items)} ocorrência(s)**\n")
            for item in items:
                details.append(f"\n**Linha {item['line']}** — {item['priority']}")
                details.append(f"\n```\n{item['text']}\n```\n")
    
    lines += summary_rows
    lines += ["\n---\n\n## Detalhamento por Capítulo\n"]
    lines += details
    lines += [
        "\n---\n",
        "*Varredura concluída. Ação recomendada: revisar ocorrências de prioridade ALTA primeiro.*"
    ]
    
    return "\n".join(lines)


def main():
    chapter_reports = []
    
    md_files = sorted(CHAPTERS_DIR.glob("*.md"))
    # Excluir o próprio glossário e referências da varredura
    exclude = {"GLOSSARIO_TERMOS_TECNICOS.md", "REFERENCIAS_BIBLIOGRAFICAS.md"}
    md_files = [f for f in md_files if f.name not in exclude]
    
    total = 0
    for fpath in md_files:
        items = scan_file(fpath)
        chapter_reports.append((fpath.stem, items))
        total += len(items)
        print(f"  {fpath.name}: {len(items)} afirmações sem marcação")
    
    print(f"\nTotal: {total} afirmações para revisar em {len(md_files)} capítulos\n")
    
    report = format_report(chapter_reports)
    OUTPUT_FILE.write_text(report, encoding="utf-8")
    print(f"Relatório salvo: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
