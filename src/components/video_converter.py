#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse
from pathlib import Path
import tkinter as tk
from tkinter import filedialog
from tqdm import tqdm

def select_file_with_gui():
    """Abre uma janela GUI para seleção de arquivo e retorna o caminho."""
    root = tk.Tk()
    root.withdraw()  # Esconde a janela principal do Tkinter
    file_path = filedialog.askopenfilename(
        title="Selecione o arquivo .mov para converter",
        filetypes=[("Arquivos MOV", "*.mov"), ("Todos os arquivos", "*.*")]
    )
    root.destroy()
    return file_path
def ask_quality_with_gui():
    """Abre uma janela GUI para seleção da qualidade e retorna a qualidade selecionada."""
    quality_options = ['high', 'medium', 'low']
    
    root = tk.Tk()
    root.withdraw() # Esconde a janela principal
    
    dialog = tk.Toplevel(root)
    dialog.title("Selecione a Qualidade")
    
    tk.Label(dialog, text="Escolha a qualidade da conversão:").pack(pady=10)
    
    quality_var = tk.StringVar(value=quality_options[1]) # Padrão: medium
    
    for option in quality_options:
        tk.Radiobutton(dialog, text=option.capitalize(), variable=quality_var, value=option).pack(anchor='w')
        
    result = None
    def on_select():
        nonlocal result
        result = quality_var.get()
        dialog.destroy()
        
    tk.Button(dialog, text="Selecionar", command=on_select).pack(pady=10)
    
    # Centraliza a janela de diálogo
    dialog.update_idletasks()
    x = root.winfo_x() + (root.winfo_width() // 2) - (dialog.winfo_width() // 2)
    y = root.winfo_y() + (root.winfo_height() // 2) - (dialog.winfo_height() // 2)
    dialog.geometry(f"+{x}+{y}")
    
    root.wait_window(dialog) # Espera a janela de diálogo fechar
    root.destroy()
    return result


def ask_output_file_with_gui(input_file):
    """Abre uma janela GUI para perguntar o nome do arquivo de saída com sugestão preenchida."""
    input_path = Path(input_file)
    default_output_name = input_path.with_suffix('.mp4').name
    
    root = tk.Tk()
    root.withdraw() # Esconde a janela principal
    
    dialog = tk.Toplevel(root)
    dialog.title("Nome do Arquivo de Saída")
    
    tk.Label(dialog, text="Insira o nome do arquivo de saída:").pack(pady=10)
    
    output_name_var = tk.StringVar(value=default_output_name)
    entry = tk.Entry(dialog, textvariable=output_name_var, width=50)
    entry.pack(pady=5)
    
    result = None
    def on_ok():
        nonlocal result
        result = output_name_var.get()
        dialog.destroy()
        
    tk.Button(dialog, text="OK", command=on_ok).pack(pady=10)
    
    # Centraliza a janela de diálogo
    dialog.update_idletasks()
    x = root.winfo_x() + (root.winfo_width() // 2) - (dialog.winfo_width() // 2)
    y = root.winfo_y() + (root.winfo_height() // 2) - (dialog.winfo_height() // 2)
    dialog.geometry(f"+{x}+{y}")
    
    root.wait_window(dialog) # Espera a janela de diálogo fechar
    root.destroy()
    
    if result:
        # Retorna o caminho completo para o arquivo de saída no mesmo diretório do input
        return str(input_path.parent / result)
    return None

def check_ffmpeg():
    """Verifica se o FFmpeg está instalado"""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

import re

def get_video_duration(input_file):
    """Obtém a duração de um vídeo em segundos usando ffprobe."""
    cmd = [
        'ffprobe',
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        input_file
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return float(result.stdout.strip())
    except (subprocess.CalledProcessError, FileNotFoundError, ValueError):
        return None

def convert_mov_to_mp4(input_file, output_file=None, quality='medium'):
    """
    Converte um arquivo .mov para .mp4 com barra de progresso.
    
    Args:
        input_file: Caminho para o arquivo .mov
        output_file: Caminho para o arquivo de saída (opcional)
        quality: Qualidade da conversão ('high', 'medium', 'low')
    """
    
    # Define o arquivo de saída se não especificado
    if output_file is None:
        input_path = Path(input_file)
        output_file = input_path.with_suffix('.mp4')
    
    # Configurações de qualidade
    quality_settings = {
        'high': ['-c:v', 'libx264', '-preset', 'slow', '-crf', '18'],
        'medium': ['-c:v', 'libx264', '-preset', 'medium', '-crf', '23'],
        'low': ['-c:v', 'libx264', '-preset', 'fast', '-crf', '28']
    }
    
    # Comando FFmpeg
    cmd = [
        'ffmpeg',
        '-i', input_file,
        *quality_settings.get(quality, quality_settings['medium']),
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',  # Otimiza para streaming
        '-y',  # Sobrescreve arquivo existente
        str(output_file)
    ]
    
    print(f"Convertendo: {input_file} -> {output_file}")
    print(f"Qualidade: {quality}")
    
    duration = get_video_duration(input_file)
    if duration is None:
        print("✗ Não foi possível obter a duração do vídeo. O progresso não será exibido.")
        
    try:
        process = subprocess.Popen(cmd, stderr=subprocess.PIPE, universal_newlines=True)
        
        with tqdm(total=int(duration) if duration else 0, unit='s', desc="Progresso") as pbar:
            for line in process.stderr:
                # Extrai o tempo atual do FFmpeg
                match = re.search(r'time=(\d{2}):(\d{2}):(\d{2})\.\d{2}', line)
                if match:
                    h, m, s = map(int, match.groups())
                    current_time = h * 3600 + m * 60 + s
                    if duration:
                        pbar.update(current_time - pbar.n) # Atualiza o progresso
                        
        process.wait()
        
        if process.returncode == 0:
            print(f"✓ Conversão concluída: {output_file}")
            
            # Mostra informações dos arquivos
            input_size = os.path.getsize(input_file) / (1024 * 1024)
            output_size = os.path.getsize(output_file) / (1024 * 1024)
            print(f"  Tamanho original: {input_size:.1f} MB")
            print(f"  Tamanho final: {output_size:.1f} MB")
            print(f"  Redução: {((input_size - output_size) / input_size * 100):.1f}%")
            
        else:
            print(f"✗ Erro na conversão:")
            print(process.stderr.read()) # Lê o restante do stderr se houver erro
            
    except Exception as e:
        print(f"✗ Erro durante a conversão: {e}")

def convert_batch(directory, quality='medium'):
    """Converte todos os arquivos .mov em um diretório"""
    
    mov_files = list(Path(directory).glob('*.mov'))
    mov_files.extend(list(Path(directory).glob('*.MOV')))
    
    if not mov_files:
        print("Nenhum arquivo .mov encontrado no diretório.")
        return
    
    print(f"Encontrados {len(mov_files)} arquivo(s) .mov")
    
    for mov_file in mov_files:
        convert_mov_to_mp4(str(mov_file), quality=quality)
        print("-" * 50)

def main():
    parser = argparse.ArgumentParser(description='Converte arquivos .mov para .mp4')
    parser.add_argument('input', nargs='?', help='Arquivo .mov ou diretório com arquivos .mov (opcional)')
    parser.add_argument('-o', '--output', help='Arquivo de saída (apenas para arquivo único)')
    parser.add_argument('-q', '--quality', choices=['high', 'medium', 'low'],
                       default='medium', help='Qualidade da conversão (padrão: medium)')
    parser.add_argument('-b', '--batch', action='store_true',
                       help='Modo lote: converte todos os .mov do diretório')
    
    args = parser.parse_args()
    
    # Verifica se FFmpeg está instalado
    if not check_ffmpeg():
        print("✗ FFmpeg não encontrado!")
        print("Instale o FFmpeg:")
        print("  Ubuntu/Debian: sudo apt install ffmpeg")
        print("  macOS: brew install ffmpeg")
        print("  Windows: Baixe de https://ffmpeg.org/download.html")
        sys.exit(1)
    
    # Se nenhum input for fornecido, abre a janela GUI
    if args.input is None:
        selected_file = select_file_with_gui()
        if not selected_file:
            print("Nenhum arquivo selecionado. Saindo.")
            sys.exit(0)
        args.input = selected_file
        
    # Se não for modo lote, pergunta a qualidade e o nome do arquivo de saída
    if not args.batch and not os.path.isdir(args.input):
        selected_quality = ask_quality_with_gui()
        if selected_quality:
            args.quality = selected_quality
        
        selected_output_file = ask_output_file_with_gui(args.input)
        if selected_output_file:
            args.output = selected_output_file
        
    # Verifica se o arquivo/diretório existe
    if not os.path.exists(args.input):
        print(f"✗ Arquivo ou diretório não encontrado: {args.input}")
        sys.exit(1)
    
    # Modo lote ou arquivo único
    if args.batch or os.path.isdir(args.input):
        convert_batch(args.input, args.quality)
    else:
        # Verifica se é arquivo .mov
        if not args.input.lower().endswith('.mov'):
            print("✗ O arquivo deve ter extensão .mov")
            sys.exit(1)
        
        convert_mov_to_mp4(args.input, args.output, args.quality)

if __name__ == '__main__':
    main()

# Exemplo de uso:
# python converter.py video.mov
# python converter.py video.mov -o saida.mp4 -q high
# python converter.py ./videos/ -b -q medium