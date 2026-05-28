#!/usr/bin/env python3
"""
Atualiza as referências do manuscrito Word usando os resultados da consulta PubMed.

Entrada:
- `pubmed_results.json` – gerado por pubmed_lookup.py (contém campos originais, PMID, DOI, título, autores, ano).
- `Analise_Vetorial_Biomecanica_Corneana_PT.docx` – manuscrito original.

Saída:
- `Analise_Vetorial_Biomecanica_Corneana_PT_updated.docx` – documento com referências corrigidas.
"""

import json
import re
from pathlib import Path
import docx

# Paths (relative to project root)
DOCX_IN = Path("Analise_Vetorial_Biomecanica_Corneana_PT.docx")
DOCX_OUT = Path("Analise_Vetorial_Biomecanica_Corneana_PT_updated.docx")
RESULTS = Path("pubmed_results.json")

# Load PubMed results
with RESULTS.open(encoding="utf-8") as f:
    records = json.load(f)

# Build a lookup by index (1‑based) – assume the order matches the manuscript numbering
lookup = {i + 1: rec for i, rec in enumerate(records)}

def format_ref(rec):
    if not rec.get("pmid"):
        return rec["original"]
    authors = rec.get("authors", [])
    if not authors:
        author_str = ""
    elif len(authors) <= 3:
        author_str = ", ".join(authors)
    else:
        author_str = authors[0] + " et al."
    title = rec.get("title", "").strip()
    year = rec.get("year", "").strip()
    doi = rec.get("doi", "").strip()
    parts = [author_str, title]
    if year:
        parts.append(year)
    if doi:
        parts.append(f"doi:{doi}")
    return ". ".join(filter(None, parts)) + "."

# Open the original document
doc = docx.Document(DOCX_IN)

# Replace reference paragraphs
in_refs = False
for para in doc.paragraphs:
    txt = para.text.strip()
    if re.match(r"^Referências$", txt, flags=re.I):
        in_refs = True
        continue
    if in_refs:
        if not txt:
            in_refs = False
            continue
        m = re.match(r"^(\[?\d+\]?\.?\s*)(.*)", txt)
        if not m:
            continue
        num_part, _ = m.groups()
        num = int(re.sub(r"[^0-9]", "", num_part))
        rec = lookup.get(num)
        if rec:
            para.text = f"{num_part}{format_ref(rec)}"

# Save updated file
doc.save(DOCX_OUT)
print(f"Documento atualizado salvo em {DOCX_OUT}")
