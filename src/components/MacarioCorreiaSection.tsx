import React from 'react';
import { Quote, Award } from 'lucide-react';

const MacarioCorreiaSection = () => {
  return (
    <section id="macario" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Macário Correia
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
              Engenheiro agrónomo e arquiteto paisagista natural de Tavira, Macário Correia foi deputado, secretário de Estado do Ambiente e presidente das Câmaras Municipais de Tavira e Faro. Com vasta experiência em governação local, regional e europeia, é atualmente empresário agrícola e consultor ambiental, mantendo-se ativo em projetos sociais e de sustentabilidade no Algarve.


              </p>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <Award size={24} className="text-yellow-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">Percurso Político</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Deputado à Assembleia da República (1985–1990, 1991)</li>
                  <li>Secretário de Estado do Ambiente (1987–1991)</li>
                  <li>Vereador da Câmara Municipal de Lisboa (1993–1997)</li>
                  <li>Presidente da Câmara Municipal de Tavira (1998–2009)</li>
                  <li>Presidente da Comunidade Intermunicipal do Algarve (2004–2013)</li>
                  <li>Vice-presidente da Comissão de Ambiente do Comité das Regiões da UE</li>
                  <li>Presidente da Câmara Municipal de Faro (2009–2013)</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <Quote size={24} className="text-blue-500 mb-3" />
                <blockquote className="text-lg italic text-blue-900">
                  "A experiência ensina-nos que os grandes projetos se constroem
                  com paciência, diálogo e determinação. Faro precisa dessa estabilidade
                  para crescer de forma sustentável."
                </blockquote>
              </div>
            </div>

            <div className="lg:order-1 relative">
              <div className="bg-gradient-to-br from-yellow-100 to-blue-100 p-8 rounded-2xl">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Papel na Candidatura</h3>
                  <p className="text-gray-700 mb-4">
                    Como candidato à Assembleia Municipal, Macário Correia será a ponte
                    entre a câmara e os cidadãos, garantindo transparência e participação
                    em todas as decisões importantes.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Fiscalização rigorosa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Diálogo constante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Transparência total</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacarioCorreiaSection;