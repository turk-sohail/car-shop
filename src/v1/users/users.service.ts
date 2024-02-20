import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async create(email: string, password: string) {
        const isExistied = await this.userRepo.findOneBy({ email });
        if (isExistied) {
            throw new BadRequestException("Email is already in use");
        }

        const hash = await bcrypt.hash(password, 12);


        const user = this.userRepo.create({ email, password: hash });
        await this.userRepo.save(user);
        return user;
    }

    async find(email: string) {
        const user = await this.userRepo.findOneBy({ email });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user
    }

    async findOne(id: number) {
        if (!id) {
            throw new BadRequestException();
            return null;
        }
        return await this.userRepo.findOneBy({ id });

    }

    async update(id: number, updates: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        Object.assign(user, updates);

        return this.userRepo.save(user);

    }
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        await this.userRepo.remove(user);
    }

    async oneUser(password: string, email: string) {
        const user = await this.find(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new UnauthorizedException("Credentials does not match");
        }
        return user;
    }
}