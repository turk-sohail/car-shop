import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/users.service';

@Controller()
export class AuthController {
    constructor(private userService: UserService) { }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.userService.create(body.email, body.password);
        return user
    }

    @Post("/signin")
    async signin(@Body() body: any) {
        const { password, email } = body;
        const user = await this.userService.oneUser(password, email);
        return user;

    }



}
