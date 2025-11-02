import React from 'react';
import { DictionaryItem } from '../contexts/DictionaryContext';
import { IconButton } from './IconButton';
import { Icon } from './Icon';

interface DictionaryListItemProps {
  item: DictionaryItem;
  onEdit: (item: DictionaryItem) => void;
  onDelete: (id: string) => void;
}

export const DictionaryListItem: React.FC<DictionaryListItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="w-full flex justify-between items-center px-3 py-3 border-b border-gray-200 text-sm">
      <div>
        {item.type === 'word' ? (
          <span>{item.word}</span>
        ) : (
          <>
            <span className="opacity-70">{item.from}</span>
            <span className="mx-2 text-[#0B4F75]">&rarr;</span>
            <span className="font-semibold">{item.to}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          icon={<Icon name="pencil" className="h-5 w-5" />}
          onClick={() => onEdit(item)}
        />
        <IconButton
          icon={<Icon name="trash" className="h-5 w-5" />}
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
};
