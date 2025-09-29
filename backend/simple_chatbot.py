#!/usr/bin/env python3
"""
Simplified chatbot backend for testing
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from datetime import datetime
import uuid

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# RAG imports
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

app = FastAPI(title="Simple Campaign Chatbot")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://decorpoealma.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG system
CHROMA_DB_DIR = "./chroma_db"
embeddings = None
vectordb = None
retriever = None

try:
    # Try to load the knowledge base
    if os.path.exists(CHROMA_DB_DIR):
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        vectordb = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
        retriever = vectordb.as_retriever(search_kwargs={"k": 3})
        print("✅ Knowledge base loaded successfully!")
    else:
        print("⚠️ Knowledge base not found. Using pre-programmed responses only.")
except Exception as e:
    print(f"⚠️ Could not load knowledge base: {e}")
    embeddings = None
    vectordb = None
    retriever = None

# Models
class ChatRequest(BaseModel):
    message: str
    model: str = "simple"
    session_id: str = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    model_used: str = "simple"
    timestamp: datetime

# Enhanced response system with rich content and RAG integration
def get_simple_response(message: str) -> str:
    """Generate detailed responses based on keywords and document knowledge"""
    message_lower = message.lower()
    
    # First, try to get information from the electoral program if available
    if retriever is not None:
        try:
            # Check if the question is about program/proposals or any specific topic
            if any(word in message_lower for word in ['programa', 'proposta', 'projeto', 'medida', 'plano', 'política', 'específic', 'turismo', 'economia', 'desenvolvimento', 'ambiente', 'sustentabilidade', 'urbano', 'cultura', 'saúde', 'educação', 'transportes', 'habitação', 'segurança']):
                docs = retriever.invoke(message)
                if docs:
                    # Combine information from retrieved documents
                    doc_contents = []
                    for doc in docs:
                        content = doc.page_content.strip()
                        if len(content) > 50:  # Only include substantial content
                            doc_contents.append(content)
                    
                    if doc_contents:
                        response = f"## 📋 Com base no Programa Eleitoral \"Faro Capital de Confiança\"\n\n"
                        for i, content in enumerate(doc_contents[:2], 1):  # Limit to 2 most relevant chunks
                            if len(content) > 400:
                                content = content[:400] + "..."
                            response += f"### {i}. {content}\n\n"
                        response += "---\n*Informação extraída do programa eleitoral oficial*"
                        return response
        except Exception as e:
            print(f"Error accessing knowledge base: {e}")
    
    # Fall back to pre-programmed responses
    
    if any(word in message_lower for word in ['olá', 'ola', 'hello', 'hi', 'bom dia', 'boa tarde']):
        return """# 🤝 Bem-vindo à Campanha "Faro. De Corpo e Alma"!

Olá! Sou o seu assistente especializado na campanha eleitoral **"Faro. De Corpo e Alma"**.

## 💡 Posso ajudá-lo com:
- **Informações detalhadas** sobre os candidatos
- **Programa eleitoral** completo e propostas específicas
- **Visão da campanha** para o desenvolvimento de Faro
- **Eventos** e iniciativas da campanha
- **Contactos** e formas de participar

**O que gostaria de saber primeiro?** 🗣️"""
    
    if any(word in message_lower for word in ['cristóvão', 'cristovao', 'candidato', 'presidente']):
        return """# 👤 Cristóvão Norte - Candidato a Presidente

## 🎯 Perfil
**Cristóvão Norte** lidera a campanha "Faro. De Corpo e Alma" com uma visão transformadora para a cidade.

## 🌟 Visão Política
- **Desenvolvimento sustentável** como prioridade máxima
- **Proximidade aos cidadãos** em todas as decisões
- **Inovação** aliada à preservação da identidade local
- **Transparência** total na gestão municipal

## 📈 Principais Propostas
- Revitalização do centro histórico
- Criação de zonas verdes urbanas
- Apoio às empresas locais e empreendedorismo
- Melhoria dos transportes públicos
- Digitalização dos serviços municipais

**Uma liderança com alma para Faro!** ✨"""
    
    if any(word in message_lower for word in ['macário', 'macario', 'vice']):
        return """# 👨‍💼 Macário Correia - Candidato a Vice-Presidente

## 🎖️ Experiência
**Macário Correia** traz décadas de experiência política e conhecimento profundo da realidade local.

