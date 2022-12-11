import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';
import { CarRepository } from '@domain/repositories';
import { MockProxy } from 'jest-mock-extended';
import { Car } from '@domain/entities';

describe('/car', () => {
  let app: INestApplication;
  let carRepository: MockProxy<CarRepository>;

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
      const response = await request(app.getHttpServer()).post(`/car`).send({
        id: faker.datatype.uuid(),
        name: faker.datatype.uuid(),
        brand: faker.datatype.uuid(),
        plate: faker.datatype.uuid(),
      });
      expect(response.statusCode).toEqual(201);
    });
  });

  describe('@GET /:plate', () => {
    it('200', async () => {
      const response = await request(app.getHttpServer()).get(
        `/car/${faker.datatype.string()}`,
      );
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('@DELETE /:plate', () => {
    it('200', async () => {
      const car = new Car({
        name: faker.name.firstName(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      });
      carRepository.findOne.mockResolvedValueOnce(car);
      const response = await request(app.getHttpServer()).delete(
        `/car/${car.getState().id}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });
});
