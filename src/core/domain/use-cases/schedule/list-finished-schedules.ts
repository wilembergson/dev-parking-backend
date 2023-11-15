import { Schedule } from "@domain/entities";

export interface ListFinishedSchedules {
    execute(): Promise<(Schedule.Output.GetInformations | undefined)[]>
}