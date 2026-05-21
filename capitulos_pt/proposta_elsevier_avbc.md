# PROPOSTA DE LIVRO — Elsevier

---

## Título

**Corneal Biomechanical Vector Analysis for Intracorneal Ring Segment Planning**
*From Empirical Nomograms to Mechanistic Decision Frameworks*

### Alternativa (edição bilíngue)

**Análise Vetorial Biomecânica Corneana Aplicada aos Anéis Intracorneanos**
*Dos Nomogramas Empíricos ao Planejamento Vetorial*

---

## 1. Escopo e Justificativa

### O Problema Clínico

Os segmentos de anéis intraestromais (ICRS) são a intervenção cirúrgica mais amplamente utilizada para o ceratocone em todo o mundo, com mais de 500.000 implantes realizados desde 1999. Apesar de três décadas de uso clínico, o planejamento de ICRS permanece fundamentalmente empírico: os cirurgiões selecionam os parâmetros do anel (espessura, comprimento do arco, profundidade, meridiano) usando nomogramas — tabelas de consulta derivadas de séries retrospectivas — que não decompõem o efeito do ICRS em seus mecanismos biomecânicos constituintes.

As consequências são mensuráveis:
- Quando apresentados a dados idênticos de pacientes, **diferentes especialistas em ICRS recomendam diferentes configurações de anéis** — a concordância entre cirurgiões é baixa.
- Os resultados baseados em nomogramas mostram **ampla variância** (faixa de ΔK de 0.1–6.0 D para a mesma espessura de anel).
- A área não produziu **nenhum arcabouço unificado** análogo ao que Alpins criou para a cirurgia de astigmatismo em 1993.

### A Solução: AVBC

Este livro introduz a **AVBC (Análise Vetorial Biomecânica Corneana)** — um arcabouço mecanicista que decompõe o efeito do ICRS em três vetores biomecânicos:

| Vetor | Grandeza Física | O Que Controla | Parâmetro do Anel |
|-------|-----------------|----------------|-------------------|
| **VR** | Deslocamento radial (μm) | Aplanamento corneano (ΔK) | Espessura |
| **VT** | Redistribuição de tensão (stress) tangencial (kPa) | Regularização do astigmatismo (ΔCyl) | Comprimento do arco |
| **Vτ** | Torque assimétrico (μN·m) | Reposicionamento do ápice | Assimetria do anel |

Esses vetores **não são metáforas** — eles são extraídos de simulações de elementos finitos (FEBio 4.12, modelo anisotrópico HGO) com rastreabilidade total desde as equações constitutivas até as tabelas de decisão clínica.

### Por Que Este Livro É Necessário Agora

1. **Lacuna confirmada pela busca na literatura:** Nenhum livro ou arcabouço integra a análise vetorial biomecânica ao planejamento prospectivo do ICRS.
2. **O precedente de Alpins:** Em 1993, Alpins transformou a cirurgia de astigmatismo ao criar uma linguagem vetorial padronizada (TIA/SIA/DV). O planejamento de ICRS precisa da mesma transformação.
3. **Validação por FEM disponível:** Trabalhos recentes (Kling & Marcos 2013, García de Oteyza 2021-2023) fornecem validação computacional dos mecanismos do ICRS — mas ninguém os traduziu em um arcabouço clínico.

### Público-Alvo

| Público | Como utilizará o livro |
|---------|------------------------|
| **Cirurgiões de córnea** (primário) | Arcabouço de decisão para o planejamento diário de ICRS |
| **Residentes de oftalmologia** | Livro-texto sobre biomecânica corneana e ICRS |
| **Pesquisadores** (FEM/biomecânica) | Metodologia para extração vetorial a partir de FEM |
| **Indústria (fabricantes de anéis)** | Racional de design para novas geometrias de anéis |

### Mercado Estimado

- ~2.000 cirurgiões realizando ICRS em todo o mundo (estimativa conservadora)
- ~15.000 residentes de oftalmologia em treinamento anualmente
- Prevalência crescente do ceratocone (1:375 → 1:84 com triagem moderna)

---

## 2. Sumário

