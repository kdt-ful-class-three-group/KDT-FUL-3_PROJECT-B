import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

type Stop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type MapMoverProps = {
  stopName: string | null;
  mapRef: React.RefObject<maplibregl.Map | null>;
  setHighlightedStopIds: (ids: string[]) => void; 
};

export const MapMover = ({ stopName, mapRef, setHighlightedStopIds }: MapMoverProps) => {
  useEffect(() => {
    if (!stopName || !mapRef.current) return;
    const map = mapRef.current!;

    const fetchStops = async () => {
      try {
        const res = await fetch(`http://localhost:3333/api/stop-by-name?name=${encodeURIComponent(stopName)}`);
        if (!res.ok) throw new Error('정류장 데이터 요청 실패');
        const stops: Stop[] = await res.json();

        if (stops.length === 0) return;

        setHighlightedStopIds(stops.map(stop => stop.id));

        const bounds = new maplibregl.LngLatBounds();
        stops.forEach((stop) => {
          bounds.extend([stop.lng, stop.lat]);
        });

        map.fitBounds(bounds, {
          padding: { top: 100, bottom: 100, left: 150, right: 150 },
          duration: 1000,
          maxZoom: 16,
        });
      } catch (err) {
        console.error('정류장 이동 실패:', err);
      }
    };

    fetchStops();
  }, [stopName]);

  return null;
};