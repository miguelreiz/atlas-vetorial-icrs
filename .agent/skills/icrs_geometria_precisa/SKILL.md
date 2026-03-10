---
name: ICRS Geometria Precisa — Controle Pixel-a-Pixel de Elementos Corneanos em Ilustrações
description: Skill de precisão geométrica para ilustrações do Atlas. Resolve o problema central de IA gerativa não conseguir posicionar corretamente elementos pequenos (perfis do anel, triângulos, setas, camadas finas) em imagens corneanas. Define quando usar Python/matplotlib vs. IA, e fornece código-template para cada elemento geométrico crítico do Atlas.
---

# ICRS Geometria Precisa — Antigravity
> **Regra de Ouro:** Qualquer elemento com posição, orientação ou proporção biomecânica crítica DEVE ser gerado por Python/matplotlib — nunca por IA generativa.
> **Razão:** IA generativa tem ~30% de taxa de erro em orientação direcional de elementos pequenos (triângulos, setas, camadas finas). Python tem 0%.

---

## 1. Catálogo de Problemas Conhecidos com IA Generativa

| Elemento | Problema Típico | Frequência | Solução |
|----------|----------------|-----------|---------|
| Perfil triangular do anel (▲) | Ápice para baixo em vez de para cima | Alta (visto 3×) | Python sempre |
| Profundidade do anel | Anel no 1/3 anterior em vez de posterior | Alta | Python sempre |
| Setas VR | Apontam para o centro em vez de para fora | Média | Python sempre |
| Bowman/Descemet | Aparecem como bandas grossas | Alta | Python sempre |
| Proporção estroma ant:post | 1:1 em vez de 1:3 | Muito alta | Python sempre |
| Seta PIO | Aponta para baixo em vez de para cima | Média | Python sempre |
| Superfície sobre o anel | Elevação ("tenting") em vez de aplainamento | Alta | Python sempre |
| Escala dos elementos | Anel ocupa >50% da espessura | Alta | Python sempre |

### Regra de Decisão: IA vs. Python

```
Use IA generativa APENAS para:
  ✅ Imagens histológicas/microscópicas (textura biológica)
  ✅ Retratos de pacientes ou cirurgiões (realismo)
  ✅ Ilustrações decorativas sem precisão biomecânica
  ✅ Backgrounds e texturas

Use Python/matplotlib para TUDO que envolve:
  ❌→✅ Perfis do anel (triângulo, hexágono, oval)
  ❌→✅ Posição e profundidade do anel na córnea
  ❌→✅ Direção das setas (VR, VT, PIO, V_End)
  ❌→✅ Proporção das camadas corneanas
  ❌→✅ Topografias e mapas de curvatura
  ❌→✅ Diagramas de mecanismo vetorial
  ❌→✅ Nomogramas e gráficos clínicos
  ❌→✅ Qualquer figura com escala ou medidas
```

---

## 2. Código-Template: Perfil do Anel na Posição Correta

### 2.1 Anel Triangular (Ferrara/Keraring) — Ápice para CIMA ▲

```python
def draw_icrs_triangular(ax, x_center, z_ant_local, z_post_local,
                          depth_fraction=0.78, base_um=600, height_um=200,
                          total_thickness_um=550, scale_mm_per_um=0.001):
    """
    Desenha perfil triangular do anel ICRS com ápice apontando para CIMA (anterior).

    ANATOMIA CORRETA:
    - O anel triangular tem a BASE no fundo (posterior) e o ÁPICE voltado para cima (anterior)
    - O anel fica a ~70-80% de profundidade (medido do epitélio)
    - A base tem 600 µm circunferencialmente, mas em corte sagital a largura é menor

    Args:
        ax: eixo matplotlib
        x_center: posição x do centro do anel (mm)
        z_ant_local: z da superfície anterior no ponto x_center
        z_post_local: z da superfície posterior no ponto x_center
        depth_fraction: 0.78 = 78% de profundidade (medido do anterior)
        base_um: largura da base em µm (600µm para Ferrara)
        height_um: altura do triângulo em µm (200µm espessura)
        total_thickness_um: espessura total da córnea no ponto (µm)
        scale_mm_per_um: conversão µm para mm no plot
    """
    local_thick = z_ant_local - z_post_local   # espessura local em mm

    # Base do triângulo: a 78% de profundidade DO ANTERIOR
    z_base = z_ant_local - depth_fraction * local_thick

    # Altura do triângulo em mm
    h = height_um * scale_mm_per_um

    # Largura da base em corte (proporcional — menor que os 600µm circunferenciais)
    # Em corte sagital, o perfil triangular aparece com base ~300µm (metade)
    w = (base_um / 2) * scale_mm_per_um   # metade da base circunferencial

    # VÉRTICES DO TRIÂNGULO — ÁPICE PARA CIMA (z menor = mais anterior no plot invertido)
    # No plot com y-axis invertido (anterior em cima): z menor = mais alto na tela
    # Ápice: no topo (z_base - h = mais anterior = mais alto na tela)
    # Base: embaixo (z_base = mais posterior = mais baixo na tela)

    apex_z   = z_base - h          # ponto mais anterior (TOPO do triângulo na tela)
    base_z   = z_base              # linha da base (FUNDO do triângulo na tela)

    # Triângulo: ápice no centro-topo, base esquerda e direita embaixo
    vx = [x_center,          x_center - w,    x_center + w,    x_center]
    vz = [apex_z,            base_z,           base_z,          apex_z]

    tri = plt.Polygon(list(zip(vx, vz)), closed=True,
                      facecolor='#90A4AE', edgecolor='white',
                      lw=1.2, zorder=6, alpha=0.95)
    ax.add_patch(tri)

    # Label de profundidade
    ax.text(x_center + w + 0.15, (apex_z + base_z) / 2,
            f'{int(depth_fraction*100)}% prof.\n{height_um}µm',
            color='white', fontsize=7, va='center',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='#263238',
                      edgecolor='#90A4AE', lw=0.8, alpha=0.9))

    return apex_z, base_z

# EXEMPLO DE USO:
# apex_z, base_z = draw_icrs_triangular(ax, x_center=3.2,
#                                        z_ant_local=-0.02,
#                                        z_post_local=-0.57,
#                                        depth_fraction=0.78)
```

### 2.2 Anel Arredondado (Cornealring) — Perfil Circular

```python
def draw_icrs_rounded(ax, x_center, z_ant_local, z_post_local,
                       depth_fraction=0.78, diameter_um=300):
    """Desenha perfil arredondado (Cornealring) na posição correta."""
    local_thick = z_ant_local - z_post_local
    r = (diameter_um / 2) * 0.001   # raio em mm

    # Centro do círculo a 78% de profundidade
    z_center = z_ant_local - depth_fraction * local_thick

    circle = plt.Circle((x_center, z_center), r,
                         facecolor='#90A4AE', edgecolor='white',
                         lw=1.2, zorder=6, alpha=0.95)
    ax.add_patch(circle)
    return z_center
```

### 2.3 Anel Hexagonal (Intacs) — Perfil Prismático

```python
import matplotlib.patches as mpatches

def draw_icrs_hexagonal(ax, x_center, z_ant_local, z_post_local,
                         depth_fraction=0.78, width_um=700, height_um=250):
    """Desenha perfil hexagonal/prismático (Intacs) na posição correta."""
    local_thick = z_ant_local - z_post_local
    w = (width_um / 2) * 0.001
    h = height_um * 0.001

    z_top = z_ant_local - depth_fraction * local_thick   # topo do hexágono
    z_bot = z_top + h                                     # base

    # Hexágono simplificado como retângulo com cantos chanfrados
    chamfer = h * 0.15
    vx = [x_center - w + chamfer, x_center + w - chamfer,
          x_center + w,           x_center + w,
          x_center + w - chamfer, x_center - w + chamfer,
          x_center - w,           x_center - w]
    vz = [z_top,     z_top,
          z_top + chamfer, z_bot - chamfer,
          z_bot,   z_bot,
          z_bot - chamfer, z_top + chamfer]

    hex_patch = plt.Polygon(list(zip(vx, vz)), closed=True,
                             facecolor='#90A4AE', edgecolor='white',
                             lw=1.2, zorder=6, alpha=0.95)
    ax.add_patch(hex_patch)
    return z_top, z_bot
```

