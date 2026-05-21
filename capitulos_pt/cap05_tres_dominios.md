# Capítulo 5 — Os Três Domínios da Avaliação do ICRS

## 5.1 Introdução

A avaliação clínica de uma córnea com ceratocone antes do implante de segmento de anel intraestromal (ICRS) tem seguido tradicionalmente um paradigma binário: o cirurgião determina se a ectasia está presente e, em caso afirmativo, seleciona uma configuração de anel a partir de um nomograma fornecido pelo fabricante. Esta abordagem, embora pragmática, funde três questões fundamentalmente distintas em uma única decisão e, com isso, abdica da especificidade que o diagnóstico por imagem moderno e a biomecânica computacional podem proporcionar. O presente capítulo apresenta um modelo de avaliação trimodal — designado pelos domínios **Óptico (O)**, **Topográfico (T)** e **Biomecânico (B)** — que decompõe o planejamento do ICRS em três investigações sequenciais, cada uma governada por suas próprias fontes de dados, critérios de avaliação e resultados clínicos.

As três perguntas são as seguintes:

1. **O paciente enxergará melhor?** Esta é a área do Módulo O. Antes de se iniciar qualquer análise geométrica ou mecânica, o clínico deve verificar se o perfil de aberração óptica da córnea é suscetível ao tipo de correção que um ICRS pode oferecer. Um segmento de anel redistribui a curvatura corneana; ele não regulariza a superfície epitelial, não substitui uma camada de Bowman cicatricial nem compensa aberrações cristalinianas. Se as fontes dominantes de degradação visual estiverem fora do alcance da modificação de curvatura, é improvável que o procedimento resulte em uma melhora funcionalmente significativa, independentemente de quão precisamente o anel seja projetado.

2. **Onde está a ectasia?** O Módulo T aborda a morfologia espacial do cone. A topografia corneana tem servido há muito tempo como o principal instrumento de diagnóstico para o ceratocone, contudo, é convencionalmente interpretada por meio de índices escalares — ceratometria máxima ($K_{max}$), assimetria inferior-superior e localização do cone — que reduzem uma superfície tridimensional complexa a um punhado de números. Em contrapartida, o módulo topográfico do presente modelo classifica o padrão ectático em um de cinco arquétipos morfológicos e introduz o conceito do **Eixo Neutro Mecânico (ENM)**, o meridiano de deslocamento estromal posterior máximo, que frequentemente diverge do eixo ceratométrico ortogonal mais curvo (eixo mais curvo).

3. **Como o cirurgião deve agir?** O Módulo B traduz a intenção clínica — aplanar, regularizar ou reposicionar — para a linguagem dos vetores biomecânicos. As análises de elementos finitos apresentadas nos Capítulos 3 e 4 demonstraram que o vetor de deslocamento radial **V_R**, o vetor de tensão tangencial **V_T** e o proxy torsional **V_τ** respondem, cada um, preferencialmente a um parâmetro de design de anel diferente (espessura, comprimento de arco e assimetria esquerda-direita, respectivamente). O Módulo B formalizes essas correspondências em uma matriz de decisão que mapeia os objetivos clínicos a configurações específicas de anel.

O modelo trimodal não substitui o julgamento clínico; em vez disso, o estrutura de modo que cada decisão seja tomada com base nas evidências mais adequadas. O restante deste capítulo descreve cada módulo em detalhes, apresenta os critérios de classificação e as regras de decisão, e conclui com fluxos de trabalho clínicos integrados que ilustram como os três domínios convergem na prática.

---

## 5.2 Módulo O — Avaliação de Coerência Óptica

### 5.2.1 Justificativa e o Índice de Coerência Axial (ICE)

O primeiro domínio do modelo da AVBC investiga o estado óptico do olho para determinar se o implante de ICRS pode proporcionar uma melhora **funcionalmente significativa** no desempenho visual. Esta questão precede logicamente qualquer análise topográfica ou biomecânica: se a resposta for negativa, nenhuma otimização geométrica salvará o resultado cirúrgico. O Módulo O, portanto, serve como um portal de triagem — pacientes classificados como **O−** são direcionados para intervenções alternativas (como cross-linking de colágeno corneano isolado, ceratectomia fotorrefrativa combinada com cross-linking, ou ceratoplastia penetrante), enquanto aqueles classificados como **O+** ou **O~** avançam para os módulos topográfico e biomecânico.

A base teórica para esta triagem deriva da relação entre as aberrações corneanas de alta ordem (HOAs) e o mecanismo de ação de um ICRS. Os segmentos de anel modificam a curvatura corneana anterior ao induzir um efeito de encurtamento de arco localizado nas lamelas estromais adjacentes ao implante (Burris et al., 1998; Piñero et al., 2009). A mudança resultante na curvatura é predominantemente de baixa ordem: ela aplana a córnea central (reduzindo a miopia e o astigmatismo regular) e, quando posicionada de forma assimétrica, redireciona o ápice do cone. Esses efeitos mapeiam-se principalmente no desfoque de Zernike ($Z_2^0$), no astigmatismo ($Z_2^2$) e no coma ($Z_3^1$). Termos de ordem superior, como trevo (*trefoil*) ($Z_3^3$), aberração esférica ($Z_4^0$) e coma secundário ($Z_5^1$), são afetados apenas incidentalmente. Consequentemente, um olho cuja degradação visual é dominada por coma e astigmatismo de baixa ordem é um candidato muito mais favorável do que aquele no qual predominam o trevo, o *quadrafoil* ou aberrações irregulares induzidas por cicatrizes.

