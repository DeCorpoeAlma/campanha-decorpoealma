from PIL import Image
import tkinter as tk
from tkinter import filedialog

# Abrir janela para escolher o ficheiro
root = tk.Tk()
root.withdraw()  # esconde a janela principal

input_file = filedialog.askopenfilename(
    title="Escolhe a imagem",
    filetypes=[("Imagens", "*.png *.jpg *.jpeg *.webp *.bmp")]
)

if not input_file:
    print("Nenhum ficheiro selecionado.")
    exit()

# Definir nome do ficheiro corrigido
output_file = input_file.rsplit(".", 1)[0] + "_corrigida.jpg"

# Abrir a imagem e regravar limpa
with Image.open(input_file) as img:
    rgb_img = img.convert("RGB")
    rgb_img.save(output_file, "JPEG", quality=95, optimize=True)

print("Imagem regravada com sucesso:", output_file)
