---
name: Professional Medical Illustration Director — BioRender + Fiverr Studio
description: Comprehensive skill for creating, reviewing, and commissioning atlas-grade medical illustrations for the Atlas Vetorial ICRS. Integrates BioRender self-service workflow with Fiverr professional commissioning. Defines visual standards, corneal orientation conventions, vector color system, and provides ready-to-use briefing templates for external illustrators.
---

# Professional Medical Illustration Director

## 🎯 Purpose

This skill acts as a **virtual illustration studio** combining:
- **BioRender** (self-service, rapid prototyping of scientific figures)
- **Fiverr/Upwork** (commissioning professional medical illustrators)
- **AI Image Generation** (generate_image tool for draft/concept art)

Every illustration in the Atlas Vetorial ICRS must follow the conventions defined here.

---

## 1. VISUAL IDENTITY SYSTEM

### 1.1 Color Palette — Vector System

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **VR** (Vetor Radial) | 🔴 Vermelho | `#EF4444` | Aplainamento, fibras radiais |
| **VT** (Vetor Tangencial) | 🔵 Azul | `#3B82F6` | Redistribuição, fibras tangenciais |
| **Vτ** (Vetor Torque) | 🟢 Verde | `#22C55E` | Rotação/travamento, fibras oblíquas |
| **VComa** | 💜 Roxo | `#A855F7` | Deslocamento óptico do ápice |
| **VEsférico** | Gradiente RGB | `#EF4444→#3B82F6→#22C55E` | Resultante integrada |
| **PIO** | 🟠 Laranja | `#F97316` | Pressão intraocular |
| **ICRS (anel)** | ⬛ Cinza claro | `#94A3B8` | Segmento intracorneano (PMMA) |
| **Epitélio** | Rosa claro | `#FDA4AF` | Camada mais superficial |
| **Estroma** | Bege/creme | `#FDE68A` | Camada alvo do anel |
| **Endotélio** | Azul escuro | `#1E3A5F` | Camada mais profunda |
| **Câmara anterior** | Azul aqua translúcido | `#06B6D4` (30% opacity) | Espaço com humor aquoso |

### 1.2 Orientação Padrão da Córnea

> ⚠️ **REGRA INVIOLÁVEL:** Toda ilustração de corte transversal da córnea DEVE seguir esta orientação:

```
        SUPERIOR (ar/filme lacrimal)
        ========================
        ║ Epitélio (~50 μm)    ║ ← Rosa claro
        ║ Bowman (~12 μm)      ║ ← Linha fina
        ║                      ║
        ║ ESTROMA (~450 μm)    ║ ← Bege/creme
        ║   ┌──────────┐       ║
        ║   │  ICRS ◆  │       ║ ← A 70-75% de profundidade
        ║   └──────────┘       ║
        ║                      ║
        ║ Descemet (~10 μm)    ║ ← Linha fina
        ║ Endotélio (~5 μm)    ║ ← Azul escuro
        ========================
        INFERIOR (câmara anterior)
              ↑ ↑ ↑
            PIO (pressão)
```

**Regras de orientação:**
1. **Epitélio SEMPRE em cima** — é a superfície anterior
2. **Endotélio SEMPRE embaixo** — é a superfície posterior
3. **PIO (setas) SEMPRE vindo de baixo** — posterior → anterior
4. **ICRS posicionado no estroma posterior** — a ~70-75% de profundidade
5. **Curvatura convexa para cima** em vista frontal
6. **Ápice do cone apontando para cima** (protrusão anterior)

### 1.3 Convenções de Setas e Vetores

| Seta | Direção | Cor | Significado |
|------|---------|-----|-------------|
| **PIO** | ↑ (para cima) | Laranja `#F97316` | Pressão empurrando córnea anteriormente |
| **VR** | centro → anel (centrífuga, do centro em direção ao anel a 5-6mm) | Vermelho `#EF4444` | Fibra tracionada pelo anel → aplainamento central |
| **VT** | ↕ (perpendicular ao VR) | Azul `#3B82F6` | Encurvamento tangencial (coupling) |
| **Vτ** | ↻ (rotacional/gradiente) | Verde `#22C55E` | Torque de travamento das oblíquas |
| **Cone (deformação)** | ↑↗ (protrusão) | Amarelo `#FBBF24` | Direção da ectasia |
| **ICRS (força)** | ↓ (contra a PIO) | Cinza `#94A3B8` | Separação lamelar |

