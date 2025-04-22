import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const ProjectsCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProjects = 3; // Número de projetos visíveis simultaneamente
  
  const nextSlide = () => {
    if (currentIndex + visibleProjects < projects.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div 
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleProjects)}%)` }}
        >
          {projects.map(project => (
            <div key={project.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 disabled:opacity-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        disabled={currentIndex + visibleProjects >= projects.length}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 disabled:opacity-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default ProjectsCarousel;
