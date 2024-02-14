import { Body, Controller, Param, Get, Query, Delete, Patch, UseInterceptors } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeUser } from 'src/v1/interceptors/serializd-user.interceptor';

@UseInterceptors(SerializeUser)
@Controller()
export class UsersController {
    constructor(private userService: UserService) { }



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
