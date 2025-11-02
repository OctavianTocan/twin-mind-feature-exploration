import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, onClick, className = '' }) => {
  const cardClasses = `
    w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl
    transition-colors btn-elevated
    ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}
    ${className}
  `;

  return (
    <div
      className={cardClasses}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      {children}
    </div>
  );
};
