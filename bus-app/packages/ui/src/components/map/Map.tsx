// Map.tsx
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import { FetchStops } from './FetchStops';

import { MapMarker } from './MapMarker';
import { Popup } from './Popup';

import { MapProps } from './types'; 
import { Stop } from './types';
import { BusRoute } from './types';


export default function Map({ maptilerKey }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [popupBuses, setPopupBuses] = useState<BusRoute[]>([]);

  useEffect(() => {

    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
      center: [127.3849, 36.351],
      zoom: 16,
    });
    setMapInstance(map);
  
    map.on('load', () => {
      map.fire('moveend'); // 처음 맵 로딩 시에도 moveend 이벤트 강제로 발생
    });


    map.on('moveend', async () => {
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;
      
      try {
        const stopList = await FetchStops(lat, lng);
        setStops(stopList);
      } catch (err) {
        console.error('정류장 데이터 요청 실패:', err);
      }
    });

    return () => map.remove();
  }, [maptilerKey]);

  return (
    <div
      ref={mapRef}
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[90%] h-full max-w-[420px] z-0"
    >
      {mapInstance && Array.isArray(stops) && stops.length > 0 &&
        stops.map((stop) => (
          <MapMarker
            key={stop.id}
            stop={stop}
            mapInstance={mapInstance}
            onSelectStop={(routes, stop) => {
              setSelectedStop(stop);
              setPopupBuses(routes);
            }}
          />
        ))
      }
      {selectedStop && (
        <Popup
          stop={selectedStop}
          buses={popupBuses}
          onClose={() => setSelectedStop(null)}
        />
      )}
    </div>
  );
}