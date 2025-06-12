import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'user' }]);
      setInput('');

      try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prevMessages) => [...prevMessages, { text: data.response, sender: 'bot' }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'Erro ao conectar com o chatbot.', sender: 'bot' }]);
        }
      } catch (error) {
        setMessages((prevMessages) => [...prevMessages, { text: 'Erro ao enviar mensagem.', sender: 'bot' }]);
        console.error('Erro ao enviar mensagem para o backend:', error);
      }
    }
  };

  return (
    <section id="chatbot" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Fale Connosco
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem alguma questão sobre a campanha? Pergunte ao nosso chatbot!
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex p-4 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva a sua mensagem..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-r-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;