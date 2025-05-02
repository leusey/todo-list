import React from "react";

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={preventRefresh}>
      {/* Search Controls */}
      <div>
        <label>
          Search todos:
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => setQueryString("")}>
          Clear
        </button>
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
    </form>
  );
}

export default TodosViewForm;
