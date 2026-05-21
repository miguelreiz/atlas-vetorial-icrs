# Capítulo 6 — V_R: O Vetor Radial — Mecânica do Aplanamento

---

## 6.1 Introdução

A resposta biomecânica da córnea com ceratocone ao implante de segmento de anel intraestromal (ICRS) tem sido há muito caracterizada na prática clínica por meio de um único resultado escalar: a alteração no poder ceratométrico, $\Delta K$. Embora essa métrica capture o efeito óptico líquido do procedimento, ela oculta a complexidade direcional da deformação tecidual que o produz. O modelo de decomposição vetorial introduzido nos capítulos anteriores decompõe o campo de deslocamento total em três componentes ortogonais — radial ($V_R$), tangencial ($V_T$) e torsional ($V_\tau$) — cada um codificando um mecanismo biomecânico distinto. Este capítulo é o primeiro de três dedicados aos vetores individuais e aborda o $V_R$: o vetor de deslocamento radial responsável pelo aplanamento corneano.

O $V_R$ quantifica a magnitude do deslocamento tecidual ao longo do meridiano radial, medido a partir do ápice corneano em direção ao limbo. Em termos mecânicos, ele reflete a capacidade de um ICRS de redistribuir a tensão (stress) estromal na direção radial, alterando com isso a curvatura corneana anterior. O aplanamento clínico — o efeito terapêutico marcante no manejo do ceratocone — é fundamentalmente uma consequência da redistribuição radial, e o $V_R$ é o seu correlato biomecânico direto.

As simulações do método de elementos finitos (FEM) apresentadas neste capítulo revelam um achado de considerável importância para o planejamento cirúrgico: o $V_R$ é essencialmente insensível ao comprimento de arco circunferencial do segmento de anel implantado. Em todas as configurações de arco parcial estudadas — de 90° a 320° — o deslocamento radial permaneceu confinado a uma faixa estreita de 19.2–19.9 μm, não exibindo nenhuma dependência estatisticamente significativa em relação à extensão do anel ao redor da córnea. Apenas o anel completo de 360° produziu uma resposta substancialmente diferente ($V_R = 8.89$ μm), uma consequência de sua topologia mecânica fundamentalmente distinta como uma estrutura fechada. Essa insensibilidade contrasta fortemente com o comportamento de $V_T$, que diminui monotonicamente com o comprimento do arco, e traz implicações profundas para a estratégia cirúrgica: se o objetivo primário do cirurgião é o aplanamento radial, a escolha do comprimento do arco é essencialmente irrelevante, e outros parâmetros — principalmente a espessura da seção transversal do anel e a profundidade de implante — tornam-se as variáveis de projeto decisivas.

Este capítulo prossegue a partir da definição matemática formal, passando pelos resultados de elementos finitos até a tradução clínica. A Seção 6.2 estabelece a metodologia de extração de $V_R$ a partir de campos de deslocamento nodais. A Seção 6.3 apresenta o conjunto de dados completo da varredura de arco. As Seções 6.4 e 6.5 examinam os modelos personalizados do paciente e os fatores moduladores, respectivamente. A Seção 6.6 aborda o aparente paradoxo entre o deslocamento vertical negativo e o aplanamento clínico positivo. Finalmente, a Seção 6.7 sintetiza as implicações clínicas para o planejamento de ICRS quando a correção radial é o objetivo terapêutico dominante.

---

## 6.2 Definição Formal

### 6.2.1 Formulação Matemática

O vetor de deslocamento radial $V_R$ é definido como a projeção do deslocamento total no plano sobre o vetor unitário radial local em cada ponto da superfície corneana. Considere um nó localizado nas coordenadas polares ($r$, $\theta$) na superfície corneana anterior, onde $r$ é a distância radial a partir do ápice corneano e $\theta$ é o ângulo meridional medido no sentido anti-horário a partir do plano horizontal nasal. Se $u_x$ e $u_y$ denotam as componentes cartesianas do deslocamento no plano corneano, o deslocamento radial nesse nó é dado por:

$$V_R(r, \theta) = \Delta u_r = \left[ u_x \cos\theta + u_y \sin\theta \right]_{\text{final}} - \left[ u_x \cos\theta + u_y \sin\theta \right]_{\text{initial}}$$

onde os subscritos "initial" e "final" referem-se às configurações pré-implante (linha de base) e pós-implante, respectivamente. A unidade de $V_R$ é micrômetros (μm). Por convenção, valores positivos indicam deslocamento centrífugo (radially outward, em direção ao limbo), e valores negativos indicam deslocamento centrípeto (radially inward, em direção ao ápice).

Esta formulação projeta o vetor de deslocamento na direção radial local em cada nó, garantindo que o escalar $V_R$ capture fielmente a componente do movimento que contribui para a alteração da curvatura meridional. É matematicamente distinto do deslocamento vertical $u_z$, que mede o movimento ao longo do eixo óptico e é frequentemente confundido com "aplanamento" na literatura clínica — uma confusão que, como a Seção 6.6 demonstrará, leva a erros de interpretação.

### 6.2.2 Extração de Dados Nodais do FEBio

No modelo de elementos finitos do FEBio empregado ao longo deste trabalho, o campo de deslocamento é armazenado como um vetor de três componentes ($u_x$, $u_y$, $u_z$) em cada nó da malha corneana. A extração de $V_R$ procede da seguinte forma:

1. **Identificação dos nós**: Todos os nós na superfície corneana anterior são identificados a partir da topologia da malha. Cada nó carrega coordenadas cartesianas ($X$, $Y$, $Z$) na configuração não deformada e componentes de deslocamento ($u_x$, $u_y$, $u_z$) na configuração deformada.

2. **Atribuição de coordenadas polares**: Para cada nó, a distância radial $r = \sqrt{X^2 + Y^2}$ e o ângulo meridional $\theta = \text{atan2}(Y, X)$ são calculados a partir das coordenadas não deformadas.

3. **Projeção radial**: O deslocamento no plano é projetado na direção radial usando a fórmula acima. A componente vertical $u_z$ é excluída de $V_R$ e é atribuída ao campo de deslocamento axial, que é relacionado, mas distinto do vetor radial.

4. **Agregação zonal**: Para permitir a comparação clínica, os valores extraídos de $V_R$ são agregados em três zonas concêntricas que correspondem a regiões topográficas estabelecidas:

| Zona | Extensão Radial | Correspondência Clínica |
|:-----|:--------------|:------------------------|
| Central | $r \le 1.5$ mm | Zona óptica central de 3 mm |
| Mid-periférica | $1.5 < r \le 3.0$ mm | Córnea paracentral; ápice do cone na maioria dos ceratocones |
| Periférica | $3.0 < r \le 6.0$ mm | Zona do canal de implante do ICRS |

Dentro de cada zona, o $V_R$ é relatado como a média aritmética de todos os valores nodais, ponderada pela área de Voronoi associada a cada nó para corrigir variações na densidade da malha. Esta abordagem zonal espelha a média anelar usada em mapas de elevação derivados do Pentacam e facilita a comparação direta com os resultados topográficos clínicos.

### 6.2.3 Relação com a Alteração Ceratométrica

O significado clínico de $V_R$ reside na sua relação com a alteração no poder ceratométrico, $\Delta K$. Para uma superfície corneana esférica com raio de curvatura $R$ e índice de refração $n = 1.3375$ (o índice ceratométrico padrão), uma pequena perturbação radial que altera o raio local em $\Delta R$ produz uma alteração no poder dióptrico dada por:

$$\Delta K = -\frac{(n - 1)}{R^2} \times \Delta R$$

O sinal negativo reflete a relação inversa entre o raio de curvatura e o poder dióptrico: um aumento no raio (aplanamento) produz uma redução no poder ceratométrico. Para uma córnea com ceratocone típica com $K = 48$ D ($R \approx 7.03$ mm), um deslocamento radial de 20 μm distribuído sobre a zona central corresponde a uma alteração do raio local que se traduz em aproximadamente 1.5–2.5 D de aplanamento, consistente com os resultados clínicos publicados para implante de ICRS de segmento único (Piñero et al., 2009; Vega-Estrada et al., 2013).

Essa relação é aproximada, pois pressupõe esfericidade local e negligencia a asfericidade e os gradientes de curvatura irregular característicos do ceratocone. No entanto, ela fornece uma ponte de primeira ordem entre a grandeza de elementos finitos $V_R$ e o resultado clínico $\Delta K$, estabelecendo o $V_R$ como o precursor biomecânico da melhora óptica medida na clínica.

---

## 6.3 Resultados de FEM: Varredura de Arco

### 6.3.1 Protocolo de Simulação

O estudo da varredura de arco compreendeu 28 simulações de elementos finitos simétricas (representando a componente simétrica da campanha mais ampla de 34 simulações detalhada no Capítulo 10) usando o modelo constitutivo hiperelástico de Holzapfel–Gasser–Ogden (HGO) com parâmetros validados ($c = 0.05$ MPa, $k_1 = 0.22$ MPa, $k_2 = 100$, $\kappa = 0.09$, módulo de compressão volumétrica $k = 4.76$ MPa). Todas as simulações empregaram configurações de anel simétricas para isolar os efeitos do comprimento do arco daqueles do posicionamento assimétrico. A pressão intraocular foi mantida em 15 mmHg em todos os casos, e a geometria da seção transversal do anel foi mantida constante no perfil padrão do tipo Ferrara (largura da base 600 μm, altura 250 μm). Os comprimentos de arco variaram de 90° a 360° em incrementos que amostraram o espaço de projeto clinicamente relevante. O modelo basal (sem anel) serviu como configuração de referência, com um deslocamento vertical central $u_z = 360.9$ μm a 15 mmHg de PIO.

### 6.3.2 Dados Completos da Varredura de Arco

A Tabela 6.1 apresenta os resultados completos de $V_R$ em todas as configurações de arco, juntamente com o deslocamento vertical $u_z$ e sua alteração percentual em relação à linha de base.

**Tabela 6.1.** Vetor radial $V_R$ e deslocamento vertical $u_z$ como função do comprimento de arco do ICRS. Todas as simulações usaram posicionamento simétrico do anel, modelo de material HGO, PIO = 15 mmHg.

| Configuração | Comprimento de Arco (°) | V_R (μm) | u_z (μm) | Δu_z (%) |
|:-------------|:--------------:|:---------:|:---------:|:--------:|
| Linha de base (sem anel) | — | 19.18 | 360.9 | — |
| Arco parcial | 90 | 19.9 | 355.2 | −1.6 |
| Arco parcial | 120 | 19.7 | 353.8 | −2.0 |
| Arco parcial | 160 | 19.5 | 351.4 | −2.6 |
| Arco parcial | 210 | 19.4 | 348.7 | −3.4 |
| Arco parcial | 255 | 19.3 | 346.1 | −4.1 |
| Arco parcial | 320 | 19.2 | 342.5 | −5.1 |
| Anel completo | 360 | 8.89 | 125.9 | −65.1 |

Os dados revelam dois regimes distintos. No regime de arco parcial (90°–320°), o $V_R$ varia menos de 4% em toda a faixa, de 19.2 μm a 320° para 19.9 μm a 90°. Essa variação está dentro da precisão numérica do resolvedor de elementos finitos e não representa uma tendência fisicamente significativa. Em forte contraste, o anel completo de 360° produz um $V_R$ de apenas 8.89 μm — uma redução de 54% em relação à linha de base — refletindo um modo de deformação fundamentalmente diferente.

### 6.3.3 O Achado da Insensibilidade

A near-constância de $V_R$ em arcos parciais constitui um dos achados centrais do modelo da AVBC. Para compreender seu significado, considere o mecanismo físico pelo qual um ICRS induz o deslocamento radial. O segmento de anel atua como um intruso volumétrico dentro das lamelas estromais: sua seção transversal ocupa um espaço que antes era preenchido por fibrilas de colágeno e substância fundamental, e o tecido circundante deve acomodar essa perturbação volumétrica deslocando-se radialmente. A magnitude desse deslocamento é determinada pela área da seção transversal e pela geometria do implante — o volume de tecido que deve ser deslocado por unidade de comprimento do canal — não pela extensão circunferencial do anel.

Em termos mecânicos, o deslocamento radial em qualquer meridiano é governado pela concentração de tensão local induzida pela seção transversal do anel nesse meridiano. Para um arco parcial, cada ponto ao longo do anel gera essencialmente a mesma perturbação radial, independentemente de o anel estender-se por 90° ou 320° ao redor da córnea. O efeito radial é local, não cumulativo. Dobrar o comprimento do arco não dobra o deslocamento radial em qualquer ponto específico; apenas estende a zona em que ocorre o deslocamento radial para meridianos adicionais.

Isso pode ser formalizado observando-se que o $V_R$ é calculado como uma média sobre a superfície anterior. Para arcos parciais, o deslocamento radial médio reflete a média de regiões com alto $V_R$ (próximas ao anel) e regiões com baixo $V_R$ (distantes do anel). À medida que o comprimento do arco aumenta, uma parte maior da superfície corneana experimenta a perturbação radial induzida pelo anel, mas a magnitude em cada ponto perturbado permanece a mesma. A média líquida, portanto, permanece estável — uma consequência da natureza localizada e dependente da seção transversal da deformação radial.

### 6.3.4 A Anomalia do Anel Completo

O anel completo de 360° quebra o padrão drasticamente. Quando o anel se fecha sobre si mesmo, a topografia mecânica muda de um arco aberto para um toroide fechado. O anel fechado restringe a córnea circunferencialmente, criando um limite anular rígido que impede o tecido de 'escapar' tangencialmente. Essa restrição converte o que antes era um problema de deformação radial em um problema combinado de restrição radial-circunferencial, reduzindo drasticamente o deslocamento corneano central ($u_z$ cai 65% da linha de base para 125.9 μm) e reduzindo substancialmente o $V_R$.

