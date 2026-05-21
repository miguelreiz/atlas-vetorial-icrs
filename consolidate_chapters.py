import shutil
import os

dst = r'D:\Antigravity\Aulas vetores corneanos\capitulos'
os.makedirs(dst, exist_ok=True)

# Map of all chapter files from various agent directories
chapters = {
    # Agent 88ba (main finalizer)
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap01_cornea_biomecanica.md': 'cap01_cornea_biomecanica.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap02_como_icrs_funcionam.md': 'cap02_como_icrs_funcionam.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap11_fluxo_clinico.md': 'cap11_fluxo_clinico.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap12_casos_ilustrativos.md': 'cap12_casos_ilustrativos.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap13_limitacoes_futuro.md': 'cap13_limitacoes_futuro.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap14_plataforma_software.md': 'cap14_plataforma_software.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap15_conclusao.md': 'cap15_conclusao.md',
    # Subagents
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\d31600d0-dc49-4b70-9028-e455c2f32ecb\cap03_metodo_alpins.md': 'cap03_metodo_alpins.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\c153f4c2-3bec-4298-acc0-242893f5ea94\cap04_limites_nomogramas.md': 'cap04_limites_nomogramas.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\5a4358fe-46fe-4dc1-b7b3-b7361fe5b092\cap05_tres_dominios.md': 'cap05_tres_dominios.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\c7cbcbf9-7886-4026-aa79-151c57ba0249\cap06_vetor_VR.md': 'cap06_vetor_VR.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\1cdcf2bc-931e-4440-8810-bb414d79fe2b\cap07_vetor_VT.md': 'cap07_vetor_VT.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\68e7ebff-8332-4af0-9b9a-b7f00d2e2041\cap08_vetor_Vtau.md': 'cap08_vetor_Vtau.md',
    # Pre-existing (parent conversation)
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\7e53dd99-6c14-4f96-ae3a-1b91f95da37e\capitulo09_classificacao_avbc.md': 'cap09_classificacao_avbc.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\7e53dd99-6c14-4f96-ae3a-1b91f95da37e\capitulo10_validacao_fem.md': 'cap10_validacao_fem.md',
    # Integration artifacts
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\indice_geral.md': 'indice_geral.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\revisao_completa.md': 'revisao_completa.md',
    # Proposal
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\7e53dd99-6c14-4f96-ae3a-1b91f95da37e\proposta_elsevier_avbc.md': 'proposta_elsevier_avbc.md',
    # Formalization
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\7e53dd99-6c14-4f96-ae3a-1b91f95da37e\formalizacao_vetores_avbc.md': 'formalizacao_vetores_avbc.md',
}

copied = 0
missing = 0
for src, name in sorted(chapters.items(), key=lambda x: x[1]):
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(dst, name))
        size_kb = os.path.getsize(src) / 1024
        print(f"  [OK] {name:45s} ({size_kb:.1f} KB)")
        copied += 1
    else:
        print(f"  [MISS] {name:45s} <- {src}")
        missing += 1

print(f"\nCopied {copied} files, {missing} missing.")
print(f"Destination: {dst}")

# List final contents
print(f"\nFinal directory listing:")
for f in sorted(os.listdir(dst)):
    if f.endswith('.md'):
        sz = os.path.getsize(os.path.join(dst, f)) / 1024
        print(f"  {f:50s} {sz:6.1f} KB")
