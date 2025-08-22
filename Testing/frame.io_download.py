#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para baixar imagens de alta resolução do Frame.io.

Este script automatiza o processo de extração e download de imagens
de um link compartilhado do Frame.io, usando Selenium para navegar
e extrair URLs de imagens.
"""

import os
import time
import re
import argparse
import logging
from typing import Set, List, Optional

import requests
from tqdm.auto import tqdm
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager


class FrameIoDownloader:
    """Classe para baixar imagens de alta resolução do Frame.io."""

    def __init__(
        self,
        url: str,
        output_folder: str = "downloads_frame",
        headless: bool = True,
        wait_time: int = 20,
        max_scroll_attempts: int = 50,
        save_html: bool = True,
    ):
        """
        Inicializa o downloader do Frame.io.

        Args:
            url: URL do Frame.io para baixar imagens
            output_folder: Pasta onde as imagens serão salvas
            headless: Se True, executa o Chrome em modo headless
            wait_time: Tempo de espera inicial para carregamento da página
            max_scroll_attempts: Número máximo de tentativas de rolagem
            save_html: Se True, salva o HTML da página para depuração
        """
        self.url = url
        self.output_folder = output_folder
        self.headless = headless
        self.wait_time = wait_time
        self.max_scroll_attempts = max_scroll_attempts
        self.save_html = save_html
        self.driver = None
        self.logger = self._setup_logger()

        # Criar pasta de saída se não existir
        os.makedirs(self.output_folder, exist_ok=True)

    def _setup_logger(self) -> logging.Logger:
        """Configura o logger para o aplicativo."""
        logger = logging.getLogger("frame_io_downloader")
        logger.setLevel(logging.INFO)
        
        # Criar handler para console
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # Definir formato
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        console_handler.setFormatter(formatter)
        
        # Adicionar handler ao logger
        logger.addHandler(console_handler)
        
        return logger

    def _setup_driver(self) -> webdriver.Chrome:
        """
        Configura e inicializa o driver do Chrome.
        
        Returns:
            Uma instância configurada do Chrome WebDriver
        """
        options = Options()
        if self.headless:
            options.add_argument("--headless")
        
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        
        try:
            driver = webdriver.Chrome(
                service=Service(ChromeDriverManager().install()),
                options=options
            )
            return driver
        except WebDriverException as e:
            self.logger.error(f"Erro ao inicializar o Chrome: {e}")
            raise

    def _save_page_html(self) -> None:
        """Salva o HTML da página para depuração."""
        if not self.save_html or not self.driver:
            return
            
        html_file_path = os.path.join(self.output_folder, "frame_io_page.html")
        try:
            with open(html_file_path, "w", encoding="utf-8") as f:
                f.write(self.driver.page_source)
            self.logger.info(f"HTML da página salvo em: {html_file_path}")
        except IOError as e:
            self.logger.error(f"Erro ao salvar HTML: {e}")

    @staticmethod
    def extract_high_res_url(srcset: str) -> Optional[str]:
        """
        Extrai a URL de maior resolução de um atributo srcset.
        
        Args:
            srcset: String contendo múltiplas URLs com indicadores de resolução
                   Exemplo: "url1 1x, url2 2x"
        
        Returns:
            URL de maior resolução ou None se não encontrada
        """
        if not srcset:
            return None
        
        urls_with_res = srcset.split(',')
        if not urls_with_res:
            return None
        
        # Pega a última parte (URL e resolução), que geralmente é a de maior resolução
        highest_res_url = urls_with_res[-1].strip().split(' ')[0]
        return highest_res_url

    def collect_image_urls(self) -> List[str]:
        """
        Navega pela página do Frame.io e coleta URLs de imagens.
        
        Returns:
            Lista de URLs de imagens encontradas
        """
        self.logger.info("Iniciando coleta de URLs de imagens...")
        
        try:
            self.driver = self._setup_driver()
            self.driver.get(self.url)
            
            # Aguardar carregamento inicial
            self.logger.info(f"Aguardando {self.wait_time}s para carregamento inicial...")
            time.sleep(self.wait_time)
            
            # Salvar HTML para depuração
            self._save_page_html()
            
            # Iniciar rolagem e coleta de imagens
            self.logger.info("Rolando a página para carregar todas as imagens...")
            last_height = self.driver.execute_script("return document.body.scrollHeight")
            file_urls = set()  # Usar um conjunto para evitar duplicatas
            scroll_attempts = 0
            
            while scroll_attempts < self.max_scroll_attempts:
                # Rolar para baixo
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                
                # Esperar o carregamento de novos conteúdos
                time.sleep(2)
                
                # Coletar imagens visíveis após rolagem
                # Seletor mais abrangente para encontrar imagens
                image_elements = self.driver.find_elements(
                    By.XPATH,
                    "//img[contains(@srcset, 'frameio-assets-production/image/') or contains(@src, 'frameio-assets-production/image/') or contains(@src, 'frame.io') or contains(@srcset, 'frame.io')]"
                )
                
                self._process_image_elements(image_elements, file_urls)
                
                # Calcular nova altura de rolagem
                new_height = self.driver.execute_script("return document.body.scrollHeight")
                
                # Se a altura não mudou após rolagem, tentamos clicar em "carregar mais" ou paramos
                if new_height == last_height:
                    if not self._try_load_more():
                        scroll_attempts += 1
                else:
                    # Resetar contador se a página mudou
                    scroll_attempts = 0
                
                last_height = new_height
                self.logger.info(f"Imagens encontradas até agora: {len(file_urls)}")
            
            return list(file_urls)
            
        except Exception as e:
            self.logger.error(f"Erro durante a coleta de URLs: {e}")
            return []
        finally:
            if self.driver:
                self.driver.quit()
                self.driver = None

    def _process_image_elements(self, image_elements, file_urls: Set[str]) -> None:
        """
        Processa elementos de imagem para extrair URLs.
        
        Args:
            image_elements: Lista de elementos de imagem do Selenium
            file_urls: Conjunto para armazenar URLs únicas
        """
        for img_element in image_elements:
            srcset = img_element.get_attribute("srcset")
            if srcset and "frameio-assets-production/image/" in srcset:
                high_res_url = self.extract_high_res_url(srcset)
                if high_res_url:
                    file_urls.add(high_res_url)
            else:
                # Se não houver srcset, tenta pegar do src
                src = img_element.get_attribute("src")
                if src and "frameio-assets-production/image/" in src:
                    file_urls.add(src)

    def _try_load_more(self) -> bool:
        """
        Tenta encontrar e clicar em botões "carregar mais".
        
        Returns:
            True se um botão foi clicado, False caso contrário
        """
        try:
            load_more_buttons = self.driver.find_elements(
                By.XPATH, 
                "//button[contains(text(), 'mais') or contains(text(), 'More') or contains(text(), 'Load')]"
            )
            
            if load_more_buttons:
                for button in load_more_buttons:
                    if button.is_displayed():
                        button.click()
                        time.sleep(2)
                        return True
            
            return False
        except Exception as e:
            self.logger.warning(f"Erro ao tentar clicar em 'carregar mais': {e}")
            return False

    def download_images(self, file_urls: List[str]) -> None:
        """
        Baixa imagens a partir das URLs coletadas.
        
        Args:
            file_urls: Lista de URLs de imagens para baixar
        """
        if not file_urls:
            self.logger.warning("Nenhuma URL de imagem para baixar.")
            return
            
        self.logger.info(f"{len(file_urls)} ficheiros de imagem encontrados.")
        
        for file_url in tqdm(file_urls, desc="Descarregando ficheiros"):
            # Extrair o ID da imagem da URL para usar como nome do arquivo
            image_id_match = re.search(r'image/([^/]+)', file_url)
            if image_id_match:
                file_name = f"{image_id_match.group(1)}.jpg"
            else:
                file_name = file_url.split("/")[-1].split("?")[0]
            
            file_path = os.path.join(self.output_folder, file_name)
            
            # Pular se o arquivo já existe
            if os.path.exists(file_path):
                continue
            
            try:
                r = requests.get(file_url, stream=True, timeout=30)
                r.raise_for_status()
                
                with open(file_path, "wb") as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        f.write(chunk)
                        
            except requests.exceptions.RequestException as e:
                self.logger.error(f"Erro ao baixar {file_url}: {e}")
    
    def run(self) -> None:
        """Executa o processo completo de coleta e download de imagens."""
        self.logger.info(f"Iniciando download de imagens de: {self.url}")
        file_urls = self.collect_image_urls()
        self.download_images(file_urls)
        self.logger.info("Download concluído!")


def parse_arguments():
    """
    Analisa argumentos de linha de comando.
    
    Returns:
        Objeto contendo os argumentos analisados
    """
    parser = argparse.ArgumentParser(description="Baixar imagens de alta resolução do Frame.io")
    
    parser.add_argument(
        "--url", 
        type=str,
        default="https://next.frame.io/share/954b9513-c444-4aee-ba8d-8b6f586c275e/5412e93f-ba5a-44b6-8ab9-aed1f15e56df",
        help="URL do Frame.io para baixar imagens"
    )
    
    parser.add_argument(
        "--output", 
        type=str, 
        default="downloads_frame",
        help="Pasta onde as imagens serão salvas"
    )
    
    parser.add_argument(
        "--no-headless", 
        action="store_true",
        help="Desativa o modo headless (mostra o navegador)"
    )
    
    parser.add_argument(
        "--wait-time", 
        type=int, 
        default=20,
        help="Tempo de espera inicial para carregamento da página (segundos)"
    )
    
    parser.add_argument(
        "--max-scroll", 
        type=int, 
        default=50,
        help="Número máximo de tentativas de rolagem"
    )
    
    parser.add_argument(
        "--no-save-html", 
        action="store_true",
        help="Não salvar o HTML da página para depuração"
    )
    
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_arguments()
    
    downloader = FrameIoDownloader(
        url=args.url,
        output_folder=args.output,
        headless=not args.no_headless,
        wait_time=args.wait_time,
        max_scroll_attempts=args.max_scroll,
        save_html=not args.no_save_html
    )
    
    downloader.run()