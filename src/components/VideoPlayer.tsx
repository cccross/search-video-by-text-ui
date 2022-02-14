import React, { useRef, useEffect } from 'react';

interface VideoPLayerProps {
  src: string | undefined;
  initialTimeInSeconds: number;
}

export const VideoPlayer: React.FC<VideoPLayerProps> = ({
  src,
  initialTimeInSeconds
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const setCurrentTime = (timeInSeconds: number) => {
    if (
      videoRef &&
      videoRef.current &&
      timeInSeconds !== videoRef.current.currentTime
    ) {
      videoRef.current.currentTime = timeInSeconds;
    }
  };

  useEffect(() => {
    setCurrentTime(initialTimeInSeconds);
  }, [src, initialTimeInSeconds]);

  return (
    <div>
      <video ref={videoRef} key={src} width="100%" controls autoPlay>
        <track kind="captions" />
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};
