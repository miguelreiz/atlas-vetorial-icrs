import asyncio
import edge_tts
import os

async def generate():
    print("Carregando roteiro completo (4 partes)...")
    
    parts = []
    for i in range(1, 5):
        with open(f'audiobook_completo_parte{i}.txt', 'r', encoding='utf-8') as f:
            parts.append(f.read())
    
    full_text = "\n\n".join(parts)
    
    word_count = len(full_text.split())
    est_minutes = word_count / 130
    print(f"Total de palavras no roteiro: {word_count}")
    print(f"Duração estimada: {est_minutes:.0f} minutos (a 130 palavras/minuto)")
    
    voice = "pt-BR-AntonioNeural"
    output_file = "Masterclass_Audiobook.mp3"
    
    print(f"Gerando audiobook com voz neural '{voice}'...")
    print("Aguarde alguns minutos...")
    
    communicate = edge_tts.Communicate(full_text, voice, rate="-5%")
    await communicate.save(output_file)
    
    size_mb = os.path.getsize(output_file) / (1024 * 1024)
    print(f"\nAudiobook gerado com sucesso!")
    print(f"Arquivo: {output_file}")
    print(f"Tamanho: {size_mb:.1f} MB")

asyncio.run(generate())
