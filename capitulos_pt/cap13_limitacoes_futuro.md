# Capítulo 13 — Limitações, Cronograma de Validação e Direções Futuras

> **Análise Vetorial Biomecânica Corneana para o Planejamento de Segmento de Anel Intraestromal**
> *Parte V — Horizontes*

---

## 13.1 Introdução

A integridade científica exige que as limitações de um arcabouço sejam declaradas de forma tão clara quanto suas alegações. A AVBC é um construto teórico fundamentado na modelagem de elementos finitos e apoiado pelo raciocínio físico. Ela ainda não foi validada em um ensaio clínico prospectivo. Este capítulo apresenta uma avaliação honesta do que o arcabouço pode e não pode fazer hoje, as simplificações e premissas específicas que limitam suas previsões atuais, e a trajetória de validação que determinará se a AVBC cumpre sua promessa.

Organizamos a discussão em três seções: limitações atuais da validação por FEM, o cronograma planejado de validação clínica e as direções de pesquisa de longo prazo que poderiam estender o arcabouço além de seu escopo atual.

---

## 13.2 Limitações Atuais

### 13.2.1 Simplificações Geométricas

Os modelos de FEM apresentados no Capítulo 10 utilizam uma geometria corneana esférica com espessura uniforme. As córneas ceratocônicas reais são:

- **Não esféricas:** A zona ectásica possui um raio de curvatura localmente reduzido, criando uma geometria que se afasta significativamente de uma esfera.
- **De espessura não uniforme:** A paquimetria varia de 450–600 μm centralmente a 700+ μm no limbo em córneas normais, e pode ser < 400 μm no ápice do cone no ceratocone.
- **Assimétricas:** A ectasia é tipicamente deslocada inferiormente, criando uma geometria que não é axissemétrica.

O impacto dessas simplificações na extração vetorial é difícil de quantificar com precisão sem modelos geométricos específicos de pacientes. No entanto, diversas considerações sugerem que os achados qualitativos são robustos:

1. A **análise de sensibilidade de varredura de arco** (VR insensível ao arco, VT monotônico com o arco) é uma comparação relativa — simulações com a mesma geometria, mas diferentes configurações de anel. As simplificações geométricas afetam os valores absolutos, mas é improvável que revertam as tendências relativas.
2. A **monotonicidade de VT** decorre de um mecanismo físico (arcos mais longos interceptam mais fibras de colágeno) que é independente do formato corneano específico.
3. O **desacoplamento de VR e VT** é um achado estrutural que depende da separação do deslocamento volumétrico (dependente da espessura) da redistribuição de tensão (stress) (dependente do comprimento do arco) — uma distinção que persiste independentemente da geometria corneana.

### 13.2.2 Premissas de Propriedades de Materiais

O modelo HGO utiliza um único conjunto de parâmetros de materiais (c = 0.05 MPa, k₁ = 0.22 MPa, k₂ = 100, κ = 0.09) aplicado uniformemente em toda a córnea. Na realidade:

- **As propriedades do material variam regionalmente:** O ápice do cone no ceratocone apresenta menor rigidez (menores c e k₁) do que o tecido circundante (Scarcelli et al., 2015).
- **As propriedades do material variam entre os pacientes:** Genética, idade, histórico de CXL e gravidade da doença afetam os parâmetros do material.
- **O modelo HGO não captura a viscoelasticidade:** Flutuação (creep) e relaxamento de tensão (stress) não são modelados, embora possam ser relevantes para a estabilidade do anel a longo prazo.

Uma análise de sensibilidade variando c e k₁ em ±30% mostra que a relação de monotonicidade de VT é preservada (a inclinação muda, mas permanece negativa), enquanto as magnitudes de VR variam de forma aproximadamente linear com a rigidez do material. Isso sugere que o arcabouço qualitativo é robusto à incerteza do material, embora previsões absolutas exijam calibração específica do paciente.

### 13.2.3 Validação Bem-Sucedida de Vτ

No rascunho inicial deste trabalho, a validação física do vetor de torque ativo ($V\tau$) foi identificada como a maior lacuna computacional isolada no arcabouço AVBC, dependendo de projeções analíticas em vez de simulação numérica direta. Hoje, essa lacuna foi totalmente resolvida. Geramos e concluímos com sucesso 6 simulações de segmentos de anel assimétricos de espessura progressiva no FEBio 4.12 sob condições de contorno fisiológicas.

