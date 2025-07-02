import { useRef, useState } from 'react';
import { useMapEffect } from './useMapEffect';
import { usePopupClose } from './usePopupClose';
import { MapView } from './MapView';
import type { MapProps, Stop, BusRoute } from './Map.types';
import { MapMover } from './MapMover';
import { BusRouteRenderer } from '../bus/BusRouteRenderer';


export function Map({
  maptilerKey,
  stopName,
  mapInstance,
  setMapInstance,
  busNumber,
}: MapProps & {
  stopName: string | null;
  busNumber: string | null;
  mapInstance: maplibregl.Map | null;
  setMapInstance: (map: maplibregl.Map) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [popupBuses, setPopupBuses] = useState<BusRoute[]>([]);
  const [highlightedStopIds, setHighlightedStopIds] = useState<string[]>([]);

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
        highlightedStopIds={highlightedStopIds}
        onSelectBus={(routeId) => {
          setSelectedBus(routeId);
        }}
      />
      <MapMover
        stopName={stopName}
        mapRef={{ current: mapInstance }}
        setHighlightedStopIds={setHighlightedStopIds}
      />
      <BusRouteRenderer
        map={mapInstance}
        route={{ routeId: busNumber, selectedRouteId: selectedBus }}
      />
    </>
  );
}