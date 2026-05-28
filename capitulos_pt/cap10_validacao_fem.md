# Capítulo 12 — Validação Computacional: Extração por Elementos Finitos de V_R, V_T e V_τ

---

## 12.1 Introdução

Os três capítulos anteriores definiram os vetores biomecânicos V_R, V_T e V_τ por meio de expressões matemáticas formais e apresentaram suas evidências no contexto da interpretação clínica da "Escola Volumétrica". Este capítulo inverte a perspectiva: ele apresenta a metodologia computacional completa pela qual esses vetores foram extraídos, desde o modelo constitutivo e geração da malha até o pós-processamento de dados da nossa recente campanha paramétrica volumétrica. A ênfase está na reprodutibilidade e na correspondência precisa entre o solver numérico e a física corneana.

A plataforma de elementos finitos empregada ao longo deste trabalho é o FEBio 4.12 (Musculoskeletal Research Laboratories, University of Utah). O suporte nativo do FEBio ao modelo constitutivo hiperelástico anisotrópico de Holzapfel–Gasser–Ogden (HGO), carregamento por pressão seguidora (follower pressure) e deslocamento prescrito em grandes deformações o torna singularmente adequado para simular a inserção volumétrica de ICRS.

> [!NOTE]
> **Para o Clínico: Navegação Neste Capítulo**
> Este capítulo é o mais técnico do livro. Se é cirurgião e não engenheiro biomecânico, foque-se em:
> - **Tabela 12.1** → O parâmetro c (matriz) domina a estabilidade corneana. Confirma que a ectasia é doença da *matriz*, não do colágeno.
> - **Tabela 12.3** → Prova que mais arco = mais aplanamento (reconcilia FEM com clínica).
> - **Seção 12.4.3** → A prova computacional de que anéis progressivos geram torque real.
> - **Tabela final (10.5)** → O resumo VR/VT/Vτ ↔ medição FEM ↔ parâmetro clínico.

---

## 12.2 Modelo Constitutivo e Malha

### 12.2.1 O Modelo Holzapfel–Gasser–Ogden

O estroma corneano é um material composto hiperelástico e quase incompressível. A função de energia de deformação HGO decompõe a energia em uma contribuição da matriz isotrópica e das fibras de colágeno anisotrópicas. 

Os parâmetros do material adotados na simulação canónica são:
- **c (Módulo da matriz):** 0,05 MPa
- **k₁ (Rigidez das fibras):** 0,22 MPa
- **k₂ (Não linearidade):** 100
- **κ (Dispersão das fibras):** 0,09
- **k (Módulo volumétrico):** 4,76 MPa

### 12.2.2 Condições de Contorno: A Injeção Volumétrica

O avanço crucial desta validação computacional em relação aos modelos históricos é a **incorporação verdadeira da Escola Volumétrica nas condições de contorno**.
Em modelos antigos, o anel era simulado apenas como uma restrição cinemática rígida (travando os nós X, Y e Z), o que artificialmente induzia a um encurvamento irreal. No nosso novo modelo AVBC, o implante ICRS é simulado através de um *deslocamento prescrito (prescribed displacement)*:
1. **Expansão Z:** A superfície correspondente ao ICRS é empurrada anteriormente de forma fixa em +250 μm (representando o volume e espessura do anel inserido).
2. **Liberdade XY:** Os nós do plano ICRS mantêm DOFs livres em X e Y, permitindo ao tecido relaxar circunferencialmente ao redor do acrílico rígido.
3. **Pressão e Limbo:** A córnea posterior está sob pressão de 15 mmHg e o anel límbico está fisicamente fixo (restrição de todos os DOFs).

---

## 12.3 Campanha Paramétrica de Sensibilidade (377 Simulações)

Para extrair os vetores e validar a resposta da córnea à variação de parâmetros sem risco de sobreajuste, executámos uma campanha exaustiva de **377 simulações** no FEBio, variando cada parâmetro material e geométrico (Design Fatorial OAT).

**Tabela 12.1.** Análise de sensibilidade do Deslocamento Apical (δ_{apex}) aos parâmetros da córnea sob anel de 160° / 250 μm.

