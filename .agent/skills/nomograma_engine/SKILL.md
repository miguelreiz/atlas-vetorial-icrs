---
name: Nomograma Engine — Calculadora Vetorial Integrada ICRS
description: Motor de cálculo vetorial para planejamento de ICRS. Dado fenótipo + Kmax + cilindro + espessura + fabricante, calcula espessura ótima do anel, comprimento de arco, VR/VT esperados, ICE pós previsto e risco de SIA conflitante. Primeira ferramenta de planejamento vetorial quantitativa integrada a um atlas médico.
---

# Nomograma Engine — Antigravity
> **Comando:** *"Calcular para: [dados do paciente]"*
> **Output:** Seleção de anel + predição VR + predição VT + ICE pós estimado + alertas

---

## 1. Inputs Necessários

```
DADOS TOPOGRÁFICOS:
  Kmax:              _____ D
  K-steep (K2):      _____ D @ _____ °
  K-flat  (K1):      _____ D @ _____ °
  Cilindro:          _____ D
  Fenótipo:          [Nipple / Oval / Globoso / IT / Misto / Ultrafino]

PAQUIMETRIA:
  Espessura central (CCT): _____ µm
  Espessura no ponto do anel (paquimetria setorial): _____ µm
  Espessura mínima (ponto mais fino): _____ µm

FUNCIONAL:
  BSCVA pré:         _____
  Coma (6mm):        _____ µm RMS
  ICE pré (se disponível): _____

PREFERÊNCIA DO CIRURGIÃO (opcional):
  Fabricante preferido: [Ferrara / Keraring / Cornealring / AJL / Sem preferência]
  Olho: [OD / OE]
  CXL associado: [Sim / Não / A avaliar]
```

---

## 2. Algoritmo de Seleção — Espessura do Anel

### Tabela de Espessura por Kmax
| Kmax | Espessura Recomendada | Nota |
|------|----------------------|------|
| 45–48 D | 100–125 µm | KC subclínico / inicial |
| 48–52 D | 125–150 µm | KC leve |
| 52–55 D | 150–175 µm | KC moderado |
| 55–58 D | 175–200 µm | KC moderado-avançado |
| 58–62 D | 200–225 µm | KC avançado |
| 62–68 D | 225–250 µm | KC avançado / severo |
| 68–75 D | 150–200 µm* | *Reduzir para córneas finas |
| > 75 D | 100–150 µm* | *Máxima cautela — avaliar ICE |

### Ajuste pela Espessura no Anel
```
Se espessura_ponto_anel < 400 µm → reduzir espessura do anel em 25-50 µm
Se espessura_ponto_anel < 350 µm → contraindicação relativa — avaliar CXL antes
Estroma residual mínimo posterior ao anel: 150 µm
Fórmula: espessura_anel ≤ (espessura_ponto_anel × profundidade%) - 150 µm
```

---

## 3. Algoritmo de Seleção — Comprimento de Arco

### Tabela de Arco por Cilindro Topográfico
| Cilindro | Arco Recomendado | Tipo de Correção |
|----------|-----------------|-----------------|
| < 3 D | 120°–150° | Predominantemente VR |
| 3–5 D | 150°–160° | VR + VT equilibrado |
| 5–8 D | 160°–210° | VT significativo |
| 8–12 D | 210°–255° | VT dominante |
| > 12 D | 255°–340° | VT máximo (Cornealring) |

### Ajuste pelo Fenótipo
```
Nipple (simétrico):         Dois segmentos iguais → VT simétrico
Oval (paracêntrico):        Segmento inferior espesso + superior fino → VR assimétrico
Globoso (difuso):           Arco longo único ou dois longos → VT + Vτ máximos
Inferotemporal:             Segmento IT mais espesso → VR focal
Ultrafino (CPT < 400µm):    Arco moderado (150°–210°) + espessura mínima
```

---

## 4. Predição VR — Aplainamento Esperado do K-steep

### Fórmula Estimada (Empírica — Torquetti 2009 + série do autor)
```
ΔK-steep_previsto ≈ (espessura_µm / 100) × fator_arco × fator_fenótipo

fator_arco:
  120°:  0,8
  150°:  0,9
  160°:  1,0 (referência)
  210°:  1,1
  255°:  1,2

fator_fenótipo:
  Nipple:      1,2 (resposta máxima — cone focal)
  Oval:        1,0
  Globoso:     0,8 (resposta distribuída)
  Ultrafino:   0,7 (resposta reduzida)

Exemplos:
  200µm × 160° × Nipple:  (200/100) × 1,0 × 1,2 = 2,4D por segmento
  Com 2 segmentos: ΔK-steep ≈ 4,8 D (+ acoplamento VT)

  150µm × 210° × Oval: (150/100) × 1,1 × 1,0 = 1,65D por segmento
  Com 2 segmentos assimétricos: ~3-4 D total
```

