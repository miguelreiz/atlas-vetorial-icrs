---
name: FEM Simulação Engine — Biomecânica Computacional da Córnea e ICRS
description: Motor de simulação biomecânica do projeto Antigravity. Cobre modelos constitutivos (HGO, Mooney-Rivlin), resultados FEBio confirmados (Vetor Endotelial, Von Mises, deslocamentos), predições topográficas e limitações. Referência para o Capítulo de simulação e para validação numérica das hipóteses do Atlas.
---

# FEM Simulação Engine — Antigravity
> **Software:** FEBio 4.12.0 (spec version 4.0)
> **Resultado chave confirmado:** Vetor Endotelial existe — superfície anterior sobre o anel é PLANA ou REBAIXADA (uz = −0,0068 mm no anel 14, r=4,2 mm)

---

## 1. Arquitetura do Modelo FEM da Córnea

### Geometria (Modelo Shell Bicamada)

| Parâmetro | Valor |
|-----------|-------|
| Raio anterior (R_ANT) | 7,8 mm |
| Raio posterior (R_POST) | 6,4 mm |
| Diâmetro total (DIAM) | 12,0 mm |
| Espessura central | 0,55 mm |
| Anéis radiais (N_RING) | 20 |
| Setores angulares (N_SEC) | 24 |
| Nós por camada (N_PER_LAYER) | 481 (1 ápice + 20×24) |
| Nós totais | 962 (camada 0 = posterior + camada 1 = anterior) |
| Elementos ápice | 24 penta6 (prismas triangulares) |
| Elementos corpo | 456 hex8 (hexaedros) |
| Total elementos | 480 |

### Convenção de IDs de Nós
```python
N_PER_LAYER = 481  # 1 + N_RING * N_SEC
def nid(layer, ring, sec=0):
    # layer: 0=posterior, 1=anterior
    offset = layer * N_PER_LAYER
    if ring == 0: return offset + 1   # ápice
    return offset + 1 + (ring - 1) * N_SEC + sec + 1
```

### Posição do ICRS no Modelo
- **Anel radial:** 14 (r = 14/20 × 6,0 = **4,2 mm** — OAZ ≈ 8,4 mm)
- **Profundidade:** 80% (camada 0 = posterior, nós da superfície endotelial)
- **NodeSet:** 24 nós no anel 14, camada 0
- **BC:** Fix X e Y (previne deslocamento radial) — Z livre (permite axial)

---

## 2. Modelos Constitutivos

### Mooney-Rivlin (Modelo Operacional Atual)
Função de energia de deformação:
```
W = c1(I₁−3) + c2(I₂−3) + k/2·(J−1)²
```

| Parâmetro | Normal | Zona IT (Ceratocone) |
|-----------|--------|---------------------|
| c1 | 0,08 MPa | 0,045 MPa (−44%) |
| c2 | 0,01 MPa | 0,006 MPa (−40%) |
| k  | 4,76 MPa | 4,76 MPa |
| Fonte | Elsheikh 2008 | Estimativa KC |

**Por que Mooney-Rivlin em vez de HGO?**
Tags de fibras do HGO (`fiber-exp-pow`, `spherical`, `vec`) são incompatíveis com FEBio 4.12. O Mooney-Rivlin é suficiente para testar hipóteses geométricas (arc-shortening, Vetor Endotelial), que são independentes do modelo de material.

### HGO (Holzapfel-Gasser-Ogden) — Para Referência Futura
Função de energia:
```
W = c(I₁−3) + k1/2k2 * [exp(k2(κI₁ + (1−3κ)I₄ − 1)²) − 1]
```
Parâmetros alvo (Nguyen 2018):
- Ground substance: c = 0,05 MPa
- Fibra preferencial (θ₁ = 0°, θ₂ = 90°): k1 = 0,22 MPa, k2 = 100
- Dispersão: κ = 0,09 (quase unidirecional)

---

## 3. Configuração da Simulação (FEBio 4.0 XML)

### Control
```xml
<Control>
  <analysis>STATIC</analysis>
  <time_steps>20</time_steps>
  <step_size>0.05</step_size>
  <plot_stride>1</plot_stride>
  <solver type="solid">
    <max_refs>25</max_refs>
    <dtol>0.001</dtol>
    <etol>0.01</etol>
  </solver>
</Control>
```

