import { CreateVacancy } from '@application/use-cases';
import { DeleteVacancy } from '@application/use-cases/delete-vacancy';
import { FindVacancy } from '@application/use-cases/find-vacancy';
import { VacancyRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { VacancyRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { VacancyDependencies } from './vacancy.dependencies';
import { ListVacancies } from '@domain/use-cases/vacancy';
import { ListVacanciesUseCase } from '@application/use-cases/vacancy';
import { UpdateVacancy } from '@application/use-cases/update-vacancy';

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

const listVacanciesProvider: FactoryProvider<ListVacancies> = {
  provide: VacancyDependencies.ListVacancies,
  useFactory: (vacancyRepository: VacancyRepository) =>
    new ListVacanciesUseCase(vacancyRepository),
  inject: [VacancyDependencies.VacancyRepository],
};

const findVacancyProvider: FactoryProvider<FindVacancy> = {
  provide: VacancyDependencies.FindVacancy,
  useFactory: (vacancyRepository: VacancyRepository) =>
    new FindVacancy(vacancyRepository),
  inject: [VacancyDependencies.VacancyRepository],
};

const deleteVacancyProvider: FactoryProvider<DeleteVacancy> = {
  provide: VacancyDependencies.DeleteVacancy,
  useFactory: (vacancyRepository: VacancyRepository) =>
    new DeleteVacancy(vacancyRepository),
  inject: [VacancyDependencies.VacancyRepository],
};

const updateVacancyProvider: FactoryProvider<UpdateVacancy> = {
  provide: VacancyDependencies.UpdateVacancy,
  useFactory: (vacancyRepository: VacancyRepository) =>
    new UpdateVacancy(vacancyRepository),
  inject: [VacancyDependencies.VacancyRepository],
};

export const providers: Provider[] = [
  vacancyRepositoryProvider,
  createVacancyProvider,
  databaseProvider,
  findVacancyProvider,
  deleteVacancyProvider,
  updateVacancyProvider,
  listVacanciesProvider
];

export const providersExporteds: Provider[] = [vacancyRepositoryProvider];