> ⚠️ **Nota:** Fórmula de uso didático — não usar como prescrição cirúrgica sem validação clínica prospectiva. Classificação: 💡 (síntese do autor baseada em série retrospectiva)

---

## 5. Predição VT — Redistribuição do Astigmatismo

```
VT ativo quando: comprimento_arco ≥ 160° E incisão_alinhada_ao_K-steep

ΔCilindro_previsto_por_VT ≈ (arco_° / 160) × 1,5 D (estimativa conservadora)

Alerta SIA: Se eixo_incisão afastado do K-steep em > 15° → risco de SIA conflitante
Calcular ângulo de erro:
  erro_eixo = |eixo_incisão - eixo_K-steep|
  Se erro_eixo > 15°: ⚠️ VT causará cross-cylinder
  Se erro_eixo > 30°: 🚨 CONTRAINDICADO — reposicionar incisão
```

---

## 6. Avaliação de Segurança (Checklist Cirúrgico)

```
ANTES DE PRESCREVER O ANEL:

✅ Estroma residual posterior ≥ 150 µm?
   Cálculo: profundidade_µm - espessura_anel ≥ 150

✅ Espessura mínima ≥ 400 µm no ponto do anel?
   Se < 400 µm: reduzir espessura do anel

✅ Eixo de incisão planejado = eixo K-steep (± 15°)?
   Se não: reposicionar incisão ou aceitar SIA

✅ ICE pré ≥ 0,40 (indica coerência óptica residual)?
   Se ICE < 0,30: resultado funcional incerto

✅ Progressão estabilizada ou CXL associado?
   Se progressão ativa sem CXL: risco de falha precoce

✅ Diâmetro óptico ≥ pupila escotópica do paciente?
   5,0mm DÓZ para pupila < 5mm; 6,0mm DÓZ para pupila ≥ 5mm
```

---

## 7. Output Padrão do Nomograma

```
RELATÓRIO DE PLANEJAMENTO VETORIAL
===================================
Paciente: [dados]
Fenótipo: [classificação]

ANEL RECOMENDADO:
  Fabricante:    [recomendação]
  Espessura:     XXX µm
  Arco:          XX°
  Diâmetro ÓZ:   X,X mm
  Profundidade:  75% (= XXX µm)
  Eixo incisão:  XX° (= K-steep ± 5°)

PREDIÇÃO VETORIAL:
  VR esperado:   ΔK-steep ≈ X,X–X,X D
  VT esperado:   ΔCilindro ≈ X,X D
  Vτ estimado:   ΔComa ≈ X,X µm (moderado/bom)
  VComa:         [simétrico / assimétrico — monitorar]
  V_End:         aplainamento sobre o anel esperado ✅

ALERTAS:
  [lista de alertas se houver]

ESTROMA RESIDUAL:
  No anel: XXX µm × 75% - XXX µm = XXX µm POSTERIOR ✅/⚠️

REFERÊNCIA BIBLIOGRÁFICA:
  TORQUETTI et al. Nomogram for Keraring. Cornea 2013.
  NASSARALLA; ALMODIN; SANDES. Ceratocone: guia completo. EG Educacional.
===================================
```

---

## 8. Posicionamento Correto do Anel nas Figuras do Nomograma

Toda figura gerada por este engine deve respeitar:

### Localização
- **Zona:** média-periferia (r = 2,5–4,0 mm do centro, DÓZ 5–8 mm)
- **NUNCA** próximo ao limbo (r > 5mm) — efeito mínimo
- **NUNCA** central (r < 2mm) — risco de invasão da zona óptica

### Profundidade
- **70–80% da espessura estromal local** (medida paquimétrica setorial)
- Em córneas de 500 µm: túnel a 350–400 µm da superfície
- **Visual na ilustração:** anel claramente no estroma POSTERIOR (2/3 inferiores)
- Proporção visual obrigatória: estroma acima do anel = 1/3; abaixo = pequeno (estroma residual)

### Proporção do Anel
- Base do anel (200 µm) = ~36% da espessura total (550 µm)
- **NÃO desenhar anel gigante** ocupando mais de 50% da espessura
- Perfil triangular Ferrara: base 600 µm (na direção circunferencial), altura 200 µm radial
- Escala visual: anel aparece menor do que parece — manter proporção real

### Checklist Visual Obrigatório para Toda Figura com Anel
- [ ] Anel na média-periferia (r = 2,5–4,0 mm)
- [ ] Anel a 70–80% de profundidade (estroma posterior)
- [ ] Proporção do anel: máx 36–40% da espessura total
- [ ] Estroma acima do anel: visível (1/3 da espessura total)
- [ ] Estroma residual abaixo do anel: visível (≥ 150 µm)
- [ ] Superfície anterior sobre o anel: PLANA ou REBAIXADA
- [ ] Barra de escala mostrando µm ou mm real
