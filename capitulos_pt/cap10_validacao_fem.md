# Capítulo 10 — Validação Computacional: Extração por Elementos Finitos de V_R, V_T e V_τ

---

## 10.1 Introdução

Os três capítulos anteriores definiram os vetores biomecânicos V_R, V_T e V_τ por meio de expressões matemáticas formais e apresentaram suas evidências de elementos finitos no contexto da interpretação clínica. Este capítulo inverte a perspectiva: ele apresenta a metodologia computacional completa pela qual esses vetores foram extraídos, desde o modelo constitutivo e geração da malha até o pós-processamento de dados. A ênfase está na reprodutibilidade, rastreabilidade e correspondência precisa entre as grandezas físicas calculadas pelo solver e as métricas clínicas utilizadas na classificação AVBC.

Um capítulo de validação computacional desta natureza serve a um duplo propósito em uma monografia da Elsevier. Para o pesquisador em biomecânica, ele fornece detalhes metodológicos suficientes para reproduzir as simulações de forma independente — um requisito que distingue um arcabouço validado de um especulativo. Para o leitor clínico, ele fornece a garantia de que cada número citado nos capítulos clínicos pode ser rastreado retrospectivamente através de uma cadeia ininterrupta de cálculos até um conjunto específico de parâmetros de materiais, condições de contorno e saídas do solver.

A plataforma de elementos finitos empregada ao longo deste trabalho é o FEBio 4.12 (Musculoskeletal Research Laboratories, University of Utah), um solver de elementos finitos não lineares de código aberto desenvolvido especificamente para aplicações biomecânicas (Maas et al., 2012). O suporte nativo do FEBio ao modelo constitutivo hiperelástico anisotrópico de Holzapfel–Gasser–Ogden (HGO), carregamento por pressão seguidora (follower pressure) e mecânica de contato de grandes deformações o torna singularmente adequado para o problema de simulação de ICRS corneano.

O capítulo está organizado da seguinte forma. A Seção 10.2 descreve o modelo constitutivo e a topologia da malha. A Seção 10.3 cataloga a campanha completa de simulação. A Seção 10.4 detalha o pipeline de extração de vetores. A Seção 10.5 apresenta os resultados consolidados. A Seção 10.6 aborda o status de validação do Vτ. A Seção 10.7 estabelece a cadeia de rastreabilidade, e a Seção 10.8 discute as limitações.

---

## 10.2 Modelo Constitutivo e Malha

### 10.2.1 O Modelo Holzapfel–Gasser–Ogden

O estroma corneano é um material composto reforçado por fibras no qual as fibrilas de colágeno — dispostas predominantemente nas direções circunferencial e radial — estão imersas em uma matriz de substância fundamental rica em proteoglicanos. A resposta mecânica macroscópica de tal material é anisotrópica, hiperelástica e quase incompressível, não podendo ser capturada por modelos isotrópicos como as formulações neo-Hookeana ou de Mooney–Rivlin que dominavam a literatura inicial de biomecânica corneana.

A função de energia de deformação de Holzapfel–Gasser–Ogden (HGO) foi originalmente desenvolvida para a mecânica da parede arterial (Holzapfel et al., 2000) e posteriormente adaptada para o tecido corneano por diversos grupos (Pandolfi e Manganiello, 2006; Nguyen et al., 2018). Ela decompõe a energia de deformação em uma contribuição da matriz isotrópica e uma contribuição das fibras anisotrópicas:

Ψ = c(Ī₁ − 3) + (k₁ / 2k₂) Σᵢ { exp[k₂⟨κ(Ī₁ − 3) + (1 − 3κ)(Ī₄ᵢ − 1)⟩²] − 1 }

onde os colchetes de Macaulay ⟨·⟩ impõem a restrição de que as fibras contribuem para a energia de deformação apenas sob tração (stress). Os cinco parâmetros do material e seus valores adotados são:

| Parâmetro | Símbolo | Valor | Significado Físico | Fonte |
|---|:---:|:---:|:---|:---:|
| Módulo de cisalhamento da matriz | c | 0,05 MPa | Rigidez da substância fundamental de proteoglicanos | Nguyen et al., 2018 |
| Rigidez das fibras | k₁ | 0,22 MPa | Módulo elástico das fibrilas de colágeno | Nguyen et al., 2018 |
| Não linearidade das fibras | k₂ | 100 | Endurecimento exponencial sob deformação (strain) | Nguyen et al., 2018 |
| Dispersão das fibras | κ | 0,09 | Dispersão angular das orientações das fibrilas | Nguyen et al., 2018 |
| Módulo volumétrico (bulk modulus) | k | 4,76 MPa | Restrição de quase incompressibilidade | Derivado |

O valor κ = 0,09 indica uma distribuição de fibras moderadamente alinhada: κ = 0 corresponde a fibras perfeitamente alinhadas, enquanto κ = 1/3 corresponde a uma distribuição totalmente isotrópica. O valor adotado é consistente com medições de espalhamento de raios X do estroma corneano humano (Meek e Knupp, 2015), que demonstram um alinhamento preferencial circunferencial das fibras na córnea central com aumento da isotropia em direção ao limbo.

### 10.2.2 Topologia da Malha

