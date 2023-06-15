import { Schedule } from "@domain/entities";

export interface ListSchedules {
    execute(): Promise<Schedule[]>
}