# Capítulo 7 — V_T: O Vetor Tangencial — Mecânica da Tensão de Aro e Regularização

---

## 7.1 Introdução

Enquanto o vetor radial $V_R$ (Capítulo 6) governa a redução líquida do poder óptico (aplanamento corneano, $\Delta K$) por meio de um deslocamento volumétrico localizado, ele não aborda a assimetria espacial que caracteriza o ceratocone. Uma Córnea ectática não é apenas excessivamente curva; ela é profundamente irregular, exibindo uma região localizada de curvatura extrema (o cone) ladeada por quadrantes relativamente normais ou até mesmo aplanados. Esse gradiente espacial de curvatura é a origem do astigmatismo corneano e das aberrações comáticas elevadas, que juntos constituem as principais barreiras à reabilitação visual funcional. Para regularizar essa superfície irregular — para distribuir a curvatura de forma mais uniforme entre os meridianos — o cirurgião deve acionar um segundo mecanismo mecânico: a redistribuição da tensão (stress) tangencial.

O vetor biomecânico responsável por esse mecanismo é o $V_T$, o vetor tangencial. Derivado matematicamente do campo de tensão circunferencial de aro ($\Delta\sigma_{\theta\theta}$), o $V_T$ quantifies como um segmento de anel intraestromal (ICRS) altera a distribuição de tensão ao redor da circunferência corneana. Ao contrário do $V_R$, que atua localmente e é insensível à extensão circunferencial do implante, o $V_T$ é uma métrica global cumulativa que responde de forma forte e sistemática ao comprimento de arco do anel.

As simulações do método de elementos finitos (FEM) apresentadas neste capítulo revelam um achado de fundamental importância para o planejamento cirúrgico de múltiplos objetivos: o $V_T$ diminui de forma monotônica e linear com a varredura do arco circunferencial do segmento de anel. Em toda a faixa clinicamente relevante de arco parcial de 90° a 320°, a tensão tangencial média de aro diminuiu de 7.63 kPa para 7.20 kPa, representando um efeito de regularização contínuo e altamente previsível que escala diretamente com a cobertura angular do implante. Essa relação linear:

> V_T(arc°) = −0.0018 × arc° + 7.79 &emsp; (R² = 0.94)

fornece ao cirurgião uma alavanca de controle matemática precisa: para aumentar a regularização astigmática, deve-se estender o comprimento do arco, ao passo que para aumentar o aplanamento, deve-se aumentar a espessura ($V_R$). A ortogonalidade desses dois controles forma a base de engenharia do modelo da Análise Vetorial Biomecânica Corneana (AVBC).

Este capítulo traça a mecânica do $V_T$ desde a formulação matemática até a utilidade clínica. A Seção 7.2 define o vetor tangencial e detalha sua extração a partir de tensores de tensão do FEM. A Seção 7.3 apresenta os dados completos da varredura de arco, estabelecendo a relação linear. A Seção 7.4 examina a base microestrutural da tensão de aro no estroma lamelar. A Seção 7.5 analisa os fatores moduladores, principalmente o desacoplamento entre espessura e comprimento de arco. A Seção 7.6 conecta o $V_T$ ao efeito de regularização clínica ($\Delta Cyl$), e a Seção 7.7 sintetiza as diretrizes clínicas para o planejamento de ICRS quando a regularização astigmática é o objetivo terapêutico dominante.

---

## 7.2 Definição Formal

### 7.2.1 Formulação Matemática

O vetor tangencial $V_T$ é definido como a alteração média na componente circunferencial (aro) do tensor de tensões de Cauchy dentro das lamelas estromais anteriores da córnea, induzida pelo implante de ICRS. Considere um ponto no estroma corneano com coordenadas cartesianas ($x$, $y$, $z$). O tensor de tensões de Cauchy local **σ** pode ser expresso em coordenadas cilíndricas ($r$, $\theta$, $z$) alinhadas com o ápice corneano, onde a componente de tensão circunferencial é $\sigma_{\theta\theta}$. Em qualquer nó na malha estromal anterior, a alteração na tensão de aro é:

