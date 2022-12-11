import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';
import { MockProxy } from 'jest-mock-extended';
import { CarRepository, VacancyRepository } from '@domain/repositories';
import { Car, Vacancy } from '@domain/entities';
import { CreateCar } from '@application/use-cases';

describe('/schedule', () => {
  let app: INestApplication;
  let vacancyRepository: MockProxy<VacancyRepository>;
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
      const car = new Car({
        name: faker.datatype.string(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      });
      const vacancy = new Vacancy({
        localization: faker.datatype.string(),
      });
      vacancyRepository.findOne.mockResolvedValueOnce(vacancy);
      carRepository.findOne.mockResolvedValueOnce(car);
      const response = await request(app.getHttpServer())
        .post(`/schedule`)
        .send({
          id: faker.datatype.uuid(),
          checkIn: faker.datatype.datetime(),
          checkOut: faker.datatype.datetime(),
          carId: car.getState().id,
          vacancyId: vacancy.getState().id,
        });
      expect(response.statusCode).toEqual(201);
    });
  });
});
