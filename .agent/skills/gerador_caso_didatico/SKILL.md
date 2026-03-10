---
name: Gerador de Caso Didático — Fabricador de Casos de Ensino Vetorial
description: Gera casos clínicos estruturados para fins didáticos baseados nos dados reais do projeto (ICE N=1139, Khanthik 2024 N=230). Cada caso tem grau de dificuldade crescente, erro intencional embutido (learning by failure) e análise vetorial completa. Enriquece CH-012 sem precisar de dados novos de pacientes.
---

# Gerador de Caso Didático — Antigravity
> **Missão:** Criar casos de ensino ricos e realistas que ensinam o sistema vetorial através da prática clínica simulada
> **Base de dados:** ICE N=1.139 olhos + Khanthik 2024 N=230 cirurgias + série brasileira Torquetti N=200+

---

## 1. Classificação dos Casos por Nível

### Nível 1 — Introdutório (Caso "Escola")
- KC moderado, fenótipo claro (Nipple ou Oval)
- Anel bem selecionado, resultado excelente
- **Objetivo:** mostrar o sistema vetorial funcionando perfeitamente
- **Erro embutido:** nenhum — caso exemplar

### Nível 2 — Intermediário (Caso "Armadilha")
- KC moderado-avançado, alguma complexidade
- Um vetor não calculado corretamente
- **Objetivo:** mostrar como um erro de planejamento afeta o resultado
- **Erro embutido:** eixo de incisão levemente deslocado, ou espessura subótima

### Nível 3 — Avançado (Caso "Paradoxo")
- KC avançado ou córnea ultrafina (CPT < 400µm)
- Resultado surpreendente — melhor ou pior do que o esperado
- **Objetivo:** explorar os limites do sistema vetorial e o papel do ICE
- **Erro embutido:** seleção baseada só em Kmax → surpresa pelo ICE

### Nível 4 — Expert (Caso "Falha e Revisão")
- Resultado ruim documentado + análise da causa
- **Objetivo:** learning by failure — o caso mais valioso didaticamente
- **Erro embutido:** é o próprio caso — identificar o vetor causador do problema

---

## 2. Banco de Perfis Paramétricos

Parâmetros baseados nas distribuições reais da série do autor:

### Fenótipo Nipple (Cone Central Simétrico)
```
K1: 42-44 D @ 180°
K2: 48-55 D @ 90°
Kmax: 50-58 D
Cil: -5 a -8 D
Coma: 0.8-1.5 µm
CPT: 480-520 µm
BSCVA pré: 20/80 - 20/200
Anel ideal: 200µm × 360° (ou 2× 160°), Keraring/Ferrara
Resultado esperado: ΔK-steep 4-6D, ΔComa 0.4-0.8µm, BSCVA 20/30-20/40
```

### Fenótipo Oval (Cone Paracêntrico)
```
K1: 43-46 D @ 170°
K2: 52-62 D @ 80°
Kmax: 55-65 D (pico deslocado 1-2mm do centro)
Cil: -6 a -10 D
Coma: 1.2-2.5 µm (alto — cone descentrado)
CPT: 440-490 µm
BSCVA pré: 20/200 - CD 3m
Anel ideal: assimétrico (175µm inferior × 150µm superior) Keraring
Resultado esperado: ΔK-steep 5-8D, ΔComa 0.6-1.2µm, BSCVA 20/60-20/100
```

### Fenótipo Globoso (Cone Amplo)
```
K1: 44-46 D @ 175°
K2: 55-70 D @ 85°
Kmax: 60-72 D (pico não tão alto, área grande)
Cil: -8 a -15 D
Coma: 2.0-4.0 µm (muito alto)
CPT: 380-440 µm
BSCVA pré: CD 3m - MM
Anel ideal: arco longo (210-255°) Cornealring ou Keraring, espessura moderada
Resultado esperado: ΔK-steep 3-5D, ΔKmax 4-8D, ganho modesto BSCVA
Nota: resultado funcional pode superar o topográfico (ICE > Kmax)
```

### Fenótipo Córnea Ultrafina (CPT < 400µm)
```
K1: 46-50 D
K2: 60-75 D
Kmax: 65-80 D
Cil: -10 a -20 D
CPT no anel: 350-390 µm (alto risco pela convenção Kmax)
BSCVA pré: MM - PL
Paradoxo: 80% melhoram ≥2 linhas mesmo com critérios "de risco"
Anel: delgado (100-125µm), arco curto (120-150°)
ICE: guia melhor que Kmax aqui
```

---

## 3. Templates de Casos Prontos

### CASO DIDÁTICO 1 — "O Anel do Nipple" (Nível 1)