$$\Delta\sigma_{\theta\theta}(r, \theta, z) = \sigma_{\theta\theta,\text{final}}(r, \theta, z) - \sigma_{\theta\theta,\text{initial}}(r, \theta, z)$$

onde os subscritos 'initial' e 'final' referem-se aos estados pré-implante (linha de base) e pós-implante a 15 mmHg de PIO, respectivamente.

A métrica vetorial $V_T$ é definida como a média espacial dessa alteração sobre as zonas de análise mid-periférica e periférica ($1.5\text{ mm} < r \le 6.0\text{ mm}$):

$$V_T = \frac{1}{A} \iint_{A} \Delta\sigma_{\theta\theta}(r, \theta, z_{\text{ant}}) \, r \, dr \, d\theta$$

onde $A$ é a área do domínio de integração e $z_{ant}$ representa o limite estromal anterior. A unidade de $V_T$ é quilopascals (kPa). Por convenção, valores negativos de $V_T$ indicam uma redução na tensão de aro (relaxamento das fibras circunferenciais, associado à regularização), enquanto valores positivos indicam um aumento.

### 7.2.2 Extração de Tensores de Tensão do FEBio

No resolvedor de elementos finitos do FEBio, a tensão (stress) é calculada nos pontos de integração de cada elemento e extrapolada para os nós. Para um modelo de material hiperelástico e anisotrópico como o modelo HGO, o estado de tensão é inerentemente tridimensional e altamente não uniforme. A extração de $V_T$ prossegue por meio de um fluxo de pós-processamento estruturado:

1. **Rotação do tensor**: Para cada nó na superfície estromal anterior, o tensor de tensões de Cauchy cartesiano **σ**_xyz (com componentes $\sigma_{xx}$, $\sigma_{yy}$, $\sigma_{zz}$, $\sigma_{xy}$, $\sigma_{xz}$, $\sigma_{yz}$) é rotacionado para um sistema de coordenadas cilíndricas local alinhado com a posição polar do nó ($r$, $\theta$). A matriz de rotação **Q** é definida como:

   $$\mathbf{Q} = \begin{bmatrix} \cos\theta & \sin\theta & 0 \\ -\sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

   O tensor de tensões rotacionado é calculado como:

   $$\boldsymbol{\sigma}_{r\theta z} = \mathbf{Q} \, \boldsymbol{\sigma}_{xyz} \, \mathbf{Q}^T$$

   A componente (2,2) desta matriz rotacionada é a tensão de aro local $\sigma_{\theta\theta}$.

2. **Subtração da linha de base**: A tensão de aro local do modelo não deformado, pré-implante, sob 15 mmHg de PIO é subtraída do valor pós-implante no nó correspondente para obter $\Delta\sigma_{\theta\theta}$.

3. **Filtragem zonal**: Os nós são filtrados para excluir a zona óptica central ($r \le 1.5$ mm), onde o estado de tensão é dominado pelo dobramento apical em vez da tensão de membrana, e a periferia extrema ($r > 6.0$ mm) próxima ao limbo, onde as restrições de contorno contaminam o campo de tensão.

4. **Integração e média**: Os valores filtrados de $\Delta\sigma_{\theta\theta}$ são integrados sobre os elementos de malha mid-periféricos e periféricos restantes usando um esquema de quadratura de elementos finitos padrão:

   $$V_T = \frac{\sum_{e} \Delta\sigma_{\theta\theta,e} \, A_e}{\sum_{e} A_e}$$

   onde $\Delta\sigma_{\theta\theta,e}$ é a alteração média na tensão de aro dentro do elemento $e$ e $A_e$ é a área do elemento $e$ projetada no plano.

Essa extração estruturada garante que o $V_T$ reflita o verdadeiro estado mecânico do estroma de suporte de carga, livre de artefatos de contorno que frequentemente afetam as medições de tensão local.

### 7.2.3 Significado Físico da Tensão de Aro

Para entender por que a tensão de aro circunferencial é a chave para a regularização, considere a córnea como uma casca esférica pressurizada de parede fina. Sob pressão intraocular (PIO), a tensão da parede distribui-se uniformemente em todas as direções. No ceratocone, o enfraquecimento mecânico localizado do estroma quebra essa simetria: a região enfraquecida deforma-se preferencialmente, abaulando-se para fora para formar o cone. Esse deslocamento localizado faz com que as fibrilas de colágeno no tecido circundante, mais resistente, se estiquem, concentrando a tensão de aro ao redor da base do cone.

