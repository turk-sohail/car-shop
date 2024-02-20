import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude } from "class-validator"

export class CreateReportDto {
    @IsString()
    make: string

    @IsString()
    model: string

    @IsNumber()
    @Min(1930)
    @Max(2024)
    year: number

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number

    @IsLongitude()
    lng: any

    @IsLatitude()
    lat: any

    @IsNumber()
    price: number
}