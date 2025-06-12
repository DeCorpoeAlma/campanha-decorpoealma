import React from 'react';
import { Facebook, Instagram, Youtube, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Logo and Slogan */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-yellow-400">
                FARO. DE CORPO E ALMA
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Uma candidatura que representa a união entre experiência e renovação, 
                sempre ao serviço dos cidadãos de Faro.
              </p>
              <div className="flex items-center gap-2 text-blue-100">
                <Heart size={16} className="text-yellow-400" />
                <span className="text-sm">Construindo o futuro de Faro, juntos.</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-yellow-400">Links Rápidos</h4>
              <div className="grid grid-cols-2 gap-2">
                <a href="#inicio" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Início
                </a>
                <a href="#cristovao" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Cristóvão Norte
                </a>
                <a href="#macario" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Macário Correia
                </a>
                <a href="#programa" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Programa
                </a>
                <a href="#noticias" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Notícias
                </a>
                <a href="#eventos" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Eventos
                </a>
                <a href="#participa" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Participa
                </a>
                <a href="#contactos" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Contactos
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-yellow-400">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-yellow-400" />
                  <span className="text-blue-100">geral@farodecorpoealma.pt</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-yellow-400" />
                  <span className="text-blue-100">289 813 425</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="pt-4">
                <h5 className="text-sm font-medium text-yellow-400 mb-3">Siga-nos</h5>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=100066736810804"
                    className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://www.instagram.com/faro_de_corpo_e_alma/"
                    className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@farodecorpoealma"
                    className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-blue-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-blue-200 text-sm">
                <p>&copy; 2025 Faro. De Corpo e Alma. Todos os direitos reservados.</p>
              </div>
              
              <div className="text-blue-200 text-sm text-center md:text-right">
                <p>Mandatário: [Nome do Mandatário]</p>
                <p className="mt-1">
                  Campanha desenvolvida com{' '}
                  <Heart size={14} className="inline text-yellow-400" />{' '}
                  para Faro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;