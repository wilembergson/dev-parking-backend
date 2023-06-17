export interface UpdateUser {
    execute(id: string ,input: UpdateUser.Input): Promise<void>
}

export namespace UpdateUser {
    export type Input = {
        email: string
        password: string
    }
}