---
name: WORD_EXPORT_CULTURA_MEDICA — Exportador Capítulo a Capítulo para Word
description: >
  Skill especializado na geração de arquivos Word (.docx) para o Atlas Vetorial ICRS,
  com diagramação idêntica ao padrão editorial da Editora Cultura Médica do Brasil.
  Exporta cada capítulo individualmente E um volume completo. Inclui imagens nos
  locais corretos, estilos tipográficos, numeração, cabeçalhos e rodapés profissionais.
---

# SKILL: Exportador Word — Padrão Editora Cultura Médica Brasil

## Visão Geral

Esta skill automatiza a conversão dos capítulos Markdown do Atlas Vetorial ICRS (em `chapters/pt_br/`) para arquivos Word `.docx` com diagramação editorial completa, seguindo o padrão visual da Editora Cultura Médica do Brasil.

### Ferramentas Utilizadas
- **Node.js** (v24+) — obrigatório (já instalado no sistema)
- **Pacote `docx`** (npm) — geração programática de .docx
- **Script gerador** (`scripts/generate_word.js`) — processador Markdown → Word
- **Script instalador** (`scripts/setup.js`) — instala dependências npm automaticamente

---

## Padrão Editorial Editora Cultura Médica Brasil

### Especificações Tipográficas

| Elemento | Fonte | Tamanho | Estilo | Espaçamento |
|----------|-------|---------|--------|-------------|
| **Título do Capítulo** | Times New Roman | 18pt | Negrito | Antes: 24pt / Depois: 12pt |
| **Subtítulo (H2)** | Times New Roman | 14pt | Negrito | Antes: 18pt / Depois: 6pt |
| **Seção (H3)** | Times New Roman | 12pt | Negrito Itálico | Antes: 12pt / Depois: 4pt |
| **Subseção (H4)** | Times New Roman | 11pt | Negrito | Antes: 8pt / Depois: 2pt |
| **Texto corpo** | Times New Roman | 11pt | Normal | Entrelinha: 1.5 / Depois: 6pt |
| **Citação/blockquote** | Times New Roman | 10.5pt | Itálico | Recuo: 1.2cm esq e dir |
| **Legenda de figura** | Times New Roman | 9pt | Itálico | Centralizado |
| **Código/fórmula** | Courier New | 9pt | Normal | Fundo cinza claro |
| **Tabela — cabeçalho** | Times New Roman | 10pt | Negrito | Fundo #1B365D (azul escuro) |
| **Tabela — corpo** | Times New Roman | 9.5pt | Normal | Alternado: branco / #EEF2F7 |

### Layout de Página

```
Tamanho:        A4 (21cm × 29.7cm)
Margens:        Superior: 2.5cm | Inferior: 2.5cm
                Interna (espelho): 3.0cm | Externa: 2.0cm
                
Cabeçalho:      Altura: 1.2cm
                Esquerda (páginas pares): número da página
                Centro: nome do capítulo (versaletes, 8pt)
                Direita (páginas ímpares): "Atlas Vetorial ICRS"
                
Rodapé:         Altura: 1.0cm
                Centro: número de página (formato: — 142 —)
                
Colunas:        1 coluna (padrão Cultura Médica para textos técnicos)
```

### Sistema de Cores (Identidade Visual)

```
Azul Escuro Atlas:    #1B365D  (títulos principais, cabeçalho tabela)
Azul Médio Atlas:    #2E5FAB  (H2, subtítulos)
Azul Claro Atlas:    #4A7FC1  (H3, seções)
Cinza Corpo:         #1A1A1A  (texto normal)
Cinza Citação:       #4A4A4A  (blockquotes)
Cinza Código:        #F5F5F5  (fundo de código)
Borda Tabela:        #B0C4DE  (linhas de tabela)
```

### Elementos Especiais

#### Caixa de Destaque (Blockquote → Call-out Box)
- Borda esquerda: 4pt sólida, cor #2E5FAB
- Fundo: #EEF4FF
- Texto: Times New Roman 10.5pt itálico
- Padding: 0.5cm em todos os lados

#### Tabelas Científicas
- Cabeçalho: fundo #1B365D, texto branco, negrito
- Linhas alternadas: branco / #EEF2F7
- Borda externa: 1.5pt #1B365D
- Borda interna: 0.5pt #B0C4DE

#### Figuras e Imagens
- Largura máxima: 14cm (centradas na página)
- Legenda abaixo: "**Figura X.Y —** texto da legenda" (itálico, 9pt, centralizada)
- Separador: linha fina 0.5pt acima da legenda
- Imagens posicionadas exatamente onde o Markdown referencia

#### Fórmulas e Código
- Bloco de código: fonte Courier New 9pt
- Fundo: caixa cinza #F5F5F5
- Borda: 0.5pt #CCCCCC
- Padding: 0.3cm

---

## Pipeline de Execução

### Passo 1 — Instalar dependências (primeira vez apenas)

```powershell
# No diretório do projeto:
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass -Force
cd "c:\Users\Miguel Reis\Documents\Vetores corneanos\.agent\skills\word_export_cultura_medica\scripts"
node setup.js
```

### Passo 2 — Gerar Word (capítulo individual)

```powershell
cd "c:\Users\Miguel Reis\Documents\Vetores corneanos\.agent\skills\word_export_cultura_medica\scripts"
node generate_word.js --chapter CH-001_Anatomia_Corneana
```

### Passo 3 — Gerar Word (todos os capítulos)

```powershell
cd "c:\Users\Miguel Reis\Documents\Vetores corneanos\.agent\skills\word_export_cultura_medica\scripts"
node generate_word.js --all
```

### Passo 4 — Gerar volume único completo

```powershell
cd "c:\Users\Miguel Reis\Documents\Vetores corneanos\.agent\skills\word_export_cultura_medica\scripts"
node generate_word.js --volume-completo
```

### Saída
Todos os arquivos Word gerados são salvos em:
```
chapters/word_output/
  ├── CH-000_Prefacio.docx
  ├── CH-001_Anatomia_Corneana.docx
  ├── CH-002_Biomecanica_Aneis.docx
  ├── ...
  └── Atlas_Vetorial_ICRS_COMPLETO.docx  (volume único)
```

---

## Agente: Como Aplicar Esta Skill

Quando o usuário solicitar exportação Word:

1. **Verificar Node.js:** `node --version` — deve ser ≥ 16.
2. **Instalar dependências** se necessário: `node setup.js`.
3. **Executar o script** conforme passo 2, 3 ou 4 acima.
4. **Verificar saída** em `chapters/word_output/`.
5. **Reportar ao usuário** os arquivos gerados e eventuais erros de imagem ausente.

### Troubleshooting Comum

| Problema | Causa Provável | Solução |
|----------|---------------|---------|
| "Cannot find module 'docx'" | npm install não executado | Rodar `node setup.js` |
| Imagem não encontrada | Caminho no MD diferente do real | Verificar naming em `images/` |
| Script não roda (ExecutionPolicy) | PowerShell restrito | `Set-ExecutionPolicy Bypass -Scope CurrentUser` |
| Texto garbled (encoding) | Arquivo não é UTF-8 | Verificar BOM no arquivo fonte |

---

## Notas Científicas para Preservação

Ao converter, NUNCA alterar:
- Nomenclatura vetorial (VR, VT, Vτ, VComa, VEsférico)
- Referências bibliográficas (DOI, autores, anos)
- Fórmulas matemáticas (manter em Courier New)
- Níveis de evidência (✅ 🔬 💡 ⚠️)
- Emojis científicos para famílias de fibras (🔴 🔵 🟢)

---

*Skill versão 1.0 — Atlas Vetorial ICRS — Editora Cultura Médica Brasil*
