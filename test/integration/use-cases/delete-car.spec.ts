import { DeleteCar } from '@application/use-cases/delete-car';
import { Car } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';

describe('DeleteCar', () => {
  let sut: DeleteCar;
  let carRepository: MockProxy<CarRepository>;

  beforeAll(() => {
    carRepository = mock();
    sut = new DeleteCar(carRepository);
  });

  it('should delete a car.', async () => {
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    carRepository.findOne.mockResolvedValueOnce(car);
    await expect(sut.execute({ id: car.getState().id })).resolves.not.toThrow();
  });

  it('should throw when try to delete a car.', async () => {
    carRepository.findOne.mockResolvedValueOnce(null);
    await expect(sut.execute({ id: faker.datatype.uuid() })).rejects.toThrow();
  });
});
