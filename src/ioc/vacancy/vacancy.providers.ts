import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { ListVacanciesUseCase } from '@application/use-cases/vacancy';
import { VacancyRepositoryPrisma } from '@infra/repositories';
import { VacancyDependencies } from './vacancy.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { ListVacancies } from '@domain/use-cases/vacancy';
import { VacancyRepository } from '@domain/repositories';

const databaseProvider: ClassProvider<Database> = {
  provide: VacancyDependencies.Database,
  useClass: PrismaDatabase,
};

const vacancyRepositoryProvider: FactoryProvider<VacancyRepository> = {
  provide: VacancyDependencies.VacancyRepository,
  useFactory: (database: Database) => new VacancyRepositoryPrisma(database),
  inject: [VacancyDependencies.Database],
};

const listVacanciesProvider: FactoryProvider<ListVacancies> = {
  provide: VacancyDependencies.ListVacancies,
  useFactory: (vacancyRepository: VacancyRepository) =>
    new ListVacanciesUseCase(vacancyRepository),
  inject: [VacancyDependencies.VacancyRepository],
};

export const providers: Provider[] = [
  vacancyRepositoryProvider,
  databaseProvider,
  listVacanciesProvider
];

export const providersExporteds: Provider[] = [vacancyRepositoryProvider];
