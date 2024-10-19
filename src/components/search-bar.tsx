interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (onInStockOnlyChange: boolean) => void;
}

export default function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        onChange={(e) => onFilterTextChange(e.target.value)}
        type="text"
        value={filterText}
        placeholder="Search..."
      />
      <label>
        <input
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          checked={inStockOnly}
          type="checkbox"
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
