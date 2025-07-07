import React from 'react';
import { Quote } from 'lucide-react';
import MacarioPoliticalCareer from './MacarioPoliticalCareer';
import MacarioRole from './MacarioRole';
import { candidates } from '@/data/candidatesData'; // Importar dados dos candidatos

const MacarioCorreiaSection = () => {
  const macario = candidates.find(candidate => candidate.id === 'macario');

  if (!macario) {
    return null; // Ou renderizar uma mensagem de erro
  }

  return (
    <section id="macario" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                {macario.name} {/* Usar nome dos dados */}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {macario.biography} {/* Usar biografia dos dados */}
              </p>

              {/* Mover a citação para aqui, na primeira coluna */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <Quote size={24} className="text-blue-500 mb-3" />
                <blockquote className="text-lg italic text-blue-900">
                  {macario.quote} {/* Usar citação dos dados */}
                </blockquote>
              </div>
            </div>

            <div className="lg:order-1 relative space-y-6"> {/* Adicionado space-y-6 para espaçamento vertical */}
              <div className="flex justify-center mb-8 lg:mb-0"> {/* Container para centralizar a imagem */}
                <img
                  src="/Macario_Correia_02.jpg" // Caminho relativo à pasta public
                  alt={`Foto de ${macario.name}`}
                  className="rounded-lg shadow-md max-w-full h-auto" // Estilos para a imagem
                />
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-blue-100 p-6 rounded-2xl">
                {/* Usar o novo componente para Papel na Candidatura */}
                <MacarioRole />
              </div>
              {/* Mover o Percurso Político para aqui, abaixo do Papel na Candidatura */}
              <MacarioPoliticalCareer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacarioCorreiaSection;