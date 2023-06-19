import { Vacancy } from "@domain/entities";
import { VacancyRepository } from "@domain/repositories";
import { ListVacancies } from "@domain/use-cases/vacancy";

export class ListVacanciesUseCase implements ListVacancies {
    constructor(private readonly vacancyRepository: VacancyRepository) { }

    async execute(): Promise<Vacancy.Output.GetState[]> {
        const result = await this.vacancyRepository.listAll()
        const list = result.map(item => item.getState())
        return list.sort((a, b) => {
            const A = a.localization
            const B = b.localization
            if (A < B)
                return -1
            if (A > B)
                return 1
            return 0
        })
    }
}