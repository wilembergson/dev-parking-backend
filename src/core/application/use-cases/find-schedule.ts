import { Schedule } from '@domain/entities';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';
import { ScheduleRepository } from '@domain/repositories';

export class FindSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(input: FindSchedule.Input.FindOne): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findSchedule({
      id: input.id,
    });
    if (!schedule) throw new ScheduleNotFound();

    return schedule;
  }
}

export namespace FindSchedule {
  export namespace Input {
    export type FindOne = {
      id: string;
    };
  }
}
