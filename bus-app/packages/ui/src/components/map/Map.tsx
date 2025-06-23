import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';

type MapProps = {
  maptilerKey: string;
};

export default function Map({ maptilerKey }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapRef.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
      center: [127.3845, 36.3504],
      zoom: 13,
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