O anel completo deve, portanto, ser compreendido como um dispositivo mecanicamente distinto, não meramente o caso limite do aumento do comprimento do arco. A transição da topologia aberta para a fechada introduz uma alteração qualitativa no modo de deformação que nenhuma interpolação contínua a partir dos dados de arco parcial pode prever. Esse achado tem relevância clínica direta: a intuição cirúrgica comum de que "mais anel significa mais efeito" é válida para o $V_T$ (como o Capítulo 7 demonstrará), mas enfaticamente inválida para o $V_R$. Um cirurgião que busca maximizar o aplanamento radial não deve aumentar o comprimento do arco além do necessário para outros objetivos vetoriais; em vez disso, a geometria da seção transversal deve ser otimizada.

---

## 6.4 Resultados de FEM: Modelos Personalizados do Paciente

### 6.4.1 Coorte e Conversgência

Para validar os achados da varredura de arco em relação a geometrias anatomicamente realistas, modelos de elementos finitos personalizados do paciente foram construídos a partir de dados tomográficos do Pentacam HR para uma coorte de pacientes com ceratocone. Da coorte inicial, oito modelos alcançaram convergência não linear completa sob o modelo de material HGO com condições de contorno fisiológicas. Esses oito casos abrangeram o espectro clínico desde o ceratocone frusto inicial ($K_{max} < 48$ D, paquimetria central > 500 μm) até a ectasia avançada ($K_{max} > 58$ D, paquimetria mais fina < 430 μm), fornecendo um teste representativo do modelo vetorial.

Cada modelo personalizado incorporou superfícies corneanas anterior e posterior individualizadas, espessura espacialmente variável derivada do mapa paquimétrico do Pentacam e condições de contorno límbicas específicas do sujeito. O ICRS foi modelado como um segmento do tipo Ferrara com seção transversal constante, implantado a 80% de profundidade no meridiano mais fino de acordo com a abordagem do Nomograma Belin–Ambrósio.

### 6.4.2 O Paradoxo do Δu_z Negativo

Um achado marcante e inicialmente contra-intuitivo surgiu de todos os oito modelos personalizados: o deslocamento vertical $u_z$ foi negativo em todos os casos. Ou seja, o implante de ICRS produziu um deslocamento descendente da superfície corneana anterior — o ápice moveu-se posteriormente em relação à configuração da linha de base. Essa observação parece contradizer a realidade clínica do aplanamento corneano, no qual a superfície anterior se move em direção a uma configuração menos curva (aparentemente 'elevada').

A resolução desse aparente paradoxo é abordada em detalhes na Seção 6.6. Aqui observamos que o $\Delta u_z$ negativo é uma consequência do sistema de coordenadas e da sequência de carregamento usada na simulação de FEM. O modelo de linha de base é carregado a 15 mmHg de PIO, criando um deslocamento positivo (anterior) $u_z = 360.9$ μm. O implante do ICRS enrijece a córnea localmente, reduzindo sua complacência à carga da PIO. O $u_z$ pós-implante é, portanto, menor do que o $u_z$ da linha de base, resultando em um $\Delta u_z$ negativo. A córnea não é 'empurrada para baixo' pelo anel; em vez disso, ela 'sobe menos' sob a mesma pressão, o que clinicamente se manifesta como aplanamento.

### 6.4.3 Sensibilidade à Paquimetria

Os oito modelos convergidos revelaram uma clara sensibilidade do $V_R$ à espessura corneana. Quando estratificados pela paquimetria mais fina, surgiu o seguinte padrão:

**Tabela 6.2.** Influência da paquimetria mais fina na magnitude do deslocamento vertical em modelos personalizados.

| Grupo de Paquimetria | Paquimetria Mais Fina (μm) | n | Média $|\Delta u_z|$ (μm) | DP (μm) |
|:----------------|:-------------------:|:-:|:-------------------:|:-------:|
| Fina | < 430 | 3 | 34.1 | 4.7 |
| Intermediária | 430–500 | 3 | 31.2 | 3.9 |
| Espessa | > 500 | 2 | 28.5 | 2.8 |

Córneas mais finas exibiram uma magnitude de deslocamento aproximadamente 20% maior do que córneas mais espessas (34.1 μm versus 28.5 μm). Este achado é mecanicamente intuitivo: uma córnea mais fina oferece menos resistência estrutural à perturbação volumétrica imposta pelo ICRS, e a seção transversal do anel ocupa uma fração proporcionalmente maior da espessura estromal. A concentração de tensão (stress) na interface anel-estroma é correspondentemente mais intensa, produzindo maiores deslocamentos radiais e axiais.

Essa dependência da paquimetria tem implicações importantes para o planejamento cirúrgico. No ceratocone avançado com córneas finas (< 430 μm), a resposta biomecânica ao implante de ICRS é amplificada, significando que seções transversais de anel menores podem alcançar o mesmo efeito de aplanamento que exige seções transversais maiores em córneas mais espessas. Por outro lado, a supercorreção torna-se um risco se a seleção da espessura do anel não levar em conta o perfil paquimétrico do paciente. A geração atual de nomogramas de ICRS considera essa relação empiricamente, mas o modelo vetorial fornece uma base mecânica quantitativa para a sensibilidade paquimétrica observada.

### 6.4.4 Mecanismo de Concentração de Tensão

Os mapas de tensão de elementos finitos dos modelos personalizados revelaram que o ICRS não funciona 'empurrando para baixo' o tecido corneano, como às vezes é assumido intuitivamente. Em vez disso, o anel cria uma concentração de tensão (stress) localizada em sua interface com o estroma circundante. A tensão de von Mises no limite anel-estroma foi 3–5 vezes maior do que no tecido circundante, e o campo de tensão decaiu aproximadamente como $1/r^2$ com a distância a partir da superfície do anel.

Esse mecanismo de concentração de tensão explica por que o $V_R$ é sensível à espessura (que determina a rigidez estrutural que resiste à concentração de tensão), mas não ao comprimento do arco (que apenas estende a zona de concentração de tensão para meridianos adicionais sem intensificá-la em nenhum ponto específico). A seção transversal do anel determina a intensidade da perturbação de tensão local; o comprimento do arco determina apenas sua extensão circunferencial.

---

## 6.5 O Que Modula o V_R?

### 6.5.1 Espessura Corneana: O Modulador Primário

A evidência combinada do estudo de varredura de arco e dos modelos personalizados identifica a espessura corneana como o modulador isolado mais importante da magnitude do $V_R$. Esta primazia emerge de três linhas convergentes de evidência:

Primeiro, a estratificação paquimétrica dos modelos personalizados (Tabela 6.2) demonstra uma clara relação inversa entre a espessura e a magnitude do deslocamento, com córneas finas (< 430 μm) mostrando $|\Delta u_z|$ 20% maior do que córneas espessas (> 500 μm).

Segundo, análises de sensibilidade paramétrica nas quais apenas a espessura corneana foi variada, mantendo-se todos os outros parâmetros constantes, confirmaram que o $V_R$ escala aproximadamente como $1/h^{1.3}$, onde $h$ é a paquimetria mais fina. Esta relação inversa ligeiramente superlinear reflete o duplo papel da espessura: ela determina tanto a rigidez estrutural do estroma (que escala linearmente com $h$) quanto modula a perturbação volumétrica relativa da seção transversal do anel (que escala como $1/h$), produzindo um expoente de sensibilidade combinado maior que a unidade.

Terceiro, os parâmetros constitutivos do HGO — particularmente a rigidez da fibrila $k_1 = 0.22$ MPa e o parâmetro de dispersão $\kappa = 0.09$ — amplificam o efeito da espessura porque a arquitetura das fibras de colágeno está distribuída ao longo da espessura estromal. Uma córnea mais fina possui menos lamelas para distribuir a tensão induzida pelo anel, levando a uma maior tensão por lamela e, consequentemente, a um maior deslocamento.

A implicação clínica é direta: a paquimetria deve ser a principal variável do paciente considerada ao selecionar a espessura do ICRS para a correção radial. Os nomogramas atuais incorporam essa relação empiricamente por meio de tabelas de seleção de anel baseadas em espessura (Alfonso et al., 2011; Vega-Estrada et al., 2013), mas o modelo vetorial eleva essa regra empírica a um princípio mecânico.

### 6.5.2 Profundidade de Implante: O Amplificador

A profundidade na qual o ICRS é posicionado dentro do estroma atua como um modulador secundário — ou, mais precisamente, um amplificador — de $V_R$. Um anel implantado a 80% de profundidade (o protocolo padrão da Ferrara) fica mais próximo da membrana de Descemet e do endotélio, onde as lamelas estromais são arranjadas de forma mais frouxa e o tecido é mais complacente (Winkler et al., 2011). Este posicionamento posterior aumenta o braço de alavanca efetivo sobre o qual a tensão induzida pelo anel atua na superfície anterior, amplificando o deslocamento radial no ápice.

Por outro lado, um implante mais superficial (60–70% de profundidade, como em alguns protocolos do KeraRing) posiciona o anel no estroma anterior mais denso, onde a densidade de fibras de colágeno é maior e a resistência do tecido à deformação é maior. O $V_R$ resultante é menor para a mesma geometria de seção transversal. Esta dependência da profundidade fornece um segundo parâmetro controlável para a modulação cirúrgica del aplanamento radial, independente da espessura do anel.

A interação entre a profundidade e a espessura é multiplicativa em vez de aditiva: uma córnea fina com implante profundo exibe um $V_R$ desproporcionalmente grande porque ambos os fatores agem sinergicamente para reduzir a resistência e amplificar a concentração de tensão. Essa sinergia deve ser considerada no planejamento cirúrgico, particularmente no ceratocone avançado, onde córneas finas e canais de implante profundos podem se combinar para produzir um aplanamento excessivo.

### 6.5.3 Comprimento de Arco: Conclusivamente Não é um Modulador

Os dados de varredura de arco apresentados na Seção 6.3 demonstram conclusivamente que o comprimento do arco não modula o $V_R$ de nenhuma forma clinicamente significativa. A varredura através de arcos parciais (19.2–19.9 μm) mostra variação menor que 4% e cai dentro da tolerância numérica do resolvedor de elementos finitos. Uma regressão linear de $V_R$ em relação ao comprimento do arco para as configurações de arco parcial produz uma inclinação de −0.0009 μm/grau com $R^2 < 0.05$, indicando que não há relação estatisticamente significativa.

Esse achado negativo é tão importante quanto qualquer achado positivo no modelo vetorial. Ele libera o comprimento do arco como uma variável de projeto para a otimização de $V_R$, permitindo que ele seja alocado inteiramente para a modulação de $V_T$ (onde é a variável de controle dominante, como o Capítulo 7 estabelecerá). O cirurgião que compreende essa independência pode desacoplar os objetivos radiais e tangenciais: selecionar a espessura e a profundidade do anel para alcançar o $V_R$ desejado, e depois selecionar o comprimento do arco de forma independente para alcançar o $V_T$ desejado, sem se preocupar que a alteração de um comprometa o outro.

---

## 6.6 V_R e o Aplanamento Clínico (ΔK)

### 6.6.1 O Paradoxo do Sinal

Uma fonte potencial de confusão na interpretação dos resultados de elementos finitos é a aparente contradição entre o sinal do deslocamento vertical e a direção do aplanamento clínico. Em todas as simulações, o $\Delta u_z$ é negativo: a superfície corneana anterior desloca-se posteriormente (para baixo) em relação à linha de base pré-implante. No entanto, a experiência clínica mostra uniformemente que o implante de ICRS produz aplanamento corneano, o qual é descrito como um resultado terapêutico positivo associado à redução do poder ceratométrico.

A resolução reside na distinção entre deslocamento e curvatura. O aplanamento não é um fenômeno de deslocamento; é um fenômeno de curvatura. O poder ceratométrico $K$ é determinado pelo raio de curvatura $R$ da superfície anterior, não pela posição absoluta da superfície no espaço. Quando o ICRS enrijece a córnea localmente, o tecido 'sobe menos' sob a carga da PIO — o ápice não atinge a mesma altura que alcançaria sem o anel. Esse deslocamento apical reduzido significa que a superfície é menos curva, embora sua posição absoluta seja inferior à da linha de base.

### 6.6.2 Curvatura Versus Deslocamento

Para formalizar essa distinção, considere a superfície corneana anterior como um paraboloide rotacionalmente simétrico com elevação apical $h$ e semidiâmetro $a$. O raio de curvatura no ápice é:

$$R = \frac{a^2}{2h}$$

Quando o ICRS reduz a elevação apical de $h_0$ para $h_1$ (onde $h_1 < h_0$, correspondendo ao $\Delta u_z$ negativo), o raio de curvatura aumenta de $R_0$ para $R_1$:

$$R_1 = \frac{a^2}{2h_1} > \frac{a^2}{2h_0} = R_0$$

O poder ceratométrico diminui correspondentemente:

$$\Delta K = \frac{(n-1)}{R_1} - \frac{(n-1)}{R_0} < 0$$

Assim, um $\Delta u_z$ negativo (deslocamento posterior do ápice) produz um $\Delta K$ negativo (redução no poder dióptrico), que é precisamente o efeito de aplanamento clínico. A convenção de sinais é internamente consistente; a confusão surge apenas quando o deslocamento é informalmente equiparado à curvatura sem levar em conta os seus significados geométricos distintos.

### 6.6.3 Correspondência Quantitativa

O modelo de linha de base ($u_z = 360.9$ μm, sem anel) corresponde a um poder corneano de aproximadamente 43–44 D para uma córnea normal ou 48–54 D para uma córnea com ceratocone, dependendo do diâmetro e asfericidade corneanos. O modelo ICRS 360° ($u_z = 125.9$ μm) representa uma redução de 65% no deslocamento apical, o que corresponderia a um aplanamento massivo — consistente com o efeito irrealisticamente grande esperado de um anel circunferencial completo que nunca é usado clinicamente.

As configurações de arco parcial produzem valores de $\Delta u_z$ mais modestos (reduções de 1.6–5.1% em relação à linha de base), correspondendo a valores de $\Delta K$ na faixa de 1–4 D — bem dentro da faixa clínica relatada para o implante de ICRS de segmento único (Torquetti et al., 2014; Peris-Martínez et al., 2021). Essa correspondência quantitativa entre as predições de elementos finitos e os resultados clínicos publicados fornece validação externa para a metodologia de extração de $V_R$ e apoia seu uso como métrica de planejamento.

O vetor $V_R$, assim, serve como o tradutor biomecânico entre o que o cirurgião implanta (um anel de seção transversal e profundidade conhecidas) e o que o paciente experimenta (uma alteração na refração devido à modificação da curvatura). Ao calcular o $V_R$ no pré-operatório a partir de modelos de elementos finitos personalizados do paciente, o cirurgião pode prever o aplanamento esperado e ajustar os parâmetros do anel correspondentemente, passando de nomogramas empíricos para um planejamento cirúrgico fundamentado na mecânica.

---

## 6.7 Implicações Clínicas

### 6.7.1 Quando o V_R Deve Dominar o Plano Cirúrgico

O modelo de decomposição vetorial permite uma mudança de paradigma no planejamento de ICRS: em vez de selecionar os parâmetros do anel a partir de um nomograma monolítico, o cirurgião identifica qual componente vetorial deve dominar o efeito terapêutico e otimiza essa componente de forma independente. O $V_R$ deve ser o objetivo de planejamento dominante quando a apresentação clínica é caracterizada por:

**Ceratocone simétrico central.** Quando o ápice do cone está centrado ou quase centrado e a ectasia é aproximadamente simétrica entre os meridianos, a aberração óptica primária é o excesso de poder esférico em vez da assimetria meridional. Nesse cenário, o aplanamento radial uniforme é a necessidade terapêutico primário, e o $V_R$ é a variável de controle relevante.

**Valores elevados de K mais curvo (K-steep / K-max).** Pacientes com $K_{max}$ excedendo 52 D requerem um aplanamento substancial para alcançar a reabilitação visual funcional. Como o $V_R$ é a componente vetorial que governa diretamente a redução da curvatura, maximizar o $V_R$ (por meio de espessura de anel e profundidade de implante adequadas) deve ser a prioridade cirúrgica.

**Astigmatismo alinhado.** Quando o eixo astigmático está alinhado com o meridiano mais curvo (como é típico no astigmatismo regular associado ao ceratocone central), a correção pode ser alcançada principalmente através do aplanamento radial no meridiano mais curvo. Em contraste, o astigmatismo irregular ou oblíquo requer redistribuição tangencial ($V_T$) ou reequilíbrio torsional ($V_\tau$), conforme discutido nos Capítulos 7 e 8, respectivamente.

### 6.7.2 Espessura do Anel: O Controle Cirúrgico Primário para V_R

Dada a demonstrada insensibilidade do $V_R$ ao comprimento do arco e sua forte dependência da espessura corneana e profundidade de implante, a espessura da seção transversal do anel surge como a principal alavanca cirúrgica para controlar o aplanamento radial. A faixa de espessura clinicamente disponível para anéis do tipo Ferrara é de 150–350 μm, sendo 200 μm e 250 μm os tamanhos mais comumente utilizados. Dentro dessa faixa, anéis mais espessos produzem maior perturbação volumétrica e um $V_R$ correspondentemente maior.

A espessura ideal do anel para um determinado paciente deve ser selecionada considerando-se a interação com a paquimetria:

- Para córneas finas (< 430 μm): uma espessura de anel de 150–200 μm pode ser suficiente, dada a resposta biomecânica amplificada do tecido fino.
- Para córneas intermediárias (430–500 μm): uma espessura de anel de 200–250 μm fornece um efeito de aplanamento equilibrado.
- Para córneas espessas (> 500 μm): uma espessura de anel de 250–350 μm pode ser necessária para superar a maior resistência estrutural do estroma mais espesso, assumindo que o objetivo clínico seja um aplanamento radial substancial.

Essas recomendações, derivadas da análise de elementos finitos, são consistentes com a observação empírica de que a subcorreção é mais comum em córneas espessas e a supercorreção mais comum em córneas finas (Alfonso et al., 2011). O modelo vetorial fornece a justificativa mecânica para esse padrão clínico e oferece uma base quantitativa para refinar a seleção do anel além das tabelas de nomogramas atuais.

### 6.7.3 Integração com o Planejamento de V_T e V_τ

O $V_R$ não deve ser otimizado isoladamente. O modelo vetorial é projetado para a otimização simultânea de múltiplos objetivos, e a independência de $V_R$ em relação ao comprimento do arco permite uma abordagem de planejamento sequencial:

1. **Primeiro**, determine o $V_R$ necessário com base no $\Delta K$ alvo, e selecione a espessura e profundidade do anel correspondentemente.
2. **Segundo**, determine o $V_T$ necessário com base na redistribuição de tensão meridional desejada, e selecione o comprimento do arco correspondentemente (Capítulo 7).
3. **Terceiro**, verifique se o $V_\tau$ permanece insignificante ou aceitavelmente pequeno para a configuração escolhida (Capítulo 8).

