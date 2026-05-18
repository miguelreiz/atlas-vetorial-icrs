---
name: SVG Vector Aesthetic Engine — Motor de Estética Vetorial Premium para React/SVG
description: Define padrões visuais premium para componentes SVG/React do Atlas Vetorial ICRS e da Masterclass. Transforma ilustrações funcionais em visualizações de nível editorial usando gradientes sofisticados, filtros SVG, micro-animações, texturas vetoriais e glassmorphism. Complementa o atlas_visual_identity_system (paleta/regras) com a camada estética que faz as imagens "brilharem".
---

# SVG Vector Aesthetic Engine — Antigravity

> **Objetivo:** Transformar diagramas SVG funcionais em ilustrações vetoriais de nível **Nucleus Medical Media / Axs Studio** — sem perder precisão biomecânica.
> **Paleta:** Importar SEMPRE do `atlas_visual_identity_system` (fonte única de verdade).
> **Alvo:** Componentes React/SVG da Masterclass (`Aula vetores corneanos/src/`).

---

## 1. FILOSOFIA: Funcional → Premium

```
ANTES (funcional):                  DEPOIS (premium):
┌─────────────────────┐            ┌─────────────────────────────┐
│  Retângulos chapados │            │  Gradientes com profundidade │
│  Cores flat          │            │  Glow nas setas de força     │
│  Sem animação        │     →      │  Micro-animações pulsantes   │
│  Fundo flat #0D1117  │            │  Fundo radial com vignette   │
│  Texto sem shadow    │            │  Texto com HUD glow          │
└─────────────────────┘            └─────────────────────────────┘
```

---

## 2. GRADIENTES SVG — Biblioteca Padrão

### 2.1 Gradiente de Profundidade Estromal (Corte Transversal)

```jsx
<defs>
  {/* Gradiente vertical para o estroma — simula profundidade histológica */}
  <linearGradient id="stromaGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#F5E6C8" stopOpacity="0.9" />  {/* Anterior (feltro) */}
    <stop offset="30%"  stopColor="#EDD9A3" stopOpacity="0.8" />  {/* Transição */}
    <stop offset="100%" stopColor="#D4C48A" stopOpacity="0.7" />  {/* Posterior (paralelo) */}
  </linearGradient>

  {/* Gradiente para o epitélio — rosa translúcido com brilho */}
  <linearGradient id="epitheliumGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#FFCDD2" stopOpacity="0.95" />
    <stop offset="60%"  stopColor="#FFCDD2" stopOpacity="0.85" />
    <stop offset="100%" stopColor="#F8BBD0" stopOpacity="0.75" />
  </linearGradient>

  {/* Gradiente radial para vignette do background */}
  <radialGradient id="bgVignette" cx="50%" cy="50%" r="65%">
    <stop offset="0%"   stopColor="#162236" />  {/* Centro mais claro */}
    <stop offset="100%" stopColor="#0D1117" />  {/* Bordas escuras */}
  </radialGradient>
</defs>

{/* Uso: background com profundidade */}
<rect width={W} height={H} fill="url(#bgVignette)" />
```

### 2.2 Gradiente para Anel ICRS (Translúcido com Reflexo)

```jsx
<defs>
  <linearGradient id="icrsGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#B0BEC5" stopOpacity="0.9" /> {/* Topo: reflexo */}
    <stop offset="40%"  stopColor="#90A4AE" stopOpacity="0.7" /> {/* Corpo: translúcido */}
    <stop offset="100%" stopColor="#607D8B" stopOpacity="0.6" /> {/* Base: sombra */}
  </linearGradient>
  
  {/* Brilho especular no topo do anel */}
  <linearGradient id="icrsHighlight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.4" />
    <stop offset="30%"  stopColor="#FFFFFF" stopOpacity="0.0" />
  </linearGradient>
</defs>

{/* ICRS com reflexo realista */}
<polygon points="..." fill="url(#icrsGrad)" stroke="#B0BEC5" strokeWidth={1.2} />
<polygon points="..." fill="url(#icrsHighlight)" opacity={0.5} /> {/* Overlay de reflexo */}
```

### 2.3 Gradiente para Setas de Força (Glow Direcional)

