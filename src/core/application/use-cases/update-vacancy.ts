import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class UpdateVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(input: UpdateVacancy.Input): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      id: input.id,
    });
    if (!vacancy) throw new VacancyNotFound();
    await this.vacancyRepository.update(input);
  }
}

export namespace UpdateVacancy {
  export type Input = {
    id: string;
    localization: string;
  };
}
