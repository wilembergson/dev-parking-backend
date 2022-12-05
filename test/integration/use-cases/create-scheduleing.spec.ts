import { CreateScheduleing } from '@application/use-cases';
import { Car, Scheduleing, Vacancy } from '@domain/entities';
import {
  CarRepository,
  ScheduleingRepository,
  VacancyRepository,
} from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateScheduleing', () => {
  let sut: CreateScheduleing;
  let scheduleingRepository: MockProxy<ScheduleingRepository>;
  let vacancyRepository: MockProxy<VacancyRepository>;
  let carRepository: MockProxy<CarRepository>;

  beforeAll(() => {
    scheduleingRepository = mock();
    vacancyRepository = mock();
    carRepository = mock();
    sut = new CreateScheduleing(
      scheduleingRepository,
      vacancyRepository,
      carRepository,
    );
  });
  it('should register a new scheduleing.', async () => {
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
    const scheduleing = new Scheduleing({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });
    scheduleing.addCar(car);
    scheduleing.addVacancy(vacancy);
    await expect(
      sut.execute({
        checkIn: scheduleing.getState().checkIn,
        checkOut: scheduleing.getState().checkOut,
        carId: scheduleing.getState().car.getState().id,
        vacancyId: scheduleing.getState().vacancy.getState().id,
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
    const scheduleing = new Scheduleing({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });

    scheduleing.addVacancy(vacancy);
    scheduleing.addCar(car);
    await expect(
      sut.execute({
        checkIn: scheduleing.getState().checkIn,
        checkOut: scheduleing.getState().checkOut,
        carId: scheduleing.getState().car.getState().id,
        vacancyId: scheduleing.getState().vacancy.getState().id,
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
    const scheduleing = new Scheduleing({
      checkIn: faker.datatype.datetime(),
      checkOut: faker.datatype.datetime(),
    });

    scheduleing.addVacancy(vacancy);
    scheduleing.addCar(car);
    await expect(
      sut.execute({
        checkIn: scheduleing.getState().checkIn,
        checkOut: scheduleing.getState().checkOut,
        carId: scheduleing.getState().car.getState().id,
        vacancyId: scheduleing.getState().vacancy.getState().id,
      }),
    ).rejects.toThrow();
  });
});
