#!/usr/bin/env python3
"""
Compara as referências originais com os dados obtidos do PubMed
e gera um relatório Markdown detalhado.
"""

import json
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
IN_FILE = PROJECT / "pubmed_results.json"
REPORT  = PROJECT / "reference_verification_report.md"


def normalise(s: str) -> str:
    return " ".join(s.lower().split())


def main():
    if not IN_FILE.exists():
        print(f"[compare] ERRO: {IN_FILE} não existe.", file=sys.stderr)
        sys.exit(1)

    data = json.loads(IN_FILE.read_text(encoding="utf-8"))

    lines = [
        "# Relatório de Verificação de Referências (PubMed)",
        "",
        f"**Total de referências analisadas:** {len(data)}",
        "",
    ]

    stats = {"ok": 0, "inconsistente": 0, "nao_encontrado": 0}

    for entry in data:
        idx = entry.get("index", "?")
        orig = entry["original"]
        pmid = entry.get("pmid")

        if not pmid:
            stats["nao_encontrado"] += 1
            lines.append(f"### {idx}. ❌ Não encontrado no PubMed")
            lines.append(f"- **Original:** {orig}")
            lines.append(f"- **Ação:** Verificar manualmente (livro, tese, ou artigo não indexado)")
            lines.append("")
            continue

        mismatches = []

        # Título
        title = entry.get("title", "")
        if title and normalise(title)[:40] not in normalise(orig):
            mismatches.append(f"  - **Título PubMed:** {title}")

        # Ano
        year = entry.get("year", "")
        if year and year not in orig:
            mismatches.append(f"  - **Ano PubMed:** {year}")

        # DOI
        doi = entry.get("doi", "")
        if doi and doi.lower() not in orig.lower():
            mismatches.append(f"  - **DOI PubMed:** {doi}")

        # Autor principal
        authors = entry.get("authors", [])
        if authors:
            primary_last = authors[0].split()[0] if authors[0] else ""
            if primary_last and primary_last.lower() not in orig.lower():
                mismatches.append(f"  - **1º Autor PubMed:** {authors[0]}")

        # Journal
        journal = entry.get("journal", "")

        if mismatches:
            stats["inconsistente"] += 1
            lines.append(f"### {idx}. ⚠️ Inconsistências detectadas")
            lines.append(f"- **Original:** {orig}")
            lines.append(f"- **PMID:** [{pmid}](https://pubmed.ncbi.nlm.nih.gov/{pmid}/)")
            if journal:
                lines.append(f"- **Journal:** {journal}")
            lines.append("- **Divergências:**")
            lines.extend(mismatches)
        else:
            stats["ok"] += 1
            lines.append(f"### {idx}. ✅ OK")
            lines.append(f"- **Original:** {orig}")
            lines.append(f"- **PMID:** [{pmid}](https://pubmed.ncbi.nlm.nih.gov/{pmid}/)")

        lines.append("")

    # Sumário no topo
    summary = [
        "---",
        "",
        "## Resumo",
        "",
        f"| Status | Quantidade |",
        f"|---|---|",
        f"| ✅ Consistentes | {stats['ok']} |",
        f"| ⚠️ Com inconsistências | {stats['inconsistente']} |",
        f"| ❌ Não encontrados | {stats['nao_encontrado']} |",
        f"| **Total** | **{len(data)}** |",
        "",
        "---",
        "",
    ]

    # Inserir sumário após o cabeçalho
    lines[3:3] = summary

    REPORT.write_text("\n".join(lines), encoding="utf-8")
    print(f"\n[compare] Relatório gerado → {REPORT.name}")
    print(f"  ✅ {stats['ok']}  ⚠️ {stats['inconsistente']}  ❌ {stats['nao_encontrado']}")


if __name__ == "__main__":
    main()
