import { useState } from "react";
import { SearchContainer } from "../search/SearchContainer";
import { Map } from "../map/Map";
import maplibregl from "maplibre-gl";

export const HomeContainer = () => {
  const [stopName, setStopName] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  return (
    <div className="h-full w-full">
      <SearchContainer onSelectStopName={(name) => setStopName(name)} />
      <Map
        maptilerKey={import.meta.env.VITE_MAPTILER_KEY}
        stopName={stopName}
        mapInstance={mapInstance}
        setMapInstance={setMapInstance}
      />
    </div>
  );
};