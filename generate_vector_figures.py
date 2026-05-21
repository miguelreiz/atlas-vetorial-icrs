import os
import re

def make_figures_vectorized():
    src_script = r"D:\Projetos\Antigravity\Vetores Anel\fem\Simulation_Core\avbc_batch_output\generate_book_figures.py"
    dest_dir = r"D:\Antigravity\Aulas vetores corneanos\book_figures"
    
    if not os.path.exists(src_script):
        print(f"Source script not found at {src_script}")
        return
        
    print(f"Reading figure generator script from {src_script}...")
    with open(src_script, 'r', encoding='utf-8') as f:
        code = f.read()
        
    # Replace output directory to save directly in dest_dir
    code = code.replace("OUT = os.path.dirname(os.path.abspath(__file__))", f"OUT = r'{dest_dir}'")
    
    # Modify fig_decision_matrix to save as PNG, SVG and PDF
    old_dm_save = "fig.savefig(os.path.join(OUT, 'AVBC_decision_matrix.png'),\n                dpi=200, bbox_inches='tight', facecolor=BG)"
    new_dm_save = (
        "fig.savefig(os.path.join(OUT, 'AVBC_decision_matrix.png'), dpi=300, bbox_inches='tight', facecolor=BG)\n"
        "    fig.savefig(os.path.join(OUT, 'AVBC_decision_matrix.svg'), format='svg', bbox_inches='tight', facecolor=BG)\n"
        "    fig.savefig(os.path.join(OUT, 'AVBC_decision_matrix.pdf'), format='pdf', bbox_inches='tight', facecolor=BG)"
    )
    code = code.replace(old_dm_save, new_dm_save)
    
    # Modify fig_vt_monotonicity to save as PNG, SVG and PDF
    old_mono_save = "fig.savefig(os.path.join(OUT, 'AVBC_arc_sweep_publication.png'),\n                dpi=300, bbox_inches='tight', facecolor=BG)"
    new_mono_save = (
        "fig.savefig(os.path.join(OUT, 'AVBC_arc_sweep_publication.png'), dpi=300, bbox_inches='tight', facecolor=BG)\n"
        "    fig.savefig(os.path.join(OUT, 'AVBC_arc_sweep_publication.svg'), format='svg', bbox_inches='tight', facecolor=BG)\n"
        "    fig.savefig(os.path.join(OUT, 'AVBC_arc_sweep_publication.pdf'), format='pdf', bbox_inches='tight', facecolor=BG)"
    )
    code = code.replace(old_mono_save, new_mono_save)
    
    # Modify fig_patient_sensitivity to save as PNG, SVG and PDF
    old_sens_save = "fig.savefig(os.path.join(OUT, 'AVBC_patient_sensitivity.png'),\n                dpi=300, bbox_inches='tight', facecolor=BG)"
    new_sens_save = (
        "fig.savefig(os.path.join(OUT, 'AVBC_patient_sensitivity.png'), dpi=300, bbox_inches='tight', facecolor=BG)\n"
        "    fig.savefig(os.path.join(OUT, 'AVBC_patient_sensitivity.svg'), format='svg', bbox_inches='tight', facecolor=BG)\n"
        "    fig.savefig(os.path.join(OUT, 'AVBC_patient_sensitivity.pdf'), format='pdf', bbox_inches='tight', facecolor=BG)"
    )
    code = code.replace(old_sens_save, new_sens_save)
    
    temp_script_path = os.path.join(dest_dir, "temp_generate_vectors.py")
    print(f"Writing temporary vector generator script to {temp_script_path}...")
    with open(temp_script_path, 'w', encoding='utf-8') as f:
        f.write(code)
        
    print("Executing temporary vector generator script...")
    # Since we need to run it, let's run it from python directly
    try:
        import subprocess
        result = subprocess.run(["python", temp_script_path], capture_output=True, text=True, check=True)
        print("Subprocess Output:")
        print(result.stdout)
    except Exception as e:
        print(f"Error executing script: {e}")
        if 'result' in locals() and result.stderr:
            print("Error details:")
            print(result.stderr)
            
    # Clean up temporary script
    if os.path.exists(temp_script_path):
        os.remove(temp_script_path)
        print("Cleaned up temporary script.")

if __name__ == "__main__":
    make_figures_vectorized()
