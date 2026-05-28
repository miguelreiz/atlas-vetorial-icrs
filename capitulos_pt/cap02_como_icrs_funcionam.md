# Capítulo 2 — Como Funcionam os ICRS: Do Deslocamento de Volume à Decomposição Vetorial

> **Análise Vetorial Biomecânica Corneana para Planejamento de Segmento de Anel Intraestromal**
> *Parte I — Fundamentos*

---

## 2.1 Introdução

Os segmentos de anel intraestromal têm sido implantados por mais de vinte e cinco anos, com uma estimativa de meio milhão de procedimentos realizados em todo o mundo desde o primeiro implante de Intacs em 1999 (Burris et al., 1998; Colin et al., 2000). Apesar dessa ampla experiência clínica, o mecanismo de ação do ICRS permanece assunto de debate contínuo. Como, precisamente, um pequeno arco de polimetilmetacrilato (PMMA) inserido no estroma corneano produz alterações na curvatura corneana, no astigmatismo e nas aberrações de alta ordem?

Três estruturas conceituais foram propostas: a **escola geométrica** (Barraquer, 1964), que atribui o efeito ao encurtamento do arco; a **escola volumétrica** (Kling & Marcos, 2013), que enfatiza o deslocamento de volume; e a **escola biomecânica** (Dupps & Roberts, 2014), que se concentra na redistribuição de tensão (stress). Cada abordagem captura parte da verdade, mas nenhuma fornece uma explicação completa dos efeitos clínicos observados.

Este capítulo revisa criticamente essas três perspectivas e as sintetiza em uma estrutura unificada — a **decomposição em três vetores** —, na qual o efeito do ICRS é resolvido em três mecanismos biomecânicos independentes: deslocamento radial (VR), redistribuição de tensão tangencial (VT) e torque assimétrico (Vτ). Esta decomposição, validada por 34 simulações de elementos finitos apresentadas no Capítulo 12, forma a base mecanicista para o framework de planejamento AVBC.

---

![Figura 2.1 — Evolução conceitual: das Três Escolas (Geométrica, Volumétrica, Biomecânica) à síntese AVBC.](book_figures/fig_02_01_tres_escolas.svg)

## 2.2 A Escola Geométrica: O Princípio de Barraquer (1960s)

### A Evolução do Conceito

A base intelectual para o ICRS remonta aos trabalhos pioneiros de José I. Barraquer na década de 1960. Nas suas publicações seminais sobre a *Keratomileusis* e a *Keratophakia* (Barraquer, 1966; Barraquer, 1967), propôs que a modificação da espessura estromal poderia induzir alterações previsíveis na curvatura anterior. O mecanismo inicialmente postulado era puramente geométrico: o **princípio do encurtamento de arco**.

Para um arco circular de comprimento de corda fixo, o encurtamento do arco aumenta o raio de curvatura. Se material for colocado na córnea *periférica*, a redistribuição geométrica e a expansão estromal forçam as camadas anteriores a acomodar o volume, resultando num encurtamento do arco efetivo e, consequentemente, aplanando a córnea *central*.

Este postulado culminou na clássica **"Lei da Espessura"** (Barraquer, 1967): *"Se material for adicionado à periferia da córnea ou removido do centro, a córnea aplana. Se material for removido da periferia ou adicionado ao centro, a córnea encurva."* Historicamente, este princípio elegante fundou a base para os procedimentos subtrativos (LASIK, PRK) e para a concepção dos primeiros modelos de anéis intraestromais para correção de miopia na década de 1990 (Burris et al., 1991).

### Limitações da Escola Geométrica

O modelo de encurtamento de arco dominou a literatura refrativa por décadas devido à sua simplicidade intuitiva, mas revelou-se cientificamente incompleto, particularmente quando aplicado a córneas patológicas (ectasias):

