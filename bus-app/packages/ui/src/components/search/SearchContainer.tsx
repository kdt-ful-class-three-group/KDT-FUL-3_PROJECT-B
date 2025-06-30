import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResultList } from "./SearchResultList";
import { searchBusStop } from "./SearchService";
import type { SearchResult } from "./Search.types";
import { SearchWrapper } from "./SearchWrapper";

export const SearchContainer = ({ onSelect }: {onSelect: (item: SearchResult) => void}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const data = await searchBusStop(query);
        if (!Array.isArray(data)) {
          console.error("API 응답이 배열이 아님:", data);
          setResults([]);
          return;
        }
        setResults(data);
      } catch (e) {
        console.error("검색 오류:", e);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <SearchWrapper>
      {(showResults, setShowResults, containerRef) => (
        <div ref={containerRef} className="p-8">
          <SearchInput
            value={query}
            onChange={(val) => {
              setQuery(val);
              setShowResults(true);
            }}
          />
          {showResults && (
            <SearchResultList
              results={results}
              onSelect={(item) => {
                console.log("선택됨:", item);
                onSelect(item);
              }} />
          )}
        </div>
      )}
    </SearchWrapper>
  );
};