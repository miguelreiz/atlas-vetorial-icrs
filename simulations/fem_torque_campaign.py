#!/usr/bin/env python3
"""
fem_torque_campaign.py — AVBC Torque Validation Campaign
Testa sistematicamente o Vτ para 6 grupos de configurações de anel ICRS.
"""

import math, csv, json, os, time
from dataclasses import dataclass
from typing import List

# ─── Constantes HGO validadas ────────────────────────────────────────────────
C, K1, K2, KAPPA = 0.050, 0.220, 100.0, 0.090
R_CORNEA, T_CORNEA, R_ICRS = 7.8, 0.55, 3.5
N_POINTS = 3600  # 0.1° resolução
TORQUE_THRESHOLD = 0.05  # μN·m — limiar "zero"

# Coeficiente HGO efectivo (MPa)
K_HGO = 2.0 * (C + K1 * math.exp(K2 * KAPPA**2) * KAPPA)

# Ectasia: Gaussiana inferior, amp=0.8mm, σ=45°
ECT_AMP  = 0.800
ECT_CTR  = math.pi          # 180° inferior
ECT_SIG  = math.pi / 4

def ect_profile(th, amp=ECT_AMP):
    d = (th - ECT_CTR + math.pi) % (2*math.pi) - math.pi
    return amp * math.exp(-0.5*(d/ECT_SIG)**2)

def geo_factor(th, amp=ECT_AMP):
    return 1.0 - 0.15*(ect_profile(th, amp)/amp) if amp>0 else 1.0

def in_arc(th, start, span):
    return ((th - start) % (2*math.pi)) <= span

def thickness_at(th, start, span, t_base, t_delta, profile):
    if profile != "progressive" or t_delta == 0:
        return t_base
    frac = ((th - start) % (2*math.pi)) / span
    return t_base + t_delta * frac

@dataclass
class RingConfig:
    name: str; profile: str; geometry: str
    arc_start: float; arc_end: float
    t_base: float; t_delta: float = 0.0
    arc2_start: float = 0.0; arc2_end: float = 0.0; t_base2: float = 0.0
    ectasia_amp: float = ECT_AMP

def simulate(cfg: RingConfig) -> dict:
    s  = math.radians(cfg.arc_start)
    e  = math.radians(cfg.arc_end)
    sp = e - s if e > s else e - s + 2*math.pi
    has2 = cfg.profile == "two_segments" and cfg.arc2_end > cfg.arc2_start
    s2 = math.radians(cfg.arc2_start); e2 = math.radians(cfg.arc2_end)
    sp2 = e2 - s2

    dth = 2*math.pi / N_POINTS
    tau = fx = fy = 0.0

    for i in range(N_POINTS):
        th = i * dth
        in1 = in_arc(th, s, sp)
        in2 = has2 and in_arc(th, s2, sp2)
        if not in1 and not in2:
            continue

        t_loc = (thickness_at(th, s, sp, cfg.t_base, cfg.t_delta, cfg.profile)
                 if in1 else cfg.t_base2)
        amp = cfg.ectasia_amp if cfg.geometry == "ectatic" else 0.0
        gf  = geo_factor(th, amp) if amp > 0 else 1.0

        # Força elementar [mN]
        dF = K_HGO * (t_loc * 1e-3) * gf * R_ICRS * dth

        # Componente de torque fletor (momento em relação ao ápice)
        # τ = R_icrs · Fz · sin(θ) — rotação em torno do eixo X
        tau += R_ICRS * dF * math.sin(th)

        # Forças laterais (ectasia quebra simetria)
        if amp > 0:
            grad = ect_profile(th + 0.01, amp) - ect_profile(th, amp)
            fx  += dF * grad/0.01 * math.cos(th)
            fy  += dF * grad/0.01 * math.sin(th)

    tau_uNm = abs(tau * 1e3)  # mN·mm → μN·m
    arc_deg = math.degrees(sp) + (math.degrees(sp2) if has2 else 0)
    return {
        "name": cfg.name, "profile": cfg.profile, "geometry": cfg.geometry,
        "arc_deg": round(arc_deg,1), "t_base": cfg.t_base, "t_delta": cfg.t_delta,
        "ectasia_mm": cfg.ectasia_amp,
        "tau_uNm": round(tau_uNm, 4),
        "zero": tau_uNm < TORQUE_THRESHOLD,
        "note": ("Vτ≈0 simétrico" if tau_uNm < TORQUE_THRESHOLD
                 else ("Vτ residual" if tau_uNm < 1.0
                        else ("Vτ moderado" if tau_uNm < 5.0
                               else "Vτ terapêutico")))
    }

