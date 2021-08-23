import React from "react";
const SearchBar = ({ value, setValue }) => {
  return (
    <p>
      <input value={value} onChange={({ target }) => setValue(target.value)} />
      <span>ICON</span>
    </p>
  );
};
export default SearchBar;
