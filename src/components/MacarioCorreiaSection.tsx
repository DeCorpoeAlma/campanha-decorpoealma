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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                {macario.name} {/* Usar nome dos dados */}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {macario.biography} {/* Usar biografia dos dados */}
              </p>

              {/* Usar o novo componente para Percurso Político */}
              <MacarioPoliticalCareer />

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <Quote size={24} className="text-blue-500 mb-3" />
                <blockquote className="text-lg italic text-blue-900">
                  {macario.quote} {/* Usar citação dos dados */}
                </blockquote>
              </div>
            </div>

            <div className="lg:order-1 relative">
              <div className="bg-gradient-to-br from-yellow-100 to-blue-100 p-8 rounded-2xl">
                {/* Usar o novo componente para Papel na Candidatura */}
                <MacarioRole />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacarioCorreiaSection;