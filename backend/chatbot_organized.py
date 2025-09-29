#!/usr/bin/env python3
"""
Organized Campaign Chatbot Backend
Combines RAG (Retrieval-Augmented Generation) with rich pre-programmed responses
for the "Faro. De Corpo e Alma" campaign
"""
import os
import uuid
from datetime import datetime
from typing import Optional
import warnings

# Suppress warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# RAG imports
try:
    from langchain_huggingface import HuggingFaceEmbeddings
    from langchain_chroma import Chroma
    RAG_AVAILABLE = True
except ImportError:
    print("⚠️ RAG dependencies not available. Using pre-programmed responses only.")
    RAG_AVAILABLE = False

# Import candidate knowledge and conversation memory
from candidate_knowledge import get_candidate_info, get_all_candidates_summary
from conversation_memory import conversation_memory
from llm_enhancer import llm_enhancer

# Load environment variables
load_dotenv()

# ==================== CONFIGURATION ====================

CHROMA_DB_DIR = "./chroma_db"
ALLOWED_ORIGINS = [
    "http://localhost:5173", 
    "https://decorpoealma.netlify.app",
    "http://localhost:3000"
]

# ==================== MODELS ====================

class ChatRequest(BaseModel):
    message: str
    model: str = "organized"
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    model_used: str = "organized"
    timestamp: datetime
    source: str = "hybrid"  # "rag", "programmed", or "hybrid"
    conversation_context: Optional[str] = None
    follow_up_suggestions: Optional[list] = None
    enhanced: Optional[bool] = None  # Whether response was enhanced by LLM

class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    rag_available: bool
    knowledge_base_loaded: bool

# ==================== RAG SYSTEM ====================

class RAGSystem:
    def __init__(self):
        self.embeddings = None
        self.vectordb = None
        self.retriever = None
        self.available = False
        
        if RAG_AVAILABLE:
            self._initialize_rag()
    
    def _initialize_rag(self):
        """Initialize the RAG system with error handling"""
        try:
            if os.path.exists(CHROMA_DB_DIR):
                self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
                self.vectordb = Chroma(
                    persist_directory=CHROMA_DB_DIR, 
                    embedding_function=self.embeddings
                )
                self.retriever = self.vectordb.as_retriever(search_kwargs={"k": 3})
                self.available = True
                print("✅ RAG Knowledge base loaded successfully!")
            else:
                print("⚠️ Knowledge base directory not found.")
        except Exception as e:
            print(f"⚠️ Could not initialize RAG system: {e}")
            self.available = False
    
    def query_knowledge_base(self, query: str) -> Optional[str]:
        """Query the knowledge base and return formatted response"""
        if not self.available or not self.retriever:
            return None
            
        try:
            docs = self.retriever.invoke(query)
            if not docs:
                return None
                
            # Process retrieved documents
            doc_contents = []
            for doc in docs:
                content = doc.page_content.strip()
                if len(content) > 50:  # Only substantial content
                    doc_contents.append(content)
            
            if not doc_contents:
                return None
                
            # Smart formatting based on content type
            response = self._format_smart_response(query, doc_contents)
            response += "\n\n---\n*✅ Informação extraída do programa eleitoral oficial*"
            return response
            
        except Exception as e:
            print(f"Error querying knowledge base: {e}")
            return None
    
    def _format_smart_response(self, query: str, doc_contents: list) -> str:
        """Format response intelligently based on query type and content"""
        query_lower = query.lower()
        
        # Detect query type for smart formatting
        if any(word in query_lower for word in ['ambiente', 'sustentabilidade', 'verde', 'ecológico']):
            return self._format_environment_response(doc_contents)
        elif any(word in query_lower for word in ['candidato', 'lista', 'freguesia', 'assembleia']):
            return self._format_candidates_response(doc_contents)
        elif any(word in query_lower for word in ['programa', 'proposta', 'medida']):
            return self._format_program_response(query_lower, doc_contents)
        else:
            return self._format_general_response(doc_contents)
    
    def _format_environment_response(self, doc_contents: list) -> str:
        """Format environmental proposals response"""
        response = "**As propostas para o ambiente incluem o pilar \"V. FARO PLENO\" que se foca em:**\n\n"
        response += "### Sustentabilidade, ambiente e qualidade de vida\n\n"
        response += "**Principais medidas ambientais:**\n\n"
        
        # Extract environmental measures from content
        measures = []
        for content in doc_contents:
            if 'verde' in content.lower() or 'ambiente' in content.lower() or 'sustentabilidade' in content.lower():
                # Extract bullet points or measures
                lines = content.split('\n')
                for line in lines:
                    line = line.strip()
                    if line.startswith('-') or line.startswith('•'):
                        measures.append(line[1:].strip())
        
        # Add standard environmental measures if not found in content
        if not measures:
            measures = [
                "Expansão da Estrutura Verde - novos parques e jardins",
                "Plano de Gestão da Estrutura Verde - arborização urbana", 
                "Mitigação das ilhas de calor urbano",
                "Frente Ribeirinha - requalificação da relação com a Ria Formosa",
                "Gestão Hídrica - melhor permeabilidade urbana",
                "Proteção da Ria Formosa como património natural único",
                "Transição energética e economia circular",
                "Soluções baseadas na natureza para alterações climáticas",
                "Mobilidade sustentável e transporte público"
            ]
        
        for measure in measures[:9]:  # Limit to 9 measures
            response += f"- {measure}\n"
        
        return response
    
    def _format_candidates_response(self, doc_contents: list) -> str:
        """Format candidates/parish lists response"""
        response = "**Candidatos e Listas Eleitorais:**\n\n"
        
        for i, content in enumerate(doc_contents[:2], 1):
            if len(content) > 400:
                content = content[:400] + "..."
            response += f"### {content}\n\n"
        
        return response
    
    def _format_program_response(self, query: str, doc_contents: list) -> str:
        """Format program/proposals response"""
        response = "**Programa Eleitoral \"Faro Capital de Confiança\":**\n\n"
        
        for i, content in enumerate(doc_contents[:2], 1):
            if len(content) > 350:
                content = content[:350] + "..."
            response += f"### {i}. {content}\n\n"
        
        return response
    
    def _format_general_response(self, doc_contents: list) -> str:
        """Format general response"""
        response = "**Informação sobre \"Faro Capital de Confiança\":**\n\n"
        
        for i, content in enumerate(doc_contents[:2], 1):
            if len(content) > 350:
                content = content[:350] + "..."
            response += f"### {i}. {content}\n\n"
        
        return response

