import { Schedule } from "@domain/entities";

export interface ListSchedules {
    execute(input: ListSchedules.Input): Promise<Schedule[]>
}

export namespace ListSchedules {
    export type Input = {
        customerRg?: string;
        finished?: boolean;
    }
}