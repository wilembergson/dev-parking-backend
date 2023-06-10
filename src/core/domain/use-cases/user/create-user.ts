export interface CreateUser {
    execute(input: CreateUser.Input): Promise<void>
}

export namespace CreateUser {
    export type Input = {
        name: string
        email: string
        birthdate: string
        password: string
    }
}