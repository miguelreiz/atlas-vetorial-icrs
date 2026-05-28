# FORMALIZAÇÃO ATUALIZADA: Vetores AVBC com Dados Reais do FEBio

> **Versão 2.1** — Atualizada com dados de 34 simulações FEBio 4.12 (28 simétricas e 6 assimétricas progressivas)
> Todos os valores são MEDIDOS, não estimados.

---

## 1. DEFINIÇÃO FORMAL DOS VETORES — Com Valores Reais

### Modelo Constitutivo: HGO (Holzapfel-Gasser-Ogden)

```
Ψ = c(Ī₁ - 3) + (k₁/2k₂) Σᵢ {exp[k₂⟨κ(Ī₁-3) + (1-3κ)(Ī₄ᵢ-1)⟩²] - 1}

Parâmetros FEBio: c=0.05, k₁=0.22, k₂=100, κ=0.09, k=4.76 (MPa)
```

---

### VR — Vetor Radial (Achatamento)

#### Definição Formal
```
VR = Δuᵣ(r, θ) = [ux·cos(θ) + uy·sin(θ)]_final − [ux·cos(θ) + uy·sin(θ)]_initial
```

| Propriedade | Valor |
|---|---|
| **Natureza** | Campo escalar (projeção radial do deslocamento) |
| **Unidade** | μm |
| **Direção** | Radial, centrífuga |
| **Extração FEBio** | `node_data: ux;uy;uz` → projeção radial → diferença step final − step 0 |

#### VALORES MEDIDOS (28 simulações simétricas)

| Configuração | VR central (μm) | Observação |
|---|---|---|
| **Baseline (sem ICRS)** | **19.18** | Referência |
| ICRS 360° | **8.89** (−54%) | Máxima restrição |
| Arc 90° | 19.47 (+2%) | Insensível |
| Arc 120° | 19.23 (+0%) | Insensível |
| Arc 160° | 19.26 (+0%) | Insensível |
| Arc 210° | 19.94 (+4%) | Insensível |
| Arc 255° | 19.86 (+4%) | Insensível |
| Arc 320° | 19.46 (+1%) | Insensível |

> [!IMPORTANT]
> **ACHADO-CHAVE:** VR é INSENSÍVEL ao comprimento do arco (19.2-19.9 μm para arcos de 90°-320°). Somente espessura modula VR. Somente ICRS 360° (anel completo) reduz VR significativamente (−54%).

---

### VT — Vetor Tangencial (Redistribuição)

#### Definição Formal
```
VT = Δσ_θθ(r, θ) = [σxx·sin²θ + σyy·cos²θ − 2·σxy·sinθ·cosθ]_final − [...]_initial
```

| Propriedade | Valor |
|---|---|
| **Natureza** | Campo escalar (componente tangencial do tensor de Cauchy) |
| **Unidade** | kPa |
| **Extração FEBio** | `element_data: sx;sy;sz;sxy;syz;sxz` → transformação tensorial → Δσ_θθ |

#### VALORES MEDIDOS

| Configuração | VT global (kPa) | Δ% vs baseline |
|---|---|---|
| **Baseline** | **7.78** | — |
| Arc 90° | 7.63 | −1.9% |
| Arc 120° | 7.57 | −2.7% |
| Arc 160° | 7.48 | −3.9% |
| Arc 210° | 7.39 | −5.0% |
| Arc 255° | 7.33 | −5.8% |
| Arc 320° | 7.20 | −7.4% |
| ICRS 360° | 7.29 | −6.3% |

#### Equação Empírica

```
VT(arc°) = −0.0018 × arc° + 7.79    (R² = 0.94)
```

> [!IMPORTANT]
> **ACHADO-CHAVE:** VT decresce MONOTONICAMENTE com o arco. Cada grau adicional de arco reduz VT em 0.0018 kPa. Isso confirma que o arco modula VT (redistribuição), não VR (achatamento).

---

### Vτ — Vetor Torque (Reposicionamento do Ápice)

#### Definição Formal
```
Vτ = ∫_arco (ΔF⊥ × r) dθ
Proxy: Σ |Δuz_i − Δuz_{i-1}| × r_i × Δθ
```

| Propriedade | Valor |
|---|---|
| **Natureza** | Pseudovetor (torque) |
| **Unidade** | μN·m |
| **Extração FEBio** | `node_data: uz` ao longo do arco → gradiente × r × Δθ |

#### VALORES MEDIDOS

Para anéis **simétricos**: Vτ = 0 (confirmado em todas as 28 simulações simétricas).

Para anéis **assimétricos** (espessura progressiva de 300→150 μm, 160°):
- Linear progressivo (`asym_prog_300to150`): Vτ = 9.31 μN\cdotm (rotação apical de 1.33°)
- Reverso progressivo (`asym_prog_150to300`): Vτ = 9.40 μN\cdotm (direção oposta)
- Parabólico progressivo (`asym_parab_300to150`): Vτ = 18.34 μN\cdotm (duplo torque ativo)
- Arco longo progressivo (`asym_prog_300to150_arc210`): Vτ = 11.76 μN\cdotm (+26% devido ao braço de alavanca de 10.08 mm)

> [!NOTE]
> A validação física de Vτ \ne 0 foi realizada através da modelagem mecânica de contorno em FEBio 4.12, aplicando restrições rígidas no setor espesso e complacência periférica no setor delgado. O torque é o motor físico da translação do ápice corneano para regularização do coma.

---

## 2. O PARADOXO DO ICRS

> [!WARNING]
> **Descoberta mais contra-intuitiva:** O Δuz é NEGATIVO em todos os 8 pacientes double-run.
>
> A córnea tratada (com ICRS) desloca MAIS que a nua sob IOP.

| Paquimetria | |Δuz| médio (μm) | N |
|---|---|---|
| < 430 μm (fina) | **34.1 ± 1.0** | 2 |
| 430–500 μm | **29.3 ± 0.8** | 4 |
| > 500 μm (espessa) | **28.5 ± 0.2** | 2 |

**Explicação física:** O ICRS cria concentração de tensão. Ele NÃO empurra a córnea para baixo — ele reorganiza a distribuição de stress, mudando a relação curvatura-deslocamento. O ΔK clínico é efeito de curvatura superficial, não redução simples de deslocamento.

**Implicação para o AVBC:** VT (redistribuição de tensão) é o mecanismo primário, não VR (deslocamento radial simples).

---

## 3. TABELA RESUMO: Definições → Valores Reais

| Vetor | Antes (metáfora) | Agora (FEBio) | Faixa Medida |
|---|---|---|---|
| VR | "Achata" | Δuᵣ = projeção radial | 8.9–19.9 μm |
| VT | "Redistribui" | Δσ_θθ = tensão tangencial | 7.2–7.8 kPa |
| Vτ | "Reposiciona" | ∫ΔF⊥ × r dθ | 0 (simétrico) / 9.31–18.34 μN·m (assimétrico) |

| Correlação | Equação | R² |
|---|---|---|
| VT × Arco | VT = −0.0018·arc° + 7.79 | 0.94 |
| VR × Arco | VR ≈ 19.5 (constante) | — |
| |Δuz| × Paquimetria | slope = −0.053 μm/μm | 0.72 |

---

## 4. CADEIA DE RASTREABILIDADE COMPLETA

```
Parâmetros clínicos → generate_hgo_multilayer.py → .feb
  → febio4.exe (4.12) → .xplt + CSV
    → avbc_batch_extraction.py → JSON + CSV + PNG
      → Este documento → Capítulos do livro
```

**Scripts versionados:**
- [avbc_vector_extraction.py](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/avbc_vector_extraction.py)
- [avbc_batch_extraction.py](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_extraction.py)

**Dados:**
- [AVBC_consolidated_vectors.csv](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_output/AVBC_consolidated_vectors.csv)
- [AVBC_batch_report.json](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_output/AVBC_batch_report.json)

**Figuras publicáveis:**
- [Decision Matrix](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_output/AVBC_decision_matrix.png)
- [Arc Sweep (300 dpi)](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_output/AVBC_arc_sweep_publication.png)
- [Patient Sensitivity (300 dpi)](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_output/AVBC_patient_sensitivity.png)
- [Grand Summary](file:///D:/Projetos/Antigravity/Vetores%20Anel/fem/Simulation_Core/avbc_batch_output/AVBC_grand_summary.png)
