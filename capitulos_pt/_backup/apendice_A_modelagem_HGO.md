# Apêndice A — Modelo Constitutivo HGO: Derivação e Parâmetros

> **Análise Vetorial Biomecânica Corneana para o Planejamento de Segmento de Anel Intraestromal**
> *Parte V — Horizontes*

---

## A.1 Fundamentação Física e Anisotropia Corneana

A resposta mecânica do estroma corneano não pode ser descrita adequadamente por modelos de elasticidade linear clássica ou modelos hiperelásticos isotrópicos (como as formulações neo-Hookeana ou de Mooney-Rivlin). Sob a perspectiva da microestrutura, o estroma é um material composto altamente ordenado e reforçado por fibras. Ele é composto por cerca de 200 a 250 lamelas empilhadas ao longo da espessura, nas quais fibrilas de colágeno de diâmetro uniforme (~30 nm) e espaçamento regular estão imersas em uma matriz hidratada de proteoglicanos e glicosaminoglicanos (a substância fundamental).

Do ponto de vista mecânico, isso resulta em:
1. **Hiperelasticidade não linear:** O tecido exibe endurecimento exponencial sob deformação (strain-stiffening), decorrente do estiramento progressivo e do alinhamento das fibrilas de colágeno que inicialmente se encontram em estado ondulado (crimped).
2. **Anisotropia marcada:** A resistência à tração ao longo das direções das fibrilas é de duas a três ordens de grandeza superior à resistência da matriz ou à resistência ao cisalhamento interlamear. Medições de espalhamento de raios X de ângulo pequeno (SAXS) demonstram que as fibras possuem orientações preferenciais, organizando-se predominantemente nos meridianos ortogonais (temporal-nasal e superior-inferior) na córnea central, e assumindo uma distribuição anular circunferencial na periferia próxima ao limbo para formar o anel escleral de suporte.
3. **Quase incompressibilidade:** Devido ao seu alto teor de água (~78%), a córnea resiste fortemente a variações volumétricas sob pressões fisiológicas, comportando-se com um coeficiente de Poisson efetivo muito próximo a 0,5.

Para capturar essa complexidade física de maneira quantitativa nas simulações de elementos finitos apresentadas ao longo desta monografia, empregou-se a formulação constitutiva hiperelástica anisotrópica de **Holzapfel-Gasser-Ogden (HGO)**, originalmente proposta por Holzapfel, Gasser e Ogden (2000) para paredes arteriais e adaptada com sucesso para a córnea por Pandolfi e Manganiello (2006) e Nguyen et al. (2018).

---

## A.2 Cinemática de Grandes Deformações

Consideremos a deformação do estroma corneano de uma configuração de referência não deformada $\Omega_0$ para uma configuração atual deformada $\Omega$. Um ponto material na posição inicial $\mathbf{X} \in \Omega_0$ é mapeado para a sua posição atual $\mathbf{x} \in \Omega$ por meio do mapeamento de deformação $\mathbf{x} = \boldsymbol{\chi}(\mathbf{X}, t)$.

### A.2.1 Gradiente de Deformação e Decomposição Volumétrica

O operador cinemático fundamental é o gradiente de deformação $\mathbf{F}$, definido como:
$$\mathbf{F} = \frac{\partial \mathbf{x}}{\partial \mathbf{X}}$$

Para tratar numericamente a quase incompressibilidade sem incorrer no fenômeno de travamento volumétrico (volumetric locking) na malha de elementos finitos, o gradiente de deformação é decomposto de forma multiplicativa em suas componentes volumétrica (dilatacional) e isocórica (distorcional ou preservadora de volume):
$$\mathbf{F} = \left( J^{1/3} \mathbf{I} \right) \bar{\mathbf{F}} \quad \Rightarrow \quad \bar{\mathbf{F}} = J^{-1/3} \mathbf{F}$$
onde $J = \det(\mathbf{F}) > 0$ representa a razão de mudança volumétrica ($J = \mathrm{d}v / \mathrm{d}V$), $\mathbf{I}$ é o tensor identidade de segunda ordem, e $\bar{\mathbf{F}}$ é o gradiente de deformação isocórico modificado ($\det\bar{\mathbf{F}} = 1$).

