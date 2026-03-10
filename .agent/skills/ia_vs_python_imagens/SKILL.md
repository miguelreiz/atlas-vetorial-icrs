---
name: IA vs Python — Decisão de Ferramenta para Imagens do Atlas
description: Guia definitivo de decisão entre IA generativa e Python/matplotlib para geração de imagens do Atlas Vetorial ICRS. Cataloga todas as limitações conhecidas da IA generativa em contexto médico-científico, define regras de uso obrigatório do Python, e documenta os vieses de treinamento que tornam a IA perigosa para publicação científica (ex: "tenting treinado"). Evita retrabalho e erros silenciosos que passam pela revisão visual mas falham na científica.
---

# IA vs Python — Decisão de Ferramenta para Imagens
> **Regra suprema:** IA generativa é o esboço. Python é o bisturi.
> **O mesmo princípio do cirurgião:** planejamento mental (IA) → execução milimétrica (Python).

---

## 1. Tabela de Decisão Rápida

| Tipo de Figura | Ferramenta | Motivo |
|---------------|-----------|--------|
| Capa / abertura de capítulo | ✅ IA | Atmosfera, sem precisão biomecânica |
| Histologia / textura biológica | ✅ IA | Realismo orgânico — IA excelente |
| Retrato de paciente / cirurgião | ✅ IA | Realismo fotográfico |
| Rascunho conceitual inicial | ✅ IA | Explorar composições em minutos |
| Background decorativo | ✅ IA | Sem precisão exigida |
| **Anel ICRS posicionado na córnea** | ❌→ Python | Profundidade, proporção, perfil |
| **Setas com direção vetorial específica** | ❌→ Python | VR, VT, PIO, V_End — direção crítica |
| **Proporções anatômicas das camadas** | ❌→ Python | Proporção 1:3 (ant:post) inatingível na IA |
| **Curvatura corneal específica (R=7,8mm)** | ❌→ Python | IA gera formas genéricas |
| **Superfície pós-ICRS (plana ou rebaixada)** | ❌→ Python | Viés de treinamento (ver seção 3) |
| **Labels em português** | ❌→ Python | IA distorce texto sistematicamente |
| **Topografias e mapas de curvatura** | ❌→ Python | Escala, gradiente, proporção |
| **Nomogramas e gráficos clínicos** | ❌→ Python | Precisão numérica obrigatória |
| **Equações e fórmulas** | ❌→ Python | IA deforma expressões matemáticas |
| **Figuras com escala / barra de medida** | ❌→ Python | IA não calcula escala real |
| **Consistência entre múltiplas figuras** | ❌→ Python | IA tem memória zero entre sessões |

---

## 2. Limitações Graves da IA Generativa (🔴 Frequentemente Falha)

### 2.1 — Texto e Labels Distorcidos
**Problema:** A IA gera texto ilegível, com letras trocadas, palavras fundidas ou caracteres inexistentes. Labels em português são piores que em inglês. Quanto mais texto na imagem, mais erros acumulam.

**Manifestação no Atlas:**
- "Epitélio" vira "Epiteli0" ou "Epitelio" com i maiúsculo aleatório
- "Vetor Radial (VR)" vira "Vator Radal" ou simplesmente desaparece
- Labels de seta apontam para o elemento errado

**Solução:** Toda figura com texto → Python. Sem exceção.

---

### 2.2 — Direção Precisa de Setas Ignorada ou Invertida
**Problema:** A IA não distingue "para cima" de "para baixo" em elementos pequenos. Setas sub-centimétrica na composição global são tratadas como "detalhe decorativo", não como informação biomecânica.

**Taxa de erro observada:** ~40–60% de falha em setas direcionais específicas.

**Manifestação no Atlas:**
- VR (centrífugo, para fora) sai apontando para o centro
- PIO (endotélio→epitélio, +Z para cima) sai para baixo
- V_End (descendente, −Z) sai para cima

**Solução:** Qualquer figura com vetores → Python com `ax.annotate()` controlado.

---

### 2.3 — Orientação de Formas Pequenas (O Problema do ▲ vs ▼)
**Problema:** Elementos com orientação biomecânica específica, quando pequenos em relação à composição total, são tratados como "decorativos" pela IA. Instruções direcionais explícitas ("ápice para cima") são ignoradas ou revertidas em ~70% das tentativas.

**Observação direta no projeto:** 3 regenerações consecutivas com prompt explícito "ápice do triângulo apontando para o EPITÉLIO (para cima)" — todas geraram ápice para baixo ou orientação aleatória.

**Manifestação no Atlas:**
- Perfil triangular Ferrara com ápice ▼ (anatomicamente incorreto)
- Perfil arredondado oval na horizontal em vez de vertical
- Hexágono do Intacs rotacionado 90°

**Por que acontece:** Para a IA, um triângulo de 0,5cm numa imagem de 10cm é textura, não elemento biomecânico. A orientação "correta" não está no treinamento dela — está no conhecimento cirúrgico do autor.

**Solução:** `icrs_geometria_precisa` → `draw_icrs_triangular()` com ápice sempre em `z_base - height` (acima da base).

---

### 2.4 — Proporções Anatômicas Numéricas
**Problema:** A IA não calcula proporções — ela estima visualmente. "70% de profundidade" ou "espessura de 200µm de 550µm total (36%)" são processados como "mais ou menos no meio" ou "fundo".

**Taxa de erro:** Proporção 1:3 (estroma anterior:posterior) → IA gera 1:1 em ~80% dos casos.

**Manifestação no Atlas:**
- 6 camadas desenhadas com espessura igual (cada uma ~16% em vez das proporções reais)
- Bowman e Descemet como bandas grossas de 15% em vez de linhas finas de 2%
- ICRS a 40–50% de profundidade em vez de 70–80%

**Solução:** `draw_corneal_layers()` na skill `icrs_geometria_precisa` garante proporções exatas via código.

---

### 2.5 — Contagem de Elementos
**Problema:** "Exatamente 2 segmentos de anel simétricos" pode resultar em 1, 3 ou 4 segmentos. A IA não conta — ela preenche a composição com o que parece visualmente equilibrado.

**Manifestação no Atlas:**
- 1 anel em vez de 2 segmentos
- 3 setas em vez de 2 (uma extra "para equilibrar")
- Camadas extras ou faltantes

---

### 2.6 — Curvatura Corneal Específica
**Problema:** R_anterior=7,8mm e R_posterior=6,4mm definem uma geometria muito específica que não está no treinamento da IA. Ela gera córneas "genéricas" — muito planas, muito curvas, ou com relação anterior:posterior errada.

**Consequência:** A espessura periférica parece errada, a zona de implantação do anel parece errada, e a curvatura K-steep vs K-flat não é diferenciada.

---

### 2.7 — Memória Zero Entre Imagens (O Problema de Consistência do Atlas)
**Problema crítico para publicação:** A IA não tem memória entre gerações. Cada figura é um universo separado. Resultado: 80 figuras com 80 estilos diferentes — incompatível com atlas médico.

**Manifestação:**
- Figura 4.4: anel cinza-azul `#90A4AE`, linhas brancas finas
- Figura 5.1 (gerada separado): anel prateado metálico, linhas grossas amarelas
- Figura 5.2: anel transparente com brilho
- Nenhuma parece do mesmo livro

**Python resolve:** O mesmo script base, o mesmo `COL_ICRS = "#90A4AE"`, o mesmo `BG = "#0D1117"` — 80 figuras com identidade visual idêntica.

---

## 3. O Viés de Treinamento — O Inimigo Invisível

### 3.1 — O "Tenting Treinado" (Mais Perigoso do Atlas)
**O que é:** A IA foi treinada em milhares de papers e livros que mostram tenting (elevação) sobre o anel ICRS — porque era o entendimento clássico do mecanismo. Esse padrão está gravado nos pesos do modelo.

