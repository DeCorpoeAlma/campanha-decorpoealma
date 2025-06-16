# backend/campaign_chatbot.py
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import httpx
import asyncio
import logging
from datetime import datetime
import uuid
import json
import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv # Importar load_dotenv

def save_subscriber_email(email: str):
    """Guarda o email de subscrição num arquivo persistente ou local."""
    # Tenta obter o caminho do disco persistente de uma variável de ambiente
    persistent_dir = os.getenv("PERSISTENT_DISK_PATH")
    
    if persistent_dir:
        # Usa o caminho do disco persistente se definido
        filepath = os.path.join(persistent_dir, 'subscribers.txt')
        # Garante que o diretório exista
        os.makedirs(persistent_dir, exist_ok=True)
        logger.info(f"Usando disco persistente para guardar email em: {filepath}")
    else:
        # Fallback para arquivo local se a variável de ambiente não estiver definida
        filepath = os.path.join(os.path.dirname(__file__), 'subscribers.txt')
        logger.warning(f"Variável PERSISTENT_DISK_PATH não definida. Guardando email localmente em: {filepath}")

    try:
        with open(filepath, 'a') as f:
            f.write(email + '\n')
        logger.info(f"Email '{email}' guardado com sucesso em {filepath}")
    except Exception as e:
        logger.error(f"Erro ao guardar email '{email}' em {filepath}: {str(e)}")

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Configuração de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Modelos Pydantic
class Message(BaseModel):
    role: str = Field(..., description="Papel da mensagem: 'user', 'assistant', ou 'system'")
    content: str = Field(..., description="Conteúdo da mensagem")
    timestamp: Optional[datetime] = Field(default_factory=datetime.now)

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="Mensagem do usuário")
    model: str = Field(default="anthropic/claude-3.5-sonnet", description="Modelo a ser usado")
    temperature: float = Field(default=0.7, ge=0.0, le=2.0, description="Temperatura para geração")
    max_tokens: int = Field(default=1000, ge=1, le=4000, description="Máximo de tokens na resposta")
    session_id: Optional[str] = Field(default=None, description="ID da sessão para manter contexto")

class ChatResponse(BaseModel):
    response: str = Field(..., description="Resposta do modelo")
    model_used: str = Field(..., description="Modelo utilizado")
    session_id: str = Field(..., description="ID da sessão")
    tokens_used: Optional[int] = Field(default=0, description="Tokens utilizados")
    timestamp: datetime = Field(default_factory=datetime.now)

class SessionInfo(BaseModel):
    session_id: str
    created_at: datetime
    message_count: int
    last_activity: datetime

class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    version: str = "1.0.0"

# Configuração de segurança (usaremos a chave do .env, mas mantemos a estrutura para consistência)
# security = HTTPBearer() # Não usaremos mais HTTPBearer para a chave principal

# Modelo Pydantic para subscrição
class SubscribeRequest(BaseModel):
    email: str = Field(..., description="Email para subscrição")

# Gerenciador de contexto para aplicação
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Iniciando Campaign Chatbot Backend...")
    app.state.sessions = {}
    app.state.http_client = httpx.AsyncClient(timeout=60.0)
    app.state.site_context = load_site_content() # Carregar conteúdo do site na inicialização
    logger.info(f"Conteúdo do site carregado. Tamanho: {len(app.state.site_context)} caracteres.")
    yield
    # Shutdown
    logger.info("🛑 Finalizando Campaign Chatbot Backend...")
    await app.state.http_client.aclose()

# Inicialização da API
app = FastAPI(
    title="Campaign Chatbot Backend",
    description="Backend para chatbot da campanha usando OpenRouter API e conteúdo do site",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://decorpoealma.netlify.app"],  # Domínio do site Netlify em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos disponíveis no OpenRouter (pode ajustar conforme necessário)
AVAILABLE_MODELS = {
    "anthropic/claude-3.5-sonnet": "Claude 3.5 Sonnet",
    "openai/gpt-4o": "GPT-4o",
    "openai/gpt-3.5-turbo": "GPT-3.5 Turbo",
    "meta-llama/llama-3.1-70b-instruct": "Llama 3.1 70B",
    "google/gemini-pro": "Gemini Pro",
    "mistralai/mistral-large": "Mistral Large",
    "anthropic/claude-3-haiku": "Claude 3 Haiku"
}

def read_file_content(filepath):
    """Lê o conteúdo de um arquivo."""
    try:
        # Caminho relativo ao diretório do script
        script_dir = os.path.dirname(__file__)
        abs_filepath = os.path.join(script_dir, '..', filepath) # Ajuste o '..' conforme a estrutura
        
        # Normaliza o caminho para evitar problemas
        abs_filepath = os.path.normpath(abs_filepath)

        if not os.path.exists(abs_filepath):
             logger.warning(f"Arquivo não encontrado ao tentar ler: {abs_filepath}")
             return ""

        with open(abs_filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        logger.error(f"Erro ao ler arquivo {filepath}: {str(e)}")
        return ""

import re

def extract_text_from_frontend(filepath):
    """Lê um arquivo do frontend e tenta extrair strings de texto."""
    content = read_file_content(filepath)
    if not content:
        return ""

    # Implementação mais robusta: tentar extrair texto de tags comuns e strings
    # Isso é uma simplificação e pode não capturar todo o texto ou ser perfeito
    # para todos os formatos de arquivo (ex: TSX)
    
    # Remover comentários (HTML, JS, TSX)
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    content = re.sub(r'//.*?\n', '', content)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

    # Extrair strings entre aspas simples ou duplas
    strings = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'', content)
    extracted_strings = [s[0] or s[1] for s in strings]

    # Tentar extrair texto de tags HTML/JSX comuns (simplificado)
    # Isso pode ser impreciso para estruturas complexas
    text_in_tags = re.findall(r'>([^<]+)<', content)
    
    # Extrair URLs de tags <a>
    urls_in_tags = re.findall(r'<a\s+[^>]*href=["\']([^"\']+)["\']', content)

    # Combinar e limpar
    all_text = " ".join(extracted_strings + text_in_tags + urls_in_tags)

    # Remover múltiplos espaços em branco e quebras de linha
    cleaned_text = re.sub(r'\s+', ' ', all_text).strip()

    return cleaned_text

def load_site_content():
    """Carrega o conteúdo relevante do site para usar como contexto."""
    site_context = ""
    
    # Caminhos dos arquivos do frontend (ajuste conforme a estrutura do seu projeto)
    # Adicione aqui todos os arquivos relevantes que contêm informações sobre a campanha e candidatos
    frontend_files = [
        'src/components/Hero.tsx', # Adicionado componente Hero
        'src/components/CandidateSection.tsx',
        'src/components/CristovaoValues.tsx',
        'src/components/CristovaoVision.tsx',
        'src/components/MacarioCorreiaSection.tsx',
        'src/components/MacarioPoliticalCareer.tsx',
        'src/components/MacarioRole.tsx',
        'src/components/Program.tsx',
        'src/components/Team.tsx',
        'src/components/Contact.tsx',
        'src/components/News.tsx',
        'src/components/Events.tsx', # Garantir que Eventos está incluído
        'src/components/Participate.tsx', # Garantir que Participate está incluído
        'src/components/Footer.tsx', # Adicionado componente Footer
        'src/data/candidatesData.ts',
        'src/data/eventsData.ts',
        'README.md',
    ]

    for filepath in frontend_files:
        extracted_text = extract_text_from_frontend(filepath)
        if extracted_text:
            site_context += f"Conteúdo de {filepath}:\n{extracted_text}\n\n"

    return site_context

class OpenRouterService:
    """Serviço para interagir com a API do OpenRouter"""
    
    def __init__(self):
        self.base_url = "https://openrouter.ai/api/v1"
    
    async def call_model(
        self,
        messages: List[Dict[str, str]],
        model: str,
        api_key: str, # A chave agora vem do .env via dependência
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> Dict[str, Any]:
        """Chama a API do OpenRouter"""
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/DeCorpoeAlma/campanha-decorpoealma", # Use o URL do seu repositório
            "X-Title": "Campaign Chatbot Backend"
        }
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False
        }
        
        try:
            # Usar a instância do cliente HTTP do estado da aplicação
            response = await app.state.http_client.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload
            )
                
            if response.status_code != 200:
                error_data = response.json() if response.content else {}
                error_msg = error_data.get("error", {}).get("message", f"HTTP {response.status_code}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Erro da API OpenRouter: {error_msg}"
                )
            
            return response.json()
                
        except httpx.TimeoutException:
            raise HTTPException(
                status_code=status.HTTP_408_REQUEST_TIMEOUT,
                detail="Timeout na chamada para OpenRouter"
            )
        except httpx.RequestError as e:
            logger.error(f"Erro na requisição: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Erro de conexão com OpenRouter"
            )

