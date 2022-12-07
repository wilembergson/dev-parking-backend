import { CreateSchedule } from '@application/use-cases';
import { CarRepository, VacancyRepository } from '@domain/repositories';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { Database, PrismaDatabase } from '@infra/database';
import { ScheduleRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CarDependencies } from '../car';
import { VacancyDependencies } from '../vacancy';
import { ScheduleDependencies } from './schedule.dependencies';

const databaseProvider: ClassProvider<Database> = {
  provide: CarDependencies.Database,
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
    carRepository: CarRepository,
  ) => new CreateSchedule(scheduleRepository, vacancyRepository, carRepository),
  inject: [
    ScheduleDependencies.ScheduleRepository,
    VacancyDependencies.VacancyRepository,
    CarDependencies.CarRepository,
  ],
};

export const providers: Provider[] = [
  scheduleRepositoryProvider,
  createScheduleProvider,
  databaseProvider,
];
