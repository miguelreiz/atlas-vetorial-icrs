# Capítulo 10 — Fluxo de Trabalho Clínico: Do Mapa ao Anel

> **Análise Vetorial Biomecânica Corneana para Planejamento de Segmento de Anel Intraestromal**
> *Parte III — Da Teoria à Prática Clínica*

---

## 10.1 Introdução

Os capítulos anteriores estabeleceram o arcabouço teórico: os três vetores biomecânicos (VR, VT, Vτ), sua extração de modelos de elementos finitos, sua dependência dos parâmetros do anel e o sistema de classificação integrado AVBC. O desafio agora é a tradução — converter este arcabouço em um fluxo de trabalho clínico reprodutível que um cirurgião de córnea possa aplicar em seu consultório.

Este capítulo apresenta o protocolo clínico AVBC como uma árvore de decisão sequencial. O fluxo de trabalho destila a avaliação trimodal (O, T, B) em uma série de etapas práticas, cada uma apoiada por critérios quantitativos e vinculada a instrumentos específicos de exame. Dois exemplos clínicos práticos ilustram o protocolo desde a avaliação inicial até a seleção do anel e a estimativa do resultado esperado.

O protocolo foi projetado para ser aditivo, e não disruptivo: ele adiciona o raciocínio biomecânico ao exame clínico existente em vez de substituí-lo. O cirurgião que já realiza a tomografia de Pentacam, a aberrometria de frente de onda e a refração clínica sob cicloplegia possui todos os dados necessários para a avaliação do AVBC. O arcabouço reorganiza e reinterpreta esses dados dentro de um contexto mecânico.

> [!NOTE]
> **Para o Clínico: Checklist Pré-Operatório AVBC**
> Antes de avançar para o bloco cirúrgico, confirme que tem todos os dados necessários:
> - `[ ]` Refração manifesta e sob cicloplegia (Esfera, Cil, Eixo)
> - `[ ]` Topografia de Scheimpflug (Pentacam/Galilei) com mapas anterior e posterior
> - `[ ]` ENM calculado (Elevação Posterior BFS 8 mm → meridiano de pico)
> - `[ ]` Aberrometria de frente de onda (Coma, HOA Total — pupila 6 mm)
> - `[ ]` Paquimetria local no meridiano de implante planeado (para RT_{max})
> - `[ ]` Classificação O (O+, O~, O−) documentada
> - `[ ]` Arquétipo Topográfico (Módulo T) documentado
> - `[ ]` Vetor Dominante selecionado (VR / VT / Vτ)
> - `[ ]` Prescrição final do anel (espessura, arco, meridiano, profundidade) verificada contra RT_{max}

---

![Figura 10.1 — Fluxo de trabalho clínico AVBC: do mapa topográfico ao anel.](book_figures/fig_10_01_fluxo_clinico_completo.svg)

## 10.2 Avaliação Pré-Operatória: A Sequência de Exames AVBC

### Etapa 1 — Exame Oftalmológico Padrão

Antes de qualquer avaliação biomecânica, a avaliação clínica padrão deve ser concluída:

- **Acuidade visual melhor corrigida (AVMC):** Snellen ou logMAR, com correção de óculos e com teste de lente de contato rígida. A diferença entre a AVMC com óculos e com lente de contato é um indicador aproximado da carga de astigmatismo irregular.
- **Refração sob cicloplegia e manifesta:** Esfera, cilindro, eixo. Esses dados alimentam o módulo Óptico.
- **Biomicroscopia em lâmpada de fenda:** Avaliar a transparência corneana, estrias de Vogt, anel de Fleischer, cicatrizes. Cicatrizes centrais significativas podem contraindicar o ICRS ou exigir ceratoplastia lamelar.
- **Paquimetria no local do túnel:** A espessura estromal mínima no raio de implantação planejado (tipicamente 5,0–6,0 mm do eixo visual) deve exceder 400 μm para acomodar o anel com segurança em uma profundidade de 70–80%. A espessura corneana local (CT) no meridiano exato planejado para a implantação deve ser registrada para calcular a espessura máxima segura do anel (RT_{max}) sob a **Lei das Espessuras**.
- **Pressão intraocular:** Tonometria de Goldmann ou de contorno dinâmico. Os valores da PIO informam a condição de carregamento do FEM (15 mmHg é a suposição de modelagem padrão; desvios significativos exigem ajuste do modelo).

### Etapa 2 — Tomografia Corneana (Entrada do Módulo T)

A tomografia de Scheimpflug (Pentacam, Galilei ou equivalente) fornece o mapa espacial da ectasia:

- **Mapa de curvatura sagital:** Identificar o padrão topográfico — oval central, mamilo (nipple) inferior, crescente paracentral, formato D periférico ou globus.
- **Mapa de elevação posterior:** Calcular o ENM (Eixo Neutro Mecânico) — o meridiano de elevação posterior máxima em relação à esfera de melhor ajuste. Registrar o ângulo do ENM (°) e comparar com o eixo K-steep.
- **Localização e valor do ponto mais fino:** O ponto paquimétrico mais fino frequentemente se correlaciona com o ápice do cone. Registrar sua distância do eixo visual (mm) e o meridiano.
- **Valores de KMax e K-steep:** Registrar para comparação com o nomograma e estimativa do VR.

**Protocolo de determinação do ENM:**

1. Abra o mapa de elevação posterior (tela refrativa de 4 mapas).
2. Selecione a esfera de melhor ajuste (BFS) com um diâmetro de 8,0 mm.
3. Identifique o meridiano que passa pelo ponto de elevação posterior máxima.
4. Registre este meridiano como o ENM.
5. Compare com o eixo K-steep: se |ENM − K-steep| > 15°, a avaliação do AVBC é indicada; se > 45°, o planejamento por nomogramas não é confiável.

### Etapa 3 — Aberrometria de Frente de Onda (Entrada do Módulo O)

A análise de frente de onda fornece o contexto óptico:

- **RMS de Coma (pupila de 6 mm):** A aberração de alta ordem primária no ceratocone. Valores < 2,50 μm são favoráveis; > 3.50 μm são desfavoráveis para melhoria funcional apenas com ICRS.
- **RMS de HOA Total (pupila de 6 mm):** Valores < 2,0 μm são favoráveis; > 4,0 μm sugerem que a correção geométrica isolada pode não restaurar uma óptica útil.
- **Alinhamento de eixos:** Comparar o eixo do cilindro refrativo com o eixo topográfico íngreme. Divergência > 30° sugere que o perfil de aberração é complexo e pode não responder ao posicionamento padrão do anel.
- **Vetor de coma versus ápice do cone:** Determinar se o vetor de coma é ipsilateral (favorável) ou contralateral (desfavorável) ao ápice do cone.

### Etapa 4 — Avaliação Biomecânica (Entrada do Módulo B)

Se disponíveis, medições biomecânicas diretas refinam a avaliação:

- **Corvis ST:** Amplitude de deformação, parâmetro de rigidez (SP-A1), CBI. Estes fornecem confirmação qualitativa do comprometimento biomecânico.
- **ORA:** CH e CRF. Valores reduzidos apoiam o modelo biomecânico da doença.
- **Microscopia de Brillouin (se disponível):** O mapeamento de rigidez regional fornece a avaliação mais direta da variação das propriedades do material.

Na ausência de medições biomecânicas diretas — que continuam a ser a realidade clínica na maioria dos centros —, o arcabouço AVBC utiliza substitutos (surrogates) topográficos e tomográficos: a distribuição paquimétrica, o padrão de elevação posterior e a divergência do ENM servem como indicadores indiretos do estado biomecânico.

---

## 10.3 Classificação do Módulo O

Aplicar os critérios ópticos do Capítulo 4:

| Critério | Favorável | Intermediário | Desfavorável |
|---|---|---|---|
| RMS de Coma (6 mm) | < 2,50 μm | 2,50–3,50 μm | > 3,50 μm |
| Δ Eixo (refração vs K) | < 15° | 15°–30° | > 30° |
| RMS de HOA total | < 2,0 μm | 2,0–4,0 μm | > 4,0 μm |
| Coma vs ápice | Ipsilateral | Ambíguo | Contralateral |