### A.2.2 Tensores de Deformação e Invariantes

O tensor de deformação direito de Cauchy-Green $\mathbf{C}$ e sua contraparte isocórica modificada $\bar{\mathbf{C}}$ são definidos por:
$$\mathbf{C} = \mathbf{F}^T \mathbf{F}$$
$$\bar{\mathbf{C}} = \bar{\mathbf{F}}^T \bar{\mathbf{F}} = J^{-2/3} \mathbf{C}$$

O comportamento da matriz isotrópica é governado pelo primeiro invariante isocórico de deformação de Cauchy-Green direito $\bar{I}_1$:
$$\bar{I}_1 = \mathrm{tr}(\bar{\mathbf{C}})$$

Para modelar o reforço por fibras, consideremos que o estroma corneano contém duas famílias de fibras de colágeno. Na configuração de referência $\Omega_0$, as direções médias preferenciais dessas duas famílias são caracterizadas pelos vetores unitários tridimensionais $\mathbf{a}_{01}$ e $\mathbf{a}_{02}$. 

Os invariantes estruturais fundamentais $\bar{I}_{41}$ e $\bar{I}_{42}$, que representam fisicamente o quadrado do alongamento isocórico ao longo das direções das fibras, são definidos pela projeção de $\bar{\mathbf{C}}$ nas direções de referência:
$$\bar{I}_{41} = \mathbf{a}_{01} \cdot \left( \bar{\mathbf{C}} \mathbf{a}_{01} \right) = \mathrm{tr}\left( \bar{\mathbf{C}} \mathbf{A}_{01} \right)$$
$$\bar{I}_{42} = \mathbf{a}_{02} \cdot \left( \bar{\mathbf{C}} \mathbf{a}_{02} \right) = \mathrm{tr}\left( \bar{\mathbf{C}} \mathbf{A}_{02} \right)$$
onde $\mathbf{A}_{0i} = \mathbf{a}_{0i} \otimes \mathbf{a}_{0i}$ são os tensores estruturais de segunda ordem associados a cada família de fibras.

---

## A.3 Função de Densidade de Energia de Deformação ($\Psi$)

O modelo HGO postula a existência de uma função de densidade de energia de deformação hiperelástica por unidade de volume de referência, $\Psi$, decomposta aditivamente nas contribuições volumétrica e isocórica:
$$\Psi\left(J, \bar{I}_1, \bar{I}_{41}, \bar{I}_{42}\right) = \Psi_{\mathrm{vol}}(J) + \Psi_{\mathrm{iso}}\left(\bar{I}_1, \bar{I}_{41}, \bar{I}_{42}\right)$$

### A.3.1 Componente Volumétrica

A penalização volumétrica é formulada para garantir a quase incompressibilidade do tecido biológico sob pressões fisiológicas, utilizando uma função quadrática padrão em termos do módulo volumétrico (bulk modulus) $k$:
$$\Psi_{\mathrm{vol}}(J) = \frac{1}{2} k (J - 1)^2$$

À medida que a incompressibilidade perfeita é aproximada ($k \to \infty$), a variação volumétrica tende a zero ($J \to 1$). Nas simulações com o FEBio, o valor de $k$ é escolhido de forma a ser grande o suficiente para impor a restrição mecânica sem causar instabilidades numéricas no condicionamento da matriz de rigidez global.

### A.3.2 Componente Isocórica e Dispersão de Fibras

A energia de deformação isocórica decompõe-se na resposta da matriz hidratada de proteoglicanos (isotrópica, do tipo neo-Hookeana) e na resposta não linear das lamelas de colágeno (anisotrópica):
$$\Psi_{\mathrm{iso}} = \Psi_{\mathrm{matriz}}\left(\bar{I}_1\right) + \Psi_{\mathrm{fibras}}\left(\bar{I}_1, \bar{I}_{41}, \bar{I}_{42}\right)$$

$$\Psi_{\mathrm{matriz}} = c \left(\bar{I}_1 - 3\right)$$
$$\Psi_{\mathrm{fibras}} = \frac{k_1}{2k_2} \sum_{i=1}^2 \left\{ \exp\left[ k_2 \left\langle \bar{E}_i \right\rangle^2 \right] - 1 \right\}$$

onde $c > 0$ é o módulo de cisalhamento da matriz de proteoglicanos, $k_1 > 0$ é um parâmetro com dimensão de tensão que escala a rigidez das fibras, e $k_2 > 0$ é um parâmetro adimensional associado à taxa de endurecimento exponencial das fibras sob tração. Os colchetes de Macaulay $\langle \bullet \rangle = \max(0, \bullet)$ impõem o comportamento unilateral fisicamente realista de que as lamelas de colágeno contribuem para a rigidez estromal apenas quando esticadas ($\bar{E}_i > 0$), tornando-se mecanicamente inativas sob compressão local ($\bar{E}_i \le 0$):
$$\langle \bar{E}_i \rangle = \begin{cases} \bar{E}_i & \text{se } \bar{E}_i > 0 \\ 0 & \text{se } \bar{E}_i \le 0 \end{cases}$$

O termo de deformação equivalente modificado $\bar{E}_i$, introduzido por Gasser, Ogden e Holzapfel (2006), incorpora a dispersão estrutural das fibrilas de colágeno ao redor de sua direção média:
$$\bar{E}_i = \kappa \left(\bar{I}_1 - 3\right) + (1 - 3\kappa)\left(\bar{I}_{4i} - 1\right)$$

O parâmetro $\kappa \in [0, 1/3]$ representa a dispersão tridimensional das fibras:
* $\kappa = 0$: Corresponde a fibras perfeitamente alinhadas (anisotropia transversal pura na direção $\mathbf{a}_{0i}$). O termo simplifica-se para $\bar{E}_i = \bar{I}_{4i} - 1$.
* $\kappa = 1/3$: Corresponde a uma dispersão totalmente isotrópica no espaço tridimensional. O termo de fibras torna-se proporcional a $\bar{I}_1 - 3$, fundindo-se matematicamente com a resposta neo-Hookeana da matriz.
* $0 < \kappa < 1/3$: Captura a dispersão moderada observada experimentalmente no estroma. O valor de $\kappa = 0,09$ adotado neste livro reflete um alinhamento preferencial forte, mas com dispersão física significativa ao redor do meridiano de alinhamento lamela a lamela.

---

## A.4 Tensores de Tensão Associados (Stress)

Para implementar o modelo constitutivo em um código de elementos finitos não lineares como o FEBio, é necessário derivar as relações de tensão-deformação. O tensor de tensão física de Cauchy (true stress tensor) $\boldsymbol{\sigma}$ e o segundo tensor de Piola-Kirchhoff $\mathbf{S}$ são obtidos por meio de diferenciação termodinamicamente consistente em relação aos tensores de deformação correspondentes.

### A.4.1 O Segundo Tensor de Tensão de Piola-Kirchhoff ($\mathbf{S}$)

O segundo tensor de Piola-Kirchhoff $\mathbf{S}$ é definido como o conjugado energético de trabalho do tensor de deformação de Cauchy-Green direito $\mathbf{C}$ na configuração de referência $\Omega_0$:
$$\mathbf{S} = 2 \frac{\partial \Psi}{\partial \mathbf{C}} = \mathbf{S}_{\mathrm{vol}} + \mathbf{S}_{\mathrm{iso}}$$

