import { Vacancy } from "@domain/entities";
import { VacancyRepository } from "@domain/repositories";
import { ListVacancies } from "@domain/use-cases/vacancy";

export class ListVacanciesUseCase implements ListVacancies {
    constructor(private readonly vacancyRepository: VacancyRepository) { }

    async execute(): Promise<Vacancy[]> {
        const list = await this.vacancyRepository.listAll()
        return list.sort((a, b) => {
            const A = a.getState().localization
            const B = b.getState().localization
            if (A < B)
                return -1
            if (A > B)
                return 1
            return 0
        })
    }
}