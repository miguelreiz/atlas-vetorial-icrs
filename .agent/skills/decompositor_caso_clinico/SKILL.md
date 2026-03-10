---
name: Decompositor de Caso Clínico — Análise Vetorial de Casos ICRS
description: Converte dados clínicos de um caso de ICRS em análise vetorial completa. Dado Kmax, cilindro, eixo, espessura e anel usado, decompõe o resultado nos 5 vetores, gera a tabela pré/pós padronizada do Atlas, classifica o fenótipo e identifica qual vetor foi dominante. Enriquece CH-012 e CH-014 com casos estruturados.
---

# Decompositor de Caso Clínico — Antigravity
> **Comando:** *"Decompor caso: [dados do paciente]"*
> **Output:** Tabela pré/pós + decomposição vetorial + fenótipo + insights cirúrgicos

---

## 1. Dados de Entrada (Formulário do Caso)

```
DADOS PRÉ-OPERATÓRIOS:
  K1 (K-flat):        _____ D  @ _____ °
  K2 (K-steep):       _____ D  @ _____ °
  Kmax:               _____ D
  Cilindro topográfico: _____ D
  Coma aberrométrico:  _____ µm (RMS, pupila 6mm)
  Espessura central:   _____ µm
  Espessura no anel:   _____ µm
  Melhor AV corrigida (BSCVA): _____
  Fenótipo Plácido:    [Nipple/Oval/Globoso/Inferotemporal/Misto]

ANEL IMPLANTADO:
  Fabricante:         [Ferrara/Keraring/Cornealring/AJL/outro]
  Perfil:             [Triangular/Arredondado/Hexagonal]
  Espessura:          _____ µm
  Comprimento de arco: _____°
  Diâmetro óptico:    _____ mm
  Profundidade:       _____ % (ou _____ µm)
  Eixo de incisão:    _____ °

DADOS PÓS-OPERATÓRIOS (data: _____):
  K1 pós:             _____ D
  K2 pós:             _____ D
  Kmax pós:           _____ D
  Cilindro pós:       _____ D
  Coma pós:           _____ µm
  BSCVA pós:          _____
```

---

## 2. Algoritmo de Decomposição Vetorial

### Passo 1 — Calcular Deltas
```
ΔK-steep = K2_pré - K2_pós          (+ = aplainamento = VR atuou)
ΔK-flat  = K1_pós - K1_pré          (+ = encurvamento = acoplamento VT)
ΔKmax    = Kmax_pré - Kmax_pós      (+ = redução do cone)
ΔCilindro = Cil_pré - Cil_pós       (+ = melhora do astigmatismo)
ΔComa    = Coma_pré - Coma_pós      (+ = redução do coma = Vτ atuou)
ΔAV      = BSCVA_pós - BSCVA_pré   (em linhas Snellen ou logMAR)
```

### Passo 2 — Identificar Vetor Dominante
```
Se ΔK-steep > 2D e ΔK-flat < 0.5D    → VR dominante (aplainamento puro)
Se ΔK-steep < 1D e ΔCilindro > 2D    → VT dominante (redistribuição astigmática)
Se ΔComa > 0.3µm e ΔK-steep moderado → Vτ dominante (regularização)
Se ΔK-flat > ΔK-steep               → Acoplamento VT invertido → revisar eixo incisão
Se ΔK-steep < esperado               → V_End insuficiente → anel muito superficial?
```

### Passo 3 — Avaliar Coherência do Resultado
```
Resultado COERENTE:
  VR atuou no meridiano correto (K-steep)
  VT reforçou sem criar SIA conflitante
  Vτ regularizou (coma caiu)
  V_End aplainoou (sem tenting)
  ICE pós > ICE pré (predito)

Resultado INCOERENTE (sinais de problema):
  ΔK-flat > ΔK-steep → VT no eixo errado
  Coma AUMENTOU → Vτ assimétrico não controlado
  BSCVA não melhorou apesar de bons deltas → mascaramento epitelial?
  Kmax não caiu → anel muito periférico ou raso demais
```

### Passo 4 — Calcular ICE Pré/Pós (Estimado)
```
ICE estimado = f(coerência eixos, regularidade topográfica, coma)
[Usar fórmula do Capítulo 10]
ΔFunção Visual predita = correlação ICE × BSCVA (dados Khanthik 2024)
```

---

## 3. Template de Apresentação de Caso

