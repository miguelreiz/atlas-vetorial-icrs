import os
import subprocess
import csv

arcs = [0, 90, 160, 210, 255, 300, 310, 320, 330, 340, 350, 360]
FEBIO_BIN = "/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4"

os.chdir("simulations")

results = {}

for arc in arcs:
    # 1. Generate model
    model_file = f"models/test_arc_{arc}.feb"
    cmd_gen = ["python3", "generate_febio_model.py", "--arc", str(arc), "--output", model_file]
    subprocess.run(cmd_gen, check=True)
    
    # 2. Run FEBio
    cmd_run = [FEBIO_BIN, "-i", model_file]
    print(f"Running FEBio for arc {arc}...")
    subprocess.run(cmd_run, capture_output=True, text=True)
    
    # 3. Read output
    csv_file = f"models/test_arc_{arc}_nodes.csv"
    if not os.path.exists(csv_file):
        print(f"Failed to find {csv_file}")
        continue
    
    with open(csv_file, "r") as f:
        # FEBio CSV output format:
        # *Time, <time>
        # Node, ux, uy, uz
        lines = f.readlines()
        
        # We need the last block of time (time=1.0)
        # Node 482 is the anterior apex
        uz_apex = None
        for line in reversed(lines):
            parts = line.strip().split(',')
            if len(parts) >= 4 and parts[0] == "482":
                uz_apex = float(parts[3]) * 1000  # convert to um
                break
        
        if uz_apex is not None:
            results[arc] = uz_apex
            print(f"Arc {arc}° -> uz = {uz_apex:.2f} um")
        else:
            print(f"Failed to find node 482 in {csv_file}")

print("\n--- RESULTS ---")
print("Arc (deg) | Apical Displacement (um) | % Change vs Baseline")
baseline = results.get(0, 360.9)
for arc in arcs:
    if arc in results:
        val = results[arc]
        pct = ((val - baseline) / baseline) * 100
        print(f"{arc:<9} | {val:<24.2f} | {pct:+.1f}%")
