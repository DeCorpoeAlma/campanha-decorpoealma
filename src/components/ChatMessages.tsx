import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Message } from '../hooks/useChatbot';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito para rolar para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    if (containerRef.current) {
      // Usar scroll direto no container para evitar afetar o scroll da página
      const container = containerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 chat-messages"
      aria-live="polite"
      aria-label="Mensagens da conversa"
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="p-4 rounded-lg w-[85%] bg-gray-200 text-dark-blue">
            <div className="typing-indicator" aria-label="Assistente está digitando">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Elemento invisível para rolar para o final */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;