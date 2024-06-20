import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class updateProductCountDto{
    @ApiProperty({ example: 'alex' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: '23' })
    @IsNotEmpty()
    user_id?: number;

    @ApiProperty({ example: '323' })
    @IsNotEmpty()
    readonly product_id: number;

    @ApiProperty({ example: '2' })
    @IsNotEmpty()
    readonly count: number;

}