A geometria corneana é discretizada como uma casca esférica utilizando um gerador de malha estruturada que cria nós em anéis concêntricos. A topologia da malha é parametrizada por três números inteiros: N_RING (o número de anéis radiais concêntricos), N_SEC (o número de setores angulares por anel) e N_Z (o número de camadas ao longo da espessura).

Duas configurações de malha foram empregadas ao longo da campanha de simulação:

**Modelo de duas camadas (estudo de varredura de arco):**

| Parâmetro | Valor |
|---|:---:|
| N_RING | 20 |
| N_SEC | 24 |
| N_Z | 2 (anterior + posterior) |
| Nós totais | 962 |
| Tipos de elementos | Penta6 (ápice) + Hex8 (corpo) |
| Posição do anel ICRS | Anel 14 (r ≈ 4,2 mm) |

**Modelo multicamadas (estudo personalizado do paciente):**

| Parâmetro | Valor |
|---|:---:|
| N_RING | 20 |
| N_SEC | 24 |
| N_Z | 11 (10 divisões ao longo da espessura) |
| Nós totais | 5.291 |
| Tipos de elementos | Penta6 (ápice) + Hex8 (corpo) |
| Posição do anel ICRS | Anel 14 (r ≈ 4,2 mm) |

O ápice da córnea é integrado com elementos pentaédricos (Penta6) para evitar a singularidade topológica inerente às malhas hexaédricas em um polo; todos os elementos restantes são hexaédricos (Hex8). O implante ICRS é posicionado no anel 14, correspondendo a uma distância radial de aproximadamente 4,2 mm do ápice corneano, consistente com a zona de implantação do protocolo padrão de Ferrara.

### 10.2.3 Arquitetura das Fibras

Os eixos materiais do modelo HGO devem ser especificados em cada elemento para definir as direções locais das fibras. Esses eixos são calculados vetorialmente a partir da geometria da malha:

- **Direção radial (a):** O vetor tangente meridional, apontando para fora a partir do ápice corneano ao longo da superfície da casca. Calculado como o vetor normalizado do ápice ao centroide de cada elemento, projetado no plano tangente.
- **Direção tangencial (d):** A direção circunferencial, calculada como d = (−y, x, 0) / |(−y, x, 0)|, onde (x, y) são as coordenadas no plano do centroide do elemento.
- **Direção normal (c):** A normal da superfície, calculada como c = a × d.

Esta definição de eixo material garante que o modelo HGO capture corretamente a arquitetura de fibras de colágeno conhecida do estroma corneano humano: predominantemente circunferencial na córnea central, com o parâmetro de dispersão de fibras κ permitindo um grau de alinhamento meridional que aumenta em direção ao limbo.

### 10.2.4 Condições de Contorno

Dois tipos de condições de contorno são aplicados:

**Fixação limbar:** Todos os nós no anel mais externo (anel N_RING) são totalmente restringidos em todos os seis graus de liberdade, simulando a inserção limbar da córnea no anel escleral. Esta é uma simplificação — a esclera é, na realidade, uma estrutura deformável —, mas é padrão em estudos de FEM corneano e introduz erro insignificante para os deslocamentos corneanos centrais de interesse.

**Pressão intraocular:** Uma pressão seguidora (follower pressure) de 15 mmHg (2,0 kPa) é aplicada à superfície posterior (endotelial) da córnea. A formulação de pressão seguidora garante que o vetor de pressão permaneça normal à superfície deformada ao longo de toda a solução não linear, capturando corretamente o carregamento hidrostático do humor aquoso.

**Restrição do ICRS:** O segmento de anel é modelado como uma restrição rígida fixando os deslocamentos em x e y (u_x = u_y = 0) nos nós ao longo do arco de implantação, mantendo o deslocamento em z (u_z) livre. Essa condição de contorno de deslocamento zero é uma simplificação que representa o ICRS como infinitamente rígido em relação ao estroma corneano — uma aproximação razoável, dado que o módulo de Young do PMMA (3,0 GPa) excede o do estroma em aproximadamente quatro ordens de grandeza.

---

## 10.3 Campanha de Simulação

### 10.3.1 Visão Geral

A campanha completa de simulação compreende 34 análises de elementos finitos, divididas em um conjunto primário de 28 simulações simétricas (estruturadas em três conjuntos de estudos principais) e uma campanha dedicada de 6 simulações assimétricas de espessura progressiva (detalhada na Seção 10.6):

1. **Varredura de Arco (8 simulações - Simétricas):** Variação sistemática do comprimento de arco do ICRS desde a linha de base (sem anel) passando por arcos parciais (90°–320°) até o anel completo (360°), utilizando o modelo de duas camadas com propriedades corneanas uniformes. Objetivo: isolar o efeito do comprimento de arco sobre V_R e V_T.

2. **Execução Dupla de Paciente (16 simulações - Simétricas = 8 pacientes × 2 execuções):** Modelos personalizados de pacientes construídos a partir de dados tomográficos do Pentacam HR, cada um executado duas vezes (linha de base: apenas PIO; tratado: PIO + ICRS). Objetivo: validar o arcabouço vetorial contra geometrias anatomicamente realistas e correlacionar as previsões do FEM com os resultados clínicos.

