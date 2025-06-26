import axios from "axios";
import type { SearchResult } from "./Search.types";

export const searchBusStop = async (query: string): Promise<SearchResult[]> => {
  const res = await axios.get<SearchResult[]>(`http://localhost:3333/api/search`, {
    params: { q: query },
  });
  return res.data;
};