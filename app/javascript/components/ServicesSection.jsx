import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ServiceCard = ({ icon, title, cardRef, cardVisible, delay = '' }) => {
  return (
    <div
      ref={cardRef}
      className={`border border-gray-300 rounded-md p-8 flex flex-col items-center justify-center transition-all hover:border-white hover:shadow-lg hover:shadow-white/10 ${cardVisible ? `animate-slide-in-up ${delay}` : 'animate-hidden'}`}
    >
      <div className="bg-gray-800 rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">{title}</h3>
    </div>
  );
};

const ServicesSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [card1Ref, card1Visible] = useScrollAnimation({ threshold: 0.1 });
  const [card2Ref, card2Visible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className={`text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white ${titleVisible ? 'animate-slide-in-up' : 'animate-hidden'}`}
        >
          Serviços
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard
            cardRef={card1Ref}
            cardVisible={card1Visible}
            delay="animate-delay-100"
            icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
            </svg>}
            title="Front-end Web"
          />

          <ServiceCard
            cardRef={card2Ref}
            cardVisible={card2Visible}
            delay="animate-delay-300"
            icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>}
            title="Back-End"
          />
        </div>

        <div
          ref={ctaRef}
          className={`mt-16 text-center ${ctaVisible ? 'animate-fade-in animate-delay-500' : 'animate-hidden'}`}
        >
          <p className="text-lg mb-4 text-gray-800 dark:text-white">Entre em contato comigo!</p>
          <button
            onClick={() => {
              document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-black dark:bg-white text-white dark:text-black rounded-full p-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
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
