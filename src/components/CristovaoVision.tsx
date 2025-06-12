import React from 'react';
// Remover importação de candidates

// Interface para a prop 'vision'
interface CristovaoVisionProps {
  vision: string[];
}

// Aceitar 'vision' como prop
const CristovaoVision: React.FC<CristovaoVisionProps> = ({ vision }) => {

  if (!vision) {
    return null; // Ou renderizar uma mensagem de erro
  }

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-blue-100 to-yellow-100 p-8 rounded-2xl">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Visão para Faro</h3>
          <ul className="space-y-3 text-gray-700">
            {vision.map((item, index) => ( // Usar dados da visão
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CristovaoVision;