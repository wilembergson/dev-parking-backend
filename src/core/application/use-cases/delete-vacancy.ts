import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class DeleteVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(input: DeleteVacancy.Input.FindOne): Promise<void> {
    try {
      const foundVacancy = await this.vacancyRepository.findOne({
        localization: input.localization,
      });
      if (!foundVacancy) throw new VacancyNotFound();
      await this.vacancyRepository.delete({ id: foundVacancy.getState().id });
    } catch (error) {
      console.log(error);
    }
  }
}

export namespace DeleteVacancy {
  export namespace Input {
    export type FindOne = {
      localization: string;
    };
  }
}