### 1.4 Perfis de Anéis — Formas Padrão

```
Triangular (Ferrara/Keraring)     Prismático (AJL)
    ▲                             ╱▔▔╲
   ╱ ╲                           ╱    ╲
  ╱   ╲                         ╱______╲
 ╱_____╲                       

Fusiforme (Cornealring 355)     Elíptico (Intacs)
   ╱‾‾╲                           ⬭
  ╱    ╲                        ╱    ╲
  ╲    ╱                        ╲    ╱
   ╲__╱                           ⬭

MyoRing (Anel Completo)
  ╔══════════╗
  ║          ║  ← Cilindro contínuo 360°
  ╚══════════╝
```

### 1.5 Tipografia

- **Títulos de figuras:** Inter, 14pt, Bold, Branco `#FFFFFF`
- **Labels anatômicos:** Inter, 11pt, Regular, Branco `#E2E8F0`
- **Labels de vetores:** Inter, 12pt, Bold, cor do vetor correspondente
- **Legendas:** Crimson Pro Italic, 10pt, `#94A3B8`
- **Notas de escala:** Inter, 9pt, `#64748B`

---

## 2. BIORENDER WORKFLOW

### 2.1 Quando Usar BioRender

- **Figuras anatômicas gerais** (corte da córnea, camadas, olho sagital)
- **Diagramas moleculares** (crosslinking, colágeno)
- **Figuras esquemáticas** (fluxos, comparações)
- **Protótipos rápidos** para validação antes de comissionar Fiverr

### 2.2 Templates BioRender Relevantes

1. **Corneal Anatomy** — template editável com camadas
2. **Corneal Epithelium** — detalhes celulares do epitélio
3. **Eye Anatomy and Retinal Cells** — visão geral do olho
4. **Anterior Segment** — câmara anterior, ângulo, córnea

### 2.3 Passo-a-Passo BioRender para Córnea

1. Criar canvas 1920×1080px (16:9) ou 2400×1600px (3:2)
2. Buscar "cornea" → arrastar template de corte transversal
3. Customizar camadas com cores do §1.1
4. Adicionar ICRS: buscar "ring" ou "cylinder" → posicionar a 70-75%
5. Adicionar setas de vetor com cores corretas (§1.3)
6. Labels com hierarquia visual (§1.5)
7. Exportar PNG 300dpi para impressão / SVG para edição

### 2.4 Icons Úteis no BioRender

| Buscar por | Uso no Atlas |
|-----------|-------------|
| "cornea" | Camadas corneanas |
| "collagen fiber" | Lamelas e fibrilas |
| "pressure" ou "force" | Setas de PIO |
| "ring" ou "implant" | Anel ICRS |
| "cross section" | Cortes transversais |
| "epithelium" | Detalhes celulares |
| "eye anatomy" | Visão geral |

---

## 3. FIVERR COMMISSIONING WORKFLOW

### 3.1 Quando Comissionar no Fiverr

- **Figuras finais de publicação** (qualidade JCRS/Cornea)
- **Ilustrações complexas** (corte 3D da córnea com vetores)
- **Figuras compostas** (multi-panel A/B/C/D)
- **Qualquer figura que será impressa** em alta resolução

### 3.2 Como Encontrar o Ilustrador Certo

**Buscar no Fiverr:**
```
medical illustration ophthalmology anatomy
scientific figure textbook publication quality
medical illustrator cornea eye anatomy
```

**Filtros recomendados:**
- Nível: Top Rated ou Level 2
- Orçamento: $50-200 por figura (qualidade atlas)
- Portfolio: deve ter exemplos de anatomia ocular ou microscopica
- Reviews: mínimo 4.8 estrelas, 50+ avaliações

**Perguntas para o ilustrador:**
1. "Você tem experiência com ilustrações oftalmológicas?"
2. "Pode fazer corte transversal da córnea com camadas detalhadas?"
3. "Aceita trabalhar com paleta de cores definida?"
4. "Entrega em SVG/AI editável?"

