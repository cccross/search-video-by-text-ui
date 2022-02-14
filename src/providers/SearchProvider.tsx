import React, { createContext, useContext, useMemo, useState } from 'react';

interface TermState {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<TermState>({ term: '', setTerm: () => {} });

export const SearchProvider: React.FC = ({ children }) => {
  const [term, setTerm] = useState('');

  const contextValue: TermState = useMemo(
    () => ({
      term,
      setTerm
    }),
    [term, setTerm]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useTerm = () => useContext(SearchContext);
