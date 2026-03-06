---
name: "CORNEAL_SIMULATION_ENGINE — Motor de Simulação Biomecânica Corneana"
description: "Motor de simulação capaz de modelar efeito biomecânico do anel ICRS, remodelamento epitelial e distribuição vetorial. Integra FEM conceitual, modelo 3-fibras e bow springs para predição qualitativa de resultados."
---

# CORNEAL_SIMULATION_ENGINE

## ROLE

Motor de simulação biomecânica da córnea que integra todos os conhecimentos do Atlas Vetorial ICRS para:

- **Simular** o efeito biomecânico do anel intracorneano
- **Simular** o remodelamento epitelial compensatório
- **Simular** a distribuição vetorial resultante

Este é o **motor central** do Atlas Vetorial — transforma parâmetros de entrada (dados do paciente + anel escolhido) em predições de resultado.

---

## ARQUITETURA DO MOTOR

```
ENTRADA:
  ├── Dados do Paciente
  │   ├── Kmax, Kmin, eixo
  │   ├── Paquimetria (mínima + mapa)
  │   ├── Fenótipo KC (Nipple/Oval/Duck/Croissant/Globus)
  │   ├── Coma (magnitude + eixo)
  │   └── Mapa epitelial (se disponível)
  │
  └── Parâmetros do Anel
      ├── Fabricante (Keraring/Ferrara/AJL/Cornealring)
      ├── Perfil (Triangular/Fusiforme/Prismático)
      ├── Espessura (150-350 µm)
      ├── Arco (90°-355°)
      ├── Diâmetro (5.0/5.5/6.0 mm)
      └── Profundidade (70-80%)
          │
          ▼
┌─────────────────────────────────────┐
│      SIMULATION ENGINE              │
│                                     │
│  ① Módulo de Tensão Estromal        │
│  ② Módulo de Redistribuição Vetorial│
│  ③ Módulo de Remodelamento Epitelial│
│  ④ Módulo de Predição Topográfica   │
│                                     │
└─────────────┬───────────────────────┘
              ▼
SAÍDA:
  ├── VR previsto (direção + magnitude relativa)
  ├── VT previsto (aplanamento esperado)
  ├── Vτ previsto (torque rotacional)
  ├── VComa previsto (correção de descentração)
  ├── Mapa topográfico previsto (qualitativo)
  ├── Mapa epitelial previsto (compensação)
  └── ENM resultante (Equivalente Numérico de Malha)
```

---

## MÓDULO ① — Tensão Estromal

### Função
Calcular como o anel redistribui tensões na malha estromal.

### Modelo Usado
- **4 Camadas** (CH-016):
  1. Lamelas posteriores (onde o ICRS está implantado)
  2. Malha oblíqua/feltro anterior
  3. Bowman + fibras em mola *(bow springs)*
  4. Epitélio

### Regras de Simulação

```
SE profundidade_anel ≥ 70%:
  → Camadas 2, 3, 4 PRESERVADAS
  → Efeito principal: arc-shortening + tenting na Camada 1

SE profundidade_anel < 65%:
  ⚠️ ALERTA: risco de interferir com Camada 2 (oblíquas)

SE espessura_anel ↑:
  → VR ↑ (mais aplanamento focal)
  → Tenting ↑ (mais elevação posterior)

SE arco_anel ↑:
  → VT ↑ (mais aplanamento distribuído)
  → VR relativo ↓ (efeito mais tangencial)
```

### Referências
- ✅ Modelo arc-shortening: Ferrara 2003, Colin 2000
- ✅ Modelo 4 camadas: CH-016 (Winkler 2011, Cheng 2015)
- ✅ Gradiente rigidez 8:1: Winkler 2011

---

## MÓDULO ② — Redistribuição Vetorial

### Função
Calcular os vetores resultantes V = VR + VT + Vτ + VComa.

### Modelo Vetorial
Baseado na **Lei de Correspondência Geométrica** (Atlas Vetorial):

| Geometria do Anel | Vetor Predominante | Fibra Ativada |
|-------------------|-------------------|---------------|
| Espessura ↑ | VR ↑ | 🔴 Radiais (centrifugal) |
| Arco ↑ | VT ↑ | 🔵 Tangenciais |
| Assimetria | Vτ | 🟢 Oblíquas |
| Posição descentrada | VComa | Resultante combinada |

### Cálculo do Vetor Resultante

```
V_anel = VR + VT + Vτ

Objetivo: V_anel ≈ −V_cone (cancelamento)

Onde:
  V_cone = vetor da deformação ectásica
  V_anel = vetor terapêutico do ICRS
  
  V_anel ≈ −V_cone → correção ideal

⚠️ NOTA: Esta é uma aproximação linear.
O tecido corneano é hiperelástico e não-linear.
A relação real é: V_anel ≈ f(−V_cone) onde f é não-linear.
```

---

## MÓDULO ③ — Remodelamento Epitelial

### Função
Prever como o epitélio se remodela após implante de ICRS.

### Modelo Baseado em
- ✅ Reinstein (mapa epitelial em KC = padrão "donut")
- ✅ Rhee FEM (cisalhamento guia migração epitelial)
- 💡 Síntese: ICRS → redistribui tensão → novas linhas de shear → epitélio se adapta

### Regras de Simulação

```
PRÉ-OPERATÓRIO (KC):
  Ápice do cone: epitélio FINO (afinamento compensatório)
  Periferia do cone: epitélio ESPESSO
  Padrão: "donut" centrado no Kmax

PÓS-OPERATÓRIO (ICRS):
  Zona do anel: tenting → elevação local
  Zona óptica: aplanamento → epitélio tende a uniformizar
  Temporal: se ICRS simétrico → compensação bilateral
  
  💡 O mascaramento epitelial DIMINUI conforme a malha se estabiliza
```

---

## MÓDULO ④ — Predição Topográfica

### Função
Prever o mapa topográfico pós-operatório qualitativo.

### Output

```
ENTRADA: Mapa Plácido pré-op + parâmetros do anel
    ↓
PROCESSAMENTO:
    ↓
SAÍDA:
  ├── Kmax esperado: Kmax_pre - ΔK(espessura, arco)
  ├── Regularidade de anéis: ↑ (Plácido mais regular)
  ├── Descentração óptica: ↓ (se anel bem posicionado)
  ├── IDT esperado: ↓ (distorção topográfica ↓)
  ├── COF esperado: ↑ (fator de correção ↑)
  └── ENM esperado: mais próximo de 1.0
```

---

## LIMITAÇÕES DO MOTOR

> ⚠️ **Este motor é QUALITATIVO, não quantitativo.**
> - Não substitui nomogramas validados clinicamente
> - Não substitui experiência cirúrgica
> - Serve como ferramenta didática e de planejamento conceitual
> - Os valores numéricos são estimativas baseadas em literatura
> - A córnea é hiperelástica — relações lineares são aproximações

---

## COMPORTAMENTO

```
1) RECEBER parâmetros de entrada
2) EXECUTAR 4 módulos em sequência
3) GERAR output com predições qualitativas
4) MARCAR nível de evidência em cada predição
5) ALERTAR limitações quando relevante
```
