import { Vacancy } from '@domain/entities';
import { VacancyNotFound } from '@domain/exceptions';
import { VacancyRepository } from '@domain/repositories';

export class FindVacancy {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly vacancyRepository: VacancyRepository) { }

  async execute(input: FindVacancy.Input.FindOne): Promise<Vacancy | null> {
    const vacancy = await this.vacancyRepository.findOne({
      id: input.id,
    });
    if (!vacancy) throw new VacancyNotFound();

    return vacancy;
  }
}

export namespace FindVacancy {
  export namespace Input {
    export type FindOne = {
      id: string;
    };
  }
}
