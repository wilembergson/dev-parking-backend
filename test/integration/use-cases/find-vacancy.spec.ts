import { FindVacancy } from '@application/use-cases/find-vacancy';
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';

describe('FindVacancy', () => {
  let sut: FindVacancy;
  let vacancyRepository: VacancyRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    vacancyRepository = new VacancyRepositoryPrisma(database);
    sut = new FindVacancy(vacancyRepository);
  });

  it('should find a vacancy.', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await vacancyRepository.save(vacancy);
    await expect(
      sut.execute({ localization: vacancy.getState().localization }),
    ).resolves.not.toBeNull();
  });

  it('should throw error if a vacancy dont exists.', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await expect(
      sut.execute({ localization: vacancy.getState().localization }),
    ).rejects.toThrow();
  });
});
