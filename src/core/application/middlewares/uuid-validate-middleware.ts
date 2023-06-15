import { NextFunction, Request, Response } from "express";
import { InvalidUuid, Unauthenticated } from "@domain/exceptions";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtAdapter } from "@infra/adapters/cryptografy/jwt-adapter";

@Injectable()
export class UuidValidateMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        const valid =uuidRegex.test(id)
        if(!valid) throw new InvalidUuid()
        next()
    }
}