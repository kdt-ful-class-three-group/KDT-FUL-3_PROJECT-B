import axios from "axios";
import type { SearchResult } from "./Search.types";

export const searchBusStop = async (query: string): Promise<SearchResult[]> => {
  const res = await axios.get(`http://localhost:3333/api/search?q=${encodeURIComponent(query)}`);
  return res.data;
};