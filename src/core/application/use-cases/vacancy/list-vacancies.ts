import { Vacancy } from "@domain/entities";
import { VacancyRepository } from "@domain/repositories";
import { ListVacancies } from "@domain/use-cases/vacancy";

export class ListVacanciesUseCase implements ListVacancies{
    constructor(private readonly vacancyRepository: VacancyRepository){}
    
    async execute(): Promise<Vacancy[]> {
        return await this.vacancyRepository.listAll()
    }
}