**Regra de classificação:**
- **O+** (≥ 3 favoráveis): Prosseguir com o ICRS; esperar melhoria tanto topográfica quanto funcional.
- **O~** (misto): Prosseguir, mas aconselhar o paciente que a melhoria funcional pode ser parcial; considerar correção adjuvante.
- **O−** (≥ 3 desfavoráveis): O ICRS ainda pode ser implantado para manejo topográfico, mas alinhar as expectativas adequadamente. Considerar que o objetivo principal pode ser facilitar a adaptação de lentes de contato em vez de independência de óculos.

---

## 10.4 Classificação do Módulo T

Determinar a morfologia topográfica e o ENM:

| Morfologia | ENM Típico | Estratégia de Posicionamento do Anel |
|---|---|---|
| Oval central | Próximo ao eixo visual | Anel simétrico, centrado |
| Mamilo inferior | 6 horas | Segmento inferior, mais espesso inferiormente |
| Crescente paracentral | Variável, descentrado | Segmento único ou par assimétrico, direcionado ao cone |
| Formato D periférico | Periférico, > 2 mm do eixo | Arco amplo ou dois segmentos |
| Globus (KMax > 60 D) | — | **Estabilização estrutural / tolerância a LC (até 85 D)** |

Registrar a divergência do ENM: |ENM − K-steep|.

---

## 10.5 Módulo B: Seleção do Vetor

Com base na necessidade clínica identificada através dos Módulos O e T, determinar o vetor dominante:

**Árvore de decisão:**

1. **A necessidade primária é o aplanamento (K-steep elevado, astigmatismo alinhado)?**
 → **VR dominante** → Aumentar a **espessura** do anel (300–400 μm). Comprimento de arco secundário.

2. **A necessidade primária é a regularização do astigmatismo (Cil irregular elevado, ENM ≠ K-steep)?**
 → **VT dominante** → Aumentar o **comprimento de arco** (160°–320°). Espessura secundária.

3. **A necessidade primária é o reposicionamento do ápice (ápice > 1 mm do eixo visual, coma elevado)?**
 → **Vτ dominante** → Usar **anel assimétrico** (perfil de espessura progressiva), orientado ao longo do ENM.

4. **A necessidade primária é a estabilização (ectasia progressiva)?**
 → **VR + VT combinados** → Realizar **CXL primeiro** (intervalo de 3 a 6 meses), depois o ICRS.

5. **Múltiplas necessidades?**
 → Priorizar pela urgência clínica. Tipicamente: estabilizar primeiro, depois regularizar, depois aplanar.

> [!TIP]
> **Para o Clínico: Regra dos 3 Vetores em 3 Perguntas**
> Antes de abrir o catálogo de anéis, responda a estas 3 perguntas em sequência:
> 1. **"O meu doente precisa principalmente de baixar a miopia?"** → VR → Espessura.
> 2. **"O meu doente precisa principalmente de eliminar o astigmatismo irregular?"** → VT → Arco Longo.
> 3. **"O meu doente precisa principalmente de centrar o cone deslocado?"** → Vτ → Anel Progressivo.
>
> A maioria dos doentes tem mais do que uma necessidade. Priorize o vetor dominante e ajuste os outros como moduladores secundários.

---

## 10.6 Prescrição do Anel

Com o vetor dominante identificado, traduzir para os parâmetros do anel:

### Prescrição VR-Dominante

| Parâmetro | Valor | Racional |
|---|---|---|
| Espessura | 250–400 μm (proporcional ao ΔK desejado) | VR escala com o volume; **estritamente sujeito a RT_{max} \le CT \times 0,60** |
| Comprimento de arco | 120°–160° (padrão) | Comprimento de arco não modula o VR |
| Perfil | Simétrico | Sem necessidade de torque |
| Profundidade | 70–80% da paquimetria | Amplifica o VR |
| Meridiano | Eixo K-steep | Quando ENM ≈ K-steep |

