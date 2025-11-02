import React, { useState } from 'react';
import { Button } from './Button';

interface AddReplacementFormProps {
  onAddReplacement: (from: string, to: string) => void;
}

export const AddReplacementForm: React.FC<AddReplacementFormProps> = ({ onAddReplacement }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      onAddReplacement(from, to);
      setFrom('');
      setTo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit" variant="primary" className="w-full mt-5">
        Add replacement
      </Button>
    </form>
  );
};
