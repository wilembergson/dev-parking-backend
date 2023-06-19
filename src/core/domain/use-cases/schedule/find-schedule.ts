import { Schedule } from "@domain/entities";

export interface FindSchedule {
    execute(input: FindSchedule.Input): Promise<Schedule.Output.GetInformations>
}

export namespace FindSchedule {
    export type Input = {
        id: string;
    };
}