import React from 'react';
import { Icon } from './Icon';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <button
      className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#0B4F75] transition-colors"
      {...props}
    >
      {icon}
    </button>
  );
};
