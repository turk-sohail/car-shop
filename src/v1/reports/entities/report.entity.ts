import { User } from "src/v1/users/entities/user.entity";
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: false })
    approved: boolean

    @Column()
    price: number

    @Column()
    make: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lng: string

    @Column()
    lat: string

    @Column()
    mileage: number

    @ManyToOne(() => User, (user) => user.reports)
    user: User
}