---

## 3. Código-Template: Camadas Corneanas com Proporção Correta

```python
def draw_corneal_layers(ax, x_arr, z_ant, z_post):
    """
    Desenha as 6 camadas corneanas com proporções corretas.

    PROPORÇÕES OBRIGATÓRIAS (% da espessura total):
      Epitélio:           9%  (~50µm de 550µm)
      Bowman:             2%  (~10µm) — LINHA, não banda
      Estroma Anterior:  25%  (~135µm)
      Estroma Posterior: 60%  (~330µm)
      Descemet:           2%  (~10µm) — LINHA, não banda
      Endotélio:          2%  (~5µm)  — LINHA
    """
    total = z_ant - z_post   # espessura local (negativa se invertida)

    # Limites de cada camada (do anterior para posterior)
    z_bow    = z_ant - 0.09 * total   # abaixo do epitélio
    z_astrom = z_bow - 0.02 * total   # abaixo de Bowman
    z_pstrom = z_astrom - 0.25 * total # abaixo do estroma anterior
    z_desc   = z_pstrom - 0.60 * total # abaixo do estroma posterior
    z_endo   = z_desc - 0.02 * total   # abaixo de Descemet

    # Preencher camadas
    ax.fill_between(x_arr, z_ant,    z_bow,    color='#FFCDD2', alpha=0.9, zorder=2)  # Epitélio
    ax.fill_between(x_arr, z_bow,    z_astrom, color='#8D6E63', alpha=0.9, zorder=2)  # Bowman
    ax.fill_between(x_arr, z_astrom, z_pstrom, color='#F5E6C8', alpha=0.7, zorder=2)  # E. Anterior
    ax.fill_between(x_arr, z_pstrom, z_desc,   color='#EDD9A3', alpha=0.7, zorder=2)  # E. Posterior
    ax.fill_between(x_arr, z_desc,   z_endo,   color='#9E9E9E', alpha=0.9, zorder=2)  # Descemet
    ax.fill_between(x_arr, z_endo,   z_post,   color='#B3E5FC', alpha=0.7, zorder=2)  # Endotélio

    # Linhas de contorno
    ax.plot(x_arr, z_ant,    color='white',   lw=0.5, zorder=3, alpha=0.5)
    ax.plot(x_arr, z_bow,    color='#8D6E63', lw=0.6, zorder=3, alpha=0.8)
    ax.plot(x_arr, z_pstrom, color='#BCAAA4', lw=0.5, zorder=3, alpha=0.5, ls='--')
    ax.plot(x_arr, z_post,   color='#37474F', lw=0.8, zorder=3)

    return z_bow, z_astrom, z_pstrom, z_desc, z_endo
```

---

## 4. Verificação de Geometria — Checklist Pré-Publicação

### Para Toda Figura com Corte Transversal da Córnea:

