import React from 'react';
import { Icon } from './Icon';
import { ToggleSwitch } from './ToggleSwitch';

interface ConnectorActionsProps {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
}

export const ConnectorActions: React.FC<ConnectorActionsProps> = ({ isEnabled, onToggle }) => {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <ToggleSwitch isChecked={isEnabled} onChange={onToggle} />
      <span className="chevron inline-flex text-gray-400" aria-hidden="true">
        <Icon name="chevron" className="h-5 w-5" />
      </span>
    </div>
  );
};
