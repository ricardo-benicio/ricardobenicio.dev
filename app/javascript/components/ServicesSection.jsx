import React from 'react';

const ServiceCard = ({ icon, title }) => {
  return (
    <div className="border border-gray-300 rounded-md p-8 flex flex-col items-center justify-center transition-all hover:border-white hover:shadow-lg hover:shadow-white/10">
      <div className="bg-gray-800 rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">{title}</h3>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <div className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard 
            icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
            </svg>}
            title="Front-end Web"
          />
          
          <ServiceCard 
            icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>}
            title="Back-End"
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg mb-4 text-gray-800 dark:text-white">Contact me!</p>
          <button className="bg-black dark:bg-white text-white dark:text-black rounded-full p-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