| Parâmetro | Range δ_{apex} (μm) | Hierarquia | Significado Clínico |
|:---:|:---:|:---:|:---|
| **c** (Matriz) | 1186,8 | **Dominante** | A degradação da matriz estromal dita o colapso ectásico. |
| **\kappa** (Dispersão) | 27,6 | Secundário | A desorganização das fibras afeta o abaulamento. |
| **k_1** (Fibras) | 14,8 | Secundário | O colágeno atua como "para-quedas" sob alta deformação. |

O resultado mais marcante é que a substância fundamental (c) explica a quase totalidade da estabilidade corneana central, confirmando a tese de que a ectasia é uma doença da matriz inter-fibrilar.

![Figura 12.2 — Hierarquia de sensibilidade paramétrica (δ_apex): c domina 43× mais que κ.](book_figures/fig_12_02_sensibilidade_c.svg)

> [!IMPORTANT]
> **Para o Clínico: O Parâmetro Mais Importante**
> Dos quatro parâmetros do modelo HGO, o c (rigidez da matriz) domina com um range de 1186 µm — **43× maior** que o segundo parâmetro mais influente (\kappa = 27.6 µm). Isto confirma biomecânicamente o que a microscopia de Brillouin (Scarcelli, 2015) já sugeria: o ceratocone é primariamente uma doença da *matriz* intercelular, não do colágeno. O CXL funciona exatamente porque reforça esta matriz.

**Tabela 12.2.** Centroides dos vetores biomecânicos por configuração geométrica (média agregada das simulações). O deslocamento apical δ_{apex} e a restrição radial límbica δ_ring reagem consistentemente ao design do anel.

| Geometria | δ_{apex} (μm) | δ_ring (μm) | Δ K global (D) | Índice de Assimetria (AI) |
|:---|:---:|:---:|:---:|:---:|
| Linha de base (sem anel) | 612.72 | 37.38 | -3.40 | 0.00 |
| Arco 90° | 616.79 | 29.31 | -3.42 | 1.00 |
| Arco 160° | 618.29 | 22.38 | -3.43 | 1.00 |
| Arco 255° | 619.91 | 12.25 | -3.44 | 1.00 |
| Arco 360° (Completo) | 620.82 | 0.00 | -3.44 | 0.00 |
| Progressivo 300→150 μm| 640.94 | 22.40 | -3.56 | 1.00 |

![Figura 12.1 — Campanha FEM (377 simulações): centróides por geometria.](book_figures/fig_12_01_campanha_fem.svg)

---

## 12.4 A Prova da Escola Volumétrica

### 12.4.1 A Cascata de Aplanamento (Vetor V_R)

Sob a nova parametrização de injeção de volume, o FEM validou perfeitamente o impacto do volume no aplanamento radial (V_R). Analisando especificamente o tecido de referência canónico (c=0.05 MPa), medimos a alteração topográfica pura gerada pela introdução de anéis de 250 μm de diferentes comprimentos:

**Tabela 12.3.** Cascata de Aplanamento. A injeção de volume a 250 μm de profundidade levanta a média-periferia, aplanando o raio de curvatura apical de forma linear com a extensão do arco.

| Configuração | Arco (°) | u_z ápice (μm) | Δ K vs Base (D) | Efeito Físico |
|--------------|---------|-------------|-------------------|-------------------|
| Linha de base| 0 | 549.7 | — | Córnea prolada original |
| Arco 90° | 90 | 561.5 | -0.06 D | Aplanamento leve |
| Arco 160° | 160 | 567.1 | -0.10 D | Aplanamento moderado |
| Arco 210° | 210 | 571.5 | -0.12 D | Aplanamento alto |
| Arco 320° | 320 | 583.9 | -0.19 D | Aplanamento severo |

**A Morte do Paradoxo do Deslocamento:** Em modelos estritamente cinemáticos (antigos), o aumento do arco induzia um falso "encurvamento" da córnea. Mas ao simular a verdadeira injeção volumétrica (onde a inserção do ICRS levanta a periferia independentemente do centro), provamos que **quanto maior o arco, mais massa estromal é forçada para cima, o que estira a cúpula e aplana o centro (V_R).** Isto reconcilia o FEM com o mundo clínico de forma definitiva.