```jsx
<defs>
  {/* Glow vermelho para VR */}
  <filter id="vrGlow">
    <feGaussianBlur stdDeviation="3" result="blur" />
    <feFlood floodColor="#CC2200" floodOpacity="0.6" result="color" />
    <feComposite in="color" in2="blur" operator="in" result="shadow" />
    <feMerge>
      <feMergeNode in="shadow" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
  
  {/* Glow ciano para VT */}
  <filter id="vtGlow">
    <feGaussianBlur stdDeviation="3" result="blur" />
    <feFlood floodColor="#00B4DC" floodOpacity="0.6" result="color" />
    <feComposite in="color" in2="blur" operator="in" result="shadow" />
    <feMerge>
      <feMergeNode in="shadow" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  {/* Glow verde para V_End */}
  <filter id="vendGlow">
    <feGaussianBlur stdDeviation="4" result="blur" />
    <feFlood floodColor="#00FF88" floodOpacity="0.5" result="color" />
    <feComposite in="color" in2="blur" operator="in" result="shadow" />
    <feMerge>
      <feMergeNode in="shadow" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
  
  {/* HUD text shadow para labels sobre fundo complexo */}
  <filter id="hudGlow">
    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
    <feMerge>
      <feMergeNode in="coloredBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>

{/* Uso: setas com glow */}
<line x1={x0} y1={y0} x2={x1} y2={y1} 
  stroke="#CC2200" strokeWidth={3} filter="url(#vrGlow)" 
  markerEnd="url(#vr-arrow)" />
```

---

## 3. TEXTURAS VETORIAIS (SVG Patterns)

### 3.1 Padrão de Fibras do Estroma Anterior (Feltro Isotrópico)

```jsx
<defs>
  <pattern id="feltPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
    {/* Fibras cruzando em múltiplas direções — simula feltro */}
    <line x1="0" y1="5"  x2="20" y2="15" stroke="#E8D5B0" strokeWidth="0.5" opacity="0.4" />
    <line x1="0" y1="15" x2="20" y2="5"  stroke="#E8D5B0" strokeWidth="0.5" opacity="0.4" />
    <line x1="3" y1="0"  x2="17" y2="20" stroke="#DCC89E" strokeWidth="0.3" opacity="0.3" />
    <line x1="10" y1="0" x2="10" y2="20" stroke="#D4BC8C" strokeWidth="0.3" opacity="0.2" />
  </pattern>

  {/* Fibras do estroma posterior — paralelas e organizadas */}
  <pattern id="lamellarPattern" x="0" y="0" width="30" height="8" patternUnits="userSpaceOnUse">
    <line x1="0" y1="4" x2="30" y2="4" stroke="#D4C08A" strokeWidth="0.6" opacity="0.35" />
  </pattern>
</defs>

{/* Estroma anterior com textura de feltro */}
<rect x={x} y={y} width={w} height={h} fill="url(#feltPattern)" />
{/* Estroma posterior com lamelas paralelas */}
<rect x={x} y={y2} width={w} height={h2} fill="url(#lamellarPattern)" />
```

### 3.2 Fibras Radiais (Vista Top-Down)

```jsx
<defs>
  <pattern id="radialFibers" x="0" y="0" width="100%" height="100%" patternUnits="objectBoundingBox">
    {/* Gerar programaticamente no componente React */}
  </pattern>
</defs>

{/* Alternativa: gerar fibras como linhas no JSX */}
{Array.from({length: 24}, (_, i) => {
  const angle = (i * 15) * Math.PI / 180;
  const r1 = 30, r2 = 120;
  return (
    <line key={i}
      x1={cx + r1 * Math.cos(angle)} y1={cy + r1 * Math.sin(angle)}
      x2={cx + r2 * Math.cos(angle)} y2={cy + r2 * Math.sin(angle)}
      stroke="#CC2200" strokeWidth={0.8} opacity={0.4 + Math.random() * 0.3}
    />
  );
})}
```

---

## 4. MICRO-ANIMAÇÕES

### 4.1 Pulsação de Vetores (Indica Força Ativa)

```jsx
{/* Seta VR que pulsa suavemente — indica que a força está "viva" */}
<line x1={x0} y1={y0} x2={x1} y2={y1}
  stroke="#CC2200" strokeWidth={3} filter="url(#vrGlow)">
  <animate attributeName="stroke-opacity" 
    values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
  <animate attributeName="stroke-width" 
    values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
</line>
```

### 4.2 Onda de PIO (Pressão Rítmica)

