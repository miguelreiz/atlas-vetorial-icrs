# Apêndice C — Glossário de Terminologia da AVBC

---

## Termos Biomecânicos

**Aplanamento** (*Flattening*)
Redução da curvatura corneana central, medida como diminuição do K-steep ou K-médio. No framework AVBC, o aplanamento é mediado pelo vetor VR e controlado pelo volume total do implante (espessura × arco).

**Anisotropia**
Propriedade de um material cujo comportamento mecânico varia com a direção. O estroma corneano é anisotrópico: mais rígido ao longo dos meridianos nasal-temporal e superior-inferior (fibras cardinais) do que em direções oblíquas.

**AVBC** — Análise Vetorial Biomecânica Corneana
Framework de planejamento cirúrgico para ICRS que decompõe o efeito biomecânico do anel em três vetores independentes (VR, VT, Vτ), substituindo a seleção empírica por nomogramas.

**Cintagem** (*Hoop restriction*)
Efeito de restrição circunferencial exercido pelo ICRS sobre o estroma periférico. Análogo ao aro de um barril: impede a expansão radial sob a PIO. Governa o vetor VT e é controlado pelo comprimento do arco.

**CXL** — *Crosslinking* do Colágeno Corneano
Procedimento que reforça as ligações cruzadas interfibrilares do colágeno estromal usando riboflavina e radiação UVA. Aumenta o parâmetro k_1 (rigidez fibrilar) do modelo HGO.

**Deslocamento apical** (δ_{apex})
Deslocamento vertical do ápice corneano sob pressão intraocular. É a métrica principal de deformação nas simulações FEM. Valor basal canónico: 360,9 μm (sem anel).

**Eixo Neutro Mecânico (ENM)** (*Mechanical Neutral Axis, MNA*)
Eixo que divide a córnea em duas metades com propriedades biomecânicas aproximadamente iguais, determinado pela elevação posterior e espessura mínima. Difere do eixo de maior curvatura (K-steep) em até 40% dos casos. O ICRS deve ser posicionado relativamente ao ENM, não ao K-steep.

**Escola Volumétrica**
Paradigma que explica o efeito do ICRS pelo deslocamento de volume: o anel ocupa um volume físico no estroma incompressível, forçando o tecido adjacente a deslocar-se radial e anteriormente. Fundamentação: Kling & Marcos (IOVS, 2013).

**FEM** — Método dos Elementos Finitos (*Finite Element Method*)
Técnica computacional para resolver equações diferenciais parciais em geometrias complexas. No contexto da AVBC, utilizado para simular a resposta corneana à inserção de ICRS.

**FEBio**
Software de elementos finitos de código aberto (University of Utah) especializado em biomecânica. Versão utilizada: FEBio 4.12. Suporta nativamente o modelo constitutivo HGO.

**HGO** — Modelo de Holzapfel–Gasser–Ogden
Modelo constitutivo hiperelástico para materiais reforçados por fibras. Decompõe a energia de deformação em contribuição da matriz isotrópica (c) e das fibras anisotrópicas (k_1, k_2, \kappa). Referência: Holzapfel, Gasser & Ogden (*J Elasticity*, 2000).

**Hoop stress** — Tensão tangencial
Tensão circunferencial numa casca pressurizada (como a córnea sob PIO). Governa a tendência da córnea a expandir-se radialmente. O ICRS interrompe esta tensão criando uma barreira mecânica (ver Cintagem).

**ICRS** — Segmento de Anel Intraestromal (*Intrastromal Corneal Ring Segment*)
Implante de PMMA inserido no estroma corneano para modificar a curvatura, astigmatismo e aberrações. Tipos comerciais: Intacs, Ferrara Ring, Keraring.

**Incompressibilidade**
Propriedade de um material que resiste à mudança de volume. O estroma corneano (78% água) é quase incompressível: quando o ICRS ocupa volume, o tecido adjacente deve deslocar-se, não comprimir-se.

---

## Parâmetros Constitutivos HGO

