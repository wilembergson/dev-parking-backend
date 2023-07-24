import { Schedule } from '@domain/entities/schedule';

export interface ScheduleRepository {
  findMany(): Promise<Schedule[]>;

  save(schedule: Schedule): Promise<void>;

  findSchedule(input: ScheduleRepository.Input.FindSchedule): Promise<Schedule>;

  findScheduleByVacancy(input: ScheduleRepository.Input.FindScheduleByVacancy): Promise<Schedule>;

  update(schedule: Schedule): Promise<void>;
}

export namespace ScheduleRepository {
  export namespace Input {
    export type FindSchedule = {
      id: string;
    };
    export type FindScheduleByVacancy = {
      vacancyId: string;
    };
    export type Delete = {
      id: string;
    };
  }
}
