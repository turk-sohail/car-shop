import { IsBoolean } from "class-validator";

export class ApproveUserDto {
    @IsBoolean()
    approved: boolean
}