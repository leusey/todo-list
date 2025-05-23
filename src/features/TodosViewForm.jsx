import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButton = styled.button`
  font-family: "Arial", sans-serif;
  padding: 8px;
  margin: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>
      {/* Search Controls */}
      <div>
        <label>
          Search todos:
          <input
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
        </label>
        <StyledButton type="button" onClick={() => setLocalQueryString("")}>
          Clear
        </StyledButton>
      </div>

      {/* Sort Controls */}
      <div>
        <label htmlFor="sortField">
          Sort By
          <select
            id="sortField"
            name="sortField"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="sortDirection">
          Direction
          <select
            id="sortDirection"
            name="sortDirection"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </StyledForm>
  );
}

export default TodosViewForm;
