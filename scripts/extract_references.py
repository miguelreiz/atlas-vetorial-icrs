#!/usr/bin/env python3
"""
Extrai a lista de referências do manuscrito Word e salva em JSON.
"""

import json
import re
from pathlib import Path
import docx

PROJECT = Path(__file__).resolve().parent.parent
DOCX = PROJECT / "Analise_Vetorial_Biomecanica_Corneana_PT.docx"
OUT = PROJECT / "references.json"

if not DOCX.exists():
    raise FileNotFoundError(f"Arquivo {DOCX} não encontrado.")

doc = docx.Document(DOCX)
refs = []
collect = False

for para in doc.paragraphs:
    txt = para.text.strip()
    if re.match(r"^Referências$", txt, flags=re.I):
        collect = True
        continue
    if collect:
        if not txt:
            # blank line ends the section
            collect = False
            continue
        # Remove leading numbering (e.g. "[1]" or "1.")
        clean = re.sub(r"^\s*(\[\d+\]|\d+\.)\s*", "", txt)
        refs.append(clean)

OUT.write_text(json.dumps(refs, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"[extract] Extraiu {len(refs)} referências do Word → {OUT.name}")