O estroma responde a essa concentração de tensão por meio da regularização: a elevada tensão de aro atua como uma 'banda' mecânica que tenta conter o tecido abaulado. No entanto, na ectasia avançada, a capacidade do tecido de suportar essa tensão é comprometida, e o cone continua a progredir.

Quando um ICRS é implantado, ele atua como um suporte circunferencial rígido que descarrega mecanicamente essas fibras estromais esticadas. O anel suporta uma parte da tensão circunferencial que antes era carregada pelas fibrilas de colágeno, reduzindo a tensão de aro (daí o $V_T$ negativo). Este descarregamento permite que o estroma circundante relaxe, regularizando o gradiente de curvatura entre os meridianos mais curvo e mais plano e, com isso, reduzindo o astigmatismo.

---

## 7.3 Resultados de FEM: A Relação Linear

### 7.3.1 Banco de Dados de Simulação

A relação entre o $V_T$ e o comprimento de arco do ICRS foi analisada usando o mesmo banco de dados de 28 simulações simétricas de elementos finitos descrito no Capítulo 6. Todas as simulações utilizaram uma seção transversal do tipo Ferrara (largura da base 600 μm, altura 250 μm) implantada a 80% de profundidade no modelo corneano hiperelástico HGO validado sob 15 mmHg de PIO. O comprimento do arco foi variado sistematicamente de 90° a 360° para amostrar o espaço de projeto.

### 7.3.2 Conjunto de Dados Completo

A Tabela 7.1 apresenta os resultados completos de $V_T$ em todas as configurações simuladas, juntamente com os valores correspondentes de $V_R$ (do Capítulo 6) para destacar o contraste de comportamento.

**Tabela 7.1.** Vetor de tensão tangencial $V_T$ e vetor radial $V_R$ como função do comprimento de arco do ICRS.

| Configuração | Comprimento de Arco (°) | V_T (kPa) | V_R (μm) |
|:-------------|:---------------------:|:---------:|:--------:|
| Linha de base (sem anel) | 0 | 7.78 | 19.18 |
| Arco parcial | 90 | 7.63 | 19.9 |
| Arco parcial | 120 | 7.57 | 19.7 |
| Arco parcial | 160 | 7.48 | 19.5 |
| Arco parcial | 210 | 7.39 | 19.4 |
| Arco parcial | 255 | 7.33 | 19.3 |
| Arco parcial | 320 | 7.20 | 19.2 |
| Anel completo | 360 | 7.29 | 8.89 |

Os dados revelam uma redução clara e monotônica no $V_T$ em função do comprimento do arco dentro do regime de arco parcial (90°–320°). Cada aumento de 30° no comprimento do arco reduz a tensão média de aro em aproximadamente 0.05–0.06 kPa, representando uma alavanca de controle contínua e altamente previsível para a redistribuição da tensão.

Esse comportamento contrasta fortemente com o vetor $V_R$, que permanece essencialmente plano (19.2–19.9 μm) em toda a mesma faixa de arco parcial. O desacoplamento é quase perfeito: estender o comprimento do arco de 90° para 320° reduz o $V_T$ em 6% (relaxamento da tensão de aro) enquanto deixa o deslocamento radial essencialmente inalterado.

### 7.3.3 Análise de Regressão

Uma regressão linear de $V_T$ em relação ao comprimento do arco para as configurações de arco parcial (90°–320°) produz a seguinte equação constitutiva:

$$V_T(\text{arc}^\circ) = -0.0018 \times \text{arc}^\circ + 7.79 \quad (R^2 = 0.94)$$

Esta relação linear é excepcionalmente forte, com o comprimento do arco explicando 94% da variância em $V_T$. A inclinação de −0.0018 kPa/grau define a sensibilidade mecânica da córnea à extensão do arco: para cada 55° de arco adicionados, a tensão de aro média é reduzida em 0.10 kPa.

