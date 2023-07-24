import { Schedule } from "@domain/entities";

export interface FindScheduleByVacancy {
    execute(input: FindScheduleByVacancy.Input): Promise<Schedule.Output.GetInformations>
}

export namespace FindScheduleByVacancy {
    export type Input = {
        vacancyId: string;
    };
}