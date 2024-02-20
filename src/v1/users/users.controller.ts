import { Body, Controller, Param, Get, Query, Delete, Patch, Session } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';





@Controller()
export class UsersController {
    constructor(private userService: UserService) { }



    @Get("/:id")
    async findUser(@Param("id") id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get("/")
    async findAllUsers(@Query('email') email: string, @Session() session: any) {
        console.log(session.color)
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
