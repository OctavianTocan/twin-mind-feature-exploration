import React, { useState } from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import { Button } from './Button';
import { ToggleSwitch } from './ToggleSwitch';

export const AddWordForm: React.FC = () => {
  const [isReplacement, setIsReplacement] = useState(false);
  const [word, setWord] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { addItem } = useDictionary();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReplacement) {
      if (from && to) {
        addItem({ type: 'replacement', from, to });
        setFrom('');
        setTo('');
      }
    } else {
      if (word) {
        addItem({ type: 'word', word });
        setWord('');
      }
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">Add new word</h2>
      <div className="flex items-center justify-between mb-5">
        <label className="font-medium text-sm">Correct a misspelling</label>
        <ToggleSwitch isChecked={isReplacement} onChange={setIsReplacement} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
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
        <Button type="submit" variant="primary" className="w-full mt-5">
          Add word
        </Button>
      </form>
    </div>
  );
};
