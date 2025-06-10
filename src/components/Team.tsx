import React from 'react';
import { MapPin, Users } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Ana Silva',
      role: 'Coordenadora de Campanha',
      location: 'Faro',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Especialista em comunicação política com experiência em várias campanhas locais.'
    },
    {
      name: 'João Santos',
      role: 'Responsável Programa',
      location: 'Faro',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Economista com foco em desenvolvimento local e políticas públicas.'
    },
    {
      name: 'Maria Costa',
      role: 'Coordenadora Jovem',
      location: 'Faro',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Estudante universitária e ativista pelos direitos dos jovens em Faro.'
    },
    {
      name: 'Pedro Almeida',
      role: 'Coordenador Sénior',
      location: 'Faro',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Reformado e voluntário ativo em diversas organizações comunitárias.'
    }
  ];

  const parishes = [
    {
      name: 'Faro (Sé e São Pedro)',
      candidate: 'Teresa Rodrigues',
      priorities: ['Reabilitação urbana', 'Comércio local', 'Turismo sustentável']
    },
    {
      name: 'Montenegro',
      candidate: 'Carlos Ferreira',
      priorities: ['Mobilidade', 'Espaços verdes', 'Segurança']
    },
    {
      name: 'Santa Bárbara de Nexe',
      candidate: 'Isabel Martins',
      priorities: ['Desenvolvimento rural', 'Associativismo', 'Cultura local']
    },
    {
      name: 'Conceição e Estoi',
      candidate: 'António Sousa',
      priorities: ['Habitação social', 'Transportes', 'Apoio aos idosos']
    }
  ];

  return (
    <section id="equipa" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            A Nossa Equipa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma equipa diversificada e comprometida, unida pela paixão de servir Faro 
            e construir um futuro melhor para todos os cidadãos.
          </p>
        </div>

        {/* Core Team */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-12">
            Equipa de Campanha
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                    <Users size={16} />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-blue-900 mb-1">
                  {member.name}
                </h4>
                <p className="text-yellow-600 font-medium mb-2">
                  {member.role}
                </p>
                
                <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin size={14} />
                  <span>{member.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Parish Candidates */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-12">
            Candidatos às Juntas de Freguesia
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {parishes.map((parish, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-blue-900 mb-2">
                  {parish.name}
                </h4>
                <p className="text-lg text-yellow-600 font-medium mb-4">
                  {parish.candidate}
                </p>
                
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Prioridades:</h5>
                  <ul className="space-y-1">
                    {parish.priorities.map((priority, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{priority}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="bg-blue-900 rounded-2xl p-8 text-center mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Quer fazer parte da nossa equipa?
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Estamos sempre à procura de pessoas dedicadas que queiram contribuir 
            para o desenvolvimento de Faro.
          </p>
          <a
            href="#participa"
            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Juntar-me à Equipa
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;