### Parte I — Fundamentos (Capítulos 1–4)

#### Capítulo 1: A Córnea Ceratocônica como uma Estrutura Mecânica
*Sinopse (80 palavras):* Apresenta a córnea como uma casca anisotrópica e hiperelástica. Aborda a anatomia fibrilar, a orientação das fibras de colágeno (dados de espalhamento de raios X de Meek & Knupp), o modelo constitutivo de Holzapfel-Gasser-Ogden e o ciclo de descompensação de Dupps. Estabelece que o ceratocone é uma doença biomecânica — e não apenas geométrica — e que qualquer intervenção eficaz deve abordar a distribuição de tensão (stress) subjacente, não apenas o formato da superfície.

#### Capítulo 2: Como os ICRS Funcionam — Do Deslocamento Volumétrico à Decomposição Vetorial
*Sinopse (80 palavras):* Revisão crítica dos mecanismos do ICRS: encurtamento de arco (Barraquer), deslocamento volumétrico (Kling & Marcos), redistribuição de tensão (stress) (Dupps & Roberts). Refuta o conceito de "limbo artificial" usando evidências de FEM. Introduz a decomposição em três vetores (VR/VT/Vτ) como uma linguagem unificadora. Mostra que o efeito clínico depende de qual mecanismo domina — e que isso depende dos parâmetros do anel, não do estágio da doença.

#### Capítulo 3: O Método Alpins — Um Modelo para Linguagens de Planejamento Cirúrgico
*Sinopse (80 palavras):* Revisa a análise vetorial de Alpins para cirurgia de astigmatismo (TIA/SIA/DV/CI). Destila as lições metodológicas: (1) todo efeito cirúrgico tem um componente planejado e um induzido, (2) a diferença é o erro, (3) a nomenclatura padronizada permite a comparação entre cirurgiões. Argumenta que a mesma estrutura se aplica ao planejamento de ICRS, mas a álgebra é mais complexa (biomecânica 3D vs astigmatismo polar 2D).

#### Capítulo 4: Os Limites do Planejamento Empírico — Por Que os Nomogramas Falham
*Sinopse (80 palavras):* Revisa cinco gerações de nomogramas Ferrara, a calculadora Keraring e o nomograma Intacs. Apresenta evidências de discordância entre cirurgiões e variância dos nomogramas. Identifica a causa raiz: os nomogramas são correlativos (espessura do anel ↔ ΔK), mas não causais (não explicam o PORQUÊ de um anel mais espesso aplanar mais). Motiva a abordagem mecanicista: para prescrever corretamente, devemos entender o mecanismo.

---

### Parte II — O Arcabouço AVBC (Capítulos 5–9) — Contribuição Original

#### Capítulo 5: Os Três Domínios de Avaliação do ICRS
*Sinopse (80 palavras):* Introduz a avaliação trimodal: coerência Óptica (o paciente consegue enxergar melhor?), morfologia Topográfica (onde está o cone?) e mecanismo Biomecânico (como devemos agir?). Cada domínio possui critérios quantitativos. A interseção de todos os três determina a prescrição do anel. Este capítulo fornece a visão geral; os capítulos subsequentes detalham cada vetor.

#### Capítulo 6: VR — O Vetor Radial: Mecânica do Aplanamento
*Sinopse (80 palavras):* Definição formal de VR como o campo de deslocamento radial Δuᵣ. Extração do FEBio: ux·cos(θ) + uy·sin(θ). Correlação clínica: VR → ΔK via κ = (n-1)/R. Dados de FEM: VR = 8.9–19.9 μm (média central). Achado fundamental: VR é insensível ao comprimento do arco (19.2 μm em arcos de 90°-320°) — ele é modulado apenas pela ESPESSURA do anel. Isso desacopla o aplanamento da redistribuição.

#### Capítulo 7: VT — O Vetor Tangencial: Redistribuição de Astigmatismo
*Sinopse (80 palavras):* Definição formal de VT como Δσ_θθ (transformação do tensor de tensão (stress) de Cauchy). Dados de FEM: VT diminui de forma monotônica de 7.78 a 7.20 kPa conforme o comprimento do arco aumenta de 90° para 320° (R² = 0.94). Interpretação física: arcos mais longos interceptam mais fibras de colágeno, redistribuindo a tensão (stress) tangencial por uma área maior. Implicação clínica fundamental: o comprimento do arco controla a regularização do astigmatismo, não o aplanamento.

