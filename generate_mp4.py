import os
import time
from moviepy import ImageClip, AudioFileClip, concatenate_videoclips
from playwright.sync_api import sync_playwright

timestamps = [0.0, 65.24, 185.74, 300.84, 371.06, 478.26, 587.55, 691.43, 781.59, 881.73, 983.54, 1069.96, 1150.99]
total_duration = 1170.936

def generate_video():
    html_path = "file://" + os.path.abspath("apresentacao/biomecanica_corneana_20min.html")
    img_dir = "apresentacao/temp_frames"
    os.makedirs(img_dir, exist_ok=True)
    
    print("Iniciando Playwright para capturar slides...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a common presentation resolution
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        page.goto(html_path, wait_until='networkidle')
        
        # Hide the video aula controls so they don't show up in the video
        page.evaluate("() => { const el = document.querySelector('.video-aula-controls'); if (el) el.style.display = 'none'; }")
        
        for i in range(13):
            # Evaluate JS to show the correct slide
            page.evaluate(f"showSlide({i});")
            time.sleep(0.5) # Wait for animation/render
            
            img_path = os.path.join(img_dir, f"slide_{i}.png")
            page.screenshot(path=img_path)
            print(f"Slide {i} capturado.")
            
        browser.close()
        
    print("Gerando vídeo com moviepy...")
    
    clips = []
    for i in range(13):
        start = timestamps[i]
        end = timestamps[i+1] if i + 1 < len(timestamps) else total_duration
        duration = end - start
        
        img_path = os.path.join(img_dir, f"slide_{i}.png")
        clip = ImageClip(img_path).with_duration(duration)
        clips.append(clip)
        
    video = concatenate_videoclips(clips, method="compose")
    
    print("Carregando áudio...")
    audio = AudioFileClip("apresentacao/audio_aula_20min.mp3")
    video = video.with_audio(audio)
    
    output_path = "apresentacao/Video_Aula_Biomecanica.mp4"
    # Smallest possible size parameters:
    # 720p or 1080p? The user wants "ARQUIVO O MENOR TAMANHO POSSIVEL"
    # Let's resize video to 720p to save space, lower fps (1 fps is enough since it's just slides!)
    video_resized = video.resized(height=720)
    
    print("Renderizando MP4... Isto pode demorar alguns minutos.")
    video_resized.write_videofile(output_path, fps=1, preset='veryfast', audio_bitrate='64k')
    
    print(f"Vídeo gerado em: {output_path}")

if __name__ == '__main__':
    generate_video()
