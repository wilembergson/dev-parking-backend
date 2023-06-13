import { CreateSchedule } from '@application/use-cases';
import { DeleteSchedule } from '@application/use-cases/delete-schedule';
import { FindSchedule } from '@application/use-cases/find-schedule';
import { ListSchedules } from '@application/use-cases/list-schedules';
import { CustomerRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { Database, PrismaDatabase } from '@infra/database';
import { ScheduleRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CustomerDependencies } from '../customer';
import { VacancyDependencies } from '../vacancy';
import { ScheduleDependencies } from './schedule.dependencies';

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
  ) => new CreateSchedule(scheduleRepository, vacancyRepository, carRepository),
  inject: [
    ScheduleDependencies.ScheduleRepository,
    VacancyDependencies.VacancyRepository,
    CustomerDependencies.CustomerRepository,
  ],
};

const findScheduleProvider: FactoryProvider<FindSchedule> = {
  provide: ScheduleDependencies.FindSchedule,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new FindSchedule(scheduleRepository),
  inject: [ScheduleDependencies.ScheduleRepository],
};

const listSchedulesProvider: FactoryProvider<ListSchedules> = {
  provide: ScheduleDependencies.ListSchedules,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new ListSchedules(scheduleRepository),
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
