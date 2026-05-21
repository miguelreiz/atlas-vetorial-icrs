import shutil, os

dst = r'D:\Antigravity\Aulas vetores corneanos\capitulos'

# Copy the EXPANDED versions of Ch.9 and Ch.10 from the finalizer agent
expanded = {
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap09_classificacao_avbc.md': 'cap09_classificacao_avbc.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\cap10_validacao_fem.md': 'cap10_validacao_fem.md',
    r'C:\Users\3D_OCT\.gemini\antigravity\brain\88ba3e79-0113-4786-bd92-32ab26186e3e\revisao_completa.md': 'revisao_completa.md',
}

for src, name in expanded.items():
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(dst, name))
        sz = os.path.getsize(src) / 1024
        print(f"  [UPDATED] {name:45s} ({sz:.1f} KB)")
    else:
        print(f"  [NOT FOUND] {name}")

# Final count
total_kb = 0
md_count = 0
for f in sorted(os.listdir(dst)):
    if f.endswith('.md'):
        sz = os.path.getsize(os.path.join(dst, f))
        total_kb += sz
        md_count += 1

print(f"\nTotal: {md_count} markdown files, {total_kb/1024:.0f} KB ({total_kb/1024/1024:.1f} MB)")
