import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-blue text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Bottom Section */}
          {/* Logo da Campanha */}
          <div className="mt-8 md:mt-0">
              <img
                src="/images/FCC-FB-COVER-851X315PX-2025-04-01.png"
                alt="Faro. De Corpo e Alma Logo"
                className="mx-auto md:mx-0 h-auto w-full"
              />
            </div>
          <div className="border-t border-dark-blue/80 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-light-blue/50 text-sm">
                <p>&copy; 2025 Faro. De Corpo e Alma. Todos os direitos reservados.</p>
              </div>
              
              <div className="text-light-blue/50 text-sm text-center md:text-right">
                <p className="mt-1">
                  Desenvolvido com{' '}
                  <Heart size={14} className="inline text-primary-orange" />{' '}
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