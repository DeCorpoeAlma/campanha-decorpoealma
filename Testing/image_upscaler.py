import os
from PIL import Image, ImageFilter, ImageEnhance

# --- Configurações ---
input_folder = 'fotos_para_outdoor'
output_folder = 'fotos_outdoor_upscaled'
upscale_factor = 2.0  # Fator de ampliação (2x o tamanho original)
sharpen_factor = 1.5  # Fator de nitidez (1.0 = sem alteração, >1.0 = mais nítido)
contrast_factor = 1.2  # Fator de contraste (1.0 = sem alteração, >1.0 = mais contraste)
brightness_factor = 1.1  # Fator de brilho (1.0 = sem alteração, >1.0 = mais brilho)
saturation_factor = 1.1  # Fator de saturação (1.0 = sem alteração, >1.0 = mais saturação)

# --- Inicialização ---
# Verifica se o diretório de entrada existe
if not os.path.exists(input_folder):
    print(f"Erro: Pasta de entrada '{input_folder}' não encontrada. Crie a pasta e coloque as suas fotos nela.")
    exit()

# Cria o diretório de saída
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

print(f"Iniciando o processamento das fotos em '{input_folder}'...")

# Lista todos os arquivos na pasta de entrada
for filename in os.listdir(input_folder):
    # Processa apenas arquivos de imagem comuns
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp')):
        input_filepath = os.path.join(input_folder, filename)
        
        # Cria o caminho de saída com um novo nome
        base_name, _ = os.path.splitext(filename)
        output_filepath = os.path.join(output_folder, f"{base_name}_upscaled.png")

        print(f"Processando {filename}...")
        
        try:
            # Carrega a imagem
            image = Image.open(input_filepath).convert("RGB")
            
            # Obtém as dimensões originais
            width, height = image.size
            print(f"    Dimensões originais: {width}x{height}")
            
            # Calcula as novas dimensões
            new_width = int(width * upscale_factor)
            new_height = int(height * upscale_factor)
            
            # Redimensiona a imagem usando o algoritmo LANCZOS (melhor qualidade)
            upscaled_image = image.resize((new_width, new_height), Image.LANCZOS)
            
            # Aplica uma sequência de melhorias na imagem
            
            # 1. Aplica filtro de nitidez para melhorar os detalhes
            upscaled_image = upscaled_image.filter(ImageFilter.SHARPEN)
            
            # 2. Aplica mais nitidez usando o ImageEnhance
            enhancer = ImageEnhance.Sharpness(upscaled_image)
            upscaled_image = enhancer.enhance(sharpen_factor)
            
            # 3. Ajusta o contraste para melhorar a aparência
            enhancer = ImageEnhance.Contrast(upscaled_image)
            upscaled_image = enhancer.enhance(contrast_factor)
            
            # 4. Ajusta o brilho
            enhancer = ImageEnhance.Brightness(upscaled_image)
            upscaled_image = enhancer.enhance(brightness_factor)
            
            # 5. Ajusta a saturação de cor
            enhancer = ImageEnhance.Color(upscaled_image)
            upscaled_image = enhancer.enhance(saturation_factor)
            
            # Salva a imagem resultante em alta qualidade
            upscaled_image.save(output_filepath, format="PNG", quality=95)
            
            print(f" ✅ Processado e salvo em: {output_filepath}")
            print(f"    Novas dimensões: {new_width}x{new_height} (ampliado {upscale_factor}x)")

        except Exception as e:
            print(f" ❌ Erro ao processar {filename}: {e}")
            import traceback
            traceback.print_exc()  # Imprime o stack trace completo para depuração

print("--- Processamento concluído! ---")
