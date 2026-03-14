# APÊNDICE A: Modelagem Numérica e Simulação de Elementos Finitos (FEBio)

> Este apêndice documenta o raciocínio matemático e a modelagem mecânica (Finite Element Method - FEM) subjacente aos princípios vetoriais estabelecidos neste Atlas, elevando a validação clínica à transcendência da engenharia de materiais biológicos.

---

## A.1 — Da Tensão de Von Mises ao Comportamento Estrutural

A tensão equivalente de **Von Mises** ($\sigma_{VM}$) representa o critério de escoamento mecânico adaptado a materiais hiperelásticos. É a medida escalar que combina todos os componentes do tensor de tensões de Cauchy em uma única grandeza indicativa do estado de estresse estrutural do tecido. Valores elevados de $\sigma_{VM}$ indicam regiões onde o estroma está sujeito a maior demanda mecânica — e, no contexto da ectasia, onde a degradação das lamelas de colágeno produz redistribuição de forças falhas.

As simulações desenvolvidas para este Atlas modelam o carregamento físico padrão (PIO = 15 mmHg, anel limbal ancorado) utilizando hipóteses constitutivas avançadas:

1. **Modelo Constitutivo Mooney-Rivlin:** Ao reduzir os parâmetros hiperelásticos ($c_1$ e $c_2$) em \~40% no quadrante inferotemporal (IT), o modelo computacional captura precisamente o efeito da fragilização lamelar documentada por microscopia WAXS (espraiamento fibrilar do eixo N-T). O resultado — um **pico de tensão de 0.0208 MPa** concentrado no setor IT (quase o dobro da média corneana de \~0.0106 MPa) — confirma a premissa vetorial: a região hidraulicamente mais frágil suporta a mesma pressão, gerando um vetor de deformação assimétrico.
2. **Modelo HGO (Holzapfel-Gasser-Ogden):** Considerando a distribuição contínua de fibras radiais e tangenciais imersas na matriz isotrópica (fase neo-Hookeana com E = 0.5 MPa). As fibras radiais e limbais aportam a rigidez viscoelástica direcional.

---

## A.2 — O Vetor de Deformação e a Migração do Ápice Ectásico

A deformação da calota corneana sob pressão intraocular é governada pela equação de equilíbrio de cascas esféricas esbeltas. Em uma córnea isótropa normal, as tensões meridional e circunferencial são comparáveis (estado biaxial), mantendo a morfologia quase-esférica. A falência focalizada descrita pela síndrome do ceratocone cria uma assimetria direta de rigidez estrutural:

$$ \sigma_{VM (IT)} > \sigma_{VM (Normal)} \implies \delta_{IT} > \delta_{Normal} $$

Onde $\delta$ representa o deslocamento nodal centrífugo (protrusão). Esta protrusão paramétrica é a definição matemática do "cone": o ápice migra obrigatoriamente para o quadrante estruturalmente vencido (Inferotemporal), desencadeando a tríade clínica:
1. Curvatura regional agudamente elevada ($K_{max}$ no ápice do cone).
2. Assimetria inferior-superior (SimK diferencial $> 1.5 D$).
3. Inclinação do eixo óptico em relação à pupila.

---

## A.3 — A Lei do Disco Mecânico (Validação Plácido)

O ceratoscópio (disco de Plácido) reflete a topografia sagital da superfície anterior. Sendo cada anel uma isocurva de distância algorítmica ao detetor, a deflexão milimétrica da superfície acarreta distorção exponencial nos anéis projetados. A formulação matemática da LDM propõe que a distorção do Plácido é a sombra visual direta das forças do FEBio.

A concentração de $\sigma_{VM}$ no setor IT traduz-se semióticamente:

| Fenômeno Físico (FEM FEBio) | Alteração Anatômica (Superfície) | Distorção Reflexiva (Plácido) |
| :--- | :--- | :--- |
| **Pico $\sigma_{VM} > 0.020$ MPa (IT)** | Protrusão estromal (↑ curvatura focal) | **Compressão reflexiva** (Anéis mais estreitos) |
| **Gradiente $\sigma_{VM}$ Ápice $\to$ Limbo** | Transição abrupta de rigidez | **Ovalização e Excentricidade** |
| **Baixo $\sigma_{VM}$ no centro realivo** | Resistência colagênica preservada | **Anéis quasi-circulares no ápice central** |

