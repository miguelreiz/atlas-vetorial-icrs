# Capítulo 14 — A Plataforma de Software AVBC: Do Arcabouço à Ferramenta

> **Análise Vetorial Biomecânica Corneana para o Planejamento de Segmento de Anel Intraestromal**
> *Parte V — Horizontes*

---

## 14.1 Introdução

Um arcabouço biomecânico, por mais elegante que seja na teoria, torna-se clinicamente impactante apenas quando está acessível ao cirurgião na prática. A classificação AVBC — avaliação trimodal, seleção vetorial, prescrição de anel — envolve critérios quantitativos, previsões derivadas de FEM e uma árvore de decisão estruturada que, embora perfeitamente compreensíveis, beneficiam-se do suporte computacional. Este capítulo descreve a arquitetura e o fluxo de trabalho de uma plataforma de software AVBC vislumbrada que automatizaria a avaliação trimodal e forneceria recomendações de anéis baseadas em vetores a partir de dados clínicos padronizados.

A plataforma é concebida não como um substituto para o julgamento clínico, mas como uma **ferramenta de suporte à decisão** — de forma análoga à fórmula Barrett Universal II para cálculo de LIO ou ao software Alpins ASSORT para análise de astigmatismo. O cirurgião fornece os dados de entrada, o software realiza a análise biomecânica e o resultado é uma lista classificada de configurações de anéis com os valores esperados de VR, VT e Vτ para cada uma.

> [!NOTE]
> **Para o Clínico: O Software Não Substitui o Cirurgião**
> A plataforma AVBC funciona como o Barrett ou o ASSORT: você insere os dados, o software calcula, e você decide. A plataforma gera uma *recomendação*, não uma *prescrição*. O cirurgião sempre tem a última palavra.

---

## 14.2 Arquitetura do Sistema

### 14.2.1 Camada de Entrada

A plataforma AVBC aceita dados clínicos padronizados de três fontes:

1. **Tomografia corneana (exportação Pentacam/Galilei em formato DICOM ou CSV):**
 - Mapa de curvatura sagital → classificação topográfica (Módulo T)
 - Mapa de elevação posterior → cálculo do ENM
 - Mapa paquimétrico → restrições de profundidade, margens de segurança do anel
 - Valores de K-steep, K-flat, KMax

2. **Aberrometria de frente de onda (wavefront) (exportação Zywave, iTrace ou OPD-Scan):**
 - Coeficientes de Zernike → RMS de Coma, RMS total de HOA (Módulo O)
 - Direção e magnitude do vetor de coma

3. **Refração clínica e dados clínicos (entrada manual):**
 - Esfera, cilindro, eixo
 - BCVA (Acuidade Visual Melhor Corrigida)
 - Idade, histórico de CXL, cirurgia prévia

### 14.2.2 Camada de Processamento

A camada de processamento implementa três módulos:

**Classificador Módulo O:**
- Aplica os quatro critérios ópticos (RMS de Coma, Δ Eixo, HOA total, Coma vs ápice) a partir dos dados de frente de onda (wavefront) e refração.
- Saídas: classificação O+, O~ ou O− com justificativa.

**Classificador Módulo T:**
- Analisa o mapa de curvatura sagital usando reconhecimento de padrões (correspondência de modelos contra cinco morfologias canônicas: oval central, mamilo inferior [inferior nipple], crescente paracentral, formato em D periférico, ceratoglobo).
- Computa o ENM a partir do mapa de elevação posterior: identifica o meridiano de máxima elevação posterior em relação à esfera de melhor ajuste (BFS).
- Computa a divergência do ENM: |ENM − K-steep|.
- Saídas: classificação morfológica e ângulo do ENM com sinalizador (flag) de divergência.

**Motor de Vetores Módulo B:**
- Com base na necessidade clínica (determinada pelos Módulos O e T), identifica o(s) vetor(es) dominante(s).
- Aplica as tabelas de consulta (lookup tables) derivadas de FEM:
 - VR como função da espessura do anel (a partir da série de simulações concêntricas)
 - VT como função do comprimento do arco (a partir da equação de monotonicidade de VT)
 - Vτ como função da razão de assimetria (a partir dos dados de simulação assimétrica de espessura progressiva validados)
- Gera uma lista classificada de configurações de anéis (espessura × arco × profundidade × meridiano × perfil) ordenada pelo benefício biomecânico esperado.

### 14.2.3 Camada de Saída

A saída apresenta:

1. **Resumo da Classificação AVBC:** Grau O, classificação T, dominância de vetor B, divergência do ENM.
2. **Configuração de Anel Recomendada:** Top 3 configurações classificadas por correspondência vetorial, com os valores esperados de VR, VT, Vτ para cada uma.
3. **Comparação com Nomograma:** Mostra o que o nomograma Ferrara/Keraring/Intacs prescreveria e destaca as diferenças.
4. **Visualização:** Mapa corneano interativo mostrando o campo de deslocamento esperado (VR), redistribuição de tensão (stress) (VT) e direção de migração do ápice (Vτ) para a configuração recomendada.

