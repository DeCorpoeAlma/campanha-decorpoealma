import React, { useState } from 'react';
import { Calendar, ExternalLink, Play } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      "type": "event",
      "title": "Apresentação da candidata Patrícia Cadete à Junta de Freguesia de Estoi",
      "date": "17 de Junho, 2025",
      "time": "18h30",
      "location": "Largo da Igreja Matriz de Estoi, Estói, Algarve, Portugal",
      "summary": "Evento público de apresentação oficial da candidatura de Patrícia Cadete à Junta de Freguesia de Estoi. Mulher independente e ligada à comunidade, Patrícia compromete-se com uma gestão moderna, próxima das pessoas e orientada para a valorização do espaço público. Haverá música, animação e insufláveis para crianças, num ambiente familiar e de convívio.",
      "image": "https://scontent.flis5-4.fna.fbcdn.net/v/t39.30808-6/506602568_1044864457748105_7224103573115041971_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=75d36f&_nc_ohc=Ha1lkZVhIgQQ7kNvwFKk15p&_nc_oc=Admy3gnMvkmZHU4gRnk0f0LkFqV1pjUMzzVX0cfzpZYcFOxwXhTVst3aD1tR_8gBP4j_ehiyZn5IO3gg92VjVDiR&_nc_zt=23&_nc_ht=scontent.flis5-4.fna&_nc_gid=dDy3HIrZl8oDSwbxMcpsZQ&oh=00_AfM9pZjPEpAgc_JSAsCgjI7bLCI-fwPnUvY5znwXSuALbA&oe=6852266A",
      "tags": [
        "#Estoi",
        "#PatríciaCadete",
        "#AlmaFarense",
        "#decorpoealma",
        "#faro2025",
        "#cidadaniaativa",
        "#juntafreguesia"
      ]
    },
    {
      "type": "video",
      "title": "Só Mais Uma Coisa #7 - Cristóvão Norte",
      "date": "12 de Junho, 2025",
      "location": "YouTube",
      "summary": 'Neste 7º episódio do podcast "Só Mais Uma Coisa", a menina Matilde recebe o deputado e ilustre farense Cristóvão Norte para uma conversa descontraída e inspiradora. Durante o programa, são abordados temas da atualidade local e nacional, com espaço para perguntas e participação dos ouvintes. Não percas esta oportunidade de conhecer melhor as ideias e propostas de um representante ativo da nossa região.',
      "video_url": "https://www.youtube.com/embed/nDDI05KCFak?start=296",
      "image": "https://i.ytimg.com/vi/nDDI05KCFak/hqdefault.jpg"
    },
    {
      "type": "post",
      "title": "OUVIR MONTENEGRO — Cidadania ativa em foco",
      "date": "12 de Junho, 2025",
      "summary": 'O Salão do Clube Desportivo de Montenegro acolheu uma sessão participativa com a presença de Cristóvão Norte, Macário Correia e da Presidente da Junta, Virgínia Alpestana. A população partilhou preocupações sobre mobilidade, espaço público e qualidade de vida. Todos os contributos serão integrados num plano de ação focado nas reais necessidades da freguesia.',
      "image": "https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/506700109_1044256734475544_4341407775570688104_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=AUFSkeprSwEQ7kNvwGMsqjt&_nc_oc=Adl0mby5E6wl8x1N5FZfKmZh9iD_49nB2QAiTivabyEN9J9SwRZ1NTipEq8fKIBrjjOQNg8DunxLxRp3vfYXPAQf&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=s1OchjDrvIVcjkQq7_Ptyw&oh=00_AfN6NZRsVH7i9_oDGZzWtTmVBkx4-qaD57yYNFiDoeDcDQ&oe=68522A78",
      "tags": [
        "#ParticipaçãoCívica",
        "#faro",
        "#montenegro",
        "#decorpoealma"
      ]
    },       
    {
      "type": "post",
      "title": "CAPITAL ONE — Cultura Urbana e Inclusão Social para os Jovens de Faro",
      "date": "12 de Junho, 2025",
      "summary": 'No feriado de 10 de junho, os candidatos Cristóvão Norte e Macário Correia visitaram o espaço Capital One, fundado por Filipe Pereira (Billy Fresh) e a associação Wallride.cl, liderada por Viriato Villas-Boas. Este centro de cultura urbana promove a inclusão social, a criatividade e a educação dos jovens através do hip hop. A visita reforçou o compromisso com projetos juvenis, cultura urbana e inclusão.',
      "image": "https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/505979545_1043943691173515_6882326593884799343_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uX5X8COL5WgQ7kNvwGhwgaf&_nc_oc=Adn9VB41ilHVEEZ4ygKaRE-YnDq7OUN8HJFyUZFUYim5T_rFBGsITxCCcknuY8sruNcyeiyJxYIptXZ586EfHUg_&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=A85HabU75-QhdWjopEV-qw&oh=00_AfOSIGfc_K7O8EzyRGCciEMH2p6iviCLWz-S1TTnKZzOuQ&oe=68520724",
      "tags": [
        "#faro",
        "#decorpoealma",
        "#capitalone",
        "#culturaurbana",
        "#wallride",
        "#inclusãosocial",
        "#hiphopcompropósito",
        "#JuventudeComFuturo"
      ]
    },
    {
      "type": "post",
      "title": "Portugal de Lés-a-Lés chegou a Faro",
      "date": "10 de Junho, 2025",
      "summary": 'A caravana mototurística Portugal de Lés-a-Lés cruzou o país de Penafiel até Faro, passando por Alcobaça e Portalegre. O evento trouxe cerca de 2000 motards nacionais e internacionais, reforçando o papel de Faro como destino mototurístico. Cristóvão Norte e Macário Correia marcaram presença, acompanhados pelo deputado Miguel Santos, destacando os avanços da Lei 25/2025 para os motociclistas.',
      "image": "https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/505520625_1042844974616720_6356970392917050887_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PLOwz5ipqBMQ7kNvwEkW4OT&_nc_oc=Adm2cmJ4ZmLcDHz0UzxNq_FJ9tweiy7Ve-eUnner8Boo9zWKJv8qXtmd0T8ifyXJEH4q23yzEoCGkonpTIgxa5GM&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=up4neznx91Z23SpApsnmpg&oh=00_AfMFmp4FMo_1d3R4lbjKcfNJqNsboFsfzj7aacKiooV7wg&oe=68521C9A",
      "tags": [
        "#lésalés",
        "#motoclubedefaro",
        "#mototurismo",
        "#portugaldelésalés",
        "#faro2025",
        "#orgulhomotard",
        "#decorpoealma"
      ]
    }
  ];

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  const openVideoModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  return (
    <section id="noticias" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Notícias e Atualizações
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe os últimos desenvolvimentos da campanha, entrevistas e 
            encontros com os cidadãos de Faro.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'video' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {item.type === 'video' ? 'Vídeo' : 'Notícia'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-blue-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.summary}
                </p>
                
                {item.type === 'video' && item.video_url ? (
                  <button
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    onClick={() => openVideoModal(item.video_url)}
                  >
                    Ver Vídeo
                    <Play size={16} />
                  </button>
                ) : (
                  <a
                    href="#" // Substituir por URL real se disponível nos dados
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Ler Mais
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Ver Todas as Notícias
          </button>
        </div>

      {/* Video Modal */}
      {showVideoModal && currentVideoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-2xl">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 z-10"
              onClick={() => {
                setShowVideoModal(false);
                setCurrentVideoUrl(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe
                src={currentVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default News;