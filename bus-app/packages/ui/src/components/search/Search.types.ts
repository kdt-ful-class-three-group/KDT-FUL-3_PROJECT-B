export type SearchResultType = "bus" | "stop";

export interface SearchResult {
  id: string;          // 유일 식별자 (예: 정류장 ID나 버스 ID)
  name: string;        // 표시할 이름 (버스 번호 or 정류장명)
  type: SearchResultType;  // 'bus' 또는 'stop'
}