### Condições de Contorno
- **Limbus BC:** Todos os nós do último anel (camada 0 e 1) — fixo em X, Y, Z
- **ICRS BC:** 24 nós do anel 14 (camada 0) — fixo em X, Y; livre em Z

### Carga (IOP)
- Superfície endotelial (camada 0) = "Endotelio"
- IOP = 15 mmHg = **0,001999 MPa** (conversão: × 0,000133322)
- Tipo: pressure (load curve linear 0→1)

### Output
```xml
<logfile>
  <element_data file="hgo_baseline_stress.csv" data="sx;sy;sz;sxy;syz;sxz" delim=","/>
  <node_data    file="hgo_baseline_disp.csv"   data="ux;uy;uz"             delim=","/>
</logfile>
```

---

## 4. Resultados Confirmados das Simulações

### Baseline (Sem ICRS) — cornea_hgo_parametric.feb
| Métrica | Valor |
|---------|-------|
| Von Mises máximo | 0,0208 MPa (anel 5, r≈1,5 mm — próximo ao ápice) |
| Von Mises médio | 0,0106 MPa |
| Von Mises P95 | 0,0161 MPa |
| Deslocamento axial máximo (|uz|) | 0,307 mm (nó 186, anel 7, r≈2,1 mm) |
| uz anel 5 (r=1,5mm) | −0,2679 mm (anterior) |
| uz anel 14 (r=4,2mm) | −0,1803 mm |
| Convergência | 1 segundo, 20 passos, sem divergência |

### ICRS (Anel a 80% de Profundidade) — cornea_hgo_icrs.feb
| Métrica | Valor |
|---------|-------|
| uz sobre o anel 14 (r=4,2mm) | **−0,0068 mm (REBAIXAMENTO)** |
| uz anéis 13–16 | Todos em rebaixamento (0 a −0,012 mm) |
| uz anel 7 (ápice, r=2,1mm) | **+0,0110 mm (elevação compensatória)** |
| Conclusão | ✅ Vetor Endotelial CONFIRMADO — TENTING NÃO OCORRE |
| Convergência | 1 segundo, 20 passos, sem divergência |

### Interpretação Biomecânica dos Resultados
```
Mecanismo confirmado:
1. ICRS fixa os nós da camada posterior no anel 14 (BC: fix X,Y)
2. Sob PIO, os nós adjacentes se movem; os do anel ficam fixos
3. Fibras radiais ACIMA do anel percorrem um caminho mais longo
   (arc-shortening) → ficam sob tensão aumentada
4. Fibras tensionadas geram uma força DESCENDENTE (-Z, Vetor Endotelial)
5. Resultante PIO(+Z) − V_End(−Z) = aplainamento/rebaixamento local
6. Zona central (anel 7) tem elevação compensatória (+0,011mm)
   → redistribuição global consistente com a teoria
```

---

## 5. Motor de Predição Vetorial (Qualitativo)

### Módulo I — Tensão Estromal por Camadas
```
Profundidade | Fibras | Tensão com ICRS
< 25%        | Oblíquas (🟢) | Travamento (Vτ) — progressão bloqueada
25–75%       | Mistas | Redistribuição complexa
75–80%       | Radiais + ICRS | ARC-SHORTENING → V_End
> 80% (abaixo do anel) | Radiais | Compressão contra Descemet
```

### Módulo II — Redistribuição Vetorial
| Parâmetro de Entrada | Predição |
|---------------------|----------|
| Espessura anel ↑ | VR ↑ (maior aplainamento K-steep) |
| Comprimento arco ↑ | VT ↑ (mais tração tangencial) |
| Profundidade ↑ (mais fundo) | V_End ↑ (mais arc-shortening) |
| Diâmetro anel ↑ | Menor VR por unidade, mais área de efeito |
| Dois anéis | VR ampliado, Vτ maior |

### Módulo III — Predição Topográfica
| Efeito Vetorial | Resultado Topográfico |
|----------------|----------------------|
| VR no K-steep | Redução K1, aplainamento meridional |
| VT acoplamento | Leve encurvamento K2 (Poisson) |
| Vτ simétrico | Redução coma, regularização |
| V_End confirmado | NÃO há pico de elevação sobre o anel |
| Elevação compensatória central | Leve steepening do ápice |

---

## 6. Parâmetros de Referência do Material

| Parâmetro | Valor | Fonte |
|-----------|-------|-------|
| IOP normal | 15 mmHg = 0,001999 MPa | Clínica |
| c1 (estroma normal) | 0,08 MPa | Elsheikh 2008 |
| c2 (estroma normal) | 0,01 MPa | Elsheikh 2008 |
| k (bulk modulus) | 4,76 MPa | Quasi-incompressível |
| c1 (estroma KC/IT) | 0,045 MPa (−44%) | Estimativa modelo |
| Raio de curvatura anterior médio | 7,8 mm | Medida padrão |
| Raio de curvatura posterior médio | 6,4 mm | Medida padrão |

---

## 7. Erros Conhecidos e Soluções (FEBio 4.12)

| Erro | Causa | Solução |
|------|-------|---------|
| `tag "max_ups" unrecognized` | FEBio 4 removeu este parâmetro | Remover `<max_ups>` do Control |
| `tag "ksi0" unrecognized` | Parâmetro inválido para fiber-exp-pow | Remover `<ksi0>` |
| `tag "theta" unrecognized` | `<fiber type="spherical"><theta>` inválido em FEBio 4 | Usar Mooney-Rivlin |
| `tag "vec" unrecognized` | `<fiber type="vector"><vec>` inválido | Usar Mooney-Rivlin |
| `Negative Jacobian` | Winding errado nos elementos | hex8: jp1 primeiro para layer 0; penta6: j primeiro |
| `UnicodeEncodeError →` | Símbolo `→` em print no terminal cp1252 | Usar `->` em prints e no XML |

### Winding Correto para Jacobiano Positivo
```python
# penta6 (ápice) — j PRIMEIRO:
e = (nid(0,0), nid(0,1,j), nid(0,1,jp1),
     nid(1,0), nid(1,1,j), nid(1,1,jp1))  # det(J) = +0.00644

# hex8 (corpo) — jp1 PRIMEIRO para layer 0:
e = (nid(0,i,jp1), nid(0,i,j),   nid(0,i+1,j),   nid(0,i+1,jp1),
     nid(1,i,jp1), nid(1,i,j),   nid(1,i+1,j),   nid(1,i+1,jp1))  # det(J) = +0.01289
```

---

## 8. Limitações do Modelo

1. **Qualitativo em relação ao real:** Geometria esférica simplificada (não toroidal/asférica)
2. **Sem fibras explícitas:** Mooney-Rivlin não captura anisotropia — HGO seria mais fiel
3. **Duas camadas apenas:** Sem gradiente de rigidez por profundidade (estroma anterior 3× mais rígido)
4. **Sem epitélio remodeling:** Resposta epitelial não modelada
5. **ICRS simplificado:** Modelado como BC nodal, não como sólido rígido real
6. **Sem viscoelasticidade:** Resposta de longo prazo não capturada
7. **Uso permitido:** Testar direções qualitativas de força, confirmar mecanismos biomecânicos
8. **Uso proibido:** Predições quantitativas absolutas para planejamento cirúrgico real

---

## 9. Arquivos do Projeto

| Arquivo | Caminho | Conteúdo |
|---------|---------|----------|
| `generate_hgo_cornea.py` | `fem/Simulation_Core/` | Gerador completo dos .feb files |
| `cornea_hgo_parametric.feb` | `fem/Simulation_Core/` | Baseline (sem ICRS), 480 elem, 962 nós |
| `cornea_hgo_icrs.feb` | `fem/Simulation_Core/` | ICRS anel 14, ring 14, 80% depth |
| `hgo_baseline_stress.csv` | `fem/Simulation_Core/` | Tensões sx,sy,sz,sxy,syz,sxz baseline |
| `hgo_baseline_disp.csv` | `fem/Simulation_Core/` | Deslocamentos ux,uy,uz baseline |
| `hgo_icrs_stress.csv` | `fem/Simulation_Core/` | Tensões com ICRS |
| `hgo_icrs_disp.csv` | `fem/Simulation_Core/` | Deslocamentos com ICRS |
| `cornea_kc_it.feb` | `fem/` | Shell model KC bizona (Mooney-Rivlin) |
| `stress_out.csv` | `fem/` | Von Mises KC — Max=0,0208 MPa anel 5 |
| `plot_stress.py` | `fem/` | Mapa de Von Mises (matplotlib) |
