# Capítulo 9 — A Classificação Integrada AVBC

> **Análise Vetorial Biomecânica Corneana para Planejamento de Segmento de Anel Intraestromal**
> *Parte IV — Classificação e Aplicação Clínica*

---

## 9.1 Introdução: Por Que a Classificação Importa

Quando um cirurgião experiente em ceratocone se depara com um conjunto de dados topográficos, tomográficos e aberrométricos, o processo de tomada de decisão ocorre de forma implícita: o reconhecimento de padrões, ponderado por anos de experiência clínica, converge para uma configuração de anel que "parece correta". Este processo intuitivo, embora frequentemente eficaz, não é reprodutível nem transferível. Dois cirurgiões igualmente experientes que examinam o mesmo conjunto de dados podem chegar a configurações diferentes — não porque um esteja errado e o outro certo, mas porque cada cirurgião aplica ponderações internas diferentes aos dados disponíveis, e nenhum deles consegue articular o algoritmo preciso pelo qual a decisão foi tomada.

O sistema de classificação AVBC aborda essa opacidade decompondo a avaliação clínica em três módulos explícitos e sequenciais, cada um com entradas definidas, critérios quantitativos e saídas categóricas. Os módulos são:

- **Módulo O (Avaliação de Coerência Óptica):** Determina se o perfil de aberração de frente de onda é passível do tipo de correção que um ICRS pode proporcionar. Saída: O+, O~ ou O−.
- **Módulo T (Morfologia Topográfica):** Localiza a ectasia espacialmente e identifica o Eixo Neutro Mecânico (ENM). Saída: arquétipo morfológico e azimute do ENM.
- **Módulo B (Seleção do Mecanismo Biomecânico):** Identifica o vetor biomecânico dominante com base na necessidade clínica e o mapeia para parâmetros específicos do anel. Saída: prescrição do anel (espessura, comprimento de arco, profundidade, meridiano, perfil de simetria).

A classificação foi projetada para ser transparente: cada etapa pode ser auditada, cada critério é quantitativo e cada recomendação pode ser rastreada até uma justificativa biomecânica específica apoiada pelas evidências de elementos finitos apresentadas nos Capítulos 6, 7 e 8. Essa transparência é o que distingue um *sistema de classificação* de um *nomograma*: o sistema de classificação explica o porquê de recomendar o que recomenda.

> [!IMPORTANT]
> **Para o Clínico: A Diferença entre Nomograma e AVBC**
> Um nomograma é uma caixa preta: entra K-max, sai "anel 250 µm". Você não sabe *porquê*.
> O AVBC é transparente: avalia primeiro se o doente é candidato ótico (Módulo O), depois mapeia a ectasia no espaço (Módulo T), e só então prescreve a biomecânica (Módulo B). Em cada passo, existe uma justificativa mensurável que você pode debater e melhorar com a experiência.

---

## 9.2 Módulo O — Avaliação de Coerência Óptica

### Racional

Antes de qualquer análise biomecânica ser realizada, o clínico deve responder a uma pergunta fundamental: a visão deste paciente melhorará se a topografia corneana melhorar? Esta pergunta pode parecer trivialmente óbvia, mas não é. Uma proporção substancial de pacientes com ceratocone apresenta aberrações ópticas que estão além do alcance corretivo apenas da modificação da curvatura. O ICRS remodela a superfície corneana anterior — aplana meridianos íngremes, redistribui a tensão tangencial (hoop stress) e pode migrar o ápice do cone. O que ele não pode fazer é eliminar a irregularidade corneana posterior, compensar aberrações lenticulares, corrigir trevo (trefoil) ou quadrefólio (quadrafoil) irregulares, ou reparar cicatrizes estromais. Quando esses fatores não tratáveis dominam a degradação óptica, o ICRS melhorará o mapa topográfico sem melhorar a visão funcional do paciente — a bem documentada dissociação "o mapa melhora, mas a visão não".

Para preencher essa lacuna clínica crítica, o Módulo O funciona como um guardião (gatekeeper). Ao implementar o **Índice de Coerência Axial (ICE)** como o principal parâmetro de seleção para elegibilidade óptica, unificamos o alinhamento angular do meridiano topográfico íngreme (θ_topo) e o eixo comático (θ_coma) em um único biomarcador funcional:

ICE_min = |θ_topo - θ_coma|

Este parâmetro foi validado em uma coorte multidomínio de N = 1.139 olhos (incluindo N = 300 implantes de ICRS; Reis & Sandes, 2026, presente volume) como um preditor altamente superior de resultados visuais em comparação com os índices tomográficos brutos tradicionais, como o K_{max} e a paquimetria local.

Pacientes classificados como O+ prosseguem com alta confiança de que o ICRS proporcionará melhorias tanto topográficas quanto funcionais. Pacientes classificados como O~ prosseguem com expectativas cautelosas. Pacientes classificados como O− são aconselhados de que o valor primário do ICRS pode ser o manejo topográfico (facilitando a adaptação de lentes de contato, interrompendo a progressão quando combinado com CXL) em vez da reabilitação visual.

### Critérios de Avaliação

Cinco parâmetros de frente de onda e coerência medidos em uma pupila de 6 mm fornecem a entrada do Módulo O:

