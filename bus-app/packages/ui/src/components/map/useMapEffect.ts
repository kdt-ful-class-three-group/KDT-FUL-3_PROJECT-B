import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FetchStops } from './FetchStops';
import type { Stop } from './Map.types';

export function useMapEffect(
  mapRef: React.RefObject<HTMLDivElement | null>,
  maptilerKey: string,
  // mapInstance: maplibregl.Map | null,
  setMapInstance: (map: maplibregl.Map) => void,
  // stops: Stop[],/
  setStops: (stops: Stop[]) => void
) {
  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
      center: [127.3849, 36.351],
      zoom: 16,
    });
    setMapInstance(map);

    map.on('load', async () => {
      const center = map.getCenter();
      const stopList = await FetchStops(center.lat, center.lng);
      setStops(stopList);
      map.fire('moveend');
    });

    map.on('moveend', async () => {
      const center = map.getCenter();
      const stopList = await FetchStops(center.lat, center.lng);
      setStops(stopList);
    });

    return () => map.remove();
  }, [maptilerKey]);
}