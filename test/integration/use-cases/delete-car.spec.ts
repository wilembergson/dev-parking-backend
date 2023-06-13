import { DeleteCustomer } from '@application/use-cases/delete-customer';
import { Customer } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { CustomerRepositoryPrisma } from '@infra/repositories';

describe('DeleteCar', () => {
  let sut: DeleteCustomer;
  let carRepository: CarRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    carRepository = new CustomerRepositoryPrisma(database);
    sut = new DeleteCustomer(carRepository);
  });

  it('should delete a car.', async () => {
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    await carRepository.save(car);
    await expect(sut.execute({ id: car.getState().id })).resolves.not.toThrow();
  });

  it('should throw when try to delete a car.', async () => {
    const id = faker.datatype.uuid();
    const car = new Car({
      id,
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    await expect(sut.execute({ id: car.getState().id })).rejects.toThrow();
  });
});
