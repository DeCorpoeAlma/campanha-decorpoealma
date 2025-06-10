import React, { useState } from 'react';
import { Heart, Users, Share2, DollarSign, CheckCircle } from 'lucide-react';

const Participate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const participationAreas = [
    { id: 'panfletos', label: 'Distribuição de material', icon: Share2 },
    { id: 'eventos', label: 'Organização de eventos', icon: Users },
    { id: 'redes', label: 'Redes sociais', icon: Share2 },
    { id: 'porta', label: 'Campanha porta-a-porta', icon: Users },
    { id: 'logistica', label: 'Apoio logístico', icon: Heart },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="participa" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 text-center shadow-lg">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Obrigado pelo seu apoio!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Recebemos a sua candidatura a voluntário. Entraremos em contacto em breve 
              para coordenar a sua participação na campanha.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="participa" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Junta-te à Campanha
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A mudança que Faro precisa só é possível com a participação de todos. 
            Descobre como podes contribuir para construir uma cidade melhor.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Ways to Help */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              Como Podes Ajudar
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-yellow-600" size={24} />
                  <h4 className="font-semibold text-blue-900">Voluntariado</h4>
                </div>
                <p className="text-gray-600">
                  Participa ativamente na campanha através de diversas atividades 
                  de apoio e mobilização.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <Share2 className="text-blue-600" size={24} />
                  <h4 className="font-semibold text-blue-900">Redes Sociais</h4>
                </div>
                <p className="text-gray-600">
                  Partilha as nossas propostas e conteúdos nas redes sociais para 
                  chegarem a mais pessoas.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="text-green-600" size={24} />
                  <h4 className="font-semibold text-blue-900">Apoio Financeiro</h4>
                </div>
                <p className="text-gray-600">
                  Contribui para os custos da campanha dentro dos limites legais 
                  estabelecidos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="text-red-600" size={24} />
                  <h4 className="font-semibold text-blue-900">Passa a Palavra</h4>
                </div>
                <p className="text-gray-600">
                  Fala com família, amigos e colegas sobre as nossas propostas 
                  para Faro.
                </p>
              </div>
            </div>
          </div>

          {/* Volunteer Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              Formulário de Voluntariado
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Áreas de Interesse
                </label>
                <div className="space-y-2">
                  {participationAreas.map((area) => {
                    const Icon = area.icon;
                    return (
                      <label key={area.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(area.id)}
                          onChange={() => handleInterestChange(area.id)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <Icon size={18} className="text-gray-600" />
                        <span className="text-gray-700">{area.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Juntar-me à Campanha
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Participate;