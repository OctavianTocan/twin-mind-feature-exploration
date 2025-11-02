import React from 'react';

interface ConnectorInfoProps {
  name: string;
  description: string;
  icon: string;
}

export const ConnectorInfo: React.FC<ConnectorInfoProps> = ({ name, description, icon }) => {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,auto] gap-x-3 items-start min-w-0">
      <img
        src={icon}
        alt={name}
        className="w-6 h-6 object-contain col-start-1 row-start-1 self-start"
        loading="lazy"
      />
      <div className="min-w-0 col-start-2 row-start-1">
        <div className="font-medium text-gray-900 text-sm">{name}</div>
      </div>
      <p className="text-sm mt-1 col-start-1 col-span-2 row-start-2">{description}</p>
    </div>
  );
};
