import { useCallback, useState } from 'react';
import { searchAPI } from '../api/searchAPI';
import { SearchResult } from '../api/types/SearchResult';

export const useSearchResults = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [searchResults, setSearchResults] = useState<
    SearchResult[] | undefined
  >(undefined);

  const search = useCallback((term: string) => {
    setLoading(true);

    searchAPI
      .getResults(term)
      .then((response: SearchResult[]) => {
        setSearchResults(response);
        setError(undefined);
      })
      .catch((reason: Error) => {
        setError(reason);
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
