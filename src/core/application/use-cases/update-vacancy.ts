import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class UpdateVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(id: string, input: UpdateVacancy.Input): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      id,
    });
    if (!vacancy) throw new VacancyNotFound();
    await this.vacancyRepository.update(id, input);
  }
}

export namespace UpdateVacancy {
  export type Input = {
    localization: string;
  };
}
