import os
import re

directories = ['capitulos_pt', 'capitulos_en']

def renumber_references(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    in_references = False
    ref_counter = 1
    modified = False
    
    new_lines = []
    
    for line in lines:
        if re.match(r'^##\s+(Referências|References)', line, re.IGNORECASE):
            in_references = True
            ref_counter = 1
            new_lines.append(line)
            continue
            
        if in_references:
            # Check if line is a reference item like "14. Author..."
            match = re.match(r'^(\d+)\.\s+(.*)', line)
            if match:
                new_number = ref_counter
                rest_of_line = match.group(2)
                
                new_line = f"{new_number}. {rest_of_line}\n"
                
                if int(match.group(1)) != new_number:
                    modified = True
                    
                new_lines.append(new_line)
                ref_counter += 1
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
            
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Referências renumeradas em: {file_path}")
        return True
    return False

total_modified = 0
for d in directories:
    if os.path.exists(d):
        for filename in os.listdir(d):
            if filename.endswith('.md'):
                file_path = os.path.join(d, filename)
                if renumber_references(file_path):
                    total_modified += 1

print(f"Total de arquivos modificados: {total_modified}")
