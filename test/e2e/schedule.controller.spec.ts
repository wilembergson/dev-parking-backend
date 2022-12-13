import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';
import {
  CarRepository,
  ScheduleRepository,
  VacancyRepository,
} from '@domain/repositories';
import { Car, Schedule, Vacancy } from '@domain/entities';
import {
  CarRepositoryPrisma,
  ScheduleRepositoryPrisma,
  VacancyRepositoryPrisma,
} from '@infra/repositories';
import { Database, PrismaDatabase } from '@infra/database';

describe('/schedule', () => {
  let app: INestApplication;
  let vacancyRepository: VacancyRepository;
  let carRepository: CarRepository;
  let scheduleRepository: ScheduleRepository;
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
    vacancyRepository = new VacancyRepositoryPrisma(database);
    scheduleRepository = new ScheduleRepositoryPrisma(database);
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
      await carRepository.save(car);

      const vacancy = new Vacancy({
        localization: faker.datatype.string(),
      });
      await vacancyRepository.save(vacancy);
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

  describe('@GET', () => {
    it('200', async () => {
      const car = new Car({
        name: faker.datatype.string(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      });
      await carRepository.save(car);

      const vacancy = new Vacancy({
        localization: faker.datatype.string(),
      });
      await vacancyRepository.save(vacancy);

      const schedule = new Schedule({
        checkIn: faker.datatype.datetime(),
        checkOut: faker.datatype.datetime(),
      });
      schedule.addCar(car);
      schedule.addVacancy(vacancy);
      await scheduleRepository.save(schedule);
      const response = await request(app.getHttpServer()).get(
        `/schedule/${schedule.getState().id}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@DELETE', () => {
    it('200', async () => {
      const car = new Car({
        name: faker.datatype.string(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      });
      await carRepository.save(car);

      const vacancy = new Vacancy({
        localization: faker.datatype.string(),
      });
      await vacancyRepository.save(vacancy);
      const schedule = new Schedule({
        checkIn: faker.datatype.datetime(),
        checkOut: faker.datatype.datetime(),
      });
      schedule.addCar(car);
      schedule.addVacancy(vacancy);
      await scheduleRepository.save(schedule);
      const response = await request(app.getHttpServer()).delete(
        `/schedule/${schedule.getState().id}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@GET list', () => {
    it('200', async () => {
      const schedule = new Schedule({
        checkIn: faker.datatype.datetime(),
        checkOut: faker.datatype.datetime(),
      });
      const schedule2 = new Schedule({
        checkIn: faker.datatype.datetime(),
        checkOut: faker.datatype.datetime(),
      });
      scheduleRepository.save(schedule);
      scheduleRepository.save(schedule2);
      const response = await request(app.getHttpServer()).get(`/schedule`);
      expect(response.statusCode).toEqual(200);
    });
  });
});
