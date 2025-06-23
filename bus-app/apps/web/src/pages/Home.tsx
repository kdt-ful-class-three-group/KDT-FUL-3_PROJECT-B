import { HomeInput } from "@bus-app/ui/components/home/HomeContainer";
import Map from "@bus-app/ui/components/map/Map";

const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;

export default function Home() {
  return (
    <div className="relative w-full h-screen">
        <Map maptilerKey={maptilerKey} />
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 w-11/12 max-w-md">
        <HomeInput />
      </div>
    </div>
  );
}