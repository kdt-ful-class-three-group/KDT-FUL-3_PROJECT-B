import cors from 'cors';
import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

import stopRouter from './routes/stop';
import stopInfoRouter from './routes/stop-info';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.use('/api/stop', stopRouter);
app.use('/api/stop-info', stopInfoRouter);

const port = process.env.PORT
const server = app.listen(port, () => {
  console.log(`서버도는중... http://localhost:${port}/api`);
});
server.on('error', console.error);
