import os
import sys
import asyncio
import subprocess

async def generate_with_library(text, output_file):
    import edge_tts
    communicate = edge_tts.Communicate(text, "pt-BR-AntonioNeural", rate="+0%")
    await communicate.save(output_file)

def generate_with_cli(text_file, output_file):
    # Call edge-tts CLI tool as fallback
    cmd = [
        "edge-tts",
        "--file", text_file,
        "--write-media", output_file,
        "--voice", "pt-BR-AntonioNeural",
        "--rate", "+0%"
    ]
    print(f"Running CLI command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"CLI Error: {result.stderr}")

async def main():
    workspace = r"d:\Antigravity\Aulas vetores corneanos"
    scripts_dir = os.path.join(workspace, "audiobook_scripts")
    output_dir = os.path.join(workspace, "capitulos_audio_pt")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")
        
    has_library = False
    try:
        import edge_tts
        has_library = True
        print("Successfully imported 'edge_tts' library. Using programmatic API.")
    except ImportError:
        print("'edge_tts' library not found. Will attempt to use command-line fallback.")

    for i in range(1, 16):
        cap_num = f"{i:02d}"
        script_file_name = f"script_audio_cap{cap_num}.txt"
        script_path = os.path.join(scripts_dir, script_file_name)
        output_file_name = f"capitulo_{cap_num}.mp3"
        output_path = os.path.join(output_dir, output_file_name)
        
        if not os.path.exists(script_path):
            print(f"Error: Script file not found: {script_path}")
            continue
            
        print(f"\nProcessing Chapter {cap_num}...")
        
        # Read text content
        with open(script_path, "r", encoding="utf-8") as f:
            text = f.read().strip()
            
        if not text:
            print(f"Warning: Script {script_file_name} is empty, skipping.")
            continue
            
        try:
            if has_library:
                await generate_with_library(text, output_path)
            else:
                generate_with_cli(script_path, output_path)
            print(f"Successfully generated: {output_path}")
        except Exception as e:
            print(f"Failed to generate Chapter {cap_num}: {e}")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
