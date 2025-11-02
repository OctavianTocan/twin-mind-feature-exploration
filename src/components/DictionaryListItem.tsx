import React from 'react';
import { DictionaryItem } from '../contexts/DictionaryContext';
import { IconButton } from './IconButton';
import { Icon } from './Icon';
import { ListItem } from './ListItem';

interface DictionaryListItemProps {
  item: DictionaryItem;
  onEdit: (item: DictionaryItem) => void;
  onDelete: (id: string) => void;
}

const DictionaryItemContent: React.FC<{ item: DictionaryItem }> = ({ item }) => {
  if (item.type === 'word') {
    return <span>{item.word}</span>;
  }
  return (
    <>
      <span className="opacity-70">{item.from}</span>
      <span className="mx-2 text-[#0B4F75]">&rarr;</span>
      <span className="font-semibold">{item.to}</span>
    </>
  );
};

export const DictionaryListItem: React.FC<DictionaryListItemProps> = ({ item, onEdit, onDelete }) => {
  const actions = (
    <>
      <IconButton
        data-testid={`edit-item-${item.id}`}
        aria-label="Edit item"
        icon={<Icon name="pencil" className="h-5 w-5" />}
        onClick={() => onEdit(item)}
      />
      <IconButton
        aria-label="Delete item"
        icon={<Icon name="trash" className="h-5 w-5" />}
        onClick={() => onDelete(item.id)}
      />
    </>
  );

  return (
    <ListItem actions={actions}>
      <DictionaryItemContent item={item} />
    </ListItem>
  );
};
