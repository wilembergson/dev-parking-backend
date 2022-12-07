import { Schedule } from '@domain/entities/schedule';

export interface ScheduleRepository {
  findMany(): Promise<Schedule[]>;

  save(Schedule: Schedule): Promise<void>;
}