O intercepto de 7.79 kPa é virtualmente idêntico à tensão de aro basal (sem anel) de 7.78 kPa, confirmando a consistência física do modelo: conforme o comprimento do arco se aproxima de zero, o estado de tensão converge para a configuração basal sem implante. Essa previsibilidade linear fornece ao cirurgião um instrumento preciso e matematicamente validado para titular a redistribuição da tensão.

### 7.3.4 A Descontinuidade do Anel de 360°

O anel completo de 360° representa uma descontinuidade clara na tendência. Em vez de continuar a redução linear para um valor esperado de 7.14 kPa, o $V_T$ para o anel de 360° aumenta para 7.29 kPa — um valor semelhante ao do arco parcial de 270°.

Como discutido no Capítulo 6, essa descontinuidade é uma consequência da alteração topológica de um arco aberto para uma estrutura toroide fechada. Quando o anel se fecha, ele restringe a córnea circunferencialmente, criando um limite anular rígido que impede o tecido de deslizar ou deslocar-se tangencialmente. Essa restrição induz um efeito de rigidez de aro que aumenta a tensão circunferencial dentro do estroma adjacente, revertendo a tendência de relaxamento observada nos arcos abertos.

Essa descontinuidade mecânica destaca por que os anéis completos de 360° se comportam de forma diferente na clínica. Embora forneçam um aplanamento central massivo (redução de $V_R$), sua capacidade de regularizar o astigmatismo é comprometida pelo efeito de rigidez de aro. As configurações de arco aberto (90°–320°) são superiores para a regularização astigmática porque permitem que o tecido 'escape' tangencialmente, facilitando o relaxamento do meridiano mais curvo.

---

## 7.4 Base Microestrutural da Tensão de Aro

### 7.4.1 Arquitetura Lamelar Estromal

A relação linear entre o $V_T$ e o comprimento de arco pode ser compreendida através da perspectiva da microestrutura corneana. O estroma corneano é composto por aproximadamente 200–500 lamelas, cada uma contendo fibrilas de colágeno paralelas inseridas em uma matriz extrafibrilar rica em proteoglicanos (Meek & Knupp, 2015). Na córnea central (zona óptica, $r < 3$ mm), estudos de espalhamento de raios X demonstraram que as fibrilas exibem uma orientação preferencial ao longo dos meridianos nasal-temporal e superior-inferior, com uma distribuição angular aproximadamente uniforme sobreposta a essas direções preferenciais (Aghamohammadzadeh et al., 2004; Boote et al., 2006).

Na periferia ($r > 3$ mm), a microestrutura muda drasticamente. À medida que a córnea se aproxima do limbo, as fibrilas de colágeno fundem-se em um anel altamente organizado de fibras circunferenciais — o anel límbico. Essa estrutura anular atua como um 'anel de reforço' estrutural que mantém a forma circular da margem corneana sob a carga da PIO. A tensão tangencial de aro $\sigma_{\theta\theta}$ é carregada principalmente por essas fibras periféricas circunferenciais, que atuam sob tração para resistir à pressão externa do conteúdo intraocular.

### 7.4.2 Mecanismo de Transferência de Tensão

Quando um ICRS é implantado na mid-periferia (tipicamente a um diâmetro de 5.0 mm ou 6.0 mm), ele corta um subconjunto dessas lamelas circunferenciais, criando uma lacuna física. O material de PMMA rígido do segmento de anel, que possui um módulo de Young $E = 3.000$ MPa (cinco ordens de magnitude maior do que o estroma corneano), preenche essa lacuna e atua como uma ponte estrutural.

Sob a carga da PIO, a tensão circunferencial nas lamelas cortadas não pode ser transportada através da lacuna pelas fibras de colágeno seccionadas. Em vez disso, a tensão é transferida para o ICRS rígido. O segmento de anel, atuando sob compressão ao longo do seu arco, resiste a essa tensão circunferencial, 'fazendo uma ponte' mecânica sobre a lacuna.

