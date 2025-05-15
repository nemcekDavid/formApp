'use client';

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {

  return (
    <button onClick={onClick} className={`px-2 py-1 rounded border-1 border-md hover:cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Button;
