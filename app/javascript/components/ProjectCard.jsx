import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src="/images/profile.jpeg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-2 py-1 rounded-lg bg-black bg-opacity-40">
            <h3 className="text-base font-medium text-white">{project.title}</h3>
            <p className="text-sm text-gray-300">{project.type}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-lg text-gray-700 mb-6">{project.description}</p>
        
        <div className="flex space-x-6">
          {project.links.demo && (
            <a href={project.links.demo} className="flex items-center text-blue-500 hover:text-blue-700 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
              </svg>
              <span>Link</span>
            </a>
          )}
          
          {project.links.code && (
            <a href={project.links.code} className="flex items-center text-green-500 hover:text-green-700 text-lg">
              <span>Code Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
