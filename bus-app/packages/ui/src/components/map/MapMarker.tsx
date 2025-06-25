import maplibregl from 'maplibre-gl';
import { useEffect } from 'react';
import { FetchStopInfo } from './FetchStopInfo';
import { MapMarkerProps } from './types';


export function MapMarker({ stop, mapInstance, onSelectStop }: MapMarkerProps) {
  useEffect(() => {
    if (!mapInstance) return;

    const marker = new maplibregl.Marker()
      .setLngLat([stop.lng, stop.lat])
      .addTo(mapInstance);
    
    marker.getElement().addEventListener('click', async () => {
      console.log('정류장 클릭:', stop.id);
      
      try {
        if (!onSelectStop) return;
        const routes = await FetchStopInfo(stop.id, stop.citycode);
        // console.log('경유 노선 정보:', routes);
        onSelectStop(routes, stop);
        // 👉 여기서 팝업 상태 변경 등 처리
      } catch (err) {
        console.error('노선 정보 요청 실패:', err);
      }
    });

    return () => {
      marker.remove();
    };
  }, [stop, mapInstance]);

  return null;
}