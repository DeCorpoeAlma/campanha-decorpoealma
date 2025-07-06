import React, { useState } from 'react';
import { Calendar, ExternalLink, Play } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      "type": "event",
      "title": 'Apresentação da coligação "Faro - Capital de Confiança"',
      "date": "1 de Julho, 2025",
      "time": "18h30",
      "location": "LAB Terrace, Faro, Portugal",
      "summary": 'Cristóvão Norte apresentou em Faro uma coligação inédita a nível nacional, juntando PSD, CDS, Iniciativa Liberal, PAN e MPT numa candidatura à Câmara Municipal sob o lema “Faro, Capital de Confiança”. A união foi simbolicamente celebrada com um cocktail em que cada ingrediente representava um partido, refletindo a diversidade e complementaridade do grupo. Norte destacou que esta coligação não assenta em repartições de poder, mas numa visão comum para o futuro da cidade, reforçada por figuras como Macário Correia. Com o apoio declarado de todos os parceiros, a coligação promete desafiar o status quo e levar Faro mais longe.',
      "image": "https://scontent.flis5-4.fna.fbcdn.net/v/t39.30808-6/514447469_1058330499734834_6242451437176797892_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=egWYI9i69nIQ7kNvwF4vUBM&_nc_oc=Adnk9vK_wCIRAq1SHPx5WhbM19NYQrLg3kSoDWbdNNcSJSgDFlNcgUIdnITXfhjms02iNpSO8cC-fPdx0jD2SCKQ&_nc_zt=23&_nc_ht=scontent.flis5-4.fna&_nc_gid=iClV4Y5qD44sEgrkuwBTIA&oh=00_AfOXD4jvET9P8RkTOqeJW9Mo3vGSGbPpdyGLza3d8LgolQ&oe=686ADB82",
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
      "image": "https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/506098992_1044256824475535_5517727825262736294_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dMaCE_aXK1MQ7kNvwHHpk1-&_nc_oc=AdnQSRQMTUfdhzxICU4i0chL9eQ1OjjwExB497HqTL7Itc2wR7sydolPFNqVfBX0p2TK8bPvADaXXhH11-MhDEJS&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=caYKUG55SLU8EWciBvBpfw&oh=00_AfP8ThcwPoRapfDu98D1clNt2ThZ2hpAMMysdQYrU96XNA&oe=686ADAC5",
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
      "image": "https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/505792128_1043943674506850_4374005109966145167_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=w5FWJgpybtMQ7kNvwGyh9-8&_nc_oc=Admq2VKK9mGWaa3pflQUBfFBt-hzZlHSoWtflZcfCXWyP77--bHw_Ff_HirwSXIwRfwsvXWim4nPwlQ8p7SBGdfC&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=bPOMJcokqgPHEd-xvvayAA&oh=00_AfMtn7Oa1nJrEuCTfSGhCqb3iFRqVXX9PrP5ItaCaSKLXA&oe=686AD05E",
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
      "image": "https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-6/505520625_1042844974616720_6356970392917050887_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uCmp6DJgPmkQ7kNvwG5G0tJ&_nc_oc=AdkCIh2o5MLAOqnfOfx-_FrKBXWylGG3ZJcT_ieV4jya0qYQihSW8iW9E6E_z8_e_KY3z-gUpfs8WIl3WrvvGA4k&_nc_zt=23&_nc_ht=scontent.flis5-3.fna&_nc_gid=LVFyssMtWNumAnRal3LYzw&oh=00_AfPSG0MkTjkrajIjaEBGHak62GgVMfRIZSkmsVOs-W3jtQ&oe=686AF0DA",
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