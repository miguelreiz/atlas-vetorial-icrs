---
name: "CORNEAL_MEDICAL_FIGURE_GENERATOR — Gerador de Figuras Médicas Corneanas"
description: "Gera descrições técnicas completas de figuras científicas para oftalmologia com padrão editorial de revistas internacionais. Pipeline de 6 etapas: definição científica → anatomia → biomecânica → composição → cores → legenda."
---

# CORNEAL_MEDICAL_FIGURE_GENERATOR

## ROLE

Gerar descrições técnicas completas de figuras científicas para oftalmologia, com padrão editorial de revistas médicas internacionais e estúdios profissionais de ilustração científica.

Transforma conceitos biomecânicos e clínicos em **instruções visuais claras** para produção de ilustrações médicas de alta qualidade.

---

## PADRÃO VISUAL DE REFERÊNCIA

Todas as figuras devem seguir o padrão visual utilizado por:

| Estúdio | Referência |
|---------|-----------|
| **Random42 Scientific Communication** | Visualização 3D molecular e celular |
| **Nucleus Medical Media** | Ilustração educacional médica |
| **Axs Studio** | Animação biomecânica |
| **Ghost Productions** | Animação cirúrgica |

### Características Obrigatórias
- ✅ Realismo anatômico
- ✅ Visual científico limpo (sem poluição visual)
- ✅ Cores biomecânicas informativas (seguir padrão abaixo)
- ✅ Vetores de força com setas claras
- ✅ Transparência estrutural quando necessário
- ✅ Legenda científica
- ✅ Fundo escuro (navy #0a1628)
- ✅ **Todos os rótulos em PORTUGUÊS** (termos inglês entre parênteses)
- ✅ Referências bibliográficas na legenda

---

## TIPOS DE FIGURA SUPORTADOS

| # | Tipo | Descrição |
|---|------|-----------|
| 1 | Anatomia corneana | Corte transversal com camadas identificadas |
| 2 | Arquitetura colagenosa | Malha 3D com 3 fibras + bow springs |
| 3 | Biomecânica da córnea | Distribuição de tensões, PIO, rigidez |
| 4 | Ectasia corneana | Deformação progressiva da malha |
| 5 | Ceratocone | Cone com perda de bow springs e mascaramento epitelial |
| 6 | Remodelamento epitelial | Padrão "donut", espirais, compensação |
| 7 | Efeito de ICRS | Arc-shortening, tenting, redistribuição |
| 8 | Redistribuição de tensões | Antes vs depois (normal → KC → ICRS) |
| 9 | Mapas topográficos integrados | Plácido + malha estromal subjacente |
| 10 | Análise vetorial | VR, VT, Vτ, VComa sobrepostos |

---

## PIPELINE DE GERAÇÃO (6 Etapas)

Sempre seguir esta sequência ao gerar qualquer figura:

```
ETAPA 1: DEFINIÇÃO CIENTÍFICA
  → Qual fenômeno está sendo ilustrado?
  → Qual a mensagem didática principal?
  → Qual nível de evidência? (✅/🔬/💡/⚠️)

ETAPA 2: ESTRUTURA ANATÔMICA
  → Quais estruturas serão exibidas?
  → Vista: corte transversal / top-down / 3D?
  → Camadas: epitélio / Bowman / estroma / Descemet / endotélio?

ETAPA 3: ELEMENTOS BIOMECÂNICOS
  → Quais vetores de força?
  → PIO: sempre +Z (endotélio → epitélio)
  → VR: sempre centrífugo (do anel para fora)
  → Tensões: radial vs circunferencial?

ETAPA 4: COMPOSIÇÃO VISUAL
  → Layout: painel único / comparação / sequência?
  → Escala e proporções
  → Elementos de destaque (setas, rótulos)

ETAPA 5: CODIFICAÇÃO POR CORES
  → Seguir padrão de cores (ver abaixo)
  → Consistência com Atlas Vetorial

ETAPA 6: LEGENDA CIENTÍFICA
  → Título da figura
  → Descrição
  → Referências
```

---

## PADRÃO DE CORES

### Cores de Tensão Biomecânica

| Cor | Significado |
|-----|-----------|
| 🔵 **Azul** | Tensão baixa / zona estável |
| 🟢 **Verde** | Tensão fisiológica / normal |
| 🟡 **Amarelo** | Tensão moderada / alerta |
| 🔴 **Vermelho** | Tensão elevada / zona de risco |
| 🟣 **Roxo** | Zona ectásica / falência mecânica |
| ⚪ **Branco** | Vetores biomecânicos / setas de força |

### Cores de Fibras de Colágeno

| Cor | Fibra |
|-----|-------|
| 🔴 Vermelho | Radiais |
| 🔵 Azul | Tangenciais / Circunferenciais |
| 🟢 Verde | Oblíquas / Interlamelares / Bow springs |

### Cores de Contexto Clínico

| Cor | Significado |
|-----|-----------|
| 🔴 Vermelho | Doença / deslocamento KC |
| 🔵 Azul | Correção / vetor terapêutico |
| ⚪/🟡 Branco/Amarelo | PIO, forças neutras |

---

## MODELO ANATÔMICO CORNEANO

Toda figura de corte transversal deve representar:

```
CAMADAS (de fora para dentro):
  ─── Epitélio corneano (~50 µm)
  ═══ Camada de Bowman (~12 µm)
  ╲╱╲ Estroma anterior — feltro isotrópico (0-33%)
  ═══ Estroma posterior — ortogonal (33-100%)
  ─── Membrana de Descemet (~10 µm)
  ─── Endotélio (~5 µm)

ELEMENTOS ESPECIAIS:
  ⌒ Fibras em mola (bow springs) — do estroma à Bowman
  △ ICRS — triangular a 70-75% de profundidade
  ↑ PIO — sempre de dentro para fora (+Z)
```

### Base Científica
- Meek KM (WAXS — orientação fibrilar)
- Müller LJ (histologia lamelar)
- Boote C (mapas de orientação)
- Winkler M (bow springs, SHG, branching 4:1)

---

## REPRESENTAÇÃO DE VETORES

Vetores biomecânicos representáveis:

| Vetor | Direção | Cor | Contexto |
|-------|---------|-----|----------|
| PIO | +Z (endotélio → epitélio) | Branco/Amarelo | Sempre presente |
| VR | Centrífugo (do anel para fora) | Azul (correção) | Efeito do ICRS |
| VT | Tangencial ao arco | Azul (correção) | Aplanamento |
| Vτ | Rotacional (torque) | Verde | Efeito oblíquas |
| VComa | Oposto ao deslocamento | Azul (correção) | Correção KC |
| V_KC | -Y, +X (OD), +Z | Vermelho (doença) | Deslocamento ectásico |

---

## CENAS SUPORTADAS

A skill pode gerar figuras para:

| Cena | Elementos-Chave |
|------|----------------|
| Ectasia inicial | Afinamento focal, início de perda de bow springs |
| Ceratocone avançado | Cone protruindo, malha desfeita, donut epitelial |
| Efeito de crosslinking | Reforço do estroma anterior, novas ligações |
| Efeito de ICRS | Arc-shortening, tenting, VR centrífugo |
| Remodelamento epitelial | Donut → uniformização pós-ICRS |
| Redistribuição biomecânica | Tensão antes vs depois |
| Bow springs normal vs KC | Preservação vs perda |
| Modelo 4 camadas | Arquitetura completa integrada |

---

## FORMATO DE OUTPUT

Ao gerar qualquer figura, sempre produzir:

```yaml
FIGURE_TITLE: "[Título em português]"

VISUAL_DESCRIPTION: |
  [Descrição detalhada do que a imagem mostra]

STRUCTURES_DISPLAYED:
  - [Lista de estruturas anatômicas visíveis]

BIOMECHANICAL_ELEMENTS:
  - [Vetores, tensões, deformações representadas]

COLOR_LEGEND:
  vermelho: "[significado]"
  azul: "[significado]"
  verde: "[significado]"
  branco: "[significado]"

SCIENTIFIC_CAPTION: |
  [Legenda formal para publicação]

REFERENCES:
  - "[Autor et al. Revista Ano]"
```

---

## DESTINO DA FIGURA

A figura gerada deve ser adequada para:
- 📖 Livro científico / Atlas oftalmológico
- 🎤 Apresentação em congresso
- 📄 Artigo científico (JCRS, Cornea, IOVS)
- 🖥️ Material didático digital
