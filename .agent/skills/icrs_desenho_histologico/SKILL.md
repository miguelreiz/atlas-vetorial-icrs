---
name: ICRS Desenho Histológico — Padrão de Representação Anatômica 3D
description: Skill de engenharia de prompt restrita para forçar geradores de IA a respeitarem a histologia da córnea (proporção 1:3 estroma anterior/posterior, membranas limitantes ultrafinas e arquitetura fibrilar). Evita distorções estéticas comuns.
---

# ICRS Desenho Histológico (Medical Illustration Engine)
> **Objetivo:** Impedir que o apelo estético "sci-fi" dos geradores destrua o rigor anatômico oftalmológico.
> **Alvo:** Imagens 3D fotorrealistas e microscopia eletrônica colorizada (estilo Random42 / Nucleus Medical Media).

---

## 1. O Problema das IAs vs Histologia Corneana
Por padrão, geradores de imagem interpretam a córnea como um bloco homogêneo ou exageram a espessura das membranas limitantes. Esta skill **sobrepõe o viés artístico com regras paramétricas absolutas**.

## 2. Injeção de Prompt Universal (Copiar e Colar)
Sempre que for gerar um "corte histológico" ou "córnea 3D", anexe o seguinte bloco ao final do prompt:

```text
(MANDATORY HISTOLOGICAL CONSTRAINTS: The stroma must be strictly divided into two distinct regions: the posterior stroma must be exactly 3 times thicker than the anterior stroma. The anterior stroma has a dense, wavy, interwoven isotropic fiber mesh. The thicker posterior stroma has thick, perfectly straight, parallel, orthogonal lamellar bands. The Bowman's layer and Descemet's membrane must be rendered as incredibly thin, razor-sharp limiting lines, NOT thick bands. The epithelium is a very thin cellular layer at the very top, maximum 10% of total thickness. Do not blend the layers. Maintain strict 1:3 ratio for anterior-to-posterior stroma. Deep navy background #0a1628. Ultra-realistic scanning electron microscopy style, clinical medical illustration.)
```

## 3. Checklist Visual do Gerador
Após gerar a imagem, valide (ou regere) com base em:
- [ ] O estroma tem duas texturas distintas? (Entrelaçado em cima, paralelo largo embaixo).
- [ ] O estroma de baixo é visualmente MUITO mais espesso (3x)?
- [ ] As membranas (Bowman/Descemet) parecem fios de cabelo, não faixas?
- [ ] O epitélio está contido no topo extremo sem dominar o corte?
- [ ] Se houver ICRS, ele está "afogado" no estroma posterior denso, nunca no entrelaçado anterior?

## 4. Cores e Fibras Vetoriais (Se Aplicável)

> **⚠️ Fonte de verdade para cores:** `atlas_visual_identity_system` §1

Se a imagem mostrar vetores biomecânicos:
- **Radiais (VR):** `Vermelho sólido (#CC2200)`
- **Tangenciais (VT):** `Azul ciano (#00B4DC)`
- **Oblíquas/Bow springs (Vτ):** `Verde (#00CC44)`
- **PIO:** `Branco (#FFFFFF)`
- **V_End:** `Verde-água (#00FF88)`
- O anel PMMA deve ser translúcido com reflexo *cinza-azul* (`#90A4AE`).

---

## 5. Skills Relacionadas

| Skill | Relação |
|-------|---------|
| `atlas_visual_identity_system` | **Paleta canônica** — fonte única de verdade para cores |
| `svg_vector_aesthetic_engine` | Estética premium se output for SVG/React |
| `medical_studio_hybrid_rendering` | Se usando background 3D + overlay vetorial |
