import axios from "axios";
import { ArrivalInfo } from './Map.types'


export const FetchArrivalInfo = async (stopId: string, routeId: string, cityCode: number | string): Promise<ArrivalInfo[]> => {
  const res = await axios.get('/api/arrival', {
    params: { stopId, routeId, cityCode: String(cityCode) },
  });
  return Array.isArray(res.data) ? res.data : [];
};