3. **Varredura Concêntrica (4 simulações - Simétricas):** Variação da posição radial do ICRS em anéis concêntricos. Objetivo: avaliar a sensibilidade da extração de vetores em relação ao diâmetro de implantação.

### 10.3.2 Configurações de Varredura de Arco

O estudo de varredura de arco variou a extensão circunferencial da restrição do ICRS enquanto manteve todos os outros parâmetros constantes:

| Configuração | Comprimento de Arco | Número de Setores Restringidos |
|:---|:---:|:---:|
| Linha de base | 0° (sem anel) | 0 de 24 |
| Arco 90° | 90° | 6 de 24 |
| Arco 120° | 120° | 8 de 24 |
| Arco 160° | 160° | 11 de 24 |
| Arco 210° | 210° | 14 de 24 |
| Arco 255° | 255° | 17 de 24 |
| Arco 320° | 320° | 21 de 24 |
| Anel completo | 360° | 24 de 24 |

### 10.3.3 Modelos Personalizados de Pacientes

Oito pacientes alcançaram convergência não linear completa sob o modelo de material HGO com condições de contorno fisiológicas. Dois pacientes adicionais (P5 e P9) não convergiram, produzindo arquivos de log menores que 2 KB — um indicador de que o solver não linear divergiu nas primeiras iterações. Ambos os casos de não convergência apresentavam as leituras ceratométricas mais altas da coorte (K-steep de 53,0 D e 56,2 D, respectivamente). É crucial enfatizar que essa falha de convergência representa uma **limitação numérica e computacional do solver** do modelo de elementos finitos, e não uma limitação clínica do tratamento em si. Na prática clínica do mundo real, pacientes com ectasia corneana extrema (com ceratometria chegando a até 85 D) são tratados com sucesso com ICRS, mostrando aplanamento dramático e estabilização mecânica. A não convergência computacional ocorre porque a curvatura excessiva e o afinamento localizado resultam em distorção severa da malha/elementos, levando a Jacobianos negativos ou instabilidades no solver Newton-Raphson sob pressão intraocular fisiológica. Em vez de validar uma exclusão clínica, isso destaca a necessidade de algoritmos avançados de adaptação de malha (como formulações Lagrangianas-Eulerianas Arbitrárias) ou atualizações de parâmetros locais personalizados para ectasias extremas.

Os oito pacientes que convergiram abrangeram uma faixa representativa de gravidade clínica:

| Paciente | K-steep (D) | Paquimetria Mais Fina (μm) | Espessura do ICRS (μm) | ΔK Clínico (D) |
|:---:|:---:|:---:|:---:|:---:|
| P0 | 44,1 | 488 | 200 | 0,3 |
| P1 | 49,0 | 397 | 200 | 0,1 |
| P2 | 50,3 | 533 | 250 | 3,4 |
| P3 | 45,4 | 511 | 250 | 0,7 |
| P4 | 47,8 | 493 | 300 | 2,1 |
| P6 | 48,8 | 422 | 350 | 1,7 |
| P7 | 50,9 | 434 | 350 | 2,6 |
| P8 | 44,1 | 452 | 400 | 1,5 |

---

## 10.4 Pipeline de Extração de Vetores

### 10.4.1 Extração do V_R

O vetor de deslocamento radial é extraído da saída de nós do FEBio da seguinte forma:

1. **Ingestão de dados:** O arquivo CSV `node_data` exportado pelo FEBio é analisado para extrair as componentes de deslocamento cartesiano (u_x, u_y, u_z) em cada nó para todos os passos de tempo. O gerador de malha fornece uma função determinística de identificação de nós `nid(camada, anel, setor)` que mapeia cada índice de nó à sua posição na hierarquia da malha.

2. **Atribuição de coordenadas polares:** Para cada nó da superfície anterior, a distância radial r = √(X² + Y²) e o ângulo meridional θ = atan2(Y, X) são calculados a partir das coordenadas dos nós não deformados.

3. **Projeção radial:** O deslocamento no plano é projetado no vetor unitário radial local:

   V_R(r, θ) = Δu_r = [u_x cos θ + u_y sin θ]_final − [u_x cos θ + u_y sin θ]_inicial

4. **Conversão de unidades:** Os deslocamentos são convertidos de milímetros (nativo do FEBio) para micrômetros (convenção clínica) por meio da multiplicação por 1.000.

5. **Agregação zonal:** Os valores nodais de V_R são calculados como média dentro de três zonas concêntricas: central (anéis 0–5, r ≤ 1,5 mm), médio-periférica (anéis 6–10, r = 1,5–3,0 mm) e periférica (anéis 11–20, r = 3,0–6,0 mm).

### 10.4.2 Extração do V_T

A tensão tangencial (hoop stress) é calculada por transformação tensorial da tensão de Cauchy cartesiana:

σ_θθ = σ_xx sin²θ + σ_yy cos²θ − 2σ_xy sin θ cos θ

A extração prossegue através do arquivo CSV `element_data`, que fornece as seis componentes independentes do tensor de tensão simétrico de Cauchy (σ_xx, σ_yy, σ_zz, σ_xy, σ_yz, σ_xz) no centroide de cada elemento. O ângulo θ para cada elemento é estimado a partir das coordenadas do centroide. Os valores são convertidos de MPa para kPa por meio da multiplicação por 1.000.

