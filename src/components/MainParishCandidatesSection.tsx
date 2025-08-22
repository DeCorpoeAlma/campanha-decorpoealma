import React from 'react';

const mainParishCandidates = [
    {
        name: 'Bruno Lage',
        image: '/candidatos/faro/Bruno_Lage_02.jpg',
        parish: 'Faro (Sé e São Pedro)',
        bio: 'Bruno Gonçalo de Azevedo Lage\n\nNascido em 1977, no concelho de Faro, Bruno Lage é licenciado em Engenharia do Ambiente, pós-graduado em Urbanismo e Mestre em Gestão e Políticas Ambientais pela Faculdade de Ciências e Tecnologia da Universidade Nova de Lisboa.\n\nÉ fundador e foi presidente da FARO 1540 – Associação de Defesa e Promoção do Património Ambiental e Cultural de Faro e da Confraria Marinha da Ria Formosa. Membro da Ordem dos Engenheiros desde 2002, integra ainda a direção da APEA – Associação Portuguesa de Engenharia do Ambiente e participa no movimento internacional Global City 2.0, que reúne cidadãos de várias cidades do mundo em torno de projetos para promover comunidades mais sustentáveis, atrativas e inovadoras.\n\nDesde 2017, desempenha as funções de Presidente da Junta da União das Freguesias de Faro (Sé e São Pedro) e é também membro da delegação do Algarve da Associação Nacional de Freguesias.'
    },
    {
        name: 'Virgínia Alpestana',
        image: '/candidatos/montenegro/Virginia_Alpestana_01.jpg',
        parish: 'Montenegro',
        bio: 'Professora e ativista comunitária. Trabalha há 10 anos em projetos educacionais e culturais para jovens da freguesia.'
    },
    {
        name: 'Patricia Cadete',
        image: '/candidatos/estoi/Patricia_Cadete_01.jpg',
        parish: 'Estoi',
        bio: 'Empresária local e voluntária em associações culturais. Comprometida com a preservação do património histórico de Estoi.'
    },
    {
        name: 'Eva Mendonça',
        image: '/candidatos/sta_barbara_nexe/Eva_Mendonca_01.jpg',
        parish: 'Santa Bárbara de Nexe',
        bio: 'Eva Catarina Afonso Mendonça\n\nNascida em 1975 no concelho de Faro, Eva Catarina Afonso Mendonça reside em Bordeira, freguesia de Santa Bárbara de Nexe. Casada e mãe de uma filha, construiu a sua vida pessoal e profissional sempre ligada à sua terra e comunidade.\n\nÉ licenciada em Gestão Financeira pela Escola Superior de Gestão, Hotelaria e Turismo da Universidade do Algarve e Contabilista Certificada desde 2001. Desde 2003 é sócia-gerente da Gestibarra – Serviços de Contabilidade, Lda, empresa que lidera com foco no rigor, na proximidade e na confiança com os seus clientes.\n\nParalelamente, mantém um forte envolvimento associativo. Desde 1999 integra a direção da Sociedade Recreativa Bordeirense, onde contribui ativamente para a dinamização cultural e social da freguesia.'
    },
    {
        name: 'João Ferradeira',
        image: '/candidatos/conceicao/Joao_Ferradeira_02.jpg',
        parish: 'Conceição',
        bio: 'Economista com foco em desenvolvimento local. Coordenou diversos projetos de revitalização urbana e apoio ao comércio tradicional.'
    },
];

const MainParishCandidatesSection = () => {
  return (
    <section id="candidatos-juntas-principais" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Candidatos às Juntas de Freguesia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {mainParishCandidates.map((candidate, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg shadow-md">
              <img
                src={candidate.image}
                alt={`Foto de ${candidate.name}`}
                className="w-40 h-56 object-cover rounded-full block mx-auto mb-4 border-2 border-yellow-500"
              />
              <h3 className="text-xl font-semibold text-blue-900 mb-1">{candidate.name}</h3>
              <p className="text-md text-gray-700">{candidate.parish}</p>
              <p className="text-sm text-gray-600 mt-2 max-h-40 overflow-y-auto text-justify px-1" style={{ whiteSpace: 'pre-line' }}>{candidate.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainParishCandidatesSection;