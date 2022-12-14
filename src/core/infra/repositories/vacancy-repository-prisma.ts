/* eslint-disable prettier/prettier */
import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';
import { Database } from 'src/core/infra/database';
import { PrismaClient } from '@prisma/client';

export class VacancyRepositoryPrisma implements VacancyRepository {
  constructor(private readonly database: Database<PrismaClient>) { }

  async update(
    id: string,
    input: VacancyRepository.Input.Update,
  ): Promise<void> {
    await this.database.getConnection().vacancy.update({
      where: {
        id,
      },
      data: {
        localization: input.localization,
      },
    });
  }

  async delete(input: VacancyRepository.Input.Delete): Promise<void> {
    await this.database.getConnection().vacancy.delete({
      where: {
        id: input.id,
      },
    });
  }

  async findOne(
    input: VacancyRepository.Input.FindOne,
  ): Promise<Vacancy | null> {
    const data = await this.database.getConnection().vacancy.findFirst({
      where: {
        OR: [
          { id: input.id },
          { localization: input.localization }
        ]
      }
    });
    if (!data) return null;
    return new Vacancy({
      id: data.id,
      localization: data.localization,
    });
  }

  async save(vacancy: Vacancy): Promise<void> {
    const { id, localization } = vacancy.getState();
    await this.database.getConnection().vacancy.upsert({
      where: { id },
      create: { id, localization },
      update: { localization }
    });
  }
}
