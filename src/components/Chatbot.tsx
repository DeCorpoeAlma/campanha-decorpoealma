import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Importar react-markdown
import remarkGfm from 'remark-gfm'; // Importar remark-gfm para tabelas, etc.

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string; timestamp: string }>>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null); // Ref para scroll automático

  const backendUrl = 'http://localhost:8000/chat'; // URL do backend Python
  const defaultModel = 'meta-llama/llama-3.1-70b-instruct'; // Modelo fixo para Llama

  // Efeito para scrollar para a última mensagem
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string, sender: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMessages((prevMessages) => [...prevMessages, { text, sender, timestamp: time }]);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = input.trim();
    if (!message || isTyping) return;

    addMessage(message, 'user');
    setInput('');
    setIsTyping(true);

    try {
      const payload = {
        message: message,
        session_id: sessionId, // Enviar o ID da sessão
        model: defaultModel, // Usar o modelo fixo
      };

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro no backend');
      }

      const data = await response.json();
      setSessionId(data.session_id); // Armazenar o ID da sessão retornado
      addMessage(data.response, 'bot'); // Adicionar resposta do bot

    } catch (error: any) {
      addMessage(`Erro: ${error.message}`, 'bot');
      console.error('Erro ao enviar mensagem para o backend:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // Mensagem inicial do bot
  useEffect(() => {
    addMessage('Olá! Sou o seu assistente de IA sobre a campanha "Faro. De Corpo e Alma". Pergunte-me sobre a campanha, os candidatos ou o programa!', 'bot');
  }, []); // Executar apenas uma vez na montagem do componente

  return (
    <section id="chatbot" className="py-20 bg-gray-100 scroll-mt-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Fale Connosco
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem alguma questão sobre a campanha? Pergunte ao nosso chatbot!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[calc(100vh-16rem)]"> {/* Altura responsiva */}
          <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"> {/* Fundo claro para mensagens */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-4 rounded-lg w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800' // Cor de fundo para mensagens do bot
                  }`}
                >
                  {/* Renderizar Markdown para mensagens do bot */}
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                  <div className="text-xs opacity-75 mt-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-4 rounded-lg w-[85%] bg-gray-200 text-gray-800">
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex p-4 border-t border-gray-200 bg-white"> {/* Fundo branco para input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva a sua mensagem..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-r-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              disabled={isTyping || !input.trim()}
            >
              <Send size={20} />
              {isTyping ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;