import { Vacancy } from '@domain/entities';

export interface VacancyRepository {
  findOne(input: VacancyRepository.Input.FindOne): Promise<Vacancy | null>;

  save(vacancy: Vacancy): Promise<void>;

  delete(input: VacancyRepository.Input.Delete): Promise<void>;

  update(input: VacancyRepository.Input.Update): Promise<void>;
}

export namespace VacancyRepository {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      localization: string;
    }>;
    export type Delete = {
      id: string;
    };
    export type Update = {
      id: string;
      localization: string;
    };
  }
}
