---
name: Livro Vivo QR — Sistema de Publicação Dinâmica com Atualização Contínua
description: Framework para transformar o Atlas Vetorial ICRS num livro dinâmico com QR codes por capítulo. Define o que vai para versão impressa (estável) vs. digital (atualizada), gera estrutura de links canônicos, mantém changelog biomecânico e posiciona o Atlas como o primeiro atlas médico brasileiro com sistema de atualização contínua embutido.
---

# Livro Vivo QR — Antigravity
> **Conceito:** O livro impresso é o mapa; o QR é o GPS em tempo real.
> **Posicionamento:** Primeiro atlas médico brasileiro com sistema de atualização científica contínua integrado ao impresso.

---

## 1. Filosofia do Livro Vivo

### O Problema dos Atlas Médicos Tradicionais
- Um atlas impresso fica desatualizado em 2–3 anos
- Novas evidências surgem mas o leitor não sabe
- O leitor não sabe se a hipótese que leu foi confirmada ou refutada
- Edições revisadas demoram 5–7 anos para chegar

### A Solução do Antigravity
```
VERSÃO IMPRESSA (permanente):
  ✅ Fundamentos anatômicos e biomecânicos (não mudam)
  ✅ O sistema vetorial (VR, VT, Vτ, VComa, V_End)
  ✅ Casos clínicos históricos
  ✅ Nomogramas base
  ✅ ISBN e registro autoral

QR CODE POR CAPÍTULO/SEÇÃO (dinâmico):
  🔄 Novas evidências confirmando hipóteses do autor
  🔄 Estudos clínicos publicados após a impressão
  🔄 Vídeos cirúrgicos demonstrativos
  🔄 Simulações FEM atualizadas
  🔄 Errata e correções
  🔄 Casos clínicos novos
```

---

## 2. Estrutura de QR Codes por Capítulo

### Tabela de QR Codes Planejados

| # | Local no Livro | Conteúdo Digital | Tipo |
|---|---------------|-----------------|------|
| QR-000 | Prefácio | Vídeo-mensagem do autor + atualizações gerais | Video + Changelog |
| QR-001a | CH-001 — Fibras | Animação 3D WAXS das fibras corneanas | Animação |
| QR-001b | CH-001 — Espessura | Paquimetria setorial interativa (normal vs KC) | Ferramenta |
| QR-002 | CH-002 — FEM | Simulação FEBio animada (V_End confirmado) | Simulação |
| QR-003 | CH-003 — Classificação | Plácido interativo: fenótipo × resultado | Ferramenta |
| QR-004 | CH-004 — VR | Vídeo: VR em câmera lenta (simulação) | Video |
| QR-005 | CH-005 — VT | Animação: extremidades do anel em ação | Animação |
| QR-008 | CH-008 — LDM | Calculadora LDM online | Ferramenta |
| QR-010 | CH-010 — ICE | Calculadora ICE online (input dados → ICE) | Ferramenta |
| QR-011 | CH-011 — Nomogramas | Nomograma engine digital (esta skill!) | Ferramenta |
| QR-012 | CH-012 — Casos | Banco de casos atualizado (além dos 4 do livro) | Banco de casos |
| QR-REF | Referências | Lista de referências atualizada + novas publicações | Referências |
| QR-ERR | Contra-capa | Errata e atualizações críticas | Errata |

---

## 3. Changelog Biomecânico — Registro de Atualizações

O QR-000 (Prefácio) aponta para esta página:

```markdown
# CHANGELOG DO ATLAS VETORIAL ICRS

## Versão do Livro Impresso: 1.0 (data de impressão)

---

### UPDATE 2025 — VETOR ENDOTELIAL CONFIRMADO POR FEM ✅
**Hipótese original:** CH-004 apresentou o V_End como hipótese do autor (💡)
**Confirmação:** FEBio 4.12 (Mooney-Rivlin, IOP=15mmHg, N=480 elementos)
**Resultado:** uz = −0,0068 mm (rebaixamento) sobre o anel — TENTING NÃO OCORRE
**Status:** 💡 → ✅ Confirmado numericamente
**Referência:** Antigravity FEM Study, 2025 (capítulo de simulação)
**Impacto no livro:** Validação quantitativa do mecanismo descrito em CH-004

---

### [PRÓXIMAS ATUALIZAÇÕES — A PREENCHER]
**ICE — Validação Prospectiva:** Estudo em andamento
**Hipótese Escudo CXL:** Protocolo piloto em planejamento
**Novos fabricantes de anéis:** A monitorar
```

