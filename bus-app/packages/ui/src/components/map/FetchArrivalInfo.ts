// bus-app/package/ui/componets/map/FetchArrivalInfo.ts

import axios from "axios";
import { ArrivalInfo } from './types'


export const FetchArrivalInfo = async (stopId: string, routeId: string, cityCode: number): Promise<ArrivalInfo[]> => {
  const res = await axios.get('http://localhost:3333/api/arrival', {
    params: { stopId, routeId, cityCode },
  });
  return Array.isArray(res.data) ? res.data : [];
};