import { FindSchedule } from '@application/use-cases/find-schedule';
import { Customer, Schedule, Vacancy } from '@domain/entities';
import {
  CarRepository,
  ScheduleRepository,
  VacancyRepository,
} from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import {
  CustomerRepositoryPrisma,
  ScheduleRepositoryPrisma,
  VacancyRepositoryPrisma,
} from '@infra/repositories';

describe('FindVacancy', () => {
  let sut: FindSchedule;
  let carRepository: CarRepository;
  let vacancyRepository: VacancyRepository;
  let scheduleRepository: ScheduleRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    carRepository = new CustomerRepositoryPrisma(database);
    vacancyRepository = new VacancyRepositoryPrisma(database);
    scheduleRepository = new ScheduleRepositoryPrisma(database);
    sut = new FindSchedule(scheduleRepository);
  });

  it('should find a schedule.', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await vacancyRepository.save(vacancy);
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    await carRepository.save(car);
    const schedule = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });
    schedule.addCustomer(car);
    schedule.addVacancy(vacancy);
    await scheduleRepository.save(schedule);
    await expect(
      sut.execute({ id: schedule.getState().id }),
    ).resolves.not.toBeNull();
  });

  it('should throw error if a schedule dont exists.', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await vacancyRepository.save(vacancy);
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    await carRepository.save(car);
    const schedule = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });
    schedule.addCustomer(car);
    schedule.addVacancy(vacancy);
    await expect(sut.execute({ id: schedule.getState().id })).rejects.toThrow();
  });
});
