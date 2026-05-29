<!-- GPT revision applied -->
# Apêndice A — Modelo Constitutivo HGO: Derivação e Parâmetros

> **Análise Vetorial Biomecânica Corneana para o Planejamento de Segmento de Anel Intraestromal**
> *Parte V — Horizontes*

---

## A.1 Fundamentação Física e Anisotropia Corneana

A resposta mecânica do estroma corneano não pode ser descrita adequadamente por modelos de elasticidade linear clássica ou modelos hiperelásticos isotrópicos (como as formulações neo-Hookeana ou de Mooney-Rivlin). Sob a perspectiva da microestrutura, o estroma é um material composto altamente ordenado e reforçado por fibras. Ele é composto por cerca de 200 a 250 lamelas empilhadas ao longo da espessura, nas quais fibrilas de colágeno de diâmetro uniforme (~30 nm) e espaçamento regular estão imersas em uma matriz hidratada de proteoglicanos e glicosaminoglicanos (a substância fundamental).

Do ponto de vista mecânico, isso resulta em:
1. **Hiperelasticidade não linear:** O tecido exibe endurecimento exponencial sob deformação (strain-stiffening), decorrente do estiramento progressivo e do alinhamento das fibrilas de colágeno que inicialmente se encontram em estado ondulado (crimped).
2. **Anisotropia marcada:** A resistência à tração ao longo das direções das fibrilas é de duas a três ordens de grandeza superior à resistência da matriz ou à resistência ao cisalhamento interlamear. Medições de espalhamento de raios X de grande ângulo (WAXS) demonstram que as fibras possuem orientações preferenciais, organizando-se predominantemente nos meridianos ortogonais (temporal-nasal e superior-inferior) na córnea central, e assumindo uma distribuição anular circunferencial na periferia próxima ao limbo para formar o anel escleral de suporte.
3. **Quase incompressibilidade:** Devido ao seu alto teor de água (~78%), a córnea resiste fortemente a variações volumétricas sob pressões fisiológicas, comportando-se com um coeficiente de Poisson efetivo muito próximo a 0,5.

Para capturar essa complexidade física de maneira quantitativa nas simulações de elementos finitos apresentadas ao longo desta monografia, empregou-se a formulação constitutiva hiperelástica anisotrópica de **Holzapfel-Gasser-Ogden (HGO)**, originalmente proposta por Holzapfel, Gasser e Ogden (2000) para paredes arteriais e adaptada com sucesso para a córnea por Pandolfi e Manganiello (2006) e Nguyen et al. (2018).

---

## A.2 A Mecânica da Deformação (Conceitos Base)

Em vez de equações tensoriais complexas, é mais útil para o planeamento clínico entender o que o modelo computacional está realmente a calcular. 

Para avaliar a mecânica do estroma corneano, o modelo precisa de comparar continuamente dois momentos:
1. **O estado de repouso:** A córnea ectásica original, antes de qualquer intervenção.
2. **O estado deformado:** A córnea após o estiramento forçado pela introdução do anel (que atua como um poste de tenda) e estabilizada pela pressão intraocular.

O software rastreia milhares de minúsculos pontos no tecido, medindo exatamente para onde e com que intensidade cada ponto foi deslocado.

### A.2.1 A Regra do "Balão de Água" (Decomposição Volumétrica)

O estroma é composto por cerca de 78% de água, comportando-se essencialmente como um balão de líquido: é fácil alterar a sua forma (dobrando ou esticando), mas é quase fisicamente impossível reduzir o seu volume total esmagando-o (quase-incompressibilidade).

Se o computador tentar calcular todas as forças da deformação de uma só vez, a simulação "trava" (um erro de software chamado *volumetric locking*). Para evitar isso e garantir um cálculo preciso, a deformação tem de ser dividida em duas componentes distintas:
* **Mudança de Volume (Dilatacional):** Mede se o tecido inchou ou encolheu — o que na córnea assumimos ser praticamente zero.
* **Mudança de Forma (Isocórica ou Distorcional):** Mede como o tecido se esticou, torceu ou aplanou, preservando o seu volume total.

É exclusivamente a **mudança de forma** que dita o resultado cirúrgico. É esta energia de estiramento que explica por que razão o volume do anel aplana a córnea central (Vetor Radial $V_R$) e como a tensão circunferencial regulariza a superfície (Vetor Tangencial $V_T$).

### A.2.2 Medindo o Alongamento das Fibras

A córnea não é um material uniforme; ela é reforçada por lamelas de colágeno orientadas. Para que o computador saiba quão "dura" a córnea está num determinado ponto, ele calcula duas métricas físicas essenciais:
1. **A deformação da matriz (a "gelatina" de proteoglicanos):** Avaliada medindo a distorção geral e isotrópica do tecido em todas as direções.
2. **O alongamento das lamelas de colágeno:** Calculado mapeando a deformação total e projetando-a de forma direcional nos eixos exatos onde as fibras correm (predominantemente ortogonais no centro e circulares na periferia).

Este cálculo físico permite que o modelo saiba que tentar expandir a córnea paralelamente às fibras é geometricamente e mecanicamente muito mais desafiador do que expandi-la contra elas.

---

![Figura A.1 — Malha de elementos finitos do modelo corneano FEBio com condições de contorno.](book_figures/fig_apendice_a_malha_fem.svg)

## A.3 A Energia Acumulada no Tecido (Tensão Elástica)

Como nos ensina a física básica, deformar um elástico requer energia. No modelo de Holzapfel-Gasser-Ogden (HGO), a córnea armazena energia mecânica (tensão elástica) que provém de dois componentes distintos do estroma:

### A.3.1 A Resistência da Matriz

A substância fundamental de proteoglicanos é macia e isotrópica (apresenta a mesma resistência em todas as direções). O modelo calcula a energia absorvida por esta matriz de água e açúcares sempre que ela é submetida a esforço de corte. Como é muito complacente, contribui relativamente pouco para a resistência à tração da córnea sob a PIO, mas é essencial para manter a volumetria base e o espaçamento adequado das lamelas.

### A.3.2 O "Travamento" Exponencial das Fibras

A verdadeira força estrutural do estroma vem do colágeno. O modelo HGO usa três regras biomiméticas para simular as fibras de forma realista:
1. **Só atuam sob tração:** Tal como uma corda, as fibrilas de colágeno oferecem imensa resistência ao serem puxadas (como pela pressão do anel contra o tecido), mas dobram-se passivamente se forem empurradas (compressão). O modelo desativa mecanicamente as fibras nas zonas raras onde o tecido enruga ou é comprimido.
2. **Endurecimento Progressivo:** As lamelas de colágeno possuem um traçado naturalmente ondulado (*crimped*). No início do estiramento (por exemplo, sob PIO baixa), desdobram-se facilmente. Contudo, quando perdem a sua ondulação natural, comportam-se como um cabo rígido, travando de forma exponencial qualquer deformação subsequente. O modelo matemático captura brilhantemente esta "muralha elástica".
3. **Dispersão Natural:** As fibras corneanas não são cabos perfeitamente paralelos. Elas entrelaçam-se e desviam-se ligeiramente do trajeto principal. O modelo simula este fator de dispersão, distribuindo parte da tensão do anel para eixos adjacentes, suavizando as forças de forma clinicamente consistente.

---

## A.4 Como as Tensões Interagem com o ICRS (O Mapa de *Stress*)

No planeamento operatório de anéis intraestromais, toda a energia mecânica de que falámos manifesta-se através de pressões físicas (tensões) que vão remodelar a curvatura da cúpula anterior. O software traduz a energia em mapas de distribuição de forças (tensões de Cauchy ou *Real Stress*):

1. **A Força de Reação:** Quando o implante volumétrico de PMMA afasta as lamelas, o estroma contrai-se numa tentativa física de recuperar a sua geometria inicial. É exatamente esta força acumulada que será redirecionada como "tensão tangencial" ($V_T$), tracionando o meridiano de implantação.
2. **A Regularização Central:** O mapa de cores gerado pelo solver mostra claramente o resultado final da oposição de forças. As zonas pintadas de "vermelho e amarelo" sobre os segmentos mostram o colágeno levado ao seu limite elástico, o que mecanicamente obriga as lamelas que se estendem até ao ápice a aplanar-se com força (o Vetor Radial $V_R$). Zonas em azul mostram os vales onde a curvatura relaxa.

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

1. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *J R Soc Interface*. 2006;3(6):15–35.
2. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61(1–3):1–48.
3. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
4. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Front Bioeng Biotechnol*. 2018;6:210.
5. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.
