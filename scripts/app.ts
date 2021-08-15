import cors from 'cors';
import express, { Application } from 'express';

import { main } from '../src/index';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/', main);

export { app };
