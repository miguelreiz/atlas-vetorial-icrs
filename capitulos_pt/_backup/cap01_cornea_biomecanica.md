# Capítulo 1 — A Córnea Ceratocônica como uma Estrutura Mecânica

> **Análise Vetorial Biomecânica Corneana para Planejamento de Segmento de Anel Intraestromal**
> *Parte I — O Problema e os Fundamentos*

> **Ponto-Chave:** O ceratocone não é apenas uma córnea curva — é uma doença do material estromal. Dois olhos com o mesmo K-steep podem ter estados biomecânicos completamente diferentes. Um nomograma que ignora isso está a tratar o sintoma, não a doença.

---

## 1.1 Introdução

O ceratocone é a ectasia corneana mais comum, com estimativas de prevalência variando de 1 em 375 em estudos baseados na população a até 1 em 84 quando critérios modernos de triagem videoceratográfica são aplicados (Godefrooij et al., 2017; Torres Netto et al., 2018). Tradicionalmente, a condição tem sido definida por suas características topográficas marcantes — leituras ceratométricas elevadas, encurvamento corneano inferior, astigmatismo irregular e afinamento progressivo — características que a colocam diretamente no domínio da geometria óptica. De fato, o fluxo de trabalho clínico padrão para o diagnóstico do ceratocone centra-se em mapas de curvatura sagital, índices ceratométricos e perfis paquimétricos: medições que descrevem a *forma* da córnea, mas dizem pouco sobre seu *estado mecânico*.

Esta perspectiva geométrica tem consequências práticas para o planejamento do tratamento. Quando um cirurgião seleciona um segmento de anel intraestromal (ICRS) para um olho com ceratocone, a decisão é tipicamente guiada por nomogramas que mapeiam um ou dois parâmetros geométricos — ceratometria, valor Q, refração manifesta — para uma configuração de anel. A suposição implícita é que a forma da córnea é uma representação (proxy) suficiente para a mecânica corneana. Como demonstraremos ao longo deste livro, essa suposição é fundamentalmente falha.

Nas últimas duas décadas, uma mudança de paradigma estrutural e bibliográfica vem ganhando força na oftalmologia. O trabalho seminal de Dupps e Roberts (2001, e consolidado em 2014 em seu artigo "*Biomechanics of corneal ectasia and biomechanical treatments*"), juntamente com as investigações estruturais de Meek e Knupp (2015), estabeleceu inequivocamente que o ceratocone é, em sua essência, uma **doença primariamente biomecânica** — um distúrbio da distribuição de tensão (*stress*) estromal, com degradação focal das propriedades elásticas do material.

As manifestações geométricas clássicas (K elevado, afinamento paquimétrico, protrusão apical) não são a patologia em si, mas sim as *consequências mecânicas secundárias (sintomas)* de uma estrutura enfraquecida cedendo perante a pressão intraocular normal. Duas córneas com valores idênticos de K-steep podem abrigar estados de tensão, rigidez de material e propensões para progressão extremamente diferentes. Tratá-las de forma idêntica e puramente geométrica, como faz um nomograma clássico, é confundir o sintoma (a forma) com a doença (a fraqueza mecânica).

Este capítulo de abertura estabelece a fundação biomecânica sobre a qual repousa todo o arcabouço da AVBC. Começamos com a arquitetura fibrilar do estroma corneano — a estrutura de suporte de carga que determina o comportamento mecânico — e progredimos através da modelagem constitutiva, do ciclo de descompensação que impulsiona a progressão do ceratocone e da evidência clínica para uma compreensão biomecânica, em vez de puramente geométrica, da doença. O leitor que compreender essa fundação entenderá por que o planejamento racional do ICRS requer uma linguagem biomecânica, não uma tabela de consulta geométrica.

---

## 1.2 Anatomia Fibrilar do Estroma Corneano

> **Para o Clínico:** Esta seção explica *por que* a córnea se comporta como se comporta sob pressão. O conceito central é simples: a córnea é um material compósito (como fibra de vidro), com fibras de colágeno (que dão rigidez) embebidas numa matriz macia (que dá flexibilidade). A orientação dessas fibras determina onde a córnea é forte e onde é vulnerável.

O estroma corneano constitui aproximadamente 90% da espessura corneana e é o principal determinante de seu comportamento mecânico. É composto por 200 a 500 lamelas de colágeno, cada uma com 1–2 μm de espessura e 10–250 μm de largura, dispostas em uma matriz altamente organizada que serve a um duplo propósito: transparência óptica e suporte de carga mecânica (Komai & Ushiki, 1991; Meek & Knupp, 2015).

### Organização das Fibras de Colágeno

Os tipos predominantes de colágeno no estroma corneano são o Tipo I (aproximadamente 70% em peso seco) e o Tipo V (aproximadamente 15%), com contribuições menores dos Tipos III, VI e XII. O colágeno Tipo I fornece resistência à tração, enquanto o Tipo V regula o diâmetro e o espaçamento das fibrilas — um fator crítico para a transparência (Birk et al., 1990). As fibrilas são notavelmente uniformes em diâmetro (aproximadamente 31 nm em humanos), e seu espaçamento regular (aproximadamente 56 nm de centro a centro) produz interferência destrutiva da luz espalhada em todas as direções, exceto para a frente, resultando na notável transparência da córnea (Maurice, 1957; Meek, 2009).

Estudos de espalhamento de raios X de grande ângulo (WAXS), realizados de forma mais ampla por Meek, Boote e colaboradores na Cardiff University, revelaram que a orientação das fibras de colágeno não é aleatória, mas segue um padrão característico que varia por região (Meek & Boote, 2004; Meek & Knupp, 2015):

- **Córnea central:** As fibras são preferencialmente orientadas ao longo dos meridianos nasal-temporal e superior-inferior, criando um arranjo aproximadamente ortogonal alinhado com as direções cardinais. Isso cria uma resposta mecânica anisotrópica — a córnea central é mais rígida ao longo dessas direções preferenciais.
- **Limbo e córnea periférica:** As fibras adotam uma orientação predominantemente circunferencial (tangencial), formando um reforço anular análogo aos aros de um barril. Este anel limbal ancora a córnea à esclera e resiste à expansão radial sob a pressão intraocular (PIO).
- **Zona de transição (paracentral):** Ocorre uma mudança gradual da orientação cardinal para a circunferencial, com aumento da dispersão das fibras.

### Estroma Anterior versus Posterior

Existe uma distinção crítica entre o estroma anterior e o posterior. O terço anterior exibe extenso *entrelaçamento* lamelar — as lamelas se ramificam, fundem-se e inserem-se na camada de Bowman em ângulos oblíquos, criando uma malha mecanicamente interconectada (Komai & Ushiki, 1991; Winkler et al., 2013). Os dois terços posteriores, em contraste, apresentam lamelas mais paralelas e planas, com menor entrelaçamento. Essa diferença arquitetônica tem consequências mecânicas diretas:

- O estroma anterior é aproximadamente **duas a três vezes mais rígido** que o estroma posterior quando medido por nanoindentação (Thomasy et al., 2014) ou microscopia de Brillouin (Scarcelli et al., 2015).
- O estroma posterior é mais suscetível à falha por cisalhamento e ao deslizamento lamelar.
- **No ceratocone, o estroma posterior falha primeiro** (Dupps & Roberts, 2014). As primeiras alterações histopatológicas — desorganização das fibras, quebras na continuidade lamelar — ocorrem nas camadas posteriores, consistente com a observação de que as anormalidades de elevação posterior estão entre os primeiros sinais tomográficos de ceratocone subclínico.

### A Matriz de Proteoglicanos

Entre as fibrilas de colágeno encontra-se a matriz interfibrilar, composta principalmente por proteoglicanos — proteoglicanos de sulfato de queratana (lumicam, queratocam, mimecam) e proteoglicanos de sulfato de dermatana (decorim, biglicam). Essas moléculas regulam o espaçamento e a hidratação das fibrilas, contribuindo tanto para a transparência quanto para o acoplamento mecânico entre as lamelas (Quantock et al., 2010). No ceratocone, a expressão de proteoglicanos é alterada, e a relação entre a hidratação da matriz e o espaçamento das fibrilas torna-se perturbada — uma alteração que precede o afinamento observável (Meek et al., 2005).

Para fins de modelagem constitutiva, a principal conclusão é que o estroma corneano é um **compósito reforçado por fibras** — uma matriz extracelular reforçada por fibras de colágeno com rigidez dependente da direção. Qualquer modelo mecânico realista deve capturar essa anisotropia.

---

## 1.3 A Córnea como uma Casca Hiperelástica Anisotrópica

### Por que a Elasticidade Linear Falha

Os primeiros modelos biomecânicos da córnea tratavam-na como um material linearmente elástico e isotrópico — caracterizado por um único módulo de Young E e coeficiente de Poisson ν. Essa simplificação é inadequada por várias razões:

1. **Não linearidade:** O tecido corneano exibe um pronunciado aumento de rigidez sob deformação (strain-stiffening). Em baixas deformações (strain) (faixa fisiológica), o tecido é relativamente complacente; em deformações (strain) maiores, as fibras de colágeno tornam-se esticadas e a rigidez aumenta dramaticamente. Esta curva de tensão-deformação em forma de J não pode ser capturada por um E constante.
2. **Anisotropia:** Conforme descrito acima, a resposta mecânica depende da orientação das fibras. A rigidez medida ao longo das fibras de colágeno difere substancialmente da rigidez medida perpendicularmente a elas.
3. **Quase-incompressibilidade:** O tecido corneano hidratado tem um conteúdo de água de aproximadamente 78%, tornando-o quase incompressível (coeficiente de Poisson aproximando-se de 0,5).
4. **Viscoelasticidade:** A córnea exibe comportamento mecânico dependente do tempo — fluência (creep) sob carga sustentada e relaxamento de tensão (stress). No entanto, para análises quase-estáticas (como carregamento de PIO ou implantação de ICRS), os modelos hiperelásticos são geralmente suficientes.

### O Modelo Holzapfel-Gasser-Ogden (HGO)

> **Para o Clínico:** O modelo HGO é a equação matemática que usamos para simular a córnea no computador. Não precisa de memorizar a equação — o que importa são os **5 parâmetros** da tabela abaixo. Cada um descreve um aspeto diferente do material corneano, e as nossas simulações usam estes valores em todo o livro.

Entre os modelos constitutivos disponíveis para tecidos moles biológicos, o modelo Holzapfel-Gasser-Ogden (HGO) emergiu como o padrão para a biomecânica corneana (Holzapfel et al., 2000; Pandolfi & Manganiello, 2006; Nguyen et al., 2018). O modelo HGO foi originalmente desenvolvido para a mecânica da parede arterial, mas é bem adequado para qualquer tecido reforçado por fibras onde as fibras estão embutidas em uma substância fundamental mais macia.

A função de energia de deformação é:

```
Ψ = c(Ī₁ - 3) + (k₁/2k₂) Σᵢ {exp[k₂⟨κ(Ī₁-3) + (1-3κ)(Ī₄ᵢ-1)⟩²] - 1}
```

onde:

| Parâmetro | Símbolo | Valor (FEBio) | Significado Físico |
|-----------|--------|---------------|------------------|
| Módulo de cisalhamento da matriz | c | 0.05 MPa | Rigidez da substância fundamental (matriz de proteoglicanos sem fibras) |
| Rigidez das fibras | k₁ | 0.22 MPa | Rigidez das fibras de colágeno em pequena deformação |
| Não linearidade das fibras | k₂ | 100 (adimensional) | Taxa de aumento de rigidez exponencial; valores maiores → curva em J mais acentuada |
| Dispersão das fibras | κ | 0.09 (adimensional) | Grau de alinhamento das fibras: 0 = perfeitamente alinhadas; 1/3 = aleatório (isotrópico) |
| Módulo de bulk (bulk modulus) | k | 4.76 MPa | Resistência à deformação volumétrica (quase-incompressibilidade) |

**Tabela 1.1.** Parâmetros de material HGO usados nas simulações do FEBio 4.12 ao longo deste livro. Valores de Nguyen et al. (2018).

**Interpretação clínica de cada parâmetro:**

