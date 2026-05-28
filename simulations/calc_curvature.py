import os
import subprocess
import math
import numpy as np
from scipy.optimize import least_squares
import sys

sys.path.append(os.getcwd())
import generate_febio_model as gf

arcs = [0, 90, 160, 210, 255, 300, 310, 320, 330, 340, 350, 360]
FEBIO_BIN = "/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4"

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
for nid, n in base_nodes.items():
    if n.layer == 1:
        r_dist = math.sqrt(n.x**2 + n.y**2)
        if r_dist <= 1.5:  
            central_nids.append(nid)

print("Arc (deg) | Apical Disp (um) | K-mean (D) | Flat vs Base (D)")
results = {}

for arc in arcs:
    model_file = f"models/test_arc_{arc}.feb"
    subprocess.run(["python3", "generate_febio_model.py", "--arc", str(arc), "--output", model_file], capture_output=True)
    subprocess.run([FEBIO_BIN, "-i", model_file], capture_output=True)
    
    csv_file = f"models/test_arc_{arc}_nodes.csv"
    if not os.path.exists(csv_file):
        continue
        
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
        pts_array = np.array(deformed_pts)
        R_fit = fit_sphere(pts_array)
        k_val = calc_k(R_fit)
        results[arc] = (uz_apex, k_val)
        
baseline_k = results[0][1] if 0 in results else 60.11

for arc in arcs:
    if arc in results:
        uz, k = results[arc]
        flat = k - baseline_k
        print(f"{arc:<9} | {uz:<16.2f} | {k:<10.2f} | {flat:+.2f}")
