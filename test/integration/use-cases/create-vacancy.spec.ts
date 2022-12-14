import { CreateVacancy } from '@application/use-cases';
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';

describe('CreateVacancy', () => {
  let sut: CreateVacancy;
  let vacancyRepository: VacancyRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    vacancyRepository = new VacancyRepositoryPrisma(database);
    sut = new CreateVacancy(vacancyRepository);
  });

  it('should throws error if parking already exists.', async () => {
    const vacancy = new Vacancy({
      id: faker.datatype.uuid(),
      localization: faker.datatype.string(),
    });
    await vacancyRepository.save(vacancy);
    await expect(
      sut.execute({
        id: vacancy.getState().id,
        localization: vacancy.getState().localization,
      }),
    ).rejects.toThrow();
  });

  it('should create a new vacancy.', async () => {
    const vacancy = new Vacancy({
      localization: faker.datatype.string(),
    });
    await expect(
      sut.execute({
        id: vacancy.getState().id,
        localization: vacancy.getState().localization,
      }),
    ).resolves.not.toThrow();
  });
});
