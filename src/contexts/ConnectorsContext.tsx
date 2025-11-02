import React, { createContext, useContext, useState } from 'react';
import { Connector } from '../components/ConnectorCard';

interface ConnectorsContextData {
  connectors: Connector[];
  toggleConnector: (id: string, isEnabled: boolean) => void;
}

const ConnectorsContext = createContext<ConnectorsContextData>({
  connectors: [],
  toggleConnector: () => {},
});

export const useConnectors = () => useContext(ConnectorsContext);

const initialConnectors: Connector[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Search files in your Google Drive.',
    icon: 'icons/google-drive.png',
    isEnabled: true,
  },
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive',
    description: 'Search, read, and analyze files in your OneDrive.',
    icon: 'icons/onedrive.png',
    isEnabled: false,
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    description: 'Search, read, and analyze messages and invites in your Outlook inbox and calendar.',
    icon: 'icons/outlook.png',
    isEnabled: false,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Search, read, and analyze messages in your Gmail inbox.',
    icon: 'icons/gmail.png',
    isEnabled: true,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Search and read events in your Google Calendar.',
    icon: 'icons/google-calendar.png',
    isEnabled: true,
  },
];

export const ConnectorsProvider: React.FC = ({ children }) => {
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);

  const toggleConnector = (id: string, isEnabled: boolean) => {
    setConnectors((prevConnectors) =>
      prevConnectors.map((connector) =>
        connector.id === id ? { ...connector, isEnabled } : connector
      )
    );
  };

  return (
    <ConnectorsContext.Provider value={{ connectors, toggleConnector }}>
      {children}
    </ConnectorsContext.Provider>
  );
};
