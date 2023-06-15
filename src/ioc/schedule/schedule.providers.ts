import { CreateScheduleUseCase } from '@application/use-cases';
import { DeleteSchedule } from '@application/use-cases/delete-schedule';
import { FindSchedule } from '@application/use-cases/find-schedule';
import { CustomerRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { Database, PrismaDatabase } from '@infra/database';
import { ScheduleRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CustomerDependencies } from '../customer';
import { VacancyDependencies } from '../vacancy';
import { ScheduleDependencies } from './schedule.dependencies';
import { CreateSchedule, ListSchedules } from '@domain/use-cases/schedule';
import { ListSchedulesUseCase } from '@application/use-cases/schedule';

const databaseProvider: ClassProvider<Database> = {
  provide: CustomerDependencies.Database,
  useClass: PrismaDatabase,
};

const scheduleRepositoryProvider: FactoryProvider<ScheduleRepository> = {
  provide: ScheduleDependencies.ScheduleRepository,
  useFactory: (database: PrismaDatabase) =>
    new ScheduleRepositoryPrisma(database),
  inject: [ScheduleDependencies.Database],
};

const createScheduleProvider: FactoryProvider<CreateSchedule> = {
  provide: ScheduleDependencies.CreateSheduleing,
  useFactory: (
    scheduleRepository: ScheduleRepository,
    vacancyRepository: VacancyRepository,
    carRepository: CustomerRepository,
  ) => new CreateScheduleUseCase(scheduleRepository, vacancyRepository, carRepository),
  inject: [
    ScheduleDependencies.ScheduleRepository,
    VacancyDependencies.VacancyRepository,
    CustomerDependencies.CustomerRepository,
  ],
};

const listSchedulesProvider: FactoryProvider<ListSchedules> = {
  provide: ScheduleDependencies.ListSchedules,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new ListSchedulesUseCase(scheduleRepository),
  inject: [ScheduleDependencies.ScheduleRepository],
};

const findScheduleProvider: FactoryProvider<FindSchedule> = {
  provide: ScheduleDependencies.FindSchedule,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new FindSchedule(scheduleRepository),
  inject: [ScheduleDependencies.ScheduleRepository],
};


const deleteSchedulesProvider: FactoryProvider<DeleteSchedule> = {
  provide: ScheduleDependencies.DeleteSchedule,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new DeleteSchedule(scheduleRepository),
  inject: [ScheduleDependencies.ScheduleRepository],
};

export const providers: Provider[] = [
  scheduleRepositoryProvider,
  createScheduleProvider,
  databaseProvider,
  findScheduleProvider,
  listSchedulesProvider,
  deleteSchedulesProvider,
];
