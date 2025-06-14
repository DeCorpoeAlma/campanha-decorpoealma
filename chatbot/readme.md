# OpenRouter Chatbot Backend

Backend completo em Python para chatbot usando OpenRouter API com FastAPI.

## 📦 Instalação

### 1. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

### 2. Instale as dependências:
```bash
pip install fastapi uvicorn httpx pydantic python-multipart
```

### 3. Execute o servidor:
```bash
python main.py
```

O servidor estará disponível em: `http://localhost:8000`

## 🔧 Configuração

### Obter Chave da API OpenRouter:
1. Visite [openrouter.ai](https://openrouter.ai)
2. Crie uma conta gratuita
3. Vá em "Keys" e gere uma nova chave da API
4. Use a chave no header Authorization: `Bearer sua_chave_aqui`

## 📚 Documentação da API

Acesse a documentação interativa em:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🚀 Endpoints Principais

### 1. Chat Principal
```http
POST /chat
Authorization: Bearer sua_chave_openrouter
Content-Type: application/json

{
  "message": "Olá, como você está?",
  "model": "anthropic/claude-3.5-sonnet",
  "temperature": 0.7,
  "max_tokens": 1000,
  "session_id": "optional-session-id"
}
```

**Resposta:**
```json
{
  "response": "Olá! Estou bem, obrigado por perguntar...",
  "model_used": "anthropic/claude-3.5-sonnet",
  "session_id": "uuid-da-sessao",
  "tokens_used": 45,
  "timestamp": "2025-06-13T10:30:00"
}
```

### 2. Listar Modelos Disponíveis
```http
GET /models
```

### 3. Informações da Sessão
```http
GET /sessions/{session_id}
```

### 4. Limpar Sessão
```http
DELETE /sessions/{session_id}
```

## 🐍 Exemplo de Cliente Python

```python
import httpx
import asyncio

class OpenRouterClient:
    def __init__(self, api_key: str, base_url: str = "http://localhost:8000"):
        self.api_key = api_key
        self.base_url = base_url
        self.session_id = None
    
    async def chat(self, message: str, model: str = "anthropic/claude-3.5-sonnet"):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "message": message,
                    "model": model,
                    "session_id": self.session_id
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                self.session_id = data["session_id"]
                return data["response"]
            else:
                return f"Erro: {response.status_code} - {response.text}"

# Uso
async def main():
    client = OpenRouterClient("sua_chave_openrouter")
    
    response = await client.chat("Olá, explique o que é machine learning")
    print(response)
    
    # Continuar conversa (mantém contexto)
    response = await client.chat("Pode dar um exemplo prático?")
    print(response)

# Executar
asyncio.run(main())
```

## 🌐 Exemplo de Cliente JavaScript/Frontend

```javascript
class OpenRouterAPI {
    constructor(apiKey, baseUrl = 'http://localhost:8000') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.sessionId = null;
    }

    async chat(message, model = 'anthropic/claude-3.5-sonnet') {
        try {
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    model: model,
                    session_id: this.sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.sessionId = data.session_id;
            return data.response;

        } catch (error) {
            console.error('Erro no chat:', error);
            throw error;
        }
    }

    async getModels() {
        const response = await fetch(`${this.baseUrl}/models`);
        return await response.json();
    }
}

// Uso
const api = new OpenRouterAPI('sua_chave_openrouter');

api.chat('Olá, como você está?')
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

## 🔒 Recursos de Segurança

- **Autenticação por Bearer Token**: Cada requisição precisa da chave da API
- **Validação de entrada**: Todos os dados são validados com Pydantic
- **Rate limiting**: Implementado pelo próprio OpenRouter
- **CORS configurado**: Para permitir requisições do frontend
- **Logs detalhados**: Para monitoramento e debugging

## 📊 Gerenciamento de Sessões

- **Sessões automáticas**: Cada conversa tem um ID único
- **Contexto persistente**: Mantém histórico da conversa
- **Limpeza automática**: Remove sessões antigas automaticamente
- **Limite de memória**: Evita acúmulo excessivo de dados

## 🔧 Configurações Avançadas

### Variáveis de Ambiente (opcional)
```bash
# .env
OPENROUTER_DEFAULT_MODEL=anthropic/claude-3.5-sonnet
MAX_TOKENS_DEFAULT=1000
SESSION_CLEANUP_HOURS=24
LOG_LEVEL=INFO
```

### Docker (opcional)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY main.py .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🚀 Deploy em Produção

### 1. Heroku
```bash
# Procfile
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 2. Railway/Render
- Configure a variável de ambiente `PORT`
- Use `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. VPS/Servidor Próprio
```bash
# Com Gunicorn para produção
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 📈 Monitoramento

O backend inclui:
- Logs estruturados
- Endpoint de health check (`/health`)
- Métricas de uso por sessão
- Tratamento de erros robusto

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.