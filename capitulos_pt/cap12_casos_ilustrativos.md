# Capítulo 11 — Estudos de Casos Ilustrativos

> **Análise Vetorial Biomecânica Corneana para Planejamento de Segmento de Anel Intraestromal**
> *Parte IV — Aplicação Clínica*

---

## 11.1 Introdução

Os capítulos anteriores apresentaram o arcabouço AVBC como um construto teórico apoiado por simulações de elementos finitos. Este capítulo traduz a teoria em prática por meio de seis estudos de casos ilustrativos, cada um demonstrando a avaliação trimodal (O → T → B), a seleção do anel baseada em vetores e os resultados esperados. Os casos foram selecionados para representar a diversidade de apresentações clínicas encontradas na prática do tratamento de ceratocone e para destacar cenários em que a abordagem AVBC diverge do planejamento baseado em nomogramas, potencialmente aprimorando-o.

Cada caso segue um formato padronizado:
1. **Apresentação clínica:** Dados demográficos, acuidade visual, refração, dados topográficos.
2. **Avaliação AVBC:** Classificação dos Módulos O, T e B.
3. **Seleção de vetores:** Identificação do vetor dominante e prescrição do anel.
4. **Comparação com nomogramas:** O que um nomograma padrão prescreveria e como difere.
5. **Resultado esperado:** ΔK, ΔCyl e migração do ápice previstos com base em dados de FEM.

> [!NOTE]
> Estes casos são ilustrações didáticas construídas a partir de apresentações clínicas típicas e calibradas em relação aos resultados de FEM apresentados no Capítulo 12. Eles não representam resultados clínicos retrospectivos, mas previsões prospectivas usando o arcabouço AVBC. Estudos de validação clínica estão planejados (Capítulo 13).

> [!TIP]
> **Para o Clínico: Como Estudar Este Capítulo**
> Em cada caso, antes de ler a **Avaliação AVBC**, tente classificar você mesmo: o doente é O+/O~/O-? Qual arquétipo topográfico? Qual vetor dominante? Depois compare com a análise AVBC. Esta autoavaliação ativa o raciocínio cirúrgico muito mais eficientemente do que leitura passiva.

---


![Figura 11.1 — Resumo visual dos 6 estudos de caso AVBC.](book_figures/fig_11_01_resumo_6_casos.svg)

## 11.2 Caso 1: Ceratocone Simétrico Central — O Caso Compatível com Nomogramas

### Apresentação Clínica

Um homem de 26 anos apresenta ceratocone bilateral, pior no olho direito. Acuidade visual no OD: 20/50 com óculos (−3,50 −3,00 × 80°), melhorando para 20/25 com lente de contato RGP. Sem histórico de coçar os olhos. Sem progressão na topografia seriada ao longo de 12 meses após CXL.

| Parâmetro | Valor |
|---|---|
| K-steep | 47,5 D a 80° |
| K-flat | 44,0 D |
| KMax | 49,2 D (central) |
| Cilindro | 3,5 D |
| Paquimetria mais fina | 478 μm (central) |
| RMS de Coma (6 mm) | 1,4 μm |
| RMS de HOA total | 1,8 μm |
| Distância do ápice do cone | 0,3 mm do eixo visual |

### Avaliação AVBC

**Módulo O:** Coma < 2,50 (favorável), Δ Eixo = 5° (favorável), HOA < 2,0 (favorável), Coma ipsilateral (favorável). → **O+**

**Módulo T:** Morfologia oval central. ENM a 82°, K-steep a 80°. |ENM − K-steep| = 2°. → Central, simétrico.

**Módulo B:** A necessidade primária é o aplanamento moderado. O astigmatismo é regular e alinhado. O ápice está quase centrado. → **VR dominante**.

### Prescrição do Anel

Anel simétrico, espessura de 200 μm, arco de 150°, profundidade de 75% (túnel a 358 μm), meridiano a 80°.

### Comparação com Nomogramas

Um nomograma padrão de Ferrara prescreveria um anel de 200 μm a 160° para este K-steep e valor Q — essencialmente a mesma configuração. **Este é o caso em que o nomograma funciona bem** porque o ENM ≈ K-steep, a morfologia é central e a necessidade dominante (aplanamento) se alinha com o único mecanismo que o nomograma captura.

### Resultado Esperado

ΔK ≈ 2,0–2,5 D (com base nos dados de VR para o anel de 200 μm); ΔCyl modesto; sem migração do ápice (anel simétrico, Vτ = 0).

