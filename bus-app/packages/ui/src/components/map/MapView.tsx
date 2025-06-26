import { MapMarker } from './MapMarker';
import { Popup } from '../popup/Popup';
import type { MapViewProps } from './Map.types';

export function MapView({
  mapRef,
  mapInstance,
  stops,
  selectedStop,
  popupBuses,
  onSelectStop,
  onClosePopup,
}: MapViewProps) {
  return (
    <div ref={mapRef} className="w-full h-full relative">
      {mapInstance && stops.map((stop) => (
        <MapMarker
          key={stop.id}
          stop={stop}
          mapInstance={mapInstance}
          onSelectStop={onSelectStop}
        />
      ))}
      {selectedStop && (
        <Popup
          stop={selectedStop}
          buses={popupBuses}
          onClose={onClosePopup}
        />
      )}
    </div>
  );
}