import React from 'react';

interface LoadingProps {
  inline?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ inline }) => {
  return (
    <div className={`ui active inverted  ${inline ? 'dimmer' : ''}`}>
      <div className={`ui loader centered active ${inline ? 'inline' : ''}`} />
    </div>
  );
};

Loading.defaultProps = {
  inline: false
};
