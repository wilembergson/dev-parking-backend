import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/ioc/app.module';
import { EmployeeUser } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';

describe('/user', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
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
    userRepository = new EmployeeUserRepositoryPrisma(database);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('@POST /', () => {
    it('201', async () => {
      const response = await request(app.getHttpServer()).post(`/user`).send({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number(),
      });
      expect(response.statusCode).toEqual(201);
    });
  });
  describe('@GET', () => {
    it('200', async () => {
      const user = new EmployeeUser({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number(),
      });
      await userRepository.save(user);
      const response = await request(app.getHttpServer()).get(
        `/user/${user.getState().id}`,
      );
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@DELETE ', () => {
    it('200', async () => {
      const user = new EmployeeUser({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number(),
      });
      await userRepository.save(user);
      const response = await request(app.getHttpServer()).delete(
        `/user/${user.getState().id}`,
      );
      console.log(response.status);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('@PUT ', () => {
    it('200', async () => {
      const user = new EmployeeUser({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number(),
      });
      await userRepository.save(user);
      const response = await request(app.getHttpServer())
        .put(`/user/${user.getState().id}`)
        .send({
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          age: 22,
        });
      expect(response.statusCode).toEqual(200);
    });
  });
});
