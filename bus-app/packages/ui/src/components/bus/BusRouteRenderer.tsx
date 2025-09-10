import { useEffect, useRef } from "react";
import axios from "axios";
import maplibregl from "maplibre-gl";

type Props = {
  map: maplibregl.Map | null;
  route: {
    routeId: string | null;
    selectedRouteId?: string | null;
  }
};

export const BusRouteRenderer = ({ map, route}: Props) => {
  const previousRouteIdRef = useRef<string | null>(null);
  const routeId = route.routeId ?? route.selectedRouteId;

  useEffect(() => {
    if (!map || !routeId || routeId === 'null') return;
    if (previousRouteIdRef.current === routeId) return;

    const fetchRoute = async () => {
      try {
        const res = await axios.get(`/api/bus-line/${routeId}`);
        console.log("노선도 데이터", res.data);
        const coordinates = res.data.map((stop: any) => [stop.gpslong, stop.gpslati]);

        const currSourceId = `bus-route-${routeId}`;
        const currLayerId = `bus-route-${routeId}`;

        map.getStyle().layers?.forEach((layer) => {
          if (layer.id.startsWith("bus-route-") && map.getLayer(layer.id)) {
            map.removeLayer(layer.id);
          }
        });
        Object.keys(map.getStyle().sources).forEach((sourceId) => {
          if (sourceId.startsWith("bus-route-") && map.getSource(sourceId)) {
            map.removeSource(sourceId);
          }
        });

        previousRouteIdRef.current = routeId;

        map.addSource(currSourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates,
            },
            properties: {},
          },
        });

        map.addSource(`${currSourceId}-points`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: coordinates.map(([lng, lat]: [number, number]) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
              properties: {},
            })),
          },
        });

        // 메인 layer
        map.addLayer({
          id: currLayerId,
          type: "line",
          source: currSourceId,
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "rgba(255, 80, 80, 0.85)", 
            "line-width": 5,
            "line-opacity": 1,
          },
        });

        map.addLayer({
          id: `${currLayerId}-points`,
          type: "circle",
          source: `${currSourceId}-points`,
          paint: {
            "circle-radius": 4,
            "circle-color": "#ffffff",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ff5050",
          },
        });

        const bounds = coordinates.reduce(
          (b: maplibregl.LngLatBounds, coord: [number, number]) => b.extend(coord),
          new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
        );
        map.fitBounds(bounds, { padding: 50 });
      } catch (e) {
        console.error("노선도 그리기 실패", e);
      }
    };

    fetchRoute();
  }, [map, routeId]);

  return null;
};