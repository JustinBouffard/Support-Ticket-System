function FilterBar({ selectedLevel, onChange }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filter by level:</span>
      {[1, 2, 3, 4].map((level) => (
        <button
          key={level}
          type="button"
          className={
            selectedLevel === level ? "filter-button active" : "filter-button"
          }
          onClick={() => onChange(level)}
        >
          {level}
        </button>
      ))}
      <button
        type="button"
        className={
          selectedLevel === "all" ? "filter-button active" : "filter-button"
        }
        onClick={() => onChange("all")}
      >
        All
      </button>
    </div>
  );
}

export default FilterBar;
