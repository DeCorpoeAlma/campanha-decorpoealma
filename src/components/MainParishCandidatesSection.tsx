import React from 'react';

const mainParishCandidates = [
    {
        name: 'Bruno Lage',
        image: '/candidatos/faro/Bruno_Lage_02.jpg',
        parish: 'Faro (Sé e São Pedro)',
        bio: 'Bruno Gonçalo de Azevedo Lage\nNasceu em 1977, no concelho de Faro. É licenciado em Engenharia do Ambiente, pós-graduado em Urbanismo e Mestre em Gestão e Políticas Ambientais pela Faculdade de Ciências e Tecnologia da Universidade Nova de Lisboa. Fundou e presidiu à FARO 1540 – Associação de Defesa e Promoção do Património Ambiental e Cultural de Faro e à Confraria Marinha da Ria Formosa. É membro da Ordem dos Engenheiros desde 2002, integra a direção da APEA – Associação Portuguesa de Engenharia do Ambiente e participa no movimento internacional Global City 2.0. Desde 2017 exerce as funções de Presidente da Junta da União das Freguesias de Faro (Sé e São Pedro) e é também membro da delegação do Algarve da Associação Nacional de Freguesias.'
    },
    {
        name: 'Virgínia Alpestana',
        image: '/candidatos/montenegro/Virginia_Alpestana_01.jpg',
        parish: 'Montenegro',
        bio: 'Virgínia Maria Guerreiro Alcaria Alpestana\nNasceu em Loulé, em 1956. É professora aposentada e desempenhou diversos cargos de relevância distrital, incluindo o de diretora regional do Instituto Português da Juventude. Desde 2009 integra o executivo da Junta de Freguesia de Montenegro, onde o seu trabalho tem sido marcado pela autenticidade, cooperação e proximidade com a população. Em 2021 foi eleita presidente da Junta de Freguesia, mantendo como prioridade a proximidade aos fregueses.'
    },
    {
        name: 'Patricia Cadete',
        image: '/candidatos/estoi/Patricia_Cadete_01.jpg',
        parish: 'Estoi',
        bio: 'Patrícia Isabel Aleixo de Sousa Cadete\nNasceu em Faro, em 1981. É licenciada em Assessoria de Administração pela Universidade do Algarve e trabalha no setor dos seguros há mais de 20 anos, onde adquiriu experiência de gestão e resolução prática de problemas. Reside em Estoi com a família e tem desenvolvido projetos comunitários e educativos, com foco na participação ativa das crianças e jovens, na valorização do património local e no apoio às famílias. Defende mais presente e melhor futuro para a freguesia de Estoi.'
    },
    {
        name: 'Eva Mendonça',
        image: '/candidatos/sta_barbara_nexe/Eva_Mendonca_01.jpg',
        parish: 'Santa Bárbara de Nexe',
        bio: 'Eva Catarina Afonso Mendonça\nNasceu em Faro, em 1975, e reside em Bordeira, freguesia de Santa Bárbara de Nexe. Casada e mãe de uma filha, construiu a sua vida pessoal e profissional sempre ligada à sua comunidade. É licenciada em Gestão Financeira pela Universidade do Algarve, Contabilista Certificada desde 2001 e sócia-gerente da Gestibarra – Serviços de Contabilidade, Lda, desde 2003. Paralelamente, integra desde 1999 a direção da Sociedade Recreativa Bordeirense, contribuindo para a dinamização cultural e social da freguesia.'
    },
    {
        name: 'João Ferradeira',
        image: '/candidatos/conceicao/Joao_Ferradeira_02.jpg',
        parish: 'Conceição',
        bio: 'João Pedro Faria Ferradeira\nNasceu em Faro, em 1982. Cresceu na Conceição de Faro, onde mantém as suas raízes e ligação à comunidade. É licenciado em Sociologia pela Universidade do Algarve e em Turismo pela Universidade de Surrey (Reino Unido). Trabalhou no setor do turismo e da educação e, com a pandemia, regressou em pleno à sua terra natal, dedicando-se à agricultura e ao comércio de frutos secos. É reconhecido como trabalhador, prático e sempre disponível para servir a comunidade que o viu crescer.'
    },
];

const MainParishCandidatesSection = () => {
  return (
    <section id="candidatos-juntas-principais" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark-blue mb-12">
          Candidatos às Juntas de Freguesia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {mainParishCandidates.map((candidate, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg shadow-md">
              <img
                src={candidate.image}
                alt={`Foto de ${candidate.name}`}
                className="w-40 h-56 object-cover rounded-full block mx-auto mb-4 border-2 border-primary-orange"
              />
              <h3 className="text-xl font-semibold text-dark-blue mb-1">{candidate.name}</h3>
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