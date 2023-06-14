import { VacancyNotFound } from "@domain/exceptions";
import { VacancyRepository } from "@domain/repositories";
import { OccupyVacancy } from "@domain/use-cases/vacancy";

export class OccupyVacancyUseCase implements OccupyVacancy {
    constructor(private readonly vacancyRepository: VacancyRepository) { }

    async execute(input: OccupyVacancy.Input): Promise<void> {
        const vacancy = await this.vacancyRepository.findOne({
            localization: input.localization
        });
        if (!vacancy) throw new VacancyNotFound();
        vacancy.setOccupied(true);
        await this.vacancyRepository.save(vacancy);
    }

}