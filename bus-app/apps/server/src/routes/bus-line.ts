import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/:routeid", async (req, res) => {
  const { routeid } = req.params;
  const serviceKey = process.env.BUSSTOP_SERVICE_KEY;
  const cityCode = 25;

  try {
    const response = await axios.get(
      `http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteAcctoThrghSttnList?serviceKey=${serviceKey}`,
      {
        params: {
          cityCode,
          routeId: routeid,
          numOfRows: 9999,
          pageNo: 1,
          _type: "json",
        },
      }
    );

    const items = response.data.response.body.items?.item;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(404).json({ message: "노선 정류장 정보 없음" });
    }

    const stops = items.map((item: any) => ({
      nodeid: item.nodeid,
      nodenm: item.nodenm,
      gpslati: parseFloat(item.gpslati),
      gpslong: parseFloat(item.gpslong),
      nodeord: Number(item.nodeord),
    }));

    // 정렬은 서버에서 해주는게 안전함
    stops.sort((a, b) => a.nodeord - b.nodeord);

    res.json(stops);
  } catch (error) {
    console.error("노선 정류장 API 호출 실패:", error);
    res.status(500).json({ message: "노선 정보를 불러오는 중 오류 발생" });
  }
  return;
});

export default router;
