import { CreateVacancy } from '@application/use-cases';
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateVacancy', () => {
  let sut: CreateVacancy;
  let vacancyRepository: MockProxy<VacancyRepository>;

  beforeAll(() => {
    vacancyRepository = mock();
    sut = new CreateVacancy(vacancyRepository);
  });

  it('should throws error if parking already exists.', async () => {
    vacancyRepository.findOne.mockResolvedValueOnce(
      new Vacancy({
        localization: faker.datatype.string(),
      }),
    );
    await expect(
      sut.execute({
        localization: faker.datatype.string(),
      }),
    ).rejects.toThrow();
  });

  it('should create a new parking.', async () => {
    vacancyRepository.findOne.mockResolvedValueOnce(null);
    await expect(
      sut.execute({
        localization: faker.datatype.string(),
      }),
    ).resolves.not.toThrow();
  });
});