| Critério | Favorável (O+) | Intermediário (O~) | Desfavorável (O−) | Fonte |
|---|:---:|:---:|:---:|---|
| **ICE_min** | < 15° (ICE Alto) | 15°–45° (ICE Moderado) | > 45° (ICE Baixo) | Reis & Sandes, 2026 |
| RMS de Coma | < 2,50 μm | 2,50–3,50 μm | > 3,50 μm | Alió & Shabayek, 2006 |
| Δ Eixo (refração vs K-steep) | < 15° | 15°–30° | > 30° | Rabinowitz, 1999 |
| RMS de HOA Total | < 2,0 μm | 2,0–4,0 μm | > 4,0 μm | Maeda et al., 2002 |
| Coma vs ápice do cone | Ipsilateral | Ambíguo | Contralateral | Piñero, 2014 |

**Índice de Coerência Axial (ICE_min).** O ICE_min avalia o alinhamento angular dos eixos primários de assimetria estrutural e óptica da córnea. Um ICE_min < 15° (ICE Alto) significa eixos estruturais e ópticos altamente alinhados, permitindo que a regularização da curvatura induzida pelo ICRS se traduza diretamente em uma recuperação visual substancial. Inversamente, um ICE_min > 45° (ICE Baixo) indica um desacoplamento dos parâmetros estruturais e ópticos, sugerindo que qualquer redistribuição geométrica do estroma provavelmente induzirá aberrações irregulares secundárias em vez de restaurar a visão funcional. Como descrito no Capítulo 4, o limite de ICE_min < 28° representa o limiar de triagem ideal para prever \ge 3 linhas de Snellen de melhora (ROC AUC: 0,82, Sensibilidade: 78%, Especificidade: 84%, estatisticamente superior ao K_{max} [AUC 0,68] e paquimetria [AUC 0,64], teste de DeLong p = 0,012).

![Figura 9.2 — Curvas ROC: ICE_min vs K_max vs paquimetria como discriminadores.](book_figures/fig_09_02_ice_roc.svg)

**RMS de Coma** é o parâmetro óptico clássico mais informativo para a elegibilidade ao ICRS. O coma vertical (Z_3^{-1}) é a aberração de alta ordem assinatura do ceratocone inferior e a aberração mais efetivamente reduzida pela redistribuição de curvatura induzida pelo anel. Valores abaixo de 2,50 μm indicam que a carga de aberração está dentro da faixa corretiva de uma configuração padrão de ICRS; valores acima de 3,50 μm sugerem que o cone está tão avançado que a irregularidade residual após a inserção do anel permanecerá acima do limiar de significância funcional.

**Discordância de eixo** captura o grau de contribuição astigmática interna (não corneana). Quando o eixo do cilindro refrativo manifesto diverge do meridiano ceratométrico íngreme por mais de 30°, uma fração substancial do cilindro decorre de fontes lenticulares ou outras fontes intraoculares que o ICRS não pode tratar. O resultado refrativo pós-operatório torna-se imprevisível porque o anel corrige apenas o componente corneano de um astigmatismo que possui contribuições não corneanas significativas.

**RMS de HOA Total** serve como uma métrica de aberração global. Quando as aberrações totais de alta ordem excedem 4,0 μm, a superfície corneana está tão irregular que a correção predominantemente de baixa ordem fornecida por um ICRS deixa um grande resíduo aberrométrico. Tais olhos podem ser melhor tratados com lentes de contato rígidas gás-permeáveis ou esclerais, que contornam inteiramente a superfície anterior irregular.

### Lógica de Classificação

A classificação composta segue uma regra conservadora do pior critério:

- **O+ (Favorável):** Todos os cinco critérios na coluna Favorável, ou \ge 4 de 5 favoráveis com nenhum desfavorável. Prosseguir com alta confiança.
- **O~ (Intermediário):** Resultados mistos — pelo menos um critério na faixa Intermediária, nenhum na coluna Desfavorável. Prosseguir com expectativas cautelosas; aconselhar o paciente sobre a possibilidade de necessidade de correção adjuvante.
- **O− (Desfavorável):** Qualquer critério na coluna Desfavorável, ou \ge 3 de 5 desfavoráveis. O ICRS ainda pode ser implantado para manejo topográfico, mas as expectativas funcionais devem ser ajustadas adequadamente. O objetivo principal pode ser facilitar a adaptação de lentes de contato em vez da independência de óculos.

Uma clarificação clínica importante: **O− não significa “não opere.”** Significa que o modelo mental de sucesso do cirurgião deve mudar de “o paciente enxergará melhor” para “a forma corneana melhorará, o que pode viabilizar outras estratégias corretivas”. Essa distinção sutil é precisamente o tipo de alinhamento de expectativas estruturado que um sistema de classificação pode fornecer, mas um nomograma não.

> [!WARNING]
> **Para o Clínico: Quando Parar Antes da Cirurgia**
> Se o doente tem ICE Baixo (ICE_min > 45\circ) E RMS HOA Total > 4,0 µm: **não proceda sem conversa aprofundada**. Os dados de N=300 implantes (Reis & Sandes, 2026, presente volume) mostram que estes doentes têm apenas 1.6 linhas de Snellen de ganho médio (vs. 4.2 no grupo O+). O anel pode ser indicado para tolerabilidade de lente de contato, mas nunca como promessa de visão funcional.

---

## 9.3 Módulo T — Morfologia Topográfica e o ENM

### Arquétipos Morfológicos

A tomografia corneana fornece as informações espaciais necessárias para determinar onde o processo ectático está centrado e como ele se estende. O Módulo T classifica o padrão ectático em um de cinco arquétipos morfológicos:

| Morfologia | Descrição | Localização Típica do Cone | Estratégia de Posicionamento do Anel |
|---|---|:---:|---|
| **Oval central** | Gravata borboleta simétrica, centrada a menos de 1 mm do eixo visual | Central | Anel simétrico, qualquer meridiano |
| **Mamilo inferior (nipple)** | Cone pequeno e íngreme (< 3 mm de diâmetro), inferior | Inferior (5-7 horas) | Segmento inferior único ou par assimétrico |
| **Crescente paracentral** | Aplanamento em forma de arco, tipicamente inferotemporal a inferonasal | Deslocado paracentralmente | Direcionado ao cone, comprimento de arco correspondente |
| **Formato D periférico** | Ectasia ampla, de baixo gradiente em direção ao limbo | Periférico (> 2 mm do eixo) | Arco amplo ou dois segmentos |
| **Globus (KMax > 60 D)** | Ectasia quase total, sem ápice discernível | Global | **Estabilização estrutural / tolerância a LC** |

Os primeiros quatro arquétipos procedem para o Módulo B. Para o arquétipo Globus (onde o KMax excede 60 D e pode atingir até 85 D em córneas ectáticas extremas), o objetivo principal do ICRS muda de otimização óptica para estabilização estrutural e restauração da tolerância a lentes de contato. Embora alguns desses casos extremos possam eventualmente exigir ceratoplastia lamelar anterior profunda (DALK), a evidência clínica demonstra que o ICRS ainda pode proporcionar aplanamento e reforço mecânico significativos, prevenindo ou retardando o transplante. Crucialmente, a não convergência de nossos modelos de elementos finitos personalizados de pacientes (pacientes P5 e P9, com KMax > 53 D) sob o modelo de material HGO padrão do FEBio deve ser interpretada como uma **limitação numérica e computacional** (devido à distorção severa dos elementos sob curvaturas extremas, gradientes de deformação localizados e instabilidades de contato da malha em deformações extremas), e não como uma contraindicação física ou biológica. Na prática clínica, essas córneas extremas frequentemente experimentam remodelamento estrutural e aplanamento significativos pós-ICRS.

### O ENM — Eixo Neutro Mecânico

Um dos conceitos mais clinicamente aplicáveis introduzidos pelo arcabouço AVBC é o Eixo Neutro Mecânico (ENM). O ENM é definido como o meridiano de máximo deslocamento estromal posterior sob pressão intraocular fisiológica. Ele representa o eixo ao longo do qual a deformação biomecânica acumulada é maior — a direção na qual a córnea está "encurvando" (buckling).

Na prática convencional, o meridiano ceratométrico íngreme (K-steep) serve como o eixo de referência para o posicionamento do anel. A suposição implícita é que a curvatura mais íngreme coincide com a deformação máxima. Essa suposição é frequentemente incorreta. A análise dos modelos FEM personalizados dos pacientes revela que o K-steep e o ENM divergem em aproximadamente 40% dos casos:

| Relação ENM–K-steep | Frequência | Significância Clínica |
|:---:|:---:|:---:|
| Concordante (< 15°) | ~60% | Caso padrão — nomogramas adequados |
| Moderadamente divergente (15°–45°) | ~30% | Nomograma pode ter desempenho inferior; AVBC recomendado |
| Severamente divergente (> 45°) | ~10% | Nomograma não confiável; AVBC essencial |

A origem dessa divergência reside na distinção entre curvatura de superfície (que o K-steep mede) e deformação volumétrica (que o ENM captura). Uma córnea com paquimetria assimétrica — mais fina nasalmente do que temporalmente, por exemplo — exibirá deslocamento posterior máximo ao longo de um meridiano que está rotacionado em relação ao pico de curvatura anterior, porque a região mais fina se deforma preferencialmente sob a carga da PIO. O eixo K-steep captura a consequência óptica da deformação; o ENM captura sua origem mecânica. Quando esses dois eixos divergem, o posicionamento do anel ao longo do K-steep trata o sintoma em vez da causa.

**Protocolo de medição clínica para o ENM:**
1. Obtenha o mapa de elevação posterior a partir da tomografia de Scheimpflug (Pentacam, Galilei ou equivalente).
2. Exiba o mapa de diferença da esfera de melhor ajuste (BFS) com diâmetro de 8,0 mm.
3. Identify o meridiano que passa pelo ponto de elevação posterior máxima.
4. Registre este meridiano como o ENM.
5. Calcule a divergência do ENM: |ENM − K-steep|.
6. Se a divergência for > 15°, o protocolo AVBC recomenda o posicionamento do anel referenciado ao ENM, e não ao K-steep.

> [!TIP]
> **Para o Clínico: O Protocolo Prático do ENM em 30 Segundos**
> 1. Abra o Pentacam → Mapa de Elevação Posterior → Diferencial BFS 8 mm.
> 2. Encontre o ponto mais vermelho (elevação posterior máxima).
> 3. Trace o meridiano que passa por esse ponto → esse é o ENM.
> 4. Compare com o K-steep do mapa anterior.
> 5. Se a diferença é > 15° → **implante alinhado ao ENM, não ao K-steep**.
>
> Em ~40% dos doentes, este passo vai mudar o seu plano cirúrgico.

