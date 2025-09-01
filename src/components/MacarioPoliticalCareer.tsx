import React from 'react';
import { Award } from 'lucide-react';
import { candidates } from '@/data/candidatesData'; // Importar dados dos candidatos

const MacarioPoliticalCareer = () => {
  const macario = candidates.find(candidate => candidate.id === 'macario');

  if (!macario || !macario.politicalCareer) {
    return null; // Ou renderizar uma mensagem de erro
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-orange">
      <div className="flex items-center gap-3 mb-3">
        <Award size={24} className="text-primary-orange" />
        <h4 className="font-semibold text-dark-blue">Percurso Político</h4>
      </div>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        {macario.politicalCareer.map((item, index) => ( // Usar dados do percurso político
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MacarioPoliticalCareer;