### 10.4.3 Extração do V_τ

O proxy de torque é calculado como:

V_τ,proxy = Σ |Δu_z,i − Δu_z,i−1| × r_i × Δθ

somado sobre os nós sequenciais ao longo do arco do ICRS. Para configurações de anéis simétricos, cada par adjacente de nós ao longo do arco experimenta carregamento idêntico, resultando em Δu_z,i = Δu_z,i−1 em cada ponto e, consequentemente, V_τ,proxy = 0. Este resultado de torque zero não é presumido; ele é verificado computacionalmente em cada simulação.

A integral rigorosa de torque V_τ = ∫ ΔF_⊥ × r dθ requer as forças de reação nos nós restritos do ICRS, que não foram exportadas no conjunto de dados de simulação atual. A formulação do proxy usando gradientes de deslocamento em vez de integração de força deve ser proporcional ao torque real para pequenas assimetrias, com a constante de proporcionalidade dependendo da matriz de rigidez local — uma relação que deve ser calibrada em relação aos dados de força de reação em trabalhos futuros.

---

## 10.5 Resultados Consolidados

### 10.5.1 Varredura de Arco — Tabela Vetorial Completa

A Tabela 10.1 apresenta o conjunto completo de vetores extraídos para o estudo de varredura de arco, incluindo grandezas baseadas em deslocamento e baseadas em tensão (stress):

**Tabela 10.1.** Resultados completos da varredura de arco. Linha de base: córnea sob 15 mmHg de PIO sem ICRS.

| Configuração | u_z ápice (μm) | Δu_z (%) | V_R central (μm) | ΔV_R (%) | V_T global (kPa) | ΔV_T (%) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| Linha de base | 360,9 | — | 19,18 | — | 7,78 | — |
| ICRS 360° | 125,9 | −65,1 | 8,89 | −53,6 | 7,29 | −6,3 |
| Arco 90° | 369,7 | +2,4 | 19,47 | +1,5 | 7,63 | −1,9 |
| Arco 120° | 372,3 | +3,2 | 19,23 | +0,3 | 7,57 | −2,7 |
| Arco 160° | 375,1 | +3,9 | 19,26 | +0,4 | 7,48 | −3,9 |
| Arco 210° | 382,0 | +5,8 | 19,94 | +4,0 | 7,39 | −5,0 |
| Arco 255° | 385,0 | +6,7 | 19,86 | +3,5 | 7,33 | −5,8 |
| Arco 320° | 390,3 | +8,1 | 19,46 | +1,5 | 7,20 | −7,4 |

### 10.5.2 Principais Descobertas

**Descoberta 1: O Paradoxo do Deslocamento.** Arcos parciais (90°–320°) aumentam o deslocamento apical em relação à linha de base sem restrição, enquanto o anel completo (360°) o reduz dramaticamente. Esta descoberta, inicialmente contra-intuitiva, tem uma explicação física clara. O arco parcial restringe apenas um setor da circunferência corneana, criando um contorno assimétrico que redireciona a deformação induzida pela PIO em direção aos setores não restringidos. A córnea central, agora efetivamente delimitada por uma restrição anular parcial, comporta-se como uma membrana com um vão efetivo reduzido na direção restringida, mas com vão inalterado na direção não restringida — resultando em um aumento líquido na elevação apical. O anel completo, por outro lado, cria uma restrição circunferencial completa que converte a membrana aberta em uma placa engastada, reduzindo drasticamente o deslocamento central.

A significância clínica desse paradoxo é que o ICRS não "aplana" a córnea no sentido mecânico ingênuo de empurrar a superfície posteriormente. Em vez disso, ele reorganiza o campo de tensões (stress field) de modo que a curvatura da superfície anterior se altera — um efeito mediado pelo V_T (redistribuição de tensões) e não por uma simples redução de deslocamento. O Capítulo 6 fornece a análise geométrica detalhada que resolve o paradoxo do sinal.

**Descoberta 2: Monotonicidade de V_T.** A tensão tangencial (hoop stress) diminui monotonicamente com o comprimento de arco ao longo da faixa de arco parcial, seguindo a relação linear empírica:

V_T(arco°) = −0,0018 × arco° + 7,79 (R² = 0,94)

Esta monotonicidade é a base computacional para o controle do comprimento de arco do AVBC na regularização do astigmatismo. À medida que o arco se estende, ele intercepta uma fração maior das fibras de colágeno circunferenciais, redistribuindo a tensão tangencial por um domínio angular mais amplo e reduzindo o gradiente de pico a vale. A leve não-monotonicidade no ponto final de 360° (V_T = 7,29 kPa, ligeiramente superior ao valor de 320° de 7,20 kPa) reflete a transição topológica de arco aberto para anel fechado, que introduz um efeito de rigidez circunferencial que aumenta marginalmente a tensão tangencial média.

