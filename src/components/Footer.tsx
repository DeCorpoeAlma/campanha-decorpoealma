import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
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