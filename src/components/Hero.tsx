import React from 'react';
import { ArrowRight, Users, FileText } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnInteraction: false })]);

  const phrases = [
    "Algo que nunca existiu vai nascer em Faro. Uma coligação única.<br />Um encontro improvável de diferentes visões, <br />unidas por Faro e pelo compromisso de fazer melhor.",
    "Está a chegar algo inédito.<br />Uma coligação feita de pluralidade. De entrega genuína.<br />Com a alma de Faro no centro de tudo.",
    "Nem todas as campanhas nascem iguais.<br />Algumas surpreendem.<br />Começam onde menos se espera: na união improvável de caminhos distintos.",
    "De vozes que, sendo diferentes, partilham uma vontade comum.<br />Um movimento novo, nascido do inconformismo.<br />De quem acredita no futuro. Um melhor Futuro.",
    "<br />Quando há coragem para juntar o que nunca se juntou, o futuro começa a mudar.",
    "Ideias diversas, convicções firmes, um só compromisso: <br />cuidar da nossa cidade e do nosso concelho, <br />transformar com responsabilidade, agir com esperança e com sentido.",
    "Juntos, vamos fazer história.<br /> Por Faro. Por todos nós.<br />Com confiança."
  ];

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
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {phrases.map((phrase, index) => (
                    <div className="embla__slide" key={index}>
                      <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: phrase }}></p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#cristovao"
                  className="bg-orange-400 hover:bg-orange-500 text-sky-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <Users size={20} />
                  Conhece o Cristóvão Norte
                </a>

                <a
                  href="#participa"
                  className="bg-sky-500/80 backdrop-blur-md border-2 border-sky-300 hover:bg-sky-600 text-sky-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
                >
                  <ArrowRight size={20} />
                  Junta-te à Campanha
                </a>

                <a
                  href="#programa"
                  className="bg-blue-900/80 backdrop-blur-md hover:bg-blue-800 text-sky-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-w-[250px] justify-center shadow-xl"
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