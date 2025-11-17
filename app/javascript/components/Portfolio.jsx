import React from 'react';
import Constellation from './Constellation';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import Button from './Button';

const Portfolio = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Constellation como fundo */}
      <div className="fixed inset-0">
        <Constellation />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10">
        {/* Seção de introdução */}
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-white">Olá, me chamo Ricardo</h1>
            <h2 className="text-2xl sm:text-3xl mb-6 text-white">Desenvolvedor Full-Stack</h2>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 mb-16 max-w-md mx-auto">
              <Button
                variant="primary"
                onClick={() => scrollToSection('work-section')}
              >
                Ver Projetos
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToSection('contact-section')}
              >
                Entre em Contato
              </Button>
            </div>

            <div className="mt-12">
              <div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-1">
                    <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
                  </div>
                  <p className="mt-2 text-white">Role para baixo!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção de trabalhos */}
        <WorkSection />
        
        {/* Seção Sobre mim */}
        <AboutSection />

        {/* Seção de Serviços (Nova) */}
        <ServicesSection />

        {/* Seção de Contato */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Portfolio;