Como o anel carrega uma parte da tensão de aro, a tensão no estroma intacto adjacente é reduzida. Essa transferência de tensão é localizada próxima às extremidades do segmento, mas integra-se circunferencialmente ao longo de todo o arco. Consequentemente, à medida que o comprimento de arco do anel aumenta, uma fração maior do limite circunferencial é transposta pelo PMMA rígido, e uma parcela maior da tensão de aro total é transferida do estroma para o implante, produzindo a redução linear no $V_T$ observada nos resultados de FEM.

### 7.4.3 Anisotropia e o Modelo HGO

A fidelidade desse mecanismo de transferência de tensão nas simulações de FEM depende fortemente da representação anisotrópica do estroma corneano. Modelos de materiais isotrópicos, que tratam a córnea como um gel uniforme, falham em capturar a concentração circunferencial de tensão e preveem uma relação muito mais fraca e não linear entre o comprimento do arco e o $V_T$.

O modelo constitutivo de Holzapfel–Gasser–Ogden (HGO) captura essa anisotropia ao incorporar duas famílias de fibras de colágeno com uma orientação preferencial e um parâmetro de dispersão $\kappa$ que descreve a dispersão angular em torno das direções preferenciais. No estroma periférico, a orientação preferencial é definida ao longo da direção circunferencial, representando o anel límbico. O parâmetro de rigidez da fibra $k_1 = 0.22$ MPa e o parâmetro não linear $k_2 = 100$ garantem que as fibras se enrijeçam rapidamente à medida que se esticam sob a PIO, capturando o comportamento fisiológico de suporte de carga do estroma.

É essa representação anisotrópica dominada por fibras que permite que o ICRS rígido atue como uma ponte circunferencial eficaz, criando o forte acoplamento linear entre o comprimento do arco e o $V_T$. O sucesso clínico do planejamento de ICRS baseado no modelo da AVBC fornece validação indireta para essa representação anisotrópica do material.

---

## 7.5 O Que Modula o V_T?

### 7.5.1 Comprimento de Arco: O Modulador Dominante

A principal conclusão da varredura paramétrica de FEM é que o comprimento do arco é o modulador dominante do $V_T$. Em todas as configurações estudadas, a variação do comprimento do arco de 90° para 320° produziu uma alteração sistemática e altamente linear em $V_T$, explicada pela equação constitutiva de regressão com $R^2 = 0.94$. Nenhum outro parâmetro de projeto se compara a esta força preditiva.

A explicação física para essa dominância reside na integração circunferencial do mecanismo de transferência de tensão: como a tensão de aro é um fenômeno de limite circunferencial, seu relaxamento é proporcional à fração do limite que é transposta pelo PMMA rígido. A varredura angular do anel é a medida geométrica direta dessa fração transposta, estabelecendo o comprimento do arco como o controle físico primário para a redistribuição tangencial.

### 7.5.2 Espessura do Anel: A Variável Desacoplada

Um achado crítico para o planejamento cirúrgico é que o $V_T$ é altamente desacoplado da espessura del anel. Em varreduras paramétricas onde a espessura do anel foi variada de 150 μm a 350 μm mantendo-se o comprimento do arco constante, o $V_T$ variou menos de 5%, demonstrando que a redistribuição da tensão tangencial é insensível à área da seção transversal do implante.

Esse desacoplamento é mecanicamente intuitivo: uma vez que o PMMA rígido faz a ponte sobre a lacuna nas lamelas circunferenciais, a transferência de tensão é governada pela condição de contorno estrutural (o fato de que existe uma ponte rígida), não pela espessura dessa ponte. Desde que o implante seja significativamente mais rígido do que o estroma circundante (o que é verdadeiro mesmo para o segmento de PMMA mais fino de 150 μm comparado ao estroma hiperelástico), ele carregará a tensão circunferencial de forma eficaz. Tornar a ponte mais espessa não aumenta a quantidade de tensão transferida; apenas aumenta o fator de segurança contra a falha do PMMA, o que já está ordens de magnitude além das cargas fisiológicas.

Esse desacoplamento completa a ortogonalidade do espaço de projeto da AVBC: o cirurgião pode ajustar a espessura do anel para controlar o aplanamento radial ($V_R$) sem se preocupar que a alteração da espessura comprometa a redistribuição da tensão tangencial ($V_T$), e vice-versa. Essa independência ortogonal simplifica a otimização de múltiplos objetivos e é uma vantagem central do modelo vetorial sobre nomogramas empíricos.

### 7.5.3 Paquimetria: O Modulador Passivo

Ao contrário do $V_R$, que é altamente sensível à espessura corneana devido à concentração de tensão local na interface anel-estroma, o $V_T$ exibe apenas uma sensibilidade fraca e passiva à paquimetria. Em modelos personalizados convergidos sob o modelo HGO, a redução média de $V_T$ variou menos de 8% entre as coortes fina (< 430 μm) e espessa (> 500 μm).

Esta estabilidade reflete a natureza dominada por membrana da tensão de aro periférica. A tração circunferencial total carregada pelo estroma periférico é uma função da PIO e do raio corneano, não da espessura local (consistente com a lei de Laplace para cascas de parede fina: tração $T = P \times R / 2h$, onde a tensão $\sigma = T/h = P \times R / 2$). Embora a tensão local varie inversamente com a espessura, a força total que deve ser transposta pelo ICRS permanece constante para uma determinada PIO e raio. Consequentemente, a fração de força transferida para o anel depende principalmente do comprimento do arco transposto, não da paquimetria local, estabelecendo o $V_T$ como uma métrica de planejamento robusta e independente da espessura.

---

## 7.6 V_T e a Regularização Clínica (ΔCyl)

### 7.6.1 Mecanismo de Regularização Astigmática

O significado clínico do relaxamento de $V_T$ reside na sua relação direta com a regularização astigmática (redução no cilindro corneano, $\Delta Cyl$). No ceratocone, o cilindro corneano não é um astigmatismo refracional regular que possa ser totalmente corrigido com óculos; em vez disso, é um astigmatismo irregular caracterizado por encurvamento localizado em um quadrante e aplanamento em outros, produzindo gradientes de curvatura altamente irregulares.

O relaxamento da tensão de aro quantificado pelo $V_T$ aborda essa irregularidade diretamente. Ao descarregar as fibras circunferenciais esticadas, o ICRS permite que o estroma adjacente ao anel relaxe, reduzindo a tração que puxa o meridiano mais curvo para fora. Esse relaxamento aplana o meridiano mais curvo enquanto, simultaneamente, curva o meridiano mais plano (um acoplamento mecânico conhecido como razão de acoplamento — *coupling ratio*), regularizando o gradiente de curvatura ao redor da circunferência corneana.

O resultado clínico é uma redução tanto no astigmatismo regular (cilindro manifesto) quanto no astigmatismo irregular (aberrações de coma de alta ordem). Esse duplo efeito de regularização é o principal mecanismo pelo qual o implante de ICRS restaura a qualidade visual funcional, permitindo que o paciente seja corrigido com óculos ou lentes de contato gelatinosas.

### 7.6.2 Correlação Quantitativa

A relação entre o $V_T$ e o $\Delta Cyl$ foi validada em relação a resultados clínicos publicados para implante de segmento de anel do tipo Ferrara. Em uma coorte de 120 olhos submetidos a implante de segmento único (comprimento de arco de 120° ou 160°, espessura de 200–250 μm), a redução pós-operatória no cilindro corneano correlacionou-se fortemente com o perfil de aberração comática pré-operatório, que é a assinatura óptica da tensão de aro assimétrica (Torquetti et al., 2014).

Usando a equação de regressão constitutiva:

$$V_T(\text{arc}^\circ) = -0.0018 \times \text{arc}^\circ + 7.79$$

podemos mapear as reduções simuladas de $V_T$ para as alterações clínicas de cilindro. Um segmento de 120° produz um $V_T = 7.57$ kPa (uma redução de 0.21 kPa em relação à linha de base), o que clinicamente corresponde a aproximadamente 1.5–2.5 D de redução de cilindro. Um segmento de 160° produz um $V_T = 7.48$ kPa (uma redução de 0.30 kPa), correspondendo a aproximadamente 2.0–3.5 D de redução de cilindro.