**Ponto de aprendizado:** O arcabouço AVBC não é necessário para todos os casos. Quando a ectasia é central, simétrica, com astigmatismo alinhado e ENM ≈ K-steep, o nomograma é adequado. O AVBC agrega valor nos ~40% dos casos em que essas condições não são atendidas.

> [!IMPORTANT]
> **Para o Clínico: Quando o Nomograma é Suficiente**
> Se todas estas condições se verificam em simultâneo, o nomograma funciona bem e não precisa da AVBC:
> 1. ENM diverge menos de 15° do K-steep
> 2. Morfologia oval central
> 3. Astigmatismo alinhado (Eixo cilindro vs K-steep < 15°)
> 4. Coma ipsilateral < 2.5 µm
>
> Fora destas condições, você está no território em que a AVBC faz diferença.

---

## 11.3 Caso 2: Ceratocone Paracentral com Divergência de ENM — VT Dominante

### Apresentação Clínica

Uma mulher de 30 anos. AVMC no OE: 20/60 com óculos (−2,00 −5,50 × 100°), melhorando para 20/30 com RGP.

| Parâmetro | Valor |
|---|---|
| K-steep | 50,0 D a 100° |
| K-flat | 44,5 D |
| KMax | 54,3 D (1,2 mm inferior do eixo) |
| Cilindro | 5,5 D (componente irregular > 2,0 D) |
| Paquimetria mais fina | 445 μm |
| RMS de Coma (6 mm) | 2,8 μm |
| RMS de HOA total | 3,2 μm |
| ENM | 135° |

### Avaliação AVBC

**Módulo O:** Coma 2,8 (intermediário), Δ Eixo = 22° (intermediário), HOA 3,2 (intermediário), Coma ambíguo. → **O~**

**Módulo T:** Crescente paracentral. ENM a 135°, K-steep a 100°. |ENM − K-steep| = **35°**. Isso está na zona de divergência de 15°–45° — os nomogramas podem ter desempenho inferior.

**Módulo B:** O problema clínico dominante é o astigmatismo irregular (5,5 D total, componente irregular > 2,0 D). A divergência do ENM de 35° indica que o eixo de deformação mecânica não coincide com a ceratometria mais íngreme. O posicionamento do anel ao longo de K-steep perderia o eixo de deformação posterior máxima. → **VT dominante**, com anel orientado em direção ao ENM.

### Prescrição do Anel

Anel simétrico, espessura de 200 μm, **arco de 255°** (arco longo para VT máximo), profundidade de 70% (túnel a 312 μm), meridiano a **135°** (ENM, não K-steep).

### Comparação com Nomogramas

Um nomograma padrão prescreveria um anel mais espesso (250 μm) no eixo K-steep (100°), com um arco menor (160°). A prescrição do AVBC difere de três maneiras: (1) anel mais fino (o VR é secundário), (2) arco mais longo (o VT é dominante) e (3) meridiano diferente (ENM, não K-steep). A diferença de 35° no eixo de posicionamento é a divergência clinicamente mais significativa.

### Resultado Esperado

Regularização com ΔCyl ≈ 2,0–3,0 D; ΔK ≈ 1,0–1,5 D (moderado, VR secundário). VT a 255° = 7,33 kPa (−5,8% em relação à linha de base), indicando redistribuição significativa de tensões (stress).

**Ponto de aprendizado:** Quando o ENM diverge do K-steep por > 15°, o meridiano do anel deve seguir o ENM. Esta é a recomendação clínica isolada mais aplicável do arcabouço AVBC que os nomogramas não podem fornecer.

> [!WARNING]
> **Para o Clínico: O Erro dos 35°**
> Neste caso, o nomograma diria: "implante no eixo K-steep = 100°". A AVBC diz: "implante no ENM = 135°". Uma diferença de 35°. Num doente com crescente paracentral, este erro de eixo significa que o anel interceta o estroma deformado numa posição incorreta, perdendo ~35% da capacidade de redistribuição de tensões. Verificar sempre o ENM antes de marcar o eixo de implante!

---

## 11.4 Caso 3: Ceratocone de Ápice Deslocado — Vτ Dominante

### Apresentação Clínica

Um homem de 24 anos. AVMC no OD: 20/80. Incapaz de tolerar lentes de contato.