```markdown
## CASO [N] — [Apelido Didático do Caso]

### Perfil do Paciente
- Idade: [X] anos | Olho: [OD/OE]
- Fenótipo KC: [Nipple/Oval/Globoso/IT/Misto]
- Queixa principal: [visão turva / halos / acuidade / progressão]

### Dados Pré-Operatórios
| Parâmetro | Valor |
|-----------|-------|
| K1 (K-flat) | X,XX D @ XX° |
| K2 (K-steep) | X,XX D @ XX° |
| Kmax | XX,X D |
| Cilindro topográfico | -X,X D |
| Coma (6mm) | X,XX µm RMS |
| Espessura central | XXX µm |
| Espessura no anel | XXX µm |
| BSCVA | XX/XX (X,X logMAR) |

### Anel Selecionado e Racional
- **Anel:** [Fabricante] [espessura]µm × [arco]°
- **Racional VR:** Kmax [valor] → espessura [X]µm
- **Racional VT:** Cilindro [valor] → arco [X]°
- **Eixo de incisão:** [X]° (alinhado ao K-steep [X]°? [Sim/Não])
- **ICE pré estimado:** [valor]

### Resultado Pós-Operatório ([N] meses)
| Parâmetro | Pré | Pós | Delta | Vetor Responsável |
|-----------|-----|-----|-------|------------------|
| K1 (K-flat) | | | ΔK1= | Acoplamento VT |
| K2 (K-steep) | | | ΔK2= | VR principal |
| Kmax | | | ΔKmax= | VR + V_End |
| Cilindro | | | ΔCil= | VR + VT |
| Coma | | | ΔComa= | Vτ |
| BSCVA | | | ΔAV= | Resultante |

### Decomposição Vetorial
```
Vetor Dominante: [VR / VT / Vτ / combinação]

VR atuou:  [ΔK-steep = X,X D] → [forte/moderado/fraco]
VT atuou:  [ΔCilindro = X,X D, ΔK-flat = X,X D] → [coerente/conflitante]
Vτ atuou:  [ΔComa = X,X µm] → [boa regularização/insuficiente]
V_End:     [sem tenting confirmado] → aplainamento coerente com FEM ✅
VComa:     [deslocamento ápice: [mensurável/não mensurável]]
```

### Interpretação e Lição
[2-3 parágrafos: o que este caso ensina sobre o sistema vetorial]
[O que funcionou, o que poderia ter sido diferente]
[Mensagem para o cirurgião]

### Referência Cruzada
- **Conceito demonstrado:** CH-[X] ([nome do vetor/conceito])
- **Armadilha evitada:** [ou cometida — caso de aprendizado]
- **Pérola confirmada:** [insight clínico que este caso validou]
```

---

## 4. Categorias de Casos para CH-012

| Categoria | Subtítulo Didático | O Que Ensina |
|-----------|-------------------|-------------|
| **Caso A** | "O Anel Perfeito" | Caso ideal — todos os vetores alinhados, resultado excelente |
| **Caso B** | "A Incisão Deslocada" | Eixo errado → SIA conflitante → VT no eixo errado |
| **Caso C** | "A Córnea Ultrafina" | CPT < 400µm → paradoxo: melhora clínica superior ao esperado |
| **Caso D** | "O Anel Único no Oval" | Anel simétrico em KC assimétrico → VComa residual |
| **Caso E** | "CXL + ICRS" | Hipótese do escudo CXL — contenção pós ICRS |
| **Caso F** | "O Aprendizado" | Caso com resultado subótimo + análise do que corrigir |
| **Caso G** | "O ICE como Guia" | ICE baixo pré-op → seleção conservadora → resultado ótimo |
| **Caso H** | "Nipple com Anel 360°" | Cone central simétrico — VR máximo com anel completo |

---

## 5. Referências para CH-012

- TORQUETTI, Leonardo; BERBEL, Rodrigo F.; FERRARA, Paulo. Long-term follow-up... J Cataract Refract Surg. 2009.
- NASSARALLA, Belquiz Amaral; ALMODIN, Edna; SANDES, Jordana. *Ceratocone: um guia completo para diagnóstico e tratamento.* EG Educacional Almodin.
- FERRARA, Paulo et al. Intracorneal ring segments... J Refractive Surgery. 2002.
- Khanthik [2024] — N=230, correlação K-max × resultado.
- Autor — ICE N=300 (referência interna, retrospectivo 💡)
