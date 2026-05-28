#!/usr/bin/env python3
"""
Consulta a API Entrez (PubMed) para cada referência em references.json.

Gera pubmed_results.json com campos:
  original, pmid, title, authors, year, doi, journal

Respeita o rate-limit do NCBI (≤3 req/s) usando time.sleep(0.35).
"""

import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional
from xml.etree import ElementTree as ET

PROJECT = Path(__file__).resolve().parent.parent
REFS_FILE = PROJECT / "references.json"
OUT_FILE = PROJECT / "pubmed_results.json"

ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
EFETCH  = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


def build_query(ref_text: str) -> str:
    """Extrai autor principal + palavras-chave do título para montar a query."""
    # Tentar extrair primeiro autor (padrão: "Sobrenome AB, ...")
    m = re.match(r"^([A-ZÀ-Ü][a-zà-ü]+(?:\s[A-ZÀ-Ü][a-zà-ü]+)*)\s+[A-Z]{1,3}[,.]", ref_text)
    author = ""
    if m:
        author = m.group(1)

    # Tentar extrair título (texto entre pontos ou após as iniciais do autor)
    parts = ref_text.split(".")
    title_candidates = [p.strip() for p in parts if len(p.strip()) > 20]
    title_words = ""
    if title_candidates:
        # Pegar as 5 primeiras palavras significativas do título
        words = [w for w in title_candidates[0].split() if len(w) > 3][:5]
        title_words = " ".join(words)

    query_parts = []
    if author:
        query_parts.append(f"{author}[Author]")
    if title_words:
        query_parts.append(f"{title_words}[Title]")

    if query_parts:
        return " AND ".join(query_parts)
    # Fallback: usar as primeiras 8 palavras significativas
    words = [w for w in ref_text.split() if len(w) > 3][:8]
    return " ".join(words)


def esearch(query: str) -> Optional[str]:
    """Busca no PubMed e retorna o primeiro PMID ou None."""
    params = urllib.parse.urlencode({
        "db": "pubmed",
        "term": query,
        "retmode": "json",
        "retmax": "1",
    })
    url = f"{ESEARCH}?{params}"
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            data = json.loads(resp.read())
        ids = data.get("esearchresult", {}).get("idlist", [])
        return ids[0] if ids else None
    except Exception:
        return None


def efetch_summary(pmid: str) -> dict:
    """Obtém metadados de um artigo pelo PMID."""
    params = urllib.parse.urlencode({
        "db": "pubmed",
        "id": pmid,
        "retmode": "xml",
    })
    url = f"{EFETCH}?{params}"
    meta = {"pmid": pmid}
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            xml_bytes = resp.read()
        root = ET.fromstring(xml_bytes)
        article = root.find(".//PubmedArticle")
        if article is None:
            return meta

        meta["title"] = (article.findtext(".//ArticleTitle") or "").strip()

        # Ano
        year = article.findtext(".//PubDate/Year")
        if not year:
            year = article.findtext(".//PubDate/MedlineDate") or ""
            ym = re.search(r"(\d{4})", year)
            year = ym.group(1) if ym else ""
        meta["year"] = year

        # Autores
        authors = []
        for au in article.findall(".//Author"):
            last = au.findtext("LastName") or ""
            fore = au.findtext("ForeName") or ""
            if last:
                authors.append(f"{last} {fore}".strip())
        meta["authors"] = authors

        # Journal
        meta["journal"] = (article.findtext(".//Journal/Title") or "").strip()

        # DOI
        for aid in article.findall(".//ArticleId"):
            if aid.get("IdType") == "doi":
                meta["doi"] = aid.text or ""
                break
        else:
            meta["doi"] = ""

    except Exception as e:
        meta["error"] = str(e)

    return meta


def main():
    if not REFS_FILE.exists():
        print(f"[pubmed] ERRO: {REFS_FILE} não existe. Execute extract_references.py primeiro.",
              file=sys.stderr)
        sys.exit(1)

    refs = json.loads(REFS_FILE.read_text(encoding="utf-8"))
    print(f"[pubmed] Consultando PubMed para {len(refs)} referências…")

    results = []
    found = 0
    for i, ref in enumerate(refs, 1):
        query = build_query(ref)
        pmid = esearch(query)
        time.sleep(0.35)  # rate-limit

        if pmid:
            meta = efetch_summary(pmid)
            time.sleep(0.35)
            found += 1
        else:
            meta = {"pmid": None}

        meta["original"] = ref
        meta["index"] = i
        results.append(meta)

        # Progresso
        status = f"PMID {pmid}" if pmid else "NÃO ENCONTRADO"
        print(f"  [{i}/{len(refs)}] {status} — {ref[:60]}…")

    OUT_FILE.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n[pubmed] Concluído: {found}/{len(refs)} encontrados → {OUT_FILE.name}")


if __name__ == "__main__":
    main()
