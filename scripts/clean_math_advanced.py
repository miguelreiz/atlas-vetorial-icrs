import os
import glob
import re

directories = ["capitulos_pt", "capitulos"]

replacements = {
    r"\\frac\{(.*?)\}\{(.*?)\}": r"(\1) / (\2)",
    r"\\mathbf\{(.*?)\}": r"\1",
    r"\\mathrm\{(.*?)\}": r"\1",
    r"\\partial\s*": "∂",
    r"\\Psi": "Ψ",
    r"\\sigma": "σ",
    r"\\varepsilon": "ε",
    r"\\sum_\{i=1\}\^2": "Σ(i=1..2)",
    r"\\left": "",
    r"\\right": "",
    r"\\langle": "<",
    r"\\rangle": ">",
    r"\\otimes": "⊗",
    r"\\bullet": "•",
    r"\\boldsymbol\{(.*?)\}": r"\1",
    r"\\bar\{(.*?)\}": r"\1_bar",
    r"\\exp": "exp",
    r"\\mathbb\{(.*?)\}": r"\1",
    r"\\mathrm": "",
    r"\\tilde\{(.*?)\}": r"\1",
    r"\\_": "_",
    r"\\text\{(.*?)\}": r"\1"
}

for d in directories:
    for path in glob.glob(os.path.join(d, "*.md")):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        for k, v in replacements.items():
            content = re.sub(k, v, content)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
            
print("Advanced math formatting cleanup complete.")
