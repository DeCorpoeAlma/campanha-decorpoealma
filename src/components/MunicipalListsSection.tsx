import React from 'react';
import { Building } from 'lucide-react';
import TabsComponent from './TabsComponent';
import { cmCandidatos, amCandidatos } from '../data/municipalCandidatesData';

interface Candidato {
  name: string;
  image: string;
}

const MunicipalListsSection = () => {
  const renderCandidatos = (candidatos: Candidato[], title: string, mainCandidateImage: string, mainCandidateName: string) => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <img src={mainCandidateImage} alt={mainCandidateName} className="w-40 h-56 object-cover rounded-full block mx-auto mb-4 border-2 border-yellow-500" />
          <h3 className="text-lg font-medium text-gray-800 text-center mb-2">
            {mainCandidateName}
          </h3>
          <p className="text-sm text-gray-700 text-center">{title}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {candidatos.map((candidato, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={candidato.image}
                alt={`Candidato ${candidato.name}`}
                className="w-24 h-24 object-cover rounded-full mb-2 border-2 border-yellow-500"
              />
              <p className="text-sm text-gray-700 text-center">{candidato.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'camara',
      label: (
        <>
          <Building size={24} className="mr-2" /> Câmara Municipal
        </>
      ),
      content: renderCandidatos(cmCandidatos, 'Câmara Municipal', '/Cristovao_Norte_01.jpg', 'Cristóvão Norte'),
    },
    {
      id: 'assembleia',
      label: (
        <>
          <Building size={24} className="mr-2" /> Assembleia Municipal
        </>
      ),
      content: renderCandidatos(amCandidatos, 'Assembleia Municipal', '/Macario_Correia_02.jpg', 'Macário Correia'),
    },
  ];

  return (
    <section id="listas" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">Listas para os Órgãos Municipais</h2>
        <TabsComponent
          tabs={tabs}
          initialTab="camara"
          tabButtonClassName="flex items-center px-6 py-3 text-xl font-semibold rounded-full transition-colors duration-300"
          activeTabButtonClassName="bg-yellow-500 text-white"
          inactiveTabButtonClassName="bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white"
          tabContainerClassName="flex justify-center mb-8 space-x-4"
        />
      </div>
    </section>
  );
};

export default MunicipalListsSection;