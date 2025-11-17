import React from 'react';
import Button from './Button';
import TypingAnimation from './TypingAnimation';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 gradient-text">
          Olá, me chamo Ricardo
        </h1>
        <h2 className="text-2xl sm:text-3xl mb-6">
          <TypingAnimation
            texts="Desenvolvedor Full-Stack"
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold"
            typingSpeed={100}
            loop={false}
            showCursor={true}
          />
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 mb-16 max-w-md mx-auto">
          <Button variant="primary" onClick={() => scrollToSection('work-section')}>
            Ver Projetos
          </Button>
          <Button variant="secondary" onClick={() => scrollToSection('contact-section')}>
            Entre em Contato
          </Button>
        </div>

        <div className="mt-12">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-1">
              <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
            </div>
            <p className="mt-2 text-white">Role para baixo!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
