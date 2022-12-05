import { Car, Scheduleing, Vacancy } from '@domain/entities';
import {
  CarRepository,
  ScheduleingRepository,
  VacancyRepository,
} from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { PrismaDatabase } from '@infra/database';
import {
  PrismaCarRepository,
  PrismaScheduleingRepository,
  PrismaVacancyRepository,
} from '@infra/repositories';

describe('Scheduleing', () => {
  let sut: ScheduleingRepository;
  let carRepository: CarRepository;
  let vacancyRepository: VacancyRepository;
  let database: PrismaDatabase;
  beforeAll(() => {
    database = new PrismaDatabase();
    sut = new PrismaScheduleingRepository(database);
    carRepository = new PrismaCarRepository(database);
    vacancyRepository = new PrismaVacancyRepository(database);
  });

  /*it('should throw to find a repository.', async () => {
    const list = await sut.findMany();
    expect(list).toBeNull();
  });*/

  it('create a new scheduleing.', async () => {
    const scheduleing = await newScheduleing();
    expect(sut.save(scheduleing)).resolves.not.toThrow();
  });

  it('find a scheduleing list.', async () => {
    const car1 = await newCar();
    carRepository.save(car1);
    const vacancy1 = await newVacancy();
    vacancyRepository.save(vacancy1);
    const scheduleing1 = await newScheduleing();
    scheduleing1.addCar(car1);
    scheduleing1.addVacancy(vacancy1);
    sut.save(scheduleing1);
    const car2 = await newCar();
    carRepository.save(car2);
    const vacancy2 = await newVacancy();
    vacancyRepository.save(vacancy2);
    const scheduleing2 = await newScheduleing();
    scheduleing2.addCar(car2);
    scheduleing2.addVacancy(vacancy2);
    sut.save(scheduleing2);
    const vacancy = await sut.findMany();
    expect(vacancy).toHaveLength;
  });
});

export function generateScheduleings() {
  return Array.from({ length: 4 }).map(() => newScheduleing());
}
export async function newScheduleing(input?: {
  checkOut?: Date;
}): Promise<Scheduleing> {
  const vacancy = await newVacancy();
  const car = await newCar();
  const scheduleing = new Scheduleing({
    checkIn: faker.datatype.datetime(),
    checkOut: input?.checkOut ?? faker.datatype.datetime(),
  });
  scheduleing.addCar(car);
  scheduleing.addVacancy(vacancy);
  return scheduleing;
}
export async function newVacancy() {
  return new Vacancy({
    id: faker.datatype.uuid(),
    localization: faker.datatype.string(),
  });
}
export async function newCar() {
  return new Car({
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    brand: faker.datatype.string(),
    plate: faker.datatype.string(),
  });
}
