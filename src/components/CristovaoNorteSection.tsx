import React from 'react';
import { Quote } from 'lucide-react';
import CristovaoValues from './CristovaoValues';
import CristovaoVision from './CristovaoVision';
import { candidates } from '@/data/candidatesData'; // Importar dados dos candidatos

const CristovaoNorteSection = () => {
  const cristovao = candidates.find(candidate => candidate.id === 'cristovao');

  if (!cristovao) {
    return null; // Ou renderizar uma mensagem de erro
  }

  return (
    <section id="cristovao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Coluna Esquerda: Biografia */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-dark-blue mb-4">
                {cristovao.name} {/* Usar nome dos dados */}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {cristovao.biography} {/* Usar biografia dos dados */}
              </p>
            </div>

            {/* Coluna Direita: Foto, Visão, Citação e Valores */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center">
                <img
                  src="/Cristovao_Norte_01.jpg" // Caminho relativo à pasta public
                  alt={`Foto de ${cristovao.name}`}
                  className="w-64 h-84 object-cover rounded-full flex-shrink-0"
                />
              </div>
              {/* Renderizar CristovaoVision apenas se cristovao.vision existir */}
              {cristovao.vision && <CristovaoVision vision={cristovao.vision} />}
              <div className="bg-light-blue/10 p-6 rounded-lg border-l-4 border-light-blue w-full">
                <Quote size={24} className="text-light-blue mb-3" />
                <blockquote className="text-lg italic text-dark-blue">
                  {cristovao.quote} {/* Usar citação dos dados */}
                </blockquote>
              </div>
              {/* Renderizar CristovaoValues apenas se cristovao.values existir */}
              {cristovao.values && <CristovaoValues values={cristovao.values} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CristovaoNorteSection;