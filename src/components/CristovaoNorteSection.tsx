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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                {cristovao.name} {/* Usar nome dos dados */}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {cristovao.biography} {/* Usar biografia dos dados */}
              </p>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <Quote size={24} className="text-blue-500 mb-3" />
                <blockquote className="text-lg italic text-blue-900">
                  {cristovao.quote} {/* Usar citação dos dados */}
                </blockquote>
              </div>

              {/* Renderizar CristovaoValues apenas se cristovao.values existir */}
              {cristovao.values && <CristovaoValues values={cristovao.values} />}
            </div>

            {/* Renderizar CristovaoVision apenas se cristovao.vision existir */}
            {cristovao.vision && <CristovaoVision vision={cristovao.vision} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CristovaoNorteSection;