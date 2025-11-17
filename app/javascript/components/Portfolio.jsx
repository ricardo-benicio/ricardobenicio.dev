import React from 'react';
import Constellation from './Constellation';
import HeroSection from './HeroSection';
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
        {/* Seção Hero */}
        <HeroSection />

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
