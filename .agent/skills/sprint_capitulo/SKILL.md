---
name: Sprint Capítulo — Motor de Redação Rápida do Atlas
description: Engine de produção acelerada de capítulos do Atlas Vetorial ICRS. Dado o número e tema do capítulo, gera instantaneamente o esqueleto completo com definição em 3 níveis, diagrama de mecanismo, tabela de evidências, armadilhas, pérolas, especificação das figuras-chave e referências sugeridas. Reduz o tempo de produção de horas para minutos.
---

# Sprint Capítulo — Motor de Produção Acelerada
> **Velocidade:** Esqueleto completo de qualquer capítulo em uma única resposta
> **Regra:** Estrutura primeiro, conteúdo depois — a arquitetura libera a criatividade

---

## 1. Como Usar Esta Skill

Diga apenas:
> *"Sprint CH-[N] sobre [tema]"*

E receba imediatamente:
1. YAML de metadados completo
2. Esqueleto das 10 seções obrigatórias
3. Blocos pré-preenchidos (definição, diagrama, evidências)
4. 3 figuras especificadas (caminho + script)
5. 5 referências ABNT
6. Conexões com outros capítulos

---

## 2. Template Universal de Capítulo

```markdown
---
título: CH-[N] — [NOME DO VETOR/CONCEITO]
subtítulo: "[Frase provocativa — pergunta ou paradoxo que o capítulo resolve]"
versão: 0.1.0
status: draft
autor: Cirurgião-Chefe Antigravity
data: [DATA]
capítulo_anterior: CH-[N-1]
capítulo_seguinte: CH-[N+1]
palavras_chave: [vetor, fibra, mecanismo, clínica]
---

# CH-[N] — [NOME]

## Epígrafe
> "[Frase que captura a essência — metáfora ou paradoxo clínico]"

---

## [N].1 A Pergunta Que Este Capítulo Responde
[1-2 parágrafos: o problema clínico que motivou este vetor]
[O que o cirurgião VÊ na topografia e não conseguia explicar]
[Como este capítulo muda a forma de planejar a cirurgia]

---

## [N].2 Definição em Três Níveis

### Nível 1 — Em Palavras Simples
[Analogia do cotidiano. Sem jargão. Qualquer leigo entende.]

### Nível 2 — Técnico
[Mecanismo biomecânico: qual fibra, qual direção, qual efeito na superfície.]

### Nível 3 — Simbólico
[Fórmula, diagrama ASCII ou equação.]
**Sigla:** V? | **Fibra-alvo:** [família] | **Cor:** [hex] | **Plano:** [XY/YZ/Z]

---

## [N].3 O Mecanismo em Cascata

```
[DIAGRAMA ASCII do mecanismo — mostrar causa → efeito → resultado clínico]
```

### [N].3.1 O Que o ICRS Faz
### [N].3.2 Como as Fibras Respondem
### [N].3.3 O Resultado na Superfície Anterior
### [N].3.4 O Que Aparece na Topografia

---

## [N].4 Base de Evidências

| Afirmação | Nível | Referência |
|-----------|-------|-----------|
| [afirmação 1] | ✅/🔬/💡/⚠️ | [autor, ano] |
| [afirmação 2] | ✅/🔬/💡/⚠️ | [autor, ano] |
| [afirmação 3] | ✅/🔬/💡/⚠️ | [autor, ano] |
| [afirmação 4 — síntese do autor] | 💡 | Antigravity (síntese) |

---

## [N].5 Manifestação Topográfica
[Como este vetor aparece nos mapas de curvatura/elevação/Plácido]
[Correlação: padrão visual → vetor ativo]

---

## [N].6 Aplicação Clínica — O Que Fazer Com Isso
[Como usar no planejamento: qual anel, qual arco, qual espessura maximiza/minimiza este vetor]
[Qual fenótipo topográfico mais se beneficia]
[Conexão com ICE e nomograma]

---

## [N].7 Armadilhas (Pitfalls)
- **Armadilha 1:** [erro de interpretação mais comum]
- **Armadilha 2:** [erro de planejamento mais comum]
- **Armadilha 3:** [erro pós-operatório mais comum]

---

## [N].8 Pérolas Cirúrgicas
- 💎 [insight prático para o dia a dia]
- 💎 [dica de planejamento]
- 💎 [sinal de alerta pós-op]

---

## [N].9 Figuras Essenciais

### Figura [N].1 — [Título]
- **Arquivo:** `../../images/CH-0[N]_[Pasta]/fig_[n]_1_[nome]_pt.png`
- **Tipo:** corte transversal / top-down / topografia / comparativo
- **Conteúdo:** [descrição biomecânica do que mostrar]
- **Vetores:** [VR / VT / Vτ / VComa / V_End]
- **Regra obrigatória:** superfície sobre o anel = PLANA ou REBAIXADA
- **Script Python:** `fem/plot_fig_[n]_1.py`

### Figura [N].2 — [Título]
[idem acima]

### Figura [N].3 — [Título]
[idem acima]

---

## [N].10 Conexões com Outros Capítulos
- **Conceito base (vem de):** CH-[X] — [o que precisa saber antes]
- **Consequência (leva a):** CH-[Y] — [o que este capítulo possibilita]
- **Interação direta:** CH-[Z] — [conceito paralelo que se relaciona]
- **Referência cruzada:** *"Ver também: [conceito] em CH-[W]"*

---

## Referências

1. [ABNT completa]
2. [ABNT completa]
3. [ABNT completa]
4. [ABNT completa]
5. NASSARALLA, Belquiz Amaral; ALMODIN, Edna; SANDES, Jordana. *Ceratocone: um guia completo para diagnóstico e tratamento.* [Cidade]: EG Educacional Almodin, [ano].
```

