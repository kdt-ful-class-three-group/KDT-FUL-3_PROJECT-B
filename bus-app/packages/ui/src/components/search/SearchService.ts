// 검색어 입력 시 서버에 요청을 보내고 반환
import axios from "axios";
import type { SearchResult } from "./Search.types";

export const searchBusStop = async (query: string): Promise<SearchResult[]> => {
  const res = await axios.get(`http://localhost:3333/api/search?q=${encodeURIComponent(query)}`);
  return res.data;
};