---
name: Elite Medical Illustration Director — Atlas-Grade Visual Production
description: Comprehensive skill for reviewing, upgrading, and directing medical illustrations to Presbycor/Krachmer atlas-grade quality. Includes quality audit checklists, briefing templates for professional illustrators (Fiverr/Upwork/Studio), BioRender guidelines, and the visual identity system for the Atlas Vetorial ICRS.
---

# Elite Medical Illustration Director

## Objetivo

Garantir que TODAS as ilustrações do Atlas Vetorial ICRS atinjam o padrão visual de um **atlas médico premium** — equivalente ao *Presbycor*, *Cornea Atlas* (Krachmer & Palay), e *Wills Eye Cornea* (450+ fotografias, alta resolução, paleta profissional).

Este skill não substitui o ilustrador humano — ele **dirige** o processo de produção visual, funcionando como um *Art Director Médico* que:
1. Audita cada imagem existente contra um checklist de qualidade
2. Gera briefings detalhados para ilustradores externos
3. Define a identidade visual do Atlas
4. Padroniza a qualidade entre capítulos

---

## I. IDENTIDADE VISUAL DO ATLAS

### Paleta de Cores Oficial

```yaml
cores_primarias:
  VR_radial:      "#C0392B"   # Vermelho granada (sólido, profissional)
  VT_tangencial:  "#2980B9"   # Azul cerúleo
  Vtau_torque:    "#27AE60"   # Verde esmeralda
  VComa:          "#E67E22"   # Laranja queimado
  VEsferico:      "#8E44AD"   # Roxo profundo (resultante)

cores_anatomicas:
  epitelio:       "#F5E6CC"   # Bege claro
  bowman:         "#D4A574"   # Âmbar
  estroma_ant:    "#F0C0C0"   # Rosa translúcido
  estroma_post:   "#C0D0F0"   # Azul translúcido
  descemet:       "#B0B0B0"   # Cinza
  endotelio:      "#A0A0D0"   # Lilás

cores_fibras:
  radiais:        "#E74C3C"   # Vermelho fibra
  tangenciais:    "#3498DB"   # Azul fibra
  obliquas:       "#2ECC71"   # Verde fibra

fundo:
  principal:      "#FAFAFA"   # Branco suave (nunca branco puro)
  contraste:      "#2C3E50"   # Azul-noite para fundos escuros
  grid:           "#ECECEC"   # Grid sutil para diagramas

tipografia:
  titulo:         "Helvetica Neue Bold"
  legenda:        "Helvetica Neue Light"
  rotulos:        "Helvetica Neue Medium"
  tamanho_min:    10pt        # Mínimo para rótulos
```

### Estilo Visual de Referência

O Atlas segue o estilo **anatômico-esquemático moderno** — entre o hiper-realismo do Netter e o minimalismo científico do BioRender:

| Elemento | Estilo | Referência |
|---|---|---|
| **Cortes transversais** | Camadas com gradiente suave, bordas definidas, profundidade por shadow | Presbycor / Krachmer |
| **Fibras de colágeno** | Linhas com espessura variável, ondulação fisiológica, cor por família | Winkler 2013 Fig. 4 |
| **Vetores/Setas** | Setas com ponta triangular, espessura proporcional à magnitude, glow sutil | Alpins ASSORT style |
| **Topografias/Mapas** | Paleta jet (frio→quente) para curvatura, contornos isométricos | Pentacam standard |
| **Diagramas de decisão** | Flowchart limpo, cantos arredondados, ícones dentro de caixas | BioRender-inspired |

---

## II. CHECKLIST DE QUALIDADE — AUDITORIA POR IMAGEM

Para CADA imagem do Atlas, aplicar este checklist de 12 critérios:

### A. Precisão Científica (eliminatória)

- [ ] **A1. Direção das forças está correta** (VR centrífugo, VT tangencial, Vτ torsional)
- [ ] **A2. Anatomia fiel** (camadas na proporção correta, Bowman presente onde deve, ausente onde deve)
- [ ] **A3. Fibras representadas com orientação correta** (radiais=raios, tangenciais=arcos, oblíquas=cruzando)
- [ ] **A4. Proporcionalidade** (anel < córnea < globo; profundidade a 70-80% do estroma)

### B. Qualidade Visual (pontuação 0-3 cada)

- [ ] **B1. Resolução** — mínimo 300 DPI para impressão, 2000×1500px para digital
- [ ] **B2. Paleta de cores** — segue a paleta oficial do Atlas (ver seção I)
- [ ] **B3. Legibilidade** — rótulos com fonte ≥10pt, sem sobreposição, contraste adequado
- [ ] **B4. Profissionalismo** — sem artefatos de IA visíveis (dedos, texto ilegível, distorções)

### C. Didática (pontuação 0-3 cada)

