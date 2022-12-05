import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { Database } from '@infra/database';
import { PrismaClient } from '@prisma/client';

export class VacancyRepositoryPrisma implements VacancyRepository {
  constructor(private readonly database: Database<PrismaClient>) {}
  async findOne(
    input: VacancyRepository.Input.FindOne,
  ): Promise<Vacancy | null> {
    const data = await this.database.getConnection().vacancy.findFirst({
      where: { id: input.id },
    });
    if (!data) return null;
    return new Vacancy({
      id: data.id,
      localization: data.localization,
    });
  }

  async save(vacancy: Vacancy): Promise<void> {
    const { id, localization } = vacancy.getState();
    await this.database.getConnection().vacancy.create({
      data: { id, localization },
    });
  }
}
