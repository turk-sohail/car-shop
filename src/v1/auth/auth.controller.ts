import { Controller, Post, Body, Session, Get, Request } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/users.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';


@Controller()
export class AuthController {
    constructor(private userService: UserService) { }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.userService.create(body.email, body.password);
        session.userId = user.id;
        return user
    }

    @Post("/signin")
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const { password, email } = body;
        const user = await this.userService.oneUser(password, email);
        session.userId = user.id;
        return user;

    }

    @Get("/profile")
    async getProfile(@CurrentUser() user: User, @Request() req: any) {
        console.log(req);
        return user;
    }


    @Get("/dashboard")
    async getUser(@Session() session: any,) {
        const user = await this.userService.findOne(session.userId);


        return user;
    }

    @Post("/signout")
    async signOut(@Session() session: any) {
        console.log(session.userId)
        session.userId = null;
        if (!session.userId) {

        }
    }




}