### 3.3 Template de Brief para Fiverr

```markdown
# ILLUSTRATION BRIEF — Atlas Vetorial ICRS

## Project Overview
- **Publication:** Medical textbook / surgical atlas
- **Target audience:** Ophthalmologists, corneal surgeons, fellows
- **Style:** Clean, semi-realistic, similar to Krachmer/Presbycor atlases
- **Total figures needed:** [NUMBER]

## Figure [X]: [TITLE]
- **Description:** [DETAILED DESCRIPTION]
- **View:** Cross-section / Top view / Sagittal / 3D perspective
- **Orientation:** Epithelium at TOP, endothelium at BOTTOM
- **Must include:**
  - [ ] All 5 corneal layers labeled
  - [ ] ICRS ring at 70-75% stromal depth
  - [ ] Vector arrows with specified colors
  - [ ] IOP arrows from below (orange)
  - [ ] Scale bar showing approximate dimensions
- **Must NOT include:**
  - [ ] Unnecessary decorative elements
  - [ ] Shadows that obscure anatomy
  - [ ] Incorrect ring positions (must be posterior stroma)

## Color Palette (MANDATORY)
| Element | Hex Color |
|---------|-----------|
| VR arrows | #EF4444 (red) |
| VT arrows | #3B82F6 (blue) |
| Vτ arrows | #22C55E (green) |
| IOP arrows | #F97316 (orange) |
| Epithelium | #FDA4AF (light pink) |
| Stroma | #FDE68A (cream) |
| Endothelium | #1E3A5F (dark blue) |
| ICRS ring | #94A3B8 (gray) |
| Background | #0A0E17 (dark) or #FFFFFF (white) |

## Technical Specifications
- **Format:** SVG (primary) + PNG 300dpi (secondary)
- **Dimensions:** 2400 × 1600 px minimum
- **Font:** Inter (sans-serif) for all labels
- **Labels:** Sans-serif, white text on dark background
- **Language:** Portuguese (PT-BR) for final version

## Reference Images
[ATTACH 2-3 reference images showing desired style and accuracy level]

## Timeline & Revisions
- Deadline: [DATE]
- Revision rounds: 2 included
- Payment: [AMOUNT] upon final approval
- Usage: Unlimited, all formats, worldwide
```

### 3.4 Checklist de Revisão de Ilustração Recebida

Ao receber a ilustração do Fiverr, verificar:

**Anatomia:**
- [ ] Epitélio em cima, endotélio embaixo
- [ ] Espessura relativa das camadas correta (~90% é estroma)
- [ ] Bowman e Descemet presentes como linhas finas
- [ ] Curvatura convexa correta (mais curva no centro)

**Biomecânica:**
- [ ] PIO vindo de baixo (posterior → anterior)
- [ ] ICRS posicionado a ~70-75% de profundidade estromal
- [ ] Perfil do anel correto para o tipo mostrado
- [ ] Área de separação lamelar (tenting) visível ao redor do anel

**Vetores:**
- [ ] VR centrífugo (para fora, longe do ápice) — VERMELHO
- [ ] VT perpendicular ao VR — AZUL
- [ ] Vτ rotacional/gradiente — VERDE
- [ ] Direção da seta CORRETA (seta na ponta do efeito, não na origem)
- [ ] Legenda com nome completo + abreviação

**Qualidade:**
- [ ] Resolução mínima 300dpi
- [ ] Texto legível em 100% de zoom
- [ ] Cores consistentes com paleta do Atlas
- [ ] Sem artefatos, aliasing, ou blur excessivo
- [ ] Labels alinhados e organizados

---

## 4. AI IMAGE GENERATION (generate_image tool)

### 4.1 Quando Usar

- **Drafts conceituais** para validar composição antes do Fiverr
- **Diagramas esquemáticos** onde precisão anatômica 100% não é crítica
- **Figuras decorativas** (capas de seção, divisórias visuais)
- **Protótipos rápidos** para discussão com o autor

### 4.2 Prompt Engineering para Imagens Médicas

