import axios from 'axios';
import { Stop } from './types';

export const FetchStops = async (lat: number, lng: number): Promise<Stop[]> => {
  const res = await axios.get('http://localhost:3333/api/stop', { params: { lat, lng } });
  return Array.isArray(res.data) ? res.data : [];
};