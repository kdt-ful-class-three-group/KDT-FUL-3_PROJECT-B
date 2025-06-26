import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResultList } from "./SearchResultList";
import { searchBusStop } from "./SearchService";
import type { SearchResult } from "./Search.types";

export const SearchContainer = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) return setResults([]);
    const fetch = async () => {
      try {
        const data = await searchBusStop(query);
        setResults(data);
      } catch (e) {
        console.error("검색 오류:", e);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="p-6">
      <SearchInput value={query} onChange={setQuery} />
      <SearchResultList results={results} onSelect={(item) => console.log("선택됨:", item)} />
    </div>
  );
};