---
name: Sistema Vetorial ICRS — VR, VT, Vτ, VComa e Vetor Endotelial
description: Sistema completo de vetores do projeto Antigravity. Define os 5 vetores (VR, VT, Vτ, VComa, Vetor Endotelial), suas direções absolutas, cores, planos de ação, convenções de seta e o Vetor Endotelial confirmado por FEM. Referência obrigatória para toda ilustração e discussão biomecânica do Atlas.
---

# Sistema Vetorial ICRS — Antigravity
> **Fundamento:** Todo efeito do ICRS é decomposto em vetores. Cada vetor age sobre uma família de fibras específica em um plano específico.
> **CONFIRMADO POR FEM (2025):** O Vetor Endotelial existe — a superfície anterior sobre o anel é PLANA ou REBAIXADA, nunca elevada.

---

## ⚠️ REGRAS SUPREMAS DE DIREÇÃO (Violação = Erro Crítico)

```
1. ICRS empurra tecido PARA FORA (centrífugo) — NUNCA para o centro
   ❌ ERRADO:  →→→ centro ←←←
   ✅ CORRETO: ←←← ANEL →→→  (centrífugo)

2. PIO age de POSTERIOR para ANTERIOR (+Z, endotélio → epitélio)
   ❌ ERRADO:  seta apontando para baixo (epitélio → endotélio)
   ✅ CORRETO: seta apontando para CIMA (+Z)

3. Superfície anterior SOBRE o anel = PLANA ou REBAIXADA (Vetor Endotelial)
   ❌ ERRADO:  morrinho/elevação ("tenting") acima do anel
   ✅ CORRETO: aplainamento ou leve rebaixamento confirmado por FEM

4. Aplainamento central = CONSEQUÊNCIA da redistribuição vetorial, não uma força
   ❌ ERRADO:  seta de força apontando para o centro
   ✅ CORRETO: indicador de aplainamento (símbolo ∇), sem seta de força
```

---

## 1. Os 5 Vetores do Sistema

### Mapeamento Vetor → Fibra → Direção → Cor

| Vetor | Nome Completo | Fibra-Alvo | Plano | Direção | Cor | Seta |
|-------|--------------|-----------|-------|---------|-----|------|
| **VR** | Vetor Radial | 🔴 Fibras Radiais | XY (coronal) | Centrífugo — do anel para fora | Vermelho `#CC2200` | ← ANEL → |
| **VT** | Vetor Tangencial | 🔵 Fibras Tangenciais | XY (coronal) | Ao longo do arco (tangencial) | Ciano `#00B4DC` | Tangente ao arco |
| **Vτ** | Vetor de Travamento | 🟢 Fibras Oblíquas | YZ/XZ (sagital) | Vertical — bloqueia deslizamento lamelar | Verde `#00CC44` | ↕ bloqueio |
| **VComa** | Vetor de Coma | 🔴→🟢 Radiais+Oblíquas | XYZ (3D) | Reposiciona o ápice (resultado de Vτ assimétrico) | Laranja `#FF6600` | Deslocamento do ápice |
| **V_End** | Vetor Endotelial | 🔴 Radiais acima do anel | Z (axial) | DESCENDENTE — fibras tensionadas pelo arc-shortening puxam ↓ contra a PIO | Verde-água `#00FF88` | ↓ (para o endotélio) |

---

## 2. Definição Detalhada de Cada Vetor

### VR — Vetor Radial
**Mecanismo:** O ICRS, implantado a 70–80% de profundidade no estroma posterior, cria uma barreira física que impede o colapso radial das fibras naquela profundidade. As fibras radiais acima e além do anel são empurradas centrifugamente → redirecionamento da curvatura corneal.

**Efeitos clínicos:**
- Aplainamento do K-steep no meridiano do anel
- Redução do Kmax
- Proporcional à **espessura do anel** (84% do efeito de curvatura)

**Padrões por perfil:**
| Perfil | Padrão VR |
|--------|-----------|
| Triangular (Ferrara/Keraring) | Concentrado — setas GRANDES e focais no ápice |
| HM Elipsoide | Setas médias distribuídas pela curva |
| Flat (Intacs) | Muitas setas pequenas uniformes |

---

### VT — Vetor Tangencial
**Mecanismo:** As duas **extremidades** do anel (pontos de incisão) geram tração longitudinal ao longo do túnel estromal. O corpo central do anel atua como **âncora passiva** — TODO o VT se concentra nos extremos.

**Efeitos clínicos:**
- Eixo de ação = direção da incisão de entrada
- **CRÍTICO:** A incisão deve ser alinhada com o K-steep — caso contrário, o VT age no eixo errado → astigmatismo induzido (Efeito Nida)
- Proporcional ao **comprimento de arco** do anel

**Regra do SIA Conflitante:**
```
Incisão no K-steep: VT reforça o efeito desejado ✅
Incisão 45° fora:   VT cria Cross-Cylinder → SIA conflitante ❌
```

---

### Vτ — Vetor de Travamento (Torque Lamelar)
**Mecanismo:** O anel físico impede o deslizamento entre lamelas no ponto de implantação. As fibras oblíquas (🟢), que normalmente permitem o shear entre lamelas, são bloqueadas mecanicamente pelo PMMA.

**Efeitos clínicos:**
- Impede a progressão do ceratocone (biomecânica de contenção)
- Reduz o Vτ assimétrico → diminui o VComa
- Responsável pela estabilização da ectasia

---

### VComa — Vetor de Coma Direcional
**Mecanismo:** Quando o Vτ é assimétrico (anel posicionado fora do centro do cone, ou anel único unilateral), o ápice do cone é reposicionado → coma residual.

**Efeitos clínicos:**
- Coma residual direcional após ICRS
- Gerenciado pelo posicionamento cirúrgico (anel 360° vs segmento)
- Representado como um vetor de deslocamento do ápice

---

### V_End — Vetor Endotelial *(Hipótese Antigravity — Confirmado por FEM 2025)*
**Mecanismo:** O anel a 70–80% de profundidade cria um ponto fixo para as fibras radiais acima dele. Sob PIO, essas fibras são forçadas a fazer um desvio (arc-shortening) → ficam tensionadas em ambos os lados do anel. A força resultante dessas fibras tensionadas aponta **descendentemente (em direção ao endotélio)** — oposta à PIO (+Z). A resultante PIO − V_End = aplainamento ou leve rebaixamento da superfície anterior diretamente sobre o anel.

**Confirmação numérica (FEBio 4.12, Mooney-Rivlin, IOP=15 mmHg):**
```
Ring 14 (r=4.2mm, 80% depth): uz = −0,0068 mm (REBAIXAMENTO)
Rings 13–16: todos em rebaixamento
Ring 7 (ápice, r=2.1mm): uz = +0.0110 mm (elevação compensatória)
Conclusão: TENTING NÃO OCORRE sobre o anel.
```

**Implicação clínica:** Explica por que o ICRS profundo aplaina eficientemente o K-steep sem criar irregularidade superficial direta.

---

## 3. Os 3 Planos de Ação

### Plano XY — Coronal (Vista Superior)
Vetores que agem neste plano: **VR** e **VT**

```
TEMPLATE VISTA SUPERIOR:

     Limbo (Ø 12mm, fibras 🔵 circunferenciais)
     ┌──────────────────────────────────────┐
     │                                      │
     │   🔴←←← ANEL →→→🔴   ← VR centrífugo│
     │          ╔═════╗                     │
     │   🔵→→→→ ║     ║ →→→→🔵  ← VT tangencial│
     │          ╚═════╝                     │
     │             🟢↕🟢    ← Vτ vertical    │
     │                                      │
     │      Centro: ∇ (aplainamento)        │
     └──────────────────────────────────────┘
```

**Regras:**
1. VR (🔴): setas DO anel PARA FORA, nunca para o centro
2. VT (🔵): setas paralelas ao arco (tangenciais)
3. VComa (🟠): seta de deslocamento do ápice, com direção específica
4. Aplainamento central: símbolo ∇, sem seta de força

---

### Plano YZ/XZ — Sagital (Corte Transversal)
Vetores que agem neste plano: **Vτ** e **V_End**

```
TEMPLATE CORTE TRANSVERSAL (CORRETO — Vetor Endotelial):

Epitélio ──────────────── ∇ ──────────── (PLANO ou REBAIXADO sobre anel)
Bowman  ─────────────────────────────── (linha fina)
Estroma Anterior ────────────────────── (fibras oblíquas, isotrópico)
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
Estroma Posterior ───────────────────── (lamelas paralelas)
      ↑ PIO   [  ANEL ▽  ]   ↑ PIO      ← PIO age de baixo para cima
              ↓ V_End         ← V_End puxa para baixo (fibras tensionadas)
Descemet ────────────────────────────── (linha fina)
Endotélio ───────────────────────────── (monocamada)

RESULTANTE: ∇ aplainamento/rebaixamento na superfície anterior
```

---

