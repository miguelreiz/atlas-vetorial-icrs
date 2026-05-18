---
name: "Folder Médico Oftalmológico — Gerador de Panfletos para Congressos"
description: "Skill super-especializada na criação de folders, panfletos e materiais gráficos para congressos oftalmológicos (BRASCRS, ARVO, ESCRS, AAO, CBO). Gera HTML premium print-ready com dados clínicos, imagens anonimizadas, gráficos SVG inline e compliance LGPD."
---

# Folder Médico Oftalmológico — Gerador de Panfletos para Congressos

## Propósito
Criar materiais gráficos profissionais (folders, panfletos, posters) para congressos de oftalmologia. O output é HTML premium, responsivo e print-ready (A4), com estética de nível editorial.

## Princípios de Design

### 1. Paleta de Cores Médica Premium
```
--azul-petroleo:  #0A1628    /* Fundo principal */
--azul-medio:     #1B3A5C    /* Headers secundários */
--dourado:        #D4A843    /* Acentos, highlights, bordas */
--dourado-claro:  #F0D78C    /* Gradientes, hover states */
--branco:         #FFFFFF    /* Texto sobre fundo escuro */
--cinza-claro:    #F5F5F7    /* Fundos de seções alternadas */
--verde-clinico:  #2ECC71    /* Resultados positivos, melhorias */
--vermelho-alerta:#E74C3C    /* Valores pré-operatórios, alertas */
--azul-highlight: #3498DB    /* Links, CTAs, dados intermediários */
```

### 2. Tipografia
- **Títulos:** Outfit (700, 800) — moderno, autoritativo
- **Corpo:** Inter (400, 500) — legibilidade máxima
- **Dados numéricos:** JetBrains Mono ou Fira Code — tabelas, valores D
- **Fallback:** system-ui, -apple-system, sans-serif

### 3. Layout A4 Print-Ready
```css
@media print {
  @page { size: A4; margin: 12mm; }
  .page-break { page-break-after: always; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
```

### 4. Responsividade
- Desktop: visualização side-by-side das páginas
- Mobile: scroll vertical
- Print: páginas A4 perfeitas

## Compliance Médico

### Anonimização (LGPD/HIPAA)
- **NUNCA** incluir nomes de pacientes no material final
- Substituir por "Paciente 1", "Caso A", etc.
- Remover/blur headers de exames Pentacam com dados identificáveis
- Manter apenas os mapas topográficos/tomográficos

### Disclaimer Obrigatório
```
"Dados clínicos apresentados para fins científicos e educacionais.
Resultados individuais podem variar. Estudo aprovado pelo CEP."
```

### Referências
Incluir pelo menos 2-3 referências bibliográficas para credibilidade.

## Estrutura do Folder (4 Páginas A4)

### Página 1 — Capa
- Logo da empresa/produto (SVG inline ou alta resolução)
- Título principal (problema que resolve)
- Subtítulo com o nome do congresso
- Imagem hero (foto slit-lamp, OCT, ou Pentacam)
- Nome do investigador/apresentador
- Badge com N do estudo ("N = xxx olhos")

### Página 2 — Dados Clínicos
- Gráfico de barras SVG inline (temporal: pré → 1m → 3m → 6m → 9m)
- Tabela comparativa pré vs pós
- Highlight boxes com os achados principais
- Mini-gráficos de tendência (sparklines)
- Indicadores de significância estatística (p-value quando disponível)

### Página 3 — Casos Ilustrativos
- 1-2 casos com imagens Pentacam (Compare 2 Exams)
- Scheimpflug cross-section mostrando dispositivo in-situ
- Foto slit-lamp do olho real (anonimizada)
- Legendas técnicas concisas

### Página 4 — Conclusões
- 3-4 bullet points com conclusões-chave
- QR code para informações adicionais (opcional)
- Informações de contato do investigador
- Referências bibliográficas
- Logo do congresso (se disponível)

## Pipeline de Produção

### 1. Dados → Análise
```javascript
// Extrair dados do Excel com xlsx
const XLSX = require('xlsx');
const wb = XLSX.readFile('dados_clinicos.xlsx');
// Calcular médias, SD, deltas temporais
// Identificar onde os resultados superam a literatura
```

### 2. Imagens → Anonimização
```javascript
// Usar canvas para crop/blur headers com nomes
// Preservar apenas os mapas diagnósticos
// Converter para base64 para embed no HTML
```

### 3. Gráficos → SVG Inline
- Barras temporais: ΔKmax por período de follow-up
- Tabelas com gradiente de cor (heatmap)
- Indicadores de melhora (setas ↓ verdes para redução)

### 4. HTML → Print
- Renderizar no browser
- Verificar paginação A4
- Exportar via Ctrl+P → PDF

## Variações de Estilo

### Estilo A — "Elegante Escuro"
- Fundo azul-petróleo dominante
- Texto branco/dourado
- Gradientes sutis
- Bordas douradas finas
- Aspecto premium, noturno

### Estilo B — "Clínico Luminoso"
- Fundo branco/cinza claro
- Headers em azul médio
- Acentos em dourado
- Gráficos coloridos sobre fundo claro
- Aspecto científico, clean

### Estilo C — "Impacto Visual"
- Hero image full-bleed na capa
- Gradiente escuro→transparente sobre imagem
- Cards com glassmorphism
- Dados em destaque grande
- Micro-animações ao imprimir desativadas

## Congressos Suportados
- **BRASCRS** (BR) — Brasileiro de Cirurgia Refrativa e Catarata
- **CBO** (BR) — Conselho Brasileiro de Oftalmologia
- **ARVO** (EUA) — Association for Research in Vision and Ophthalmology
- **ESCRS** (EU) — European Society of Cataract and Refractive Surgeons
- **AAO** (EUA) — American Academy of Ophthalmology
- **WOC** — World Ophthalmology Congress

## Checklist de Qualidade
- [ ] Todos os valores numéricos conferem com a planilha original
- [ ] Nenhum nome de paciente visível em nenhuma imagem
- [ ] Logo da empresa em alta resolução
- [ ] Disclaimer presente
- [ ] Referências formatadas corretamente
- [ ] Print A4 sem cortes
- [ ] Contraste WCAG AA para leitura
- [ ] Gráficos legíveis em impressão P&B
