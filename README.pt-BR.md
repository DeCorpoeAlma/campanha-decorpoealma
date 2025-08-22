# Campanha De Corpo e Alma

Este repositório contém o site da campanha política "Faro. De Corpo e Alma", uma plataforma web com frontend em React e backend em Python que inclui um chatbot inteligente para interação com os visitantes.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Desenvolvimento](#desenvolvimento)
- [Implantação](#implantação)
- [Contribuição](#contribuição)

## Visão Geral

O projeto "Campanha De Corpo e Alma" é um site para a campanha política "Faro. De Corpo e Alma", que apresenta informações sobre os candidatos Cristóvão Norte e Macário Correia, o programa eleitoral, eventos, notícias e uma equipe. O site também inclui um chatbot inteligente que utiliza modelos de IA para responder perguntas sobre a campanha.

## Tecnologias Utilizadas

### Frontend
- **React 18**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Bundler e ferramenta de desenvolvimento
- **TailwindCSS**: Framework CSS utilitário
- **Embla Carousel**: Biblioteca para carrosséis
- **React Markdown**: Para renderização de conteúdo markdown
- **Lucide React**: Biblioteca de ícones

### Backend
- **Python 3.9+**: Linguagem de programação
- **FastAPI**: Framework web para APIs
- **Uvicorn**: Servidor ASGI para Python
- **Hugging Face Transformers**: Biblioteca para modelos de IA
- **OpenRouter API**: Serviço para acesso a modelos de IA avançados
- **HTTPX**: Cliente HTTP assíncrono para Python
- **Pydantic**: Validação de dados e configurações

## Requisitos

### Frontend
- Node.js 18.x ou superior
- npm 9.x ou superior

### Backend
- Python 3.9 ou superior
- pip (gerenciador de pacotes Python)
- Ambiente virtual Python (recomendado)

## Instalação

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/campanha-decorpoealma.git
cd campanha-decorpoealma
```

### Frontend

```bash
# Instalar dependências do frontend
npm install
```

### Backend

O backend inclui scripts de inicialização que automatizam o processo de configuração e execução:

#### Linux/Mac:
```bash
cd backend
chmod +x start.sh  # Tornar o script executável (apenas na primeira vez)
./start.sh
```

#### Windows:
```bash
cd backend
start.bat
```

Estes scripts irão:
1. Criar um ambiente virtual Python se não existir
2. Instalar todas as dependências necessárias
3. Criar um arquivo `.env` a partir do `.env.example` se não existir
4. Iniciar o servidor backend

Alternativamente, você pode configurar manualmente:

```bash
# Criar e ativar ambiente virtual (recomendado)
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instalar dependências do backend
cd backend
pip install -r requirements.txt
```

## Configuração

### Frontend

Não é necessária configuração adicional para o frontend em ambiente de desenvolvimento.

### Backend

1. Copie o arquivo `.env.example` para `.env` na pasta `backend`:

```bash
cd backend
cp .env.example .env  # No Windows: copy .env.example .env
```

2. Edite o arquivo `.env` e configure as seguintes variáveis:

```
# API Keys
OPENROUTER_API_KEY=sua_chave_api_aqui

# Outras configurações conforme necessário
```

3. Obtenha uma chave de API do OpenRouter:
   - Acesse [OpenRouter](https://openrouter.ai/)
   - Crie uma conta e gere uma chave de API
   - Adicione a chave ao arquivo `.env`

## Execução

### Frontend

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

### Backend

```bash
# Na pasta raiz do projeto
cd backend
./start.sh  # No Linux/Mac
# OU
start.bat   # No Windows
```

Alternativamente, você pode iniciar manualmente:

```bash
# Na pasta raiz do projeto
cd backend
python run.py
```

O backend estará disponível em `http://localhost:8000`. Você pode acessar a documentação da API em `http://localhost:8000/docs`.

## Estrutura do Projeto

```
campanha-decorpoealma/
├── .env.example           # Exemplo de variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo Git
├── package.json           # Dependências e scripts do frontend
├── postcss.config.js      # Configuração do PostCSS
├── README.md              # Este arquivo em inglês
├── README.pt-BR.md        # Este arquivo em português
├── backend/               # Código do backend
│   ├── campaign_chatbot.py # Implementação principal do backend
│   ├── run.py             # Ponto de entrada do backend
│   ├── requirements.txt   # Dependências do backend
│   ├── .env.example       # Modelo para configuração de variáveis de ambiente
│   ├── start.sh           # Script de inicialização para Linux/Mac
│   └── start.bat          # Script de inicialização para Windows
├── public/                # Arquivos estáticos
│   ├── fonts/             # Fontes
│   ├── images/            # Imagens
│   └── candidatos/        # Fotos dos candidatos
└── src/                   # Código fonte do frontend
    ├── App.tsx            # Componente principal
    ├── components/        # Componentes React
    │   ├── Header.tsx     # Cabeçalho do site
    │   ├── Hero.tsx       # Seção principal
    │   ├── Chatbot.tsx    # Implementação do chatbot
    │   └── ...            # Outros componentes
    └── data/              # Dados estáticos
```

## Desenvolvimento

### Frontend

O frontend utiliza React com TypeScript e é construído com Vite. Os componentes estão organizados na pasta `src/components` e os dados estáticos na pasta `src/data`.

#### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a versão de produção localmente
- `npm run lint`: Executa o linter para verificar o código

### Backend

O backend utiliza FastAPI e é organizado em torno do arquivo `campaign_chatbot.py`, que contém a implementação principal da API. O arquivo `run.py` é o ponto de entrada para execução do servidor.

#### Endpoints Principais

- `GET /`: Verificação de saúde da API
- `GET /health`: Verificação de saúde detalhada
- `GET /models`: Lista modelos disponíveis
- `POST /chat`: Endpoint principal para interação com o chatbot
- `POST /sessions/cleanup`: Remove sessões antigas

## Implantação

### Frontend

O frontend está configurado para implantação no Netlify:

```bash
# Compilar o projeto
npm run build

# Implantar no Netlify (requer CLI do Netlify)
netlify deploy --prod
```

### Backend

O backend está configurado para implantação no Render:

1. Crie um novo serviço Web no Render
2. Conecte ao repositório GitHub
3. Configure as variáveis de ambiente no Render
4. Defina o comando de build: `pip install -r requirements.txt`
5. Defina o comando de start: `python run.py`

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.