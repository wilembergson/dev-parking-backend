import { CreateSchedule } from '@application/use-cases';
import { Car, Vacancy } from '@domain/entities';
import { Schedule } from '@domain/entities/schedule';
import { CarRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateSchedule', () => {
  let sut: CreateSchedule;
  let scheduleRepository: MockProxy<ScheduleRepository>;
  let vacancyRepository: MockProxy<VacancyRepository>;
  let carRepository: MockProxy<CarRepository>;

  beforeAll(() => {
    scheduleRepository = mock();
    vacancyRepository = mock();
    carRepository = mock();
    sut = new CreateSchedule(
      scheduleRepository,
      vacancyRepository,
      carRepository,
    );
  });
  it('should register a new schedule.', async () => {
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
    const schedule = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });
    schedule.addCar(car);
    schedule.addVacancy(vacancy);
    await expect(
      sut.execute({
        checkIn: schedule.getState().checkIn,
        checkOut: schedule.getState().checkOut,
        carId: schedule.getState().car.getState().id,
        vacancyId: schedule.getState().vacancy.getState().id,
      }),
    ).resolves.not.toThrow();
  });

  it('should throw when dont find a registered vacancy', async () => {
    const vacancy = new Vacancy({
      localization: faker.datatype.string(),
    });
    const car = new Car({
      name: faker.datatype.string(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    const schedule = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });

    schedule.addVacancy(vacancy);
    schedule.addCar(car);
    await expect(
      sut.execute({
        checkIn: schedule.getState().checkIn,
        checkOut: schedule.getState().checkOut,
        carId: schedule.getState().car.getState().id,
        vacancyId: schedule.getState().vacancy.getState().id,
      }),
    ).rejects.toThrow();
  });

  it('should throw when dont find a registered car', async () => {
    const vacancy = new Vacancy({
      localization: faker.datatype.string(),
    });
    vacancyRepository.findOne.mockResolvedValueOnce(vacancy);
    const car = new Car({
      name: faker.datatype.string(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    const schedule = new Schedule({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });

    schedule.addVacancy(vacancy);
    schedule.addCar(car);
    await expect(
      sut.execute({
        checkIn: schedule.getState().checkIn,
        checkOut: schedule.getState().checkOut,
        carId: schedule.getState().car.getState().id,
        vacancyId: schedule.getState().vacancy.getState().id,
      }),
    ).rejects.toThrow();
  });
});
