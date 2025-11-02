import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DictionaryPage } from './pages/Dictionary';
import { DictionaryProvider } from './contexts/DictionaryContext';
import { ConnectorsPage } from './pages/Connectors';
import { ConnectorsProvider } from './contexts/ConnectorsContext';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 flex justify-center items-start min-h-screen py-8">
        <div className="w-full max-w-md md:max-w-lg">
          <nav className="flex justify-center gap-4 mb-4">
            <Link to="/connectors" className="text-blue-primary hover:underline">
              Connectors
            </Link>
            <Link to="/dictionary" className="text-blue-primary hover:underline">
              Dictionary
            </Link>
          </nav>
          <Routes>
            <Route
              path="/connectors"
              element={
                <ConnectorsProvider>
                  <ConnectorsPage />
                </ConnectorsProvider>
              }
            />
            <Route
              path="/dictionary"
              element={
                <DictionaryProvider>
                  <DictionaryPage />
                </DictionaryProvider>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
