export interface Encrypter {
    encrypt(data: Encrypter.Input): Promise<string>
}

export namespace Encrypter {
    export type Input = {
        id: string
        name: string
    }
}