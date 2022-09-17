import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getTestingApp } from './mock/get-testing-app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getTestingApp();

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('');
  });

  afterEach(async () => {
    await app.close();
  });
});
