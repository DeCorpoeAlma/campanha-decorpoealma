import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-80px 0px 0px 0px', threshold: 0.1 } // Adjust rootMargin and threshold as needed
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const menuItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Cristóvão Norte', href: '#cristovao' },
    { name: 'Macário Correia', href: '#macario' },
    { name: 'Listas', href: '#listas' },
    { name: 'Participa', href: '#participa' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 py-4 ${
        isScrolled
          ? 'bg-white/90 shadow-md opacity-100 transform translate-y-0'
          : 'bg-transparent opacity-0 transform -translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <img src="/images/Logo_FCC_transparente_01.png" alt="Logo FCC" className="h-10 w-auto" />
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium ${
                  activeLink === item.href
                    ? 'text-primary-orange'
                    : isScrolled
                      ? 'text-dark-blue hover:text-primary-orange'
                      : 'text-white hover:text-primary-orange'
                }`}
                style={{ textShadow: isScrolled ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${isScrolled ? 'text-dark-blue' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 border-t ${isScrolled ? 'border-gray-200 bg-white/90' : 'border-dark-blue/30 bg-dark-blue/70'}`}>
            <nav className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium py-2 ${
                    activeLink === item.href
                      ? 'text-primary-orange'
                      : isScrolled
                        ? 'text-dark-blue hover:text-primary-orange'
                        : 'text-white hover:text-primary-orange'
                  }`}
                  style={{ textShadow: isScrolled ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;