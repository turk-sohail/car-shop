import { Expose, Transform } from "class-transformer";

export class ReportDto {

    @Expose()
    make: string
    @Expose()
    model: string
    @Expose()
    year: number
    @Expose()
    mileage: number
    @Expose()
    lng: any
    @Expose()
    lat: any
    @Expose()
    price: number

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number
}
