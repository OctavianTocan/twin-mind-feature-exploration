import React from 'react';
import { Icon } from './Icon';
import { ToggleSwitch } from './ToggleSwitch';

export interface Connector {
  id: string;
  name: string;
  description: string;
  icon: string;
  isEnabled: boolean;
}

interface ConnectorCardProps {
  connector: Connector;
  onToggle: (id: string, isEnabled: boolean) => void;
}

export const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector, onToggle }) => {
  return (
    <div
      className="connector-card btn-elevated w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`${connector.name} connector`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,auto] gap-x-3 items-start min-w-0">
          <img
            src={connector.icon}
            alt={connector.name}
            className="w-6 h-6 object-contain col-start-1 row-start-1 self-start"
            loading="lazy"
          />
          <div className="min-w-0 col-start-2 row-start-1">
            <div className="font-medium text-gray-900 text-sm">{connector.name}</div>
          </div>
          <p className="text-sm mt-1 col-start-1 col-span-2 row-start-2">{connector.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <ToggleSwitch
            isChecked={connector.isEnabled}
            onChange={(isEnabled) => onToggle(connector.id, isEnabled)}
          />
          <span className="chevron inline-flex text-gray-400" aria-hidden="true">
            <Icon name="chevron" className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
};
