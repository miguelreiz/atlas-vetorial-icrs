import os
import asyncio

async def generate_audio():
    import edge_tts
    script_path = "apresentacao/script_fala_20min.md"
    output_path = "apresentacao/audio_aula_20min.mp3"
    
    print(f"Lendo o script de: {script_path}")
    with open(script_path, "r", encoding="utf-8") as f:
        # Lê o conteúdo e remove algumas marcações de markdown e notas para não serem lidas
        lines = f.readlines()
        
    text_to_read = []
    for line in lines:
        line = line.strip()
        # Ignorar comentários ou marcações
        if line.startswith("#") or line.startswith(">") or line.startswith("---") or line.startswith("|") or "Resumo de Timing" in line:
            continue
        if not line:
            continue
        # Limpar marcações de pausa ou de ação
        line = line.replace("[PAUSA — clicar para Slide", "")
        line = line.replace("[PAUSA para o impacto]", "")
        line = line.replace("[PAUSA]", "")
        line = line.replace("[APONTAR setas azuis para cima]", "")
        line = line.replace("[APONTAR seta azul central para baixo]", "")
        line = line.replace("[APONTAR]", "")
        line = line.replace("[FIM — 20 minutos]", "")
        line = line.replace("]", "")
        line = line.replace("**", "")
        
        if line.strip():
            text_to_read.append(line.strip())
            
    final_text = "\n".join(text_to_read)
    
    print(f"Gerando áudio com a voz pt-BR-AntonioNeural...")
    communicate = edge_tts.Communicate(final_text, "pt-BR-AntonioNeural", rate="+0%")
    await communicate.save(output_path)
    
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Áudio gerado com sucesso: {output_path}")
    print(f"Tamanho: {size_mb:.2f} MB")

if __name__ == "__main__":
    asyncio.run(generate_audio())