Pela Lei das Lentes e a equação paraxial, o entortamento reflexivo $\Delta R$ do anel obedece a uma proporcionalidade inversa à variação da curvatura $\Delta K$:
$$ \Delta R \approx -\frac{f^2}{R_{nominal}} \cdot \Delta K $$

*(A distorção de Plácido é o tensor de estresse clínico visualizado em tempo real).*

---

## A.4 — A Gênese Vetorial do Coma ($Z_3^{-1}$)

A protrusão inferior assimétrica é traduzida na óptica adaptativa (Zernike) como Coma Vertical ($Z_3^{-1}$) e Trefoil ($Z_3^{-3}$). A cascata determinística segue o vetor:

**Falha Lammelar ($\Delta c_1$) $\implies$ Tensão ($\Delta \sigma_{VM}$) $\implies$ Deslocamento ($\Delta \delta$) $\implies$ Curvatura ($\Delta K$) $\implies$ Aberração Zernike ($\Delta Z$)**

Matematicamente, o Coma resultante de um desvio meridional do ápice ($\Delta y$) baseia-se na diferença de índice estromal ($n'-n$) e raio pupilar ($R_p$):

$$ C_3^{-1} \approx (n' - n) \cdot \Delta y \cdot K^2 \cdot R_p^2 $$

A localização do pico de tensão Von Mises justifica as premissas centrais deste Atlas: o VComa patológico elevado, o Índice de Coerência dos Eixos (ICE) inferior a 1.0, e a "chama de vela" visual relatada pelos pacientes.

---

## A.5 — Engenharia Reversa: O Planejamento Vetorial ICRS

Os algoritmos de elementos finitos desmantelam a suposição de que o segmento de anel opera por mero volumetrismo passivo. Um anel ICRS impõe atuação tridimensional primária documentável:

1. **Acréscimo Rigidez Zonal (Vetor Tangencial - VT):** A interposição geométrica adiciona "Viga" estrutural local. O $\sigma_{VM}$ é drenado do tecido doente subjacente para a interface peri-anel. (Análogo a aumentar o parâmetro intrínseco $c_1$ mecanicamente).
2. **Arc-shortening Ativo (Vetor Radial - VR):** As fibras estromais radiais encurtadas propulsam uma onda de contra-tensão na rede lamelar rumo ao centro óptico, limitando ativamente a protrusão.
3. **Gradiente Rotacional (Vetor Torque - Vτ):** Quando o segmento é assimétrico (espessura progressiva, ex: 150→350 µm), o diferencial de volume entre as extremidades cria um **momento de torção**: a ponta grossa impõe separação lamelar máxima, a ponta fina impõe separação mínima. Este gradiente de σ_VM ao longo do arco gera rotação do campo de tensões → o ápice do cone migra lateralmente em direção ao centro pupilar. O Vτ não atua sobre as fibras em mola (bow springs) nem sobre a Bowman — atua exclusivamente no gradiente de tensão interlamelar na zona do túnel (≈70–75% de profundidade). Ver CH-006 para mecanismo detalhado.

A magnificência e a magnitude de correção do deslocamento dependem da exata anulação estática: **$\sigma_{VM}$ restaurado vs $\sigma_{VM}$ doente**. Este escopo paramétrico funda as bases sólidas e inquestionáveis da Cirurgia Refrativa Vetorial e legitima o presente Atlas não apenas como um guia fenomenológico, mas como um tratado absoluto de Engenharia Cirúrgica Ocular.

> *Referências:* Elsheikh A (Exp Eye Res 2008), Hayes S & Meek KM (WAXS Colágeno 2009-2017), Ambrósio R Jr (Corneal Biomechanics 2017), Maougal A & Gatinel D (JCRS 2023).