---

![Figura 9.1 — Árvore de decisão completa AVBC: do exame à prescrição.](book_figures/fig_09_01_arvore_decisao_avbc.svg)

## 9.4 Módulo B — Seleção do Vetor Biomecânico

### Os Três Vetores e Seus Correlatos Clínicos

O Módulo B traduz a necessidade clínica identificada através dos Módulos O e T em uma prescrição biomecânica específica. A tradução é mediada pelos três vetores AVBC, cada um dos quais é modulado por um parâmetro de anel distinto, conforme estabelecido pelas 34 simulações do FEBio (compreendendo 28 execuções simétricas e 6 execuções assimétricas de espessura progressiva) descritas no Capítulo 12:

| Vetor | Grandeza Física | Faixa no FEM | Correlato Clínico | Controlador Principal |
|:---:|:---:|:---:|:---:|:---:|
| **VR** | Deslocamento radial Δuᵣ | 8,9–19,9 μm | ΔK (aplanamento) | **Espessura** do anel |
| **VT** | Tensão tangencial Δσ_θθ | 7,20–7,78 kPa | ΔCyl (regularização) | **Comprimento de arco** |
| **Vτ** | Proxy de torque | 0 (anéis simétricos) | Reposicionamento do ápice | **Assimetria** |

As principais descobertas que apoiam esse mapeamento são:

1. **O VR é insensível ao comprimento de arco.** Em arcos parciais de 90° a 320°, o VR variou menos de 4% (19,2–19,9 μm). Isso significa que o cirurgião pode ajustar o comprimento de arco sem afetar o aplanamento.

2. **O VT é monotonicamente dependente do comprimento de arco.** A relação empírica VT(arco°) = −0,0018 × arco° + 7,79 (R² = 0,94) fornece uma alavanca de controle contínua e previsível para a regularização do astigmatismo.

3. **Vτ = 0 para todas as configurações simétricas.** Isso valida que anéis simétricos não podem induzir o reposicionamento do ápice. Para gerar Vτ, o cirurgião deve usar um anel assimétrico (de espessura progressiva).

### Regras de Decisão

O Módulo B aplica três regras de decisão sequenciais com base na necessidade clínica dominante:

**Regra 1 — Aplanar:** Quando a necessidade primária é reduzir o K-steep (cone central, alto poder ceratométrico, astigmatismo alinhado), o vetor dominante é o VR. O cirurgião aumenta a espessura do anel (250–400 μm) enquanto mantém o comprimento de arco no mínimo necessário para estabilidade estrutural (120°–160°). A profundidade é definida em 70–80% da paquimetria para amplificar o efeito radial.

**Regra 2 — Regularizar:** Quando a necessidade primária é reduzir o astigmatismo irregular (morfologia de crescente paracentral ou formato D, ENM ≠ K-steep), o vetor dominante é o VT. O cirurgião aumenta o comprimento de arco (210°–320°) enquanto mantém a espessura moderada (150–250 μm). O anel é posicionado ao longo do ENM para maximizar a regularização biomecânica.

**Regra 3 — Reposicionar:** Quando a necessidade primária é migrar o ápice do cone em direção ao eixo visual (ápice deslocado > 1 mm, coma > 3,5 μm), o vetor dominante é o Vτ. O cirurgião utiliza um anel assimétrico de espessura progressiva (ex: 300→150 μm) orientado ao longo do ENM. A extremidade mais espessa do anel é posicionada para alavancar o cone e promover o seu deslocamento direcional em direção ao eixo visual.

## 9.5 Classificação Fenotípica Biomecânica por Parâmetros Constitutivos (HGO/FEBio)

A classificação clássica do ceratocone baseia-se em parâmetros puramente geométricos ou topográficos de superfície, como a escala de Amsler-Krumeich (baseada na ceratometria média central e espessura local) ou a classificação Belin ABCD (baseada no raio de curvatura anterior e posterior, paquimetria mais fina e acuidade visual). Embora clinicamente úteis para a triagem e estadiamento da severidade refrativa, esses sistemas são inerentemente **não-biomecânicos**: eles avaliam as consequências geométricas da falha mecânica estromal, mas não capturam a patofisiologia molecular e mecânica subjacente do material.

Para preencher essa lacuna fundamental e dotar o cirurgião de uma linguagem causal profunda, o arcabouço AVBC introduz a **Classificação Fenotípica Biomecânica**. Este sistema mapeia o estado de falha estrutural do estroma corneano diretamente para os parâmetros constitutivos do modelo hiperelástico anisotrópico Holzapfel-Gasser-Ogden (HGO) do FEBio (c, k_1, k_2, \kappa), correlacionando-os com biomarcadores de imagem clínica de última geração ("Multimodal Proxies").