Essas simulações confirmam que os designs de espessura progressiva quebram a simetria bilateral do campo de deslocamento, gerando valores de torque ativo que variam de $9.31\ \mu\text{N}\cdot\text{m}$ (progressivo linear) a $18.34\ \mu\text{N}\cdot\text{m}$ (progressivo parabólico), em comparação a uma linha de base numérica simétrica de $2.47\ \mu\text{N}\cdot\text{m}$. O mecanismo físico — um gradiente de deslocamento progressivo que produz um binário de forças localizado que rotaciona o vértice corneano — está agora computacionalmente verificado e é rastreável até o modelo constitutivo HGO.

Embora a validação física básica esteja concluída, trabalhos futuros devem estender essa validação para geometrias específicas de pacientes, conjuntos de dados de desfechos clínicos e configurações de múltiplos segmentos.

---

### 13.2.4 Interface ICRS–Estroma

O modelo atual trata o ICRS como uma inclusão rígida perfeitamente ligada ao estroma circundante. Na realidade clínica:

- O ICRS fica em um túnel criado por dissecção a laser de femtosegundo, com um pequeno espaço entre o anel e a parede do túnel.
- O anel pode rotacionar ou transladar ligeiramente dentro do túnel durante a cicatrização.
- Crescimento epitelial, remodelamento estromal e biointegração alteram as propriedades da interface ao longo do tempo.

Esses efeitos são de segunda ordem para a resposta biomecânica aguda, mas podem ser significativos para os desfechos a longo prazo. Modelos futuros devem considerar uma interface de contato com atrito em vez de uma união perfeita.

### 13.2.5 Representação Bidimensional do Anel

O ICRS é modelado como um anel de elementos de rigidez aumentada dentro da malha, em vez de um corpo tridimensional com sua própria geometria (seção transversal hexagonal, triangular ou trapezoidal). Essa simplificação afeta o campo de tensão (stress) local próximo ao anel, mas é improvável que altere as distribuições de deslocamento e tensão (stress) em campo distante que VR e VT capturam.

---

## 13.3 O Cronograma de Validação Clínica

### 13.3.1 Desenho do Estudo: Coorte Observacional Prospectiva

A validação definitiva do arcabouço AVBC requer um estudo prospectivo comparando a seleção de anel guiada pela AVBC com a seleção guiada por nomogramas. Propomos o seguinte desenho:

**Tipo de estudo:** Coorte observacional prospectiva, não randomizada, de dois braços.

**Braços:**
- **Braço A (guiado pela AVBC):** Seleção do anel utilizando a avaliação trimodal completa (O → T → B) com seleção de parâmetros baseada em vetores.
- **Braço B (guiado por nomograma):** Seleção do anel utilizando o nomograma de preferência do cirurgião (Ferrara, Keraring ou Intacs).

**Critérios de inclusão:**
- Idade entre 18–45 anos
- Ceratocone confirmado (Estágio I–III de Amsler-Krumeich)
- Topografia estável por ≥ 6 meses (or pós-CXL ≥ 12 meses)
- Paquimetria mais fina no local do túnel > 400 μm
- Sem cirurgia corneana prévia (exceto CXL)

**Critérios de exclusão:**
- KMax > 60 D (ceratoglobo → contraindicação para ICRS)
- Cicatriz corneana central
- Patologia ocular coexistente

**Desfechos primários:**
1. **AVBC-CI (Índice de Correção):** ΔK_observado / ΔK_previsto em 6 meses. Meta: 1.0 ± 0.15.
2. **Razão VT:** ΔCyl_observado / ΔCyl_previsto em 6 meses.
3. **Acurácia preditiva:** Erro absoluto médio (MAE) da previsão de ΔK: braço AVBC vs braço Nomograma.

**Desfechos secundários:**
- Alteração na CDVA (linhas de logMAR ganhas)
- Redução de HOA (RMS total, coma, trefoil)
- Migração do ápice (mm, medida no mapa de elevação posterior)
- Satisfação do paciente (NEI-VFQ-25)

**Estimativa do tamanho da amostra:** Com base em um teste t de duas amostras para o MAE da previsão de ΔK, assumindo MAE_nomograma = 1.5 D (DP = 1.0 D) and MAE_AVBC = 1.0 D (DP = 0.8 D), α = 0.05, poder = 0.80: N ≈ 50 por braço (100 no total).

