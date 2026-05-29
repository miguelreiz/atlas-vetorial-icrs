#!/usr/bin/env python3
"""
run_torque_campaign_v2.py — Campanha FEBio v2: Validação do Vτ
================================================================
Correcções vs v1:
  1. Deslocamento prescrito uz = t_base (proporcional à espessura)
  2. Perfil progressivo linear: uz varia de t_base a t_base+t_delta
  3. Leitura correcta do último *Step do CSV FEBio
  4. Cálculo de migração do ápice (mm) e coma (μm RMS)
"""

import os, sys, json, csv, math, subprocess, time
from pathlib import Path

# ─── Caminhos ────────────────────────────────────────────────────────────────
ROOT   = Path(__file__).parent.parent
SIM    = ROOT / "simulations"
MODELS = SIM / "models_v2"
RESULT = SIM / "results" / "torque_campaign_v2"
FEBIO  = Path("/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4")

sys.path.insert(0, str(SIM))
from generate_febio_model import (
    HGOParams, ICRSConfig, generate_model,
    node_id, N_RING, N_SEC, N_Z, ICRS_RING
)

MODELS.mkdir(parents=True, exist_ok=True)
RESULT.mkdir(parents=True, exist_ok=True)

# ─── Configurações da campanha ────────────────────────────────────────────────
# Tabela 7.1 do livro: (250/150) → Δt=100μm → migração ~0.48mm
# Queremos reproduzir estes valores!

SYMMETRIC_CONFIGS = []
for arc in [90, 120, 160, 210, 270, 320]:
    for t_um in [100, 150, 200, 250, 300, 350]:
        SYMMETRIC_CONFIGS.append({
            "name":    f"SYM_t{t_um}_arc{arc}",
            "arc":     arc,
            "profile": "symmetric",
            "t_base":  t_um,
            "t_delta": 0,
        })

PROGRESSIVE_CONFIGS = []
for arc in [160, 210, 270]:
    for t_base, dt in [(200, 50), (200, 100), (200, 150), (250, 100), (250, 150), (300, 100)]:
        PROGRESSIVE_CONFIGS.append({
            "name":    f"PROG_t{t_base}+{dt}_arc{arc}",
            "arc":     arc,
            "profile": "linear",
            "t_base":  t_base,
            "t_delta": dt,
        })

CONTROL_CONFIGS = [
    {"name": "CTRL_no_ring",       "arc": 0,   "profile": "symmetric", "t_base": 0,   "t_delta": 0},
    {"name": "CTRL_sym200_arc160", "arc": 160, "profile": "symmetric", "t_base": 200, "t_delta": 0},
    {"name": "CTRL_sym250_arc160", "arc": 160, "profile": "symmetric", "t_base": 250, "t_delta": 0},
]

ALL_CONFIGS = SYMMETRIC_CONFIGS + PROGRESSIVE_CONFIGS + CONTROL_CONFIGS

# ─── Nós ICRS ────────────────────────────────────────────────────────────────
APEX_NODE = node_id(1, 0, 0)   # nó apical anterior

def sector_angle(sec): return sec * 360.0 / N_SEC

INF_SECTORS = [s for s in range(N_SEC) if 112.5 <= sector_angle(s) <= 247.5]
SUP_SECTORS = [s for s in range(N_SEC)
               if sector_angle(s) >= 292.5 or sector_angle(s) <= 67.5]

INF_NODES = {node_id(layer, ICRS_RING, s) for s in INF_SECTORS for layer in range(N_Z)}
SUP_NODES = {node_id(layer, ICRS_RING, s) for s in SUP_SECTORS for layer in range(N_Z)}

print(f"  ICRS inf: {len(INF_SECTORS)} setores, {len(INF_NODES)} nós")
print(f"  ICRS sup: {len(SUP_SECTORS)} setores, {len(SUP_NODES)} nós")

# ─── Geração dos .feb ────────────────────────────────────────────────────────

def make_feb(cfg: dict) -> Path:
    """Gera o ficheiro .feb com espessura proporcional."""
    hgo = HGOParams()
    icrs = ICRSConfig(
        arc_degrees      = cfg["arc"],
        symmetric        = (cfg["profile"] == "symmetric"),
        profile          = cfg["profile"],
        pachymetry       = 0.500,
        ring_thickness_um = cfg["t_base"],
        ring_delta_um     = cfg["t_delta"],
    )
    out = MODELS / f"{cfg['name']}.feb"
    if not out.exists():
        generate_model(hgo, icrs, str(out))
        print(f"    [GEN] {out.name}  (uz={cfg['t_base']}-{cfg['t_base']+cfg['t_delta']}μm)")
    else:
        print(f"    [OK ] {out.name}")
    return out

# ─── Execução FEBio ──────────────────────────────────────────────────────────

