import React, { createContext, useContext, useState } from 'react';

export interface DictionaryItem {
  id: string;
  type: 'word' | 'replacement';
  word?: string;
  from?: string;
  to?: string;
}

interface DictionaryContextData {
  dictionaryItems: DictionaryItem[];
  addItem: (item: Omit<DictionaryItem, 'id'>) => void;
  updateItem: (item: DictionaryItem) => void;
  deleteItem: (id: string) => void;
}

const DictionaryContext = createContext<DictionaryContextData>({
  dictionaryItems: [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
});

export const useDictionary = () => useContext(DictionaryContext);

const initialDictionaryItems: DictionaryItem[] = [
  {
    id: '1',
    type: 'replacement',
    from: 'open memory',
    to: 'OpenMemory',
  },
  {
    id: '2',
    type: 'word',
    word: 'tocanoctavian@gmail.com',
  },
  { id: '3', type: 'word', word: 'Octavian Tocan' },
  { id: '4', type: 'word', word: 'Pieces for Desktop' },
  { id: '5', type: 'word', word: 'Ollama' },
  { id: '6', type: 'word', word: 'Figma Jam' },
  { id: '7', type: 'word', word: 'procedural' },
  {
    id: '8',
    type: 'replacement',
    from: 'mem0',
    to: 'Mem0',
  },
  {
    id: '9',
    type: 'replacement',
    from: 'memzero',
    to: 'Mem0',
  },
];

interface DictionaryProviderProps {
  children: React.ReactNode;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({ children }) => {
  const [dictionaryItems, setDictionaryItems] = useState<DictionaryItem[]>(
    initialDictionaryItems
  );

  const addItem = (item: Omit<DictionaryItem, 'id'>) => {
    setDictionaryItems((prevItems) => [
      { ...item, id: Date.now().toString() },
      ...prevItems,
    ]);
  };

  const updateItem = (updatedItem: DictionaryItem) => {
    setDictionaryItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteItem = (id: string) => {
    setDictionaryItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  return (
    <DictionaryContext.Provider
      value={{ dictionaryItems, addItem, updateItem, deleteItem }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};
