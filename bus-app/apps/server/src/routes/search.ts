import express from "express";
import { connectToDB } from "../database/mongo";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.q?.toString();

  console.log("🔎 사용자가 입력한 query:", query);

  if (!query) return res.status(400).json({ error: "query required" });

  const db = await connectToDB();

  const [stops, buses] = await Promise.all([
    db.collection("bus_stops").find({
      nodenm: { $regex: query, $options: "i" }
    }).toArray(),

    db.collection("bus_numbers").find({
      routeno: { $regex: query, $options: "i" }
    }).toArray()
  ]);

  console.log("🚌 검색된 버스:", buses);
  const uniqueStopsMap = new Map();
  stops.forEach((stop) => {
    if (!uniqueStopsMap.has(stop.nodenm)) {
      uniqueStopsMap.set(stop.nodenm, {
        name: stop.nodenm,
        nodeid: stop.nodeid,
        type: "stop",
      });
    }
  });
  const stopResults = Array.from(uniqueStopsMap.values());

  const busResults = buses.map((bus) => ({
    name: bus.routeno,
    nodeid: bus.routeid,
    type: "bus",
  }));

  const combinedResults = [...busResults, ...stopResults];
  res.json(combinedResults);
  return;
});

export default router;