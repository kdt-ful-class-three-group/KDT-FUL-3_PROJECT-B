import express from 'express';
import { connectToDB } from '../database/mongo';

const router = express.Router();

router.get('/', async (req, res) => {
  const name = req.query.name as string;

  if (!name) {
    return res.status(400).json({ error: '정류장 이름이 필요합니다.' });
  }

  try {
    const db = await connectToDB();
    const stops = await db.collection('bus_stops').find({
      nodenm: { $regex: name, $options: 'i' }
    }).toArray();

    const result = stops.map(stop => ({
      id: stop.nodeid,
      name: stop.nodenm,
      lat: stop.gpslati,
      lng: stop.gpslong,
    }));

    res.json(result);
  } catch (err) {
    console.error('DB 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
  console.log('정류장 이름으로 검색:', name);
  return;
});

export default router;