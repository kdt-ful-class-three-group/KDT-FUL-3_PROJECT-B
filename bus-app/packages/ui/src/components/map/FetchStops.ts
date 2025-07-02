import axios from 'axios';
import { Stop } from './Map.types';

export const FetchStops = async (lat: number, lng: number): Promise<Stop[]> => {
  const res = await axios.get('/api/stop', { params: { lat, lng } });
  return Array.isArray(res.data) ? res.data : [];
};