---
name: ICRS Vector Illustration — Fiber-Perspective Representation Rules
description: Rules for generating scientifically accurate illustrations of ICRS vectors from the collagen fiber perspective. Ensures correct force directions, fiber-vector mapping, and visual conventions.
---

# ICRS Vector Illustration — Regras de Representação na Perspectiva das Fibras

## ⚠️ REGRA SUPREMA: Direção das Forças

O ICRS empurra tecido **PARA FORA** (centrífugo). NUNCA desenhar VR apontando para o centro.

```
❌ ERRADO:     →→→ centro ←←←    (centrípeto)
✅ CORRETO:    ←←← ANEL →→→     (centrífugo)

O aplainamento central é CONSEQUÊNCIA do arc-shortening, NÃO a direção da força.
```

---

## Mapeamento: Vetor → Fibra → Direção → Cor

| Vetor | Fibra Alvo | Direção da Força | Cor | Seta |
|-------|-----------|-----------------|-----|------|
| **VR** | 🔴 Radiais | **PARA FORA** (centrífugo) — anel empurra radiais para periferia | Vermelho | ← ANEL → (para fora) |
| **VT** | 🔵 Tangenciais | **AO LONGO do arco** (tangencial) — anel cria nova linha circunferencial | Azul | Tangente ao arco |
| **Vτ** | 🟢 Oblíquas | **VERTICAL/TRAVAMENTO** — anel bloqueia deslizamento entre lamelas | Verde | ↕ bloqueio vertical |
| **VComa** | 🟢→🔴 Oblíquas→Radiais | Reposicionamento do ápice — consequência de Vτ assimétrico | Laranja | Deslocamento do ápice |

---

## Regras Visuais para Imagens

### Vista Top-Down (Superior)

```
TEMPLATE — VISTA TOP-DOWN:

         Annulus Limbal (🔵 fino, Ø10mm)
         ┌──────────────────────────────┐
         │                              │
         │   🔴←← ANEL →→🔴             │  ← VR: setas PARA FORA
         │         ╔═══╗                │
         │    🔵→→→║   ║→→→🔵           │  ← VT: setas AO LONGO do arco
         │         ╚═══╝                │
         │         🟢↕🟢                │  ← Vτ: travamento VERTICAL
         │                              │
         │    Centro: ∇ (aplainamento)  │  ← Consequência (NÃO uma força)
         └──────────────────────────────┘
```

**Regras:**
1. VR (🔴): Setas apontando do anel PARA FORA (em direção ao limbo), nunca para o centro
2. VT (🔵): Setas correndo PARALELAS ao arco do anel (tangenciais)
3. Vτ (🟢): Símbolos de travamento/bloqueio NO ponto de implantação
4. Centro: Indicador de aplainamento como CONSEQUÊNCIA, nunca com setas de força

### Vista Corte Transversal (Cross-Section)

```
TEMPLATE — CORTE TRANSVERSAL:

   Epitélio ─────────────────────────────
   ─ ─ ─ ─  oblíquas (🟢 cruzando) ─ ─ ─
   ═══════  lamelas radiais (🔴 paralelas)
            ↗↑         ↑↗
          [  ANEL  ]          ← Anel empurra PARA CIMA e PARA FORA
            ↗↑         ↑↗
   ═══════  lamelas radiais (🔴 paralelas)
   Descemet ─────────────────────────────
```

**Regras:**
1. Setas de força: saindo do anel PARA CIMA e PARA OS LADOS (centrífugo)
2. Lamelas acima do anel: mostrar tenting (elevação)
3. Lamelas abaixo do anel: comprimidas contra o posterior
4. Oblíquas (🟢): mostrar como cruzam entre lamelas no anterior (se presentes)
5. Superfície: mostrar curva ANTES (tracejada, curva) e DEPOIS (sólida, plana)

---

## Antes/Depois: Fibras no Ceratocone vs Com Anel

### Representação do "Antes" (doença)

| Fibra | Estado no KC | Representação Visual |
|-------|-------------|---------------------|
| 🔴 Radiais | Frouxas, onduladas na zona do cone | Linhas **onduladas/serpenteantes** na zona inferior |
| 🔵 Tangenciais | Intactas no limbo, ausentes na zona do cone | Linhas **sólidas** no limbo, **ausentes** centralmente |
| 🟢 Oblíquas | Degradadas, rompidas | Linhas **tracejadas/quebradas** no anterior |

### Representação do "Depois" (com ICRS)

| Fibra | Estado com ICRS | Representação Visual |
|-------|----------------|---------------------|
| 🔴 Radiais | Retensionadas para fora pelo anel | Linhas **retas e firmes** com setas para fora |
| 🔵 Tangenciais | Nova linha artificial criada pelo arco | **Glow azul** ao longo do arco do anel |
| 🟢 Oblíquas | Travamento mecânico pelo PMMA | **Símbolos de bloqueio** (🔒) no ponto de implantação |

---

## Perfis e Seus Padrões de Força

| Perfil | Padrão de Setas VR |
|--------|-------------------|
| 🔺 Triangular | Poucas setas GRANDES concentradas no ápice → focal |
| ⬡ HM Elipsóide | Setas MÉDIAS distribuídas pela superfície curva → amplo |
| ▬ Flat | Muitas setas PEQUENAS uniformes pela face plana → difuso |

---

## Exemplo de Prompt que Gerou a Imagem Aprovada

> Mostrar vista top-down com ICRS: (1) fibras 🔴 radiais frouxas no cone → anel empurra PARA FORA → retensiona; (2) 🔵 nova linha tangencial ao longo do arco; (3) 🟢 travamento lamelar no ponto do anel. Centro mostra aplainamento como CONSEQUÊNCIA. Cada vetor age sobre uma família de fibras específica.

**Elementos-chave do sucesso desta imagem:**
- Fibras visíveis com cores distintas (🔴🔵🟢)
- Antes/depois implícito (frouxo→tenso)
- Direção correta (centrífugo)
- Legenda clara mapeando vetor→fibra→direção
- Aplainamento central como consequência, não como força
