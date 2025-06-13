import uvicorn
from campaign_chatbot import app # Importa a instância 'app' do campaign_chatbot.py

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) # Use a porta 8000, o Render mapeará para $PORT