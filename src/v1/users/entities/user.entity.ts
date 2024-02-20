import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Report } from "src/v1/reports/entities/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]
}