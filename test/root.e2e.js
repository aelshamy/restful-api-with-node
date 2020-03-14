import express from 'express';
import { describe, it } from 'mocha';
import request from 'supertest';
import { rootRouter } from '../routes';
const server = express();

server.use('/v1', rootRouter);

describe('GET /v1', () => {
  it('responds with json', done => {
    request(server)
      .get('/v1')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body.headers = {};
      })
      .expect(
        200,
        {
          baseUrl: '/v1',
          headers: {},
          method: 'GET',
          path: '/',
          host: '127.0.0.1',
          ip: '::ffff:127.0.0.1',
          message: 'Handling GET request'
        },
        done
      );
  });
});

describe('POST /v1', () => {
  it('responds with json', done => {
    request(server)
      .post('/v1')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body.headers = {};
      })
      .expect(
        200,
        {
          baseUrl: '/v1',
          headers: {},
          method: 'POST',
          path: '/',
          host: '127.0.0.1',
          ip: '::ffff:127.0.0.1',
          message: 'Handling POST request'
        },
        done
      );
  });
});

describe('PUT /v1', () => {
  it('responds with json', done => {
    request(server)
      .put('/v1')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body.headers = {};
      })
      .expect(
        200,
        {
          baseUrl: '/v1',
          headers: {},
          method: 'PUT',
          path: '/',
          host: '127.0.0.1',
          ip: '::ffff:127.0.0.1',
          message: 'Handling PUT request'
        },
        done
      );
  });
});

describe('DELETE /v1', () => {
  it('responds with json', done => {
    request(server)
      .delete('/v1')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body.headers = {};
      })
      .expect(
        501,
        {
          baseUrl: '/v1',
          headers: {},
          method: 'DELETE',
          path: '/',
          host: '127.0.0.1',
          ip: '::ffff:127.0.0.1',
          message: 'Handling DELETE request'
        },
        done
      );
  });
});
