import { useCallback, useState } from 'react';
import { searchAPI } from '../api/searchAPI';
import { SearchResult } from '../api/types/SearchResult';

export const useSearchResults = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const search = useCallback((term: string) => {
    setLoading(true);

    searchAPI
      .getResults(term)
      .then((response: SearchResult[]) => {
        setSearchResults(response);
        setError('');
      })
      .catch((reason) => {
        let message;
        if (typeof reason === 'string') {
          message = reason;
        } else if (reason instanceof Error) {
          message = reason.message;
        } else {
          message = 'Unexpeted Error';
        }
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    search,
    searchResults,
    loading,
    error
  };
};
