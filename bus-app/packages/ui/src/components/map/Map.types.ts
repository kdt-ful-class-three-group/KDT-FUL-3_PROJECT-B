import maplibregl from 'maplibre-gl';

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  citycode: number;
}

export interface BusRoute {
  routeId: string;
  routeNo: string;
  routeName: string;
  routeTp: string;
  start: string;
  end: string;
}

export type MapProps = {
  maptilerKey: string;
};

export interface MapMarkerProps {
  stop: Stop;
  mapInstance: maplibregl.Map | null;
  onSelectStop?: (routes: BusRoute[], stop: Stop) => void;
}

export interface PopupProps {
  stop: {
    id: string;
    name: string;
    citycode: number;
  };
  buses: BusRoute[];
  onClose: () => void;
}

// 여기 추가했어 - 버스 도착정보 타입
export interface ArrivalInfo {
  routeId: string;     // 노선 ID
  routeNo: string;     // 노선 번호
  predictTime1: string; // 첫 번째 버스 도착까지 남은 시간(분/초, API 응답에 따라 달라짐)
  predictTime2?: string; // 두 번째 버스 도착까지 남은 시간
  stationOrder1?: string; // 첫 번째 버스 남은 정류장 수
  stationOrder2?: string; // 두 번째 버스 남은 정류장 수
  message1?: string;     // 예: '곧 도착' 등
  message2?: string;     // 두 번째 버스 메시지
  [key: string]: any;    // 혹시 추가 필드 대응
}

export interface MapViewProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  mapInstance: maplibregl.Map | null;
  stops: Stop[];
  selectedStop: Stop | null;
  popupBuses: BusRoute[];
  onSelectStop: (routes: BusRoute[], stop: Stop) => void;
  onClosePopup: () => void;
}