Para preencher a lacuna entre os parâmetros estruturais da ectasia (como ceratometria máxima $K_{max}$, elevação de Belin/Ambrósio ou paquimetria local) e a qualidade visual subjetiva, o modelo da AVBC introduz o **Índice de Coerência Axial (ICE)**. Na prática clínica, observa-se frequentemente uma dissociação profunda onde os parâmetros topográficos permanecem completamente estáveis (por exemplo, após o cross-linking corneano), mas a qualidade visual funcional do paciente continua a se deteriorar devido à incoerência espacial das aberrações. O biomarcador ICE aborda diretamente essa dissociação ao quantificar o alinhamento angular dos vetores ópticos e topográficos primários da córnea.

A métrica primária deste índice é o **$ICE_{min}$**, definido como a divergência angular entre o eixo topográfico mais curvo ($\theta_{topo}$) e o eixo comático ($\theta_{coma}$):

$$ICE_{min} = |\theta_{topo} - \theta_{coma}|$$

Em padrões de ceratocone inferotemporal em que o eixo comático não é explicitamente relatado por aberrometros padrão, o meridiano comático é clinicamente inferido como vertical ($90^\circ$). Essa aproximação foi rigorosamente validada em relação a medições aberrométricas explícitas de frente de onda, demonstrando uma correlação muito alta ($r = 0.87, p < 0.01$).

### 5.2.2 Critérios de Avaliação

O Módulo O avalia quatro parâmetros de frente de onda medidos em um diâmetro pupilar de 6 mm usando aberrometria Hartmann–Shack ou por rastreamento de raios (*ray-tracing*), juntamente com o Índice de Coerência Axial (ICE). Os critérios e seus limiares de classificação são apresentados na Tabela 5.1.

**Tabela 5.1.** Critérios de classificação óptica para elegibilidade ao ICRS (zona de análise de 6 mm).

| Critério | Favorável (O+) | Intermediário (O~) | Desfavorável (O−) |
|---|---|---|---|
| **$ICE_{min}$ (°)** | < 15° (ICE Alto) | 15°–45° (ICE Moderado) | > 45° (ICE Baixo) |
| RMS de Coma (μm) | < 2.50 | 2.50–3.50 | > 3.50 |
| Δ Eixo: refração vs. K mais curvo (°) | < 15 | 15–30 | > 30 |
| RMS de HOA Total (μm) | < 2.0 | 2.0–4.0 | > 4.0 |

**Índice de Coerência Axial ($ICE_{min}$).** O $ICE_{min}$ é o parâmetro de triagem primário no Módulo O. Quando o $ICE_{min}$ é menor que 15° (classificado como **ICE Alto**), o eixo topográfico mais curvo do cone e o eixo comático estão altamente coerentes e alinhados, indicando que a deformação estrutural é simétrica e altamente responsiva à regularização geométrica. Quando o $ICE_{min}$ fica entre 15° e 45° (classificado como **ICE Moderado**), os eixos óptico e topográfico exibem um desalinhamento moderado, que pode ser regularizado, mas requer uma assimetria cuidadosa dos segmentos. Quando o $ICE_{min}$ excede 45° (classificado como **ICE Baixo**), a incoerência espacial extrema indica um acoplamento estrutural altamente irregular; nesses olhos, as configurações padrão de ICRS têm grande probabilidade de induzir astigmatismo irregular em vez de regularizar a córnea, resulting in visual degradation.

**RMS de Coma.** O coma vertical ($Z_3^{-1}$) é a aberração assinatura do ceratocone inferior e é a HOA mais efetivamente reduzida pelo implante de ICRS. Quando o RMS de coma excede 3.50 μm, o cone geralmente é tão avançado que a irregularidade residual após a inserção do anel permanece acima do limiar de significância funcional, mesmo que a redução absoluta seja substancial in termos percentuais (Vega-Estrada et al., 2013). Abaixo de 2.50 μm, a aberração está bem dentro da faixa corretiva de um implante de segmento único ou duplo.

**Discordância de Eixo (Δ Eixo).** O ângulo entre o eixo do cilindro refracional manifesto e o meridiano ceratométrico mais curvo reflete o grau de compensação interna (cristalino) ou contribuição não corneana para o estado refracional. Quando esta discordância excede 30°, uma fração substancial do cilindro se origina de fontes que o ICRS não pode tratar, e a correção pós-operatória com óculos ou lentes de contato torna-se imprevisível (Piñero et al., 2010). Valores abaixo de 15° indicam que os astigmatismos corneano e refracional estão bem alinhados, maximizando a probabilidade de que a regularização da curvatura se traduza em melhora refracional.

