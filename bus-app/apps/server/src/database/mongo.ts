import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME || 'busapp';

let isConnected = false;

export async function connectToDB() {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log("MongoDB에 연결 성공");
    }
    return client.db(dbName);
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    throw error;
  }
}