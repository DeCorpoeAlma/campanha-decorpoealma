import React from 'react';
import { candidates } from '@/data/candidatesData'; // Importar dados dos candidatos

const MacarioRole = () => {
  const macario = candidates.find(candidate => candidate.id === 'macario');

  if (!macario || !macario.roleInCandidacy) {
    return null; // Ou renderizar uma mensagem de erro
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-blue-900 mb-4">Papel na Candidatura</h3>
      <p className="text-gray-700 mb-4">
        {macario.roleInCandidacy.description} {/* Usar descrição dos dados */}
      </p>
      <div className="space-y-2">
        {macario.roleInCandidacy.priorities.map((priority, index) => ( // Usar prioridades dos dados
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">{priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacarioRole;