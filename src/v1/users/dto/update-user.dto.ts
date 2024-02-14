import { IsOptional, IsString, IsEmail } from "class-validator";


export class UpdateUserDto {
    @IsOptional()
    password: string
    @IsOptional()
    @IsEmail()
    email: string
}