<!-- GPT revision applied -->
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

### Parte I — O Problema e os Fundamentos (Capítulos 1–3)

#### Capítulo 1: A Córnea Ceratocônica como uma Estrutura Mecânica
*Sinopse:* Apresenta a córnea como uma casca anisotrópica e hiperelástica. Aborda a anatomia fibrilar, o modelo constitutivo HGO e o ciclo de descompensação de Dupps. Estabelece que o ceratocone é uma doença biomecânica.

#### Capítulo 2: Como os ICRS Funcionam — Do Deslocamento Volumétrico à Decomposição Vetorial
*Sinopse:* Revisão crítica dos mecanismos do ICRS. Introduz a decomposição em três vetores (VR/VT/Vτ) como linguagem unificadora.

#### Capítulo 3: Os Limites do Planejamento Empírico — Por Que os Nomogramas Falham
*Sinopse:* Revisa nomogramas Ferrara, Keraring e Intacs. Apresenta evidências de discordância entre cirurgiões. Motiva a abordagem mecanicista.

---

### Parte II — Os Vetores Biomecânicos (Capítulos 4–8) — Contribuição Original

#### Capítulo 4: Os Três Domínios de Avaliação do ICRS
*Sinopse:* Introduz a avaliação trimodal: Óptica × Topográfica × Biomecânica.

#### Capítulo 5: VR — O Vetor Radial: Mecânica do Aplanamento
*Sinopse:* Definição de VR. Achado: VR é insensível ao comprimento do arco — modulado apenas pela espessura do anel.

#### Capítulo 6: VT — O Vetor Tangencial: Redistribuição de Astigmatismo
*Sinopse:* Definição de VT. VT diminui linearmente com o comprimento do arco (R² = 0.94). O arco controla a regularização.

#### Capítulo 7: Vτ — O Vetor de Torque: Reposicionamento do Ápice
*Sinopse:* A contribuição mais original. Torque gerado por geometria assimétrica. Introduz o ENM.

#### Capítulo 8: O Método Alpins — Um Modelo para Linguagens de Planejamento Cirúrgico
*Sinopse:* Revisa Alpins (TIA/SIA/DV/CI). Com VR/VT/Vτ já apresentados, o paralelo estrutural é natural.

---

### Parte III — Da Teoria à Prática Clínica (Capítulos 9–11)

#### Capítulo 9: A Classificação AVBC Integrada — Matriz de Decisão
*Sinopse:* O arcabouço completo: O × T × B → prescrição. Matriz de Decisão Biomecânica. *(Capítulo de amostra.)*

#### Capítulo 10: Do Arcabouço ao Fluxo de Trabalho Clínico
*Sinopse:* Tradução do arcabouço em fluxo clínico. Árvores de decisão e checklist de consultório.

#### Capítulo 11: Casos Ilustrativos
*Sinopse:* Três estudos de caso detalhados (cone central, periférico, avançado).

---

### Parte IV — Validação e Evidência (Capítulo 12)

#### Capítulo 12: Validação Computacional — Extração por FEM de V_R, V_T e V_τ
*Sinopse:* Pipeline completo: FEBio 4.12 + HGO → 34 simulações. *(Capítulo de amostra.)*

---

### Parte V — Horizontes (Capítulo 13)

#### Capítulo 13: Limitações e Direções Futuras
*Sinopse:* Avaliação crítica das limitações. Estudo prospectivo planejado (N=100).

---

### Parte VI — A Plataforma e Conclusão (Capítulos 14–15)

#### Capítulo 14: A Plataforma de Software AVBC
*Sinopse:* Arquitetura do software de suporte à decisão clínica.

#### Capítulo 15: Conclusão
*Sinopse:* Síntese das contribuições e visão futura.

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
