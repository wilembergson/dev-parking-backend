import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';

describe('/vacancy', () => {
  let app: INestApplication;
  let vacancyRepository: VacancyRepository;
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
    vacancyRepository = new VacancyRepositoryPrisma(database);
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

  describe('@GET', () => {
    it('200', async () => {
      const vacancy = new Vacancy({
        localization: faker.datatype.uuid(),
      });
      await vacancyRepository.save(vacancy);
      console.log(vacancy.getState());
      const response = await request(app.getHttpServer()).get(
        `/vacancy/${vacancy.getState().localization}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@DELETE ', () => {
    it('200', async () => {
      const vacancy = new Vacancy({
        localization: faker.datatype.uuid(),
      });
      await vacancyRepository.save(vacancy);
      const response = await request(app.getHttpServer()).delete(
        `/vacancy/${vacancy.getState().localization}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@PUT ', () => {
    it('200', async () => {
      const vacancy = new Vacancy({
        localization: faker.datatype.uuid(),
      });
      await vacancyRepository.save(vacancy);
      const response = await request(app.getHttpServer())
        .put(`/vacancy/${vacancy.getState().id}`)
        .send({ localization: faker.datatype.uuid() });
      expect(response.statusCode).toEqual(200);
    });
  });
});
