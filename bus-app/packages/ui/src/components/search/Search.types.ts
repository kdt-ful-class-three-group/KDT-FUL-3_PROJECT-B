export type SearchResultType = "bus" | "stop";

export interface SearchResult {
  // 공통
  type: SearchResultType;
  name: string; // stop: nodenm, bus: routeno
  
  // stop 전용 필드
  nodeid?: string;
  gpslati?: number;
  gpslong?: number;
  nodeno?: string;

  // bus 전용 필드
  routeid?: string;
  routetp?: string;
  start?: string;
  end?: string;
  // startvehicletime?: string;
  // endvehicletime?: string;
}
