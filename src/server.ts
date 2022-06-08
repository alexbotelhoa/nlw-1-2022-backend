import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();
const api = '/api';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(api, routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!')
});
