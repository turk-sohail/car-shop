import { Body, Controller, Param, Post, Get, Query, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userService: UserService) { }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.userService.create(body.email, body.password);
        return user
    }

    @Get("/:id")
    async findUser(@Param("id") id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get("/")
    async findAllUsers(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Delete("/:id")
    async deleteUser(@Param("id") id: string) {
        return await this.userService.remove(parseInt(id));
    }

    @Patch("/:id")
    async updateUser(@Body() body: UpdateUserDto, @Param("id") id: string) {
        return await this.userService.update(parseInt(id), body)
    }

}
