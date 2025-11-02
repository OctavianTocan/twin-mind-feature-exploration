import React from 'react';
import { Icon } from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'btn-primary';
    case 'secondary':
      return 'btn-elevated';
    case 'ghost':
      return 'text-blue-primary hover:bg-gray-100';
    default:
      return '';
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  return (
    <button
      className={`flex items-center gap-1 rounded-full px-3 py-1 text-base font-medium ${getVariantClasses(
        variant
      )}`}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
