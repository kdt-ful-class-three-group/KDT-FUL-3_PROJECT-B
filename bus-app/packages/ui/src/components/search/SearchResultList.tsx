import type { SearchResult } from "./Search.types";

interface SearchResultListProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export const SearchResultList = ({ results, onSelect }: SearchResultListProps) => {
  if (results.length === 0) return null;

  return (
    <ul className="mt-4 space-y-2">
      {results.map((item) => (
        <li
          key={item.id}
          className="p-2 bg-white rounded shadow hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          [{item.type === "bus" ? "버스" : "정류장"}] {item.name}
        </li>
      ))}
    </ul>
  );
};