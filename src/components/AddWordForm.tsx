import React, { useState } from 'react';
import { Button } from './Button';

interface AddWordFormProps {
  onAddWord: (word: string) => void;
}

export const AddWordForm: React.FC<AddWordFormProps> = ({ onAddWord }) => {
  const [word, setWord] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word) {
      onAddWord(word);
      setWord('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0B4F75]"
      />
      <Button type="submit" variant="primary" className="w-full mt-5">
        Add word
      </Button>
    </form>
  );
};
