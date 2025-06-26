import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResultList } from "./SearchResultList";
import { searchBusStop } from "./SearchService";
import type { SearchResult } from "./Search.types";

export const SearchContainer = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const fetch = async () => {
      try {
        const data = await searchBusStop(query);

        const sorted = [...data].sort((a, b) => {
          const exactA = a.name === query;
          const exactB = b.name === query;
          if (exactA && !exactB) return -1;
          if (!exactA && exactB) return 1;
          return 0;
        });

        setResults(sorted);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error("검색 오류:", e);
        }
      }
    };

    fetch();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="p-6">
      <SearchInput value={query} onChange={setQuery} />
      <SearchResultList results={results} onSelect={(item) => console.log("선택됨:", item)} />
    </div>
  );
};