- [ ] **C1. Antes/Depois** — quando aplicável, mostra estado patológico vs corrigido
- [ ] **C2. Legenda completa** — cada elemento visual tem explicação na legenda
- [ ] **C3. Autoexplicativa** — a imagem comunica o conceito sem precisar do texto principal
- [ ] **C4. Consistência** — mesma perspectiva e escala de imagens similares em outros capítulos

### Classificação

| Pontuação Total (B+C = máx 18) | Classificação | Ação |
|---|---|---|
| 15-18 | ✅ **Atlas-Ready** | Pronta para publicação |
| 10-14 | ⚠️ **Precisa Refinamento** | Ajustar via BioRender ou IA |
| 5-9  | 🔶 **Redesenhar** | Enviar briefing para ilustrador |
| 0-4  | ❌ **Substituir** | Criar nova imagem do zero |

---

## III. BRIEFING PARA ILUSTRADORES EXTERNOS

### Template de Briefing — Fiverr / Upwork / Studio

Copiar e adaptar para cada imagem:

```markdown
# BRIEFING — Ilustração Médica para Atlas de Oftalmologia

## Projeto
Atlas Vetorial ICRS — livro de referência em cirurgia de anéis intracorneanos
para tratamento de ceratocone.

## Estilo Visual
- Atlas médico profissional (estilo Presbycor / Krachmer Cornea Atlas)
- Anatômico-esquemático moderno (entre Netter e BioRender)
- Fundo branco suave (#FAFAFA), nunca branco puro
- Sem bordas decorativas ou molduras

## Esta Imagem Específica
- **Título:** [TÍTULO DA FIGURA]
- **Capítulo:** [NÚMERO E NOME DO CAPÍTULO]
- **Conceito a ilustrar:** [DESCRIÇÃO DO CONCEITO]
- **Perspectiva:** [Top-down / Corte transversal / Vista oblíqua / Diagrama]
- **Elementos obrigatórios:** [LISTAR CADA ELEMENTO]

## Referência Visual
- Imagem de referência anexa (gerada por IA — usar como GUIA de composição,
  NÃO copiar estilo)
- A versão final deve ter qualidade de publicação impressa

## Paleta de Cores (OBRIGATÓRIA)
- Vermelho (#C0392B): Vetor Radial / Fibras radiais
- Azul (#2980B9): Vetor Tangencial / Fibras tangenciais
- Verde (#27AE60): Vetor Torque / Fibras oblíquas
- Laranja (#E67E22): Vetor Coma
- Roxo (#8E44AD): Vetor Esférico (resultante)
- Camadas anatômicas: ver paleta anexa

## Requisitos Técnicos
- Resolução mínima: 300 DPI
- Formato: PNG com fundo transparente + versão com fundo branco
- Dimensões: 2400 × 1800 px (paisagem) ou 1800 × 2400 px (retrato)
- Rótulos em PORTUGUÊS (PT-BR)
- Fonte dos rótulos: Helvetica Neue ou Arial (≥10pt)

## Prazo e Entrega
- Rascunho para aprovação em [X] dias
- Arte final em [Y] dias após aprovação
- Inclui 2 rodadas de revisão

## Orçamento
- [FAIXA DE PREÇO]
```

### Como Encontrar Ilustradores

**Fiverr — Busca recomendada:**
```
Pesquisar: "medical illustration" OR "scientific illustration" OR "anatomy illustration"
Filtros: 
  - Nível: Level 2 ou Top Rated Seller
  - Orçamento: $80-200 por imagem
  - Prazo: 7-14 dias
  - Palavras-chave no portfólio: "ophthalmology", "cornea", "cross-section", "atlas"
```

**Upwork — Busca recomendada:**
```
Pesquisar: "medical illustrator" OR "biomedical illustrator"
Filtros:
  - Taxa de sucesso: >90%
  - Ganhos: >$10k (experiência comprovada)
  - Skills: Adobe Illustrator, Procreate, Medical Illustration
  - Especialidade: Anatomia, Oftalmologia, Atlas médico
```

**Estúdios Especializados (Brasil):**
- **Somática Educare** — somática.com.br — Ilustração médica e animação 3D
- **Visually Medical** — visuallymedical.com — Especializado em atlas e livros
- **Anatomy Next** (internacional) — anatomynext.com — 3D anatômico premium

---

## IV. GUIA BIORENDER (Self-Service)

### Quando Usar BioRender
- Diagramas esquemáticos (flowcharts, comparações lado-a-lado)
- Representações celulares/moleculares simplificadas
- Figuras de processo (etapas cirúrgicas)
- Protótipos rápidos para validar composição antes de enviar ao ilustrador

### Quando NÃO Usar BioRender
- Cortes transversais anatômicos detalhados (usar ilustrador)
- Fotografias clínicas (usar imagens reais de Pentacam/OCT)
- Representações 3D complexas (usar ilustrador ou Blender)

### Templates Úteis no BioRender
```
Buscar na biblioteca:
  - "eye anatomy" → base para corte sagital
  - "collagen fiber" → representação de fibras
  - "cross section tissue" → base para corte transversal
  - "vector arrow" → setas de força padronizadas
```

---

## V. INVENTÁRIO DE IMAGENS — PRIORIDADE DE PRODUÇÃO

### Nível 1: CRÍTICAS (Ilustrador Profissional — Obrigatório)

| # | Capítulo | Descrição | Tipo | Status Atual |
|---|---|---|---|---|
| 1 | CH-002 | Corte transversal: 3 famílias de fibras (radial, tangencial, oblíqua) por profundidade | Cross-section | IA → Redesenhar |
| 2 | CH-002 | Lei da Correspondência Geométrica: perfil do anel × zona fibrilar (4 zonas) | Diagrama | IA → Redesenhar |
| 3 | CH-004 | VR em ação: tenting effect no corte transversal com fibras radiais | Cross-section | IA → Redesenhar |
| 4 | CH-005 | VT + Efeito de Acoplamento: vista top-down com fibras tangenciais | Top-down | IA → Redesenhar |
| 5 | CH-006 | Vτ: Efeito de Volume Diferencial (bulking) com gradiente de espessura | Cross-section | IA → Redesenhar |
| 6 | CH-008 | Lei do Disco Mecânico: Plácido como campo de forças (Fr, Ft, Fτ) | Diagrama | IA → Redesenhar |
| 7 | CH-008 | Proporção Estromal KC: camadas normais vs KC avançado | Cross-section | ASCII → Ilustrar |
| 8 | CH-013 | Annulus Natural vs Artificial: comparação 90° → 360° | Top-down | IA → Redesenhar |

### Nível 2: IMPORTANTES (BioRender ou Ilustrador)

| # | Capítulo | Descrição | Tipo |
|---|---|---|---|
| 9 | CH-000 | Gráfico de dispersão Kmax vs CDVA (estilo publicação) | Gráfico Python → Polish |
| 10 | CH-010 | Matriz de decisão: Fenótipo × Perfil × Diâmetro | Diagrama / Tabela visual |
| 11 | CH-011 | Casos clínicos: topografia pré/pós sobrepostas | Exames reais + overlay |
| 12 | CH-013 | Profundidade diferencial: corte de anéis concêntricos | Cross-section |

### Nível 3: COMPLEMENTARES (Manter IA ou BioRender)

| # | Descrição |
|---|---|
| 13+ | Diagramas de fluxo, tabelas visuais, ícones de capítulo |

---

## VI. WORKFLOW DE PRODUÇÃO

```
Para CADA imagem do Atlas:

1. AUDITAR (usar Checklist Seção II)
   ↓
2. CLASSIFICAR (Atlas-Ready / Refinamento / Redesenhar / Substituir)
   ↓
3. Se Redesenhar ou Substituir:
   │
   ├── Opção A: GERAR BRIEFING (Template Seção III)
   │   → Enviar ao ilustrador com imagem IA de referência
   │   → Receber rascunho → Revisar contra checklist → Aprovar ou pedir ajuste
   │
   ├── Opção B: PRODUZIR NO BIORENDER (Guia Seção IV)
   │   → Montar, exportar PNG 300dpi, revisar contra checklist
   │
   └── Opção C: REFINAR COM IA (se classificada como Refinamento)
       → Regenerar com prompt melhorado + paleta oficial
       → Revisar contra checklist → Se B+C ≥ 15, aceitar
   ↓
4. INSERIR NO CAPÍTULO com legenda padronizada:
   "Figura X.Y: [Título descritivo em português] — [Elementos-chave para o leitor]"
   ↓
5. VERIFICAR CONSISTÊNCIA entre capítulos
   (mesma perspectiva para mesma estrutura, mesma cor para mesmo vetor)
```

---

## VII. REGRAS DE OURO

1. **Nunca publicar imagem com artefato de IA visível** (texto ilegível, anatomia distorcida, simetria impossível)
2. **Toda imagem deve sobreviver ao "teste do 3 segundos"** — em 3 segundos o leitor entende o que está sendo mostrado
3. **Consistência mata beleza** — é melhor 20 imagens no mesmo estilo do que 5 obras-primas e 15 medianas
4. **A legenda é parte da imagem** — nunca publicar sem legenda completa em português
5. **Fotografias clínicas reais > Ilustrações > IA** — sempre que possível, usar o real
6. **O ilustrador não precisa entender oftalmologia** — o briefing deve conter TUDO que ele precisa saber
7. **Duas rodadas de revisão é o mínimo** — rascunho → feedback → arte final → checklist final

---

*Skill criada em Março 2026 — Motor Editorial DeepMind*
