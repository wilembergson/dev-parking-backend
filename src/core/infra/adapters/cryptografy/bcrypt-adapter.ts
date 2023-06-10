/* eslint-disable @typescript-eslint/no-empty-function */
import * as bcrypt from 'bcrypt'
import { HashComparer, Hasher } from "@application/protocols/cryptografy";

export class BcryptAdapter implements Hasher,HashComparer {
    constructor() { }
    
    async hash(value: string): Promise<string> {
        return await bcrypt.hash(value, 10)
    }
    
    async compare(value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash)
    }
}