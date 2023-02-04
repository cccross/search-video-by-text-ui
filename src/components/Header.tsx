import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useTerm } from '../providers/SearchProvider';

export const Header: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { setTerm } = useTerm();

  const handleInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTerm(inputText);
    }
  };

  return (
    <div className="ui fixed inverted menu">
      <div className="header item">Media Transcript Finder</div>

      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input
              value={inputText}
              onKeyPress={handleInputChange}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
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
