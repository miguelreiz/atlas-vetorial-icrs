import sys
import os
from playwright.sync_api import sync_playwright

def html_to_pdf(html_path, pdf_path):
    print(f"Convertendo {html_path} para {pdf_path}...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Obter o caminho absoluto correto
        abs_html_path = f"file://{os.path.abspath(html_path)}"
        
        page.goto(abs_html_path, wait_until="networkidle")
        
        # Salvar em PDF
        page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "20mm", "bottom": "20mm", "left": "20mm", "right": "20mm"}
        )
        
        browser.close()
    print("Concluído!")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python html_to_pdf.py <input.html> <output.pdf>")
        sys.exit(1)
        
    html_to_pdf(sys.argv[1], sys.argv[2])
