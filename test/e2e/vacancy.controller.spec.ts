import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';

describe('/vacancy', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication(new FastifyAdapter());
    app.enableCors();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('@POST /', () => {
    it('201', async () => {
      const response = await request(app.getHttpServer())
        .post(`/vacancy`)
        .send({
          id: faker.datatype.uuid(),
          localization: faker.datatype.uuid(),
        });
      expect(response.statusCode).toEqual(201);
    });
  });
});