def run_febio(feb_path: Path) -> dict:
    log_path = feb_path.with_suffix(".log")
    t0 = time.time()
    try:
        result = subprocess.run(
            [str(FEBIO), "-i", str(feb_path)],
            capture_output=True, text=True, timeout=300
        )
        elapsed = time.time() - t0
        converged = ("N O R M A L   T E R M I N A T I O N" in result.stdout or
                     "N O R M A L   T E R M I N A T I O N" in result.stderr)
        with open(log_path, "w") as f:
            f.write(result.stdout + result.stderr)
        return {"converged": converged, "time_s": round(elapsed, 1),
                "returncode": result.returncode}
    except subprocess.TimeoutExpired:
        return {"converged": False, "time_s": 300, "returncode": -1}
    except Exception as e:
        return {"converged": False, "time_s": 0, "returncode": -99, "error": str(e)}

# ─── Leitura CSV FEBio (último step) ─────────────────────────────────────────

def read_last_step(csv_path: Path) -> dict:
    """Lê o ÚLTIMO bloco *Step do CSV FEBio. Retorna {nid: (ux,uy,uz)}."""
    disp = {}
    current_block = {}
    if not csv_path.exists():
        return disp
    try:
        with open(csv_path, "r") as f:
            for line in f:
                line = line.strip()
                if line.startswith("*Step"):
                    if current_block:
                        disp = dict(current_block)
                    current_block = {}
                elif line and not line.startswith("*"):
                    parts = line.split(",")
                    if len(parts) >= 4:
                        nid = int(parts[0])
                        ux, uy, uz = float(parts[1]), float(parts[2]), float(parts[3])
                        current_block[nid] = (ux, uy, uz)
        if current_block:
            disp = dict(current_block)
    except Exception as e:
        print(f"    [WARN] CSV: {e}")
    return disp

# ─── Extracção de métricas ────────────────────────────────────────────────────

R_CORNEA = 7.800   # mm
R_ICRS   = 3.500   # mm
COMA_PER_MM = 1.22  # μm RMS de coma por mm de Δd (Salmon & van de Pol 2006)

def extract_metrics(feb_path: Path, cfg: dict) -> dict:
    csv_path = feb_path.with_name(feb_path.stem + "_nodes.csv")
    disp = read_last_step(csv_path)

    if not disp:
        return {"status": "no_data"}

    # Deslocamento apical (VR proxy)
    apex = disp.get(APEX_NODE, (0,0,0))
    apex_uz_um = apex[2] * 1000  # mm → μm

    # Deslocamentos ICRS inf/sup
    inf_uz = [disp[n][2] for n in INF_NODES if n in disp]
    sup_uz = [disp[n][2] for n in SUP_NODES if n in disp]

    if not inf_uz or not sup_uz:
        return {"status": "missing_nodes", "delta_apex_um": round(apex_uz_um, 2)}

    d_inf_um = sum(inf_uz) / len(inf_uz) * 1000
    d_sup_um = sum(sup_uz) / len(sup_uz) * 1000
    asymm_um = d_inf_um - d_sup_um

    # Migração do ápice (mm)
    apex_shift_mm = abs(asymm_um) * (R_CORNEA / R_ICRS) / 1000.0

    # Coma induzido (μm RMS)
    coma_um = COMA_PER_MM * apex_shift_mm

    return {
        "delta_apex_um":  round(apex_uz_um, 2),
        "delta_inf_um":   round(d_inf_um, 2),
        "delta_sup_um":   round(d_sup_um, 2),
        "asymm_um":       round(asymm_um, 4),
        "apex_shift_mm":  round(apex_shift_mm, 4),
        "coma_um":        round(coma_um, 4),
        "n_inf": len(inf_uz),
        "n_sup": len(sup_uz),
        "status": "ok",
    }

# ─── Campanha ─────────────────────────────────────────────────────────────────

def run_campaign():
    results = []
    total = len(ALL_CONFIGS)

    print(f"\n{'='*70}")
    print(f"  CAMPANHA FEBio v2 — {total} configurações")
    print(f"  Deslocamento PROPORCIONAL a t_base (corrigido)")
    print(f"  FEBio: {FEBIO}")
    print(f"{'='*70}\n")

    t_campaign = time.time()

    for i, cfg in enumerate(ALL_CONFIGS):
        print(f"\n[{i+1:3d}/{total}] {cfg['name']}")
        print(f"  arc={cfg['arc']}°  profile={cfg['profile']}  "
              f"t={cfg['t_base']}+{cfg['t_delta']}μm")

        # 1. Gerar
        feb_path = make_feb(cfg)

        # 2. Correr
        run_info = run_febio(feb_path)
        ok = run_info["converged"]
        print(f"  FEBio: {'✅' if ok else '❌'} {run_info['time_s']}s")

        # 3. Extrair
        m = extract_metrics(feb_path, cfg) if ok else {"status": "failed"}

        r = {**cfg, "converged": ok, "sim_time_s": run_info["time_s"], **m}
        results.append(r)

        if m.get("status") == "ok":
            print(f"  δ_apex={m['delta_apex_um']:+.1f}μm  asymm={m['asymm_um']:+.2f}μm  "
                  f"Δd={m['apex_shift_mm']:.3f}mm  Coma={m['coma_um']:.3f}μm")

    elapsed = time.time() - t_campaign

    # ─── Análise ──────────────────────────────────────────────────────────────
    def grp(pfx):
        return [r for r in results if r["name"].startswith(pfx) and r.get("status")=="ok"]

    sym  = grp("SYM")
    prog = grp("PROG")

    def stats(lst, key):
        vals = [r.get(key, 0) for r in lst]
        if not vals: return {"n":0, "min":0, "mean":0, "max":0}
        return {"n": len(vals), "min": round(min(vals),4),
                "mean": round(sum(vals)/len(vals),4), "max": round(max(vals),4)}

    print(f"\n{'='*70}")
    print(f"  RESULTADOS FINAIS — {elapsed:.0f}s")
    print(f"{'='*70}")

    # ── Por espessura (simétricos) ──
    print(f"\n  SIMÉTRICO — Migração do ápice por espessura:")
    print(f"  {'t(μm)':>6s}  {'Δd(mm)':>8s}  {'Coma(μm)':>8s}  {'δ_apex(μm)':>10s}")
    for t in [100, 150, 200, 250, 300, 350]:
        grp_t = [r for r in sym if r["t_base"] == t]
        if grp_t:
            dd = stats(grp_t, "apex_shift_mm")
            cm = stats(grp_t, "coma_um")
            da = stats(grp_t, "delta_apex_um")
            print(f"  {t:6d}  {dd['mean']:8.4f}  {cm['mean']:8.4f}  {da['mean']:+10.1f}")

    # ── Progressivos ──
    print(f"\n  PROGRESSIVO — Migração por Δt:")
    print(f"  {'Config':>24s}  {'Δd(mm)':>8s}  {'Coma(μm)':>8s}  {'δ_apex(μm)':>10s}")
    for arc in [160, 210, 270]:
        for t_base, dt in [(200,50),(200,100),(200,150),(250,100),(250,150),(300,100)]:
            name = f"PROG_t{t_base}+{dt}_arc{arc}"
            r = next((x for x in prog if x["name"] == name), None)
            if r:
                print(f"  {name:>24s}  {r.get('apex_shift_mm',0):8.4f}  "
                      f"{r.get('coma_um',0):8.4f}  {r.get('delta_apex_um',0):+10.1f}")

    # ── Validação contra Tabela 7.1 ──
    print(f"\n{'='*70}")
    print("  VALIDAÇÃO CONTRA TABELA 7.1 DO LIVRO")
    print(f"{'='*70}")
    print(f"\n  Tabela 7.1: Δt=100μm → migração ~0.48mm")
    dt100_prog = [r for r in prog if r["t_delta"]==100 and r["arc"]==160]
    dt100_sym  = [r for r in sym  if r["t_base"]==200 and r["arc"]==160]
    if dt100_prog:
        dd_p = stats(dt100_prog, "apex_shift_mm")
        print(f"  FEBio progressivo (200+100, arc160):  Δd = {dd_p['mean']:.3f} mm")
    if dt100_sym:
        dd_s = stats(dt100_sym, "apex_shift_mm")
        print(f"  FEBio simétrico   (200+0,   arc160):  Δd = {dd_s['mean']:.3f} mm")
    if dt100_prog and dt100_sym:
        net = dd_p['mean'] - dd_s['mean']
        print(f"  Δd NET (progressivo - simétrico):     Δd = {net:.3f} mm")
        print(f"  Livro esperado:                       Δd ≈ 0.480 mm")
        ratio = net / 0.480 if net > 0 else 0
        print(f"  Rácio FEBio/Livro:                    {ratio:.2f}")

    # ── Guardar ──
    csv_out = RESULT / "torque_v2_results.csv"
    if results:
        with open(csv_out, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(results[0].keys()))
            w.writeheader(); w.writerows(results)
        print(f"\n  💾 CSV: {csv_out}")

    json_out = RESULT / "torque_v2_summary.json"
    with open(json_out, "w") as f:
        json.dump({
            "sym_apex_shift": stats(sym, "apex_shift_mm"),
            "prog_apex_shift": stats(prog, "apex_shift_mm"),
            "sym_coma": stats(sym, "coma_um"),
            "prog_coma": stats(prog, "coma_um"),
        }, f, indent=2)
    print(f"  💾 JSON: {json_out}\n")

    return results

if __name__ == "__main__":
    run_campaign()
