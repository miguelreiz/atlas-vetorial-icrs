# Glossário de Termos Técnicos — Atlas Vetorial ICRS

> **Propósito:** Este glossário define os termos técnicos utilizados ao longo do Atlas, tornando o conteúdo acessível a cirurgiões em diferentes estágios de formação, revisores científicos e leitores internacionais. Cada termo inclui definição simples, definição técnica e, quando aplicável, o capítulo principal onde é desenvolvido.

---

## Sistema de Nível de Evidência do Atlas

Toda afirmação científica neste Atlas é classificada em um de três níveis:

| Símbolo | Nível | Definição |
|---------|-------|-----------|
| ✅ | **Fato demonstrado** | Baseado em dados publicados em periódico revisado por pares com citação direta |
| 🔬 | **Evidência indireta** | Síntese de múltiplos estudos convergentes — inferência justificada |
| 💡 | **Síntese/hipótese do autor** | Raciocínio original do autor, explicitamente marcado como tal |
| ⚠️ | **Extrapolação derivada** | Estimativa quantitativa calculada a partir de dados indiretos — ver metodologia |

> **Regra editorial:** Toda afirmação sem marcação de nível é uma falha de revisão. Leitores que identificarem afirmações não marcadas são encorajados a notificar o autor.

---

## A — Termos de Anatomia Corneana

### Arc-Shortening Effect (Efeito de Encurtamento de Arco)
- **Em palavras simples:** Quando um implante rígido é inserido numa estrutura curva flexível, a curvatura ao redor do implante "achata" — como uma corda que estica em linha reta quando um pau é colocado em seu meio.
- **Técnico:** Redução do comprimento efetivo do arco de uma lamela corneana após a interposição de um implante rígido (ICRS). A força resultante é centrípeta (direcionada ao eixo óptico).
- **Capítulo principal:** CH-002, CH-004

### Coeficiente de Poisson
- **Em palavras simples:** Quando você comprime um material num sentido, ele tende a "inchar" no sentido perpendicular — como um aperto de mão que faz o braço ficar mais largue no meio. Este comportamento é quantificado pelo Coeficiente de Poisson.
- **Técnico:** Razão entre a deformação lateral e a deformação axial de um material submetido a carga uniaxial. Para a córnea: ν ≈ 0.49 (quasi-incompressível). Responsável pelo Efeito de Acoplamento (VT) — aplainamento num meridiano gera encurvamento no meridiano ortogonal.
- **Símbolo:** ν (nu)
- **Capítulo principal:** CH-005

### Critério de Von Mises (Tensão Equivalente de Von Mises)
- **Em palavras simples:** Uma "fórmula única" que combina todos os tipos de força que atuam em um ponto de um material e calcula se esse ponto vai "ceder" (deformar) ou resistir. Como um indicador de "quanto o material está sendo estressado ao total".
- **Técnico:** Critério de escoamento para materiais dúcteis baseado na energia de distorção. σ_VM = √[(1/2)((σ₁-σ₂)²+(σ₂-σ₃)²+(σ₃-σ₁)²)]. Escoamento ocorre quando σ_VM > σ_yield (tensão de escoamento do material). No contexto ICRS: quando σ_VM > tensão de escoamento lamelar, as lamelas deslizam → arc-shortening → VR.
- **Símbolo:** σ_VM (kPa)
- **Valores típicos:** Córnea virgem: escoamento ~50-80 kPa; Pós-CXL: ~120-150 kPa
- **Capítulo principal:** CH-015

### Estroma Corneano
- **Em palavras simples:** A camada mais espessa da córnea — como um "colchão" de fibras de proteína (colágeno) que dá à córnea sua forma e força.
- **Técnico:** Camada intermediária da córnea composta por ~200 lamelas de colágeno tipo I dispostas em orientações variáveis segundo a profundidade (WAXS: mapeamento por Meek & Boote). Representa ~90% da espessura corneana (~450-500 µm de espessura total). Responsável pelas propriedades biomecânicas da córnea.
- **Capítulo principal:** CH-001

---

## F — Método dos Elementos Finitos