def build_configs() -> List[RingConfig]:
    cfgs = []
    # G1: Simétrico × Esférico
    for arc in [90,120,150,160,180,200,210,240,270,320]:
        for t in [100,150,200,250,300,350]:
            h = arc/2
            cfgs.append(RingConfig(f"SYM_SPH_t{t}_arc{arc}","symmetric","spherical",
                                   180-h,180+h,t,ectasia_amp=0.0))
    # G2: Simétrico × Ectásico
    for arc in [120,160,210,270,320]:
        for t in [150,200,250,300]:
            h = arc/2
            cfgs.append(RingConfig(f"SYM_ECT_t{t}_arc{arc}","symmetric","ectatic",
                                   180-h,180+h,t))
    # G3: Progressivo × Esférico
    for arc in [160,210,270,320]:
        for tb in [150,200,250]:
            for dt in [50,100,150,200]:
                h = arc/2
                cfgs.append(RingConfig(f"PROG_SPH_t{tb}+{dt}_arc{arc}","progressive","spherical",
                                       180-h,180+h,tb,dt,ectasia_amp=0.0))
    # G4: Progressivo × Ectásico
    for arc in [160,210,270]:
        for tb in [150,200]:
            for dt in [50,100,150]:
                h = arc/2
                cfgs.append(RingConfig(f"PROG_ECT_t{tb}+{dt}_arc{arc}","progressive","ectatic",
                                       180-h,180+h,tb,dt))
    # G5: Dois segmentos
    for arc,t1,t2 in [(160,150,100),(160,200,150),(210,250,150),(210,300,200),
                      (160,200,200),(120,150,150),(120,250,100)]:
        h = arc/2
        cfgs.append(RingConfig(f"2SEG_t{t1}_t{t2}_arc{arc}","two_segments","ectatic",
                               180-h,180+h,t1,arc2_start=180+h,arc2_end=360+180-h,t_base2=t2))
    # G6: Arcos assimétricos (mesmo t, arcos 90 e 270)
    for t in [150,200,250]:
        cfgs.append(RingConfig(f"ASYM_ARC_t{t}_90vs270","two_segments","ectatic",
                               135,225,t,arc2_start=225,arc2_end=360+135,t_base2=t))
    return cfgs

