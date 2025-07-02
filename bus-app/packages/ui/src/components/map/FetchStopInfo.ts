import axios from 'axios';
import { BusRoute } from './Map.types';

export const FetchStopInfo = async (nodeId: string, cityCode: number): Promise<BusRoute[]> => {
  const res = await axios.get('/api/stop-info', {
    params: { nodeId, cityCode },
  });
  return res.data;
};