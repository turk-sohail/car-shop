import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UserService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {}
        if (userId) {
            const user = await this.userService.findOne(userId);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            req.currentUser = user;
            console.log(user);

        }
        next()
    }
}