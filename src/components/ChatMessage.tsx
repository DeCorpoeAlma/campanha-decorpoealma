import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Message } from '../hooks/useChatbot';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
      aria-label={`Mensagem de ${isBot ? 'assistente' : 'usuário'}`}
    >
      <div
        className={`p-4 rounded-lg w-[85%] ${
          isBot
            ? 'bg-gray-200 text-dark-blue bot-message'
            : 'bg-light-blue text-white'
        }`}
      >
        {isBot ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Aplicar classes ao wrapper gerado pelo ReactMarkdown
              p: ({node, ...props}) => <p className="prose prose-sm max-w-none" {...props} />
            }}
          >
            {message.text}
          </ReactMarkdown>
        ) : (
          <p>{message.text}</p>
        )}
        <div className="text-xs opacity-75 mt-1" aria-label={`Enviado às ${message.timestamp}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;