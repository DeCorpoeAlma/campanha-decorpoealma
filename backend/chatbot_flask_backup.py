# Configurar supressão de avisos antes de qualquer importação
import warnings
import os

# Suprimir todos os avisos de depreciação e UserWarning
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning)

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime
import logging
from dotenv import load_dotenv

# Importações para RAG
from langchain_huggingface import HuggingFaceEmbeddings # Usando a classe do pacote atualizado
from langchain_chroma import Chroma # Usar a classe atualizada
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEndpoint # Nova importação para HuggingFace LLM

load_dotenv() # Carrega as variáveis do arquivo .env

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configurar CORS para permitir requisições do frontend
CORS(app, resources={r"/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization"]}})

# Configurações da Hugging Face
HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
# Alternativas gratuitas:
# "microsoft/DialoGPT-large" - Melhor para conversação
# "facebook/blenderbot-400M-distill" - Bom para chat geral
# "google/flan-t5-base" - Bom para Q&A

# Você precisa criar uma conta gratuita em https://huggingface.co e obter um token
HUGGING_FACE_TOKEN = os.getenv('HUGGING_FACE_TOKEN', 'seu_token_aqui')

# Contexto do seu site/negócio - adapte conforme necessário
CONTEXT_INFO = """
Você é um assistente inteligente que ajuda usuários com informações sobre nossa empresa.
Nossa empresa oferece serviços de tecnologia e desenvolvimento web.
Sempre seja útil, educado e profissional em suas respostas.
Se não souber algo específico, seja honesto e ofereça ajuda alternativa.
"""

# Diretório do ChromaDB
CHROMA_DB_DIR = "./chroma_db"

class LLMChatbot:
    def __init__(self):
        self.conversation_history = {}
        self.headers = {
            "Authorization": f"Bearer {HUGGING_FACE_TOKEN}",
            "Content-Type": "application/json"
        }
        
        # Inicializa o modelo de embeddings
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        # Carrega o banco de dados vetorial persistido
        self.vectordb = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=self.embeddings)
        
        # Não vamos usar o LLM da Hugging Face por enquanto, apenas recuperar os documentos relevantes
        
        # Configurar o retriever para buscar documentos relevantes
        self.retriever = self.vectordb.as_retriever(search_kwargs={"k": 3})  # Recupera os 3 chunks mais relevantes

    def get_session_id(self, request):
        """Gera um ID de sessão único para manter o contexto da conversa"""
        return request.remote_addr + str(hash(request.headers.get('User-Agent', '')))

    def clean_response(self, response_text):
        """Limpa e formata a resposta da LLM"""
        if not response_text:
            return "Desculpe, não consegui gerar uma resposta no momento."

        # Remove tokens especiais e limpa a resposta
        cleaned = response_text.strip()
        if cleaned.startswith('<|endoftext|>'):
            cleaned = cleaned.replace('<|endoftext|>', '').strip()

        return cleaned if cleaned else "Posso ajudá-lo com algo mais específico?"

    def generate_response(self, user_message, session_id):
        """Gera resposta usando os documentos recuperados do ChromaDB."""

        # Recupera histórico da conversa (ainda útil para manter o fluxo da conversa)
        if session_id not in self.conversation_history:
            self.conversation_history[session_id] = []

        history = self.conversation_history[session_id]

        try:
            # Recupera documentos relevantes usando o retriever com o método invoke
            docs = self.retriever.invoke(user_message)
            
            if docs:
                # Extrai o conteúdo dos documentos recuperados
                doc_contents = [doc.page_content for doc in docs]
                
                # Cria uma resposta simples com base nos documentos recuperados
                response = "Com base no programa eleitoral, encontrei as seguintes informações:\n\n"
                for i, content in enumerate(doc_contents, 1):
                    # Limita o tamanho de cada trecho para não ficar muito longo
                    if len(content) > 300:
                        content = content[:300] + "..."
                    response += f"{i}. {content}\n\n"
            else:
                response = "Não encontrei informações específicas sobre isso no programa eleitoral."
            
            cleaned_response = response

        except Exception as e:
            logger.error(f"Erro ao recuperar documentos: {str(e)}")
            cleaned_response = "Desculpe, não consegui gerar uma resposta com base nas informações disponíveis."

        # Salva no histórico
        history.append({
            'user': user_message,
            'bot': cleaned_response,
            'timestamp': datetime.now().isoformat()
        })

        # Limita o histórico para não ficar muito grande
        if len(history) > 20:
            self.conversation_history[session_id] = history[-20:]

        return cleaned_response

# Instanciar o chatbot
chatbot = LLMChatbot()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()

        if not data or 'message' not in data:
            return jsonify({"error": "Mensagem não fornecida"}), 400

        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({"error": "Mensagem vazia"}), 400

        # Obtém ID da sessão para manter contexto
        session_id = chatbot.get_session_id(request)

        # Gera resposta usando a LLM
        bot_response = chatbot.generate_response(user_message, session_id)

        logger.info(f"Pergunta: {user_message[:50]}... | Resposta: {bot_response[:50]}...")

        return jsonify({
            "response": bot_response,
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Erro no endpoint /chat: {str(e)}")
        return jsonify({"error": "Erro interno do servidor"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint para verificar se o serviço está funcionando"""
    return jsonify({
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "model": "Hugging Face LLM"
    })

@app.route('/clear_history', methods=['POST'])
def clear_history():
    """Limpa o histórico de conversa de uma sessão"""
    session_id = chatbot.get_session_id(request)
    if session_id in chatbot.conversation_history:
        del chatbot.conversation_history[session_id]
    return jsonify({"message": "Histórico limpo com sucesso"})

if __name__ == '__main__':
    # Verificar se o token foi configurado
    if HUGGING_FACE_TOKEN == 'seu_token_aqui':
        print("⚠️  ATENÇÃO: Configure seu token da Hugging Face!")
        print("1. Vá para https://huggingface.co")
        print("2. Crie uma conta gratuita")
        print("3. Vá em Settings > Access Tokens")
        print("4. Crie um novo token")
        print("5. Configure a variável de ambiente: export HUGGING_FACE_TOKEN='seu_token'")
        print("6. Ou substitua 'seu_token_aqui' no código")

    print("🤖 Iniciando chatbot com LLM gratuita...")
    print("📡 API disponível em: http://localhost:8000")
    print("🔍 Health check: http://localhost:8000/health")

    app.run(debug=True, port=8000, host='0.0.0.0')