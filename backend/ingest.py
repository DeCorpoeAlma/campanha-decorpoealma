# Configurar supressão de avisos antes de qualquer importação
import warnings
import os

# Suprimir todos os avisos de depreciação e UserWarning
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning)

from pypdf import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings # Usando a classe do pacote atualizado
from langchain_chroma import Chroma # Usar a classe atualizada

# Caminhos para os arquivos markdown
MARKDOWN_PATHS = [
    "./programa_eleitoral.md",
    "./listas_assembleias_freguesia.md"
]
# Diretório para armazenar o ChromaDB
CHROMA_DB_DIR = "./chroma_db"

def load_markdown(file_path):
    """Carrega um arquivo markdown e retorna o texto."""
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    return text

def load_pdf(file_path):
    """Carrega um PDF e extrai o texto."""
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def split_text_into_chunks(text):
    """Divide o texto em chunks menores."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.create_documents([text])
    return chunks

def create_and_store_embeddings(chunks, db_dir):
    """Cria embeddings e os armazena no ChromaDB."""
    # Usar um modelo de embedding local
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    # Cria o diretório se não existir
    if not os.path.exists(db_dir):
        os.makedirs(db_dir)

    # Cria e persiste o banco de dados vetorial
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=db_dir
    )
    print(f"Embeddings armazenados em {db_dir}")

def main():
    print("Iniciando processo de ingestão dos documentos da campanha...")
    
    full_text = ""
    loaded_files = []
    
    # Carregar todos os arquivos markdown disponíveis
    for markdown_path in MARKDOWN_PATHS:
        if os.path.exists(markdown_path):
            print(f"Carregando {markdown_path}...")
            text = load_markdown(markdown_path)
            full_text += f"\n\n--- {markdown_path} ---\n\n" + text
            loaded_files.append(markdown_path)
            print(f"✅ {markdown_path} carregado com sucesso")
        else:
            print(f"⚠️ {markdown_path} não encontrado, ignorando...")
    
    # Fallback para PDF se nenhum markdown foi encontrado
    if not loaded_files:
        PDF_PATH = "../public/programa_eleitoral_antigo.pdf"
        if os.path.exists(PDF_PATH):
            print(f"Nenhum markdown encontrado, carregando PDF de {PDF_PATH}...")
            full_text = load_pdf(PDF_PATH)
            loaded_files.append(PDF_PATH)
        else:
            print("Erro: Nenhum documento encontrado!")
            return
    
    print(f"📄 Total de documentos carregados: {len(loaded_files)}")
    print(f"📝 Texto total (primeiros 200 caracteres): {full_text[:200]}...")

    # 2. Dividir texto em chunks
    print("Dividindo texto em chunks...")
    chunks = split_text_into_chunks(full_text)
    print(f"Criados {len(chunks)} chunks.")

    # 3. Criar e armazenar embeddings
    print("Criando e armazenando embeddings no ChromaDB...")
    create_and_store_embeddings(chunks, CHROMA_DB_DIR)
    print("✅ Processo de ingestão concluído com sucesso!")
    print(f"📚 Documentos incluídos: {', '.join(loaded_files)}")

if __name__ == "__main__":
    main()