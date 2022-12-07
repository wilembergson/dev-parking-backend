import { Car } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { PrismaDatabase } from '@infra/database';
import { CarRepositoryPrisma } from '@infra/repositories';

describe('CarRepositoryPrisma', () => {
  let sut: CarRepository;
  let database: PrismaDatabase;
  beforeAll(() => {
    database = PrismaDatabase.getInstance();
    sut = new CarRepositoryPrisma(database);
  });
  it('create a new car.', () => {
    const car = newCar();
    expect(sut.save(car)).resolves.not.toThrow();
  });

  it('find a repository.', async () => {
    const id = faker.datatype.uuid();
    await sut.save(newCar({ id }));
    const car = await sut.findOne({ id });
    expect(car).toHaveProperty('id');
    expect(car).toHaveProperty('name');
    expect(car).toHaveProperty('brand');
    expect(car).toHaveProperty('plate');
  });

  it('should throw to find a repository.', async () => {
    const user = await sut.findOne({ id: faker.datatype.uuid() });
    expect(user).toBeNull();
  });
});

export function newCar(input?: { id?: string }) {
  return new Car({
    id: input?.id ?? faker.datatype.uuid(),
    name: faker.datatype.string(),
    brand: faker.datatype.string(),
    plate: faker.datatype.string(),
  });
}
