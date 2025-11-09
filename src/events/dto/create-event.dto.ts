import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateEventDto {
    
    @IsString()
    @MinLength(1)
    name: string

    @IsNumber()
    @Min(1)
    total_seats: number

}