**Efeito VR esperado:** Nossos modelos de FEM mostram um VR central de 19,2–19,9 μm para arcos parciais com geometria padrão. Tradução clínica: ΔK ≈ 2–4 D, dependendo da espessura e da biomecânica específica do paciente.

### Prescrição VT-Dominante

| Parâmetro | Valor | Racional |
|---|---|---|
| Espessura | 150–250 μm (moderada) | VR é secundário; **estritamente sujeito a RT_{max} \le CT \times 0,60** |
| Comprimento de arco | 210°–320° (arco longo) | Equação do VT: cada grau reduz σ_θθ em 0,0018 kPa |
| Perfil | Simétrico | Exceto se Vτ também for necessário |
| Profundidade | 70–75% da paquimetria | Profundidade moderada é suficiente |
| Meridiano | Eixo do ENM | Direcionado para a zona de deformação biomecânica máxima |

**Efeito VT esperado:** VT(210°) = 7,39 kPa; VT(320°) = 7,20 kPa. Arcos mais longos produzem mais regularização, seguindo a relação linear VT(arco°) = −0,0018 × arco° + 7,79.

### Prescrição Vτ-Dominante

| Parâmetro | Valor | Racional |
|---|---|---|
| Perfil de espessura | Progressivo (ex: 300→150 μm) | Gera binário de forças assimétrico; **espessura máxima estritamente sujeita a RT_{max} \le CT \times 0,60** |
| Comprimento de arco | 160°–210° | Suficiente para a geração de torque |
| Perfil | Assimétrico (progressivo) | Essencial para Vτ |
| Profundidade | 70–80% da paquimetria | Amplifica o torque |
| Meridiano | Eixo do ENM | A direção do Vτ deve direcionar o ápice em direção ao eixo visual |

**Regra de orientação:** A extremidade mais espessa do anel progressivo é colocada *oposta* à direção desejada de migração do ápice. O ápice migra em direção à extremidade mais fina porque o binário de forças gerado pela espessura assimétrica cria um momento fletor que direciona o deslocamento em direção à região de menor restrição.

> [!CAUTION]
> **Para o Clínico: Não Inverta o Anel Progressivo!**
> Num anel de espessura progressiva (ex: 300→150 µm), a extremidade grossa deve ser colocada do **mesmo lado do cone** (não ao lado oposto!). O gradiente de volume empurra o cone **para longe do segmento mais espesso**. Portanto:
> - Cone inferior → extremidade grossa inferiormente → cone migra para cima (centraliza).
> - Se inverter acidentalmente o anel, o cone será deslocado ainda mais para baixo! Verificar sempre a orientação com o microscópio antes de fechar o túnel.

### 10.6.4 A Lei das Espessuras Relativas (Lei das Espessuras)

Para prevenir o colapso da ponte estromal, melting (fusão estromal), necrose mecânica localizada ou extrusão induzida por pressão, o protocolo AVBC implementa uma lei de segurança estrita validada por 60 simulações de elementos finitos de alta fidelidade. A **Lei das Espessuras Relativas (Lei das Espessuras)** dita que a espessura máxima segura do anel (RT_{max}) é estritamente limitada pela espessura corneana local (CT) no meridiano exato do plano de implantação:

RT_{max} \le CT \times 0,60

Esta regra de proporcionalidade garante que um mínimo de 40% da espessura corneana local seja preservado como uma ponte estromal de suporte de carga sobre o implante. O limite de segurança varia ligeiramente com base no perfil geométrico específico do segmento:

1. **Perfis Triangulares (Ferrara / Mediphacos):** Seguem estritamente o limite padrão de **0,60** (RT_{max} \le CT \times 0,60).
2. **Perfis Ferrara de Alta Miopia (HM):** Limitados a um limite conservador de **0,55** (RT_{max} \le CT \times 0,55) devido às altas concentrações de tensão (stress) apical vertical e bordas geométricas afiadas que aumentam o risco de erosão estromal.
3. **Perfis Arredondados (Cornealring):** Seguem o limite padrão de **0,60** (RT_{max} \le CT \times 0,60). A mecânica de contato mais suave e a distribuição uniforme de tensão das geometrias arredondadas proporcionam excelentes margens de segurança mesmo no limite superior da regra de proporcionalidade.

Antes de finalizar qualquer prescrição de anel, o cirurgião deve calcular a RT_{max} utilizando a paquimetria local no meridiano de implantação. Se a espessura planejada exceder a RT_{max}, a prescrição deve ser reduzida para a espessura de segmento disponível imediatamente abaixo do limite de segurança.

---

## 10.7 Exemplos Clínicos Práticos

### Exemplo 1: Ceratocone Simétrico Central — VR Dominante

**Paciente:** Homem de 28 anos. K-steep 49,5 D, K-flat 45,0 D, cilindro de 4,5 D a 85°. KMax 51,0 D (central). Paquimetria mais fina de 462 μm centralmente. AVMC de 20/40 com óculos.

**Módulo O:** RMS de Coma = 1,8 μm (favorável), Δ Eixo = 8° (favorável), HOA total = 1,6 μm (favorável), Coma ipsilateral (favorável). → **O+**

**Módulo T:** Morfologia oval central. ENM a 88°, K-steep a 85°. |ENM − K-steep| = 3° < 15°. → Posicionamento padrão, ENM ≈ K-steep.

**Módulo B:** A necessidade primária é o aplanamento (K-steep 49,5 D, astigmatismo alinhado). → **VR dominante**

**Prescribção:**
- Anel: Ferrara 250 μm, arco 160°, simétrico
- Profundidade: 75% de 462 μm = 347 μm → túnel a 350 μm
- Meridiano: 85° (K-steep ≈ ENM)
- ΔK esperado: 2,5–3,5 D (estimativa baseada em VR)

### Exemplo 2: Ceratocone Paracentral com Divergência de Eixo — VT + Vτ Dominante

**Paciente:** Mulher de 32 anos. K-steep 52,0 D, K-flat 46,0 D, cilindro de 6,0 D a 65°. KMax 55,0 D (1,5 mm inferior-temporal do eixo visual). Paquimetria mais fina de 435 μm. AVMC de 20/60.

**Módulo O:** RMS de Coma = 3,2 μm (intermediário), Δ Eixo = 25° (intermediário), HOA total = 3,5 μm (intermediário), Coma contralateral (desfavorável). → **O~**

**Módulo T:** Morfologia de crescente paracentral. ENM a 250°, K-steep a 65° (diferença de eixo de 5° em relação a 245°, mas o ENM está a 250° — divergência com K-steep = |250° − 245°| = 5°, mas o ENM é medido como o meridiano de elevação posterior máxima que neste caso está a 250° enquanto o eixo K-steep está a 65°/245°). |ENM − K-steep| = 5°. → Direcionado ao cone inferior-temporal.

**Módulo B:** A necessidade primária é a regularização (cilindro irregular elevado, ápice deslocado). Necessidade secundária: reposicionamento do ápice (ápice a 1,5 mm do eixo visual, coma de 3,2 μm). → **VT + Vτ dominante**

**Prescrição:**
- Anel: Progressivo assimétrico, 250→150 μm, arco 210°
- Profundidade: 75% de 435 μm = 326 μm → túnel a 325 μm
- Meridiano: Eixo do ENM (250°), extremidade mais espessa superiormente
- Efeito esperado: Regularização do astigmatismo (VT a 210° = 7,39 kPa, −5,0% em relação à linha de base) + deslocamento moderado do ápice (Vτ validado = 11,76 μ\text{N}\cdot\text{m})
- Orientar a paciente: Classificação O~ → melhoria funcional incerta; a adaptação de lente de contato ainda pode ser necessária

---

## 10.8 Avaliação Pós-Operatória: O Ciclo de Feedback AVBC

### Pós-Operatório Imediato (Dia 1 – Semana 1)

- Confirmar a posição e a profundidade do anel (lâmpada de fenda, OCT de segmento anterior)
- Avaliar eventos adversos (extrusão, infecção, perfuração)
- Sem avaliação topográfica (córnea edemaciada, não confiável)