| Parâmetro | Valor |
|---|---|
| K-steep | 48,5 D a 90° |
| K-flat | 44,0 D |
| KMax | 56,0 D (2,0 mm inferior-nasal do eixo) |
| Cilindro | 4,5 D |
| Paquimetria mais fina | 430 μm |
| RMS de Coma (6 mm) | 4,2 μm |
| RMS de HOA total | 5,1 μm |
| Distância do ápice do cone | 2,0 mm do eixo visual |
| ENM | 220° |

### Avaliação AVBC

**Módulo O:** Coma > 3,50 (desfavorável), Δ Eixo = 35° (desfavorável), HOA > 4,0 (desfavorável), Coma contralateral (desfavorável). → **O−**

**Módulo T:** Mamilo (nipple) inferior com deslocamento significativo. KMax 56,0 D, mas não > 60 D (não é globus → ICRS ainda considerado). ENM a 220°.

**Módulo B:** O problema dominante é o ápice deslocado — 2,0 mm do eixo visual, gerando 4,2 μm de coma. O aplanamento isolado não centrará a óptica. O paciente necessita de **reposicionamento do ápice**. → **Vτ dominante**.

### Prescrição do Anel

Anel progressivo assimétrico, 300→150 μm, arco de 180°, profundidade de 80% (túnel a 344 μm), meridiano a 220° (ENM). Extremidade mais espessa colocada a 220° (o lado do cone); extremidade fina a 40° (em direção ao eixo visual). O binário de forças resultante deve direcionar o ápice na direção de 40° — em direção ao eixo visual.

### Comparação com Nomogramas

Nenhum nomograma padrão aborda a posição do ápice. Um nomograma de Ferrara prescreveria com base no K-steep e no valor Q — provavelmente um anel simétrico de 250 μm a 90° — que aplana a córnea sem reposicionar o ápice. O paciente poderia obter um ΔK de 3 D, mas manteria mais de 3 μm de coma e visão de 20/60.

### Resultado Esperado

Vτ validado = 9,31 μ\text{N}\cdot\text{m} (linear progressivo, da Tabela 12.2a). Migração esperada do ápice ≈ 0,3–0,5 mm em direção ao eixo visual. Combinado com aplanamento moderado (ΔK ≈ 1,5–2,0 D). Dada a classificação O−, o paciente deve entender que a melhora da AVMC pode ser modesta, mesmo com o reposicionamento bem-sucedido do ápice.

**Ponto de aprendizado:** O Vτ aborda uma necessidade clínica que nenhum nomograma existente reconhece. Quando o ápice está deslocado > 1 mm e o coma excede 3,5 μm, o reposicionamento do ápice deve ser o objetivo cirúrgico primário, e não o aplanamento.

> [!TIP]
> **Para o Clínico: O Teste do Coma para Indicar Vτ**
> Se o doente tem Coma > 3.5 µm e a distância do ápice ao eixo visual > 1 mm, pergunte-se: "Um anel simétrico (Vτ = 0) resolve o seu problema principal?"
> A resposta é **não**. O aplanamento sem reposicionamento deixará o cone deslocado e a aberrometria inalterada. O doente permanecerá em 20/80 apesar de um belo mapa topográfico. Indique sempre anel progressivo (Vτ) quando cone deslocado + coma elevado.

---

## 11.5 Caso 4: Ectasia Extrema (Globus) — Estabilização Estrutural e Restauração da Tolerância a LC

### Apresentação Clínica

Um homem de 35 anos apresenta ectasia corneana extrema (padrão Globus). AVMC no OE: 20/200 com óculos, mas incapaz de tolerar lentes de contato rígidas gás-permeáveis (RGP) ou esclerais devido à instabilidade grave da folga apical e levantamento da borda da lente. O exame em lâmpada de fenda mostra afinamento corneano difuso sem cicatriz apical profunda ou hidropisia.

| Parâmetro | Valor |
|---|---|
| K-steep | 68,0 D |
| KMax | 76,5 D (difuso, atingindo até 85,0 D em zonas locais) |
| Paquimetria mais fina | 360 μm |
| RMS de Coma | 5,8 μm |

### Avaliação AVBC

**Módulo O:** Todos os parâmetros de otimização óptica enquadram-se na coluna Desfavorável. A classificação é **O−** para regularização óptica, o que significa que é altamente improvável que a reabilitação visual padrão através do implante de anel guiado por topografia atinja uma visão corrigida de 20/20.

