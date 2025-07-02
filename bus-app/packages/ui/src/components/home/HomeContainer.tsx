import { useState } from "react";
import { SearchContainer } from "../search/SearchContainer";
import { Map } from "../map/Map";
import maplibregl from "maplibre-gl";

export const HomeContainer = () => {
  const [stopName, setStopName] = useState<string | null>(null);
  const [busNumber, setBusNumber] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;

  return (
    <div className="h-full w-full">
      <SearchContainer
        onSelectStopName={(name) => setStopName(name)}
        onSelectBusNumber={(routeId) => {
          setBusNumber(routeId)
          console.log("Selected bus number:", routeId);
        }}
      />
      <Map
        maptilerKey={maptilerKey}
        stopName={stopName}
        busNumber={busNumber}
        mapInstance={mapInstance}
        setMapInstance={setMapInstance}
      />
    </div>
  );
};