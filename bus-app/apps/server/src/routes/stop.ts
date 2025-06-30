import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = Router();


router.get('/', async (req, res) => {

  const serviceKey = process.env.BUSSTOP_SERVICE_KEY;

  try {
    const url = `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey=${serviceKey}`;
    const lat = req.query.lat as string;
    const lng = req.query.lng as string;

    if (!lat || !lng) {
      return res.status(400).json({ error: '위도와 경도(lat/lng)가 필요합니다.' });
    }

    const response = await axios.get(url, {
      params: {
        numOfRows: 10,
        _type: 'json',
        cityCode: 25,
        gpsLati: lat,
        gpsLong: lng,
      },
    });

    const items = response.data?.response?.body?.items?.item || [];

    const formatted = await Promise.all(
      items.map(async (item: any) => {
        let routeName = null;
        try {
          const routeListRes = await axios.get(
            `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${serviceKey}`,
            {
              params: {
                cityCode: item.citycode,
                nodeId: item.nodeid,
                _type: 'json',
              },
            }
          );
          const routes = routeListRes.data?.response?.body?.items?.item;
          if (Array.isArray(routes)) {
            routeName = routes[0]?.routenm ?? null;
          } else if (typeof routes === 'object') {
            routeName = routes?.routenm ?? null;
          }
        } catch (e) {
          console.warn(`nodeId ${item.nodeid} 경유 노선 정보 불러오기 실패`);
        }

        return {
          id: item.nodeid,
          name: item.nodenm,
          lat: parseFloat(item.gpslati),
          lng: parseFloat(item.gpslong),
          citycode: item.citycode,
          routeName: routeName,
        };
      })
    );
    return res.json(formatted);
  } catch (error) {
    console.error('정류장 데이터 에러:', error);
    return res.status(500).json({ error: '정류장 데이터 못불러옴' });
  }
});

export default router;