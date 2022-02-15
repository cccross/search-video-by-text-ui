import React, { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { SearchResult } from '../../api/types/SearchResult';
import { useSearchResults } from '../../hooks/useSearchResults';
import { useTerm } from '../../providers/SearchProvider';
import { Loading } from '../Loading';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultsProps {
  onSelectResult(result: SearchResult): void;
}
type GroupedResults = {
  [key: string]: SearchResult[];
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  onSelectResult
}) => {
  const { term } = useTerm();
  const [activeGroup, setActiveGroup] = useState<string>();
  const { search, searchResults, loading, error } = useSearchResults();
  useErrorHandler(error);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (term) {
        search(term);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [term]);

  if (loading) {
    return (
      <div>
        <br />
        <br />
        <Loading />
      </div>
    );
  }

  if (!searchResults) {
    return null;
  }

  if (!searchResults.length) {
    return (
      <div className="ui inverted segment">
        <div className="ui inverted accordion"> No Results found :(</div>
      </div>
    );
  }

  const groupedResults = searchResults.reduce(
    (acc: GroupedResults, resultItem) => {
      if (!acc[resultItem.videoName]) {
        acc[resultItem.videoName] = [];
      }
      acc[resultItem.videoName].push(resultItem);

      return acc;
    },
    {}
  );

  const toggleActiveGroup = (groupToToggle: string) => {
    if (groupToToggle === activeGroup) {
      setActiveGroup('');
    } else {
      setActiveGroup(groupToToggle);
    }
  };

  return (
    <div className="ui inverted segment">
      <div className="ui inverted accordion ">
        {Object.keys(groupedResults).map((key) => (
          <div key={key}>
            <div
              role="button"
              tabIndex={0}
              className={`title ${activeGroup === key ? 'active' : ''}`}
              onKeyDown={() => {}}
              onClick={() => toggleActiveGroup(key)}
            >
              <i className="dropdown icon" />
              {key}
            </div>
            <div className={`content ${activeGroup === key ? 'active' : ''}`}>
              <div className="ui cards">
                {groupedResults[key].map((result: SearchResult, index) => (
                  <SearchResultItem
                    key={`${key}--${index}`}
                    onClick={onSelectResult}
                    searchResult={result}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
