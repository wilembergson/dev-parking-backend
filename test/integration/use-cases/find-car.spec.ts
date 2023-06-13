import { FindCustomer } from '@application/use-cases';
import { Customer } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { CustomerRepositoryPrisma } from '@infra/repositories';

describe('FindCar', () => {
  let sut: FindCustomer;
  let carRepository: CarRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    carRepository = new CustomerRepositoryPrisma(database);
    sut = new FindCustomer(carRepository);
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
