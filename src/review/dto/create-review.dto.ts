import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createReviewDto{
    @ApiProperty({ example: 11 })
    @IsNotEmpty()
    readonly product_id: number;

    @ApiProperty({ example: 31 })
    @IsNotEmpty()
    readonly client_id: number;

    @ApiProperty({ example: '2024-03-24T18:53:11.000Z' })
    @IsNotEmpty()
    readonly date: string;

    @ApiProperty({ example: 4 })
    @IsNotEmpty()
    readonly rating: number;

    @ApiProperty({ example: 'Очень крутой товар' })
    @IsNotEmpty()
    readonly comment: string;

}