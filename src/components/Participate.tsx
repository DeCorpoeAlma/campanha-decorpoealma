import React, { useState } from 'react';
import { Heart, Users, Share2, DollarSign, CheckCircle, MapPin, Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

interface FormData {
  nome: string;
  apelido: string;
  email: string;
  telemovel: string;
  dataNascimento: string;
  idade: string;
  genero: string;
  interesses: string[]; // Definir explicitamente como string[]
  codigoPostal: string;
  consentimentoDados: boolean;
  subscricaoEmail: boolean;
  subscricaoSMS: boolean;
}

const Participate = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    apelido: '',
    email: '',
    telemovel: '',
    dataNascimento: '',
    idade: '',
    genero: '',
    interesses: [],
    codigoPostal: '',
    consentimentoDados: false,
    subscricaoEmail: false,
    subscricaoSMS: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const participationAreas = [
    { id: 'saude', label: 'Saúde' },
    { id: 'educacao', label: 'Educação' },
    { id: 'seguranca', label: 'Segurança' },
    { id: 'imigracao', label: 'Imigração' },
    { id: 'infraestruturas', label: 'Infraestruturas e Equipamentos' },
    { id: 'espacoPublico', label: 'Espaço Público e Limpeza' },
    { id: 'urbanismo', label: 'Urbanismo' },
    { id: 'culturaJuventudeDesporto', label: 'Cultura, Juventude e Desporto' },
    { id: 'economiaInovacao', label: 'Economia, Investimento e Inovação' },
    { id: 'ambiente', label: 'Ambiente' },
    { id: 'agriculturaMar', label: 'Agricultura e Mar' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interesses: prev.interesses.includes(interestId)
        ? prev.interesses.filter((id: string) => id !== interestId)
        : [...prev.interesses, interestId]
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            Algo grandioso está prestes a acontecer!

            O sucesso desta "maratona" depende do envolvimento de todos. Ao preencher este formulário, ajudará a identificar as suas áreas de interesse e a estar informado sobre as próximas iniciativas.

            Agradecemos a sua colaboração!
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
{/* Contactos e Mapa */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  Informações de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Sede de Campanha</h4>
                      <p className="text-gray-600">
                        Rua de São Luís (Beco Frei André Álvares), 56<br />
                        8000-285 Faro
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Segunda a Sexta: 9h00-18h00<br />
                        Sábado: 9h00-13h00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Mail className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">geral@farodecorpoealma.pt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Phone className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Telefone</h4>
                      <p className="text-gray-600">289 813 425</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  Redes Sociais
                </h3>

                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100066736810804"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/faro_de_corpo_e_alma/"
                    className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://www.youtube.com/@farodecorpoealma"
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <Youtube size={24} />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              {/* Mapa da localização */}
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.1665761528269!2d-7.929760356960938!3d37.02087930474841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0552c582e77817%3A0x18e18eceddb51fc6!2sPSD%20Algarve!5e1!3m2!1spt-PT!2spt!4v1749667984072!5m2!1spt-PT!2spt"
                  width="100%"
                  height="400" // Ajuste a altura conforme necessário
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa da Sede de Campanha - Faro"
                ></iframe>
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
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="apelido" className="block text-sm font-medium text-gray-700 mb-2">
                  Apelido
                </label>
                <input
                  type="text"
                  id="apelido"
                  name="apelido"
                  value={formData.apelido}
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
                <label htmlFor="telemovel" className="block text-sm font-medium text-gray-700 mb-2">
                  Telemóvel
                </label>
                <input
                  type="tel"
                  id="telemovel"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-2">
                  Idade
                </label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  value={formData.idade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">--Selecionar--</option>
                  <option value="F">Feminino</option>
                  <option value="M">Masculino</option>
                </select>
              </div>

              <div>
                <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-2">
                  Código Postal *
                </label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  required
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quais as Suas Áreas de Interesse?
                </label>
                <div className="space-y-2">
                  {participationAreas.map((area) => (
                    <label key={area.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interesses.includes(area.id)}
                        onChange={() => handleInterestChange(area.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{area.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="consentimentoDados"
                    checked={formData.consentimentoDados}
                    onChange={(e) => setFormData(prev => ({ ...prev, consentimentoDados: e.target.checked }))}
                    required
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Aceito que os meus dados sejam utilizados por Faro 2025 para registar a minha resposta. *
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="subscricaoEmail"
                    checked={formData.subscricaoEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscricaoEmail: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Gostaria de receber informações e actualizações relacionadas com Faro 2025 por correio eletrónico.
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="subscricaoSMS"
                    checked={formData.subscricaoSMS}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscricaoSMS: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Gostaria de receber informações e actualizações relacionadas com Faro 2025 por SMS.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Eu subscrevo!
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Participate;