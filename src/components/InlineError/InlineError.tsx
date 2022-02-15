import React from 'react';
import { DEFAULT_ERROR_MESSAGE } from '../../constants';
import './InlineError.css';

interface InlineErrorProps {
  error: Error;
  resetErrorBoundary(): void;
}

export const InlineError: React.FC<InlineErrorProps> = ({
  error,
  resetErrorBoundary
}) => {
  const errorMessage = error?.message || DEFAULT_ERROR_MESSAGE;
  return (
    <div className="error-fallback" role="alert">
      <p>Something went wrong:</p>
      <p>{errorMessage}</p>
      <button
        className="ui secondary button"
        type="button"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
};
