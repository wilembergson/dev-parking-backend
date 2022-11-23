import { CreateCar } from '@application/use-cases';
import { Car } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateCar', () => {
  let sut: CreateCar;
  let carRepository: MockProxy<CarRepository>;

  beforeAll(() => {
    carRepository = mock();
    sut = new CreateCar(carRepository);
  });

  it('should throws error if car already exists.', async () => {
    carRepository.findOne.mockResolvedValueOnce(
      new Car({
        name: 'sssdd',
        brand: 'sssdd',
        board: 'sssdd',
        price: 554,
      }),
    );
    await expect(
      sut.execute({
        name: 'sssdd2',
        brand: 'sssdd2',
        board: 'sssdd2',
        price: 555,
      }),
    ).rejects.toThrow();
  });

  it('should create a new car.', async () => {
    carRepository.findOne.mockResolvedValueOnce(null);
    await expect(
      sut.execute({
        name: 'sssdd2',
        brand: 'sssdd2',
        board: 'sssdd2',
        price: 555,
      }),
    ).resolves.not.toThrow();
  });
});