#### Derivação Volumétrica:
$$\mathbf{S}_{\mathrm{vol}} = 2 \frac{\partial \Psi_{\mathrm{vol}}(J)}{\partial \mathbf{C}} = 2 \frac{\mathrm{d} \Psi_{\mathrm{vol}}}{\mathrm{d} J} \frac{\partial J}{\partial \mathbf{C}}$$

Utilizando a identidade de análise tensorial $\frac{\partial J}{\partial \mathbf{C}} = \frac{1}{2} J \mathbf{C}^{-1}$:
$$\mathbf{S}_{\mathrm{vol}} = J \frac{\mathrm{d} \Psi_{\mathrm{vol}}}{\mathrm{d} J} \mathbf{C}^{-1} = k J (J - 1) \mathbf{C}^{-1}$$

#### Derivação Isocórica:
A diferenciação da parte isocórica exige a aplicação da regra da cadeia devido ao acoplamento de $\bar{\mathbf{C}} = J^{-2/3}\mathbf{C}$:
$$\mathbf{S}_{\mathrm{iso}} = 2 \frac{\partial \Psi_{\mathrm{iso}}}{\partial \mathbf{C}} = J^{-2/3} \mathbb{P} : \bar{\mathbf{S}}$$

onde $\mathbb{P}$ é o tensor de projeção de quarta ordem na configuração de referência, definido por:
$$\mathbb{P} = \mathbb{I} - \frac{1}{3} \mathbf{C} \otimes \mathbf{C}^{-1}$$
e $\bar{\mathbf{S}}$ é o segundo tensor de Piola-Kirchhoff isocórico fictício:
$$\bar{\mathbf{S}} = 2 \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{\mathbf{C}}} = 2 \left[ \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_1} \frac{\partial \bar{I}_1}{\partial \bar{\mathbf{C}}} + \sum_{i=1}^2 \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_{4i}} \frac{\partial \bar{I}_{4i}}{\partial \bar{\mathbf{C}}} \right]$$

Sabendo que $\frac{\partial \bar{I}_1}{\partial \bar{\mathbf{C}}} = \mathbf{I}$ e $\frac{\partial \bar{I}_{4i}}{\partial \bar{\mathbf{C}}} = \mathbf{a}_{0i} \otimes \mathbf{a}_{0i} = \mathbf{A}_{0i}$:
$$\bar{\mathbf{S}} = 2 \left[ \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_1} \mathbf{I} + \sum_{i=1}^2 \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_{4i}} \mathbf{A}_{0i} \right]$$

Substituindo as derivadas parciais da densidade de energia $\Psi_{\mathrm{iso}}$:
$$\frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_1} = c + k_1 \sum_{i=1}^2 \kappa \left\langle \bar{E}_i \right\rangle \exp\left[ k_2 \left\langle \bar{E}_i \right\rangle^2 \right]$$
$$\frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_{4i}} = k_1 (1 - 3\kappa) \left\langle \bar{E}_i \right\rangle \exp\left[ k_2 \left\langle \bar{E}_i \right\rangle^2 \right]$$

Obtemos a expressão completa de $\bar{\mathbf{S}}$ na configuração não deformada. A contração tensorial $\mathbb{P} : \bar{\mathbf{S}}$ realiza a remoção da componente hidrostática isocórica de $\bar{\mathbf{S}}$, garantindo que a tensão isocórica permaneça puramente desviadora na configuração espacial:
$$\mathbf{S}_{\mathrm{iso}} = J^{-2/3} \left[ \bar{\mathbf{S}} - \frac{1}{3} \left( \bar{\mathbf{S}} : \mathbf{C} \right) \mathbf{C}^{-1} \right]$$

---

### A.4.2 O Tensor de Tensão de Cauchy ($\boldsymbol{\sigma}$)

