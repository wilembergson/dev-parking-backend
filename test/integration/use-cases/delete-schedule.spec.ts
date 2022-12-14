import { DeleteSchedule } from '@application/use-cases/delete-schedule';
import { Car, Schedule, Vacancy } from '@domain/entities';
import {
  CarRepository,
  ScheduleRepository,
  VacancyRepository,
} from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import {
  CarRepositoryPrisma,
  ScheduleRepositoryPrisma,
  VacancyRepositoryPrisma,
} from '@infra/repositories';

describe('DeleteSechedule', () => {
  let sut: DeleteSchedule;
  let carRepository: CarRepository;
  let vacancyRepository: VacancyRepository;
  let scheduleRepository: ScheduleRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    carRepository = new CarRepositoryPrisma(database);
    vacancyRepository = new VacancyRepositoryPrisma(database);
    scheduleRepository = new ScheduleRepositoryPrisma(database);
    sut = new DeleteSchedule(scheduleRepository);
  });

  describe('DeleteSchedule', () => {
    it('should delete a schedule.', async () => {
      const vacancy = new Vacancy({
        localization: faker.address.latitude(),
      });
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
      schedule.addCar(car);
      schedule.addVacancy(vacancy);
      await scheduleRepository.save(schedule);
      await expect(
        sut.execute({ id: schedule.getState().id }),
      ).resolves.not.toThrow();
    });

    it('should throw when try to delete a schedule.', async () => {
      const vacancy = new Vacancy({
        localization: faker.address.latitude(),
      });
      await vacancyRepository.save(vacancy);
      const car = new Car({
        name: faker.name.firstName(),
        brand: faker.datatype.string(),
        plate: faker.datatype.string(),
      });
      await carRepository.save(car);
      const id = faker.datatype.uuid();
      const schedule = new Schedule({
        id,
        checkIn: faker.datatype.datetime(),
        checkOut: faker.datatype.datetime(),
      });
      schedule.addCar(car);
      schedule.addVacancy(vacancy);
      await expect(
        sut.execute({ id: schedule.getState().id }),
      ).rejects.toThrow();
    });
  });
});