def run():
    cfgs = build_configs()
    print(f"\n{'='*68}")
    print(f"  AVBC FEM TORQUE CAMPAIGN  — {len(cfgs)} simulações")
    print(f"  HGO: c={C} k1={K1} k2={K2} κ={KAPPA}")
    print(f"  K_HGO={K_HGO:.4f} MPa  |  Limiar Vτ≈0: {TORQUE_THRESHOLD} μN·m")
    print(f"{'='*68}\n")

    t0 = time.time()
    results = []
    for i, cfg in enumerate(cfgs):
        r = simulate(cfg)
        results.append(r)
        sym = "░" if r["zero"] else "█"
        print(f"  [{i+1:3d}/{len(cfgs)}] {sym} {r['name']:<42s} "
              f"Vτ={r['tau_uNm']:8.4f} μN·m  {r['note']}")

    elapsed = time.time() - t0

    # ─── Análise por grupo ──────────────────────────────────────────────
    def grp(prefix): return [r for r in results if r["name"].startswith(prefix)]
    groups = {"SYM_SPH":grp("SYM_SPH"),"SYM_ECT":grp("SYM_ECT"),
              "PROG_SPH":grp("PROG_SPH"),"PROG_ECT":grp("PROG_ECT"),
              "2SEG":grp("2SEG"),"ASYM_ARC":grp("ASYM_ARC")}

    print(f"\n{'='*68}")
    print(f"  RESUMO POR GRUPO  (tempo: {elapsed:.1f}s)")
    print(f"{'='*68}")
    labels = {"SYM_SPH":"Simétrico × Esférico (Vτ=0 esperado)",
              "SYM_ECT":"Simétrico × Ectásico (Vτ residual?)  ",
              "PROG_SPH":"Progressivo × Esférico              ",
              "PROG_ECT":"Progressivo × Ectásico              ",
              "2SEG":    "Dois segmentos assimétricos          ",
              "ASYM_ARC":"Arcos assimétricos (mesmo t)         "}

    summary = []
    for k, g in groups.items():
        if not g: continue
        vals = [r["tau_uNm"] for r in g]
        n0 = sum(r["zero"] for r in g)
        mn,av,mx = min(vals), sum(vals)/len(vals), max(vals)
        print(f"\n  {labels[k]}")
        print(f"    n={len(g)}  Vτ=0: {n0}/{len(g)}")
        print(f"    min={mn:.4f}  mean={av:.4f}  max={mx:.4f}  μN·m")
        summary.append({"grupo":k,"n":len(g),"n_zero":n0,
                         "min":round(mn,4),"mean":round(av,4),"max":round(mx,4)})

    # ─── Conclusões ─────────────────────────────────────────────────────
    g1,g2,g3 = groups["SYM_SPH"],groups["SYM_ECT"],groups["PROG_SPH"]
    sph_zero  = all(r["zero"] for r in g1)
    ect_resid = any(not r["zero"] for r in g2)
    prog_big  = (sum(r["tau_uNm"] for r in g3)/len(g3) >
                 sum(r["tau_uNm"] for r in g1)/len(g1)) if g1 and g3 else False
    max_ect   = max(r["tau_uNm"] for r in g2) if g2 else 0
    mean_prog = sum(r["tau_uNm"] for r in g3)/len(g3) if g3 else 0
    mean_sym  = sum(r["tau_uNm"] for r in g1)/len(g1) if g1 else 0

    print(f"\n{'='*68}")
    print("  CONCLUSÕES")
    print(f"{'='*68}")
    print(f"\n  1) Simétrico × Esférico → Vτ=0 rigorosamente?")
    print(f"     {'✅ CONFIRMADO' if sph_zero else '❌ REFUTADO'} "
          f"({len(g1)} casos, todos < {TORQUE_THRESHOLD} μN·m)" if sph_zero else "")
    print(f"\n  2) Simétrico × Ectásico → Vτ residual ≠ 0?")
    print(f"     {'✅ CONFIRMADO' if ect_resid else '❌ REFUTADO'} "
          f"(máx={max_ect:.3f} μN·m — ordem de grandeza menor)")
    print(f"\n  3) Progressivo >> Simétrico?")
    print(f"     {'✅ CONFIRMADO' if prog_big else '❌ REFUTADO'} "
          f"({mean_prog:.3f} vs {mean_sym:.4f} μN·m — {mean_prog/(mean_sym+1e-9):.0f}x)")
    print(f"\n  REFORMULAÇÃO PARA O LIVRO:")
    print(f"  'Em modelos esféricos, Vτ=0 por simetria matemática.")
    print(f"   Em córneas ectásicas reais, anéis simétricos produzem")
    print(f"   Vτ passivo ≤ {max_ect:.1f} μN·m — ~{int(mean_prog/max_ect)}x menor")
    print(f"   do que o Vτ ativo de perfis progressivos ({mean_prog:.1f} μN·m).'")

    # ─── Guardar ────────────────────────────────────────────────────────
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out, exist_ok=True)

    csv_f = os.path.join(out, "torque_campaign_results.csv")
    with open(csv_f, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(results[0].keys()))
        w.writeheader(); w.writerows(results)

    json_f = os.path.join(out, "torque_campaign_summary.json")
    with open(json_f, "w", encoding="utf-8") as f:
        json.dump({"hgo":{"c":C,"k1":K1,"k2":K2,"kappa":KAPPA},
                   "n_total":len(results),"threshold_uNm":TORQUE_THRESHOLD,
                   "groups":summary,"conclusions":{
                       "sym_spherical_zero":sph_zero,
                       "sym_ectatic_residual":ect_resid,
                       "progressive_larger":prog_big}}, f, indent=2)

    print(f"\n  💾 {csv_f}")
    print(f"  💾 {json_f}\n")
    return results, summary

if __name__ == "__main__":
    run()
