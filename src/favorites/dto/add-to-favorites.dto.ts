import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class addToFavoritesDto{
    @ApiProperty({ example: 'alex' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: '23' })
    @IsNotEmpty()
    user_id?: number;

    @ApiProperty({ example: '3' })
    @IsNotEmpty()
    readonly product_id: number;

}