import React from 'react';
import Button from './Button';
import TypingAnimation from './TypingAnimation';
import useScrollAnimation from '../hooks/useScrollAnimation';

const HeroSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [buttonsRef, buttonsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [scrollIndicatorRef, scrollIndicatorVisible] = useScrollAnimation({ threshold: 0.1 });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-4xl">
        <h1
          ref={titleRef}
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-2 gradient-text ${titleVisible ? 'animate-slide-in-down' : 'animate-hidden'}`}
        >
          Olá, me chamo Ricardo
        </h1>
        <h2
          ref={subtitleRef}
          className={`text-2xl sm:text-3xl mb-6 ${subtitleVisible ? 'animate-slide-in-down animate-delay-200' : 'animate-hidden'}`}
        >
          <TypingAnimation
            texts="Desenvolvedor Full-Stack"
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold"
            typingSpeed={100}
            loop={false}
            showCursor={true}
          />
        </h2>

        <div
          ref={buttonsRef}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 mb-16 max-w-md mx-auto ${buttonsVisible ? 'animate-slide-in-down animate-delay-400' : 'animate-hidden'}`}
        >
          <Button variant="primary" onClick={() => scrollToSection('work-section')}>
            Ver Projetos
          </Button>
          <Button variant="secondary" onClick={() => scrollToSection('contact-section')}>
            Entre em Contato
          </Button>
        </div>

        <div
          ref={scrollIndicatorRef}
          className={`mt-12 ${scrollIndicatorVisible ? 'animate-fade-in animate-delay-600' : 'animate-hidden'}`}
        >
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