---

## 14.3 A Tabela de Consulta (Lookup Table) por FEM

No cerne do motor do Módulo B está uma **tabela de consulta parametrizada** derivada de simulações de FEM. Em vez de executar uma análise completa de elementos finitos para cada paciente (o que exigiria de minutos a horas), a plataforma realiza a interpolação a partir de um banco de dados pré-computado.

### 14.3.1 Tabela Atual (34 Simulações)

O conjunto de simulações existente fornece:

| Faixa de Parâmetro | Valores | N Simulações |
|--------------------|---------|--------------|
| Comprimento do arco | 90°, 120°, 160°, 210°, 255°, 320°, 360° | 7 (varredura de arco) |
| Espessura do anel | 250 μm (padrão) | 1 nível |
| Geometria corneana | Esférica, uniforme, R=7.8 mm | 1 geometria |
| PIO | 15 mmHg | 1 nível |
| Material | Parâmetros padrão HGO | 1 conjunto |
| Específico do paciente | 8 convergentes derivados do Pentacam | 8 |
| Carga concêntrica | 13 configurações | 13 |
| Progressivo assimétrico | 6 perfis de espessura progressiva | 6 |

Isso fornece cobertura suficiente para a sensibilidade ao comprimento do arco (equação de VT) e validação básica do vetor de torque ativo Vτ, mas cobertura limitada para a varredura de sensibilidade à espessura. Expandir o banco de dados para incluir múltiplos valores de espessura (150, 200, 250, 300, 350, 400 μm) e múltiplas geometrias (esfera, elipsoide prolato, cone ceratocônico) exigiria aproximadamente 200 simulações adicionais.

### 14.3.2 Estratégia de Interpolação

Para configurações não diretamente simuladas, a plataforma utiliza interpolação bilinear entre os pontos computados mais próximos:

- **VR(espessura):** Interpolação linear a partir de dados de séries de espessura (a serem gerados).
- **VT(arco):** Aplicação direta da equação empírica: VT = −0.0018 × arc° + 7.79.
- **Vτ(assimetria):** Derivado das simulações assimétricas de espessura progressiva validadas, utilizando o diferencial de espessura e o comprimento do arco como parâmetros fundamentais.
- **Correção de profundidade:** Aplicada como um fator multiplicativo com base na razão profundidade/paquimetria.

### 14.3.3 Futuro: FEM em Tempo Real

Com os avanços em solvers de FEM acelerados por GPU (por exemplo, FEBio com OpenCL) e modelos de ordem reduzida, a simulação personalizada para o paciente em tempo real pode tornar-se viável. Um modelo de ordem reduzida treinado em 500+ soluções completas de FEM poderia fornecer estimativas de VR, VT, Vτ em segundos em vez de horas, permitindo o uso intraoperatório.

---

## 14.4 Conceito de Interface do Usuário

### 14.4.1 Painel Clínico (Dashboard)

A tela principal apresenta um **layout de quatro painéis:**

| Painel | Conteúdo |
|--------|----------|
| Superior esquerdo | Mapa tomográfico com sobreposição do ENM (visualização do Módulo T) |
| Superior direito | Gráfico de frente de onda com classificação O (visualização do Módulo O) |
| Inferior esquerdo | Tela de seleção vetorial: barras de VR, VT, Vτ mostrando valores previstos para o anel selecionado |
| Inferior direito | Painel de prescrição do anel: parâmetros de configuração, desfechos esperados, comparação com nomograma |

### 14.4.2 Simulador de Anel Interativo

Uma interface baseada em controles deslizantes (sliders) permite que o cirurgião ajuste os parâmetros do anel e observe o efeito previsto em tempo real:

- **Controle deslizante de espessura:** 150–400 μm → atualiza a previsão de VR
- **Controle deslizante de comprimento de arco:** 90°–360° → atualiza a previsão de VT (com a exibição da equação de VT)
- **Alternador de assimetria:** Simétrico / Progressivo → habilita a previsão de Vτ
- **Controle deslizante de profundidade:** 60–80% → atualiza todos os vetores (fator de amplificação)
- **Seletor de meridiano:** 0°–360° → rotaciona o posicionamento do anel, mostra o alinhamento com o ENM

Cada ajuste atualiza os valores previstos de ΔK, ΔCyl e migração do ápice em tempo real.

> [!TIP]
> **Para o Clínico: Imagine Isto na Prática**
> Antes da cirurgia, abre o software, insere os dados do Pentacam e da aberrometria. O sistema classifica automáticamente (O+, Crescente paracentral, VT dominante). Arraste o slider de arco de 160° para 210° e veja o VT subir. Arraste a espessura e veja o VR subir. Compare com o que o nomograma sugeriria. Em 2 minutos, tem uma prescrição biomecânicamente justificada.

