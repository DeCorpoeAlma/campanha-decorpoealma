import React from 'react';
import TabsComponent from './TabsComponent';
const CandidateSection = () => {
  const tabs = [
    {
      id: 'camara',
      label: 'Câmara Municipal',
      content: <div>Conteúdo da Câmara Municipal</div>, // Placeholder
    },
    {
      id: 'assembleia',
      label: 'Assembleia Municipal',
      content: <div>Conteúdo da Assembleia Municipal</div>, // Placeholder
    },
  ];

  return (
    <section id="candidatos-orgaos-municipais" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark-blue mb-8">Candidatos aos Órgãos Municipais</h2>
        <TabsComponent tabs={tabs} initialTab="camara" />
      </div>
    </section>
  );
};

export default CandidateSection;