**Consequência:** Mesmo com instrução explícita "NENHUMA ELEVAÇÃO sobre o anel, superfície deve ser PLANA ou REBAIXADA", a IA reverte ao padrão aprendido em aproximadamente 60% das tentativas.

**Por que é perigoso:** É um erro silencioso — a imagem parece profissional, passa pela revisão visual de quem não conhece o V_End confirmado pelo FEM, e publica uma ilustração que contradiz a hipótese central do Atlas.

**Não existe solução via prompt:** Este é um viés estrutural, não um erro de instrução. Não adianta escrever o prompt com mais detalhes, CAPS LOCK, ou repetir 3 vezes. A única solução é Python.

---

### 3.2 — Outros Vieses de Treinamento Relevantes
| Viés | Efeito no Atlas |
|------|----------------|
| "Anel ICRS = anel completo" | Gera 360° em vez de 160° |
| "Seta de força = para fora ou para cima" | VT nas extremidades sai no corpo do anel |
| "Camadas corneanas = zebra uniforme" | Todas as camadas com mesma espessura |
| "Córnea normal = hemisférica perfeita" | Não mostra a ectasia nem a topografia real |
| "Biomecânica = setas simétricas" | VComa assimétrico sai simétrico |

---

## 4. Limitações Moderadas (🟡 Às Vezes Funciona)

### 4.1 — Cores Hex Específicas
A IA interpreta `#CC2200` como "vermelho genérico" — pode gerar `#FF0000` ou `#990000`. Cores nomeadas (red, blue, cyan) funcionam melhor que hex. Para o Atlas, onde a paleta oficial é inviolável, isso exige pós-processamento manual ou Python.

### 4.2 — Layout Multi-Painel Sequencial
Grids 2×2 funcionam razoavelmente. Sequências 1×4 ou 1×6 (como progressão de KC) perdem a ordem ou fundem painéis. A IA não entende narrativa sequencial.

### 4.3 — Simetria Bilateral
"Dois elementos simétricos, um em cada lado" frequentemente resulta em elementos com tamanho, posição ou orientação ligeiramente diferentes — assimetria que o olho treinado do cirurgião percebe imediatamente.

### 4.4 — Comprimento de Seta Proporcional à Magnitude
VR de 200µm deve ter seta 2× maior que VR de 100µm. A IA não entende magnitudes relativas — todas as setas saem do mesmo tamanho, perdendo a informação quantitativa do nomograma.

### 4.5 — Gradientes e Heatmaps
Localização exata do pico de tensão (Von Mises) é imprecisa. "Pico na zona inferotemporal a 5mm do centro" sai como "borrão vermelho em algum lugar". Para o Atlas, onde a localização do pico é a evidência clínica, isso é inaceitável.

### 4.6 — Estruturas Dentro de Estruturas em Escala
Anel (200µm) → estroma (550µm) → córnea (12mm): hierarquia de 3 escalas em um campo visual. A IA perde as proporções relativas quando há mais de 2 níveis de escala simultâneos.

---

## 5. A Falha Silenciosa — O Tipo Mais Perigoso

**Definição:** A imagem parece profissional e convincente. Passa pela revisão visual de não-especialistas. Mas tem um detalhe errado que só um cirurgião ou revisor especializado percebe na banca de publicação.

**Exemplos típicos no Atlas:**
- Anel a 55% de profundidade em vez de 78% — parece certo, está errado
- VR marginalmente para dentro — parece seta de força genérica, viola a regra suprema
- Estroma anterior ligeiramente mais espesso que o posterior — proporção invertida, parece razoável
- Superfície com leve elevação sobre o anel — "tenting treinado" sutil, contradiz o FEM

**Por que é o pior tipo:** Um erro óbvio é corrigido. Um erro invisível é publicado.

