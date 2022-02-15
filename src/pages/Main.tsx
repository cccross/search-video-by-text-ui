import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { InlineError } from '../components/InlineError';
import { VideoPlayer } from '../components/VideoPlayer';
import { SearchResults } from '../components/SearchResults';

import { VIDEO_STREAM_BASE_URL } from '../api/searchAPI';
import { SearchResult } from '../api/types/SearchResult';
import './main.css';

export const Main: React.FC = () => {
  const [currentVideoId, setCurrentVideoId] = useState<string>();
  const [initialPlayBackTime, setInitialPlayBackTime] = useState<number>(0);

  const currentVideoUrl = currentVideoId
    ? `${VIDEO_STREAM_BASE_URL}?videoId=${currentVideoId}`
    : undefined;

  const handleSelectResult = (result: SearchResult) => {
    const offsetPlaybackInSeconds = 1;
    let playbackTime = result.timeInSeconds - offsetPlaybackInSeconds;
    if (initialPlayBackTime === playbackTime) {
      --playbackTime;
    }
    setInitialPlayBackTime(playbackTime);
    setCurrentVideoId(result.videoId);
  };

  return (
    <div className="main">
      <div className="ui grid fluid padded">
        <div className="eleven wide tablet eight wide computer column fixed-container">
          <VideoPlayer
            src={currentVideoUrl}
            initialTimeInSeconds={initialPlayBackTime}
          />
        </div>
        <div className="five wide tablet eight wide computer right floated column">
          <ErrorBoundary FallbackComponent={InlineError}>
            <SearchResults onSelectResult={handleSelectResult} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
