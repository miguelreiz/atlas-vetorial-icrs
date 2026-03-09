# MISSÃO FEBIO AVANÇADA PARA O CLAUDE CODE (HIPÓTESE DO VETOR ENDOTELIAL)

Caro Engenheiro Numérico (Claude), 

Nosso autor (o Cirurgião) levantou uma hipótese biomecânica brilhante que desafia o dogma clássico e precisamos testá-la rigorosamente no modelo **HGO (Holzapfel-Gasser-Ogden)** no FEBio.

## O Problema Clínico:
Muitas ilustrações clássicas mostram um efeito de "tenting" (elevação) da superfície anterior da córnea diretamente sobre o anel ICRS, assumindo que o implante "empurra" o tecido para cima.
No entanto, o cirurgião hipotetiza que ocorre o oposto: **um aplainamento ou leve rebaixamento diretamente sobre o anel**.

## A Hipótese Biomecânica a Testar:
Como o anel é implantado a **80% da profundidade estromal (profundo)**, as fibras radiais densas que passam *acima* dele são forçadas a fazer um desvio (arc-shortening). 
Ao serem esticadas em ambos os lados do anel, essas fibras geram um vetor de força tracionando no **sentido endotelial (para baixo)**. Este vetor vetorial descendente atua de forma contraposta à Pressão Intraocular (PIO) ascendente. O resultado (resultante) seria um leve rebaixamento ou aplainamento da superfície epitelial naquele ponto específico.

## Sua Missão (O que rodar no Terminal):
1. Use (ou adapte) o `cornea_hgo_parametric.feb` para incluir um anel sólido rígido (ICRS) no estroma profundo (80% da espessura).
2. Adicione a tag `<logfile>` no XML para extrair o deslocamento nodal (Z-displacement) da superfície anterior especificamente *sobre* o anel vs *ao redor* do anel.
3. Rode a simulação.
4. **Responda diretamente ao usuário relatando se o modelo provou matematicamente a hipótese dele:** A superfície anterior sobre o anel apresenta elevação (tenting isolado) ou achatamento compensatório devido ao vetor endotelial das fibras tensionadas vs PIO?

Pode proceder com a modificação do arquivo e iniciar a simulação HGO. Avise o usuário com os achados numéricos da superfície logo em seguida!
