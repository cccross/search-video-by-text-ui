import React from 'react';
import { SearchProvider } from './providers/SearchProvider';
import { Main } from './pages/Main';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <SearchProvider>
      <Header />
      <Main />
    </SearchProvider>
  );
};
