import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = Router();


router.get('/', async (req, res) => {
  try {
    const url = `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey=${process.env.BUSSTOP_SERVICE_KEY}`
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
    console.log(response.data);
    console.log('📦 원본 items:', JSON.stringify(items, null, 2));


    const formatted = await Promise.all(
      items.map(async (item: any) => {
        let routeName = null;
        try {
          const routeListRes = await axios.get(
            `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${process.env.BUSSTOP_SERVICE_KEY}`,
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
          console.warn(`❗nodeId ${item.nodeid} 경유 노선 정보 불러오기 실패`);
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
  // console.log('📦 원본 items:', JSON.stringify(items, null, 2));
  // console.log('🧾 반환 데이터:', JSON.stringify(formatted, null, 2));
  //   console.log('📦 최종 반환 데이터 예시:', JSON.stringify(formatted, null, 2));
  //   console.log('정류장 데이터 불러오기 성공', formatted.length, '개');
    return res.json(formatted); // 여기 명시적으로 return
  } catch (error) {
    console.error('정류장 데이터 에러:', error);
    return res.status(500).json({ error: '정류장 데이터 못불러옴' }); // 여기도 return
  }
});

export default router;