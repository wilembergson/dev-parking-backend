import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';

describe('Vacancy', () => {
  let sut: VacancyRepository;
  let database: Database;
  beforeAll(() => {
    database = new PrismaDatabase();
    sut = new VacancyRepositoryPrisma(database);
  });
  it('create a new vacancy.', () => {
    const vacancy = newVacancy();
    expect(sut.save(vacancy)).resolves.not.toThrow();
  });

  it('find a repository.', async () => {
    const id = faker.datatype.uuid();
    await sut.save(newVacancy({ id }));
    const vacancy = await sut.findOne({ id });
    expect(vacancy).toHaveProperty('id');
    expect(vacancy).toHaveProperty('localization');
  });

  it('should throw to find a repository.', async () => {
    const id = faker.datatype.uuid();
    const vacancy = newVacancy({ id });
    await expect(
      sut.findOne({ localization: vacancy.getState().localization }),
    ).resolves.toBeNull();
  });
  it('should delete a user.', async () => {
    const id = faker.datatype.uuid();
    await sut.save(newVacancy({ id }));
    await expect(sut.delete({ id })).resolves.not.toThrow();
  });

  it('should update a user.', async () => {
    const id = faker.datatype.uuid();
    await sut.save(newVacancy({ id }));
    await expect(
      sut.update(id, {
        localization: faker.address.latitude(),
      }),
    ).resolves.not.toThrow();
  });
});

export function newVacancy(input?: { id?: string }) {
  return new Vacancy({
    id: input?.id ?? faker.datatype.uuid(),
    localization: faker.datatype.string(),
  });
}
