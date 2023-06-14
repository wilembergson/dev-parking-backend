import { Vacancy } from "@domain/entities";

export interface ListVacancies {
    execute(): Promise<Vacancy[]>
}