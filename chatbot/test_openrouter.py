# main.py
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

# Configuração de segurança
security = HTTPBearer()

# Gerenciador de contexto para aplicação
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Iniciando OpenRouter Backend...")
    app.state.sessions = {}
    app.state.http_client = httpx.AsyncClient(timeout=60.0)
    yield
    # Shutdown
    logger.info("🛑 Finalizando OpenRouter Backend...")
    await app.state.http_client.aclose()

# Inicialização da API
app = FastAPI(
    title="OpenRouter Chatbot Backend",
    description="Backend para chatbot usando OpenRouter API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique domínios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos disponíveis no OpenRouter
AVAILABLE_MODELS = {
    "anthropic/claude-3.5-sonnet": "Claude 3.5 Sonnet",
    "anthropic/claude-3-opus": "Claude 3 Opus",
    "openai/gpt-4o": "GPT-4o",
    "openai/gpt-4": "GPT-4",
    "openai/gpt-3.5-turbo": "GPT-3.5 Turbo",
    "meta-llama/llama-3.1-70b-instruct": "Llama 3.1 70B",
    "meta-llama/llama-3.1-8b-instruct": "Llama 3.1 8B",
    "google/gemini-pro": "Gemini Pro",
    "mistralai/mistral-large": "Mistral Large",
    "anthropic/claude-3-haiku": "Claude 3 Haiku"
}

class OpenRouterService:
    """Serviço para interagir com a API do OpenRouter"""
    
    def __init__(self):
        self.base_url = "https://openrouter.ai/api/v1"
    
    async def call_model(
        self,
        messages: List[Dict[str, str]],
        model: str,
        api_key: str,
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> Dict[str, Any]:
        """Chama a API do OpenRouter"""
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/yourusername/openrouter-chatbot",
            "X-Title": "OpenRouter Chatbot Backend"
        }
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False
        }
        
        try:
            async with app.state.http_client as client:
                response = await client.post(
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
    
    def __init__(self):
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
async def get_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Extrai e valida a chave da API"""
    if not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Chave da API OpenRouter é obrigatória"
        )
    return credentials.credentials

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
    api_key: str = Depends(get_api_key)
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
    
    # Converter para formato da API
    api_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in conversation_history
    ]
    
    try:
        # Chamar OpenRouter
        response_data = await openrouter_service.call_model(
            messages=api_messages,
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
    api_key: str = Depends(get_api_key)
):
    """Endpoint para chat com streaming (implementação futura)"""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Streaming ainda não implementado"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )