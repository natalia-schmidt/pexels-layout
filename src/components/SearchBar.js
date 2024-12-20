import React, { useState } from 'react';

const SearchBar = ({ searchTopic, onSearchChange, onSearchSubmit }) => {
  // Local state to handle input text changes
  const [inputValue, setInputValue] = useState(searchTopic);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(inputValue);  // Trigger search when Enter is pressed
    }
  };

  const handleButtonClick = () => {
    onSearchSubmit(inputValue);  // Trigger search when button is clicked
  };

  return (
    <div className="mb-4 d-flex">
      <input
        type="text"
        className="form-control me-2" // Added margin to the right to separate the input and button
        placeholder="Enter search topic (e.g., 'mountains', 'love')"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}  // Listen for Enter key press
      />
      <button
        className="btn btn-primary"
        onClick={handleButtonClick}  // Search button click
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
