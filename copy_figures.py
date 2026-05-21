import shutil, os

src = r'D:\Projetos\Antigravity\Vetores Anel\fem\Simulation_Core\avbc_batch_output'
dst = r'D:\Antigravity\Aulas vetores corneanos\book_figures'

os.makedirs(dst, exist_ok=True)

count = 0
for f in os.listdir(src):
    if f.endswith('.png'):
        shutil.copy2(os.path.join(src, f), dst)
        count += 1

print(f"Copied {count} figures to {dst}")
