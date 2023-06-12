export interface Login {
    execute(input: Login.Input): Promise<Login.Output>
}

export namespace Login {
    export type Input = {
        email: string
        password: string
    }
    export type Output = {
        token: string
    }
}