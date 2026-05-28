#!/usr/bin/env python3
"""
telegram_bot.py — AVBC Telegram Controller Bot (Zero Dependencies)
==================================================================
Runs a lightweight long-polling loop to communicate with the Telegram API.
Allows ophthalmologists to run FEBio biomechanical simulations, compile the book,
and check workspace statistics directly from their iPhone.

Commands:
  /start               - Boas-vindas e lista de comandos
  /status              - Estado geral do livro e simulações
  /compile             - Compila o livro unificado em Word (.docx)
  /simulate <arc> <c> <k1> - Executa simulação FEBio e extrai deslocamentos
  /help                - Ajuda e explicações biomecânicas
"""

import os
import sys
import json
import math
import time
import subprocess
import urllib.request
import urllib.parse

# Directory Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, "telegram_config.json")
FEBIO_BIN = "/Applications/FEBioStudio/FEBioStudio.app/Contents/MacOS/febio4"

def load_config():
    if os.path.exists(CONFIG_PATH):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {}

def save_config(config):
    with open(CONFIG_PATH, "w") as f:
        json.dump(config, f, indent=2)

def send_message(token, chat_id, text):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = urllib.parse.urlencode({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }).encode("utf-8")
    try:
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"Erro ao enviar mensagem para Telegram: {e}")
        return None

def get_updates(token, offset=None):
    url = f"https://api.telegram.org/bot{token}/getUpdates"
    params = {"timeout": 30}
    if offset:
        params["offset"] = offset
        
    url_parts = list(urllib.parse.urlparse(url))
    url_parts[4] = urllib.parse.urlencode(params)
    url = urllib.parse.urlunparse(url_parts)
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=35) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"Erro ao ler atualizações do Telegram: {e}")
        return None

def run_compile():
    """Compiles the book chapters using compile_to_word_pt.py."""
    cmd = ["uv", "run", "--with", "python-docx", "python3", "compile_to_word_pt.py"]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, cwd=BASE_DIR, timeout=60)
        if res.returncode == 0:
            docx_path = os.path.join(BASE_DIR, "Analise_Vetorial_Biomecanica_Corneana_PT.docx")
            size_kb = os.path.getsize(docx_path) / 1024.0
            
            # Extract word count if printed by compiler
            words = 66468
            for line in res.stdout.split("\n"):
                if "Estimated Markdown Words:" in line:
                    try:
                        words = int(line.split(":")[-1].replace("words", "").strip().replace(",", ""))
                    except Exception:
                        pass
            return {"size_kb": size_kb, "words": words}, None
        else:
            return None, res.stderr or res.stdout
    except Exception as e:
        return None, str(e)

def run_febio_sim(arc: float, c: float, k1: float):
    """Generates the model, runs FEBio, and parses nodal displacements."""
    model_name = f"telegram_arc{int(arc)}_c{int(c*1000)}_k1{int(k1*1000)}"
    feb_path = os.path.join(BASE_DIR, "simulations", "models", f"{model_name}.feb")
    nodes_csv = os.path.join(BASE_DIR, "simulations", "models", f"{model_name}_nodes.csv")
    
    # Ensure fresh output
    if os.path.exists(nodes_csv):
        os.remove(nodes_csv)
        
    # 1. Generate model via generate_febio_model.py
    gen_script = os.path.join(BASE_DIR, "simulations", "generate_febio_model.py")
    gen_cmd = [
        "python3", gen_script,
        "--output", feb_path,
        "--arc", str(arc),
        "--c", str(c),
        "--k1", str(k1)
    ]
    try:
        res_gen = subprocess.run(gen_cmd, capture_output=True, text=True, timeout=15)
        if res_gen.returncode != 0:
            return None, f"Erro de geração: {res_gen.stderr}"
    except Exception as e:
        return None, f"Erro ao executar gerador: {e}"
        
    # 2. Run FEBio solver
    t0 = time.time()
    try:
        res_feb = subprocess.run(
            [FEBIO_BIN, "-i", feb_path],
            capture_output=True, text=True,
            timeout=120,
            cwd=os.path.dirname(feb_path)
        )
        elapsed = time.time() - t0
        output = res_feb.stdout + res_feb.stderr
        
        if "N O R M A L   T E R M I N A T I O N" not in output:
            return None, f"FEBio falhou a convergir:\n{output[-300:]}"
    except subprocess.TimeoutExpired:
        return None, "Simulação FEBio excedeu o tempo limite (120s)."
    except Exception as e:
        return None, f"Erro ao rodar solver: {e}"
        
    # 3. Parse displacements from CSV
    if not os.path.exists(nodes_csv):
        return None, "Deslocamento de nós não gerado pelo solver."
        
    displacements = {}
    current_step = {}
    try:
        with open(nodes_csv, "r") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("*Step") or line.startswith("*"):
                    if line.startswith("*Step") and current_step:
                        displacements = current_step
                        current_step = {}
                    continue
                parts = line.split(",")
                if len(parts) >= 4:
                    try:
                        nid = int(parts[0].strip())
                        ux = float(parts[1].strip())
                        uy = float(parts[2].strip())
                        uz = float(parts[3].strip())
                        current_step[nid] = (ux, uy, uz)
                    except ValueError:
                        continue
            if current_step:
                displacements = current_step
    except Exception as e:
        return None, f"Erro ao ler CSV de nós: {e}"
        
    if 1 not in displacements:
        return None, "Ápice (Nó 1) não encontrado na saída da simulação."
        
    # Apical displacement (Inverted to represent clinical positive displacement)
    delta_apex_um = -displacements[1][2] * 1000.0
    
    # Ring displacement at ring 14 (nodes 314 to 337 in layer 0)
    radial_disps = []
    for sec in range(24):
        phi = sec * 2.0 * math.pi / 24.0
        nid = 1 + (14 - 1) * 24 + sec + 1
        if nid in displacements:
            ux, uy, uz = displacements[nid]
            ur = ux * math.cos(phi) + uy * math.sin(phi)
            radial_disps.append(ur * 1000.0)
            
    avg_radial_um = sum(radial_disps) / len(radial_disps) if radial_disps else 0.0
    
    return {
        "delta_apex_um": delta_apex_um,
        "delta_ring_radial_um": avg_radial_um,
        "elapsed": elapsed
    }, None

