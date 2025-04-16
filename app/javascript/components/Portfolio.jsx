import React from 'react';
import Constellation from './Constellation';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Constellation como fundo */}
      <div className="fixed inset-0">
        <Constellation />
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10">
        {/* Seção de introdução */}
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-2 text-white">Hi, I'm Ricardo</h1>
            <h2 className="text-3xl mb-6 text-white">Full-Stack Developer</h2>
            
            <div className="mt-16">
              <div className="animate-bounce">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-1">
                    <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
                  </div>
                  <p className="mt-2 text-white">Scroll !</p>
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
