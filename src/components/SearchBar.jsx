export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label className="search__label" htmlFor="search">
        Поиск по названию
      </label>
      <input
        id="search"
        className="search__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Например: часы, наушники…"
        autoComplete="off"
      />
    </div>
  );
}
