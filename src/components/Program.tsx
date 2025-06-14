import React, { useState } from 'react';
import { Home, Car, Building, GraduationCap, Heart, Music, Users, Download } from 'lucide-react';

const Program = () => {
  const [activeTab, setActiveTab] = useState(0);

  const programAreas = [
    {
      icon: Home,
      title: 'Habitação e Urbanismo',
      color: 'bg-blue-500',
      proposals: [
        'Criação de habitação social e acessível',
        'Reabilitação urbana dos centros históricos',
        'Promoção de habitação para jovens',
        'Regulamentação do arrendamento urbano'
      ]
    },
    {
      icon: Car,
      title: 'Mobilidade',
      color: 'bg-green-500',
      proposals: [
        'Expansão da rede de transportes públicos',
        'Criação de ciclovias seguras',
        'Zonas pedonais no centro da cidade',
        'Estacionamento inteligente e sustentável'
      ]
    },
    {
      icon: Building,
      title: 'Economia Local',
      color: 'bg-yellow-500',
      proposals: [
        'Apoio ao comércio local e PME',
        'Promoção do turismo sustentável',
        'Criação de incubadoras de empresas',
        'Feira mensal de produtos locais'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Juventude e Educação',
      color: 'bg-purple-500',
      proposals: [
        'Bolsas de estudo para estudantes carenciados',
        'Programas de emprego jovem',
        'Espaços de coworking para estudantes',
        'Parcerias com universidades'
      ]
    },
    {
      icon: Heart,
      title: 'Saúde e Bem-Estar',
      color: 'bg-red-500',
      proposals: [
        'Centros de saúde de proximidade',
        'Programas de desporto sénior',
        'Apoio domiciliário reforçado',
        'Espaços verdes terapêuticos'
      ]
    },
    {
      icon: Music,
      title: 'Cultura e Desporto',
      color: 'bg-indigo-500',
      proposals: [
        'Festival anual de artes de Faro',
        'Reabilitação de espaços culturais',
        'Apoio às coletividades desportivas',
        'Biblioteca municipal modernizada'
      ]
    },
    {
      icon: Users,
      title: 'Associativismo',
      color: 'bg-teal-500',
      proposals: [
        'Apoio financeiro às associações',
        'Espaços cedidos para atividades',
        'Programa de voluntariado municipal',
        'Reconhecimento do trabalho associativo'
      ]
    }
  ];

  const parishes = [
    {
      name: 'Faro (Sé e São Pedro)',
      candidate: 'Bruno Lage',
      priorities: ['Reabilitação urbana', 'Comércio local', 'Turismo sustentável'],
      image: '' // Adicionar campo de imagem
    },
    {
      name: 'Montenegro',
      candidate: 'Virgínia Alpestana',
      priorities: ['Mobilidade', 'Espaços verdes', 'Segurança'],
      image: '' // Adicionar campo de imagem
    },
    {
      name: 'Santa Bárbara de Nexe',
      candidate: 'Eva Mendonça',
      priorities: ['Desenvolvimento rural', 'Associativismo', 'Cultura local'],
      image: '' // Adicionar campo de imagem
    },
    {
      name: 'Estoi',
      candidate: 'Patrícia Cadete',
      priorities: ['Habitação social', 'Transportes', 'Apoio aos idosos'],
      image: '/public/Patricia_Cadete_01.jpg' // Adicionar caminho da imagem para Patrícia Cadete
    },
    {
      name: 'Conceição',
      candidate: 'João Ferradeira',
      priorities: ['Habitação social', 'Transportes', 'Cultura local'],
      image: '/public/Nome_01.jpg' // Adicionar caminho da imagem para Patrícia Cadete
    }
  ];

  return (
    <section id="programa" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Programa Eleitoral
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um programa abrangente que aborda os principais desafios de Faro,
            com propostas concretas para melhorar a qualidade de vida de todos os cidadãos.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {programAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ${
                  activeTab === index
                    ? `${area.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline font-medium">{area.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              {React.createElement(programAreas[activeTab].icon, {
                size: 48,
                className: `${programAreas[activeTab].color.replace('bg-', 'text-')} mx-auto mb-4`
              })}
              <h3 className="text-3xl font-bold text-blue-900 mb-2">
                {programAreas[activeTab].title}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {programAreas[activeTab].proposals.map((proposal, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 ${programAreas[activeTab].color} rounded-full mt-1 flex-shrink-0`}></div>
                    <p className="text-gray-700">{proposal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* Candidatos às Juntas de Freguesia */}
        <div className="mt-16"> {/* Adicionado margem superior para separar do conteúdo anterior */}
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-12">
            Candidatos às Juntas de Freguesia
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {parishes.map((parish, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500 flex items-center gap-6"> {/* Adicionado flexbox */}
                <div className="flex-grow"> {/* Envolve o texto e permite que ele cresça */}
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
                
                {/* Adicionar imagem do candidato se existir */}
                {parish.image && (
                  <img
                    src={parish.image}
                    alt={`Foto de ${parish.candidate}`}
                    className="w-40 h-56 object-cover rounded-full flex-shrink-0" // Classes para imagem (aumentado)
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Download Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
            <Download size={20} />
            Descarregar Programa Completo (PDF)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Program;