---
name: Antigravity Master — Sistema Integrador do Projeto Atlas Vetorial ICRS
description: Skill mestre do projeto Antigravity. Define a identidade intelectual do projeto, as hipóteses confirmadas, os 5 vetores do sistema, como usar as outras skills em conjunto e o fluxo de trabalho completo do Atlas Vetorial ICRS. Carregar esta skill primeiro em qualquer sessão do projeto.
---

# Antigravity Master — Sistema Integrador
> **Projeto:** Atlas Vetorial ICRS — A Biomecânica da Correção do Ceratocone por Anéis Intraestromais
> **Autor:** Cirurgião-Chefe Antigravity
> **Assistente:** Claude Code (Engenheiro Numérico)
> **Status:** Em produção ativa — Capítulos CH-000 a CH-016 em desenvolvimento

---

## 1. Identidade do Projeto

### O Que É o Antigravity
O projeto Antigravity é um **atlas médico científico-cirúrgico** que aplica análise vetorial à biomecânica dos anéis intraestromais (ICRS) para o tratamento do ceratocone. O nome reflete a ideia central: os anéis criam forças que se opõem à deformação gravitacional-pressórica da córnea doente.

### A Proposta Central
> *"Todo efeito do ICRS é decomposto em vetores mensuráveis que agem sobre famílias específicas de fibras de colágeno. Entender esses vetores = planejamento cirúrgico preciso."*

### Por Que é Original
1. **Sistema de 5 vetores** aplicado ao ICRS — nenhum atlas anterior usou esta abordagem
2. **Vetor Endotelial (V_End)** — hipótese do autor, confirmada por FEM em 2025
3. **Modelo de 3 famílias de fibras** como alvos distintos de cada vetor
4. **Confirmação numérica** via FEBio das hipóteses biomecânicas
5. **Integração** entre topografia clínica e predições FEM

---

## 2. O Sistema de 5 Vetores — Resumo Executivo

| Vetor | Ação | Fibra-Alvo | Efeito Clínico | Cor |
|-------|------|-----------|----------------|-----|
| **VR** | Centrífugo (para fora) | 🔴 Radiais | Aplaina K-steep | Vermelho `#CC2200` |
| **VT** | Tangencial (ao longo do arco) | 🔵 Tangenciais | Redistribui eixo astigmático | Ciano `#00B4DC` |
| **Vτ** | Vertical (travamento) | 🟢 Oblíquas | Freia progressão | Verde `#00CC44` |
| **VComa** | Deslocamento do ápice | 🟠 Radiais+Oblíquas | Reduz coma irregular | Laranja `#FF6600` |
| **V_End** | Descendente (↓, anti-PIO) | 🔴 Radiais sobre anel | Aplainamento local (≠ tenting) | Verde-água `#00FF88` |

### Hierarquia Causal dos Vetores
```
ICRS implantado (70-80% estroma posterior)
         │
         ├─► VR (centrífugo) ──────────────► Aplaina K-steep
         │
         ├─► VT (extremidades do anel) ────► Redistribui astigmatismo
         │
         ├─► Vτ (travamento oblíquas) ─────► Freia progressão KC
         │         │
         │         └─► VComa (Vτ assimétrico) ─► Reposiciona ápice
         │
         └─► V_End (arc-shortening) ────────► Aplainamento SOBRE o anel
                    │
                    └─► Resultado ≠ tenting (CONFIRMADO FEM 2025)
```

---

## 3. Descobertas Confirmadas pelo FEM (2025) — Antigravity Original

### Vetor Endotelial — Confirmação Numérica
**Hipótese do Cirurgião:** O ICRS profundo (80%) cria arc-shortening das fibras acima → força descendente (-Z) que contrabalança a PIO (+Z) → aplainamento da superfície anterior SOBRE o anel (não "tenting").

**Resultado FEBio 4.12 (Mooney-Rivlin, IOP=15mmHg):**
```
Anel 14 (r=4,2mm, 80% profundidade):  uz = −0,0068 mm (REBAIXAMENTO ✅)
Anéis 13–16:                           todos em rebaixamento
Anel 7  (r=2,1mm, ápice):              uz = +0,0110 mm (elevação compensatória)
Status: HIPÓTESE CONFIRMADA ✅
```

**Implicação:** "Tenting" não é o mecanismo primário do ICRS. O aplainamento é a consequência de um sistema de forças balanceado entre PIO ascendente e V_End descendente.

---

## 4. Estrutura do Atlas — Capítulos

| Capítulo | Título | Status | Conceito Central |
|----------|--------|--------|-----------------|
| CH-000 | Prefácio | ✅ Em revisão | Visão do projeto |
| CH-001 | Anatomia Corneana | ✅ Em revisão | 6 camadas + 3 fibras |
| CH-002 | Biomecânica dos Anéis | ✅ Em revisão | ICRS + arc-shortening |
| CH-003 | Classificação do Ceratocone | ✅ Em revisão | 5 padrões + FEM |
| CH-004 | VR — Vetor Radial | ✅ Em revisão | Centrífugo + V_End |
| CH-005 | VT — Vetor Tangencial | ✅ Em revisão | Extremidades + Poisson |
| CH-007 | VComa | ✅ Em revisão | Vτ assimétrico |
| CH-008 | LDM — Lei do Disco Mecânico | ✅ Em revisão | Espessura × efeito |
| CH-009 | VEsférico | ✅ Em revisão | Componente esférico |
| CH-010 | ICE — Índice de Coerência | ✅ Em revisão | Eixos |
| CH-011 | Nomogramas Vetoriais | ✅ Em revisão | Nomogramas |
| CH-012 | Casos Clínicos | ✅ Em revisão | Aplicação clínica |
| CH-013 | Complicações | ✅ Em revisão | Manejo |
| CH-014 | Futuro dos Anéis | ✅ Em revisão | Tendências |
| CH-015 | Biomecânica Profunda + CXL | ✅ Em revisão | CXL + ICRS combinados |
| CH-016 | Malha Estromal + FEM | ✅ Em revisão | Simulação computacional |
| GLOSSÁRIO | Termos Técnicos | ✅ Em revisão | Referência |

---

## 5. Como Usar as Skills do Projeto

### Mapa Completo de Skills (Arquitetura Atual — 16 Skills Ativas)

```
ANTIGRAVITY MASTER ◄─── Carregar primeiro em toda sessão
     │
     ├── FUNDAÇÃO CIENTÍFICA
     │   ├── anatomia_corneana_unificada
     │   │   Quando: Camadas, fibras, KC, histologia ICRS, proporções
     │   │
     │   ├── sistema_vetorial_icrs
     │   │   Quando: Direções, cores, setas, V_End, templates vetoriais
     │   │
     │   └── fem_simulacao_engine
     │       Quando: FEBio, HGO, resultados, predições biomecânicas
     │
     ├── CLÍNICA E PLANEJAMENTO
     │   ├── banco_aneis_clinico
     │   │   Quando: Selecionar anel, nomograma, fabricantes, segurança
     │   │
     │   ├── nomograma_engine
     │   │   Quando: Calcular espessura + arco + VR/VT predito para um caso
     │   │
     │   ├── decompositor_caso_clinico
     │   │   Quando: Analisar resultado de cirurgia, decompor em vetores
     │   │
     │   └── gerador_caso_didatico
     │       Quando: Criar casos para CH-012, ensino, perfis paramétricos
     │
     ├── PRODUÇÃO DO LIVRO
     │   ├── sprint_capitulo
     │   │   Quando: Iniciar ou acelerar a redação de qualquer capítulo
     │   │
     │   ├── biblio_nacional_icrs
     │   │   Quando: Referências brasileiras, ABNT, Nassaralla/Almodin/Sandes
     │   │
     │   ├── mapa_evidencias_vivo
     │   │   Quando: Auditar afirmações, fechar gaps, blindar contra revisores
     │   │
     │   └── livro_vivo_qr
     │       Quando: QR codes, changelog biomecânico, publicação dinâmica
     │
     ├── PRODUÇÃO DE IMAGENS
     │   ├── pipeline_figura_express
     │   │   Quando: Gerar qualquer figura (conceito → PNG)
     │   │
     │   ├── studio_ilustracao_atlas
     │   │   Quando: Paleta oficial, templates matplotlib, BioRender, Fiverr
     │   │
     │   ├── icrs_geometria_precisa
     │   │   Quando: Anel triangular/arredondado/hexagonal, proporções, triângulo ▲
     │   │
     │   └── ia_vs_python_imagens
     │       Quando: Decidir ferramenta (IA vs Python), evitar viés "tenting treinado"
     │
     └── REVISÃO E QUALIDADE
         └── revisor_guardian_atlas
             Quando: Revisar qualquer texto ou figura antes de publicar
```

### Fluxo de Trabalho Típico por Tarefa

**Escrever um capítulo novo:**
1. `sprint_capitulo` → esqueleto completo em minutos
2. `anatomia_corneana_unificada` → base anatômica das afirmações
3. `sistema_vetorial_icrs` → vetores e direções corretas
4. `biblio_nacional_icrs` → referências brasileiras (ABNT)
5. `mapa_evidencias_vivo` → marcar ✅/🔬/💡/⚠️ em cada afirmação
6. `revisor_guardian_atlas` → validação final antes de publicar

**Criar uma figura:**
1. `ia_vs_python_imagens` → decidir: IA ou Python? (regra dos 3 erros)
2. `sistema_vetorial_icrs` → convenções de seta e cor
3. `icrs_geometria_precisa` → posição, profundidade e proporção do anel
4. `pipeline_figura_express` → template Python + execução + checklist
5. `revisor_guardian_atlas` → Gate 1, 2 e 3 de qualidade

**Planejar uma cirurgia (texto do atlas):**
1. `nomograma_engine` → cálculo vetorial completo
2. `banco_aneis_clinico` → catálogo e segurança
3. `decompositor_caso_clinico` → gerar tabela pré/pós
4. `gerador_caso_didatico` → transformar em caso didático para CH-012

**Simulação FEM:**
1. `fem_simulacao_engine` → parâmetros, FEBio, interpretação
2. `mapa_evidencias_vivo` → registrar confirmações (💡→✅)

**Sessão de produção rápida (sprint):**
1. `antigravity_master` → contexto geral
2. `sprint_capitulo` → rascunho do capítulo
3. `pipeline_figura_express` → figuras pendentes do inventário
4. `biblio_nacional_icrs` → fechar gaps de referência

---

## 6. Skills Legadas (Substituídas — Manter para Referência)

As skills abaixo foram **unificadas** nas 7 novas skills. Mantê-las por ora como backup histórico:

| Skill Antiga | Substituída Por |
|-------------|----------------|
| `atlas_image_directional_review` | → `sistema_vetorial_icrs` |
| `atlas_master_reviewer` | → `revisor_guardian_atlas` |
| `atlas_reviewer` | → `revisor_guardian_atlas` |
| `collagen_fiber_architecture` | → `anatomia_corneana_unificada` |
| `cornea_master_system` | → `antigravity_master` + `revisor_guardian_atlas` |
| `cornea_specialist_claude` | → `anatomia_corneana_unificada` + `fem_simulacao_engine` + `banco_aneis_clinico` |
| `corneal_medical_figure_generator` | → `studio_ilustracao_atlas` |
| `corneal_simulation_engine` | → `fem_simulacao_engine` |
| `elite_medical_illustration` | → `studio_ilustracao_atlas` |
| `icrs_anatomy_histology` | → `anatomia_corneana_unificada` |
| `icrs_ring_database` | → `banco_aneis_clinico` |
| `icrs_vector_illustration` | → `sistema_vetorial_icrs` |
| `professional_medical_illustration` | → `studio_ilustracao_atlas` |
| `corneal_biomechanics_fem` (*.agents*) | → `fem_simulacao_engine` |
| `ophthalmic_engineering_visual` (*.agents*) | → `anatomia_corneana_unificada` |
| `vector_visual_language` (*.agents*) | → `sistema_vetorial_icrs` |

---

## 7. Regras Globais Invioláveis (Condensadas)

```
FÍSICA:
  VR = centrífugo (← ANEL →)
  PIO = +Z (endotélio → epitélio, para cima)
  V_End = -Z (↓ fibras tensionadas, confirmado FEM)

ANATOMIA:
  ICRS = estroma posterior, 70-80% profundidade
  Posterior = 2/3 da espessura total
  Anterior = 1/3, 3× mais rígido

RESULTADO CLÍNICO:
  Sobre o anel = PLANA ou REBAIXADA (jamais "tenting")
  Centro = elevação compensatória (redistribuição)
  K-steep = aplainado; K-flat = leve encurvamento (Poisson)

EVIDÊNCIA:
  ✅ = fato consolidado
  💡 = síntese do autor (ex: V_End — agora ✅ por FEM)
  ⚠️ = especulativo
  ❌ = incorreto (não publicar)

VISUAL:
  Background = #0D1117
  VR = #CC2200 | VT = #00B4DC | Vτ = #00CC44
  VComa = #FF6600 | V_End = #00FF88
```

---

## 8. Glossário Rápido de Referência

| Termo | Definição |
|-------|-----------|
| ICRS | Intrastromal Corneal Ring Segment — anel implantado no estroma |
| VR | Vetor Radial — força centrífuga do anel nas fibras radiais |
| VT | Vetor Tangencial — tração das extremidades do anel |
| Vτ | Vetor de Travamento — bloqueio das fibras oblíquas |
| VComa | Vetor de Coma — reposicionamento do ápice por Vτ assimétrico |
| V_End | Vetor Endotelial — força descendente por arc-shortening (Antigravity 2025) |
| Arc-shortening | As fibras radiais acima do anel percorrem um arco mais longo → tensão ↑ |
| Tenting | Elevação da superfície anterior sobre o anel — NÃO ocorre (FEM ✅) |
| K-steep | Meridiano de maior curvatura corneal |
| K-flat | Meridiano de menor curvatura (90° do K-steep) |
| SIA | Surgically Induced Astigmatism — astigmatismo induzido pelo procedimento |
| OAZ | Optical Ablation Zone / Zona de Ablação Óptica — usada aqui como zona óptica |
| PIO | Pressão Intraocular — 15 mmHg = 0,001999 MPa |
| HGO | Holzapfel-Gasser-Ogden — modelo constitutivo com fibras explícitas |
| FEM | Finite Element Method — método dos elementos finitos |
| WAXS | Wide-Angle X-ray Scattering — técnica de mapeamento de fibras de colágeno |