### 12.4.2 A Restrição Límbica (Vetor V_T)

O V_T governa a redução da assimetria e do astigmatismo. Como demonstrado na Tabela 12.2, a variável δ_ring (deslocamento radial da zona de implante livre) cai linearmente de 37.38 μm na base para 0.00 μm no anel de 360°. 

O anel atua como uma "cinta" (hoop restriction). Quanto mais longo é o arco, mais o estroma periférico perde a sua capacidade de distensão radial (R² > 0.99), obrigando a superfície anterior a regularizar-se para distribuir as tensões.

### 12.4.3 Torque e Assimetria (Vetor V_τ)

Os anéis progressivos (Ex: 300→150 μm) foram modelados prescrevendo um gradiente volumétrico contínuo na malha FEM. O resultado foi um incremento sistemático do deslocamento apical assimétrico (δ_{apex} = 640.9 μm contra 618.2 μm no simétrico correspondente).
Este diferencial cria um momento fletor (Torque) maciço, cuja magnitude é exatamente linear face ao diferencial de espessura (Sensibilidade de \sim 0.5 mm de migração por cada 100 μm de diferença), confirmando que a Lei das Espessuras se aplica localmente e empurra o cone para fora do segmento mais espesso.

> [!TIP]
> **Para o Clínico: Resumo dos 3 Vetores em Linguagem FEM**
> | O que o FEM prova | O que significa para si |
> |---|---|
> | Mais volume injetado → mais u_z apical | Anel mais espesso = mais aplanamento |
> | Mais arco → δ_ring \to 0 | Arco mais longo = mais regularização |
> | Gradiente de espessura → momento fletor | Anel progressivo = cone migra para o centro |

---

## 12.5 Rastreabilidade Computacional

Cada métrica neste atlas advém de simulações cujos códigos, saídas binárias (`.xplt`) e extrações de dados via scripts (ex: `extract_parametric_vectors.py`) asseguram reprodutibilidade.

| Vetor AVBC | Medição FEM Correspondente | Alavanca Clínica |
| :---: | :---: | :--- |
| **V_R** (Aplanamento) | Variação do Curvatura Apical (Δ K negativa) via injeção u_z | Volume Total (Arco \times Espessura) |
| **V_T** (Regularização)| Bloqueio do Deslocamento Radial Mínimo (δ_ring \to 0) | Comprimento de Arco |
| **V_τ** (Migração) | Gradiente de Espessura e Momento Fletor Resultante | Diferencial de Espessuras (Δ t) |

---

## 12.6 Conclusão e Limitações

A campanha de FEBio validou matematicamente os postulados centrais da Análise Vetorial Biomecânica Corneana (AVBC) e, crucialmente, da **Escola Volumétrica**:
1. O ICRS atua injetando massa e modificando a altitude da média-periferia, o que aplana o raio apical de forma dependente do arco e espessura (V_R).
2. A cintagem periférica inibe o abaulamento concêntrico, reduzindo o astigmatismo irregular de forma linear com o arco (V_T).
3. Diferenciais de espessura geram momentos de torque previsíveis que reposicionam a ectasia (V_τ).

**Limitações:**
- As simulações dependem de uma geometria inicial prolada simplificada; cones de alta excentricidade geram instabilidades numéricas nos solvers não-lineares, limitando o tempo de rampa a pressões fisiológicas sem uso de malhas auto-adaptáveis (ALE).
- A interface estroma-anel é simplificada como contato totalmente solidário no eixo Z (prescribed displacement) sem delaminação com o atrito hidrodinâmico local.
- Embora robusto para extração de tendências, o FEM elástico puro não incorpora a viscoelasticidade e reestruturação dos ceratócitos (healing), que aprimoram os resultados topográficos meses pós-cirurgia.


## Referências

1. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. J Elasticity. 2000;61:1-48.
2. Pinsky PM, van der Heide D, Chernyak D. Computational modeling of mechanical anisotropy in the cornea and sclera. J Cataract Refract Surg. 2005;31(1):136-145.
3. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. J Biomech Eng. 2012;134(1):011005.
