import React from 'react';
import { ArrowRight, Users, FileText } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnInteraction: false })]);

  const phrases = [
    ["", "Cristóvão Norte, o presidente que conhece o seu nome.", ""],
    ["Nem todas as campanhas nascem iguais.", "Algumas surpreendem.", "Começam onde menos se espera: na união improvável de caminhos distintos."],
    ["", "Um presidente com o coração no lugar certo.", ""],
    ["Ideias diversas, convicções firmes, um só compromisso:", "Cuidar da nossa cidade e do nosso concelho.", "Transformar com responsabilidade. Agir com esperança e com sentido."],
    ["Cristóvão Norte não segue ordens.", "Segue princípios.", ""],
    ["De vozes que sendo diferentes partilham uma vontade comum.", "Um movimento novo nascido do inconformismo.", "De quem acredita no futuro. Um melhor futuro."],
    ["Cristóvão Norte e Macário Correia:", "Os presidentes que conhecem o seu nome.", ""],
    ["Está a chegar algo inédito.", "Uma coligação feita de pluralidade e de entrega genuína.", "Com a alma de Faro no centro de tudo."],
    ["Cristóvão e Macário:", "A experiência que leva Faro mais longe.", ""],
    ["Juntos vamos fazer história.", "Por Faro. Por todos nós.", "Com confiança."],
    ["", "Decidir bem é decidir para sempre.", ""],
    ["", "Prometer é fácil. Fazer é competência.", ""],
    ["Algo que nunca existiu vai nascer em Faro.", "Uma coligação única.", "Um encontro improvável de diferentes visões unidas pelo compromisso de fazer melhor."],
    ["", "Faro Capital: o concelho que quer ter peso em Lisboa.", ""],
    ["", "Quando há coragem para juntar o que nunca se juntou,", "o futuro começa a mudar."],
  ];
   

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Background Image */}
      <div>
        <img
          src="/capa_2.png"
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
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {phrases.map((phrase, index) => (
                    <div className="embla__slide" key={index}>
                      <div className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
                        {phrase.map((line, lineIndex) => (
                          <React.Fragment key={lineIndex}>
                            {line}
                            {lineIndex < phrase.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#cristovao"
                  className="bg-[#FF8200] hover:bg-[#e67600] text-sky-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <Users size={20} />
                  Conhece o Cristóvão Norte
                </a>

                <a
                  href="#participa"
                  className="bg-[#00A9E0]/80 backdrop-blur-md border-2 border-[#00A9E0] hover:bg-[#008bbd] text-sky-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <ArrowRight size={20} />
                  Junta-te à Campanha
                </a>

                <a
                  href="#programa"
                  className="bg-[#1D428A]/80 backdrop-blur-md hover:bg-[#17356e] text-sky-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
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