**RMS de HOA Total.** Esta métrica agregada captura aberrações além do desfoque e do astigmatismo. Quando o RMS de HOA total excede 4.0 μm, la superfície corneana é suficientemente irregular para que a correção predominantemente de baixa ordem fornecida por um ICRS deixe um grande saldo de aberração residual. Tais olhos são melhor atendidos por lentes de contato rígidas gás-permeáveis, lentes esclerais ou ceratoplastia, as quais podem contornar a superfície anterior irregular.

### 5.2.3 Validação Estatística do Índice ICE (N = 1.139)

A utilidade clínica do $ICE_{min}$ como biomarcador preditivo foi validada por meio de um grande banco de dados retrospectivo e multicêntrico, agregando $N = 1.139$ olhos em três domínios clínicos distintos:

1. **Candidatos a Cirurgia de Catarata e LIO Premium ($N = 487$ olhos):** Nesta coorte, pacientes com baixa coerência (Tipo 2: ICE $< 0.50$, correspondente a $ICE_{min} > 45^\circ$) exibiram um aumento de três vezes no astigmatismo residual ocular pós-operatório ($1.28 \pm 0.67$ D vs. $0.52 \pm 0.38$ D no Tipo 1/ICE Alto, $p < 0.001$). Além disso, a taxa de insatisfação com a LIO multifocal foi de apenas $4.6\%$ no grupo ICE Alto, em comparação com $21.4\%$ no grupo ICE Baixo. A análise da Curva de Característica de Operação do Receptor (ROC) demonstrou uma Área Sob a Curva (AUC) de **0.814** (IC 95%: 0.742–0.886) para a predição da satisfação do paciente.
2. **Candidatos a Cirurgia Refrativa (LASIK/PRK) ($N = 352$ olhos):** Em pacientes submetidos à cirurgia refrativa corneana a laser, a incidência de sintomas visuais pós-operatórios graves (*glare*, halos, *starbursts*) foi de $18.2\%$ no grupo ICE Alto vs. $76.9\%$ no grupo ICE Baixo. O coma vertical pós-operatório foi mais de 2.5 vezes maior na coorte de baixa coerência ($0.71 \pm 0.33\ \mu\text{m}$ vs. $0.28 \pm 0.14\ \mu\text{m}$, $p < 0.001$). A correlação de Pearson entre o $ICE_{min}$ e os resultados visuais foi de $r = -0.58$ ($p < 0.001$).
3. **Candidatos a Segmento de Anel Intraestromal (ICRS) ($N = 300$ olhos):** Na coorte de ectasia submetida ao implante de ICRS, o $ICE_{min}$ provou ser o preditor isolado mais poderoso de recuperação funcional:
   * **Ganho Visual:** Os pacientes da coorte ICE Alto obtiveram um ganho médio de Acuidade Visual Melhor Corrigida (AVMC) de $4.2 \pm 1.5$ linhas de Snellen, em comparação com apenas $1.6 \pm 2.0$ linhas na coorte ICE Baixo ($p < 0.001$), representando uma superioridade de 2.6 vezes na recuperação visual.
   * **Taxa de Reintervenção:** A taxa de reintervenção cirúrgica (explante ou reposicionamento devido à falta de efeito ou aberrações induzidas) foi de $8.5\%$ no grupo ICE Alto vs. $35.0\%$ no grupo ICE Baixo ($p < 0.001$).
   * **Superioridade Diagnóstica ROC:** Para a predição de uma melhora visual clinicamente significativa de $\ge 3$ linhas de Snellen, o $ICE_{min}$ alcançou uma **AUC de 0.82** (IC 95%: 0.77–0.87), com um **limiar de triagem ideal de $ICE_{min} < 28^\circ$ (Sensibilidade: 78%, Especificidade: 84%)**. Em comparação, os parâmetros tradicionais tiveram um desempenho insatisfatório: o $K_{max}$ alcançou uma AUC de 0.68 (IC 95%: 0.61–0.75) e a paquimetria local alcançou uma AUC de 0.64 (IC 95%: 0.57–0.71). A superioridade do $ICE_{min}$ foi confirmada estatisticamente por meio do teste de DeLong ($p = 0.012$).
   * **Controle Multivariado:** Em um modelo de regressão linear multivariada ($R^2 = 0.42$), o $ICE_{min}$ permaneceu como um preditor independente altamente significativo do ganho visual pós-operatório ($\beta = -0.62$ para cada $10^\circ$ de desalinhamento, $p < 0.001$), enquanto as métricas estruturais tradicionais, como o $K_{max}$ ($\beta = -0.08, p = 0.12$) e a paquimetria central ($\beta = 0.04, p = 0.18$), perderam completamente a significância estatística.

### 5.2.4 Lógica de Classificação

A classificação óptica composta segue a regra do pior critério:

- **O+**: todos os quatro critérios na coluna Favorável.
- **O~**: pelo menos um critério na coluna Intermediário, nenhum na coluna Desfavorável.
- **O−**: qualquer critério na coluna Desfavorável.

