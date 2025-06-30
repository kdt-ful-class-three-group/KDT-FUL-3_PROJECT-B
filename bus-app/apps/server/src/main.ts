import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

// 여기는 api 직접 조회
import stopRouter from './routes/stop';
import stopInfoRouter from './routes/stop-info';

// 여기는 DB 조회
import searchRouter from './routes/search';
import busStopRouter from './routes/init/bus-stops';
import busNumberRouter from './routes/init/bus-number';
import stopByNameRouter from './routes/stop-by-name';

dotenv.config();

const app = express();
app.use(express.json());

// CORS 설정
app.use(cors());

// API 라우터 설정
app.use('/api/stop', stopRouter);
app.use('/api/stop-info', stopInfoRouter);
app.use('/api/search', searchRouter);
app.use('/api/init/bus-stops', busStopRouter);
app.use('/api/init/bus-numbers', busNumberRouter);
app.use('/api/stop-by-name', stopByNameRouter);

const port = process.env.PORT
const server = app.listen(port, () => {
  console.log(`서버도는중... http://localhost:${port}`);
});
server.on('error', console.error);
