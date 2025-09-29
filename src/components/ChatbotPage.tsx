import React from 'react';
import Chatbot from './Chatbot';

const ChatbotPage = () => {
  return (
    <div id="chatbot" className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-dark-blue mb-4">
              Assistente Virtual
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Converse com o nosso assistente virtual para obter informações sobre a campanha "Faro. De Corpo e Alma", 
              os candidatos e o programa eleitoral.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <Chatbot />
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-dark-blue mb-4">
              Como posso ajudar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary-orange mb-2">Informações sobre candidatos</h3>
                <p className="text-gray-600">Pergunte sobre os candidatos da coligação "Faro Capital de Confiança".</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary-orange mb-2">Programa eleitoral</h3>
                <p className="text-gray-600">Tire dúvidas sobre as propostas e projetos para Faro.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;