---

## 3. Blocos Pré-Prontos por Vetor

### Bloco VR — Definição Pronta
```
Nível 1: O ICRS age como uma cunha que empurra a borracha corneana
radialmente para fora — como pregar um anel numa mangueira de jardim
e ver a água redirecionar ao redor dele.

Nível 2: VR = componente centrífuga do ICRS sobre fibras radiais
do estroma posterior. Anel a 70-80% de profundidade cria ponto fixo
→ fibras redirecionadas para fora → aplainamento K-steep.

Nível 3: VR → centrífugo (← ANEL →)
Fibra: Radiais 🔴 | Cor: #CC2200 | Plano: XY
```

### Bloco VT — Definição Pronta
```
Nível 1: Segure uma mola circular pelas duas pontas e puxe. As pontas
tracionam, o centro fica parado. O VT é a força das pontas do anel.

Nível 2: VT = tração tangencial nas extremidades do anel (incisões).
Corpo central = âncora passiva. Eixo de ação = direção da incisão.

Nível 3: VT → tangencial ao arco nas extremidades
Fibra: Tangenciais 🔵 | Cor: #00B4DC | Plano: XY
```

### Bloco Vτ — Definição Pronta
```
Nível 1: O anel age como um clipe entre as páginas de um livro —
impede que as lamelas deslizem umas sobre as outras.

Nível 2: Vτ = bloqueio do shear interlaminar pelas fibras oblíquas.
PMMA impede deslizamento → contém progressão da ectasia.

Nível 3: Vτ → vertical (↕ bloqueio)
Fibra: Oblíquas 🟢 | Cor: #00CC44 | Plano: YZ/XZ
```

---

## 4. Referências Rápidas por Capítulo

| Capítulo | Referências Prioritárias (inserir sempre) |
|----------|------------------------------------------|
| Todos | Nassaralla/Almodin/Sandes — *Ceratocone: guia completo* |
| CH-001 | Meek 2009, Scarcelli 2014, Winkler 2013 |
| CH-002 | Ferrara 2004, Torquetti 2009, FEM Antigravity 2025 |
| CH-003 | Torquetti 2013 (nomograma), Santhiago 2014 (PTA) |
| CH-004 | Ferrara 2004, Torquetti 2009, FEM Antigravity (V_End) |
| CH-005 | Torquetti 2013, Bicalho (comunicação pessoal) |
| CH-007 | Torquetti 2009 (aberrometria), autor (síntese) |
| CH-008 | Torquetti nomograma, Elsheikh 2010 |
| CH-010 | Autor N=1139 (ICE), Khanthik 2024 |
| CH-012 | Torquetti 2009, ABO casos clínicos |
| CH-013 | Torquetti 2014, ABO complicações |
| CH-015 | Wollensak 2003, Almodin 2021, Ventura 2012 |

---

## 5. Checklist de Entrega do Sprint

- [ ] YAML de metadados completo (título, versão, status, datas)
- [ ] Epígrafe — frase memorável
- [ ] Definição nos 3 níveis (simples → técnico → simbólico)
- [ ] Diagrama ASCII do mecanismo
- [ ] Tabela de evidências com marcadores
- [ ] Seção de Armadilhas (mínimo 3)
- [ ] Seção de Pérolas (mínimo 3)
- [ ] 3 figuras especificadas (caminho + tipo + conteúdo + script)
- [ ] 5 referências em ABNT (incluir Nassaralla/Almodin/Sandes)
- [ ] Conexões com outros capítulos
- [ ] Zero menções a "tenting" — usar "aplainamento" ou "arc-shortening"
- [ ] Zero setas VR apontando para o centro