**Nota Epistemológica.** A classificação fenotípica aqui proposta opera no espaço dos parâmetros constitutivos do modelo HGO — grandezas que não são diretamente mensuráveis *in vivo* com nenhum dispositivo clínico atualmente disponível (Corvis ST, ORA, Brillouin). Os fenótipos são, portanto, inferidos *indiretamente* através de biomarcadores multimodais ("Multimodal Proxies") que correlacionam padrões clínicos observáveis com dominâncias paramétricas específicas. Reconhecemos, ademais, que o problema inverso de identificação dos parâmetros HGO na córnea é inerentemente mal-posto (*ill-posed*): múltiplos conjuntos de parâmetros podem produzir comportamentos macroscópicos similares, devido ao fenômeno de compensação paramétrica (Kling & Marcos, 2013; Pandolfi et al., 2019). A classificação, portanto, identifica **dominâncias fenotípicas** — o mecanismo de falha que governa o comportamento clínico observado — e não valores absolutos dos parâmetros constitutivos. A validação quantitativa desta correspondência de sensibilidade foi recentemente realizada através de uma ampla campanha paramétrica de 377 simulações por elementos finitos (Seção 12.3), embora a validação por correlação histomecânica direta *in vivo* permaneça como uma linha de investigação futura (Seção 13.4.6).

**Evidência Computacional Direta (Campanha de 377 Simulações).** A predição de que a classificação fenotípica biomecânica possui fundamentação física rigorosa e não-tautológica foi recentemente validada por uma campanha massiva de modelagem computacional (detalhada na Seção 12.3). A análise de sensibilidade *one-at-a-time* (OAT) em 377 simulações revelou que o parâmetro de rigidez da matriz fundamental estromal (c) domina de forma absoluta o deslocamento apical (explicando 98{,}9\% da variância, com CV = 0{,}671), seguido em escala secundária pela dispersão de fibras (\kappa). Em contrapartida, a variação da geometria do ICRS atua de forma matematicamente independente da assinatura material, exercendo forte controle sobre o torque corretivo ativo (V_τ, com Fisher ratio excelente para o Índice de Assimetria) e a redistribuição circunferencial de tensões (V_T). A ortogonalidade entre a dominância material (c-dominante na deformação global) e a dominância geométrica do ICRS (assimetria governando a assinatura vetorial local) prova que a Classificação Fenotípica Biomecânica não é uma tautologia taxonômica, mas sim um modelo causal preditivo robusto.

Definimos quatro fenótipos biomecânicos primários da ectasia corneana:

### 9.5.1 Fenótipo de Degradação da Matriz (c-Dominante)
* **Fundamento Físico:** Redução primária no módulo de cisalhamento da matriz extracelular isotrópica (c < 0,05 MPa), decorrente da degradação enzimática localizada da substância fundamental amorfa rica em proteoglicanos (decorina, lumican e keratocan). As fibrilas de colágeno (k_1) permanecem inicialmente saudáveis e tensionadas, mas perdem o suporte cisalhante interlamelar de acoplamento.
* **Assinatura Clínica (Multimodal Proxy):** Apresenta-se tipicamente como ceratocone frusto ou subclínico (forme fruste ectasia). Manifesta-se pelo aumento isolado do Índice Biomecânico Tomográfico (TBI > 0,35) com mapa de curvatura sagital anterior normal e paquimetria estável.
* **Implicação Cirúrgica:** O objetivo principal é a contenção da progressão mecânica inicial. Córneas neste estágio exibem alta responsividade a tratamentos combinados de Crosslinking ultra-rápido (CXL) e implantes de segmentos finos (vetor V_R dominante) para restaurar a estabilidade mecânica de base da membrana.

### 9.5.2 Fenótipo de Insuficiência Fibrilar (k_1-Dominante)
* **Fundamento Físico:** Falha mecânica intrínseca com queda severa na rigidez elástica tangencial das fibrilas de colágeno (k_1 \ll 0,22 MPa). Representa o estiramento crônico, rutura física ou deslizamento das lamelas de colágeno, comprometendo diretamente a capacidade do estroma de suportar a tensão de tração imposta pela pressão intraocular.
* **Assinatura Clínica (Multimodal Proxy):** Ceratocone moderado a avançado estabelecido. Caracteriza-se por elevação apical acentuada, espessamento epitelial compensatório severo nas adjacências (efeito de mascaramento de Salomão et al.) e aumento dramático da aberração comática de alta ordem (RMS de Coma > 2,50 μm, Module O).
* **Implicação Cirúrgica:** O estroma requer enrijecimento molecular direto (CXL para restabelecer a rigidez k_1 criando pontes covalentes químicas) associado a implantes de ICRS com maior espessura para invocar o vetor radial V_R e compensar a complacência fibrilar aumentada do estroma.

### 9.5.3 Fenótipo de Desorganização Microestrutural (\kappa-Dominante)
* **Fundamento Físico:** Aumento acentuado no parâmetro de dispersão angular das lamelas de colágeno (\kappa \to 1/3). A córnea perde seu arranjo preferencial circunferencial e radial altamente organizado e ortogonal na periferia e centro, transicionando mecânica e numericamente para um comportamento isotrópico de baixa rigidez cisalhante global.
* **Assinatura Clínica (Multimodal Proxy):** Cones altamente excêntricos, periféricos (arquétipos crescente paracentral e formato D periférico) ou cones do tipo "mamilo" (nipple) de curvatura extrema. Caracteriza-se por uma **divergência acentuada** entre o Eixo Neutro Mecânico (ENM) posterior e o meridiano ceratométrico anterior íngreme (|ENM - K-steep| > 30°).
* **Implicação Cirúrgica:** O alinhamento convencional de nomogramas baseado puramente no meridiano K-steep é ineficaz e induz aberrações secundárias. O implante do ICRS deve ser obrigatoriamente referenciado ao azimute do ENM posterior para interceptar o gradiente espacial de dispersão e atuar como ponte mecânica ativa (shunting) de estresse via vetor tangencial V_T.

### 9.5.4 Fenótipo de Instabilidade Exponencial (k_2-Dominante)
* **Fundamento Físico:** Comprometimento no parâmetro não-linear de endurecimento exponencial (k_2 \ll 100). A córnea perde a capacidade fisiológica de endurecer exponencialmente sob deformação mecânica rápida, tornando-se suscetível à deformação plástica catastrófica e irreversível quando submetida a estresses externos cíclicos.
* **Assinatura Clínica (Multimodal Proxy):** Fortemente associado ao hábito crônico de esfregar os olhos (eye rubbing) em pacientes com predisposição genética e atopia. Caracteriza-se por flutuações rápidas de refração diária, distorção de imagem paquimétrica localizada e progressão documentada em curtos intervalos de tempo.
* **Implicação Cirúrgica:** A interrupção absoluta do atrito ocular é o pré-requisito terapêutico primário. A inserção do ICRS é indicada para restaurar a integridade elástica linear, mas deve ser associada ao CXL para atuar sinergicamente na estabilização do comportamento não-linear de endurecimento.

### 9.5.5 Fenótipos Mistos e o Espectro Contínuo

Na prática clínica, os quatro fenótipos puros descritos acima representam os extremos de um espaço paramétrico quadridimensional contínuo. A fisiopatologia do ceratocone é um processo progressivo com ciclos acoplados de degradação enzimática (MMP-9, MMP-13), disrupção lamelar e remodelamento, onde múltiplos parâmetros constitutivos se deterioram simultaneamente. A degradação proteoglicânica (c\downarrow) enfraquece o acoplamento interlamelar; o deslizamento lamelar resultante aumenta a dispersão angular (\kappa\uparrow); a tensão crônica sobre as fibrilas remanescentes degrada a rigidez elástica (k_1\downarrow); e a perda de fibras maduras de colágeno tipo I reduz a capacidade de endurecimento exponencial (k_2\downarrow). Estes quatro processos são termodinamicamente acoplados.

A maioria dos pacientes com ceratocone moderado a avançado exibirá, portanto, **fenótipos mistos** — combinações como c-k_1 (degradação progressiva da matriz com falha fibrilar concomitante) ou \kappa-k_2 (desorganização lamelar com perda de strain-hardening em pacientes atópicos). A classificação identifica o **mecanismo dominante** — aquele que determina a estratégia terapêutica primária — sem negar a coexistência de degradação secundária nos demais parâmetros.

A analogia com a classificação hematológica das anemias é instrutiva: a anemia pode ser classificada como ferropriva, megaloblástica ou hemolítica, mas pacientes graves frequentemente apresentam múltiplos déficits simultâneos. A classificação mantém valor clínico preciso porque identifica o **driver terapêutico primário** que governa a primeira linha de tratamento. De forma análoga, a classificação fenotípica HGO responde à pergunta cirurgicamente decisiva: *"Qual parâmetro biomecânico devo priorizar na minha estratégia terapêutica para este paciente específico?"*

### 9.5.6 Critérios de Falsificação Fenotípica

Uma classificação científica que não pode ser falsificada não é ciência — é metafísica (Popper, 1959). A seguir, definimos predições testáveis e critérios de rejeição para cada fenótipo biomecânico:

| Fenótipo | Predição Testável | Critério de Falsificação |
|---|---|---|
| **c-dominante** | TBI elevado + topografia anterior normal → resposta forte a CXL isolado com estabilização do TBI em 12 meses | Se CXL não estabiliza o TBI em > 80% dos casos classificados como c-dominantes |
| **k_1-dominante** | Coma elevado + ectasia estabelecida → forte efeito de aplanamento com ICRS espesso (V_R dominante) | Se CI_R < 0,70 sistematicamente em pacientes classificados como k_1-dominantes |
| **\kappa-dominante** | ENM–K-steep > 30° → melhora superior com posicionamento pelo ENM vs. K-steep | Se posicionamento pelo ENM não produz VT-ratio > 0,85 em > 75% dos casos |
| **k_2-dominante** | Eye rubbing crônico + flutuação refrativa → estabilização com CXL + cessação do atrito | Se progressão documentada continua após CXL + cessação em > 50% dos casos |

Estes critérios de falsificação serão formalmente testados no estudo prospectivo descrito no Capítulo 13. A definição *a priori* dos limiares de rejeição é um compromisso ético e metodológico que garante a integridade científica da classificação proposta.

---

## 9.6 A Matriz de Decisão Biomecânica

### Integração Intermódulos

O poder da classificação AVBC reside na interseção de todos os três módulos. A matriz de decisão a seguir apresenta o conjunto completo de combinações O × T × B clinicamente relevantes:

> [!NOTE]
> **Para o Clínico: Como Usar a Matriz**
> Leia a tabela da esquerda para a direita: primeiro classifique ótica (O+, O~, O-), depois identifique o arquétipo topográfico (Módulo T), e a última coluna dir-lhe-á qual vetor biomecânico priorizar e a configuração sugerida. Pode usar isto como checklist no bloco operatório.

