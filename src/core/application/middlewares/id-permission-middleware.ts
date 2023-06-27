import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "@domain/exceptions";
import { NestMiddleware } from "@nestjs/common";

export class IdPermissionMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const employeeId: string = res.locals.employeeData.id
        if (employeeId !== req.params.id)
            throw new Unauthenticated('Você não tem autorização para realizar esta operação.')
        next()
    }
}