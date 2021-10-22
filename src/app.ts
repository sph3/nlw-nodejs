import http from 'http';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './routes';

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado no socket ${socket}`);
});

app.use(express.json());
app.use(router);

const port = 3000;

app.get('/', (req, res) => {
  res.send('Working!');
});

app.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;
  return res.json(code);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
