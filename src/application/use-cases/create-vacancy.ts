import { Vacancy } from '@domain/entities';
import { VacancyRepository } from '@domain/repositories';

export class CreateVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(input: CreateVacancy.Input): Promise<void> {
    const foundVacancy = await this.vacancyRepository.findOne({
      localization: input.localization,
    });
    if (foundVacancy) throw Error('Já há uma vaga nesta localização.');
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
