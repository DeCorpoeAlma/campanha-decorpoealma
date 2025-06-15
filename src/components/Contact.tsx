import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contactos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Contactos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aqui para ouvir. Entre em contacto connosco para esclarecer 
            dúvidas, dar sugestões ou participar na nossa campanha.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
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

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              Envie-nos uma Mensagem
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-600 mb-2">
                  Mensagem Enviada!
                </h4>
                <p className="text-gray-600">
                  Obrigado pelo seu contacto. Responderemos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="apoio">Quero apoiar a campanha</option>
                    <option value="voluntario">Quero ser voluntário</option>
                    <option value="sugestao">Tenho uma sugestão</option>
                    <option value="imprensa">Contacto de imprensa</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-vertical"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;