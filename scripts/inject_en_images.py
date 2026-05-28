import os
import re
import glob

pt_dir = "capitulos_pt"
en_dir = "capitulos"

pt_files = sorted(glob.glob(os.path.join(pt_dir, "*.md")))

def translate_caption(caption):
    # Simple hardcoded translations for the captions
    c = caption.replace("Figura", "Figure")
    c = c.replace("—", "-")
    return c

for pt_path in pt_files:
    filename = os.path.basename(pt_path)
    en_path = os.path.join(en_dir, filename)
    
    if not os.path.exists(en_path):
        continue
        
    with open(pt_path, "r", encoding="utf-8") as f:
        pt_lines = f.readlines()
        
    with open(en_path, "r", encoding="utf-8") as f:
        en_lines = f.readlines()
        
    # Extract images and their "heading context" from PT
    images_to_insert = []
    current_heading_index = 0
    pt_heading_count = 0
    
    for line in pt_lines:
        if line.startswith("#"):
            pt_heading_count += 1
        elif line.startswith("!["):
            m = re.match(r"^!\[(.*?)\]\((.*?)\)", line.strip())
            if m:
                caption = m.group(1)
                img_path = m.group(2)
                images_to_insert.append({
                    "heading_idx": pt_heading_count,
                    "caption": translate_caption(caption),
                    "path": img_path
                })
                
    if not images_to_insert:
        continue
        
    # Now insert into EN lines
    new_en_lines = []
    en_heading_count = 0
    img_idx = 0
    
    for line in en_lines:
        new_en_lines.append(line)
        if line.startswith("#"):
            en_heading_count += 1
            # Check if any images belong to this heading (we insert them right after the heading for simplicity)
            while img_idx < len(images_to_insert) and images_to_insert[img_idx]["heading_idx"] == en_heading_count:
                img = images_to_insert[img_idx]
                new_en_lines.append(f"\n![{img['caption']}]({img['path']})\n\n")
                img_idx += 1

    # If any images are left (e.g., heading count mismatch), append to end
    while img_idx < len(images_to_insert):
        img = images_to_insert[img_idx]
        new_en_lines.append(f"\n![{img['caption']}]({img['path']})\n\n")
        img_idx += 1
        
    with open(en_path, "w", encoding="utf-8") as f:
        f.writelines(new_en_lines)
        
    print(f"Injected {len(images_to_insert)} images into {filename}")
