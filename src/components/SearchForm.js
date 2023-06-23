import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [majorCode, setMajorCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(majorCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="majorCode">Major Code:</label>
      <input
        type="text"
        id="majorCode"
        value={majorCode}
        onChange={(e) => setMajorCode(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;