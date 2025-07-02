import type { SearchResult } from "./Search.types";

interface Props {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export const SearchResultList = ({ results, onSelect }: Props) => {
  if (results.length === 0) return null;
  
  return (
    <div className="mt-4 bg-white rounded shadow p-4 border max-h-60 overflow-y-auto">
      <ul className="space-y-2">
   {results.map((item) => (
          <li
            key={item.nodeid || item.routeid}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => 
              onSelect(item)}
          >
            {item.type === "bus" ? (
              <div>
                <div className="font-medium">{`${item.routetp} ${item.name}번`}</div>
                <div className="text-sm text-gray-500">{`${item.start} ↔ ${item.end}`}</div>
              </div>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};