### FEM — Método dos Elementos Finitos (Finite Element Method)
- **Em palavras simples:** Uma técnica de simulação por computador que divide um objeto em milhares de pecinhas e calcula como cada pecinha se move e deforma quando uma força é aplicada. É como criar um clone digital da córnea para testar cirurgias sem tocar no paciente.
- **Técnico:** Método numérico para resolução de equações diferenciais parciais em domínios complexos. Divide o domínio em elementos discretos interconectados (*mesh*). Para córneas ICRS: o modelo material é hiperelástico não-linear (Neo-Hookean ou Mooney-Rivlin) com parâmetros derivados de ensaios de tração uniaxial (*ex vivo*). Outputs principais: deslocamento nodal (ΔK simulado), tensão de Von Mises, deformação principal.
- **Limitações:** Variabilidade individual, simplificação 2D vs geometria real 3D, parâmetros estimados de literatura (não medidos individualmente).
- **Principais estudos FEM em ICRS:** Kling & Marcos (2013, IOVS); García de Oteyza (2021, PLOS ONE); Lago MA (PLOS ONE)
- **Capítulo principal:** CH-015

---

## H — Termos de Hiperelasticidade

### Material Hiperelástico
- **Em palavras simples:** Materiais que podem se deformar muito sob força e ainda voltar à forma original — como a borracha. São diferentes do aço, que deforma pouco mas não volta ao normal se for além do limite.
- **Técnico:** Material cujo comportamento mecânico é descrito por uma função densidade de energia de deformação W (strain energy density function). Modelos comuns para córneas: Neo-Hookean (W = C₁(I₁-3)); Mooney-Rivlin (dois parâmetros). Caracterizado por relação tensão-deformação não-linear: o módulo de elasticidade (rigidez) aumenta com a deformação.
- **Capítulo principal:** CH-002, CH-015

---

## I — Termos de ICRS

### ICRS — Intracorneal Ring Segment (Segmento de Anel Intracorneano)
- **Em palavras simples:** Um pequeno implante de plástico (PMMA) inserido dentro da córnea para corrigi-la mecanicamente nas doenças que deformam sua curvatura.
- **Técnico:** Implante intraestromal de polimetilmetacrilato (PMMA) com geometria de arco, implantado a 70-80% da paquimetria local por cirurgia a laser femtossegundo ou dissector manual. Gera vetores de força (VR, VT, Vτ, VComa) que redistribuem a tensão estromal e reduzem a ectasia.
- **Capítulo principal:** CH-002 a CH-010

---

## K — Termos de Ceratocone

### KC — Ceratocone (Keratoconus)
- **Em palavras simples:** Uma doença donde a córnea perde sua forma esférica e se afunila como um cone — causando distorção visual progressiva.
- **Técnico:** Ectasia corneana primária caracterizada por afinamento estromal assimétrico, protrusão anterior e degradação do colágeno mediada por metaloproteinases (MMP-2, MMP-9). Causa: degradação dos proteoglicanos de ancoragem (decorina, lumicana) → perda das fibras oblíquas interlamelares → deslizamento lamelar → amplificação da deformação pela PIO.
- **Capítulo principal:** CH-001, CH-002, CH-003

---

## M — Termos de Módulo de Elasticidade

### Módulo de Young (Módulo de Elasticidade / E)
- **Em palavras simples:** Uma medida de "rigidez" de um material — o quanto de força é necessário para deformá-lo uma certa quantidade. Aço = altíssimo; borracha = baixo; córnea normal: intermediário.
- **Técnico:** E = σ / ε (Tensão / Deformação). Para a córnea KC virgem: E ≈ 0.3–2.0 MPa (variável com profundidade e hidratação). Após CXL: E aumenta 2-3× nos 300 µm anteriores (✅ Wollensak 2003; Kohlhaas 2006). Anisotropia importante: E varia com a direção (meridianos ortogonais vs tangenciais).
- **Impacto ICRS:** E maior (pós-CXL) = menor deslizamento lamelar = menor VR efetivo.
- **Capítulo principal:** CH-002, CH-015

---

## P — Termos de Perfil de ICRS

### Perfil do Anel (Cross-Section Profile)
- **Em palavras simples:** Se você cortasse o anel intracorneano ao meio transversalmente, que formato você veria? Triangular, arredondado, hexagonal? Esse formato determina como a força é distribuída na córnea.
- **Técnico:** Geometria da seção transversal do implante ICRS. Determina a distribuição de Von Mises na interface implante-estroma:
  - **Triangular:** ápice agudo, σ_VM focal 140-170 kPa (Ferrara, Keraring)
  - **Prismático-trapezoidal:** bordas chanfradas, σ_VM 110-130 kPa (AJL PRO+)
  - **Hexagonal:** topo plano, σ_VM 95-110 kPa (Intacs)
  - **Arredondado (edgeless):** sem bordas, σ_VM 81-100 kPa (CornealRing)
  - **Elipsóide/Fusiforme:** biconvexo, arco 320°, σ_VM semi-focal (Ferrara HM)
- **Capítulo principal:** CH-002, CH-015

---

## V — Vetores do Atlas

### VR — Vetor Radial
- **Em palavras simples:** A força principal que o anel aplica na córnea, empurrando-a para "achatar" o cone no centro. Dirige-se de onde está o anel para fora (centrífugamente). ⚠️ Errata comum: VR é centrífugo, não centrípeto — o anel separa as lamelas; a tração resultante cria o aplainamento central.
- **Técnico:** Componente de força perpendicular ao anel, direcionada centricamente (*centrifugal* em relação ao implante), gerada pelo arc-shortening das fibras radiais 🔴.
- **Capítulo principal:** CH-004

### VT — Vetor Tangencial
- **Em palavras simples:** A força que o anel exerce ao longo de seus extremos (pontas), rodando o eixo do astigmatismo e distribuindo tensão circunferentially.
- **Técnico:** Componente tangencial gerado pela tração diferencial das fibras tangenciais 🔵 nas extremidades do segmento. Responsável pela regularização do astigmatismo e pelo Efeito de Acoplamento (via Coeficiente de Poisson).
- **Capítulo principal:** CH-005

### Vτ — Vetor de Torque
- **Em palavras simples:** A força de rotação gerada quando os dois segmentos têm espessuras diferentes — como uma balança desequilibrada que empurra o ápice do cone de volta ao centro.
- **Técnico:** Momento torcional gerado pela diferença de espessura entre segmentos assimétricos (*tapered*). Atua sobre as fibras oblíquas 🟢 (ou as substitui, no caso KC). Quantificado como: Vτ = ΔF × d (diferença de força × distância entre pontas).
- **Capítulo principal:** CH-006

---

## X — Crosslinking

### CXL — Crosslinking Corneano (Riboflavina + UVA)
- **Em palavras simples:** Um procedimento que "solda quimicamente" as fibras de colágeno da córnea para freiar a progressão do ceratocone. A riboflavina absorve a luz ultravioleta e cria ligações químicas novas entre as fibras.
- **Técnico:** Aplicação de riboflavina (vitamina B2) como fotossensibilizador + luz UVA (365 nm, 3-9 mW/cm²) para criar ligações covalentes (crosslinks) interfibrilares e interlamelares no estroma corneano. Efeito: aumento do módulo de Young em 2-3× nos primeiros 300 µm. Zona de demarcação: ~300-400 µm de profundidade (limitada pelo consumo de oxigênio pelo tecido).
- **Impacto no ICRS:** Criar uma barreira rígida nos 300 µm anteriores que reduz a eficácia do arc-shortening.
- **Referência canônica:** ✅ Wollensak G et al. Am J Ophthalmol. 2003. doi:10.1016/S0002-9394(02)02220-1
- **Capítulo principal:** CH-015

---

## WAXS — Wide-Angle X-Ray Scattering

### WAXS (Difração de Raios-X de Grande Ângulo)
- **Em palavras simples:** Uma técnica de raios-X que revela a orientação de cada fiber de colágeno na córnea — como um GPS das fibras, mostrando onde cada uma aponta.
- **Técnico:** Técnica de cristalografia de raios-X que mede a periodicidade de fibrilas de colágeno tipo I. Permite mapear a orientação preferencial das fibras em seções corneanas planas. Resolução espacial: ~1-2 mm². Aplicado à córnea por Meek KM, Boote C (2004, 2009): demonstrou o patrão "+" de fibras radiais no centro e o annulus limbal de fibras tangenciais.
- **Referência canônica:** ✅ Meek KM, Boote C. *Progress in Retinal and Eye Research*. 2004; 2009.
- **Capítulo principal:** CH-001

---

*Glossário versão 1.0 — Março 2026 | Expansão contínua a cada novo capítulo*