```markdown
## Caso 1 — "O Anel do Nipple"
**Nível:** Introdutório | **Conceito:** VR puro em cone central simétrico

### Paciente
- 26 anos, H, OD
- Fenótipo: Nipple (cone central simétrico, Plácido circular comprimido)
- Queixa: visão embaçada progressiva, óculos não corrigem

### Pré-Operatório
| K1 | K2 | Kmax | Cil | Coma | CPT | BSCVA |
|----|----|------|-----|------|-----|-------|
| 43,5 D @180° | 51,2 D @90° | 53,1 D | -7,5 D | 1,1 µm | 495 µm | 20/120 |

### Planejamento Vetorial
- Fenótipo → Nipple → anel simétrico de alto VR
- Kmax 53D → espessura 200µm
- Coma moderado → Vτ simétrico desejado
- Eixo incisão → 90° (K-steep) ✅

**Anel:** Ferrara 200µm × 2 segmentos 160° simétricos, 5mm DÓZ

### Resultado (6 meses)
| K1 | K2 | Kmax | Cil | Coma | BSCVA |
|----|----|------|-----|------|-------|
| 44,1 D | 46,8 D | 47,2 D | -2,5 D | 0,6 µm | 20/40 |

### Decomposição Vetorial
- ΔK-steep = **4,4 D** → VR forte e direto ✅
- ΔK-flat = +0,6 D → acoplamento VT leve (Poisson) ✅
- ΔComa = **0,5 µm** → Vτ simétrico atuou ✅
- BSCVA: 20/120 → 20/40 = **ganho 4 linhas** ✅

### Lição: Quando o fenótipo é claro e o eixo está correto, o sistema vetorial entrega o máximo previsto.
```

---

### CASO DIDÁTICO 2 — "A Incisão Deslocada" (Nível 2)

```markdown
## Caso 2 — "A Incisão Deslocada"
**Nível:** Intermediário | **Conceito:** VT no eixo errado → SIA conflitante

### Paciente
- 31 anos, M, OE
- Fenótipo: Oval, K-steep a 75° (oblíquo)
- Erro planejado: incisão feita a 90° (eixo convencional) em vez de 75°

### Pré → Pós
| | K1 | K2 | Cil | Coma | BSCVA |
|-|----|----|-----|------|-------|
| Pré | 44,0 D @165° | 57,2 D @75° | -13,2 D @75° | 2,1 µm | CD 2m |
| Pós | 45,8 D @165° | 53,1 D @75° | -10,5 D @163° | 1,8 µm | 20/200 |

### Problema Identificado
- ΔK-steep = 4,1 D ✅ (VR ok)
- Mas o cilindro pós mudou de EIXO (75° → 163°) ❌
- Coma permaneceu alto ❌
- BSCVA melhorou apenas 1 linha ❌

### Análise: A incisão a 90° deslocou o VT 15° do K-steep → cross-cylinder induzido.
O astigmatismo irregular AUMENTOU apesar de Kmax ter caído.

### Lição: VR corrige a curvatura. VT corrige (ou piora) o eixo. Os dois precisam estar alinhados.
```

---

### CASO DIDÁTICO 3 — "O Paradoxo da Córnea Ultrafina" (Nível 3)

```markdown
## Caso 3 — "O Paradoxo da Córnea Ultrafina"
**Nível:** Avançado | **Conceito:** ICE supera Kmax como preditor

### Paciente
- 28 anos, F, OD
- Kmax = 74 D → pela convenção clássica: "não operar"
- CPT ponto anel = 375 µm → limítrofe
- Mas ICE = 0,72 (alto) → boa coerência óptica residual

### Pré → Pós (Cornealring 125µm × 210°)
| | Kmax | Cil | Coma | BSCVA |
|-|------|-----|------|-------|
| Pré | 74,1 D | -18 D | 4,2 µm | MM |
| Pós | 62,3 D | -9 D | 2,1 µm | CD 3m |

### Resultado
- ΔKmax = **11,8 D** → VR excelente (anel fino + arco longo = VT compensou)
- ΔComa = **2,1 µm** → Vτ forte (arco longo = maior comprimento de bloqueio)
- BSCVA: MM → CD 3m = **ganho funcional significativo**

### Análise: Kmax não prediz a função. ICE alto indica que mesmo com córnea deformada,
a óptica residual é coerente o suficiente para responder à reorganização vetorial.

### Lição: Opere o ICE, não o Kmax.
```

---

## 4. Checklist de Qualidade do Caso Didático

- [ ] Fenótipo topográfico claramente identificado
- [ ] Anel selecionado com racional vetorial explícito
- [ ] Tabela pré/pós com os 5 parâmetros (K1, K2, Kmax, Cil, Coma, BSCVA)
- [ ] Decomposição vetorial (VR, VT, Vτ dominantes)
- [ ] "Lição" — 1 frase memorável
- [ ] Referência cruzada com capítulo conceitual
- [ ] Se caso de falha: análise do vetor causador
- [ ] Nenhuma menção a "tenting"
- [ ] Referência: Nassaralla/Almodin/Sandes + Torquetti 2009
