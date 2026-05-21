// lecture_slides.js — Estrutura didática da Masterclass Completa (12 Módulos) com Roteiro de Treinamento

export const LECTURE_SLIDES = [
  {
    id: 'intro',
    layout: 'title',
    title: 'Atlas Vetorial ICRS',
    subtitle: 'O Paradigma Biomecânico: Tornando o Complexo em Intuitivo',
    presenter: 'Masterclass para Cirurgiões',
    trainingScript: 'Olá, doutor. Bem-vindo ao Modo Treinador da sua Masterclass. Neste slide de abertura, o seu objetivo é definir a autoridade. Comece dizendo: "Boa noite a todos. Hoje vamos quebrar o paradigma puramente topográfico na cirurgia refrativa. Vamos sair da análise de curvatura e entrar na análise de vetores de tensão fibrilar. O Atlas Vetorial não é apenas uma teoria, é a ponte definitiva entre a lâmpada de fenda e a engenharia de elementos finitos." Dê uma pausa dramática antes de avançar.'
  },
  {
    id: 'problema_icrs_1',
    layout: 'bullets_image',
    title: 'Prefácio: A Geometria Escondida',
    imageUrl: '/grafico_dispersao.png',
    trainingScript: 'Neste slide, aponte para o gráfico de dispersão. Diga: "Colegas, observem esta nuvem de 230 olhos operados. O nomograma tradicional baseia-se em tabelas e Kmax. Mas a resposta biológica é caótica, como vocês podem ver. Isso acontece porque um anel triangular corta fibras, enquanto um arredondado desliza por elas. Sem a biomecânica, estamos jogando dados com a visão do paciente. Nosso objetivo hoje é substituir essa loteria por vetores de precisão." Passe para o próximo slide.',
    bullets: [
      '**A Pergunta Mecânica:** Sabemos o *resultado* do implante, mas raramente o "por quê" biomecânico. Por que um anel triangular funciona diferente de um arredondado?',
      '**A Falência das Tabelas:** O gráfico ao lado ilustra 230 olhos operados. A nuvem difusa comprova a imprevisibilidade da cirurgia tradicional baseada puramente em topografia.',
      '**Extremos e Opostos:** Pacientes com Kmax de 88D chegam a ganhar 13 linhas de visão, enquanto outros perdem 7 linhas com parâmetros idênticos.'
    ]
  },
  {
    id: 'problema_icrs_2',
    layout: 'bullets',
    title: 'A Ilusão do Kmax',
    trainingScript: 'Aqui o foco é desconstruir o vício na topografia simples. Explique: "O Kmax é uma ilusão matemática. Ele mede um único ponto no espaço e ignora a arquitetura 3D do cone, se é oval ou nipple. A partir de agora, convido vocês a falarem uma nova língua na cirurgia: a língua dos vetores. Radial, Tangencial e Torque. É isso que deforma a córnea, e é isso que vai consertá-la." Pressione a barra de espaço para avançar e manter a dinâmica.',
    bullets: [
      '**Ponto vs. Estrutura:** O Kmax mede apenas um ponto. Ele ignora a arquitetura fibrilar local, a geometria 3D do cone (nipple, oval) e a profundidade estromal.',
      '**Operando no Escuro:** Nomogramas que usam apenas Kmax, paquimetria e cilindro ignoram o fato de que a córnea não tem uma resposta matemática linear.',
      '**A Nova Linguagem:** Precisamos transitar de uma unidade de medida *óptica* (dioptrias) para *vetorial*: VR (radial), VT (tangencial) e Vτ (torque).'
    ]
  },
  {
    id: 'problema_icrs_3',
    layout: 'bullets',
    title: 'A Ponte Que Faltava',
    trainingScript: 'Conclua a introdução citando a literatura clássica. Diga: "Pesquisadores como Meek e Boote já mapearam a malha de colágeno via raio-X, mas o cirurgião não leva o raio-X para o centro cirúrgico. A Lei da Correspondência que proponho faz essa ponte. Ela permite que a sua intuição na lâmpada de fenda preveja o efeito exato do polímero de PMMA sobre as fibras ortogonais. Vamos ver na prática como isso funciona." Avance para iniciar o módulo 1.',
    bullets: [
      '**A Ciência Esquecida:** Trabalhos de Meek e Boote (WAXS/SHG) mapearam a rede de colágeno, mas havia um abismo entre essa ciência e a prática cirúrgica.',
      '**Lei da Correspondência:** O perfil triangular fende fibras ortogonais; o arredondado repousa sobre as tangenciais. A biomecânica dita a regra.',
      '**O Cirurgião Que Programa:** O conhecimento empírico não basta. É necessário cruzar a lâmpada de fenda com modelagem computacional para prever o VEsférico antes de operar.'
    ]
  },
  {
    id: 'anatomia',
    layout: 'interactive',
    title: '1. A Malha Estromal & A Gênese do Ceratocone',
    module: 'M01',
    trainingScript: 'Estamos no Módulo 1. Chame a atenção para a animação 3D do estroma. Diga: "Ao invés de olharmos a córnea como um domo plástico, vejam as camadas reais. Fibras cruzadas, oblíquas. A ectasia primária não acontece por acaso. Ela acontece exatamente onde há 44% menos lamelas radiais, formando o gap ínfero-temporal. O cone só empurra onde há espaço estrutural livre." Esteja preparado para apontar a lacuna vermelha no quadrante IT na tela.',
    theory: `
      **A Anatomia Real:**
      A córnea não é um plástico uniforme. Ela é uma matriz de colágeno complexa. 
      Dados de WAXS mostram que a região ínfero-temporal possui **-44% menos lamelas radiais**.
      
      **Aplicação Prática:**
      A perda de 44% das fibras radiais na região infero-temporal cria um gap estrutural. Sob a força constante da PIO, essa região específica cede, gerando a ectasia topográfica e a protrusão do cone de forma previsível e biomecanicamente determinística.
    `
  },
  {
    id: 'fr_vr',
    layout: 'interactive',
    title: '2. As Duas Forças: Fr vs VR',
    module: 'M02',
    trainingScript: 'Módulo 2. A distinção de vetores. Mostre a seta vermelha apontando para cima. Diga: "A força da doença, a Pressão Intraocular, empurra no eixo Z, verticalmente. Mas observem o vetor azul da animação: o Anel não empurra para baixo. Ele estica lateralmente no plano XY, tracionando o colágeno de forma centrífuga. Você combate um vetor patológico axial usando um vetor de tração radial. Não é força contra força, é redistribuição de malha."',
    theory: `
      **O Confronto de Vetores:**
      
      1. **Fr (Força Patológica):** A pressão intraocular atua sobre a área focalmente enfraquecida, gerando uma distorção em direção anteroposterior (+Z).
      2. **VR (Vetor Radial do Anel):** O implante intracorneano atua provocando uma tração fibrilar no plano XY.
      
      **Aplicação Prática:**
      A deformação (Fr) ocorre no eixo axial (+Z), mas a correção mecânica do anel atua de forma ortogonal, ou seja, a 90 graus no plano XY. O vetor radial (VR) promove uma tração fibrilar centrífuga que estabiliza e aplaina a malha estromal alterada.
    `
  },
  {
    id: 'arc_shortening',
    layout: 'interactive',
    title: '3. Mecanismo Fibrilar: Arc-Shortening',
    module: 'M03',
    trainingScript: 'Módulo 3. Este é o coração mecânico do anel. Deixe a animação desenhar a deformação da fibra. Diga: "Isso é o Arc-Shortening. Quando colocamos volume no estroma, a fibra radial que cruzava de limbo a limbo é forçada a desviar pelo acrílico. Como ela está ancorada nas duas pontas, esse desvio consome o comprimento efetivo da fibra. E como o colágeno é um material hiperelástico, a tensão aumenta de forma exponencial, não linear. Quanto mais volume, mais encurtamento, e mais tensão. É esse strain-stiffening que gera o clássico flattening central na nossa topografia." Confirme que o público entendeu a mecânica da tração.',
    theory: `
      **Ação Real do ICRS (Plano XY):**
      Por que o anel achata a córnea central?
      
      **Aplicação Prática (Arc-Shortening):**
      Ao ser inserido, o implante atua como um obstáculo geométrico. As lamelas colágenas são forçadas a desviar fisicamente ao seu redor, encurtando o comprimento efetivo do arco de tecido disponível. Estando ambas as extremidades ancoradas rigidamente no limbo escleral, a tensão ao longo dessas lamelas aumenta de forma proporcional e direta ao volume do segmento, gerando achatamento progressivo na córnea central.
    `
  },
  {
    id: 'tenting',
    layout: 'interactive',
    title: '4. Vetor Endotelial (Esquema Interativo)',
    module: 'M04',
    trainingScript: 'Módulo 4. Quebre o mito do efeito tenda. Mostre a imagem histológica híbrida. Diga: "Muitos cirurgiões acham que o anel empurra o teto do estroma como o mastro de uma barraca. Errado. Observem a análise de Elementos Finitos. O tecido sofre estiramento. Esse estiramento cria um vetor verde que chamamos de Vetor Endotelial, que puxa a superfície para BAIXO, contrabalançando a PIO. A superfície anterior em si não eleva, ela aplaina. É precisão FEM aplicada à lâmpada de fenda."',
    theory: `
      **Ação Real do ICRS (Plano Z):**
      Como o anel atua e se comporta na intimidade da espessura estromal? 
      
      **O Paradoxo do Efeito Tenda:**
      Exames OCT e modelagens de Elementos Finitos (FEM) demonstram que o anel NÃO levanta a superfície anterior do epitélio. As fibras estromais tensionadas pelo *arc-shortening* criam e redirecionam a carga num formato oblíquo. Esse estiramento vetorial descendente (Vetor Endotelial) puxa ativamente o teto do estroma de volta para baixo, contrabalanceando perfeitamente a PIO.
    `
  },
  {
    id: 'poisson',
    layout: 'interactive',
    title: '5. Efeito de Poisson & Acoplamento',
    module: 'M05',
    trainingScript: 'Módulo 5. Acoplamento de Barraquer. Diga: "Se comprimimos uma borracha, ela expande para os lados. A córnea é quasi-incompressível, com coeficiente de Poisson de 0.49. Isso significa que ao usar os anéis para achatar fortemente um meridiano no limbo, você obrigatoriamente vai empinar o meridiano cruzado a 90 graus. A topografia muda porque o volume celular tem que fluir para algum lugar. Planeje os eixos pensando nesse acoplamento elástico volumétrico."',
    theory: `
      **A Fisiologia Incompressível (ν ≈ 0.49):**
      O estroma corneano apresenta extrema resistência elástica e, sendo quasi-incompressível, sua variação volumétrica é contida.
      
      **Aplicação Prática (Coupling Law):**
      Pelo princípio matemático de Poisson, o volume de matriz estromal sempre se conserva. Ao aplicar grande tensão centrífuga (achatando) o meridiano de base do implante, o tecido biológico responde fluindo na direção ortogonal de menor resistência, obrigatoriamente encurvando o meridiano interceptante (K steep).
    `
  },
  {
    id: 'vt_rotation',
    layout: 'interactive',
    title: '6. Vetor Tangencial (VT) e Rotação',
    module: 'M06',
    trainingScript: 'Módulo 6. Vetor Tangencial e controle de astigmatismo. Enquanto a animação roda o eixo, narre: "Anéis longos não servem apenas para dar suporte. Ao usarmos um arco de 160 graus ou mais, interceptamos as fibras tangenciais da periferia, não apenas radiais. Isso cria o Vetor Tangencial, que gera uma força de cintura, forçando fisicamente a redistribuição daquela gravata borboleta torta em direção a um eixo de simetria ortogonal e tratável."',
    theory: `
      **A Regularização Astigmática:**
      O Vetor Tangencial atua em paralelismo com a circunferência do anel, atuando nas lamelas oblíquas e tangenciais da periferia da córnea.
      
      **Aplicação Prática (VT e Simetria):**
      A distribuição de tensão ao longo de arcos extremamente longos (ex. 160° a 320°) força uma re-sintetização geométrica ao interceptar simultaneamente múltiplos feixes fibrilares. Essa somatória de forças circunferenciais causa uma rotação estrutural que puxa e rotaciona progressivamente o eixo astigmático aberrante e assimétrico em direção à simetria geométrica ortogonal e normalizada.
    `
  },
  {
    id: 'vtau',
    layout: 'interactive',
    title: '7. Vetor Torque (Vτ) e Anel Assimétrico',
    module: 'M07',
    trainingScript: 'Módulo 7. Torque Geométrico. Este é avançado. Diga: "Um cone oval e decaído precisa ser arrastado de volta. Um anel de espessura constante nunca fará isso sozinho. Ao usar um anel assimétrico, de 250 afinando para 150 micra, criamos um gradiente volumétrico formidável. Esse diferencial instaura o chamado Vetor Torque. A abóbada gira e migra forçadamente em direção ao centro geométrico. É controle torcional profundo sobre as lamelas falidas."',
    theory: `
      **O Resgate do Ápice IT (Fenótipos P2 Oval):**
      Nos cones onde o centro de massa está altamente decaído do eixo visual, apenas uma vetorização axial/radial falhará em centralizar o ápice.
      
      **Aplicação Prática (Torque Geométrico):**
      Os implantes assimétricos (como aqueles com gradiente reverso de espessura de 250μm afinando até 150μm) criam um forte diferencial de estresse volumétrico depositado nos feixes estromais. Essa diferença constante de base promove a indução mecânica imediata de um momento torcional (Vτ). O Vτ resultante traciona e rotaciona todo o maciço celular e a bossa corneana em migração forçada de volta para o reflexo central e pupilar do olho.
    `
  },
  {
    id: 'vcoma',
    layout: 'interactive',
    title: '8. VComa: Centralização Óptica',
    module: 'M08',
    trainingScript: 'Módulo 8. VComa. Diga: "Colegas, não se iludam com a tela da topografia. Coma não é uma força mecânica. Coma é apenas uma sombra, uma aberração colateral. A redução do coma que vemos no pré e pós operatório ocorre apenas porque nós usamos o Vetor Torque do slide anterior para centralizar fisicamente o tecido matriz. Centralizou fisicamente? O coma despenca aritmeticamente no aberrometro. Lide com a estrutura que a refração obedece."',
    theory: `
      **Coma não é uma força primária mecânica:**
      O VComa, mensurado pelo polinômio de Zernike Z(3,±1), deve ser interpretado como resultado final e representação óptica colateral do posicionamento fibrilar no espaço 3D.
      
      **Aplicação Prática:**
      A aberração comática é essencialmente uma leitura derivada e indireta de como a superfície corneana distribui a luz na topografia. Portanto, o anel intracorneano manipula e desloca diretamente o tecido matriz através da soma dos vetores radiais (VR) e torcionais (Vτ). A redução visual dramática das aberrações de alta ordem reportadas na clínica ocorre puramente pelo realinhamento físico progressivo deste ápice recém manipulado sobre as coordenadas focais foveais estritas.
    `
  },
  {
    id: 'placido',
    layout: 'interactive',
    title: '9. Plácido como Mapa de Forças',
    module: 'M09',
    trainingScript: 'Módulo 9. Reinterpretando Plácido. Diga: "Ao invés de ler dioptrias nos anéis reflexivos, leiam falhas estruturais. Onde a distância dos mires abre dramaticamente na porção inferior, o Vetor Radial falhou estruturalmente. Onde eles amontoam-se no topo superior, há um excesso compensatório do Vetor Tangencial. Todo exame reflexivo é um raio-x do esgarçamento do colágeno se você aprender a interpretar assim."',
    theory: `
      **Topografia sob uma nova lente:**
      Em cenários biomecânicos e femto-guiados, os discos da topografia reflexiva de Plácido devem ser lidos como "iso-curvas" do estresse e esgarçamento da tensão fibrilar subjacente.
      
      **Aplicação Prática:**
      A topologia visível nos mires reflete as linhas de contenção diretas da estrutura. Áreas onde observamos o afastamento brusco e abrupto dos reflexos indicam colapso de tenacidade local e perda do Vetor Radial (VR), característico da zona infero-temporal ectásica. Simetricamente, as seções onde os mires são fortemente aglomerados correspondem a um acúmulo elástico extremo que revela tração excessiva dominada por atividade tangencial de resistência (VT).
    `
  },
  {
    id: 'ksteep_enm',
    layout: 'interactive',
    title: '10. K-Steep vs Eixo Neutro Mecânico',
    module: 'M10',
    trainingScript: 'Módulo 10. O perigo da incisão errada. Explique: "Se você tem um cone fortemente assimétrico, como o fenótipo Duck, e opera mirando apenas na linha vermelha do steep axis topográfico, o resultado será hiper-correção indesejada. É preciso abandonar o K-Steep nesses casos severos e calcular o Eixo Neutro Mecânico, o ENM. É sobre esse eixo cego onde todas as forças radiais e tangenciais se neutralizam, e a única coisa que atua é a regularização pura."',
    theory: `
      **O grande erro da incisão pautada pela topografia sagital:**
      Em patologias corneanas caracterizadas por topografias altamente discordantes com os índices aberrométricos (Croissant e Snowman com elevada assimetria), programar a cirurgia focando no ponto focal máximo (K-steep) resulta muitas vezes em hiper-correção aberrante cruzada.
      
      **Aplicação Prática:**
      Para resgatar a ótica em casos como o fenótipo Duck, se deve utilizar e centralizar a zona de cirurgia pelo ENM (Eixo Neutro Mecânico). O ENM direciona as forças vetoriais do segmento a anular as aberrações frontais diretamente no foco de assimetria estrutural, compensando falhas complexas com vetores simetricamente opostos, mitigando os efeitos óticos da zona puramente de pico do steep-axis.
    `
  },
  {
    id: 'fem',
    layout: 'interactive',
    title: '11. A Prova Física: Simulação FEM',
    module: 'M11',
    trainingScript: 'Módulo 11. Mostre os mapas FEM vermelhos transferindo a carga. Diga: "O maior problema da ectasia não é a curvatura óptica, é o pico vermelho de estresse elástico onde a parede afina. Quando modelamos via FEM as lamelas antes e depois, fica claro: O anel rouba o pico patológico do ápice frágil e dissipa toda essa carga perigosamente letal para o limbo duro ao redor da área de implante. Salvamos a estrutura desviando a tensão para o PMMA."',
    theory: `
      **A Reestruturação de Elementos Finitos (FEM):**
      A análise computacional de FEM extrai distribuições elásticas através das tensões de limite de von Mises — não lida e não refrata energia ótica.
      
      **Aplicação Prática:**
      Os mapas von Mises avaliam o hotspot patológico exato que cede criticamente durante a fisiopatologia progressiva. Antes da presença cirúrgica, os esforços radiais da PIO focam em pequena área local do ectásico IT. Após a passagem intrastromal do corpo de PMMA, o ICRS desvia maciçamente e alivia fisicamente o pico de carga, dissipando de maneira tangencial o estresse em todo o restante contorno corneo-escleral. A malha então ganha proteção e durabilidade passiva.
    `
  },
  {
    id: 'video_cirurgico',
    layout: 'video',
    title: 'Exemplo: Vídeo Cirúrgico Real',
    videoUrl: '/exemplo_video.mp4', 
    trainingScript: 'Neste slide com vídeo, apenas deixe as imagens rodarem por 3 segundos para que a plateia observe o resultado in vivo. Em seguida, narre: "Vocês podem visualizar agora na tela todos aqueles vetores radiais e tangenciais simulados atuando de forma invisível, mas palpável, sobre o fluxo estromal durante a implantação. Tudo se comprova aqui no intraoperatório."',
    theory: `
      **Simulações Computacionais em MP4 de Alta Precisão:**
      
      A infraestrutura de vídeo MP4 complementa as visualizações SVG e serve para mostrar as respostas dinâmicas em alta resolução, como análises FEM pré-renderizadas, ou gravações OCT precisas comprovando in-vivo os vetores.
      
      **Aplicação Prática:**
      O cirurgião pode observar o acoplamento do sistema e a atuação contínua dos fenômenos vetoriais sem simplificações ou analogias, visualizando a pura ação biomecânica dos segmentos de arco sobre o material polimérico simulado em softwares avançados de análise.
    `
  },
  {
    id: 'profundidade',
    layout: 'interactive',
    title: '12. O Fulcro Ótimo: Implante a 72%',
    module: 'M12',
    trainingScript: 'Módulo final. Profundidade 72%. Diga: "Um anel a 60% tem pouco teto estromal para empurrar. Risco de extrusão. A 85%, além do risco letal de perfurar o Endotélio, a base elástica posterior é muito fina para segurar a tensão e o efeito arc-shortening enfraquece. Onde fica o sweet-spot absoluto? Entre 70 e 75%. É aqui que otimizamos o momento fletor sem comprometer o gap biomecânico de segurança."',
    theory: `
      **O "Sweet Spot" Cirúrgico:**
      Por que implantamos exatamente no range profundo de 70-75% e não superamos ou negligenciamos esses estratos espessos da base anatômica?
      
      **Aplicação Prática (O Fulcro de Maior Força):**
      Cirurgias em planos estromais rasos (60%) reduzem de modo fatal o torque da massa colágena sobrejacente necessária para rebaixar os cones proeminentes. Em contrapartida, implantes posicionados profundamente (>80%) limitam mecanicamente o deslocamento elástico e tangencial disponível na abóbada estromal, além de perigosamente beirar o Endotélio sensível. Um fulcro em 72% maximiza fisicamente a conversão do volume em tensionamento do arc-shortening associando-o perfeitamente com a segurança fisiológica da câmara anterior.
    `
  },
  {
    id: 'conclusion',
    layout: 'title',
    title: 'O Cirurgião Master Vector Engineer',
    subtitle: 'Saindo da óptica, dominando a física estrutural.',
    presenter: 'A topografia mostra o que aconteceu. Os vetores mostram o porquê.',
    trainingScript: 'Slide final. Agradeça o público e consolide a mensagem com autoridade. Diga: "Caros colegas, uma vez que compreendemos a arquitetura em três dimensões, a topografia vira apenas um espelho do passado. Os vetores nos mostram o futuro. Operar usando a mente de um Master Vector Engineer é entregar previsibilidade, é trocar a esperança cega pelo cálculo determinístico puro. Muito obrigado."'
  }
];
