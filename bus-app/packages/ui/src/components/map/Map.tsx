import { useRef, useState } from 'react';
import { useMapEffect } from './useMapEffect';
import { usePopupClose } from './usePopupClose';
import { MapView } from './MapView';
import type { MapProps, Stop, BusRoute } from './Map.types';
import { MapMover } from './MapMover';


export function Map({
  maptilerKey,
  stopName,
  mapInstance,
  setMapInstance,
}: MapProps & {
  stopName: string | null;
  mapInstance: maplibregl.Map | null;
  setMapInstance: (map: maplibregl.Map) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [popupBuses, setPopupBuses] = useState<BusRoute[]>([]);

  useMapEffect(mapRef, maptilerKey, setMapInstance, setStops);
  usePopupClose(mapRef, selectedStop, () => setSelectedStop(null));

  return (
    <>
      <MapView
        mapRef={mapRef}
        mapInstance={mapInstance}
        stops={stops}
        selectedStop={selectedStop}
        popupBuses={popupBuses}
        onSelectStop={(routes, stop) => {
          setSelectedStop(stop);
          setPopupBuses(routes);
        }}
        onClosePopup={() => setSelectedStop(null)}
      />
      <MapMover stopName={stopName} mapRef={{ current: mapInstance }} />
    </>
  );
}