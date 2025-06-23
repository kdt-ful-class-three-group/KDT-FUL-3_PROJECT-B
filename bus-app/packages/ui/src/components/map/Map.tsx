import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';
import axios from 'axios';

type MapProps = {
  maptilerKey: string;
};

export default function Map({ maptilerKey }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapRef.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
      center: [127.3849, 36.3510],
      zoom: 16,
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;

      axios
        .get('http://localhost:3333/api/stop', {
          params: { lat, lng },
        })
        .then((response) => {
          const stops = response.data;
          stops.forEach((stop: { id: string; name: string; lat: number; lng: number }) => {
            new maplibregl.Marker()
              .setLngLat([stop.lng, stop.lat])
              .setPopup(new maplibregl.Popup().setText(stop.name))
              .addTo(map);
          });
        })
        .catch((error) => {
          console.error('정류장 데이터 불러오기 실패:', error);
        });
    });

    return () => map.remove();
  }, [maptilerKey]);

  return (
    <div
      ref={mapRef}
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[90%] h-full max-w-[420px] z-0"
    />
  );
}