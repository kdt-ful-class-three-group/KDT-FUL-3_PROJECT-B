// import express from 'express';
// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();

// const client = new MongoClient(process.env.MONGODB_URI || '');
// const dbName = 'bus-app';

// router.get('/', async (req, res) => {
//   const query = req.query.q as string;

//   if (!query) {
//     return res.status(400).json({ error: '검색어가 필요합니다.' });
//   }

//   try {
//     const isNumber = /^\d+$/.test(query);
//     await client.connect();
//     const db = client.db(dbName);

//     let results: { id: string; name: string; type: 'bus' | 'stop' }[] = [];

//     if (isNumber) {
//       const buses = await db
//         .collection('bus_routes')
//         .find({ name: { $regex: query, $options: 'i' } })
//         .toArray();

//       results = buses.map((bus: any) => ({
//         id: bus.id,
//         name: bus.name,
//         type: 'bus',
//       }));
//     } else {
//       const stops = await db
//         .collection('bus_stops')
//         .find({ name: { $regex: query, $options: 'i' } })
//         .toArray();

//       results = stops.map((stop: any) => ({
//         id: stop.id,
//         name: stop.name,
//         type: 'stop',
//       }));
//     }

//     return res.json(results);
//   } catch (error) {
//     console.error('검색 요청 실패:', error);
//     return res.status(500).json({ error: '검색 요청 중 오류가 발생했습니다.' });
//   } finally {
//     await client.close();
//   }
// });

// export default router;