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

Consideremos a deformação do estroma corneano de uma configuração de referência não deformada \Omega_0 para uma configuração atual deformada \Omega. Um ponto material na posição inicial X \in \Omega_0 é mapeado para a sua posição atual x \in \Omega por meio do mapeamento de deformação x = \chi(X, t).

### A.2.1 Gradiente de Deformação e Decomposição Volumétrica

O operador cinemático fundamental é o gradiente de deformação F, definido como:
F = (∂x) / (∂X)

Para tratar numericamente a quase incompressibilidade sem incorrer no fenômeno de travamento volumétrico (volumetric locking) na malha de elementos finitos, o gradiente de deformação é decomposto de forma multiplicativa em suas componentes volumétrica (dilatacional) e isocórica (distorcional ou preservadora de volume):
F = ( J^{1/3} I ) F_bar \quad \Rightarrow \quad F_bar = J^{-1/3} F
onde J = \det(F) > 0 representa a razão de mudança volumétrica (J = dv / dV), I é o tensor identidade de segunda ordem, e F_bar é o gradiente de deformação isocórico modificado (\detF_bar = 1).

### A.2.2 Tensores de Deformação e Invariantes

O tensor de deformação direito de Cauchy-Green C e sua contraparte isocórica modificada C_bar são definidos por:
C = F^T F
C_bar = F_bar^T F_bar = J^{-2/3} C

O comportamento da matriz isotrópica é governado pelo primeiro invariante isocórico de deformação de Cauchy-Green direito I_bar_1:
I_bar_1 = tr(C_bar)

Para modelar o reforço por fibras, consideremos que o estroma corneano contém duas famílias de fibras de colágeno. Na configuração de referência \Omega_0, as direções médias preferenciais dessas duas famílias são caracterizadas pelos vetores unitários tridimensionais a_{01} e a_{02}. 

Os invariantes estruturais fundamentais I_bar_{41} e I_bar_{42}, que representam fisicamente o quadrado do alongamento isocórico ao longo das direções das fibras, são definidos pela projeção de C_bar nas direções de referência:
I_bar_{41} = a_{01} \cdot ( C_bar a_{01} ) = tr( C_bar A_{01} )
I_bar_{42} = a_{02} \cdot ( C_bar a_{02} ) = tr( C_bar A_{02} )
onde A_{0i} = a_{0i} ⊗ a_{0i} são os tensores estruturais de segunda ordem associados a cada família de fibras.

---


![Figura A.1 — Malha de elementos finitos do modelo corneano FEBio com condições de contorno.](book_figures/fig_apendice_a_malha_fem.svg)

## A.3 Função de Densidade de Energia de Deformação (Ψ)

O modelo HGO postula a existência de uma função de densidade de energia de deformação hiperelástica por unidade de volume de referência, Ψ, decomposta aditivamente nas contribuições volumétrica e isocórica:
Ψ(J, I_bar_1, I_bar_{41}, I_bar_{42}) = Ψ_{vol}(J) + Ψ_{iso}(I_bar_1, I_bar_{41}, I_bar_{42})

### A.3.1 Componente Volumétrica

A penalização volumétrica é formulada para garantir a quase incompressibilidade do tecido biológico sob pressões fisiológicas, utilizando uma função quadrática padrão em termos do módulo volumétrico (bulk modulus) k:
Ψ_{vol}(J) = (1) / (2) k (J - 1)^2

À medida que a incompressibilidade perfeita é aproximada (k \to \infty), a variação volumétrica tende a zero (J \to 1). Nas simulações com o FEBio, o valor de k é escolhido de forma a ser grande o suficiente para impor a restrição mecânica sem causar instabilidades numéricas no condicionamento da matriz de rigidez global.

### A.3.2 Componente Isocórica e Dispersão de Fibras

A energia de deformação isocórica decompõe-se na resposta da matriz hidratada de proteoglicanos (isotrópica, do tipo neo-Hookeana) e na resposta não linear das lamelas de colágeno (anisotrópica):
Ψ_{iso} = Ψ_{matriz}(I_bar_1) + Ψ_{fibras}(I_bar_1, I_bar_{41}, I_bar_{42})

Ψ_{matriz} = c (I_bar_1 - 3)
Ψ_{fibras} = (k_1) / (2k_2) Σ(i=1..2) \{ exp[ k_2 < E_bar_i >^2 ] - 1 \}

onde c > 0 é o módulo de cisalhamento da matriz de proteoglicanos, k_1 > 0 é um parâmetro com dimensão de tensão que escala a rigidez das fibras, e k_2 > 0 é um parâmetro adimensional associado à taxa de endurecimento exponencial das fibras sob tração. Os colchetes de Macaulay < • > = \max(0, •) impõem o comportamento unilateral fisicamente realista de que as lamelas de colágeno contribuem para a rigidez estromal apenas quando esticadas (E_bar_i > 0), tornando-se mecanicamente inativas sob compressão local (E_bar_i \le 0):
< E_bar_i > = \begin{cases} E_bar_i & se  E_bar_i > 0 \ 0 & se  E_bar_i \le 0 \end{cases}

O termo de deformação equivalente modificado E_bar_i, introduzido por Gasser, Ogden e Holzapfel (2006), incorpora a dispersão estrutural das fibrilas de colágeno ao redor de sua direção média:
E_bar_i = \kappa (I_bar_1 - 3) + (1 - 3\kappa)(I_bar_{4i} - 1)

O parâmetro \kappa \in [0, 1/3] representa a dispersão tridimensional das fibras:
* \kappa = 0: Corresponde a fibras perfeitamente alinhadas (anisotropia transversal pura na direção a_{0i}). O termo simplifica-se para E_bar_i = I_bar_{4i} - 1.
* \kappa = 1/3: Corresponde a uma dispersão totalmente isotrópica no espaço tridimensional. O termo de fibras torna-se proporcional a I_bar_1 - 3, fundindo-se matematicamente com a resposta neo-Hookeana da matriz.
* 0 < \kappa < 1/3: Captura a dispersão moderada observada experimentalmente no estroma. O valor de \kappa = 0,09 adotado neste livro reflete um alinhamento preferencial forte, mas com dispersão física significativa ao redor do meridiano de alinhamento lamela a lamela.

---

## A.4 Tensores de Tensão Associados (Stress)

Para implementar o modelo constitutivo em um código de elementos finitos não lineares como o FEBio, é necessário derivar as relações de tensão-deformação. O tensor de tensão física de Cauchy (true stress tensor) σ e o segundo tensor de Piola-Kirchhoff S são obtidos por meio de diferenciação termodinamicamente consistente em relação aos tensores de deformação correspondentes.

### A.4.1 O Segundo Tensor de Tensão de Piola-Kirchhoff (S)

O segundo tensor de Piola-Kirchhoff S é definido como o conjugado energético de trabalho do tensor de deformação de Cauchy-Green direito C na configuração de referência \Omega_0:
S = 2 (∂Ψ) / (∂C) = S_{vol} + S_{iso}

#### Derivação Volumétrica:
S_{vol} = 2 (∂Ψ_{vol}(J)) / (∂C) = 2 (d Ψ_{vol}) / (d) J (∂J) / (∂C)

Utilizando a identidade de análise tensorial (∂J) / (∂C) = (1) / (2) J C^{-1}:
S_{vol} = J (d Ψ_{vol}) / (d) J C^{-1} = k J (J - 1) C^{-1}

#### Derivação Isocórica:
A diferenciação da parte isocórica exige a aplicação da regra da cadeia devido ao acoplamento de C_bar = J^{-2/3}C:
S_{iso} = 2 (∂Ψ_{iso}) / (∂C) = J^{-2/3} P : S_bar

