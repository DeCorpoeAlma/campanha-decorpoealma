import React from 'react';
import { Heart, Target, LucideIcon } from 'lucide-react'; // Importar LucideIcon
// Remover importação de candidates

interface ValueItemProps {
  icon: LucideIcon; // Usar LucideIcon
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

// Interface para a prop 'values'
interface CristovaoValuesProps {
  values: Array<{
    icon: string; // Ícone como string nos dados
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
  }>;
}

// Mapeamento de strings para componentes de ícone
const iconMap: { [key: string]: LucideIcon } = {
  Heart: Heart,
  Target: Target,
  // Adicionar outros ícones conforme necessário
};

const ValueItem: React.FC<ValueItemProps> = ({ icon: Icon, title, description, bgColor, iconColor }) => (
  <div className={`flex items-center gap-3 p-4 ${bgColor} rounded-lg`}>
    <Icon className={iconColor} size={24} />
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// Aceitar 'values' como prop
const CristovaoValues: React.FC<CristovaoValuesProps> = ({ values }) => {

  if (!values) {
    return null; // Ou renderizar uma mensagem de erro
  }

  // Mapear os dados dos valores para incluir os componentes de ícone
  const valuesWithIcons = values.map(value => ({
    ...value,
    icon: iconMap[value.icon], // Mapear string para componente de ícone
  }));

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {valuesWithIcons.map((value, index) => (
        <ValueItem key={index} {...value} />
      ))}
    </div>
  );
};

export default CristovaoValues;