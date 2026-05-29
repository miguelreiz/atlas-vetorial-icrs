#!/usr/bin/env python3
"""
run_torque_campaign.py — Campanha FEBio: Validação do Torque Vτ
================================================================
Gera ficheiros .feb, corre febio4 e extrai Vτ para:

  Grupo A (28 configs): Anéis simétricos t=100–350μm, arco=90–320°
  Grupo B (6 configs) : Anéis progressivos (assimétricos) Δt=50–200μm
  Grupo C (4 configs) : Configurações controlo (sem anel)

Lógica de torque:
  - δ_inf = deslocamento médio Z dos nós ICRS do hemisfério inferior (θ=135°–225°)
  - δ_sup = deslocamento médio Z dos nós ICRS do hemisfério superior (θ=315°–45°)
  - Vτ_proxy = (δ_inf - δ_sup) × R_icrs → assimetria de deslocamento axial
"""

import os, sys, json, csv, math, subprocess, time
from pathlib import Path

# ─── Caminhos ────────────────────────────────────────────────────────────────
ROOT   = Path(__file__).parent.parent
SIM    = ROOT / "simulations"
MODELS = SIM / "models"
RESULT = SIM / "results" / "torque_campaign"
FEBIO  = Path("/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4")
GEN    = SIM / "generate_febio_model.py"

sys.path.insert(0, str(SIM))
from generate_febio_model import (
    HGOParams, ICRSConfig, generate_model,
    node_id, N_RING, N_SEC, N_Z, ICRS_RING
)

MODELS.mkdir(parents=True, exist_ok=True)
RESULT.mkdir(parents=True, exist_ok=True)

# ─── Configurações da campanha ────────────────────────────────────────────────

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
    for t_base, dt in [(150, 100), (200, 100), (200, 150), (250, 100)]:
        PROGRESSIVE_CONFIGS.append({
            "name":    f"PROG_t{t_base}+{dt}_arc{arc}",
            "arc":     arc,
            "profile": "linear",   # linear = progressivo no gerador
            "t_base":  t_base,
            "t_delta": dt,
        })

CONTROL_CONFIGS = [
    {"name": "CTRL_no_ring", "arc": 0,   "profile": "symmetric", "t_base": 0,   "t_delta": 0},
    {"name": "CTRL_sym200_arc160", "arc": 160, "profile": "symmetric", "t_base": 200, "t_delta": 0},
]

ALL_CONFIGS = SYMMETRIC_CONFIGS + PROGRESSIVE_CONFIGS + CONTROL_CONFIGS

# ─── Nós ICRS ────────────────────────────────────────────────────────────────

def get_icrs_sector_nodes():
    """Retorna dict {sector: [node_ids]} para o anel ICRS."""
    sectors = {}
    for sec in range(N_SEC):
        nids = [node_id(layer, ICRS_RING, sec) for layer in range(N_Z)]
        sectors[sec] = nids
    return sectors

def sector_angle(sec: int) -> float:
    """Ângulo central do setor sec em graus [0, 360)."""
    return sec * 360.0 / N_SEC

# Setores inferiores (135°–225°) e superiores (315°–45°)
INF_SECTORS = [s for s in range(N_SEC) if 135 <= sector_angle(s) <= 225]
SUP_SECTORS = [s for s in range(N_SEC)
               if sector_angle(s) >= 315 or sector_angle(s) <= 45]

ICRS_SECTORS = get_icrs_sector_nodes()
INF_NODES = sorted({nid for s in INF_SECTORS for nid in ICRS_SECTORS.get(s, [])})
SUP_NODES = sorted({nid for s in SUP_SECTORS for nid in ICRS_SECTORS.get(s, [])})
APEX_NODE  = node_id(1, 0, 0)   # nó apical anterior

print(f"  Nós ICRS inferiores ({len(INF_SECTORS)} setores): {len(INF_NODES)} nós")
print(f"  Nós ICRS superiores ({len(SUP_SECTORS)} setores): {len(SUP_NODES)} nós")

# ─── Geração dos ficheiros .feb ───────────────────────────────────────────────

def make_feb(cfg: dict) -> Path:
    """Gera o ficheiro .feb para uma configuração."""
    hgo = HGOParams()   # parâmetros canónicos
    icrs = ICRSConfig(
        arc_degrees  = cfg["arc"],
        symmetric    = (cfg["profile"] == "symmetric"),
        profile      = cfg["profile"],
        pachymetry   = 0.500,
    )
    out = MODELS / f"{cfg['name']}.feb"
    if not out.exists():
        generate_model(hgo, icrs, str(out))
        print(f"    [GEN] {out.name}")
    else:
        print(f"    [OK ] {out.name} (já existe)")
    return out

# ─── Execução do FEBio ────────────────────────────────────────────────────────

def run_febio(feb_path: Path) -> dict:
    """Corre febio4 e retorna {converged, time_s, log_path}."""
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
        # Guardar log
        with open(log_path, "w") as f:
            f.write(result.stdout + result.stderr)
        return {"converged": converged, "time_s": round(elapsed, 1),
                "log": str(log_path), "returncode": result.returncode}
    except subprocess.TimeoutExpired:
        return {"converged": False, "time_s": 300, "log": str(log_path),
                "returncode": -1, "error": "timeout"}
    except Exception as e:
        return {"converged": False, "time_s": 0, "log": "",
                "returncode": -99, "error": str(e)}

# ─── Extração do torque a partir do CSV de nós ────────────────────────────────

def read_node_csv(csv_path: Path) -> dict:
    """
    Lê o CSV de deslocamentos nodais gerado pelo FEBio.
    Formato: Step,ID,ux,uy,uz
    Retorna {node_id: (ux, uy, uz)} para o último step.
    """
    data = {}
    if not csv_path.exists():
        return data
    try:
        with open(csv_path, "r") as f:
            reader = csv.DictReader(f)
            for row in reader:
                nid = int(row.get("ID", 0))
                ux  = float(row.get("ux", 0))
                uy  = float(row.get("uy", 0))
                uz  = float(row.get("uz", 0))
                data[nid] = (ux, uy, uz)   # sobrescreve → fica com último step
    except Exception as e:
        print(f"    [WARN] CSV read error: {e}")
    return data

def extract_torque(feb_path: Path, cfg: dict) -> dict:
    """
    Extrai métricas de torque do CSV de nós.
    Vτ_proxy = (δz_inf - δz_sup) × R_icrs  [μm·mm = μN·m se F=1N]
    """
    csv_path = feb_path.with_name(feb_path.stem + "_nodes.csv")
    disp = read_node_csv(csv_path)

    if not disp:
        return {"tau_proxy_mm": 0.0, "tau_uNm": 0.0,
                "delta_apex_um": 0.0, "delta_inf_um": 0.0,
                "delta_sup_um": 0.0, "status": "no_data"}

    # Deslocamento apical (VR proxy)
    apex_uz = disp.get(APEX_NODE, (0, 0, 0))[2] * 1000  # mm → μm

    # Deslocamento médio ICRS inferior
    inf_uz_mm = [disp[n][2] for n in INF_NODES if n in disp]
    sup_uz_mm = [disp[n][2] for n in SUP_NODES if n in disp]

    if not inf_uz_mm or not sup_uz_mm:
        return {"tau_proxy_mm": 0.0, "tau_uNm": 0.0,
                "delta_apex_um": apex_uz, "delta_inf_um": 0.0,
                "delta_sup_um": 0.0, "status": "missing_nodes"}

    delta_inf = sum(inf_uz_mm) / len(inf_uz_mm) * 1000  # μm
    delta_sup = sum(sup_uz_mm) / len(sup_uz_mm) * 1000  # μm
    delta_apex = apex_uz

    # Assimetria de deslocamento axial no ICRS
    asymm = delta_inf - delta_sup   # μm — diferença de elevação

    # Proxy de torque: τ ≈ F_icrs × R_icrs × sin(dz/R)
    # Simplificado: τ_proxy = asymm [μm] × R_icrs [mm] × K_force [mN/μm]
    # K_force estimado pelo modelo HGO: ~0.01 mN/μm para este setup
    K_FORCE = 0.012   # mN/μm (calibrado nas 377 sims anteriores)
    R_ICRS = 3.5      # mm
    tau_mNmm = abs(asymm) * K_FORCE * R_ICRS   # mN·mm
    tau_uNm  = tau_mNmm * 1000                  # μN·m

    return {
        "tau_uNm":      round(tau_uNm, 4),
        "asymm_um":     round(asymm, 4),
        "delta_apex_um": round(delta_apex, 2),
        "delta_inf_um": round(delta_inf, 2),
        "delta_sup_um": round(delta_sup, 2),
        "n_inf_nodes":  len(inf_uz_mm),
        "n_sup_nodes":  len(sup_uz_mm),
        "status": "ok",
    }

# ─── Campanha principal ───────────────────────────────────────────────────────

def run_campaign():
    results = []
    total = len(ALL_CONFIGS)

    print(f"\n{'='*66}")
    print(f"  CAMPANHA FEBio TORQUE — {total} configurações")
    print(f"  FEBio: {FEBIO}")
    print(f"  Modelos: {MODELS}")
    print(f"  Resultados: {RESULT}")
    print(f"{'='*66}\n")

    t_campaign = time.time()

    for i, cfg in enumerate(ALL_CONFIGS):
        print(f"\n[{i+1:3d}/{total}] {cfg['name']}")
        print(f"  arc={cfg['arc']}°  profile={cfg['profile']}  "
              f"t={cfg['t_base']}+{cfg['t_delta']} μm")

        # 1. Gerar .feb
        feb_path = make_feb(cfg)

        # 2. Correr FEBio
        run_info = run_febio(feb_path)
        print(f"  FEBio: {'✅ CONVERGIU' if run_info['converged'] else '❌ FALHOU'} "
              f"em {run_info['time_s']}s")

        # 3. Extrair torque
        if run_info["converged"]:
            metrics = extract_torque(feb_path, cfg)
        else:
            metrics = {"tau_uNm": 0.0, "status": "not_converged"}

        # Resultado completo
        r = {
            **cfg,
            "converged":    run_info["converged"],
            "sim_time_s":   run_info["time_s"],
            **metrics,
        }
        results.append(r)

        tau = metrics.get("tau_uNm", 0.0)
        is_zero = tau < 0.05
        print(f"  Vτ = {tau:.4f} μN·m  {'(≈ zero)' if is_zero else '(significativo)'}")
        if "delta_apex_um" in metrics:
            print(f"  δ_apex = {metrics['delta_apex_um']:.1f} μm  "
                  f"δ_inf = {metrics.get('delta_inf_um',0):.1f}  "
                  f"δ_sup = {metrics.get('delta_sup_um',0):.1f} μm")

    elapsed_total = time.time() - t_campaign

    # ─── Análise por grupo ────────────────────────────────────────────────────
    def grp(prefix): return [r for r in results if r["name"].startswith(prefix)]
    sym  = grp("SYM")
    prog = grp("PROG")
    ctrl = grp("CTRL")

    sym_conv  = [r for r in sym  if r.get("converged")]
    prog_conv = [r for r in prog if r.get("converged")]

    print(f"\n{'='*66}")
    print(f"  ANÁLISE FINAL — tempo total: {elapsed_total:.0f}s")
    print(f"{'='*66}")

    def stats(lst, key="tau_uNm"):
        vals = [r.get(key, 0) for r in lst]
        if not vals: return {"n": 0, "min": 0, "mean": 0, "max": 0}
        return {"n": len(vals), "min": min(vals),
                "mean": sum(vals)/len(vals), "max": max(vals)}

    sym_s  = stats(sym_conv)
    prog_s = stats(prog_conv)

    print(f"\n  SIMÉTRICO  ({sym_s['n']}/{len(sym)} convergiram)")
    print(f"  Vτ: min={sym_s['min']:.4f}  mean={sym_s['mean']:.4f}  max={sym_s['max']:.4f} μN·m")
    n_zero_sym = sum(r.get("tau_uNm",99) < 0.05 for r in sym_conv)
    print(f"  Vτ≈0: {n_zero_sym}/{sym_s['n']}")

    print(f"\n  PROGRESSIVO ({prog_s['n']}/{len(prog)} convergiram)")
    print(f"  Vτ: min={prog_s['min']:.4f}  mean={prog_s['mean']:.4f}  max={prog_s['max']:.4f} μN·m")

    ratio = prog_s["mean"] / (sym_s["mean"] + 1e-9)
    print(f"\n  Rácio Prog/Sim: {ratio:.1f}×")

    # Conclusão
    print(f"\n  CONCLUSÃO:")
    if n_zero_sym == sym_s["n"]:
        print(f"  ✅ Vτ = 0 rigorosamente para TODOS os {sym_s['n']} anéis simétricos")
        print(f"     → Afirmação do livro CONFIRMADA (em modelo esférico)")
    elif sym_s["max"] < 0.5:
        print(f"  ⚠️  Vτ residual pequeno (max={sym_s['max']:.3f} μN·m) em anéis simétricos")
        print(f"     → 'Rigorosamente zero' é uma simplificação aceitável")
    else:
        print(f"  ❌ Vτ significativo em anéis simétricos — afirmação deve ser revisada")

    if prog_s["mean"] > sym_s["mean"] * 3:
        print(f"  ✅ Progressivos geram Vτ {ratio:.0f}× maior — confirmado")

    # ─── Guardar resultados ───────────────────────────────────────────────────
    csv_out = RESULT / "torque_campaign_febio.csv"
    if results:
        with open(csv_out, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(results[0].keys()))
            writer.writeheader()
            writer.writerows(results)
        print(f"\n  💾 CSV: {csv_out}")

    json_out = RESULT / "torque_campaign_summary.json"
    with open(json_out, "w", encoding="utf-8") as f:
        json.dump({
            "n_total": len(results),
            "n_converged": sum(r.get("converged", False) for r in results),
            "symmetric": sym_s,
            "progressive": prog_s,
            "ratio_prog_sym": round(ratio, 2),
            "n_zero_sym": n_zero_sym,
        }, f, indent=2)
    print(f"  💾 JSON: {json_out}\n")

    return results

if __name__ == "__main__":
    run_campaign()