#### Capítulo 8: Vτ — O Vetor de Torque: Reposicionamento do Ápice
*Sinopse (80 palavras):* A contribuição mais original. Definição formal de Vτ como o torque gerado pela geometria assimétrica do anel. Diagrama de corpo livre: forças desiguais nas extremidades do anel criam um binário de forças → migração do ápice. Apoiado pelo FEM de García de Oteyza (2021-2023): anéis assimétricos reduzem o coma em 40% em relação aos simétricos. Introduz o ENM (Eixo Neutro Mecânico) como um conceito inovador para localizar o eixo mecânico da ectasia.

#### Capítulo 9: A Classificação AVBC Integrada — Matriz de Decisão
*Sinopse (80 palavras):* O arcabouço completo: Módulo O (óptico) × Módulo T (topográfico) × Módulo B (biomecânico) → prescrição do anel. Apresenta a Matriz de Decisão Biomecânica com critérios quantitativos e regras clínicas. Introduz a profundidade como um amplificador universal. Fornece fluxo de trabalho clínico passo a passo com fluxogramas. Diferencia a AVBC dos nomogramas existentes em sete critérios. *(Capítulo de amostra fornecido com esta proposta.)*

---

### Parte III — Validação e Casos (Capítulos 10–13)

#### Capítulo 10: Validação Computacional — Extração por FEM de V_R, V_T e V_τ
*Sinopse (80 palavras):* Pipeline completo: FEBio 4.12 + modelo HGO → extração vetorial ao longo de 34 simulações. Varredura de arco (8 configs), modelos específicos de pacientes (8 pacientes, execução dupla), varredura concêntrica (4 configs) e simulações assimétricas de espessura progressiva (6 configs). Achados principais: (1) monotonicidade de VT, (2) insensibilidade de VR ao arco, (3) validação do torque corretivo ativo ($V\tau = 9.31\text{--}18.34\ \mu\text{N}\cdot\text{m}$), (4) o paradoxo do ICRS (Δuz < 0). Cadeia completa de rastreabilidade desde parâmetros clínicos até figuras finais. *(Capítulo de amostra fornecido com esta proposta.)*

#### Capítulo 11: Do Arcabouço ao Fluxo de Trabalho Clínico
*Sinopse (80 palavras):* Tradução passo a passo do arcabouço teórico para um fluxo de trabalho clínico acionável. Desconstrói como um cirurgião identifica a necessidade vetorial dominante e escolhe a configuração de anel correspondente. Entrelaça um fluxograma diagnóstico e algoritmos detalhados passo a passo. Inclui árvores completas de decisão clínica.

#### Capítulo 12: Casos Ilustrativos: Planejamento de ICRS Guiado pela AVBC
*Sinopse (80 palavras):* Apresenta três estudos de caso altamente detalhados e ilustrativos representando diferentes desafios biomecânicos (cone central simétrico, cone periférico assimétrico, ectasia avançada). Para cada caso, detalha dados tomográficos, aberrações ópticas, seleção vetorial, anel planejado e desfechos pós-operatórios, demonstrando o torque clinicamente validado de $V\tau = 9.31\ \mu\text{N}\cdot\text{m}$.

#### Capítulo 13: Limitações, Perguntas em Aberto e Direções Futuras
*Sinopse (80 palavras):* Avaliação honesta e crítica das limitações do arcabouço, incluindo simplificações geométricas, parâmetros de materiais uniformes e premissas de interface ICRS-estroma. Apresenta um cronograma rigoroso de validação, detalhando um estudo de coorte observacional prospectivo (N=100) e critérios específicos de falseabilidade para testar a eficácia clínica da AVBC.

---

### Parte IV — A Plataforma e Conclusão (Capítulos 14–15)

