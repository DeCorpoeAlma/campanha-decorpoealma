import React, { useState } from 'react';
import { Home, Building } from 'lucide-react';

// Ordem desejada definida explicitamente para facilitar manutenção
const desiredOrder = [
  'Faro (Sé e São Pedro)',  // Corresponde a UF Faro (Sé e S.Pedro)
  'Montenegro',
  'Estoi',
  'Santa Bárbara de Nexe',  // Corresponde a Sta Barbara Nexe
  'Conceição'
];

// Dados das freguesias (mantidos iguais, mas reordenados via sort abaixo)
const parishesData = [
  {
    name: 'Conceição',
    candidate: 'João Ferradeira',
    image: '/candidatos/conceicao/Joao_Ferradeira_02.jpg',
    priorities: [
      'Requalificação do centro histórico',
      'Melhoria dos espaços verdes',
      'Apoio aos idosos'
    ],
    assemblyMembers: [
      { path: '/candidatos/conceicao/02 Carlos_Alexandre.png', name: 'Carlos Alexandre' },
      { path: '/candidatos/conceicao/03 Catarina_Rafael.png', name: 'Catarina Rafael' },
      { path: '/candidatos/conceicao/04 Nelson_Ramos.png', name: 'Nelson Ramos' },
      { path: '/candidatos/conceicao/05 Celia_Faustino.png', name: 'Célia Faustino' },
      { path: '/candidatos/conceicao/06 Luis_Pacheco.png', name: 'Luís Pacheco' },
      { path: '/candidatos/conceicao/07 Sandra_Cardoso.png', name: 'Sandra Cardoso' },
      { path: '/candidatos/conceicao/08 Pedro_Sousa.png', name: 'Pedro Sousa' },
      { path: '/candidatos/conceicao/09 Cidalia_Pereira.png', name: 'Cidália Pereira' },
      { path: '/candidatos/conceicao/10 Ana_Baltazar.png', name: 'Ana Baltazar' },
      { path: '/candidatos/conceicao/11 Americo_Baltazar.png', name: 'Américo Baltazar' },
      { path: '/candidatos/conceicao/12 Andreina_Tavares.png', name: 'Andreina Tavares' },
      { path: '/candidatos/conceicao/13 Manuel_Francisco_Mestre.png', name: 'Manuel Francisco Mestre' },
      { path: '/candidatos/conceicao/14 Carla_Alexandre.png', name: 'Carla Alexandre' },
      { path: '/candidatos/conceicao/15 Helder_Teixeira.png', name: 'Hélder Teixeira' }
    ]
  },
  {
    name: 'Estoi',
    candidate: 'Patricia Cadete',
    image: '/candidatos/estoi/Patricia_Cadete_01.jpg',
    priorities: [
      'Requalificação do centro histórico',
      'Melhoria dos espaços verdes',
      'Apoio aos idosos'
    ],
    assemblyMembers: [
      { path: '/candidatos/estoi/02 Rui_Cavaco.png', name: 'Rui Cavaco' },
      { path: '/candidatos/estoi/03 Ana_Isa_Martins.png', name: 'Ana Isa Martins' },
      { path: '/candidatos/estoi/04 Americo_Faria.png', name: 'Américo Faria' },
      { path: '/candidatos/estoi/05 Nidia_Bolas.png', name: 'Nídia Bolas' },
      { path: '/candidatos/estoi/06 Pedro_Silva.png', name: 'Pedro Silva' },
      { path: '/candidatos/estoi/07 Nuno_Barradas.png', name: 'Nuno Barradas' },
      { path: '/candidatos/estoi/08 Filipa_Faria.png', name: 'Filipa Faria' },
      { path: '/candidatos/estoi/09 Jorge_Pinela.png', name: 'Jorge Pinela' },
      { path: '/candidatos/estoi/10 Monica_Alves.png', name: 'Mónica Alves' },
      { path: '/candidatos/estoi/11 Joao_Luz.png', name: 'João Luz' },
      { path: '/candidatos/estoi/12 Mauro_Goncalves.png', name: 'Mauro Gonçalves' },
      { path: '/candidatos/estoi/13 Silvia_Navio.png', name: 'Sílvia Navio' },
      { path: '/candidatos/estoi/14 Lino_Domingos.png', name: 'Lino Domingos' },
      { path: '/candidatos/estoi/15 Celine_Castilho.png', name: 'Celine Castilho' },
      { path: '/candidatos/estoi/16 Nuno_Santos.png', name: 'Nuno Santos' },
      { path: '/candidatos/estoi/17 Isilda_Sousa.png', name: 'Isilda Sousa' },
      { path: '/candidatos/estoi/18 Carolina_Azevedo.png', name: 'Carolina Azevedo' }
    ]
  },
  {
    name: 'Santa Bárbara de Nexe',
    candidate: 'Eva Mendonça',
    image: '/candidatos/sta_barbara_nexe/Eva_Mendonca_01.jpg',
    priorities: [
      'Melhoria das infraestruturas',
      'Apoio à agricultura local',
      'Programas culturais'
    ],
    assemblyMembers: [
      { path: '/candidatos/sta_barbara_nexe/02 Antonieta_Guerreiro.png', name: 'Antonieta Guerreiro' },
      { path: '/candidatos/sta_barbara_nexe/03 Jose_Rodrigues.png', name: 'José Rodrigues' },
      { path: '/candidatos/sta_barbara_nexe/04 Marta_Cavaco.png', name: 'Marta Cavaco' },
      { path: '/candidatos/sta_barbara_nexe/05 Maria_Anselmo_Mendes.png', name: 'Maria Anselmo Mendes' },
      { path: '/candidatos/sta_barbara_nexe/06 Rui_Gago.png', name: 'Rui Gago' },
      { path: '/candidatos/sta_barbara_nexe/07 Antonio_Farrajota.png', name: 'António Farrajota' },
      { path: '/candidatos/sta_barbara_nexe/08 Lucibel_Gago_Viegas.png', name: 'Lucibel Gago Viegas' },
      { path: '/candidatos/sta_barbara_nexe/09 Rodolfo_Reis.png', name: 'Rodolfo Reis' },
      { path: '/candidatos/sta_barbara_nexe/10 Lucia_Mendes.png', name: 'Lúcia Mendes' },
      { path: '/candidatos/sta_barbara_nexe/11 Artur_Goncalves.png', name: 'Artur Gonçalves' },
      { path: '/candidatos/sta_barbara_nexe/12 Halia_Santos.png', name: 'Hália Santos' },
      { path: '/candidatos/sta_barbara_nexe/13 Elisabete_Rosa.png', name: 'Elisabete Rosa' },
      { path: '/candidatos/sta_barbara_nexe/14 Miguel_Simplicio.png', name: 'Miguel Simplício' },
      { path: '/candidatos/sta_barbara_nexe/15 Maria_Jose_Romba.png', name: 'Maria José Romba' },
      { path: '/candidatos/sta_barbara_nexe/16 Francisco_Rosa.png', name: 'Francisco Rosa' },
      { path: '/candidatos/sta_barbara_nexe/17 Maria_Filomena_Sousa.png', name: 'Maria Filomena Sousa' },
      { path: '/candidatos/sta_barbara_nexe/18 Patricia_Rodrigues.png', name: 'Patrícia Rodrigues' }
    ]
  },
  {
    name: 'Montenegro',
    candidate: 'Virgínia Alpestana',
    image: '/candidatos/montenegro/Virginia_Alpestana_01.jpg',
    priorities: [
      'Desenvolvimento sustentável',
      'Apoio ao comércio local',
      'Melhoria dos transportes'
    ],
    assemblyMembers: [
      { path: '/candidatos/montenegro/02 Patricia_Galvao.png', name: 'Patrícia Galvão' },
      { path: '/candidatos/montenegro/03 Joao_Geraldes.png', name: 'João Geraldes' },
      { path: '/candidatos/montenegro/04 Maria_do_Ceu_de_Oliveira.png', name: 'Maria do Céu de Oliveira' },
      { path: '/candidatos/montenegro/05 Marco_Gouveia.png', name: 'Marco Gouveia' },
      { path: '/candidatos/montenegro/06 Pedro_Bettencourt.png', name: 'Pedro Bettencourt' },
      { path: '/candidatos/montenegro/07 Armanda_Leal.png', name: 'Armanda Leal' },
      { path: '/candidatos/montenegro/08 Carlos_Goncalves.png', name: 'Carlos Gonçalves' },
      { path: '/candidatos/montenegro/09 Ana_Paula_Machado.png', name: 'Ana Paula Machado' },
      { path: '/candidatos/montenegro/10 Ines_Dias.png', name: 'Inês Dias' },
      { path: '/candidatos/montenegro/11 Marco_Mealha.png', name: 'Marco Mealha' },
      { path: '/candidatos/montenegro/12 Afonso_Sousa.png', name: 'Afonso Sousa' },
      { path: '/candidatos/montenegro/13 Maria_Ines_Mestre.png', name: 'Maria Inês Mestre' },
      { path: '/candidatos/montenegro/14 Paula_Mestre_Sousa.png', name: 'Paula Mestre Sousa' },
      { path: '/candidatos/montenegro/15 Jorge_Pereira.png', name: 'Jorge Pereira' },
      { path: '/candidatos/montenegro/16 Ligia_Santos.png', name: 'Lígia Santos' },
      { path: '/candidatos/montenegro/17 Sara_Gomes.png', name: 'Sara Gomes' },
      { path: '/candidatos/montenegro/18 Luis_Abreu.png', name: 'Luís Abreu' },
      { path: '/candidatos/montenegro/19 Mariana_Massapina.png', name: 'Mariana Massapina' },
      { path: '/candidatos/montenegro/20 Diana_Carvalho.png', name: 'Diana Carvalho' },
      { path: '/candidatos/montenegro/21 Francisco_Bandarra.png', name: 'Francisco Bandarra' },
      { path: '/candidatos/montenegro/22 Deonlide_Inacio.png', name: 'Deonlide Inácio' },
      { path: '/candidatos/montenegro/23 Paulo_Farias.png', name: 'Paulo Farias' },
      { path: '/candidatos/montenegro/24 Joao_Correia.png', name: 'João Correia' },
      { path: '/candidatos/montenegro/25 Sonia_Floro_Ribeiro.png', name: 'Sónia Floro Ribeiro' },
      { path: '/candidatos/montenegro/26 Filipe_Vilhena.png', name: 'Filipe Vilhena' }
    ]
  },
  {
    name: 'Faro (Sé e São Pedro)',
    candidate: 'Bruno Lage',
    image: '/candidatos/faro/Bruno_Lage_02.jpg',
    priorities: [
      'Reabilitação urbana',
      'Segurança e mobilidade',
      'Apoio social'
    ],
    assemblyMembers: [
      { path: '/candidatos/faro/02 Davide_Alpestana.png', name: 'Davide Alpestana' },
      { path: '/candidatos/faro/03 Elizabete_Vargues.png', name: 'Elizabete Vargues' },
      { path: '/candidatos/faro/04 Jorge_Pereira.png', name: 'Jorge Pereira' },
      { path: '/candidatos/faro/05 Ilidia_Serio.png', name: 'Ilídia Sério' },
      { path: '/candidatos/faro/06 Jardim_de_Sousa.png', name: 'Jardim de Sousa' },
      { path: '/candidatos/faro/07 Maria_Joao_Ribeiro.png', name: 'Maria João Ribeiro' },
      { path: '/candidatos/faro/08 Joao_Viegas.png', name: 'João Viegas' },
      { path: '/candidatos/faro/09 Sandra_Coelho.png', name: 'Sandra Coelho' },
      { path: '/candidatos/faro/10 Ezequiel_Canario.png', name: 'Ezequiel Canário' },
      { path: '/candidatos/faro/11 Margarida_Vasconcelos.png', name: 'Margarida Vasconcelos' },
      { path: '/candidatos/faro/12 Luis_Gabadinho.png', name: 'Luís Gabadinho' },
      { path: '/candidatos/faro/13 Elsa_Maia.png', name: 'Elsa Maia' },
      { path: '/candidatos/faro/14 Maria_Margarida_Pereira.png', name: 'Guida Pereira' },
      { path: '/candidatos/faro/15 Vitor_Cantinho.png', name: 'Vítor Cantinho' },
      { path: '/candidatos/faro/16 Luciano_Santos.png', name: 'Luciano Santos' },
      { path: '/candidatos/faro/17 Isabel_Frade.png', name: 'Isabel Frade' },
      { path: '/candidatos/faro/18 Cristiano_Palma.png', name: 'Cristiano Palma' },
      { path: '/candidatos/faro/19 Antonio_Palma.png', name: 'António Palma' },
      { path: '/candidatos/faro/20 Sofia_Oliveira.png', name: 'Sofia Oliveira' },
      { path: '/candidatos/faro/21 David_Silva.png', name: 'David Silva' },
      { path: '/candidatos/faro/22 Carla_Correia.png', name: 'Carla Correia' },
      { path: '/candidatos/faro/23 Luis_Fontinha.png', name: 'Luís Fontinha' },
      { path: '/candidatos/faro/24 Domingos_Carreira.png', name: 'Domingos Carreira' },
      { path: '/candidatos/faro/25 Delmira_Silva.png', name: 'Delmira Silva' },
      { path: '/candidatos/faro/26 Tiago_Gomes.png', name: 'Tiago Gomes' },
      { path: '/candidatos/faro/27 Marcia_Paulino.png', name: 'Márcia Paulino' },
      { path: '/candidatos/faro/28 Sergio_Rodrigues.png', name: 'Sérgio Rodrigues' },
      { path: '/candidatos/faro/29 Rui_Lucio.png', name: 'Rui Lúcio' },
      { path: '/candidatos/faro/30 Catarina_Eusebio.png', name: 'Catarina Eusébio' },
      { path: '/candidatos/faro/31 Nuno_Ribeiro.png', name: 'Nuno Ribeiro' },
      { path: '/candidatos/faro/32 Rui_Patricio_Guerreiro.png', name: 'Rui Guerreiro' },
      { path: '/candidatos/faro/33 Maria_Amalia_Martins.png', name: 'Maria Amália Martins' },
      { path: '/candidatos/faro/34 Vitor_Lima.png', name: 'Vítor Lima' },
      { path: '/candidatos/faro/35 Vicencia_Picarra.png', name: 'Vicência Piçarra' },
      { path: '/candidatos/faro/36 Maria_Celina_de_Oliveira.png', name: 'Maria Celina de Oliveira' },
      { path: '/candidatos/faro/37 Joao_Bolas.png', name: 'João Bolas Soares' },
      { path: '/candidatos/faro/38 Ilidio_Mestre.png', name: 'Ilídio Mestre' }
    ]
  }
];

// Reordena os dados conforme a ordem desejada
const parishes = parishesData.sort((a, b) => 
  desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name)
);

const ParishAssemblySection = () => {
  const [activeParishTab, setActiveParishTab] = useState(0);

  return (
    <section id="juntas-freguesia" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-dark-blue text-center mb-4">
            Listas candidatas às Assembleias de Freguesia
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
        </p>

        {/* Tab Navigation para Freguesias */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto"> {/* Adicionado overflow para mobile */}
          {parishes.map((parish, index) => (
            <button
              key={index}
              onClick={() => setActiveParishTab(index)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ${
                activeParishTab === index
                  ? 'bg-primary-orange text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Building size={18} />
              <span className="font-medium">{parish.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content para Freguesias */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Building size={48} className="text-primary-orange mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-dark-blue mb-2">
                {parishes[activeParishTab].name}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {parishes[activeParishTab].assemblyMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={member.path}
                    alt={`Candidato ${member.name}`}
                    className="w-24 h-24 object-cover rounded-full mb-2 border-2 border-primary-orange"
                    loading="lazy"  // Otimização: lazy loading para imagens
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

export default ParishAssemblySection;