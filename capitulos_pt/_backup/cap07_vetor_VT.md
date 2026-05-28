# Capítulo 6 — V_T: O Vetor Tangencial — Mecânica da Cintagem e Regularização

---

## 6.1 Introdução

Enquanto o vetor radial $V_R$ (Capítulo 6) governa a redução líquida do poder óptico esférico (aplanamento, $\Delta K$) através da introdução de volume, ele não aborda a assimetria espacial que caracteriza o ceratocone. Uma córnea ectática não é apenas excessivamente curva; ela é profundamente irregular, exibindo um cone focal ladeado por áreas aplanadas. Este gradiente espacial de curvatura é a origem do astigmatismo e do coma, as principais barreiras à visão funcional. Para regularizar esta superfície — distribuindo a curvatura de forma uniforme — o cirurgião aciona o segundo mecanismo mecânico: a contenção tensional.

O vetor biomecânico responsável por esta contenção é o $V_T$, o vetor tangencial. Sob o novo paradigma biomecânico, o $V_T$ é definido como o **Efeito de Cintagem (Hoop Restriction)**. Ao contrário do $V_R$, que é impulsionado pelo *volume* do implante, o $V_T$ é impulsionado exclusivamente pela **cobertura circunferencial** (comprimento de arco).

O acrílico rígido atua como uma tala inextensível ao longo do seu arco. Quanto mais comprido for o anel, maior a percentagem da circunferência estromal que fica "bloqueada" (impedida de se distender sob a ação da pressão intraocular). As simulações re-calibradas do nosso modelo revelam que o deslocamento radial ao longo do canal de implante ($\delta_{ring}$) cai de forma linear e monotónica consoante o aumento do arco. Esta restrição mecânica "obriga" a córnea a assumir uma forma mais esférica e regular.

A ortogonalidade entre o $V_R$ (controlado predominantemente pela espessura e volume) e o $V_T$ (controlado predominantemente pelo comprimento de arco) forma a fundação da Análise Vetorial Biomecânica Corneana (AVBC).

---

## 6.2 O Mecanismo de Cintagem (Hoop Restriction)

### 6.2.1 A Córnea como Membrana Pressurizada

A córnea intacta resiste à Pressão Intraocular (PIO) distribuindo a tensão de forma uniforme pelas suas fibrilas de colágeno circunferenciais, particularmente no anel límbico (Meek & Knupp, 2015). No ceratocone, o enfraquecimento localizado rompe esta simetria. A área fraca cede e protrui (deslocamento radial e axial), esticando assimetricamente as lamelas adjacentes.

Quando um segmento ICRS (PMMA rígido) é inserido, a sua inflexibilidade inibe qualquer distensão no estroma imediatamente adjacente. Como a deformação radial no arco do PMMA é forçada a zero, a porção da córnea livre (onde não há anel) tem de absorver o restante da deformação. 

### 6.2.2 Extração do Vetor VT ($\delta_{ring}$)

Para quantificar matematicamente este efeito de restrição, o modelo extrai o parâmetro $\delta_{ring}$ — o deslocamento radial médio ao longo do anel de 360° da zona de implante (raio = 2.5 mm). 
1. Num olho normal sem anel, a deformação $\delta_{ring}$ sob PIO é máxima (linha de base).
2. Onde o ICRS de PMMA reside, o $\delta_{ring}$ local é 0 (incompressível no eixo XY).
3. À medida que o arco aumenta, a percentagem de $\delta_{ring} = 0$ aumenta, reduzindo a média circunferencial linearmente.

Quanto menor for o $\delta_{ring}$ global, maior é a força de cintagem restritiva a forçar a córnea de volta para um formato regular. O $V_T$ é diretamente inversamente proporcional a este deslocamento: **Mais contenção = Maior efeito Vetor Tangencial.**

---

## 6.3 Resultados FEM: A Regressão Linear Perfeita

A nova campanha paramétrica do FEBio, simulando corretamente a imposição de volume e a contenção no eixo XY, produziu resultados surpreendentemente lineares. 

**Tabela 7.1.** Deslocamento circunferencial médio ao longo da zona de implante ($\delta_{ring}$) em função do arco.
| Configuração | Arco (°) | $\delta_{ring}$ (μm) | % Restrição face à base |
|--------------|---------|-------------|-------------------------|
| Sem anel | 0° | 37.38 | 0.0% |
| Arco curto | 90° | 29.31 | 21.6% |
| Arco médio | 160° | 22.38 | 40.1% |
| Arco longo | 210° | 17.54 | 53.1% |
| Arco x-longo | 255° | 12.25 | 67.2% |
| Quase total | 320° | 4.50 | 88.0% |
| Anel Completo| 360° | 0.00 | 100.0% |

