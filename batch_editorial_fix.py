#!/usr/bin/env python3
"""
Batch editorial terminology corrections for the book manuscript.
Applies the terminology dictionary across all chapters.
"""
import os, re, glob

CHAPTERS_DIR = "capitulos_pt"

# PT-PT → PT-BR corrections (non-contextual, safe to batch)
PT_CORRECTIONS = {
    "secção": "seção",
    "Secção": "Seção",
    "secções": "seções",
    "perspetiva": "perspectiva",
    "Perspetiva": "Perspectiva",
    "perspetivas": "perspectivas",
    "conceção": "concepção",
    "Conceção": "Concepção",
    "génese": "gênese",
    "Génese": "Gênese",
    "colagénio": "colágeno",
    "Colagénio": "Colágeno",
    "queratocone": "ceratocone",
    "Queratocone": "Ceratocone",
    "contacto": "contato",
    "Contacto": "Contato",
    "recetivo": "receptivo",
    "Recetivo": "Receptivo",
    "receção": "recepção",
    "Receção": "Recepção",
    "caraterística": "característica",
    "Caraterística": "Característica",
    "caraterísticas": "características",
    "Caraterísticas": "Características",
}

# Typography fixes
TYPO_FIXES = {
    "  ": " ",  # double spaces
}

def apply_corrections(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = []
    
    # Apply PT-PT → PT-BR
    for wrong, correct in PT_CORRECTIONS.items():
        if wrong in content:
            count = content.count(wrong)
            content = content.replace(wrong, correct)
            changes.append(f"  '{wrong}' → '{correct}' ({count}x)")
    
    # Apply typography
    for wrong, correct in TYPO_FIXES.items():
        while wrong in content:
            content = content.replace(wrong, correct)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes
    return []

def main():
    files = sorted(glob.glob(os.path.join(CHAPTERS_DIR, "*.md")))
    # exclude backup
    files = [f for f in files if "_backup" not in f]
    
    total_changes = 0
    print(f"Processando {len(files)} ficheiros em {CHAPTERS_DIR}/\n")
    
    for filepath in files:
        basename = os.path.basename(filepath)
        changes = apply_corrections(filepath)
        if changes:
            print(f"✏️  {basename}:")
            for c in changes:
                print(c)
            total_changes += len(changes)
        else:
            print(f"✅ {basename}: sem correções necessárias")
    
    print(f"\n{'='*50}")
    print(f"Total de tipos de correção aplicados: {total_changes}")

if __name__ == "__main__":
    main()
