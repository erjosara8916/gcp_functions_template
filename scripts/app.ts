import cors from 'cors';
import express, { Application } from 'express';

import { gcpFunctions, httpModule, pubsubModule } from './config';

const app: Application = express();

app.use(cors());
app.use(express.json());

console.log(gcpFunctions.http);
console.log(gcpFunctions.pubsub);

app.use('/http/:functionGroup/:functionName', httpModule);
app.use('/pubsub/:functionGroup/:functionName', pubsubModule);

export { app };