class SessionManager:
    """Gerenciador de sessões de chat"""
    
    def __init__(self): # Corrigido o erro de sintaxe aqui
        self.sessions: Dict[str, List[Message]] = {}
        self.session_info: Dict[str, SessionInfo] = {}
    
    def create_session(self, session_id: str = None) -> str:
        """Cria uma nova sessão"""
        if not session_id:
            session_id = str(uuid.uuid4())
        
        self.sessions[session_id] = []
        self.session_info[session_id] = SessionInfo(
            session_id=session_id,
            created_at=datetime.now(),
            message_count=0,
            last_activity=datetime.now()
        )
        
        logger.info(f"Nova sessão criada: {session_id}")
        return session_id
    
    def add_message(self, session_id: str, message: Message):
        """Adiciona mensagem à sessão"""
        if session_id not in self.sessions:
            self.create_session(session_id)
        
        self.sessions[session_id].append(message)
        
        # Atualiza info da sessão
        if session_id in self.session_info:
            self.session_info[session_id].message_count += 1
            self.session_info[session_id].last_activity = datetime.now()
    
    def get_messages(self, session_id: str) -> List[Message]:
        """Obtém mensagens da sessão"""
        return self.sessions.get(session_id, [])
    
    def get_session_info(self, session_id: str) -> Optional[SessionInfo]:
        """Obtém informações da sessão"""
        return self.session_info.get(session_id)
    
    def clear_session(self, session_id: str) -> bool:
        """Limpa uma sessão"""
        if session_id in self.sessions:
            del self.sessions[session_id]
            if session_id in self.session_info:
                del self.session_info[session_id]
            logger.info(f"Sessão limpa: {session_id}")
            return True
        return False
    
    def cleanup_old_sessions(self, max_age_hours: int = 24):
        """Remove sessões antigas"""
        now = datetime.now()
        old_sessions = []
        
        for session_id, info in self.session_info.items():
            age = (now - info.last_activity).total_seconds() / 3600
            if age > max_age_hours:
                old_sessions.append(session_id)
        
        for session_id in old_sessions:
            self.clear_session(session_id)
        
        if old_sessions:
            logger.info(f"Removidas {len(old_sessions)} sessões antigas")

# Instâncias dos serviços
openrouter_service = OpenRouterService()
session_manager = SessionManager()

# Dependências
def get_openrouter_api_key() -> str:
    """Obtém a chave da API OpenRouter das variáveis de ambiente."""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key or api_key == 'seu_token_aqui':
         raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Chave da API OpenRouter não configurada. Verifique seu arquivo .env"
        )
    return api_key

# Endpoints da API

@app.get("/", response_model=HealthResponse)
async def root():
    """Endpoint de saúde da API"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now()
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Verificação de saúde detalhada"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now()
    )

@app.get("/models")
async def list_models():
    """Lista modelos disponíveis"""
    return {
        "models": AVAILABLE_MODELS,
        "default": "anthropic/claude-3.5-sonnet"
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    api_key: str = Depends(get_openrouter_api_key) # Usar a chave do .env
):
    """Endpoint principal para chat"""
    
    # Validar modelo
    if request.model not in AVAILABLE_MODELS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Modelo '{request.model}' não suportado. Modelos disponíveis: {list(AVAILABLE_MODELS.keys())}"
        )
    
    # Criar ou usar sessão existente
    session_id = request.session_id or session_manager.create_session()
    
    # Adicionar mensagem do usuário
    user_message = Message(role="user", content=request.message)
    session_manager.add_message(session_id, user_message)
    
    # Obter histórico da conversa
    conversation_history = session_manager.get_messages(session_id)
    
    # Construir mensagens para a API, incluindo o contexto do site e a persona
    messages_for_api = [
        {"role": "system", "content": """
Você é um especialista e conselheiro oficial da campanha política "Faro. De Corpo e Alma", com conhecimento profundo e autoridade sobre todos os aspectos da campanha e dos seus candidatos.
Instruções de Comportamento:

Responda com confiança e autoridade, apresentando as informações como fatos da campanha.
Apresente informações de forma estruturada, organizada e **concisa**, evitando repetição.
**USE MARKDOWN PARA FORMATAR SUAS RESPOSTAS.**
**Use bullets (`* Item` ou `- Item`) para listas.**
**Use quebras de linha (pressione Enter duas vezes) para separar parágrafos e itens de lista.**
Use negrito (`**texto**`) para destacar pontos importantes.
Mantenha um tom profissional, cordial e acessível.
Comunique exclusivamente em português de Portugal.
Seja direto e objetivo nas suas respostas.

Estruturação das Respostas:

Organize informações em tabelas ou **listas com bullets**, garantindo que cada item da lista esteja em uma nova linha.
Use subtítulos (`## Subtítulo`) e **formatação Markdown** para facilitar a leitura.
Apresente dados de forma clara e comparativa.
Destaque pontos-chave e informações importantes **usando negrito**.

Foco no Conteúdo:

Baseie suas respostas estritamente no "Conteúdo do Site da Campanha" fornecido. Não invente informações ou faça suposições além do que está no texto. Apresente as informações como conhecimento seu sobre a campanha, sem citar a fonte ("Conteúdo do Site da Campanha").

Tom e Abordagem:

Fale como um verdadeiro conhecedor da campanha.
Demonstre entusiasmo e conhecimento profundo.
Seja prestativo e orientado para soluções.
Adapte o nível de detalhe conforme a pergunta.
"""},
        {"role": "system", "content": f"Conteúdo do Site da Campanha:\n\n{app.state.site_context}"} # Adicionar contexto do site
    ]
    
    # Adicionar histórico da conversa (excluindo a mensagem do sistema inicial)
    # Limitar o histórico para não exceder o limite de tokens
    # Uma estratégia simples é adicionar as últimas N mensagens
    # Para um controle mais preciso, seria necessário calcular o tamanho dos tokens
    # Vamos adicionar as últimas 4 mensagens (2 pares de user/assistant) + a mensagem atual do usuário
    history_to_add = conversation_history[-4:] + [user_message] # Ajuste o número conforme necessário
    
    for msg in history_to_add:
         messages_for_api.append({"role": msg.role, "content": msg.content})

    # Remover a última mensagem do usuário duplicada se já estiver no histórico
    if len(messages_for_api) > 1 and messages_for_api[-1]["role"] == "user" and messages_for_api[-2]["role"] == "user":
         messages_for_api.pop(-2)


    try:
        # Chamar OpenRouter
        response_data = await openrouter_service.call_model(
            messages=messages_for_api,
            model=request.model,
            api_key=api_key,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        
        # Extrair resposta
        assistant_response = response_data["choices"][0]["message"]["content"]
        tokens_used = response_data.get("usage", {}).get("total_tokens", 0)
        
        # Adicionar resposta do assistente à sessão
        assistant_message = Message(role="assistant", content=assistant_response)
        session_manager.add_message(session_id, assistant_message)
        
        return ChatResponse(
            response=assistant_response,
            model_used=request.model,
            session_id=session_id,
            tokens_used=tokens_used
        )
        
    except Exception as e:
        logger.error(f"Erro no chat: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro interno: {str(e)}"
        )

@app.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """Obtém informações de uma sessão"""
    session_info = session_manager.get_session_info(session_id)
    if not session_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sessão não encontrada"
        )
    
    messages = session_manager.get_messages(session_id)
    return {
        "session_info": session_info,
        "messages": messages
    }

@app.delete("/sessions/{session_id}")
async def clear_session(session_id: str):
    """Limpa uma sessão específica"""
    if session_manager.clear_session(session_id):
        return {"message": f"Sessão {session_id} limpa com sucesso"}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sessão não encontrada"
        )

@app.post("/sessions/cleanup")
async def cleanup_sessions(max_age_hours: int = 24):
    """Remove sessões antigas"""
    session_manager.cleanup_old_sessions(max_age_hours)
    return {"message": f"Sessões mais antigas que {max_age_hours}h foram removidas"}

# Endpoint para streaming (opcional)
@app.post("/chat/stream")
async def chat_stream(
    request: ChatRequest,
    api_key: str = Depends(get_openrouter_api_key)
):
    """Endpoint para chat com streaming (implementação futura)"""

@app.post("/subscribe")
async def subscribe(request: SubscribeRequest):
    """Endpoint para subscrição da agenda"""
    logger.info(f"Pedido de subscrição recebido para o email: {request.email}")
    save_subscriber_email(request.email) # Chamar a função para guardar o email
    return {"message": "Subscrição recebida com sucesso!"}
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Streaming ainda não implementado"
    )

if __name__ == "__main__":
    import uvicorn
    # Para rodar localmente, certifique-se de ter uvicorn instalado: pip install uvicorn
    uvicorn.run(
        "campaign_chatbot:app", # Nome do arquivo:instância do FastAPI
        host="0.0.0.0",
        port=8000, # Porta padrão do FastAPI
        reload=True, # Recarrega o servidor ao salvar o código
        log_level="info"
    )