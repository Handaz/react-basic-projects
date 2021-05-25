import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { error, setSearchTerm, searchTerm } = useGlobalContext();

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Search movies</h2>
      <input
        type="text"
        className="form-input"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
