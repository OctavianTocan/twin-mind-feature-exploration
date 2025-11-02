import React from 'react';
import { Header } from '../components/Header';
import { ConnectorCard } from '../components/ConnectorCard';
import { useConnectors } from '../contexts/ConnectorsContext';

export const ConnectorsPage: React.FC = () => {
  const { connectors, toggleConnector } = useConnectors();

  const handleCardClick = (connectorId: string) => {
    console.log(`Navigate to details for connector: ${connectorId}`);
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white p-5 flex flex-col rounded-lg shadow-lg panel-elevated relative z-10">
      <Header
        title="Connectors"
        onBack={() => console.log('Back button clicked')}
        onSave={() => console.log('Save button clicked')}
      />
      <main className="flex-grow w-full">
        <p className="text-sm mb-6">
          Connect your accounts to search and analyze your data across different platforms.
        </p>
        <div className="flex flex-col w-full gap-3">
          {connectors.map((connector) => (
            <ConnectorCard
              key={connector.id}
              connector={connector}
              onToggle={toggleConnector}
              onClick={() => handleCardClick(connector.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
