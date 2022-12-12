import { Car, Vacancy } from '@domain/entities';
import { Schedule } from '@domain/entities/schedule';
import { CarRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { faker } from '@faker-js/faker';
import { PrismaDatabase } from '@infra/database';
import {
  CarRepositoryPrisma,
  ScheduleRepositoryPrisma,
  VacancyRepositoryPrisma,
} from '@infra/repositories';

describe('Schedule', () => {
  let sut: ScheduleRepository;
  let carRepository: CarRepository;
  let vacancyRepository: VacancyRepository;
  let database: PrismaDatabase;
  beforeAll(() => {
    database = PrismaDatabase.getInstance();
    sut = new ScheduleRepositoryPrisma(database);
    carRepository = new CarRepositoryPrisma(database);
    vacancyRepository = new VacancyRepositoryPrisma(database);
  });

  it('should throw to find a empty repository.', async () => {
    const list = await sut.findMany();
    expect(list).not.toHaveLength;
  });
  it('should delete a user.', async () => {
    const schedule = newSchedule();
    await sut.save(schedule);
    await expect(
      sut.delete({ id: schedule.getState().id }),
    ).resolves.not.toThrow();
  });

  it('create a new schedule.', async () => {
    const schedule = await newSchedule();
    await expect(sut.save(schedule)).resolves.not.toThrow();
    await database.getConnection().schedule.delete({
      where: {
        id: schedule.getState().id,
      },
    });
  });

  it('shoud find a schedule', async () => {
    const car1 = newCar();
    await carRepository.save(car1);
    const vacancy1 = newVacancy();
    await vacancyRepository.save(vacancy1);
    const schedule1 = newSchedule();
    schedule1.addCar(car1);
    schedule1.addVacancy(vacancy1);
    await sut.save(schedule1);
    await expect(
      sut.findSchedule({ id: schedule1.getState().id }),
    ).resolves.not.toThrow();
  });
  it('shoud throw wher try to find a schedule', async () => {
    await expect(
      sut.findSchedule({ id: faker.datatype.uuid() }),
    ).rejects.toThrow();
  });
  it('find a schedule list.', async () => {
    const car1 = newCar();
    await carRepository.save(car1);
    const vacancy1 = newVacancy();
    await vacancyRepository.save(vacancy1);
    const schedule1 = newSchedule();
    schedule1.addCar(car1);
    schedule1.addVacancy(vacancy1);
    await sut.save(schedule1);
    const car2 = newCar();
    await carRepository.save(car2);
    const vacancy2 = newVacancy();
    await vacancyRepository.save(vacancy2);
    const schedule2 = newSchedule();
    schedule2.addCar(car2);
    schedule2.addVacancy(vacancy2);
    await sut.save(schedule2);
    const vacancy = await sut.findMany();
    expect(vacancy).toHaveLength;
    await database.getConnection().schedule.delete({
      where: {
        id: schedule1.getState().id,
      },
    });
    await database.getConnection().schedule.delete({
      where: {
        id: schedule2.getState().id,
      },
    });
    await database.getConnection().vacancy.delete({
      where: {
        id: vacancy1.getState().id,
      },
    });
    await database.getConnection().vacancy.delete({
      where: {
        id: vacancy2.getState().id,
      },
    });
  });
});

/*export function generateSchedules() {
  return Array.from({ length: 4 }).map(() => newSchedule());
}*/
export function newSchedule(input?: { checkOut?: Date }): Schedule {
  const vacancy = newVacancy();
  const car = newCar();
  const schedule = new Schedule({
    checkIn: faker.datatype.datetime(),
    checkOut: input?.checkOut ?? faker.datatype.datetime(),
  });
  schedule.addCar(car);
  schedule.addVacancy(vacancy);
  return schedule;
}
export function newVacancy() {
  return new Vacancy({
    id: faker.datatype.uuid(),
    localization: faker.datatype.string(),
  });
}
export function newCar() {
  return new Car({
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    brand: faker.datatype.string(),
    plate: faker.datatype.string(),
  });
}
