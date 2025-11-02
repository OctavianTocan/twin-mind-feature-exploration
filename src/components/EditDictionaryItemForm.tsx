import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { DictionaryItem, useDictionary } from '../contexts/DictionaryContext';
import { ToggleSwitch } from './ToggleSwitch';

interface EditDictionaryItemFormProps {
  item: DictionaryItem;
  onClose: () => void;
}

export const EditDictionaryItemForm: React.FC<EditDictionaryItemFormProps> = ({ item, onClose }) => {
  const [isReplacement, setIsReplacement] = useState(item.type === 'replacement');
  const [word, setWord] = useState(item.word || '');
  const [from, setFrom] = useState(item.from || '');
  const [to, setTo] = useState(item.to || '');
  const { updateItem, deleteItem } = useDictionary();

  useEffect(() => {
    setIsReplacement(item.type === 'replacement');
    setWord(item.word || '');
    setFrom(item.from || '');
    setTo(item.to || '');
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem = {
      ...item,
      type: isReplacement ? 'replacement' : 'word',
      word: isReplacement ? undefined : word,
      from: isReplacement ? from : undefined,
      to: isReplacement ? to : undefined,
    };
    updateItem(updatedItem as DictionaryItem);
    onClose();
  };

  const handleDelete = () => {
    deleteItem(item.id);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Edit word</h2>
      <div className="flex items-center justify-between mb-4">
        <label className="font-medium text-sm">Correct a misspelling</label>
        <ToggleSwitch isChecked={isReplacement} onChange={setIsReplacement} />
      </div>
      <div className="space-y-2">
        {isReplacement ? (
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Misspelling"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4F75]"
            />
            <span className="text-[#0B4F75] text-xl">&rarr;</span>
            <input
              type="text"
              placeholder="Correct spelling"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4F75]"
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Add a new word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4F75]"
          />
        )}
      </div>
      <div className="flex justify-end items-center gap-3 mt-5">
        <Button type="button" onClick={handleDelete} className="mr-auto" variant="ghost">
          Delete
        </Button>
        <Button type="button" onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
};
