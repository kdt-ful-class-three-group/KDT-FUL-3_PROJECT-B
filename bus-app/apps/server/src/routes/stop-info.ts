import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { nodeId, cityCode } = req.query;

  if (!nodeId || !cityCode) {
    return res.status(400).json({ error: 'Missing nodeId or cityCode' });
  }

  try {
    const { data } = await axios.get(
      `https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${process.env.BUSSTOP_SERVICE_KEY}`,
      {
        params: {
          _type: 'json',
          nodeid: nodeId,
          cityCode,
          numOfRows: 100,
          pageNo: 1,
        },
      }
    );

    // console.log('요청한 nodeId:', nodeId);
    // console.log('요청한 cityCode:', cityCode);
    // console.log('🧾 응답 전체 데이터:', JSON.stringify(data, null, 2));

    const items = data?.response?.body?.items?.item;

    if (!items) return res.json([]);

    const itemsArray = Array.isArray(items) ? items : [items];

    const routes = itemsArray.map((item: any) => ({
      routeId: item.routeid,
      routeNo: item.routeno,
      routeTp: item.routetp,
      start: item.startnodenm,
      end: item.endnodenm,
    }));

    return res.json(routes);
  } catch (error) {
    console.error('노선 정보 요청 실패:', error);
    return res.status(500).json({ error: 'Failed to fetch route info' });
  }
});

export default router;
