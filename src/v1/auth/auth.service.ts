import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/v1/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) { }


    async signup(email: string, password: string) {
        const isExistied = await this.usersService.find(email);
        if (isExistied) {
            throw new BadRequestException("Email is already in use");
        }

        const hash = await bcrypt.hash(password, 12);

        const user = await this.usersService.create(email, hash);
        return user;


    }

}
