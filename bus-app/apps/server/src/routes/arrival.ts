// bus-app/apps/server/src/routes/arrival.ts

import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const { stopId, routeId, cityCode } = req.query;
  if (!stopId || !routeId || !cityCode) {
    return res.status(400).json({ error: '정류소, 노선 못찾음' });
  }

  try {
    const serviceKey = process.env.BUSSTOP_SERVICE_KEY;
    const numOfRows = 10;
    const pageNo = 1;
    const url = `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${serviceKey}&cityCode=${cityCode}&nodeId=${stopId}&numOfRows=${numOfRows}&pageNo=${pageNo}&_type=json`;

    const response = await fetch(url);
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON 파싱 에러:", e, text);
      return res.status(500).json({ error: "API에서 JSON이 아닌 응답이 왔어요." });
    }

    const items = data?.response?.body?.items?.item;
    if (!items) return res.json([]);

    const itemsArray = Array.isArray(items) ? items : [items];

    const arrivals = itemsArray
      .filter((item: any) => String(item.routeid) === String(routeId))
      .map((item: any) => {
        let message1 = item.arrmsg1 ?? '';
        // 1분(60초) 이하이거나, 메시지에 '1분 후'가 포함되어 있으면 '곧도착'으로 표시
        if ((item.arrtime !== undefined && !isNaN(Number(item.arrtime)) && Number(item.arrtime) <= 60) ||
            (typeof message1 === 'string' && message1.includes('1분 후'))
        ) {
          message1 = '곧도착';
        }
        return {
          routeId: item.routeid,
          routeNo: item.routeno,
          routeTp: item.routetp,
          predictTime1: item.arrtime,
          message1,
          message2: item.arrmsg2 ?? '',
          stationOrder1: item.arrprevstationcnt,
          vehicletp: item.vehicletp,
        };
      });

    return res.json(arrivals);
  } catch (error) {
    console.error('도착 정보 요청 실패:', error);
    return res.status(500).json({ error: 'arrival info 실패' });
  }
});

export default router;
