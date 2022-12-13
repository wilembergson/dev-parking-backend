import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';
import { CarRepository } from '@domain/repositories';
import { Car } from '@domain/entities';
import { CarRepositoryPrisma } from '@infra/repositories';
import { Database, PrismaDatabase } from '@infra/database';

describe('/car', () => {
  let app: INestApplication;
  let carRepository: CarRepository;
  let database: Database;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication(new FastifyAdapter());
    app.enableCors();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    database = new PrismaDatabase();
    carRepository = new CarRepositoryPrisma(database);
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
      const plate = faker.datatype.uuid();
      const car = new Car({
        name: faker.name.firstName(),
        brand: faker.name.lastName(),
        plate,
      });
      await carRepository.save(car);
      const response = await request(app.getHttpServer()).get(`/car/${plate}`);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@DELETE /:plate', () => {
    it('200', async () => {
      const car = new Car({
        name: faker.name.firstName(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      });
      carRepository.save(car);
      const response = await request(app.getHttpServer()).delete(
        `/car/${car.getState().id}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });
});
