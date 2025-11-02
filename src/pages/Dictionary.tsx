import React, { useState } from 'react';
import { Header } from '../components/Header';
import { AddWordForm } from '../components/AddWordForm';
import { DictionaryListItem } from '../components/DictionaryListItem';
import { useDictionary, DictionaryItem } from '../contexts/DictionaryContext';

export const DictionaryPage: React.FC = () => {
  const { dictionaryItems, deleteItem } = useDictionary();
  const [editingItem, setEditingItem] = useState<DictionaryItem | null>(null);

  const handleEdit = (item: DictionaryItem) => {
    setEditingItem(item);
    // In a real app, you would open a modal here to edit the item
    console.log('Editing item:', item);
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white p-5 flex flex-col rounded-lg shadow-lg panel-elevated relative z-10">
      <Header
        title="Dictionary"
        onBack={() => console.log('Back button clicked')}
        onSave={() => console.log('Save button clicked')}
      />
      <main className="flex-grow w-full">
        <p className="text-sm mb-6">
          Add words and corrections to your dictionary. This helps improve transcription accuracy for
          unique names and terms.
        </p>
        <AddWordForm />
        <hr className="border-t-2 border-gray-200 my-6" />
        <div className="flex flex-col w-full">
          {dictionaryItems.map((item) => (
            <DictionaryListItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={deleteItem}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