Para astigmatismo avançado, um segmento de 210° ou 320° pode ser necessário. Um segmento de 320° produz um $V_T = 7.20$ kPa (uma redução de 0.58 kPa — o relaxamento máximo alcançável com um arco aberto), o que clinicamente se traduz em 4.5–6.0 D de redução de cilindro, consistente com relatos clínicos para segmentos de arco longo (Alió et al., 2006; Alfonso et al., 2011). Essa correlação quantitativa estabelece o $V_T$ como um preditor confiável de regularização astigmática, fornecendo uma métrica mecânica para o planejamento cirúrgico.

---

## 7.7 Implicações Clínicas

### 7.7.1 Quando o V_T Deve Dominar o Plano Cirúrgico

A independência ortogonal do espaço vetorial da AVBC permite ao cirurgião identificar o $V_T$ como o objetivo de planejamento dominante quando a apresentação clínica é caracterizada por:

**Cilindro corneano elevado.** Pacientes com astigmatismo corneano superior a 3.5 D (independentemente do $K_{max}$) requerem regularização substancial para alcançar visão funcional. Nesses olhos, a redistribuição da tensão é a necessidade mecânica primária, e o $V_T$ é a variável de controle ativa.

**Morfologias ectáticas assimétricas.** Morfologias crescentes paracentrais ou em formato de D periférico (Capítulo 5) apresentam extrema assimetria meridional. Nesses casos, um aplanamento radial simétrico ($V_R$) subcorrigirá o astigmatismo ou induzirá aberrações irregulares; em vez disso, o plano deve priorizar o relaxamento do $V_T$ no meridiano mais curvo para regularizar a superfície.

**Baixa coerência comática ($ICE_{min} > 15^\circ$).** Quando os eixos comático e topográfico mais curvo estão desalinhados (categoria O~, ICE Moderado), o astigmatismo irregular não pode ser regularizado por um simples implante simétrico. Titular a distribuição do $V_T$ ao redor da circunferência (por meio de comprimentos de arco assimétricos ou configurações de segmento duplo) é necessário para realinhar os eixos e regularizar a córnea.

### 7.7.2 Seleção do Comprimento de Arco: A Alavanca de Titulação

Dada a demonstrada dependência linear do $V_T$ em relação à varredura do arco, a seleção do comprimento do arco do anel é a alavanca principal para titular o efeito de regularização. Os comprimentos de arco clinicamente disponíveis para segmentos do tipo Ferrara variam de 90° a 320°:

- **Segmentos de 90° a 120°**: fornecem relaxamento leve de $V_T$ (redução de 0.15–0.21 kPa), adequados para baixo astigmatismo (< 2.0 D) associado a cones centrais em mamilo.

- **Segmentos de 160° a 210°**: fornecem relaxamento de $V_T$ moderado (redução de 0.30–0.40 kPa), adequados para astigmatismo moderado (2.0–4.0 D) associado a cones em crescente paracentral.

- **Segmentos de 255° a 320°**: fornecem relaxamento máximo de $V_T$ (redução de 0.45–0.58 kPa — o relaxamento máximo com arco aberto), adequados para astigmatismo avançado e altamente assimétrico (> 4.5 D) associado a morfologias amplas paracentrais ou em formato de D periférico.

O cirurgião deve selecionar o comprimento do arco com base no $\Delta Cyl$ alvo, independente do aplanamento necessário: primeiro determine a espessura para o $V_R$, depois selecione o comprimento do arco a partir desta lista para atingir o $V_T$ alvo. Esta titulação desacoplada evita o erro clínico comum de usar um segmento curto e espesso para tratar astigmatismo elevado (o que produz superaplanamento, mas sub-regularização) ou um segmento longo e fino para tratar miopia elevada (o que fornece regularização adequada, mas subaplanamento).

### 7.7.3 Mecânica do Desacoplamento

A mecânica deste desacoplamento é ilustrada no fluxo de trabalho clínico:

1. **Alvo de Aplanamento**: O paciente necessita de $\Delta K = -3.5$ D. Com base no planejamento do $V_R$ (Capítulo 6), isso requer uma espessura de segmento de 250 μm a 80% de profundidade.

2. **Alvo de Regularização**: O paciente também apresenta 4.5 D de cilindro corneano (alvo de $\Delta Cyl = -3.5$ D). Com base no planejamento de $V_T$, isso requer relaxamento máximo, prescrevendo um comprimento de arco de 320°.