```python
def verify_icrs_geometry(z_ant, z_post, z_ring_top, z_ring_bot,
                          ring_type='triangular', tolerance=0.05):
    """
    Verifica se a geometria do anel está correta antes de salvar a figura.

    Returns:
        lista de erros (lista vazia = aprovado)
    """
    errors = []
    local_thick = abs(z_ant - z_post)

    # 1. Verificar profundidade do anel (70-80% do anterior)
    z_ring_center = (z_ring_top + z_ring_bot) / 2
    depth_from_ant = abs(z_ring_top - z_ant) / local_thick

    if depth_from_ant < 0.65:
        errors.append(f"ERRO: Anel muito superficial ({depth_from_ant:.0%} depth) — mínimo 70%")
    if depth_from_ant > 0.88:
        errors.append(f"ERRO: Anel muito profundo ({depth_from_ant:.0%} depth) — máximo 85%")

    # 2. Verificar tamanho proporcional do anel
    ring_height = abs(z_ring_top - z_ring_bot)
    ring_fraction = ring_height / local_thick

    if ring_fraction > 0.45:
        errors.append(f"ERRO: Anel muito grande ({ring_fraction:.0%} da espessura) — máximo ~36%")

    # 3. Para triangular: verificar orientação do ápice
    if ring_type == 'triangular':
        # z_ring_top deve ser MENOR que z_ring_bot (mais anterior = menor z no plot)
        # (quando o eixo y está invertido, menor z = mais alto na tela)
        pass  # verificação visual — confirmar nos vertices

    # 4. Estroma residual posterior
    residual_post = abs(z_ring_bot - z_post)
    residual_um = residual_post / local_thick * 550   # estimado

    if residual_um < 150:
        errors.append(f"AVISO: Estroma residual < 150µm ({residual_um:.0f}µm) — revisar")

    if not errors:
        print("✅ Geometria ICRS aprovada")
    else:
        for e in errors:
            print(f"❌ {e}")

    return errors
```

---

## 5. Regras de Orientação do Triângulo na Córnea

### A Confusão Mais Comum

```
ERRADO (IA generativa frequentemente gera assim):
  Epitélio ─────────────────────────
  Estroma ──────────────────────────
           ▽ (ápice para BAIXO)
           ───── base no topo ──────
  Endotélio ────────────────────────

CORRETO (anatomia real + biomecânica):
  Epitélio ─────────────────────────
  Estroma Anterior ─────────────────
  Estroma Posterior ────────────────
           ▲ (ápice aponta para o EPITÉLIO = para CIMA)
           ─────── base embaixo ────fica na parte mais posterior
  Descemet/Endotélio ───────────────

POR QUÊ: O perfil triangular foi projetado para que a PONTA (ápice)
          empurre as lamelas anteriores, gerando o VR. A BASE fica
          assentada nas lamelas paralelas posteriores (mais estáveis).
          O ápice, voltado para o epitélio, é o ponto de maior pressão
          → maior VR → maior aplainamento.
```

### Memorizar com Esta Fórmula
```
Ápice do triângulo = direção do VR = para o EPITÉLIO = para CIMA
Base do triângulo  = assenta no estroma POSTERIOR = para BAIXO
```

---

## 6. Protocolo de Regeneração Quando IA Erra a Geometria

Quando a IA generativa produz imagem com geometria errada:

1. **Não regenerar mais de 2× com a mesma IA** — taxa de sucesso não melhora
2. **Mudar para Python/matplotlib imediatamente** — use os templates desta skill
3. **Script base:** copiar `plot_fig_4_4.py` como template e adaptar
4. **Verificar com `verify_icrs_geometry()`** antes de salvar
5. **Registrar o erro** no `mapa_evidencias_vivo` se for erro recorrente

### Quando IA Pode Tentar (Máx. 2 tentativas):
- Imagem puramente decorativa sem precisão biomecânica
- Background ou textura de fundo
- Retratos, fotos, imagens histológicas

### Quando Python É Obrigatório (sem exceção):
- Qualquer figura com anel ICRS posicionado
- Qualquer corte transversal com camadas
- Qualquer figura com setas de vetores
- Qualquer topografia ou mapa de curvatura
- Qualquer nomograma ou gráfico clínico

---

## 7. Biblioteca de Scripts Existentes (Reusar)

| Script | Tipo | Elementos Gerados |
|--------|------|------------------|
| `fem/plot_fig_4_4.py` | Tipo A — Corte transversal | Camadas + ICRS triangular + VR + V_End |
| `fem/plot_fig_5_1.py` | Tipo B — Top-down | Fibras + anel + VR + VT + acoplamento |
| `fem/plot_fig_5_2.py` | Tipo B — Top-down | Anel semicircular + VT extremidades |
| `fem/plot_fig_5_3.py` | Tipo D — Comparativo | Eixo correto vs. errado, SIA |

**Regra de reuso:** Antes de criar novo script, verificar se um existente pode ser adaptado. Economia de 70% do tempo.
