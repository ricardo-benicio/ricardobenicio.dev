import React from 'react';
import Constellation from './Constellation';

const Portfolio = () => {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <Constellation />
      
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="text-center z-10">
          <h1 className="text-6xl font-bold mb-2">Hi, I am Riccardo</h1>
          <h2 className="text-3xl mb-6">Full-Stack Developer</h2>
          
          <div className="mt-16">
            <div className="animate-bounce">
              <div className="flex flex-col items-center">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-1">
                  <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
                </div>
                <p className="mt-2">Scroll !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