### 14.4.3 Módulo de Análise Pós-Operatória

Após a cirurgia, a plataforma aceita os dados pós-operatórios e computa:
- AVBC-CI = ΔK_observado / ΔK_previsto
- Razão VT = ΔCyl_observado / ΔCyl_previsto
- Razão Vτ = Migração_ápice_observada / Migração_ápice_prevista

Esses valores são armazenados no banco de dados pessoal do cirurgião, construindo a curva de calibração ao longo do tempo.

---

## 14.5 Implementação Técnica

### 14.5.1 Stack Tecnológico Recomendado

| Componente | Tecnologia | Justificativa |
|------------|------------|---------------|
| Backend | Python 3.10+ | Integração com FEBio, computação científica |
| Solver FEM | FEBio 4.x (C++ com vínculos em Python) | Código aberto, validado para biomecânica |
| Processamento de dados | NumPy, SciPy, pandas | Python científico padrão |
| Visualização | Matplotlib (publicação), Plotly (interativo) | Modos de saída duplos |
| Frontend | Baseado na web (React + Plotly.js) ou Desktop (PyQt6) | Multiplataforma |
| Banco de dados | SQLite (local) ou PostgreSQL (multi-site) | Dados de pacientes e curvas de calibração |
| Exportação | Geração de relatórios em PDF (LaTeX ou ReportLab) | Documentação clínica |

### 14.5.2 Segurança de Dados

O manuseio de dados de pacientes deve estar em conformidade com as regulamentações HIPAA (EUA), GDPR (UE) e LGPD (Brasil). A plataforma deve:
- Processar dados localmente (sem transmissão em nuvem de dados de pacientes)
- Utilizar identificadores anonimizados para o banco de dados de calibração
- Fornecer trilhas de auditoria para decisões clínicas

### 14.5.3 Via Regulatória

Como uma ferramenta de suporte à decisão clínica, a plataforma AVBC provavelmente exigiria:
- **Marcação CE (UE):** Dispositivo médico de Classe IIa sob o MDR 2017/745
- **Liberação do FDA (EUA):** Via de aprovação 510(k), predicado: softwares de planejamento de ICRS existentes (ex: Keraring Planning System)
- **Registro na ANVISA (Brasil):** Dispositivo médico de Classe II

A via regulatória é complexa, mas viável, particularmente se a plataforma for posicionada como uma ferramenta de suporte à decisão (saída = recomendação, não prescrição) em vez de um sistema de planejamento autônomo.

---

## 14.6 Comparação com Ferramentas de Planejamento Existentes

| Recurso | Calculadora Keraring | Ferrara Nomogram App | **Plataforma AVBC** |
|---------|----------------------|----------------------|--------------------|
| Entrada | Classificação topográfica | K-steep, valor Q | Trimodal completa (O+T+B) |
| Mecanismo | Correspondência empírica de padrões | Consulta empírica | Mecanicista (VR/VT/Vτ) |
| Parâmetros do anel | Recomendação de configuração | Espessura + arco | Todos os 5 parâmetros |
| Integração com ENM | Não | Não | **Sim** |
| Anéis assimétricos | Não | Não | **Sim (Vτ)** |
| Feedback pós-op | Não | Não | **Sim (AVBC-CI)** |
| Calibração do cirurgião | Não | Não | **Sim** |
| Justificativa biomecânica | Não | Não | **Sim** |

---

## 14.7 Resumo

- A plataforma AVBC traduz o arcabouço teórico em uma **ferramenta de suporte à decisão clínica** acessível ao cirurgião na prática.
- O sistema utiliza **dados clínicos padronizados** (tomografia, aberrometria, refração) como entrada e fornece **recomendações de anéis classificadas** com os desfechos biomecânicos esperados.
- Uma **tabela de consulta de FEM pré-computada** permite previsões rápidas sem simulação em tempo real.
- O **simulador de anel interativo** permite que os cirurgiões explorem o espaço de parâmetros e compreendam a justificativa biomecânica para cada recomendação.
- O **módulo de feedback pós-operatório** constrói uma curva de calibração específica do cirurgião que melhora a acurácia ao longo do tempo.
- A **modelagem de FEM personalizada para o paciente** e a **calibração por aprendizado de máquina** são extensões planejadas que aumentarão a acurácia preditiva.

---

## Referências

1. Alpins NA. ASSORT (Alpins Statistical System for Ophthalmic Refractive surgery Techniques). User Manual, Version 7.0, 2015.
2. Barrett GD. An improved universal theoretical formula for intraocular lens power prediction. *J Cataract Refract Surg*. 2015;41(3):589–599.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
5. Kling S, Marcos S. FEM of ICRS in a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
6. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. *J Biomech Eng*. 2012;134(1):011005.
7. Piñero DP. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
8. Simonini I, Pandolfi A. Customized finite element modelling of the human cornea. *PLoS One*. 2015;10(6):e0130426.
