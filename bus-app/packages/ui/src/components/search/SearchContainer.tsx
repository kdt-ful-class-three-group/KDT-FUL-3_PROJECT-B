import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResultList } from "./SearchResultList";
import { searchBusStop } from "./SearchService";
import type { SearchResult } from "./Search.types";
import { SearchWrapper } from "./SearchWrapper";

type Props = {
  onSelectStopName: (name: string) => void;
  onSelectBusNumber: (name: string) => void;
};

export const SearchContainer = ({ onSelectStopName, onSelectBusNumber }: Props) => {
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
        <div
          ref={containerRef}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-xl"
        >
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

                if (item.type === "stop") {
                  console.log(`정류장 ${item.name} 선택됨`);
                } else if (item.type === "bus" && item.routeid) {
                  // 노선도 표시 로직추가
                  onSelectBusNumber(item.routeid);
                  console.log(`버스 ${item.routeid} 선택됨`);
                }
              }} />
          )}
        </div>
      )}
    </SearchWrapper>
  );
};