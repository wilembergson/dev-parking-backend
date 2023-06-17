import { Unauthenticated } from "@domain/exceptions";
import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class IdPermitionMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const myId: string = res.locals.myId
        if(myId !== req.params.id) throw new Unauthenticated('Você não tem autorização para realizar esta operação.')
        next()
    }
}