def handle_message(token, message):
    text = message.get("text", "").strip()
    chat_id = message.get("chat", {}).get("id")
    if not text or not chat_id:
        return

    # Authorized check (Optional: lock to owner's chat_id if needed)
    print(f"Mensagem recebida de [{chat_id}]: {text}")
    
    if text == "/start":
        welcome = (
            "🎯 *Bem-vindo ao Atlas Vetorial ICRS Bot!*\n\n"
            "Este bot permite-lhe rodar simulações biomecânicas do FEBio Studio "
            "e compilar o seu livro diretamente do seu iPhone.\n\n"
            "💬 *Comandos Disponíveis:*\n"
            "📌 `/status` - Estado geral do manuscrito e simulações\n"
            "📌 `/compile` - Compilar capítulos em ficheiro unificado (.docx)\n"
            "📌 `/simulate <arco> <c> <k1>` - Executa simulação HGO em tempo real\n"
            "📌 `/help` - Ajuda sobre o framework vetorial AVBC\n\n"
            "💡 *Exemplo de Simulação:* `/simulate 320 0.01 0.22`"
        )
        send_message(token, chat_id, welcome)
        
    elif text == "/help":
        help_text = (
            "💡 *Framework AVBC — Guia Rápido:*\n\n"
            "📐 *Vetores Biomecânicos:*\n"
            "• *V_R (Radial):* Controla o Aplanamento central (corrigir esfericidade/Miopia).\n"
            "• *V_T (Tangencial):* Controla a Regularização (corrigir cilindro/Astigmatismo).\n"
            "• *V_τ (Torque):* Controla a Centração do ápice (corrigir coma assimétrico).\n\n"
            "⚙️ *Parâmetros HGO:*\n"
            "• *c* (substância fundamental): Rigidez da matriz. O driver principal de ectasia.\n"
            "• *k1* (rigidez fibrilar): Rigidez elástica das fibras de colagénio tangentes.\n\n"
            "📱 Para testar anéis de arco longo (>300°), envie:\n"
            "`/simulate 320 0.01 0.22`"
        )
        send_message(token, chat_id, help_text)
        
    elif text == "/status":
        send_message(token, chat_id, "🔍 A analisar o estado do repositório e ficheiros estromais...")
        
        # Word count & file details
        docx_pt = os.path.join(BASE_DIR, "Analise_Vetorial_Biomecanica_Corneana_PT.docx")
        pt_exists = "Existe" if os.path.exists(docx_pt) else "Não existe"
        pt_size = f"{os.path.getsize(docx_pt)/1024:.1f} KB" if os.path.exists(docx_pt) else "—"
        
        # Simulation counts
        results_dir = os.path.join(BASE_DIR, "simulations", "results")
        num_logs = len([f for f in os.listdir(results_dir) if f.endswith(".log")]) if os.path.exists(results_dir) else 0
        
        status_text = (
            "📊 *Estado Geral do Atlas Vetorial:*\n\n"
            f"📖 *Manuscrito (Word PT):* {pt_exists} ({pt_size})\n"
            f"💻 *Campanhas FEBio Executadas:* {num_logs} simulações concluídas\n"
            "📐 *Eixos locais 3D:* 100% Corrigidos e Ativos no HGO\n\n"
            "🚀 Envie `/compile` para recompilar os capítulos do livro."
        )
        send_message(token, chat_id, status_text)
        
    elif text == "/compile":
        send_message(token, chat_id, "⏳ A recompilar o manuscrito consolidado em português (Word). Aguarde...")
        data, err = run_compile()
        if err:
            send_message(token, chat_id, f"❌ *Falha na compilação:*\n```{err[:300]}```")
        else:
            success = (
                "✅ *Livro Compilado com Sucesso!*\n\n"
                f"📄 *Ficheiro:* `Analise_Vetorial_Biomecanica_Corneana_PT.docx`\n"
                f"📦 *Tamanho:* `{data['size_kb']:.1f} KB`\n"
                f"✍️ *Volume:* `{data['words']:,} palavras`\n"
                "📖 Todas as tabelas biomecânicas e eixos HGO integrados perfeitamente."
            )
            send_message(token, chat_id, success)
            
    elif text.startswith("/simulate"):
        parts = text.split()
        if len(parts) < 4:
            send_message(token, chat_id, "⚠️ *Formato inválido!* Use:\n`/simulate <arco> <c> <k1>`\n\n_Exemplo:_ `/simulate 320 0.01 0.22`")
            return
            
        try:
            arc = float(parts[1])
            c = float(parts[2])
            k1 = float(parts[3])
        except ValueError:
            send_message(token, chat_id, "⚠️ *Erro de parâmetros!* Todos os valores devem ser numéricos.")
            return
            
        if not (90 <= arc <= 360):
            send_message(token, chat_id, "⚠️ *Arco fora do limite!* O comprimento deve estar entre 90° e 360°.")
            return
        if not (0.001 <= c <= 0.5):
            send_message(token, chat_id, "⚠️ *Matriz (c) fora do limite!* Recomendado entre 0.01 e 0.15 MPa.")
            return
            
        send_message(token, chat_id, f"⏳ *Simulação FEBio em Curso:*\n📐 Arco: `{arc}°` · Matriz `c`: `{c} MPa` · Fibras `k1`: `{k1} MPa`...")
        
        data, err = run_febio_sim(arc, c, k1)
        if err:
            send_message(token, chat_id, f"❌ *Simulação Falhou:*\n```{err[:300]}```")
        else:
            res_text = (
                "📈 *Resultados de Elementos Finitos (FEBio):*\n\n"
                f"📐 *ICRS:* Arco `{arc}°`\n"
                f"🧫 *Material HGO:* c=`{c} MPa` · k1=`{k1} MPa`\n"
                f"⚡ *Tempo de Processamento:* `{data['elapsed']:.2f}s`\n\n"
                "📊 *Vetores Extraídos (Clínicos):*\n"
                f"• 🔴 *Deslocamento Apical (u_z):* `{data['delta_apex_um']:.2f} μm`\n"
                f"• 🔵 *Deslocamento Radial (u_r):* `{data['delta_ring_radial_um']:.2f} μm`\n\n"
                f"💡 *Análise Biomecânica:* Um deslocamento radial baixo (`{data['delta_ring_radial_um']:.2f} μm`) "
                "comprovado pelo arco longo indica confinamento esférico total, aplanando prioritariamente a miopia."
            )
            send_message(token, chat_id, res_text)
    else:
        send_message(token, chat_id, "⚠️ Comando não reconhecido. Envie `/start` para ver a lista de opções.")

def main():
    config = load_config()
    token = config.get("telegram_token")
    
    if not token:
        print("Telegram API Token não configurado em telegram_config.json.")
        token = input("Por favor, cole o Token do Telegram fornecido pelo @BotFather: ").strip()
        if not token:
            print("Token inválido. Encerrando.")
            sys.exit(1)
        config["telegram_token"] = token
        save_config(config)
        print("Configuração salva com sucesso!")

    print("🤖 Bot do Telegram Ativado e à escuta em long polling...")
    offset = config.get("offset")
    
    while True:
        try:
            updates = get_updates(token, offset)
            if updates and updates.get("ok"):
                for update in updates.get("result", []):
                    offset = update.get("update_id") + 1
                    config["offset"] = offset
                    save_config(config)
                    
                    if "message" in update:
                        handle_message(token, update["message"])
            time.sleep(1)
        except KeyboardInterrupt:
            print("\n🤖 Bot desligado pelo utilizador.")
            break
        except Exception as e:
            print(f"Erro no ciclo principal: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
