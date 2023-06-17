import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "@domain/exceptions";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtAdapter } from "@infra/adapters/cryptografy/jwt-adapter";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers?.['authorization']
        if (!token) throw new Unauthenticated('Token não informado')
        try {
            const decrypter = new JwtAdapter(process.env.JWT_SECRET!)
            const tokenData = await decrypter.decrypt(token)
            res.locals.myId = tokenData.id
        } catch (error) {
            const message = (error.name === 'TokenExpiredError' ? 'Sessão expirada.' : 'Token inválido.')
            throw new Unauthenticated(message)
        }
        next()
    }
}