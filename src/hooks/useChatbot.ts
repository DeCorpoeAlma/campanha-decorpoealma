import { useState, useEffect, useCallback } from 'react';

// Definição de tipos
export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatbotResponse {
  response: string;
  timestamp: string;
  session_id?: string;
}

interface UseChatbotProps {
  initialMessage?: string;
  backendUrl?: string;
}

export const useChatbot = ({
  initialMessage = 'Olá! Sou o seu assistente de IA sobre a campanha "Faro. De Corpo e Alma". Pergunte-me sobre a campanha, os candidatos ou o programa!',
  backendUrl = 'http://localhost:8000/chat'
}: UseChatbotProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean>(true);
  
  // Verificar se o backend está disponível
  useEffect(() => {
    const checkBackendAvailability = async () => {
      try {
        // Extrair a URL base do endpoint do chat
        const baseUrl = backendUrl.split('/').slice(0, -1).join('/');
        
        // Tentar uma requisição simples para verificar se o servidor está respondendo
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // Timeout mais curto (2s)
        
        try {
          // Primeiro tentar o endpoint de health check
          const response = await fetch(`${baseUrl}/health`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);
          setIsBackendAvailable(response.ok);
          
          if (!response.ok) {
            console.warn('Backend health check falhou, tentando endpoint principal');
            // Se o health check falhar, tentar o endpoint principal com OPTIONS
            await fetch(backendUrl, {
              method: 'OPTIONS',
              signal: AbortSignal.timeout(2000)
            });
            
            // Se não lançar exceção, o servidor está respondendo
            setIsBackendAvailable(true);
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          
          // Verificar se é um erro de CORS, que pode indicar que o servidor está ativo
          // mas não suporta OPTIONS ou tem configurações CORS restritas
          const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
          if (errorMessage.includes('CORS') || errorMessage.includes('opaque')) {
            console.warn('Erro CORS detectado, assumindo que o servidor está ativo');
            setIsBackendAvailable(true);
          } else {
            console.error('Erro ao verificar disponibilidade do backend:', errorMessage);
            setIsBackendAvailable(false);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar disponibilidade do backend:', error);
        setIsBackendAvailable(false);
      }
    };
    
    // Verificar disponibilidade ao iniciar
    checkBackendAvailability();
    
    // Verificar a cada 30 segundos
    const intervalId = setInterval(checkBackendAvailability, 30000);
    
    return () => clearInterval(intervalId);
  }, [backendUrl]);

  // Carregar mensagens do localStorage ao iniciar
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedSessionId = localStorage.getItem('chatSessionId');
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Erro ao carregar mensagens do localStorage:', e);
        // Se houver erro, inicializa com a mensagem padrão
        addMessage(initialMessage, 'bot');
      }
    } else {
      // Se não houver mensagens salvas, adiciona a mensagem inicial
      addMessage(initialMessage, 'bot');
    }
    
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, [initialMessage]);

  // Salvar mensagens no localStorage quando elas mudarem
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Salvar sessionId no localStorage quando ele mudar
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('chatSessionId', sessionId);
    }
  }, [sessionId]);

  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMessages((prevMessages) => [...prevMessages, { text, sender, timestamp: time }]);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isTyping) return;

    setError(null);
    addMessage(message, 'user');
    setIsTyping(true);
    
    // Verificar se o backend está disponível antes de tentar enviar
    if (!isBackendAvailable) {
      const errorMessage = 'O servidor não está disponível no momento. Verifique se o backend está em execução.';
      setError(errorMessage);
      addMessage(errorMessage, 'bot');
      setIsTyping(false);
      return;
    }

    try {
      const payload: any = {
        message: message,
      };
      
      // Só adicionar session_id se existir
      if (sessionId) {
        payload.session_id = sessionId;
      }

      // Adicionar timeout para a requisição
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        // Limpar o timeout após a resposta
        clearTimeout(timeoutId);

        if (!response.ok) {
          let errorMessage = 'Erro no backend';
          try {
            const errorData = await response.json();
            if (errorData.detail) {
              if (Array.isArray(errorData.detail)) {
                // Erro de validação do FastAPI
                errorMessage = `Erro de validação: ${errorData.detail.map((e: any) => e.msg).join(', ')}`;
              } else {
                errorMessage = errorData.detail;
              }
            }
          } catch (e) {
            // Se não conseguir fazer parse do JSON, usa a mensagem padrão
            errorMessage = `Erro ${response.status}: ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        const data: ChatbotResponse = await response.json();
        
        if (data.session_id) {
          setSessionId(data.session_id);
        }
        
        addMessage(data.response, 'bot');
      } catch (fetchError: any) {
        // Limpar o timeout em caso de erro
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error: any) {
      let errorMessage = '';
      
      if (error.name === 'AbortError') {
        errorMessage = 'A conexão com o servidor demorou muito tempo. Por favor, tente novamente.';
      } else if (error.message === 'Failed to fetch') {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está em execução.';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'Erro de rede. Verifique sua conexão com a internet.';
      } else {
        errorMessage = `Erro: ${error.message}`;
      }
      
      setError(errorMessage);
      addMessage(errorMessage, 'bot');
      console.error('Erro ao enviar mensagem para o backend:', error);
    } finally {
      setIsTyping(false);
    }
  }, [addMessage, backendUrl, isTyping, sessionId]);

  const clearChat = useCallback(() => {
    // Limpar mensagens locais
    setMessages([]);
    localStorage.removeItem('chatMessages');
    
    // Adicionar mensagem inicial novamente
    addMessage(initialMessage, 'bot');
    
    // Opcionalmente, limpar histórico no backend
    if (sessionId) {
      fetch('http://localhost:8000/clear_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      }).catch(err => {
        console.error('Erro ao limpar histórico no backend:', err);
      });
    }
  }, [initialMessage, sessionId, addMessage]);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
    isBackendAvailable
  };
};