# ==================== RESPONSE SYSTEM ====================

class ResponseGenerator:
    def __init__(self, rag_system: RAGSystem):
        self.rag_system = rag_system
    
    def generate_response(self, message: str, session_id: str) -> tuple[str, str]:
        """Generate response with conversation context and return (response, source)"""
        message_lower = message.lower()
        
        # Get conversation context
        context = conversation_memory.get_conversation_context(session_id)
        user_interests = conversation_memory.get_user_interests(session_id)
        
        # Enhance response based on user interests
        if user_interests and not any(interest in message_lower for interest in user_interests):
            # User asking about new topic - might want to personalize
            pass
        
        # Check for candidate-specific queries first
        candidate_triggers = [
            'candidato', 'candidatos', 'lista', 'listas', 'equipa', 'equipe', 
            'cristóvão', 'cristovao', 'macário', 'macario', 'bruno', 'lage',
            'virgínia', 'virginia', 'patricia', 'eva', 'joão', 'joao', 'ferradeira',
            'junta', 'juntas', 'freguesia', 'freguesias', 'assembleia', 'câmara', 'camara'
        ]
        
        if any(trigger in message_lower for trigger in candidate_triggers):
            candidate_response = get_candidate_info(message)
            if candidate_response:
                return candidate_response, "candidate_knowledge"
        
        # Try RAG for policy/program topics
        rag_triggers = [
            'programa', 'proposta', 'projeto', 'medida', 'plano', 'política', 
            'específic', 'turismo', 'economia', 'desenvolvimento', 'ambiente', 
            'sustentabilidade', 'urbano', 'cultura', 'saúde', 'educação', 
            'transportes', 'habitação', 'segurança', 'social', 'emprego'
        ]
        
        if any(trigger in message_lower for trigger in rag_triggers):
            rag_response = self.rag_system.query_knowledge_base(message)
            if rag_response:
                return rag_response, "rag"
        
        # Fall back to pre-programmed responses
        return self._get_programmed_response(message_lower), "programmed"
    
    def _get_programmed_response(self, message_lower: str) -> str:
        """Generate rich pre-programmed responses"""
        
        if any(word in message_lower for word in ['olá', 'ola', 'hello', 'hi', 'bom dia', 'boa tarde']):
            return """Olá! Muito prazer em falar consigo! 

Sou o assistente da campanha "Faro. De Corpo e Alma" e estou aqui para esclarecer todas as suas dúvidas sobre os nossos candidatos e propostas para Faro.

Pode perguntar-me sobre qualquer tema - desde o percurso do Cristóvão Norte como candidato a presidente da câmara, até às propostas específicas que temos para o desenvolvimento da cidade. Também posso falar sobre o Macário Correia, que lidera a nossa lista para a Assembleia Municipal, ou sobre os nossos candidatos às juntas de freguesia.

O que gostaria de saber?"""

        if any(word in message_lower for word in ['cristóvão', 'cristovao', 'presidente']):
            return """O Cristóvão Norte é o nosso candidato à presidência da Câmara Municipal de Faro. É uma pessoa com um percurso muito sólido - foi deputado durante cinco legislaturas, é atualmente vice-presidente do grupo parlamentar do PSD e presidente da Assembleia Municipal de Faro.

O que mais me impressiona nele é a ligação genuína que tem a Faro e ao Algarve. É farense, conhece bem os problemas da cidade e já provou que sabe lutar pelos interesses da região. Lembra-se das petições que ele organizou? Uma para o Hospital Central do Algarve, que juntou mais de 9 mil assinaturas, e outra para o curso de Medicina, que reuniu 10 mil pessoas!

Além da política, também é muito ligado ao desporto - é presidente da Assembleia Geral do Sporting Clube Farense e da Associação de Ténis do Algarve. Na juventude foi atleta e até representou Portugal nos Jogos Mundiais da Paz.

A visão dele para Faro passa por tornar a cidade mais sustentável, criar habitação acessível para todos e dinamizar a economia local. Acredita numa gestão próxima dos cidadãos e transparente.

Quer saber mais sobre algum aspeto específico do seu percurso?"""

        if any(word in message_lower for word in ['macário', 'macario', 'assembleia']):
            return """O Macário Correia é o cabeça de lista da nossa candidatura à Assembleia Municipal. É uma pessoa com uma experiência política impressionante - já foi secretário de Estado do Ambiente, deputado, presidente das câmaras de Tavira e Faro, e ainda teve responsabilidades ao nível europeu.

O que acho fascinante no percurso dele é a diversidade de experiências. Começou como engenheiro agrónomo, foi estudar para França onde fez mestrado, e depois construiu uma carreira que passou por todos os níveis da política - local, nacional e europeia. Foi membro do Comité das Regiões da União Europeia durante 15 anos!

Hoje em dia, aos 68 anos, continua muito ativo. É presidente de várias associações ligadas à agricultura e ao desenvolvimento rural do Algarve. Conhece Faro como poucos - foi presidente da câmara entre 2009 e 2013.

Na Assembleia Municipal, o papel dele será fundamental: fiscalizar o trabalho da câmara, garantir transparência nas decisões e ser a ponte entre os cidadãos e o executivo municipal. Com a experiência que tem, será certamente uma voz autorizada e respeitada.

Gostaria de saber mais sobre alguma fase específica da carreira dele?"""

        if any(word in message_lower for word in ['equipa', 'equipe', 'candidatos', 'coligação']):
            # Try to get specific candidate info first
            candidate_info = get_candidate_info(message_lower)
            if candidate_info:
                return f"## 👥 **Candidatos \"Faro. De Corpo e Alma\"**\n\n{candidate_info}\n\n{get_all_candidates_summary()}"
            
            return """# 👥 **Coligação "Faro Capital de Confiança"**

## 🏆 **Composição Política**
**PPD/PSD • IL • CDS-PP • MPT • PAN**

Uma coligação ampla que reúne diferentes sensibilidades políticas unidas pelo futuro de Faro.

## 🌟 **Forças da Coligação**
- 🔵 **PSD**: Experiência governativa e gestão eficiente
- 🟡 **IL**: Dinamismo liberal e inovação económica  
- 🔵 **CDS-PP**: Valores humanistas e coesão social
- 🟢 **MPT**: Representação territorial equilibrada
- 🌱 **PAN**: Sustentabilidade e proteção ambiental

## 🎯 **Valores Partilhados**
- **Competência** na gestão pública
- **Transparência** em todas as decisões  
- **Proximidade** com os cidadãos
- **Desenvolvimento** sustentável
- **Inovação** com responsabilidade

**Unidos por Faro, unidos pelo futuro!** 💪"""

        if any(word in message_lower for word in ['contacto', 'participar', 'apoiar', 'voluntário']):
            return """# 📞 **Participe na Campanha "Faro. De Corpo e Alma"**

## 🤝 **Como Pode Apoiar**
- 🗳️ **Vote** em "Faro Capital de Confiança"
- 📱 **Partilhe** nas redes sociais  
- 👥 **Voluntariado** em eventos da campanha
- 💡 **Contribua** com ideias e sugestões
- 🗣️ **Divulgue** junto de familiares e amigos

## 📱 **Contactos Oficiais**
- 🌐 **Website**: [Site oficial da campanha]
- 📘 **Facebook**: @FaroCapitalConfianca
- 📸 **Instagram**: @farodeCorpoeAlma  
- ✉️ **Email**: contacto@farocapitalconfianca.pt

## 🗓️ **Eventos Próximos**
- 🏛️ **Sessões públicas** em todas as freguesias
- 🎯 **Debates temáticos** (economia, ambiente, cultura)
- 🚶 **Caminhadas** pelos bairros de Faro
- ☕ **Conversas de proximidade** com candidatos

**A sua participação faz toda a diferença!** 🌟"""

        # Default response
        return """Não tenho bem a certeza do que me está a perguntar, mas posso ajudá-lo com muita informação sobre a nossa candidatura!

Posso falar-lhe sobre os nossos candidatos - o Cristóvão Norte para presidente da câmara e o Macário Correia que lidera a lista para a Assembleia Municipal. Também tenho informação sobre os candidatos às juntas de freguesia e sobre as nossas propostas para Faro.

Se quiser saber sobre temas específicos como ambiente, economia, turismo, habitação, ou qualquer outra área, é só perguntar. Ou se prefere saber mais sobre o programa eleitoral ou sobre como pode participar na campanha, também posso ajudar.

O que é que gostaria de saber exatamente?"""

# ==================== FASTAPI APP ====================

# Initialize systems
rag_system = RAGSystem()
response_generator = ResponseGenerator(rag_system)

app = FastAPI(
    title="Organized Campaign Chatbot",
    description="AI Assistant for 'Faro. De Corpo e Alma' campaign with RAG and rich responses",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== ENDPOINTS ====================

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(),
        rag_available=RAG_AVAILABLE,
        knowledge_base_loaded=rag_system.available
    )

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint with conversation memory"""
    try:
        # Generate or use session ID
        session_id = request.session_id or str(uuid.uuid4())
        
        # Generate response with conversation context
        response_text, source = response_generator.generate_response(request.message, session_id)
        
        # Optional LLM enhancement (only if enabled)
        enhanced = False
        if llm_enhancer.enabled:
            context = conversation_memory.get_conversation_context(session_id, last_n_turns=2)
            original_response = response_text
            response_text = llm_enhancer.enhance_response(
                original_response, 
                request.message, 
                context if len(context) > 50 else None
            )
            enhanced = (response_text != original_response)
        
        # Save conversation turn to memory (save enhanced version if available)
        conversation_memory.add_conversation_turn(
            session_id=session_id,
            user_message=request.message,
            bot_response=response_text,
            source=source
        )
        
        # Get follow-up suggestions
        follow_up_suggestions = conversation_memory.suggest_follow_up_questions(session_id)
        
        # Get conversation context for response
        context = conversation_memory.get_conversation_context(session_id, last_n_turns=2)
        
        return ChatResponse(
            response=response_text,
            session_id=session_id,
            timestamp=datetime.now(),
            source=source,
            conversation_context=context if len(context) > 50 else None,  # Only include if substantial
            follow_up_suggestions=follow_up_suggestions,
            enhanced=enhanced if llm_enhancer.enabled else None
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

@app.get("/memory/stats")
async def memory_stats():
    """Get conversation memory statistics"""
    try:
        stats = conversation_memory.get_memory_stats()
        return {
            "status": "success",
            "timestamp": datetime.now(),
            "memory_stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting memory stats: {str(e)}")

@app.get("/llm/status")
async def llm_status():
    """Get LLM enhancer status"""
    try:
        status = llm_enhancer.get_status()
        return {
            "status": "success",
            "timestamp": datetime.now(),
            "llm_enhancer": status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting LLM status: {str(e)}")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Organized Campaign Chatbot with Memory & LLM Enhancement is running!",
        "status": "online",
        "version": "2.2.0",
        "rag_enabled": rag_system.available,
        "memory_enabled": True,
        "llm_enhancer_enabled": llm_enhancer.enabled
    }

# ==================== MAIN ====================

if __name__ == "__main__":
    import uvicorn
    
    print("🤖 Starting Organized Campaign Chatbot...")
    print(f"📡 Server will start at: http://0.0.0.0:8000")
    print(f"🔍 Health check: http://localhost:8000/health")
    print(f"📖 API docs: http://localhost:8000/docs")
    print(f"🧠 RAG System: {'✅ Enabled' if rag_system.available else '⚠️ Disabled'}")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)