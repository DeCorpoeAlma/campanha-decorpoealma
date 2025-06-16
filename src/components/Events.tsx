import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { events } from '@/data/eventsData';

const Events = () => {
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <section id="eventos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participe nos nossos encontros e sessões públicas. A sua voz é importante 
            para construir o futuro de Faro.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Coluna da esquerda: Data e Detalhes */}
                <div className="lg:w-3/4 space-y-4"> {/* Ajustado para 3/4 */}
                  <div className="bg-blue-900 text-white rounded-lg p-4 text-center w-[200px] mb-4">
                    <div className="text-2xl font-bold mb-1">
                      {`${event.date.split('/')[0]} ${monthNames[parseInt(event.date.split('/')[1], 10) - 1]}`}
                    </div>
                    <div className="text-sm opacity-90">
                      {event.date.split(' ')[1].replace('(', '').replace(')', '')}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Detalhes em lista vertical */}
                  <div className="flex flex-col gap-2 text-sm"> {/* Alterado de grid para flex vertical */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-blue-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-blue-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} className="text-blue-500" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>

                {/* Coluna da direita: Imagem */}
                <div className="lg:w-1/2 flex justify-center items-start"> {/* Ajustado para 1/4 e alinhamento */}
                   <img
                    src={event.image}
                    alt="Imagem do Evento"
                    className="w-[500px] h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Quer estar sempre informado sobre os nossos eventos?
          </p>
          <a
            href="https://form.qomon.org/faro-2025/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-6 py-3 rounded-full font-semibold transition-colors duration-200"
          >
            Subscrever Agenda
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;