---

## 4. Especificações Técnicas dos QR Codes

### Geração dos QR Codes
```
Ferramenta recomendada: QR Code Generator (qr-code-generator.com) ou Python qrcode lib
Formato: SVG (vetorial — não pixeliza no impresso)
Tamanho mínimo impresso: 2,5cm × 2,5cm
Nível de correção de erro: H (30% — máxima tolerância a danos físicos)
URL estrutura: https://antigravity.icrs/cap/[N]/[subtópico]
```

### Python — Gerar QR Code para um Capítulo
```python
import qrcode
import qrcode.image.svg

# Instalar: pip install qrcode[pil] qrcode[svg]

cap_urls = {
    'CH-000': 'https://antigravity.icrs/prefacio',
    'CH-001': 'https://antigravity.icrs/anatomia',
    'CH-002': 'https://antigravity.icrs/biomecanica',
    'CH-004': 'https://antigravity.icrs/vr',
    'CH-005': 'https://antigravity.icrs/vt',
    'CH-010': 'https://antigravity.icrs/ice-calculator',
    'CH-011': 'https://antigravity.icrs/nomograma',
    'CH-012': 'https://antigravity.icrs/casos',
}

for cap, url in cap_urls.items():
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,
                       box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', back_color='white')
    img.save(f'qrcodes/QR_{cap}.png')
    print(f'QR gerado: QR_{cap}.png → {url}')
```

---

## 5. Posicionamento Editorial

### No Livro Impresso
- Cada QR code aparece na **margem externa** da página, ao lado do conteúdo relacionado
- Caption abaixo do QR: *"Acesse conteúdo atualizado: [url abreviada]"*
- Ícone QR com texto: *"Livro Vivo — conteúdo digital integrado"*

### Na Capa
- Texto: *"Atlas Vetorial ICRS — com sistema de atualização contínua integrado"*
- Logo "Livro Vivo" (a criar)
- Destaque: *"Primeiro atlas médico brasileiro com QR codes de atualização científica"*

### Na Contra-capa
- QR principal (QR-ERR) com mensagem: *"Antes de usar as informações deste livro, verifique se há atualizações críticas neste QR"*

---

## 6. Plataforma Digital Mínima Necessária

### Opção Simples (GitHub Pages — gratuito)
```
Repositório: github.com/miguelreiz/atlas-vetorial-icrs
Pasta: /docs/livro-vivo/
Arquivos:
  /docs/livro-vivo/index.html       → página inicial
  /docs/livro-vivo/cap/CH-000.md    → changelog + vídeo prefácio
  /docs/livro-vivo/cap/CH-004.md    → V_End confirmado + FEM
  /docs/livro-vivo/cap/CH-010.md    → calculadora ICE
  /docs/livro-vivo/cap/CH-011.md    → nomograma engine
  /docs/livro-vivo/errata.md        → errata pública
URL final: https://miguelreiz.github.io/atlas-vetorial-icrs/cap/CH-000
```

### Opção Avançada (Domínio próprio)
```
Domínio: atlasvetorialicrs.com.br
Hospedagem: Vercel ou Netlify (gratuito para projetos pequenos)
Integração: GitHub → Vercel auto-deploy a cada push
```

---

## 7. Roadmap de Implementação

| Fase | Tarefa | Quando |
|------|--------|--------|
| 1 | Definir URLs canônicas de todos os capítulos | Antes da impressão |
| 2 | Gerar QR codes SVG para todos os capítulos | Antes da impressão |
| 3 | Criar repositório GitHub Pages com páginas mínimas | Antes da impressão |
| 4 | Inserir QR codes no arquivo do livro (InDesign/Word) | Layout final |
| 5 | Publicar calculadora ICE online | Pós-impressão M+1 |
| 6 | Publicar nomograma engine online | Pós-impressão M+3 |
| 7 | Publicar banco de casos digital | Pós-impressão M+6 |
| 8 | Primeira atualização do changelog | Quando nova evidência surgir |