### Avaliação Precoce (1 Mês)

- Acuidade visual sem e com melhor correção
- Topografia: avaliar o aplanamento (ΔK = K-steep_pré − K-steep_pós)
- Comparação inicial: ΔK_observado vs ΔK_esperado (a partir da estimativa de VR)

### Avaliação Definitiva (3–6 Meses)

Análise completa do feedback AVBC:

1. **Avaliação do VR:** ΔK_induzido = K-steep_pré − K-steep_pós. Comparar com VR_previsto.
 - **AVBC-CI (aplanamento)** = ΔK_induzido / ΔK_previsto
 - CI = 1,0 ± 0,1 → ideal
 - CI < 0,8 → subcorreção (considerar maior espessura na próxima vez)
 - CI > 1,2 → supercorreção (reduzir a espessura na próxima vez)

2. **Avaliação do VT:** ΔCyl_induzido = Cyl_pré − Cyl_pós (componente de regularização).
 - **VT-ratio** = ΔCyl_induzido / ΔCyl_esperado
 - Avaliar a melhora das HOAs, particularmente coma e trefoil

3. **Avaliação do Vτ (se usado anel assimétrico):** Medir a migração do ápice no mapa de elevação posterior.
 - **Vτ-ratio** = Migração_do_ápice_observada / Migração_do_ápice_esperada
 - Migração positiva em direção ao eixo visual → torque eficaz

### Construção da Curva de Calibração Pessoal

Ao longo de N cirurgias, o cirurgião acumula valores pessoais de AVBC-CI. O CI médio representa o fator de calibração pessoal do cirurgião, análogo à constante A no cálculo de LIO. Se o CI médio for consistentemente 0,85 (subcorreção sistemática), o cirurgião pode ajustar as previsões futuras dividindo-as por 0,85 — uma melhoria sistemática na precisão a cada caso adicional.

Este ciclo de feedback específico do cirurgião é um paralelo estrutural direto ao método de Alpins e representa um dos aspectos de maior valor prático do arcabouço AVBC.

> [!NOTE]
> **Para o Clínico: O Diário AVBC — 5 Minutos por Caso**
> Após cada cirurgia, registe numa folha de cálculo simples:
> | Data | Caso | Espessura | Arco | VR Previsto | VR Real (ΔK pós) | CI_R |
> |------|------|-----------|------|-------------|------------------|------|
>
> Ao fim de 20 casos, calcule o seu CI_R médio. Esse é o seu "fator pessoal" AVBC. Se for 0.85, multiplique sempre as espessuras recomendadas por 1.18. Simples, mas poderoso.

---

## 10.9 Resumo

- O fluxo de trabalho clínico do AVBC é uma **avaliação sequencial em três módulos** (O → T → B) que traduz a compreensão biomecânica na seleção do anel.
- O protocolo é **aditivo**: utiliza dados clínicos existentes (topografia, aberrometria, refração) reorganizados dentro de um arcabouço mecânico.
- O **ENM** (Eixo Neutro Mecânico) é um parâmetro crítico que deve ser avaliado para cada paciente com ceratocone — quando o ENM diverge do K-steep por > 15°, a precisão do nomograma degrada.
- Os parâmetros do anel se mapeiam para vetores específicos: **espessura → VR**, **comprimento de arco → VT**, **assimetria → Vτ**, **profundidade → amplificador universal**.
- A avaliação pós-operatória usando o **ciclo de feedback do AVBC** (AVBC-CI, VT-ratio, Vτ-ratio) permite uma calibração específica do cirurgião análoga ao índice de correção de Alpins.
- Com o tempo, cada cirurgião constrói uma **curva de calibração pessoal** que melhora sistematicamente a precisão preditiva.

---

## Referências

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. A new method of analyzing vectors for changes in astigmatism. *J Cataract Refract Surg*. 1993;19(4):524–533.
3. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
4. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
5. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
6. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
7. Kling S, Marcos S. Finite-element modeling of intracorneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
8. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
9. Rabinowitz YS. Keratoconus. *Surv Ophthalmol*. 1998;42(4):297–319.
10. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
11. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
