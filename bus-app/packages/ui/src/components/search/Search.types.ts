export type SearchResultType = "bus" | "stop";

export interface SearchResult {
  name: string;
  nodeid: string;
  type: SearchResultType;
  start: string;
  end: string;
  routetp: string;
  lat: number;
  lng: number;
}