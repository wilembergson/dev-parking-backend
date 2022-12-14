import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class UpdateVacancy {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly vacancyRepository: VacancyRepository) { }

  async execute(id: string, input: UpdateVacancy.Input): Promise<void> {
    const vacancy = await this.vacancyRepository.findOne({
      id,
    });
    if (!vacancy) throw new VacancyNotFound();
    vacancy.update(input);
    await this.vacancyRepository.save(vacancy);
  }
}

export namespace UpdateVacancy {
  export type Input = {
    localization: string;
  };
}
