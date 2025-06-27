import maplibregl from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { FetchStopInfo } from './FetchStopInfo';
import { MapMarkerProps } from './Map.types';

export function MapMarker({ stop, mapInstance, onSelectStop }: MapMarkerProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapInstance) return;

    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.remove();
    }

    const marker = new maplibregl.Marker()
      .setLngLat([stop.lng, stop.lat])
      .addTo(mapInstance);

    markerRef.current = marker;

    const handleClick = async () => {
      console.log('정류장 마커 클릭:', stop.name);

      if (!onSelectStop) return;
      onSelectStop([], stop); // 초기화

      try {
        const routes = await FetchStopInfo(stop.id, stop.citycode);
        onSelectStop(routes, stop);
      } catch (err) {
        console.error('노선 정보 요청 실패:', err);
      }
    };

    const el = marker.getElement();
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('click', handleClick);
      marker.remove();
    };
  }, [stop, mapInstance]);

  return null;
}