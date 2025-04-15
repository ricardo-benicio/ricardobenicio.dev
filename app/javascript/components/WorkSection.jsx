import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectsCarousel from './ProjectsCarousel';

const WorkSection = () => {
  const projects = [
    {
      id: 1,
      title: 'YT Music',
      type: 'Web',
      image: '/images/ytmusic.jpg',
      description: 'App without ads and with PIP mode to enjoy your favourite videos',
      links: {
        demo: '#',
        code: '#'
      }
    },
    {
      id: 2,
      title: 'FlashApp',
      type: 'Android',
      image: '/images/flashapp.jpg',
      description: 'Learning aid application through the creation of various decks of flashcards',
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
        <h2 className="text-6xl font-bold text-center mb-16">Work</h2>
        
        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
};

export default WorkSection;
