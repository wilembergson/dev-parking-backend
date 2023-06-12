import * as jwt from 'jsonwebtoken'
import { Decrypter, Encrypter } from "@application/protocols/cryptografy";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) { }

    async encrypt(data: Encrypter.Input): Promise<string> {
        return await jwt.sign(
            { name: data.name },
            this.secret
        )
    }
    async decrypt(token: string): Promise<any> {
        return await jwt.verify(token, this.secret)
    }

}