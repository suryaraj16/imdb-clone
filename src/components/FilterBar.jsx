function FilterBar({ setFilter }) {

  return (
    <div className="filter-bar">

      <button onClick={() => setFilter("all")}>
        All
      </button>

      <button onClick={() => setFilter("completed")}>
        Completed
      </button>

      <button onClick={() => setFilter("pending")}>
        Pending
      </button>

    </div>
  );
}

export default FilterBar;
