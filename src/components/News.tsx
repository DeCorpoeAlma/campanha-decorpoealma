import React from 'react';
import { Calendar, ExternalLink, Play } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      type: 'video',
      title: 'Entrevista RTA: Cristóvão Norte apresenta propostas para Faro',
      date: '15 de Janeiro, 2025',
      summary: 'Uma conversa aberta sobre os principais desafios da cidade e as soluções propostas pela candidatura.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      type: 'news',
      title: 'Apresentação oficial da candidatura em Faro',
      date: '12 de Janeiro, 2025',
      summary: 'Grande adesão popular na sessão de apresentação da candidatura "Faro. De Corpo e Alma" no Centro Cultural.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      type: 'news',
      title: 'Primeira reunião com associações locais',
      date: '10 de Janeiro, 2025',
      summary: 'Diálogo aberto com representantes das principais associações da cidade para conhecer as suas necessidades.',
      image: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      type: 'video',
      title: 'Visita aos bairros sociais de Faro',
      date: '8 de Janeiro, 2025',
      summary: 'Cristóvão Norte e equipa visitaram os principais bairros sociais para ouvir as preocupações dos moradores.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

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
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play size={24} className="text-blue-900 ml-1" />
                    </div>
                  </div>
                )}
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
                
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                  {item.type === 'video' ? 'Ver Vídeo' : 'Ler Mais'}
                  <ExternalLink size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Ver Todas as Notícias
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;