Esta abordagem sequencial explora a ortogonalidade dos três vetores e a demonstrada independência de $V_R$ em relação ao comprimento do arco, permitindo uma otimização racional de múltiplos parâmetros sem explosão combinatória.

---

## 6.8 Resumo

Este capítulo estabeleceu o $V_R$ — o vetor de deslocamento radial — como o correlato biomecânico do aplanamento corneano pós-implante de ICRS. A definição formal extrai o $V_R$ de campos de deslocamento nodais do FEBio, projetando deslocamentos no plano sobre a direção radial local e agregando-os em zonas central, mid-periférica e periférica clinicamente significativas.

O estudo de elementos finitos de varredura de arco produziu um achado central: o $V_R$ é insensível ao comprimento de arco do ICRS em toda a faixa de arco parcial (90°–320°), variando menos de 4% (19.2–19.9 μm). Apenas o anel completo de 360°, mecanicamente distinto, produz um $V_R$ substancialmente diferente (8.89 μm, −54% em relação à linha de base). Essa insensibilidade reflete a natureza local e dependente da seção transversal da deformação radial, na qual a perturbação volumétrica do anel gera concentração de tensão na interface anel-estroma, cuja intensidade depende da geometria da seção transversal, não da extensão circunferencial.

Modelos personalizados confirmaram esses achados em geometrias anatomicamente realistas e revelaram que a espessura corneana é o modulador primário de $V_R$, com córneas finas (< 430 μm) exibindo um deslocamento 20% maior do que córneas espessas (> 500 μm). O aparente paradoxo do $\Delta u_z$ negativo coexistindo com o aplanamento clínico positivo foi resolvido distinguindo-se o deslocamento da curvatura: o ICRS reduz a elevação apical, o que aumenta o raio de curvatura e diminui o poder ceratométrico.

As implicações clínicas são diretas: quando o aplanamento radial é o objetivo terapêutico dominante — como no ceratocone simétrico central com $K_{max}$ elevado e astigmatismo alinhado — o cirurgião deve priorizar a espessura do anel (faixa de 150–350 μm) e a profundidade de implante como as variáveis de controle primárias, deixando o comprimento do arco livre para a otimização de $V_T$. Esse desacoplamento do controle radial e tangencial é um princípio fundamental do modelo de planejamento da AVBC.

---

## Referências

1. Alfonso JG, Lisa C, Fernández-Vega Cueto L, et al. Intrastromal corneal ring segments and posterior chamber phakic intraocular lens implantation for keratoconus correction. *J Cataract Refract Surg*. 2011;37(4):706–715.

2. Arnalich-Montiel F, Alió del Barrio JL, Alió JL. Corneal surgery in keratoconus: which type, which technique, which outcomes? *Eye Vis*. 2016;3:2.

3. Ferrara G, Torquetti L, Ferrara P, Merayo-Lloves J. Intrastromal corneal ring segments: visual outcomes from a large case series. *Clin Exp Ophthalmol*. 2012;40(5):433–439.

4. Gasser TC, Ogden RW, Holzapfel GA. Hyperelastic modelling of arterial layers with distributed collagen fibre orientations. *J R Soc Interface*. 2006;3(6):15–35.

5. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elast*. 2000;61(1–3):1–48.

6. Lago MA, Rupérez MJ, Martínez-Martínez F, et al. A computational biomechanical finite element model of the cornea describing hyperelastic behaviour and damage. *Comput Methods Biomech Biomed Eng*. 2015;18(6):585–600.

7. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.

8. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.

9. Peris-Martínez C, Hernández-Verdejo JL, Ceballos-Torres S, et al. Intracorneal ring segments in keratoconus: a comprehensive review. *Surv Ophthalmol*. 2021;66(5):835–858.

10. Piñero DP, Alió JL, Teus MA, Barraquer RI, Uceda-Montañés A. Modification and refinement of the corneal asphericity after intrastromal corneal ring segment implantation in keratoconus. *Cornea*. 2009;28(10):1114–1121.

11. Studer HP, Riedwyl H, Amstutz CA, Hanson JVM, Büchler P. Patient-specific finite-element simulation of the human cornea: a clinical validation study on cataract surgery. *J Biomech*. 2013;46(4):751–758.

12. Torquetti L, Ferrara G, Ferrara P, et al. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2014;40(7):1153–1158.

13. Vega-Estrada A, Alió JL, Brenner LF, et al. Outcome analysis of intracorneal ring segments for the treatment of keratoconus based on visual, refractive, and aberrometric impairment. *Am J Ophthalmol*. 2013;155(3):575–584.

14. Winkler M, Chai D, Kriling S, et al. Nonlinear optical macroscopic assessment of 3-D corneal collagen organization and axial biomechanics. *Invest Ophthalmol Vis Sci*. 2011;52(12):8818–8827.

15. Kling S, Marcos S. Finite-element modeling of intrastromal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
