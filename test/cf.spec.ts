import dotenv from 'dotenv';
import request from 'supertest';

import { app } from '../scripts/app';

beforeAll(() => {
  dotenv.config();
});

describe('Hello World', () => {
  const endpoint = `http/simple/helloWorldHttp`;

  describe(`GET /${endpoint}`, () => {
    it('return status 200: when message is provided as query param', () => {
      return request(app).get(`/${endpoint}?message=Hello`).expect(200);
    });

    it('return status 400: when message is not provided', () => {
      console.log(endpoint);
      return request(app).get(`/${endpoint}`).expect(400);
    });
  });

  describe(`POST /${endpoint}`, () => {
    it('return status 200: when message is provided as body data', () => {
      return request(app)
        .post(`/${endpoint}`)
        .send({ message: 'hello' })
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
});
