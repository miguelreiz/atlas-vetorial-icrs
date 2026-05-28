import os
import glob
import re

directories = ["capitulos_pt", "capitulos"]

replacements = {
    r"\\delta_\{ring\}": "δ_ring",
    r"\\delta": "δ",
    r"\\Delta": "Δ",
    r"\\tau": "τ",
    r"\\theta_\{topo\}": "θ_topo",
    r"\\theta_\{coma\}": "θ_coma",
    r"\\theta": "θ",
    r"\\mu\s*m": "μm",
    r"\\mu": "μ",
    r"\\propto": "∝",
    r"\\approx": "≈",
    r"\^\\circ": "°",
    r"ICE_\{min\}": "ICE_min",
    r"R\^2": "R²",
    r"Z_2\^0": "Z_2^0",
    r"Z_2\^2": "Z_2^2",
    r"Z_3\^1": "Z_3^1",
    r"\\ ": " ",
    r"\$\$": "" # Remove block math
}

for d in directories:
    for path in glob.glob(os.path.join(d, "*.md")):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Apply specific LaTeX symbol replacements
        for k, v in replacements.items():
            content = re.sub(k, v, content)
            
        # Remove remaining single $ signs
        content = content.replace("$", "")
        
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
            
print("Math formatting cleanup complete.")
