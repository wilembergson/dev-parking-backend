import { VacancyNotFound } from '@domain/exceptions';
import { ScheduleRepository } from '@domain/repositories';

export class DeleteSchedule {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(input: DeleteSchedule.Input.FindOne): Promise<void> {
    try {
      const foundSchedule = await this.scheduleRepository.findSchedule({
        id: input.id,
      });
      if (!foundSchedule) throw new VacancyNotFound();
      await this.scheduleRepository.delete({ id: foundSchedule.getState().id });
    } catch (error) {
      console.log(error);
    }
  }
}

export namespace DeleteSchedule {
  export namespace Input {
    export type FindOne = {
      id: string;
    };
  }
}
