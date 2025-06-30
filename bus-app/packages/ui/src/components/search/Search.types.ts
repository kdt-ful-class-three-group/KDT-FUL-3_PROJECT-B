export type SearchResultType = "bus" | "stop";

export interface SearchResult {
  name: string;
  nodeid: string;
  type: SearchResultType;
}