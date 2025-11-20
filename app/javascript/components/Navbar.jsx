import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');

  const navLinks = [
    { label: 'Início', sectionId: 'hero-section' },
    { label: 'Trabalhos', sectionId: 'work-section' },
    { label: 'Sobre', sectionId: 'about-section' },
    { label: 'Serviços', sectionId: 'services-section' },
    { label: 'Contato', sectionId: 'contact-section' },
  ];

  useEffect(() => {
    const sectionIds = navLinks.map(link => link.sectionId);

    const observerOptions = {
      root: null,
      rootMargin: '-64px 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800 py-4 px-6"
      aria-label="Navegação principal"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <button
          onClick={() => scrollToSection('hero-section')}
          className="text-white font-bold text-xl hover:text-purple-400 transition-colors"
          aria-label="Voltar ao início"
        >
          RB
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.sectionId}>
              <button
                onClick={() => scrollToSection(link.sectionId)}
                className={`transition-colors duration-300 ${
                  activeSection === link.sectionId
                    ? 'text-purple-400 font-semibold'
                    : 'text-white hover:text-purple-400'
                }`}
                aria-current={activeSection === link.sectionId ? 'page' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.sectionId}>
                <button
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`w-full text-left px-4 py-2 transition-colors duration-300 ${
                    activeSection === link.sectionId
                      ? 'text-purple-400 font-semibold bg-gray-800/50'
                      : 'text-white hover:text-purple-400 hover:bg-gray-800/30'
                  }`}
                  aria-current={activeSection === link.sectionId ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
