import React from 'react';
import '../styles/chatbot.css';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatbot } from '../hooks/useChatbot';

interface ChatbotProps {
  initialMessage?: string;
  backendUrl?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ 
  initialMessage,
  backendUrl
}) => {
  const {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
    isBackendAvailable
  } = useChatbot({
    initialMessage,
    backendUrl
  });

  return (
    <div 
      className="flex flex-col h-[600px] relative overflow-hidden"
      role="region"
      aria-label="Chat com assistente virtual"
      onKeyDown={(e) => {
        // Impede que eventos de teclado no chat afetem o scroll da página
        if (e.key === 'Enter') {
          e.stopPropagation();
        }
      }}
    >
      {/* Barra de ferramentas */}
      <div className="bg-gray-100 p-2 border-b border-gray-200 flex justify-end">
        <button
          onClick={clearChat}
          className="text-sm text-gray-600 hover:text-dark-blue px-3 py-1 rounded-md hover:bg-gray-200 transition-colors duration-200"
          aria-label="Limpar conversa"
        >
          Limpar conversa
        </button>
      </div>

      {/* Aviso de backend indisponível */}
      {!isBackendAvailable && (
        <div
          className="bg-yellow-100 text-yellow-800 p-3 text-sm border-b border-yellow-200 flex items-center"
          role="alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          O servidor não está disponível. Algumas funcionalidades podem não funcionar corretamente.
        </div>
      )}

      {/* Área de mensagens */}
      <ChatMessages 
        messages={messages} 
        isTyping={isTyping} 
      />

      {/* Exibir mensagem de erro, se houver */}
      {error && (
        <div 
          className="bg-red-100 text-red-700 p-3 text-sm border-t border-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Formulário de entrada */}
      <ChatInput 
        onSendMessage={sendMessage} 
        isTyping={isTyping} 
      />
    </div>
  );
};

export default Chatbot;