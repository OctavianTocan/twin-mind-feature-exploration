import React from 'react';

interface ListItemProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({ children, actions, className = '' }) => {
  const itemClasses = `
    w-full flex justify-between items-center px-3 py-3 border-b
    border-gray-200 text-sm
    ${className}
  `;

  return (
    <div className={itemClasses}>
      <div>{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};