- **c = 0.05 MPa** representa a rigidez basal da córnea *sem* a contribuição das fibras de colágeno — apenas a matriz de proteoglicanos. É relativamente macia, comparável a um gel firme. No ceratocone, a degradação da matriz reduz ainda mais c, tornando o tecido mais complacente.
- **k₁ = 0.22 MPa** captura a rigidez contribuída pelas fibras de colágeno. Este é o parâmetro mais diretamente afetado pelo crosslinking de colágeno (CXL), que aumenta k₁ em uma estimativa de 50–200% (Wollensak et al., 2003).
- **k₂ = 100** controla a rapidez com que o tecido se torna mais rígido à medida que a deformação (strain) aumenta. Um valor de 100 simula uma curva em J fortemente não linear — a córnea é complacente em deformações (strain) fisiológicas, mas resiste a grandes deformações. Este é um mecanismo de proteção: o tecido acomoda pequenas flutuações na PIO, mas resiste à ruptura em altas pressões.
- **κ = 0.09** indica que as fibras estão *majoritariamente* alinhadas (κ = 0 significaria perfeitamente alinhadas; κ = 1/3 significaria perfeitamente aleatórias). Um valor de 0,09 é consistente com os dados de WAXS que mostram orientação tangencial preferencial, mas não exclusiva, na córnea central.
- **k = 4.76 MPa** impõe quase-incompressibilidade, apropriada para um tecido biológico hidratado.

Os colchetes de Macaulay ⟨·⟩ na equação garantem que as fibras contribuam para a rigidez apenas quando esticadas, não quando comprimidas — uma condição fisicamente realista, uma vez que as fibras de colágeno dobram-se sob compressão e não contribuem para a carga.

O primeiro invariante Ī₁ captura a deformação isotrópica (matriz), enquanto os pseudo-invariantes Ī₄ᵢ capturam o estiramento específico na direção das fibras. Esta separação é a personificação matemática da natureza compósita do estroma: matriz mais fibras.

---

## 1.4 O Ciclo de Descompensação de Dupps

> **Ponto-Chave:** O ciclo de Dupps é a razão pela qual o ceratocone progride. É um ciclo vicioso: fraqueza → deformação → mais tensão → mais fraqueza. É também a razão pela qual o CXL funciona (interrompe o ciclo ao reforçar as fibras) e por que o ICRS funciona (redistribui as tensões).

Talvez o avanço conceitual mais importante na compreensão do ceratocone tenha vindo de Dupps e Roberts, que formalizaram o **ciclo de descompensação biomecânica** — um ciclo de feedback positivo que explica por que o ceratocone é progressivo e por que os descritores geométricos isolados são insuficientes (Dupps & Roberts, 2001; Dupps & Roberts, 2014).

### O Ciclo

O ciclo ocorre da seguinte forma:

1. **Enfraquecimento enzimático:** A atividade elevada de metaloproteinases de matriz (MMP) — particularmente MMP-2 e MMP-9 — degrada o colágeno e os proteoglicanos em uma região focal do estroma (Seppälä et al., 2006). Isso pode ser iniciado por predisposição genética, fatores ambientais (coçar os olhos, atopia) ou uma combinação de ambos.

2. **Aumento da complacência local:** A região degradada torna-se mais complacente (menor c, menor k₁ em termos de HGO). Sob a mesma PIO, ela se deforma mais do que o tecido circundante.

3. **Redistribuição de tensão (stress):** De acordo com a relação de Laplace para uma casca pressurizada (σ = PR/2t, onde P é a pressão, R é o raio e t é a espessura), o aumento da curvatura na zona enfraquecida aumenta a tensão (stress) de membrana local. O afinamento (t reduzido) eleva ainda mais a tensão (stress).

4. **Mais deformação:** Uma maior tensão (stress) em um material mais fraco produz mais deformação — levando a mais encurvamento e afinamento.

5. **Mais atividade enzimática:** A deformação (strain) mecânica estimula a expressão de MMPs através de vias de mecanotransdução nos ceratócitos. A deformação (strain) elevada na zona encurvada estimula ainda mais a degradação enzimática.

6. **Retorno ao passo 1:** O ciclo se repete, criando ectasia progressiva.

Este é um clássico **ciclo de feedback positivo** — um círculo vicioso que, uma vez iniciado, impulsiona a progressão da doença até que o estímulo enzimático se atenue (o que pode ocorrer naturalmente na quinta década de vida) ou que uma intervenção externa quebre o ciclo (como o CXL, que aumenta k₁ e interrompe o ciclo no passo 3).

### O Papel da PIO

Uma percepção crítica do ciclo de descompensação é que a **PIO é o motor mecânico da progressão do ceratocone** — não porque a PIO esteja elevada (ela é tipicamente normal), mas porque mesmo uma PIO normal (15 mmHg) gera tensão (stress) significativa em um estroma enfraquecido. Nossas simulações de elementos finitos confirmam isso quantitativamente: uma córnea basal sob uma carga de PIO de 15 mmHg mostra um deslocamento apical de **360,9 μm** — uma deformação substancial mesmo em um estroma biomecanicamente normal. No ceratocone, onde o enfraquecimento regional reduz a rigidez local em 30–60% (Scarcelli et al., 2015), a mesma PIO produz deformações locais desproporcionalmente maiores.

É por isso que a redução da PIO (embora teoricamente atraente) não é um tratamento prático para o ceratocone — a PIO não é o problema; a fraqueza do material é. O alvo terapêutico deve ser as propriedades do material (CXL) ou a distribuição de tensão (stress) (ICRS).

---

## 1.5 Ceratocone: Da Geometria à Biomecânica

### Os Descritores Geométricos e Suas Limitações

Os parâmetros clínicos padrão para o ceratocone — K-steep, K-flat, Kmax, astigmatismo corneano, valor Q, paquimetria mais fina — são descritores geométricos. Eles descrevem a forma e a espessura atuais da córnea, mas não fornecem informações sobre:

- A **rigidez do material** subjacente (que varia regionalmente e entre os pacientes)
- A **distribuição de tensão (stress)** (que depende simultaneamente da geometria, das propriedades do material e da PIO)
- A **propensão para progressão** (que depende da interação entre a tensão (stress) e a degradação do material)

Duas córneas com valores idênticos de K-steep de 48,0 D podem ter perfis biomecânicos fundamentalmente diferentes. Uma pode ter propriedades de material uniformes com uma ectasia relativamente recente e ainda em progressão; a outra pode ter rigidez regionalmente compensada (por exemplo, de CXL prévio ou acúmulo natural de ligações cruzadas) com uma ectasia estável. Um nomograma as trata de forma idêntica. A mecânica não.

### Evidência por Microscopia de Brillouin

A evidência mais direta de variação regional de rigidez no ceratocone vem da microscopia de Brillouin, uma técnica que mede o módulo longitudinal local em tecidos vivos sem contato (Scarcelli et al., 2012). Estudos de Scarcelli, Yun e colaboradores demonstraram que:

- O desvio de frequência de Brillouin (um proxy para a rigidez tecidual) é **reduzido em 0,1–0,3 GHz** na região do cone em comparação com o tecido circundante (Scarcelli et al., 2015).
- Esta redução está presente mesmo no **ceratocone subclínico** — olhos com topografia normal, mas com elevação posterior suspeita —, sugerindo que a fraqueza do material precede a alteração geométrica.
- A distribuição espacial da redução de Brillouin correlaciona-se com a zona de encurvamento, mas não é idêntica a ela, reforçando a distinção entre geometria e mecânica.

### O Ocular Response Analyzer e o Corvis ST

Na prática clínica, o Ocular Response Analyzer (ORA, Reichert) e o Corvis ST (Oculus) fornecem medidas indiretas da biomecânica corneana por meio de tonometria de sopro de ar. Os principais parâmetros — Histerese Corneana (CH), Fator de Resistência Corneana (CRF) e o Índice Biomecânico do Corvis (CBI) — capturam aspectos da resposta viscoelástica à deformação (Luce, 2005; Roberts & Dupps, 2014).

No ceratocone, o CH e o CRF estão consistentemente reduzidos, e essa redução muitas vezes **precede alterações topográficas detectáveis** (Fontes et al., 2010). Essa sequência temporal — alteração biomecânica antes da alteração geométrica — é uma forte evidência de que a doença é fundamentalmente biomecânica e que os descritores geométricos são *indicadores tardios* de um processo mecânico contínuo.

### O Argumento para a Avaliação Biomecânica

Se os descritores geométricos são indicadores tardios e a avaliação biomecânica pode detectar anormalidades mais cedo, segue-se que qualquer planejamento de intervenção que dependa exclusivamente da geometria é inerentemente atrasado — ele responde às *consequências* da doença em vez de ao seu *estado atual*. A implicação clínica é profunda: o planejamento racional de ICRS deve incorporar a avaliação biomecânica, não depender exclusivamente de dados ceratométricos e paquimétricos.

---

## 1.6 Implicações para o Planejamento de ICRS

Se o ceratocone é fundamentalmente uma doença biomecânica, segue-se logicamente que uma intervenção eficaz deve abordar a biomecânica — não apenas a geometria. O ICRS, como um implante estrutural inserido no estroma, é inerentemente uma intervenção biomecânica. Ele modifica a distribuição de tensão (stress), altera o campo de deslocamento e restringe a deformação estromal no local da implantação. No entanto, as abordagens atuais de planejamento tratam o procedimento como se fosse uma intervenção geométrica — selecionando parâmetros do anel com base apenas em medições topográficas.

A desconexão é evidente. Os nomogramas atuais prescrevem a espessura do anel com base no K-steep ou no valor Q, assumindo implicitamente que a ceratometria captura o suficiente do estado biomecânico para prever o efeito do anel. Mas nossas simulações de FEM revelam que o efeito do ICRS depende de pelo menos três variáveis mecânicas independentes — deslocamento radial (VR), redistribuição de tensão tangencial (VT) e torque assimétrico (Vτ) —, cada uma modulada por diferentes parâmetros do anel. A espessura controla o VR; o comprimento do arco controla o VT; a assimetria do anel controla o Vτ. Um nomograma que mapeia o K-steep para a espessura captura apenas um desses três mecanismos, e mesmo esse de forma imperfeita.

O framework da AVBC, introduzido nos capítulos seguintes, propõe preencher essa lacuna. Ao decompor o efeito do ICRS em três vetores biomecânicos, cada um associado a um parâmetro específico do anel, ele fornece uma linguagem para o planejamento mecanicista. O cirurgião que compreende VR, VT e Vτ pode raciocinar sobre o *porquê* de uma determinada configuração de anel produzir um efeito específico — em vez de consultar uma tabela de consulta e esperar pelo melhor resultado.

---

## 1.7 Resumo

- O ceratocone é uma **doença biomecânica**, não meramente uma deformidade geométrica. O processo subjacente envolve a degradação do colágeno e da matriz, a redistribuição de tensão (stress) e um ciclo de feedback positivo (o ciclo de descompensação de Dupps).
- O estroma corneano é um **compósito anisotrópico, hiperelástico e reforçado por fibras**. Seu comportamento mecânico é melhor capturado pelo modelo constitutivo HGO, com os parâmetros c = 0.05 MPa (matriz), k₁ = 0.22 MPa (fibra), k₂ = 100 (não linearidade) e κ = 0.09 (dispersão).
- **Descritores geométricos** (K-steep, valor Q, paquimetria) são indicadores tardios que descrevem consequências, não causas. A avaliação biomecânica — via microscopia de Brillouin, ORA/Corvis ou modelagem constitutiva — fornece uma caracterização mais precoce e informativa.
- Mesmo uma **PIO normal (15 mmHg)** produz deformação corneana significativa (uz = 360,9 μm em nossa linha de base de FEM), destacando a PIO como o motor mecânico da progressão ectática.
- O **planejamento racional de ICRS** exige a compreensão dos mecanismos biomecânicos da intervenção — não apenas do resultado geométrico. Esta é a premissa do framework AVBC desenvolvido nos capítulos subsequentes.

### Tabela-Resumo: Conceitos-Chave para o Clínico

| Conceito | O Que É | Por Que Importa ao Cirurgião |
|:---------|:--------|:----------------------------|
| Modelo HGO | Equação que descreve a mecânica da córnea como compósito fibra+matriz | Os 5 parâmetros (c, k₁, k₂, κ, k) determinam como a córnea responde ao anel |
| c = 0.05 MPa | Módulo de cisalhamento da matriz (gel sem fibras) | Quando degrada no ceratocone, a córnea torna-se mais macia — é isto que o CXL não reverte diretamente |
| k₁ = 0.22 MPa | Rigidez das fibras de colágeno | É o parâmetro que o CXL aumenta (50–200%); o reforço das fibras é a base da estabilização |
| k₂ = 100 | Taxa de endurecimento exponencial | Explica por que a córnea acomoda flutuações normais de PIO mas resiste a deformação extrema |
| κ = 0.09 | Dispersão angular das fibras (0=alinhadas, 1/3=aleatórias) | Fibras maioritariamente alinhadas significam que o anel funciona diferente conforme a orientação |
| Ciclo de Dupps | Feedback positivo: fraqueza → deformação → mais tensão → mais fraqueza | Explica a progressão do ceratocone e por que CXL (reforça fibras) e ICRS (redistribui tensão) funcionam |
| Anisotropia | Rigidez varia conforme a direção e a região | O efeito do anel depende da orientação local das fibras de colágeno |
| PIO como motor | 15 mmHg gera uz = 360,9 μm de deslocamento central | Mesmo PIO normal deforma significativamente uma córnea enfraquecida |
| Estroma anterior vs posterior | Anterior 2-3× mais rígido; posterior falha primeiro no KC | O ICRS é implantado a 70–80% de profundidade para interagir com o estroma de suporte de carga |

---

## Referências

1. Birk DE, Fitch JM, Babiarz JP, et al. Collagen fibrillogenesis in vitro: interaction of types I and V collagen regulates fibril diameter. *J Cell Sci*. 1990;95(Pt 4):649–657.
2. Dupps WJ Jr, Roberts CJ. Effect of acute biomechanical changes on corneal curvature after photokeratectomy. *J Refract Surg*. 2001;17(6):658–669.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Fontes BM, Ambrósio R Jr, Jardim D, et al. Corneal biomechanical metrics and anterior segment parameters in mild keratoconus. *Ophthalmology*. 2010;117(4):673–679.
5. Godefrooij DA, de Wit GA, Uiterwaal CS, et al. Age-specific incidence and prevalence of keratoconus: a nationwide registration study. *Am J Ophthalmol*. 2017;175:169–172.
6. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61:1–48.
7. Komai Y, Ushiki T. The three-dimensional organization of collagen fibrils in the human cornea and sclera. *Invest Ophthalmol Vis Sci*. 1991;32(8):2244–2258.
8. Luce DA. Determining in vivo biomechanical properties of the cornea with an ocular response analyzer. *J Cataract Refract Surg*. 2005;31(1):156–162.
9. Maurice DM. The structure and transparency of the cornea. *J Physiol*. 1957;136(2):263–286.
10. Meek KM. Corneal collagen — its role in maintaining corneal shape and transparency. *Biophys Rev*. 2009;1(2):83–93.
11. Meek KM, Boote C. The organization of collagen in the corneal stroma. *Exp Eye Res*. 2004;78(3):503–512.
12. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
13. Meek KM, Tuft SJ, Huang Y, et al. Changes in collagen orientation and distribution in keratoconus corneas. *Invest Ophthalmol Vis Sci*. 2005;46(6):1948–1956.
14. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff: a finite-element study. *Front Bioeng Biotechnol*. 2018;6:210.
15. Pandolfi A, Manganiello F. A model for the human cornea: constitutive formulation and numerical analysis. *Biomech Model Mechanobiol*. 2006;5(4):237–246.
16. Quantock AJ, Young RD, Akama TO. Structural and biochemical aspects of keratan sulphate in the cornea. *Cell Mol Life Sci*. 2010;67(6):891–906.
17. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
18. Scarcelli G, Besber R, Pineda R, et al. In vivo biomechanical mapping of normal and keratoconus corneas. *JAMA Ophthalmol*. 2015;133(4):480–482.
19. Scarcelli G, Pineda R, Yun SH. Brillouin optical microscopy for corneal biomechanics. *Invest Ophthalmol Vis Sci*. 2012;53(1):185–190.
20. Seppälä HP, Määttä M, Rautia M, et al. EMMPRIN and MMP-1 in keratoconus. *Cornea*. 2006;25(3):325–330.
21. Thomasy SM, Raghunathan VK, Winkler M, et al. Elastic modulus and collagen organization of the rabbit cornea: epithelium to endothelium. *Acta Biomater*. 2014;10(2):785–791.
22. Torres Netto EA, Al-Otaibi WM, Hafezi NL, et al. Prevalence of keratoconus in paediatric patients in Riyadh, Saudi Arabia. *Br J Ophthalmol*. 2018;102(10):1436–1441.
23. Winkler M, Shoa G, Xie Y, et al. Three-dimensional distribution of transverse collagen fibers in the anterior human corneal stroma. *Invest Ophthalmol Vis Sci*. 2013;54(12):7293–7301.
24. Wollensak G, Spoerl E, Seiler T. Stress-strain measurements of human and porcine corneas after riboflavin-ultraviolet-A-induced cross-linking. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
