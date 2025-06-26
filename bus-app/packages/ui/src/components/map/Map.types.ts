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
  };
  buses: BusRoute[];
  onClose: () => void;
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