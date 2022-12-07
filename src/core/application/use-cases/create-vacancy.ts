import { Vacancy } from '@domain/entities';
import { VacancyFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class CreateVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(input: CreateVacancy.Input): Promise<void> {
    const foundVacancy = await this.vacancyRepository.findOne({
      localization: input.localization,
    });
    if (foundVacancy) throw new VacancyFound();
    const vacancy = new Vacancy({
      localization: input.localization,
    });
    await this.vacancyRepository.save(vacancy);
  }
}

export namespace CreateVacancy {
  export type Input = {
    localization: string;
  };
}
