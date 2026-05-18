---
name: Medical Studio Hybrid Rendering — Padrão Nucleus / Axs Studio
description: Define o padrão de renderização híbrida para o motor da Masterclass. Estipula as regras para utilizar backgrounds em microscopia 3D (estáticos) sobrepostos por camadas SVG matemáticas animadas (forças, vetores e limites) com blending e transparência, simulando estúdios de alto nível.
---

# Medical Studio Hybrid Rendering
> **Objetivo:** Alcançar o nível visual de estúdios de classe mundial (Nucleus Medical Media, Axs Studio) fundindo realismo biológico 3D com precisão biomecânica (matemática/vetorial).
> **Alvo:** Motor de Apresentação (React/SVG).

---

## 1. O Paradigma da Renderização Híbrida
Nunca use diagramas chapados 2D quando puder usar um background realista. O fluxo híbrido funciona dividindo a cena em duas camadas autônomas:
1. **Z-Index 0 (Background):** A imagem 3D hiper-realista, importada via tag `<image>` no SVG ou como background-image do container. Representa a anatomia, histologia e texturas biológicas.
2. **Z-Index 1 (Overlay Vetorial):** Elementos matemáticos e físicos em SVG puro. Eles brilham e são animados. Nunca representam tecido vivo, apenas dados matemáticos (vetores, pressões, contornos mecânicos e isolinhas).

## 2. Regras de Design do Overlay (SVG)
- **Fibras Biológicas (Desativadas):** Não desenhe fibras, epitélio ou lamelas no SVG se a imagem 3D já os contiver. Oculte (`opacity={0}`) essas camadas de referência.
- **Forças (Vetores):** As setas devem ser grossas (`strokeWidth={2.5}`), usar as cores canônicas do sistema vetorial (ex: `#00FF88` para V_End, `#FFFFFF` para PIO, `#CC2200` para VR) e ter opacidade alta para saltar aos olhos contra o fundo escuro (`#0a1628`) da imagem 3D.
- **Calibração de Coordenadas:** O ponto `(cx, cy)` do SVG onde as forças agem (ex: fulcro do anel) DEVE ser matematicamente calibrado no componente React para sobrepor perfeitamente a posição do objeto renderizado na imagem 3D.
- **Transições:** As forças matemáticas costumam piscar, pulsar (opacity animation) ou se mover suavemente para demonstrar a magnitude, enquanto o fundo permanece estático, criando um efeito de "análise em tempo real" sobre a biologia (HUD médico).

## 3. Checklist de Implementação em React
- [ ] A tag `<image href="/imagem3D.png" x="0" y="0" width={W} height={H} preserveAspectRatio="xMidYMid slice" />` foi inserida como o PRIMEIRO elemento dentro da tag principal `<svg>`?
- [ ] Os retângulos (`<rect>`) de cor chapada que desenhavam o tecido base foram removidos ou definidos com `opacity="0"`?
- [ ] O componente `ringY` (ou coordenadas similares de ancoragem) foi calibrado via tentativa-e-erro/math para bater no anel 3D visível no fundo?
- [ ] Os textos e labels receberam `textShadow` forte ou contraste suficiente para não se perderem na riqueza de detalhes da imagem 3D?

---

## 4. Skills Relacionadas

| Skill | Relação |
|-------|---------|
| `atlas_visual_identity_system` | **Paleta canônica** — cores dos vetores e camadas anatômicas |
| `svg_vector_aesthetic_engine` | **Estética do overlay SVG** — gradientes, filtros, animações |
| `icrs_desenho_histologico` | Prompts para gerar o background 3D histológico |
| `icrs_vector_illustration` | Regras de direção das setas no overlay |
