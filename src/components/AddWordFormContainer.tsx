import React, { useState } from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import { ToggleSwitch } from './ToggleSwitch';
import { AddWordForm } from './AddWordForm';
import { AddReplacementForm } from './AddReplacementForm';

export const AddWordFormContainer: React.FC = () => {
  const [isReplacement, setIsReplacement] = useState(false);
  const { addItem } = useDictionary();

  const handleAddWord = (word: string) => {
    addItem({ type: 'word', word });
  };

  const handleAddReplacement = (from: string, to: string) => {
    addItem({ type: 'replacement', from, to });
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">Add new word</h2>
      <div className="flex items-center justify-between mb-5">
        <label className="font-medium text-sm">Correct a misspelling</label>
        <ToggleSwitch isChecked={isReplacement} onChange={setIsReplacement} />
      </div>
      {isReplacement ? (
        <AddReplacementForm onAddReplacement={handleAddReplacement} />
      ) : (
        <AddWordForm onAddWord={handleAddWord} />
      )}
    </div>
  );
};
