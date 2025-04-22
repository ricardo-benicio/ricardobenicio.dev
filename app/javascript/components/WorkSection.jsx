import React from 'react';
import ProjectsCarousel from './ProjectsCarousel';

const WorkSection = () => {
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
    <section className="py-20 bg-white text-black relative">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-16">Trabalhos</h2>
        
        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
};

export default WorkSection;
