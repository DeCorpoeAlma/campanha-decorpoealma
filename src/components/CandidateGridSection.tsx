import React from 'react';
import { Building } from 'lucide-react';

interface Member {
  path: string;
  name: string;
}

interface CandidateGridSectionProps {
  title: string;
  members: Member[];
  iconColorClass: string;
  sectionId: string;
}

const CandidateGridSection: React.FC<CandidateGridSectionProps> = ({ title, members, iconColorClass, sectionId }) => {
  return (
    <section id={sectionId} className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark-blue mb-12">{`Candidatos à ${title}`}</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Building size={48} className={`${iconColorClass} mx-auto mb-4`} />
              <h3 className="text-3xl font-bold text-dark-blue mb-2">
                {title}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {members.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={member.path}
                    alt={`Candidato ${member.name}`}
                    className={`w-24 h-24 object-cover rounded-full mb-2 border-2 ${iconColorClass}`}
                  />
                  <p className="text-sm text-gray-700 text-center">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateGridSection;