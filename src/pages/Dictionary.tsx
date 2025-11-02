import React, { useState } from 'react';
import { Header } from '../components/Header';
import { AddWordFormContainer } from '../components/AddWordFormContainer';
import { DictionaryListItem } from '../components/DictionaryListItem';
import { useDictionary, DictionaryItem } from '../contexts/DictionaryContext';
import { Modal } from '../components/Modal';
import { EditDictionaryItemForm } from '../components/EditDictionaryItemForm';

export const DictionaryPage: React.FC = () => {
  const { dictionaryItems, deleteItem } = useDictionary();
  const [editingItem, setEditingItem] = useState<DictionaryItem | null>(null);

  const handleEdit = (item: DictionaryItem) => {
    setEditingItem(item);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
  };

  return (
    <>
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
          <AddWordFormContainer />
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
      <Modal isOpen={!!editingItem} onClose={handleCloseModal}>
        {editingItem && (
          <EditDictionaryItemForm item={editingItem} onClose={handleCloseModal} />
        )}
      </Modal>
    </>
  );
};