### Plano Z — Axial
Vetores: **PIO** (ascendente, +Z) e **V_End** (descendente, −Z)

```
+Z (anterior)   ↑ PIO = 15 mmHg = 0,001999 MPa
                ↓ V_End = fibras tensionadas pelo arc-shortening
Resultante:     ∇ aplainamento (V_End > 0 → rebaixamento local)
```

---

## 4. Sistema de Cores Oficial do Projeto

| Elemento | Cor Hex | Uso |
|----------|---------|-----|
| VR — Vetor Radial | `#CC2200` (vermelho) | Fibras radiais, setas VR |
| VT — Vetor Tangencial | `#00B4DC` (ciano) | Fibras tangenciais, setas VT |
| Vτ — Vetor Travamento | `#00CC44` (verde) | Fibras oblíquas, símbolo de bloqueio |
| VComa | `#FF6600` (laranja) | Vetor de deslocamento do ápice |
| V_End — Vetor Endotelial | `#00FF88` (verde-água) | Aplainamento, seta descendente |
| PIO | `#FFFFFF` (branco) | Setas de pressão intraocular |
| ICRS | `#90A4AE` (cinza-azul) | Corpo do anel |
| Superfície original | `#FFEB3B` (amarelo) | Tracejado — curva pré-ICRS |
| Superfície pós-ICRS | `#FFFFFF` (branco sólido) | Linha contínua — curva pós-ICRS |
| Fundo (background) | `#0D1117` (preto-azul) | Background de todas as figuras |
| Texto e labels | `#FFFFFF` (branco) | Rótulos principais |
| Dimensões | `#78909C` (cinza) | Setas de medida, escalas |

### Sistema Problema vs. Solução (para figuras comparativas)
| Contexto | Cor | Significado |
|----------|-----|-------------|
| Vetor de problema (V_cone) | Vermelho | Onde a patologia empurra |
| Vetor de correção (V_anel) | Azul/Ciano | V_anel = −V_cone (180° oposto) |
| Vetor resultante neutralizado | Verde | Efeito corrigido |
| Vetor parcialmente neutralizado | Amarelo | Correção incompleta |

---

## 5. Convenções de Seta por Contexto

| Contexto | Tipo de Seta | Espessura | Opacidade |
|----------|-------------|-----------|-----------|
| Força primária (VR, VT) | `->` sólida | 2,5–3 px | 100% |
| Força secundária/propagada | `->` tracejada | 1,5–2 px | 60% |
| Consequência (aplainamento) | Símbolo ∇ ou `->` pontilhada | — | 70% |
| Dimensão/escala | `<->` dupla | 1 px | 80% |
| Vetor de problema (cone) | `->` sólida vermelha | 2 px | 90% |
| Eixo de referência | linha tracejada fina | 0,8 px | 50% |

---

## 6. Regras Para Cada Tipo de Vista

### Vista Top-Down (Superior)
1. ICRS na **média-periferia** (r ≈ 3–4 mm, OAZ 6–8 mm) — nunca no limbo
2. Mostrar fibras 🔴🔵🟢 com cores distintas
3. VR: setas DO anel PARA FORA (centrífugo)
4. VT: setas nas extremidades do anel (tangenciais)
5. Aplainamento central como CONSEQUÊNCIA — símbolo ∇

### Vista Corte Transversal
1. Todas as camadas visíveis (escala real)
2. ICRS no estroma POSTERIOR (70–80% de profundidade)
3. Superfície anterior sobre o anel: **PLANA ou REBAIXADA** (V_End confirmado por FEM)
4. Linha tracejada = superfície original; linha sólida = superfície pós-ICRS
5. Setas VR saindo do anel para fora e para cima (centrífugo)
6. Seta V_End: pequena seta descendente verde-água sobre o anel

---

## 7. Checklist de Conformidade Vetorial

- [ ] VR aponta PARA FORA (centrífugo) — nunca para o centro
- [ ] PIO aponta para CIMA (+Z, endotélio → epitélio)
- [ ] Superfície sobre o anel = PLANA ou REBAIXADA (nunca "tenting")
- [ ] VT está nas EXTREMIDADES do anel (não no corpo central)
- [ ] Aplainamento central é consequência, não uma força com seta
- [ ] Cores respeitam o sistema oficial (VR=vermelho, VT=ciano, etc.)
- [ ] ICRS está a 70–80% de profundidade no estroma posterior
- [ ] Todas as camadas visíveis no corte transversal
- [ ] Labels em português
- [ ] Barra de escala ou medidas incluídas
