import * as jwt from 'jsonwebtoken'
import { Decrypter, Encrypter } from "@application/protocols/cryptografy";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) { }

    async encrypt(data: Encrypter.Input): Promise<string> {
        return await jwt.sign(
            {
                id: data.id,
                name: data.name
            },
            this.secret,
            { expiresIn: '60m' }
        )
    }
    async decrypt(token: string): Promise<any> {
        return await jwt.verify(token, this.secret)
    }

}