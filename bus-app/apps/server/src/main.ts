import cors from 'cors';
import express from 'express';
import axios from 'axios';
import * as path from 'path';
import * as dotenv from 'dotenv';

import stopRouter from './routes/stop';
import stopInfoRouter from './routes/stop-info';
import arrivalRouter from './routes/arrival';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 새 API 라우트
app.get('/api/bus-arrival/:stopId', async (req, res) => {
  const { stopId } = req.params;
  try {
    const response = await axios.get(`TAGO_API_URL`, {
      params: { stopId, /* 필요한 추가 파라미터 */ },
      headers: { Authorization: `Bearer ${process.env.TAGO_API_KEY}` }
    });
    const { arrivalInfos, info } = response.data;
    res.json({ arrivalInfos, info });
  } catch (error) {
    res.status(500).json({ error: 'TAGO API 요청 실패' });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.use('/api/stop', stopRouter);
app.use('/api/stop-info', stopInfoRouter);
app.use('/api/arrival', arrivalRouter)

const port = process.env.PORT
const server = app.listen(port, () => {
  console.log(`서버도는중... http://localhost:${port}/api`);
});
server.on('error', console.error);
