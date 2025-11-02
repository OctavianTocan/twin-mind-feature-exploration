import React from 'react';
import { Button } from './Button';
import { Icon } from './Icon';

interface HeaderProps {
  title: string;
  onBack: () => void;
  onSave: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, onSave }) => {
  return (
    <header className="flex justify-between items-center mb-6 w-full">
      <Button variant="ghost" onClick={onBack} leftIcon={<Icon name="back" className="h-4 w-4" />}>
        Back
      </Button>
      <h1 className="text-[1.75rem] font-bold text-[#4F4F4F] leading-[1.3] tracking-[0.096px] font-helvetica">
        {title}
      </h1>
      <Button variant="ghost" onClick={onSave}>
        Save
      </Button>
    </header>
  );
};
