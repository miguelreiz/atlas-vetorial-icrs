# ATENÇÃO CLAUDE CODE: MISSÃO DE ILUSTRAÇÃO MÉDICA (SKILL 7)

Caro Engenheiro Especialista (Claude),

O usuário (nosso Cirurgião-Chefe) solicitou que VOCÊ assuma a geração de 4 figuras médicas críticas para o Atlas Vetorial ICRS. Como você tem capacidade superior de gerar gráficos precisos em Python (Matplotlib), preciso que você crie os scripts Python e salve as imagens.

**As regras de anatomia corneana foram estritamente atualizadas. Você DEVE LEIOS AS SKILLS:**
- `c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\.agents\skills\ophthalmic_engineering_visual\SKILL.md`
- `c:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\.agent\skills\icrs_vector_illustration\SKILL.md`

## 🚨 REGRAS DE OURO OBRIGATÓRIAS PARA TODAS AS IMAGENS:
1. **Profundidade Estrita:** O anel (ICRS) FICA EXATAMENTE A 80% DE PROFUNDIDADE no estroma (muito perto do endotélio).
2. **Proporção Realista:** O anel tem 200 µm de base e a córnea tem 580 µm de espessura. Não faça um anel gigante.
3. **NENHUM TENTING (Elevação):** A superfície anterior diretamente acima do anel **NÃO DEVE TER ELEVAÇÃO**. Ela deve apresentar **APLAINAMENTO** ou um **LEVE REBAIXAMENTO**. Isso ocorre porque o anel estica as fibras radiais que passam por cima dele, gerando o **Vetor Endotelial** (força para baixo, contra a PIO).

---

## 🖼️ AS 4 IMAGENS QUE VOCÊ PRECISA GERAR (Crie scripts Python `plot_fig_X.py` na pasta `fem` e salve em `.png`)

### 1. Figura 4.4 — Vetor Radial em Corte Transversal
**Arquivo:** `images/CH-004_Vetor_Radial/fig_4_4_vetor_radial_corte_pt.png`
- **Conteúdo:** Um corte transversal mostrando o limite esquemático do anel a 80% de profundidade.
- **Setas:** Vetores de força radiais vermelhos grandes puxando centrífugos (DO ANEL para fora e DO CENTRO em direção ao anel).
- **Superfície:** A superfície anterior da córnea central deve estar visivelmente mais **plana** pós-anel (tracejado para curvatura original, sólido para curva plana nova). Sobre o anel, rebaixamento plano, nada de morrinho para cima.

### 2. Figura 5.1 — O Mecanismo de Acoplamento na Malha de Colágeno
**Arquivo:** `images/CH-005_VT/Figura_Coupling_Collagen.png`
- **Conteúdo:** Representação de como puxar de um lado afrouxa o outro (Efeito Colchão de Água / Poisson).
- **Visual:** Vista superior (Top-Down). Mostrar as fibras radiais 🔴 sendo esticadas no meridiano do anel (K-steep) e as fibras tangenciais/cruzadas 🔵 no eixo 90° (K-flat) perdendo tensão e "abaulando" (encurvando).
- O meridiano do anel aplaina (setas puxando para fora), o meridiano a 90° encurva (setas relaxando para o centro).

### 3. Figura 5.2 — Dinâmica da Tração Tangencial no Estroma
**Arquivo:** `images/CH-005_VT/Figura_Tangential_Traction.png`
- **Conteúdo:** Vista top-down de um anel implantado num túnel semicircular.
- **Visual:** As duas "pontas" (edges) extremas do anel gerando fortes setas cianos (`#00B4DC`) tracionando a malha longitudinalmente (ao longo do meridiano circunférico). Mostrar que o corpo central do anel atua como âncora passiva, enquanto as extremidades causam todo o stress direcional (VT).

### 4. Figura 5.3 — Efeito do VT na Incisão Errada (O Astigmatismo Induzido)
**Arquivo:** `images/CH-005_VT/Figura_Efeito_Acoplamento.png` (Conforme solicitado para o 'SIA conflitante' e Efeito Nida)
- **Conteúdo:** O desastre biomecânico da incisão fora do eixo.
- **Visual:** Mostrar um eixo K-steep (linha tracejada). Mostrar a incisão feita em um ângulo errado (ex: 45° de erro). Mostrar os Vetores Tangenciais (setas ciano) forçando a tensão num eixo cruzado, criando um "novo" eixo curvo (cross-cylinder) que bagunça o astigmatismo original em vez de ajudar.

👉 **Por favor, gere os 4 scripts Python em `fem/` e execute-os para criar estas imagens no padrão do Atlas.** O cirurgião requisitou especificamente que você use suas habilidades matemáticas de plotagem para refinar a excelência visual gráfica desses conceitos biomecânicos.
