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
    workspace = os.path.dirname(os.path.abspath(__file__))
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
            
            # Report file size and estimated duration
            if os.path.exists(output_path):
                size_mb = os.path.getsize(output_path) / (1024 * 1024)
                est_min = size_mb / 0.94  # ~0.94 MB/min for 128kbps MP3
                print(f"Successfully generated: {output_path}")
                print(f"  Size: {size_mb:.2f} MB | Estimated duration: ~{est_min:.1f} min")
        except Exception as e:
            print(f"Failed to generate Chapter {cap_num}: {e}")

    print("\n" + "=" * 60)
    print("AUDIO GENERATION COMPLETE")
    total_size = 0
    for i in range(1, 16):
        path = os.path.join(output_dir, f"capitulo_{i:02d}.mp3")
        if os.path.exists(path):
            total_size += os.path.getsize(path)
    print(f"Total audio size: {total_size / (1024*1024):.1f} MB")
    print(f"Estimated total duration: ~{total_size / (1024*1024) / 0.94:.0f} min")
    print("=" * 60)

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
