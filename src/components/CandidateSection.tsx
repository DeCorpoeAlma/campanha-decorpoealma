import React from 'react';
import TabsComponent from './TabsComponent';
import CamaraMunicipalSection from './CamaraMunicipalSection';
import AssembleiaMunicipalSection from './AssembleiaMunicipalSection';

const CandidateSection = () => {
  const tabs = [
    {
      id: 'camara',
      label: 'Câmara Municipal',
      content: <CamaraMunicipalSection />,
    },
    {
      id: 'assembleia',
      label: 'Assembleia Municipal',
      content: <AssembleiaMunicipalSection />,
    },
  ];

  return (
    <section id="candidatos-orgaos-municipais" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Candidatos aos Órgãos Municipais</h2>
        <TabsComponent tabs={tabs} initialTab="camara" />
      </div>
    </section>
  );
};

export default CandidateSection;