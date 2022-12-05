import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { PrismaDatabase } from '@infra/database';
import { PrismaVacancyRepository } from '@infra/repositories';

describe('Vacancy', () => {
  let sut: VacancyRepository;
  let database: PrismaDatabase;
  beforeAll(() => {
    database = new PrismaDatabase();
    sut = new PrismaVacancyRepository(database);
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
    const vacancy = await sut.findOne({
      id: faker.datatype.uuid(),
    });
    expect(vacancy).toBeNull();
  });
});

export function newVacancy(input?: { id?: string }) {
  return new Vacancy({
    id: input?.id ?? faker.datatype.uuid(),
    localization: faker.datatype.string(),
  });
}
