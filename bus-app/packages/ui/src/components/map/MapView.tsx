import { MapMarker } from './MapMarker';
import { Popup } from '../popup/Popup';
import type { MapViewProps } from './Map.types';

type ExtendedMapViewProps = MapViewProps & {
  highlightedStopIds: string[];
  onSelectBus?: (routeId: string) => void;
};

export function MapView({
  mapRef,
  mapInstance,
  stops,
  selectedStop,
  popupBuses,
  onSelectStop,
  onClosePopup,
  highlightedStopIds,
  onSelectBus,
}: ExtendedMapViewProps) {
  return (
    <div ref={mapRef} className="w-full h-full relative">
      {mapInstance && stops.map((stop) => (
        <MapMarker
          key={stop.id}
          stop={stop}
          mapInstance={mapInstance}
          onSelectStop={onSelectStop}
          highlighted={highlightedStopIds.includes(stop.id)}
        />
      ))}
      {selectedStop && (
        <Popup
          stop={selectedStop}
          buses={popupBuses}
          onClose={onClosePopup}
          onSelectBus={(routeId)=> onSelectBus?.(routeId)}
        />
      )}
    </div>
  );
}