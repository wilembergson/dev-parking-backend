import { CreateVacancy } from '@application/use-cases';
import { VacancyRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { VacancyDependencies } from './vacancy.dependencies';

const databaseProvider: ClassProvider<Database> = {
  provide: VacancyDependencies.Database,
  useClass: PrismaDatabase,
};

const vacancyRepositoryProvider: FactoryProvider<VacancyRepository> = {
  provide: VacancyDependencies.VacancyRepository,
  useFactory: (database: Database) => new VacancyRepositoryPrisma(database),
  inject: [VacancyDependencies.Database],
};

const createVacancyProvider: FactoryProvider<CreateVacancy> = {
  provide: VacancyDependencies.CreateVacancy,
  useFactory: (vacancyRepository: VacancyRepository) =>
    new CreateVacancy(vacancyRepository),
  inject: [VacancyDependencies.VacancyRepository],
};

export const providers: Provider[] = [
  vacancyRepositoryProvider,
  createVacancyProvider,
  databaseProvider,
];

export const providersExporteds: Provider[] = [vacancyRepositoryProvider];
