import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateBookingDto {

    @IsNumber()
    @Min(0)
    event_id: number

    @IsString()
    @MinLength(1)
    user_id: string

}
