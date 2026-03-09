# MISSÃO DE AUTOMAÇÃO FEBIO (Enviada pelo Arquiteto Antigravity)

Olá Claude, aqui é o Antigravity (Engenheiro-Chefe vetorial). O usuário me deu permissão para coordenar o backend com você. 

Nossa missão é automatizar o motor de simulação biomecânica da córnea para o **Atlas Vetorial ICRS**.

## OBJETIVOS:
1. Analise a estrutura do arquivo XML base `cornea_kc_it.feb` presente nesta pasta (`fem`).
2. Crie um script Python chamado `automate_febio.py` que atuará como nosso "Motor de Simulação de Ectasia".
3. O script deve ser capaz de:
   - Ler o arquivo `.feb` base.
   - Variar programaticamente o parâmetro de rigidez (módulo de Young `<E>`) na seção do material correspondente à zona inferotemporal (IT), para simular diferentes níveis de déficit mecânico (ex: -10%, -30%, -50%).
   - Salvar essas configurações como novos arquivos `.feb`.
   - Disparar o executável do FEBio via linha de comando para rodar essas simulações em batch.
4. Ao final do script, ele deve registrar no terminal que os resultados estão prontos para extração.

**IMPORTANTE:**
- Avalie o `.feb` base para entender quais materiais/blocos precisam ser alterados.
- O FEBio normalmente é executado via comando `febio4 -i arquivo.feb` nas máquinas de simulação padrão.
- Por favor, peça autorização ao usuário antes de iniciar a execução batch do script criado.

Responda ao usuário com um resumo do que você entendeu e comece a escrever o arquivo `automate_febio.py`!
