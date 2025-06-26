// bus-app/apps/server/src/routes/arrival.ts

import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { stopId, routeId, cityCode } = req.query;
  if (!stopId || !routeId || !cityCode) {
    return res.status(400).json({ error: '정류소, 노선 못찾음' });
  }

  try {
    // 국토교통부 TAGO 버스 도착정보 오픈API
    const { data } = await axios.get(
      `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoSpcifyRouteBusArvlPrearngeInfoList?serviceKey=${process.env.BUSSTOP_SERVICE_KEY}`,
      {
        params: {
          _type: 'json',
          nodeid: stopId,    // 정류장 ID
          routeid: routeId,  // 버스노선 ID
        },
      }
    );

    const items = data?.response?.body?.items?.item;
    if (!items) return res.json([]);

    // 단일 객체인 경우 배열로 변환
    const itemsArray = Array.isArray(items) ? items : [items];

    // 필요한 도착 정보만 가공해서 전달
    const arrivals = itemsArray.map((item: any) => ({
      routeId: item.routeid, // 노선ID
      routeNo: item.routeno, // 노선번호
      routeTp: item.routetp, // 노선유형
      arrPrevStationCnt: item.arrprevstationcnt, // 남은 정류장 수
      vehicletp: item.vehicletp, // 차량유형
      arrTime: item.arrtime, // 도착예정(초)
      message: item.arrmsg1 ?? '', // 안내 메시지(있으면)
    }));

    return res.json(arrivals);
  } catch (error) {
    console.error('도착 정보 요청 실패:', error);
    return res.status(500).json({ error: 'arrival info 실패' });
  }
});

export default router;