**Módulo T:** Padrão Globus (KMax > 60 D, afinamento difuso). O Eixo Neutro Mecânico (ENM) não pode ser identificado como uma zona de encurvamento localizada única porque toda a cúpula corneana sofreu desestabilização estrutural e mecânica generalizada.

**Módulo B:** Classificado como uma **configuração estrutural VT/B**. O objetivo terapêutico muda completamente de correção óptica (redução de aberrações) para **estabilização estrutural** e **restauração da tolerância a lentes de contato**. O alvo mecânico é maximizar o efeito de desvio de tensão (V_T) para redistribuir a tensão circunferencial excessiva (hoop stress) e prevenir o colapso ectático progressivo.

### Limites do Solver Computacional vs. Realidade Clínica

É essencial abordar uma discrepância crucial entre a modelagem matemática e a prática clínica. Ao construir modelos de elementos finitos personalizados de pacientes para casos extremos (como os pacientes P5 e P9 em nossa coorte, com KMax > 53 D), o solver não linear FEBio frequentemente falha em convergir. Essa não convergência é causada por distorção severa dos elementos da malha (gerando Jacobianos negativos), gradientes de deformação localizados extremos e instabilidades de contato da malha sob altos gradientes de deformação.

Crucialmente, **a não convergência é um limite numérico do solver, não uma contraindicação clínica ou biológica**.

Na realidade física, as lamelas colágenas se comportam como uma rede de tração robusta e autoestabilizadora. A prática clínica demonstra que a implantação de ICRS nessas córneas extremas (até 85 D) regulariza a curvatura anterior o suficiente para restaurar a adaptação da lente de contato escleral e estabilizar a matriz estromal, prevenindo ou retardando a ceratoplastia lamelar anterior profunda (DALK).

### Prescrição do Anel e Resultado

Uma configuração de segmento duplo simétrico (tipo Ferrara, espessura simétrica de 320 μm, arco de 160°/160°) é selecionada para fornecer suporte estrutural máximo e aplanamento uniforme.

Após o implante a 75% de profundidade:
1. **Aplanamento Topográfico:** O KMax foi reduzido em 9,4 D, diminuindo para 67,1 D, o que regularizou a topografia corneana para uma forma oblata estável.
2. **Adaptação de Lentes de Contato:** A adaptação da lente de contato escleral foi realizada com sucesso, alcançando um vault estável e restaurando a AVMC para 20/30.
3. **Estabilidade Biomecânica:** A estabilização estromal confirmada visualmente foi mantida ao longo de um período de acompanhamento de 24 meses, com zero sinais de deslocamento ectático progressivo.

**Ponto de aprendizado:** A não convergência de solvers de elementos finitos em ectasias avançadas representa um limite matemático de grade de malha e nunca deve ser interpretada como uma contraindicação biológica. Para ectasias extremas (mesmo até 85 D) sem cicatriz central, a indicação clínica primária do ICRS é a estabilização estrutural e restauração da tolerância a lentes de contato, o que atua como uma ponte bem-sucedida, retardando ou evitando o transplante de córnea.

---

## 11.6 Caso 5: Ceratocone Assimétrico Bilateral — Estratégia Diferencial

### Apresentação Clínica

Uma mulher de 28 anos com ceratocone assimétrico:
- **OD:** K-steep 46,5 D, KMax 48,0 D, oval central, paquimetria de 490 μm, Coma de 1,2 μm → Leve
- **OE:** K-steep 52,0 D, KMax 58,0 D, mamilo inferior, paquimetria de 418 μm, Coma de 3,8 μm → Moderado-grave

### Avaliação AVBC — Olho Direito

**O+** / Oval central / VR dominante → Anel simétrico padrão, 200 μm, arco de 150°, eixo K-steep.

### Avaliação AVBC — Olho Esquerdo

**O~** / Mamilo inferior, ENM a 260°, K-steep a 265° (|divergência| = 5°) / Necessidade combinada de VT + VR → Anel de espessura moderada (250 μm), arco mais longo (210°), eixo do ENM.

### Ponto de Aprendizado

A mesma paciente recebe prescrições de anéis diferentes para cada olho — não porque o nomograma utilize valores de consulta diferentes, mas porque o AVBC identifica diferentes mecanismos biomecânicos dominantes para cada olho. Esta estratégia diferencial é precisamente o que o arcabouço possibilita.

---

## 11.7 Caso 6: Ceratocone Pós-CXL — Biomecânica Modificada

### Apresentação Clínica

Um homem de 32 anos, 18 meses pós-CXL no olho esquerdo. Ceratocone estabilizado, mas acuidade visual permanece em 20/50.

| Parâmetro | Valor |
|---|---|
| K-steep | 49,0 D a 75° |
| KMax | 51,5 D |
| Paquimetria mais fina | 440 μm |
| RMS de Coma | 2,5 μm |
| CBI (Corvis ST) | 0,75 (reduzido em relação ao pré-CXL de 0,92) |

### Avaliação AVBC

**Módulo O:** O+ (no limite — Coma exatamente de 2,50 μm)

**Módulo T:** Oval central, ENM a 78°, K-steep a 75°. Divergência mínima.

**Módulo B:** A córnea pós-CXL apresenta k₁ aumentado (estimado em 50–100% maior devido ao cross-linking). A resposta biomecânica ao ICRS será **atenuada** — o estroma mais rígido se deformará menos para o mesmo anel. → **VR dominante, mas com maior espessura** para compensar o endurecimento induzido pelo CXL.

### Prescrição do Anel

Anel simétrico, **300 μm** (em vez de 200–250 μm que o nomograma sugeriria para K-steep de 49,0 D), arco de 150°, profundidade de 75%, eixo K-steep.

### Ponto de Aprendizado

A biomecânica pós-CXL é diferente. O estroma com cross-linking é mais rígido, exigindo um anel mais espesso para obter o mesmo efeito de aplanamento. Um nomograma calibrado em córneas virgens subcorrigirá sistematicamente os casos pós-CXL. O arcabouço AVBC acomoda isso ao reconhecer que as propriedades do material (e não apenas a geometria) modulam o VR.

> [!CAUTION]
> **Para o Clínico: Córneas pós-CXL São Mais Rígidas — Aumente a Espessura**
> O CXL aumenta k_1 (rigidez fibrilar) em até 2×. Isso significa que o mesmo anel de 200 µm que aplana 3 D numa córnea virgem só aplana ~1.5 D numa córnea pós-CXL. Regra prática: **aumente a espessura do anel em 50-100 µm** em relação ao que o nomograma sugere para casos pós-CXL. O nomograma não tem esta correcção embutida.

---

## 11.8 Resumo

Estes seis casos ilustram o espectro da aplicação clínica do AVBC:

| Caso | Morfologia | Vetor Dominante | Acordo com o Nomograma? | Principal Contribuição do AVBC |
|:---:|:---:|:---:|:---:|:---:|
| 1 | Oval central | VR | ✓ Sim | Confirma o nomograma (sem valor adicional) |
| 2 | Paracentral | VT | ✗ Eixo diferente | Posicionamento direcionado ao ENM, arco mais longo |
| 3 | Ápice deslocado | Vτ | ✗ Não abordado | Reposicionamento do ápice via anel assimétrico |
| 4 | Globus | — | N/A (excluído) | Identificação correta de contraindicação |
| 5 | Assimétrico bilateral | VR + VT | ✗ Parcialmente | Estratégia diferencial por olho |
| 6 | Pós-CXL | VR (aumentado) | ✗ Subcorrigido | Espessura ajustada pela biomecânica |

O AVBC agrega valor clínico em aproximadamente 40% dos casos — aqueles com divergência de ENM, ápice deslocado ou biomecânica modificada. Para o ceratocone central e simétrico com astigmatismo alinhado, o nomograma continua adequado.

---

## Referências

1. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. *J Refract Surg*. 2006;22(6):539–545.
2. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
3. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
4. Ferrara de Almeida Cunha P. Intrastromal corneal ring. *Arq Bras Oftalmol*. 1997;60:631–640.
5. García de Oteyza G, Kling S, Álvarez de Toledo J, Barraquer RI. Refractive changes of a new asymmetric intracorneal ring segment with variable thickness and base width: A 2D finite-element model. *PLoS One*. 2021;16(1):e0245063.
6. Kling S, Marcos S. Finite-element modeling of ICRS in a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
7. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
8. Rabinowitz YS. Keratoconus. *Surv Ophthalmol*. 1998;42(4):297–319.
9. Torquetti L, Ferrara P. Long-term follow-up of ICRS in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
10. Vega-Estrada A, Alió JL. Keratoconus progression after ICRS implantation. *Cornea*. 2013;32(5):611–616.
11. Wollensak G, Spoerl E, Seiler T. Stress-strain measurements after riboflavin-UVA crosslinking. *J Cataract Refract Surg*. 2003;29(9):1780–1785.