#### Capítulo 14: A Plataforma de Software AVBC: Arquitetura e Implementação
*Sinopse (80 palavras):* Esboça a arquitetura de um software dedicado ao suporte à decisão clínica. Detalha a camada de entrada (tomografia, aberrometria, refração manifesta), a camada de processamento (classificadores do Módulo O/T, motor de vetores do Módulo B) e a camada de saída (recomendações de anéis classificadas). Incorpora o banco de dados de 34 simulações como uma tabela de consulta parametrizada e planeja extensões futuras (FEM em GPU em tempo real e calibração por ML).

#### Capítulo 15: Conclusão: Rumo a uma Linguagem Biomecânica para a Cirurgia Corneana
*Sinopse (80 palavras):* Sintetiza as principais contribuições do livro: estabelecendo a AVBC como uma linguagem clínica, um arcabouço de decisão estruturado e uma fundação computacionalmente validada. Reconhece o cronograma de validação clínica e esboça a visão futura de modelagem personalizada para o paciente e planejamento automatizado baseado em vetores para corresponder à elegância mecânica do estroma.

---

## 3. Títulos Concorrentes e Diferenciação

| Título Existente | Escopo | Diferencial da AVBC |
|------------------|--------|---------------------|
| **Keratoconus and Keratoectasia** (Ferrara, Springer 2017) | Guia clínico, baseado em nomograma | Sem arcabouço vetorial; sem validação por FEM |
| **Keratoconus: Diagnosis and Management** (Alió, Springer 2017) | Manejo clínico | Focado em classificação; sem planejamento mecanicista |
| **Corneal Biomechanics** (Dupps, em andamento) | Ciência básica | Sem arcabouço de decisão clínica |
| **Intacs and Ferrara Ring Segments** (Torquetti, capítulos de livro) | Técnica cirúrgica | Empírico; sem decomposição vetorial |

> **Posicionamento exclusivo:** "O primeiro livro a traduzir a biomecânica corneana em uma linguagem vetorial para o planejamento prospectivo de ICRS, validado por análise de elementos finitos."

---

## 4. Multimídia e Material Suplementar

- **Figuras de FEM em alta resolução** (300 dpi, prontas para publicação)
- **Vídeos cirúrgicos** com sobreposição da AVBC (planejado)
- **Matriz de decisão interativa** (companheiro web)
- **Scripts em Python** para extração vetorial (repositório GitHub, código aberto)
- **Arquivos de modelo FEBio** (.feb) para reprodutibilidade

---

## 5. Cronograma

| Fase | Duração | Conteúdo |
|------|---------|----------|
| **Submissão da proposta** | Mês 0 | Este documento + 2 capítulos de amostra (9, 10) |
| **Contrato e planejamento** | Meses 1–2 | Acordo editorial, finalização de coautores |
| **Parte I (Fundamentos)** | Meses 3–6 | Capítulos 1–4 |
| **Parte II (Arcabouço AVBC)** | Meses 7–10 | Capítulos 5–9 |
| **Parte III (Validação)** | Meses 11–14 | Capítulos 10–13, casos clínicos |
| **Parte IV (Fronteiras)** | Meses 15–16 | Capítulos 14–16 |
| **Revisão e edição** | Meses 17–18 | Revisão por pares, edição de texto |
| **Publicação** | Mês 20 | |

---

## 6. Capítulos de Amostra

Dois rascunhos completos de capítulos acompanham esta proposta:

1. **Capítulo 9: A Classificação AVBC Integrada** — A principal contribuição original. Contém a Matriz de Decisão Biomecânica, o fluxo de trabalho clínico e a diferenciação em relação aos nomogramas.

2. **Capítulo 10: Validação Computacional** — Metodologia completa de FEM e resultados de 34 simulações. Demonstra rastreabilidade e rigor quantitativo.

---

## 7. Declaração do Autor

> Este livro é o primeiro a propor uma linguagem vetorial padronizada para o planejamento prospectivo de segmentos de anéis intraestromais, integrando a avaliação óptica, topográfica e biomecânica em um arcabouço de decisão unificado validado por análise de elementos finitos.

---

*Submissão para: AuthorQuery@elsevier.com*
*Formato: Elsevier Health Sciences Book Proposal*
