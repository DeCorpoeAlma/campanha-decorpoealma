import React from 'react';
import { ArrowRight, Users, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Background Image */}
      <div>
        <img
          src="/capa_peq.png"
          alt="Faro. De Corpo e Alma - Cristóvão Norte e Macário Correia"
          className="w-full object-cover object-center"
        />
        {/* Overlay for better text readability - might not be needed here */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div> */}
      </div>

      <div className="container mx-auto px-4 text-center text-black py-16"> {/* Added padding */}
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col justify-center"> {/* Removed pb-32 */}
            <div className="space-y-8">
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium"> {/* Removed text-white, drop-shadow-lg */}
                Uma visão renovada para Faro. Uma candidatura que une experiência e renovação
                para construir o futuro da nossa cidade.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#cristovao"
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <Users size={20} />
                  Conhece o Cristóvão Norte
                </a>

                <a
                  href="#participa"
                  className="bg-gray-200/80 backdrop-blur-md border-2 border-gray-300 hover:bg-gray-300 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <ArrowRight size={20} />
                  Junta-te à Campanha
                </a>

                <a
                  href="#programa"
                  className="bg-blue-900/80 backdrop-blur-md hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <FileText size={20} />
                  Programa Eleitoral
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Removed as positioning changed */}
      </div>
    </section>
  );
};

export default Hero;