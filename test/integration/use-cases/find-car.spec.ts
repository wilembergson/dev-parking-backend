import { FindCar } from '@application/use-cases';
import { Car } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';

describe('FindCar', () => {
  let sut: FindCar;
  let carRepository: MockProxy<CarRepository>;

  beforeAll(() => {
    carRepository = mock();
    sut = new FindCar(carRepository);
  });

  it('should find a car.', async () => {
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });
    carRepository.findOne.mockResolvedValueOnce(car);
    await expect(
      sut.execute({ plate: car.getState().plate }),
    ).resolves.not.toBeNull();
  });

  /*it('should throw error if a car dont exists.', async () => {
    const car = new Car({
      name: faker.name.firstName(),
      brand: faker.datatype.string(),
      plate: faker.datatype.string(),
    });

    await expect(
      sut.execute({ plate: car.getState().plate }),
    ).rejects.toThrowError();
  });*/
});
