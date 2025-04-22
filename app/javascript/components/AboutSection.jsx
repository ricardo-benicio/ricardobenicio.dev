import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-black text-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-16">Sobre mim</h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-xl leading-relaxed mb-8">
          Sou um desenvolvedor de software formado em Sistemas de Informação, com 1 ano e 6 meses de experiência em projetos freelancer e mentorias, onde desenvolvi soluções web inovadoras. Domino tecnologias como Ruby, Ruby on Rails, JavaScript, React, PostgreSQL, RSpec e Tailwind CSS, com foco na construção de aplicações escaláveis e interfaces modernas.
          </p>
          <div className="flex justify-center mt-12">
            <a 
              href="https://github.com/ricardo-benicio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 flex items-center transition-colors duration-300"
            >
              <span className="mr-2">Visite meu GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
