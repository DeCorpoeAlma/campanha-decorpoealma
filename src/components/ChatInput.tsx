import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isTyping }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Impede propagação do evento para elementos pais
    const message = input.trim();
    if (!message || isTyping) return;
    
    onSendMessage(message);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enviar mensagem com Enter (sem Shift para permitir quebras de linha com Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation(); // Impede propagação do evento para elementos pais
      const message = input.trim();
      if (!message || isTyping) return;
      
      onSendMessage(message);
      setInput('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex p-4 border-t border-gray-200 bg-white"
      aria-label="Formulário de mensagem"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escreva a sua mensagem..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/30"
        disabled={isTyping}
        aria-label="Mensagem"
        aria-disabled={isTyping}
      />
      <button
        type="submit"
        className="bg-dark-blue hover:bg-dark-blue/90 text-white px-6 py-2 rounded-r-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isTyping || !input.trim()}
        aria-label="Enviar mensagem"
      >
        <Send size={20} aria-hidden="true" />
        <span>{isTyping ? 'Enviando...' : 'Enviar'}</span>
      </button>
    </form>
  );
};

export default ChatInput;