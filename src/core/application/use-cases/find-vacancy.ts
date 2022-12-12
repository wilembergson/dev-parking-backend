import { Vacancy } from '@domain/entities';
import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class FindVacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(input: FindVacancy.Input.FindOne): Promise<Vacancy | null> {
    let foundVacancy;
    try {
      foundVacancy = await this.vacancyRepository.findOne({
        localization: input.localization,
      });
      if (!foundVacancy) throw new VacancyNotFound();
    } catch (error) {
      console.log(error);
    }
    return foundVacancy;
  }
}

export namespace FindVacancy {
  export namespace Input {
    export type FindOne = {
      localization: string;
    };
  }
}
