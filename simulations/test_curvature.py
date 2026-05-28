import os
import math
import numpy as np
from scipy.optimize import least_squares
import sys
import subprocess

sys.path.append(os.getcwd())
import generate_febio_model as gf

def fit_sphere(points):
    cx_guess = 0.0
    cy_guess = 0.0
    cz_guess = -8.3
    
    def calc_R(c):
        return np.linalg.norm(points - c, axis=1)

    def cost(c):
        R = calc_R(c)
        return R - np.mean(R)
        
    c0 = np.array([cx_guess, cy_guess, cz_guess])
    res = least_squares(cost, c0)
    R_fit = np.mean(calc_R(res.x))
    return R_fit

def calc_k(r):
    if r == 0: return 0
    return 337.5 / r

base_nodes = {n.id: n for n in gf.generate_nodes()}
central_nids = []
orig_pts = []
for nid, n in base_nodes.items():
    if n.layer == 1:
        r_dist = math.sqrt(n.x**2 + n.y**2)
        if r_dist <= 1.5:
            central_nids.append(nid)
            orig_pts.append([n.x, n.y, n.z])

# 1. Gerar o modelo com a pressão corrigida
subprocess.run(["python3", "generate_febio_model.py", "--arc", "0", "--output", "models/test_arc_0.feb"], check=True)

# 2. Rodar o FEBio
subprocess.run(["/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4", "-i", "models/test_arc_0.feb"], capture_output=True)

# 3. Ler resultados
csv_file = f"models/test_arc_0_nodes.csv"
if os.path.exists(csv_file):
    with open(csv_file, "r") as f:
        lines = f.readlines()
    displacements = {}
    uz_apex = 0
    for line in reversed(lines):
        if line.startswith("*Time"):
            break 
        parts = line.strip().split(',')
        if len(parts) >= 4:
            nid = int(parts[0])
            ux, uy, uz = float(parts[1]), float(parts[2]), float(parts[3])
            displacements[nid] = (ux, uy, uz)
            if nid == 482:
                uz_apex = uz * 1000

    deformed_pts = []
    for nid in central_nids:
        orig = base_nodes[nid]
        if nid in displacements:
            dx, dy, dz = displacements[nid]
            deformed_pts.append([orig.x + dx, orig.y + dy, orig.z + dz])
    
    if deformed_pts:
        deformed_pts = np.array(deformed_pts)
        R_def = fit_sphere(deformed_pts)
        K_def = calc_k(R_def)
        print(f"Deformed K-mean: {K_def:.2f} D")
        print(f"Apical Disp (uz): {uz_apex:.2f} um")
