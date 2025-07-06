from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import re
import json # Para salvar os dados estruturados
import os   # Para gerenciar o diretório de saída
from datetime import datetime

# Importar display e Image do IPython.display para mostrar imagens em ambientes como Jupyter notebooks
try:
    from IPython.display import display, Image
except ImportError:
    print("IPython.display não encontrado. As imagens não serão exibidas diretamente.")
    display = None
    Image = None

# --- CONFIGURAÇÕES ---
COOKIE_FILE = 'facebook_cookies.txt' # Nome do arquivo onde você salvou seus cookies
URL = 'https://www.facebook.com/AlmaFarense'
POSTS_COUNT = 50 # Número de posts (lembre-se que o carregamento de muitos posts requer scroll)
BROWSER = "chrome" 
HEADLESS_MODE = False # Defina como True para rodar em segundo plano
OUTPUT_DIRECTORY = "output_facebook_data" 

# --- Configurar options para o Chrome ---
chrome_options = Options()
chrome_options.add_argument("--start-maximized")
if HEADLESS_MODE:
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1080") # Definir tamanho da janela em headless
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)


# --- Função para carregar cookies do formato Netscape ---
def load_cookies_from_netscape(file_path):
    cookies = []
    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            
            parts = line.split('\t')
            if len(parts) != 7: # Deve ter 7 campos
                continue

            # Extrair os campos
            domain, flag, path, secure, expiration, name, value = parts
            
            # Converter tipos e formatar para o dicionário que o Selenium espera
            cookie = {
                'domain': domain,
                'name': name,
                'value': value,
                'path': path,
                'secure': secure == 'TRUE',
                'httpOnly': False, # Este formato não indica httpOnly, assumimos False
                'expiry': int(expiration) if expiration.isdigit() else None
            }
            cookies.append(cookie)
    return cookies

# --- Criar o diretório de saída ---
if not os.path.exists(OUTPUT_DIRECTORY):
    os.makedirs(OUTPUT_DIRECTORY)
    print(f"📁 Diretório de saída criado: {OUTPUT_DIRECTORY}")

# --- Iniciar o WebDriver ---
print("A iniciar o WebDriver do Chrome...")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
print("WebDriver iniciado.")

# --- Carregar Cookies ---
# Primeiro, navegue para o domínio base do Facebook para que os cookies sejam aplicados
# Isso é crucial! Selenium só pode adicionar cookies para o domínio atual.
driver.get("https://www.facebook.com/") # Ir para o domínio principal primeiro
print(f"Carregando cookies de: {COOKIE_FILE}")
try:
    saved_cookies = load_cookies_from_netscape(COOKIE_FILE)
    for cookie in saved_cookies:
        # Selenium exige que 'expiry' seja um int. Se for None, removemos.
        if cookie.get('expiry') is None:
            cookie.pop('expiry', None)
        driver.add_cookie(cookie)
    print("✅ Cookies carregados com sucesso.")
    time.sleep(2) # Pequena pausa para os cookies se assentarem
except FileNotFoundError:
    print(f"❌ Erro: Arquivo de cookies '{COOKIE_FILE}' não encontrado. O scraping pode falhar sem login.")
except Exception as e:
    print(f"❌ Erro ao carregar cookies: {e}. O scraping pode falhar sem login.")

# --- Navegar para a página alvo (agora com cookies aplicados) ---
print(f"A navegar para a página alvo: {URL}")
driver.get(URL)

# --- Esperar a página carregar (e o conteúdo com os cookies) ---
# Você precisará ajustar este tempo ou usar waits mais inteligentes.
time.sleep(10) 

# --- Tentar encontrar posts (os seletores ainda são um desafio) ---
print("A tentar encontrar posts...")

# Este seletor ainda é uma APROXIMAÇÃO. Facebook pode mudar isto.
# Com login, os posts são geralmente mais visíveis e consistentes.
# Elementos de posts em feeds são frequentemente 'div' com 'role="article"'.
# Ou 'div' dentro de um contêiner de feed (role="feed")
posts_elements = driver.find_elements(By.CSS_SELECTOR, 'div[role="feed"] > div, div[role="article"]')

print(f"Número de elementos potencialmente de posts encontrados: {len(posts_elements)}")

extracted_posts = []
posts_processed_count = 0

# --- Lógica de Scroll Infinito (Muito Básica) ---
# Você pode precisar de uma lógica de scroll mais robusta para pegar muitos posts
SCROLL_PAUSE_TIME = 2 # segundos
last_height = driver.execute_script("return document.body.scrollHeight")

while posts_processed_count < POSTS_COUNT:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        # Se a altura não mudou, chegamos ao fim da página ou não há mais conteúdo para carregar
        print("Fim da página ou não há mais conteúdo para carregar.")
        break
    last_height = new_height
    
    # Re-encontra os elementos de post após o scroll, pois novos podem ter carregado
    posts_elements = driver.find_elements(By.CSS_SELECTOR, 'div[role="feed"] > div, div[role="article"]')
    print(f"Elementos de posts encontrados após scroll: {len(posts_elements)}")

    # Processar apenas os novos posts ou garantir que todos os posts visíveis sejam processados
    # Aqui, vamos processar todos os posts encontrados até o limite desejado
    current_posts_in_view = len(posts_elements)
    if current_posts_in_view > posts_processed_count:
        posts_to_process = posts_elements[posts_processed_count:min(current_posts_in_view, POSTS_COUNT)]
        for post_element in posts_to_process:
            post_data = {
                "id": None, # Tentaremos extrair um ID mais real
                "content": "",
                "images_urls": [],
                "video_url": None,
                "reactions_count": None,
                "comments_count": None,
                "shares_count": None,
                "posted_on": None,
                "post_url": None
            }

            try:
                print("\nProcessando novo post...")
                
                # Extrair URL do Post e ID
                # Procura por qualquer link que possa ser um post
                post_link_element = post_element.find_elements(By.XPATH, ".//a[contains(@href, '/posts/') or contains(@href, '/photos/') or contains(@href, '/videos/')]")
                if post_link_element:
                    post_data["post_url"] = post_link_element[0].get_attribute('href')
                    print(f"URL encontrada: {post_data['post_url']}")
                    # Tenta extrair o ID do post da URL
                    match_post_id = re.search(r'(?:posts|photos|videos)/(\d+)', post_data["post_url"])
                    if match_post_id:
                        post_data["id"] = match_post_id.group(1)
                        print(f"ID extraído: {post_data['id']}")

                # Extrair Conteúdo de Texto
                # Tenta vários seletores para encontrar o conteúdo do post
                content_elements = post_element.find_elements(By.XPATH, ".//div[@role='article']//div[string-length(text()) > 0]")
                if not content_elements:
                    content_elements = post_element.find_elements(By.CSS_SELECTOR, 'div[data-ad-preview="message"] span, div[class*="userContent"]')
                if not content_elements:
                    content_elements = post_element.find_elements(By.CSS_SELECTOR, 'div[dir="auto"] > span')
                
                if content_elements:
                    # Junta o texto de múltiplos elementos e limpa "See More" / "Ver Mais"
                    full_content = " ".join([el.text for el in content_elements if el.text.strip() != '']).strip()
                    post_data["content"] = re.sub(r'\s*(See More|Ver Mais)\s*$', '', full_content, flags=re.IGNORECASE).strip()


                # Extrair URLs de Imagens
                image_elements = post_element.find_elements(By.CSS_SELECTOR, 'img[src*="scontent"], img[data-src*="scontent"]')
                for img_el in image_elements:
                    src = img_el.get_attribute('src') or img_el.get_attribute('data-src')
                    if src and "scontent" in src:
                        # Filtrar miniaturas ou ícones se houver, focando em imagens de post maiores
                        if "s96x96" not in src and "s40x40" not in src: # Exemplo de filtro, pode precisar de ajuste
                             post_data["images_urls"].append(src)
                post_data["images_urls"] = list(set(post_data["images_urls"])) # Remover duplicados

                # Extrair URL de Vídeo
                video_element = post_element.find_elements(By.CSS_SELECTOR, 'video source[src], a[href*="/videos/"]')
                if video_element:
                    for vid_el in video_element:
                        src = vid_el.get_attribute('src') or vid_el.get_attribute('href')
                        if src:
                            post_data["video_url"] = src
                            break

                # Extrair Contagens (Reações, Comentários, Partilhas) usando XPath mais genérico
                try:
                    print("Procurando contagens...")
                    
                    # Procura por qualquer span que contenha números
                    count_elements = post_element.find_elements(By.XPATH, ".//span[contains(text(), '0') or contains(text(), '1') or contains(text(), '2')]")
                    
                    for el in count_elements:
                        text = el.text.lower()
                        print(f"Elemento encontrado com texto: {text}")
                        
                        # Reações
                        if 'reações' in text or 'pessoas reagiram' in text or 'reactions' in text:
                            match = re.search(r'(\d[\d\.,KkMmA-Z]*)', text)
                            if match:
                                num_str = match.group(1).replace('.', '')
                                if 'K' in num_str.upper():
                                    post_data["reactions_count"] = float(num_str.upper().replace('K', '')) * 1000
                                elif 'M' in num_str.upper():
                                    post_data["reactions_count"] = float(num_str.upper().replace('M', '')) * 1000000
                                else:
                                    post_data["reactions_count"] = int(num_str)
                                print(f"Reações encontradas: {post_data['reactions_count']}")
                        
                        # Comentários
                        elif 'comentário' in text or 'comment' in text:
                            match = re.search(r'(\d+)', text)
                            if match:
                                post_data["comments_count"] = int(match.group(1))
                                print(f"Comentários encontrados: {post_data['comments_count']}")
                        
                        # Partilhas
                        elif 'partilha' in text or 'share' in text:
                            match = re.search(r'(\d+)', text)
                            if match:
                                post_data["shares_count"] = int(match.group(1))
                                print(f"Partilhas encontradas: {post_data['shares_count']}")
                
                except Exception as e_counts:
                    print(f"Erro ao extrair contagens: {e_counts}")

                # Extrair Data de Publicação
                print("Procurando data de publicação...")
                
                # Primeiro tenta encontrar qualquer span com texto que pareça uma data/hora
                time_candidates = post_element.find_elements(By.XPATH,
                    ".//span[contains(text(), 'h') or contains(text(), 'min') or contains(text(), 'ontem') or " +
                    "contains(text(), 'seg') or contains(text(), 'dia') or contains(text(), 'hora')]")
                
                if not time_candidates:
                    # Se não encontrar, tenta outros elementos comuns
                    time_candidates = post_element.find_elements(By.XPATH,
                        ".//abbr[@data-utime] | .//span[@data-testid='timestamp'] | " +
                        ".//a[contains(@href, '/posts/')]//span | .//a[@role='link']//span")
                
                if time_candidates:
                    time_element = time_candidates[0]
                    utime = time_element.get_attribute('data-utime')
                    if utime:
                        post_data["posted_on"] = datetime.fromtimestamp(int(utime)).isoformat()
                        print(f"Data encontrada (timestamp): {post_data['posted_on']}")
                    else:
                        post_data["posted_on"] = time_element.text.strip()
                        print(f"Data encontrada (texto): {post_data['posted_on']}")
                else:
                    print("Nenhuma data encontrada")

                # Só adiciona o post se tiver algum conteúdo real
                if post_data["content"] or post_data["images_urls"] or post_data["video_url"]:
                    extracted_posts.append(post_data)
                    posts_processed_count += 1
                    if posts_processed_count >= POSTS_COUNT:
                        break # Parar se atingir o número desejado

            except Exception as e:
                # print(f"❌ Erro ao processar um post: {e}")
                pass # Continua para o próximo post

print("\n" + "="*80)
print("             RESULTADOS DA EXTRAÇÃO (COM COOKIES)             ")
print("="*80 + "\n")

if not extracted_posts:
    print("Nenhum post significativo foi extraído. Possíveis razões:")
    print("  1. Os cookies podem não estar funcionando para a sessão (expirados?).")
    print("  2. Os seletores CSS/XPath estão desatualizados devido a mudanças na interface do Facebook.")
    print("  3. A página pode ter conteúdo limitado ou a lógica de scroll não funcionou como esperado.")
else:
    # Salvar para JSON
    output_filename = f"almafarense_posts_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    output_path = os.path.join(OUTPUT_DIRECTORY, output_filename)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(extracted_posts, f, ensure_ascii=False, indent=2)
    print(f"✅ Dados extraídos e salvos em: {output_path}")

    # Imprimir no console para visualização rápida
    for i, post in enumerate(extracted_posts):
        print(f"--- Post {i+1} ---")
        print(f"ID: {post.get('id', 'N/A')}")
        print(f"Data Publicação: {post.get('posted_on', 'N/A')}")
        print(f"Reações: {int(post['reactions_count']) if post['reactions_count'] else 'N/A'}")
        print(f"Comentários: {post.get('comments_count', 'N/A')}")
        print(f"Partilhas: {post.get('shares_count', 'N/A')}")
        print(f"URL do Post: {post.get('post_url', 'N/A')}")
        print("\nConteúdo do Post (Primeiros 500 chars):")
        print(post.get('content', 'N/A')[:500] + "..." if len(post.get('content', '')) > 500 else post.get('content', 'N/A'))
        
        if post.get('images_urls'):
            print("\nURLs de Imagens:")
            for img_url in post['images_urls']:
                print(f"  - {img_url}")
                # Tentar exibir a imagem usando IPython.display se disponível
                if display and Image:
                    try:
                        print(f"Exibindo imagem: {img_url}")
                        display(Image(url=img_url))
                    except Exception as img_display_error:
                        print(f"Erro ao exibir imagem {img_url}: {img_display_error}")

        if post.get('video_url'):
            print(f"\nURL de Vídeo: {post['video_url']}")

        print("\n" + "-"*80 + "\n")

# Fechar o navegador
print("Fechando o navegador.")
driver.quit()