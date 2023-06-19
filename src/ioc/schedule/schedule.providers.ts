import { CreateScheduleUseCase } from '@application/use-cases';
import { FindScheduleUseCase } from '@application/use-cases/schedule/find-schedule';
import { CustomerRepository, EmployeeUserRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { Database, PrismaDatabase } from '@infra/database';
import { ScheduleRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CustomerDependencies } from '../customer';
import { VacancyDependencies } from '../vacancy';
import { ScheduleDependencies } from './schedule.dependencies';
import { CreateSchedule, FindSchedule, FinishSchedule, ListSchedules } from '@domain/use-cases/schedule';
import { FinishScheduleUseCase, ListSchedulesUseCase } from '@application/use-cases/schedule';
import { EmployeeUserDependencies } from '../employee-user';

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
    employeeUserRepository: EmployeeUserRepository
  ) => new CreateScheduleUseCase(scheduleRepository, vacancyRepository, carRepository, employeeUserRepository),
  inject: [
    ScheduleDependencies.ScheduleRepository,
    VacancyDependencies.VacancyRepository,
    CustomerDependencies.CustomerRepository,
    EmployeeUserDependencies.EmployeeUserRepository
  ],
};

const listSchedulesProvider: FactoryProvider<ListSchedules> = {
  provide: ScheduleDependencies.ListSchedules,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new ListSchedulesUseCase(scheduleRepository),
  inject: [ScheduleDependencies.ScheduleRepository],
};

const finishScheduleProvider: FactoryProvider<FinishSchedule> = {
  provide: ScheduleDependencies.FinishSchedule,
  useFactory: (scheduleRepository: ScheduleRepository, vacancyRepository: VacancyRepository) =>
    new FinishScheduleUseCase(scheduleRepository, vacancyRepository),
  inject: [ScheduleDependencies.ScheduleRepository, ScheduleDependencies.VacancyRepository],
};

const findScheduleProvider: FactoryProvider<FindSchedule> = {
  provide: ScheduleDependencies.FindSchedule,
  useFactory: (scheduleRepository: ScheduleRepository) =>
    new FindScheduleUseCase(scheduleRepository),
  inject: [ScheduleDependencies.ScheduleRepository],
};

export const providers: Provider[] = [
  scheduleRepositoryProvider,
  createScheduleProvider,
  databaseProvider,
  findScheduleProvider,
  listSchedulesProvider,
  finishScheduleProvider
];
