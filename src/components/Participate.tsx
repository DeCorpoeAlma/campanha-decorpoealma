import React from 'react';
import { Heart, Users, Share2, MapPin, Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Participate = () => {

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

        <div className="max-w-6xl mx-auto">
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
                    href="https://chat.whatsapp.com/DjMV20H2j8Q89MvFawhgm7"
                    className="bg-[#25D366] hover:bg-[#22c35e] text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <FaWhatsapp size={24} color="#FFFF00" />
                  </a>
                  <a
                    href="https://www.facebook.com/AlmaFarense/"
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

        </div>
      </div>
    </section>
  );
};

export default Participate;