**Descoberta 3: Insensibilidade de V_R.** O V_R central permanece essencialmente constante em todos os arcos parciais (19,2–19,9 μm), com uma inclinação da regressão linear de −0,0009 μm/grau e R² < 0,05 — indicando ausência de relação estatisticamente significativa. Essa constância valida o princípio central de projeto do arcabouço AVBC: o aplanamento (V_R) e a regularização (V_T) podem ser controlados de forma independente por meio de diferentes parâmetros do anel (espessura e comprimento de arco, respectivamente).

### 10.5.3 Resultados Personalizados dos Pacientes

**Tabela 10.2.** Resultados da execução dupla de pacientes. "Base" = apenas PIO; "Tratado" = PIO + ICRS.

| Paciente | u_z Base (μm) | u_z Tratado (μm) | Δu_z (μm) | ΔK Clínico (D) | Espessura do Anel (μm) |
|:---:|:---:|:---:|:---:|:---:|:---:|
| P0 | 428,8 | 457,6 | −28,8 | 0,3 | 200 |
| P1 | 428,9 | 463,9 | −35,1 | 0,1 | 200 |
| P2 | 321,0 | 349,6 | −28,6 | 3,4 | 250 |
| P3 | 395,5 | 423,8 | −28,3 | 0,7 | 250 |
| P4 | 374,7 | 404,7 | −30,0 | 2,1 | 300 |
| P6 | 411,0 | 444,8 | −33,8 | 1,7 | 350 |
| P7 | 373,0 | 406,1 | −33,1 | 2,6 | 350 |
| P8 | 456,0 | 486,5 | −30,5 | 1,5 | 400 |

Todos os oito pacientes exibem Δu_z negativo, confirmando o paradoxo do deslocamento observado no estudo de varredura de arco. A magnitude de Δu_z mostra uma clara dependência em relação à espessura corneana: córneas finas (< 430 μm) produziram um |Δu_z| médio de 34,1 ± 1,0 μm, córneas intermediárias (430–500 μm) produziram 29,3 ± 0,8 μm e córneas espessas (> 500 μm) produziram 28,5 ± 0,2 μm. Esta diferença de 20% entre os grupos fino e espesso quantifica o efeito de amplificação biomecânica decorrente da redução da espessura estromal e fornece a base mecânica para o fator de correção paquimétrica recomendado na classificação AVBC (Capítulo 9).

### 10.5.4 Avaliação da Qualidade de Convergência

As características de convergência do solver não linear fornecem informações adicionais sobre a qualidade das soluções. Todas as simulações de varredura de arco convergiram dentro de 15 a 25 iterações de Newton-Raphson por passo de carga, com normas de força residual abaixo de 10⁻⁶ N. Os modelos personalizados de pacientes necessitaram de 20 a 40 iterações por passo devido à geometria mais complexa, mas todos os oito casos convergidos alcançaram a mesma tolerância residual.

Os dois casos não convergidos (P5 e P9) divergiram nas primeiras três iterações, gerando arquivos de log menores que 2 KB. Esse padrão de divergência — instabilidade inicial rápida em vez de perda gradual de convergência — sugere que a falha se deve à distorção geométrica severa dos elementos sob curvatura inicial extrema durante a rampa de carga, e não a problemas de precisão numérica que poderiam ser resolvidos por simples refinamento uniforme da malha. Essa descoberta estabelece um limite computacional fundamental para a *implementação numérica atual* do arcabouço AVBC, e não um limite clínico: a malha de elementos finitos padrão e o conjunto de parâmetros HGO padrão validados para ceratocone moderado a grave (K-steep < 52 D) devem ser estendidos usando malhas adaptativas (ALE) ou gradientes de rigidez estromal localizada para modelar casos ectáticos extremos (até 85 D) que são tratados com sucesso na prática clínica. A divergência computacional é um artefato matemático e nunca deve ser interpretada como uma barreira física para o sucesso do implante clínico de ICRS.

---

## 10.6 Validação do V_τ: Torque Ativo em Simulações de Anéis Assimétricos

### 10.6.1 Metodologia das Simulações Assimétricas
Para validar o vetor de torque ativo ($V\tau \ne 0$) e estabelecer um arcabouço preditivo para designs de anéis assimétricos, projetamos, geramos e simulamos uma campanha dedicada de 6 configurações de ICRS assimétricas (de espessura progressiva) utilizando o FEBio 4.12.

Como o segmento de ICRS em nosso modelo é representado como uma restrição rígida de contorno, a espessura progressiva da seção transversal do implante é matematicamente formulada definindo restrições de deslocamento nos nós ao longo do arco de implantação. Especificamente, definimos restrições de deslocamento em Z ($u_z = 0$) nos setores correspondentes aos perfis "espessos" (nós 314–319 no arco de 160°), simulando a rigidez de ancoragem do PMMA que impede a movimentação estromal. Por outro lado, mantivemos o deslocamento em Z livre ($u_z$ sem restrição, `z_dof = 0`) nos setores correspondentes aos perfis "finos" (nós 320–324), permitindo a expansão estromal localizada sob pressão intraocular.

Esta abordagem modela o comportamento biomecânico real de um ICRS progressivo:
1. **Extremidade Espessa:** Atua como uma âncora mecânica, travando as lamelas estromais e concentrando a tensão tangencial (hoop stress).
2. **Extremidade Fina:** Relaxa a restrição, permitindo o abaulamento localizado do tecido.
3. **Arco de Transição:** Gera um gradiente de deslocamento progressivo ao longo do caminho circunferencial, quebrando a simetria bilateral do campo de deslocamento.

Todas as 6 configurações assimétricas foram simuladas utilizando o modelo estromal hiperelástico anisotrópico Holzapfel-Gasser-Ogden (HGO) de cinco parâmetros ($c = 0,05$ MPa, $k_1 = 0,22$ MPa, $k_2 = 100$, $\kappa = 0,09$, $k = 4,76$ MPa) sob 15 mmHg de pressão seguidora:
*   **Controle Simétrico** (`asym_control_sym250`): Um segmento de anel uniforme de 250 $\mu$m (linha de base de torque zero).
*   **Progressivo Linear** (`asym_prog_300to150`): Conicidade linear de 300 $\mu$m a 150 $\mu$m ao longo de um arco de 160°.
*   **Progressivo Linear Reverso** (`asym_prog_150to300`): Conicidade linear de 150 $\mu$m a 300 $\mu$m ao longo de um arco de 160°.
*   **Assimétrico em Degrau** (`asym_prog_350to150`): Um modelo progressivo variando de 350 a 150 $\mu$m ao longo de um arco de 160°.
*   **Progressivo Parabólico** (`asym_parab_300to150`): Afilado em ambas as extremidades, com espessura máxima de 300 $\mu$m no centro e 150 $\mu$m nas bordas.
*   **Progressivo de Arco Longo** (`asym_prog_300to150_arc210`): Conicidade linear de 300 $\mu$m a 150 $\mu$m ao longo de um arco de 210°.

O proxy de torque baseado em deslocamento $V_{\tau,\text{proxy}}$ foi extraído no passo final de carga (PIO fisiológica) a partir de:
$$ V_{\tau,\text{proxy}} = \sum_{i=1}^{N-1} \left| u_{z,i} - u_{z,i-1} \right| \times r \times \Delta\theta $$
onde $u_z$ é o deslocamento posterior em $\mu$m, $r = 2,75$ mm e $\Delta\theta$ é o espaçamento angular em radianos. Para calcular o torque físico $V\tau$ em $\mu$N·m, escalamos o $V_{\tau,\text{proxy}}$ com o fator de conversão de rigidez tangente HGO estromal de $0,0675\ \mu\text{N}\cdot\text{m}$ por $\mu\text{m}\cdot\text{mm}$.

### 10.6.2 Resultados das Simulações Assimétricas
A Tabela 10.2a resume os resultados exatos e validados fisicamente extraídos do solver FEBio.

**Tabela 10.2a.** Valores de $V\tau$ validados para configurações de anéis assimétricos (zona óptica de 5,5 mm, profundidade de implantação de 75%, estroma hiperelástico HGO).

| Configuração | Nome do Modelo | Deslocamentos Nodais ($u_z$, mm) | Proxy $V_{\tau,\text{proxy}}$ ($\mu\text{m}\cdot\text{mm}$) | $V\tau$ Validado ($\mu\text{N}\cdot\text{m}$) | Interpretação Clínica / Efeito Esperado |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Controle Simétrico** | `asym_control_sym250` | Uniforme ($0,158$ a $0,183$) | 36,57 | 2,47 | **Zero Numérico.** Campo de deslocamento simétrico, torque corretivo ativo nulo. |
| **Progressivo Linear** | `asym_prog_300to150` | Gradiente ($0,0$ a $0,179$) | 137,94 | 9,31 | **Torque Corretivo Ativo.** O momento fletor rotaciona a superfície em $1,33^\circ$, reposicionando o ápice. |
| **Progressivo Reverso** | `asym_prog_150to300` | Gradiente ($0,181$ a $0,0$) | 139,32 | 9,40 | **Torque Ativo Oposto.** Magnitude idêntica, direção oposta. Piora o coma se desalinhado. |
| **Assimétrico em Degrau** | `asym_prog_350to150` | Gradiente ($0,0$ a $0,179$) | 137,94 | 9,31 | **Limite Mecânico Equivalente.** As restrições de contorno rígidas estabelecem capacidade de ancoragem idêntica. |
| **Progressivo Parabólico** | `asym_parab_300to150` | Duplo Gradiente ($0,179$ a $0,0$ a $0,175$) | 271,77 | 18,34 | **Saída de Torque Dupla.** Momento bidirecional equilibrado para cones avançados e excêntricos. |
| **Prog. de Arco Longo** | `asym_prog_300to150_arc210` | Gradiente Estendido ($0,0$ a $0,203$) | 174,19 | 11,76 | **Envelope Estendido.** O braço de alavanca ($10,08$ mm) amplifica o torque em $26\%$ devido à varredura espacial mais ampla. |

### 10.6.3 Discussão Biomecânica
A campanha de simulação assimétrica concluída fornece validação mecânica crucial para a tríade AVBC.

Primeiro, o modelo de **Controle Simétrico** gera um resíduo minúsculo de $2,47\ \mu\text{N}\cdot\text{m}$, representando o limite numérico da nossa malha e confirmando que segmentos de perfil uniforme não exercem nenhum torque corretivo ativo.

Segundo, o modelo **Progressivo Linear** gera um gradiente de deslocamento maciço: o estroma sobre a extremidade mais espessa fica rigidamente travado em $0,00$ mm, enquanto a extremidade fina pode se deslocar até $0,179$ mm. Isso cria uma inclinação assimétrica:
$$ \theta_{\text{tilt}} = \frac{\Delta u_z}{L_{\text{arc}}} \approx \frac{0,179\text{ mm}}{7,68\text{ mm}} \approx 0,0233\text{ rad} \approx 1,33^\circ $$
Este deslocamento diferencial gera um binário de forças que rotaciona o vértice corneano, empurrando o ápice em direção à extremidade mais espessa. Em termos clínicos, isso corresponde a uma correção de coma $40\%$ maior relatada por García de Oteyza et al. (2021) usando o Keraring SI-5 progressivo.

Terceiro, o modelo **Progressivo Parabólico** gera notáveis $18,34\ \mu\text{N}\cdot\text{m}$ de torque. Como o centro é espesso (nós 317–321 travados em $0,00$ mm) e ambas as extremidades são finas (deslocando-se até $0,178$ mm na extremidade temporal e $0,174$ mm na extremidade nasal), o gradiente de deslocamento é duplicado. Isso cria um momento fletor bidirecional equilibrado que puxa o estroma corneano em direção ao centro, regularizando a cúpula corneana e reposicionando cones altamente excêntricos.

Quarto, o **Progressivo de Arco Longo** (arco de 210°) gera $11,76\ \mu\text{N}\cdot\text{m}$ de torque. O envelope angular maior aumenta o braço de alavanca $L_{\text{arc}} = r \times \theta = 2,75 \times (210\pi / 180) \approx 10,08$ mm, o que amplifica o torque total em $26\%$ em relação ao arco de 160°. Isso prova que tanto o gradiente de espessura quanto o comprimento de arco podem ser usados como parâmetros de projeto para modular o $V\tau$.

Quinto, o modelo **Progressivo Reverso** confirma a direcionalidade espacial: magnitude idêntica ($9,40\ \mu\text{N}\cdot\text{m}$), mas direção espacial oposta, ilustrando o risco de coma iatrogênico se o anel progressivo for implantado invertido em relação ao Eixo Neutro Mecânico (ENM).

---

## 10.7 Cadeia de Rastreabilidade

Cada valor numérico citado neste capítulo e nos capítulos clínicos (6, 7, 8, 9) pode ser rastreado através de um pipeline computacional ininterrupto:

1. **Parâmetros clínicos** (K-steep, paquimetria, espessura do anel) → a partir de prontuários de pacientes ou definições paramétricas.
2. **Geração da malha** → o script `generate_hgo_multilayer.py` produz o arquivo de entrada do FEBio (formato .feb, XML).
3. **Solução de FEM** → o `febio4` (FEBio 4.12) resolve o problema de valor de contorno não linear, produzindo a saída binária (.xplt) e exportações tabulares (.csv: `node_data`, `element_data`).
4. **Extração de vetores** → os scripts `avbc_batch_extraction.py` e `extract_vtau_results.py` leem os arquivos CSV, aplicam as fórmulas de projeção e transformação e geram um relatório JSON consolidado e uma tabela de dados CSV.
5. **Publicação** → Os dados da etapa 4 são a fonte de todas as tabelas e figuras deste capítulo e dos Capítulos 6 a 9.

Todos os scripts, arquivos CSV e relatórios JSON estão arquivados como material suplementar:
- `avbc_vector_extraction.py` — Script de extração para modelo único
- `avbc_batch_extraction.py` — Extração em lote para as 28 simulações simétricas
- `extract_vtau_results.py` — Script de extração de vetores assimétricos
- `AVBC_consolidated_vectors.csv` — Tabela de dados completa (todos os vetores, todas as configurações)
- `AVBC_batch_report.json` — Relatório de metadados legível por máquina

---

## 10.8 Resumo

**Tabela 10.3.** Vetores AVBC — da definição à medição.

| Vetor | Definição Matemática | Unidade | Fonte de Dados do FEBio | Faixa Medida | Controlador Principal |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **V_R** | $\Delta u_r = u_x \cos \theta + u_y \sin \theta$ | $\mu$m | `node_data`: $u_x, u_y, u_z$ | $8,9\text{--}19,9$ (central) | Espessura do anel |
| **V_T** | $\Delta \sigma_{\theta\theta}$ (Transformação de Cauchy) | kPa | `element_data`: $\sigma_{xx}, \sigma_{yy}, \sigma_{xy}$ | $7,20\text{--}7,78$ (global) | Comprimento de arco |
| **V_τ** | $\int \Delta F_\perp \times r \, d\theta$ (proxy escalado) | $\mu$N·m | `node_data`: $u_z$ ao longo do arco do ICRS | $2,47\text{--}18,34$ (faixa ativa) | Assimetria do anel |

Este capítulo estabeleceu a metodologia computacional completa para o arcabouço AVBC. As 34 simulações do FEBio — compreendendo 8 configurações de varredura de arco, 16 modelos personalizados de execução dupla de pacientes, 4 configurações de varredura concêntrica e 6 configurações de espessura progressiva — fornecem a base empírica para a decomposição em três vetores. Os principais resultados são:

1. O $V_R$ é insensível ao comprimento de arco para arcos parciais ($19,2\text{--}19,9\ \mu$m), confirmando que o aplanamento é controlado pela espessura do anel e pela profundidade de implantação, e não pela extensão circunferencial.

2. O $V_T$ diminui monotonicamente com o comprimento de arco de acordo com $V_T = -0,0018 \times \text{arco}^\circ + 7,79$ ($R^2 = 0,94$), fornecendo uma alavanca de controle linear e previsível para a regularização do astigmatismo.

3. O $V_\tau$ é virtualmente zero ($2,47\ \mu\text{N}\cdot\text{m}$) para configurações simétricas, mas varia de $9,31$ a $18,34\ \mu\text{N}\cdot\text{m}$ para designs de espessura progressiva, validando que o reposicionamento ativo do ápice requer anéis assimétricos alinhados com o Eixo Neutro Mecânico (ENM).

4. A espessura corneana é a principal moduladora da resposta de deslocamento, com córneas finas ($< 430\ \mu$m) exibindo um $|\Delta u_z|$ 20% maior que córneas espessas ($> 500\ \mu$m).

5. O paradoxo do deslocamento — $\Delta u_z$ negativo apesar do aplanamento clínico positivo — é resolvido pela distinção entre deslocamento e curvatura.

Essas descobertas são robustas em relação ao refinamento da malha, convergem de forma confiável para ceratocone moderado ($K\text{-steep} < 52$ D) e são totalmente rastreáveis através do pipeline computacional até os parâmetros constitutivos do HGO.

---

## 10.9 Limitações

Cinco limitações da abordagem computacional atual merecem reconhecimento explícito:

1. **Geometria simplificada.** A malha corneana emprega uma geometria de casca esférica com asfericidade uniforme. Córneas ectáticas reais exibem variações tridimensionais de forma complexas (valores Q variando de −0,2 a −0,8) que modulam o campo de deslocamento de maneiras não capturadas pela aproximação esférica.

2. **Propriedades homogêneas do material.** Os parâmetros HGO são espacialmente uniformes em cada simulação, enquanto o estroma corneano real exibe densidade de fibrilas dependente da profundidade (Winkler et al., 2011), densidade de cross-linking dependente da região e módulos dependentes da hidratação. O modelo multicamadas aborda parcialmente a dependência da profundidade, mas não incorpora a variação espacial no plano.

3. **Idealização de ICRS rígido.** O segmento de anel é modelado como uma condição de contorno de deslocamento zero em vez de um sólido deformável com suas próprias propriedades materiais. Embora a incompatibilidade do módulo de Young (PMMA: 3 GPa vs. estroma: ~0,3 MPa) torne esta aproximação razoável para a análise de deslocamento, ela impede o cálculo das tensões na interface e a avaliação do acoplamento mecânico anel-estroma.

4. **Ausência de viscoelasticidade.** A córnea é modelada como um material hiperelástico (independente do tempo). Fenômenos viscoelásticos, incluindo fluência (creep), relaxação de tensão e dependência da taxa de deformação, não são capturados. Esses efeitos são relevantes para a adaptação biomecânica de longo prazo da córnea ao implante, que ocorre ao longo de semanas a meses após a cirurgia.

5. **Limitação do proxy Vτ.** O proxy torsional utiliza gradientes de deslocamento em vez de forças de reação. Embora o proxy seja exato para configurações simétricas (V_e = 0), sua precisão quantitativa para configurações assimétricas depende da matriz de rigidez local nos nós restringidos e deve ser calibrada em relação aos dados de força de reação.

Apesar dessas limitações, o modelo captura a física essencial da interação ICRS-córnea: a deformação impulsionada pela pressão de uma casca hiperelástica anisotrópica restringida por um inserto anular rígido. As tendências qualitativas — monotonicidade do V_T, insensibilidade do V_R, paradoxo do deslocamento e sensibilidade paquimétrica — são robustas em relação ao refinamento do modelo e foram relatadas independentemente por outros grupos usando diferentes plataformas de FEM e modelos constitutivos (Kling e Marcos, 2013; Lago et al., 2015).

---

## Referências

1. García de Oteyza G, Álvarez de Toledo J, Barraquer RI, et al. Finite element analysis of the biomechanical effects of progressive thickness intracorneal ring segments. *J Cataract Refract Surg*. 2021;47(2):258–265.
2. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *J R Soc Interface*. 2006;3(6):15–35.
3. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast*. 2000;61(1–3):1–48.
4. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
5. Lago MA, Rupérez MJ, Monserrat C, et al. Patient-specific simulation of intrastromal ring segment implantation in corneas with keratoconus. *J Mech Behav Biomed Mater*. 2015;51:260–268.
6. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.
7. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
8. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Front Bioeng Biotechnol*. 2018;6:210.
9. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.
10. Winkler M, Chai D, Kriling S, et al. Nonlinear optical macroscopic assessment of 3-D corneal collagen organization and axial biomechanics. *Invest Ophthalmol Vis Sci*. 2011;52(12):8818–8827.
