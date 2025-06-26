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

  const lastRequestedRef = useRef<number>(0);
  const prevLat = useRef<number>(0);
  const prevLng = useRef<number>(0);

  useEffect(() => {

    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
      center: [127.3849, 36.351],
      zoom: 16,
    });
    setMapInstance(map);

  
    map.on('load', async () => {
      const center = map.getCenter();
      try {
        const stopList = await FetchStops(center.lat, center.lng);
        setStops(stopList);
      } catch (err) {
        console.error('초기 정류장 데이터 요청 실패:', err);
      }
      map.fire('moveend');
    });


    map.on('moveend', async () => {
      
      const now = Date.now();
      if (now - lastRequestedRef.current < 1000) return;
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;

      const diff = Math.abs(lat - prevLat.current) + Math.abs(lng - prevLng.current);
      if (diff < 0.0005) return;

      lastRequestedRef.current = now;
      
      try {
        const stopList = await FetchStops(lat, lng);
        if (JSON.stringify(stopList) !== JSON.stringify(stops)) {
          setStops(stopList);
          prevLat.current = lat;
          prevLng.current = lng;
        }
      } catch (err) {
        console.error('정류장 데이터 요청 실패:', err);
      }
    });

    return () => map.remove();
  }, [maptilerKey]);

  return (
    <>
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
        {selectedStop && stops.some((s) => s.id === selectedStop.id) && (
          <Popup
            stop={selectedStop}
            buses={popupBuses}
            onClose={() => setSelectedStop(null)}
          />
        )}
      </div>
    </>
  );
}