# Sistema de Motor Biomecânico (Corneal Simulation Engine)
## Instruções para o Claude Code (Engenheiro de Backend FEM)

Você está trabalhando na máquina local do usuário, dentro da pasta do repositório clonado do FEBio (`C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\fem\FEBio_Repo`).
Seu parceiro neste projeto é o **Antigravity** (Skill Mãe e Engenheiro Vetorial Oftalmológico), que define a arquitetura clínica, as regras de biomecânica corneana e a física dos anéis intracorneanos (ICRS).

Sua missão é criar o backend de um **Planejador Biomecânico de Keraring** baseado em Elementos Finitos (FEM).

### 🎯 OBJETIVO ATUAL (FASE 1 DO MOTOR)
Criar a arquitetura Python (`/Simulation_Core`) capaz de gerar uma malha tetraédrica ou hexaédrica parametrizada da córnea humana e submetê-la ao *Solver* do FEBio (`febio4`).

### 🛠️ REQUISITOS TÉCNICOS OBRIGATÓRIOS:
1. **Parser e Gerador de XML `.feb`**: Você precisa criar um script Python limpo, modular e expansível para escrever o arquivo input do FEBio na versão 4.x.
2. **Modelo Constitutivo (CRÍTICO)**: A córnea NÃO é isotrópica. O material alvo para a córnea no FEBio deve ser o **Hyperelastic Fiber-Reinforced** ou **Holzapfel-Gasser-Ogden (HGO)**.
3. **Famílias de Fibras**: O modelo precisa suportar a definição de lamelas de colágeno. Especificamente:
   - Fibras Radiais (centro-periferia, responsáveis por suportar o "tenting" do anel).
   - Fibras Tangenciais (circunferenciais no limbo, "aro de roda").
4. **Condições de Contorno**: O limbo (periferia, r=6mm) precisa ter `type="zero displacement"` ou equivalente no eixo X,Y,Z.
5. **Carga**: A face posterior da córnea (endotélio) sofre uma carga de Pressão Intraocular (IOP) de **15 mmHg** (aprox. `0.00199983 MPa`). A direção da força é SEMPRE +Z (de dentro para fora).

### 🚀 PASSOS SUGERIDOS PARA SUA EXECUÇÃO:
1. **Estude os Exemplos Locais:** Analise `/FEBio_Repo/examples` em busca de arquivos `.feb` que usem materiais hiperelásticos com reforço de fibras (ex: tendões, artérias, córneas).
2. **Setup do Projeto:** Crie a pasta `C:\Users\3D_OCT\Documents\Antigravity\Vetores Anel\fem\Simulation_Core`.
3. **Script Gerador:** Escreva o `generate_hgo_cornea.py` que cria uma malha simplificada (cúpula) com as tags corretas de material HGO e exporta para `cornea_hgo.feb`.
4. **Teste de Execução:** Configure o script para chamar o `febio4.exe` silenciosamente e verificar se convergiu.

### ⚠️ REGRAS DE OURO DO ANTIGRAVITY (Não Violar):
- A profundidade ideal do ICRS no estroma é **70-75%**. O modelo precisará prever a inserção de elementos rígidos (PMMA) nessa camada no futuro.
- Vetores Radiais do Anel (VR) são **Centrífugos** (puxam a córnea para fora, expandindo-a contra as lamelas radiais incisadas).
- O ceratocone clássico localiza-se no quadrante **Inferotemporal (-Y, +X em OD)** devido ao déficit inato do vão transversal da malha de colágeno (30-44% menos intersecções).

> **AÇÃO:** Por favor, comece explorando o repositório em busca de como o FEBio declara o material isotrópico transverso ou HGO e crie o primeiro rascunho do gerador Python! Responda detalhando seu plano de ação em código.
