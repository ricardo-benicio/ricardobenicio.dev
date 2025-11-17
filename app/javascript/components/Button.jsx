import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = ''
}) => {
  const baseStyles = 'px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto';

  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-black'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
