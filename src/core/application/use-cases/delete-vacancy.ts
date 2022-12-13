import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class DeleteVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(input: DeleteVacancy.Input.FindOne): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      localization: input.localization,
    });
    if (!vacancy) throw new VacancyNotFound();
    await this.vacancyRepository.delete({ id: vacancy.getState().id });
  }
}

export namespace DeleteVacancy {
  export namespace Input {
    export type FindOne = {
      localization: string;
    };
  }
}
