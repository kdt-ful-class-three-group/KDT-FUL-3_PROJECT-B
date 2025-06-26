import type { SearchResult } from "./Search.types";

interface SearchResultListProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export const SearchResultList = ({ results, onSelect }: SearchResultListProps) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-4 bg-white rounded shadow p-4 border">
      <ul className="space-y-2">
        {results.map((item) => (
          <li
            key={item.id}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            [{item.type === "bus" ? "버스" : "정류장"}] {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};