1. **A Assunção de Simetria e Esfericidade:** O modelo pressupõe que a córnea responde como uma calota esférica uniforme. Consegue explicar o aplanamento miópico global (redução de K-médio em olhos saudáveis), mas **não explica a regularização do astigmatismo** ou as alterações topográficas assimétricas que observamos clinicamente no ceratocone.
2. **Ignora o Reposicionamento do Ápice:** No ceratocone, o ápice do cone está frequentemente deslocado do eixo visual. Configurações assimétricas de ICRS conseguem migrar este ápice (reduzindo o coma) — um efeito cinemático que o encurtamento radial mecânico e uniforme de um arco não consegue abranger.
3. **A Falácia do "Limbo Artificial" para Arcos Parciais:** Uma extensão posterior do modelo de arco tentou explicar os resultados atípicos com implantes parciais (menos de 360°) postulando que o ICRS rígido criava sempre um "limbo funcional" ou "esfíncter" — uma barreira de aperto que mimetizava o suporte limbal natural. É verdade que um **anel completo de 360°** consegue, de facto, criar um anel de tensão contínuo (um "limbo artificial" eficaz que contém a expansão). No entanto, o erro histórico foi assumir que este efeito se aplicava a arcos parciais. Simulações em elementos finitos demonstraram que os arcos parciais *não* fecham o anel de tensão, criando descontinuidades biomecânicas que redirecionam o stress e levam a deformações diametralmente opostas (ver Seção 2.4).

---

## 2.3 Deslocamento de Volume e Redistribuição de Tensão

### A Escola Volumétrica: O Estudo de FEM de Kling e Marcos (2013)

A transição formal da geometria bidimensional para a mecânica de sólidos tridimensional ocorreu quando Kling e Marcos (2013) aplicaram o método dos elementos finitos (FEM) ao modelo da córnea hiperelástica. Ao estudarem detalhadamente os campos de deslocamento gerados em torno do implante, revelaram que o aplanamento não decorria de um mero encurtamento da curvatura superior, mas sim de um intenso **deslocamento de volume** (o chamado *spacer effect*).

O mecanismo opera da seguinte forma: o ICRS ocupa um volume físico e inflexível dentro do tecido (tipicamente de 0,5 a 1,5 mm³, consoante o seu perfil). Sendo o estroma rico em água (78% de hidratação) e, portanto, um fluido tecidular quase perfeitamente incompressível, é incapaz de absorver ou comprimir as suas próprias lamelas. Em consequência, o tecido adjacente deve acomodar a intrusão deslocando-se no sentido radial e anterior. Esta pressão centrífuga periférica expande o canal intraestromal lateralmente, puxando a fina rede fibrilar do leito central. Ao sofrer esta tração radial divergente, o teto da córnea central desce, achatando-se de forma conservadora para compensar a expansão estromal periférica.

### A Escola Biomecânica: A Perspectiva de Dupps e Roberts (2014)

Embora a escola volumétrica previsse bem o deslocamento de massa, não captava inteiramente a degradação mecânica primária do paciente com ceratocone. No ano seguinte, Dupps e Roberts (2014) consolidaram um paradigma vital para a oftalmologia: as alterações na curvatura, elevação e paquimetria são manifestações estritamente *secundárias* de uma anomalia estrutural subjacente. A doença primária do ceratocone é, intrinsecamente, um défice biomecânico focal.

Nesta perspectiva moderna, os ICRS atuam por meio de uma complexa **redistribuição de tensão (stress redistribution)**. Ao introduzir no estroma um sólido cujas propriedades mecânicas são milhares de vezes superiores às da matriz enfraquecida (módulo de Young do PMMA ronda os 3 GPa face aos escassos ~0,2 MPa da córnea ectásica), o anel atua como um contraforte inflexível. Na casca esférica da córnea, que é inflada permanentemente pela pressão intraocular (PIO), as forças radiais e tangenciais (*hoop stress*) tentam procurar o caminho de menor resistência.

A perspectiva de Dupps sublinha que o segmento não "molda" fisicamente a córnea à força (ao contrário de um anel ortodôntico num dente). Pelo contrário, atua como um escudo periférico: o anel intercepta a cascata de tensão expansiva, ancorando as forças circulares e radiais para fora do cone central enfraquecido. O novo *K-steep* e a nova topografia são meramente a postura de repouso ("equilíbrio de estabilidade") que a córnea adota sob o novo cenário modificado de forças induzido pelo implante.

Os nossos dados reúnem evidências avassaladoras neste sentido. Uma córnea basal simulada com um módulo HGO clássico (ver Anexo A) demonstra, sob 15 mmHg de PIO pulsada, um deslocamento apical fisiológico de **360,9 μm**. Ao ser submetida a um anel completo (360°), este valor é severamente estrangulado para **125,9 μm** (um ganho estrutural notável de 65%). Esta supressão maciça do abaulamento excede largamente o efeito puramente volumétrico do anel; representa uma real mutação nas leis elásticas aparentes do esqueleto de colágeno perante a carga compressiva posterior.

### Síntese: A Evolução Histórica dos Paradigmas do ICRS

Para um médico oftalmologista moderno, compreender as limitações históricas e os triunfos explicativos destas diversas escolas é essencial para raciocinar de forma abstrata perante tomografias atípicas ou decisões cirúrgicas desafiantes.

A **Tabela 2.1** resume cronologicamente a jornada do nosso entendimento científico dos anéis intracorneanos. É sobre os ombros desta herança centenária de geometria, hidrodinâmica volumétrica e mecânica das fraturas que nasce a quarta e atual etapa da sistematização planeada: a **Decomposição Vetorial Biomecânica (AVBC)** explorada neste livro.

**Tabela 2.1.** Comparação Histórica das Escolas de Pensamento Científico sobre os Mecanismos do ICRS.

| Escola / Paradigma | Período (Autor Base) | Postulado Dominante do Mecanismo de Ação | Ponto Forte Explicativo | Principal Lacuna Clínica |
| :--- | :--- | :--- | :--- | :--- |
| **Geométrica** | 1960s (Barraquer) | Encurtamento da corda de superfície por inserção estromal periférica. | Justifica o aplanamento miópico proporcional em tecidos biomecanicamente sãos. | Não consegue explicar o efeito nos astigmatismos irregulares ou as deformações assimétricas de arcos parciais. |
| **Volumétrica** | 2013 (Kling & Marcos) | Incompressibilidade estromal e o *spacer effect* deslocam tecido radialmente. | Estabelece a ligação mecanicista entre o volume do anel (espessura) e o grau exato de aplanamento K. | Não esclarece inteiramente o poder remodelador de diferentes comprimentos de arco se a espessura for mantida. |
| **Biomecânica** | 2014 (Dupps & Roberts) | A redistribuição da cascata de stress perante um material artificialmente ultrarrígido. | Desvenda o mistério de estabilização estrutural da córnea degenerativa a longo prazo (ectasia primária). | Sendo uma dinâmica vetorial 3D complexa, revelou-se clinicamente pesada e impraticável para nomogramas triviais. |
| **Decomposição Vetorial** | Presente (AVBC) | Decomposição pragmática da mecânica híbrida em três forças: Deslocamento (VR), Tração (VT) e Torque (Vτ). | Mapeia biunivocamente o desejo clínico do cirurgião (Aplanar, Regularizar, Rodar) com a escolha do anel. | Exige transição mental de nomogramas fixos empíricos (escola antiga) para planificação computacional baseada na forma real. |

### 2.3.3 A Perspectiva do Volume vs. Ação Direta nas Fibras

A literatura de modelagem por elementos finitos (FEM) consagra um debate biomecânico fundamental: o ICRS altera a forma da córnea por **adição/deslocamento de volume** (mecanismo puramente geométrico e de espaço ocupado) ou por **ação mecânica direta nas propriedades estruturais das fibras de colágeno**?

Os estudos numéricos e os dados consolidados da AVBC trazem uma resposta inequívoca: **o anel atua predominantemente através do deslocamento físico de volume (spacer effect), e não por alterar ou recrutar ativamente as fibras estromais centrais.**

Este domínio do efeito volumétrico sustenta-se em três pilares mecânicos:

1. **Incompressibilidade Estromal:** O estroma corneano é composto por cerca de 78% de água, comportando-se como um meio quase perfeitamente incompressível. Ao introduzir o volume do ICRS (de 0{,}5 a 1{,}5 \text{mm}^3) num canal estromal, o tecido circundante é obrigado a deslocar-se radialmente para acomodar esta intrusão física. Este "efeito cunha" puxa a córnea central adjacente, encurtando o seu vão livre e forçando o aplanamento.
2. **Ausência de Reforço Fibrilar Global:** O implante de PMMA não aumenta a rigidez intrínseca (k_1) das fibras de colágeno da córnea central (as fibras continuam com a sua biologia e propriedades inalteradas). O anel funciona como uma restrição puramente geométrica periférica. A córnea central aplana passivamente para atingir um novo estado de equilíbrio geométrico sob a mesma PIO, mas as suas propriedades materiais e a tensão intrínseca nas suas fibras estromais permanecem inalteradas.
3. **Mapeamento de Sensibilidade:** Esta perspectiva explica perfeitamente por que razão a variação da espessura do anel (que aumenta linearmente o seu volume) produz um efeito de aplanamento (V_R) proporcional e direto, ao passo que a variação isolada dos parâmetros elásticos das fibras HGO centrais (k_1 e k_2) sob matriz saudável não altera o aplanamento. O ICRS é, por definição, um **modificador geométrico volumétrico da casca** e não um reforço estrutural das suas fibras longitudinais.

---

## 2.4 O Paradoxo do ICRS: Por que Arcos Parciais Não Aplanam

### A Descoberta Contraintuitiva

Talvez a descoberta mais reveladora das nossas simulações de Elementos Finitos (FEM) puros seja o que chamamos de **Paradoxo do ICRS**: quando aplicamos o anel *apenas como uma restrição mecânica* (um bloqueio cinemático que não deixa o estroma expandir, ignorando o volume adicionado pelo implante), os segmentos de arco parcial e total na verdade **aumentam** o deslocamento apical (protusão) e **encurvam** a córnea, em comparação com a linha de base não restrita.

**Tabela 2.2.** Deslocamento apical (uz) e Curvatura Simulada (K-médio) como função da restrição mecânica do arco (simulação de restrição cinemática pura sob PIO de 15 mmHg, sem Efeito Volumétrico).

| Configuração | Arco (°) | Deslocamento Ápice (μm) | K-médio (D) | Alteração vs. base (D) |
|--------------|---------|-------------|-------------|-------------------|
| Linha de base (Ectasia) | — | 549.0 | 60.11 | — |
| Arco 160° | 160 | 555.4 | 60.36 | +0.25 |
| Arco 210° | 210 | 557.6 | 60.44 | +0.34 |
| Arco 320° | 320 | 563.6 | 60.68 | +0.57 |
| Arco 360° | 360 | 565.6 | 60.75 | +0.64 |

Este resultado parece contradizer frontalmente a experiência clínica diária — os cirurgiões oftalmológicos observam um aplanamento maciço (frequentemente superior a 4 Dioptrias) após a implantação de um anel de 320°, e não um encurvamento. Mas é precisamente este paradoxo que revela a genialidade e a verdadeira natureza mecânica dos ICRS.

### A Prova da Escola Volumétrica

![Figura 2.2 — O Paradoxo do ICRS: restrição cinemática vs injeção volumétrica.](book_figures/fig_02_02_paradoxo_icrs.svg)

O ICRS, em modelos estritamente restritivos (como o tensor de Colin), restringe a expansão radial numa determinada circunferência. Como a PIO contínua empurra o endotélio uniformemente de dentro para fora, a fixação de uma "fronteira rígida" inextensível obriga toda essa tensão e deslocamento a concentrar-se na área central livre.

O resultado da pura restrição mecânica é que a córnea é afunilada. A área central, impossibilitada de dilatar as suas bases laterais, protrai ainda mais para a frente (o deslocamento sobe de 549 para 565 μm no 360º) e torna-se mais pontuda e íngreme (steepening de 60.1 para 60.7 D). 

Se a restrição mecânica *encurva* a córnea, como explicamos o aplanamento clínico? **Através da Escola Volumétrica de Barraquer, provada matematicamente por Kling e Marcos.**

O aplanamento drástico que vemos na clínica miópica com anéis de 320º deve-se *quase exclusivamente* ao efeito de espaçador volumétrico maciço do implante de PMMA (e não apenas à restrição elástica). Quando inserimos o plástico, o volume físico do anel afasta as lamelas e empurra a média-periferia para cima. Ao elevar as vertentes da córnea, o centro da tenda é "esticado", forçando um aplanamento da curvatura central relativa.

### Implicação Clínica: A Separação dos Efeitos

Esta constatação biomecânica tem uma implicação clínica transformadora: **os ICRS não aplanam a córnea por bloquearem o deslocamento apical (já que a restrição isolada aumenta esse abaulamento). Eles aplanam a córnea devido à adição de volume periférico, enquanto redistribuem a tensão através do seu arco rígido.** O ΔK clínico que o cirurgião refrativo observa advém da relação local de volumes e da modelagem da superfície (Vetor Vertical).

É por isso que as simulações e nomogramas tradicionais focados apenas em leis de tensão pura falham na ectasia. Compreender que a correção da miopia depende intimamente da capacidade volumétrica (Espessura) e a correção do astigmatismo irregular depende da redistribuição assimétrica de tensões (Arco) é a gênese da Decomposição Vetorial.

---

## 2.5 A Decomposição em Três Vetores: VR, VT, Vτ

### A Necessidade de uma Decomposição

![Figura 2.3 — Decomposição vetorial: os três vetores VR, VT e Vτ e suas ações biomecânicas.](book_figures/fig_02_03_decomposicao_vetorial.svg)

A análise precedente revela que o efeito do ICRS não é um fenômeno único, mas sim um compósito de múltiplos mecanismos, cada um com diferentes sensibilidades aos parâmetros do anel. Para tornar essa complexidade tratável para a tomada de decisões clínicas, propomos a decomposição do efeito do ICRS em três **vetores biomecânicos** independentes:

### VR — O Vetor Radial

**Definição:** VR é a componente radial do campo de deslocamento induzido pelo ICRS.

```
VR(r, θ) = Δuᵣ = [ux·cos(θ) + uy·sin(θ)]_final − [ux·cos(θ) + uy·sin(θ)]_initial
```

**Correlação clínica:** O VR controla o aplanamento corneano (ΔK) derivado do efeito de espaçador volumétrico. Um VR maior corresponde a um maior aplanamento central.

**Parâmetro do anel:** O VR é modulado fundamentalmente pelo **volume total do anel implantado**. Este volume depende criticamente de dois fatores: a **espessura do anel** (que dita a elevação transversal) e o **comprimento de arco** (que dita a extensão do suporte volumétrico ao longo da circunferência). Clinicamente, um arco de 320° com 300 μm de espessura injeta muito mais volume no estroma do que um arco de 90° com a mesma espessura, produzindo, portanto, um aplanamento (VR) significativamente maior. Esta é a essência matemática da Escola Volumétrica: a redução miópica escala com o volume.

### VT — O Vetor Tangencial

**Definição:** VT é a alteração na tensão tangencial (hoop stress) induzida pelo ICRS.

```
VT(r, θ) = Δσ_θθ = [σ_θθ]_final − [σ_θθ]_initial
```

onde σ_θθ é obtido por transformação tensorial da tensão Cauchy cartesiana.

**Correlação clínica:** O VT controla a regularização do astigmatismo (ΔCyl). Uma distribuição de σ_θθ mais uniforme corresponde a um astigmatismo mais regular.

**Parâmetro do anel:** O VT é modulado principalmente pelo **comprimento do arco**. Nossos dados de FEM mostram uma diminuição de forma monotônica: o VT cai de 7,78 kPa (linha de base) para 7,20 kPa (arco de 320°), seguindo a relação empírica:

```
VT(arc°) = −0.0018 × arc° + 7.79 (R² = 0.94)
```

Cada grau adicional de arco reduz a tensão tangencial global em 0,0018 kPa. Essa monotonicidade fornece um guia quantitativo para a seleção do comprimento do arco.

### Vτ — O Vetor de Torque

**Definição:** Vτ é o torque (momento) gerado pela geometria assimétrica do anel.

```
Vτ = ∫_arc (ΔF⊥ × r) dθ
```

**Correlação clínica:** O Vτ controla o reposicionamento do ápice. Um anel assimétrico (espessura progressiva) gera forças desiguais em suas extremidades, produzindo um binário de forças que direciona o ápice do cone em uma direção preferencial.

**Parâmetro do anel:** O Vτ é modulado pela **assimetria do anel** — a diferença de espessura entre as duas extremidades do segmento. Para anéis simétricos, Vτ = 0 (confirmado em todas as 28 simulações simétricas, com Vτ não nulo verificado nas 6 simulações progressivas assimétricas).

### Por que Três Vetores?

A escolha de três vetores não é arbitrária. Ela reflete os três resultados *clínicos* independentes que os cirurgiões buscam com o ICRS:

1. **Aplanamento** (reduzir o K-steep) → VR
2. **Regularização** (reduzir o astigmatismo irregular) → VT
3. **Reposicionamento do ápice** (reduzir o coma, centralizar a óptica) → Vτ

Cada resultado é controlado por um parâmetro de anel diferente: espessura, comprimento do arco e assimetria, respectivamente. Este mapeamento de um para um — objetivo clínico para parâmetro do anel, mediado por um vetor biomecânico — é o que torna o framework AVBC clinicamente aplicável.

### A Analogia com Alpins

O paralelo estrutural com a análise de astigmatismo de Alpins é deliberado. Alpins decompôs o efeito astigmático da cirurgia refrativa em três vetores: TIA (alvo), SIA (induzido) e DV (diferença vetorial). Essa decomposição permitiu um planejamento padronizado, avaliação objetiva dos resultados e calibração do cirurgião. A AVBC faz o mesmo para o ICRS, mas a álgebra subjacente é mais complexa porque o domínio biomecânico é tridimensional e envolve campos de deslocamento e de tensão (stress), e não apenas uma representação polar bidimensional do astigmatismo.

O paralelo é **estrutural**, não algébrico: ambos os frameworks decompõem um efeito cirúrgico em componentes controláveis de forma independente, cada um com um valor planejado e um induzido, permitindo a comparação quantitativa e o feedback.

---

## 2.6 Qual Mecanismo Domina?

A questão clínica crítica é: **para um determinado paciente, qual dos três mecanismos deve ser priorizado?**

Os dados de FEM fornecem uma orientação clara:

| Necessidade Clínica | Vetor Dominante | Parâmetro do Anel | Evidência de FEM |
|--------------|----------------|---------------|--------------|
| Aplanar (reduzir K) | **VR** | Espessura ↑ | VR insensível ao arco (19,2–19,9 μm para 90°–320°); a espessura é o modulador |
| Regularizar (reduzir Cil) | **VT** | Comprimento do arco ↑ | VT diminui de forma monotônica: −0,0018 kPa/grau (R² = 0,94) |
| Reposicionar ápice | **Vτ** | Assimetria ↑ | Vτ = 0 para simétrico; >0 para assimétrico (García de Oteyza, 2021) |
| Estabilizar (interromper ectasia) | VR + VT | Combinado | CXL primeiro, depois ICRS |

A percepção fundamental é que **o cirurgião controla qual mecanismo domina** ao selecionar os parâmetros do anel. Um anel espesso com arco curto maximiza o VR (aplanamento) enquanto minimiza o VT (regularização). Um anel fino com arco longo faz o oposto. Um anel assimétrico ativa o Vτ. Esse desacoplamento dos três mecanismos é o que torna possível o planejamento mecanicista — e o que os nomogramas, por sua própria natureza, não conseguem capturar.

