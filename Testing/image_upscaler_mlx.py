import os
import numpy as np
import mlx.core as mx
from PIL import Image
from scipy.ndimage import zoom

# --- Configurações ---
input_folder = 'fotos_para_outdoor'
output_folder = 'fotos_outdoor_upscaled_mlx'
upscale_factor = 2.0  # Fator de ampliação (2x o tamanho original)
target_dpi = 300  # DPI alvo para as imagens de saída (300 é bom para impressão)
# Parâmetros de melhoria de imagem
sharpen_strength = 0.5  # Intensidade do filtro de nitidez (0.0 a 1.0)
contrast_factor = 1.2   # Fator de contraste (1.0 = sem alteração, >1.0 = mais contraste)
brightness_factor = 1.1 # Fator de brilho (1.0 = sem alteração, >1.0 = mais brilho)
saturation_factor = 1.1 # Fator de saturação (1.0 = sem alteração, >1.0 = mais saturação)

# --- Funções de processamento com MLX ---

def load_image(filepath):
    """Carrega uma imagem e converte para tensor MLX"""
    img = Image.open(filepath).convert("RGB")
    # Obter DPI original (se disponível)
    dpi = img.info.get('dpi', (72, 72))
    # Converter para array numpy e depois para tensor MLX
    img_array = np.array(img).astype(np.float32) / 255.0
    # Converter para formato MLX (HWC - altura, largura, canais)
    img_tensor = mx.array(img_array)
    return img_tensor, img.size, dpi

def save_image(img_tensor, filepath, dpi=(300, 300)):
    """Salva um tensor MLX como imagem com DPI específico"""
    # Converter de volta para numpy e ajustar para o intervalo 0-255
    img_array = mx.clip(img_tensor, 0.0, 1.0)
    img_array = (img_array * 255.0).astype(mx.uint8)
    img_array = np.array(img_array)
    
    # Criar imagem PIL a partir do array
    img = Image.fromarray(img_array, mode="RGB")
    # Definir DPI
    img.info['dpi'] = dpi
    # Salvar com alta qualidade
    img.save(filepath, format="PNG", dpi=dpi, quality=95)

def apply_sharpen(img_tensor, strength=0.5):
    """Aplica filtro de nitidez usando uma abordagem simplificada"""
    # Implementação simplificada de nitidez usando operações básicas
    # Criar uma versão borrada da imagem
    # Converter para numpy para processamento
    img_np = np.array(img_tensor)
    
    # Aplicar um filtro de nitidez simples usando a técnica de "unsharp masking"
    # 1. Criar uma versão borrada da imagem
    from scipy.ndimage import gaussian_filter
    blurred = gaussian_filter(img_np, sigma=1.0)
    
    # 2. Calcular a máscara (detalhes) subtraindo a imagem borrada da original
    mask = img_np - blurred
    
    # 3. Adicionar a máscara ponderada à imagem original
    sharpened = img_np + strength * mask
    
    # 4. Garantir que os valores estejam no intervalo [0, 1]
    sharpened = np.clip(sharpened, 0.0, 1.0)
    
    # Converter de volta para MLX
    return mx.array(sharpened)

def adjust_contrast(img_tensor, factor=1.2):
    """Ajusta o contraste da imagem usando MLX"""
    mean = mx.mean(img_tensor)
    result = mean + factor * (img_tensor - mean)
    return mx.clip(result, 0.0, 1.0)

def adjust_brightness(img_tensor, factor=1.1):
    """Ajusta o brilho da imagem usando MLX"""
    result = img_tensor * factor
    return mx.clip(result, 0.0, 1.0)

def adjust_saturation(img_tensor, factor=1.1):
    """Ajusta a saturação da imagem usando MLX"""
    # Converter para escala de cinza (média dos canais)
    gray = mx.mean(img_tensor, axis=-1, keepdims=True)
    
    # Implementar nossa própria interpolação linear (lerp)
    # lerp(a, b, t) = a + t * (b - a)
    result = gray + factor * (img_tensor - gray)
    
    return mx.clip(result, 0.0, 1.0)

def upscale_image_mlx(img_tensor, scale_factor):
    """Redimensiona a imagem usando scipy.ndimage.zoom e MLX"""
    # Converter para numpy para usar o zoom da scipy
    img_np = np.array(img_tensor)
    
    # Usar zoom da scipy para redimensionar com interpolação bicúbica
    # O parâmetro order=3 corresponde à interpolação bicúbica
    upscaled_np = zoom(img_np, (scale_factor, scale_factor, 1), order=3)
    
    # Converter de volta para tensor MLX
    upscaled = mx.array(upscaled_np)
    
    return upscaled

# --- Inicialização ---
# Verifica se o diretório de entrada existe
if not os.path.exists(input_folder):
    print(f"Erro: Pasta de entrada '{input_folder}' não encontrada. Crie a pasta e coloque as suas fotos nela.")
    exit()

# Cria o diretório de saída
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

print(f"Iniciando o processamento das fotos em '{input_folder}' usando MLX...")
print(f"As imagens serão redimensionadas por um fator de {upscale_factor}x e terão DPI de {target_dpi}.")

# Lista todos os arquivos na pasta de entrada
for filename in os.listdir(input_folder):
    # Processa apenas arquivos de imagem comuns
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp')):
        input_filepath = os.path.join(input_folder, filename)
        
        # Cria o caminho de saída com um novo nome
        base_name, _ = os.path.splitext(filename)
        output_filepath = os.path.join(output_folder, f"{base_name}_upscaled_mlx.png")

        print(f"Processando {filename}...")
        
        try:
            # Carrega a imagem como tensor MLX
            img_tensor, original_size, original_dpi = load_image(input_filepath)
            
            # Obtém as dimensões originais
            width, height = original_size
            print(f"    Dimensões originais: {width}x{height}, DPI: {original_dpi}")
            
            # Calcula as novas dimensões
            new_width = int(width * upscale_factor)
            new_height = int(height * upscale_factor)
            
            # Redimensiona a imagem usando MLX
            print("    Aplicando upscaling com MLX...")
            upscaled_img = upscale_image_mlx(img_tensor, upscale_factor)
            
            # Aplica uma sequência de melhorias na imagem
            print("    Aplicando melhorias de imagem...")
            
            # 1. Aplica filtro de nitidez para melhorar os detalhes
            upscaled_img = apply_sharpen(upscaled_img, sharpen_strength)
            
            # 2. Ajusta o contraste para melhorar a aparência
            upscaled_img = adjust_contrast(upscaled_img, contrast_factor)
            
            # 3. Ajusta o brilho
            upscaled_img = adjust_brightness(upscaled_img, brightness_factor)
            
            # 4. Ajusta a saturação de cor
            upscaled_img = adjust_saturation(upscaled_img, saturation_factor)
            
            # Salva a imagem resultante em alta qualidade com DPI específico
            save_image(upscaled_img, output_filepath, dpi=(target_dpi, target_dpi))
            
            print(f" ✅ Processado e salvo em: {output_filepath}")
            print(f"    Novas dimensões: {new_width}x{new_height} (ampliado {upscale_factor}x)")
            print(f"    Novo DPI: {target_dpi}")

        except Exception as e:
            print(f" ❌ Erro ao processar {filename}: {e}")
            import traceback
            traceback.print_exc()  # Imprime o stack trace completo para depuração

print("--- Processamento concluído! ---")
print(f"As imagens processadas estão disponíveis em: {os.path.abspath(output_folder)}")