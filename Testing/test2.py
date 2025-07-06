import time
import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from IPython.display import display, Image, Video
from urllib.parse import urlparse
from pathlib import Path

# --- CONFIGURAÇÕES ---
CHROMEDRIVER_PATH = "/usr/local/bin/chromedriver"
FACEBOOK_URL = "https://www.facebook.com/AlmaFarense"
COOKIES_FILE = "facebook_cookies.txt"  # Exportado via extensão em formato Netscape
DOWNLOAD_DIR = Path("fb_media")
DOWNLOAD_DIR.mkdir(exist_ok=True)

HEADLESS = False
NUM_SCROLLS = 1
SCROLL_WAIT = 5  # segundos entre scrolls

# --- INICIAR CHROME ---
chrome_options = Options()
chrome_options.add_argument("--start-maximized")
if HEADLESS:
    chrome_options.add_argument("--headless=new")

driver = webdriver.Chrome(service=Service(CHROMEDRIVER_PATH), options=chrome_options)

# --- FUNÇÃO: CARREGAR COOKIES ---
def load_cookies(driver, filepath):
    with open(filepath, "r") as f:
        for line in f:
            if not line.startswith("#") and line.strip():
                domain, flag, path, secure, expiry, name, value = line.strip().split("\t")
                cookie = {
                    "domain": domain,
                    "name": name,
                    "value": value,
                    "path": path,
                    "secure": secure.lower() == "true"
                }
                driver.add_cookie(cookie)

# --- FUNÇÃO: EXTRAIR TEXTO E METADADOS DO POST ---
def extract_post_data(post_element):
    post_data = {
        "text": "",
        "posted_on": "N/A",
        "reactions_count": "N/A",
        "comments_count": "N/A",
        "shares_count": "N/A"
    }
    
    try:
        # Extrair texto principal
        # Procura por divs que contêm spans com texto, tentando evitar metadados
        # Adicionado mais filtros para evitar elementos de metadados no texto principal
        text_elements = post_element.find_elements(By.XPATH,
            ".//div[descendant::span and not(contains(@role, 'button')) and not(contains(@aria-label, 'reações')) and not(contains(@aria-label, 'comentários')) and not(contains(@aria-label, 'partilhas')) and not(contains(@role, 'link'))]")
        texts = []
        for el in text_elements:
             txt = el.text.strip()
             # Tenta filtrar textos curtos que podem ser metadados residuais
             if txt and len(txt) > 50 and txt not in texts:
                 texts.append(txt)
        post_data["text"] = "\n".join(texts)

        # Extrair Data de Publicação (tentativa mais robusta)
        time_element = post_element.find_elements(By.XPATH,
            ".//span[contains(text(), 'h') or contains(text(), 'min') or contains(text(), 'ontem') or " +
            "contains(text(), 'seg') or contains(text(), 'dia') or contains(text(), 'hora')] | " +
            ".//abbr[@data-utime] | .//span[@data-testid='timestamp'] | " +
            ".//a[contains(@href, '/posts/')]//span | .//a[@role='link']//span")
        if time_element:
            post_data["posted_on"] = time_element[0].text.strip()

        # Extrair Contagens (Reações, Comentários, Partilhas)
        # Procura por spans com aria-label ou texto relevante
        reactions_el = post_element.find_elements(By.XPATH, ".//span[contains(@aria-label, 'reações') or contains(@aria-label, 'reactions') or contains(text(), 'pessoas reagiram')]")
        if reactions_el:
            reactions_text = "".join([el.text for el in reactions_el]).strip()
            match = re.search(r'(\d[\d\.,KkMmA-Z]*)', reactions_text)
            if match:
                post_data["reactions_count"] = match.group(1) # Manter formato original (ex: 1,2K)

        comments_el = post_element.find_elements(By.XPATH, ".//span[contains(text(), 'comentário') or contains(text(), 'comment')]")
        if comments_el:
             for el in comments_el:
                match = re.search(r'(\d+)', el.text.lower())
                if match:
                    post_data["comments_count"] = match.group(1)
                    break

        shares_el = post_element.find_elements(By.XPATH, ".//span[contains(text(), 'partilha') or contains(text(), 'share')]")
        if shares_el:
            for el in shares_el:
                match = re.search(r'(\d+)', el.text.lower())
                if match:
                    post_data["shares_count"] = match.group(1)
                    break

    except Exception as e:
        print(f"Erro ao extrair dados do post: {e}")
        pass # Continua mesmo com erro

    return post_data

# --- FUNÇÃO: FAZER DOWNLOAD E MOSTRAR MÍDIA ---
def download_and_display(src_url, media_type="img"):
    try:
        parsed = urlparse(src_url)
        filename = DOWNLOAD_DIR / os.path.basename(parsed.path.split("?")[0])
        if not filename.exists():
            response = requests.get(src_url, stream=True)
            with open(filename, "wb") as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)

        if media_type == "img":
            display(Image(str(filename)))
        elif media_type == "video":
            mp4_path = filename.with_suffix(".mp4")
            if not mp4_path.exists():
                os.system(f"ffmpeg -y -i '{filename}' -movflags faststart '{mp4_path}'")
            display(Video(str(mp4_path), embed=True))
    except Exception as e:
        print("Erro ao processar mídia:", e)

# --- ABRIR FACEBOOK E INSERIR COOKIES ---
print("A aceder à página:", FACEBOOK_URL)
driver.get("https://www.facebook.com")
time.sleep(5)
load_cookies(driver, COOKIES_FILE)
driver.get(FACEBOOK_URL)
time.sleep(10)

# --- SCROLL PARA CARREGAR MAIS POSTS ---
print(f"🔃 A fazer scroll {NUM_SCROLLS} vezes...")
for _ in range(NUM_SCROLLS):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(SCROLL_WAIT)

# --- GUARDAR HTML DA PÁGINA PARA DEBUG ---
html_path = DOWNLOAD_DIR / "facebook_page_debug.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(driver.page_source)
print(f"HTML da página guardado em: {html_path}")

# --- EXTRAIR POSTS REAIS (evitando comentários) ---
raw_posts = driver.find_elements(By.CSS_SELECTOR, 'div[role="article"]')
posts = []

for post in raw_posts:
    try:
        # Verifica se há texto e/ou media visível
        has_text = post.find_elements(By.XPATH, ".//span[normalize-space(text())]")
        has_media = post.find_elements(By.TAG_NAME, "img") or post.find_elements(By.TAG_NAME, "video")
        if has_text or has_media:
            posts.append(post)
    except:
        continue

print(f"📦 Posts reais identificados: {len(posts)}")

# --- PROCESSAR OS POSTS ---
print("\n" + "="*80)
print("             RESULTADOS DA EXTRAÇÃO (TEST2.PY)             ")
print("="*80 + "\n")

# Processar apenas os primeiros 5 posts, como definido anteriormente
for i, post in enumerate(posts[:5]):
    print(f"\n--- Post {i+1} ---")

    # Expandir "Ver mais" se existir
    try:
        ver_mais = post.find_element(By.XPATH, ".//div[contains(@role,'button') and contains(.,'Ver mais')]")
        driver.execute_script("arguments[0].click();", ver_mais)
        time.sleep(1)
    except:
        pass

    # Extrair dados do post
    post_data = extract_post_data(post)

    # Imprimir dados extraídos de forma estruturada
    print(f"Data Publicação: {post_data['posted_on']}")
    print(f"Reações: {post_data['reactions_count']}")
    print(f"Comentários: {post_data['comments_count']}")
    print(f"Partilhas: {post_data['shares_count']}")
    print("\nConteúdo do Post:")
    if post_data["text"]:
        print(post_data["text"])
    else:
        print("(sem texto visível)")

    # Placeholders para dados não extraídos por este script
    print("\nOutros Dados (Não extraídos por este script):")
    print("ID: N/A")
    print("URL do Post: N/A")

    # Imagens
    images = post.find_elements(By.TAG_NAME, "img")
    if images:
        print("\n🖼️ Imagens encontradas:")
        for img in images:
            src = img.get_attribute("src")
            if src and "scontent" in src: # Filtra URLs que parecem ser de conteúdo
                print(f"  - {src}")
                download_and_display(src, "img")

    # Vídeos
    videos = post.find_elements(By.TAG_NAME, "video")
    if videos:
        print("\n🎬 Vídeos encontrados:")
        for vid in videos:
            src = vid.get_attribute("src")
            if src and not src.startswith("blob:"): # Filtra URLs temporárias
                print(f"  - {src}")
                download_and_display(src, "video")

    print("\n" + "-"*80)


# --- FECHAR DRIVER ---
print("\nFechando o navegador.")
driver.quit()
