import React from 'react';
import { Card } from './Card';
import { ConnectorActions } from './ConnectorActions';
import { ConnectorInfo } from './ConnectorInfo';

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
  onClick: () => void;
}

export const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector, onToggle, onClick }) => {
  return (
    <Card onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <ConnectorInfo
          name={connector.name}
          description={connector.description}
          icon={connector.icon}
        />
        <ConnectorActions
          isEnabled={connector.isEnabled}
          onToggle={(isEnabled) => onToggle(connector.id, isEnabled)}
        />
      </div>
    </Card>
  );
};
