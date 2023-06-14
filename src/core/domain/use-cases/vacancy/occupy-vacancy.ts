export interface OccupyVacancy {
    execute(input: OccupyVacancy.Input): Promise<void>
}

export namespace OccupyVacancy {
    export type Input = {
        localization: string;
    }
}