Cada grau adicional de anel PMMA restringe linearmente a deformação, obrigando o estroma perimetral a manter uma postura circular rígida. O coeficiente de variação é minúsculo, provando que a contenção é puramente geométrica no plano 2D. 

A equação fundamental do $V_T$ (onde $V_T$ reflete a contenção $\Delta\delta_{ring}$) segue a regressão linear:
**Restrição** $\propto$ **Arco** ($R^2 > 0.99$).

---

## 6.4 Fatores Moduladores de VT

### 6.4.1 O Desacoplamento da Espessura

O achado revolucionário da AVBC e desta modelação é que o $V_T$ (restrição astigmática circunferencial) é **desacoplado da espessura do anel**. 

Enquanto a injeção de espessura impulsiona massivamente o $V_R$ (Aplanamento miópico vertical, Capítulo 6), a contenção XY é quase alheia ao volume inserido no eixo Z. A contenção existe pela simples presença física do acrílico que impede a lona corneana de deslizar horizontalmente. 
Isto significa que um segmento de 320° com 150 $\mu m$ (fino) regularizará a superfície quase exatamente da mesma forma que um de 320° com 300 $\mu m$ (espesso). No entanto, o de 300 $\mu m$ infligirá um $V_R$ dramático.

### 6.4.2 Assimetrias e Vetores Combinados

Na clínica, usar um anel de 360° ou 320° restringe a córnea tão fortemente que, embora trate um astigmatismo difuso, bloqueia o efeito de aplanamento local e é incapaz de redistribuir a deformação se o cone for muito excêntrico.
Quando a topografia exige o alisamento de "apenas metade" da córnea (ex. fenótipo Croissant paracentral), o cirurgião prescreve anéis de 160° ou 210° no meridiano mais curvo. Estes bloqueiam o estiramento na metade inferior, forçando a córnea superior a equilibrar o gradiente.

---

## 6.5 Implicações Clínicas no Planejamento (Cilindro vs. Miopia)

Com o modelo AVBC agora firmemente sustentado pela prova volumétrica de $V_R$ e elástica de $V_T$, o planejamento passa de empírico a um processo ortogonal metódico de dois passos:

1. **Passo 1: Definir a Regularização ($V_T$).**
 - Qual a magnitude do astigmatismo irregular (Cilindro / Coma)?
 - *Se baixo (< 2.0 D)*: Um arco curto de 90° a 120° restringe muito pouco a periferia, deixando a cúpula simétrica.
 - *Se elevado (> 4.0 D)*: Arcos muito longos (210° a 320°) aplicam uma restrição férrea massiva ($\delta_{ring} < 10\ \mu m$), esmagando a assimetria comática.
 
2. **Passo 2: Definir o Aplanamento ($V_R$).**
 - Qual a magnitude do Erro Esférico / K-médio miópico alvo?
 - *Se for precisa alta refração*: Seleciona-se espessuras monstruosas (300 $\mu m$, 350 $\mu m$), independentemente do arco escolhido no Passo 1.
 - *Se o K-max for baixo*: Selecionam-se espessuras finas (150 $\mu m$), para que o longo arco esculpa a córnea sem induzir hipermetropia.

Esta dissociação total — Arco controla a regularização ($V_T$); Espessura controla o Aplanamento central ($V_R$) — é a "Pedra de Roseta" que desmistifica séculos de confusão nos nomogramas.

---

## 6.6 Resumo

1. O vetor tangencial ($V_T$) governa a redução da irregularidade (Astigmatismo e Coma).
2. Ele opera impondo uma "Cintagem Límbica" (Hoop Restriction) ao estroma, impedindo fisicamente a distensão excêntrica da periferia corneana sob pressão.
3. A nossa análise demonstra uma correlação matemática quase prefeita, inversamente linear, entre o Comprimento de Arco e a capacidade da córnea se deformar ($R^2 > 0.99$).
4. Crucialmente, o $V_T$ é independente da espessura do anel. 
5. Cirurgicamente, o cirurgião "compra" correção astigmática estendendo o arco e "compra" redução de miopia/K-max injetando espessuras mais altas.

---

## Referências

1. Meek KM, Knupp C. Corneal structure and transparency. *Prog Retin Eye Res*. 2015;49:1–16.
2. Alió JL, Shabayek MH, Belda JI. Semifluorinated KeraRing segments for keratoconus. *J Refract Surg*. 2006;22(2):149–157.
3. Roberts CJ, Dupps WJ Jr. Biomechanics of corneal ectasia and biomechanical treatments. *J Cataract Refract Surg*. 2014;40(6):991–998.
