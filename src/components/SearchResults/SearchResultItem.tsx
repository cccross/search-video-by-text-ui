import React from 'react';
import moment from 'moment';
import { SearchResult } from '../../api/types/SearchResult';

interface SearchResultItemProps {
  searchResult: SearchResult;
  onClick(): void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  searchResult,
  onClick
}) => {
  const { videoName, videoId, timeInSeconds, text } = searchResult;

  return (
    <div className="card">
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
          className="ui bottom attached button"
          onClick={onClick}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
