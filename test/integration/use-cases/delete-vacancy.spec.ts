import { DeleteVacancy } from '@application/use-cases/delete-vacancy';
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';

describe('DeleteVacancy', () => {
  let sut: DeleteVacancy;
  let vacancyRepository: VacancyRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    vacancyRepository = new VacancyRepositoryPrisma(database);
    sut = new DeleteVacancy(vacancyRepository);
  });

  it('should delete a vacancy.', async () => {
    const vacancy = new Vacancy({
      localization: faker.datatype.uuid(),
    });
    await vacancyRepository.save(vacancy);
    await expect(
      sut.execute({ id: vacancy.getState().id }),
    ).resolves.not.toThrow();
  });

  it('should throw when try to delete a', async () => {
    const vacancy = new Vacancy({ localization: faker.datatype.string() });
    await expect(sut.execute({ id: vacancy.getState().id })).rejects.toThrow();
  });
});
