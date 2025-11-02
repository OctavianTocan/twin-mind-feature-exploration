import React from 'react';
import { DictionaryPage } from './pages/Dictionary';
import { DictionaryProvider } from './contexts/DictionaryContext';

const App: React.FC = () => {
  return (
    <DictionaryProvider>
      <div className="bg-gray-100 flex justify-center items-start min-h-screen py-8">
        <DictionaryPage />
      </div>
    </DictionaryProvider>
  );
};

export default App;
