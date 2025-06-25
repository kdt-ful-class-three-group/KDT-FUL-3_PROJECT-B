import { Router } from "express";
import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const url = 'http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList';
    const lat = req.query.lat as string;
    const lng = req.query.lng as string;

    if (!lat || !lng) {
      return res.status(400).json({ error: '위도와 경도(lat/lng)가 필요합니다.' });
    }

    console.log("위도/경도 요청값:", lat, lng);

    const response = await axios.get(url, {
      params: {
        serviceKey: process.env.BUSSTOP_SERVICE_KEY,
        cityCode: 25,
        gpsLati: lat,
        gpsLong: lng,
        _type: 'json',
        numOfRows: 50,
      },
    });

    const items = response.data?.response?.body?.items?.item || [];

    const formatted = items.map((item: any) => ({
      id: item.nodeid,
      name: item.nodenm,
      lat: parseFloat(item.gpslati),
      lng: parseFloat(item.gpslong),
      citycode: item.citycode,
      routeId: item.routeid ?? null,
    }));

    console.log('정류장 데이터 불러오기 성공', formatted.length, '개');
    return res.json(formatted); // 여기 명시적으로 return
  } catch (error) {
    console.error('정류장 데이터 에러:', error);
    return res.status(500).json({ error: '정류장 데이터 못불러옴' }); // 여기도 return
  }
});

export default router;