## 🏛️ Trajetória Política
- **Vasta experiência** em gestão pública
- **Conhecimento local** incomparável
- **Relacionamento próximo** com todas as freguesias
- **Histórico** de defesa dos interesses de Faro

## 🤝 Complementaridade
A parceria Cristóvão Norte e Macário Correia representa:
- **Inovação + Experiência**
- **Visão futura + Conhecimento local**
- **Energia renovada + Sabedoria política**

**A dupla perfeita para liderar Faro!** 🚀"""
    
    if any(word in message_lower for word in ['programa', 'propostas', 'projetos']):
        return """# 📋 Programa Eleitoral "Faro. De Corpo e Alma"

## 🏙️ **DESENVOLVIMENTO URBANO**
- **Revitalização do Centro Histórico**
  - Requalificação de edifícios degradados
  - Criação de espaços culturais e comerciais
  - Melhoria da iluminação e segurança

- **Zonas Verdes e Sustentabilidade**
  - Criação de novos parques urbanos
  - Corredores verdes ligando a cidade
  - Programa de plantação de árvores

## 💼 **ECONOMIA LOCAL**
- **Apoio ao Empreendedorismo**
  - Incubadora municipal de empresas
  - Facilitar licenciamentos para PMEs
  - Programas de formação profissional

- **Turismo Sustentável**
  - Promoção do turismo cultural
  - Circuitos históricos e naturais
  - Eventos culturais regulares

## 🚌 **MOBILIDADE E TRANSPORTES**
- Expansão da rede de transportes públicos
- Criação de ciclovias seguras
- Melhoria do estacionamento no centro

## 🏥 **QUALIDADE DE VIDA**
- Reforço dos serviços de saúde locais
- Programas desportivos para todas as idades
- Apoio à terceira idade

**Um programa completo para transformar Faro!** 🌟"""
    
    if any(word in message_lower for word in ['campanha', 'faro', 'corpo', 'alma', 'visão']):
        return """# 💫 "Faro. De Corpo e Alma" - A Nossa Visão

## 🎯 **O QUE REPRESENTA**
"**De Corpo e Alma**" não é apenas um slogan - é a nossa filosofia de governação:

### 🤲 **DE CORPO**
- **Presença física** em todas as freguesias
- **Ação concreta** em cada problema
- **Trabalho árduo** e dedicação total
- **Proximidade real** com os cidadãos

### ❤️ **DE ALMA**
- **Paixão genuína** por Faro e pelos farenses
- **Valores humanos** no centro das decisões
- **Preservação da identidade** cultural da cidade
- **Compromisso emocional** com o futuro de Faro

## 🌍 **VISÃO PARA FARO**
- Uma cidade **moderna** mas com **alma**
- **Sustentável** para as próximas gerações
- **Inclusiva** para todos os cidadãos
- **Próspera** economicamente
- **Culturalmente rica** e diversa

**Faro merece uma governação de corpo e alma!** ✨"""
    
    if any(word in message_lower for word in ['candidatos', 'equipa', 'equipe', 'team', 'listas']):
        return """# 👥 A Nossa Equipa - "Faro. De Corpo e Alma"

## 🏆 **LIDERANÇA**
### 🥇 **Cristóvão Norte** - Candidato a Presidente
- Visão inovadora e sustentável
- Liderança jovem e dinâmica
- Compromisso com a transparência

### 🥈 **Macário Correia** - Candidato a Vice-Presidente  
- Experiência política consolidada
- Conhecimento profundo da realidade local
- Relacionamento forte com todas as freguesias

## 🌟 **CARACTERÍSTICAS DA EQUIPA**
- **Diversidade geracional** - juventude + experiência
- **Representatividade local** - conhecimento de todas as freguesias
- **Competência técnica** em áreas cruciais
- **Compromisso social** com todos os estratos da população

## 🚀 **ÁREAS DE ESPECIALIZAÇÃO**
- **Desenvolvimento urbano** sustentável
- **Economia local** e empreendedorismo  
- **Cultura e turismo** cultural
- **Ambiente** e sustentabilidade
- **Ação social** e apoio comunitário

## 🤝 **FILOSOFIA DE TRABALHO**
- **Trabalho em equipa** 
- **Decisões participativas**
- **Transparência total**
- **Proximidade aos cidadãos**

**Uma equipa preparada para servir Faro!** 💪"""
    
    if any(word in message_lower for word in ['contacto', 'contactos', 'participar', 'apoiar', 'voluntário']):
        return """# 📞 Como Participar na Campanha

## 🤝 **FORMAS DE APOIAR**
- **Voluntariado** em eventos e ações
- **Partilha** das nossas propostas nas redes sociais
- **Participação** em eventos públicos
- **Sugestões** e ideias para o programa

## 📱 **CONTACTOS**
- **Website**: [Site oficial da campanha]
- **Facebook**: Campanha "Faro. De Corpo e Alma"
- **Instagram**: @farodeCorpoeAlma
- **Email**: info@farodeCorpoeAlma.pt

## 🗓️ **EVENTOS PRÓXIMOS**
- **Sessões públicas** em todas as freguesias
- **Encontros temáticos** sobre economia, ambiente, cultura
- **Caminhadas** pelos bairros da cidade

**A sua participação faz a diferença! Junte-se a nós!** 🌟"""
    
    # More specific topics
    if any(word in message_lower for word in ['ambiente', 'sustentabilidade', 'verde', 'ecologia']):
        return """# 🌱 Ambiente e Sustentabilidade

## 🌳 **COMPROMISSO AMBIENTAL**
A campanha "Faro. De Corpo e Alma" coloca a **sustentabilidade** no centro da nossa visão.

## 📊 **PRINCIPAIS MEDIDAS**
- **Neutralidade carbónica** municipal até 2030
- **Economia circular** - redução, reutilização, reciclagem
- **Energias renováveis** em todos os edifícios municipais
- **Transportes verdes** - expansão de ciclovias e transportes elétricos

## 🌊 **PROTEÇÃO DO PATRIMÓNIO NATURAL**
- Preservação da **Ria Formosa**
- Criação de **corredores ecológicos** urbanos
- **Reflorestação** de áreas degradadas
- Programas de **educação ambiental**

**Por um Faro mais verde e sustentável!** 🌍"""
    
    if any(word in message_lower for word in ['economia', 'emprego', 'empresas', 'negócios']):
        return """# 💼 Desenvolvimento Econômico

## 📈 **ESTRATÉGIA ECONÓMICA**
Transformar Faro num **polo de inovação** e **desenvolvimento sustentável**.

## 🚀 **MEDIDAS PARA AS EMPRESAS**
- **Incubadora municipal** para startups
- **Simplificação** dos processos de licenciamento
- **Apoio financeiro** a PMEs locais
- **Espaços de coworking** municipais

## 🏭 **SETORES PRIORITÁRIOS**
- **Turismo sustentável** e cultural
- **Tecnologia** e inovação
- **Agroalimentar** e produtos locais
- **Economia do mar** e pesca sustentável

## 🎓 **FORMAÇÃO E EMPREGO**
- **Parcerias** com universidades e centros de formação
- **Programas** de estágio e inserção profissional
- **Reskilling** para profissões do futuro

**Faro como motor económico do Algarve!** 💪"""
    
    # Default response with more personality
    return """# 🤔 Posso Ajudar com Mais Detalhes!

Obrigado pela sua pergunta! Como assistente especializado da campanha **"Faro. De Corpo e Alma"**, tenho informação detalhada sobre:

## 📚 **TEMAS DISPONÍVEIS**
- 👤 **Candidatos** - Cristóvão Norte e Macário Correia
- 📋 **Programa eleitoral** completo e propostas específicas  
- 🌱 **Ambiente e sustentabilidade**
- 💼 **Desenvolvimento económico** e apoio às empresas
- 🏛️ **Visão da campanha** e filosofia política
- 📞 **Como participar** e apoiar a campanha
- 🗓️ **Eventos** e iniciativas

## 💡 **SUGESTÕES DE PERGUNTAS**
- "Qual é a visão de Cristóvão Norte para Faro?"
- "Que propostas têm para o ambiente?"
- "Como posso apoiar a campanha?"
- "Quais são os principais projetos económicos?"

**Faça a sua pergunta específica e terei todo o gosto em ajudar!** ✨"""

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Generate or use session ID
    session_id = request.session_id or str(uuid.uuid4())
    
    # Get response
    response = get_simple_response(request.message)
    
    return ChatResponse(
        response=response,
        session_id=session_id,
        timestamp=datetime.now()
    )

@app.get("/")
async def root():
    return {"message": "Campaign Chatbot is running!", "status": "online"}

if __name__ == "__main__":
    import uvicorn
    print("🤖 Starting Simple Campaign Chatbot...")
    print("📡 Server will start at: http://localhost:8000")
    print("🔍 Health check: http://localhost:8000/health")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)