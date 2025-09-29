#!/usr/bin/env python3
import uvicorn
import os
import sys

# Try to import the organized chatbot, fall back to simple version if it fails
try:
    from chatbot_organized import app
    chatbot_type = "Organized"
except Exception as e:
    print(f"⚠️ Could not load organized chatbot ({e})")
    print("🔄 Falling back to simple chatbot...")
    from simple_chatbot import app
    chatbot_type = "Simple"

def main():
    """Função principal para executar o servidor"""
    # Obter porta das variáveis de ambiente ou usar 8000 como padrão
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🤖 Iniciando Campaign Chatbot Backend ({chatbot_type})...")
    print(f"📡 Servidor será iniciado em: http://{host}:{port}")
    print("🔍 Health check: http://localhost:8000/health")
    if chatbot_type == "Organized":
        print("📖 Documentação da API: http://localhost:8000/docs")
    
    uvicorn.run(
        app, 
        host=host, 
        port=port,
        reload=False  # Desabilitar reload para produção
    )

if __name__ == "__main__":
    main()