| Módulo O | Módulo T | Módulo B | Configuração do Anel | Racional |
|:---:|:---:|:---:|:---:|:---:|
| O+ | Oval central | VR dominante | Simétrico, 250–350 μm, arco 150° | Cone centrado, boa óptica → aplanar |
| O+ | Mamilo inferior | VR + VT | Simétrico, 200–300 μm, arco 160° às 6h | Cone inferior → aplanar + regularizar |
| O+ | Crescente paracentral | Vτ + VR | Assimétrico (300→200 μm), arco 160° | Ápice deslocado → reposicionar + aplanar |
| O~ | Qualquer mamilo/crescente | VT dominante | Simétrico, 200 μm, arco 210° | Óptica incerta → priorizar regularização |
| O~ | Paracentral | Vτ + VT | Assimétrico, arco 210° | Deslocado + incerto → reposicionar + regularizar |
| O− | Oval central | VR conservador | Simétrico, 200 μm, arco 120° | Óptica ruim → abordagem conservadora |
| O− | Formato D periférico | VT minimal ou adiar | Dois segmentos finos ou adiar | Ectasia difusa + óptica ruim → benefício limitado |
| Qualquer | Globus (K > 60 D) | VT/B estrutural | Simétrico, 250–350 μm, arco 160°-210° | Estabilização / tolerância a LC (até 85 D) |

### O Papel da Profundidade

A profundidade de implantação atua como um amplificador universal em todos os três vetores. O protocolo AVBC recomenda:

| Contexto Clínico | Profundidade | Racional |
|:---:|:---:|:---:|
| Ceratocone padrão | 70–75% da paquimetria | Posicionamento padrão, efeito equilibrado |
| Córnea fina (< 400 μm) | 65–70% | Margem de segurança para folga anel-endotélio |
| Alvo de forte aplanamento | 75–80% | Posicionamento mais profundo amplifica o VR |
| Córnea pós-CXL | 70–75% (com anel mais espesso) | CXL aumenta k₁ → estroma mais rígido → menor deformação por unidade de volume do anel |

---

## 9.7 O Índice de Correção AVBC: Fechando o Ciclo de Feedback

### Índices de Correção Específicos por Componente

Talvez o elemento de maior valor prático do arcabouço AVBC seja a sua capacidade de fornecer feedback quantitativo pós-operatório. Inspirado no Índice de Correção de Alpins (CI = |SIA|/|TIA|), o AVBC define três índices de correção específicos por componente:

**CI_R (Índice de Correção Radial):**
CI_R = (Δ K_{observado}) / (Δ K_{previsto)}

Um CI_R de 1,0 ± 0,15 indica que o efeito de aplanamento correspondeu à previsão. Valores abaixo de 0,85 indicam subcorreção sistemática (a córnea estava mais rígida do que o modelado, ou o efeito do anel foi menor que o previsto); valores acima de 1,15 indicam supercorreção.

**VT-ratio (Razão de Correção Tangencial):**
VT-ratio = (Δ Cyl_{observado}) / (Δ Cyl_{esperado)}

Esta razão avalia se o comprimento de arco produziu o grau esperado de regularização do astigmatismo.

**Vτ-ratio (Razão de Correção Torsional):**
V_τ-ratio = (Migraçao_do_ápice_{observada}) / (Migraç)ao_do_\text{ápice_{esperada}}

Para anéis simétricos, o Vτ esperado é zero, e qualquer migração do ápice não nula indica carregamento assimétrico inesperado. Para anéis assimétricos, esta razão quantifica a eficácia do mecanismo de torque.

### A Curva de Calibração Pessoal

Ao longo de N cirurgias, cada cirurgião acumula um banco de dados pessoal de índices de correção. O CI_R médio representa o viés sistemático do cirurgião: se o CI_R médio for 0,85 em 30 casos, o cirurgião está subestimando consistentemente o efeito do anel e deve multiplicar as previsões futuras por 1/0,85 = 1,18. Este processo de calibração iterativo é o análogo biomecânico do ajuste da constante A de LIO e representa o mecanismo pelo qual o arcabouço AVBC melhora a precisão preditiva ao longo do tempo sem exigir alterações no modelo físico subjacente.

> [!TIP]
> **Para o Clínico: O Seu "Fator Pessoal"**
> Tal como na fórmula de LIO existe a "constante A" de cada cirurgião, na AVBC existe o seu CI_R médio. Se ao fim de 20 casos o seu CI_R médio é 0.80, isso significa que, de forma sistemática, aplana 20% menos do que o FEM prevê. Corrija multiplicando a espessura planeada por 1/0.80 = 1.25. É exatamente isto que a Escola de Alpins nos ensinou — e a AVBC aplica ao anel.

---

## 9.8 AVBC Versus Nomogramas Existentes

As diferenças fundamentais entre o arcabouço AVBC e os sistemas de nomogramas existentes são estruturais, e não apenas paramétricas:

| Recurso | Nomograma de Ferrara | Calculadora Keraring | **Arcabouço AVBC** |
|---|:---:|:---:|:---:|
| Base do planejamento | Empírica (valor Q, K-steep) | Baseada em fenótipo | **Vetores biomecânicos (VR/VT/Vτ)** |
| Mecanismo | Implícito | Implícito | **Explícito: 3 mecanismos independentes** |
| Avaliação óptica | Nenhuma | Nenhuma | **Módulo O (quantitativa)** |
| Integração do ENM | Não | Não | **Sim (40% dos casos divergem do K-steep)** |
| Anéis assimétricos | Sem orientação | Limitada | **Seleção assimétrica guiada por Vτ** |
| Feedback pós-op | Nenhum | Nenhum | **CI_R, VT-ratio, Vτ-ratio** |
| Calibração do cirurgião | Não é possível | Não é possível | **Curva de calibração pessoal** |
| Transparência | Tabela de consulta opaca | Semitransparente | **Totalmente rastreável ao FEM** |

O AVBC não pretende substituir os nomogramas em todos os casos. Para os cerca de 60% dos pacientes com ceratocone central e simétrico onde o ENM ≈ K-steep e o astigmatismo é bem alinhado, o nomograma e o AVBC prescreverão essencialmente a mesma configuração de anel. O AVBC agrega valor para os 40% restantes — os casos onde o ENM diverge, o ápice está deslocado, o astigmatismo é irregular ou o contexto biomecânico é incomum (pós-CXL, córnea fina, morfologia atípica).

---

## 9.9 Limitações e Escopo

A classificação AVBC, em sua forma atual, possui limitações específicas que devem ser reconhecidas:

1. **A validação clínica está pendente.** A matriz de decisão é derivada de simulações de FEM e raciocínio biomecânico, não de ensaios clínicos prospectivos. Os resultados previstos são dependentes do modelo.

2. **Os limiares são preliminares.** As faixas de VR/VT (8,9–19,9 μm / 7,20–7,78 kPa) são específicas para o conjunto de parâmetros HGO utilizado nas simulações. Parâmetros materiais diferentes podem produzir valores absolutos diferentes, preservando as tendências relativas.

3. **Vτ foi validado computacionalmente.** Os valores de torque ativo gerados por designs de espessura progressiva foram validados usando simulações assimétricas do FEBio (Capítulo 12) e variam de 9,31 a 18,34 μN·m, quebrando a condição de torque zero (Vτ = 0) característica das configurações simétricas.

4. **O protocolo de medição do ENM requer estudos de concordância interobservador.** A reprodutibilidade da determinação do ENM baseada na elevação posterior em diferentes instrumentos e operadores não foi formalmente avaliada.

5. **O planejamento de múltiplos segmentos não é abordado.** O arcabouço atual se concentra no implante de segmento único. A extensão para configurações de dois segmentos requer modelagem adicional.

Estas limitações definem o programa de pesquisa que decorre do arcabouço. Elas não são fraquezas do próprio arcabouço — são os próximos passos naturais em sua validação.

O AVBC foi projetado como uma *linguagem para a tomada de decisão clínica*, e não como uma calculadora que fornece uma resposta definitiva. Ele oferece ao cirurgião uma forma de pensar sobre o planejamento do ICRS estruturada e fundamentada mecanicamente — um arcabouço que pode ser debatido, refinado e calibrado através da experiência clínica, em vez de uma tabela de consulta opaca que só pode ser aceita ou rejeitada.

---

## 9.10 Resumo

A classificação integrada AVBC decompõe o planejamento do ICRS em três módulos sequenciais — Óptico (O), Topográfico (T) e Biomecânico (B) — cada um com critérios definidos e saídas categóricas. O Módulo O filtra o processo avaliando a coerência óptica; o Módulo T localiza a ectasia e identifica o ENM; o Módulo B mapeia a necessidade clínica para vetores biomecânicos específicos e, a partir daí, para os parâmetros do anel.

A matriz de decisão biomecânica cruza os três módulos para gerar prescrições de anel que são transparentes, rastreáveis e calibráveis. Os índices de correção AVBC (CI_R, VT-ratio, Vτ-ratio) fecham o ciclo de feedback cirúrgico, permitindo uma calibração específica do cirurgião análoga ao Índice de Correção de Alpins para cirurgia de astigmatismo.

O arcabouço AVBC agrega valor clínico principalmente nos cerca de 40% dos casos em que o ENM diverge do K-steep, o ápice está deslocado ou o contexto biomecânico é incomum. Para o ceratocone central e simétrico padrão com astigmatismo alinhado, os nomogramas existentes continuam adequados. O AVBC não busca substituir o nomograma universalmente — busca estender o vocabulário de tomada de decisão do cirurgião para abranger toda a dimensionalidade do problema biomecânico.

---

## Referências

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Alpins NA. Astigmatism analysis by the Alpins method. *J Cataract Refract Surg*. 2001;27(1):31–49.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara P, Torquetti L. Clinical nomograms for Intacs and Ferrara ring segments. In: *Keratoconus and Keratoectasia*. Springer; 2017.
5. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
6. Kling S, Marcos S. Finite-element modeling of ICRS in a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
7. Maeda N, Klyce SD, Smolek MK. Comparison of methods for detecting keratoconus. *Arch Ophthalmol*. 2002;120(5):601–607.
8. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
9. Rabinowitz YS, Rasheed K. KISA% index: a quantitative videokeratography algorithm. *J Cataract Refract Surg*. 1999;25(10):1327–1335.
10. Vega-Estrada A, Alió JL. Keratoconus progression after ICRS implantation. *Cornea*. 2013;32(5):611–616.
11. Reis M, Sandes J. Análise Vetorial Biomecânica Corneana (AVBC): Vetores de Força Biomecânica Corneana para Implante de Segmentos de Anel Intraestromal. Presente volume; 2026.