| Parâmetro | Símbolo | Valor Canónico | Significado Clínico |
|:---|:---:|:---:|:---|
| Rigidez da matriz | c | 0,05 MPa | Degradação proteoglicânica → ceratocone. **Parâmetro dominante.** |
| Rigidez fibrilar | k_1 | 0,22 MPa | Enfraquecimento do colágeno; CXL aumenta k_1. |
| Endurecimento exponencial | k_2 | 100 | Resposta não-linear das fibras a grandes deformações. |
| Dispersão de fibras | \kappa | 0,09 | Desorganização lamelar; \kappa → 1/3 = isotropia total. |
| Módulo volumétrico | k | 4,76 MPa | Impõe quase-incompressibilidade. |

---

## Vetores AVBC

**VR** — Vetor de Deslocamento Radial
Quantifica o efeito de aplanamento. Controlado pela espessura do anel (volume injetado). Insensível ao comprimento do arco em arcos parciais. Faixa FEM: 19,2–19,9 μm (arcos parciais), 125,9 μm (anel completo 360°).

**VT** — Vetor de Tensão Tangencial
Quantifica a redistribuição de astigmatismo por cintagem circunferencial. Controlado pelo comprimento do arco. Equação empírica: V_T = -0{,}0018 \times arco° + 7{,}79 (R² = 0{,}94). Faixa FEM: 7,20–7,78 kPa.

**Vτ** — Vetor de Torque Assimétrico
Quantifica o reposicionamento do ápice. Controlado pelo diferencial de espessura em anéis progressivos. Zero numérico para anéis simétricos. Faixa FEM: 9,31 μN·m (progressivo linear) a 18,34 μN·m (progressivo parabólico).

---

## Classificação Trimodal (Módulos O/T/B)

**Módulo O** — Avaliação de Coerência Óptica
Classifica o potencial de recuperação visual: O+ (CDVA ≥ 20/60, coma < 2,5 μm) ou O− (CDVA < 20/60 ou coma > 3,5 μm).

**Módulo T** — Morfologia Topográfica
Classifica a configuração espacial do cone: Central, Crescente (paracentral), Periférico (descentrado) ou Global (difuso).

**Módulo B** — Seleção Biomecânica
Traduz a classificação O+T em prescrição de anel usando os três vetores. Determina o vetor dominante e os parâmetros correspondentes.

---

## Índices de Correção AVBC

**CI_R** — Índice de Correção Radial
CI_R = Δ K_{observado} / Δ K_{previsto}. Meta: 1,0 ± 0,15. Análogo ao CI de Alpins para aplanamento.

**CI_T** — Índice de Correção Tangencial
CI_T = Δ Cyl_{observado} / Δ Cyl_{previsto}. Meta: 1,0 ± 0,15. Análogo ao CI de Alpins para astigmatismo.

**ICE** — Índice de Coerência Estrutural
ICE_min = ângulo mínimo entre o eixo de maior curvatura e o ENM. Limiar de triagem: ICE_min < 28° prediz ≥ 3 linhas de ganho (AUC 0,82).

---

## Acrónimos

| Acrónimo | Significado |
|:---|:---|
| AVBC | Análise Vetorial Biomecânica Corneana |
| AE | Ângulo de Erro (Alpins) |
| CDVA | Acuidade Visual Corrigida a Distância |
| CI | Índice de Correção (*Correction Index*) |
| CXL | Crosslinking do Colágeno |
| DV | Vetor de Diferença (Alpins) |
| ENM | Eixo Neutro Mecânico |
| FEM | Método dos Elementos Finitos |
| HGO | Holzapfel–Gasser–Ogden |
| HOA | Aberrações de Alta Ordem |
| ICRS | Segmento de Anel Intraestromal |
| MAE | Erro Absoluto Médio |
| ORA | Ocular Response Analyzer |
| PIO | Pressão Intraocular |
| PMMA | Polimetilmetacrilato |
| SIA | Astigmatismo Induzido Cirurgicamente (Alpins) |
| TIA | Astigmatismo Induzido Alvo (Alpins) |
| UDVA | Acuidade Visual Não Corrigida a Distância |
| VR | Vetor de Deslocamento Radial |
| VT | Vetor de Tensão Tangencial |
| Vτ | Vetor de Torque Assimétrico |
| WAXS | Espalhamento de Raios X de Grande Ângulo |
