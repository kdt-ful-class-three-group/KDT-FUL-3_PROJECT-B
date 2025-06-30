import axios from 'axios';
import { BusRoute } from './Map.types';

export const FetchStopInfo = async (nodeId: string, cityCode: number): Promise<BusRoute[]> => {
  const res = await axios.get('http://localhost:3333/api/stop-info', {
    params: { nodeId, cityCode },
  });
  return res.data;
};