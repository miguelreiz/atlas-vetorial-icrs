# Capítulo 2 — Como Funcionam os ICRS: Do Deslocamento de Volume à Decomposição Vetorial

> **Análise Vetorial Biomecânica Corneana para Planejamento de Segmento de Anel Intraestromal**
> *Parte I — Fundamentos*

---

## 2.1 Introdução

Os segmentos de anel intraestromal têm sido implantados por mais de vinte e cinco anos, com uma estimativa de meio milhão de procedimentos realizados em todo o mundo desde o primeiro implante de Intacs em 1999 (Burris et al., 1998; Colin et al., 2000). Apesar dessa ampla experiência clínica, o mecanismo de ação do ICRS permanece assunto de debate contínuo. Como, precisamente, um pequeno arco de polimetilmetacrilato (PMMA) inserido no estroma corneano produz alterações na curvatura corneana, no astigmatismo e nas aberrações de alta ordem?

Três estruturas conceituais foram propostas: a **escola geométrica** (Barraquer, 1964), que atribui o efeito ao encurtamento do arco; a **escola volumétrica** (Kling & Marcos, 2013), que enfatiza o deslocamento de volume; e a **escola biomecânica** (Dupps & Roberts, 2014), que se concentra na redistribuição de tensão (stress). Cada abordagem captura parte da verdade, mas nenhuma fornece uma explicação completa dos efeitos clínicos observados.

Este capítulo revisa criticamente essas três perspectivas e as sintetiza em uma estrutura unificada — a **decomposição em três vetores** —, na qual o efeito do ICRS é resolvido em três mecanismos biomecânicos independentes: deslocamento radial (VR), redistribuição de tensão tangencial (VT) e torque assimétrico (Vτ). Esta decomposição, validada por 34 simulações de elementos finitos apresentadas no Capítulo 10, forma a base mecanicista para o framework de planejamento AVBC.

---

## 2.2 O Princípio Barraquer de Encurtamento de Arco

### O Conceito Original

A base intelectual para o ICRS remonta a José I. Barraquer, que propôs em 1964 que a inserção de material no estroma corneano poderia modificar sua curvatura através do **princípio do encurtamento de arco** (Barraquer, 1964). O conceito é geométrico: para um arco circular de comprimento de corda fixo, o encurtamento do arco aumenta o raio de curvatura. Por outro lado, o alongamento do arco (pela inserção de material) deveria encurvar a trajetória — mas se o material for colocado na córnea *periférica*, a redistribuição geométrica resultante aplana a córnea *central*.

Barraquer formulou sua lei da espessura: *"Se material for adicionado à periferia da córnea ou removido do centro, a córnea aplana. Se material for removido da periferia ou adicionado ao centro, a córnea encurva."* Esse princípio guiou o design de procedimentos aditivos (ICRS) e subtrativos (LASIK) e continua sendo a explicação mais amplamente citada para a ação do ICRS.

### Base Matemática

O fundamento matemático é direto. Considere um arco circular de raio R e comprimento de arco s, subtendendo um ângulo 2α no centro de curvatura. O comprimento da corda é L = 2R sen(α). Se o comprimento do arco for encurtado (s → s − Δs), então para um comprimento de corda L constante, o raio deve aumentar (R → R + ΔR), e a curvatura da superfície κ = 1/R diminui — a superfície aplana. Para a córnea, isso se traduz em uma redução no poder ceratométrico: ΔK ≈ −(n−1)/R² × ΔR, onde n = 1,3375.

### Limitações

O modelo de encurtamento de arco é atraente por sua simplicidade, mas incompleto em vários aspectos:

1. **Explica o aplanamento, mas não a regularização do astigmatismo.** Muitos pacientes apresentam redução significativa no cilindro e nas aberrações de alta ordem após o ICRS — efeitos que não podem ser explicados por uma simples mudança no comprimento do arco.

2. **Não explica o reposicionamento do ápice.** No ceratocone, o ápice do cone frequentemente está deslocado do eixo visual, e configurações assimétricas de ICRS podem migrar o ápice — um mecanismo que está fora do escopo do encurtamento do arco.

3. **O conceito de "limbo artificial" foi refutado.** Uma extensão do modelo de encurtamento do arco propôs que o ICRS cria um limbo funcional — uma barreira de endurecimento circunferencial que mimetiza o anel limbal natural. No entanto, as análises de FEM demonstraram que os ICRS de arco parcial não criam um endurecimento global; eles criam restrições locais com efeitos paradoxais no deslocamento apical (ver Seção 2.4).

---

## 2.3 Deslocamento de Volume e Redistribuição de Tensão

### O Estudo de FEM de Kling e Marcos

