# Apêndice B — Documentação de Scripts FEBio e Pipeline de Extração

---

## B.1 Visão Geral do Pipeline Computacional

O pipeline computacional da AVBC é composto por quatro scripts Python interligados que automatizam a geração, execução, extração e análise das simulações de elementos finitos. Todos os scripts estão localizados no diretório `simulations/` do repositório.

```
simulations/
├── generate_febio_model.py # Gerador de modelos .feb
├── run_parametric_campaign.py # Orquestrador da campanha paramétrica
├── extract_parametric_vectors.py # Extração de métricas vetoriais
├── analyze_phenotype_discrimination.py # Análise de discriminação fenotípica
├── calc_curvature.py # Cálculo de curvatura a partir de deslocamentos
├── models/ # Ficheiros .feb gerados
├── results/ # Saídas das simulações
└── analysis/ # Relatórios de discriminação
```

O fluxo de trabalho é sequencial:

1. **Gerar** → `generate_febio_model.py` cria ficheiros `.feb` com parâmetros HGO e geometria ICRS configuráveis
2. **Executar** → `run_parametric_campaign.py` orquestra a execução paralela no FEBio 4.12
3. **Extrair** → `extract_parametric_vectors.py` lê os ficheiros de saída e calcula VR, VT, Vτ
4. **Analisar** → `analyze_phenotype_discrimination.py` realiza a análise de sensibilidade e discriminação

---

## B.2 Gerador de Modelos: `generate_febio_model.py`

### Especificação da Malha

O modelo corneano é uma casca esférica com as seguintes características:

| Parâmetro | Valor | Descrição |
|:---|:---:|:---|
| Raio de curvatura ($R$) | 7,8 mm | Raio corneano médio |
| Extensão angular ($\theta_{max}$) | 46,5° | Do ápice ao limbo |
| Anéis radiais | 20 | Do ápice (anel 0) ao limbo (anel 20) |
| Setores circunferenciais | 24 | Cada um com 15° |
| Camadas de nós | 2 | Posterior (z=0) e anterior (z=1) |
| Total de nós | 962 | $20 \times 24 \times 2 + 2$ (nós apicais) |
| Elementos pentaédricos (ápice) | 24 | Penta6 para evitar singularidade |
| Elementos hexaédricos (corpo) | 456 | Hex8 de deformação linear |
| **Total de elementos** | **480** | |
| Espessura estromal ($t_0$) | 500 μm | Uniforme (modelo canónico) |

### Posicionamento do ICRS

O ICRS é posicionado no anel 14 ($r \approx 4,2$ mm do ápice), correspondendo à zona óptica de 5–6 mm típica dos implantes comerciais (Intacs, Ferrara, Keraring).

### Condições de Contorno

1. **Pressão seguidora (follower pressure):** 15 mmHg (0,002 MPa) na face posterior. A pressão segue a normal da superfície durante a deformação, simulando corretamente a PIO.
2. **Fixação limbal:** Todos os DOFs (x, y, z) fixados no anel 20 (limbo).
3. **Deslocamento prescrito do ICRS:** A superfície do anel é empurrada anteriormente em +250 μm (eixo z), com DOFs livres em x e y para permitir relaxação circunferencial.

### Parâmetros do Material (HGO)

Os parâmetros são passados por linha de comando:

```bash
python generate_febio_model.py \
 --c 0.05 --k1 0.22 --k2 100 --kappa 0.09 \
 --arc 160 --thickness 250 \
 --output model_arc160_t250.feb
```

| Flag | Parâmetro | Default | Unidade |
|:---|:---|:---:|:---|
| `--c` | Rigidez da matriz | 0,05 | MPa |
| `--k1` | Rigidez fibrilar | 0,22 | MPa |
| `--k2` | Não-linearidade | 100 | — |
| `--kappa` | Dispersão | 0,09 | — |
| `--arc` | Comprimento do arco | 160 | graus |
| `--thickness` | Espessura do ICRS | 250 | μm |
| `--progressive` | Perfil progressivo | — | linear/parabolic |
| `--output` | Ficheiro de saída | model.feb | — |

---

## B.3 Campanha Paramétrica: `run_parametric_campaign.py`

### Design Experimental

A campanha paramétrica segue um design fatorial **OAT** (*One-At-a-Time*), variando cada parâmetro isoladamente enquanto os demais permanecem nos valores canónicos:

**Variações materiais (20 configurações):**
- $c$: 0,01 / 0,02 / 0,03 / 0,05 / 0,07 / 0,10 MPa (6 valores)
- $k_1$: 0,05 / 0,10 / 0,22 / 0,30 / 0,50 MPa (5 valores)
- $k_2$: 10 / 50 / 100 / 200 / 500 (5 valores)
- $\kappa$: 0,00 / 0,05 / 0,09 / 0,15 / 0,333 (5 valores, incluindo isotrópico)

**Variações geométricas (34 configurações):**
- Arcos: 90° / 120° / 160° / 210° / 255° / 290° / 320° / 360° (8 arcos)
- Assimétricos: 150→300 / 200→300 / 300→150 / 300→200 μm, linear e parabólico (6 perfis)
- Paquimetria: 400 / 500 / 600 μm (3 espessuras)
- Combinações adicionais (17 variações de profundidade e zona óptica)

**Total: 377 simulações convergiram** de 680 tentadas (taxa de convergência: 55,4%).

### Execução

```bash
# Campanha completa com 4 processos paralelos
python run_parametric_campaign.py --jobs 4

# Apenas variações de geometria
python run_parametric_campaign.py --subset geometry --jobs 2

# Modo seco (gera .feb sem executar FEBio)
python run_parametric_campaign.py --dry-run
```

O script gera um ficheiro `campaign_summary.json` com o status de cada simulação (PASS/FAIL/TIMEOUT/ERROR) e tempos de execução.

---

## B.4 Extração de Vetores: `extract_parametric_vectors.py`

### Métricas Extraídas

Para cada simulação convergida, o script extrai 8 métricas primárias:

| Métrica | Símbolo | Descrição | Vetor AVBC |
|:---|:---:|:---|:---:|
| Deslocamento apical | $\delta_{apex}$ | Deslocamento uz no nó 1 (ápice) | VR |
| Deslocamento radial | $\delta_{ring}$ | Média de deslocamento radial no anel ICRS | VT |
| Variação ceratométrica | $\Delta K$ | Mudança no poder refrativo (D) | VR |
| Deformação circunferencial | $\varepsilon_{circ}$ | Strain tangencial médio no anel | VT |
| Tensão máxima | $\sigma_{max}$ | Tensão de von Mises máxima (MPa) | — |
| Índice de assimetria | AI | Assimetria do campo de deslocamento | Vτ |
| Meridiano mais plano | $\theta_{flat}$ | Direção de máximo aplanamento (°) | — |
| Meridiano mais curvo | $\theta_{steep}$ | Direção de máxima curvatura (°) | — |

### Cálculo da Curvatura ($\Delta K$)

A variação ceratométrica é calculada por `calc_curvature.py` usando a fórmula:

$$\Delta K = \frac{n_{ref} - 1}{R_{post}} - \frac{n_{ref} - 1}{R_{pre}}$$

onde $n_{ref} = 1{,}3375$ (índice ceratométrico) e $R$ é o raio de curvatura ajustado a uma esfera local nos 3 mm centrais.

### Saída

```bash
python extract_parametric_vectors.py --campaign results/campaign_summary.json
```

Gera:
- `parametric_vectors.csv` — Tabela com todas as métricas por simulação
- `parametric_vectors.json` — Formato JSON para análise programática

---

## B.5 Análise de Discriminação: `analyze_phenotype_discrimination.py`

Este script realiza a análise de sensibilidade paramétrica e a validação da discriminabilidade fenotípica:

1. **Coeficiente de Variação (CV):** Calcula o CV do deslocamento apical para cada parâmetro variado isoladamente.
2. **Variância Explicada:** Decompõe a variância total do $\delta_{apex}$ por parâmetro.
3. **Fisher Ratio:** Calcula a razão de Fisher entre parâmetros para avaliar a separabilidade fenotípica.
4. **Relatório de Discriminação:** Gera `discrimination_report.txt` com a hierarquia de dominância.

### Resultados Canónicos

| Parâmetro | CV de $\delta_{apex}$ | Variância Explicada |
|:---:|:---:|:---:|
| $c$ (matriz) | **0,671** | **98,9%** |
| $\kappa$ (dispersão) | 0,011 | 1,1% |
| $k_1$ (fibras) | 0,000 | < 0,02% |
| $k_2$ (endurecimento) | 0,000 | 0,0% |

---

## B.6 Requisitos de Software

| Componente | Versão | Fonte |
|:---|:---:|:---|
| FEBio | 4.12 | [febio.org](https://febio.org) |
| Python | ≥ 3.8 | — |
| NumPy | ≥ 1.20 | `pip install numpy` |
| Pandas | ≥ 1.3 | `pip install pandas` (para CSV) |
| SciPy | ≥ 1.7 | `pip install scipy` (para ajuste de curvatura) |

### Instalação Rápida

```bash
cd simulations/
pip install numpy pandas scipy
```

### Execução Completa do Pipeline

```bash
# 1. Gerar todos os modelos
python run_parametric_campaign.py --dry-run --jobs 4

# 2. Executar campanha (requer FEBio instalado)
python run_parametric_campaign.py --jobs 4

# 3. Extrair vetores
python extract_parametric_vectors.py --campaign results/campaign_summary.json

# 4. Analisar discriminação fenotípica
python analyze_phenotype_discrimination.py
```

---

## B.7 Reprodutibilidade

Todos os ficheiros de entrada (`.feb`), saídas binárias (`.xplt`), logs do solver e extrações de dados estão versionados no repositório ou disponíveis mediante solicitação. Os scripts são determinísticos: dados os mesmos parâmetros de entrada, o mesmo ficheiro `.feb` será gerado *byte-a-byte*.

A semente aleatória para variações estocásticas (quando aplicáveis) é fixada em `seed=42` em todos os scripts.