onde P é o tensor de projeção de quarta ordem na configuração de referência, definido por:
P = I - (1) / (3) C ⊗ C^{-1}
e S_bar é o segundo tensor de Piola-Kirchhoff isocórico fictício:
S_bar = 2 (∂Ψ_{iso}) / (∂C)_bar = 2 [ (∂Ψ_{iso}) / (∂I)_1_bar (∂I_bar_1) / (∂C)_bar + Σ(i=1..2) (∂Ψ_{iso}) / (∂I)_{4i_bar} (∂I_bar_{4i}) / (∂C)_bar ]

Sabendo que (∂I_bar_1) / (∂C)_bar = I e (∂I_bar_{4i}) / (∂C)_bar = a_{0i} ⊗ a_{0i} = A_{0i}:
S_bar = 2 [ (∂Ψ_{iso}) / (∂I)_1_bar I + Σ(i=1..2) (∂Ψ_{iso}) / (∂I)_{4i_bar} A_{0i} ]

Substituindo as derivadas parciais da densidade de energia Ψ_{iso}:
(∂Ψ_{iso}) / (∂I)_1_bar = c + k_1 Σ(i=1..2) \kappa < E_bar_i > exp[ k_2 < E_bar_i >^2 ]
(∂Ψ_{iso}) / (∂I)_{4i_bar} = k_1 (1 - 3\kappa) < E_bar_i > exp[ k_2 < E_bar_i >^2 ]

Obtemos a expressão completa de S_bar na configuração não deformada. A contração tensorial P : S_bar realiza a remoção da componente hidrostática isocórica de S_bar, garantindo que a tensão isocórica permaneça puramente desviadora na configuração espacial:
S_{iso} = J^{-2/3} [ S_bar - (1) / (3) ( S_bar : C ) C^{-1} ]

---

### A.4.2 O Tensor de Tensão de Cauchy (σ)

O tensor de tensão física (ou real) de Cauchy σ, associado à configuração espacial deformada atual, é derivado a partir do mapeamento (push-forward) de S via gradiente de deformação F:
σ = J^{-1} F S F^T = σ_{vol} + σ_{iso}

#### Componente Volumétrica:
σ_{vol} = J^{-1} F S_{vol} F^T = J^{-1} F [ k J (J - 1) C^{-1} ] F^T

Pela identidade F C^{-1} F^T = F (F^{-1} F^{-T}) F^T = I:
σ_{vol} = k (J - 1) I = -p I
onde p = -k(J-1) representa a pressão hidrostática interna gerada pela restrição volumétrica.

#### Componente Isocórica:
A transformação isocórica mapeia-se de forma consistente para:
σ_{iso} = J^{-1} F_bar [ P : S_bar ] F_bar^T = J^{-1} dev( σ_bar )

onde dev(•) = (•) - (1) / (3) tr(•) I é o operador desviador espacial, e σ_bar é a tensão espacial isocórica não projetada:
σ_bar = F_bar S_bar F_bar^T = 2 [ (∂Ψ_{iso}) / (∂I)_1_bar B_bar + Σ(i=1..2) (∂Ψ_{iso}) / (∂I)_{4i_bar} a_bar_i ⊗ a_bar_i ]

Nesta equação:
* B_bar = F_bar F_bar^T representa o tensor de deformação isocórico esquerdo de Cauchy-Green (também chamado de tensor de deformação de Finger modificado).
* a_bar_i = F_bar a_{0i} representa a direção espacial deformada da i-ésima família de fibras de colágeno, capturando dinamicamente a rotação e o estiramento físico das fibras durante o carregamento por pressão intraocular e inserção do anel.

Esta formulação de tensão espacial σ é resolvida iterativamente pelo FEBio no loop não linear global do método de Newton-Raphson para alcançar o equilíbrio mecânico estável da casca corneana.

---

## A.5 Significado Físico e Calibração dos Parâmetros

O modelo constitutivo HGO possui cinco parâmetros constitutivos independentes. A calibração precisa desses valores é essencial para garantir a validade preditiva do arcabouço AVBC. Os parâmetros utilizados ao longo das simulações computacionais deste livro foram rigorosamente baseados em estudos experimentais de inflação e indentação corneana reportados por Nguyen et al. (2018), com o módulo volumétrico derivado das propriedades físicas de compressão do estroma:

### 1. Módulo de Cisalhamento da Matriz (c = 0,05 MPa)
* **Significado físico:** Representa a elasticidade cisalhante inicial da substância fundamental amorfa, composta principalmente por água, glicosaminoglicanos (GAGs) e proteoglicanos decorina, lumican e keratocan.
* **Papel clínico:** Governa a resistência mecânica de base da córnea quando as lamelas de colágeno ainda não estão tracionadas (sob pressões muito baixas ou deformações mínimas). No ceratocone inicial, a degradação enzimática desta matriz reduz este parâmetro localmente, iniciando o afinamento e a protrusão localizada.

### 2. Rigidez da Fibrila de Colágeno (k_1 = 0,22 MPa)
* **Significado físico:** Escala a rigidez elástica intrínseca (módulo de elasticidade tangente) das fibrilas de colágeno quando esticadas. Como a orientação principal é ortogonal na córnea central, este valor dita o suporte de carga sob a PIO.
* **Papel clínico:** É a principal barreira mecânica à deformação sob pressão. Córneas tratadas com Crosslinking (CXL) experimentam um aumento dramático deste parâmetro (até 3 a 5 vezes) devido à criação de pontes covalentes químicas inter e intrafibrilares, estabilizando a ectasia.

### 3. Parâmetro de Não Linearidade das Fibras (k_2 = 100)
* **Significado físico:** Um parâmetro adimensional que controla a taxa exponencial com que as lamelas de colágeno se esticam e se enrijecem. Governa a transição geométrica da córnea do estado flácido para o estado de casca tensionada rígida.
* **Papel clínico:** Evita a deformação catastrófica sob picos agudos de pressão intraocular (por exemplo, durante o piscar de olhos ou o esfregar ocular). Garante que a córnea mantenha sua estabilidade refrativa e geométrica sob flutuações hemodinâmicas.

### 4. Dispersão das Fibras (\kappa = 0,09)
* **Significado físico:** Quantifica a dispersão mecânica das fibrilas ao redor da sua orientação lamela-lamela preferencial. 
 * \kappa = 0 representaria lamelas cristalinas e perfeitamente paralelas.
 * \kappa = 0,09 indica que, embora haja um alinhamento preferencial forte, há dispersão angular significativa decorrente do entrelaçamento natural e ramificação tridimensional das fibrilas estromais.
* **Papel clínico:** Modula a transição da tensão circunferencial para a tensão meridional. Um aumento localizado da dispersão (\kappa \to 1/3), comum em cones avançados onde as lamelas sofrem desorganização estrutural e deslizamento, torna o tecido menos anisotrópico e mecanicamente mais complacente ao cisalhamento e à protrusão.

### 5. Módulo Volumétrico (k = 4,76 MPa)
* **Significado físico:** Controla a resistência do estroma à compressão volumétrica hidrostática. É derivado teoricamente a partir de k = 2c(1+\nu)/(3(1-2\nu)) para impor um coeficiente de Poisson efetivo \nu ≈ 0,49, representando a quase incompressibilidade imposta pela alta hidratação do estroma.
* **Papel clínico:** Nas simulações de elementos finitos do ICRS, este parâmetro impede que o estroma virtual "colapse" sobre si mesmo na zona de interface de contato direto onde a borda rígida do anel de PMMA pressiona o canal estromal, garantindo a fidelidade física na transmissão dos campos de deslocamento V_R e tensão V_T.

---

## Referências

1. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *Journal of the Royal Society Interface*. 2006;3(6):15–35.
2. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *Journal of Elasticity*. 2000;61(1–3):1–48.
3. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Frontiers in Bioengineering and Biotechnology*. 2018;6:210.
4. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomechanics and Modeling in Mechanobiology*. 2006;5(4):237–246.
5. Meek KM, Knupp C. Corneal structure and transparency. *Progress in Retinal and Eye Research*. 2015;49:1–16.
