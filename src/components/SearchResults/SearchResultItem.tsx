import React from 'react';
import moment from 'moment';
import { SearchResult } from '../../api/types/SearchResult';

interface SearchResultItemProps {
  searchResult: SearchResult;
  onClick(result: SearchResult): void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  searchResult,
  onClick
}) => {
  const { timeInSeconds, text } = searchResult;

  return (
    <div className="ui card">
      <div className="content">
        <div className="meta">
          {moment()
            .startOf('day')
            .add(timeInSeconds, 'seconds')
            .format('HH:mm:ss')}
        </div>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          className="ui bottom attached  button"
          onClick={() => onClick(searchResult)}
        >
          {text}
        </div>
      </div>
    </div>
  );
};