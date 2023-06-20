import { Vacancy } from '@domain/entities';

export interface VacancyRepository {
  findOne(input: VacancyRepository.Input.FindOne): Promise<Vacancy | null>;

  save(vacancy: Vacancy): Promise<void>;

  listAll(): Promise<Vacancy[]>
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
      localization: string;
    };
  }
}
