import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { nodeId, cityCode } = req.body;

  if (!nodeId || !cityCode) {
    return res.status(400).json({ error: 'Missing nodeId or cityCode' });
  }

  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnThrghRouteList',
      {
        params: {
          serviceKey: process.env.BUSSTOP_SERVICE_KEY,
          nodeId: nodeId,
          cityCode: cityCode,
          _type: 'json',
        },
      }
    );

    const items = response.data?.response?.body?.items?.item || [];
    const routes = items.map((item: any) => ({
      routeId: item.routeid,
      routeNo: item.routeno,
      routeTp: item.routetp,
    }));

    return res.json(routes);
  } catch (error) {
    const err = error as any;
    console.error('노선 정보 요청 실패:', err?.response?.data || err?.message);
    return res.status(500).json({ error: 'API 요청 실패', detail: err?.response?.data || err?.message });
  }
});

export default router;
