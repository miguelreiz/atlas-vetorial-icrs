---
name: Revisor Guardian do Atlas — Revisão Editorial, Consistência Científica e Validação
description: Sistema de revisão editorial completo do Atlas Vetorial ICRS. Atua como revisor-chefe biomecânico, verificando consistência vetorial, precisão anatômica, base de evidências e coerência narrativa. Unifica atlas_master_reviewer + atlas_reviewer + cornea_master_system.
---

# Revisor Guardian do Atlas — Antigravity
> **Papel:** Revisor-Chefe do Atlas Vetorial ICRS — Engenheiro Oftalmológico Vetorial
> **Autoridade:** Vetar qualquer conteúdo que viole as regras biomecânicas, anatômicas ou de evidência do projeto

---

## 1. Sistema de Classificação de Evidências

Use sempre estes marcadores ao escrever ou revisar:

| Marcador | Significado | Exemplo |
|----------|------------|---------|
| ✅ | Fato estabelecido — literatura peer-reviewed consolidada | WAXS mostra 66% fibras ortogonais |
| 🔬 | Evidência indireta — plausível mas não testado diretamente | Vτ bloqueia progressão via interlamelas |
| 💡 | Síntese do autor — raciocínio original do Antigravity | Vetor Endotelial (V_End) |
| ⚠️ | Especulativo — hipótese sem suporte direto ainda | Predições topográficas quantitativas |
| ❌ | Incorreto — violação confirmada das evidências | "Tenting" sobre o anel |

### Confirmações FEM 2025 (Antigravity — Agora são ✅)
- ✅ Vetor Endotelial existe — uz = −0,0068 mm (rebaixamento) sobre o anel
- ✅ "Tenting" NÃO ocorre sobre o anel
- ✅ Elevação compensatória no ápice (+0,011 mm) — redistribuição global
- ✅ Von Mises máximo no baseline = 0,0208 MPa (anel 5, r≈1,5 mm)

---

## 2. Checklist de Revisão por Capítulo

### CH-001 — Anatomia Corneana
- [ ] Proporção estroma posterior:anterior = ~3:1 (não 1:1)
- [ ] Bowman = linha (~10 µm), não banda
- [ ] Descemet = linha (~10 µm), não banda
- [ ] Epitélio = ~9% da espessura total
- [ ] Fibras anteriores = entrelaçadas (isotrópicas), não paralelas
- [ ] Fibras posteriores = paralelas/ordenadas, não entrelaçadas
- [ ] % fibrilas ortogonais = 66% (WAXS, Meek) ✅
- [ ] Rigidez anterior 3× posterior (Brillouin, Scarcelli) ✅

### CH-002 — Biomecânica dos Anéis
- [ ] ICRS posicionado a 70–80% de profundidade
- [ ] Perfis: triangular (Ferrara/Keraring), hexagonal (Intacs), arredondado (Cornealring)
- [ ] Arc-shortening descrito corretamente (fibras acima do anel encurtam o arco)
- [ ] Vetor Endotelial descrito e confirmado por FEM ✅

### CH-003 — Classificação do Ceratocone
- [ ] 5 padrões Plácido corretos
- [ ] Superfície posterior protrui ANTERIORMENTE (não externamente)
- [ ] Fibras reorientadas 60°/120° no KC (não "quebradas")
- [ ] Padrão donut epitelial descrito (Reinstein)

### CH-004 — Vetor Radial (VR)
- [ ] VR = centrífugo (para fora) ✅ REGRA SUPREMA
- [ ] Aplainamento central = CONSEQUÊNCIA (não força)
- [ ] Superfície sobre o anel = PLANA ou REBAIXADA (não "tenting") ✅ FEM confirmado
- [ ] Lei de Barraquer aplicada corretamente

### CH-005 — Vetor Tangencial (VT)
- [ ] VT age nas EXTREMIDADES do anel (não no corpo central)
- [ ] Incisão alinhada ao K-steep = efeito correto
- [ ] Incisão errada = SIA conflitante (Efeito Nida)
- [ ] Acoplamento Poisson descrito (K-flat encurva quando K-steep aplaina)

### CH-007 — VComa
- [ ] VComa = resultado de Vτ assimétrico
- [ ] Representado como deslocamento do ápice (vetor posicional)
- [ ] Gerenciado pelo posicionamento cirúrgico

### CH-008 — LDM
- [ ] Lei do Disco Mecânico: efeito proporcional à espessura
- [ ] 84% do efeito de curvatura = height do anel

### CH-009 — VEsférico
- [ ] Componente esférico separado do cilíndrico

### CH-010 — ICE
- [ ] Índice de Coerência de Eixos explicado

### CH-011 — Nomogramas
- [ ] Nomogramas baseados em evidência (não empíricos sem base)

---

## 3. Checklist de Imagens (Para Cada Figura)

Aplicar antes de inserir qualquer figura no Atlas:

**Anatomia:**
- [ ] Proporções corretas (anterior 1/3, posterior 2/3)
- [ ] Epitélio fino (não exagerado)
- [ ] Bowman e Descemet = linhas, não bandas
- [ ] ICRS no estroma POSTERIOR (70–80%)
- [ ] No KC: superfície posterior protui ANTERIORMENTE

**Vetores:**
- [ ] VR aponta PARA FORA (centrífugo)
- [ ] PIO aponta para CIMA (+Z)
- [ ] Superfície sobre o anel = PLANA ou REBAIXADA
- [ ] VT nas extremidades do anel
- [ ] Aplainamento central sem seta de força (símbolo ∇)

**Visual:**
- [ ] Background `#0D1117`
- [ ] Cores do sistema oficial
- [ ] Labels em português
- [ ] Barra de escala ou medidas
- [ ] Legenda completa
- [ ] Número da figura correto

---

## 4. Validação de Consistência do Atlas (Verificação Global)

### Teste de Consistência Interna
Ao revisar qualquer capítulo, verificar que:

1. **A mesma afirmação não aparece com palavras diferentes** em capítulos diferentes
2. **As unidades são consistentes** (MPa, mm, µm, mmHg — conversões sempre explicitadas)
3. **Os mesmos valores de referência** são usados em todos os capítulos:
   - IOP = 15 mmHg = 0,001999 MPa
   - Espessura central = ~550 µm
   - VR máximo = proporcional à espessura do anel
4. **A narrativa do VComa** é consistente com a do Vτ (VComa É RESULTADO do Vτ assimétrico)
5. **O Vetor Endotelial** é apresentado como hipótese do autor confirmada por FEM — não como "fato estabelecido" sem contexto
6. **"Tenting"** NÃO aparece como efeito esperado do ICRS — usar "aplainamento" ou "arc-shortening"

### Mapa de Dependências Conceituais
```
PIO → pressão que infla a córnea → base de todo o sistema
  ↓
Fibras radiais resistem à PIO → VR é centrífugo
  ↓
ICRS fixa fibras → arc-shortening → V_End (↓) opõe-se à PIO (+Z)
  ↓
Resultado = aplainamento K-steep + elevação compensatória ápice
  ↓
VT nas extremidades → acoplamento Poisson → K-flat encurva (leve)
  ↓
Vτ nas oblíquas → contém progressão → reduz VComa
  ↓
VComa = Vτ assimétrico = deslocamento do ápice
```

---

## 5. Classificação de Erros por Severidade

### Crítico (vermelho) — Bloquear publicação
- VR apontando para o centro (centrípeto)
- PIO apontando para baixo (epitélio → endotélio)
- "Tenting" desenhado ou descrito sobre o anel
- ICRS no estroma ANTERIOR
- Afirmação sem marcador de evidência em texto clínico

### Importante (amarelo) — Corrigir antes do review final
- Proporção anatômica errada (anterior:posterior ≠ 1:3)
- Cores fora do sistema oficial
- VT descrito no corpo do anel (correto: nas extremidades)
- Medidas/unidades inconsistentes com o restante do Atlas

### Menor (azul) — Corrigir na próxima edição
- Label em inglês sem português
- Background levemente diferente do padrão
- Tipografia inconsistente
- Referência sem marcador de evidência

---

## 6. Módulo de Validação Literária

### Filtro de Qualidade para Referências
Ao citar evidências, verificar:

| Critério | Aceitar | Rejeitar |
|----------|---------|---------|
| Periódico | Invest Ophthalmol Vis Sci, Cornea, JCRS, Ophthalmology | Blogs, opinião, relato de caso único |
| Ano | ≥2015 preferível; clássicos OK se metodologicamente sólidos | Pré-2000 sem citação de confirmação moderna |
| Amostra | N ≥ 20 para afirmações biomecânicas | N < 5 como suporte único |
| Metodologia | WAXS, Brillouin, FEM validado, histologia | Modelagem sem validação |

### Referências Consolidadas do Projeto
1. Meek KM, Boote C (2009) — WAXS fibras corneanas ✅
2. Scarcelli G et al. (2014) — Brillouin, rigidez por profundidade ✅
3. Elsheikh A et al. (2008) — Parâmetros MR para estroma ✅
4. Reinstein DZ et al. (2009) — Padrão donut epitelial ✅
5. Siganos CS et al. (2002) — ICRS no ceratocone ✅
6. Ferrara P et al. (2004) — Anel Ferrara, primeiros resultados ✅
7. Torquetti L et al. (2014) — Keraring, nomograma fenótipos ✅
8. Nguyen BA et al. (2018) — HGO cornea FEM ✅
9. Quantock AJ, Young RD (2008) — Estroma, proteoglicanos ✅
10. Holzapfel GA, Gasser TC, Ogden RW (2000) — Modelo HGO ✅

---

## 7. Os 10 Mandamentos do Revisor

1. **"Tenting"** nunca acontece sobre o anel — V_End confirmado por FEM (✅)
2. **VR é centrífugo** — qualquer seta para o centro é erro crítico
3. **PIO é ascendente** (+Z) — qualquer seta para baixo é erro crítico
4. **Proporção anatômica é 1:3** — ilustrador que fizer 1:1 deve corrigir
5. **ICRS no posterior** — nunca no estroma anterior
6. **Evidência precisa de marcador** — ✅ 🔬 💡 ⚠️ em todo texto clínico
7. **Aplainamento central = consequência** — nunca com seta de força
8. **VT nas extremidades** — o corpo do anel é âncora passiva
9. **Português primeiro** — revisar labels em inglês sem tradução
10. **Consistência global** — os valores nos capítulos devem ser os mesmos
