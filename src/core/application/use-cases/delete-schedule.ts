import { ScheduleNotFound } from '@domain/exceptions';
import { ScheduleRepository } from '@domain/repositories';

export class DeleteSchedule {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: DeleteSchedule.Input.FindOne): Promise<void> {
    const schedule = await this.scheduleRepository.findSchedule({
      id: input.id,
    });
    if (!schedule) throw new ScheduleNotFound();
    await this.scheduleRepository.delete({ id: schedule.getState().id });
  }
}

export namespace DeleteSchedule {
  export namespace Input {
    export type FindOne = {
      id: string;
    };
  }
}