**Protocolo anti-falha-silenciosa:**
```
Antes de aprovar qualquer imagem gerada por IA:
1. Medir visualmente a profundidade do anel (>70% da espessura?)
2. Verificar a superfície sobre o anel (plana? rebaixada? nunca elevada)
3. Verificar direção de cada seta (VR para fora? PIO para cima?)
4. Contar os elementos (número correto de anéis, setas, camadas?)
5. Se qualquer dúvida → descartar e usar Python
```

---

## 6. O Que a IA Faz Bem (Usar Ativamente)

| Ponto Forte | Como Usar no Atlas |
|-------------|-------------------|
| Atmosfera dark + estilo médico | Backgrounds de capítulo, imagens de abertura |
| Texturas biológicas realistas | Imagens histológicas (microscopia, corte HE) |
| Composições artísticas amplas | Capa do livro, página de rosto |
| Variações rápidas de conceito | 5 rascunhos em 3 minutos → escolher direção |
| Estilo "Netter" / "BioRender" | Quando o estilo importa mais que a precisão |
| Integração de cena clínica | Cirurgião + paciente + equipamento em contexto |

---

## 7. Protocolo de Uso por Fase da Figura

```
FASE 1 — CONCEITO (IA permitida):
  "Quero uma imagem de... estilo... composição..."
  Objetivo: decidir layout, composição, atmosfera
  Resultado esperado: rascunho inspirador (não publicável)
  Máximo: 3 tentativas — se não satisfeito, ir direto para Python

FASE 2 — CONSTRUÇÃO (Python obrigatório):
  Usar template de fem/plot_fig_4_4.py como base
  Aplicar paleta oficial (#0D1117, #CC2200, #00B4DC...)
  Usar draw_icrs_triangular() para o anel
  Usar draw_corneal_layers() para as camadas
  Verificar com verify_icrs_geometry() antes de salvar

FASE 3 — VALIDAÇÃO (checklist obrigatório):
  □ Anel a 70-80% de profundidade?
  □ Superfície sobre o anel = PLANA ou REBAIXADA?
  □ VR aponta para fora (centrífugo)?
  □ PIO aponta para cima (+Z)?
  □ Proporção ant:post = 1:3?
  □ Bowman e Descemet = linhas (não bandas)?
  □ Labels em português legíveis?
  □ Barra de escala presente?
  □ Background = #0D1117?
  □ Salvo em images/CH-00X/ com nome correto?
```

---

## 8. Regra dos 3 Erros

> Se uma imagem for regenerada **3 vezes** com IA sem obter o elemento biomecânico correto, é porque o problema é estrutural (viés de treinamento), não de prompt. Parar imediatamente e usar Python.

**Esta regra foi estabelecida empiricamente no projeto:**
- Triângulo com ápice correto: 3 tentativas → todas erradas → resolvido em Python na primeira vez

**Tempo médio de resolução:**
- IA: 3 tentativas × 2 min = 6 min + resultado errado
- Python: 1 script × 15 min = 15 min + resultado pixel-perfeito + reutilizável para sempre

**Após o script existir:** Adaptar = 5 min. A IA nunca chega a esse patamar de reutilização.

---

## 9. Scripts de Referência do Projeto

| Script | Tipo | Reutilizar Para |
|--------|------|----------------|
| `fem/plot_fig_4_4.py` | Corte transversal completo | Qualquer figura com camadas + anel |
| `fem/plot_fig_5_1.py` | Top-down fibras | Qualquer vista superior com vetores |
| `fem/plot_fig_5_2.py` | Anel semicircular + VT | VT nas extremidades, anel parcial |
| `fem/plot_fig_5_3.py` | Comparativo dual | Qualquer figura antes/depois |
| `icrs_geometria_precisa` | Funções reutilizáveis | `draw_icrs_triangular()`, `draw_corneal_layers()`, `verify_icrs_geometry()` |
