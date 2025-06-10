import React from 'react';
import { Quote, Heart, Target, Award } from 'lucide-react';

const CandidateSection = () => {
  return (
    <>
      {/* Cristóvão Norte Section */}
      <section id="cristovao" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">
                  Cristóvão Norte
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Natural de Faro, Cristóvão Norte traz uma visão renovada para a liderança 
                  da cidade. Com formação em Gestão e experiência no setor privado, representa 
                  uma nova geração de líderes comprometidos com o desenvolvimento sustentável 
                  e a participação cidadã.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <Quote size={24} className="text-blue-500 mb-3" />
                  <blockquote className="text-lg italic text-blue-900">
                    "Faro merece uma liderança que escute, que inove e que coloque 
                    sempre os cidadãos no centro de todas as decisões. É tempo de 
                    construir uma cidade mais próxima, mais justa e mais próspera."
                  </blockquote>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                    <Heart className="text-yellow-600" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Proximidade</h4>
                      <p className="text-sm text-gray-600">Sempre perto dos cidadãos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Target className="text-blue-600" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Visão</h4>
                      <p className="text-sm text-gray-600">Futuro sustentável</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-yellow-100 p-8 rounded-2xl">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Visão para Faro</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Uma cidade mais verde e sustentável</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Habitação acessível para todos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Mobilidade inteligente e eficiente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Economia local dinâmica e inovadora</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Macário Correia Section */}
      <section id="macario" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 space-y-6">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">
                  Macário Correia
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Com décadas de experiência em gestão pública e um profundo conhecimento 
                  da realidade farense, Macário Correia representa a sabedoria e a 
                  continuidade necessárias para consolidar o desenvolvimento da cidade.
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                  <Award size={24} className="text-yellow-600 mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Percurso Político</h4>
                  <p className="text-gray-600">
                    Longa experiência na gestão autárquica, sempre focado no desenvolvimento 
                    equilibrado e na qualidade de vida dos farenses. Um percurso dedicado 
                    ao serviço público e à comunidade.
                  </p>
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
    </>
  );
};

export default CandidateSection;