### 13.3.2 Marcos de Validação

| Fase | Marco | Cronograma |
|------|-------|------------|
| 1 | Conclusão das simulações de anel assimétrico no FEBio (validação de Vτ) | **100% Concluído** |
| 2 | FEM personalizado para pacientes: 10 casos com geometria derivada do Pentacam | 6 meses |
| 3 | Previsão retrospectiva de AVBC em 50 casos históricos de ICRS | 9 meses |
| 4 | Início do recrutamento da coorte prospectiva | 12 meses |
| 5 | Desfechos de 6 meses para os primeiros 50 pacientes | 24 meses |
| 6 | Análise completa da coorte e publicação | 30 meses |

### 13.3.3 O Que Invalidaria o Arcabouço?

A honestidade científica exige a declaração das condições sob as quais a AVBC seria considerada inválida:

1. Se o VR for considerado dependente do comprimento do arco (contradizendo o achado do FEM de insensibilidade do VR ao arco), o mapeamento espessura-VR seria enfraquecido.
2. Se o VT não diminuir de forma monotônica com o comprimento do arco em modelos específicos de pacientes, a equação empírica de VT seria inaplicável.
3. Se os anéis assimétricos guiados por Vτ falharem em produzir a migração de ápice prevista clinicamente, a translação clínica do torque validado seria falsificada.
4. Se o AVBC-CI apresentar a mesma variância que o IC (Índice de Correção) do nomograma no estudo prospectivo, o arcabouço adicionaria complexidade sem benefício preditivo.

---

## 13.4 Direções Futuras

### 13.4.1 Modelagem de Elementos Finitos Personalizada para o Paciente

A extensão de maior impacto do arcabouço AVBC seria a modelagem personalizada por FEM para o paciente — construindo um modelo de elementos finitos a partir dos dados tomográficos reais de cada paciente (exportação do Pentacam ou Galilei), resolvendo os campos de deslocamento e tensão (stress) sob a PIO, e extraindo VR, VT e Vτ para múltiplas configurações de anel. Isso transformaria a AVBC de um arcabouço baseado na mecânica média da população em uma ferramenta de planejamento verdadeiramente personalizada.

Os requisitos técnicos são substanciais:
- Geração automatizada de malha a partir de dados tomográficos DICOM
- Segmentação das superfícies corneanas (anterior, posterior) e do mapa paquimétrico
- Parâmetros de materiais específicos do paciente (a partir da calibração por Brillouin ou ORA/Corvis)
- Inserção automatizada de anéis e comparação de múltiplas configurações
- Tempo de computação < 30 minutos por caso (para viabilidade no fluxo de trabalho clínico)

Trabalhos de prova de conceito realizados por Kling e Marcos (2013), Simonini et al. (2015) e Pandolfi et al. (2019) demonstraram a viabilidade de modelagem por FEM corneana personalizada para o paciente, embora não no contexto da decomposição vetorial de ICRS. Integrar a extração vetorial da AVBC a esses fluxos de trabalho existentes é um próximo passo natural.

### 13.4.2 Planejamento Aumentado por Aprendizado de Máquina (Machine Learning)

Uma vez acumulado um banco de dados suficientemente grande de casos de ICRS guiados pela AVBC (meta: 200+ casos com dados pré e pós-operatórios), o aprendizado de máquina pode ser aplicado para:

1. **Calibrar as previsões de VR/VT/Vτ:** Uma rede neural treinada em resultados reais pode aprender o mapeamento de parâmetros do paciente + configuração do anel → VR, VT, Vτ reais, corrigindo os vieses sistemáticos nas estimativas baseadas em FEM.
2. **Otimizar a seleção de anéis:** Dados os dados pré-operatórios de um paciente e os resultados desejados, um algoritmo de otimização pode pesquisar o espaço de parâmetros do anel (espessura × arco × profundidade × meridiano × assimetria) para encontrar a configuração que melhor corresponda ao vetor dominante.
3. **Prever complicações:** Identificar pacientes com risco elevado de extrusão, migração ou ineficácia do anel com base em características biomecânicas.

Isso não substitui a compreensão mecânica — é um complemento. O arcabouço AVBC fornece a *linguagem* (VR, VT, Vτ); o aprendizado de máquina calibra as *previsões*.

### 13.4.3 Monitoramento Biomecânico Intraoperatório

Tecnologias emergentes podem permitir a avaliação biomecânica em tempo real durante a cirurgia de ICRS:

- **OCT Intraoperatório:** Fornece imagens transversais em tempo real do anel dentro do túnel. Poderia ser utilizado para verificar a profundidade e a posição.
- **Integração da microscopia de Brillouin:** O mapeamento de rigidez em tempo real durante o procedimento poderia identificar variações regionais e guiar o posicionamento do anel.
- **Resposta ao sopro de ar (air-puff) durante a cirurgia:** A resposta de deformação corneana intraoperatória (mini-Corvis) poderia fornecer feedback imediato sobre o efeito biomecânico do anel.

Essas tecnologias estão atualmente em nível de pesquisa, mas podem se tornar clinicamente disponíveis dentro de 5 a 10 anos.

### 13.4.4 Extensão para Outras Condições Ectásicas

O arcabouço AVBC foi desenvolvido para o ceratocone, mas a mecânica subjacente se aplica a qualquer condição que envolva comprometimento biomecânico corneano:

- **Ectasia pós-LASIK:** A interface enfraquecida entre o flap e o leito cria uma distribuição de tensão (stress) diferente da do ceratocone, mas VR, VT e Vτ permanecem aplicáveis.
- **Degeneração marginal pelúcida:** A faixa de afinamento periférico cria uma geometria em que o anel deve cruzar a zona enfraquecida — Vτ pode ser particularmente relevante.
- **Ceratoglobo:** O afinamento difuso pode se beneficiar de estratégias de anel completo (360°) que potencializam o mecanismo VR-dominante.

### 13.4.5 Otimização Combinada de CXL + ICRS

O cenário clínico mais comum para o ceratocone avançado é o CXL sequencial seguido por ICRS. O arcabouço AVBC poderia ser estendido para modelar a interação biomecânica entre o crosslinking (que aumenta k₁) e o implante de anel (que modifica o campo de tensão (stress)). Um otimizador combinado de CXL + ICRS iria:

1. Estimar os parâmetros do material pós-CXL (com base no protocolo de CXL, fluência e zona de tratamento)
2. Ajustar as previsões vetoriais da AVBC para o tecido mais rígido
3. Selecionar parâmetros de anel otimizados para o estado biomecânico pós-CXL

---

## 13.5 Resumo

- O arcabouço AVBC possui **limitações específicas e identificáveis**: simplificações geométricas, propriedades de materiais uniformes, interface ICRS-estroma simplificada e a necessidade de translação clínica e validação do vetor de torque Vτ.
- Essas limitações são contornáveis por meio de **estudos computacionais e clínicos planejados** organizados em um cronograma de validação em fases.
- O **estudo clínico prospectivo** (N = 100, dois braços, resultados de 6 meses) fornecerá o teste definitivo para determinar se o planejamento guiado pela AVBC supera o planejamento guiado por nomogramas na acurácia preditiva.
- Direções futuras incluem **FEM personalizado para o paciente**, **calibração por aprendizado de máquina**, **monitoramento intraoperatório** e **extensão para outras condições ectásicas**.
- O arcabouço é explicitamente **projetado para ser falseável** — as condições sob as quais ele seria considerado inválido são declaradas com clareza.

---

## Referências

1. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
2. García de Oteyza G, et al. Finite element analysis of progressive thickness ICRS. *J Cataract Refract Surg*. 2021;47(2):258–265.
3. Kling S, Marcos S. Finite-element modeling of ICRS in a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
4. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response. *Front Bioeng Biotechnol*. 2018;6:210.
5. Pandolfi A, Gizzi A, Vasta M. A microstructural model of cross-link interaction between collagen fibrils in the human cornea. *Phil Trans R Soc A*. 2019;377(2144):20180079.
6. Scarcelli G, Besner S, Pineda R, et al. In vivo biomechanical mapping of normal and keratoconus corneas. *JAMA Ophthalmol*. 2015;133(4):480–482.
7. Simonini I, Angelillo M, Pandolfi A. Theoretical and computational analysis of the biomechanics of ICRS for keratoconus. *J Mech Behav Biomed Mater*. 2015;51:260–275.
8. Wollensak G, Spoerl E, Seiler T. Riboflavin/UVA crosslinking. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
