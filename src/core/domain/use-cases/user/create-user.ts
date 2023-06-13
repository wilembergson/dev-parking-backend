export interface CreateUser {
    execute(input: CreateUser.Input): Promise<void>
}

export namespace CreateUser {
    export type Input = {
        name: string
        rg: string
        email: string
        password: string
    }
}