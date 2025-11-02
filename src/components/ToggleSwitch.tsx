import React from 'react';

interface ToggleSwitchProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, onChange }) => {
  const handleToggle = () => {
    onChange(!isChecked);
  };

  return (
    <button
      className="relative inline-flex items-center toggle-switch-container"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`inline-block toggle-track rounded-full transition-colors ${
          isChecked ? 'bg-[#0B4F75]' : 'bg-gray-300'
        } relative`}
      >
        <span
          className="inline-block toggle-ball transform bg-white rounded-full shadow transition-transform absolute left-[2px] top-[2px]"
          style={{ transform: `translateX(${isChecked ? '1.25rem' : '0'})` }}
        ></span>
      </span>
    </button>
  );
};
