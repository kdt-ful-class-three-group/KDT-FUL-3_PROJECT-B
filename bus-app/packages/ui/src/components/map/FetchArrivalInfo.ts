// bus-app/package/ui/componets/map/FetchArrivalInfo.ts

import axios from "axios";
import { ArrivalInfo } from './types'


export const FetchArrivalInfo = async (stopId: string, routeId: string): Promise<ArrivalInfo[]> => {
  const res = await axios.get('http://localhost:3333/api/arrival', {
    params: { stopId, routeId },
  });
  return Array.isArray(res.data) ? res.data : [];
};