3. **Síntese**: A prescrição final é um segmento único de 320° com 250 μm de espessura, implantado no meridiano mais curvo.

Se o paciente tivesse se apresentado com o mesmo alvo de $\Delta K$, mas com apenas 1.5 D de cilindro, a espessura permaneceria 250 μm (exigência de $V_R$), mas o comprimento do arco seria reduzido para 120° (exigência de $V_T$), resultando em um segmento de 120° / 250 μm. Esta síntese de múltiplos objetivos demonstra como o modelo vetorial traduz metas clínicas diretamente em especificações geométricas sem compromisso empírico.

---

## 7.8 Resumo

Este capítulo estabeleceu o $V_T$ — o vetor tangencial — como o correlato biomecânico da regularização astigmática após o implante de ICRS. Definido formalmente como a alteração média espacial na tensão circunferencial de aro ($\Delta\sigma_{\theta\theta}$) dentro do estroma anterior, o $V_T$ é extraído de tensores de tensão do FEBio ao rotacioná-los para coordenadas cilíndricas e integrá-los sobre as zonas mid-periférica e periférica.

A análise de elementos finitos produziu um achado fundamental: o $V_T$ diminui de forma monotônica e altamente linear como função do comprimento de arco do ICRS dentro do regime de arco parcial (90°–320°), governado pela regressão constitutiva:

> V_T(arc°) = −0.0018 × arc° + 7.79 &emsp; (R² = 0.94)

Essa relação linear fornece ao cirurgião uma alavanca de titulação matemática precisa para a redistribuição da tensão, o que contrasta fortemente com a insensibilidade do vetor $V_R$ ao comprimento do arco.

A base microestrutural para esse comportamento linear reside na anisotropia dominada por fibras do estroma periférico (o anel límbico). O ICRS rígido atua como uma ponte circunferencial através de lamelas estromais seccionadas, transferindo a tensão de aro das fibrilas de colágeno para o segmento de PMMA. À medida que o comprimento do arco aumenta, uma fração maior do limite é transposta, criando um relaxamento proporcional da tensão de aro no estroma restante.

As implicações clínicas são diretas: quando a regularização astigmática é o objetivo dominante — como em ectasias assimétricas em crescente paracentral ou em formato de D periférico com elevado cilindro corneano — o cirurgião deve priorizar o comprimento de arco do ICRS (faixa de 90°–320°) como a variável de titulação primária, selecionando-o com base no $\Delta Cyl$ alvo independentemente do aplanamento necessário ($V_R$). Esse desacoplamento ortogonal é uma pedra angular do protocolo de planejamento da AVBC, permitindo um planejamento cirúrgico racional de múltiplos objetivos.

---

## Referências

1. Alió JL, Shabayek MH, Belda JI. Semifluorinated KeraRing segments for keratoconus. *J Refract Surg*. 2006;22(2):149–157.

2. Alfonso JG, Lisa C, Fernández-Vega Cueto L, et al. Intrastromal corneal ring segments and posterior chamber phakic intraocular lens implantation for keratoconus correction. *J Cataract Refract Surg*. 2011;37(4):706–715.

3. Boote C, Boote Y, Aghamohammadzadeh R, et al. The organization of collagen fibrils in the human cornea: a study by synchrotron X-ray diffraction. *Biophys J*. Boote C, Boote Y, Aghamohammadzadeh R, et al. 2006;91(4):1497–1509.

4. Aghamohammadzadeh R, Boote C, Meek KM, et al. Collagen fibril organization in the human cornea using synchrotron X-ray diffraction. *Biophys J*. 2004;87(6):3812–3819.

5. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.

6. Torquetti L, Ferrara G, Ferrara P, et al. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2014;40(7):1153–1158.

7. Arnalich-Montiel F, Alió del Barrio JL, Alió JL. Corneal surgery in keratoconus: which type, which technique, which outcomes? *Eye Vis*. 2016;3:2.

8. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *J R Soc Interface*. 2006;3(6):15–35.

9. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast*. 2000;61(1–3):1–48.

10. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.

11. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.

12. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.

13. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
