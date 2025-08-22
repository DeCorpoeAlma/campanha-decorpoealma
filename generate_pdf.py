from weasyprint import HTML, CSS

# Caminho para o ficheiro HTML de entrada
html_file = 'public/candidatos_juntas.html'

# Caminho para o ficheiro PDF de saída
pdf_file = 'candidatos_juntas.pdf'

# CSS personalizado para ajustar o conteúdo em uma página
css = CSS(string='''
    @font-face {
        font-family: 'Galano Grotesque Alt';
        src: url('public/fonts/galano-grotesque-alt/GalanoGrotesqueAltRegular.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Galano Grotesque Alt';
        src: url('public/fonts/galano-grotesque-alt/GalanoGrotesqueAltBold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
    }
    @font-face {
        font-family: 'Galano Grotesque Alt';
        src: url('public/fonts/galano-grotesque-alt/GalanoGrotesqueAltMedium.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
    }
    @page {
        size: A4 landscape;
        margin: 1.5cm;
    }
    body {
        font-family: 'Galano Grotesque Alt', sans-serif;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
    }
    .logo {
        width: 250px !important;
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        margin: 0 auto !important;
        display: block !important;
    }
    h1 {
        font-family: 'Galano Grotesque Alt', sans-serif;
        font-size: 32pt !important;
        margin: 15px 0 30px 0 !important;
        text-align: center !important;
        color: #1e3a8a !important;
        font-weight: bold !important;
        width: 100% !important;
    }
    .candidates-grid {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 25px !important;
        padding: 0 !important;
        max-width: none !important;
        width: 100% !important;
        box-sizing: border-box !important;
        align-items: stretch !important;
    }
    .candidate-item {
        padding: 20px !important;
        height: auto !important;
        display: flex !important;
        flex-direction: column !important;
        background-color: #ffffff !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08) !important;
        border-left: 4px solid #f59e0b !important;
        justify-content: space-between !important;
    }
    .text-container {
        padding: 0 0 15px 0 !important;
        flex: none !important;
        width: 100% !important;
    }
    .image-container-two {
        display: flex !important;
        gap: 12px !important;
        justify-content: center !important;
        margin-top: auto !important;
    }
    .candidate-image-two {
        width: 100px !important;
        height: 130px !important;
        border-radius: 10px !important;
        object-fit: cover !important;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1) !important;
    }
    .parish-name {
        font-family: 'Galano Grotesque Alt', sans-serif;
        font-size: 17pt !important;
        margin-bottom: 8px !important;
        color: #1e3a8a !important;
        font-weight: bold !important;
        line-height: 1.2 !important;
    }
    .candidate-name {
        font-family: 'Galano Grotesque Alt', sans-serif;
        font-size: 20pt !important;
        margin-bottom: 0 !important;
        color: #d97706 !important;
        font-weight: 500 !important;
        line-height: 1.2 !important;
    }
''')

try:
    # Converte o HTML para PDF com o CSS personalizado
    HTML(html_file).write_pdf(pdf_file, stylesheets=[css])
    print(f"PDF gerado com sucesso: {pdf_file}")
except Exception as e:
    print(f"Erro ao gerar o PDF: {e}")