**Estrutura de prompt para córnea:**
```
[TIPO DE VISUALIZAÇÃO], [PERSPECTIVA], [CONTEÚDO ANATÔMICO],
[VETORES/FORÇAS], [ESTILO], [CORES], [FUNDO],
medical illustration quality, clean lines, labeled diagram,
atlas-grade, publication quality, high contrast
```

**Exemplo:**
```
Cross-sectional diagram of the human cornea showing all 5 layers
(epithelium at top, Bowman's layer, stroma, Descemet's membrane,
endothelium at bottom), with an intrastromal ring segment (ICRS)
implanted at 70% depth in the posterior stroma. Red arrows showing
radial vector (VR) pointing outward, orange arrows showing IOP
pressure from below. Clean medical illustration style on dark
background, labeled anatomical diagram, publication quality.
```

### 4.3 Pós-Processamento

Após gerar a imagem:
1. Verificar todas as convenções do §1.2 (orientação)
2. Verificar cores dos vetores (§1.1)
3. Se necessário, adicionar labels em software de edição
4. Salvar em `images/CH-XXX_[Nome]/` com nome descritivo

---

## 5. CATÁLOGO DE FIGURAS DO ATLAS

### 5.1 Figuras por Capítulo — Padrão Mínimo

| Capítulo | Figuras Essenciais |
|----------|-------------------|
| CH-001 | Corte transversal da córnea (5 camadas), Malha de colágeno (vista superior), Fibras oblíquas (corte transversal), Cascata patogênica do ceratocone |
| CH-002 | 5 perfis de anéis, Mecanismo de separação lamelar, Comparação de perfis |
| CH-003 | Fenótipos de cone (Nipple, Oval, Globoso, Duck, Croissant) em mapa topográfico |
| CH-004 | VR em corte transversal, VR em vista superior, Profundidade vs eficácia VR |
| CH-005 | VT e coupling effect, VT em vista superior |
| CH-006 | Vτ e gradiente de oblíquas, Anel assimétrico vs simétrico |
| CH-007 | VComa e aberração de Zernike, Deslocamento do ápice |
| CH-008 | LDM em anéis de Plácido, Mapa de forças |
| CH-009 | VEsférico como soma dos 4 vetores |
| CH-010 | ICE scatter plot, ICE Alto vs Baixo |
| CH-011 | Nomograma vetorial de 5 passos |
| CH-015 | Modelo 4-camadas, CXL × Perfil |

### 5.2 Nomenclatura de Arquivos

```
images/
  CH-001_Anatomia/
    Figura_1.1_Corte_Transversal_Cornea.png
    Figura_1.2_Malha_Colageno_Vista_Superior.png
  CH-004_Vetor_Radial/
    Figura_4.1_VR_Corte_Transversal.png
    Figura_4.2_VR_Vista_Superior.png
```

---

## 6. QUALITY GATES

### Gate 1: Draft (AI/BioRender)
- Composição correta
- Orientação padrão respeitada
- Cores aproximadas

### Gate 2: Review (Engenheiro Vetorial)
- Direção dos vetores verificada (§1.3)
- Anatomia precisa (§1.2)
- Legenda completa

### Gate 3: Final (Fiverr/Profissional)
- 300dpi+ resolução
- SVG editável disponível
- Consistência com todas as outras figuras
- Pronto para impressão

---

## 7. REGRAS ABSOLUTAS

1. **NUNCA** colocar o epitélio embaixo
2. **NUNCA** mostrar PIO vindo de cima
3. **NUNCA** posicionar o anel no estroma anterior (sempre posterior, ~70-75%)
4. **NUNCA** usar cores de vetor erradas (VR=vermelho, VT=azul, Vτ=verde)
5. **NUNCA** omitir a legenda de vetores em uma figura que mostra vetores
6. **NUNCA** mostrar o anel com perfil incorreto para o tipo mencionado
7. **SEMPRE** incluir label de profundidade quando mostrar o anel no estroma
8. **SEMPRE** mostrar a curvatura convexa da córnea (não plana)
9. **SEMPRE** indicar a câmara anterior abaixo do endotélio
10. **SEMPRE** usar a mesma escala relativa entre camadas em todas as figuras
