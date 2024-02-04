import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { error } from "console";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async create(email: string, password: string) {
        const user = await this.userRepo.create({ email, password });
        await this.userRepo.save(user);
        return user;
    }

    async find(email: string) {
        const user = await this.userRepo.findOneBy({ email });
        return user
    }

    async findOne(id: number) {
        return await this.userRepo.findOneBy({ id })
    }

    async update(id: number, updates: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new error("user not found");
        }
        Object.assign(user, updates);

        return this.userRepo.save(user);

    }
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new error("user not found");
        }
        await this.userRepo.remove(user);
    }
}