Essa lógica conservadora reflete a realidade clínica de que um único parâmetro gravemente anormal pode dominar o resultado visual. Um paciente com RMS de coma de 1.8 μm, mas com RMS de HOA total de 4.5 μm (induzido, por exemplo, por um trevo elevado) é classificado como O−, apesar do valor favorável de coma, porque o ICRS deixará o resíduo dominado pelo trevo essencialmente inalterado.

A classificação O é registrada no perfil AVBC do paciente e revisitada aos seis meses de pós-operatório. Pacientes inicialmente classificados como O~ que demonstram uma mudança para O+ após a estabilização induzida pelo cross-linking podem se tornar candidatos a um implante secundário de ICRS, ilustrando a natureza dinâmica do modelo.

---

## 5.3 Módulo T — Morfologia Topográfica

### 5.3.1 Arquétipos Morfológicos

A topografia corneana fornece as informações espaciais necessárias para determinar **onde** o processo ectático está centrado, como ele se estende e como a geometria do cone interage com o eixo visual. Embora os índices escalares, como o $K_{max}$ e o índice KISA% (Rabinowitz e McDonnell, 1989), sejam valiosos para triagem e estadiamento, eles são insuficientes para o planejamento do ICRS porque duas córneas com valores idênticos de $K_{max}$ podem apresentar morfologias de cone radicalmente diferentes — e, portanto, exigir configurações de anel distintas.

O Módulo T classifica a córnea ectática em um de cinco arquétipos morfológicos com base no mapa de curvatura tangencial anterior e no mapa de elevação posterior da esfera de melhor ajuste (BFS - *best-fit-sphere*). Esses arquétipos, derivados da taxonomia clínica de Alió e Shabayek (2006) e refinados sob a perspectiva biomecânica do modelo da AVBC, são os seguintes:

1. **Oval Central.** O cone está centrado a menos de 1 mm do ápice corneano e se apresenta como uma ilha aproximadamente simétrica de curvatura elevada. O $K_{max}$ está tipicamente localizado dentro da zona central de 2 mm. Este padrão é o mais favorável para o implante de segmento duplo simétrico porque o anel atua de forma concêntrica ao redor do cone.

2. **Mamilo Inferior (Nipple).** Um cone de pequeno diâmetro (< 3 mm) e alto gradiente, deslocado inferiormente, tipicamente entre os meridianos de 5 e 7 horas. O gradiente acentuado de curvatura produz coma elevado e marcada assimetria inferior-superior. São indicados segmentos inferiores únicos ou duplos assimétricos.

3. **Crescente Paracentral.** Uma região de encurvamento em forma de arco que se estende do quadrante inferotemporal ao inferonasal, criando um padrão de crescente no mapa tangencial. Esta morfologia está associada a coma moderado e astigmatismo oblíquo significativo. O comprimento de arco do anel deve ser compatível com a extensão angular do crescente para evitar sub ou supercorreção.

4. **Formato em D Periférico (D-shape).** A ectasia está deslocada em direção ao limbo, produzindo uma região ampla e de baixo gradiente de encurvamento que ocupa todo um hemisfério. O $K_{max}$ pode estar apenas modestamente elevado (< 52 D), mas a assimetria é pronunciada. Como o cone é periférico, o braço de alavanca biomecânico do anel é mais curto, e segmentos mais espessos podem ser necessários para alcançar um aplanamento adequado.

5. **Globo (Globus) (> 60 D).** Toda a córnea é curva, com o $K_{max}$ excedendo 60 D e sem ápice de cone discernível. Este padrão representa o ceratocone avançado no qual o afinamento estromal é difuso. O implante de ICRS em córneas com padrão globo é controverso; a triagem do Módulo O frequentemente classificará esses pacientes como O−, mas em casos selecionados onde o coma continua sendo a aberração dominante, um anel de 360° ou uma configuração de segmento duplo espesso pode fornecer aplanamento suficiente para permitir a adaptação de lentes de contato.

### 5.3.2 O Eixo Neutro Mecânico (ENM)

Uma contribuição central do modelo da AVBC para a análise topográfica é a introdução do **Eixo Neutro Mecânico (ENM)**. O ENM é definido como o meridiano ao longo do qual o deslocamento estromal posterior atinge seu valor máximo no modelo de elementos finitos da córnea personalizada sob pressão intraocular (PIO) fisiológica. Conceitualmente, é o eixo em torno do qual a córnea 'flamba' sob o processo ectático.

Na prática clínica clássica, o meridiano ceratométrico mais curvo ($K_{steep}$) é utilizado como um substituto para a orientação do cone, e os segmentos de anel são posicionados em relação a este eixo. No entanto, simulações de elementos finitos revelam que o $K_{steep}$ e o ENM divergem em mais de 10° em aproximadamente **40% dos casos**, com discordâncias que excedem 25° em 12% dos casos. A origem dessa divergência reside na distinção entre a curvatura da superfície (que o $K_{steep}$ mede) e a deformação volumétrica (que o ENM captura). Uma córnea com paquimetria assimétrica — mais fina nasalmente do que temporalmente, por exemplo — exibirá deslocamento posterior máximo ao longo de um meridiano que está rotacionado em relação ao pico de curvatura anterior, porque a região mais fina se deforma preferencialmente sob a carga da PIO.

A consequência clínica da discordância entre o ENM e o $K_{steep}$ é significativa. Quando um segmento de anel é alinhado ao $K_{steep}$ em vez do ENM, o efeito de regularização biomecânica ($V_T$) é subotimizado porque o implante não abrange o verdadeiro eixo de deformação máxima. Estudos paramétricos de elementos finitos mostram que um desalinhamento de 20° entre a posição do anel e o ENM reduz a regularização da tensão tangencial em aproximadamente 15%, um efeito que não é capturado por nomogramas baseados em topografia.

O Módulo T, portanto, exige que tanto o eixo $K_{steep}$ quanto o eixo do ENM sejam registrados. Quando os dois divergem por mais de 15°, o protocolo da AVBC especifica que o posicionamento do anel deve ser referenciado ao ENM, em vez de ao $K_{steep}$. O ENM pode ser estimado clinicamente por meio de tomografia de elevação posterior (Scheimpflug ou OCT de segmento anterior) identificando-se o meridiano de elevação posterior máxima no mapa de diferença BFS posterior, ou calculado diretamente a partir de um modelo de elementos finitos personalizado do paciente, quando disponível.

### 5.3.3 Resultado Topográfico

O resultado do Módulo T é um descritor de dois elementos: **arquétipo** e **azimute do ENM**. Por exemplo, um paciente pode ser classificado como *T: Mamilo Inferior, ENM 258°*. Este descritor alimenta diretamente o Módulo B, onde o arquétipo informa a escolha de segmentos únicos versus duplos e o azimute do ENM determina o meridiano de implante.

---

## 5.4 Módulo B — Seleção do Mecanismo Biomecânico

### 5.4.1 Da Intenção Clínica ao Vetor Biomecânico

O módulo biomecânico traduz a intenção terapêutica do cirurgião em uma prescrição quantitativa, mapeando cada objetivo clínico a um vetor biomecânico específico e, por meio desse vetor, a um parâmetro de design de anel controlável. A arquitetura conceitual desse mapeamento foi estabelecida nos Capítulos 3 e 4 por meio da análise sistemática de elementos finitos de 28 configurações simétricas de ICRS em um modelo corneano de Holzapfel–Gasser–Ogden (HGO) ($c = 0.05$ MPa, $k_1 = 0.22$ MPa, $k_2 = 100$, $\kappa = 0.09$, módulo de compressão volumétrica $k = 4.76$ MPa). O Módulo B codifica esses achados em uma matriz de decisão clínica.

Os três vetores biomecânicos e suas correspondências estão resumidos na Tabela 5.2.

**Tabela 5.2.** Mapeamento vetor-parâmetro para o design biomecânico do ICRS.

| Vetor | Grandeza Física | Faixa (FEM) | Correlato Clínico | Parâmetro de Controle do Anel |
|---|---|---|---|---|
| **V_R** | Deslocamento radial $\Delta u_r$ | 8.9–19.9 μm | $\Delta K$ (aplanamento corneano) | Espessura do segmento |
| **V_T** | Tensão tangencial de aro $\Delta\sigma_{\theta\theta}$ | 7.20–7.78 kPa | $\Delta Cyl$ (regularização astigmática) | Comprimento de arco (varredura) |
| **V_τ** | Proxy torsional $\sum|\Delta u_i - \Delta u_{i-1}| r_i \Delta\theta$ | 0 (simétrico) | Migração do ápice (reposicionamento) | Assimetria esquerda-direita |

### 5.4.2 V_R: O Vetor de Aplanamento

O vetor de deslocamento radial $V_R$ quantifica o deslocamento centripeto (apical) da superfície corneana anterior induzido pelo segmento de anel. Na varredura paramétrica de FEM, o $V_R$ variou de 8.9 μm para a configuração de arco parcial mais fina a 19.9 μm para o arco parcial mais espesso, enquanto o anel completo de 360° produziu o valor extremo de 125.9 μm (uma redução de 65% em relação ao deslocamento apical inicial de 360.9 μm a 15 mmHg de PIO). A tradução clínica do $V_R$ é direta: maior deslocamento centripeto produz maior aplanamento central, o que se mapeia como uma redução no poder ceratométrico ($\Delta K$).

Um achado crítico da análise paramétrica é que o $V_R$ é **insensível ao arco de varredura** para arcos parciais: configurações abrangendo de 90° a 320° produziram valores de $V_R$ agrupados na faixa estreita de 19.2–19.9 μm quando a espessura do segmento foi mantida constante. Essa insensibilidade implica que o cirurgião que deseja aumentar o aplanamento deve aumentar a **espessura do segmento** em vez de estender o arco. O corolário prático é que o aplanamento pode ser titulado independentemente da regularização, uma propriedade que é central para a ortogonalidade do espaço vetorial da AVBC.

### 5.4.3 V_T: O Vetor de Regularização

O vetor de tensão tangencial de aro $V_T$ captura a redistribuição da tensão circunferencial no estroma corneano produzida pelo segmento de anel. Na córnea basal (sem anel), a tensão tangencial média foi de 7.78 kPa. À medida que o comprimento do arco aumentou, o $V_T$ diminuiu monotonicamente de acordo com a regressão linear:

> V_T(arc°) = −0.0018 × arc° + 7.79 &emsp; (R² = 0.94)

Os pontos de dados individuais da varredura paramétrica de FEM são apresentados na Tabela 5.3.

**Tabela 5.3.** Tensão tangencial de aro como função da varredura do arco.

| Configuração | Arco (°) | V_T (kPa) |
|---|---|---|
| Linha de base (sem anel) | 0 | 7.78 |
| Arco parcial | 90 | 7.63 |
| Arco parcial | 120 | 7.57 |
| Arco parcial | 160 | 7.48 |
| Arco parcial | 210 | 7.39 |
| Arco parcial | 255 | 7.33 |
| Arco parcial | 320 | 7.20 |
| Anel completo (ICRS 360°) | 360 | 7.29 |

O correlato clínico da redução de $V_T$ é a regularização astigmática: à medida que o anel redistribui a tensão de aro mais uniformemente ao redor da circunferência corneana, o gradiente de curvatura entre os meridianos mais curvo e mais plano diminui, reduzindo o cilindro corneano. A relação monotônica entre o comprimento do arco e o $V_T$ fornece ao cirurgião uma alavanca de controle contínua e previsível para a regularização.

A única anomalia na Tabela 5.3 — o ligeiro aumento no $V_T$ de 7.20 kPa a 320° para 7.29 kPa a 360° — reflete a transição topológica de um arco aberto para um anel fechado. O anel fechado restringe a córnea circunferencialmente, mas também introduz um efeito de rigidez de aro que aumenta marginalmente a tensão tangencial média. Esta não monotonicidade na extremidade da faixa de comprimento de arco não afeta a tomada de decisão clínica porque anéis completos de 360° raramente são implantados; a faixa clínica relevante é de 90° a 320°, dentro da qual o modelo linear se mantém com excelente fidelidade.

### 5.4.4 V_τ: O Vetor de Reposicionamento

O vetor torsional $V_\tau$ aborda o objetivo clínico mais desafiador: a migração do ápice do cone em direção ao eixo visual. Em todas as 28 simulações de anel simétrico da varredura paramétrica, o $V_\tau$ foi identicamente zero, confirmando por validação de elementos finitos que as configurações de anel simétrico não podem induzir deslocamento torsional líquido. Esse resultado não é trivial — demonstra que o grau de liberdade torsional é estritamente ortogonal a $V_R$ e $V_T$ no espaço de design simétrico.

Para ativar o $V_\tau$, o cirurgião deve introduzir **assimetria esquerda-direita**: espessuras de segmento diferentes em lados opostos do ENM, ou um único segmento em apenas um dos lados. O proxy torsional, definido como:

> V_τ,proxy = Σ |Δu_z,i − Δu_z,i-1| × rᵢ × Δθ

quantifica a deformação assimétrica acumulada ao redor da circunferência corneana. Quando os segmentos esquerdo e direito diferem em espessura ou comprimento de arco, o proxy torna-se diferente de zero, e o ápice migra em direção ao lado do segmento mais espesso (ou mais longo). A magnitude do $V_\tau$, assim, prescreve o grau de assimetria necessário para reposicionar o cone por um determinado deslocamento angular ou linear.

### 5.4.5 Regras de Decisão

O Módulo B destila as correspondências vetor-parâmetro em três regras de decisão acionáveis:

1. **Aplanar → $V_R$ → Espessura.** Se o objetivo clínico primário for reduzir o $K_{max}$ (ou seja, o paciente apresenta miopia elevada e um cone central ou paracentral íngreme), o cirurgião aumenta a espessura do segmento. O comprimento do arco é definido para o mínimo necessário para uma regularização adequada de $V_T$.

2. **Regularizar → $V_T$ → Comprimento de arco.** Se o objetivo primário for reduzir o cilindro corneano (ou seja, o paciente apresenta astigmatismo acentuado e uma morfologia em crescente ou formato em D), o cirurgião estende a varredura do arco. A espessura do segmento é definida para o mínimo necessário para um aplanamento adequado de $V_R$.

3. **Reposicionar → $V_\tau$ → Assimetria.** Se o objetivo primário for deslocar o ápice do cone em direção ao eixo visual (ou seja, o paciente apresenta um cone em mamilo descentrado e coma elevado), o cirurgião introduz assimetria esquerda-direita na espessura do segmento ou no comprimento do arco. O grau de assimetria é titulado para a magnitude desejada de $V_\tau$.

Essas regras não são mutuamente exclusivas. Na maioria dos cenários clínicos, dois ou três objetivos coexistem, e o cirurgião deve equilibrar os três vetores simultaneamente. A ortogonalidade de $V_R$ e $V_T$ em relação aos seus parâmetros de controle (espessura e comprimento de arco, respectivamente) simplifica essa tarefa: as duas variáveis podem ser ajustadas independentemente sem contaminação cruzada, como demonstrado pelos dados de FEM. O $V_\tau$ introduz um acoplamento, porque a assimetria na espessura afeta o $V_R$ de forma diferencial nos dois lados; este acoplamento é gerenciado mantendo-se a espessura média constante enquanto se varia a proporção esquerda-direita.

### 5.4.6 Sensibilidade Paquimétrica

A resposta biomecânica da córnea ao implante de ICRS é modulada pela espessura estromal. Análises de sensibilidade por elementos finitos demonstraram que córneas finas (paquimetria central < 430 μm) exibem uma sensibilidade de deslocamento radial $|\Delta u_z|$ de 34.1 μm, enquanto córneas espessas (> 500 μm) exibem uma sensibilidade de 28.5 μm — uma diferença de 20%. Este achado tem implicações diretas para o Módulo B: em córneas finas, uma determinada espessura de segmento produz um $V_R$ proporcionalmente maior, e o cirurgião deve reduzir a espessura para evitar o superaplanamento (*over-flattening*). Por outro lado, em córneas espessas, um segmento mais espesso pode ser necessário para atingir o $\Delta K$ alvo. O protocolo da AVBC, portanto, inclui um fator de correção paquimétrica que ajusta a prescrição nominal de $V_R$ pela razão da paquimetria central do paciente para o valor de referência de 465 μm utilizado no modelo de FEM.

---

## 5.5 Integração de Domínios

### 5.5.1 O Fluxo O → T → B

Os três módulos são projetados para serem avaliados sequencialmente, com o resultado de cada um alimentando a entrada do próximo. O fluxo funciona da seguinte forma:

**Passo 1: Módulo O — Triagem (Gate).** A aberrometria de frente de onda é realizada, e o paciente é classificado como O+, O~ ou O−. Os pacientes classificados como O− são aconselhados sobre intervenções alternativas. Os pacientes classificados como O+ ou O~ avançam para o Passo 2.

**Passo 2: Módulo T — Localização.** Avaliam-se a tomografia tangencial anterior e a tomografia de elevação posterior. O cone é classificado em um de cinco arquétipos morfológicos. O azimute do ENM é determinado a partir do mapa de diferença BFS posterior (ou a partir de um modelo de FEM personalizado do paciente, se disponível). Registra-se a discordância entre o ENM e o $K_{steep}$. Se a discordância exceder 15°, o ENM é designado como o eixo de referência para o posicionamento do anel.

**Passo 3: Módulo B — Prescrição.** A intenção clínica é decomposta em objetivos de aplanamento, regularização e reposicionamento. Cada objetivo é mapeado para o vetor correspondente ($V_R$, $V_T$, $V_\tau$) e, a partir deste, para o parâmetro de controle do anel (espessura, comprimento do arco, assimetria). Aplica-se a correção paquimétrica ao $V_R$. A prescrição final do anel especifica: tipo de segmento (único ou duplo), espessura (por lado), varredura do arco (por lado) e meridiano de implante (referenciado ao ENM).

### 5.5.2 Fluxos de Caso Ilustrativos

**Caso 1: O+ / Oval Central / Dominante em Aplanamento.**
Um homem de 28 anos apresenta ceratocone estágio II (Amsler–Krumeich), $K_{max}$ de 49.5 D, RMS de coma de 1.9 μm, $\Delta$ Eixo de 8°, RMS de HOA total de 1.7 μm. A topografia mostra um cone oval central; ENM e $K_{steep}$ são concordantes em 272°. O objetivo primário é o aplanamento (alvo $\Delta K = -3.0$ D). O Módulo B prescreve: segmentos duplos simétricos, espessura de 250 μm, varredura de arco de 160° por segmento (para alcançar uma regularização moderada de $V_T$), posicionados em 272° $\pm$ 80°. A paquimetria central é de 478 μm; nenhuma correção paquimétrica é aplicada (dentro de 3% do valor de referência). $V_\tau = 0$ por design.

**Caso 2: O~ / Mamilo Inferior / Dominante em Reposicionamento.**
Uma mulher de 34 anos apresenta ceratocone estágio III, $K_{max}$ de 56.2 D, RMS de coma de 3.1 μm, $\Delta$ Eixo de 12°, RMS de HOA total de 3.4 μm. A classificação óptica é O~ (coma na faixa Intermediária). A topografia revela um cone em mamilo inferior na posição de 6 horas; o ENM é de 258°, o $K_{steep}$ é de 276° — uma discordância de 18°. O objetivo primário é o reposicionamento do ápice do cone superiormente (em direção ao eixo visual) com aplanamento secundário. O Módulo B prescreve: segmentos duplos assimétricos referenciados ao ENM de 258°, segmento inferior de 300 μm / segmento superior de 200 μm (média de 250 μm para manter $V_R$ adequado), varredura do arco de 210° inferiormente / 120° superiormente ($V_T$ diferencial para aprimorar a regularização assimétrica). A assimetria ativa o $V_\tau$, conduzindo o ápice superiormente. A paquimetria é de 445 μm; o $V_R$ é corrigido para cima pelo fator 465/445 = 1.045.

**Caso 3: O− / Globo (Globus) / Desviado.**
Um homem de 41 anos apresenta ceratocone avançado, $K_{max}$ de 64.8 D, RMS de coma de 4.2 μm, $\Delta$ Eixo de 35°, RMS de HOA total de 5.8 μm. Todos os três critérios ópticos enquadram-se na coluna Desfavorável; a classificação é O−. Apesar da gravidade dos achados topográficos (morfologia em globo), o protocolo da AVBC desvia este paciente do implante de ICRS. A via recomendada é o transplante lamelar anterior profundo (DALK) com posterior reavaliação. O Módulo T e o Módulo B não são avaliados formalmente, embora o arquétipo topográfico seja registrado para fins de documentação.

### 5.5.3 Documentação e Auditoria

O protocolo da AVBC exige que as classificações O, T e B sejam registradas em um formato padronizado:

> **Perfil AVBC:** O+ | T: Crescente Paracentral, ENM 245° ($\Delta K_{steep}$ 18°) | B: $V_R$ 250 μm bilateral, $V_T$ arco 160° bilateral, $V_\tau = 0$

Esta notação fornece um registro compacto e auditável que pode ser utilizado para análises retrospectivas de resultados, comunicação entre cirurgiões e garantia de qualidade. À medida que bancos de dados institucionais acumulam perfis AVBC associados a resultados pós-operatórios, modelos de aprendizado de máquina podem ser treinados para refinar os limiares de classificação e as regras de decisão apresentadas neste capítulo — um tópico abordado no Capítulo 12.

---

## 5.6 Resumo

Este capítulo introduziu o modelo trimodal O-T-B que estrutura a avaliação clínica de candidatos a ICRS em três domínios sequenciais. O Módulo O filtra o processo avaliando se o perfil de aberração óptica do paciente é suscetível à correção baseada em curvatura, classificando os pacientes como O+, O~ ou O− com base no RMS de coma, na discordância de eixo e no RMS de aberração de alta ordem total. O Módulo T localiza a ectasia ao classificar o cone em um de cinco arquétipos morfológicos e introduzir o Eixo Neutro Mecânico (ENM), o meridiano de deslocamento posterior máximo, que diverge do eixo ceratométrico mais curvo ($K_{steep}$) em aproximadamente 40% dos casos. O Módulo B traduz a intenção clínica em uma prescrição biomecânica, mapeando os objetivos de aplanamento, regularização e reposicionamento para o vetor de deslocamento radial $V_R$, o vetor de tensão tangencial $V_T$ e o proxy torsional $V_\tau$, cada um dos quais é controlado por um parâmetro distinto do anel: espessura, comprimento de arco e assimetria esquerda-direita, respectivamente.

A ortogonalidade de $V_R$ e $V_T$ em relação aos seus parâmetros de controle — demonstrada pela varredura paramétrica de elementos finitos, na qual o comprimento de arco deixou o $V_R$ essencialmente inalterado enquanto reduzia monotonicamente o $V_T$ — é a base matemática sobre a qual se apoia o modelo da AVBC. É essa ortogonalidade que permite ao cirurgião titular o aplanamento e a regularização de forma independente, transformando o planejamento do ICRS de uma arte empírica em uma disciplina de engenharia fundamentada em princípios científicos.

---

## Referências

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg.* 2006;22(6):539–545.

2. Burris TE, Ayer CT, Evensen DA, Davenport JM. Effects of intrastromal corneal ring size and thickness on corneal flattening in human eyes. *J Cataract Refract Surg.* 1998;24(7):1019–1024.

3. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast.* 2000;61(1):1–48.

4. Piñero DP, Alió JL, Teus MA, Barraquer RI, Michael R, Jiménez R. Modification and refinement of the corneal asphericity and wavefront aberration profile after intrastromal corneal ring segment implantation in keratoconus. *J Cataract Refract Surg.* 2010;36(9):1562–1572.

5. Piñero DP, Alió JL, El Kady B, et al. Refractive and aberrometric outcomes of intracorneal ring segments for keratoconus: mechanical versus femtosecond-assisted procedures. *Ophthalmology.* 2009;116(9):1675–1687.

6. Rabinowitz YS, McDonnell PJ. Computer-assisted corneal topography in keratoconus. *Refract Corneal Surg.* 1989;5(6):400–408.

7. Vega-Estrada A, Alió JL, Brenner LF, Burguera N. Outcomes of intrastromal corneal ring segments for treatment of keratoconus: five-year follow-up analysis. *J Cataract Refract Surg.* 2013;39(8):1234–1240.

8. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol.* 2006;5(4):237–246.

9. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci.* 2013;54(1):881–889.

10. Lago MA, Rupérez MJ, Monserrat C, et al. Patient-specific simulation of the intrastromal ring segment implantation in corneas with keratoconus. *J Mech Behav Biomed Mater.* 2015;51:260–268.

11. Peris-Martínez C, Díez-Ajenjo MA, García-Domene MC, et al. Evaluation of intraocular pressure and other biomechanical parameters to distinguish between subclinical keratoconus and healthy corneas. *J Clin Med.* 2021;10(9):1905.

12. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg.* 2014;40(6):991–998.
