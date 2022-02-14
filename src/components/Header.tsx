import React from 'react';
import { useTerm } from '../providers/SearchProvider';

export const Header: React.FC = () => {
  const { term, setTerm } = useTerm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div className="ui fixed inverted menu">
      <div className="header item">Media Transcript Finder</div>

      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input
              value={term}
              onChange={handleInputChange}
              type="text"
              placeholder="Search..."
            />
            <i className="search link icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
