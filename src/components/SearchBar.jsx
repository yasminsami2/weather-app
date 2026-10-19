function SearchBar({ value, onChange, onSearch, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a city..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="City name"
      />
      <button onClick={onSearch} disabled={disabled || !value.trim()}>
        {disabled ? 'Loading...' : 'Search'}
      </button>
    </div>
  )
}

export default SearchBar
