import { Schedule } from "@domain/entities";

export interface FinishSchedule {
    execute(input: FinishSchedule.Input): Promise<Schedule.Output.GetInformations>
}

export namespace FinishSchedule {
    export type Input = {
        id: string;
    }
}