```jsx
{/* Setas PIO que pulsam como ondas — simula heartbeat da pressão */}
{[-1, 0, 1].map((offset, i) => (
  <line key={i}
    x1={cx + offset * 40} y1={botY + 20}
    x2={cx + offset * 40} y2={topY + 30}
    stroke="#FFFFFF" strokeWidth={1.8} markerEnd="url(#pio-arrow)">
    <animate attributeName="y2"
      values={`${topY+40};${topY+25};${topY+40}`}
      dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
    <animate attributeName="stroke-opacity"
      values="0.3;1;0.3"
      dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
  </line>
))}
```

### 4.3 Transição de Cena (Fade-in Progressivo)

```jsx
{/* Elemento que surge suavemente ao entrar na cena */}
<g opacity={0}>
  <animate attributeName="opacity" 
    from="0" to="1" dur="0.8s" fill="freeze" 
    begin={`${scene >= targetScene ? '0s' : 'indefinite'}`} />
  {/* ... conteúdo do elemento ... */}
</g>
```

### 4.4 Highlight de Zona Ativa (Glow Pulsante em Área)

```jsx
{/* Zona do anel que pulsa — indica área de ação biomecânica */}
<ellipse cx={cx} cy={ringY} rx={80} ry={15}
  fill="none" stroke="#00B4DC" strokeWidth={1.5}>
  <animate attributeName="rx" values="75;85;75" dur="3s" repeatCount="indefinite" />
  <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
</ellipse>
```

---

## 5. GLASSMORPHISM PARA PAINÉIS DE INFORMAÇÃO

```jsx
<defs>
  <filter id="glassBlur">
    <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
  </filter>
</defs>

{/* Painel de informação com efeito vidro fosco */}
<g>
  {/* Fundo blur */}
  <rect x={panelX} y={panelY} width={panelW} height={panelH}
    rx={12} fill="rgba(13, 17, 23, 0.6)" 
    stroke="rgba(255,255,255,0.1)" strokeWidth={1}
    filter="url(#glassBlur)" />
  {/* Borda luminosa sutil */}
  <rect x={panelX} y={panelY} width={panelW} height={panelH}
    rx={12} fill="none"
    stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
  {/* Conteúdo */}
  <text x={panelX + 16} y={panelY + 24} fill="#E2E8F0" fontSize={12} fontWeight={600}>
    Legenda dos Vetores
  </text>
</g>
```

---

## 6. MARKERS DE SETAS PREMIUM

```jsx
<defs>
  {/* Seta VR — triangular com glow vermelho */}
  <marker id="vr-arrow" markerWidth={10} markerHeight={8} refX={9} refY={4} orient="auto">
    <path d="M0,0 L0,8 L10,4 Z" fill="#CC2200" />
  </marker>
  
  {/* Seta VT — triangular com glow ciano */}
  <marker id="vt-arrow" markerWidth={10} markerHeight={8} refX={9} refY={4} orient="auto">
    <path d="M0,0 L0,8 L10,4 Z" fill="#00B4DC" />
  </marker>
  
  {/* Seta V_End — com glow verde-água */}
  <marker id="vend-arrow" markerWidth={10} markerHeight={8} refX={9} refY={4} orient="auto">
    <path d="M0,0 L0,8 L10,4 Z" fill="#00FF88" />
  </marker>
  
  {/* Seta PIO — branca, ponta fina */}
  <marker id="pio-arrow" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
    <path d="M0,0 L0,6 L8,3 Z" fill="#FFFFFF" />
  </marker>
  
  {/* Seta dupla (dimensão) — cinza */}
  <marker id="dim-arrow-l" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
    <path d="M6,0 L6,6 L0,3 Z" fill="#78909C" />
  </marker>
  <marker id="dim-arrow-r" markerWidth={6} markerHeight={6} refX={1} refY={3} orient="auto">
    <path d="M0,0 L0,6 L6,3 Z" fill="#78909C" />
  </marker>
</defs>
```

---

## 7. COMPONENTE REACT: SharedDefs (Importar em Todo Módulo)

Criar um componente reutilizável com todos os gradientes, filtros e markers:

```jsx
// src/components/svg/SharedDefs.jsx
export function SharedDefs() {
  return (
    <defs>
      {/* === GRADIENTES === */}
      <radialGradient id="bgVignette" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#162236" />
        <stop offset="100%" stopColor="#0D1117" />
      </radialGradient>
      
      <linearGradient id="stromaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.9" />
        <stop offset="30%" stopColor="#EDD9A3" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#D4C48A" stopOpacity="0.7" />
      </linearGradient>

      <linearGradient id="icrsGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0BEC5" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#90A4AE" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#607D8B" stopOpacity="0.6" />
      </linearGradient>

      {/* === FILTROS (GLOW) === */}
      <filter id="vrGlow"><feGaussianBlur stdDeviation="3" result="b"/><feFlood floodColor="#CC2200" floodOpacity="0.6" result="c"/><feComposite in="c" in2="b" operator="in" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="vtGlow"><feGaussianBlur stdDeviation="3" result="b"/><feFlood floodColor="#00B4DC" floodOpacity="0.6" result="c"/><feComposite in="c" in2="b" operator="in" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="vendGlow"><feGaussianBlur stdDeviation="4" result="b"/><feFlood floodColor="#00FF88" floodOpacity="0.5" result="c"/><feComposite in="c" in2="b" operator="in" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="hudGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>

      {/* === MARKERS (SETAS) === */}
      <marker id="vr-arrow" markerWidth={10} markerHeight={8} refX={9} refY={4} orient="auto">
        <path d="M0,0 L0,8 L10,4 Z" fill="#CC2200" />
      </marker>
      <marker id="vt-arrow" markerWidth={10} markerHeight={8} refX={9} refY={4} orient="auto">
        <path d="M0,0 L0,8 L10,4 Z" fill="#00B4DC" />
      </marker>
      <marker id="vend-arrow" markerWidth={10} markerHeight={8} refX={9} refY={4} orient="auto">
        <path d="M0,0 L0,8 L10,4 Z" fill="#00FF88" />
      </marker>
      <marker id="pio-arrow" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
        <path d="M0,0 L0,6 L8,3 Z" fill="#FFFFFF" />
      </marker>

      {/* === TEXTURAS === */}
      <pattern id="feltPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="5" x2="20" y2="15" stroke="#E8D5B0" strokeWidth="0.5" opacity="0.4" />
        <line x1="0" y1="15" x2="20" y2="5" stroke="#E8D5B0" strokeWidth="0.5" opacity="0.4" />
        <line x1="3" y1="0" x2="17" y2="20" stroke="#DCC89E" strokeWidth="0.3" opacity="0.3" />
      </pattern>
      <pattern id="lamellarPattern" x="0" y="0" width="30" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="4" x2="30" y2="4" stroke="#D4C08A" strokeWidth="0.6" opacity="0.35" />
      </pattern>
    </defs>
  );
}
```

---

## 8. REGRAS DE OURO DA ESTÉTICA VETORIAL

1. **Gradiente > Flat** — NUNCA usar cor sólida chapada para anatomia. Sempre gradiente com transparência.
2. **Glow nas forças** — Toda seta de vetor biomecânico DEVE ter filtro de glow na cor correspondente.
3. **Vignette no fundo** — Background NUNCA flat `#0D1117`. Sempre gradiente radial com centro mais claro.
4. **Texturas nas camadas** — Estroma anterior = pattern de feltro. Posterior = linhas paralelas.
5. **Translucidez no ICRS** — O anel é PMMA translúcido. Usar gradiente com reflexo especular.
6. **Micro-animações sutis** — Pulsação de 2-3s em setas de força. Nunca animação rápida ou distrativa.
7. **HUD glow nos labels** — Todo texto sobre fundo complexo recebe `filter="url(#hudGlow)"`.
8. **Glassmorphism nas legendas** — Painéis de informação com blur + bordas luminosas.
9. **Manter legibilidade** — Beleza NUNCA sacrifica legibilidade. Se o glow atrapalha, reduzir.
10. **SharedDefs compartilhado** — NUNCA duplicar definições de gradientes/filtros. Importar `SharedDefs`.

---

## 9. ANTES/DEPOIS — NÍVEL DE UPGRADE ESPERADO

### Exemplo: CornealCrossSection

```
ANTES (funcional):
- Retângulos com fill sólido (#081830)
- Sem textura nas camadas
- Anel como ellipse chapada
- Labels sem shadow
- Fundo flat

DEPOIS (premium):
- Camadas com gradiente vertical (profundidade)
- Padrão de feltro no estroma anterior
- Lamelas paralelas no posterior
- Anel com gradiente translúcido + reflexo
- Glow em todas as setas de força
- Vignette no background
- Labels com HUD glow
- Pulsação sutil nas forças ativas
```

---

*Skill criada em Maio 2026 — Motor Editorial Antigravity DeepMind*
*Referencia: atlas_visual_identity_system (paleta), medical_studio_hybrid_rendering (arquitetura)*