---

## 2.7 O Papel da Profundidade

A profundidade de implantação — tipicamente especificada como uma porcentagem da paquimetria local (60–80%) — funciona como um **amplificador universal** de todos os três vetores. O posicionamento mais profundo coloca o anel mais próximo da superfície endotelial, onde o braço de alavanca em relação à superfície média corneana é maior, amplificando o efeito mecânico.

Nossos modelos de FEM específicos para o paciente fornecem suporte quantitativo para o papel amplificador do contexto estrutural da córnea. Pacientes com córneas mais finas — onde o ICRS ocupa uma fração relativamente maior da espessura total — mostram maior capacidade de resposta biomecânica:

| Faixa de Paquimetria | Média │Δuz│ (μm) | N |
|-----------------|------|---|
| < 430 μm (fina) | **34.1 ± 1.0** | 2 |
| 430–500 μm (média) | **29.3 ± 0.8** | 4 |
| > 500 μm (espessa) | **28.5 ± 0.2** | 2 |

Córneas mais finas mostram uma diferença de deslocamento aproximadamente 20% maior do que as córneas mais espessas para a mesma especificação de anel. Isso é consistente com a experiência clínica — córneas mais finas são mais responsivas ao ICRS — e apoia o papel da profundidade (e da proporção relativa do anel) como uma variável de planejamento crítica.

A orientação clínica é: a profundidade não é apenas um parâmetro de segurança (evitando a perfuração); ela é um **modulador de dose** para todos os três vetores biomecânicos.

---

## 2.8 Resumo

- O mecanismo de ação do ICRS não é um fenômeno único, mas sim um **compósito de três mecanismos**: deslocamento radial (VR), redistribuição de tensão tangencial (VT) e torque assimétrico (Vτ).
- O **princípio de encurtamento de arco** de Barraquer explica parte do efeito de aplanamento, mas não consegue explicar a regularização ou o reposicionamento do ápice.
- O mecanismo de **deslocamento de volume** (Kling & Marcos) e a perspectiva de **redistribuição de tensão (stress)** (Dupps & Roberts) fornecem explicações mais completas e consistentes com os dados de FEM.
- O **paradoxo do ICRS** — arcos parciais aumentam o deslocamento apical enquanto apenas o anel completo o diminui — revela que os arcos parciais funcionam redistribuindo a tensão, e não aplanando diretamente.
- A **decomposição em três vetores** (VR/VT/Vτ) fornece uma linguagem para entender qual mecanismo domina para uma determinada configuração de anel e necessidade clínica.
- Cada vetor é modulado por um parâmetro de anel diferente: **espessura** (VR), **comprimento do arco** (VT), **assimetria** (Vτ).
- A **profundidade** atua como um amplificador universal de todos os três vetores.
- Esta compreensão mecanicista forma a base para o framework de planejamento AVBC — um sistema que prescreve parâmetros de anel com base em *qual mecanismo a córnea necessita*, e não em correlação empírica.

---

## Referências

1. Barraquer JI. Modification of refraction by means of intracorneal inclusions. *Int Ophthalmol Clin*. 1966;6(1):53–78.
2. Barraquer JI. Basis of refractive keratoplasty - 1967. *Revue Med (Bogota)*. 1967;33(1). [PMID: 2488804]
3. Burris TE, Ayer CT, Evensen DA, et al. Effects of intrastromal corneal ring size and thickness on corneal flattening in human eyes. *Refract Corneal Surg*. 1991;7(1):46–50.
4. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
5. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998. [PMID: 24774009]
6. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
7. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61:1–48.
8. Kling S, Marcos S. Finite-element modeling of intrastromal corneal-ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889. [PMID: 23299471]
9. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
10. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff. *Front Bioeng Biotechnol*. 2018;6:210.
11. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
12. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
13. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