O tensor de tensão física (ou real) de Cauchy $\boldsymbol{\sigma}$, associado à configuração espacial deformada atual, é derivado a partir do mapeamento (push-forward) de $\mathbf{S}$ via gradiente de deformação $\mathbf{F}$:
$$\boldsymbol{\sigma} = J^{-1} \mathbf{F} \mathbf{S} \mathbf{F}^T = \boldsymbol{\sigma}_{\mathrm{vol}} + \boldsymbol{\sigma}_{\mathrm{iso}}$$

#### Componente Volumétrica:
$$\boldsymbol{\sigma}_{\mathrm{vol}} = J^{-1} \mathbf{F} \mathbf{S}_{\mathrm{vol}} \mathbf{F}^T = J^{-1} \mathbf{F} \left[ k J (J - 1) \mathbf{C}^{-1} \right] \mathbf{F}^T$$

Pela identidade $\mathbf{F} \mathbf{C}^{-1} \mathbf{F}^T = \mathbf{F} \left(\mathbf{F}^{-1} \mathbf{F}^{-T}\right) \mathbf{F}^T = \mathbf{I}$:
$$\boldsymbol{\sigma}_{\mathrm{vol}} = k (J - 1) \mathbf{I} = -p \mathbf{I}$$
onde $p = -k(J-1)$ representa a pressão hidrostática interna gerada pela restrição volumétrica.

#### Componente Isocórica:
A transformação isocórica mapeia-se de forma consistente para:
$$\boldsymbol{\sigma}_{\mathrm{iso}} = J^{-1} \bar{\mathbf{F}} \left[ \mathbb{P} : \bar{\mathbf{S}} \right] \bar{\mathbf{F}}^T = J^{-1} \mathrm{dev}\left( \bar{\boldsymbol{\sigma}} \right)$$

onde $\mathrm{dev}(\bullet) = (\bullet) - \frac{1}{3} \mathrm{tr}(\bullet) \mathbf{I}$ é o operador desviador espacial, e $\bar{\boldsymbol{\sigma}}$ é a tensão espacial isocórica não projetada:
$$\bar{\boldsymbol{\sigma}} = \bar{\mathbf{F}} \bar{\mathbf{S}} \bar{\mathbf{F}}^T = 2 \left[ \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_1} \bar{\mathbf{B}} + \sum_{i=1}^2 \frac{\partial \Psi_{\mathrm{iso}}}{\partial \bar{I}_{4i}} \bar{\mathbf{a}}_i \otimes \bar{\mathbf{a}}_i \right]$$

Nesta equação:
* $\bar{\mathbf{B}} = \bar{\mathbf{F}} \bar{\mathbf{F}}^T$ representa o tensor de deformação isocórico esquerdo de Cauchy-Green (também chamado de tensor de deformação de Finger modificado).
* $\bar{\mathbf{a}}_i = \bar{\mathbf{F}} \mathbf{a}_{0i}$ representa a direção espacial deformada da $i$-ésima família de fibras de colágeno, capturando dinamicamente a rotação e o estiramento físico das fibras durante o carregamento por pressão intraocular e inserção do anel.

Esta formulação de tensão espacial $\boldsymbol{\sigma}$ é resolvida iterativamente pelo FEBio no loop não linear global do método de Newton-Raphson para alcançar o equilíbrio mecânico estável da casca corneana.

---

## A.5 Significado Físico e Calibração dos Parâmetros

O modelo constitutivo HGO possui cinco parâmetros constitutivos independentes. A calibração precisa desses valores é essencial para garantir a validade preditiva do arcabouço AVBC. Os parâmetros utilizados ao longo das simulações computacionais deste livro foram rigorosamente baseados em estudos experimentais de inflação e indentação corneana reportados por Nguyen et al. (2018), com o módulo volumétrico derivado das propriedades físicas de compressão do estroma:

### 1. Módulo de Cisalhamento da Matriz ($c = 0,05$ MPa)
* **Significado físico:** Representa a elasticidade cisalhante inicial da substância fundamental amorfa, composta principalmente por água, glicosaminoglicanos (GAGs) e proteoglicanos decorina, lumican e keratocan.
* **Papel clínico:** Governa a resistência mecânica de base da córnea quando as lamelas de colágeno ainda não estão tracionadas (sob pressões muito baixas ou deformações mínimas). No ceratocone inicial, a degradação enzimática desta matriz reduz este parâmetro localmente, iniciando o afinamento e a protrusão localizada.

### 2. Rigidez da Fibrila de Colágeno ($k_1 = 0,22$ MPa)
* **Significado físico:** Escala a rigidez elástica intrínseca (módulo de elasticidade tangente) das fibrilas de colágeno quando esticadas. Como a orientação principal é ortogonal na córnea central, este valor dita o suporte de carga sob a PIO.
* **Papel clínico:** É a principal barreira mecânica à deformação sob pressão. Córneas tratadas com Crosslinking (CXL) experimentam um aumento dramático deste parâmetro (até 3 a 5 vezes) devido à criação de pontes covalentes químicas inter e intrafibrilares, estabilizando a ectasia.

### 3. Parâmetro de Não Linearidade das Fibras ($k_2 = 100$)
* **Significado físico:** Um parâmetro adimensional que controla a taxa exponencial com que as lamelas de colágeno se esticam e se enrijecem. Governa a transição geométrica da córnea do estado flácido para o estado de casca tensionada rígida.
* **Papel clínico:** Evita a deformação catastrófica sob picos agudos de pressão intraocular (por exemplo, durante o piscar de olhos ou o esfregar ocular). Garante que a córnea mantenha sua estabilidade refrativa e geométrica sob flutuações hemodinâmicas.

### 4. Dispersão das Fibras ($\kappa = 0,09$)
* **Significado físico:** Quantifica a dispersão mecânica das fibrilas ao redor da sua orientação lamela-lamela preferencial. 
 * $\kappa = 0$ representaria lamelas cristalinas e perfeitamente paralelas.
 * $\kappa = 0,09$ indica que, embora haja um alinhamento preferencial forte, há dispersão angular significativa decorrente do entrelaçamento natural e ramificação tridimensional das fibrilas estromais.
* **Papel clínico:** Modula a transição da tensão circunferencial para a tensão meridional. Um aumento localizado da dispersão ($\kappa \to 1/3$), comum em cones avançados onde as lamelas sofrem desorganização estrutural e deslizamento, torna o tecido menos anisotrópico e mecanicamente mais complacente ao cisalhamento e à protrusão.

### 5. Módulo Volumétrico ($k = 4,76$ MPa)
* **Significado físico:** Controla a resistência do estroma à compressão volumétrica hidrostática. É derivado teoricamente a partir de $k = 2c(1+\nu)/(3(1-2\nu))$ para impor um coeficiente de Poisson efetivo $\nu \approx 0,49$, representando a quase incompressibilidade imposta pela alta hidratação do estroma.
* **Papel clínico:** Nas simulações de elementos finitos do ICRS, este parâmetro impede que o estroma virtual "colapse" sobre si mesmo na zona de interface de contato direto onde a borda rígida do anel de PMMA pressiona o canal estromal, garantindo a fidelidade física na transmissão dos campos de deslocamento $V_R$ e tensão $V_T$.

---

## Referências

1. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *Journal of the Royal Society Interface*. 2006;3(6):15–35.
2. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *Journal of Elasticity*. 2000;61(1–3):1–48.
3. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Frontiers in Bioengineering and Biotechnology*. 2018;6:210.
4. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomechanics and Modeling in Mechanobiology*. 2006;5(4):237–246.
5. Meek KM, Knupp C. Corneal structure and transparency. *Progress in Retinal and Eye Research*. 2015;49:1–16.
