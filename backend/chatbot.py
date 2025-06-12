from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
from datetime import datetime
import logging
from dotenv import load_dotenv

load_dotenv() # Carrega as variáveis do arquivo .env

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

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

class LLMChatbot:
    def __init__(self):
        self.conversation_history = {}
        self.headers = {
            "Authorization": f"Bearer {HUGGING_FACE_TOKEN}",
            "Content-Type": "application/json"
        }

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

    def query_huggingface(self, prompt, max_length=150):
        """Faz consulta à API da Hugging Face"""
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_length": max_length,
                "temperature": 0.7,
                "do_sample": True,
                "pad_token_id": 50256
            },
            "options": {
                "wait_for_model": True
            }
        }

        try:
            response = requests.post(
                HUGGING_FACE_API_URL,
                headers=self.headers,
                json=payload,
                timeout=30
            )

            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get('generated_text', '')
                    # Remove o prompt original da resposta
                    if generated_text.startswith(prompt):
                        generated_text = generated_text[len(prompt):].strip()
                    return self.clean_response(generated_text)
                else:
                    return "Não consegui gerar uma resposta adequada."
            else:
                logger.error(f"Erro na API Hugging Face: {response.status_code} - {response.text}")
                return "Desculpe, estou tendo dificuldades técnicas no momento."

        except requests.exceptions.Timeout:
            return "A resposta está demorando mais que o esperado. Tente novamente."
        except Exception as e:
            logger.error(f"Erro ao consultar LLM: {str(e)}")
            return "Ocorreu um erro interno. Tente novamente em alguns instantes."

    def generate_response(self, user_message, session_id):
        """Gera resposta usando a LLM com contexto"""

        # Recupera histórico da conversa
        if session_id not in self.conversation_history:
            self.conversation_history[session_id] = []

        history = self.conversation_history[session_id]

    def read_file_content(self, filepath):
        """Lê o conteúdo de um arquivo."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"Arquivo não encontrado: {filepath}")
            return ""
        except Exception as e:
            logger.error(f"Erro ao ler arquivo {filepath}: {str(e)}")
            return ""

    def extract_text_from_frontend(self, filepath):
        """Lê um arquivo do frontend e tenta extrair strings de texto."""
        content = self.read_file_content(filepath)
        if not content:
            return ""

        # Implementação simples: extrair strings entre aspas
        # Isso pode não ser perfeito para todos os casos e pode incluir chaves de tradução, etc.
        # Uma análise de AST seria mais robusta, mas mais complexa.
        import re
        strings = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'', content)
        extracted_text = " ".join([s[0] or s[1] for s in strings])

        # Remover múltiplos espaços em branco e quebras de linha
        cleaned_text = re.sub(r'\s+', ' ', extracted_text).strip()

        return cleaned_text

    def generate_response(self, user_message, session_id):
        """Gera resposta usando a LLM com contexto"""

        # Recupera histórico da conversa
        if session_id not in self.conversation_history:
            self.conversation_history[session_id] = []

        history = self.conversation_history[session_id]

        # Carregar conteúdo do site como contexto
        site_context = ""
        
        # Caminhos dos arquivos do frontend (ajuste conforme a estrutura do seu projeto)
        frontend_files = [
            '../src/components/Program.tsx',
            '../src/components/Team.tsx',
            '../src/components/CandidateSection.tsx',
            '../src/data/eventsData.ts',
            # Adicione outros arquivos relevantes aqui
        ]

        for filepath in frontend_files:
            extracted_text = self.extract_text_from_frontend(filepath)
            if extracted_text:
                site_context += f"Conteúdo de {filepath}:\n{extracted_text}\n\n"

        # Constrói o prompt com contexto
        prompt = CONTEXT_INFO + "\n\n" + site_context + "\n\n"

        # Adiciona histórico recente (últimas 3 interações)
        recent_history = history[-6:] if len(history) > 6 else history
        for msg in recent_history:
            prompt += f"Usuário: {msg['user']}\nAssistente: {msg['bot']}\n"

        prompt += f"Usuário: {user_message}\nAssistente:"

        # Gera resposta
        response = self.query_huggingface(prompt)

        # Salva no histórico
        history.append({
            'user': user_message,
            'bot': response,
            'timestamp': datetime.now().isoformat()
        })

        # Limita o histórico para não ficar muito grande
        if len(history) > 20:
            self.conversation_history[session_id] = history[-20:]

        return response

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
    print("📡 API disponível em: http://localhost:6000")
    print("🔍 Health check: http://localhost:6000/health")

    app.run(debug=True, port=6000, host='0.0.0.0')