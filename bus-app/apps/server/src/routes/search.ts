import express from "express";
import { connectToDB } from "../database/mongo";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.q?.toString();

  console.log("입력 쿼리:", query);

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
    end: bus.endnodenm,
    start: bus.startnodenm,
    routetp: bus.routetp,
    type: "bus",
  }));

  const combinedResults = [...busResults, ...stopResults];
  res.json(combinedResults);
  return;
});

export default router;