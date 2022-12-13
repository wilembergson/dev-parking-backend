import { UpdateVacancy } from '@application/use-cases/update-vacancy';
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';

describe('UpdateVacancy', () => {
  let sut: UpdateVacancy;
  let vacancyRepository: VacancyRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    vacancyRepository = new VacancyRepositoryPrisma(database);
    sut = new UpdateVacancy(vacancyRepository);
  });

  it('should update a vacancy.', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await vacancyRepository.save(vacancy);
    await expect(
      sut.execute(vacancy.getState().id, {
        localization: faker.datatype.string(),
      }),
    ).resolves.not.toThrow();
  });

  it('should throw.', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await expect(
      sut.execute(vacancy.getState().id, {
        localization: faker.datatype.string(),
      }),
    ).rejects.toThrow();
  });
});
