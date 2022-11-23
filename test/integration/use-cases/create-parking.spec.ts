import { CreateParking } from '@application/use-cases';
import { Parking } from '@domain/entities';
import { ParkingRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateParking', () => {
  let sut: CreateParking;
  let parkingRepository: MockProxy<ParkingRepository>;

  beforeAll(() => {
    parkingRepository = mock();
    sut = new CreateParking(parkingRepository);
  });

  it('should throws error if parking already exists.', async () => {
    parkingRepository.findOne.mockResolvedValueOnce(
      new Parking({
        localization: faker.datatype.string(),
        vacancies: faker.datatype.number(),
      }),
    );
    await expect(
      sut.execute({
        localization: faker.datatype.string(),
        vacancies: faker.datatype.number(),
      }),
    ).rejects.toThrow();
  });

  it('should create a new parking.', async () => {
    parkingRepository.findOne.mockResolvedValueOnce(null);
    await expect(
      sut.execute({
        localization: faker.datatype.string(),
        vacancies: faker.datatype.number(),
      }),
    ).resolves.not.toThrow();
  });
});
