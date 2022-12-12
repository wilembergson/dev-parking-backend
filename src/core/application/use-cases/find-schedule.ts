import { Schedule } from '@domain/entities';
import { ScheduleNotFound } from '@domain/exceptions/schedule-not-found';
import { ScheduleRepository } from '@domain/repositories';

export class FindSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(input: FindSchedule.Input.FindOne): Promise<Schedule | null> {
    let foundSchedule;
    try {
      foundSchedule = await this.scheduleRepository.findSchedule({
        id: input.id,
      });
      if (!foundSchedule) throw new ScheduleNotFound();
    } catch (error) {
      console.log(error);
    }
    return foundSchedule;
  }
}

export namespace FindSchedule {
  export namespace Input {
    export type FindOne = {
      id: string;
    };
  }
}
