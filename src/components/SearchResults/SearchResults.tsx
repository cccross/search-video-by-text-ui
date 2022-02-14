import React, { useState } from 'react';
import { SearchResult } from '../../api/types/SearchResult';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult(result: SearchResult): void;
}
type GroupedResults = {
  [key: string]: SearchResult[];
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onSelectResult
}) => {
  const [activeGroup, setActiveGroup] = useState<string>();

  const groupedResults = results.reduce((acc: GroupedResults, resultItem) => {
    if (!acc[resultItem.videoName]) {
      acc[resultItem.videoName] = [];
    }
    acc[resultItem.videoName].push(resultItem);

    return acc;
  }, {});

  const toggleActiveGroup = (groupToToggle: string) => {
    if (groupToToggle === activeGroup) {
      setActiveGroup('');
    } else {
      setActiveGroup(groupToToggle);
    }
  };

  return (
    <div className="ui styled fluid accordion">
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
                  onClick={() => onSelectResult(result)}
                  searchResult={result}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
