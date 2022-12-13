import { FindCar } from '@application/use-cases';
import { Car } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { CarRepositoryPrisma } from '@infra/repositories';

describe('FindCar', () => {
  let sut: FindCar;
  let carRepository: CarRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    carRepository = new CarRepositoryPrisma(database);
    sut = new FindCar(carRepository);
  });

  it('should find a car.', async () => {
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    await carRepository.save(car);
    await expect(
      sut.execute({ plate: car.getState().plate }),
    ).resolves.not.toBeNull();
  });

  it('should throw error if a car dont exists.', async () => {
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });

    await expect(
      sut.execute({ plate: car.getState().plate }),
    ).rejects.toThrow();
  });
});
