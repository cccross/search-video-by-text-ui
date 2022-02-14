import React, { useEffect, useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { SearchResults } from '../components/SearchResults';
import { useSearchResults } from '../hooks/useSearchResults';
import { useTerm } from '../providers/SearchProvider';
import { VIDEO_STREAM_BASE_URL } from '../api/searchAPI';
import { SearchResult } from '../api/types/SearchResult';
import mainStyles from './main.module.css';

export const Main: React.FC = () => {
  const { term } = useTerm();
  const { search, searchResults } = useSearchResults();
  const [currentVideoId, setCurrentVideoId] = useState<string>();
  const [initialPlayBackTime, setInitialPlayBackTime] = useState<number>(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (term) {
        search(term);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [term]);

  const currentVideoUrl = currentVideoId
    ? `${VIDEO_STREAM_BASE_URL}?videoId=${currentVideoId}`
    : undefined;

  const handleSelectResult = (result: SearchResult) => {
    let playbackTime = result.timeInSeconds;
    if (initialPlayBackTime === result.timeInSeconds) {
      --playbackTime;
    }
    setInitialPlayBackTime(playbackTime);
    setCurrentVideoId(result.videoId);
  };

  return (
    <div className={mainStyles.main}>
      <div className="ui grid">
        <div className="eleven wide tablet eight wide computer column">
          <VideoPlayer
            src={currentVideoUrl}
            initialTimeInSeconds={initialPlayBackTime}
          />
        </div>
        <div className="five wide tablet eight wide computer column">
          <SearchResults
            results={searchResults}
            onSelectResult={handleSelectResult}
          />
        </div>
      </div>
    </div>
  );
};
