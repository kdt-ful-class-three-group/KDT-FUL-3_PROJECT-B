import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { connectToDB } from '../../database/mongo';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  const serviceKey = process.env.BUSSTOP_SERVICE_KEY;

  try {
    const response = await axios.get(`http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${serviceKey}`, {
      params: {
        cityCode: 25,
        pageNo: 1,
        numOfRows: 9999,
        _type: 'json',
      },
    });

    const items = response.data.response.body.items?.item || [];

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(404).json({ message: '정류소 데이터 없음' });
    }

    const db = await connectToDB();
    const result = await db.collection('bus_stops').insertMany(items);

    res.json({
      insertedCount: result.insertedCount,
    });
    return;
  } catch (err) {
    const error = err as Error;
    console.error('정류소 저장 실패:', error.message);
    res.status(500).json({ message: error.message });
  }
  return;
});

export default router;