Uma explicação mecanicista mais rigorosa surgiu do trabalho de elementos finitos de Kling e Marcos (2013), que modelaram a implantação de ICRS em uma córnea hiperelástica e analisaram os campos de deslocamento e de tensão (stress) resultantes. Sua principal conclusão foi que o mecanismo dominante é o **deslocamento de volume** — o espaço físico ocupado pelo segmento de anel desloca o estroma circundante radialmente, alterando a curvatura local. A contribuição do encurtamento do arco estava presente, mas era secundária.

O mecanismo de deslocamento de volume opera da seguinte forma: o ICRS ocupa um volume finito dentro do estroma (tipicamente 0,5–1,5 mm³, dependendo das dimensões). Esse volume não pode ser comprimido no tecido circundante (o estroma é quase incompressível); em vez disso, o tecido deve acomodar o implante deslocando-se radialmente. O deslocamento é maior adjacente ao anel e atenua-se com a distância, produzindo uma alteração característica da curvatura — aplanamento central e encurvamento na posição do anel.

### Redistribuição de Tensão (Stress): A Perspectiva de Dupps

Dupps e Roberts (2014) enfatizaram um mecanismo complementar: a **redistribuição de tensão (stress)**. O ICRS, sendo muito mais rígido do que o estroma circundante (módulo do PMMA ~3 GPa vs. estroma ~0,2 MPa), atua como uma restrição rígida dentro de uma casca deformável sob pressão. Essa restrição força o campo de tensão (stress) impulsionado pela PIO a se redistribuir — a tensão (stress) que normalmente seria distribuída de forma relativamente uniforme ao longo da rede de colágeno agora se concentra no anel e próximo a ele.

A principal percepção dessa perspectiva é que o ICRS não "empurra" a córnea para uma nova forma; em vez disso, ele **reorganiza a distribuição de tensão (stress)**, e a nova forma é a configuração de equilíbrio da córnea sob o campo de tensão (stress) modificado. Essa distinção não é meramente semântica — ela tem implicações diretas para a compreensão do motivo pelo qual o efeito clínico depende dos parâmetros do anel, da biomecânica específica do paciente e da profundidade de implantação.

Nossos dados de FEM confirmam isso: uma córnea basal sob 15 mmHg de PIO mostra um deslocamento apical de **360,9 μm**. Com um ICRS circunferencial completo (360°), esse valor cai para **125,9 μm** — uma redução de 65%. O anel completo cria uma barreira circunferencial que resiste à expansão radial e altera profundamente o campo de tensão (stress). Isso não é encurtamento de arco; é redistribuição de tensão (stress) em escala global.

---

## 2.4 O Paradoxo do ICRS: Por que Arcos Parciais Não Aplanam

### A Descoberta Contraintuitiva

Talvez a descoberta mais reveladora de nossas simulações de FEM seja o que chamamos de **paradoxo do ICRS**: os segmentos de anel de arco parcial (90°–320°) na verdade **aumentam** o deslocamento apical em comparação com a linha de base não restrita, enquanto apenas o anel completo (360°) produz a redução esperada.

**Tabela 2.1.** Deslocamento apical (uz) como função do comprimento do arco do ICRS.

| Configuração | Arco (°) | uz ápice (μm) | Alteração vs. linha de base |
|--------------|---------|-------------|-------------------|
| Linha de base (sem ICRS) | — | 360.9 | — |
| ICRS 360° | 360 | 125.9 | **−65%** |
| Arco 90° | 90 | 369.7 | +2% |
| Arco 120° | 120 | 372.3 | +3% |
| Arco 160° | 160 | 375.1 | +4% |
| Arco 210° | 210 | 382.0 | +6% |
| Arco 255° | 255 | 385.0 | +7% |
| Arco 320° | 320 | 390.3 | +8% |

Este resultado parece contradizer a experiência clínica — os cirurgiões observam aplanamento após a implantação de ICRS, não encurvamento. Mas o paradoxo se resolve quando se reconhece a distinção entre **deslocamento** e **curvatura**.

### Explicação Física

O ICRS de arco parcial restringe o deslocamento em apenas um setor da circunferência corneana. No setor restrito, o estroma não pode se deformar radialmente. A PIO, contudo, continua a carregar toda a superfície endotelial uniformemente. A tensão (stress) que normalmente seria distribuída por toda a circunferência agora está concentrada nos setores *não restritos*, produzindo maior deslocamento nessas regiões — incluindo o ápice.

O resultado é análogo a apertar um balão parcialmente inflado em um ponto: a região comprimida permanece plana, mas a região não comprimida protrui mais. O deslocamento apical líquido aumenta porque a restrição parcial cria uma distribuição de tensão (stress) assimétrica que direciona mais deformação centralmente.

O anel completo (360°) se comporta de maneira diferente porque restringe toda a circunferência, criando uma barreira completa. Não há setor não restrito para absorver a tensão (stress) redistribuída. Em vez disso, o anel atua como um anel rígido, reduzindo efetivamente o vão não suportado da córnea do diâmetro total para o diâmetro interno do anel, diminuindo assim a curvatura efetiva e o deslocamento apical.

### Implicação Clínica

Essa descoberta tem uma implicação clínica profunda: **os ICRS de arco parcial não aplanam a córnea reduzindo o deslocamento apical. Eles modificam a córnea redistribuindo a tensão tangencial.** O ΔK clínico observado após a implantação de ICRS é um efeito de curvatura de superfície — uma alteração na *relação* entre a curvatura local e a esfera de melhor ajuste (best-fit sphere) de referência — e não uma simples redução de deslocamento.

É por isso que o VT (redistribuição de tensão tangencial) é o mecanismo primário para os ICRS de arco parcial, enquanto o VR (redução do deslocamento radial) é relevante apenas para o anel completo. Compreender essa distinção é essencial para o planejamento racional do ICRS.

---

## 2.5 A Decomposição em Três Vetores: VR, VT, Vτ

### A Necessidade de uma Decomposição

A análise precedente revela que o efeito do ICRS não é um fenômeno único, mas sim um compósito de múltiplos mecanismos, cada um com diferentes sensibilidades aos parâmetros do anel. Para tornar essa complexidade tratável para a tomada de decisões clínicas, propomos a decomposição do efeito do ICRS em três **vetores biomecânicos** independentes:

### VR — O Vetor Radial

**Definição:** VR é a componente radial do campo de deslocamento induzido pelo ICRS.

```
VR(r, θ) = Δuᵣ = [ux·cos(θ) + uy·sin(θ)]_final − [ux·cos(θ) + uy·sin(θ)]_initial
```

**Correlação clínica:** O VR controla o aplanamento corneano (ΔK). Um VR maior na zona central corresponde a um maior aplanamento.

**Parâmetro do anel:** O VR é modulado principalmente pela **espessura do anel** (mecanismo de deslocamento de volume). Nossos dados de FEM demonstram que o VR central é insensível ao comprimento do arco: ele permanece em 19,2–19,9 μm em todos os arcos parciais (90°–320°), variando menos de 4%. Apenas o anel completo (360°) reduz o VR para 8,89 μm. Esse desacoplamento — VR em relação ao comprimento do arco — é uma descoberta fundamental.

### VT — O Vetor Tangencial

**Definição:** VT é a alteração na tensão tangencial (hoop stress) induzida pelo ICRS.

```
VT(r, θ) = Δσ_θθ = [σ_θθ]_final − [σ_θθ]_initial
```

onde σ_θθ é obtido por transformação tensorial da tensão Cauchy cartesiana.

**Correlação clínica:** O VT controla a regularização do astigmatismo (ΔCyl). Uma distribuição de σ_θθ mais uniforme corresponde a um astigmatismo mais regular.

**Parâmetro do anel:** O VT é modulado principalmente pelo **comprimento do arco**. Nossos dados de FEM mostram uma diminuição de forma monotônica: o VT cai de 7,78 kPa (linha de base) para 7,20 kPa (arco de 320°), seguindo a relação empírica:

```
VT(arc°) = −0.0018 × arc° + 7.79    (R² = 0.94)
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

| Faixa de Paquimetria | Média \|Δuz\| (μm) | N |
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
2. Burris TE, Ayer CT, Evensen DA, et al. Effects of intrastromal corneal ring size and thickness on corneal flattening in human eyes. *Refract Corneal Surg*. 1991;7(1):46–50.
3. Colin J, Cochener B, Savary G, et al. Correcting keratoconus with intracorneal rings. *J Cataract Refract Surg*. 2000;26(8):1117–1122.
4. Dupps WJ Jr, Roberts CJ. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
5. García de Oteyza G, Álvarez de Toledo J, Barraquer RI, et al. Finite element analysis of the biomechanical effects of progressive thickness intracorneal ring segments. *J Cataract Refract Surg*. 2021;47(2):258–265.
6. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. *J Elasticity*. 2000;61:1–48.
7. Kling S, Marcos S. Finite-element modeling of intracorneal ring segment implantation into a hyperelastic cornea. *Invest Ophthalmol Vis Sci*. 2013;54(1):881–889.
8. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
9. Nguyen BA, Roberts CJ, Reilly MA. Biomechanical impact of the sclera on corneal deformation response to an air-puff. *Front Bioeng Biotechnol*. 2018;6:210.
10. Piñero DP, Alcón N. Corneal biomechanics: a review. *Clin Exp Optom*. 2015;98(2):107–116.
11. Torquetti L, Berbel RF, Ferrara P. Long-term follow-up of intrastromal corneal ring segments in keratoconus. *J Cataract Refract Surg*. 2009;35(10):1768–1773.
12. Vega-Estrada A, Alió JL, Plaza-Puche AB. Keratoconus progression after intrastromal corneal ring segment implantation. *Cornea*. 2013;32(5):611–616.
