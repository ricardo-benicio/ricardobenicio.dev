import React from 'react';
import ProjectsCarousel from './ProjectsCarousel';
import useScrollAnimation from '../hooks/useScrollAnimation';

const WorkSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [carouselRef, carouselVisible] = useScrollAnimation({ threshold: 0.1 });

  const projects = [
    {
      id: 1,
      title: 'Portfolio',
      type: 'Web',
      image: '/images/home.png',
      description: 'Portfolio para um desenvolvedor de software',
      links: {
        demo: '#',
        code: '#'
      }
    },
    {
      id: 2,
      title: 'OficinaPro',
      type: 'Aplicação',
      image: '/images/oficina.png',
      description: 'Aplicação para uma oficina mecânica',
      links: {
        demo: '#',
        code: '#'
      }
    }
    // Outros projetos aqui
  ];

  return (
    <section id="work-section" className="py-20 bg-white text-black relative">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className={`text-6xl font-bold text-center mb-16 ${titleVisible ? 'animate-slide-in-up' : 'animate-hidden'}`}
        >
          Trabalhos
        </h2>

        <div
          ref={carouselRef}
          className={carouselVisible ? 'animate-slide-in-up animate-delay-200' : 'animate-hidden'}
        >
          <ProjectsCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
