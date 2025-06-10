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